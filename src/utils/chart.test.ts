import { describe, expect, it } from 'vitest';
import { buildChart } from './chart';

describe('chart utility', () => {
  it('returns a verified Sagittarius Sun and Leo Moon for the 2024-01-01 sample', () => {
    const chart = buildChart({
      date: '2024-01-01',
      latitude: 28.6139,
      longitude: 77.209,
      birthTime: '12:00',
      locationLabel: 'New Delhi',
    });

    expect(chart.planets.Sun.sign).toBe('Sagittarius');
    expect(chart.planets.Moon.sign).toBe('Leo');
    expect(chart.moonNakshatra).toBeTruthy();
  });

  it('returns a verified Gemini Sun and Capricorn Moon for the 1995-06-15 sample', () => {
    const chart = buildChart({
      date: '1995-06-15',
      latitude: 28.6139,
      longitude: 77.209,
      birthTime: '18:30',
      locationLabel: 'New Delhi',
    });

    expect(chart.planets.Sun.sign).toBe('Gemini');
    expect(chart.planets.Moon.sign).toBe('Capricorn');
    expect(chart.moonPada).toBeGreaterThan(0);
  });

  it('returns a verified Aquarius Sun and Gemini Moon for the 1990-03-05 sample', () => {
    const chart = buildChart({
      date: '1990-03-05',
      latitude: 28.6139,
      longitude: 77.209,
      birthTime: '05:45',
      locationLabel: 'New Delhi',
    });

    expect(chart.planets.Sun.sign).toBe('Aquarius');
    expect(chart.planets.Moon.sign).toBe('Gemini');
  });
});
