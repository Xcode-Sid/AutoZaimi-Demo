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
  SimpleGrid,
  Divider,
} from '@mantine/core';
import {
  IconMail,
  IconLock,
  IconUser,
  IconPhone,
  IconCar,
  IconBrandGoogle,
  IconBrandFacebook,
  IconBrandWindows,
  IconBrandYahoo,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

export default function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      notifications.show({ message: t('register.success'), color: 'teal' });
      navigate('/login');
      setLoading(false);
    }, 800);
  };

  const handleSocialRegister = (provider: string) => {
    notifications.show({ message: `${t('register.success')} (${provider})`, color: 'teal' });
    navigate('/login');
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
      <Container size={520} w="100%">
        <Stack align="center" mb="xl" className="animate-slide-up">
          <Group gap={8} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <IconCar size={36} color="var(--mantine-color-teal-6)" />
            <Text size="2rem" fw={800} className="text-gradient">
              AutoZaimi
            </Text>
          </Group>
          <Text size="xl" fw={700}>{t('register.title')}</Text>
          <Text c="dimmed" size="sm">{t('register.subtitle')}</Text>
        </Stack>

        <Paper className="glass-card animate-scale-in" radius="lg" p="xl">
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput
                  label={t('register.firstName')}
                  leftSection={<IconUser size={16} />}
                  required
                />
                <TextInput
                  label={t('register.lastName')}
                  leftSection={<IconUser size={16} />}
                  required
                />
              </SimpleGrid>
              <TextInput
                label={t('register.email')}
                placeholder="email@example.com"
                leftSection={<IconMail size={16} />}
                required
              />
              <TextInput
                label={t('register.phone')}
                placeholder="+355 6X XXX XXXX"
                leftSection={<IconPhone size={16} />}
              />
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <PasswordInput
                  label={t('register.password')}
                  placeholder="••••••••"
                  leftSection={<IconLock size={16} />}
                  required
                />
                <PasswordInput
                  label={t('register.confirmPassword')}
                  placeholder="••••••••"
                  leftSection={<IconLock size={16} />}
                  required
                />
              </SimpleGrid>
              <Button
                type="submit"
                fullWidth
                variant="gradient"
                gradient={{ from: 'purple', to: 'teal' }}
                size="md"
                loading={loading}
              >
                {t('register.submit')}
              </Button>
            </Stack>
          </form>

          <Divider label={t('register.orSocial')} labelPosition="center" my="lg" />

          <Stack gap="sm">
            <Button
              fullWidth
              variant="outline"
              color="red"
              leftSection={<IconBrandGoogle size={18} />}
              onClick={() => handleSocialRegister('Google')}
            >
              {t('login.google')}
            </Button>
            <Button
              fullWidth
              variant="outline"
              color="blue"
              leftSection={<IconBrandFacebook size={18} />}
              onClick={() => handleSocialRegister('Facebook')}
            >
              {t('login.facebook')}
            </Button>
            <Button
              fullWidth
              variant="outline"
              color="indigo"
              leftSection={<IconBrandWindows size={18} />}
              onClick={() => handleSocialRegister('Microsoft')}
            >
              {t('login.microsoft')}
            </Button>
            <Button
              fullWidth
              variant="outline"
              color="violet"
              leftSection={<IconBrandYahoo size={18} />}
              onClick={() => handleSocialRegister('Yahoo')}
            >
              {t('login.yahoo')}
            </Button>
          </Stack>
        </Paper>

        <Text ta="center" mt="md" size="sm">
          {t('register.hasAccount')}{' '}
          <Anchor component={Link} to="/login" fw={600}>
            {t('register.login')}
          </Anchor>
        </Text>
      </Container>
    </Box>
  );
}
