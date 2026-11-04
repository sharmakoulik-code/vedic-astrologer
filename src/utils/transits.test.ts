import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import type { BirthChart, PlanetName, SignName } from './chart';
import { buildChart, getNakshatraFromLongitude, normalizeDegrees } from './chart';
import {
  getDailyData,
  getMonthlyData,
  getSadeSati,
  getTaraBala,
  getTransitHouses,
  getTransitPositions,
  getWeeklyData,
} from './transits';

const fixtures = JSON.parse(
  readFileSync(path.resolve(__dirname, '__fixtures__/transits.json'), 'utf8'),
) as {
  cases: Array<{
    at: string;
    planets: Record<PlanetName, {
      longitude: number;
      sign: SignName;
      nakshatraIndex: number;
      pada: number;
      retrograde: boolean;
    }>;
    natalReferences: Record<string, {
      houses: Record<PlanetName, number>;
      taraBala: { count: number; tara: number; name: string; nakshatraIndex: number };
      sadeSati: { active: boolean; phase: 'rising' | 'peak' | 'setting' | null };
    }>;
  }>;
  crossingMonth: { year: number; month: number };
  signChanges: Array<{ planet: PlanetName; fromSign: SignName; toSign: SignName; at: string }>;
};

const PLANETS: PlanetName[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
const angularDifference = (left: number, right: number) => {
  const difference = normalizeDegrees(left - right);
  return difference > 180 ? difference - 360 : difference;
};
const isNearSignBoundary = (longitude: number) => {
  const degree = normalizeDegrees(longitude) % 30;
  return Math.min(degree, 30 - degree) < 0.05;
};
const isCaseNearSignBoundary = (testCase: (typeof fixtures.cases)[number]) =>
  PLANETS.some((planet) => isNearSignBoundary(testCase.planets[planet].longitude));

describe.each(fixtures.cases)('transit references at $at', (testCase) => {
  const date = new Date(testCase.at);
  const positions = getTransitPositions(date);

  it.each(PLANETS)('%s longitude matches Swiss Ephemeris', (planet) => {
    expect(Math.abs(angularDifference(positions[planet].longitude, testCase.planets[planet].longitude))).toBeLessThan(0.02);
  });

  it('derives sign, nakshatra, pada, and retrograde fields', () => {
    for (const planet of PLANETS) {
      expect(positions[planet].sign).toBe(testCase.planets[planet].sign);
      expect(positions[planet].nakshatraIndex).toBe(testCase.planets[planet].nakshatraIndex);
      expect(positions[planet].pada).toBe(testCase.planets[planet].pada);
      expect(positions[planet].retrograde).toBe(testCase.planets[planet].retrograde);
      expect(positions[planet].nakshatra).toBe(getNakshatraFromLongitude(positions[planet].longitude).name);
    }
    expect(positions.Rahu.retrograde).toBe(true);
    expect(positions.Ketu.retrograde).toBe(true);
  });

  it.skipIf(isCaseNearSignBoundary(testCase))('matches whole-sign houses, Tara Bala, and Sade Sati references', () => {
    for (const [reference, expected] of Object.entries(testCase.natalReferences)) {
      const [moonSign, natalNakshatraIndex] = reference.split('-') as [SignName, string];
      expect(getTransitHouses(moonSign, date)).toEqual(expected.houses);
      expect(getTaraBala(Number(natalNakshatraIndex), date)).toEqual(expected.taraBala);
      expect(getSadeSati(moonSign, date)).toEqual(expected.sadeSati);
    }
  });
});

describe('transit calendar data', () => {
  const natalChart = buildChart({
    date: '1995-06-15',
    birthTime: '18:30',
    timezone: 'Asia/Kolkata',
    latitude: 28.6139,
    longitude: 77.209,
  });

  it('uses local calendar noon for daily calculations', () => {
    const date = new Date(2024, 0, 15, 3, 0, 0);
    const daily = getDailyData(natalChart, date);
    expect(daily.date).toBe('2024-01-15');
    expect(new Date(daily.at).getHours()).toBe(12);
    expect(daily.planets).toHaveProperty('Sun');
    expect(daily.planets).toHaveProperty('Mars');
    expect(daily.planets).toHaveProperty('Mercury');
    expect(daily.planets).toHaveProperty('Venus');
    expect(daily.taraBala.tara).toBeGreaterThanOrEqual(1);
    expect(daily.taraBala.tara).toBeLessThanOrEqual(9);
  });

  it('reports the weekly Moon sign and natal-Moon house for seven local days', () => {
    const weekly = getWeeklyData(natalChart, new Date(2024, 0, 1));
    expect(weekly.days).toHaveLength(7);
    expect(weekly.days.every((day) => day.moon.sign && day.moon.house >= 1 && day.moon.house <= 12)).toBe(true);
    expect(weekly.moonSignUncertain).toBe(false);
  });

  it('flags uncertain natal Moon signs near a boundary when birth time is unknown', () => {
    const uncertainChart: BirthChart = {
      ...natalChart,
      exactTime: false,
      planets: {
        ...natalChart.planets,
        Moon: { ...natalChart.planets.Moon, longitude: 29 },
      },
    };
    expect(getDailyData(uncertainChart, new Date(2024, 0, 15)).moonSignUncertain).toBe(true);
  });

  it('finds monthly sign changes within one hour of Swiss Ephemeris crossings', () => {
    const monthly = getMonthlyData(natalChart, fixtures.crossingMonth.year, fixtures.crossingMonth.month);
    const actual = monthly.signChanges;
    const firstOfMonth = new Date(fixtures.crossingMonth.year, fixtures.crossingMonth.month - 1, 1, 12);
    const expectedHouses = getTransitHouses(natalChart.moonSign, firstOfMonth);
    expect(monthly.houses).toEqual({
      Jupiter: expectedHouses.Jupiter,
      Saturn: expectedHouses.Saturn,
      Rahu: expectedHouses.Rahu,
      Ketu: expectedHouses.Ketu,
    });
    expect(monthly.sadeSati).toEqual(getSadeSati(natalChart.moonSign, firstOfMonth));
    const expected = fixtures.signChanges.filter((change) => {
      const date = new Date(change.at);
      return date.getUTCDate() >= 2 && date.getUTCDate() <= 29;
    });

    for (const crossing of expected) {
      const matchingChanges = actual.filter((item) =>
        item.planet === crossing.planet &&
        item.fromSign === crossing.fromSign &&
        item.toSign === crossing.toSign,
      );
      const match = matchingChanges.sort((left, right) =>
        Math.abs(Date.parse(left.at) - Date.parse(crossing.at)) -
        Math.abs(Date.parse(right.at) - Date.parse(crossing.at)),
      )[0];
      expect(match, `${crossing.planet} ${crossing.fromSign}-${crossing.toSign}`).toBeDefined();
      expect(Math.abs(Date.parse(match!.at) - Date.parse(crossing.at))).toBeLessThanOrEqual(60 * 60 * 1000);
    }
  });

  it('changes the daily Moon house about every 2.25 days over 30 days', () => {
    const houses = Array.from({ length: 30 }, (_, day) =>
      getDailyData(natalChart, new Date(2024, 0, 1 + day)).moon.house,
    );
    const changeDays = houses.flatMap((house, day) =>
      day > 0 && house !== houses[day - 1] ? [day] : [],
    );
    const intervals = changeDays.slice(1).map((day, index) => day - changeDays[index]);
    const averageInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;

    expect(changeDays.length).toBeGreaterThanOrEqual(11);
    expect(changeDays.length).toBeLessThanOrEqual(15);
    expect(averageInterval).toBeGreaterThan(1.8);
    expect(averageInterval).toBeLessThan(2.7);
  });
});
