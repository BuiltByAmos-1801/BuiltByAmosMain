import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBriefcase, FiLayers, FiMapPin, FiShoppingBag, FiStar, FiTool } from 'react-icons/fi';
import SectionHeader from './SectionHeader.jsx';

const industries = [
  {
    title: 'Tattoo Studio Website Development',
    description:
      'Custom tattoo studio websites in Ranchi that highlight art, booking details, reviews, and local SEO for studio discovery.',
    icon: FiTool
  },
  {
    title: 'Clothing Store Website Development',
    description:
      'Fashion website design for clothing stores with stylish product showcases, mobile-friendly pages, and online enquiry options.',
    icon: FiShoppingBag
  },
  {
    title: 'Coaching Center Website Design',
    description:
      'Course landing pages and coaching center websites with clear admission information, schedules, and trust-building content.',
    icon: FiLayers
  },
  {
    title: 'Restaurant Website Design',
    description:
      'Restaurant websites for menus, reservations, location, and mobile-friendly ordering, optimized for local restaurant search.',
    icon: FiBriefcase
  },
  {
    title: 'Salon Website Design',
    description:
      'Salon and beauty websites that showcase services, booking details, pricing, and local search visibility for salons in Jharkhand.',
    icon: FiStar
  },
  {
    title: 'Gym Website Design',
    description:
      'Fitness website solutions for gyms and training centers with membership packages, trainers, class schedules, and local SEO support.',
    icon: FiMapPin
  }
];

export default function IndustrySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="industries" className="section-padding bg-midnight">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Industries"
          title="Industry-specific websites for local businesses"
          copy="Built By Amos builds industry-focused websites that match the needs of tattoo studios, clothing stores, coaching centers, restaurants, salons, gyms, and startups."
        />

        <div ref={ref} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry, index) => (
            <motion.article
              key={industry.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: index * 0.05, ease: 'easeOut' }}
              className="glass rounded-3xl border border-white/10 p-6"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan/10 text-2xl text-cyan">
                <industry.icon />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">{industry.title}</h3>
              <p className="mt-4 leading-7 text-slate-400">{industry.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
