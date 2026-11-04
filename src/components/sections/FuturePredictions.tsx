import React from 'react';
import type { BirthChart } from '../../utils/chart';
import { PLANET_INTERPRETATIONS, buildFutureInterpretation } from '../../data/interpretations';
import { formatReportDate } from '../../utils/reportFormatting';
import { Hourglass, CalendarDays, Sunrise } from 'lucide-react';

export const FuturePredictions: React.FC<{ chart: BirthChart }> = ({ chart }) => {
  const interpretation = buildFutureInterpretation(chart);

  return (
    <section className="mb-16 scroll-mt-24" id="future-prediction">
      <h2 className="text-3xl font-serif font-bold text-mystic-900 border-b-2 border-gold-200 pb-2 mb-8 flex items-center gap-3">
        <Hourglass className="text-gold-500 w-8 h-8" />
        Dasha Periods
      </h2>

      {!interpretation.available || !interpretation.current ? (
        <p className="text-gray-700 leading-relaxed">
          The current dasha dates are unavailable for these birth details. Dasha themes are traditional interpretations, not certain predictions.
        </p>
      ) : (
        <div className="space-y-8">
          <div className="relative pl-8 border-l-4 border-gold-400">
            <div className="absolute -left-4 top-0 bg-gold-400 rounded-full p-2">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-mystic-900 mb-3">
              Mahadasha: {interpretation.current.lord} ({formatReportDate(interpretation.current.start)} – {formatReportDate(interpretation.current.end)})
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {PLANET_INTERPRETATIONS[interpretation.current.lord as keyof typeof PLANET_INTERPRETATIONS].dasha}
            </p>
            {interpretation.antardasha && (
              <p className="text-gray-700 leading-relaxed mt-3">
                Antardasha: {interpretation.antardasha.lord} ({formatReportDate(interpretation.antardasha.start)} – {formatReportDate(interpretation.antardasha.end)}). {PLANET_INTERPRETATIONS[interpretation.antardasha.lord as keyof typeof PLANET_INTERPRETATIONS].dasha}
              </p>
            )}
          </div>

          {interpretation.next.map((period) => (
            <div className="relative pl-8 border-l-4 border-mystic-400" key={`${period.lord}-${period.start}`}>
              <div className="absolute -left-4 top-0 bg-mystic-400 rounded-full p-2">
                <Sunrise className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-mystic-900 mb-3">
                Next Mahadasha: {period.lord} ({formatReportDate(period.start)} – {formatReportDate(period.end)})
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {PLANET_INTERPRETATIONS[period.lord as keyof typeof PLANET_INTERPRETATIONS].dasha}
              </p>
            </div>
          ))}
        </div>
      )}
      <p className="mt-6 text-sm text-gray-600">
        Dasha periods are traditional astrological interpretations for guidance and entertainment only, not fixed predictions or professional advice.
      </p>
    </section>
  );
};
