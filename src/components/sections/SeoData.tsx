import React from 'react';
import { UserDetails } from '../../types';

export const SeoData: React.FC<{ user: UserDetails }> = ({ user }) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How accurate is a Vedic astrology report?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vedic astrology (Jyotish) is highly accurate when precise birth time, date, and location are provided. It uses astronomical calculations and sidereal zodiacs to map planetary positions exactly as they were at your birth."
        }
      },
      {
        "@type": "Question",
        "name": "Can astrology predict my exact marriage date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Astrology indicates highly favorable planetary periods (Dashas and transits) for marriage. While it pinpoints windows of maximum probability, the exact date depends on your personal choices and free will."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Western and Vedic astrology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Western astrology uses the tropical zodiac based on seasons, while Vedic astrology uses the sidereal zodiac based on fixed constellations. Vedic astrology also deeply utilizes planetary periods (Dashas) and lunar mansions (Nakshatras)."
        }
      },
      {
        "@type": "Question",
        "name": "Do astrological remedies actually work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Remedies (Upayas) like mantras, charity, and lifestyle changes work by shifting your internal energetic frequency and psychological focus, which helps mitigate negative karmic patterns and attract positive outcomes."
        }
      },
      {
        "@type": "Question",
        "name": "How does my career prediction help me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It identifies your inherent strengths, ideal work environments, and potential obstacles. This allows you to align your professional path with your cosmic blueprint, leading to greater fulfillment and financial success."
        }
      },
      {
        "@type": "Question",
        "name": "Why are lucky numbers and colors important?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In numerology and astrology, specific numbers and colors vibrate at frequencies that harmonize with your ruling planets, theoretically reducing friction in your daily life and attracting positive energy."
        }
      },
      {
        "@type": "Question",
        "name": "What if my health astrology shows bad results?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Astrology warns, it does not doom. Difficult health aspects are early warning signs meant to prompt you to take preventive action, improve your lifestyle, and consult medical professionals."
        }
      },
      {
        "@type": "Question",
        "name": "Is my destiny completely fixed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Vedic astrology believes in a mix of fixed karma (Prarabdha) and free will (Agami). Your birth chart is a map of tendencies, but how you navigate that map is up to your daily choices."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I get my astrology chart read?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It is recommended to have a comprehensive reading once, and then update readings yearly (varshphal) or during major life transitions to understand current planetary transits."
        }
      },
      {
        "@type": "Question",
        "name": "Can this report help me find my soulmate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, by detailing the characteristics of your ideal partner and the timing of relationship opportunities, it helps you recognize and attract a compatible, long-term partner."
        }
      }
    ]
  };

  return (
    <section className="mt-24 border-t border-gray-200 pt-16 pb-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">SEO & Meta Data Generation</h2>
      
      <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Meta Data & URLs</h3>
          <div className="space-y-3 text-sm">
            <p><span className="font-semibold text-gray-700">Meta Title:</span> Personalized Vedic Astrology & Life Destiny Report</p>
            <p><span className="font-semibold text-gray-700">Meta Description:</span> Discover your ultimate life path with our deeply personalized Vedic astrology report covering career, wealth, love, marriage, health, and future predictions.</p>
            <p><span className="font-semibold text-gray-700">URL Slug:</span> /personalized-vedic-astrology-report-{user.name.toLowerCase().replace(/\s+/g, '-')}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Keywords Strategy</h3>
          <div className="space-y-4 text-sm">
            <div>
              <span className="font-semibold text-gray-700 block mb-2">Key SEO Keywords:</span>
              <div className="flex flex-wrap gap-2">
                {['Vedic astrology report', 'birth chart analysis', 'kundli reading', 'life prediction', 'astrology online'].map(k => (
                  <span key={k} className="bg-white px-3 py-1 rounded-full border border-gray-200 text-gray-600">{k}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-700 block mb-2">Long-Tail Keywords:</span>
              <div className="flex flex-wrap gap-2">
                {['personalized career astrology prediction', 'when will I get married astrology', 'accurate financial astrology report', 'vedic astrology future predictions next 10 years', 'astrological remedies for success in life'].map(k => (
                  <span key={k} className="bg-white px-3 py-1 rounded-full border border-gray-200 text-gray-600">{k}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Featured Snippet Answer</h3>
          <p className="text-sm text-gray-700 bg-white p-4 rounded-lg border border-gray-200">
            <strong>What is a personalized Vedic astrology report?</strong><br/>
            A personalized Vedic astrology report is a comprehensive life analysis based on your exact birth date, time, and location. It analyzes planetary positions to provide accurate predictions regarding your personality, career, wealth, love life, marriage timing, and future milestones, while offering specific remedies for overcoming obstacles.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Internal Linking Strategy</h3>
          <ul className="list-disc pl-5 text-sm text-blue-600 space-y-2">
            <li><a href="#" className="hover:underline">Understanding Your Ascendant Sign (Lagna)</a></li>
            <li><a href="#" className="hover:underline">The 10th House: Career & Professional Karma</a></li>
            <li><a href="#" className="hover:underline">Vedic Remedies: Mantras and Gemstones</a></li>
            <li><a href="#" className="hover:underline">Marriage Timing in Jyotish</a></li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQ)</h3>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-gray-800 text-sm mb-1">{idx + 1}. {faq.name}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-bold text-gray-700 text-xs mb-2 uppercase tracking-wider">Generated JSON-LD Schema</h4>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
              {JSON.stringify(faqSchema, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};