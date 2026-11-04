import { useEffect, useState } from 'react';
import { UserDetails } from './types';
import { UserDataForm } from './components/UserDataForm';
import { BirthChartOverview } from './components/sections/BirthChartOverview';
import { KundliSection } from './components/sections/KundliSection';
import { buildChart } from './utils/chart';
import { PersonalityAnalysis } from './components/sections/PersonalityAnalysis';
import { CareerFinance } from './components/sections/CareerFinance';
import { LoveMarriageHealth } from './components/sections/LoveMarriageHealth';
import { FuturePredictions } from './components/sections/FuturePredictions';
import { SuccessLuckyRemedies } from './components/sections/SuccessLuckyRemedies';
import { ActionPlan } from './components/sections/ActionPlan';
import { NumerologyAnalysis } from './components/sections/NumerologyAnalysis';
import {
  Moon,
  Sparkles,
  ChevronLeft,
  Star,
  ArrowRight,
  CheckCircle2,
  Quote,
  WandSparkles,
  Monitor,
  MapPin,
  Calculator,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useMetaTags } from './hooks/useMetaTags';
import { generateMetaTags } from './config/seo';
import { capitalizeName, formatReportDate } from './utils/reportFormatting';
import {
  buildSoftwareApplicationSchema,
  buildWebPageSchema,
  buildWebSiteSchema,
  injectStructuredData,
} from './seo/schema';

function App() {
  const [userData, setUserData] = useState<UserDetails | null>(null);

  useEffect(() => {
    injectStructuredData(buildWebSiteSchema(), 'vedic-astrologer-website-schema');
    injectStructuredData(buildWebPageSchema('Home'), 'vedic-astrologer-webpage-schema');
    injectStructuredData(buildSoftwareApplicationSchema(), 'vedic-astrologer-app-schema');
  }, []);

  // Update meta tags based on current page state
  useMetaTags(generateMetaTags(userData ? 'report' : 'home', userData));

  const handleReset = () => setUserData(null);
  const siteBase = import.meta.env.BASE_URL || '/';
  const chartSummary = userData ? buildChart({
    date: userData.dob,
    latitude: userData.latitude,
    longitude: userData.longitude,
    birthTime: userData.birthTime,
    timezone: userData.timezone,
    locationLabel: userData.birthPlace || 'Birth location',
  }) : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const statCards = [
    { value: '12', label: 'Life houses', icon: Moon },
    { value: '9', label: 'Chart bodies', icon: Star },
  ];

  const heroBenefits = [
    'Lahiri ayanamsa',
    'Whole-sign houses',
    'Browser-based report',
  ];

  const howItWorks = [
    {
      icon: Sparkles,
      title: '1. Share your details',
      text: 'Enter your name, birth date, and a few key details to personalize your reading.',
    },
    {
      icon: WandSparkles,
      title: '2. Review chart themes',
      text: 'Explore planetary positions and traditional chart themes in a clear, readable format.',
    },
    {
      icon: Star,
      title: '3. Reflect on the reading',
      text: 'Treat the interpretation as a prompt for reflection, not a prediction or professional advice.',
    },
  ];

  const commonThemes = [
    'Career direction and timing reflections',
    'Relationship patterns and emotional themes',
    'Lifestyle, health, and self-awareness prompts',
  ];

  const faqs = [
    {
      q: 'How are charts calculated?',
      a: 'The chart uses planetary positions interpreted with Lahiri ayanamsa and whole-sign houses. Readings are for guidance and entertainment only, not guaranteed predictions.',
    },
    {
      q: 'Do I need my exact birth time?',
      a: 'A date is enough to show planetary positions. Lagna and house placements need a birth time, location, and timezone. If you enter a time without a timezone, the report will ask for one and omit Lagna.',
    },
    {
      q: 'What happens to my birth details?',
      a: 'The report is processed in your browser. If you search for a birth place, only the place name you enter is sent to Open-Meteo for location lookup.',
    },
    {
      q: 'Is this professional advice?',
      a: 'No. Readings are for guidance and entertainment only and are not medical, legal, financial, or professional advice.',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-mystic-950 via-mystic-900 to-mystic-950 font-sans text-gray-800 selection:bg-gold-500/30">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.8) 0, transparent 1px), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.7) 0, transparent 1.5px), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.65) 0, transparent 1px)', backgroundSize: '220px 220px' }} />
        <motion.div
          className="absolute left-10 top-10 h-72 w-72 rounded-full bg-mystic-500/10 blur-[120px]"
          animate={{ x: [0, 30, -30, 0], y: [0, -30, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-[#f4c542]/7 blur-[150px]"
          animate={{ x: [0, -40, 40, 0], y: [0, 40, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f4c542]/4 blur-[120px]"
          animate={{ scale: [1, 1.2, 0.85, 1] }}
          transition={{ duration: 14, repeat: Infinity }}
        />
      </div>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-mystic-950/45 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="group flex cursor-pointer items-center gap-3"
            onClick={handleReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#f4c542]/80 bg-[radial-gradient(circle_at_35%_30%,rgba(255,236,180,0.95),rgba(244,197,66,0.7)_18%,rgba(15,23,42,0.9)_62%)] shadow-[0_0_20px_rgba(244,197,66,0.18)]"
            >
              <span className="absolute inset-1 rounded-full border border-[#f7d77c]/70" />
              <Moon className="relative z-10 h-6 w-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              <Star className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full fill-[#ffd970] text-[#ffd970] drop-shadow-[0_0_12px_rgba(244,197,66,0.9)]" />
            </motion.div>
            <div className="leading-none">
              <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#f4c542]/90">Vedic</div>
              <motion.h1 className="mt-0.5 text-lg font-serif font-bold tracking-[0.08em] text-white transition-colors group-hover:text-[#ffd970] sm:text-xl">
                <span className="bg-gradient-to-r from-[#f4c542] via-[#ffd970] to-[#f4c542] bg-clip-text text-transparent">ASTROLOGER</span>
              </motion.h1>
            </div>
          </motion.div>

          <nav className="hidden items-center gap-4 text-sm text-slate-200 md:flex">
            <a href={siteBase} className="transition hover:text-white">Home</a>
            <a href={`${siteBase}about/`} className="transition hover:text-white">About</a>
            <a href={`${siteBase}faq/`} className="transition hover:text-white">FAQ</a>
            <a href={`${siteBase}methodology/`} className="transition hover:text-white">Methodology</a>
            <a href={`${siteBase}contact/`} className="transition hover:text-white">Contact</a>
          </nav>

          {userData && (
            <motion.button
              onClick={handleReset}
              className="button-glass flex items-center gap-2 text-sm font-medium text-slate-200 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-4 w-4" /> Start New Report
            </motion.button>
          )}
        </div>
      </header>

      <main className="relative z-10 w-full">
        {!userData ? (
          <motion.div
            className="mx-auto w-full max-w-7xl px-4 py-12 md:px-8 md:py-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-[1.08fr_0.92fr]">
              <motion.div className="relative z-10" variants={itemVariants}>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f4c542]/25 bg-[#f4c542]/8 px-3 py-2 text-[11px] font-medium text-[#f8d66f] backdrop-blur-sm sm:text-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  Ancient wisdom • Personalized guidance
                </motion.div>

                <h2 className="mb-4 max-w-xl text-3xl font-serif font-bold leading-[0.95] tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
                  Your Cosmic <span className="bg-gradient-to-r from-[#f4c542] via-[#ffd970] to-[#f4c542] bg-clip-text text-transparent">Blueprint</span>
                </h2>

                <p className="mb-6 max-w-xl text-base leading-7 text-white/75 md:text-lg md:leading-8">
                  Explore a Vedic astrology reading based on planetary positions, Lahiri ayanamsa, and whole-sign houses. For guidance and entertainment only.
                </p>

                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    onClick={() => document.getElementById('user-data-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#f4c542] via-[#f7d15b] to-[#ffd970] px-5 py-3.5 text-sm font-bold text-mystic-950 shadow-[0_10px_28px_rgba(244,197,66,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(244,197,66,0.3)] active:translate-y-0 md:py-4"
                  >
                    Generate My Personalized Report
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mb-7 flex flex-wrap gap-2.5">
                  {['Birth Chart', 'Career Forecast', 'Marriage Timing', 'Lucky Remedies'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm md:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-7 grid gap-3 sm:grid-cols-2">
                  {statCards.map(({ value, label, icon: Icon }) => (
                    <div
                      key={label}
                      className="group rounded-2xl border border-[#f4c542]/15 bg-white/[0.03] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#f4c542]/30 hover:bg-white/[0.04]"
                    >
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#f4c542]/30 bg-[#f4c542]/10 text-[#f4c542]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="text-2xl font-bold text-[#f8d66f]">{value}</div>
                      <div className="text-sm text-white/70">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-white/75">
                  {heroBenefits.map((item) => (
                    <div key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
                      <CheckCircle2 className="h-4 w-4 text-[#f4c542]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="relative z-10 lg:pt-2">
                <UserDataForm onSubmit={setUserData} />
              </motion.div>
            </div>

            <section className="mt-12 md:mt-20">
              <div className="mb-6 text-center md:mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Sample report preview</p>
                <h3 className="mt-3 text-2xl font-serif font-bold text-white md:text-3xl">What your personalized reading includes</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ['Career & Wealth', 'Understand your strengths, timing windows, and financial rhythm.'],
                  ['Love & Marriage', 'Reveal relationship patterns, compatibility signals, and emotional timing.'],
                  ['Health & Remedies', 'See stress triggers, strengths, and practical guidance for daily balance.'],
                ].map(([title, text]) => (
                  <div key={title} className="glass rounded-2xl p-5 md:p-6">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/15 text-[#F4C542]">
                      <Star className="h-4 w-4" />
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-white">{title}</h4>
                    <p className="text-sm leading-6 text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 md:mt-20">
              <div className="mb-6 text-center md:mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">How it works</p>
                <h3 className="mt-3 text-2xl font-serif font-bold text-white md:text-3xl">Clear guidance in three simple steps</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {howItWorks.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="glass rounded-2xl p-5 md:p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/15 text-[#F4C542]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mb-2 text-lg font-semibold text-white">{title}</h4>
                    <p className="text-sm leading-6 text-slate-300">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 md:mt-20">
              <div className="mb-6 text-center md:mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Common themes</p>
                <h3 className="mt-3 text-2xl font-serif font-bold text-white md:text-3xl">People often explore</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {commonThemes.map((theme) => (
                  <div key={theme} className="glass rounded-2xl p-5 md:p-6">
                    <Quote className="mb-3 h-5 w-5 text-[#F4C542]" />
                    <p className="text-sm leading-6 text-slate-300">{theme}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 md:mt-20">
              <div className="mb-6 text-center md:mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Data handling</p>
                <h3 className="mt-3 text-2xl font-serif font-bold text-white md:text-3xl">What happens in your browser</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="glass rounded-2xl p-5 md:p-6">
                  <Monitor className="mb-3 h-5 w-5 text-[#F4C542]" />
                  <h4 className="mb-2 text-lg font-semibold text-white">Browser-based calculations</h4>
                  <p className="text-sm leading-6 text-slate-300">Birth details are processed in your browser to produce the chart and reading.</p>
                </div>
                <div className="glass rounded-2xl p-5 md:p-6">
                  <MapPin className="mb-3 h-5 w-5 text-[#F4C542]" />
                  <h4 className="mb-2 text-lg font-semibold text-white">Birth-place search</h4>
                  <p className="text-sm leading-6 text-slate-300">Only the place name you enter is sent to Open-Meteo for location lookup.</p>
                </div>
                <div className="glass rounded-2xl p-5 md:p-6">
                  <Calculator className="mb-3 h-5 w-5 text-[#F4C542]" />
                  <h4 className="mb-2 text-lg font-semibold text-white">Chart conventions</h4>
                  <p className="text-sm leading-6 text-slate-300">Chart calculations use Lahiri ayanamsa and whole-sign houses.</p>
                </div>
              </div>
            </section>

            <section className="mt-12 md:mt-20">
              <div className="glass rounded-2xl p-5 md:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">Important disclosure</p>
                <h3 className="mt-3 text-2xl font-serif font-bold text-white md:text-3xl">Astrology as reflection, not certainty</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base">
                  For guidance and entertainment only. Not medical, legal, financial or professional advice.
                </p>
              </div>
            </section>

            <section className="mt-12 md:mt-20">
              <div className="mb-6 text-center md:mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">FAQ</p>
                <h3 className="mt-3 text-2xl font-serif font-bold text-white md:text-3xl">Questions before you begin</h3>
              </div>

              <div className="mx-auto max-w-3xl space-y-3">
                {faqs.map(({ q, a }) => (
                  <details key={q} className="glass rounded-2xl p-4 md:p-5" open={q === 'How are charts calculated?'}>
                    <summary className="cursor-pointer list-none text-left text-base font-semibold text-white md:text-lg">{q}</summary>
                    <p className="mt-3 text-sm leading-6 text-slate-300 md:text-base">{a}</p>
                  </details>
                ))}
              </div>
            </section>

            <motion.div
              className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-mystic-950/90 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(15,23,42,0.7)] backdrop-blur-xl md:hidden"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                onClick={() => document.getElementById('user-data-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 px-4 py-3 text-sm font-bold text-mystic-950 shadow-[0_12px_30px_rgba(250,204,21,0.32)]"
              >
                <span>Get My Personalized Report</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute bottom-20 left-10 hidden h-20 w-20 rounded-full border border-gold-400/20 md:block"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute right-10 top-40 hidden h-32 w-32 rounded-full border border-rose-400/20 md:block"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        ) : (
          <motion.div
            className="min-h-screen pb-20 sm:pb-32"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Report Hero */}
            <motion.div
              className="bg-gradient-to-br from-mystic-900 via-mystic-800 to-mystic-900 text-white py-16 sm:py-24 px-4 relative overflow-hidden"
              variants={itemVariants}
            >
              {/* Hero Background Elements */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 50%, rgba(234, 179, 8, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
                  backgroundSize: '200% 200%',
                }}
              />

              <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-gold-300 text-sm font-medium mb-6 sm:mb-8 glass"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
                    <Star className="w-4 h-4" />
                  </motion.div>
                  Comprehensive Life Analysis
                </motion.div>
                
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-4 sm:mb-6">
                  The Book of <span className="gradient-text">Divine Purpose</span>
                </h1>
                
                <motion.p
                  className="text-base sm:text-lg md:text-xl text-mystic-200 max-w-2xl mx-auto leading-relaxed"
                  variants={itemVariants}
                >
                  Your personalized cosmic blueprint for <span className="font-semibold text-white">{userData.name ? capitalizeName(userData.name) : 'your chart'}</span>, mapped from {userData.birthPlace || 'your birth place'} on {userData.dob ? formatReportDate(userData.dob) : 'your date of birth'} at {userData.birthTime || 'an approximate time'}.
                </motion.p>
              </div>
            </motion.div>

            {/* Report Content */}
            <motion.div
              className="report-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <BirthChartOverview user={userData} chart={chartSummary || undefined} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <KundliSection chart={chartSummary!} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <PersonalityAnalysis chart={chartSummary!} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <CareerFinance chart={chartSummary!} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <LoveMarriageHealth chart={chartSummary!} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FuturePredictions chart={chartSummary!} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <SuccessLuckyRemedies chart={chartSummary!} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <ActionPlan chart={chartSummary!} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <NumerologyAnalysis user={userData} />
              </motion.div>

              <footer className="border-t border-white/10 pt-6 text-center text-sm text-slate-300">
                For guidance and entertainment only. Not medical, legal, financial or professional advice.
              </footer>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;