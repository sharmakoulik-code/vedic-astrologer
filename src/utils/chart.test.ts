import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildChart } from './chart';
import { localBirthToUtc } from './time';

const fixturePath = path.resolve(__dirname, '__fixtures__/reference.json');
const fixtureExists = existsSync(fixturePath);
const skipMessage = 'Reference fixture missing. Run: pip install pyswisseph && python scripts/gen-fixtures.py';
const maybeIt = fixtureExists ? it : it.skip;

const fixture = fixtureExists ? JSON.parse(readFileSync(fixturePath, 'utf8')) as {
  samples: Array<{
    date: string;
    time: string;
    timezone: string;
    latitude: number;
    longitude: number;
    sunLongitude: number;
    moonLongitude: number;
  }>;
} : null;

describe('chart utility', () => {
  it('converts a local birth time to the correct UTC instant for the selected timezone', () => {
    const utcInstant = localBirthToUtc('2024-01-15', '12:30', 'Asia/Kolkata');
    expect(utcInstant.toISOString()).toBe('2024-01-15T07:00:00.000Z');
  });

  it('does not silently default to 0,0 when location coordinates are missing', () => {
    const chart = buildChart({
      date: '2024-01-15',
      birthTime: '12:30',
      timezone: 'Asia/Kolkata',
      locationLabel: 'Unknown location',
    });

    expect(chart.hasLocation).toBe(false);
    expect(chart.lagna).toBeNull();
    expect(chart.housePlacements).toBeNull();
    expect(chart.locationLabel).toBe('Unknown location');
  });

  maybeIt(`matches the generated Swiss Ephemeris reference fixture${fixtureExists ? '' : ` — ${skipMessage}`}`, () => {
    if (!fixture) {
      return;
    }

    for (const sample of fixture.samples) {
      const chart = buildChart({
        date: sample.date,
        latitude: sample.latitude,
        longitude: sample.longitude,
        birthTime: sample.time,
        timezone: sample.timezone,
        locationLabel: 'Reference fixture',
      });

      expect(chart.planets.Sun.longitude).toBeCloseTo(sample.sunLongitude, 1);
      expect(chart.planets.Moon.longitude).toBeCloseTo(sample.moonLongitude, 1);
    }
  });
});
