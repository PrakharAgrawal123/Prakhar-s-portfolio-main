import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiPython,
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiBootstrap,
  SiMongodb,
  SiExpress,
  SiGit,
  SiGithub,
  SiFigma
} from 'react-icons/si';

const skillCategories = [
  {
    title: 'Web Development',
    color: '#00f5ff',
    icon: '🌐',
    skills: [
      { name: 'React.js', level: 80 },
      { name: 'HTML/CSS', level: 92 },
      { name: 'JavaScript', level: 78 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Node.js', level: 60 },
      { name: 'Flask', level: 65 },
    ]
  },
  {
    title: 'Data Science',
    color: '#bf00ff',
    icon: '🧠',
    skills: [
      { name: 'Python', level: 88 },
      { name: 'NumPy/Pandas', level: 85 },
      { name: 'Scikit-learn', level: 75 },
      { name: 'Matplotlib/Seaborn', level: 80 },
      { name: 'TensorFlow', level: 55 },
      { name: 'SQL', level: 70 },
    ]
  },
  {
    title: 'Tools & Others',
    color: '#00ff88',
    icon: '⚙️',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'VS Code', level: 95 },
      { name: 'Jupyter Notebook', level: 90 },
      { name: 'Streamlit', level: 72 },
      { name: 'Google Colab', level: 80 },
      { name: 'Power BI', level: 75 },
    ]
  }
];

const techOrbit = ['Python', 'React', 'ML', 'SQL', 'Git', 'Data', 'AI', 'Web'];

const arcSkills = [
  { name: 'Python', icon: <SiPython className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />, color: '#3776AB' },
  { name: 'React', icon: <SiReact className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />, color: '#61DAFB' },
  { name: 'JavaScript', icon: <SiJavascript className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />, color: '#F7DF1E' },
  { name: 'Node.js', icon: <SiNodedotjs className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />, color: '#339933' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />, color: '#06B6D4' },
  { name: 'Bootstrap', icon: <SiBootstrap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />, color: '#7952B3' },
  { name: 'MongoDB', icon: <SiMongodb className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />, color: '#47A248' },
  { name: 'Express', icon: <SiExpress className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />, color: '#828282' },
  { name: 'Git', icon: <SiGit className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />, color: '#F05032' },
  { name: 'GitHub', icon: <SiGithub className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />, color: '#181717' },
  { name: 'Figma', icon: <SiFigma className="w-6 h-6 sm:w-7 sm:h-7 lg:w-9 lg:h-9" />, color: '#F24E1E' },
];

// 3D orbit sphere
const OrbitSphere = ({ position, label, color, radius, speed, angle }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + angle;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.z = Math.sin(t) * radius;
      ref.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
  });

  return (
    <Float speed={2} floatIntensity={0.3}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
    </Float>
  );
};

// Core sphere
const CoreSphere = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.3;
      ref.current.rotation.x = clock.elapsedTime * 0.1;
    }
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.7, 1]} />
      <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.15} wireframe transparent opacity={0.6} />
    </mesh>
  );
};

const SkillBar = ({ name, level, color, delay, inView }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-2">
      <span className="font-mono text-sm text-slate-700 dark:text-white/70">{name}</span>
      <span className="font-mono text-xs tracking-widest font-semibold" style={{ color }}>{level}%</span>
    </div>
    <div className="h-px bg-slate-200 dark:bg-white/5 rounded overflow-hidden relative">
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        className="absolute inset-y-0 left-0 rounded"
        style={{
          background: `linear-gradient(90deg, ${color}80, ${color})`,
          boxShadow: `0 0 8px ${color}60`,
          height: '1px'
        }}
      />
    </div>
  </div>
);

const Skills = ({ theme }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const [angleOffset, setAngleOffset] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const isHoveredRef = useRef(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      setWindowWidth(window.innerWidth);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  useAnimationFrame((time, delta) => {
    if (!isHoveredRef.current) {
      setAngleOffset(prev => prev + (delta * 0.00015));
    }
  });

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const current = skillCategories[activeCategory];

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
        style={{ background: 'radial-gradient(circle, #bf00ff, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="section-subtitle mb-4"></div>
          <h2 className="section-title text-slate-800 dark:text-white">
            My <span className="gradient-text">Skills</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: 3D visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="relative h-80 lg:h-96"
          >
            {inView && isLargeScreen ? (
              <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} color="#00f5ff" intensity={2} />
                <pointLight position={[-5, -5, -5]} color="#bf00ff" intensity={1} />
                <Suspense fallback={null}>
                  <CoreSphere />
                  {techOrbit.map((label, i) => (
                    <OrbitSphere
                      key={label}
                      label={label}
                      color={['#00f5ff', '#bf00ff', '#00ff88'][i % 3]}
                      radius={2 + (i % 2) * 0.5}
                      speed={0.3 + i * 0.05}
                      angle={(i / techOrbit.length) * Math.PI * 2}
                    />
                  ))}
                </Suspense>
              </Canvas>
            ) : (
              <div className="w-full h-full flex items-center justify-center pointer-events-none">
                <div className="w-40 h-40 rounded-full bg-cyan-500/5 blur-[60px]" />
              </div>
            )}

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="font-display text-4xl font-black gradient-text">{techOrbit.length}+</div>
                <div className="font-mono text-xs text-slate-400 dark:text-white/35 tracking-widest mt-1"></div>
              </div>
            </div>
          </motion.div>

          {/* Right: Skill bars */}
          <div>
            {/* Category tabs */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {skillCategories.map((cat, i) => (
                <button
                  key={cat.title}
                  onClick={() => setActiveCategory(i)}
                  className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-sm transition-all duration-300 ${
                    activeCategory === i
                      ? 'text-dark-900 font-bold'
                      : 'glass text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  style={activeCategory === i ? {
                    background: cat.color,
                    boxShadow: `0 0 20px ${cat.color}60`
                  } : {}}
                  data-hover
                >
                  {cat.icon} {cat.title}
                </button>
              ))}
            </div>

            {/* Skill bars */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {current.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={current.color}
                  delay={i * 0.1}
                  inView={inView}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Modern 3D Floating circular skills carousel */}
        <div className="mt-28 relative w-full h-[320px] sm:h-[400px] flex flex-col items-center justify-center overflow-visible select-none">
          {/* Semicircular arch coordinates calculations */}
          <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            {arcSkills.map((skill, i) => {
              // Base angle spaced equally around the full 360 degree ring
              const baseAngle = (i * 2 * Math.PI) / arcSkills.length;
              // Add offset
              const angle = baseAngle + angleOffset;

              // Calculate 3D projected coordinates
              // Rx: radius X, Ry: radius Y
              const Rx = isMobile ? 135 : isTablet ? 280 : 380;
              const Ry = isMobile ? 25 : isTablet ? 55 : 80;

              const x = Rx * Math.sin(angle);
              // Negative cos creates a dome curving upwards in the center (front is closer)
              const y = Ry * Math.cos(angle) - (isMobile ? 10 : 20);

              // Depth z varies from -1 (back) to 1 (front)
              const z = Math.cos(angle);

              // Responsive scaling & opacities
              const minScale = isMobile ? 0.6 : 0.65;
              const maxScale = isMobile ? 1.0 : 1.15;
              const scaleVal = minScale + (maxScale - minScale) * ((z + 1) / 2);
              
              // Fade out the back half more aggressively but keep them beautifully visible
              const opacityVal = z > -0.2 ? 0.3 + 0.7 * ((z + 0.2) / 1.2) : 0.1 + 0.2 * ((z + 1) / 0.8);

              const isHovered = hoveredSkill === skill;
              
              // Handle GitHub contrast fix dynamically
              const iconColor = skill.name === 'GitHub' 
                ? (theme === 'dark' ? '#ffffff' : '#1f2937') 
                : skill.color;

              return (
                <motion.div
                  key={skill.name}
                  style={{
                    position: 'absolute',
                    x: x,
                    y: y,
                    zIndex: Math.round(100 + z * 100) + (isHovered ? 50 : 0),
                  }}
                  animate={{
                    scale: isHovered ? scaleVal * 1.25 : scaleVal,
                    opacity: isHovered ? 1 : opacityVal,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  onMouseEnter={() => {
                    isHoveredRef.current = true;
                    setHoveredSkill(skill);
                  }}
                  onMouseLeave={() => {
                    isHoveredRef.current = false;
                    setHoveredSkill(null);
                  }}
                  className="cursor-pointer select-none overflow-visible"
                >
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl glass flex items-center justify-center transition-all duration-300 relative border border-slate-200/40 dark:border-white/5"
                    style={{
                      borderColor: isHovered ? iconColor : 'rgba(255,255,255,0.05)',
                      boxShadow: isHovered 
                        ? `0 15px 35px ${iconColor}40, inset 0 0 12px ${iconColor}20` 
                        : `0 4px 20px ${iconColor}10`,
                      background: isHovered
                        ? `linear-gradient(135deg, ${iconColor}20, ${iconColor}05)`
                        : undefined
                    }}
                  >
                    {/* Gloss Reflection Highlight */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                    
                    {/* Skill Icon */}
                    <div 
                      className="transition-transform duration-300 flex items-center justify-center" 
                      style={{ color: iconColor }}
                    >
                      {skill.icon}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dynamic Animated Center Label */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none text-center">
            {/* Glowing active dot */}
            <motion.span 
              animate={{
                scale: hoveredSkill ? [1, 1.5, 1] : [1, 1.2, 1],
                backgroundColor: hoveredSkill ? (hoveredSkill.name === 'GitHub' ? (theme === 'dark' ? '#ffffff' : '#1f2937') : hoveredSkill.color) : '#00f5ff',
                boxShadow: hoveredSkill 
                  ? `0 0 15px ${hoveredSkill.name === 'GitHub' ? (theme === 'dark' ? '#ffffff' : '#1f2937') : hoveredSkill.color}, 0 0 30px ${hoveredSkill.name === 'GitHub' ? (theme === 'dark' ? '#ffffff' : '#1f2937') : hoveredSkill.color}` 
                  : '0 0 10px #00f5ff, 0 0 20px rgba(0, 245, 255, 0.4)'
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full" 
            />
            
            <AnimatePresence mode="wait">
              <motion.span
                key={hoveredSkill ? hoveredSkill.name : "default"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="font-display text-sm tracking-[0.25em] uppercase font-bold text-slate-700 dark:text-white/60 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
              >
                {hoveredSkill ? hoveredSkill.name : "Technologies I Use"}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
