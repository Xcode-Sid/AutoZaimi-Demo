import { useState, useEffect, useRef } from 'react';
import {
  Container,
  Title,
  Text,
  Group,
  Button,
  Select,
  Box,
  Stack,
  Badge,
  SimpleGrid,
  ThemeIcon,
  Paper,
  useMantineColorScheme,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconSearch, IconShieldCheck, IconHeadset, IconCircleCheck } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

  const locations = [
    { value: 'tirane', label: t('locations.tirane') },
    { value: 'durres', label: t('locations.durres') },
    { value: 'vlore', label: t('locations.vlore') },
    { value: 'sarande', label: t('locations.sarande') },
    { value: 'shkoder', label: t('locations.shkoder') },
  ];

  return (
    <Box
      py={{ base: 60, sm: 80, md: 100 }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background image */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
        }}
      />

      {/* Gradient overlay */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(135deg, rgba(13,17,23,0.95) 0%, rgba(22,27,34,0.88) 50%, rgba(13,17,23,0.95) 100%)'
            : 'linear-gradient(135deg, rgba(248,250,252,0.94) 0%, rgba(241,245,249,0.88) 50%, rgba(248,250,252,0.94) 100%)',
          pointerEvents: 'none',
        }}
      />

      <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
        <Stack align="center" gap="xl" className="animate-slide-up">
          {/* Label */}
          <div className="section-label">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--az-teal)', boxShadow: '0 0 8px var(--az-teal)' }} />
            {t('hero.subtitle')}
          </div>

          <Title
            ta="center"
            fw={900}
            style={{ fontSize: 'clamp(2rem, 6vw, 4.2rem)', lineHeight: 1.08 }}
          >
            <Text
              component="span"
              inherit
              c="teal"
            >
              {t('hero.title')}
            </Text>
          </Title>

          <Text
            ta="center"
            c="dimmed"
            size="lg"
            maw={550}
          >
            {t('featured.subtitle')}
          </Text>

          {/* Search Card with animated gradient border */}
          <Box
            className="glass-card animate-scale-in"
            p={{ base: 'lg', sm: 'xl' }}
            w="100%"
            maw={720}
            style={{
              borderRadius: 'var(--mantine-radius-xl)',
              boxShadow: isDark
                ? '0 24px 64px rgba(0,0,0,0.25)'
                : '0 16px 48px rgba(0,0,0,0.08)',
              border: 'none',
            }}
          >
            <Stack gap="lg">
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <DatePickerInput
                  type="range"
                  label={t('hero.pickupDate')}
                  placeholder={`${t('hero.pickupDate')} — ${t('hero.returnDate')}`}
                  value={dateRange}
                  onChange={setDateRange}
                  minDate={new Date().toISOString().split('T')[0]}
                  radius="lg"
                  size="md"
                />
                <Select
                  label={t('hero.pickupLocation')}
                  placeholder={t('hero.pickupLocation')}
                  data={locations}
                  radius="lg"
                  size="md"
                />
              </SimpleGrid>

              <Button
                size="lg"
                fullWidth
                variant="filled"
                color="teal"
                leftSection={<IconSearch size={20} />}
                onClick={() => navigate('/fleet')}
                className="btn-glow"
                radius="xl"
              >
                {t('hero.searchBtn')}
              </Button>
            </Stack>
          </Box>

          {/* Stats counter row */}
          <SimpleGrid cols={{ base: 1, xs: 3 }} spacing="md" mt="lg" w="100%" maw={650}>
            {[
              { target: 500, suffix: '+', label: t('hero.stats.cars'), color: 'teal' },
              { target: 10000, suffix: '+', label: t('hero.stats.clients'), color: 'purple' },
              { target: 50, suffix: '+', label: t('hero.stats.cities'), color: 'magenta' },
            ].map((stat, i) => (
              <Paper
                key={stat.label}
                className="glass-card animate-stagger-up"
                p="lg"
                radius="lg"
                ta="center"
                style={{ '--stagger-delay': `${0.6 + i * 0.12}s` } as React.CSSProperties}
              >
                <Text style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }} fw={900} c={stat.color}>
                  <CountUp target={stat.target} suffix={stat.suffix} />
                </Text>
                <Text size="xs" c="dimmed" mt={2} tt="uppercase" fw={600} style={{ letterSpacing: '0.05em' }}>
                  {stat.label}
                </Text>
              </Paper>
            ))}
          </SimpleGrid>

          {/* Trust badges */}
          <Group gap={{ base: 'sm', sm: 'md' }} mt="md" justify="center" wrap="wrap">
            {[
              { label: t('hero.trust.bestPrice'), icon: IconShieldCheck, color: 'green' as const },
              { label: t('hero.trust.support'), icon: IconHeadset, color: 'blue' as const },
              { label: t('hero.trust.verified'), icon: IconCircleCheck, color: 'purple' as const },
            ].map((badge) => (
              <Badge
                key={badge.label}
                size="lg"
                variant="light"
                color={badge.color}
                leftSection={<ThemeIcon size={18} color={badge.color} variant="transparent"><badge.icon size={16} /></ThemeIcon>}
                style={{ padding: '0.6rem 1.2rem', transition: 'all 0.3s', cursor: 'default' }}
              >
                {badge.label}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
