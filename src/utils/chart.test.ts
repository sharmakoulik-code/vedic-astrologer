import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildChart, normalizeDegrees } from './chart';
import { localBirthToUtc } from './time';

const fixturePath = path.resolve(__dirname, '__fixtures__/reference.json');

interface RefCase {
  name: string; date: string; time: string; timezone: string;
  latitude: number; longitude: number; utcIso: string;
  planets: Record<string, number>; ascendant: number; dashaLord: string;
  periods: Array<{ lord: string; start: string; end: string }>;
}

// Signed shortest difference between two angles, in degrees.
const diff = (a: number, b: number) => {
  const x = normalizeDegrees(a - b);
  return x > 180 ? x - 360 : x;
};
const daysBetween = (a: string, b: string) => Math.abs((Date.parse(a) - Date.parse(b)) / 86_400_000);

describe('chart utility', () => {
  it('converts a local birth time to the correct UTC instant', () => {
    expect(localBirthToUtc('2024-01-15', '12:30', 'Asia/Kolkata').toISOString()).toBe('2024-01-15T07:00:00.000Z');
  });

  it('does not silently default to 0,0 when coordinates are missing', () => {
    const chart = buildChart({ date: '2024-01-15', birthTime: '12:30', timezone: 'Asia/Kolkata' });
    expect(chart.hasLocation).toBe(false);
    expect(chart.lagna).toBeNull();
    expect(chart.housePlacements).toBeNull();
  });

  it('omits Lagna and house placements when a birth time has no timezone', () => {
    const chart = buildChart({
      date: '2024-01-15',
      birthTime: '12:30',
      latitude: 12.9716,
      longitude: 77.5946,
    });

    expect(chart.needsTimezone).toBe(true);
    expect(chart.hasLocation).toBe(false);
    expect(chart.lagna).toBeNull();
    expect(chart.lagnaLongitude).toBeNull();
    expect(chart.housePlacements).toBeNull();
    expect(Object.values(chart.planets).every((planet) => planet.house === null)).toBe(true);
  });

  it('has a reference fixture (run: pip install pyswisseph tzdata && python scripts/gen-fixtures.py)', () => {
    expect(existsSync(fixturePath)).toBe(true);
  });

  if (!existsSync(fixturePath)) return;
  const cases = (JSON.parse(readFileSync(fixturePath, 'utf8')) as { cases: RefCase[] }).cases;

  describe.each(cases)('matches Swiss Ephemeris: $name', (c) => {
    const chart = buildChart({
      date: c.date, birthTime: c.time, timezone: c.timezone,
      latitude: c.latitude, longitude: c.longitude,
    });

    it('converts local time to the right UTC instant', () => {
      expect(localBirthToUtc(c.date, c.time, c.timezone).toISOString().slice(0, 16)).toBe(c.utcIso.slice(0, 16));
    });

    it.each(['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu'])(
      '%s is within 0.02 degrees', (p) => {
        expect(Math.abs(diff((chart.planets as any)[p].longitude, c.planets[p]))).toBeLessThan(0.02);
      });

    it('Lagna (ascendant) is within 0.1 degrees', () => {
      expect(chart.lagnaLongitude).not.toBeNull();
      expect(Math.abs(diff(chart.lagnaLongitude as number, c.ascendant))).toBeLessThan(0.1);
    });

    it('Vimshottari dasha order is exact and dates are within 4 days', () => {
      expect(chart.dasha.nextMahadasha[0].lord).toBe(c.dashaLord);
      c.periods.forEach((ref, i) => {
        const got = chart.dasha.nextMahadasha[i];
        expect(got.lord).toBe(ref.lord);
        expect(daysBetween(got.start, ref.start)).toBeLessThanOrEqual(4);
        expect(daysBetween(got.end, ref.end)).toBeLessThanOrEqual(4);
      });
    });
  });
});
