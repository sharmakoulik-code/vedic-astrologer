import { useState } from 'react';
import { Sparkles, MapPin, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { UserDetails } from '../types';
import { motion } from 'framer-motion';

interface UserDataFormProps {
  onSubmit: (data: UserDetails) => void;
}

export const UserDataForm: React.FC<UserDataFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserDetails>({
    name: '',
    dob: '',
    birthTime: '',
    birthPlace: '',
  });

  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      id="user-data-form"
      className="mx-auto w-full max-w-xl px-0 sm:px-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="glass-lg relative overflow-hidden rounded-3xl p-5 sm:p-8 md:p-10 group"
        whileHover={{ boxShadow: '0 0 40px rgba(234, 179, 8, 0.15)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-rose-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        <motion.div className="relative z-10">
          {/* Header */}
          <motion.div className="text-center mb-8 sm:mb-10" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-gold-500/20 to-rose-400/20 rounded-full mb-4 backdrop-blur-sm border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-gold-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
            </motion.div>
            <h2 className="mb-2 text-2xl font-serif font-bold text-white sm:text-3xl md:text-4xl">
              Unlock Your <span className="gradient-text">Cosmic Destiny</span>
            </h2>
            <p className="text-sm leading-6 text-white/70 sm:text-base md:text-lg">
              Enter your birth details to receive a trusted, personalized Vedic astrology reading.
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6" noValidate>
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xs">
                Full Name
              </label>
              <div className="relative group">
                <motion.div
                  className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
                  animate={{ color: focused === 'name' ? '#facc15' : 'rgba(255,255,255,0.3)' }}
                >
                  <User className="w-5 h-5" />
                </motion.div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  className="input-glass min-h-[52px] pl-11 pr-4 text-base"
                  placeholder="e.g. Elena Rossi"
                  aria-label="Full name"
                />
              </div>
            </motion.div>

            {/* Date & Time */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" variants={itemVariants}>
              {/* Date of Birth */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xs">
                  Date of Birth
                </label>
                <div className="relative">
                  <motion.div
                    className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
                    animate={{ color: focused === 'dob' ? '#facc15' : 'rgba(255,255,255,0.3)' }}
                  >
                    <Calendar className="w-5 h-5" />
                  </motion.div>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    onFocus={() => setFocused('dob')}
                    onBlur={() => setFocused(null)}
                    className="input-glass min-h-[52px] pl-11 pr-4 text-base"
                    aria-label="Date of birth"
                  />
                </div>
              </div>

              {/* Time of Birth */}
              <div>
                <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xs">
                  Time of Birth <span className="font-medium normal-case text-white/60">(optional)</span>
                </label>
                <div className="relative">
                  <motion.div
                    className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
                    animate={{ color: focused === 'time' ? '#facc15' : 'rgba(255,255,255,0.3)' }}
                  >
                    <Clock className="w-5 h-5" />
                  </motion.div>
                  <input
                    type="time"
                    value={formData.birthTime}
                    onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                    onFocus={() => setFocused('time')}
                    onBlur={() => setFocused(null)}
                    className="input-glass min-h-[52px] pl-11 pr-4 text-base"
                    aria-label="Time of birth"
                  />
                </div>
              </div>
            </motion.div>

            {/* Place of Birth */}
            <motion.div variants={itemVariants}>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:text-xs">
                Place of Birth <span className="font-medium normal-case text-white/60">(optional)</span>
              </label>
              <div className="relative">
                <motion.div
                  className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
                  animate={{ color: focused === 'place' ? '#facc15' : 'rgba(255,255,255,0.3)' }}
                >
                  <MapPin className="w-5 h-5" />
                </motion.div>
                <input
                  type="text"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                  onFocus={() => setFocused('place')}
                  onBlur={() => setFocused(null)}
                  className="input-glass min-h-[52px] pl-11 pr-4 text-base"
                  placeholder="e.g. New York, USA"
                  aria-label="Place of birth"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="group relative mt-6 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl border border-gold-300/80 bg-[linear-gradient(135deg,#fef3c7_0%,#facc15_25%,#f9a8d4_100%)] px-5 py-3.5 text-base font-semibold text-mystic-950 shadow-[0_18px_40px_rgba(250,204,21,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_50px_rgba(250,204,21,0.48)] active:translate-y-0 sm:py-4"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.75),_transparent_52%)]" />
              <span className="relative flex items-center justify-center gap-3">
                <span>Generate My Personalized Report</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center justify-center"
                >
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.div>
              </span>
            </motion.button>
          </form>

          {/* Footer Text */}
          <motion.div className="mt-6 grid gap-2 sm:grid-cols-3" variants={itemVariants}>
            {[
              '✓ Private & Secure',
              '✓ Personalized Insights',
              '✓ Generated in Seconds',
            ].map((badge) => (
              <div
                key={badge}
                className="rounded-xl border border-[#f4c542]/15 bg-[#f4c542]/5 px-2 py-2 text-center text-[10px] font-medium text-[#f5d57a] sm:text-[11px]"
              >
                {badge}
              </div>
            ))}
          </motion.div>

          <motion.p
            className="mt-6 text-center text-xs text-white/50 sm:mt-8"
            variants={itemVariants}
          >
            Your data is processed securely and used only to generate your personalized report.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};