import React from 'react';
import { UserDetails } from '../../types';
import { User, Shield, Eye, Trophy, Heart, Star } from 'lucide-react';

export const PersonalityAnalysis: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <section className="mb-16 scroll-mt-24" id="personality-analysis">
      <h2 className="text-3xl font-serif font-bold text-mystic-900 border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
        <User className="text-gold-500 w-8 h-8" />
        Personality Analysis
      </h2>
      
      <p className="text-lg text-gray-700 leading-relaxed mb-8">
        Your astrological DNA, {user.name}, reveals a multifaceted personality characterized by depth, resilience, and a profound capacity for growth. The interplay of planetary forces at the time of your birth has woven a unique tapestry of psychological traits. Understanding these traits is the first step toward mastering your destiny.
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-mystic-800 flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-gold-500" /> Strengths
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            Your primary strengths lie in your remarkable analytical capacity and your unyielding determination. When you set your mind to a goal, you possess a laser-like focus that allows you to block out distractions and overcome significant obstacles. You have a natural gift for strategic thinking; you can anticipate problems before they arise and formulate effective contingency plans. Furthermore, your chart highlights a strong sense of integrity and a commitment to justice. You are a dependable ally and a fiercely loyal friend. Your intellectual curiosity is boundless, making you a lifelong learner who continuously adapts and evolves in the face of new information.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-mystic-800 flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-mystic-500" /> Weaknesses
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            No chart is without its challenging aspects, and for you, the primary pitfall is a tendency towards overthinking and perfectionism. Because you hold yourself to exceptionally high standards, you may sometimes suffer from "paralysis by analysis," delaying action out of fear that conditions are not yet optimal. Additionally, the strong fiery influence in your chart can occasionally manifest as impatience or a sharp tongue when dealing with those who do not match your intellectual pace. Learning to embrace imperfection and cultivating patience with others' processes will be crucial for your personal development and inner peace.
          </p>
        </div>

        <div className="bg-gold-50 rounded-2xl p-8 border border-gold-100">
          <h3 className="text-2xl font-bold text-mystic-900 flex items-center gap-2 mb-4">
            <Eye className="w-6 h-6 text-gold-600" /> Hidden Talents
          </h3>
          <p className="text-gray-800 leading-relaxed text-lg">
            Beneath your pragmatic exterior lies a profound, latent intuition that often borders on psychic receptivity. You possess an uncanny ability to "read the room" and sense the underlying motivations of others, even when they attempt to conceal them. If cultivated, this intuitive empathy can be an extraordinary asset in negotiations, counseling, or creative pursuits. Furthermore, your astrological configuration suggests a hidden talent for healing—whether that manifests physically through medicine, psychologically through therapy, or energetically through spiritual practices. You have the power to be a transformative catalyst for others.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-mystic-800 flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-gold-500" /> Leadership Ability
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Your chart indicates a democratic rather than dictatorial leadership style. You lead by example and by articulating a compelling vision rather than through forceful coercion. People are naturally drawn to your quiet confidence and your competence. However, you are often reluctant to step into the spotlight unless necessary. When you do accept the mantle of leadership, you are highly effective at organizing teams and maximizing individual strengths. You have the potential to be a profoundly influential figure in your community or industry, provided you overcome your natural inclination to work entirely independently.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-mystic-800 flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-red-400" /> Emotional Nature
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Emotionally, you are a deep well. While you may present a calm, rational facade to the outside world, your internal emotional life is rich, complex, and sometimes turbulent. You feel things with intense magnitude but often struggle to articulate these feelings verbally. You tend to process emotions internally, which can sometimes lead to feelings of isolation. It is imperative for you, {user.name}, to find safe outlets for emotional expression—whether through art, writing, or a trusted confidant. Allowing yourself to be emotionally vulnerable is not a sign of weakness, but the key to unlocking true intimacy in your life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};