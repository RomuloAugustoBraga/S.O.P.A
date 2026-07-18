import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getRequiredEnv } from '../../../shared/config/get-required-env';
import type { AuthenticatedUser } from '../../../shared/types/authenticated-user.interface';

export interface JwtAccessPayload {
  sub: string;
  email: string;
  isOwner: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getRequiredEnv(config, 'JWT_ACCESS_SECRET'),
    });
  }

  validate(payload: JwtAccessPayload): AuthenticatedUser {
    return { id: payload.sub, email: payload.email, isOwner: payload.isOwner };
  }
}
