import { Title, Table, Badge, Group, Text, Image, Stack } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { useBookings } from '../../contexts/BookingsContext';
import { vehicles } from '../../data/vehicles';
import { EmptyState } from '../../components/common/EmptyState';

const statusColors: Record<string, string> = {
  confirmed: 'green',
  pending: 'yellow',
  completed: 'gray',
  cancelled: 'red',
};

const statusKeys: Record<string, string> = {
  confirmed: 'account.confirmed',
  pending: 'account.pending',
  completed: 'account.completed',
  cancelled: 'account.cancelled',
};

export default function BookingsPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { getUserBookings } = useBookings();

  const userBookings = user ? getUserBookings(user.id) : [];

  return (
    <Stack gap="xl" className="animate-fade-in">
      <Title order={2} fw={700}>
        {t('account.myBookings')}
      </Title>

      {userBookings.length > 0 ? (
        <Table.ScrollContainer minWidth={700}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t('account.bookingRef')}</Table.Th>
                <Table.Th>{t('account.vehicleName')}</Table.Th>
                <Table.Th>{t('account.bookingDates')}</Table.Th>
                <Table.Th>{t('account.amount')}</Table.Th>
                <Table.Th>{t('account.status')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {userBookings.map((b) => {
                const vehicle = vehicles.find((v) => v.id === b.vehicleId);
                return (
                  <Table.Tr key={b.id}>
                    <Table.Td>
                      <Text size="sm" fw={500}>{b.ref}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Group gap="sm">
                        {vehicle && (
                          <Image
                            src={vehicle.image}
                            w={40}
                            h={28}
                            radius="sm"
                            fit="cover"
                          />
                        )}
                        <Text size="sm">{b.vehicleName}</Text>
                      </Group>
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
                      <Badge color={statusColors[b.status]} variant="light" size="sm">
                        {t(statusKeys[b.status])}
                      </Badge>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      ) : (
        <EmptyState
          icon={<IconCalendar size={40} />}
          title={t('account.noBookings')}
          actionLabel={t('account.bookNow')}
          actionPath="/fleet"
        />
      )}
    </Stack>
  );
}
