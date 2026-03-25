import type { TFunction } from 'i18next';
import type { Booking } from '../data/bookings';

export function formatBookingPeriod(b: Booking, t: TFunction): string {
  if (b.rentalMode === 'hour' && b.hourStartTime && b.hourEndTime) {
    const h =
      b.billableHours != null
        ? t('rental.billableHours', { count: b.billableHours })
        : '';
    return `${b.startDate} · ${b.hourStartTime}–${b.hourEndTime}${h ? ` (${h})` : ''}`;
  }
  return `${b.startDate}${b.endDate ? ` — ${b.endDate}` : ''}`;
}
