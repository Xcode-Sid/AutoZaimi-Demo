import { Container, Title, Text, Stack, Avatar, Rating, Paper, Box, Group } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconQuote } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { testimonials } from '../../data/testimonials';

export function TestimonialsCarousel() {
  const { t } = useTranslation();

  return (
    <Box py={80} style={{ position: 'relative' }}>
      {/* Subtle background pattern */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />
      <Container size="lg" style={{ position: 'relative' }}>
        <Stack align="center" gap="sm" mb={40} className="animate-slide-up">
          <div className="section-label">
            <IconQuote size={14} />
            {t('testimonials.title')}
          </div>
          <Title order={2} ta="center" fw={800}>
            {t('testimonials.title')}
          </Title>
          <Text c="dimmed" ta="center" maw={500}>
            {t('testimonials.subtitle')}
          </Text>
        </Stack>

        <Carousel
          slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
          slideGap="lg"
          withIndicators
        >
          {testimonials.map((item) => (
            <Carousel.Slide key={item.id}>
              <Paper
                className="glass-card glass-card-hover gradient-border-card quote-decoration"
                p="xl"
                radius="lg"
                h="100%"
                style={{ position: 'relative', overflow: 'visible' }}
              >
                <Stack gap="md" justify="space-between" h="100%">
                  <Text size="md" fs="italic" lineClamp={4} style={{ lineHeight: 1.7 }}>
                    "{item.quote}"
                  </Text>
                  <Stack gap="xs">
                    <Rating value={item.rating} readOnly size="sm" color="yellow" />
                    <Group gap="sm">
                      <Avatar
                        color="teal"
                        radius="xl"
                        size="md"
                        style={{ border: '2px solid var(--mantine-color-teal-6)' }}
                      >
                        {item.authorAvatar}
                      </Avatar>
                      <div>
                        <Text size="sm" fw={600}>{item.authorName}</Text>
                        <Text size="xs" c="dimmed">{item.city}</Text>
                      </div>
                    </Group>
                  </Stack>
                </Stack>
              </Paper>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
}
