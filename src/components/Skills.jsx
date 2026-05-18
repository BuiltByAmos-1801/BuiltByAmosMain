import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiCode } from 'react-icons/fi';
import useSiteContent from '../hooks/useSiteContent.js';
import SectionHeader from './SectionHeader.jsx';

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { skills } = useSiteContent();
  const groups = Object.values(
    skills.reduce((collection, skill) => {
      const title = skill.group || 'General Skills';
      collection[title] = collection[title] || { title, items: [] };
      collection[title].items.push(skill);
      return collection;
    }, {})
  );

  return (
    <section id="skills" className="section-padding">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Skills"
          title="Technologies I use to ship polished work"
          copy="A balanced toolkit for frontend interfaces, Python development, databases, and practical developer workflows."
        />

        <div ref={ref} className="grid gap-6 lg:grid-cols-3">
          {groups.map((group, groupIndex) => (
            <motion.article
              key={group.title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: groupIndex * 0.12, ease: 'easeOut' }}
              className="glass rounded-3xl p-6"
            >
              <h3 className="font-heading text-2xl font-bold text-white">{group.title}</h3>
              <div className="mt-6 space-y-5">
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan/10 text-xl text-cyan">
                          <FiCode />
                        </span>
                        <span className="font-semibold text-slate-200">{skill.name}</span>
                      </div>
                      <span className="text-sm font-bold text-cyan">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.25 + groupIndex * 0.1, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan to-electric"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
