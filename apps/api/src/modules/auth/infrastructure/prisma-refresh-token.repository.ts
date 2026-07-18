import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import {
  CreateRefreshTokenProps,
  RefreshTokenProps,
  RefreshTokenRepository,
} from '../domain/refresh-token';

@Injectable()
export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByHash(tokenHash: string): Promise<RefreshTokenProps | null> {
    return this.prisma.refreshToken.findUnique({ where: { tokenHash } });
  }

  create(props: CreateRefreshTokenProps): Promise<RefreshTokenProps> {
    return this.prisma.refreshToken.create({
      data: { userId: props.userId, tokenHash: props.tokenHash, expiresAt: props.expiresAt },
    });
  }

  async revoke(id: string): Promise<void> {
    await this.prisma.refreshToken.update({ where: { id }, data: { revokedAt: new Date() } });
  }
}
