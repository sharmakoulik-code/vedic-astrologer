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
            For you, {user.name}, the immediate horizon is characterized by the dynamic energy of preparation and planting seeds. You are entering a sub-period that heavily activates your 3rd and 9th houses. This means travel, short-term courses, and intense networking are highly probable. 
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li><strong>Opportunities:</strong> Rapid skill acquisition; a chance meeting that leads to a profitable collaboration.</li>
            <li><strong>Challenges:</strong> Feeling overwhelmed by options; the need to prioritize ruthlessly.</li>
            <li><strong>Important Changes:</strong> A shift in your daily routine; distancing yourself from a stagnant relationship or habit.</li>
          </ul>
        </div>

        <div className="relative pl-8 border-l-4 border-mystic-400">
          <div className="absolute -left-4 top-0 bg-mystic-400 rounded-full p-2">
            <Sunrise className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-mystic-900 mb-4">Next 3 Years: Building the Fortress</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            As you move into the next three years, the energetic focus shifts to the 4th and 10th houses—the foundational pillars of home and career. This is a period of structural building. You will likely acquire property, establish a more permanent base, or reach a pinnacle position within your chosen field. The growth during this phase is not explosive, but rather steady, permanent, and compounding.
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li><strong>Opportunities:</strong> Leadership roles; real estate investments; establishing a solid domestic foundation.</li>
            <li><strong>Challenges:</strong> Balancing the heavy demands of work with the need for domestic tranquility.</li>
            <li><strong>Growth Periods:</strong> Mid-way through this cycle, a significant mentor will elevate your professional status.</li>
          </ul>
        </div>

        <div className="relative pl-8 border-l-4 border-indigo-400">
          <div className="absolute -left-4 top-0 bg-indigo-400 rounded-full p-2">
            <InfinityIcon className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-mystic-900 mb-4">Next 5 to 10 Years: Mastery and Expansion</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Looking at the macro-level transits over the next decade, you are moving toward a period of profound spiritual and material synthesis. In the next 5 years, you will consolidate your gains and likely begin a side venture that turns into your primary focus. By the 10-year mark, you will be in a Dasha phase that completely supports autonomy. You will have built enough security to operate entirely on your own terms. This decade represents the culmination of your early struggles into a grand, cohesive life narrative of success and self-mastery.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The most important life lesson during this macro-period is learning to delegate. Your success potential is virtually unlimited if you can build a trusted team to handle the minutiae, freeing you to operate exclusively in your zone of genius.
          </p>
        </div>
      </div>
    </section>
  );
};