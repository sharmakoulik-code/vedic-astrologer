import type { BirthChart, PlanetName, SignName } from './chart';
import {
  getNakshatraFromLongitude,
  getPlanetEclipticLongitude,
  getSignFromLongitude,
  normalizeDegrees,
} from './chart';

const PLANETS: PlanetName[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
const DAILY_PLANETS: PlanetName[] = ['Sun', 'Mars', 'Mercury', 'Venus'];
const SLOW_PLANETS: PlanetName[] = ['Jupiter', 'Saturn', 'Rahu', 'Ketu'];
const SIGNS: SignName[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];
const TARA_NAMES = ['Janma', 'Sampat', 'Vipat', 'Kshema', 'Pratyak', 'Sadhaka', 'Vadha', 'Mitra', 'Ati-Mitra'] as const;
const DAY_MS = 86_400_000;

export interface TransitPosition {
  longitude: number;
  sign: SignName;
  degree: number;
  nakshatra: string;
  nakshatraIndex: number;
  pada: number;
  retrograde: boolean;
}

export interface TransitSignChange {
  planet: PlanetName;
  fromSign: SignName;
  toSign: SignName;
  date: string;
  at: string;
}

const signedAngularDifference = (from: number, to: number): number =>
  ((normalizeDegrees(to - from + 180) % 360) - 180);

const positionAt = (planet: PlanetName, date: Date): Omit<TransitPosition, 'retrograde'> => {
  const longitude = getPlanetEclipticLongitude(date, planet);
  const nakshatra = getNakshatraFromLongitude(longitude);
  return {
    longitude,
    sign: getSignFromLongitude(longitude),
    degree: normalizeDegrees(longitude) % 30,
    nakshatra: nakshatra.name,
    nakshatraIndex: nakshatra.index,
    pada: nakshatra.pada,
  };
};

export const getTransitPositions = (date: Date): Record<PlanetName, TransitPosition> => {
  if (!Number.isFinite(date.getTime())) throw new RangeError('date must be a valid Date');
  const after24Hours = new Date(date.getTime() + DAY_MS);
  const positions = {} as Record<PlanetName, TransitPosition>;

  for (const planet of PLANETS) {
    const current = positionAt(planet, date);
    const next = positionAt(planet, after24Hours);
    positions[planet] = {
      ...current,
      retrograde: planet === 'Rahu' || planet === 'Ketu'
        ? true
        : signedAngularDifference(current.longitude, next.longitude) < 0,
    };
  }
  return positions;
};

export const getTransitHouses = (natalMoonSign: SignName, date: Date): Record<PlanetName, number> => {
  const natalIndex = SIGNS.indexOf(natalMoonSign);
  if (natalIndex < 0) throw new RangeError('natalMoonSign must be a valid sign');
  const positions = getTransitPositions(date);
  return Object.fromEntries(PLANETS.map((planet) => [
    planet,
    ((SIGNS.indexOf(positions[planet].sign) - natalIndex + 12) % 12) + 1,
  ])) as Record<PlanetName, number>;
};

export const getTaraBala = (natalNakshatraIndex: number, date: Date) => {
  if (!Number.isInteger(natalNakshatraIndex) || natalNakshatraIndex < 0 || natalNakshatraIndex > 26) {
    throw new RangeError('natalNakshatraIndex must be an integer from 0 to 26');
  }
  const nakshatraIndex = positionAt('Moon', date).nakshatraIndex;
  const count = ((nakshatraIndex - natalNakshatraIndex + 27) % 27) + 1;
  const tara = ((count - 1) % 9) + 1;
  return { count, tara, name: TARA_NAMES[tara - 1], nakshatraIndex };
};

export const getSadeSati = (natalMoonSign: SignName, date: Date) => {
  const natalIndex = SIGNS.indexOf(natalMoonSign);
  if (natalIndex < 0) throw new RangeError('natalMoonSign must be a valid sign');
  const saturnIndex = SIGNS.indexOf(positionAt('Saturn', date).sign);
  const offset = (saturnIndex - natalIndex + 12) % 12;
  const phase = offset === 11 ? 'rising' : offset === 0 ? 'peak' : offset === 1 ? 'setting' : null;
  return { active: phase !== null, phase };
};

const localNoon = (year: number, month: number, day: number): Date =>
  new Date(year, month - 1, day, 12, 0, 0, 0);

const localDateParts = (date: Date) => ({
  year: date.getFullYear(),
  month: date.getMonth() + 1,
  day: date.getDate(),
});

const dateKey = (date: Date) =>
  `${date.getFullYear().toString().padStart(4, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

const isSignChangeDate = (at: Date, year: number, month: number) => {
  const parts = localDateParts(at);
  return parts.year === year && parts.month === month;
};

const bisectSignChange = (
  planet: PlanetName,
  start: Date,
  end: Date,
  startSign: SignName,
): Date => {
  let low = start.getTime();
  let high = end.getTime();
  while (high - low > 60 * 60 * 1000) {
    const mid = Math.floor((low + high) / 2);
    if (getSignFromLongitude(getPlanetEclipticLongitude(new Date(mid), planet)) === startSign) low = mid;
    else high = mid;
  }
  return new Date(high);
};

const findSignChanges = (
  planets: PlanetName[],
  sampleDates: Date[],
  within: (date: Date) => boolean,
): TransitSignChange[] => {
  const changes: TransitSignChange[] = [];
  for (const planet of planets) {
    let previousDate = sampleDates[0];
    let previousSign = positionAt(planet, previousDate).sign;
    for (const date of sampleDates.slice(1)) {
      const currentSign = positionAt(planet, date).sign;
      if (currentSign !== previousSign) {
        const at = bisectSignChange(planet, previousDate, date, previousSign);
        if (within(at)) {
          changes.push({
            planet,
            fromSign: previousSign,
            toSign: currentSign,
            date: dateKey(at),
            at: at.toISOString(),
          });
        }
      }
      previousDate = date;
      previousSign = currentSign;
    }
  }
  return changes.sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
};

const noonSamplesAroundRange = (start: Date, dayCount: number) => {
  const parts = localDateParts(start);
  return Array.from({ length: dayCount + 2 }, (_, index) =>
    localNoon(parts.year, parts.month, parts.day + index - 1),
  );
};

const moonSignUncertain = (chart: BirthChart): boolean => {
  if (chart.exactTime) return false;
  const degree = chart.planets.Moon.longitude % 30;
  return Math.min(degree, 30 - degree) <= 7;
};

const moonFields = (chart: BirthChart, date: Date) => {
  const moon = positionAt('Moon', date);
  const natalIndex = SIGNS.indexOf(chart.moonSign);
  return {
    sign: moon.sign,
    house: ((SIGNS.indexOf(moon.sign) - natalIndex + 12) % 12) + 1,
    nakshatra: moon.nakshatra,
    nakshatraIndex: moon.nakshatraIndex,
    pada: moon.pada,
  };
};

export const getDailyData = (chart: BirthChart, date: Date = new Date()) => {
  const parts = localDateParts(date);
  const at = localNoon(parts.year, parts.month, parts.day);
  const positions = getTransitPositions(at);
  const houses = getTransitHouses(chart.moonSign, at);
  return {
    date: dateKey(at),
    at: at.toISOString(),
    moon: { ...moonFields(chart, at), retrograde: positions.Moon.retrograde },
    taraBala: getTaraBala(
      getNakshatraFromLongitude(chart.planets.Moon.longitude).index,
      at,
    ),
    planets: Object.fromEntries(DAILY_PLANETS.map((planet) => [
      planet,
      { ...positions[planet], house: houses[planet] },
    ])) as Record<typeof DAILY_PLANETS[number], TransitPosition & { house: number }>,
    moonSignUncertain: moonSignUncertain(chart),
  };
};

export const getWeeklyData = (chart: BirthChart, startDate: Date) => {
  const parts = localDateParts(startDate);
  const firstDay = localNoon(parts.year, parts.month, parts.day);
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = localNoon(parts.year, parts.month, parts.day + index);
    return {
      date: dateKey(date),
      at: date.toISOString(),
      moon: moonFields(chart, date),
    };
  });
  const samples = noonSamplesAroundRange(firstDay, 7);
  const end = localNoon(parts.year, parts.month, parts.day + 7);
  const startKey = dateKey(firstDay);
  const endKey = dateKey(end);
  return {
    startDate: dateKey(firstDay),
    days,
    signChanges: findSignChanges(DAILY_PLANETS, samples, (at) => {
      const key = dateKey(at);
      return key >= startKey && key < endKey;
    }),
    moonSignUncertain: moonSignUncertain(chart),
  };
};

export const getMonthlyData = (chart: BirthChart, year: number, month: number) => {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new RangeError('year and month must be valid integers; month must be from 1 to 12');
  }
  const start = localNoon(year, month, 1);
  const samples = noonSamplesAroundRange(start, new Date(year, month, 0).getDate());
  const changes = findSignChanges(PLANETS, samples, (at) => isSignChangeDate(at, year, month));
  const reference = localNoon(year, month, 1);
  const houses = getTransitHouses(chart.moonSign, reference);
  return {
    year,
    month,
    signChanges: changes,
    sadeSati: getSadeSati(chart.moonSign, reference),
    referenceDate: dateKey(reference),
    houses: Object.fromEntries(SLOW_PLANETS.map((planet) => [planet, houses[planet]])) as Record<typeof SLOW_PLANETS[number], number>,
    moonSignUncertain: moonSignUncertain(chart),
  };
};
