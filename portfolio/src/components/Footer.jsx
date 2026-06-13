import React from 'react';
import { motion } from 'framer-motion';

const Footer = ({ theme }) => {
  return (
    <footer className="relative border-t border-slate-200 dark:border-white/5 py-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <div className="font-display text-2xl font-black gradient-text tracking-widest mb-1">
              PRAKHAR<span className="text-slate-400 dark:text-white/20">.</span>DEV
            </div>
            <div className="font-mono text-xs text-slate-600 dark:text-slate-350 tracking-widest">
              Data Scientist & Analyst 
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-6">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-mono text-xs text-slate-605 dark:text-white/50 hover:text-cyan-400 transition-colors tracking-widest uppercase"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="font-mono text-xs text-slate-600 dark:text-slate-350 tracking-wide text-center md:text-right">
            <div>© 2026 Prakhar Agrawal</div>
            <div className="mt-1 text-slate-550 dark:text-slate-350">Built with ❤️ by Prakhar Agrawal</div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/5 flex justify-center">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="font-mono text-xs text-slate-500 dark:text-white/20 tracking-widest flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
            All systems operational
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
