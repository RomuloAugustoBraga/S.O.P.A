import { Card, Typography } from 'antd';
import { Link } from 'react-router';
import { RegisterForm } from '../components/RegisterForm';

export function RegisterPage() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24 }}>
      <Card style={{ width: 360 }}>
        <Typography.Title level={3} style={{ textAlign: 'center', marginTop: 0 }}>
          Cadastrar por convite
        </Typography.Title>
        <RegisterForm />
        <Typography.Paragraph style={{ textAlign: 'center', marginBottom: 0 }}>
          Já tem conta? <Link to="/login">Entrar</Link>
        </Typography.Paragraph>
      </Card>
    </div>
  );
}