import React from 'react';
import { UserDetails } from '../../types';
import { Target, Clover, Star, Flame, Sun, Droplets } from 'lucide-react';

export const SuccessLuckyRemedies: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <>
      <section className="mb-16 scroll-mt-24" id="success-analysis">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Target className="text-red-500 w-8 h-8" />
          Success Analysis
        </h2>
        
        <p className="text-lg text-mystic-100 leading-relaxed mb-8">
          Success is often described in astrology as a blend of personal effort, timing awareness, and alignment with one’s strengths. For {user.name}, the chart may reflect a need to focus on a clear direction and avoid scattering energy across too many competing priorities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-3">Main Obstacles</h3>
            <p className="text-mystic-100 leading-relaxed">
              A common challenge in this kind of chart is scattered attention. When energy is divided across many goals, it becomes harder to see a clear path. A useful approach is to identify the few priorities that actually matter most and build momentum around them.
            </p>
          </div>
          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-3">Areas Bringing Recognition</h3>
            <p className="text-mystic-100 leading-relaxed">
              The chart often rewards mastery, depth, and consistent expertise rather than superficial breadth. Recognition tends to grow when a person becomes clearly useful in a specific domain rather than trying to excel everywhere at once.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 scroll-mt-24" id="lucky-factors">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Clover className="text-green-500 w-8 h-8" />
          Lucky Factors
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10 shadow-sm text-center">
            <div className="w-12 h-12 bg-mystic-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-white">7</span>
            </div>
            <h4 className="font-bold text-white">Lucky Numbers</h4>
            <p className="text-sm text-mystic-200 mt-1">7, 16, 25, 34</p>
          </div>
          
          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-900/60 rounded-full flex items-center justify-center mx-auto mb-3">
              <Droplets className="w-6 h-6 text-blue-200" />
            </div>
            <h4 className="font-bold text-white">Lucky Colors</h4>
            <p className="text-sm text-mystic-200 mt-1">Deep Blue, Silver, White</p>
          </div>

          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10 shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-900/60 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sun className="w-6 h-6 text-orange-200" />
            </div>
            <h4 className="font-bold text-white">Lucky Days</h4>
            <p className="text-sm text-mystic-200 mt-1">Monday & Thursday</p>
          </div>

          <div className="bg-mystic-900/80 rounded-2xl p-6 border border-white/10 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-900/60 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-purple-200" />
            </div>
            <h4 className="font-bold text-white">Lucky Directions</h4>
            <p className="text-sm text-mystic-200 mt-1">North & North-East</p>
          </div>
        </div>
      </section>

      <section className="mb-16 scroll-mt-24" id="remedies">
        <h2 className="text-3xl font-serif font-bold text-white border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Flame className="text-orange-500 w-8 h-8" />
          Astrological Remedies (Upayas)
        </h2>
        
        <p className="text-lg text-mystic-100 leading-relaxed mb-6">
          Traditional astrological remedies are best viewed as supportive rituals or reflection practices, not magical guarantees. They can help someone feel more intentional, grounded, and aligned, but they work best alongside real-life action and self-awareness.
        </p>

        <ul className="space-y-4">
          <li className="bg-orange-900/20 p-4 rounded-xl border border-orange-400/20 flex gap-4">
            <span className="font-bold text-orange-300 min-w-[120px]">Mantras:</span>
            <span className="text-mystic-100">Chant the <em>Om Namah Shivaya</em> mantra 108 times daily during the morning hours to calm the nervous system and build spiritual resilience.</span>
          </li>
          <li className="bg-orange-900/20 p-4 rounded-xl border border-orange-400/20 flex gap-4">
            <span className="font-bold text-orange-300 min-w-[120px]">Charity:</span>
            <span className="text-mystic-100">Donating educational materials or sponsoring a child's education aligns perfectly with your chart's need to disseminate knowledge.</span>
          </li>
          <li className="bg-orange-900/20 p-4 rounded-xl border border-orange-400/20 flex gap-4">
            <span className="font-bold text-orange-300 min-w-[120px]">Lifestyle:</span>
            <span className="text-mystic-100">Incorporate periods of complete silence (Mauna) into your week. Even 30 minutes of absolute non-speaking will recharge your overactive intellect.</span>
          </li>
        </ul>
      </section>
    </>
  );
};