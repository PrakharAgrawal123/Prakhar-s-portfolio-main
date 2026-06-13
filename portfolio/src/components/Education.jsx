import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from './ui/card';

const educationData = [
  {
    id: 1,
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'United University, Prayagraj, UP',
    duration: '2024 – 2027',
    description: 'Pursuing core computer application concepts, specializing in advanced algorithms, database systems, and software engineering. Maintaining an outstanding academic record with a cumulative CGPA of 9.5 out of 10 while actively building open-source projects and participating in hackathons.',
    details: [
      'Focus Areas: Machine Learning, Web Technologies, DBMS & Data Structures',
      'Academic Record: CGPA 9.5 / 10',
      'Extracurriculars: Campus Ambassador & Hackathon Innovator'
    ],
    icon: '🎓',
    color: '#00f5ff',
    badge: 'United University'
  },
  {
    id: 2,
    degree: 'Intermediate Education (12th Standard)',
    institution: 'G.B.I.C School UP, India',
    duration: '2024',
    description: 'Completed board curriculum with focus on Physics, Chemistry, and Mathematics (PCM). Honored with an Academic Gold Medal for exceptional district-level performance, presented and recognized by the District Magistrate.',
    details: [
      'Focus Areas: Physics, Chemistry, Mathematics (PCM)',
      'Distinction: Academic Gold Medalist',
      'Recognition: Honored by the District Magistrate for Board Excellence'
    ],
    icon: '🏅',
    color: '#bf00ff',
    badge: 'Gold Medalist'
  },
  {
    id: 3,
    degree: 'High School Education (10th Standard)',
    institution: 'G.B.I.C School, UP, India',
    duration: '2022',
    description: 'Laid the strong foundational baseline of science and logical mathematics with exceptional academic marks and consistent dedication.',
    details: [
      'Focus Areas: General Sciences, Advanced Mathematics, Computer Basics',
      'Baseline: Discovered early passion for programming logic and algorithm building',
      'Result: Completed with top-tier board scores'
    ],
    icon: '📚',
    color: '#00ff88',
    badge: 'Stellar Scorer'
  }
];

const TimelineCard = ({ item, index, isMobile, theme }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center w-full mb-16 last:mb-0 ${
        isMobile ? 'justify-start pl-10 sm:pl-16' : isLeft ? 'md:justify-start' : 'md:justify-end'
      }`}
    >
      {/* Central dot timeline node */}
      <div 
        className={`absolute top-2 w-6 h-6 rounded-full flex items-center justify-center border-4 border-slate-50 dark:border-dark-900 transition-all duration-500 z-20 ${
          isMobile 
            ? 'left-0' 
            : 'left-1/2 -translate-x-1/2'
        }`}
        style={{
          backgroundColor: item.color,
          boxShadow: inView 
            ? `0 0 15px ${item.color}, 0 0 30px ${item.color}` 
            : `0 0 5px ${item.color}`
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1.5 h-1.5 bg-white rounded-full"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: isMobile ? 10 : isLeft ? -30 : 30, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.8, type: 'spring', stiffness: 60 }}
        className={`w-full md:w-[45%] overflow-visible ${
          isMobile ? 'text-left' : isLeft ? 'md:text-right' : 'md:text-left'
        }`}
      >
        <div
          className="glass-strong neon-border-cyan rounded-lg p-6 sm:p-8 relative overflow-hidden transition-all duration-500 hover:shadow-2xl group cursor-default"
          style={{
            borderColor: `${item.color}25`,
            boxShadow: `0 4px 30px rgba(0, 245, 255, 0.02)`
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${item.color}50`;
            e.currentTarget.style.boxShadow = `0 15px 35px -10px ${item.color}20, inset 0 0 10px ${item.color}05`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = `${item.color}25`;
            e.currentTarget.style.boxShadow = `0 4px 30px rgba(0, 245, 255, 0.02)`;
          }}
        >
          {/* Cyber aesthetic corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 opacity-30 transition-all duration-300 group-hover:opacity-100" style={{ borderColor: item.color }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 opacity-30 transition-all duration-300 group-hover:opacity-100" style={{ borderColor: item.color }} />

          {/* Heading block */}
          <div className={`flex items-start gap-4 mb-4 ${
            isMobile ? 'flex-row' : isLeft ? 'md:flex-row-reverse' : 'flex-row'
          }`}>
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 cursor-default shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${item.color}20, ${item.color}05)`,
                border: `1px solid ${item.color}30`,
              }}
            >
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className={`flex items-center gap-2 flex-wrap mb-1 ${
                isMobile ? 'justify-start' : isLeft ? 'md:justify-end' : 'justify-start'
              }`}>
                <span 
                  className="font-mono text-[9px] tracking-widest px-2.5 py-0.5 rounded-full uppercase font-bold border"
                  style={{
                    background: `${item.color}15`,
                    color: item.color,
                    borderColor: `${item.color}30`
                  }}
                >
                  {item.badge}
                </span>
                <span className="font-mono text-xs text-slate-500 dark:text-white/40 font-bold">{item.duration}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-800 dark:text-white leading-tight group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                {item.degree}
              </h3>
              <div className="font-mono text-xs text-cyan-400 font-semibold mt-1">
                {item.institution}
              </div>
            </div>
          </div>

          <p className="font-body text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-6">
            {item.description}
          </p>

          {/* Feature detail list items */}
          <ul className={`space-y-2.5 border-t border-slate-200/50 dark:border-white/5 pt-4 ${
            isMobile ? 'text-left' : isLeft ? 'md:text-right' : 'md:text-left'
          }`}>
            {item.details.map((detail, index) => (
              <li 
                key={index} 
                className={`font-mono text-xs text-slate-600 dark:text-slate-350 flex items-center gap-2 ${
                  isMobile ? 'justify-start' : isLeft ? 'md:justify-end md:flex-row-reverse' : 'justify-start'
                }`}
              >
                <span className="font-bold shrink-0" style={{ color: item.color }}>▸</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

const Education = ({ theme }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
    <section id="education" className="relative py-32 overflow-hidden bg-transparent">
      {/* Dynamic Animated Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 40, -30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 -right-10 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #00f5ff, transparent 70%)',
            willChange: 'transform'
          }}
        />
        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -40, 50, 0],
            scale: [1, 0.95, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 -left-10 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[90px]"
          style={{
            background: 'radial-gradient(circle, #bf00ff, transparent 70%)',
            willChange: 'transform'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24 relative flex flex-col items-center text-center"
        >
          {/* Header glowing background backing */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 bg-purple-500/10 blur-[50px] rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase font-bold text-cyan-400/80">Academic Pathways</span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          <h2 className="section-title text-slate-800 dark:text-white font-extrabold tracking-wide text-3xl md:text-5xl">
            Education & <span className="gradient-text">Journey</span>
          </h2>
          
          <p className="font-mono text-xs text-slate-650 dark:text-slate-300 mt-4 max-w-lg leading-relaxed">
            A comprehensive look at my formal education landmarks, specialized disciplines, and district accomplishments.
          </p>
        </motion.div>

        {/* Timeline body wrapper */}
        <div className="relative mt-16 max-w-5xl mx-auto overflow-visible">
          {/* Central vertical timeline track line */}
          <div 
            className={`absolute top-2 bottom-6 w-[2px] transition-all duration-500 ${
              isMobile ? 'left-[11px]' : 'left-1/2 -translate-x-1/2'
            }`}
            style={{
              background: 'linear-gradient(to bottom, #00f5ff, #bf00ff 50%, #00ff88 100%)',
              boxShadow: '0 0 10px rgba(0, 245, 255, 0.15)'
            }}
          />

          {/* Staggered education list */}
          <div className="relative z-10 flex flex-col w-full overflow-visible">
            {educationData.map((item, i) => (
              <TimelineCard 
                key={item.id} 
                item={item} 
                index={i} 
                isMobile={isMobile}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
