import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  INVITATION_REPOSITORY,
  InvitationInvalidError,
  InvitationRepository,
} from '../../invitations/domain/invitation';
import { USER_REPOSITORY, UserRepository } from '../../users/domain/user';
import { REFRESH_TOKEN_REPOSITORY, RefreshTokenRepository } from '../domain/refresh-token';
import { PASSWORD_HASHER, PasswordHasher } from '../infrastructure/argon2-password-hasher';
import { TokenService } from './token.service';

// Hash Argon2id fictício, usado para equalizar o tempo de resposta do login
// quando o e-mail não existe — evita enumeração de usuários por timing attack.
const DUMMY_HASH =
  '$argon2id$v=19$m=19456,t=2,p=1$HB70yFAfl9Ls5ktkp7OwHQ$fqbsGq1cZ/u2uA1Ij1sBP6TVI07ef9CIgqr3+9GnDDQ';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(INVITATION_REPOSITORY) private readonly invitations: InvitationRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY) private readonly refreshTokens: RefreshTokenRepository,
    @Inject(PASSWORD_HASHER) private readonly hasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async register(input: {
    token: string;
    email: string;
    password: string;
  }): Promise<{ id: string; email: string }> {
    const invitation = await this.invitations.findByToken(input.token);
    if (!invitation) throw new NotFoundException('Convite não encontrado.');

    try {
      invitation.assertValidFor(input.email);
    } catch (error) {
      if (error instanceof InvitationInvalidError) throw new BadRequestException(error.message);
      throw error;
    }

    const existingUser = await this.users.findByEmail(input.email);
    if (existingUser) throw new ConflictException('Já existe uma conta com este e-mail.');

    const passwordHash = await this.hasher.hash(input.password);
    const user = await this.users.create({ email: input.email, passwordHash });
    await this.invitations.markAsUsed(invitation.id);

    return { id: user.id, email: user.email };
  }

  async login(input: { email: string; password: string }): Promise<AuthTokens> {
    const user = await this.users.findByEmail(input.email);
    const hashToCompare = user?.passwordHash ?? DUMMY_HASH;
    const passwordMatches = await this.hasher.verify(hashToCompare, input.password);

    if (!user?.isActive || !passwordMatches) {
      throw new UnauthorizedException('E-mail ou senha inválidos.');
    }

    return this.issueTokenPair(user.id, user.email, user.isOwner);
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const hash = this.tokens.hashRefreshToken(refreshToken);
    const stored = await this.refreshTokens.findByHash(hash);

    if (!stored || stored.revokedAt || stored.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Refresh token inválido ou expirado.');
    }

    const user = await this.users.findById(stored.userId);
    if (!user?.isActive) throw new UnauthorizedException('Refresh token inválido ou expirado.');

    await this.refreshTokens.revoke(stored.id);
    return this.issueTokenPair(user.id, user.email, user.isOwner);
  }

  private async issueTokenPair(
    userId: string,
    email: string,
    isOwner: boolean,
  ): Promise<AuthTokens> {
    const accessToken = this.tokens.signAccessToken({ sub: userId, email, isOwner });
    const generated = this.tokens.generateRefreshToken();

    await this.refreshTokens.create({
      userId,
      tokenHash: generated.hash,
      expiresAt: generated.expiresAt,
    });

    return { accessToken, refreshToken: generated.token };
  }
}
