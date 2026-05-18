import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBookOpen } from 'react-icons/fi';
import useSiteContent from '../hooks/useSiteContent.js';
import SectionHeader from './SectionHeader.jsx';

const requiredTrainingEntries = [
  {
    duration: 'Certificate Completed',
    school: 'Cybersecurity',
    course: 'Cybersecurity Training',
    detail:
      'Completed cybersecurity training focused on digital safety, security awareness, and practical protection concepts for modern technology work.'
  },
  {
    duration: 'Certificate Completed',
    school: 'IoT Network Specialist',
    course: 'Internet of Things Training',
    detail:
      'Completed IoT training covering connected devices, networking basics, and Internet of Things concepts for smart technology systems.'
  },
  {
    duration: 'Certificate Completed',
    school: 'Software Test Engineer',
    course: 'Software Testing Training',
    detail:
      'Completed software testing training focused on quality checks, test planning, bug reporting, and improving software reliability.'
  }
];

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const { education } = useSiteContent();
  const educationItems = [
    ...education,
    ...requiredTrainingEntries.filter(
      (requiredItem) => !education.some((item) => item.school?.toLowerCase() === requiredItem.school.toLowerCase())
    )
  ];

  return (
    <section id="education" className="section-padding">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Education"
          title="Academic path"
          copy="A Computer Science Engineering foundation with a practical focus on development, problem solving, and delivery."
        />

        <div ref={ref} className="mx-auto max-w-3xl">
          <div className="relative space-y-6 pl-8">
            <div className="absolute bottom-0 left-[0.9rem] top-0 w-px bg-gradient-to-b from-cyan via-electric to-transparent" />
            {educationItems.map((item, index) => (
              <motion.div
                key={item.school}
                initial={{ opacity: 0, y: 34 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
                className="glass relative rounded-3xl p-6 sm:p-8"
              >
                <span className="absolute -left-8 top-8 flex h-12 w-12 items-center justify-center rounded-full border border-cyan/40 bg-midnight text-cyan shadow-glow">
                  <FiBookOpen />
                </span>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan">{item.duration}</p>
                <h3 className="mt-3 font-heading text-2xl font-bold text-white">{item.school}</h3>
                <p className="mt-2 text-lg font-semibold text-slate-300">{item.course}</p>
                <p className="mt-5 leading-8 text-slate-400">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
