import {
  Title,
  PasswordInput,
  Switch,
  Select,
  Button,
  Stack,
  Divider,
  Box,
  Text,
  SegmentedControl,
} from '@mantine/core';
import { useMantineColorScheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  const handleSave = () => {
    notifications.show({ message: t('account.settingsSaved'), color: 'teal' });
  };

  return (
    <Stack gap="xl" className="animate-fade-in">
      <Title order={2} fw={700}>
        {t('account.settings')}
      </Title>

      <Box
        className="glass-card"
        p="xl"
        style={{ borderRadius: 'var(--mantine-radius-lg)' }}
      >
        <Stack gap="lg">
          <Text fw={600} size="lg">
            {t('account.currentPassword')}
          </Text>
          <PasswordInput label={t('account.currentPassword')} />
          <PasswordInput label={t('account.newPassword')} />
          <PasswordInput label={t('account.confirmPassword')} />

          <Divider />

          <Switch
            label={t('account.emailNotifications')}
            checked={emailNotif}
            onChange={(e) => setEmailNotif(e.currentTarget.checked)}
            color="teal"
          />
          <Switch
            label={t('account.smsNotifications')}
            checked={smsNotif}
            onChange={(e) => setSmsNotif(e.currentTarget.checked)}
            color="teal"
          />

          <Divider />

          <Select
            label={t('account.languagePref')}
            value={i18n.language}
            onChange={(v) => v && i18n.changeLanguage(v)}
            data={[
              { value: 'sq', label: 'Shqip' },
              { value: 'en', label: 'English' },
              { value: 'it', label: 'Italiano' },
            ]}
          />

          <div>
            <Text size="sm" fw={500} mb="xs">
              {t('account.themePref')}
            </Text>
            <SegmentedControl
              value={colorScheme}
              onChange={(v) => {
                setColorScheme(v as 'dark' | 'light');
                localStorage.setItem('az-color-scheme', v);
              }}
              data={[
                { value: 'dark', label: t('account.dark') },
                { value: 'light', label: t('account.light') },
              ]}
              color="teal"
            />
          </div>

          <Button
            variant="filled"
            color="teal"
            w="fit-content"
            onClick={handleSave}
          >
            {t('account.save')}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
