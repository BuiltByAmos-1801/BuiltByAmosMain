import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCalendar, FiDatabase, FiFlag, FiZap } from 'react-icons/fi';
import SectionHeader from './SectionHeader.jsx';

const internshipHighlights = [
  { label: 'Status', value: 'Upcoming', icon: FiFlag },
  { label: 'Track', value: 'Data Science', icon: FiDatabase },
  { label: 'Tech Focus', value: 'Python', icon: FiZap },
  { label: 'Start', value: 'Not started yet', icon: FiCalendar }
];

export default function Internship() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="internship" className="section-padding">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Internship"
          title="Upcoming professional training"
          copy="This section keeps internship experience separate from certificates, so future internship work can be shown clearly."
        />

        <motion.article
          ref={ref}
          initial={{ opacity: 0, y: 34 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8"
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-cyan/10" />
          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan">
                <FiFlag /> Upcoming
              </div>
              <h3 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                Data Science with Python Internship
              </h3>
              <p className="mt-5 max-w-2xl leading-8 text-slate-300">
                I am going to start a Data Science with Python Internship. It has not started yet, so this is listed as
                an upcoming internship and will be updated with live work, learning outcomes, and certificate details
                after it begins.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {internshipHighlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                    <item.icon />
                  </div>
                  <p className="text-sm font-semibold text-slate-400">{item.label}</p>
                  <p className="mt-1 font-heading text-xl font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
