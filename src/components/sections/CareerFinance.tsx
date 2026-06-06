import React from 'react';
import { UserDetails } from '../../types';
import { Briefcase, TrendingUp, Coins, Building, LineChart } from 'lucide-react';

export const CareerFinance: React.FC<{ user: UserDetails }> = ({ user }) => {
  return (
    <>
      <section className="mb-16 scroll-mt-24" id="career-astrology">
        <h2 className="text-3xl font-serif font-bold text-mystic-900 border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Briefcase className="text-gold-500 w-8 h-8" />
          Career Astrology Prediction
        </h2>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          The 10th house of your natal chart—the domain of career, public standing, and professional legacy—is powerfully activated. For you, {user.name}, your career is not merely a means of earning a livelihood; it is deeply intertwined with your sense of identity and your karmic purpose. The planetary alignments suggest a professional path that is unconventional, requiring you to break free from traditional corporate structures at various points in your life.
        </p>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-mystic-100 shadow-sm">
            <h3 className="text-xl font-bold text-mystic-800 flex items-center gap-2 mb-3">
              <Building className="w-5 h-5 text-mystic-500" /> Best Careers
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Based on the elemental balance and the rulers of your 2nd, 6th, and 10th houses, you are most likely to thrive in careers that require a blend of analytical rigor and creative problem-solving. Fields such as advanced technology, strategic consulting, higher education, research, psychology, or specialized financial services are highly favorable. You have a natural aptitude for breaking down complex systems and optimizing them. Furthermore, because of a strong communicative influence in your chart, roles that involve writing, speaking, or mediating between disparate groups will also bring you considerable success.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-mystic-100 shadow-sm">
            <h3 className="text-xl font-bold text-mystic-800 flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-mystic-500" /> Business Potential & Job Success
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Your chart indicates a very high potential for independent business ownership or entrepreneurship, particularly in the latter half of your career. While you may begin your professional journey within an established organization (where you will achieve rapid job success due to your stellar work ethic), your ultimate fulfillment will come from building something of your own. Your astrological signature points to a "late bloomer" trajectory in entrepreneurship—meaning that the experiences and network you gather in your early years will be the vital foundation for a highly successful solo venture later on. You are not meant to follow orders indefinitely; you are meant to set the vision.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-mystic-100 shadow-sm">
            <h3 className="text-xl font-bold text-mystic-800 flex items-center gap-2 mb-3">
              <LineChart className="w-5 h-5 text-mystic-500" /> Future Career Opportunities
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Looking ahead, the planetary transits suggest that a significant career pivot or an unexpected promotion is on the horizon. This opportunity may require you to relocate or to rapidly acquire a new, specialized skill set. Do not shy away from this challenge, as it is a divinely timed stepping stone toward your ultimate professional legacy. Networking and mentorship will play a critical role in your advancement; a key figure (likely an older, highly experienced individual) will open doors that were previously closed to you.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 scroll-mt-24" id="financial-astrology">
        <h2 className="text-3xl font-serif font-bold text-mystic-900 border-b-2 border-gold-200 pb-2 mb-6 flex items-center gap-3">
          <Coins className="text-gold-500 w-8 h-8" />
          Financial Astrology Report
        </h2>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          In Vedic astrology, the 2nd house governs accumulated wealth and savings, while the 11th house governs income and gains. The relationship between these houses in your chart, {user.name}, reveals your unique financial karma. Your financial journey is marked by a quest for security, but also by the realization that true wealth encompasses much more than material accumulation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-mystic-800 mb-3">Money Strengths</h3>
            <p className="text-gray-700 leading-relaxed">
              You are naturally prudent and possess an excellent intuitive grasp of value. You are not easily swayed by "get-rich-quick" schemes; instead, you understand the power of compound growth and long-term planning. Your ability to delay gratification is a massive financial superpower. When you invest, you do so with a calculated, rational mindset, avoiding emotional financial decisions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-mystic-800 mb-3">Financial Challenges</h3>
            <p className="text-gray-700 leading-relaxed">
              Your primary financial challenge is a scarcity mindset that can sometimes emerge during periods of stress. Even when your resources are abundant, you may harbor an irrational fear of losing everything. This anxiety can prevent you from taking calculated risks that are necessary for substantial wealth creation. You must learn to trust your financial foundation and view money as a flowing current rather than a stagnant pool.
            </p>
          </div>
        </div>

        <div className="bg-mystic-50 p-6 rounded-2xl border border-mystic-200">
          <h3 className="text-xl font-bold text-mystic-900 mb-4">Wealth Periods & Investment Tendencies</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your astrological timeline indicates specific "Dasha" (planetary periods) that are highly conducive to wealth accumulation. Your mid-30s to early 40s mark a significant wealth accumulation phase, driven primarily by professional achievements. A second, even more potent wealth period occurs in your 50s, largely derived from investments and passive income streams. 
          </p>
          <p className="text-gray-700 leading-relaxed">
            Regarding your investment tendencies, your chart favors tangible assets. Real estate, long-term index funds, and solid, established businesses align well with your cosmic energetic signature. Speculative trading or high-risk crypto investments, while perhaps tempting, are not supported by your chart and may lead to unnecessary stress. Your long-term wealth potential is extraordinary, provided you adhere to a disciplined, conservative investment strategy mixed with occasional, highly researched strategic risks.
          </p>
        </div>
      </section>
    </>
  );
};