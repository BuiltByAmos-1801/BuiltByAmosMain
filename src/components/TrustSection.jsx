import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCheckCircle, FiLayers, FiMessageSquare, FiShield, FiStar, FiZap } from 'react-icons/fi';
import SectionHeader from './SectionHeader.jsx';

const trustPoints = [
  {
    icon: FiShield,
    title: 'MSME Registered Agency',
    copy: 'Built By Amos is an MSME registered business with verified credentials and reliable service delivery for local brands.'
  },
  {
    icon: FiCheckCircle,
    title: 'Founder-Led Projects',
    copy: 'Every project is managed by founder Amos Anand for clear communication, fast decisions, and business-focused delivery.'
  },
  {
    icon: FiLayers,
    title: 'Modern Website Design',
    copy: 'Responsive website design and mobile friendly development that creates fast-loading, conversion-ready pages.'
  },
  {
    icon: FiZap,
    title: 'SEO-Focused Delivery',
    copy: 'Local SEO expert support for Google ranking, keyword optimization, and website visibility across Jharkhand and India.'
  },
  {
    icon: FiMessageSquare,
    title: 'WhatsApp Support',
    copy: 'Direct WhatsApp communication for quick project updates, consultation, and ongoing support at every stage.'
  },
  {
    icon: FiStar,
    title: 'Projects Completed',
    copy: 'Experience with multiple business websites, portfolio websites, e-commerce stores, and local service brands across India.'
  }
];

export default function TrustSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="trust" className="section-padding bg-midnight">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="Trusted web development and SEO services for growing brands"
          copy="Built By Amos combines website development, local SEO, client reviews, and business website strategy to help startups and small businesses grow online."
        />

        <div ref={ref} className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -34 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="glass rounded-3xl p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-950/70 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan">Trusted Support</p>
                <h3 className="mt-3 text-3xl font-bold text-white">Fast WhatsApp Support</h3>
                <p className="mt-4 leading-7 text-slate-400">Reach out directly on WhatsApp for project scopes, quick revisions, and launch assistance.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/70 p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-cyan">Local business focus</p>
                <h3 className="mt-3 text-3xl font-bold text-white">Web Developer in Jharkhand</h3>
                <p className="mt-4 leading-7 text-slate-400">Built By Amos helps Ranchi, Garhwa and nearby businesses build websites designed for search and conversions.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {trustPoints.map((point) => (
                <div key={point.title} className="flex gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan/10 text-cyan">
                    <point.icon className="text-xl" />
                  </span>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-white">{point.title}</h4>
                    <p className="mt-2 text-slate-400">{point.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 34 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="glass rounded-3xl p-8"
          >
            <div className="rounded-[2rem] border border-cyan/20 bg-gradient-to-br from-slate-950/80 to-cyan/10 p-8 text-center">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan">Business Website Developer</p>
              <h3 className="mt-4 text-4xl font-bold text-white">15+ Projects Completed</h3>
              <p className="mt-4 leading-7 text-slate-300">
                Built By Amos delivers websites that work for local businesses, including tattoo studios, clothing stores, coaching centers, restaurants, salons, gyms and startups.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a href="https://wa.me/918757603560" target="_blank" rel="noreferrer" className="button-primary">
                  WhatsApp Support
                </a>
                <a href="#contact" className="button-secondary">
                  Start a Project
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
