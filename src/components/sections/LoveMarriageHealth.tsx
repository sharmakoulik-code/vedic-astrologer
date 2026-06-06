import React from 'react';
import { UserDetails } from '../../types';
import { HeartHandshake, Gem, Activity, Heart, ShieldAlert, Sparkles } from 'lucide-react';

export const LoveMarriageHealth: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <>
      <section className="mb-16 scroll-mt-24" id="love-relationship">
        <h2 className="text-3xl font-serif font-bold text-mystic-900 border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <HeartHandshake className="text-pink-500 w-8 h-8" />
          Love & Relationship Prediction
        </h2>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          The 5th and 7th houses of your natal chart govern romance, partnerships, and your capacity to love and be loved. For you, {user.name}, love is a profound, transformative force. You do not engage in superficial connections; you seek a soul-level resonance that challenges you to evolve.
        </p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100">
              <h3 className="text-xl font-bold text-mystic-800 flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-pink-500" /> Romantic Nature
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Beneath a carefully composed exterior, your romantic nature is deeply passionate and profoundly loyal. When you commit to someone, you offer them your entire world. You express love not just through words, but through steadfast actions, acts of service, and an unwavering presence. However, it takes time for you to truly let your guard down. You observe potential partners carefully, testing their authenticity before granting them access to your inner sanctum.
              </p>
            </div>

            <div className="bg-mystic-50 rounded-2xl p-6 border border-mystic-100">
              <h3 className="text-xl font-bold text-mystic-800 flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-mystic-500" /> Relationship Challenges
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Your primary relationship challenge stems from a fear of vulnerability and a tendency to over-intellectualize your emotions. When conflicts arise, you may retreat into logic, which can make you appear cold or detached to a highly emotional partner. Additionally, your high standards can sometimes morph into unrealistic expectations, leading to disappointment when a partner inevitably displays human flaws.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-mystic-100 shadow-sm">
            <h3 className="text-xl font-bold text-mystic-800 flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-gold-500" /> Ideal Partner Traits & Advice
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Your ideal partner is someone who is grounded, intellectually stimulating, and possesses a high degree of emotional intelligence. They must be your equal—someone who can respect your need for independence while providing a safe harbor for your vulnerabilities. They should have a good sense of humor to lighten your serious disposition. The best relationship advice for you is to practice active communication. Do not assume your partner knows what you are feeling; articulate your needs clearly, and intentionally practice expressing affection verbally.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 scroll-mt-24" id="marriage-prediction">
        <h2 className="text-3xl font-serif font-bold text-mystic-900 border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Gem className="text-gold-500 w-8 h-8" />
          Marriage Prediction
        </h2>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Marriage in Vedic astrology is analyzed primarily through the 7th house and its planetary lord, as well as the position of Venus (for men) or Jupiter (for women). Your chart suggests a marriage that is built on a foundation of mutual respect, shared goals, and deep friendship. 
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Regarding marriage timing, your chart indicates a delay, which is highly protective in your case. A union formed later in your life (often post-28 or early 30s) ensures that you have developed the necessary self-awareness and career stability to be a robust partner. The characteristics of your eventual spouse indicate someone who is established, perhaps slightly older or more mature, and who possesses a calming, stabilizing energy. The overall outlook for your married life is one of long-term stability and growth. While there will be periods of adjustment, the fundamental bond will be resilient, functioning as a powerful team against life's challenges.
        </p>
      </section>

      <section className="mb-16 scroll-mt-24" id="health-astrology">
        <h2 className="text-3xl font-serif font-bold text-mystic-900 border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Activity className="text-green-600 w-8 h-8" />
          Health Astrology Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-xl font-bold text-mystic-800 mb-3">Physical & Mental Health</h3>
            <p className="text-gray-700 leading-relaxed">
              The 6th house governs health, wellness, and daily routines. Your physical constitution is generally robust, possessing strong recuperative powers. However, the planetary placements indicate that your health is intrinsically linked to your stress levels. You are prone to carrying tension in your neck, shoulders, and digestive tract. Mentally, your hyper-active mind requires significant "downtime" to prevent burnout. You are highly sensitive to your environment, and chaotic surroundings can deeply affect your psychological well-being.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-mystic-800 mb-3">Stress Factors & Preventive Advice</h3>
            <p className="text-gray-700 leading-relaxed">
              Your primary stress factor is professional overextension—taking on too much responsibility because you doubt others can execute it to your standards. Another stressor is unresolved emotional conflict. For preventive care, a rigid, highly disciplined daily routine (Dinacharya) is your best medicine. Regular cardiovascular exercise, coupled with grounding practices like yoga or Tai Chi, is essential. Prioritize sleep hygiene; your nervous system requires at least 7-8 hours of uninterrupted rest to repair itself. Additionally, incorporating cooling foods and staying heavily hydrated will balance the excess fire in your system.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};