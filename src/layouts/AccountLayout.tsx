import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppShell, Box, Container, NavLink, Stack, Group, Tabs, ScrollArea } from '@mantine/core';
import { IconUser, IconHeart, IconCalendar, IconSettings } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

const navItems = [
  { path: '/account/profile', icon: IconUser, labelKey: 'account.profile' },
  { path: '/account/saved', icon: IconHeart, labelKey: 'account.savedCars' },
  { path: '/account/bookings', icon: IconCalendar, labelKey: 'account.myBookings' },
  { path: '/account/settings', icon: IconSettings, labelKey: 'account.settings' },
];

export function AccountLayout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppShell header={{ height: 70 }}>
      <AppShell.Header>
        <Navbar />
      </AppShell.Header>
      <AppShell.Main>
        <Container size="xl" py="xl">
          {/* Mobile tabs with horizontal scroll */}
          <Box hiddenFrom="md" mb="xl">
            <ScrollArea type="auto" offsetScrollbars>
              <Tabs
                value={location.pathname}
                onChange={(v) => v && navigate(v)}
              >
                <Tabs.List style={{ flexWrap: 'nowrap' }}>
                  {navItems.map((item) => (
                    <Tabs.Tab
                      key={item.path}
                      value={item.path}
                      leftSection={<item.icon size={16} />}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {t(item.labelKey)}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs>
            </ScrollArea>
          </Box>

          <Group align="flex-start" gap="xl" wrap="nowrap">
            {/* Desktop sidebar */}
            <Box
              visibleFrom="md"
              w={260}
              className="glass-card"
              p="md"
              style={{ borderRadius: 'var(--mantine-radius-lg)', flexShrink: 0 }}
            >
              <Stack gap={4}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    label={t(item.labelKey)}
                    leftSection={<item.icon size={18} />}
                    active={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                    style={{ borderRadius: 'var(--mantine-radius-md)' }}
                  />
                ))}
              </Stack>
            </Box>

            <Box style={{ flex: 1, minWidth: 0 }}>
              <Outlet />
            </Box>
          </Group>
        </Container>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
