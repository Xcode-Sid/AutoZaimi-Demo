import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Modal,
  Stepper,
  Select,
  Switch,
  Radio,
  Button,
  Text,
  Stack,
  Group,
  Divider,
  ThemeIcon,
  Image,
  Box,
  Paper,
  Progress,
  SegmentedControl,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import {
  IconCheck,
  IconCalendar,
  IconSettings,
  IconShieldCheck,
  IconBabyCarriage,
  IconCash,
  IconCreditCard,
  IconClock,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookings } from '../../contexts/BookingsContext';
import { useAuth } from '../../contexts/AuthContext';
import type { Vehicle } from '../../data/vehicles';
import type { RentalMode } from '../../data/bookings';
import {
  billableHoursOnDate,
  hourlyRateFromDaily,
  prorateDailyAddonEuro,
} from '../../utils/rentalPricing';

interface Props {
  opened: boolean;
  onClose: () => void;
  vehicle: Vehicle;
}

function AnimatedTotal({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const from = prev.current;
    const to = value;
    if (from === to) return;
    const duration = 400;
    const step = (to - from) / (duration / 16);
    let current = from;
    const timer = setInterval(() => {
      current += step;
      if ((step > 0 && current >= to) || (step < 0 && current <= to)) {
        current = to;
        clearInterval(timer);
      }
      setDisplay(Math.round(current));
    }, 16);
    prev.current = to;
    return () => clearInterval(timer);
  }, [value]);

  return <>{display}</>;
}

export function RentalBookingModal({ opened, onClose, vehicle }: Props) {
  const { t } = useTranslation();
  const { addBooking } = useBookings();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [stepDirection, setStepDirection] = useState<'forward' | 'back'>('forward');

  const [rentalMode, setRentalMode] = useState<RentalMode>('day');
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);
  const [hourDate, setHourDate] = useState<string | null>(null);
  const [hourStart, setHourStart] = useState('09:00');
  const [hourEnd, setHourEnd] = useState('17:00');

  const [insurance, setInsurance] = useState(false);
  const [gps, setGps] = useState(false);
  const [childSeat, setChildSeat] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const days = useMemo(() => {
    if (dateRange[0] && dateRange[1]) {
      const start = new Date(dateRange[0]);
      const end = new Date(dateRange[1]);
      const diff = end.getTime() - start.getTime();
      return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }
    return 0;
  }, [dateRange]);

  const hours = useMemo(() => {
    if (!hourDate || !hourStart || !hourEnd) return 0;
    return billableHoursOnDate(hourDate, hourStart, hourEnd);
  }, [hourDate, hourStart, hourEnd]);

  const hourlyRate = useMemo(() => hourlyRateFromDaily(vehicle.price), [vehicle.price]);

  const { baseTotal, insuranceCost, gpsCost, childSeatCost, total } = useMemo(() => {
    if (rentalMode === 'day') {
      const base = vehicle.price * days;
      const ins = insurance ? 15 * days : 0;
      const g = gps ? 10 * days : 0;
      const c = childSeat ? 5 * days : 0;
      return {
        baseTotal: base,
        insuranceCost: ins,
        gpsCost: g,
        childSeatCost: c,
        total: base + ins + g + c,
      };
    }
    const h = hours;
    const base = hourlyRate * h;
    const ins = insurance ? prorateDailyAddonEuro(15, h) : 0;
    const g = gps ? prorateDailyAddonEuro(10, h) : 0;
    const c = childSeat ? prorateDailyAddonEuro(5, h) : 0;
    return {
      baseTotal: base,
      insuranceCost: ins,
      gpsCost: g,
      childSeatCost: c,
      total: base + ins + g + c,
    };
  }, [
    rentalMode,
    vehicle.price,
    days,
    hours,
    hourlyRate,
    insurance,
    gps,
    childSeat,
  ]);

  const canContinue =
    (rentalMode === 'day'
      ? !!(dateRange[0] && dateRange[1] && days >= 1)
      : !!(hourDate && hours >= 1));

  const handleConfirm = () => {
    const ref = `AZR-2026-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
    setBookingRef(ref);

    const addons: string[] = [];
    if (insurance) addons.push('insurance');
    if (gps) addons.push('gps');
    if (childSeat) addons.push('childSeat');

    if (rentalMode === 'day') {
      addBooking({
        id: `b-${Date.now()}`,
        ref,
        userId: user?.id || 'guest',
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        paymentMethod: paymentMethod as 'cash' | 'card',
        startDate: dateRange[0]!,
        endDate: dateRange[1]!,
        total,
        status: 'pending',
        addons,
        rentalMode: 'day',
      });
    } else {
      addBooking({
        id: `b-${Date.now()}`,
        ref,
        userId: user?.id || 'guest',
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        paymentMethod: paymentMethod as 'cash' | 'card',
        startDate: hourDate!,
        endDate: hourDate!,
        total,
        status: 'pending',
        addons,
        rentalMode: 'hour',
        billableHours: hours,
        hourStartTime: hourStart,
        hourEndTime: hourEnd,
      });
    }

    setSuccess(true);
  };

  const handleClose = () => {
    setSuccess(false);
    setStep(0);
    setStepDirection('forward');
    setRentalMode('day');
    setDateRange([null, null]);
    setHourDate(null);
    setHourStart('09:00');
    setHourEnd('17:00');
    setInsurance(false);
    setGps(false);
    setChildSeat(false);
    setPaymentMethod('cash');
    onClose();
  };

  const goForward = () => {
    setStepDirection('forward');
    setStep(1);
  };

  const goBack = () => {
    setStepDirection('back');
    setStep(0);
  };

  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString('sq-AL') : '';

  const stepAnimClass = stepDirection === 'forward' ? 'animate-step-slide-in' : 'animate-step-slide-back';

  const addonDayLabel = `€15/${t('vehicle.perDay')}`;
  const addonGpsLabel = `€10/${t('vehicle.perDay')}`;
  const addonChildLabel = `€5/${t('vehicle.perDay')}`;
  const addonHourHint = t('rental.addonProratedHours');

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        success ? undefined : (
          <Group gap="sm">
            <Text fw={700} size="lg">{t('rental.title')}</Text>
          </Group>
        )
      }
      size="lg"
      centered
      radius="lg"
    >
      {!success && (
        <Progress
          value={step === 0 ? 50 : 100}
          color="teal"
          size="xs"
          radius={0}
          mb="md"
          style={{ transition: 'all 0.4s ease' }}
        />
      )}

      {success ? (
        <Box className="confetti-bg">
          <Stack align="center" gap="lg" py="xl" className="animate-bounce-in">
            <ThemeIcon size={80} radius="xl" color="green" variant="light" className="animate-glow">
              <IconCheck size={40} />
            </ThemeIcon>
            <Text size="xl" fw={700}>{t('rental.successTitle')}</Text>
            <Text c="dimmed" ta="center">{t('rental.successMsg')}</Text>
            <Paper className="glass-card" p="md" radius="md">
              <Text size="sm" c="dimmed">{t('rental.bookingRef')}</Text>
              <Text size="lg" fw={700} c="teal">{bookingRef}</Text>
            </Paper>
            <Group>
              <Button variant="outline" onClick={handleClose}>
                {t('rental.backHome')}
              </Button>
            </Group>
          </Stack>
        </Box>
      ) : (
        <Stepper active={step} color="teal">
          <Stepper.Step label={t('rental.step1')} icon={<IconCalendar size={18} />}>
            <Box key={`step-0-${stepDirection}`} className={stepAnimClass}>
              <Stack gap="md" mt="md">
                <Text size="sm" fw={600}>{t('rental.rentalMode')}</Text>
                <motion.div
                  layout
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                >
                  <SegmentedControl
                    fullWidth
                    radius="xl"
                    size="md"
                    color="teal"
                    value={rentalMode}
                    onChange={(v) => setRentalMode(v as RentalMode)}
                    data={[
                      { label: t('rental.rentByDays'), value: 'day' },
                      { label: t('rental.rentByHours'), value: 'hour' },
                    ]}
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  {rentalMode === 'day' ? (
                    <motion.div
                      key="day-fields"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <DatePickerInput
                        type="range"
                        label={t('rental.dateRange')}
                        value={dateRange}
                        onChange={setDateRange}
                        minDate={new Date().toISOString().split('T')[0]}
                        required
                        radius="md"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hour-fields"
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -16 }}
                      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <Stack gap="sm">
                        <DatePickerInput
                          type="default"
                          label={t('rental.singleDay')}
                          value={hourDate}
                          onChange={setHourDate}
                          minDate={new Date().toISOString().split('T')[0]}
                          required
                          radius="md"
                        />
                        <Group grow align="flex-start">
                          <TextInput
                            type="time"
                            label={t('rental.pickupTime')}
                            value={hourStart}
                            onChange={(e) => setHourStart(e.currentTarget.value)}
                            leftSection={<IconClock size={16} />}
                            radius="md"
                          />
                          <TextInput
                            type="time"
                            label={t('rental.returnTime')}
                            value={hourEnd}
                            onChange={(e) => setHourEnd(e.currentTarget.value)}
                            leftSection={<IconClock size={16} />}
                            radius="md"
                          />
                        </Group>
                        {hours > 0 && (
                          <Text size="sm" c="teal" fw={600} className="animate-scale-in">
                            {t('rental.billableHours', { count: hours })}
                          </Text>
                        )}
                      </Stack>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Button
                  fullWidth
                  variant="filled"
                  color="teal"
                  onClick={goForward}
                  disabled={!canContinue}
                  radius="md"
                  size="md"
                  mt="xs"
                >
                  {t('rental.continue')}
                </Button>
              </Stack>
            </Box>
          </Stepper.Step>

          <Stepper.Step label={t('rental.step2')} icon={<IconSettings size={18} />}>
            <Box key={`step-1-${stepDirection}`} className={stepAnimClass}>
              <Stack gap="md" mt="md">
                <Text fw={600}>{t('rental.addons')}</Text>

                <Paper
                  className={`glass-card ${insurance ? 'animate-card-glow' : ''}`}
                  p="md"
                  radius="md"
                  style={{
                    borderColor: insurance ? 'var(--mantine-color-teal-6)' : undefined,
                    borderWidth: insurance ? 2 : 1,
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                  }}
                  onClick={() => setInsurance(!insurance)}
                >
                  <Group justify="space-between">
                    <Group gap="sm">
                      <ThemeIcon variant="light" color="teal" size="lg" radius="md">
                        <IconShieldCheck size={20} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600}>{t('rental.fullInsurance')}</Text>
                        <Text size="xs" c="dimmed">
                          {rentalMode === 'day' ? addonDayLabel : addonHourHint}
                        </Text>
                      </div>
                    </Group>
                    <Switch checked={insurance} onChange={() => {}} color="teal" />
                  </Group>
                </Paper>

                <Paper
                  className={`glass-card ${gps ? 'animate-card-glow' : ''}`}
                  p="md"
                  radius="md"
                  style={{
                    borderColor: gps ? 'var(--mantine-color-teal-6)' : undefined,
                    borderWidth: gps ? 2 : 1,
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                  }}
                  onClick={() => setGps(!gps)}
                >
                  <Group justify="space-between">
                    <Group gap="sm">
                      <ThemeIcon variant="light" color="blue" size="lg" radius="md">
                        <IconShieldCheck size={20} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600}>{t('rental.gps')}</Text>
                        <Text size="xs" c="dimmed">
                          {rentalMode === 'day' ? addonGpsLabel : addonHourHint}
                        </Text>
                      </div>
                    </Group>
                    <Switch checked={gps} onChange={() => {}} color="teal" />
                  </Group>
                </Paper>

                <Paper
                  className={`glass-card ${childSeat ? 'animate-card-glow' : ''}`}
                  p="md"
                  radius="md"
                  style={{
                    borderColor: childSeat ? 'var(--mantine-color-teal-6)' : undefined,
                    borderWidth: childSeat ? 2 : 1,
                    transition: 'all 0.3s',
                    cursor: 'pointer',
                  }}
                  onClick={() => setChildSeat(!childSeat)}
                >
                  <Group justify="space-between">
                    <Group gap="sm">
                      <ThemeIcon variant="light" color="orange" size="lg" radius="md">
                        <IconBabyCarriage size={20} />
                      </ThemeIcon>
                      <div>
                        <Text size="sm" fw={600}>{t('rental.childSeat')}</Text>
                        <Text size="xs" c="dimmed">
                          {rentalMode === 'day' ? addonChildLabel : addonHourHint}
                        </Text>
                      </div>
                    </Group>
                    <Switch checked={childSeat} onChange={() => {}} color="teal" />
                  </Group>
                </Paper>

                <Divider />

                <Radio.Group
                  label={t('rental.paymentMethod')}
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                >
                  <Stack gap="xs" mt="xs">
                    <Paper
                      className="glass-card"
                      p="sm"
                      radius="md"
                      style={{ cursor: 'pointer', borderColor: paymentMethod === 'cash' ? 'var(--mantine-color-teal-6)' : undefined, borderWidth: paymentMethod === 'cash' ? 2 : 1, transition: 'all 0.2s' }}
                      onClick={() => setPaymentMethod('cash')}
                    >
                      <Group gap="sm">
                        <IconCash size={18} color="var(--mantine-color-teal-6)" />
                        <Radio value="cash" label={t('rental.cashPickup')} />
                      </Group>
                    </Paper>
                    <Paper
                      className="glass-card"
                      p="sm"
                      radius="md"
                      style={{ cursor: 'pointer', borderColor: paymentMethod === 'card' ? 'var(--mantine-color-teal-6)' : undefined, borderWidth: paymentMethod === 'card' ? 2 : 1, transition: 'all 0.2s' }}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <Group gap="sm">
                        <IconCreditCard size={18} color="var(--mantine-color-teal-6)" />
                        <Radio value="card" label={t('rental.cardPickup')} />
                      </Group>
                    </Paper>
                  </Stack>
                </Radio.Group>

                <Divider />

                <Paper className="glass-card" p="md" radius="md">
                  <Text fw={600} mb="sm">{t('rental.summary')}</Text>
                  <Group gap="sm" mb="xs">
                    <Image src={vehicle.image} w={60} h={40} radius="sm" fit="cover" />
                    <Text fw={500}>{vehicle.name}</Text>
                  </Group>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">{t('account.rentalType')}</Text>
                      <Text size="sm" fw={600}>
                        {rentalMode === 'day' ? t('account.typeDay') : t('account.typeHour')}
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">{t('rental.dates')}</Text>
                      <Text size="sm">
                        {rentalMode === 'day'
                          ? `${formatDate(dateRange[0])} — ${formatDate(dateRange[1])}`
                          : `${formatDate(hourDate)} · ${hourStart} — ${hourEnd}`}
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">{t('rental.duration')}</Text>
                      <Text size="sm">
                        {rentalMode === 'day'
                          ? `${days} ${t('rental.days')}`
                          : t('rental.billableHours', { count: hours })}
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c="dimmed">{t('rental.basePrice')}</Text>
                      <Text size="sm">
                        {rentalMode === 'day'
                          ? `€${vehicle.price}/${t('vehicle.perDay')} × ${days} = €${baseTotal}`
                          : `€${hourlyRate}/${t('vehicle.perHour')} × ${hours} = €${baseTotal}`}
                      </Text>
                    </Group>
                    {insurance && (
                      <Group justify="space-between" className="animate-scale-in">
                        <Text size="sm" c="dimmed">{t('rental.fullInsurance')}</Text>
                        <Text size="sm">
                          {rentalMode === 'day'
                            ? `€15 × ${days} = €${insuranceCost}`
                            : `€${insuranceCost}`}
                        </Text>
                      </Group>
                    )}
                    {gps && (
                      <Group justify="space-between" className="animate-scale-in">
                        <Text size="sm" c="dimmed">{t('rental.gps')}</Text>
                        <Text size="sm">
                          {rentalMode === 'day' ? `€10 × ${days} = €${gpsCost}` : `€${gpsCost}`}
                        </Text>
                      </Group>
                    )}
                    {childSeat && (
                      <Group justify="space-between" className="animate-scale-in">
                        <Text size="sm" c="dimmed">{t('rental.childSeat')}</Text>
                        <Text size="sm">
                          {rentalMode === 'day'
                            ? `€5 × ${days} = €${childSeatCost}`
                            : `€${childSeatCost}`}
                        </Text>
                      </Group>
                    )}
                    <Divider />
                    <Group justify="space-between">
                      <Text size="lg" fw={700}>{t('rental.total')}</Text>
                      <Text size="lg" fw={700} c="teal">
                        €<AnimatedTotal value={total} />
                      </Text>
                    </Group>
                  </Stack>
                </Paper>

                <Group grow>
                  <Button variant="outline" onClick={goBack} radius="md">
                    {t('rental.back')}
                  </Button>
                  <Button
                    variant="filled"
                    color="teal"
                    onClick={handleConfirm}
                    radius="md"
                  >
                    {t('rental.confirm')}
                  </Button>
                </Group>
              </Stack>
            </Box>
          </Stepper.Step>
        </Stepper>
      )}
    </Modal>
  );
}
