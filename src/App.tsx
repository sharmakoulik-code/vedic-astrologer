import { useState } from 'react';
import { UserDetails } from './types';
import { UserDataForm } from './components/UserDataForm';
import { BirthChartOverview } from './components/sections/BirthChartOverview';
import { PersonalityAnalysis } from './components/sections/PersonalityAnalysis';
import { CareerFinance } from './components/sections/CareerFinance';
import { LoveMarriageHealth } from './components/sections/LoveMarriageHealth';
import { FuturePredictions } from './components/sections/FuturePredictions';
import { SuccessLuckyRemedies } from './components/sections/SuccessLuckyRemedies';
import { ActionPlan } from './components/sections/ActionPlan';
import { Moon, Sparkles, ChevronLeft, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMetaTags } from './hooks/useMetaTags';
import { generateMetaTags } from './config/seo';

function App() {
  const [userData, setUserData] = useState<UserDetails | null>(null);

  // Update meta tags based on current page state
  useMetaTags(generateMetaTags(userData ? 'report' : 'home', userData));

  const handleReset = () => setUserData(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-mystic-950 via-mystic-900 to-mystic-950 font-sans selection:bg-gold-500/30 text-gray-800 relative overflow-x-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-mystic-500/15 rounded-full blur-[120px]"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gold-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 40, -40, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-rose-400/5 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-mystic-950/40 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold-200/80 bg-[radial-gradient(circle_at_35%_30%,rgba(255,240,180,0.95),rgba(234,179,8,0.58)_18%,rgba(15,23,42,0.86)_62%)] shadow-[0_0_26px_rgba(250,204,21,0.28)]"
            >
              <span className="absolute inset-1 rounded-full border border-gold-100/70" />
              <Moon className="relative z-10 h-6 w-6 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              <Star className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full fill-yellow-200 text-yellow-200 drop-shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
            </motion.div>
            <div className="leading-none">
              <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-200/90">Vedic</div>
              <motion.h1 className="mt-0.5 text-lg sm:text-xl font-serif font-bold tracking-[0.08em] text-white group-hover:text-gold-200 transition-colors">
                <span className="bg-gradient-to-r from-yellow-200 via-gold-300 to-rose-200 bg-clip-text text-transparent">ASTROLOGER</span>
              </motion.h1>
            </div>
          </motion.div>
          
          {userData && (
            <motion.button
              onClick={handleReset}
              className="flex items-center gap-2 text-indigo-200 hover:text-white transition-colors text-sm font-medium button-glass"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4" /> Start New Report
            </motion.button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full">
        {!userData ? (
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 min-h-[calc(100vh-80px)]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
              <motion.div className="relative z-10" variants={itemVariants}>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-500/10 text-gold-200 text-sm font-medium mb-6 backdrop-blur-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Ancient wisdom • Personalized guidance
                </motion.div>

                <h2 className="max-w-xl text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-[0.95] mb-5">
                  Your Cosmic <span className="gradient-text">Blueprint</span>
                </h2>

                <p className="max-w-xl text-base sm:text-lg text-white/75 leading-relaxed mb-7">
                  Discover your destiny through Vedic astrology with a deeply personalized report covering life path, love, career, health, timing, and remedies.
                </p>

                <div className="flex flex-wrap gap-2.5 mb-8">
                  {['Birth Chart', 'Career Forecast', 'Marriage Timing', 'Lucky Remedies'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/80 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-3 max-w-xl">
                  <div className="glass rounded-2xl p-4">
                    <div className="text-2xl font-bold text-gold-300">12</div>
                    <div className="text-sm text-white/70">Life houses</div>
                  </div>
                  <div className="glass rounded-2xl p-4">
                    <div className="text-2xl font-bold text-gold-300">7</div>
                    <div className="text-sm text-white/70">Major life areas</div>
                  </div>
                  <div className="glass rounded-2xl p-4">
                    <div className="text-2xl font-bold text-gold-300">1:1</div>
                    <div className="text-sm text-white/70">Personal reading</div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="relative z-10">
                <UserDataForm onSubmit={setUserData} />
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              className="absolute bottom-20 left-10 w-20 h-20 border border-gold-400/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute top-40 right-10 w-32 h-32 border border-rose-400/20 rounded-full"
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
                  Your personalized cosmic blueprint for <span className="font-semibold text-white">{userData.name}</span>, mapped from {userData.birthPlace} on {new Date(userData.dob).toLocaleDateString()} at {userData.birthTime}.
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
                <BirthChartOverview user={userData} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <PersonalityAnalysis user={userData} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <CareerFinance user={userData} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <LoveMarriageHealth user={userData} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <FuturePredictions user={userData} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <SuccessLuckyRemedies user={userData} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <ActionPlan user={userData} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;