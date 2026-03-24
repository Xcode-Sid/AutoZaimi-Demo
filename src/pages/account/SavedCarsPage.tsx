import { Title, SimpleGrid, Stack } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../contexts/FavoritesContext';
import { vehicles } from '../../data/vehicles';
import { VehicleCard } from '../../components/common/VehicleCard';
import { EmptyState } from '../../components/common/EmptyState';

export default function SavedCarsPage() {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const savedVehicles = vehicles.filter((v) => favorites.includes(v.id));

  return (
    <Stack gap="xl" className="animate-fade-in">
      <Title order={2} fw={700}>
        {t('account.savedCars')}
      </Title>

      {savedVehicles.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {savedVehicles.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </SimpleGrid>
      ) : (
        <EmptyState
          icon={<IconHeart size={40} />}
          title={t('account.noSavedCars')}
          actionLabel={t('account.browsFleet')}
          actionPath="/fleet"
        />
      )}
    </Stack>
  );
}
