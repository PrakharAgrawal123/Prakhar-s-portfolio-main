import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "./ui/card";

const projects = [
{
  id: 1,
  title: "ViralScore — LinkedIn Virality Predictor",
  emoji: "⚡",
  description:
    "An AI-powered full-stack web application that predicts LinkedIn post virality before publishing. Paste your draft to get an ML-based score out of 100, sentence-level NLP breakdown, GPT-powered rewrite suggestions, and optimal posting time recommendations.",
  tech: ["Python", "Flask", "React", "Tailwind CSS", "scikit-learn", "OpenAI API", "NLP", "Framer Motion"],
  features: [
    "ML virality score (0–100)",
    "Sentence breakdown analysis",
    "AI rewrite suggestions",
    "Best time to post",
  ],
  github: "https://github.com/PrakharAgrawal123/LinkedIn-Post-Virality-Predictor",
  live: "https://viral-score-eight.vercel.app",
  image: "/projects/viralscore.png",
  color: "#6366F1",
  gradient: "from-indigo-500/10 to-violet-500/5",
  category: "datascience",
  status: "Data Science",
},
  {
    id: 2,
    title: "AI Health Predictor",
    emoji: "🏥",
    description:
      "A multi-disease diagnostic machine learning classification platform predicting the likelihood of diabetes, Parkinson's disease, and cardiac risks.",
    tech: [
      "Python",
      "Scikit-learn",
      "Streamlit",
      "Pandas",
      "NumPy",
      "Machine Learning",
    ],
    features: [
      "Multi-disease diagnostic",
      "Real-time classification",
      "Predictive ML models",
      "Interactive dashboard",
    ],
    github: "https://github.com/PrakharAgrawal123/AI-Health-Prediction",
    live: "https://ai-health-predictor.streamlit.app/",
    image: "/projects/health_predictor.png",
    color: "#bf00ff",
    gradient: "from-purple-500/10 to-pink-500/5",
    category: "datascience",
    status: "Machine Learning",
  },
  {
    id: 3,
    title: "Modern Developer Portfolio",
    emoji: "🚀",
    description:
      "Premium glassmorphic developer portfolio website featuring dynamic dark mode toggles, 3D circular skills orbital system, and interactive timeline components.",
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Three.js"],
    features: [
      "Interactive 3D carousel",
      "Theme toggle storage",
      "Clean responsive grids",
      "Form validations",
    ],
    github: "https://github.com/PrakharAgrawal123/Prakhar-s-portfolio-main",
    live: "https://agrawal-portfolio.netlify.app/",
    image: "/projects/portfolio.png",
    color: "#00ff88",
    gradient: "from-green-500/10 to-emerald-500/5",
    category: "webdev",
    status: "Featured",
  },
  {
    id: 4,
    title: "Interactive Quiz Platform",
    emoji: "🎯",
    description:
      "A fully responsive gamified learning application showcasing trivia categories, real-time score multipliers, progress indicators, and local leaderboards.",
    tech: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Local Storage",
      "CSS Animations",
    ],
    features: [
      "Trivia category grids",
      "Streak multipliers",
      "Score leaderboards",
      "Performance analytics",
    ],
    github: "https://github.com/PrakharAgrawal123",
    live: "https://github.com/PrakharAgrawal123",
    image: "/projects/quiz_platform.png",
    color: "#ffd700",
    gradient: "from-yellow-500/10 to-amber-500/5",
    category: "webdev",
    status: "Interactive",
  },
  {
    id: 5,
    title: "IRONCORE Gym Website",
    emoji: "💪",
    description:
      "A modern and responsive fitness website designed for gyms and fitness centers, featuring training programs, trainer profiles, membership pricing, workout schedules, and contact functionality with a professional UI/UX.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    features: [
      "Modern fitness-themed landing page",
      "Training programs showcase",
      "Professional trainers section",
      "Membership pricing plans",
      "Workout schedule management",
      "Fully responsive design",
    ],
    github: "https://github.com/PrakharAgrawal123/Landing-Pages-",
    live: "https://yoga-f6d85c.netlify.app/",
    image: "/projects/ironcore_gym.png",
    color: "#ff3b30",
    gradient: "from-red-500/10 to-orange-500/5",
    category: "webdev",
    status: "Live",
  },

];

const categories = [
  {
    id: "datascience",
    name: "Data Science Projects",
    icon: (color) => (
      <svg
        className="w-4 h-4 transition-colors duration-300"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    id: "webdev",
    name: "Web Development Projects",
    icon: (color) => (
      <svg
        className="w-4 h-4 transition-colors duration-300"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
];

const ProjectCard = ({ project, index, inView }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setTilt({ x: y * -6, y: x * 6 }); // Smooth and subtle tilting
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <Card
        ref={cardRef}
        className="relative rounded-xl overflow-hidden h-full flex flex-col border transition-all duration-300 select-none bg-white/60 dark:bg-slate-900/60"
        style={{
          borderColor: isHovered ? `${project.color}40` : undefined,
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${isHovered ? "-6px" : "0px"})`,
          transition: isHovered
            ? "transform 0.05s ease, box-shadow 0.3s ease, border-color 0.3s ease"
            : "all 0.4s ease",
          boxShadow: isHovered
            ? `0 20px 40px ${project.color}12, 0 0 25px ${project.color}08`
            : "none",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        data-hover
      >
        {/* Project Thumbnail Image Container */}
        <div className="relative aspect-[16/9] overflow-hidden w-full border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />

          {/* Accent-colored Category Badge */}
          <div className="absolute top-4 left-4 flex gap-2 z-10">
            <span
              className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full font-bold shadow-sm backdrop-blur-md"
              style={{
                background: `${project.color}18`,
                color: project.color,
                border: `1px solid ${project.color}35`,
              }}
            >
              {project.status}
            </span>
          </div>
        </div>

        {/* Card Content Body */}
        <CardContent className="p-6 flex flex-col justify-between flex-grow">
          <div>
            {/* Emoji & Title */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl" role="img" aria-label={project.title}>
                {project.emoji}
              </span>
              <h3 className="font-display text-base font-bold text-slate-800 dark:text-white group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                {project.title}
              </h3>
            </div>

            {/* Project description with high contrast */}
            <p className="font-body text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-5">
              {project.description}
            </p>

            {/* Key Features grid */}
            <div className="mb-6">
              <div className="font-mono text-[10px] text-slate-600 dark:text-slate-350 tracking-widest uppercase mb-2.5">
                Key Highlights
              </div>
              <div className="grid grid-cols-2 gap-2">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 font-mono text-[11px] text-slate-600 dark:text-slate-300"
                  >
                    <span style={{ color: project.color }}>▸</span>
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* Tech badges */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] px-2 py-0.5 rounded border transition-colors duration-300"
                  style={{
                    background: `${project.color}08`,
                    color: project.color,
                    borderColor: `${project.color}15`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white transition-colors duration-300 group/link"
              >
                <svg
                  className="w-4 h-4 text-slate-400 dark:text-white/30 group-hover/link:text-slate-800 dark:group-hover/link:text-white transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Code</span>
              </a>

              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest px-4 py-2 rounded border transition-all duration-300 hover:shadow-lg shadow-sm"
                style={{
                  color: project.color,
                  borderColor: `${project.color}30`,
                  background: `${project.color}05`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${project.color}12`;
                  e.currentTarget.style.borderColor = project.color;
                  e.currentTarget.style.boxShadow = `0 0 15px ${project.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${project.color}05`;
                  e.currentTarget.style.borderColor = `${project.color}30`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </CardContent>

        {/* Dynamic hover-glow radial background */}
        <div
          className="absolute top-0 right-0 w-36 h-36 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${project.color}15, transparent 70%)`,
          }}
        />
      </Card>
    </motion.div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("datascience");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const filteredProjects = projects.filter(
    (project) => project.category === activeCategory,
  );

  return (
    <section
      id="projects"
      className="relative py-32 overflow-hidden bg-slate-50/30 dark:bg-transparent"
    >
      {/* Visual background decorations */}
      <div
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00ff88, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00f5ff, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="section-subtitle mb-4">Portfolio</div>
          <h2 className="section-title text-slate-800 dark:text-white text-3xl md:text-4xl font-display font-extrabold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="font-body text-slate-650 dark:text-slate-300 mt-4 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Explore a curated selection of my professional work, bridging the
            gap between rigorous data analysis and high-fidelity web
            applications.
          </p>
        </motion.div>

        {/* Dynamic Category Tabs */}
        <div className="flex justify-center items-center gap-4 mb-16 flex-wrap">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-3 px-6 py-3.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 backdrop-blur-md border ${
                  isActive
                    ? "text-white border-transparent shadow-[0_0_20px_rgba(0,245,255,0.15)] font-bold"
                    : "text-slate-500 dark:text-white/40 border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:text-slate-800 dark:hover:text-white"
                }`}
                data-hover
              >
                {/* Framer Motion slide transition bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 rounded-full -z-10 shadow-lg shadow-cyan-500/20"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.icon(isActive ? "#ffffff" : "currentColor")}
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Project Grid Layout */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch min-h-[480px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} inView={inView} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <a
            href="https://github.com/PrakharAgrawal123"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary inline-flex items-center gap-2 group/btn"
            data-hover
          >
            <span>Explore Full Archive on GitHub</span>
            <span className="group-hover/btn:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
