// PublicOnlyRoute.tsx
import type { ReactElement } from 'react';
import { Navigate } from 'react-router';
import { useIsAuthenticated } from '../features/auth/hooks/use-auth';

export function PublicOnlyRoute({ children }: { children: ReactElement }): ReactElement {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}