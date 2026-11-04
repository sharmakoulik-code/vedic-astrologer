import type { BirthChart, PlanetName, SignName } from './chart';

export const SIGN_ORDER: SignName[] = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

export const PLANET_ORDER: PlanetName[] = [
  'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu',
];

export const PLANET_ABBR: Record<PlanetName, string> = {
  Sun: 'Su', Moon: 'Mo', Mars: 'Ma', Mercury: 'Me', Jupiter: 'Ju',
  Venus: 'Ve', Saturn: 'Sa', Rahu: 'Ra', Ketu: 'Ke',
};

/** Degrees within a sign as 15°02′. Minutes are truncated (never rounded), so 29.9999 is 29°59′. */
export const formatDegree = (degreeInSign: number): string => {
  if (!Number.isFinite(degreeInSign)) return '–';
  const safe = Math.min(Math.max(degreeInSign, 0), 29.999999);
  let degrees = Math.floor(safe + 1e-9);
  let minutes = Math.floor((safe - degrees) * 60 + 1e-9);
  if (minutes >= 60) {
    minutes = 0;
    degrees += 1;
  }
  return `${degrees}°${String(minutes).padStart(2, '0')}′`;
};

export interface KundliPlanet {
  name: PlanetName;
  abbr: string;
  degreeLabel: string;
}

export interface NorthHouseCell {
  house: number;
  signNumber: number;
  sign: SignName;
  planets: KundliPlanet[];
  isLagna: boolean;
}

export interface SouthSignCell {
  sign: SignName;
  signNumber: number;
  planets: KundliPlanet[];
  isLagna: boolean;
}

const toKundliPlanet = (chart: BirthChart, name: PlanetName): KundliPlanet => ({
  name,
  abbr: PLANET_ABBR[name],
  degreeLabel: formatDegree(chart.planets[name].degree),
});

const lagnaSignIndex = (chart: BirthChart): number | null => {
  if (!chart.lagna) return null;
  const index = SIGN_ORDER.indexOf(chart.lagna as SignName);
  return index < 0 ? null : index;
};

/** House n of a North Indian chart. Returns null when the Lagna is not available. */
export const getNorthLayout = (chart: BirthChart): NorthHouseCell[] | null => {
  const lagnaIndex = lagnaSignIndex(chart);
  if (lagnaIndex === null) return null;

  return Array.from({ length: 12 }, (_, i) => {
    const house = i + 1;
    const signIndex = (lagnaIndex + i) % 12;
    return {
      house,
      signNumber: signIndex + 1,
      sign: SIGN_ORDER[signIndex],
      planets: PLANET_ORDER
        .filter((name) => SIGN_ORDER.indexOf(chart.planets[name].sign) === signIndex)
        .map((name) => toKundliPlanet(chart, name)),
      isLagna: house === 1,
    };
  });
};

/** The 12 sign cells of a South Indian chart (fixed signs). Lagna flag is false when unknown. */
export const getSouthLayout = (chart: BirthChart): SouthSignCell[] => {
  const lagnaIndex = lagnaSignIndex(chart);
  return SIGN_ORDER.map((sign, signIndex) => ({
    sign,
    signNumber: signIndex + 1,
    planets: PLANET_ORDER
      .filter((name) => chart.planets[name].sign === sign)
      .map((name) => toKundliPlanet(chart, name)),
    isLagna: lagnaIndex === signIndex,
  }));
};

/** Grid position (column, row; 0-3) of each sign in the South Indian layout. */
export const SOUTH_GRID_POSITION: Record<SignName, [number, number]> = {
  Pisces: [0, 0], Aries: [1, 0], Taurus: [2, 0], Gemini: [3, 0],
  Cancer: [3, 1], Leo: [3, 2],
  Virgo: [3, 3], Libra: [2, 3], Scorpio: [1, 3], Sagittarius: [0, 3],
  Capricorn: [0, 2], Aquarius: [0, 1],
};

/** North Indian house polygons on a 400x400 canvas. Houses run anticlockwise from the top kite. */
export const NORTH_POLYGONS: Record<number, Array<[number, number]>> = {
  1: [[200, 200], [100, 100], [200, 0], [300, 100]],
  2: [[0, 0], [200, 0], [100, 100]],
  3: [[0, 0], [100, 100], [0, 200]],
  4: [[200, 200], [100, 300], [0, 200], [100, 100]],
  5: [[0, 200], [100, 300], [0, 400]],
  6: [[0, 400], [100, 300], [200, 400]],
  7: [[200, 200], [300, 300], [200, 400], [100, 300]],
  8: [[200, 400], [300, 300], [400, 400]],
  9: [[400, 400], [300, 300], [400, 200]],
  10: [[200, 200], [300, 100], [400, 200], [300, 300]],
  11: [[400, 200], [300, 100], [400, 0]],
  12: [[400, 0], [300, 100], [200, 0]],
};

export const polygonCentroid = (points: Array<[number, number]>): [number, number] => {
  const sum = points.reduce((acc, [x, y]) => [acc[0] + x, acc[1] + y], [0, 0]);
  return [sum[0] / points.length, sum[1] / points.length];
};

/** Splits items into display rows (at most `perRow` per row). */
export const chunk = <T,>(items: T[], perRow: number): T[][] => {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += perRow) rows.push(items.slice(i, i + perRow));
  return rows;
};
