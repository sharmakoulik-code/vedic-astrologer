export const getTimeZoneOffsetMinutes = (instant: Date, timeZone: string): number => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const parts = formatter.formatToParts(instant);
    const zoneName = parts.find((part) => part.type === 'timeZoneName')?.value ?? 'GMT';
    const match = zoneName.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/i);

    if (!match) {
      return 0;
    }

    const sign = match[1] === '-' ? -1 : 1;
    const hours = Number(match[2] || 0);
    const minutes = Number(match[3] || 0);
    return sign * (hours * 60 + minutes);
  } catch {
    return 0;
  }
};

const getZonedParts = (instant: Date, timeZone: string) => {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(instant);
  const values: Record<string, number> = {};

  for (const part of parts) {
    if (part.type === 'year') values.year = Number(part.value);
    if (part.type === 'month') values.month = Number(part.value);
    if (part.type === 'day') values.day = Number(part.value);
    if (part.type === 'hour') values.hour = Number(part.value);
    if (part.type === 'minute') values.minute = Number(part.value);
    if (part.type === 'second') values.second = Number(part.value);
  }

  return values;
};

export const localBirthToUtc = (date: string, time: string, timeZone: string): Date => {
  const trimmedTime = time?.trim() || '12:00';
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = trimmedTime.split(':').map(Number);

  const wallClockMs = Date.UTC(year, month - 1, day, hours, minutes, 0, 0);
  const guessedOffsetMinutes = getTimeZoneOffsetMinutes(new Date(wallClockMs), timeZone);
  const candidateUtc = new Date(wallClockMs - guessedOffsetMinutes * 60 * 1000);

  // DST gaps and overlaps are resolved by taking the first instant that round-trips back to the same local wall-clock values,
  // and otherwise using the nearest valid candidate. This keeps the conversion stable for historical offsets and daylight changes.
  const candidateParts = getZonedParts(candidateUtc, timeZone);
  const sameLocalTick =
    Number(candidateParts.year) === year &&
    Number(candidateParts.month) === month &&
    Number(candidateParts.day) === day &&
    Number(candidateParts.hour) === hours &&
    Number(candidateParts.minute) === minutes;

  if (sameLocalTick) {
    return candidateUtc;
  }

  const shift = 60 * 60 * 1000;
  const alternatives = [
    new Date(candidateUtc.getTime() - shift),
    new Date(candidateUtc.getTime() + shift),
    new Date(candidateUtc.getTime() - 2 * shift),
    new Date(candidateUtc.getTime() + 2 * shift),
  ];

  for (const candidate of alternatives) {
    const parts = getZonedParts(candidate, timeZone);
    const isMatch =
      Number(parts.year) === year &&
      Number(parts.month) === month &&
      Number(parts.day) === day &&
      Number(parts.hour) === hours &&
      Number(parts.minute) === minutes;

    if (isMatch) {
      return candidate;
    }
  }

  return candidateUtc;
};
