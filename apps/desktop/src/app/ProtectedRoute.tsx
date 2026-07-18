// ProtectedRoute.tsx
import type { ReactElement } from 'react';
import { Navigate } from 'react-router';
import { useIsAuthenticated } from '../features/auth/hooks/use-auth';

export function ProtectedRoute({ children }: { children: ReactElement }): ReactElement {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}