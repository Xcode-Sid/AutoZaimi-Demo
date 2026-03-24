import {
  Title,
  Table,
  Badge,
  Group,
  Text,
  Avatar,
  Select,
  Stack,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useBookings } from '../../contexts/BookingsContext';

const statusColors: Record<string, string> = {
  confirmed: 'green',
  pending: 'yellow',
  completed: 'gray',
  cancelled: 'red',
};

const paymentLabels: Record<string, string> = {
  cash: 'Cash',
  card: 'Kartë',
};

export default function AdminBookingsPage() {
  const { t } = useTranslation();
  const { bookings, updateBookingStatus } = useBookings();

  return (
    <Stack gap="xl" className="animate-fade-in">
      <Title order={2} fw={700}>
        {t('admin.manageBookings')}
      </Title>

      <Table.ScrollContainer minWidth={900}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>{t('admin.customer')}</Table.Th>
              <Table.Th>{t('admin.vehicle')}</Table.Th>
              <Table.Th>{t('admin.paymentMethod')}</Table.Th>
              <Table.Th>{t('admin.dates')}</Table.Th>
              <Table.Th>{t('admin.total')}</Table.Th>
              <Table.Th>{t('admin.status')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {bookings.map((b) => (
              <Table.Tr key={b.id}>
                <Table.Td>
                  <Text size="sm" fw={500}>{b.ref}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar size="sm" radius="xl" color="purple">
                      {b.userId === 'user-1' ? 'AH' : '??'}
                    </Avatar>
                    <Text size="sm">
                      {b.userId === 'user-1' ? 'Artan Hoxha' : 'Guest'}
                    </Text>
                  </Group>
                </Table.Td>
                <Table.Td>{b.vehicleName}</Table.Td>
                <Table.Td>
                  <Badge variant="outline" size="sm">
                    {paymentLabels[b.paymentMethod] || b.paymentMethod}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">
                    {b.startDate}
                    {b.endDate ? ` — ${b.endDate}` : ''}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm" fw={600}>€{b.total.toLocaleString()}</Text>
                </Table.Td>
                <Table.Td>
                  <Select
                    size="xs"
                    w={140}
                    value={b.status}
                    onChange={(v) => v && updateBookingStatus(b.id, v as typeof b.status)}
                    data={[
                      { value: 'confirmed', label: t('account.confirmed') },
                      { value: 'pending', label: t('account.pending') },
                      { value: 'completed', label: t('account.completed') },
                      { value: 'cancelled', label: t('account.cancelled') },
                    ]}
                    styles={{
                      input: {
                        backgroundColor: `var(--mantine-color-${statusColors[b.status]}-light)`,
                        color: `var(--mantine-color-${statusColors[b.status]}-light-color)`,
                      },
                    }}
                  />
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  );
}
