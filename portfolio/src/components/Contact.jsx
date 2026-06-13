import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from './ui/card';

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/PrakharAgrawal123',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    color: '#00f5ff',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/prakhar-agrawal-dev/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0077b5',
  },
  {
    name: 'Twitter',
    url: 'https://x.com/PrakharAgr2006',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: '#1da1f2',
  },
  {
    name: 'Email',
    url: 'mailto:agrawalprakhar931@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: '#bf00ff',
  },
];

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const validateField = (field, value) => {
    let error = '';
    if (field === 'name') {
      if (!value.trim()) error = 'Name is required';
    } else if (field === 'email') {
      if (!value.trim()) error = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address';
    } else if (field === 'subject') {
      if (!value.trim()) error = 'Subject is required';
    } else if (field === 'message') {
      if (!value.trim()) error = 'Message is required';
      else if (value.trim().length < 15) error = 'Message must be at least 15 characters';
    }
    return error;
  };

  const handleChange = (field, value) => {
    setFormData((p) => ({ ...p, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((p) => ({ ...p, [field]: error }));
    }
  };

  const handleBlur = (field) => {
    setTouched((p) => ({ ...p, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((p) => ({ ...p, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);

    // Validate all fields
    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) formErrors[key] = err;
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setStatus('sending');

    try {
      const formURL =
        'https://docs.google.com/forms/d/e/1FAIpQLSfMkYpdbsWtcnsLKLlEM6C4Db3ugi7yK9ckBhnmCma9dPurqA/formResponse';

      const data = new FormData();
      // Google Form Entry IDs linked to the responses Google Sheet
      data.append('entry.1066149299', formData.name);
      data.append('entry.1980295643', formData.email);
      data.append('entry.1944864974', formData.subject);
      data.append('entry.1776764140', formData.message);

      await fetch(formURL, {
        method: 'POST',
        mode: 'no-cors',
        body: data,
      });

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
    } catch (error) {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-slate-50/10 dark:bg-transparent">
      {/* Glow backgrounds */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #bf00ff, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00f5ff, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center lg:text-left"
        >
          <div className="section-subtitle mb-4">Contact</div>
          <h2 className="section-title text-slate-800 dark:text-white text-3xl md:text-4xl font-display font-extrabold">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="font-body text-slate-650 dark:text-slate-300 mt-4 max-w-xl mx-auto lg:mx-0 leading-relaxed text-base md:text-lg">
            I'm always open to discussing new opportunities, exciting projects, or just having a conversation about data and tech.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Side: Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              {[
                { icon: '📍', label: 'Location', value: 'Prayagraj, UP, India' },
                { icon: '📧', label: 'Email', value: 'agrawalprakhar931@gmail.com' },
                { icon: '🎓', label: 'Education', value: 'Bachelor of Computer Applications (BCA)' },
                { icon: '🟢', label: 'Status', value: 'Open to Internship Opportunities' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="glass rounded-xl p-4.5 flex items-center gap-4.5 border border-slate-200/50 dark:border-white/5 hover:border-cyan-400/20 hover:shadow-lg shadow-sm transition-all duration-300 bg-white/60 dark:bg-slate-900/60"
                >
                  <span className="text-2xl" role="img" aria-label={item.label}>
                    {item.icon}
                  </span>
                  <div>
                    <div className="font-mono text-[10px] text-slate-650 dark:text-slate-350 tracking-widest uppercase">
                      {item.label}
                    </div>
                    <div className="font-body text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <div className="font-mono text-xs text-slate-655 dark:text-slate-350 tracking-widest uppercase mb-4 text-center lg:text-left font-bold">
                Find Me Online
              </div>
              <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
                {socials.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="glass rounded-lg px-4 py-3 flex items-center gap-2.5 border border-slate-200/50 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/20 transition-all duration-300 bg-white/60 dark:bg-slate-900/60 font-mono text-xs tracking-wider"
                    style={{ color: social.color }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 10px 20px ${social.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    data-hover
                  >
                    {social.icon}
                    <span>{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form container */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <Card className="rounded-2xl border-slate-200/60 dark:border-white/10 overflow-hidden relative shadow-xl bg-white/70 dark:bg-slate-900/50 backdrop-blur-lg">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      {/* Premium self-drawing checkmark SVG */}
                      <div className="relative mb-6">
                        <svg className="w-16 h-16 text-cyan-500 dark:text-cyan-400" viewBox="0 0 52 52" fill="none">
                          <motion.circle
                            cx="26"
                            cy="26"
                            r="24"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                          />
                          <motion.path
                            d="M16 27l7 7 14-14"
                            stroke="currentColor"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
                          />
                        </svg>
                        <div className="absolute inset-0 w-16 h-16 rounded-full bg-cyan-400/10 blur-md -z-10 animate-pulse" />
                      </div>

                      <h3 className="font-display text-xl font-bold text-slate-800 dark:text-white mb-2">
                        Message Transmitted!
                      </h3>
                      <p className="font-body text-sm text-slate-650 dark:text-slate-300 max-w-sm mb-8 leading-relaxed">
                        Thank you for reaching out! Your message details have been saved successfully to Google Sheets. Prakhar will review your submission and reply shortly.
                      </p>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="btn-secondary px-6 py-2.5 font-mono text-xs tracking-widest uppercase hover:shadow-md transition-all duration-300"
                        data-hover
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      noValidate
                    >
                      <div className="grid md:grid-cols-2 gap-5">
                        {/* Name Field */}
                        <div className="space-y-1.5">
                          <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/20 group-focus-within:text-cyan-400 transition-colors duration-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </span>
                            <input
                              type="text"
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={(e) => handleChange('name', e.target.value)}
                              onBlur={() => handleBlur('name')}
                              disabled={status === 'sending'}
                              className={`w-full rounded-lg pl-11 pr-4 py-3.5 font-mono text-sm transition-all duration-300 outline-none
                                bg-white/40 dark:bg-black/25 text-slate-800 dark:text-white border
                                placeholder:text-slate-400 dark:placeholder:text-white/20
                                focus:bg-white/90 dark:focus:bg-black/40
                                focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,245,255,0.1)]
                                ${errors.name ? 'border-red-500/50 focus:border-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-slate-200/60 dark:border-white/10'}
                              `}
                            />
                          </div>
                          <AnimatePresence>
                            {errors.name && (
                              <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="font-mono text-[11px] text-red-500 dark:text-red-400 pl-1"
                              >
                                {errors.name}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1.5">
                          <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/20 group-focus-within:text-cyan-400 transition-colors duration-300">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </span>
                            <input
                              type="email"
                              placeholder="Your Email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              onBlur={() => handleBlur('email')}
                              disabled={status === 'sending'}
                              className={`w-full rounded-lg pl-11 pr-4 py-3.5 font-mono text-sm transition-all duration-300 outline-none
                                bg-white/40 dark:bg-black/25 text-slate-800 dark:text-white border
                                placeholder:text-slate-400 dark:placeholder:text-white/20
                                focus:bg-white/90 dark:focus:bg-black/40
                                focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,245,255,0.1)]
                                ${errors.email ? 'border-red-500/50 focus:border-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-slate-200/60 dark:border-white/10'}
                              `}
                            />
                          </div>
                          <AnimatePresence>
                            {errors.email && (
                              <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="font-mono text-[11px] text-red-500 dark:text-red-400 pl-1"
                              >
                                {errors.email}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Subject Field */}
                      <div className="space-y-1.5">
                        <div className="relative group">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/20 group-focus-within:text-cyan-400 transition-colors duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </span>
                          <input
                            type="text"
                            placeholder="Subject"
                            value={formData.subject}
                            onChange={(e) => handleChange('subject', e.target.value)}
                            onBlur={() => handleBlur('subject')}
                            disabled={status === 'sending'}
                            className={`w-full rounded-lg pl-11 pr-4 py-3.5 font-mono text-sm transition-all duration-300 outline-none
                              bg-white/40 dark:bg-black/25 text-slate-800 dark:text-white border
                              placeholder:text-slate-400 dark:placeholder:text-white/20
                              focus:bg-white/90 dark:focus:bg-black/40
                              focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,245,255,0.1)]
                              ${errors.subject ? 'border-red-500/50 focus:border-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-slate-200/60 dark:border-white/10'}
                            `}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.subject && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="font-mono text-[11px] text-red-500 dark:text-red-400 pl-1"
                            >
                              {errors.subject}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Message Field */}
                      <div className="space-y-1.5">
                        <div className="relative group">
                          <span className="absolute left-4 top-4 text-slate-400 dark:text-white/20 group-focus-within:text-cyan-400 transition-colors duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </span>
                          <textarea
                            rows={5}
                            placeholder="Your Message..."
                            value={formData.message}
                            onChange={(e) => handleChange('message', e.target.value)}
                            onBlur={() => handleBlur('message')}
                            disabled={status === 'sending'}
                            className={`w-full rounded-lg pl-11 pr-4 py-3.5 font-mono text-sm transition-all duration-300 outline-none resize-none
                              bg-white/40 dark:bg-black/25 text-slate-800 dark:text-white border
                              placeholder:text-slate-400 dark:placeholder:text-white/20
                              focus:bg-white/90 dark:focus:bg-black/40
                              focus:border-cyan-400/50 focus:shadow-[0_0_15px_rgba(0,245,255,0.1)]
                              ${errors.message ? 'border-red-500/50 focus:border-red-500/50 focus:shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-slate-200/60 dark:border-white/10'}
                            `}
                          />
                        </div>
                        <AnimatePresence>
                          {errors.message && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="font-mono text-[11px] text-red-500 dark:text-red-400 pl-1"
                            >
                              {errors.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Submit button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={status === 'sending'}
                          className="btn-primary w-full py-4 justify-center flex items-center gap-3 relative overflow-hidden transition-all duration-300 font-mono text-xs uppercase tracking-widest"
                          data-hover
                        >
                          {status === 'sending' ? (
                            <>
                              {/* Sliding glow track for submitting state */}
                              <span className="absolute inset-0 bg-cyan-400/10 animate-pulse" />
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                className="w-4 h-4 border-2 border-white dark:border-cyan-400 border-t-transparent rounded-full relative z-10"
                              />
                              <span className="relative z-10 font-bold">Transmitting Message...</span>
                            </>
                          ) : (
                            <>
                              <span className="font-bold">Send Message</span>
                              <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
