import { Container, Title, Text, SimpleGrid, Stack, Box, Button, Group, useMantineColorScheme } from '@mantine/core';
import { IconArrowRight, IconStarFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { vehicles } from '../../data/vehicles';
import { VehicleCard } from '../common/VehicleCard';

export function FeaturedVehicles() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const featured = vehicles.filter((v) => v.isFeatured).slice(0, 4);

  return (
    <Box py={80} style={{ position: 'relative' }}>
      {/* Section gradient bg */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(180deg, transparent 0%, rgba(0,191,165,0.03) 50%, transparent 100%)'
            : '#ffffff',
          pointerEvents: 'none',
        }}
      />
      <Container size="xl" style={{ position: 'relative' }}>
        <Stack align="center" gap="sm" mb={40} className="animate-slide-up">
          <div className="section-label">
            <IconStarFilled size={12} />
            {t('featured.title')}
          </div>
          <Title
            order={2}
            ta="center"
            fw={800}
            style={!isDark ? { color: '#1a1b1e' } : undefined}
          >
            {t('featured.title')}
          </Title>
          <Text
            ta="center"
            maw={500}
            c={isDark ? 'dimmed' : undefined}
            style={!isDark ? { color: '#868e96' } : undefined}
          >
            {t('featured.subtitle')}
          </Text>
        </Stack>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
          {featured.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </SimpleGrid>

        <Group justify="center" mt={40}>
          <Button
            variant="gradient"
            gradient={{ from: 'teal.7', to: 'teal.5' }}
            size="md"
            rightSection={<IconArrowRight size={16} />}
            onClick={() => navigate('/fleet')}
            radius="xl"
            className="animate-shimmer btn-glow"
          >
            {t('fleet.title')}
          </Button>
        </Group>
      </Container>
    </Box>
  );
}