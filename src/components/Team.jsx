import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiBarChart2, FiFilm, FiSearch, FiCode } from 'react-icons/fi';
import { SiPython } from 'react-icons/si';
import SectionHeader from './SectionHeader.jsx';

const teamMembers = [
  {
    name: 'Sadiq Khan',
    title: 'Creative & Growth Partner',
    image: '/images/team/sadiq-khan.png',
    description: 'Sadiq Khan handles video editing, small business social media ads, and SEO work for BuiltByAmos. His role supports clients who need stronger online visibility, sharper content, and better local growth.',
    responsibilities: [
      { title: 'Video Editing', icon: FiFilm },
      { title: 'Small Business Ads', icon: FiBarChart2 },
      { title: 'SEO Support', icon: FiSearch }
    ]
  },
  {
    name: 'Amos Anand',
    title: 'Web & Python Developer',
    image: '/images/team/amos-anand.jpg',
    description: 'Amos Anand is a Web Developer and Python Developer who builds modern, scalable web applications and provides backend solutions. He focuses on creating robust digital experiences and automating business processes.',
    responsibilities: [
      { title: 'Web Development', icon: FiCode },
      { title: 'Python Development', icon: FiPython },
      { title: 'Full Stack Solutions', icon: FiBarChart2 }
    ]
  }
];

const responsibilities = [
  { title: 'Video Editing', icon: FiFilm },
  { title: 'Small Business Ads', icon: FiBarChart2 },
  { title: 'SEO Support', icon: FiSearch }
];

function TeamImage({ member }) {
  const [failed, setFailed] = useState(false);
  const initials = member.name.split(' ').map(n => n[0]).join('');

  if (failed) {
    return (
      <div className="flex h-full min-h-[22rem] items-center justify-center rounded-[1.5rem] border border-cyan/20 bg-slate-950/75">
        <div className="text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 font-heading text-4xl font-bold text-cyan">
            {initials}
          </div>
          <p className="mt-5 text-sm font-semibold text-slate-400">Add photo at {member.image}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={member.image}
      alt={member.name}
      onError={() => setFailed(true)}
      className="h-full min-h-[22rem] w-full rounded-[1.5rem] object-cover"
    />
  );
}

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="team" className="section-padding bg-ink/70">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Team"
          title="People behind BuiltByAmos"
          copy="A growing team focused on websites, content, ads, and digital growth for local businesses."
        />

        <div ref={ref} className="space-y-12">
          {teamMembers.map((member, index) => (
            <div key={member.name} className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -34 : 34 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.2 }}
                className={`glass rounded-[2rem] p-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <TeamImage member={member} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 34 : -34 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.2 }}
                className={`glass rounded-3xl p-6 sm:p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan">{member.title}</p>
                <h3 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">{member.name}</h3>
                <p className="mt-5 text-lg leading-8 text-slate-300">
                  {member.description}
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-3">
                  {member.responsibilities.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                        <item.icon />
                      </div>
                      <p className="font-semibold text-slate-200">{item.title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
