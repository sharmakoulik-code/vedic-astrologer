import { useEffect, useMemo, useState } from 'react';
import { UserDetails } from '../../types';
import {
  bhagyankInterpretations,
  calculateBhagyank,
  calculateMulank,
  getCombinedNumerologyAnalysis,
  getCompatibilitySummary,
  getLuckyAssociations,
  mulankInterpretations,
  safeParseDate,
} from '../../utils/numerology';

interface NumerologyAnalysisProps {
  user: UserDetails;
}

export const NumerologyAnalysis: React.FC<NumerologyAnalysisProps> = ({ user }) => {
  const [manualDob, setManualDob] = useState<string>(user.dob || '');
  const [partnerDob, setPartnerDob] = useState<string>('');

  useEffect(() => {
    setManualDob(user.dob || '');
  }, [user.dob]);

  const parsedDob = useMemo(() => safeParseDate(user.dob || manualDob), [user.dob, manualDob]);

  const day = parsedDob ? parsedDob.getUTCDate() : null;
  const month = parsedDob ? parsedDob.getUTCMonth() + 1 : null;
  const year = parsedDob ? parsedDob.getUTCFullYear() : null;

  const mulank = useMemo(() => (day !== null ? calculateMulank(day) : null), [day]);
  const bhagyank = useMemo(() => (user.dob || manualDob ? calculateBhagyank(user.dob || manualDob) : null), [user.dob, manualDob]);

  const combined = useMemo(
    () => (mulank !== null && bhagyank !== null ? getCombinedNumerologyAnalysis(mulank, bhagyank) : null),
    [mulank, bhagyank]
  );

  const partnerCompatibility = useMemo(
    () => (partnerDob ? getCompatibilitySummary(user.dob || manualDob, partnerDob) : null),
    [manualDob, partnerDob, user.dob]
  );

  const mulankDigitSum = day !== null ? String(day).split('').reduce((sum, digit) => sum + Number(digit), 0) : 0;
  const bhagyankDigitString = day !== null && month !== null && year !== null ? `${String(day).padStart(2, '0')}${String(month).padStart(2, '0')}${String(year)}` : '';
  const bhagyankDigitSum = bhagyankDigitString ? bhagyankDigitString.split('').reduce((sum, digit) => sum + Number(digit), 0) : 0;

  return (
    <section className="mt-12 md:mt-20">
      <div className="mb-6 text-center md:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Numerology Analysis</p>
        <h3 className="mt-3 text-2xl font-serif font-bold text-white md:text-3xl">Mulank & Bhagyank</h3>
      </div>

      {!parsedDob ? (
        <div className="glass rounded-2xl p-5 md:p-6">
          <p className="text-sm leading-6 text-slate-300">
            Enter your date of birth to calculate your numerology profile.
          </p>
          <input
            type="date"
            value={manualDob}
            onChange={(e) => setManualDob(e.target.value)}
            className="mt-4 w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-white placeholder-white/35"
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass rounded-2xl p-5 md:p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-300">Mulank</div>
                <div className="mt-2 text-3xl font-bold text-[#F4C542]">{mulank}</div>
                <div className="mt-1 text-sm text-slate-300">Birth number</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-300">Bhagyank</div>
                <div className="mt-2 text-3xl font-bold text-[#F4C542]">{bhagyank}</div>
                <div className="mt-1 text-sm text-slate-300">Destiny number</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-300">Associated planets</div>
                <div className="mt-2 text-lg font-semibold text-white">{mulankInterpretations[mulank! - 1].planet} • {bhagyankInterpretations[bhagyank! - 1].lifeDirection}</div>
                <div className="mt-1 text-sm text-slate-300">Traditional numerology</div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 p-4">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-300">Calculation breakdown</div>
              <div className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
                <p>
                  <span className="font-semibold text-white">Mulank:</span> {day} → {String(day).split('').reduce((sum, digit) => sum + Number(digit), 0)} → {mulank}
                </p>
                <p>
                  <span className="font-semibold text-white">Bhagyank:</span> {String(day).padStart(2, '0')}/{String(month).padStart(2, '0')}/{year} → {bhagyankDigitString} → {bhagyankDigitSum} → {bhagyank}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="glass rounded-2xl p-5 md:p-6">
              <h4 className="text-lg font-semibold text-white">Mulank Analysis</h4>
              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-300">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Core personality</div>
                  <p className="mt-2">{mulankInterpretations[mulank! - 1].corePersonality.join(' ')}</p>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Natural strengths</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {mulankInterpretations[mulank! - 1].naturalStrengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Weaknesses & challenges</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {mulankInterpretations[mulank! - 1].weaknesses.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Career & money</div>
                  <p className="mt-2">{mulankInterpretations[mulank! - 1].career.join(', ')}. {mulankInterpretations[mulank! - 1].money.join(' ')}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 md:p-6">
              <h4 className="text-lg font-semibold text-white">Bhagyank Analysis</h4>
              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-300">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Life direction</div>
                  <p className="mt-2">{bhagyankInterpretations[bhagyank! - 1].lifeDirection}</p>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Major themes</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {bhagyankInterpretations[bhagyank! - 1].majorLifeThemes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Career & financial tendencies</div>
                  <p className="mt-2">{bhagyankInterpretations[bhagyank! - 1].career.join(', ')}. {bhagyankInterpretations[bhagyank! - 1].financial.join(' ')}</p>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Growth recommendations</div>
                  <p className="mt-2">{bhagyankInterpretations[bhagyank! - 1].recommendations.join(' ')}</p>
                </div>
              </div>
            </div>
          </div>

          {combined && (
            <div className="glass rounded-2xl p-5 md:p-6">
              <h4 className="text-lg font-semibold text-white">Combined Numerology</h4>
              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-300">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Overall harmony</div>
                  <p className="mt-2 text-white">{combined.harmony}</p>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Personality interaction</div>
                  <p className="mt-2">{combined.strengths.join(' ')}</p>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Potential internal conflicts</div>
                  <p className="mt-2">{combined.conflicts.join(' ')}</p>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Career & financial tendencies</div>
                  <p className="mt-2">{combined.career.join(' ')} {combined.finances.join(' ')}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="glass rounded-2xl p-5 md:p-6">
              <h4 className="text-lg font-semibold text-white">Lucky associations</h4>
              <div className="mt-4 space-y-4 text-sm leading-6 text-slate-300">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Mulank</div>
                  <p className="mt-2">Planet: {mulankInterpretations[mulank! - 1].planet}</p>
                  <p>Favourable numbers: {getLuckyAssociations(mulank!).numbers.join(', ')}</p>
                  <p>Colours: {getLuckyAssociations(mulank!).colors.join(', ')}</p>
                  <p>Weekdays: {getLuckyAssociations(mulank!).weekdays.join(', ')}</p>
                  <p>Gemstone: {getLuckyAssociations(mulank!).gemstones.join(', ')}</p>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F4C542]">Bhagyank</div>
                  <p className="mt-2">Planet: {getLuckyAssociations(bhagyank!).planet}</p>
                  <p>Favourable numbers: {getLuckyAssociations(bhagyank!).numbers.join(', ')}</p>
                  <p>Colours: {getLuckyAssociations(bhagyank!).colors.join(', ')}</p>
                  <p>Weekdays: {getLuckyAssociations(bhagyank!).weekdays.join(', ')}</p>
                  <p>Gemstone: {getLuckyAssociations(bhagyank!).gemstones.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 md:p-6">
              <h4 className="text-lg font-semibold text-white">Relationship compatibility</h4>

              <input
                type="date"
                value={partnerDob}
                onChange={(e) => setPartnerDob(e.target.value)}
                className="mt-4 w-full rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3 text-white placeholder-white/35"
                placeholder="Partner date of birth"
              />

              {partnerCompatibility && (
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                  <p>
                    <span className="font-semibold text-white">Compatibility score:</span> {Math.round(partnerCompatibility.score)}/100
                  </p>
                  <p>{partnerCompatibility.summary}</p>
                  <ul className="list-disc space-y-1 pl-5">
                    {partnerCompatibility.strengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <ul className="list-disc space-y-1 pl-5">
                    {partnerCompatibility.challenges.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
