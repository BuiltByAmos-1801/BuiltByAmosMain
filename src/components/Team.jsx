import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiBarChart2, FiFilm, FiSearch, FiCode, FiTrendingUp, FiUsers, FiTool } from 'react-icons/fi';
import { SiPython } from 'react-icons/si';
import { FaInstagram } from 'react-icons/fa';
import SectionHeader from './SectionHeader.jsx';

const teamMembers = [
  {
    name: '★彡[ᴀᴍᴏꜱ]彡★',
    title: 'Founder & Web Developer',
    image: '/images/author.webp',
    description: 'Founder of BuiltByAmos and a web developer who builds modern, scalable websites and web apps. I lead the team, shape the vision, and make sure client projects deliver real value.',
    responsibilities: [
      { title: 'Web Development', icon: FiCode },
      { title: 'Python Development', icon: SiPython },
      { title: 'Client Solutions', icon: FiBarChart2 }
    ],
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/builtbyamos.0/?__pwa=1', icon: FaInstagram }
    ]
  },
  {
    name: 'Malik Raza',
    title: 'Co-founder & Operations Lead',
    image: '/images/malik.png',
    description: 'Co-founder of the company who manages operations and supports client outreach. Malik makes sure clients stay connected and project delivery runs smoothly.',
    responsibilities: [
      { title: 'Operations', icon: FiTool },
      { title: 'Client Outreach', icon: FiUsers },
      { title: 'Business Growth', icon: FiTrendingUp }
    ],
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/malikraza1621?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', icon: FaInstagram }
    ]
  },
  {
    name: 'Arnish 🩶',
    title: 'Lead Generation & Client Manager',
    image: '/images/arnish.png',
    description: 'Arnish focuses on lead generation and client management, helping the team find new opportunities and keep clients informed throughout the project lifecycle.',
    responsibilities: [
      { title: 'Lead Generation', icon: FiTrendingUp },
      { title: 'Client Management', icon: FiUsers },
      { title: 'Client Support', icon: FiTool }
    ],
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/arnish_kumar93?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', icon: FaInstagram }
    ]
  },
  {
    name: 'Sadiq Ali',
    title: 'Video Editing, SEO & Ads Specialist',
    image: '/images/sadiq.png',
    description: 'Sadiq handles video editing, SEO, and advertising for client campaigns. He brings stronger visibility and engagement to client brands across digital channels.',
    responsibilities: [
      { title: 'Video Editing', icon: FiFilm },
      { title: 'SEO', icon: FiSearch },
      { title: 'Advertising', icon: FiBarChart2 }
    ],
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/sadiq__khan0921?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', icon: FaInstagram }
    ]
  }
];

function TeamImage({ member, socials }) {
  const [failed, setFailed] = useState(false);
  const initials = member.name.split(' ').map((n) => n[0]).join('');

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
    <div>
      <img
        src={member.image}
        alt={member.name}
        onError={() => setFailed(true)}
        className="h-full min-h-[22rem] w-full rounded-[1.5rem] object-cover"
      />
      {socials && (
        <div className="mt-6 flex justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="rounded-full border border-white/10 p-3 text-slate-300 transition hover:border-cyan hover:text-cyan"
            >
              <social.icon />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="team" className="section-padding bg-ink/70">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Our Team"
          title="Meet the BuiltByAmos team"
          copy="A team built to turn ideas into growth through web development, marketing, and client success."
        />

        <div className="mt-6 mb-12 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300 shadow-2xl">
          <p className="max-w-4xl text-lg leading-8">
            Our team brings together web development, client management, lead generation, video editing, SEO, and advertising into one powerful growth engine. For each client project, we collaborate closely on planning, execute with precision, and follow up to turn ideas into measurable results.
          </p>
        </div>

        <div ref={ref} className="space-y-16">
          {teamMembers.map((member, index) => (
            <div key={member.name} className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -34 : 34 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.2 }}
                className={`glass rounded-[2rem] p-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <TeamImage member={member} socials={member.socials} />
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
