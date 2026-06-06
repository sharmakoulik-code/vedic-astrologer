import React from 'react';
import { UserDetails } from '../../types';
import { Compass, CheckCircle2, XCircle, Wrench, Rocket } from 'lucide-react';

export const ActionPlan: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <section className="mb-16 scroll-mt-24" id="action-plan">
      <div className="bg-gradient-to-br from-mystic-900 to-mystic-800 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Compass className="w-48 h-48" />
        </div>
        
        <h2 className="text-4xl font-serif font-bold text-gold-400 mb-6 relative z-10">
          Personalized Action Plan
        </h2>
        
        <p className="text-xl text-mystic-100 leading-relaxed mb-10 relative z-10">
          {user.name}, this report has mapped the cosmic blueprint of your life. However, astrology is not determinism; it is a weather report. How you sail the ship is up to you. Here is your strategic action plan based on your unique chart.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-green-400 flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-6 h-6" /> What To Do
            </h3>
            <ul className="space-y-3 text-mystic-50">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                <span>Commit to a daily grounding practice (meditation or time in nature) to settle your highly active mind.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                <span>Write down your complex ideas. Your 3rd house activation demands that you externalize your thoughts.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2" />
                <span>Cultivate relationships with mentors who have achieved the level of mastery you seek.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-red-400 flex items-center gap-2 mb-4">
              <XCircle className="w-6 h-6" /> What To Avoid
            </h3>
            <ul className="space-y-3 text-mystic-50">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                <span>Avoid making binding financial or relational decisions during periods of high emotional stress or fatigue.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                <span>Resist the urge to isolate yourself completely when faced with challenges; you need community.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2" />
                <span>Do not ignore your physical body in pursuit of intellectual or professional goals.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-blue-400 flex items-center gap-2 mb-4">
              <Wrench className="w-6 h-6" /> Skills To Develop
            </h3>
            <ul className="space-y-3 text-mystic-50">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />
                <span><strong>Emotional Articulation:</strong> Learning to accurately describe your feelings to your loved ones.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2" />
                <span><strong>Financial Literacy:</strong> Specifically regarding long-term, compound-interest investment vehicles.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-gold-400 flex items-center gap-2 mb-4">
              <Rocket className="w-6 h-6" /> Best Opportunities To Pursue
            </h3>
            <ul className="space-y-3 text-mystic-50">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2" />
                <span>Leadership roles in emerging technologies, education, or specialized consulting.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2" />
                <span>Independent business ventures that allow you full creative and structural control.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};