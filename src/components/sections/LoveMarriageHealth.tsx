import React from 'react';
import type { BirthChart } from '../../utils/chart';
import { buildRelationshipInterpretation } from '../../data/interpretations';
import { HeartHandshake, Gem, Activity } from 'lucide-react';

export const LoveMarriageHealth: React.FC<{ chart: BirthChart }> = ({ chart }) => {
  const interpretation = buildRelationshipInterpretation(chart);

  return (
    <>
      <section className="mb-16 scroll-mt-24" id="love-relationship">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <HeartHandshake className="text-pink-500 w-8 h-8" />
          Relationships
        </h2>
        {interpretation.available ? (
          <div className="space-y-6">
            <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Partnership themes</h3>
              <p className="text-mystic-100 leading-relaxed">{interpretation.partnership}</p>
            </div>
            <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Creativity and romance</h3>
              <p className="text-mystic-100 leading-relaxed">{interpretation.romance}</p>
            </div>
          </div>
        ) : (
          <p className="text-mystic-100">{interpretation.note}</p>
        )}
      </section>

      <section className="mb-16 scroll-mt-24" id="marriage-prediction">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Gem className="text-gold-500 w-8 h-8" />
          Partnership reflection
        </h2>
        <p className="text-lg text-mystic-100 leading-relaxed">
          Partnership themes are symbolic prompts, not predictions about marriage timing, partner traits, or relationship outcomes. Communication, consent, and the choices of the people involved matter.
        </p>
        <p className="mt-4 text-sm text-mystic-300">
          For guidance and entertainment only; not relationship or professional advice.
        </p>
      </section>

      <section className="mb-16 scroll-mt-24" id="health-astrology">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Activity className="text-green-600 w-8 h-8" />
          Routine and Health Habits
        </h2>
        {interpretation.available ? (
          <p className="text-lg text-mystic-100 leading-relaxed">{interpretation.healthHabits}</p>
        ) : (
          <p className="text-mystic-100">{interpretation.note}</p>
        )}
        <p className="mt-4 text-sm text-mystic-300">
          Health interpretations are for reflection only, not medical advice.
        </p>
      </section>
    </>
  );
};
