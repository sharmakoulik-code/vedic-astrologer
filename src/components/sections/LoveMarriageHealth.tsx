import React from 'react';
import { UserDetails } from '../../types';
import { HeartHandshake, Gem, Activity, Heart, ShieldAlert, Sparkles } from 'lucide-react';

export const LoveMarriageHealth: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <>
      <section className="mb-16 scroll-mt-24" id="love-relationship">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <HeartHandshake className="text-pink-500 w-8 h-8" />
          Love & Relationship Prediction
        </h2>
        
        <p className="text-lg text-mystic-100 leading-relaxed mb-8">
          The 5th and 7th houses are often associated with romance, partnership patterns, and the way the individual learns about intimacy. For {user.name}, the chart may point to a reflective, high-conscious approach to love—one that values authenticity, emotional safety, and mutual respect.
        </p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-pink-400" /> Romantic Nature
              </h3>
              <p className="text-mystic-100 leading-relaxed">
                A person with this chart often values emotional depth and meaningful connection. Trust may build gradually, and the most satisfying relationships are usually those where honesty, consistency, and clear communication are treated as essential rather than optional.
              </p>
            </div>

            <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-mystic-300" /> Relationship Challenges
              </h3>
              <p className="text-mystic-100 leading-relaxed">
                Relationship dynamics often become more clear when a person learns to name their needs and communicate them directly. Common growth points in this kind of chart include balancing emotional openness with personal boundaries, and avoiding overanalysis when a softer response may be more useful.
              </p>
            </div>
          </div>

          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10 shadow-sm">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-gold-500" /> Ideal Partner Traits & Advice
            </h3>
            <p className="text-mystic-100 leading-relaxed">
              A supportive partner often brings steadiness, emotional safety, and mutual respect. In practice, this means that healthy relationships tend to grow when both people feel seen, heard, and able to communicate honestly without pressure or control.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 scroll-mt-24" id="marriage-prediction">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Gem className="text-gold-500 w-8 h-8" />
          Marriage Prediction
        </h2>
        
        <p className="text-lg text-mystic-100 leading-relaxed mb-6">
          Marriage in Vedic astrology is often analyzed through the 7th house and its planetary themes, but the result is always contextual. A chart may suggest a preference for stability, partnership, or shared values, yet the actual relationship outcome depends on the people involved, timing, and conscious choices.
        </p>
        <p className="text-lg text-mystic-100 leading-relaxed mb-8">
          Marriage timing and partner traits are areas of interpretation, not certainty. A chart may suggest a tendency toward later commitment, maturity, or a preference for stability, but the actual quality of a relationship still depends on the people involved, life circumstances, and conscious choices.
        </p>
      </section>

      <section className="mb-16 scroll-mt-24" id="health-astrology">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Activity className="text-green-600 w-8 h-8" />
          Health Astrology Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Physical & Mental Health</h3>
            <p className="text-mystic-100 leading-relaxed">
              The 6th house often points to daily routines and the relationship between stress, energy, and health. A chart may suggest that routine, sleep, and emotional regulation are especially important. In practical terms, this often means that reducing overextension and creating steadier patterns can improve overall well-being.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Stress Factors & Preventive Advice</h3>
            <p className="text-mystic-100 leading-relaxed">
              Stress management is often a major theme in this kind of chart. Practical habits such as consistent sleep, regular movement, intentional downtime, and clear boundaries can help balance demanding periods. Since health is highly personal, the best approach is to view this as guidance and not as a diagnosis.
            </p>
          </div>
        </div>
        <p className="text-sm text-mystic-300">
          Health interpretations are for reflection only, not medical advice.
        </p>
      </section>
    </>
  );
};