import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Stack,
  Group,
  Box,
  Anchor,
  Divider,
} from '@mantine/core';
import {
  IconMail,
  IconLock,
  IconCar,
  IconBrandGoogle,
  IconBrandFacebook,
  IconBrandWindows,
  IconBrandYahoo,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        notifications.show({ message: t('login.success'), color: 'teal' });
        const isAdmin = email === 'admin@autozaimi.al';
        navigate(isAdmin ? '/admin' : '/');
      } else {
        setError(t('login.error'));
      }
      setLoading(false);
    }, 600);
  };

  const handleSocialLogin = (provider: string) => {
    login('user@autozaimi.al', 'user123');
    notifications.show({ message: `${t('login.success')} (${provider})`, color: 'teal' });
    navigate('/');
  };

  return (
    <Box
      mih="100vh"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--mantine-color-body)',
      }}
    >
      <Container size={440} w="100%">
        <Stack align="center" mb="xl" className="animate-slide-up">
          <Group gap={8} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <IconCar size={36} color="var(--mantine-color-teal-6)" />
            <Text size="2rem" fw={800} className="text-gradient">
              AutoZaimi
            </Text>
          </Group>
          <Text size="xl" fw={700}>{t('login.title')}</Text>
          <Text c="dimmed" size="sm">{t('login.subtitle')}</Text>
        </Stack>

        <Paper
          className="glass-card animate-scale-in"
          radius="lg"
          p="xl"
        >
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <TextInput
                label={t('login.email')}
                placeholder="email@example.com"
                leftSection={<IconMail size={16} />}
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />
              <PasswordInput
                label={t('login.password')}
                placeholder="••••••••"
                leftSection={<IconLock size={16} />}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
              />
              {error && (
                <Text c="red" size="sm" ta="center">
                  {error}
                </Text>
              )}
              <Button
                type="submit"
                fullWidth
                variant="gradient"
                gradient={{ from: 'purple', to: 'teal' }}
                size="md"
                loading={loading}
              >
                {t('login.submit')}
              </Button>
            </Stack>
          </form>

          <Divider label={t('login.orSocial')} labelPosition="center" my="lg" />

          <Stack gap="sm">
            <Button
              fullWidth
              variant="outline"
              color="red"
              leftSection={<IconBrandGoogle size={18} />}
              onClick={() => handleSocialLogin('Google')}
            >
              {t('login.google')}
            </Button>
            <Button
              fullWidth
              variant="outline"
              color="blue"
              leftSection={<IconBrandFacebook size={18} />}
              onClick={() => handleSocialLogin('Facebook')}
            >
              {t('login.facebook')}
            </Button>
            <Button
              fullWidth
              variant="outline"
              color="indigo"
              leftSection={<IconBrandWindows size={18} />}
              onClick={() => handleSocialLogin('Microsoft')}
            >
              {t('login.microsoft')}
            </Button>
            <Button
              fullWidth
              variant="outline"
              color="violet"
              leftSection={<IconBrandYahoo size={18} />}
              onClick={() => handleSocialLogin('Yahoo')}
            >
              {t('login.yahoo')}
            </Button>
          </Stack>
        </Paper>

        <Text ta="center" mt="md" size="sm">
          {t('login.noAccount')}{' '}
          <Anchor component={Link} to="/register" fw={600}>
            {t('login.register')}
          </Anchor>
        </Text>
      </Container>
    </Box>
  );
}
