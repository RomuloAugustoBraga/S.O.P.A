export interface RefreshTokenProps {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
}

export const REFRESH_TOKEN_REPOSITORY = Symbol('REFRESH_TOKEN_REPOSITORY');

export interface CreateRefreshTokenProps {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}

export interface RefreshTokenRepository {
  findByHash(tokenHash: string): Promise<RefreshTokenProps | null>;
  create(props: CreateRefreshTokenProps): Promise<RefreshTokenProps>;
  revoke(id: string): Promise<void>;
}
