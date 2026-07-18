import { IsEmail } from 'class-validator';

export class CreateInvitationDto {
  @IsEmail({}, { message: 'E-mail inválido.' })
  email!: string;
}
