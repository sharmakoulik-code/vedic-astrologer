import React from 'react';
import type { BirthChart } from '../../utils/chart';
import {
  NORTH_POLYGONS,
  SOUTH_GRID_POSITION,
  chunk,
  getNorthLayout,
  getSouthLayout,
  polygonCentroid,
  type KundliPlanet,
} from '../../utils/kundliLayout';
import { KUNDLI_LABELS, SIGN_SHORT } from './labels';

export type KundliStyle = 'north' | 'south';

// Colours come from CSS variables so a print theme can override them.
const STROKE = 'var(--kundli-stroke, #facc15)';
const TEXT = 'var(--kundli-text, #f8fafc)';
const MUTED = 'var(--kundli-muted, #94a3b8)';
const ACCENT = 'var(--kundli-accent, #fbbf24)';
const LAGNA_FILL = 'var(--kundli-lagna-fill, rgba(250, 204, 21, 0.12))';

interface Item {
  label: string;
  asc?: boolean;
}

const toItems = (planets: KundliPlanet[], isLagna: boolean): Item[] => [
  ...(isLagna ? [{ label: KUNDLI_LABELS.ascendantShort, asc: true }] : []),
  ...planets.map((p) => ({ label: p.abbr })),
];

const ItemRows: React.FC<{ items: Item[]; x: number; y: number; fontSize: number; perRow: number }> = ({
  items, x, y, fontSize, perRow,
}) => {
  const rows = chunk(items, perRow);
  const lineHeight = fontSize * 1.25;
  return (
    <>
      {rows.map((row, rowIndex) => (
        <text
          key={rowIndex}
          x={x}
          y={y + (rowIndex - (rows.length - 1) / 2) * lineHeight}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={fontSize}
          fontWeight={600}
          fill={TEXT}
        >
          {row.map((item, i) => (
            <tspan key={item.label} fill={item.asc ? ACCENT : TEXT} fontStyle={item.asc ? 'italic' : undefined}>
              {i > 0 ? '  ' : ''}{item.label}
            </tspan>
          ))}
        </text>
      ))}
    </>
  );
};

const nearestVertex = (points: Array<[number, number]>): [number, number] =>
  points.reduce((best, p) => {
    const d = Math.hypot(p[0] - 200, p[1] - 200);
    const bd = Math.hypot(best[0] - 200, best[1] - 200);
    return d < bd ? p : best;
  }, points[0]);

const NorthChart: React.FC<{ chart: BirthChart }> = ({ chart }) => {
  const cells = getNorthLayout(chart);
  if (!cells) return null;

  return (
    <>
      {cells.map((cell) => {
        const points = NORTH_POLYGONS[cell.house];
        const [cx, cy] = polygonCentroid(points);
        const corner = nearestVertex(points);
        const numberX = corner[0] + (cx - corner[0]) * 0.22;
        const numberY = corner[1] + (cy - corner[1]) * 0.22;
        const items = toItems(cell.planets, cell.isLagna);
        const large = items.length <= 2;
        return (
          <g key={cell.house}>
            <polygon
              points={points.map((p) => p.join(',')).join(' ')}
              fill={cell.isLagna ? LAGNA_FILL : 'none'}
              stroke={STROKE}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <text x={numberX} y={numberY} textAnchor="middle" dominantBaseline="middle" fontSize={13} fill={MUTED}>
              {cell.signNumber}
            </text>
            <ItemRows items={items} x={cx} y={cy + 4} fontSize={large ? 18 : 15} perRow={cell.house % 3 === 1 ? 3 : 2} />
          </g>
        );
      })}
    </>
  );
};

const SouthChart: React.FC<{ chart: BirthChart }> = ({ chart }) => {
  const cells = getSouthLayout(chart);
  return (
    <>
      {cells.map((cell) => {
        const [col, row] = SOUTH_GRID_POSITION[cell.sign];
        const x = col * 100;
        const y = row * 100;
        const items = toItems(cell.planets, cell.isLagna);
        return (
          <g key={cell.sign}>
            <rect x={x} y={y} width={100} height={100} fill={cell.isLagna ? LAGNA_FILL : 'none'} stroke={STROKE} strokeWidth={2} />
            {cell.isLagna && <line x1={x} y1={y + 24} x2={x + 24} y2={y} stroke={STROKE} strokeWidth={2} />}
            <text x={x + 50} y={y + 90} textAnchor="middle" fontSize={11} fill={MUTED}>
              {SIGN_SHORT[cell.sign]}
            </text>
            <ItemRows items={items} x={x + 50} y={y + 46} fontSize={items.length <= 2 ? 18 : 15} perRow={2} />
          </g>
        );
      })}
    </>
  );
};

/** Plain-language description for screen readers. */
export const describeKundli = (chart: BirthChart, style: KundliStyle): string => {
  if (style === 'north') {
    const cells = getNorthLayout(chart);
    if (!cells) return '';
    return cells
      .map((cell) => {
        const parts = [...(cell.isLagna ? [KUNDLI_LABELS.ascendantFull] : []), ...cell.planets.map((p) => p.name)];
        return `${KUNDLI_LABELS.house} ${cell.house}, ${cell.sign}: ${parts.length ? parts.join(', ') : KUNDLI_LABELS.empty}`;
      })
      .join('. ');
  }
  return getSouthLayout(chart)
    .map((cell) => {
      const parts = [...(cell.isLagna ? [KUNDLI_LABELS.ascendantFull] : []), ...cell.planets.map((p) => p.name)];
      return `${cell.sign}: ${parts.length ? parts.join(', ') : KUNDLI_LABELS.empty}`;
    })
    .join('. ');
};

export const KundliChart: React.FC<{ chart: BirthChart; style: KundliStyle; id?: string }> = ({ chart, style, id }) => {
  const title = style === 'north' ? KUNDLI_LABELS.chartTitleNorth : KUNDLI_LABELS.chartTitleSouth;
  return (
    <svg
      id={id}
      viewBox="-4 -4 408 408"
      role="img"
      aria-label={`${title}. ${describeKundli(chart, style)}`}
      style={{ width: '100%', maxWidth: 440, height: 'auto', display: 'block', margin: '0 auto' }}
    >
      <title>{title}</title>
      {style === 'north' ? <NorthChart chart={chart} /> : <SouthChart chart={chart} />}
    </svg>
  );
};
