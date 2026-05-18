import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCheckCircle, FiFileText, FiShield, FiUserCheck } from 'react-icons/fi';
import SectionHeader from './SectionHeader.jsx';

const trustPoints = [
  {
    icon: FiShield,
    title: 'Registered Business Identity',
    copy: 'Built By Amos operates as an MSME registered digital service company for professional website and automation work.'
  },
  {
    icon: FiFileText,
    title: 'Clear Project Process',
    copy: 'Clients get structured planning, transparent communication, milestone-based delivery, and clean handover support.'
  },
  {
    icon: FiUserCheck,
    title: 'Founder-Led Delivery',
    copy: 'Projects are handled directly by Amos Anand, focused on practical business outcomes, responsive design, and dependable support.'
  }
];

export default function MsmeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="msme" className="section-padding bg-ink/70">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Company Trust"
          title="Built By Amos is MSME registered"
          copy="A professional digital agency for websites, SEO, Google Business Profile setup, and business automation."
        />

        <div ref={ref} className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="glass relative mx-auto w-full max-w-sm rounded-3xl p-8 text-center"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-cyan/20 via-electric/10 to-transparent blur-2xl" />
            <div className="relative">
              <img
                src="/images/msme-logo-optimized.jpg"
                alt="MSME registered Built By Amos digital agency logo"
                loading="lazy"
                className="mx-auto h-44 w-44 rounded-2xl object-contain"
              />
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-cyan">MSME Registered</p>
              <h3 className="mt-2 font-heading text-3xl font-bold text-white">Official Company Profile</h3>
              <p className="mt-4 leading-7 text-slate-400">
                Built By Amos presents client work through a registered, trust-focused business identity.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 34 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-lg leading-8 text-slate-300">
              Built By Amos is led by <span className="font-bold text-white">Amos Anand</span>, a web developer and
              Python developer building professional websites for local businesses, creators, and growing brands. The
              company focuses on modern design, search-friendly structure, mobile responsiveness, and practical support
              after launch.
            </p>

            <div className="mt-8 grid gap-4">
              {trustPoints.map((point) => (
                <div key={point.title} className="glass rounded-3xl p-5">
                  <div className="flex gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan/10 text-xl text-cyan">
                      <point.icon />
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-white">{point.title}</h3>
                      <p className="mt-2 leading-7 text-slate-400">{point.copy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a className="button-primary" href="#contact">
                Start a Project <FiCheckCircle />
              </a>
              <a className="button-secondary" href="https://g.page/r/CYkrf9Wvu3LqEBM/review" target="_blank" rel="noreferrer">
                Leave a Review
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
