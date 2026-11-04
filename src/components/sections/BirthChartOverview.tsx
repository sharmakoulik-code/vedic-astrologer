import React from 'react';
import { UserDetails } from '../../types';
import { buildChart } from '../../utils/chart';
import { Compass, Moon, Sun, Star, Wind } from 'lucide-react';

export const BirthChartOverview: React.FC<{ user: UserDetails; chart?: ReturnType<typeof buildChart> }> = ({ user, chart }) => {
  const hasExactTime = Boolean(user.birthTime && user.birthTime.trim());
  const missingTimezone = hasExactTime && !user.timezone?.trim();
  const resolvedChart = chart ?? buildChart({
    date: user.dob,
    latitude: missingTimezone ? undefined : user.latitude,
    longitude: missingTimezone ? undefined : user.longitude,
    birthTime: missingTimezone ? undefined : user.birthTime || '12:00',
    timezone: user.timezone,
    locationLabel: user.birthPlace || 'Birth location',
  });

  const displayPlace = user.birthPlace || 'birth place not provided';
  const displayTime = user.birthTime || 'approximate time';
  const hasLocation = Boolean(resolvedChart.hasLocation && !missingTimezone);

  return (
    <section className="mb-16 scroll-mt-24" id="birth-chart-overview">
      <h2 className="heading-premium flex items-center gap-3 mb-8">
        <Compass className="text-yellow-300 w-8 h-8" />
        Birth Chart Overview
      </h2>

      <p className="text-premium mb-8">
        Welcome, <span className="text-yellow-300 font-semibold">{user.name || 'friend'}</span>. Based on your birth details from <span className="text-yellow-200">{displayPlace}</span> on <span className="text-yellow-200">{new Date(user.dob || Date.now()).toLocaleDateString()}</span> at <span className="text-yellow-200">{displayTime}</span>. {missingTimezone ? 'A timezone is needed to interpret the entered birth time. The time is not used, and Lagna and house placements are omitted.' : hasLocation ? 'The chart below reflects the local birth time and calculated ascendant.' : 'A birth place and coordinates are needed for Lagna and house placements. Without them, only the planetary and nakshatra positions can be read.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {hasLocation && hasExactTime && resolvedChart.lagna && (
          <div className="premium-card">
            <h3 className="heading-secondary">
              <Compass className="w-5 h-5 text-yellow-400" /> Ascendant (Lagna)
            </h3>
            <p className="text-premium-muted">
              Your Lagna is {resolvedChart.lagna}, which is a useful guide to your outward temperament and how you meet the world.
            </p>
          </div>
        )}

        {(!hasLocation || !hasExactTime) && (
          <div className="premium-card">
            <h3 className="heading-secondary">
              <Compass className="w-5 h-5 text-yellow-400" /> Ascendant (Lagna)
            </h3>
            <p className="text-premium-muted">
              {missingTimezone ? 'Please provide a timezone for your birth place to use the entered birth time and calculate Lagna and house placements.' : hasLocation ? 'Because the birth time is missing, Lagna and house placements are not shown.' : 'A birth place and coordinates are required before Lagna and house placements are calculated.'}
            </p>
          </div>
        )}

        <div className="premium-card">
          <h3 className="heading-secondary">
            <Moon className="w-5 h-5 text-blue-300" /> Moon Sign (Rasi)
          </h3>
          <p className="text-premium-muted">
            Your Moon is in {resolvedChart.moonSign}. This sign often describes your emotional rhythm, instinctive reactions, and inner mental climate. The Moon is also in {resolvedChart.moonNakshatra}, pada {resolvedChart.moonPada}, which adds a more specific tonal texture to your emotional and mental pattern.
          </p>
        </div>

        <div className="premium-card">
          <h3 className="heading-secondary">
            <Sun className="w-5 h-5 text-orange-300" /> Sun Sign (Surya)
          </h3>
          <p className="text-premium-muted">
            The Sun is in {resolvedChart.sunSign}. This placement often points to the core themes of self-expression, purpose, and how you naturally seek recognition or direction.
          </p>
        </div>

        <div className="premium-card">
          <h3 className="heading-secondary">
            <Star className="w-5 h-5 text-pink-300" /> Nakshatra (Birth Star)
          </h3>
          <p className="text-premium-muted">
            Your Moon is in {resolvedChart.moonNakshatra} (pada {resolvedChart.moonPada}). This lunar mansion gives a more granular sense of your mental patterns, instinctive tendencies, and the emotional themes that often repeat through life.
          </p>
        </div>
      </div>

      <div className="premium-card bg-gradient-to-br from-slate-800/60 to-slate-900/60 relative overflow-hidden border-slate-600">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Wind className="w-32 h-32" />
        </div>
        <h3 className="text-2xl font-serif font-bold mb-4 relative z-10 text-yellow-200">Dominant Elements</h3>
        <p className="text-premium relative z-10">
          A quick balance from the chart shows Fire {resolvedChart.elementBalance.Fire}, Earth {resolvedChart.elementBalance.Earth}, Air {resolvedChart.elementBalance.Air}, and Water {resolvedChart.elementBalance.Water}. This balance usually points to how your instinctive energy is distributed between action, stability, thought, and feeling.
        </p>
        <p className="mt-4 text-sm text-premium-muted">
          Planetary positions use Lahiri ayanamsa; whole-sign houses are used when Lagna is available.
        </p>
      </div>
    </section>
  );
};
