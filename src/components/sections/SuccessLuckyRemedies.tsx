import React from 'react';
import { UserDetails } from '../../types';
import { Target, Clover, Star, Flame, Sun, Droplets } from 'lucide-react';

export const SuccessLuckyRemedies: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <>
      <section className="mb-16 scroll-mt-24" id="success-analysis">
        <h2 className="text-3xl font-serif font-bold text-mystic-900 border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Target className="text-red-500 w-8 h-8" />
          Success Analysis
        </h2>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Success, from a karmic perspective, is the alignment of your daily actions with your soul's deepest intent. For {user.name}, the potential for recognition is immense, provided you navigate your inherent obstacles with awareness.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-mystic-50 rounded-2xl p-6 border border-mystic-100">
            <h3 className="text-xl font-bold text-mystic-800 mb-3">Main Obstacles</h3>
            <p className="text-gray-700 leading-relaxed">
              Your primary obstacle is the diffusion of energy. You have so many interests and capabilities that you can easily become a "jack of all trades, master of none." Additionally, a karmic knot in your chart indicates a recurrent theme of self-doubt right before a major breakthrough. 
            </p>
          </div>
          <div className="bg-mystic-50 rounded-2xl p-6 border border-mystic-100">
            <h3 className="text-xl font-bold text-mystic-800 mb-3">Areas Bringing Recognition</h3>
            <p className="text-gray-700 leading-relaxed">
              You are most likely to achieve lasting fame or deep respect in areas that require specialized, esoteric, or highly complex knowledge. When you position yourself as the ultimate authority on a niche subject, success flows effortlessly.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 scroll-mt-24" id="lucky-factors">
        <h2 className="text-3xl font-serif font-bold text-mystic-900 border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Clover className="text-green-500 w-8 h-8" />
          Lucky Factors
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-mystic-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-mystic-800">7</span>
            </div>
            <h4 className="font-bold text-gray-800">Lucky Numbers</h4>
            <p className="text-sm text-gray-500 mt-1">7, 16, 25, 34</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Droplets className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-bold text-gray-800">Lucky Colors</h4>
            <p className="text-sm text-gray-500 mt-1">Deep Blue, Silver, White</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Sun className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-bold text-gray-800">Lucky Days</h4>
            <p className="text-sm text-gray-500 mt-1">Monday & Thursday</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-bold text-gray-800">Lucky Directions</h4>
            <p className="text-sm text-gray-500 mt-1">North & North-East</p>
          </div>
        </div>
      </section>

      <section className="mb-16 scroll-mt-24" id="remedies">
        <h2 className="text-3xl font-serif font-bold text-mystic-900 border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Flame className="text-orange-500 w-8 h-8" />
          Astrological Remedies (Upayas)
        </h2>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          To mitigate the challenging planetary aspects and enhance the auspicious ones, Vedic astrology prescribes specific remedies. These are not magical fixes, but energetic realignments.
        </p>

        <ul className="space-y-4">
          <li className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-4">
            <span className="font-bold text-orange-600 min-w-[120px]">Mantras:</span>
            <span className="text-gray-700">Chant the <em>Om Namah Shivaya</em> mantra 108 times daily during the morning hours to calm the nervous system and build spiritual resilience.</span>
          </li>
          <li className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-4">
            <span className="font-bold text-orange-600 min-w-[120px]">Charity:</span>
            <span className="text-gray-700">Donating educational materials or sponsoring a child's education aligns perfectly with your chart's need to disseminate knowledge.</span>
          </li>
          <li className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-4">
            <span className="font-bold text-orange-600 min-w-[120px]">Lifestyle:</span>
            <span className="text-gray-700">Incorporate periods of complete silence (Mauna) into your week. Even 30 minutes of absolute non-speaking will recharge your overactive intellect.</span>
          </li>
        </ul>
      </section>
    </>
  );
};