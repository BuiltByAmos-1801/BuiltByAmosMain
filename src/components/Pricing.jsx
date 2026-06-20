import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiAlertTriangle, FiArrowUpRight, FiCheck, FiClock, FiPhoneCall, FiShield, FiZap } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import SectionHeader from './SectionHeader.jsx';
import { buildPricingPackageMessage, buildWhatsAppUrl } from '../utils/whatsapp.js';

const packages = [
  {
    name: 'Launch Package',
    badge: 'Best For Small Businesses',
    label: 'Starter',
    comparison: 'For New Businesses',
    delivery: '3-5 Days',
    trust: 'Perfect for local businesses and startups',
    accent: 'from-emerald-400 to-cyan',
    glow: 'bg-emerald-400/20',
    features: [
      '1-3 Pages Website',
      'Mobile Responsive Design',
      'WhatsApp Chat Integration',
      'Contact Form',
      'Basic SEO Setup',
      'Google Map Integration',
      'Social Media Integration',
      'SSL Security',
      'Google Search Console Setup',
      '1 Month Free Support'
    ]
  },
  {
    name: 'Business Pro Package',
    badge: 'Most Popular',
    label: 'Pro',
    comparison: 'Best Value',
    delivery: '5-7 Days',
    trust: 'Recommended For Most Businesses',
    accent: 'from-cyan to-electric',
    glow: 'bg-cyan/20',
    popular: true,
    highlight: 'Recommended For Most Businesses',
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
      'Google Business Profile Setup',
      'Custom Animations',
      'Performance Optimization',
      '1 Month Free Maintenance'
    ]
  },
  {
    name: 'Enterprise Growth Package',
    badge: 'Best For Growing Brands',
    label: 'Enterprise',
    comparison: 'Maximum Growth',
    delivery: '7-14 Days',
    trust: 'Built for scale, automation, and serious lead generation',
    accent: 'from-violet-400 to-electric',
    glow: 'bg-violet-500/20',
    features: [
      'Custom Dynamic Website',
      'Web Application Development',
      'Admin Panel',
      'Lead Generation Setup',
      'Analytics Dashboard',
      'Payment Gateway',
      'Advanced SEO',
      'Automation Features',
      'Landing Pages',
      'Priority Support',
      'Monthly Maintenance',
      'Conversion Optimization',
      'CRM Integration',
      'Advanced Performance Optimization'
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
          title="Website Packages Designed to Grow Your Business"
          copy="Professional websites with SEO, performance, and modern UI built for real business growth."
        />

        <div ref={ref} className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
          {packages.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: item.popular ? [0, -8, 0] : 0 } : {}}
              whileHover={{ y: -10 }}
              transition={{
                opacity: { duration: 0.65, delay: index * 0.12, ease: 'easeOut' },
                y: item.popular
                  ? { duration: 5, delay: index * 0.12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                  : { duration: 0.65, delay: index * 0.12, ease: 'easeOut' }
              }}
              className={`pricing-card group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-[1px] ${
                item.popular ? 'pricing-card-popular lg:scale-[1.045]' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-30 transition duration-500 group-hover:opacity-70`} />
              <div className="absolute inset-px rounded-[1.45rem] bg-slate-950/90" />
              <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full ${item.glow} blur-3xl transition duration-500 group-hover:scale-125`} />
              <div className="absolute -bottom-24 left-8 h-44 w-44 rounded-full bg-electric/10 blur-3xl transition duration-500 group-hover:bg-electric/20" />

              <div className="relative flex h-full flex-col rounded-[1.45rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl sm:p-7">
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`inline-flex rounded-full border border-white/10 bg-gradient-to-r ${item.accent} px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-950 shadow-glow`}>
                      {item.badge}
                    </span>
                    <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                      <FiShield className="text-cyan" aria-hidden="true" /> {item.label} → {item.comparison}
                    </p>
                  </div>
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-xl text-slate-950 shadow-glow transition duration-300 group-hover:scale-110`}>
                    <FiZap aria-hidden="true" />
                  </div>
                </header>

                <div className="mt-8 border-t border-white/10 pt-7">
                  <h3 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">{item.name}</h3>
                  <p className="mt-4 text-sm font-semibold leading-6 text-slate-400">{item.trust}</p>
                  <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1.5 text-sm font-bold text-cyan">
                    <FiClock aria-hidden="true" /> Delivery: {item.delivery}
                  </p>
                </div>

                {item.highlight && (
                  <p className="mt-5 rounded-2xl border border-cyan/25 bg-cyan/10 px-4 py-3 text-center text-sm font-black text-white shadow-glow">
                    ⭐ {item.highlight}
                  </p>
                )}

                <ul className="mt-7 flex-1 space-y-3" aria-label={`${item.name} features`}>
                  {item.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm font-semibold leading-6 text-slate-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan/10 text-xs text-cyan ring-1 ring-cyan/20">
                        <FiCheck aria-hidden="true" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-offset-2 focus:ring-offset-midnight ${
                    item.popular
                      ? 'bg-gradient-to-r from-cyan to-electric text-slate-950 shadow-[0_0_34px_rgba(0,255,255,0.35)] hover:-translate-y-1 hover:shadow-[0_0_48px_rgba(0,255,255,0.48)]'
                      : 'border border-cyan/35 bg-cyan/10 text-cyan hover:-translate-y-1 hover:border-cyan hover:bg-cyan hover:text-slate-950 hover:shadow-glow'
                  }`}
                  href={buildWhatsAppUrl(
                    buildPricingPackageMessage({
                      name: item.name,
                      label: item.label
                    })
                  )}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Start project with ${item.name} on WhatsApp`}
                >
                  Start Project <FiArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.36, ease: 'easeOut' }}
          className="mx-auto mt-10 max-w-3xl rounded-3xl border border-cyan/20 bg-cyan/10 p-5 text-center shadow-glow"
        >
          <p className="flex flex-col items-center justify-center gap-2 text-sm font-bold text-white sm:flex-row">
            <span className="inline-flex items-center gap-2 text-cyan">
              <FiAlertTriangle aria-hidden="true" /> Domain & Hosting Charges Separate
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
                Book a free consultation for custom website development, application development, SEO, automation, admin panels, or growth-focused landing pages.
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-slate-400">
                <a className="inline-flex items-center gap-2 transition hover:text-cyan" href="https://www.instagram.com/builtbyamos.0/" target="_blank" rel="noreferrer">
                  <FaInstagram aria-hidden="true" /> @builtbyamos.0
                </a>
              </div>
            </div>
            <a className="button-primary whitespace-nowrap" href="#contact">
              <FiPhoneCall aria-hidden="true" /> Book Free Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
