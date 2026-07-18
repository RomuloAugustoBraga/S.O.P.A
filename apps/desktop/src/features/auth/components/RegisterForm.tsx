import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Form, Input } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { getErrorMessage } from '../../../lib/get-error-message';
import { useRegister } from '../api/use-register';
import { registerSchema, type RegisterFormValues } from '../schemas/auth.schemas';

export function RegisterForm() {
  const navigate = useNavigate();
  const registerUser = useRegister();
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { token: '', email: '', password: '' },
  });

  const onSubmit = (values: RegisterFormValues): void => {
    registerUser.mutate(values, { onSuccess: () => setSuccess(true) });
  };

  if (success) {
    return (
      <Alert
        type="success"
        showIcon
        message="Conta criada com sucesso"
        description="Agora você já pode entrar com seu e-mail e senha."
        action={
          <Button size="small" type="primary" onClick={() => navigate('/login')}>
            Ir para o login
          </Button>
        }
      />
    );
  }

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      {registerUser.isError && (
        <Form.Item>
          <Alert
            type="error"
            showIcon
            message={getErrorMessage(registerUser.error, 'Não foi possível concluir o cadastro.')}
          />
        </Form.Item>
      )}

      <Form.Item label="Token de convite" validateStatus={errors.token ? 'error' : ''} help={errors.token?.message}>
        <Controller
          name="token"
          control={control}
          render={({ field }) => <Input {...field} placeholder="Cole o token recebido do OWNER" />}
        />
      </Form.Item>

      <Form.Item label="E-mail" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} placeholder="seu@email.com" autoComplete="email" />}
        />
      </Form.Item>

      <Form.Item label="Senha" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password {...field} placeholder="Mínimo de 10 caracteres" autoComplete="new-password" />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={registerUser.isPending}>
          Criar conta
        </Button>
      </Form.Item>
    </Form>
  );
}