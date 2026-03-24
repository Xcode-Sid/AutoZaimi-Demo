import { Container, Title, Text, SimpleGrid, Stack, Box, Button, Group } from '@mantine/core';
import { IconArrowRight, IconStarFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { vehicles } from '../../data/vehicles';
import { VehicleCard } from '../common/VehicleCard';

export function FeaturedVehicles() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const featured = vehicles.filter((v) => v.isFeatured).slice(0, 4);

  return (
    <Box py={80} style={{ position: 'relative' }}>
      <Container size="xl" style={{ position: 'relative' }}>
        <Stack align="center" gap="sm" mb={40} className="animate-slide-up">
          <div className="section-label">
            <IconStarFilled size={12} />
            {t('featured.title')}
          </div>
          <Title order={2} ta="center" fw={800}>
            {t('featured.title')}
          </Title>
          <Text c="dimmed" ta="center" maw={500}>
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
            variant="filled"
            color="teal"
            size="md"
            rightSection={<IconArrowRight size={16} />}
            onClick={() => navigate('/fleet')}
            radius="xl"
            className="btn-glow"
          >
            {t('fleet.title')}
          </Button>
        </Group>
      </Container>
    </Box>
  );
}
