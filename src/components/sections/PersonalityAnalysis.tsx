import React from 'react';
import type { BirthChart } from '../../utils/chart';
import { getHouseAvailabilityNote, buildPersonalityInterpretation } from '../../data/interpretations';
import { User, Shield, Eye, Trophy, Heart, Star } from 'lucide-react';

export const PersonalityAnalysis: React.FC<{ chart: BirthChart }> = ({ chart }) => {
  const interpretation = buildPersonalityInterpretation(chart);
  const houseNote = getHouseAvailabilityNote(chart);

  return (
    <section className="mb-16 scroll-mt-24" id="personality-analysis">
      <h2 className="heading-premium flex items-center gap-3 mb-8">
        <User className="text-yellow-300 w-8 h-8" />
        Personality Analysis
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="heading-secondary">
            <Trophy className="w-6 h-6 text-yellow-400" /> Lagna and Moon
          </h3>
          {interpretation.lagna && <p className="text-premium-muted mb-3">{interpretation.lagna}</p>}
          <p className="text-premium-muted">{interpretation.moon}</p>
          {houseNote && <p className="text-premium-muted mt-3">{houseNote}</p>}
        </div>

        <div>
          <h3 className="heading-secondary">
            <Shield className="w-6 h-6 text-blue-300" /> Moon Nakshatra
          </h3>
          <p className="text-premium-muted">{interpretation.nakshatra}</p>
        </div>

        <div className="premium-card bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700">
          <h3 className="text-2xl font-bold text-yellow-200 flex items-center gap-2 mb-4">
            <Eye className="w-6 h-6 text-yellow-400" /> Reflective prompts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <p className="text-premium-muted">
              These sign and nakshatra themes are traditional associations, not fixed traits. You may find some themes more relevant than others.
            </p>
            <p className="text-premium-muted flex items-start gap-2">
              <Star className="w-5 h-5 shrink-0 text-yellow-400" />
              <span><Heart className="inline w-4 h-4 text-pink-300" /> Consider which parts of the reading resonate with your own experience.</span>
            </p>
          </div>
        </div>
      </div>
      <p className="mt-6 text-sm text-premium-muted">
        For guidance and entertainment only, not a fixed account of personality or outcomes.
      </p>
    </section>
  );
};
