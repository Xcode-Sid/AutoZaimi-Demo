import { Container, Stack, Text, Button, ThemeIcon } from '@mantine/core';
import { IconError404 } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Container size="sm" py={120}>
      <Stack align="center" gap="xl" className="animate-fade-in">
        <ThemeIcon size={120} radius="xl" variant="light" color="purple">
          <IconError404 size={60} />
        </ThemeIcon>
        <Text
          size="3rem"
          fw={900}
          className="text-gradient"
          ta="center"
        >
          404
        </Text>
        <Text size="xl" fw={600} ta="center">
          {t('notFound.title')}
        </Text>
        <Text c="dimmed" ta="center" maw={400}>
          {t('notFound.subtitle')}
        </Text>
        <Button
          variant="gradient"
          gradient={{ from: 'purple', to: 'teal' }}
          size="lg"
          onClick={() => navigate('/')}
        >
          {t('notFound.backHome')}
        </Button>
      </Stack>
    </Container>
  );
}
