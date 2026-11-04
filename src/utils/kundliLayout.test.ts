import { describe, expect, it } from 'vitest';
import { buildChart } from './chart';
import { formatDegree, getNorthLayout, getSouthLayout } from './kundliLayout';

const delhi = buildChart({
  date: '1995-06-15', birthTime: '18:30', timezone: 'Asia/Kolkata', latitude: 28.6139, longitude: 77.209,
});

describe('formatDegree', () => {
  it('truncates minutes and never rounds up to 30°00′', () => {
    expect(formatDegree(0)).toBe('0°00′');
    expect(formatDegree(14.5)).toBe('14°30′');
    expect(formatDegree(29.9999)).toBe('29°59′');
    expect(formatDegree(1.2)).toBe('1°12′');
    expect(formatDegree(15.0333333)).toBe('15°01′');
  });
  it('handles invalid input', () => {
    expect(formatDegree(Number.NaN)).toBe('–');
  });
});

describe('Kundli layout, Delhi 15 Jun 1995 18:30 IST (Lagna Scorpio)', () => {
  it('North chart houses 1..12 carry sign numbers 8,9,10,11,12,1,2,3,4,5,6,7', () => {
    const cells = getNorthLayout(delhi)!;
    expect(cells.map((c) => c.signNumber)).toEqual([8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7]);
    expect(cells[0].isLagna).toBe(true);
    expect(cells.filter((c) => c.isLagna)).toHaveLength(1);
  });

  it('puts every planet in the correct whole-sign house', () => {
    const cells = getNorthLayout(delhi)!;
    const houseOf = (name: string) => cells.find((c) => c.planets.some((p) => p.name === name))!.house;
    expect({
      Sun: houseOf('Sun'), Moon: houseOf('Moon'), Mercury: houseOf('Mercury'), Venus: houseOf('Venus'),
      Mars: houseOf('Mars'), Jupiter: houseOf('Jupiter'), Saturn: houseOf('Saturn'),
      Rahu: houseOf('Rahu'), Ketu: houseOf('Ketu'),
    }).toEqual({ Sun: 8, Moon: 3, Mercury: 7, Venus: 7, Mars: 10, Jupiter: 1, Saturn: 5, Rahu: 12, Ketu: 6 });
  });

  it('lists all nine planets exactly once', () => {
    const names = getNorthLayout(delhi)!.flatMap((c) => c.planets.map((p) => p.name));
    expect(names.sort()).toEqual(
      ['Jupiter', 'Ketu', 'Mars', 'Mercury', 'Moon', 'Rahu', 'Saturn', 'Sun', 'Venus'],
    );
  });

  it('South chart: Scorpio holds Asc and Jupiter, Gemini the Sun, Capricorn the Moon', () => {
    const cells = getSouthLayout(delhi);
    const cell = (sign: string) => cells.find((c) => c.sign === sign)!;
    expect(cell('Scorpio').isLagna).toBe(true);
    expect(cell('Scorpio').planets.map((p) => p.name)).toEqual(['Jupiter']);
    expect(cell('Gemini').planets.map((p) => p.name)).toEqual(['Sun']);
    expect(cell('Capricorn').planets.map((p) => p.name)).toEqual(['Moon']);
    expect(cells.filter((c) => c.isLagna)).toHaveLength(1);
  });

  it('returns no North layout when the Lagna is unavailable', () => {
    const noLocation = buildChart({ date: '1995-06-15', birthTime: '18:30', timezone: 'Asia/Kolkata' });
    expect(getNorthLayout(noLocation)).toBeNull();
    expect(getSouthLayout(noLocation).some((c) => c.isLagna)).toBe(false);
  });
});
