import { plainToInstance } from 'class-transformer';
import { IsEnum, IsInt, IsString, Matches, Max, MinLength, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsInt()
  @Max(65535)
  PORT: number = 3000;

  @IsString()
  @MinLength(1)
  DATABASE_URL!: string;

  @IsString()
  @MinLength(32, { message: 'JWT_ACCESS_SECRET deve ter pelo menos 32 caracteres' })
  JWT_ACCESS_SECRET!: string;

  @IsString()
  @MinLength(32, { message: 'JWT_REFRESH_SECRET deve ter pelo menos 32 caracteres' })
  JWT_REFRESH_SECRET!: string;

  @IsString()
  @Matches(/^\d+(ms|s|m|h|d)$/, { message: 'Ex.: "15m", "1h", "7d".' })
  JWT_ACCESS_EXPIRES_IN: string = '15m';

  @IsString()
  JWT_REFRESH_EXPIRES_IN_DAYS: string = '30';
}

export function validate(config: Record<string, unknown>): EnvironmentVariables {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated, { skipMissingProperties: false });

  if (errors.length > 0) {
    const messages = errors.map((err) => Object.values(err.constraints ?? {}).join(', ')).join('; ');
    throw new Error(`Variáveis de ambiente inválidas: ${messages}`);
  }

  return validated;
}