import { Card, Typography } from 'antd';
import { Link } from 'react-router';
import { LoginForm } from '../components/LoginForm';

export function LoginPage() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24 }}>
      <Card style={{ width: 360 }}>
        <Typography.Title level={3} style={{ textAlign: 'center', marginTop: 0 }}>
          Entrar
        </Typography.Title>
        <LoginForm />
        <Typography.Paragraph style={{ textAlign: 'center', marginBottom: 0 }}>
          Recebeu um convite? <Link to="/register">Cadastre-se</Link>
        </Typography.Paragraph>
      </Card>
    </div>
  );
}