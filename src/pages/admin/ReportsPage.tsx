import {
  Title,
  Stack,
  SimpleGrid,
  Paper,
  Text,
  Button,
  Group,
  ThemeIcon,
} from '@mantine/core';
import {
  IconFileText,
  IconDownload,
  IconCar,
  IconCurrencyEuro,
  IconUsers,
  IconCalendar,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';

const reports = [
  { title: 'Revenue Report', description: 'Monthly revenue breakdown and trends', icon: IconCurrencyEuro, color: 'green' },
  { title: 'Fleet Report', description: 'Vehicle utilization and maintenance status', icon: IconCar, color: 'purple' },
  { title: 'Bookings Report', description: 'All bookings with customer details', icon: IconCalendar, color: 'teal' },
  { title: 'Customers Report', description: 'Customer demographics and activity', icon: IconUsers, color: 'blue' },
  { title: 'Financial Summary', description: 'Comprehensive financial overview', icon: IconCurrencyEuro, color: 'orange' },
  { title: 'Performance Report', description: 'KPIs and operational metrics', icon: IconFileText, color: 'magenta' },
];

export default function ReportsPage() {
  const { t } = useTranslation();

  const handleDownload = (title: string) => {
    notifications.show({
      message: `${title} — Download started`,
      color: 'teal',
    });
  };

  return (
    <Stack gap="xl" className="animate-fade-in">
      <Title order={2} fw={700}>
        {t('admin.reportsTitle')}
      </Title>
      <Text c="dimmed">{t('admin.reportsDesc')}</Text>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {reports.map((report) => (
          <Paper key={report.title} className="glass-card glass-card-hover" p="lg" radius="lg">
            <Stack gap="md">
              <Group>
                <ThemeIcon variant="light" color={report.color} size="lg" radius="md">
                  <report.icon size={20} />
                </ThemeIcon>
                <div>
                  <Text fw={600}>{report.title}</Text>
                  <Text size="xs" c="dimmed">{report.description}</Text>
                </div>
              </Group>
              <Button
                variant="light"
                color={report.color}
                leftSection={<IconDownload size={16} />}
                fullWidth
                onClick={() => handleDownload(report.title)}
              >
                Download PDF
              </Button>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
