import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Form, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { getErrorMessage } from '../../../lib/get-error-message';
import { useLogin } from '../api/use-login';
import { loginSchema, type LoginFormValues } from '../schemas/auth.schemas';

export function LoginForm() {
  const navigate = useNavigate();
  const login = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values: LoginFormValues): void => {
    login.mutate(values, { onSuccess: () => navigate('/', { replace: true }) });
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      {login.isError && (
        <Form.Item>
          <Alert type="error" showIcon message={getErrorMessage(login.error, 'Não foi possível entrar.')} />
        </Form.Item>
      )}

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
            <Input.Password {...field} placeholder="Sua senha" autoComplete="current-password" />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={login.isPending}>
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}