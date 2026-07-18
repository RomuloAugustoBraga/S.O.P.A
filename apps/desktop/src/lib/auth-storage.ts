export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

let tokens: AuthTokens | null = null;
type Listener = () => void;
const listeners = new Set<Listener>();

export function getAccessToken(): string | null {
  return tokens?.accessToken ?? null;
}

export function getRefreshToken(): string | null {
  return tokens?.refreshToken ?? null;
}

export function setTokens(next: AuthTokens | null): void {
  tokens = next;
  for (const listener of listeners) listener();
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}