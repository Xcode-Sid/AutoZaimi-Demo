import { Title, SimpleGrid, Stack, Box, Text, Group } from '@mantine/core';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useFavorites } from '../../contexts/FavoritesContext';
import { vehicles } from '../../data/vehicles';
import { VehicleCard } from '../../components/common/VehicleCard';
import { EmptyState } from '../../components/common/EmptyState';
import { AnimatedSection, StaggerContainer, StaggerItem } from '../../components/common/AnimatedSection';

export default function SavedCarsPage() {
  const { t } = useTranslation();
  const { favorites } = useFavorites();
  const savedVehicles = vehicles.filter((v) => favorites.includes(v.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Stack gap="lg">
        <AnimatedSection>
          <Group gap={10} align="flex-start">
            <Box
              style={{
                width: 4,
                height: 28,
                borderRadius: 4,
                background: 'var(--az-teal)',
                boxShadow: '0 0 12px rgba(45, 212, 168, 0.35)',
                flexShrink: 0,
                marginTop: 4,
              }}
            />
            <div>
              <Title order={2} fw={800}>
                {t('account.savedCars')}
              </Title>
              <Text c="dimmed" size="sm" mt={4}>
                {t('account.carsSubtitle')}
              </Text>
              <Text c="dimmed" size="xs" mt={6} maw={520} style={{ lineHeight: 1.5 }}>
                {t('account.savedCarsPaymentNote')}
              </Text>
            </div>
          </Group>
        </AnimatedSection>

        {savedVehicles.length > 0 ? (
          <AnimatedSection delay={0.08}>
            <Box
              className="glass-card card-gradient-border"
              p={{ base: 'md', sm: 'xl' }}
              style={{ borderRadius: 'var(--mantine-radius-xl)' }}
            >
              <StaggerContainer stagger={0.07}>
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                  {savedVehicles.map((v, i) => (
                    <StaggerItem key={v.id} scale>
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.4, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <VehicleCard vehicle={v} index={i} />
                      </motion.div>
                    </StaggerItem>
                  ))}
                </SimpleGrid>
              </StaggerContainer>
            </Box>
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={0.1}>
            <EmptyState
              icon={<IconDeviceFloppy size={40} />}
              title={t('account.noSavedCars')}
              actionLabel={t('account.browsFleet')}
              actionPath="/fleet"
            />
          </AnimatedSection>
        )}
      </Stack>
    </motion.div>
  );
}
