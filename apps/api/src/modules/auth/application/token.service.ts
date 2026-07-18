import { createHash, randomBytes } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { StringValue } from 'ms';
import type { JwtAccessPayload } from '../infrastructure/jwt.strategy';

export interface GeneratedRefreshToken {
  token: string;
  hash: string;
  expiresAt: Date;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  signAccessToken(payload: JwtAccessPayload): string {
    const expiresIn = this.config.get<string>('JWT_ACCESS_EXPIRES_IN') as StringValue;
    return this.jwt.sign(payload, {
      secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn,
    });
  }

  generateRefreshToken(): GeneratedRefreshToken {
    const token = randomBytes(64).toString('hex');
    const days = Number(this.config.get<string>('JWT_REFRESH_EXPIRES_IN_DAYS'));
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    return { token, hash: this.hashRefreshToken(token), expiresAt };
  }

  hashRefreshToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }
}
