import { createHashRouter, Navigate } from 'react-router';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { RegisterPage } from '../features/auth/pages/RegisterPage';
import { HomePage } from './HomePage';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';

export const router = createHashRouter([
  { path: '/', element: <ProtectedRoute><HomePage /></ProtectedRoute> },
  { path: '/login', element: <PublicOnlyRoute><LoginPage /></PublicOnlyRoute> },
  { path: '/register', element: <PublicOnlyRoute><RegisterPage /></PublicOnlyRoute> },
  { path: '*', element: <Navigate to="/" replace /> },
]);