import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppShell,
  NavLink,
  Stack,
  Text,
  Group,
  Avatar,
  Badge,
  Button,
  Burger,
  Box,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconDashboard,
  IconCar,
  IconCalendar,
  IconUsers,
  IconSettings,
  IconChartBar,
  IconFileText,
  IconLogout,
  IconAd,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { path: '/admin', icon: IconDashboard, labelKey: 'admin.dashboard', badge: null },
  { path: '/admin/cars', icon: IconCar, labelKey: 'admin.cars', badge: null },
  { path: '/admin/bookings', icon: IconCalendar, labelKey: 'admin.bookings', badge: '3' },
  { path: '/admin/customers', icon: IconUsers, labelKey: 'admin.customers', badge: null },
  { path: '/admin/settings', icon: IconSettings, labelKey: 'admin.settings', badge: null },
  { path: '/admin/analytics', icon: IconChartBar, labelKey: 'admin.analytics', badge: null },
  { path: '/admin/ads', icon: IconAd, labelKey: 'admin.ads', badge: null },
  { path: '/admin/reports', icon: IconFileText, labelKey: 'admin.reports', badge: null },
];

export function AdminLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [opened, setOpened] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: 'md',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Navbar
        p="md"
        style={{
          background: isDark ? 'var(--mantine-color-dark-7)' : '#F8FAFC',
          borderRight: isDark
            ? '1px solid var(--mantine-color-dark-5)'
            : '1px solid #E2E8F0',
        }}
      >
        <AppShell.Section>
          <Group justify="space-between" mb="md">
            <Group gap={8}>
              <Text fw={800} size="lg" c="teal">
                AutoZaimi
              </Text>
              <Badge color="teal" size="sm" variant="filled">
                Admin
              </Badge>
            </Group>
            <Burger
              opened={opened}
              onClick={() => setOpened(false)}
              hiddenFrom="md"
              size="sm"
            />
          </Group>
        </AppShell.Section>

        <AppShell.Section grow>
          <Stack gap={4}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                label={
                  <Group justify="space-between">
                    <Text size="sm">{t(item.labelKey)}</Text>
                    {item.badge && (
                      <Badge color="red" size="xs" variant="filled" circle>
                        {item.badge}
                      </Badge>
                    )}
                  </Group>
                }
                leftSection={<item.icon size={20} />}
                active={
                  item.path === '/admin'
                    ? location.pathname === '/admin'
                    : location.pathname.startsWith(item.path)
                }
                onClick={() => {
                  navigate(item.path);
                  setOpened(false);
                }}
                style={{ borderRadius: 'var(--mantine-radius-md)' }}
                color="teal"
              />
            ))}
          </Stack>
        </AppShell.Section>

        <AppShell.Section>
          <Box
            className="glass-card"
            p="sm"
            style={{ borderRadius: 'var(--mantine-radius-md)' }}
          >
            <Group>
              <Avatar color="teal" radius="xl">
                {user?.avatar}
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text size="sm" fw={600}>
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text size="xs" c="dimmed">
                  Administrator
                </Text>
              </div>
            </Group>
          </Box>
          <Button
            variant="subtle"
            color="gray"
            fullWidth
            mt="sm"
            leftSection={<IconLogout size={16} />}
            onClick={() => navigate('/')}
          >
            {t('admin.exitAdmin')}
          </Button>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box hiddenFrom="md" mb="md">
          <Burger opened={opened} onClick={() => setOpened(true)} size="sm" />
        </Box>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
