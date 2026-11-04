import React from 'react';
import type { BirthChart } from '../../utils/chart';
import { getLuckyAssociations, buildSuccessInterpretation } from '../../data/interpretations';
import { Target, Clover, Star, Flame } from 'lucide-react';

export const SuccessLuckyRemedies: React.FC<{ chart: BirthChart }> = ({ chart }) => {
  const lucky = getLuckyAssociations(chart);
  const success = buildSuccessInterpretation(chart);

  return (
    <>
      <section className="mb-16 scroll-mt-24" id="success-analysis">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Target className="text-red-500 w-8 h-8" />
          Work and Contribution Themes
        </h2>
        <p className="text-lg text-mystic-100 leading-relaxed mb-8">{success}</p>
        <p className="text-sm text-mystic-300">
          These are traditional symbolic themes, not promises of success, recognition, or particular life events.
        </p>
      </section>

      <section className="mb-16 scroll-mt-24" id="lucky-factors">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Clover className="text-green-500 w-8 h-8" />
          Traditional Associations
        </h2>
        <p className="text-sm text-mystic-300 mb-5">
          Based on the traditional ruler of your Moon sign ({chart.moonSign}: {lucky.ruler}); these are cultural associations, not guarantees.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-mystic-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-white"><Star className="w-6 h-6" /></span>
            </div>
            <h4 className="font-bold text-white">Traditional numbers</h4>
            <p className="text-sm text-mystic-200 mt-1">{lucky.numbers.join(', ')}</p>
          </div>
          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-blue-900/60 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-blue-200">Aa</span>
            </div>
            <h4 className="font-bold text-white">Traditional colours</h4>
            <p className="text-sm text-mystic-200 mt-1">{lucky.colors.join(', ')}</p>
          </div>
          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-12 h-12 bg-orange-900/60 rounded-full flex items-center justify-center mx-auto mb-3">
              <Flame className="w-6 h-6 text-orange-200" />
            </div>
            <h4 className="font-bold text-white">Traditional day</h4>
            <p className="text-sm text-mystic-200 mt-1">{lucky.day}</p>
          </div>
        </div>
        <p className="mt-5 text-sm text-mystic-300">
          For guidance and entertainment only; these traditional associations do not predict outcomes.
        </p>
      </section>

      <section className="mb-16 scroll-mt-24" id="remedies">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Flame className="text-orange-500 w-8 h-8" />
          Optional Reflection Practices
        </h2>
        <p className="text-lg text-mystic-100 leading-relaxed mb-6">
          If meaningful to you, traditional practices may be used as optional moments for reflection. They are not required and do not guarantee changes in circumstances.
        </p>
        <ul className="space-y-4">
          <li className="bg-orange-900/20 p-4 rounded-xl border border-orange-400/20">
            <strong className="text-orange-300">Quiet reflection:</strong>
            <span className="text-mystic-100"> You may choose a short period of quiet or journaling as a way to reflect.</span>
          </li>
          <li className="bg-orange-900/20 p-4 rounded-xl border border-orange-400/20">
            <strong className="text-orange-300">Mantra or prayer:</strong>
            <span className="text-mystic-100"> If it fits your tradition, you may choose a familiar mantra or prayer as a personal practice.</span>
          </li>
          <li className="bg-orange-900/20 p-4 rounded-xl border border-orange-400/20">
            <strong className="text-orange-300">Generosity:</strong>
            <span className="text-mystic-100"> Consider an act of giving that is appropriate to your means and values.</span>
          </li>
        </ul>
        <p className="mt-5 text-sm text-mystic-300">
          Optional practices are for personal reflection and entertainment, not professional or medical advice.
        </p>
      </section>
    </>
  );
};
