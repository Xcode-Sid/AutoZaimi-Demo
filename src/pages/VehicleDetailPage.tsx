import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  Button,
  Tabs,
  Table,
  Rating,
  Avatar,
  Textarea,
  Progress,
  ActionIcon,
  Tooltip,
  Box,
  Divider,
  Breadcrumbs,
  Anchor,
  SimpleGrid,
} from '@mantine/core';
import {
  IconShieldCheck,
  IconArrowBack,
  IconCopy,
  IconBrandWhatsapp,
  IconThumbUp,
  IconThumbDown,
  IconChevronRight,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { notifications } from '@mantine/notifications';
import { vehicles } from '../data/vehicles';
import { reviews as allReviews } from '../data/reviews';
import { ImageGallery } from '../components/vehicle/ImageGallery';
import { RentalBookingModal } from '../components/vehicle/RentalBookingModal';
import { VehicleCard } from '../components/common/VehicleCard';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const vehicle = vehicles.find((v) => v.id === Number(id));
  const vehicleReviews = allReviews.filter((r) => r.vehicleId === Number(id));

  const [rentalOpen, setRentalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  if (!vehicle) {
    return (
      <Container size="lg" py="xl">
        <Text>{t('common.error')}</Text>
        <Button mt="md" onClick={() => navigate('/fleet')}>{t('common.back')}</Button>
      </Container>
    );
  }

  const avgRating =
    vehicleReviews.length > 0
      ? vehicleReviews.reduce((acc, r) => acc + r.rating, 0) / vehicleReviews.length
      : 0;

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: vehicleReviews.filter((r) => r.rating === star).length,
    pct: vehicleReviews.length ? (vehicleReviews.filter((r) => r.rating === star).length / vehicleReviews.length) * 100 : 0,
  }));

  const priceDisplay = `€${vehicle.price}/${t('vehicle.perDay')}`;

  const specRows = [
    [t('vehicle.brand'), vehicle.name.split(' ').slice(0, -1).join(' ')],
    [t('vehicle.model'), vehicle.name.split(' ').slice(-1)[0]],
    [t('vehicle.year'), vehicle.year],
    [t('vehicle.mileage'), vehicle.specs.mileage],
    [t('vehicle.engine'), vehicle.specs.engine],
    [t('vehicle.transmission'), vehicle.specs.transmission],
    [t('vehicle.fuel'), vehicle.specs.fuel],
    [t('vehicle.color'), vehicle.specs.color],
    [t('vehicle.seatsLabel'), vehicle.specs.seats],
    [t('vehicle.doors'), vehicle.specs.doors],
  ];

  const similarCars = vehicles
    .filter((v) => v.id !== vehicle.id && v.category === vehicle.category)
    .slice(0, 4);

  const handleReviewSubmit = () => {
    if (reviewRating && reviewText) {
      notifications.show({ message: t('vehicle.reviewSuccess'), color: 'teal' });
      setReviewRating(0);
      setReviewText('');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    notifications.show({ message: t('vehicle.linkCopied'), color: 'teal' });
  };

  return (
    <Container size="xl" py="xl">
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<IconChevronRight size={14} style={{ opacity: 0.5 }} />}
        mb="lg"
        className="animate-fade-in"
      >
        <Anchor component="button" size="sm" c="dimmed" onClick={() => navigate('/')}>
          {t('nav.home')}
        </Anchor>
        <Anchor component="button" size="sm" c="dimmed" onClick={() => navigate('/fleet')}>
          {t('nav.fleet')}
        </Anchor>
        <Text size="sm" fw={500}>{vehicle.name}</Text>
      </Breadcrumbs>

      <div
        style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '2rem', alignItems: 'start' }}
        className="vehicle-detail-grid"
      >
        <Stack gap="xl" style={{ minWidth: 0 }} className="animate-slide-up">
          <ImageGallery images={vehicle.images} name={vehicle.name} />

          <Group gap="sm" wrap="wrap">
            <Badge color="teal" size="lg">{t('fleet.forRent')}</Badge>
            <Badge variant="light" size="lg">{vehicle.category}</Badge>
            <Group gap={6}>
              <span className={`status-dot ${vehicle.status === 'available' ? 'status-dot-available' : vehicle.status === 'maintenance' ? 'status-dot-maintenance' : 'status-dot-unavailable'}`} />
              <Text size="xs" c="dimmed" tt="capitalize">{vehicle.status}</Text>
            </Group>
          </Group>

          <div>
            <Title order={1} fw={800}>{vehicle.name}</Title>
            <Text c="dimmed">{vehicle.year} · {vehicle.city}</Text>
          </div>

          <Tabs defaultValue="overview" color="teal">
            <Tabs.List>
              <Tabs.Tab value="overview">{t('vehicle.overview')}</Tabs.Tab>
              <Tabs.Tab value="specs">{t('vehicle.specifications')}</Tabs.Tab>
              <Tabs.Tab value="reviews">
                {t('vehicle.reviews')} ({vehicleReviews.length})
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="overview" pt="lg">
              <Stack gap="lg">
                <div>
                  <Text fw={600} mb="xs">{t('vehicle.description')}</Text>
                  <Text c="dimmed">{vehicle.description}</Text>
                </div>
                <div>
                  <Text fw={600} mb="xs">{t('vehicle.highlights')}</Text>
                  <Group gap="xs" wrap="wrap">
                    {vehicle.features.map((f) => (
                      <Badge key={f} variant="outline" size="md" radius="xl">
                        {f}
                      </Badge>
                    ))}
                  </Group>
                </div>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="specs" pt="lg">
              <Table.ScrollContainer minWidth={400}>
                <Table striped highlightOnHover>
                  <Table.Tbody>
                    {specRows.map(([label, value]) => (
                      <Table.Tr key={String(label)}>
                        <Table.Td fw={500}>{label}</Table.Td>
                        <Table.Td>{value}</Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            </Tabs.Panel>

            <Tabs.Panel value="reviews" pt="lg">
              <Stack gap="lg">
                <Group align="flex-start" gap="xl" wrap="wrap">
                  <Stack align="center" gap={4}>
                    <Text size="3rem" fw={800}>{avgRating.toFixed(1)}</Text>
                    <Rating value={avgRating} readOnly fractions={2} />
                    <Text size="sm" c="dimmed">{vehicleReviews.length} {t('vehicle.reviews')}</Text>
                  </Stack>
                  <Stack gap={4} style={{ flex: 1, minWidth: 150 }}>
                    {ratingBreakdown.map((rb) => (
                      <Group key={rb.star} gap="xs" wrap="nowrap">
                        <Text size="sm" w={10}>{rb.star}</Text>
                        <Progress value={rb.pct} color="teal" style={{ flex: 1 }} size="sm" />
                        <Text size="xs" c="dimmed" w={20}>{rb.count}</Text>
                      </Group>
                    ))}
                  </Stack>
                </Group>

                <Divider />

                {vehicleReviews.map((review) => (
                  <Box
                    key={review.id}
                    className="glass-card"
                    p="md"
                    style={{ borderRadius: 'var(--mantine-radius-md)' }}
                  >
                    <Group justify="space-between" mb="xs" wrap="wrap">
                      <Group gap="sm">
                        <Avatar color="purple" radius="xl" size="sm">
                          {review.authorAvatar}
                        </Avatar>
                        <div>
                          <Text size="sm" fw={600}>{review.authorName}</Text>
                          <Text size="xs" c="dimmed">{review.date}</Text>
                        </div>
                      </Group>
                      <Rating value={review.rating} readOnly size="sm" />
                    </Group>
                    <Text size="sm" c="dimmed">{review.text}</Text>
                    <Group gap="lg" mt="sm">
                      <Group gap={4}>
                        <ActionIcon variant="subtle" size="sm"><IconThumbUp size={14} /></ActionIcon>
                        <Text size="xs" c="dimmed">{review.helpfulCount}</Text>
                      </Group>
                      <Group gap={4}>
                        <ActionIcon variant="subtle" size="sm"><IconThumbDown size={14} /></ActionIcon>
                        <Text size="xs" c="dimmed">{review.notHelpfulCount}</Text>
                      </Group>
                    </Group>
                  </Box>
                ))}

                <Divider />

                <Stack gap="sm">
                  <Text fw={600}>{t('vehicle.writeReview')}</Text>
                  <Rating value={reviewRating} onChange={setReviewRating} size="lg" />
                  <Textarea
                    placeholder={t('vehicle.reviewPlaceholder')}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.currentTarget.value)}
                    minRows={3}
                  />
                  <Button
                    variant="filled"
                    color="teal"
                    onClick={handleReviewSubmit}
                    disabled={!reviewRating || !reviewText}
                  >
                    {t('vehicle.submitReview')}
                  </Button>
                </Stack>
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Stack>

        <Box
          className="glass-card animate-scale-in"
          p="xl"
          style={{
            borderRadius: 'var(--mantine-radius-xl)',
            position: 'sticky',
            top: 90,
          }}
        >
          <Stack gap="md">
            <Text size="2rem" fw={800} c="teal">{priceDisplay}</Text>

            <Badge
              leftSection={<IconShieldCheck size={14} />}
              color="green"
              variant="light"
              size="lg"
              fullWidth
            >
              {t('vehicle.warranty')}
            </Badge>

            <Stack gap={4}>
              {specRows.slice(0, 4).map(([label, val]) => (
                <Group key={String(label)} justify="space-between">
                  <Text size="sm" c="dimmed">{label}</Text>
                  <Text size="sm" fw={500}>{val}</Text>
                </Group>
              ))}
            </Stack>

            <Divider />

            <Button
              fullWidth
              size="lg"
              variant="filled"
              color="teal"
              onClick={() => setRentalOpen(true)}
            >
              {t('vehicle.rentNow')}
            </Button>
            <Button fullWidth variant="outline" color="purple">
              {t('vehicle.contact')}
            </Button>

            <Text size="xs" c="dimmed" ta="center">
              {t('vehicle.moneyBack')}
            </Text>

            <Divider />

            <Group justify="center" gap="xs">
              <Tooltip label={t('vehicle.copyLink')}>
                <ActionIcon variant="subtle" onClick={handleCopyLink}>
                  <IconCopy size={18} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label={t('vehicle.whatsapp')}>
                <ActionIcon variant="subtle" color="green">
                  <IconBrandWhatsapp size={18} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Stack>
        </Box>
      </div>

      {/* Similar Cars */}
      {similarCars.length > 0 && (
        <Box mt={60}>
          <Divider mb="xl" />
          <Title order={3} fw={700} mb="lg" className="animate-slide-up">
            {t('vehicle.similarCars') || 'Similar Cars'}
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
            {similarCars.map((car, i) => (
              <VehicleCard key={car.id} vehicle={car} index={i} />
            ))}
          </SimpleGrid>
        </Box>
      )}

      <RentalBookingModal
        opened={rentalOpen}
        onClose={() => setRentalOpen(false)}
        vehicle={vehicle}
      />
    </Container>
  );
}
