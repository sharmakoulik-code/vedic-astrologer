import React from 'react';
import { UserDetails } from '../../types';
import { Compass, Moon, Sun, Star, Wind } from 'lucide-react';

export const BirthChartOverview: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <section className="mb-16 scroll-mt-24" id="birth-chart-overview">
      <h2 className="text-3xl font-serif font-bold text-mystic-900 border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
        <Compass className="text-gold-500 w-8 h-8" />
        Birth Chart Overview
      </h2>
      
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Welcome, {user.name}. Based on your birth details from {user.birthPlace} on {new Date(user.dob).toLocaleDateString()} at {user.birthTime}, the cosmic alignment at the precise moment of your arrival holds the profound map of your life's journey. In Vedic Astrology (Jyotish), the planetary positions act as karmic markers, revealing your soul's purpose, underlying patterns, and the unfolding narrative of your destiny. 
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-mystic-50 rounded-2xl p-6 border border-mystic-100 shadow-sm">
          <h3 className="text-xl font-bold text-mystic-800 flex items-center gap-2 mb-3">
            <Compass className="w-5 h-5 text-gold-600" /> Ascendant (Lagna)
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Your Ascendant, or Lagna, represents the foundational lens through which you view the world. As the sign rising on the eastern horizon at {user.birthTime} in {user.birthPlace}, it shapes your physical appearance, vitality, and primary approach to life. Your chart indicates a powerful rising sign characterized by a dynamic, visionary energy. You are perceived by others as an independent thinker who is not afraid to carve a unique path. This Lagna provides you with an inherent resilience, allowing you to bounce back from adversity with renewed strength. It suggests that your life path will involve stepping into roles of authority and guiding others through times of transformation.
          </p>
        </div>

        <div className="bg-mystic-50 rounded-2xl p-6 border border-mystic-100 shadow-sm">
          <h3 className="text-xl font-bold text-mystic-800 flex items-center gap-2 mb-3">
            <Moon className="w-5 h-5 text-gold-600" /> Moon Sign (Rasi)
          </h3>
          <p className="text-gray-700 leading-relaxed">
            In Vedic astrology, the Moon represents your mind, emotions, and inner psychological reality. Your Moon sign is positioned in an intuitive and deeply intellectual sector of your chart. This placement bestows upon you a profound emotional depth and a strong empathetic resonance with the people around you. You process the world primarily through a lens of deep contemplation and intuition. When faced with challenges, your initial reaction is to withdraw slightly to analyze the emotional undercurrents before taking decisive action. This placement also indicates a strong connection to your mother or maternal figures, who have played a crucial role in shaping your internal emotional landscape.
          </p>
        </div>

        <div className="bg-mystic-50 rounded-2xl p-6 border border-mystic-100 shadow-sm">
          <h3 className="text-xl font-bold text-mystic-800 flex items-center gap-2 mb-3">
            <Sun className="w-5 h-5 text-gold-600" /> Sun Sign (Surya)
          </h3>
          <p className="text-gray-700 leading-relaxed">
            The Sun represents your soul, ego, and core identity. For {user.name}, the Sun's placement highlights a deep-seated drive for accomplishment and recognition. It gives you a natural magnetism and a sense of dignity that commands respect. However, this is not a superficial desire for fame; rather, it is a soul-level calling to make a tangible, lasting impact in your chosen field. The Sun’s radiant energy in your chart suggests periods in your life where you must stand alone to prove your capabilities, ultimately burning away impurities of the ego to reveal your true, luminous self.
          </p>
        </div>

        <div className="bg-mystic-50 rounded-2xl p-6 border border-mystic-100 shadow-sm">
          <h3 className="text-xl font-bold text-mystic-800 flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-gold-600" /> Nakshatra (Birth Star)
          </h3>
          <p className="text-gray-700 leading-relaxed">
            The Nakshatra, or lunar mansion, occupied by your Moon provides granular detail about your mental mechanics. Your birth star reveals a fiercely independent, analytical, and truth-seeking nature. It is ruled by a planetary energy that demands authenticity and depth. Individuals born under this Nakshatra often experience significant spiritual or psychological awakenings throughout their lives. You possess a unique ability to see through deception and get straight to the heart of any matter. This makes you an excellent researcher, counselor, or strategist.
          </p>
        </div>
      </div>

      <div className="bg-mystic-900 text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Wind className="w-32 h-32" />
        </div>
        <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">Dominant Elements</h3>
        <p className="text-mystic-100 leading-relaxed relative z-10 text-lg">
          Your chart shows a fascinating interplay of the classical elements, with a distinct emphasis on Air and Fire. The Fire element fuels your ambition, granting you the creative spark and the courage to initiate new ventures. It is the source of your passion and your competitive edge. Conversely, the prominent Air element gives you a high degree of intellectual agility, excellent communication skills, and a strong desire for social connectivity and abstract thinking. The combination of Fire and Air means you are an "ideas person" who also possesses the drive to execute those ideas. The challenge for you, {user.name}, is to cultivate Earth and Water elements—meaning you must consciously practice grounding yourself, maintaining practical routines, and allowing yourself to fully experience emotional vulnerability without intellectualizing it.
        </p>
      </div>
    </section>
  );
};
