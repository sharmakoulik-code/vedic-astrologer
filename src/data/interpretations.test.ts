import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  buildActionPlanInterpretation,
  buildCareerInterpretation,
  buildFutureInterpretation,
  buildPersonalityInterpretation,
  buildRelationshipInterpretation,
  buildSuccessInterpretation,
  getLuckyAssociations,
} from './interpretations';
import { buildChart } from '../utils/chart';

const fixtures = JSON.parse(
  readFileSync(path.resolve(__dirname, '../utils/__fixtures__/reference.json'), 'utf8'),
) as {
  cases: Array<{
    date: string;
    time: string;
    timezone: string;
    latitude: number;
    longitude: number;
  }>;
};

const [firstCase, secondCase] = fixtures.cases;
const firstChart = buildChart({
  date: firstCase.date,
  birthTime: firstCase.time,
  timezone: firstCase.timezone,
  latitude: firstCase.latitude,
  longitude: firstCase.longitude,
});
const secondChart = buildChart({
  date: secondCase.date,
  birthTime: secondCase.time,
  timezone: secondCase.timezone,
  latitude: secondCase.latitude,
  longitude: secondCase.longitude,
});
const now = new Date('2026-11-04T12:00:00Z');

describe('chart-driven report interpretations', () => {
  it('produces different personality, career, relationship, future, success, and action text for different charts', () => {
    expect(buildPersonalityInterpretation(firstChart)).not.toEqual(buildPersonalityInterpretation(secondChart));
    expect(buildCareerInterpretation(firstChart)).not.toEqual(buildCareerInterpretation(secondChart));
    expect(buildRelationshipInterpretation(firstChart)).not.toEqual(buildRelationshipInterpretation(secondChart));
    expect(buildFutureInterpretation(firstChart, now)).not.toEqual(buildFutureInterpretation(secondChart, now));
    expect(buildSuccessInterpretation(firstChart)).not.toBe(buildSuccessInterpretation(secondChart));
    expect(buildActionPlanInterpretation(firstChart)).not.toEqual(buildActionPlanInterpretation(secondChart));
    expect(getLuckyAssociations(firstChart)).not.toEqual(getLuckyAssociations(secondChart));
  });

  it('hides house-based copy when location or birth time is unavailable', () => {
    const noLocation = buildChart({
      date: firstCase.date,
      birthTime: firstCase.time,
      timezone: firstCase.timezone,
    });
    const noBirthTime = buildChart({
      date: firstCase.date,
      latitude: firstCase.latitude,
      longitude: firstCase.longitude,
      timezone: firstCase.timezone,
    });

    for (const chart of [noLocation, noBirthTime]) {
      expect(buildCareerInterpretation(chart)).toMatchObject({
        available: false,
        career: null,
        finance: null,
      });
      expect(buildRelationshipInterpretation(chart)).toMatchObject({
        available: false,
        partnership: null,
        romance: null,
        healthHabits: null,
      });
      expect(buildPersonalityInterpretation(chart).lagna).toBeNull();
      expect(buildActionPlanInterpretation(chart).lagnaRulerName).toBeNull();
    }
  });
});

import { ordinal } from './interpretations';
describe('ordinal', () => {
  it('formats house numbers correctly', () => {
    expect([1,2,3,4,10,11,12].map(ordinal)).toEqual(['1st','2nd','3rd','4th','10th','11th','12th']);
  });
});
