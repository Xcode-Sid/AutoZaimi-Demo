import {
  Title,
  TextInput,
  Button,
  Stack,
  SimpleGrid,
  Avatar,
  Group,
  Box,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUser, IconMail, IconPhone, IconMapPin, IconBuilding } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();

  const form = useForm({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    updateProfile(values);
    notifications.show({ message: t('account.profileSaved'), color: 'teal' });
  };

  return (
    <Stack gap="xl" className="animate-fade-in">
      <Title order={2} fw={700}>
        {t('account.profile')}
      </Title>

      <Group>
        <Avatar size={80} radius="xl" color="teal">
          {user?.avatar}
        </Avatar>
      </Group>

      <Box
        className="glass-card"
        p="xl"
        style={{ borderRadius: 'var(--mantine-radius-lg)' }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label={t('account.firstName')}
                leftSection={<IconUser size={16} />}
                {...form.getInputProps('firstName')}
              />
              <TextInput
                label={t('account.lastName')}
                leftSection={<IconUser size={16} />}
                {...form.getInputProps('lastName')}
              />
            </SimpleGrid>
            <TextInput
              label={t('account.email')}
              leftSection={<IconMail size={16} />}
              {...form.getInputProps('email')}
            />
            <TextInput
              label={t('account.phone')}
              leftSection={<IconPhone size={16} />}
              {...form.getInputProps('phone')}
            />
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput
                label={t('account.address')}
                leftSection={<IconMapPin size={16} />}
                {...form.getInputProps('address')}
              />
              <TextInput
                label={t('account.city')}
                leftSection={<IconBuilding size={16} />}
                {...form.getInputProps('city')}
              />
            </SimpleGrid>
            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: 'purple', to: 'teal' }}
              w="fit-content"
            >
              {t('account.saveChanges')}
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
