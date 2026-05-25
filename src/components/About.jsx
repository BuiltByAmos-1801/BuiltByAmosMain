import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiMapPin, FiMonitor, FiTerminal } from 'react-icons/fi';
import SectionHeader from './SectionHeader.jsx';

const stats = [
  { label: 'Years in Development', value: '3+' },
  { label: 'Projects Delivered', value: '15+' },
  { label: 'Agency', value: 'BuiltByAmos' }
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="about" className="section-padding bg-ink/70">
      <div className="section-shell">
        <SectionHeader
          eyebrow="About me"
          title="A developer building practical digital products"
          copy="I enjoy turning ideas into polished web experiences and Python-powered tools that solve real problems."
        />

        <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan/30 to-electric/20 blur-2xl" />
            <div className="glass relative aspect-[4/5] rounded-[2rem] p-5">
              <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-cyan/20 bg-slate-950/75">
                <img
                  src="/images/Amos_Anand.JPG"
                  alt="Amos Anand, founder of Built By Amos and web developer in Ranchi"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent p-6 text-center">
                  <h3 className="font-heading text-2xl font-bold text-white">Amos Anand</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-300">Web Developer & Python Developer</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-lg leading-8 text-slate-300">
              I'm Amos Anand, founder of <span className="font-bold text-cyan">Built By Amos</span> — a full-service web development agency based in Ranchi, Jharkhand. I specialize in web developer services, business website development, React website design, and Python automation for local brands and startups.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Our work focuses on responsive website design, mobile friendly development, local SEO optimization, and fast loading website performance. Every project is built to help small businesses improve Google rankings and convert visitors into customers.
            </p>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Through <span className="font-bold text-cyan">Built By Amos</span>, we help tattoo studios, clothing stores, coaching centres, salons, gyms, and restaurants across Jharkhand and India establish stronger digital presence with practical, scalable websites.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-5">
                  <p className="font-heading text-3xl font-bold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: FiMapPin, text: 'Ranchi, Jharkhand' },
                { icon: FiMonitor, text: 'Frontend Development' },
                { icon: FiTerminal, text: 'Python Automation' }
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                    <item.icon />
                  </span>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
