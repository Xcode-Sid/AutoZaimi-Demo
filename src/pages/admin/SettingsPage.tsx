import {
  Title,
  Stack,
  TextInput,
  Textarea,
  Button,
  Switch,
  Divider,
  Box,
  Text,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

export default function AdminSettingsPage() {
  const { t } = useTranslation();

  const handleSave = () => {
    notifications.show({ message: t('account.settingsSaved'), color: 'teal' });
  };

  return (
    <Stack gap="xl" className="animate-fade-in">
      <Title order={2} fw={700}>
        {t('admin.settings')}
      </Title>

      <Box className="glass-card" p="xl" style={{ borderRadius: 'var(--mantine-radius-lg)' }}>
        <Stack gap="md">
          <Text fw={600} size="lg">Platform Settings</Text>
          <TextInput label="Site Name" defaultValue="AutoZaimi" />
          <TextInput label="Contact Email" defaultValue="info@autozaimi.al" />
          <TextInput label="Phone Number" defaultValue="+355 44 123 456" />
          <Textarea label="Site Description" defaultValue="Platforma premium për qira dhe blerje makinash në Shqipëri." minRows={3} />
          <Divider />
          <Switch label="Enable maintenance mode" color="teal" />
          <Switch label="Enable new user registrations" defaultChecked color="teal" />
          <Switch label="Show promotional banner" defaultChecked color="teal" />
          <Button
            variant="filled"
            color="teal"
            w="fit-content"
            onClick={handleSave}
          >
            {t('common.save')}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
