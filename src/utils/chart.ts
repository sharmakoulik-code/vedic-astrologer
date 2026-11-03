import { Body, Ecliptic, GeoVector, SiderealTime } from 'astronomy-engine';

export type PlanetName = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Rahu' | 'Ketu';
export type SignName = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

export interface PlanetPosition {
  name: PlanetName;
  longitude: number;
  sign: SignName;
  degree: number;
  nakshatra: string;
  pada: number;
  house: number;
  isApproximate?: boolean;
}

export interface BirthChart {
  date: string;
  exactTime: boolean;
  locationLabel: string;
  latitude: number;
  longitude: number;
  lagna: string;
  lagnaLongitude: number;
  housePlacements: Record<string, number>;
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
const MAHA_DASHA_YEARS = [7, 20, 6, 10, 7, 18, 16, 19, 17];

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
  const index = Math.floor(normalized / (360 / 27));
  const pada = Math.floor(((normalized % (360 / 27)) / (360 / 27)) * 4) + 1;
  return {
    name: NAKSHATRA_NAMES[index % 27],
    index: index % 27,
    pada,
  };
};

const getLahiriAyanamsa = (date: Date): number => {
  const yearFloat = date.getTime() / 31557600000 + 1970;
  const yearOffset = yearFloat - 2000;
  return 23.881 - 0.01397 * yearOffset;
};

export const getSiderealLongitude = (date: Date, tropicalLongitude: number): number => {
  return normalizeDegrees(tropicalLongitude - getLahiriAyanamsa(date));
};

const getPlanetEclipticLongitude = (date: Date, planet: PlanetName): number => {
  const body = planet === 'Rahu' || planet === 'Ketu' ? Body.Moon : PLANET_BODIES[planet as Exclude<PlanetName, 'Rahu' | 'Ketu'>];
  const vector = GeoVector(body, date, false);
  const ecliptic = Ecliptic(vector);
  const tropical = normalizeDegrees(ecliptic.elon);
  return getSiderealLongitude(date, tropical);
};

export const getAscendantLongitude = (date: Date, latitude: number, longitude: number): number => {
  const localSiderealTimeDegrees = normalizeDegrees(SiderealTime(date) * 15 + longitude);
  const epsilon = 23.439; // degrees; enough for a working ascendant approximation
  const latRad = (latitude * Math.PI) / 180;
  const hRad = ((localSiderealTimeDegrees - longitude) * Math.PI) / 180;
  const numerator = Math.sin(hRad);
  const denominator = Math.cos(hRad) * Math.cos((epsilon * Math.PI) / 180) - Math.tan(latRad) * Math.sin((epsilon * Math.PI) / 180);
  const asc = (Math.atan2(numerator, denominator) * 180) / Math.PI;
  return normalizeDegrees(asc);
};

const getHouseNumberForLongitude = (longitude: number, lagnaLongitude: number): number => {
  const relative = normalizeDegrees(longitude - lagnaLongitude);
  return Math.floor(relative / 30) + 1;
};

export const buildChart = (input: {
  date: string;
  latitude?: number;
  longitude?: number;
  birthTime?: string;
  locationLabel?: string;
}): BirthChart => {
  const latitude = Number.isFinite(input.latitude) ? input.latitude! : 0;
  const longitude = Number.isFinite(input.longitude) ? input.longitude! : 0;
  const exactTime = Boolean(input.birthTime && input.birthTime.trim());
  const safeTime = exactTime ? input.birthTime! : '12:00';
  const dateWithTime = new Date(`${input.date}T${safeTime}:00Z`);
  const lagnaLongitude = getAscendantLongitude(dateWithTime, latitude, longitude);
  const lagna = getSignFromLongitude(lagnaLongitude);

  const planetEntries = Object.keys(PLANET_BODIES).map((planetName) => {
    const name = planetName as Exclude<PlanetName, 'Rahu' | 'Ketu'>;
    const longitude = getPlanetEclipticLongitude(dateWithTime, name);
    const sign = getSignFromLongitude(longitude);
    const degree = normalizeDegrees(longitude - (Math.floor(longitude / 30) * 30));
    const nakshatraInfo = getNakshatraFromLongitude(longitude);
    return {
      name,
      longitude,
      sign,
      degree,
      nakshatra: nakshatraInfo.name,
      pada: nakshatraInfo.pada,
      house: getHouseNumberForLongitude(longitude, lagnaLongitude),
    } as PlanetPosition;
  });

  const rahuLongitude = normalizeDegrees(getPlanetEclipticLongitude(dateWithTime, 'Moon') + 180);
  const ketuLongitude = normalizeDegrees(rahuLongitude + 180);

  const planets: Record<PlanetName, PlanetPosition> = {
    ...Object.fromEntries(planetEntries.map((entry) => [entry.name, entry])) as Record<Exclude<PlanetName, 'Rahu' | 'Ketu'>, PlanetPosition>,
    Rahu: {
      name: 'Rahu',
      longitude: rahuLongitude,
      sign: getSignFromLongitude(rahuLongitude),
      degree: normalizeDegrees(rahuLongitude - (Math.floor(rahuLongitude / 30) * 30)),
      nakshatra: getNakshatraFromLongitude(rahuLongitude).name,
      pada: getNakshatraFromLongitude(rahuLongitude).pada,
      house: getHouseNumberForLongitude(rahuLongitude, lagnaLongitude),
    },
    Ketu: {
      name: 'Ketu',
      longitude: ketuLongitude,
      sign: getSignFromLongitude(ketuLongitude),
      degree: normalizeDegrees(ketuLongitude - (Math.floor(ketuLongitude / 30) * 30)),
      nakshatra: getNakshatraFromLongitude(ketuLongitude).name,
      pada: getNakshatraFromLongitude(ketuLongitude).pada,
      house: getHouseNumberForLongitude(ketuLongitude, lagnaLongitude),
    },
  };

  const moonLongitude = planets.Moon.longitude;
  const moonNakshatra = getNakshatraFromLongitude(moonLongitude);
  const totalMoonIndex = Math.floor((moonLongitude % 360) / 13.333333);
  const currentMahadashaIndex = Math.floor((moonNakshatra.index / 3) % 9);
  const currentMahadashaYears = MAHA_DASHA_YEARS[currentMahadashaIndex] ?? 20;
  const currentAntardasha = MAHA_DASHA_LORDS[(currentMahadashaIndex + 1) % MAHA_DASHA_LORDS.length];
  const currentAntardashaYears = 1.5 + ((totalMoonIndex % 9) / 9) * 2.5;

  const nextMahadasha = MAHA_DASHA_LORDS.map((lord, index) => {
    const years = MAHA_DASHA_YEARS[(currentMahadashaIndex + index) % MAHA_DASHA_YEARS.length] ?? 20;
    const start = new Date(dateWithTime.getTime() + (index * 365.2425 * years * 24 * 60 * 60 * 1000));
    const end = new Date(start.getTime() + years * 365.2425 * 24 * 60 * 60 * 1000);
    return {
      lord,
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
      years,
    };
  }).slice(0, 3);

  const housePlacements: Record<string, number> = {
    '1st': 1,
    '2nd': 2,
    '3rd': 3,
    '4th': 4,
    '5th': 5,
    '6th': 6,
    '7th': 7,
    '8th': 8,
    '9th': 9,
    '10th': 10,
    '11th': 11,
    '12th': 12,
  };

  const elements: Record<string, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  Object.values(planets).forEach((planet) => {
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
      currentMahadasha: MAHA_DASHA_LORDS[currentMahadashaIndex] ?? 'Moon',
      currentAntardasha: currentAntardasha,
      currentMahadashaYears,
      currentAntardashaYears,
      nextMahadasha,
    },
  };
};

export const getApproximateChartSummary = (input: { date: string; latitude?: number; longitude?: number; locationLabel?: string; }) => buildChart({ ...input, birthTime: '12:00' });
