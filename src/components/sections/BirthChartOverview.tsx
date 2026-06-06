import React from 'react';
import { UserDetails } from '../../types';
import { Compass, Moon, Sun, Star, Wind } from 'lucide-react';

export const BirthChartOverview: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <section className="mb-16 scroll-mt-24" id="birth-chart-overview">
      <h2 className="heading-premium flex items-center gap-3 mb-8">
        <Compass className="text-yellow-300 w-8 h-8" />
        Birth Chart Overview
      </h2>
      
      <p className="text-premium mb-8">
        Welcome, <span className="text-yellow-300 font-semibold">{user.name}</span>. Based on your birth details from <span className="text-yellow-200">{user.birthPlace}</span> on <span className="text-yellow-200">{new Date(user.dob).toLocaleDateString()}</span> at <span className="text-yellow-200">{user.birthTime}</span>, the cosmic alignment at the precise moment of your arrival holds the profound map of your life's journey. In Vedic Astrology (Jyotish), the planetary positions act as karmic markers, revealing your soul's purpose, underlying patterns, and the unfolding narrative of your destiny.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="premium-card">
          <h3 className="heading-secondary">
            <Compass className="w-5 h-5 text-yellow-400" /> Ascendant (Lagna)
          </h3>
          <p className="text-premium-muted">
            Your Ascendant, or Lagna, represents the foundational lens through which you view the world. As the sign rising on the eastern horizon at {user.birthTime} in {user.birthPlace}, it shapes your physical appearance, vitality, and primary approach to life. Your chart indicates a powerful rising sign characterized by a dynamic, visionary energy. You are perceived by others as an independent thinker who is not afraid to carve a unique path. This Lagna provides you with an inherent resilience, allowing you to bounce back from adversity with renewed strength. It suggests that your life path will involve stepping into roles of authority and guiding others through times of transformation.
          </p>
        </div>

        <div className="premium-card">
          <h3 className="heading-secondary">
            <Moon className="w-5 h-5 text-blue-300" /> Moon Sign (Rasi)
          </h3>
          <p className="text-premium-muted">
            In Vedic astrology, the Moon represents your mind, emotions, and inner psychological reality. Your Moon sign is positioned in an intuitive and deeply intellectual sector of your chart. This placement bestows upon you a profound emotional depth and a strong empathetic resonance with the people around you. You process the world primarily through a lens of deep contemplation and intuition. When faced with challenges, your initial reaction is to withdraw slightly to analyze the emotional undercurrents before taking decisive action. This placement also indicates a strong connection to your mother or maternal figures, who have played a crucial role in shaping your internal emotional landscape.
          </p>
        </div>

        <div className="premium-card">
          <h3 className="heading-secondary">
            <Sun className="w-5 h-5 text-orange-300" /> Sun Sign (Surya)
          </h3>
          <p className="text-premium-muted">
            The Sun represents your soul, ego, and core identity. For {user.name}, the Sun's placement highlights a deep-seated drive for accomplishment and recognition. It gives you a natural magnetism and a sense of dignity that commands respect. However, this is not a superficial desire for fame; rather, it is a soul-level calling to make a tangible, lasting impact in your chosen field. The Sun’s radiant energy in your chart suggests periods in your life where you must stand alone to prove your capabilities, ultimately burning away impurities of the ego to reveal your true, luminous self.
          </p>
        </div>

        <div className="premium-card">
          <h3 className="heading-secondary">
            <Star className="w-5 h-5 text-pink-300" /> Nakshatra (Birth Star)
          </h3>
          <p className="text-premium-muted">
            The Nakshatra, or lunar mansion, occupied by your Moon provides granular detail about your mental mechanics. Your birth star reveals a fiercely independent, analytical, and truth-seeking nature. It is ruled by a planetary energy that demands authenticity and depth. Individuals born under this Nakshatra often experience significant spiritual or psychological awakenings throughout their lives. You possess a unique ability to see through deception and get straight to the heart of any matter. This makes you an excellent researcher, counselor, or strategist.
          </p>
        </div>
      </div>

      <div className="premium-card bg-gradient-to-br from-slate-800/60 to-slate-900/60 relative overflow-hidden border-slate-600">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Wind className="w-32 h-32" />
        </div>
        <h3 className="text-2xl font-serif font-bold mb-4 relative z-10 text-yellow-200">Dominant Elements</h3>
        <p className="text-premium relative z-10">
          Your chart shows a fascinating interplay of the classical elements, with a distinct emphasis on Air and Fire. The Fire element fuels your ambition, granting you the creative spark and the courage to initiate new ventures. It is the source of your passion and your competitive edge. Conversely, the prominent Air element gives you a high degree of intellectual agility, excellent communication skills, and a strong desire for social connectivity and abstract thinking. The combination of Fire and Air means you are an "ideas person" who also possesses the drive to execute those ideas. The challenge for you, <span className="text-yellow-300 font-semibold">{user.name}</span>, is to cultivate Earth and Water elements—meaning you must consciously practice grounding yourself, maintaining practical routines, and allowing yourself to fully experience emotional vulnerability without intellectualizing it.
        </p>
      </div>
    </section>
  );
};
