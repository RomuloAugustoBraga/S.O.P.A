import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import { setTokens } from '../../../lib/auth-storage';
import type { LoginFormValues } from '../schemas/auth.schemas';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

async function login(input: LoginFormValues): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', input);
  return data;
}

export function useLogin() {
  return useMutation({ mutationFn: login, onSuccess: (data) => setTokens(data) });
}