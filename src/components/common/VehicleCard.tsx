import { useNavigate } from 'react-router-dom';
import { Card, Image, Text, Group, Badge, Button, ActionIcon, Stack, Box, Divider } from '@mantine/core';
import { IconHeart, IconHeartFilled, IconMapPin, IconUsers, IconManualGearbox, IconGasStation, IconStarFilled } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../../contexts/FavoritesContext';
import type { Vehicle } from '../../data/vehicles';

const categoryColors: Record<string, string> = {
  Luksoze: 'yellow',
  SUV: 'green',
  Elektrike: 'blue',
  Ekonomike: 'gray',
};

const statusDotClass: Record<string, string> = {
  available: 'status-dot-available',
  maintenance: 'status-dot-maintenance',
  unavailable: 'status-dot-unavailable',
};

interface Props {
  vehicle: Vehicle;
  index?: number;
}

export function VehicleCard({ vehicle, index = 0 }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(vehicle.id);

  return (
    <Card
      className="glass-card glass-card-hover animate-stagger-up"
      radius="lg"
      padding={0}
      style={{
        overflow: 'hidden',
        position: 'relative',
        '--stagger-delay': `${index * 0.1}s`,
        cursor: 'pointer',
      } as React.CSSProperties}
      onClick={() => navigate(`/fleet/${vehicle.id}`)}
    >
      {/* Image section */}
      <Box style={{ position: 'relative' }}>
        <Box className="card-image-zoom">
          <Image
            src={vehicle.image}
            h={210}
            alt={vehicle.name}
            fallbackSrc="https://placehold.co/800x400?text=AutoZaimi"
          />
        </Box>

        {/* Floating price badge */}
        <div className="price-badge-float">
          €{vehicle.price}/{t('vehicle.perDay')}
        </div>

        {/* Favorite button */}
        <ActionIcon
          variant={fav ? 'filled' : 'default'}
          color={fav ? 'red' : undefined}
          radius="xl"
          size="lg"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 4,
            backdropFilter: 'blur(8px)',
            background: fav ? undefined : 'rgba(0,0,0,0.25)',
            border: fav ? undefined : '1px solid rgba(255,255,255,0.12)',
          }}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(vehicle.id);
          }}
        >
          {fav ? <IconHeartFilled size={18} /> : <IconHeart size={18} color="#fff" />}
        </ActionIcon>

        {/* Status dot + category badge overlay */}
        <Box style={{ position: 'absolute', top: 12, left: 12, zIndex: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className={`status-dot ${statusDotClass[vehicle.status] || 'status-dot-available'}`} />
          <Badge
            color={categoryColors[vehicle.category]}
            variant="filled"
            size="sm"
            style={{ backdropFilter: 'blur(4px)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            {vehicle.category}
          </Badge>
        </Box>

        {/* Rating overlay */}
        <Box style={{ position: 'absolute', bottom: 12, left: 12, zIndex: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
          <IconStarFilled size={13} color="#F5B544" />
          <Text size="xs" fw={700} c="white" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.4)' }}>
            4.{8 - (index % 3)}
          </Text>
        </Box>
      </Box>

      {/* Card body */}
      <Stack gap="sm" p="md" pt="sm">
        <div>
          <Text fw={700} size="md" lineClamp={1}>
            {vehicle.name}
          </Text>
          <Group gap={6} mt={2}>
            <IconMapPin size={13} color="var(--mantine-color-teal-6)" />
            <Text size="xs" c="dimmed">{vehicle.city}</Text>
            <Text size="xs" c="dimmed">·</Text>
            <Text size="xs" c="dimmed">{vehicle.year}</Text>
          </Group>
        </div>

        <Divider
          style={{ opacity: 0.5 }}
          variant="dashed"
        />

        {/* Spec pills */}
        <Group gap={6} wrap="wrap">
          <span className="spec-pill">
            <IconUsers size={13} />
            {vehicle.specs.seats}
          </span>
          <span className="spec-pill">
            <IconManualGearbox size={13} />
            {vehicle.specs.transmission}
          </span>
          <span className="spec-pill">
            <IconGasStation size={13} />
            {vehicle.specs.fuel}
          </span>
        </Group>

        <Group grow mt={4}>
          <Button
            variant="outline"
            color="gray"
            size="xs"
            radius="md"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/fleet/${vehicle.id}`);
            }}
            style={{ transition: 'all 0.2s' }}
          >
            {t('account.viewDetails')}
          </Button>
          <Button
            variant="filled"
            color="teal"
            size="xs"
            radius="md"
            className="btn-glow"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/fleet/${vehicle.id}`);
            }}
          >
            {t('vehicle.rentNow')}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
}
