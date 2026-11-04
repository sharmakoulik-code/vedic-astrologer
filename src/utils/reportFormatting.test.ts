import { describe, expect, it } from 'vitest';
import { capitalizeName, formatReportDate } from './reportFormatting';

describe('report formatting', () => {
  it('formats dates as day, abbreviated month, and year', () => {
    expect(formatReportDate('1995-06-15')).toBe('15 Jun 1995');
  });

  it('capitalizes each word in a person name', () => {
    expect(capitalizeName('rahul das')).toBe('Rahul Das');
  });
});
