import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiAlertTriangle, FiArrowUpRight, FiCheck, FiPhoneCall, FiZap } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import SectionHeader from './SectionHeader.jsx';

const packages = [
  {
    name: 'Starter Package',
    price: '₹7,999',
    fit: 'Best For Small Businesses',
    accent: 'from-emerald-400 to-cyan',
    glow: 'bg-emerald-400/20',
    button: 'Get Started',
    features: [
      '1-3 Pages Website',
      'Mobile Responsive Design',
      'WhatsApp Chat Integration',
      'Contact Form',
      'Basic SEO Setup',
      'Fast Loading Website',
      'Social Media Integration',
      'Free 1 Month Support'
    ]
  },
  {
    name: 'Professional Package',
    price: '₹14,999',
    fit: 'Most Popular',
    accent: 'from-cyan to-electric',
    glow: 'bg-cyan/20',
    button: 'Choose Professional',
    popular: true,
    features: [
      '5-8 Pages Premium Website',
      'Advanced SEO Optimization',
      'Premium UI/UX Design',
      'Google Search Indexing',
      'Testimonials Section',
      'Gallery / Portfolio',
      'Blog Setup',
      'Speed Optimization',
      'Business Email Integration',
      'Free Maintenance'
    ]
  },
  {
    name: 'Business Growth Package',
    price: '₹24,999+',
    fit: 'Best For Growing Brands',
    accent: 'from-violet-400 to-electric',
    glow: 'bg-violet-500/20',
    button: 'Scale My Business',
    features: [
      'Custom Dynamic Website',
      'Admin Panel',
      'Lead Generation Setup',
      'Analytics Dashboard',
      'Payment Gateway',
      'Advanced SEO',
      'Automation Features',
      'Landing Pages',
      'Priority Support',
      'Monthly Maintenance'
    ]
  }
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="pricing" className="section-padding relative overflow-hidden bg-midnight">
      <div className="absolute inset-0 bg-grid bg-[length:52px_52px] opacity-40" />
      <div className="absolute left-[-12rem] top-20 h-80 w-80 rounded-full bg-cyan/10 blur-3xl" />
      <div className="absolute bottom-[-10rem] right-[-8rem] h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="section-shell relative z-10">
        <SectionHeader
          eyebrow="Pricing"
          title="Web Development Packages"
          copy="Professional Websites That Grow Your Business Online"
        />

        <div ref={ref} className="grid gap-6 lg:grid-cols-3">
          {packages.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: index * 0.12, ease: 'easeOut' }}
              className={`glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition duration-300 hover:border-cyan/40 hover:shadow-glow sm:p-8 ${
                item.popular ? 'border-cyan/45 ring-1 ring-cyan/40 lg:-mt-5 lg:mb-5' : ''
              }`}
            >
              <div className={`absolute -right-16 -top-16 h-44 w-44 rounded-full ${item.glow} blur-3xl transition group-hover:scale-125`} />
              <div className={`absolute inset-x-8 top-0 h-px bg-gradient-to-r ${item.accent}`} />

              <div className="relative flex flex-1 flex-col">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-2xl text-slate-950 shadow-glow`}>
                    <FiZap />
                  </div>
                  {item.popular && (
                    <span className="rounded-full bg-cyan px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-950">
                      Most Popular
                    </span>
                  )}
                </div>

                <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan">{item.fit}</p>
                <h3 className="mt-3 font-heading text-3xl font-bold text-white">{item.name}</h3>
                <p className={`mt-5 bg-gradient-to-r ${item.accent} bg-clip-text font-heading text-5xl font-black text-transparent`}>
                  {item.price}
                </p>

                <ul className="mt-8 flex-1 space-y-4">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm font-semibold leading-6 text-slate-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-xs text-cyan">
                        <FiCheck />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a className="button-primary mt-8 w-full" href="#contact">
                  {item.button} <FiArrowUpRight />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.36, ease: 'easeOut' }}
          className="mx-auto mt-8 max-w-3xl rounded-3xl border border-cyan/20 bg-cyan/10 p-5 text-center shadow-glow"
        >
          <p className="flex flex-col items-center justify-center gap-2 text-sm font-bold text-white sm:flex-row">
            <span className="inline-flex items-center gap-2 text-cyan">
              <FiAlertTriangle /> Domain & Hosting Charges Separate
            </span>
            <span className="hidden text-slate-500 sm:inline">|</span>
            <span className="text-slate-300">
              Charged separately according to client requirements.
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
          className="glass mt-10 overflow-hidden rounded-3xl p-6 sm:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan">BuiltByAmos</p>
              <h3 className="mt-2 font-heading text-3xl font-bold text-white">Need a Custom Website Solution?</h3>
              <p className="mt-4 max-w-3xl leading-8 text-slate-300">
                Book a free consultation for custom website development, SEO, automation, admin panels, or growth-focused landing pages.
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-slate-400">
                <a className="inline-flex items-center gap-2 transition hover:text-cyan" href="https://www.instagram.com/builtbyamos.0/" target="_blank" rel="noreferrer">
                  <FaInstagram /> @builtbyamos.0
                </a>
              </div>
            </div>
            <a className="button-primary whitespace-nowrap" href="#contact">
              <FiPhoneCall /> Book Free Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
