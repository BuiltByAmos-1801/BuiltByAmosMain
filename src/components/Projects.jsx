import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub } from 'react-icons/fi';
import useSiteContent from '../hooks/useSiteContent.js';
import SectionHeader from './SectionHeader.jsx';

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const { clientProjects } = useSiteContent();
  const listTags = (tags) => String(tags || '').split(',').map((tag) => tag.trim()).filter(Boolean);

  return (
    <section id="projects" className="section-padding bg-ink/70">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Projects"
          title="Client projects and demo websites"
          copy="20+ projects completed — real client work shown separately from demo builds so every project type is clear and professional."
        />

        <div ref={ref}>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-kicker mb-2">Client Work</p>
              <h3 className="font-heading text-3xl font-bold text-white sm:text-4xl">Professional client projects</h3>
              <p className="mt-2 inline-flex rounded-full border border-cyan/25 bg-cyan/10 px-4 py-1.5 text-sm font-bold text-cyan">
                20+ Projects Completed
              </p>
            </div>
            <p className="max-w-xl leading-7 text-slate-400">
              Confirmed, delivered, and in-discussion business websites handled under Built By Amos for real clients and brands.
            </p>
          </div>

          <div className="grid gap-6">
            {clientProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 38 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: index * 0.1, ease: 'easeOut' }}
              className="glass group relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10"
            >
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-cyan/10 blur-2xl transition group-hover:bg-cyan/25" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-tl-full bg-electric/10 transition group-hover:bg-electric/20" />
              <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  {project.status && (
                    <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan">
                      {project.status}
                    </span>
                  )}
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-200">
                    Client Project
                  </span>
                </div>
                <h3 className="font-heading text-3xl font-bold text-white sm:text-4xl">{project.title}</h3>
                <p className="mt-3 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-200">
                  Client: <span className="ml-2 text-cyan">{project.client}</span>
                </p>
                <p className="mt-4 max-w-4xl text-base leading-8 text-slate-300 sm:text-lg">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {listTags(project.tags).map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                </div>
                {project.github && (
                  <div className="flex flex-wrap gap-3 lg:justify-end">
                    <a className="button-secondary px-5 py-2.5" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}>
                      GitHub <FiGithub />
                    </a>
                  </div>
                )}
              </div>
            </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
