import { Button, Card, Skeleton, Typography } from 'antd';
import { useMe } from '../features/auth/api/use-me';
import { useLogout } from '../features/auth/hooks/use-auth';

export function HomePage() {
  const me = useMe();
  const logout = useLogout();

  return (
    <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', padding: 24 }}>
      <Card style={{ width: 360 }}>
        {me.isLoading && <Skeleton active />}
        {me.isSuccess && (
          <>
            <Typography.Title level={4} style={{ marginTop: 0 }}>
              Bem-vindo(a)
            </Typography.Title>
            <Typography.Paragraph>{me.data.email}</Typography.Paragraph>
            {me.data.isOwner && <Typography.Text type="secondary">OWNER</Typography.Text>}
          </>
        )}
        {me.isError && <Typography.Text type="danger">Não foi possível carregar seu perfil.</Typography.Text>}
        <Button style={{ marginTop: 16 }} block onClick={logout}>
          Sair
        </Button>
      </Card>
    </div>
  );
}