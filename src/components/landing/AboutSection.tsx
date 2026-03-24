import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Stack,
  ThemeIcon,
  Box,
  Paper,
  Group,
  useMantineColorScheme,
} from '@mantine/core';
import {
  IconCar,
  IconCoin,
  IconHeadset,
  IconDeviceLaptop,
  IconTargetArrow,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const reasons = [
  { icon: IconCar, titleKey: 'about.reason1Title', descKey: 'about.reason1Desc', color: 'teal' },
  { icon: IconCoin, titleKey: 'about.reason2Title', descKey: 'about.reason2Desc', color: 'purple' },
  { icon: IconHeadset, titleKey: 'about.reason3Title', descKey: 'about.reason3Desc', color: 'blue' },
  { icon: IconDeviceLaptop, titleKey: 'about.reason4Title', descKey: 'about.reason4Desc', color: 'orange' },
];

export function AboutSection() {
  const { t } = useTranslation();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Box id="about" py={80} style={{ position: 'relative', scrollMarginTop: 80 }}>
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(180deg, transparent 0%, rgba(101,53,160,0.03) 50%, transparent 100%)'
            : '#ffffff',
          pointerEvents: 'none',
        }}
      />
      <Container size="lg" style={{ position: 'relative' }}>
        <Stack align="center" gap="xs" mb={50} className="animate-slide-up">
          <Title order={2} ta="center" fw={800} style={!isDark ? { color: '#1a1b1e' } : undefined}>
            {t('about.title')}
          </Title>
          <Text
            ta="center"
            maw={600}
            size="lg"
            c={isDark ? 'dimmed' : undefined}
            style={!isDark ? { color: '#868e96' } : undefined}
          >
            {t('about.subtitle')}
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" mb={50}>
          {/* Description */}
          <Stack gap="lg">
            <Text
              size="md"
              style={{
                lineHeight: 1.8,
                ...(!isDark && { color: '#868e96' }),
              }}
              c={isDark ? 'dimmed' : undefined}
            >
              {t('about.description')}
            </Text>

            <Paper
              className="glass-card"
              p="lg"
              radius="lg"
              style={{
                ...(!isDark && {
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }),
              }}
            >
              <Group gap="md" align="flex-start">
                <ThemeIcon size={48} radius="xl" variant="filled" color="teal">
                  <IconTargetArrow size={24} />
                </ThemeIcon>
                <Stack gap={4} style={{ flex: 1 }}>
                  <Text fw={700} size="lg" style={!isDark ? { color: '#1a1b1e' } : undefined}>
                    {t('about.mission')}
                  </Text>
                  <Text
                    size="sm"
                    c={isDark ? 'dimmed' : undefined}
                    style={!isDark ? { color: '#868e96' } : undefined}
                  >
                    {t('about.missionText')}
                  </Text>
                </Stack>
              </Group>
            </Paper>
          </Stack>

          {/* Stats grid */}
          <SimpleGrid cols={2} spacing="md">
            {(['years', 'cars', 'cities', 'clients'] as const).map((key, i) => (
              <Paper
                key={key}
                className="glass-card glass-card-hover animate-stagger-up"
                p="xl"
                radius="lg"
                ta="center"
                style={{
                  '--stagger-delay': `${i * 0.1}s`,
                  ...(!isDark && {
                    background: '#ffffff',
                    border: '1px solid #e9ecef',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  }),
                } as React.CSSProperties}
              >
                <Text size="2rem" fw={900} className="text-gradient">
                  {t(`about.stats.${key}Value`)}
                </Text>
                <Text
                  size="sm"
                  mt={4}
                  c={isDark ? 'dimmed' : undefined}
                  style={!isDark ? { color: '#868e96' } : undefined}
                >
                  {t(`about.stats.${key}Title`)}
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
        </SimpleGrid>

        {/* Why us */}
        <Stack align="center" gap="xs" mb="xl">
          <Title order={3} ta="center" fw={700} style={!isDark ? { color: '#1a1b1e' } : undefined}>
            {t('about.whyUs')}
          </Title>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {reasons.map((reason, i) => (
            <Paper
              key={reason.titleKey}
              className="glass-card glass-card-hover animate-stagger-up"
              p="xl"
              radius="lg"
              ta="center"
              style={{
                '--stagger-delay': `${i * 0.1}s`,
                ...(!isDark && {
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                }),
              } as React.CSSProperties}
            >
              <ThemeIcon
                size={56}
                radius="xl"
                variant="light"
                color={reason.color}
                mx="auto"
                mb="md"
              >
                <reason.icon size={28} />
              </ThemeIcon>
              <Text fw={700} mb={4} style={!isDark ? { color: '#1a1b1e' } : undefined}>
                {t(reason.titleKey)}
              </Text>
              <Text
                size="sm"
                c={isDark ? 'dimmed' : undefined}
                style={!isDark ? { color: '#868e96' } : undefined}
              >
                {t(reason.descKey)}
              </Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}