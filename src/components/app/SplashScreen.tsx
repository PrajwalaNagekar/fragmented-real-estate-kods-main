import { motion } from "framer-motion";

const SplashScreen = () => (
  <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
    {/* Solid navy gradient background */}
    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, #FFF 0%, #FFF 50%, #FFF 100%)" }} />

    {/* Subtle blue glow behind logo */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(30, 58, 138, 0.3) 0%, transparent 70%)" }} />

    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 flex flex-col items-center"
    >
      <div className="w-20 h-20 rounded-2xl gradient-gold flex items-center justify-center mb-6">
        <span className="text-3xl font-display font-bold text-[#FFF]">O</span>
      </div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-2xl font-display font-bold text-[#0A1A3B] tracking-wide"
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
        className="mt-4 text-xs text-[#0A1A3B]/80 tracking-[0.2em] uppercase"
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
          className="w-1.5 h-1.5 rounded-full bg-blue-500"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </motion.div>
  </div>
);

export default SplashScreen;
