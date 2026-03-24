import { Container, Title, Text, SimpleGrid, Stack, ThemeIcon, Box } from '@mantine/core';
import { IconCar, IconCalendarEvent, IconKey } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

const steps = [
  { icon: IconCar, titleKey: 'howItWorks.step1Title', descKey: 'howItWorks.step1Desc', color: 'purple' },
  { icon: IconCalendarEvent, titleKey: 'howItWorks.step2Title', descKey: 'howItWorks.step2Desc', color: 'teal' },
  { icon: IconKey, titleKey: 'howItWorks.step3Title', descKey: 'howItWorks.step3Desc', color: 'magenta' },
];

export function HowItWorks() {
  const { t } = useTranslation();

  return (
    <Box py={80} style={{ position: 'relative' }}>
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, transparent 0%, rgba(101,53,160,0.03) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <Container size="lg" style={{ position: 'relative' }}>
        <Stack align="center" gap="sm" mb={40}>
          <div className="section-label">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--az-purple)', boxShadow: '0 0 8px var(--az-purple)' }} />
            {t('howItWorks.title')}
          </div>
          <Title order={2} ta="center" fw={800} className="animate-slide-up">
            {t('howItWorks.title')}
          </Title>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
          {steps.map((step, i) => (
            <Stack
              key={i}
              align="center"
              gap="md"
              className={`glass-card glass-card-hover gradient-border-card animate-stagger-up ${i < steps.length - 1 ? 'step-connector' : ''}`}
              p="xl"
              style={{
                borderRadius: 'var(--mantine-radius-xl)',
                '--stagger-delay': `${i * 0.15}s`,
                position: 'relative',
              } as React.CSSProperties}
            >
              {/* Step number */}
              <div className="step-number">{i + 1}</div>

              <ThemeIcon
                size={72}
                radius="xl"
                variant="gradient"
                gradient={{
                  from: step.color === 'purple' ? 'purple' : step.color === 'teal' ? 'teal' : 'magenta',
                  to: step.color === 'purple' ? 'magenta' : step.color === 'teal' ? 'purple' : 'teal',
                }}
                className="animate-float"
                style={{ animationDelay: `${i * 0.3}s`, boxShadow: `0 8px 30px rgba(0,191,165,0.2)` }}
              >
                <step.icon size={36} />
              </ThemeIcon>
              <Text size="xl" fw={700} ta="center">
                {t(step.titleKey)}
              </Text>
              <Text c="dimmed" ta="center" size="sm">
                {t(step.descKey)}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
