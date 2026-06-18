import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from './ui/card';
import HolographicOrb from './ui/HolographicOrb';
import VaporizeTextCycle, { Tag } from './ui/vapour-text';

const Hero = ({ theme }) => {
  const [isLargeScreen, setIsLargeScreen] = React.useState(false);
  const [titleFontSize, setTitleFontSize] = React.useState('80px');
  const [titleHeight, setTitleHeight] = React.useState('90px');
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      const width = window.innerWidth;
      if (width < 380) {
        setTitleFontSize('38px');
        setTitleHeight('48px');
      } else if (width < 480) {
        setTitleFontSize('46px');
        setTitleHeight('56px');
      } else if (width < 640) {
        setTitleFontSize('56px');
        setTitleHeight('66px');
      } else if (width < 1024) {
        setTitleFontSize('68px');
        setTitleHeight('78px');
      } else {
        setTitleFontSize('80px');
        setTitleHeight('90px');
      }
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none transition-all duration-500"
        style={{ background: theme === 'dark' ? 'linear-gradient(to top, #030712, transparent)' : 'linear-gradient(to top, #f8fafc, transparent)' }}
      />

      {/* Main two-column layout */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-20 pb-8">
        <Card className="w-full bg-white/70 dark:bg-black/80 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row min-h-[600px]">

              {/* LEFT: Text Content */}
              <div className="flex-1 flex flex-col justify-center px-8 py-12 lg:px-12 lg:py-16">

                {/* Availability badge */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="inline-flex items-center gap-2 mb-8 w-fit"
                >
                </motion.div>

                {/* Name — Vapour text effect */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                  className="mb-5"
                >
                  {/* PRAKHAR — white/light */}
                  <div style={{ height: titleHeight, width: '100%' }}>
                    <VaporizeTextCycle
                      texts={["PRAKHAR"]}
                      font={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: titleFontSize,
                        fontWeight: 900,
                      }}
                      color={theme === 'dark' ? "rgb(230, 230, 230)" : "rgb(15, 23, 42)"}
                      spread={4}
                      density={7}
                      animation={{ vaporizeDuration: 2.5, fadeInDuration: 1.2, waitDuration: 1.5 }}
                      direction="left-to-right"
                      alignment="left"
                      tag={Tag.H1}
                    />
                  </div>
                  {/* AGRAWAL — cyan */}
                  <div style={{ height: titleHeight, width: '100%' }}>
                    <VaporizeTextCycle
                      texts={["AGRAWAL"]}
                      font={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: titleFontSize,
                        fontWeight: 900,
                      }}
                      color="rgb(0, 245, 255)"
                      spread={4}
                      density={7}
                      animation={{ vaporizeDuration: 2.5, fadeInDuration: 1.2, waitDuration: 1.5 }}
                      direction="left-to-right"
                      alignment="left"
                      tag={Tag.H2}
                    />
                  </div>
                </motion.div>

                {/* Animated role */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45 }}
                  className="flex items-center gap-2 mb-5"
                >
                  <span className="text-cyan-400 font-mono text-lg">{'>'}</span>
                  <TypeAnimation
                    sequence={[
                      'Aspiring Data Scientist',
                      2000,
                      'Web Developer',
                      2000,
                      'BCA 2nd Year Student',
                      2000,
                      'Problem Solver',
                      2000,
                      'Open Source Contributor',
                      2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    className="font-mono text-base md:text-lg text-slate-700 dark:text-white/70"
                  />
                  <span className="w-0.5 h-5 bg-cyan-400 animate-pulse inline-block" />
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="text-slate-600 dark:text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-lg"
                >
                  Transforming data into insights and ideas into digital experiences.
                  Building the future one algorithm and component at a time.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.75 }}
                  className="flex flex-wrap gap-4 mb-12"
                >
                  <button
                    onClick={() => scrollTo('#projects')}
                    className="btn-primary"
                    data-hover
                  >
                    View Projects
                  </button>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary inline-flex items-center gap-2"
                    data-hover
                  >
                    Download Resume
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
       
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="flex gap-8 pt-8 border-t border-slate-200 dark:border-white/5"
                >
                  {[
                    { value: '9.5', label: 'CGPA' },
                    { value: '3+', label: 'Projects' },
                    { value: '3+', label: 'Hackathons' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-black text-cyan-400" style={{
                        textShadow: '0 0 10px rgba(0,245,255,0.8), 0 0 30px rgba(0,245,255,0.4)'
                      }}>
                        {stat.value}
                      </div>
                      <div className="font-mono text-xs text-slate-500 dark:text-white/30 tracking-widest mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT: Interactive Particle Network */}
              <div className="relative flex-1 min-h-[300px] lg:min-h-[600px] overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-200/50 dark:border-white/5 bg-slate-50/10 dark:bg-black/15">
                {/* Subtle glow behind network */}
                <div
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 50%, rgba(0,245,255,0.05) 0%, transparent 70%)',
                  }}
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <HolographicOrb theme={theme} />
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-mono text-xs text-slate-500 dark:text-white/20 tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-cyan-400/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
