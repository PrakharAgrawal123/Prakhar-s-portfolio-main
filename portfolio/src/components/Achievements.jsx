import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import CountUp from 'react-countup';

const achievements = [
  {
    id: 1,
    title: 'HackDiwas Participation',
    subtitle: 'National Level Hackathon',
    description: 'Participated in HackDiwas, a prestigious national-level hackathon, where I developed a real-world solution using Python and data science techniques under a 36-hour time constraint.',
    icon: '🏆',
    date: '2026',
    color: '#ff9500',
    tags: ['Hackathon', 'Innovation', 'Problem Solving'],
    type: 'Hackathon',
  },
  {
    id: 2,
    title: 'Gold Medalist',
    subtitle: 'Honored by District Magistrate',
    description: 'Awarded a Gold Medal for outstanding academic performance in Class 12th and honored by the District Magistrate of the district. Recognized for academic excellence, consistency, and dedication towards studies. This achievement reflects strong discipline, hard work, and commitment to personal growth from an early stage of my journey.',
    icon: '🏅',
    date: '2024',
    color: '#bf00ff',
    tags: ['Academic Excellence', 'Gold Medal', 'Discipline'],
    type: 'Achievement',
  },
  {
    id: 3,
    title: 'CGPA: 9.5 / 10',
    subtitle: 'Academic Excellence',
    description: 'Maintained an outstanding CGPA of 9.5 out of 10 throughout my BCA program, demonstrating consistent academic excellence while simultaneously working on real-world projects and participating in extracurriculars.',
    icon: '🎓',
    date: '2024-2027',
    color: '#00f5ff',
    tags: ['Academic Excellence', 'Consistency', 'Top Performer'],
    type: 'Academic',
  },
  {
    id: 4,
    title: 'Open Source Contributor',
    subtitle: 'GitHub & Community Projects',
    description: 'Actively contributing to open-source projects on GitHub, participating in code reviews, submitting pull requests, and collaborating with developers worldwide to improve software quality.',
    icon: '💻',
    date: '2024–Present',
    color: '#00ff88',
    tags: ['GitHub', 'Collaboration', 'Open Source'],
    type: 'Community',
  },
];

const stats = [
  { value: '9.5', label: 'CGPA', icon: '📚', color: '#00f5ff' },
  { value: '3+', label: 'Hackathons', icon: '🏆', color: '#ff9500' },
  { value: '1', label: 'Gold Medalist', icon: '🏆', color: '#bf00ff' },
  { value: '3+', label: 'Projects', icon: '🚀', color: '#00ff88' },
];

// Parser helper for CountUp values (e.g. "9.5" or "3+")
const parseStatValue = (val) => {
  const numMatch = val.match(/^[\d.]+/);
  const num = numMatch ? parseFloat(numMatch[0]) : 0;
  const suffix = val.replace(/^[\d.]+/, '');
  const isFloat = val.includes('.');
  return { num, suffix, isFloat };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 15,
    },
  },
};

const AchievementCard = ({ achievement, index, isLargeScreen }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="relative group"
    >
      <Tilt
        perspective={1000}
        tiltEnable={isLargeScreen}
        glareEnable={isLargeScreen}
        glareMaxOpacity={0.12}
        glareColor={achievement.color}
        glarePosition="all"
        glareBorderRadius="8px"
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        scale={1.02}
        transitionSpeed={800}
        className="h-full rounded-lg overflow-hidden"
      >
        <div
          className="relative glass rounded-lg p-7 h-full flex flex-col justify-between transition-all duration-500 overflow-hidden"
          style={{
            border: `1px solid ${achievement.color}15`,
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.015) 0%, rgba(255, 255, 255, 0.002) 100%)`,
            backdropFilter: 'blur(10px)',
            willChange: 'transform',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = `0 10px 30px -10px ${achievement.color}25, inset 0 0 12px 1px ${achievement.color}10`;
            e.currentTarget.style.borderColor = `${achievement.color}45`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = `${achievement.color}15`;
          }}
        >
          {/* Cyber aesthetic corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105" style={{ borderColor: achievement.color }} />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105" style={{ borderColor: achievement.color }} />

          {/* Shine Sweep Hover Effect */}
          <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] cubic-bezier(0.2, 0.6, 0.2, 1) pointer-events-none" />

          <div>
            {/* Card Header */}
            <div className="flex items-start gap-4 mb-5">
              <motion.div
                whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-lg flex items-center justify-center text-3xl flex-shrink-0 cursor-default shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}05)`,
                  border: `1px solid ${achievement.color}35`,
                  boxShadow: `0 0 15px ${achievement.color}10`,
                }}
              >
                {achievement.icon}
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                  <span
                    className="font-mono text-[10px] tracking-widest px-2.5 py-0.5 rounded-sm uppercase font-semibold border"
                    style={{
                      background: `${achievement.color}12`,
                      color: achievement.color,
                      borderColor: `${achievement.color}25`
                    }}
                  >
                    {achievement.type}
                  </span>
                  <span className="font-mono text-xs text-slate-500 dark:text-white/40">{achievement.date}</span>
                </div>
                <h3 className="font-display text-base font-bold text-slate-800 dark:text-white tracking-wide leading-tight group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-300">
                  {achievement.title}
                </h3>
                <div className="font-mono text-xs text-slate-500 dark:text-white/35 tracking-wide mt-1" style={{ color: `${achievement.color}b0` }}>
                  {achievement.subtitle}
                </div>
              </div>
            </div>

            <p className="font-body text-[13.5px] text-slate-600 dark:text-white/60 leading-relaxed mb-6">
              {achievement.description}
            </p>
          </div>

          {/* Tags with Micro-interactions */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {achievement.tags.map(tag => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05, color: '#ffffff', borderColor: 'rgba(255,255,255,0.2)' }}
                className="font-mono text-[10.5px] px-2.5 py-1 rounded-sm text-slate-500 dark:text-white/40 cursor-default transition-all duration-300"
                style={{
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.01)',
                }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
};

const StatCard = ({ stat, index }) => {
  const { num, suffix, isFloat } = parseStatValue(stat.value);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative glass rounded-lg p-6 text-center flex flex-col justify-center items-center transition-all duration-500 overflow-hidden"
      style={{
        border: `1px solid ${stat.color}15`,
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.002) 100%)`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 15px 30px -10px ${stat.color}18, inset 0 0 10px 1px ${stat.color}08`;
        e.currentTarget.style.borderColor = `${stat.color}35`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = `${stat.color}15`;
      }}
    >
      {/* Glow aura */}
      <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full opacity-[0.03] blur-xl pointer-events-none" style={{ backgroundColor: stat.color }} />

      <motion.div
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl mb-3 flex items-center justify-center w-12 h-12 rounded-lg"
        style={{ background: `${stat.color}10`, border: `1px solid ${stat.color}20` }}
      >
        {stat.icon}
      </motion.div>

      <div className="font-display text-3xl md:text-4xl font-extrabold mb-1.5 flex items-baseline justify-center tracking-tight" style={{ color: stat.color }}>
        <CountUp
          end={num}
          decimals={isFloat ? 1 : 0}
          duration={2.5}
          enableScrollSpy={true}
          scrollSpyOnce={true}
        />
        <span className="text-xl ml-0.5 font-bold">{suffix}</span>
      </div>

      <div className="font-mono text-[10.5px] text-slate-500 dark:text-white/40 tracking-widest uppercase font-semibold mt-1">
        {stat.label}
      </div>
    </motion.div>
  );
};

const Achievements = ({ theme }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <section id="achievements" className="relative py-32 overflow-hidden bg-transparent">
      
      {/* Floating Animated Gradient Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Cyan Orb */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-10 -left-10 w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[80px]"
          style={{
            background: 'radial-gradient(circle, #00f5ff, transparent 70%)',
            willChange: 'transform'
          }}
        />

        {/* Purple Orb */}
        <motion.div
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 right-0 w-[450px] h-[450px] rounded-full opacity-[0.05] blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #bf00ff, transparent 70%)',
            willChange: 'transform'
          }}
        />

        {/* Orange/Yellow Orb */}
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, 40, 50, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-20 left-1/4 w-[350px] h-[350px] rounded-full opacity-[0.04] blur-[90px]"
          style={{
            background: 'radial-gradient(circle, #ff9500, transparent 70%)',
            willChange: 'transform'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Animated Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-20 relative flex flex-col items-center text-center"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />
          
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-cyan-400" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase font-bold text-cyan-400/80">Milestones & Growth</span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-cyan-400" />
          </motion.div>

          <motion.h2 variants={itemVariants} className="section-title text-slate-800 dark:text-white font-extrabold tracking-wide text-3xl md:text-5xl">
            Achievements & <span className="gradient-text">Recognition</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="font-mono text-xs text-slate-500 dark:text-white/40 mt-4 max-w-lg leading-relaxed">
            Recognitions, competition records, and academic milestones from my journey in AI & software development.
          </motion.p>
        </motion.div>

        {/* Stats row with CountUp */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </motion.div>

        {/* Achievement cards grid with 3D Tilt */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6"
        >
          {achievements.map((achievement, i) => (
            <AchievementCard key={achievement.id} achievement={achievement} index={i} isLargeScreen={isLargeScreen} />
          ))}
        </motion.div>

        {/* Future goals with pulse and neon glows */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-20 relative glass rounded-xl p-8 border border-white/[0.04] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.015) 0%, rgba(255, 255, 255, 0.002) 100%)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* Cyber aesthetic corner accents */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/30" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/30" />

          <div className="flex items-center gap-3 mb-8">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <div className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-bold">Upcoming Goals</div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { goal: 'Land First DS Internship', icon: '🎯', progress: 70, color: '#00f5ff' },
              { goal: 'Contribute to Major OS Projects', icon: '⚡', progress: 45, color: '#ff9500' },
              { goal: 'Complete ML Certification', icon: '📜', progress: 55, color: '#bf00ff' },
            ].map((item, i) => (
              <motion.div
                key={item.goal}
                whileHover={{ y: -4 }}
                className="glass rounded-lg p-5 border border-white/[0.04] transition-all duration-300 relative group flex flex-col justify-between"
                style={{
                  background: 'rgba(255, 255, 255, 0.005)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="text-2xl w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}>
                      {item.icon}
                    </div>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${item.color}15`, color: item.color }}>
                      {item.progress}%
                    </span>
                  </div>
                  <div className="font-body text-sm font-semibold text-slate-700 dark:text-white/70 mb-5 tracking-wide leading-snug">
                    {item.goal}
                  </div>
                </div>

                <div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${item.progress}%` } : {}}
                      transition={{ duration: 1.8, delay: 0.8 + i * 0.2, ease: 'easeOut' }}
                      className="h-full rounded-full relative"
                      style={{
                        background: `linear-gradient(90deg, ${item.color}, #bf00ff)`,
                        boxShadow: `0 0 10px ${item.color}50`
                      }}
                    >
                      <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 bg-white/20"
                      />
                    </motion.div>
                  </div>
                  <div className="font-mono text-[10.5px] text-slate-500 dark:text-white/35 mt-2 flex justify-between">
                    <span>Milestone progress</span>
                    <span style={{ color: item.color }}>{item.progress}% there</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
