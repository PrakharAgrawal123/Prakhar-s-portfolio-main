import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <Cursor />
      <div className="scan-line animate-scan" />
      {loading ? (
        <Loader />
      ) : (
        <div className="relative min-h-screen bg-slate-50 dark:bg-dark-900 text-slate-800 dark:text-[#e2e8f0] transition-colors duration-500 grid-bg">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>
            <Hero theme={theme} />
            <About theme={theme} />
            <Skills theme={theme} />
            <Projects theme={theme} />
            <Education theme={theme} />
            <Achievements theme={theme} />
            <Contact theme={theme} />
          </main>
          <Footer theme={theme} />
        </div>
      )}
    </>
  );
}

export default App;
