/** Hourly rate derived from daily list price (demo formula). */
export function hourlyRateFromDaily(dailyPrice: number): number {
  return Math.max(4, Math.round(dailyPrice / 8));
}

/** Prorate a daily add-on fee to a number of billable hours. */
export function prorateDailyAddonEuro(addonDayEuro: number, hours: number): number {
  if (hours <= 0) return 0;
  return Math.max(1, Math.round((addonDayEuro * hours) / 24));
}

/**
 * Billable hours between two clock times on a calendar date.
 * If return is before pickup on the same wall clock, assumes return is next calendar day.
 */
export function billableHoursOnDate(dateStr: string, pickupTime: string, returnTime: string): number {
  const start = new Date(`${dateStr}T${pickupTime}:00`);
  let end = new Date(`${dateStr}T${returnTime}:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0;
  if (end.getTime() <= start.getTime()) {
    end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
  }
  const ms = end.getTime() - start.getTime();
  return Math.max(1, Math.ceil(ms / (1000 * 60 * 60)));
}
