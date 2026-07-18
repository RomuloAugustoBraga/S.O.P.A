import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, setTokens } from './auth-storage';

interface RetriableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const apiClient = axios.create({ baseURL: API_URL });

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

// Deduplica chamadas de refresh concorrentes: se duas requisições tomam 401
// ao mesmo tempo, só uma chamada real a /auth/refresh é feita.
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('Nenhum refresh token disponível.');
  }

  const response = await axios.post<{ accessToken: string; refreshToken: string }>(
    `${API_URL}/auth/refresh`,
    { refreshToken },
  );

  setTokens(response.data);
  return response.data.accessToken;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined;

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
      const newAccessToken = await refreshPromise;
      originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
      return apiClient(originalRequest);
    } catch (refreshError) {
      setTokens(null);
      return Promise.reject(refreshError);
    }
  },
);