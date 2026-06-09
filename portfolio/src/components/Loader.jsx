import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEM...');

  const statuses = [
    'INITIALIZING SYSTEM...',
    'LOADING NEURAL NETWORKS...',
    'CALIBRATING DATA STREAMS...',
    'RENDERING INTERFACE...',
    'SYSTEM READY',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15 + 5;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        const statusIndex = Math.floor((next / 100) * (statuses.length - 1));
        setStatusText(statuses[statusIndex]);
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-900"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #00f5ff, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #bf00ff, transparent)' }} />

      <div className="relative z-10 text-center px-8 w-full max-w-md">
        {/* Logo/Name */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="font-display text-5xl font-black tracking-widest gradient-text mb-2">PRAKHAR</div>
          <div className="font-mono text-xs tracking-[0.4em] text-cyan-400 opacity-60">PORTFOLIO SYSTEM v2.0</div>
        </motion.div>

        {/* Animated ring */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border border-purple-500/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-cyan-400/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            style={{ borderTopColor: '#00f5ff', borderRightColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-xl font-bold text-cyan-400">{Math.round(progress)}%</span>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="relative h-px bg-white/5 mb-6 overflow-hidden rounded">
          <motion.div
            className="absolute inset-y-0 left-0 skill-bar-fill"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
          <div className="loader-bar absolute inset-0" />
        </div>

        {/* Status text */}
        <motion.div
          key={statusText}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs text-cyan-400/60 tracking-widest"
        >
          {statusText}
        </motion.div>

        {/* Decorative dots */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-cyan-400"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
