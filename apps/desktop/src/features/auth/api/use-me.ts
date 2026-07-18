import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../lib/api-client';

export interface CurrentUser {
  id: string;
  email: string;
  isOwner: boolean;
}

async function fetchMe(): Promise<CurrentUser> {
  const { data } = await apiClient.get<CurrentUser>('/auth/me');
  return data;
}

export function useMe() {
  return useQuery({ queryKey: ['auth', 'me'], queryFn: fetchMe });
}