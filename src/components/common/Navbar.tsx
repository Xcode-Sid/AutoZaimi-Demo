import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Group,
  Button,
  Text,
  Menu,
  Avatar,
  Indicator,
  Burger,
  Drawer,
  Stack,
  Divider,
  Box,
  ActionIcon,
  UnstyledButton,
  TextInput,
  Transition,
} from '@mantine/core';
import {
  IconUser,
  IconHeart,
  IconCalendar,
  IconSettings,
  IconLogout,
  IconBell,
  IconSearch,
  IconShieldCheck,
  IconCar,
  IconX,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { t } = useTranslation();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const navLinks = [
    { label: t('nav.home'), path: '/', hash: '' },
    { label: t('nav.fleet'), path: '/fleet', hash: '' },
    { label: t('nav.about'), path: '/', hash: 'about' },
    { label: t('nav.contact'), path: '/', hash: 'contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = (link: { path: string; hash: string }) => {
    if (link.hash) {
      if (location.pathname === '/') {
        const el = document.getElementById(link.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      navigate(`/${link.hash ? '#' + link.hash : ''}`);
    } else {
      navigate(link.path);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Box
      className={`nav-bar ${scrolled ? 'nav-bar-scrolled' : ''}`}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <Group justify="space-between" h={70} px="xl" maw={1400} mx="auto">
        <UnstyledButton component={Link} to="/">
          <Group gap={8}>
            <IconCar size={32} className="nav-logo-icon" color="var(--mantine-color-teal-6)" />
            <Text
              size="xl"
              fw={800}
              className="text-gradient"
              style={{ letterSpacing: '-0.5px', transition: 'all 0.3s' }}
            >
              AutoZaimi
            </Text>
          </Group>
        </UnstyledButton>

        <Group gap="xl" visibleFrom="md">
          {navLinks.map((link) => {
            const linkActive = !link.hash && isActive(link.path);
            return (
              <UnstyledButton
                key={link.path + link.hash}
                onClick={() => handleNavClick(link)}
                className={`nav-link-animated ${linkActive ? 'active' : ''}`}
              >
                <Text
                  size="sm"
                  fw={linkActive ? 600 : 400}
                  c={linkActive ? 'teal' : undefined}
                  style={{ transition: 'color 0.2s, font-weight 0.2s' }}
                >
                  {link.label}
                </Text>
              </UnstyledButton>
            );
          })}
        </Group>

        <Group gap="xs">
          {/* Expandable search */}
          <Group gap={0} visibleFrom="sm" style={{ position: 'relative' }}>
            <Transition mounted={searchOpen} transition="scale-x" duration={250}>
              {(styles) => (
                <TextInput
                  ref={searchRef}
                  placeholder={t('nav.search') + '...'}
                  size="sm"
                  radius="xl"
                  style={{ ...styles, width: 220, marginRight: 4 }}
                  rightSection={
                    <ActionIcon variant="subtle" size="sm" onClick={() => setSearchOpen(false)}>
                      <IconX size={14} />
                    </ActionIcon>
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setSearchOpen(false);
                    if (e.key === 'Enter') {
                      setSearchOpen(false);
                      navigate('/fleet');
                    }
                  }}
                />
              )}
            </Transition>
            {!searchOpen && (
              <ActionIcon
                variant="subtle"
                size="lg"
                aria-label={t('nav.search')}
                onClick={() => setSearchOpen(true)}
                style={{ transition: 'all 0.2s' }}
              >
                <IconSearch size={20} />
              </ActionIcon>
            )}
          </Group>

          <LanguageSwitcher />
          <ThemeToggle />

          {isLoggedIn && (
            <Indicator color="red" size={8} offset={4} processing>
              <ActionIcon
                variant="subtle"
                size="lg"
                aria-label="Notifications"
                className="animate-float"
                style={{ animationDuration: '4s' }}
              >
                <IconBell size={20} />
              </ActionIcon>
            </Indicator>
          )}

          {isLoggedIn ? (
            <Menu shadow="lg" width={220} position="bottom-end">
              <Menu.Target>
                <Avatar
                  radius="xl"
                  size="md"
                  color="teal"
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    border: '2px solid transparent',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--mantine-color-teal-6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
                >
                  {user?.avatar}
                </Avatar>
              </Menu.Target>
              <Menu.Dropdown className="animate-scale-in">
                <Menu.Label>
                  {user?.firstName} {user?.lastName}
                </Menu.Label>
                <Menu.Item leftSection={<IconUser size={16} />} onClick={() => navigate('/account/profile')}>
                  {t('nav.profile')}
                </Menu.Item>
                <Menu.Item leftSection={<IconHeart size={16} />} onClick={() => navigate('/account/saved')}>
                  {t('nav.savedCars')}
                </Menu.Item>
                <Menu.Item leftSection={<IconCalendar size={16} />} onClick={() => navigate('/account/bookings')}>
                  {t('nav.myBookings')}
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={16} />} onClick={() => navigate('/account/settings')}>
                  {t('nav.settings')}
                </Menu.Item>
                {isAdmin && (
                  <>
                    <Menu.Divider />
                    <Menu.Item
                      leftSection={<IconShieldCheck size={16} />}
                      onClick={() => navigate('/admin')}
                      color="teal"
                    >
                      {t('nav.adminPanel')}
                    </Menu.Item>
                  </>
                )}
                <Menu.Divider />
                <Menu.Item leftSection={<IconLogout size={16} />} onClick={handleLogout} color="red">
                  {t('nav.logout')}
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Group gap="xs" visibleFrom="sm">
              <Button
                variant="subtle"
                size="sm"
                onClick={() => navigate('/login')}
                style={{ transition: 'all 0.2s' }}
              >
                {t('nav.login')}
              </Button>
              <Button
                variant="gradient"
                gradient={{ from: 'purple', to: 'teal' }}
                size="sm"
                onClick={() => navigate('/register')}
                className="animate-shimmer"
              >
                {t('nav.register')}
              </Button>
            </Group>
          )}

          <Burger
            opened={drawerOpen}
            onClick={() => setDrawerOpen(!drawerOpen)}
            hiddenFrom="md"
            size="sm"
          />
        </Group>
      </Group>

      <Drawer
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        size="xs"
        title={
          <Group gap={8}>
            <IconCar size={24} color="var(--mantine-color-teal-6)" />
            <Text fw={700} className="text-gradient">AutoZaimi</Text>
          </Group>
        }
        padding="md"
      >
        <Stack gap="sm">
          {/* Search in mobile drawer */}
          <TextInput
            placeholder={t('nav.search') + '...'}
            leftSection={<IconSearch size={16} />}
            radius="md"
            size="sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setDrawerOpen(false);
                navigate('/fleet');
              }
            }}
          />
          <Divider my={4} />
          {navLinks.map((link, i) => (
            <Button
              key={link.path + link.hash}
              variant={!link.hash && isActive(link.path) ? 'light' : 'subtle'}
              fullWidth
              justify="start"
              onClick={() => { handleNavClick(link); setDrawerOpen(false); }}
              className="drawer-stagger-item"
              style={{ '--stagger-delay': `${i * 0.06}s` } as React.CSSProperties}
            >
              {link.label}
            </Button>
          ))}
          <Divider my="sm" />
          {isLoggedIn ? (
            <>
              <Button
                variant="subtle"
                fullWidth
                justify="start"
                leftSection={<IconUser size={16} />}
                onClick={() => { navigate('/account/profile'); setDrawerOpen(false); }}
                className="drawer-stagger-item"
                style={{ '--stagger-delay': '0.28s' } as React.CSSProperties}
              >
                {t('nav.profile')}
              </Button>
              <Button
                variant="subtle"
                fullWidth
                justify="start"
                leftSection={<IconHeart size={16} />}
                onClick={() => { navigate('/account/saved'); setDrawerOpen(false); }}
                className="drawer-stagger-item"
                style={{ '--stagger-delay': '0.34s' } as React.CSSProperties}
              >
                {t('nav.savedCars')}
              </Button>
              <Button
                variant="subtle"
                fullWidth
                justify="start"
                leftSection={<IconCalendar size={16} />}
                onClick={() => { navigate('/account/bookings'); setDrawerOpen(false); }}
                className="drawer-stagger-item"
                style={{ '--stagger-delay': '0.4s' } as React.CSSProperties}
              >
                {t('nav.myBookings')}
              </Button>
              {isAdmin && (
                <Button
                  variant="light"
                  color="teal"
                  fullWidth
                  justify="start"
                  leftSection={<IconShieldCheck size={16} />}
                  onClick={() => { navigate('/admin'); setDrawerOpen(false); }}
                  className="drawer-stagger-item"
                  style={{ '--stagger-delay': '0.46s' } as React.CSSProperties}
                >
                  {t('nav.adminPanel')}
                </Button>
              )}
              <Button
                variant="subtle"
                color="red"
                fullWidth
                justify="start"
                leftSection={<IconLogout size={16} />}
                onClick={() => { handleLogout(); setDrawerOpen(false); }}
                className="drawer-stagger-item"
                style={{ '--stagger-delay': '0.52s' } as React.CSSProperties}
              >
                {t('nav.logout')}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="subtle"
                fullWidth
                onClick={() => { navigate('/login'); setDrawerOpen(false); }}
                className="drawer-stagger-item"
                style={{ '--stagger-delay': '0.28s' } as React.CSSProperties}
              >
                {t('nav.login')}
              </Button>
              <Button
                variant="gradient"
                gradient={{ from: 'purple', to: 'teal' }}
                fullWidth
                onClick={() => { navigate('/register'); setDrawerOpen(false); }}
                className="animate-shimmer drawer-stagger-item"
                style={{ '--stagger-delay': '0.34s' } as React.CSSProperties}
              >
                {t('nav.register')}
              </Button>
            </>
          )}
        </Stack>
      </Drawer>
    </Box>
  );
}
