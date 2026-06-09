import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoHomeOutline,
  IoPersonOutline,
  IoCodeSlashOutline,
  IoLayersOutline,
  IoSchoolOutline,
  IoTrophyOutline,
  IoMailOutline
} from 'react-icons/io5';

const navLinks = [
  { label: 'Home', href: '#hero', icon: <IoHomeOutline />, gradientFrom: '#6366f1', gradientTo: '#a855f7' },
  { label: 'About', href: '#about', icon: <IoPersonOutline />, gradientFrom: '#06b6d4', gradientTo: '#3b82f6' },
  { label: 'Skills', href: '#skills', icon: <IoCodeSlashOutline />, gradientFrom: '#10b981', gradientTo: '#14b8a6' },
  { label: 'Projects', href: '#projects', icon: <IoLayersOutline />, gradientFrom: '#f97316', gradientTo: '#ef4444' },
  { label: 'Education', href: '#education', icon: <IoSchoolOutline />, gradientFrom: '#f59e0b', gradientTo: '#eab308' },
  { label: 'Achievements', href: '#achievements', icon: <IoTrophyOutline />, gradientFrom: '#ec4899', gradientTo: '#f43f5e' },
  { label: 'Contact', href: '#contact', icon: <IoMailOutline />, gradientFrom: '#8b5cf6', gradientTo: '#d946ef' },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const renderThemeToggle = () => (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full glass border border-slate-200/50 dark:border-white/10 hover:border-cyan-400 dark:hover:border-cyan-400 text-slate-800 dark:text-white transition-all duration-300 w-10 h-10 flex items-center justify-center shadow-sm dark:shadow-none"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 180,
          scale: theme === 'dark' ? 0 : 1,
          opacity: theme === 'dark' ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-yellow-500">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : -180,
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-cyan-400">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      </motion.div>
    </motion.button>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-slate-200/50 dark:border-white/10 py-2' : 'py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
          className="font-display text-2xl font-black tracking-widest gradient-text shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          PA<span className="text-cyan-400/40">_</span>
        </motion.a>

        {/* Desktop Gradient Menu */}
        <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
          <ul className="flex gap-4">
            {navLinks.map(({ label, href, icon, gradientFrom, gradientTo }) => {
              const isActive = active === href.slice(1);
              return (
                <li
                  key={href}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                  style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo }}
                  className={`relative h-[42px] rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer group shadow-lg ${isActive ? 'w-[140px] shadow-none' : 'w-[42px] bg-slate-100 hover:bg-slate-200 dark:bg-white/5 hover:w-[140px] hover:shadow-none'
                    }`}
                >
                  {/* Gradient background */}
                  <span className={`absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}></span>

                  {/* Blur glow */}
                  <span className={`absolute top-[5px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[12px] -z-10 transition-all duration-500 ${isActive ? 'opacity-60' : 'opacity-0 group-hover:opacity-60'
                    }`}></span>

                  {/* Icon */}
                  <span className={`relative z-10 transition-all duration-500 ${isActive ? 'scale-0 translate-x-[-20px]' : 'scale-100 group-hover:scale-0 group-hover:translate-x-[-20px]'
                    }`}>
                    <span className="text-xl text-slate-600 dark:text-white/80">{icon}</span>
                  </span>

                  {/* Title */}
                  <span className={`absolute text-white uppercase font-bold tracking-wider text-[10px] transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                    }`}>
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTA button & Theme Toggle */}
        <div className="shrink-0 hidden lg:flex items-center gap-4">
          {renderThemeToggle()}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            className="btn-primary text-xs py-2 px-6 rounded-full font-bold uppercase tracking-widest"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile menu controls */}
        <div className="lg:hidden flex items-center gap-4">
          {renderThemeToggle()}

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`block w-6 h-px bg-slate-800 dark:bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-slate-800 dark:bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-slate-800 dark:bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-slate-200/50 dark:border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-wrap justify-center gap-4">
              {navLinks.map(({ label, href, icon, gradientFrom, gradientTo }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                  style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:border-transparent transition-all relative">
                    <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="relative z-10 text-xl text-slate-600 dark:text-white/60 group-hover:text-white transition-colors">{icon}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-white/40 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>

  );
};

export default Navbar;
