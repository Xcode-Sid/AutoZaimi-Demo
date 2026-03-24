import { useState, useMemo } from 'react';
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Group,
  Stack,
  Select,
  ActionIcon,
  Pagination,
  Button,
  Box,
  TextInput,
  Drawer,
  RangeSlider,
  Chip,
  Badge,
  ThemeIcon,
  Divider,
  UnstyledButton,
} from '@mantine/core';
import {
  IconLayoutGrid,
  IconList,
  IconFilter,
  IconSearch,
  IconDiamond,
  IconCar,
  IconBolt,
  IconPigMoney,
  IconX,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@mantine/hooks';
import { vehicles } from '../data/vehicles';
import { VehicleCard } from '../components/common/VehicleCard';
import { EmptyState } from '../components/common/EmptyState';

const ITEMS_PER_PAGE = 6;

const categoryIcons: Record<string, typeof IconDiamond> = {
  Luksoze: IconDiamond,
  SUV: IconCar,
  Elektrike: IconBolt,
  Ekonomike: IconPigMoney,
};

const categoryColors: Record<string, string> = {
  Luksoze: 'yellow',
  SUV: 'green',
  Elektrike: 'blue',
  Ekonomike: 'gray',
};

export default function FleetPage() {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery('(min-width: 75em)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('recommended');
  const [gridView, setGridView] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [transmission, setTransmission] = useState<string[]>([]);
  const [seatsFilter, setSeatsFilter] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const categories = ['Luksoze', 'SUV', 'Elektrike', 'Ekonomike'];
  const allCities = [...new Set(vehicles.map((v) => v.city))];

  const activeFilterCount = [
    category,
    fuelTypes.length > 0,
    transmission.length > 0,
    seatsFilter,
    cities.length > 0,
    priceRange[0] > 0 || priceRange[1] < 200,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setCategory(null);
    setPriceRange([0, 200]);
    setFuelTypes([]);
    setTransmission([]);
    setSeatsFilter(null);
    setCities([]);
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = [...vehicles];

    if (search) {
      result = result.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category) {
      result = result.filter((v) => v.category === category);
    }
    if (fuelTypes.length > 0) {
      result = result.filter((v) => fuelTypes.includes(v.specs.fuel));
    }
    if (transmission.length > 0) {
      result = result.filter((v) => transmission.includes(v.specs.transmission));
    }
    if (seatsFilter) {
      const seats = parseInt(seatsFilter);
      if (seats === 7) {
        result = result.filter((v) => v.specs.seats >= 7);
      } else {
        result = result.filter((v) => v.specs.seats === seats);
      }
    }
    if (cities.length > 0) {
      result = result.filter((v) => cities.includes(v.city));
    }
    result = result.filter((v) => v.price >= priceRange[0] && v.price <= priceRange[1]);

    switch (sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
    }

    return result;
  }, [search, category, sortBy, priceRange, fuelTypes, transmission, seatsFilter, cities]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const filterPanel = (
    <Stack gap="xl" p="md">
      <div>
        <Text fw={600} mb="sm">{t('admin.category')}</Text>
        <SimpleGrid cols={2} spacing="sm">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            const isActive = category === cat;
            return (
              <UnstyledButton
                key={cat}
                onClick={() => { setCategory(isActive ? null : cat); setPage(1); }}
                className={`glass-card ${isActive ? '' : 'glass-card-hover'}`}
                p="md"
                style={{
                  borderRadius: 'var(--mantine-radius-lg)',
                  textAlign: 'center',
                  border: isActive ? '2px solid var(--mantine-color-teal-6)' : undefined,
                  transition: 'all 0.2s ease',
                }}
              >
                <Stack align="center" gap={6}>
                  <ThemeIcon
                    size={40}
                    radius="xl"
                    variant={isActive ? 'filled' : 'light'}
                    color={isActive ? 'teal' : categoryColors[cat]}
                  >
                    <Icon size={20} />
                  </ThemeIcon>
                  <Text size="sm" fw={isActive ? 700 : 500}>{t(`fleet.${cat.toLowerCase() === 'luksoze' ? 'luxury' : cat.toLowerCase() === 'elektrike' ? 'electric' : cat.toLowerCase() === 'ekonomike' ? 'economy' : 'suv'}`)}</Text>
                </Stack>
              </UnstyledButton>
            );
          })}
        </SimpleGrid>
      </div>

      <Divider />

      <div>
        <Group justify="space-between" mb="xs">
          <Text fw={600}>{t('fleet.priceRange')}</Text>
          <Text size="sm" c="teal">€{priceRange[0]} — €{priceRange[1]}</Text>
        </Group>
        <RangeSlider
          value={priceRange}
          onChange={(val) => { setPriceRange(val); setPage(1); }}
          min={0}
          max={200}
          step={5}
          color="teal"
          marks={[
            { value: 0, label: '€0' },
            { value: 100, label: '€100' },
            { value: 200, label: '€200' },
          ]}
        />
      </div>

      <Divider />

      <div>
        <Text fw={600} mb="sm">{t('fleet.fuelType')}</Text>
        <Chip.Group multiple value={fuelTypes} onChange={(v) => { setFuelTypes(v); setPage(1); }}>
          <Group gap="xs">
            <Chip value="Benzinë" variant="outline" color="teal">Benzinë</Chip>
            <Chip value="Diesel" variant="outline" color="teal">Diesel</Chip>
            <Chip value="Elektrik" variant="outline" color="teal">Elektrik</Chip>
            <Chip value="Hibrid" variant="outline" color="teal">Hibrid</Chip>
          </Group>
        </Chip.Group>
      </div>

      <Divider />

      <div>
        <Text fw={600} mb="sm">{t('fleet.transmission')}</Text>
        <Chip.Group multiple value={transmission} onChange={(v) => { setTransmission(v); setPage(1); }}>
          <Group gap="xs">
            <Chip value="Manual" variant="outline" color="teal">{t('fleet.manual')}</Chip>
            <Chip value="Automatik" variant="outline" color="teal">{t('fleet.automatic')}</Chip>
            <Chip value="CVT" variant="outline" color="teal">CVT</Chip>
          </Group>
        </Chip.Group>
      </div>

      <Divider />

      <div>
        <Text fw={600} mb="sm">{t('fleet.seatsFilter')}</Text>
        <Chip.Group value={seatsFilter} onChange={(v) => { setSeatsFilter(v as string); setPage(1); }}>
          <Group gap="xs">
            <Chip value="2" variant="outline" color="teal">2</Chip>
            <Chip value="4" variant="outline" color="teal">4</Chip>
            <Chip value="5" variant="outline" color="teal">5</Chip>
            <Chip value="7" variant="outline" color="teal">7+</Chip>
          </Group>
        </Chip.Group>
      </div>

      <Divider />

      <div>
        <Text fw={600} mb="sm">{t('fleet.cityFilter')}</Text>
        <Chip.Group multiple value={cities} onChange={(v) => { setCities(v); setPage(1); }}>
          <Group gap="xs">
            {allCities.map((city) => (
              <Chip key={city} value={city} variant="outline" color="teal">{city}</Chip>
            ))}
          </Group>
        </Chip.Group>
      </div>

      <Divider />

      <Group grow>
        <Button
          variant="filled"
          color="teal"
          onClick={() => setDrawerOpen(false)}
        >
          {t('fleet.applyFilters')}
        </Button>
        <Button variant="subtle" color="gray" onClick={clearFilters}>
          {t('fleet.clearFilters')}
        </Button>
      </Group>
    </Stack>
  );

  return (
    <Container size="xl" py="xl">
      <Box mb="xl" className="animate-slide-up" style={{ position: 'relative' }}>
        <Stack gap="xs">
          <Title order={1} fw={800}>
            {t('fleet.title')}
          </Title>
          <Text c="dimmed">{t('fleet.subtitle')}</Text>
        </Stack>
      </Box>

      <Group gap="md" mb="lg" wrap="wrap">
        <TextInput
          placeholder={t('fleet.searchCars')}
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => { setSearch(e.currentTarget.value); setPage(1); }}
          style={{ flex: 1, minWidth: 0 }}
          w={{ base: '100%', sm: 'auto' }}
          radius="xl"
        />
        <Group gap="xs" wrap="wrap">
          <Select
            size="sm"
            w={{ base: '100%', xs: 180 }}
            value={sortBy}
            onChange={(v) => v && setSortBy(v)}
            data={[
              { value: 'recommended', label: t('fleet.recommended') },
              { value: 'priceAsc', label: t('fleet.priceAsc') },
              { value: 'priceDesc', label: t('fleet.priceDesc') },
              { value: 'newest', label: t('fleet.newest') },
            ]}
            radius="xl"
          />
          <Group gap="xs">
            <ActionIcon
              variant={gridView ? 'filled' : 'subtle'}
              color="teal"
              onClick={() => setGridView(true)}
              radius="xl"
              size="lg"
            >
              <IconLayoutGrid size={18} />
            </ActionIcon>
            <ActionIcon
              variant={!gridView ? 'filled' : 'subtle'}
              color="teal"
              onClick={() => setGridView(false)}
              radius="xl"
              size="lg"
            >
              <IconList size={18} />
            </ActionIcon>
          </Group>
          {!isDesktop && (
            <Button
              variant="light"
              color="teal"
              leftSection={<IconFilter size={16} />}
              rightSection={
                activeFilterCount > 0 ? (
                  <Badge color="teal" size="xs" variant="filled" circle>
                    {activeFilterCount}
                  </Badge>
                ) : null
              }
              onClick={() => setDrawerOpen(true)}
              radius="xl"
            >
              {t('fleet.filters')}
            </Button>
          )}
        </Group>
      </Group>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {isDesktop && (
          <Box
            className="glass-card"
            style={{
              width: 300,
              flexShrink: 0,
              borderRadius: 'var(--mantine-radius-xl)',
              position: 'sticky',
              top: 90,
              maxHeight: 'calc(100vh - 110px)',
              overflowY: 'auto',
              alignSelf: 'flex-start',
            }}
          >
            {filterPanel}
          </Box>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <Text size="sm" c="dimmed" mb="md">
            {filtered.length} {t('fleet.results')}
            {activeFilterCount > 0 && (
              <>
                {' · '}
                <Text component="span" size="sm" c="teal" fw={500}>
                  {activeFilterCount} {t('fleet.activeFilters')}
                </Text>
                <Text
                  component="span"
                  size="sm"
                  c="dimmed"
                  ml={4}
                  style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  onClick={clearFilters}
                >
                  <IconX size={12} style={{ verticalAlign: 'middle' }} /> {t('fleet.clearFilters')}
                </Text>
              </>
            )}
          </Text>

          {paged.length > 0 ? (
            <>
              <SimpleGrid
                cols={gridView ? { base: 1, sm: 2, lg: isDesktop ? 2 : 3 } : { base: 1 }}
                spacing="lg"
              >
                {paged.map((vehicle, i) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
                ))}
              </SimpleGrid>

              {totalPages > 1 && (
                <Group justify="center" mt="xl">
                  <Pagination
                    total={totalPages}
                    value={page}
                    onChange={setPage}
                    color="teal"
                  />
                </Group>
              )}
            </>
          ) : (
            <EmptyState
              title={t('fleet.noResults')}
              description={t('fleet.noResultsDesc')}
            />
          )}
        </div>
      </div>

      <Drawer
        opened={drawerOpen && !isDesktop}
        onClose={() => setDrawerOpen(false)}
        title={t('fleet.filters')}
        position="left"
        size="sm"
      >
        {filterPanel}
      </Drawer>
    </Container>
  );
}
