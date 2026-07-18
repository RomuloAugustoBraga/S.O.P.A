import { ConfigService } from '@nestjs/config';

/** Lê uma env já validada no boot, sem non-null assertion espalhada pelo código. */
export function getRequiredEnv(config: ConfigService, key: string): string {
  const value = config.get<string>(key);
  if (value === undefined) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${key}`);
  }
  return value;
}
