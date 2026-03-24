import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Group,
  TextInput,
  Button,
  ActionIcon,
  Divider,
} from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconCar,
  IconPhone,
  IconMail,
  IconMapPin,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      notifications.show({
        title: '✅',
        message: t('footer.subscribeSuccess'),
        color: 'teal',
      });
      setEmail('');
    }
  };

  return (
    <Box component="footer">
      {/* Gradient divider */}
      <div className="footer-gradient-divider" />

      <Box py={60}>
        <Container size="xl">
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={40}>
            <Stack gap="md">
              <Group gap={8}>
                <IconCar size={28} color="var(--mantine-color-teal-6)" />
                <Text size="xl" fw={800} className="text-gradient">
                  AutoZaimi
                </Text>
              </Group>
              <Text size="sm" c="dimmed" maw={280}>
                {t('footer.description')}
              </Text>
              <Group gap="xs">
                <ActionIcon
                  variant="light"
                  size="lg"
                  radius="xl"
                  color="blue"
                  style={{ transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <IconBrandFacebook size={20} />
                </ActionIcon>
                <ActionIcon
                  variant="light"
                  size="lg"
                  radius="xl"
                  color="pink"
                  style={{ transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <IconBrandInstagram size={20} />
                </ActionIcon>
                <ActionIcon
                  variant="light"
                  size="lg"
                  radius="xl"
                  color="cyan"
                  style={{ transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <IconBrandTwitter size={20} />
                </ActionIcon>
                <ActionIcon
                  variant="light"
                  size="lg"
                  radius="xl"
                  color="red"
                  style={{ transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <IconBrandYoutube size={20} />
                </ActionIcon>
              </Group>
            </Stack>

            <Stack gap="sm">
              <Text fw={600} size="md">{t('footer.quickLinks')}</Text>
              <Text component={Link} to="/" size="sm" c="dimmed" style={{ textDecoration: 'none', transition: 'color 0.2s' }}>
                {t('footer.aboutUs')}
              </Text>
              <Text component={Link} to="/fleet" size="sm" c="dimmed" style={{ textDecoration: 'none', transition: 'color 0.2s' }}>
                {t('footer.fleet')}
              </Text>
              <Text component={Link} to="/" size="sm" c="dimmed" style={{ textDecoration: 'none', transition: 'color 0.2s' }}>
                {t('footer.contact')}
              </Text>
              <Text component={Link} to="/" size="sm" c="dimmed" style={{ textDecoration: 'none', transition: 'color 0.2s' }}>
                {t('footer.faq')}
              </Text>
            </Stack>

            <Stack gap="sm">
              <Text fw={600} size="md">{t('footer.carTypes')}</Text>
              <Text size="sm" c="dimmed">{t('footer.luxury')}</Text>
              <Text size="sm" c="dimmed">{t('footer.suv')}</Text>
              <Text size="sm" c="dimmed">{t('footer.electric')}</Text>
              <Text size="sm" c="dimmed">{t('footer.economy')}</Text>
            </Stack>

            <Stack gap="sm">
              <Text fw={600} size="md">{t('footer.newsletter')}</Text>
              <Text size="sm" c="dimmed">{t('footer.newsletterDesc')}</Text>
              <Stack gap="xs">
                <TextInput
                  placeholder={t('footer.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  radius="md"
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                />
                <Button
                  variant="gradient"
                  gradient={{ from: 'purple', to: 'teal' }}
                  onClick={handleSubscribe}
                  fullWidth
                  radius="md"
                  className="animate-shimmer"
                >
                  {t('footer.subscribe')}
                </Button>
              </Stack>
              <Stack gap={6} mt="xs">
                <Group gap={6}>
                  <IconPhone size={14} style={{ opacity: 0.6 }} />
                  <Text size="xs" c="dimmed">+355 44 123 456</Text>
                </Group>
                <Group gap={6}>
                  <IconMail size={14} style={{ opacity: 0.6 }} />
                  <Text size="xs" c="dimmed">info@autozaimi.al</Text>
                </Group>
                <Group gap={6}>
                  <IconMapPin size={14} style={{ opacity: 0.6 }} />
                  <Text size="xs" c="dimmed">{t('footer.address')}</Text>
                </Group>
              </Stack>
            </Stack>
          </SimpleGrid>

          <Divider my="xl" />

          <Text ta="center" size="sm" c="dimmed">
            © {new Date().getFullYear()} AutoZaimi. {t('footer.rights')}
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
