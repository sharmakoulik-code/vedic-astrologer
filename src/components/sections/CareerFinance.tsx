import React from 'react';
import { UserDetails } from '../../types';
import { Briefcase, TrendingUp, Coins, Building, LineChart } from 'lucide-react';

export const CareerFinance: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <>
      <section className="mb-16 scroll-mt-24" id="career-astrology">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Briefcase className="text-gold-500 w-8 h-8" />
          Career Astrology Prediction
        </h2>
        
        <p className="text-lg text-mystic-100 leading-relaxed mb-8">
          The 10th house of the natal chart is often associated with career themes, public role, and professional ambition. For {user.name}, the chart may point toward work that requires independence, thoughtful strategy, and a willingness to learn across multiple contexts rather than follow a single narrow path.
        </p>

        <div className="space-y-6">
          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
              <Building className="w-5 h-5 text-mystic-300" /> Best Careers
            </h3>
            <p className="text-mystic-100 leading-relaxed">
              Based on the overall chart pattern, work styles that combine analysis, communication, and strategic thinking often feel natural. Many people with a similar profile gravitate toward research, advisory, educational, technical, or people-centered roles where the ability to simplify complexity is valuable.
            </p>
          </div>

          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-mystic-300" /> Business Potential & Job Success
            </h3>
            <p className="text-mystic-100 leading-relaxed">
              The chart may suggest a strong desire for autonomy, but this does not guarantee a specific career outcome. For some people, the most satisfying path is a mix of employment, consulting, freelancing, or eventually building something of their own once they have clarity and trust in their direction.
            </p>
          </div>

          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-3">
              <LineChart className="w-5 h-5 text-mystic-300" /> Future Career Opportunities
            </h3>
            <p className="text-mystic-100 leading-relaxed">
              Timing windows can be interpreted as periods of increased change, visibility, or opportunity, but they are not guarantees. A robust career strategy still depends on effort, skills, networking, and practical decision-making. The most useful reading is not 'what will happen' but 'what themes may deserve extra attention.'
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 scroll-mt-24" id="financial-astrology">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Coins className="text-gold-500 w-8 h-8" />
          Financial Astrology Report
        </h2>
        
        <p className="text-lg text-mystic-100 leading-relaxed mb-8">
          Financial themes in astrology are often interpreted as reflections of values, habits, and risk tolerance rather than fixed predictions. For {user.name}, the chart may suggest a need to balance practical security with a healthy relationship to money, ambition, and future planning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Money Strengths</h3>
            <p className="text-mystic-100 leading-relaxed">
              A chart like this often suggests a thoughtful approach to money: valuing long-term stability, practical planning, and disciplined decision-making over short-term excitement or sudden risk-taking.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">Financial Challenges</h3>
            <p className="text-mystic-100 leading-relaxed">
              Common financial stressors can include fear of loss, over-caution, or reacting too strongly to uncertainty. Looking at money through a calmer, more structured lens often helps support better decisions and a healthier relationship with financial risk.
            </p>
          </div>
        </div>

        <div className="bg-mystic-900/80 p-6 rounded-2xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Wealth Periods & Investment Tendencies</h3>
          <p className="text-mystic-100 leading-relaxed mb-4">
            Timing-based interpretations can highlight periods when career growth, financial attention, or strategic planning may become more important. That does not mean a fixed outcome is guaranteed; it simply suggests that certain phases may deserve more care, patience, and planning.
          </p>
          <p className="text-mystic-100 leading-relaxed">
            In practical terms, long-term stability often comes from diversified planning, consistent effort, and a willingness to avoid unnecessary speculation. The best financial strategy is usually the one that matches your actual goals, risk tolerance, and life stage.
          </p>
        </div>
        <p className="mt-4 text-sm text-mystic-300">
          Financial interpretations are for reflection only, not financial advice.
        </p>
      </section>
    </>
  );
};