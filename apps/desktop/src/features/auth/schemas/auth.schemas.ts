import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(1, 'Informe sua senha'),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  token: z.string().min(1, 'Token de convite obrigatório'),
  email: z.email('E-mail inválido'),
  password: z.string().min(10, 'A senha deve ter pelo menos 10 caracteres'),
});
export type RegisterFormValues = z.infer<typeof registerSchema>;