import { motion } from 'framer-motion';
import { FiArrowDownRight, FiSend } from 'react-icons/fi';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Hero() {
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-[linear-gradient(135deg,#fffaf2_0%,#f7f2ea_54%,#eadfcf_100%)] px-5 pb-16 pt-28 sm:px-8 lg:px-12">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:120px_120px] opacity-25" />

      <div className="section-shell relative z-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <h1 className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            Professional Web Developer in Jharkhand for Business Websites
          </h1>
          <p className="mt-4 inline-flex rounded-full border border-cyan/25 bg-cyan/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan">
            Built By Amos — Web Development, Local SEO & Business Websites
          </p>
          <div className="mt-6 max-w-3xl text-xl font-semibold leading-tight text-slate-100 sm:text-3xl">
            Trusted website developer in Ranchi, Jharkhand creating responsive, mobile-friendly websites that rank well and convert visitors into customers.
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Built By Amos builds affordable website design and SEO-optimized business websites for tattoo studios, clothing stores, coaching centers, restaurants, gyms and startups across India.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="https://wa.me/918757603560" target="_blank" rel="noreferrer" className="button-primary">
              Get Free Consultation
            </a>
            <button onClick={() => scrollToSection('projects')} className="button-secondary">
              View Portfolio
            </button>
            <a href="https://wa.me/918757603560" target="_blank" rel="noreferrer" className="button-secondary inline-flex items-center justify-center gap-2">
              WhatsApp Now
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/5 px-3 py-2 text-sm font-semibold text-slate-300">Responsive Website Design</span>
            <span className="rounded-full bg-white/5 px-3 py-2 text-sm font-semibold text-slate-300">Local SEO Expert</span>
            <span className="rounded-full bg-white/5 px-3 py-2 text-sm font-semibold text-slate-300">Fast Loading Website</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="relative mx-auto min-h-[34rem] w-full max-w-md rounded-2xl border border-[#eadfcc] bg-white/80 p-6 shadow-[0_18px_54px_rgba(70,52,31,0.10)] sm:min-h-[36rem]"
        >
          <div className="absolute inset-4 rounded-xl border border-[#efe4d4]" />
          <div className="flex min-h-[31rem] flex-col justify-between gap-8 rounded-xl bg-white p-8 shadow-inner sm:min-h-[33rem]">
            <div>
              <img
                src="/images/builtbyamos-logo.svg"
                alt="Built By Amos web development company logo"
                loading="lazy"
                className="mb-5 h-16 w-16 rounded-xl bg-white object-contain p-2 shadow-[0_10px_24px_rgba(70,52,31,0.08)]"
              />
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan">Available for work</p>
              <h2 className="mt-4 font-heading text-4xl font-bold text-white">
                Website development company in Jharkhand for clean websites and useful tools.
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {['React', 'Python', 'Tailwind'].map((skill) => (
                <div key={skill} className="rounded-lg border border-[#eadfcc] bg-[#fffaf2] p-4 text-center text-sm font-bold text-slate-200 shadow-[0_8px_18px_rgba(70,52,31,0.05)]">
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
