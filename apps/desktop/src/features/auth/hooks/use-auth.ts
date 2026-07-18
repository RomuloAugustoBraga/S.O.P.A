import { useSyncExternalStore } from 'react';
import { getAccessToken, setTokens, subscribe } from '../../../lib/auth-storage';

export function useIsAuthenticated(): boolean {
  return useSyncExternalStore(subscribe, () => getAccessToken() !== null);
}

export function useLogout(): () => void {
  return () => setTokens(null);
}