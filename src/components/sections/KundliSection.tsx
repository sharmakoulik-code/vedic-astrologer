import React, { useState } from 'react';
import { Grid3x3 } from 'lucide-react';
import type { BirthChart } from '../../utils/chart';
import { KundliChart, type KundliStyle } from '../kundli/KundliChart';
import { PlanetTable } from '../kundli/PlanetTable';
import { DashaTable } from '../kundli/DashaTable';
import { KUNDLI_LABELS } from '../kundli/labels';

/** True only when the Lagna and houses can be shown without guessing. */
export const canDrawKundli = (chart: BirthChart): boolean =>
  chart.hasLocation && !chart.needsTimezone && chart.exactTime && chart.lagna !== null;

export const canShowDasha = (chart: BirthChart): boolean => chart.exactTime && !chart.needsTimezone;

export const KundliSection: React.FC<{ chart: BirthChart }> = ({ chart }) => {
  const [style, setStyle] = useState<KundliStyle>('north');
  const drawable = canDrawKundli(chart);

  return (
    <section className="mb-16 scroll-mt-24 kundli-section" id="kundli">
      <h2 className="heading-premium flex items-center gap-3 mb-6">
        <Grid3x3 className="text-yellow-300 w-8 h-8" aria-hidden="true" />
        {KUNDLI_LABELS.sectionTitle}
      </h2>
      <p className="text-premium mb-8">{KUNDLI_LABELS.intro}</p>

      {drawable ? (
        <div className="premium-card mb-8">
          <div role="group" aria-label={KUNDLI_LABELS.styleSwitchLabel} className="kundli-no-print flex justify-center gap-2 mb-6">
            {(['north', 'south'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={style === option}
                onClick={() => setStyle(option)}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition ${
                  style === option
                    ? 'bg-yellow-400 text-slate-900 border-yellow-400'
                    : 'border-yellow-400/50 text-yellow-200 hover:border-yellow-300'
                }`}
              >
                {option === 'north' ? KUNDLI_LABELS.northTab : KUNDLI_LABELS.southTab}
              </button>
            ))}
          </div>
          <KundliChart chart={chart} style={style} id="kundli-chart" />
        </div>
      ) : (
        <p className="premium-card text-premium-muted mb-8" role="note">{KUNDLI_LABELS.needsLocationNote}</p>
      )}

      <div className="premium-card mb-8">
        <h3 className="heading-secondary mb-4">{KUNDLI_LABELS.planetTableTitle}</h3>
        <PlanetTable chart={chart} showHouses={drawable} />
      </div>

      {canShowDasha(chart) ? (
        <div className="premium-card mb-4">
          <h3 className="heading-secondary mb-4">{KUNDLI_LABELS.dashaTitle}</h3>
          <DashaTable chart={chart} />
        </div>
      ) : (
        <p className="premium-card text-premium-muted mb-4" role="note">{KUNDLI_LABELS.needsTimeNote}</p>
      )}
      <p className="text-premium-muted text-sm">{KUNDLI_LABELS.disclaimer}</p>
    </section>
  );
};
