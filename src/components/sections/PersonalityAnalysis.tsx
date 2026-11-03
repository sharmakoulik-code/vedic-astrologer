import React from 'react';
import { UserDetails } from '../../types';
import { User, Shield, Eye, Trophy, Heart, Star } from 'lucide-react';

export const PersonalityAnalysis: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <section className="mb-16 scroll-mt-24" id="personality-analysis">
      <h2 className="heading-premium flex items-center gap-3 mb-8">
        <User className="text-yellow-300 w-8 h-8" />
        Personality Analysis
      </h2>
      
      <p className="text-premium mb-8">
        For <span className="text-yellow-300 font-semibold">{user.name}</span>, astrology is often used as a lens for reflection rather than a fixed destiny. A chart can highlight recurring tendencies—such as curiosity, caution, intensity, or empathy—and those patterns can help a person understand where they may thrive or where they may need more clarity.
      </p>

      <div className="space-y-8">
        <div>
          <h3 className="heading-secondary">
            <Trophy className="w-6 h-6 text-yellow-400" /> Strengths
          </h3>
          <p className="text-premium-muted">
            A chart like this often points to strengths such as thoughtful analysis, persistence, and the ability to solve problems methodically. People with these tendencies often value integrity, learn quickly, and do well when they can focus on a few meaningful goals instead of spreading themselves too thin.
          </p>
        </div>

        <div>
          <h3 className="heading-secondary">
            <Shield className="w-6 h-6 text-blue-300" /> Weaknesses
          </h3>
          <p className="text-premium-muted">
            Common growth edges in this kind of profile include overthinking, perfectionism, or holding too tightly to a plan before all the information has emerged. These patterns are not flaws to be eliminated; they are simply habits that become easier to manage once they are noticed and addressed with patience.
          </p>
        </div>

        <div className="premium-card bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700">
          <h3 className="text-2xl font-bold text-yellow-200 flex items-center gap-2 mb-4">
            <Eye className="w-6 h-6 text-yellow-400" /> Hidden Talents
          </h3>
          <p className="text-premium-muted">
            A strong chart profile may also suggest hidden strengths in empathy, intuitive reading, and the ability to spot patterns that others miss. These talents are often most useful when paired with practical action, clear boundaries, and a willingness to keep learning through lived experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-yellow-200 flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-yellow-400" /> Leadership Ability
            </h3>
            <p className="text-premium-muted">
              Leadership may show up less as overt dominance and more as calm direction, competence, and the ability to guide others through clarity. In practice, this kind of influence grows strongest when a person learns to trust collaboration instead of trying to carry every burden alone.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-yellow-200 flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-pink-300" /> Emotional Nature
            </h3>
            <p className="text-premium-muted">
              Emotionally, many people with this pattern are thoughtful, reflective, and deeply feeling—even if they appear composed externally. The most helpful path is often to create regular outlets for expression, whether through journaling, art, conversation, or quiet routines that make emotional honesty easier to sustain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};