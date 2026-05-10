import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FiArrowDownRight, FiSend } from 'react-icons/fi';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const words = ['Web Developer', 'Python Developer', 'Freelancer'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 53) % 100}%`,
        delay: (index % 6) * 0.35,
        duration: 5 + (index % 5)
      })),
    []
  );

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 45 : 90;
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 900);
        return;
      }

      if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setWordIndex((index) => (index + 1) % words.length);
        return;
      }

      setDisplayText((text) =>
        isDeleting ? currentWord.slice(0, text.length - 1) : currentWord.slice(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 lg:px-12">
      <div className="absolute inset-0 bg-grid bg-[length:48px_48px] opacity-70" />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[-18rem] top-[-16rem] h-[34rem] w-[34rem] rounded-full bg-cyan/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.06, 1, 1.06], opacity: [0.28, 0.5, 0.28] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-18rem] right-[-14rem] h-[36rem] w-[36rem] rounded-full bg-electric/25 blur-3xl"
      />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan/60"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -24, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="section-shell relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <h1 className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            Hi, I am <span className="accent-text">Amos Anand</span>
          </h1>
          <p className="mt-4 inline-flex rounded-full border border-cyan/25 bg-cyan/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan">
            Founder of BuiltByAmos
          </p>
          <div className="mt-6 h-12 font-heading text-2xl font-semibold text-slate-100 sm:text-3xl">
            <span className="text-slate-400">I build as a </span>
            <span className="text-cyan">{displayText}</span>
            <span className="ml-1 inline-block h-8 w-0.5 translate-y-1 bg-cyan" />
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Web Developer and Python Developer crafting responsive interfaces, practical automations, and clean digital
            experiences for clients and personal projects.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <button onClick={() => scrollToSection('projects')} className="button-primary">
              View My Work <FiArrowDownRight />
            </button>
            <button onClick={() => scrollToSection('contact')} className="button-secondary">
              Contact Me <FiSend />
            </button>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a className="rounded-full border border-white/10 p-3 text-slate-300 transition hover:border-cyan hover:text-cyan" href="https://github.com/BuiltByAmos-1801" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a className="rounded-full border border-white/10 p-3 text-slate-300 transition hover:border-cyan hover:text-cyan" href="https://www.linkedin.com/in/amos-anand-a1a57b390/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a className="rounded-full border border-white/10 p-3 text-slate-300 transition hover:border-cyan hover:text-cyan" href="https://www.instagram.com/itz.poker__0/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="glass relative mx-auto aspect-square w-full max-w-md rounded-[2rem] p-6"
        >
          <div className="absolute inset-4 rounded-[1.5rem] border border-cyan/30" />
          <div className="flex h-full flex-col justify-between rounded-[1.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan/20 p-8">
            <div>
              <img src="/images/builtbyamos-logo.svg" alt="BuiltByAmos logo" className="mb-5 h-16 w-16 rounded-2xl bg-white/5 object-contain p-2" />
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan">Available for work</p>
              <h2 className="mt-4 font-heading text-4xl font-bold text-white">BuiltByAmos creates clean websites and useful tools.</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['React', 'Python', 'Tailwind'].map((skill) => (
                <div key={skill} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm font-bold text-slate-200">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
