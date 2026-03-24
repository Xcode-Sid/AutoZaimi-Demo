import {
  Title,
  Stack,
  SimpleGrid,
  Paper,
  Text,
  Group,
  ThemeIcon,
  Progress,
  Box,
} from '@mantine/core';
import {
  IconEye,
  IconUsers,
  IconDeviceMobile,
  IconDeviceDesktop,
  IconWorld,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const trafficSources = [
  { source: 'Google Search', value: 42, color: 'teal' },
  { source: 'Direct', value: 28, color: 'purple' },
  { source: 'Social Media', value: 18, color: 'magenta' },
  { source: 'Referral', value: 12, color: 'blue' },
];

const pageViews = [
  { page: 'Landing Page', views: 12500 },
  { page: 'Fleet Page', views: 8200 },
  { page: 'Vehicle Detail', views: 6800 },
  { page: 'Booking Flow', views: 3400 },
];

export default function AnalyticsPage() {
  const { t } = useTranslation();

  return (
    <Stack gap="xl" className="animate-fade-in">
      <Title order={2} fw={700}>
        {t('admin.analyticsTitle')}
      </Title>
      <Text c="dimmed">{t('admin.analyticsDesc')}</Text>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {[
          { label: 'Total Visits', value: '32,500', icon: IconEye, color: 'teal' },
          { label: 'Unique Users', value: '18,200', icon: IconUsers, color: 'purple' },
          { label: 'Mobile Users', value: '58%', icon: IconDeviceMobile, color: 'magenta' },
          { label: 'Desktop Users', value: '42%', icon: IconDeviceDesktop, color: 'blue' },
        ].map((stat) => (
          <Paper key={stat.label} className="glass-card" p="lg" radius="lg">
            <Group justify="space-between">
              <div>
                <Text size="sm" c="dimmed">{stat.label}</Text>
                <Text size="xl" fw={700}>{stat.value}</Text>
              </div>
              <ThemeIcon variant="light" color={stat.color} size="lg" radius="md">
                <stat.icon size={20} />
              </ThemeIcon>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
        <Paper className="glass-card" p="lg" radius="lg">
          <Text fw={600} mb="md">Traffic Sources</Text>
          <Stack gap="sm">
            {trafficSources.map((src) => (
              <div key={src.source}>
                <Group justify="space-between" mb={4}>
                  <Text size="sm">{src.source}</Text>
                  <Text size="sm" fw={500}>{src.value}%</Text>
                </Group>
                <Progress value={src.value} color={src.color} size="sm" />
              </div>
            ))}
          </Stack>
        </Paper>

        <Paper className="glass-card" p="lg" radius="lg">
          <Text fw={600} mb="md">Top Pages</Text>
          <Stack gap="sm">
            {pageViews.map((pv) => (
              <Group key={pv.page} justify="space-between">
                <Group gap="xs">
                  <IconWorld size={16} style={{ opacity: 0.5 }} />
                  <Text size="sm">{pv.page}</Text>
                </Group>
                <Text size="sm" fw={500}>{pv.views.toLocaleString()} views</Text>
              </Group>
            ))}
          </Stack>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
}
