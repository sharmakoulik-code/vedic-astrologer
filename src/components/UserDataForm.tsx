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
      className="w-full max-w-xl mx-auto px-4 sm:px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="glass-lg rounded-3xl p-6 sm:p-10 relative overflow-hidden group"
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
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-2 sm:mb-3">
              Unlock Your <span className="gradient-text">Cosmic Destiny</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Enter your precise birth details to generate your comprehensive Vedic astrology reading.
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">
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
                  className="input-glass pl-10 pr-4"
                  placeholder="e.g. Elena Rossi"
                />
              </div>
            </motion.div>

            {/* Date & Time */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" variants={itemVariants}>
              {/* Date of Birth */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">
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
                    className="input-glass pl-10 pr-4"
                  />
                </div>
              </div>

              {/* Time of Birth */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">
                  Time of Birth
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
                    required
                    value={formData.birthTime}
                    onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                    onFocus={() => setFocused('time')}
                    onBlur={() => setFocused(null)}
                    className="input-glass pl-10 pr-4"
                  />
                </div>
              </div>
            </motion.div>

            {/* Place of Birth */}
            <motion.div variants={itemVariants}>
              <label className="block text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">
                Place of Birth
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
                  required
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                  onFocus={() => setFocused('place')}
                  onBlur={() => setFocused(null)}
                  className="input-glass pl-10 pr-4"
                  placeholder="e.g. New York, USA"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-3 sm:py-4 px-4 mt-6 sm:mt-8 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:via-gold-400 hover:to-gold-500 text-mystic-950 font-bold font-semibold rounded-xl shadow-glow hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(234, 179, 8, 0.4)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Generate My Personalized Report</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.button>
          </form>

          {/* Footer Text */}
          <motion.p
            className="text-center text-xs text-white/50 mt-6 sm:mt-8"
            variants={itemVariants}
          >
            Your data is processed securely and used only to generate your personalized report.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};