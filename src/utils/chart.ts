import { Body, Ecliptic, GeoVector } from 'astronomy-engine';
import { localBirthToUtc } from './time';

export type PlanetName = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Rahu' | 'Ketu';
export type SignName = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface PlanetPosition {
  name: PlanetName;
  longitude: number;
  sign: SignName;
  degree: number;
  nakshatra: string;
  pada: number;
  house: number | null;
  isApproximate?: boolean;
}

export interface BirthChart {
  date: string;
  exactTime: boolean;
  locationLabel: string;
  latitude?: number;
  longitude?: number;
  timezone?: string | null;
  hasLocation: boolean;
  lagna: string | null;
  lagnaLongitude: number | null;
  housePlacements: Record<string, number> | null;
  planets: Record<PlanetName, PlanetPosition>;
  moonNakshatra: string;
  moonPada: number;
  sunSign: SignName;
  moonSign: SignName;
  elementBalance: Record<string, number>;
  dasha: {
    currentMahadasha: string;
    currentAntardasha: string;
    currentMahadashaYears: number;
    currentAntardashaYears: number;
    nextMahadasha: Array<{ lord: string; start: string; end: string; years: number }>;
  };
}

const SIGN_NAMES: SignName[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
  'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
];

const PLANET_BODIES: Record<Exclude<PlanetName, 'Rahu' | 'Ketu'>, Body> = {
  Sun: Body.Sun,
  Moon: Body.Moon,
  Mercury: Body.Mercury,
  Venus: Body.Venus,
  Mars: Body.Mars,
  Jupiter: Body.Jupiter,
  Saturn: Body.Saturn,
};

const MAHA_DASHA_LORDS = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'] as const;
const MAHA_DASHA_YEARS = [7, 20, 6, 10, 7, 18, 16, 19, 17] as const;
const DEGREE_IN_SIGN = 30;

export const normalizeDegrees = (degrees: number): number => {
  const normalized = degrees % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

export const getSignFromLongitude = (longitude: number): SignName => {
  const normalized = normalizeDegrees(longitude);
  return SIGN_NAMES[Math.floor(normalized / DEGREE_IN_SIGN)] ?? 'Aries';
};

export const getNakshatraFromLongitude = (longitude: number) => {
  const normalized = normalizeDegrees(longitude);
  const sector = 360 / 27;
  const index = Math.floor(normalized / sector) % 27;
  const pada = Math.floor((normalized % sector) / (sector / 4)) + 1;
  return {
    name: NAKSHATRA_NAMES[index],
    index,
    pada,
  };
};

const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;
const radiansToDegrees = (radians: number) => (radians * 180) / Math.PI;

const getJulianDate = (date: Date) => date.getTime() / 86400000 + 2440587.5;

const getTFromJ2000 = (date: Date) => (getJulianDate(date) - 2451545.0) / 36525;

const getLahiriAyanamsa = (date: Date): number => {
  const msInYear = 365.25 * 24 * 60 * 60 * 1000;
  const yearStart = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
  const yearProgress = (date.getTime() - yearStart) / msInYear;
  const year = date.getUTCFullYear() + yearProgress;
  return 23.857 + (year - 2000) * (50.29 / 3600);
};

export const getSiderealLongitude = (date: Date, tropicalLongitude: number): number => {
  return normalizeDegrees(tropicalLongitude - getLahiriAyanamsa(date));
};

const getPlanetEclipticLongitude = (date: Date, planet: PlanetName): number => {
  if (planet === 'Rahu' || planet === 'Ketu') {
    const t = getTFromJ2000(date);
    const nodeLongitude = normalizeDegrees(125.04452 - 1934.136261 * t);
    const siderealLongitude = normalizeDegrees(nodeLongitude - getLahiriAyanamsa(date));
    return planet === 'Rahu' ? siderealLongitude : normalizeDegrees(siderealLongitude + 180);
  }

  const body = PLANET_BODIES[planet as Exclude<PlanetName, 'Rahu' | 'Ketu'>];
  const vector = GeoVector(body, date, false);
  const ecliptic = Ecliptic(vector);
  return getSiderealLongitude(date, normalizeDegrees(ecliptic.elon));
};

const getTrueObliquity = (date: Date) => {
  const t = getTFromJ2000(date);
  return 23.439291111 - (0.0130041667 * t) - (1.6667e-7 * t * t) - (5.0e-10 * t * t * t);
};

export const getAscendantLongitude = (date: Date, latitude: number, longitude: number): number | null => {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) || latitude < -90 || latitude > 90) {
    return null;
  }

  const gstHours = (date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) / 24;
  const gmstDegrees = normalizeDegrees((gstHours * 360) + 99.690983 + 360.98564736629 * (getJulianDate(date) - 2451545.0) / 36525);
  const lstDegrees = normalizeDegrees(gmstDegrees + longitude);
  const epsilon = degreesToRadians(getTrueObliquity(date));
  const latRad = degreesToRadians(latitude);
  const lstRad = degreesToRadians(lstDegrees);

  const numerator = Math.cos(lstRad);
  const denominator = -(
    Math.sin(lstRad) * Math.cos(epsilon) + Math.tan(latRad) * Math.sin(epsilon)
  );

  const tropicalAsc = radiansToDegrees(Math.atan2(numerator, denominator));
  const siderealAsc = normalizeDegrees(tropicalAsc - getLahiriAyanamsa(date));
  return normalizeDegrees(siderealAsc);
};

const getHouseNumberForLongitude = (longitude: number, lagnaLongitude: number | null): number | null => {
  if (lagnaLongitude === null || !Number.isFinite(lagnaLongitude)) {
    return null;
  }

  const relative = normalizeDegrees(longitude - lagnaLongitude);
  return Math.floor(relative / 30) + 1;
};

const getWholeSignHousePlacements = (lagna: string | null): Record<string, number> | null => {
  if (!lagna) {
    return null;
  }

  const lagnaIndex = SIGN_NAMES.indexOf(lagna as SignName);
  const placements: Record<string, number> = {};

  for (let house = 1; house <= 12; house += 1) {
    const sign = SIGN_NAMES[(lagnaIndex + (house - 1)) % 12];
    placements[`${house}st`] = house;
    placements[`${house}th`] = house;
    placements[sign] = house;
  }

  return placements;
};

const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

const addYears = (date: Date, years: number) => new Date(date.getTime() + years * 365.25 * 24 * 60 * 60 * 1000);

const getDashaState = (birthDate: Date, moonLongitude: number) => {
  const nakshatraIndex = getNakshatraFromLongitude(moonLongitude).index;
  const dashaIndex = nakshatraIndex % 9;
  const mahadashaLord = MAHA_DASHA_LORDS[dashaIndex];
  const dashaYears = MAHA_DASHA_YEARS[dashaIndex];
  const sectorSize = 360 / 27;
  const progress = normalizeDegrees(moonLongitude) % sectorSize;
  const fractionElapsed = progress / sectorSize;
  const balanceYears = (1 - fractionElapsed) * dashaYears;
  const currentDashaStart = addYears(birthDate, -balanceYears);

  const nextMahadasha: Array<{ lord: string; start: string; end: string; years: number }> = [];
  let cursor = new Date(currentDashaStart);

  for (let i = 0; i < 9; i += 1) {
    const lordIndex = (dashaIndex + i) % 9;
    const lord = MAHA_DASHA_LORDS[lordIndex];
    const years = MAHA_DASHA_YEARS[lordIndex];
    const start = new Date(cursor);
    const end = addYears(start, years);
    nextMahadasha.push({ lord, start: start.toISOString().slice(0, 10), end: end.toISOString().slice(0, 10), years });
    cursor = end;
  }

  return {
    currentDashaStart,
    currentMahadasha: mahadashaLord,
    currentMahadashaYears: dashaYears,
    balanceYears,
    nextMahadasha,
  };
};

const getCurrentDasha = (birthDate: Date, today: Date, moonLongitude: number) => {
  const dashaState = getDashaState(birthDate, moonLongitude);
  const nextMahadasha = dashaState.nextMahadasha;
  let currentMahadasha = dashaState.currentMahadasha;
  let currentAntardasha = 'Ketu';
  let currentMahadashaYears = dashaState.currentMahadashaYears;
  let currentAntardashaYears = 0;

  let cursor = new Date(dashaState.currentDashaStart);

  for (let i = 0; i < 9; i += 1) {
    const mahaIndex = (getNakshatraFromLongitude(moonLongitude).index % 9 + i) % 9;
    const mahaLord = MAHA_DASHA_LORDS[mahaIndex];
    const mahaYears = MAHA_DASHA_YEARS[mahaIndex];
    const mahaStart = new Date(cursor);
    const mahaEnd = addYears(mahaStart, mahaYears);

    if (today >= mahaStart && today < mahaEnd) {
      currentMahadasha = mahaLord;
      currentMahadashaYears = mahaYears;

      let antCursor = new Date(mahaStart);
      for (let j = 0; j < 9; j += 1) {
        const antLordIndex = (mahaIndex + j) % 9;
        const antLord = MAHA_DASHA_LORDS[antLordIndex];
        const antYears = (mahaYears * MAHA_DASHA_YEARS[antLordIndex]) / 120;
        const antStart = new Date(antCursor);
        const antEnd = addDays(antStart, antYears * 365.25);

        if (today >= antStart && today < antEnd) {
          currentAntardasha = antLord;
          currentAntardashaYears = antYears;
          break;
        }

        antCursor = antEnd;
      }
      break;
    }

    cursor = mahaEnd;
  }

  return {
    currentMahadasha,
    currentAntardasha,
    currentMahadashaYears,
    currentAntardashaYears,
    nextMahadasha,
  };
};

export const buildChart = (input: {
  date: string;
  latitude?: number;
  longitude?: number;
  birthTime?: string;
  timezone?: string | null;
  locationLabel?: string;
}): BirthChart => {
  const latitude = Number.isFinite(input.latitude) ? Number(input.latitude) : undefined;
  const longitude = Number.isFinite(input.longitude) ? Number(input.longitude) : undefined;
  const hasLocation = Boolean(
    latitude !== undefined &&
    longitude !== undefined &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180,
  );

  const exactTime = Boolean(input.birthTime && input.birthTime.trim());
  const safeTime = exactTime ? input.birthTime! : '12:00';
  const birthUtcDate = input.timezone && input.timezone.trim() && exactTime
    ? localBirthToUtc(input.date, safeTime, input.timezone)
    : new Date(Date.UTC(
        Number(input.date.slice(0, 4)),
        Number(input.date.slice(5, 7)) - 1,
        Number(input.date.slice(8, 10)),
        Number(safeTime.slice(0, 2)),
        Number(safeTime.slice(3, 5)),
      ));
  const moonLongitude = getPlanetEclipticLongitude(birthUtcDate, 'Moon');
  const moonNakshatra = getNakshatraFromLongitude(moonLongitude);

  const lagnaLongitude = hasLocation && latitude !== undefined && longitude !== undefined
    ? getAscendantLongitude(birthUtcDate, latitude, longitude)
    : null;
  const lagna = lagnaLongitude === null ? null : getSignFromLongitude(lagnaLongitude);

  const planetEntries = (Object.keys(PLANET_BODIES) as Array<Exclude<PlanetName, 'Rahu' | 'Ketu'>>).map((planetName) => {
    const longitudeValue = getPlanetEclipticLongitude(birthUtcDate, planetName);
    const sign = getSignFromLongitude(longitudeValue);
    const degree = normalizeDegrees(longitudeValue - (Math.floor(longitudeValue / DEGREE_IN_SIGN) * DEGREE_IN_SIGN));
    const nakshatra = getNakshatraFromLongitude(longitudeValue);
    return {
      name: planetName,
      longitude: longitudeValue,
      sign,
      degree,
      nakshatra: nakshatra.name,
      pada: nakshatra.pada,
      house: hasLocation ? getHouseNumberForLongitude(longitudeValue, lagnaLongitude) : null,
    } as PlanetPosition;
  });

  const rahuLongitude = getPlanetEclipticLongitude(birthUtcDate, 'Rahu');
  const ketuLongitude = getPlanetEclipticLongitude(birthUtcDate, 'Ketu');

  const planets: Record<PlanetName, PlanetPosition> = {
    Sun: planetEntries.find((entry) => entry.name === 'Sun') ?? {
      name: 'Sun',
      longitude: getPlanetEclipticLongitude(birthUtcDate, 'Sun'),
      sign: 'Aries',
      degree: 0,
      nakshatra: 'Ashwini',
      pada: 1,
      house: null,
    },
    Moon: planetEntries.find((entry) => entry.name === 'Moon') ?? {
      name: 'Moon',
      longitude: moonLongitude,
      sign: 'Aries',
      degree: 0,
      nakshatra: 'Ashwini',
      pada: 1,
      house: null,
    },
    Mercury: planetEntries.find((entry) => entry.name === 'Mercury') ?? {
      name: 'Mercury',
      longitude: getPlanetEclipticLongitude(birthUtcDate, 'Mercury'),
      sign: 'Aries',
      degree: 0,
      nakshatra: 'Ashwini',
      pada: 1,
      house: null,
    },
    Venus: planetEntries.find((entry) => entry.name === 'Venus') ?? {
      name: 'Venus',
      longitude: getPlanetEclipticLongitude(birthUtcDate, 'Venus'),
      sign: 'Aries',
      degree: 0,
      nakshatra: 'Ashwini',
      pada: 1,
      house: null,
    },
    Mars: planetEntries.find((entry) => entry.name === 'Mars') ?? {
      name: 'Mars',
      longitude: getPlanetEclipticLongitude(birthUtcDate, 'Mars'),
      sign: 'Aries',
      degree: 0,
      nakshatra: 'Ashwini',
      pada: 1,
      house: null,
    },
    Jupiter: planetEntries.find((entry) => entry.name === 'Jupiter') ?? {
      name: 'Jupiter',
      longitude: getPlanetEclipticLongitude(birthUtcDate, 'Jupiter'),
      sign: 'Aries',
      degree: 0,
      nakshatra: 'Ashwini',
      pada: 1,
      house: null,
    },
    Saturn: planetEntries.find((entry) => entry.name === 'Saturn') ?? {
      name: 'Saturn',
      longitude: getPlanetEclipticLongitude(birthUtcDate, 'Saturn'),
      sign: 'Aries',
      degree: 0,
      nakshatra: 'Ashwini',
      pada: 1,
      house: null,
    },
    Rahu: {
      name: 'Rahu',
      longitude: rahuLongitude,
      sign: getSignFromLongitude(rahuLongitude),
      degree: normalizeDegrees(rahuLongitude - (Math.floor(rahuLongitude / DEGREE_IN_SIGN) * DEGREE_IN_SIGN)),
      nakshatra: getNakshatraFromLongitude(rahuLongitude).name,
      pada: getNakshatraFromLongitude(rahuLongitude).pada,
      house: hasLocation ? getHouseNumberForLongitude(rahuLongitude, lagnaLongitude) : null,
    },
    Ketu: {
      name: 'Ketu',
      longitude: ketuLongitude,
      sign: getSignFromLongitude(ketuLongitude),
      degree: normalizeDegrees(ketuLongitude - (Math.floor(ketuLongitude / DEGREE_IN_SIGN) * DEGREE_IN_SIGN)),
      nakshatra: getNakshatraFromLongitude(ketuLongitude).name,
      pada: getNakshatraFromLongitude(ketuLongitude).pada,
      house: hasLocation ? getHouseNumberForLongitude(ketuLongitude, lagnaLongitude) : null,
    },
  };

  const dashaRaw = getCurrentDasha(birthUtcDate, new Date(), moonLongitude);
  const housePlacements = getWholeSignHousePlacements(lagna);
  const elements: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };

  (Object.values(planets) as PlanetPosition[]).forEach((planet) => {
    const signGroup = [
      { name: 'Fire', signs: ['Aries', 'Leo', 'Sagittarius'] },
      { name: 'Earth', signs: ['Taurus', 'Virgo', 'Capricorn'] },
      { name: 'Air', signs: ['Gemini', 'Libra', 'Aquarius'] },
      { name: 'Water', signs: ['Cancer', 'Scorpio', 'Pisces'] },
    ].find((group) => group.signs.includes(planet.sign));

    if (signGroup) {
      elements[signGroup.name] += 1;
    }
  });

  return {
    date: input.date,
    exactTime,
    locationLabel: input.locationLabel ?? 'Birth location',
    latitude,
    longitude,
    timezone: input.timezone ?? null,
    hasLocation,
    lagna,
    lagnaLongitude,
    housePlacements,
    planets,
    moonNakshatra: moonNakshatra.name,
    moonPada: moonNakshatra.pada,
    sunSign: planets.Sun.sign,
    moonSign: planets.Moon.sign,
    elementBalance: elements,
    dasha: {
      currentMahadasha: dashaRaw.currentMahadasha,
      currentAntardasha: dashaRaw.currentAntardasha,
      currentMahadashaYears: dashaRaw.currentMahadashaYears,
      currentAntardashaYears: dashaRaw.currentAntardashaYears,
      nextMahadasha: dashaRaw.nextMahadasha,
    },
  };
};

export const getApproximateChartSummary = (input: {
  date: string;
  latitude?: number;
  longitude?: number;
  timezone?: string | null;
  locationLabel?: string;
}) => buildChart({ ...input, birthTime: '12:00' });
