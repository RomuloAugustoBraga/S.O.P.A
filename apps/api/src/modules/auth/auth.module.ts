import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { InvitationsModule } from '../invitations/invitations.module';
import { UsersModule } from '../users/users.module';
import { AuthService } from './application/auth.service';
import { TokenService } from './application/token.service';
import { REFRESH_TOKEN_REPOSITORY } from './domain/refresh-token';
import { Argon2PasswordHasher, PASSWORD_HASHER } from './infrastructure/argon2-password-hasher';
import { JwtStrategy } from './infrastructure/jwt.strategy';
import { PrismaRefreshTokenRepository } from './infrastructure/prisma-refresh-token.repository';
import { AuthController } from './presentation/auth.controller';

@Module({
  imports: [UsersModule, InvitationsModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    JwtStrategy,
    { provide: PASSWORD_HASHER, useClass: Argon2PasswordHasher },
    { provide: REFRESH_TOKEN_REPOSITORY, useClass: PrismaRefreshTokenRepository },
  ],
})
export class AuthModule {}
