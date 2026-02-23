import { motion } from "framer-motion";

const SplashScreen = () => (
  <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
    {/* Luxury real estate background */}
    <div className="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=1200&fit=crop"
        alt="Luxury property"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <motion.div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, hsl(28, 40%, 64%, 0.15) 0%, transparent 50%, hsl(174, 60%, 35%, 0.1) 100%)" }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>

    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 flex flex-col items-center"
    >
      <div className="w-20 h-20 rounded-2xl gradient-gold flex items-center justify-center mb-6 glow-gold">
        <span className="text-3xl font-display font-bold text-white">O</span>
      </div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-2xl font-display font-bold text-white tracking-wide"
      >
        One Property
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-3 h-[1px] w-32 shimmer rounded-full"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-4 text-xs text-white/70 tracking-[0.2em] uppercase"
      >
        Luxury Fractional Ownership
      </motion.p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
      className="absolute bottom-20 flex gap-1 z-10"
    >
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </motion.div>
  </div>
);

export default SplashScreen;
