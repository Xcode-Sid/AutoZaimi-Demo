import {
  Title,
  Table,
  Badge,
  Group,
  Text,
  Avatar,
  ActionIcon,
  Stack,
} from '@mantine/core';
import { IconEye, IconMail, IconBan } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const customers = [
  {
    id: 'C001',
    name: 'Artan Hoxha',
    avatar: 'AH',
    email: 'artan@email.com',
    phone: '+355 69 123 4567',
    bookings: 4,
    status: 'active',
  },
  {
    id: 'C002',
    name: 'Elona Kushi',
    avatar: 'EK',
    email: 'elona@email.com',
    phone: '+355 69 234 5678',
    bookings: 2,
    status: 'active',
  },
  {
    id: 'C003',
    name: 'Dritan Leka',
    avatar: 'DL',
    email: 'dritan@email.com',
    phone: '+355 69 345 6789',
    bookings: 3,
    status: 'active',
  },
  {
    id: 'C004',
    name: 'Blerina Topi',
    avatar: 'BT',
    email: 'blerina@email.com',
    phone: '+355 69 456 7890',
    bookings: 1,
    status: 'active',
  },
  {
    id: 'C005',
    name: 'Gentian Muka',
    avatar: 'GM',
    email: 'gentian@email.com',
    phone: '+355 69 567 8901',
    bookings: 2,
    status: 'inactive',
  },
];

export default function CustomersPage() {
  const { t } = useTranslation();

  return (
    <Stack gap="xl" className="animate-fade-in">
      <Title order={2} fw={700}>
        {t('admin.manageCustomers')}
      </Title>

      <Table.ScrollContainer minWidth={700}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t('admin.customerId')}</Table.Th>
              <Table.Th>{t('admin.fullName')}</Table.Th>
              <Table.Th>{t('admin.email')}</Table.Th>
              <Table.Th>{t('admin.phone')}</Table.Th>
              <Table.Th>{t('admin.totalBookings')}</Table.Th>
              <Table.Th>{t('admin.customerStatus')}</Table.Th>
              <Table.Th>{t('admin.carActions')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {customers.map((c) => (
              <Table.Tr key={c.id}>
                <Table.Td>
                  <Text size="sm" fw={500}>{c.id}</Text>
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar size="sm" radius="xl" color="purple">
                      {c.avatar}
                    </Avatar>
                    <Text size="sm">{c.name}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{c.email}</Text>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">{c.phone}</Text>
                </Table.Td>
                <Table.Td>
                  <Badge circle variant="light" color="purple">
                    {c.bookings}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Badge
                    color={c.status === 'active' ? 'green' : 'gray'}
                    variant="light"
                    size="sm"
                  >
                    {c.status === 'active' ? t('admin.active') : t('admin.inactive')}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Group gap={4}>
                    <ActionIcon variant="subtle" color="blue" size="sm">
                      <IconEye size={16} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="teal" size="sm">
                      <IconMail size={16} />
                    </ActionIcon>
                    <ActionIcon variant="subtle" color="red" size="sm">
                      <IconBan size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Stack>
  );
}
