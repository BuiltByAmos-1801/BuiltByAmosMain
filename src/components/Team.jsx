import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FiCode } from 'react-icons/fi';
import useSiteContent from '../hooks/useSiteContent.js';
import SectionHeader from './SectionHeader.jsx';

function TeamImage({ member }) {
  const [failed, setFailed] = useState(false);
  const initials = member.name.split(' ').map((n) => n[0]).join('');
  const socials = [
    { label: 'Instagram', href: member.instagram, icon: FaInstagram },
    { label: 'Facebook', href: member.facebook, icon: FaFacebookF },
    { label: 'YouTube', href: member.youtube, icon: FaYoutube },
    { label: 'LinkedIn', href: member.linkedin, icon: FaLinkedinIn }
  ].filter((social) => social.href);

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
      <div className="group relative overflow-hidden rounded-[1.75rem] border border-cyan/20 bg-gradient-to-br from-cyan/15 via-white/[0.06] to-electric/10 p-3 shadow-glow">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(0,255,255,0.22),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(59,130,246,0.22),transparent_34%)] opacity-80" />
        <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950">
          <img
            src={member.image}
            alt={`${member.name} from Built By Amos digital agency team`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full min-h-[22rem] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-5 pt-20">
            <p className="font-heading text-2xl font-bold text-white">{member.name}</p>
            <p className="mt-1 text-sm font-semibold text-white">{member.title}</p>
          </div>
        </div>
        <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-slate-950/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-card backdrop-blur">
          Built By Amos
        </div>
      </div>
      {socials.length > 0 && (
        <div className="mt-6 flex justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} ${social.label}`}
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
  const { team: teamMembers } = useSiteContent();
  const listResponsibilities = (items) => String(items || '').split(',').map((item) => item.trim()).filter(Boolean);

  return (
    <section id="team" className="section-padding bg-ink/70">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Our Team"
          title="Meet the BuiltByAmos team"
          copy="A team built to turn ideas into growth through web development, marketing, and client success."
        />

        <div className="mb-12 mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300 shadow-2xl">
          <p className="max-w-4xl text-lg leading-8">
            Our team brings together web development, client management, lead generation, video editing, SEO, and
            advertising into one powerful growth engine.
          </p>
        </div>

        <div ref={ref} className="space-y-16">
          {teamMembers.map((member, index) => (
            <div key={`${member.name}-${index}`} className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
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
                <p className="mt-5 text-lg leading-8 text-slate-300">{member.description}</p>

                <div className="mt-7 grid gap-4 sm:grid-cols-3">
                  {listResponsibilities(member.responsibilities).map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                        <FiCode />
                      </div>
                      <p className="font-semibold text-slate-200">{item}</p>
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
