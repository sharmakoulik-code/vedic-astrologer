import React from 'react';
import { UserDetails } from '../../types';
import { CalendarDays, Hourglass, Sunrise, Infinity as InfinityIcon } from 'lucide-react';

export const FuturePredictions: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <section className="mb-16 scroll-mt-24" id="future-prediction">
      <h2 className="text-3xl font-serif font-bold text-mystic-900 border-b-2 border-gold-200 pb-2 mb-8 flex items-center gap-3">
        <Hourglass className="text-gold-500 w-8 h-8" />
        Future Prediction
      </h2>

      <div className="space-y-12">
        <div className="relative pl-8 border-l-4 border-gold-400">
          <div className="absolute -left-4 top-0 bg-gold-400 rounded-full p-2">
            <CalendarDays className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-mystic-900 mb-4">Next 12 Months: The Seed of Transformation</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            The next 12 months may bring a strong sense of motion, learning, and recalibration for {user.name}. Some people with this pattern find that travel, study, and networking become more visible themes, but the outcome is always shaped by the choices made in real life.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li><strong>Possible themes:</strong> Skill-building, fresh perspectives, and productive conversations.</li>
            <li><strong>Possible challenges:</strong> Overcommitment, information overload, and the need to prioritize.</li>
            <li><strong>Helpful mindset:</strong> Treat the period as a learning cycle rather than a fixed prediction.</li>
          </ul>
        </div>

        <div className="relative pl-8 border-l-4 border-mystic-400">
          <div className="absolute -left-4 top-0 bg-mystic-400 rounded-full p-2">
            <Sunrise className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-mystic-900 mb-4">Next 3 Years: Building the Fortress</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            In the next three years, certain chart patterns may emphasize stability, long-term planning, and a stronger focus on home, reputation, or foundational work. This is often a period of building structure rather than sudden breakthroughs, and it rewards consistency.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li><strong>Possible themes:</strong> Home stability, professional maturity, and stronger long-range planning.</li>
            <li><strong>Possible challenges:</strong> Work-life imbalance or over-responsibility.</li>
            <li><strong>Helpful mindset:</strong> Focus on durable foundations instead of short-term validation.</li>
          </ul>
        </div>

        <div className="relative pl-8 border-l-4 border-indigo-400">
          <div className="absolute -left-4 top-0 bg-indigo-400 rounded-full p-2">
            <InfinityIcon className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-mystic-900 mb-4">Next 5 to 10 Years: Mastery and Expansion</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Over a longer horizon, the chart may suggest a period in which personal authority, independence, and a stronger sense of direction become more important. This is not a promise of a fixed outcome but a reminder that long-term growth often comes from disciplined effort, clear boundaries, and strategic choices.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The most useful focus during this broader period is to identify where your attention, resources, and energy are best used. A steady plan often matters more than dramatic timing.
          </p>
        </div>
      </div>
    </section>
  );
};