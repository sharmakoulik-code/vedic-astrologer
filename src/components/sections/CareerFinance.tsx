import React from 'react';
import type { BirthChart } from '../../utils/chart';
import { buildCareerInterpretation } from '../../data/interpretations';
import { Briefcase, Coins, Building, LineChart } from 'lucide-react';

export const CareerFinance: React.FC<{ chart: BirthChart }> = ({ chart }) => {
  const interpretation = buildCareerInterpretation(chart);

  return (
    <>
      <section className="mb-16 scroll-mt-24" id="career-astrology">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Briefcase className="text-gold-500 w-8 h-8" />
          Career Astrology
        </h2>
        {interpretation.available ? (
          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
              <Building className="w-5 h-5 text-mystic-300" /> Tenth-house themes
            </h3>
            <p className="text-mystic-100 leading-relaxed">{interpretation.career}</p>
          </div>
        ) : (
          <p className="text-mystic-100">{interpretation.note}</p>
        )}
      </section>

      <section className="mb-16 scroll-mt-24" id="financial-astrology">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Coins className="text-gold-500 w-8 h-8" />
          Resources and Networks
        </h2>
        {interpretation.available ? (
          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
              <LineChart className="w-5 h-5 text-mystic-300" /> Second- and eleventh-house themes
            </h3>
            <p className="text-mystic-100 leading-relaxed">{interpretation.finance}</p>
          </div>
        ) : (
          <p className="text-mystic-100">{interpretation.note}</p>
        )}
        <p className="mt-4 text-sm text-mystic-300">
          For guidance and entertainment only; not career, investment, or financial advice.
        </p>
      </section>
    </>
  );
};
