import React from 'react';
import type { BirthChart } from '../../utils/chart';
import { buildActionPlanInterpretation } from '../../data/interpretations';
import { Compass, CheckCircle2, XCircle, Wrench, Rocket } from 'lucide-react';

export const ActionPlan: React.FC<{ chart: BirthChart }> = ({ chart }) => {
  const interpretation = buildActionPlanInterpretation(chart);

  return (
    <section className="mb-16 scroll-mt-24" id="action-plan">
      <div className="bg-gradient-to-br from-mystic-900 to-mystic-800 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Compass className="w-48 h-48" />
        </div>

        <h2 className="text-4xl font-serif font-bold text-gold-400 mb-6 relative z-10">
          Reflection Prompts
        </h2>
        <p className="text-xl text-mystic-100 leading-relaxed mb-10 relative z-10">
          The current Mahadasha is {chart.dasha.currentMahadasha}. {interpretation.currentPeriod} These traditional themes are prompts for reflection, not a forecast of events.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-green-400 flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-6 h-6" /> Consider
            </h3>
            <p className="text-mystic-50">{interpretation.currentPeriod}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-blue-400 flex items-center gap-2 mb-4">
              <Wrench className="w-6 h-6" /> Lagna ruler
            </h3>
            <p className="text-mystic-50">
              {interpretation.lagnaRulerName
                ? `${interpretation.lagnaRulerName}: ${interpretation.lagnaRuler}`
                : interpretation.lagnaRuler}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-red-300 flex items-center gap-2 mb-4">
              <XCircle className="w-6 h-6" /> Keep in perspective
            </h3>
            <p className="text-mystic-50">
              A dasha is a traditional timing framework. It does not determine choices or guarantee specific outcomes.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-gold-400 flex items-center gap-2 mb-4">
              <Rocket className="w-6 h-6" /> Optional next step
            </h3>
            <p className="text-mystic-50">
              You may choose one small, practical action that fits your own priorities and circumstances.
            </p>
          </div>
        </div>
        <p className="mt-8 text-sm text-mystic-200 relative z-10">
          For guidance and entertainment only, not medical, legal, financial, or professional advice.
        </p>
      </div>
    </section>
  );
};
