import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const interests = [
  { icon: '🧠', label: 'Machine Learning' },
  { icon: '📊', label: 'Data Analysis' },
  { icon: '🌐', label: 'Web Development' },
  { icon: '🔬', label: 'Research' },
  { icon: '⚡', label: 'Open Source' },
  { icon: '🎯', label: 'Problem Solving' },
];

const timeline = [
  { year: '2023', event: 'Started BCA at Shri Ram Murti Smarak College', type: 'edu' },
  { year: '2024', event: 'Built first ML model – AI Health Predictor', type: 'project' },
  { year: '2024', event: 'GSSoC Campus Ambassador', type: 'achievement' },
  { year: '2024', event: 'Participated in HackDiwas Hackathon', type: 'achievement' },
  { year: '2025', event: 'Aspiring for Data Science Internship', type: 'goal' },
];

const typeColors = {
  edu: '#00f5ff',
  project: '#00ff88',
  achievement: '#bf00ff',
  goal: '#ff9500',
};

const About = ({ theme }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 rounded-full opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, #00f5ff, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="section-subtitle mb-4"></div>
          <h2 className="section-title text-slate-800 dark:text-white">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio & interests */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* 3D-style card */}
              <div className="glass-strong neon-border-cyan rounded-sm p-8 relative overflow-hidden corner-tl corner-br">
                {/* Corner brackets done via pseudo elements in CSS */}
                {/* Scan line effect */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                <div className="flex items-start gap-6 mb-8">
                  {/* Avatar placeholder */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-sm glass neon-border-cyan flex items-center justify-center">
                      <span className="font-display text-2xl font-black gradient-text"></span>
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-50 dark:border-dark-900" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-800 dark:text-white mb-1">Prakhar Agrawal</h3>
                    <div className="font-mono text-xs text-cyan-400/70 tracking-widest">BCA 2nd Year Student</div>
                    <div className="font-mono text-xs text-slate-500 dark:text-white/35 tracking-wider mt-1">Prayagraj, UP, India</div>
                  </div>
                </div>

                <p className="font-body text-base text-slate-600 dark:text-white/60 leading-relaxed mb-6">
                  I'm a passionate BCA student with a deep love for Data Science and Web Development. 
                  With a CGPA of <span className="text-cyan-400 font-semibold">9.5</span>, I combine academic excellence with 
                  hands-on project experience. I thrive at the intersection of 
                  <span className="text-purple-400 font-semibold"> machine learning</span> and 
                  <span className="text-green-400 font-semibold"> creative web design</span>.
                </p>

                <p className="font-body text-base text-slate-500 dark:text-white/50 leading-relaxed mb-8">
                  From building AI-powered health predictors to crafting WhatsApp analytics tools, 
                  I love turning complex data into meaningful, user-friendly experiences. 
                  Currently on a mission to secure my first data science internship.
                </p>

                {/* Interests grid */}
                <div className="grid grid-cols-3 gap-3">
                  {interests.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="glass rounded-sm px-3 py-2 text-center hover:border-cyan-400/30 border border-transparent transition-all duration-300 group"
                    >
                      <div className="text-lg mb-1">{item.icon}</div>
                      <div className="font-mono text-xs text-slate-500 dark:text-white/40 group-hover:text-cyan-400 transition-colors tracking-wider">
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="font-mono text-xs text-slate-400 dark:text-white/30 tracking-widest uppercase mb-8">Journey Timeline</div>

            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/50 via-purple-500/30 to-transparent" />

              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="relative mb-8 last:mb-0"
                >
                  {/* Dot */}
                  <div
                    className="absolute -left-8 top-1.5 w-3 h-3 rounded-full border-2 border-slate-50 dark:border-dark-900"
                    style={{ background: typeColors[item.type], boxShadow: `0 0 8px ${typeColors[item.type]}` }}
                  />

                  <div className="glass rounded-sm p-4 hover:border-white/10 border border-transparent transition-all duration-300">
                    <div className="font-display text-xs tracking-widest mb-2" style={{ color: typeColors[item.type] }}>
                      {item.year}
                    </div>
                    <div className="font-body text-sm text-slate-700 dark:text-white/70">{item.event}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}
              className="mt-12 glass rounded-sm p-6 border-l-2 border-cyan-400/50"
            >
              <p className="font-mono text-sm text-slate-500 dark:text-white/40 italic leading-relaxed">
                "Data is the new oil, but only if you know how to refine it."
              </p>
              <div className="font-mono text-xs text-cyan-400/50 mt-3 tracking-widest">— My Philosophy</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
