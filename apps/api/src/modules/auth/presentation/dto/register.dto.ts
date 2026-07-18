// register.dto.ts
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Matches(/^[a-f0-9]{64,}$/, { message: 'Token de convite inválido.' })
  token!: string;

  @IsEmail({}, { message: 'E-mail inválido.' })
  email!: string;

  @IsString()
  @MinLength(10, { message: 'A senha deve ter pelo menos 10 caracteres.' })
  @MaxLength(128)
  password!: string;
}
