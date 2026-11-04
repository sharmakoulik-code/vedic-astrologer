import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { buildChart } from '../../utils/chart';
import { KundliSection } from './KundliSection';

const render = (input: Parameters<typeof buildChart>[0]) =>
  renderToStaticMarkup(<KundliSection chart={buildChart(input)} />);

describe('KundliSection', () => {
  it('draws the chart, planet table with houses and the dasha table for a complete birth', () => {
    const html = render({ date: '1995-06-15', birthTime: '18:30', timezone: 'Asia/Kolkata', latitude: 28.6139, longitude: 77.209 });
    expect(html).toContain('id="kundli-chart"');
    expect(html).toContain('aria-label="North Indian style Rashi chart.');
    expect(html).toContain('House 1, Scorpio: Ascendant, Jupiter');
    expect(html).toContain('Vimshottari Dasha periods');
    expect(html).toMatch(/\d{1,2} [A-Z][a-z]{2,3} \d{4}/);
    expect(html).toContain('Rahu');
  });

  it('hides the diagram and houses without a location', () => {
    const html = render({ date: '1995-06-15', birthTime: '18:30', timezone: 'Asia/Kolkata' });
    expect(html).not.toContain('id="kundli-chart"');
    expect(html).toContain('need a birth place');
    expect(html).not.toContain('>House<');
  });

  it('hides the diagram when the timezone is missing and hides dasha periods', () => {
    const html = render({ date: '1995-06-15', birthTime: '18:30', latitude: 28.6139, longitude: 77.209 });
    expect(html).not.toContain('id="kundli-chart"');
    expect(html).not.toContain('Vimshottari Dasha periods');
    expect(html).toContain('Dasha periods are hidden');
  });

  it('hides the diagram and dasha when the birth time is missing', () => {
    const html = render({ date: '1995-06-15', timezone: 'Asia/Kolkata', latitude: 28.6139, longitude: 77.209 });
    expect(html).not.toContain('id="kundli-chart"');
    expect(html).not.toContain('Vimshottari Dasha periods');
  });
});
