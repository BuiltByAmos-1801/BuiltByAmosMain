import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import SectionHeader from './SectionHeader.jsx';

const projects = [
  {
    title: 'Oracle Tattoo Studio Website',
    description:
      'Freelance project discussion for Oracle Tattoo Studio in Ranchi, Jharkhand. Work will start after the meeting and final confirmation.',
    tags: ['Website Planning', 'Client Meeting', 'Ranchi'],
    featured: true,
    status: 'Confirmation Pending'
  },
  {
    title: 'BBA Demo Cafe Website',
    description: 'A responsive cafe demo website built to showcase menu, ambience, offers, and customer-friendly browsing.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://builtbyamos-1801.github.io/BBA-DEMO-CAFE/',
    github: 'https://github.com/BuiltByAmos-1801/BBA-DEMO-CAFE.git'
  },
  {
    title: 'BBA Demo Gym Website',
    description: 'A modern fitness website demo with strong visuals, service sections, and a polished gym brand presentation.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://builtbyamos-1801.github.io/BBA-DEMO-GYM/',
    github: 'https://github.com/BuiltByAmos-1801/BBA-DEMO-GYM.git'
  },
  {
    title: 'BBA Demo Coaching Centre',
    description: 'A coaching centre demo website for courses, admissions, trust-building content, and student-focused sections.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://builtbyamos-1801.github.io/BBA-DEMO-COACHING_CENTRE/',
    github: 'https://github.com/BuiltByAmos-1801/BBA-DEMO-COACHING_CENTRE.git'
  }
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="projects" className="section-padding bg-ink/70">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Projects"
          title="Selected work and upcoming builds"
          copy="A focused look at freelance work, hands-on development, and products that are currently being shaped."
        />

        <div ref={ref} className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 38 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -8 }}
              className={`glass group relative overflow-hidden rounded-3xl p-6 ${
                project.featured ? 'md:col-span-2 lg:p-8' : ''
              }`}
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-cyan/10 transition group-hover:bg-cyan/20" />
              <div className="relative">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  {project.comingSoon && (
                    <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan">
                      Coming Soon
                    </span>
                  )}
                  {project.status && (
                    <span className="rounded-full border border-cyan/25 bg-cyan/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan">
                      {project.status}
                    </span>
                  )}
                  {project.featured && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-200">
                      Freelance Project
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-2xl font-bold text-white sm:text-3xl">{project.title}</h3>
                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {(project.tags || []).map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                {(project.live || project.github) && (
                  <div className="mt-7 flex flex-wrap gap-3">
                    {project.live && (
                      <a className="button-primary px-5 py-2.5" href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`}>
                        Live Demo <FiExternalLink />
                      </a>
                    )}
                    {project.github && (
                      <a className="button-secondary px-5 py-2.5" href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub`}>
                        GitHub <FiGithub />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
