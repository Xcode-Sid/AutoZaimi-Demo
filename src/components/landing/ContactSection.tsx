import { useState } from 'react';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Stack,
  TextInput,
  Textarea,
  Button,
  Paper,
  ThemeIcon,
  Group,
  Box,
} from '@mantine/core';
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconSend,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

const contactInfo = [
  { icon: IconMapPin, titleKey: 'contact.officeTitle', valueKey: 'contact.officeAddress', color: 'teal' },
  { icon: IconPhone, titleKey: 'contact.phoneTitle', valueKey: 'contact.phoneValue', color: 'purple' },
  { icon: IconMail, titleKey: 'contact.emailTitle', valueKey: 'contact.emailValue', color: 'blue' },
  { icon: IconClock, titleKey: 'contact.hoursTitle', valueKey: 'contact.hoursValue', color: 'orange' },
];

export function ContactSection() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (name && email && message) {
      notifications.show({
        title: '✅',
        message: t('contact.sendSuccess'),
        color: 'teal',
      });
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }
  };

  return (
    <Box id="contact" py={80} style={{ position: 'relative', scrollMarginTop: 80 }}>
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,191,165,0.03) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <Container size="lg" style={{ position: 'relative' }}>
        <Stack align="center" gap="xs" mb={50} className="animate-slide-up">
          <Title order={2} ta="center" fw={800}>
            {t('contact.title')}
          </Title>
          <Text c="dimmed" ta="center" maw={500} size="lg">
            {t('contact.subtitle')}
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          {/* Contact form */}
          <Paper className="glass-card animate-stagger-up" p="xl" radius="lg" style={{ '--stagger-delay': '0.1s' } as React.CSSProperties}>
            <Stack gap="md">
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput
                  label={t('contact.nameLabel')}
                  placeholder={t('contact.namePlaceholder')}
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  required
                  radius="md"
                />
                <TextInput
                  label={t('contact.emailLabel')}
                  placeholder={t('contact.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  required
                  radius="md"
                />
              </SimpleGrid>
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput
                  label={t('contact.phoneLabel')}
                  placeholder={t('contact.phonePlaceholder')}
                  value={phone}
                  onChange={(e) => setPhone(e.currentTarget.value)}
                  radius="md"
                />
                <TextInput
                  label={t('contact.subjectLabel')}
                  placeholder={t('contact.subjectPlaceholder')}
                  value={subject}
                  onChange={(e) => setSubject(e.currentTarget.value)}
                  radius="md"
                />
              </SimpleGrid>
              <Textarea
                label={t('contact.messageLabel')}
                placeholder={t('contact.messagePlaceholder')}
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
                required
                minRows={5}
                radius="md"
              />
              <Button
                variant="gradient"
                gradient={{ from: 'teal.7', to: 'teal.5' }}
                size="md"
                leftSection={<IconSend size={18} />}
                onClick={handleSubmit}
                disabled={!name || !email || !message}
                className="animate-shimmer"
                radius="md"
              >
                {t('contact.send')}
              </Button>
            </Stack>
          </Paper>

          {/* Contact info cards */}
          <Stack gap="md">
            {contactInfo.map((item, i) => (
              <Paper
                key={item.titleKey}
                className="glass-card glass-card-hover animate-stagger-up"
                p="lg"
                radius="lg"
                style={{ '--stagger-delay': `${(i + 1) * 0.12}s` } as React.CSSProperties}
              >
                <Group gap="md" align="flex-start">
                  <ThemeIcon size={48} radius="xl" variant="light" color={item.color}>
                    <item.icon size={24} />
                  </ThemeIcon>
                  <Stack gap={2} style={{ flex: 1 }}>
                    <Text fw={700} size="sm">{t(item.titleKey)}</Text>
                    <Text c="dimmed" size="sm">{t(item.valueKey)}</Text>
                  </Stack>
                </Group>
              </Paper>
            ))}

          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
