import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';
import type { RegisterFormValues } from '../schemas/auth.schemas';

interface RegisterResponse {
  id: string;
  email: string;
}

async function register(input: RegisterFormValues): Promise<RegisterResponse> {
  const { data } = await apiClient.post<RegisterResponse>('/auth/register', input);
  return data;
}

export function useRegister() {
  return useMutation({ mutationFn: register });
}