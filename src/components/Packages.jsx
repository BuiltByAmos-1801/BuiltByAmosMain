import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiCheck, FiClock, FiGlobe, FiMail, FiMapPin, FiPhone, FiPlus, FiX } from 'react-icons/fi';
import SectionHeader from './SectionHeader.jsx';

const planNames = ['Basic', 'Standard', 'Premium'];
const profile = {
  name: 'Amos Anand',
  serviceTitle: 'Web Development Services',
  location: 'Ranchi Kathitand',
  email: 'builtbyamos@gmail.com',
  phone: '8757603560',
  website: 'https://builtbyamos.great-site.net'
};

const addOns = [
  { service: 'Logo Design', price: 'Rs. 500 - Rs. 1,000' },
  { service: 'Extra Page', price: 'Rs. 500/page' },
  { service: 'Annual Maintenance', price: 'Rs. 1,500/year' },
  { service: 'SEO Monthly', price: 'Rs. 2,000/month' }
];

const packages = [
  {
    category: 'Coaching Centre',
    summary: 'Course, teachers, results, enquiries, and admission-focused website packages.',
    prices: ['Rs. 6,000', 'Rs. 9,000', 'Rs. 13,000'],
    pages: ['4 Pages', '6 Pages', '8+ Pages'],
    delivery: ['3-4 Days', '5-7 Days', '7-10 Days'],
    plans: [
      ['Home, About, Courses, Contact', 'Mobile Friendly Design', 'WhatsApp Button', 'Contact Form', 'Basic SEO', '1 Year Hosting + Domain'],
      ['Home, About, Courses & Fees, Teachers, Results, Contact', 'Mobile Friendly Design', 'WhatsApp Button', 'Fee Structure Table', 'Teachers Profiles', 'Google Maps Integration', 'Google My Business Setup', 'Social Media Links', 'Speed Optimization', 'Basic SEO'],
      ['Home, About, Courses & Fees, Teachers, Results, Gallery, Testimonials, Blog, Contact', 'Mobile Friendly Design', 'WhatsApp Chat Widget', 'Student Enquiry Form', 'Fee Structure Table', 'Google Maps Integration', 'Google My Business Setup', 'Advanced SEO', 'Blog Section', '6 Months Free Support', '1 Free Update Per Month']
    ]
  },
  {
    category: 'Clinic',
    summary: 'Doctor profile, services, appointment, timings, and trust-building clinic website packages.',
    prices: ['Rs. 6,000', 'Rs. 9,000', 'Rs. 13,000'],
    pages: ['4 Pages', '6 Pages', '8+ Pages'],
    delivery: ['3-4 Days', '5-7 Days', '7-10 Days'],
    plans: [
      ['Home, About Doctor, Services, Contact', 'Mobile Friendly Design', 'WhatsApp Button', 'Appointment Form', 'Clinic Timing Section', 'Basic SEO', '1 Year Hosting + Domain'],
      ['Home, About Doctor, Services, Doctors/Staff, Gallery, Contact', 'Mobile Friendly Design', 'WhatsApp Button', 'Appointment Form', 'Doctors/Staff Profiles', 'Clinic Timing Section', 'Google Maps Integration', 'Google My Business Setup', 'Social Media Links', 'Speed Optimization', 'Basic SEO'],
      ['Home, About Doctor, Services, Doctors/Staff, Gallery, Patient Testimonials, Blog, Contact', 'Mobile Friendly Design', 'WhatsApp Chat Widget', 'Online Appointment Booking', 'Doctors/Staff Profiles', 'Clinic Timing Section', 'Google Maps Integration', 'Google My Business Setup', 'Advanced SEO', 'Health Tips Blog', '6 Months Free Support', '1 Free Update Per Month']
    ]
  },
  {
    category: 'Gym',
    summary: 'Programs, trainers, memberships, transformations, and fitness lead website packages.',
    prices: ['Rs. 5,000', 'Rs. 8,000', 'Rs. 12,000'],
    pages: ['4 Pages', '6 Pages', '8+ Pages'],
    delivery: ['3-4 Days', '5-7 Days', '7-10 Days'],
    plans: [
      ['Home, Programs, Trainers, Contact', 'Mobile Friendly Design', 'WhatsApp Button', 'Enquiry Form', 'Timing Section', 'Basic SEO', '1 Year Hosting + Domain'],
      ['Home, Programs, Trainers, Membership Plans, Gallery, Contact', 'Mobile Friendly Design', 'WhatsApp Button', 'Enquiry Form', 'Trainer Profiles', 'Membership Plans Table', 'Timing Section', 'Google Maps Integration', 'Google My Business Setup', 'Social Media Links', 'Speed Optimization', 'Basic SEO'],
      ['Home, Programs, Trainers, Membership Plans, Gallery, Transformation Stories, Blog, Contact', 'Mobile Friendly Design', 'WhatsApp Chat Widget', 'Online Membership Form', 'Trainer Profiles', 'Membership Plans Table', 'Google Maps Integration', 'Google My Business Setup', 'Advanced SEO', 'Transformation Stories Section', 'Diet & Fitness Tips Blog', '6 Months Free Support', '1 Free Update Per Month']
    ]
  },
  {
    category: 'Restaurant',
    summary: 'Menu, booking, gallery, reviews, offers, and online order-ready website packages.',
    prices: ['Rs. 5,000', 'Rs. 8,000', 'Rs. 12,000'],
    pages: ['4 Pages', '6 Pages', '7+ Pages'],
    delivery: ['3-4 Days', '5-7 Days', '7-10 Days'],
    plans: [
      ['Home, Menu, About Us, Contact', 'Mobile Friendly Design', 'WhatsApp Order Button', 'Location Map', 'Timing Section', 'Basic SEO', '1 Year Hosting + Domain'],
      ['Home, Menu, About Us, Gallery, Special Offers, Contact', 'Mobile Friendly Design', 'WhatsApp Order Button', 'Online Table Booking Form', 'Photo Gallery', 'Special Offers Section', 'Location Map', 'Google My Business Setup', 'Social Media Links', 'Speed Optimization', 'Basic SEO'],
      ['Home, Full Digital Menu, About Us, Gallery, Special Offers, Reviews, Contact', 'Mobile Friendly Design', 'WhatsApp Chat Widget', 'Online Table Booking Form', 'Full Digital Menu With Images', 'Photo Gallery', 'Festive Offer Popup', 'Customer Reviews Section', 'Google My Business Setup', 'Advanced SEO', '6 Months Free Support', '1 Free Update Per Month']
    ]
  },
  {
    category: 'Cafe',
    summary: 'Menu, ambience, gallery, pre-orders, events, and cafe brand website packages.',
    prices: ['Rs. 5,000', 'Rs. 7,000', 'Rs. 11,000'],
    pages: ['4 Pages', '6 Pages', '7+ Pages'],
    delivery: ['3-4 Days', '5-7 Days', '7-10 Days'],
    plans: [
      ['Home, Menu, About Us, Contact', 'Mobile Friendly Design', 'WhatsApp Button', 'Location Map', 'Timing Section', 'Basic SEO', '1 Year Hosting + Domain'],
      ['Home, Menu, About Us, Gallery, Special Drinks & Offers, Contact', 'Mobile Friendly Design', 'WhatsApp Button', 'Online Pre-Order Form', 'Photo Gallery', 'Special Drinks Section', 'Social Media Feed', 'Google My Business Setup', 'Social Media Links', 'Speed Optimization', 'Basic SEO'],
      ['Home, Full Visual Menu, About Us, Gallery, Events & Open Mic, Reviews, Contact', 'Mobile Friendly Design', 'WhatsApp Chat Widget', 'Online Pre-Order Form', 'Full Visual Menu With Images', 'Events & Open Mic Section', 'Customer Reviews Section', 'Social Media Feed', 'Google My Business Setup', 'Advanced SEO', '6 Months Free Support', '1 Free Update Per Month']
    ]
  },
  {
    category: 'Shop',
    summary: 'Product listing, offers, location, customer enquiry, and local shop website packages.',
    prices: ['Rs. 4,500', 'Rs. 7,000', 'Rs. 10,000'],
    pages: ['4 Pages', '5 Pages', '6+ Pages'],
    delivery: ['3-4 Days', '5-7 Days', '7-10 Days'],
    plans: [
      ['Home, Products, About Us, Contact', 'Mobile Friendly Design', 'WhatsApp Order Button', 'Location Map', 'Timing Section', 'Basic SEO', '1 Year Hosting + Domain'],
      ['Home, Product Catalogue, About Us, Offers & Discounts, Contact', 'Mobile Friendly Design', 'WhatsApp Order Button', 'Product Catalogue With Images', 'Offers & Discount Section', 'Location Map', 'Google My Business Setup', 'Social Media Links', 'Speed Optimization', 'Basic SEO'],
      ['Home, Full Product Listing, About Us, Offers & Discounts, Customer Reviews, Contact', 'Mobile Friendly Design', 'WhatsApp Chat Widget', 'Full Product Listing With Images', 'Customer Enquiry System', 'Offers & Discount Section', 'Festive Offer Banners', 'Location Map', 'Google My Business Setup', 'Advanced SEO', '6 Months Free Support', '1 Free Update Per Month']
    ]
  }
];

export default function Packages() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const [activePackage, setActivePackage] = useState(null);

  return (
    <section id="packages" className="section-padding bg-ink/70">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Web development services"
          title="Amos Anand - BuiltByAmos packages"
          copy="Choose a business category and open its package details when you want to compare Basic, Standard, and Premium options."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 34 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass mb-8 rounded-3xl p-6 sm:p-8"
        >
          <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <div className="flex items-center gap-4">
                <img
                  src="/images/builtbyamos-logo.svg"
                  alt="Built By Amos website development service logo"
                  loading="lazy"
                  className="h-16 w-16 rounded-2xl bg-white/5 object-contain p-2"
                />
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white">{profile.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-cyan">{profile.serviceTitle}</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-300 sm:grid-cols-2">
                <span className="flex items-center gap-2"><FiMapPin className="text-cyan" /> {profile.location}</span>
                <a className="flex items-center gap-2 transition hover:text-cyan" href={`mailto:${profile.email}`}><FiMail className="text-cyan" /> {profile.email}</a>
                <a className="flex items-center gap-2 transition hover:text-cyan" href={`tel:+91${profile.phone}`}><FiPhone className="text-cyan" /> {profile.phone}</a>
                <a className="flex items-center gap-2 transition hover:text-cyan" href={profile.website} target="_blank" rel="noreferrer"><FiGlobe className="text-cyan" /> {profile.website?.replace('https://', '')}</a>
              </div>
            </div>
            <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-5">
              <p className="font-heading text-xl font-bold text-white">All packages include</p>
              <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-200 sm:grid-cols-2">
                {['1 Year Hosting + Domain', 'Mobile Friendly', 'WhatsApp Button', 'Free Consultation Available', 'Personal Meeting on Request', 'Prices inclusive of GST'].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <FiCheck className="shrink-0 text-cyan" /> {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((item, index) => (
            <motion.article
              key={item.category}
              initial={{ opacity: 0, y: 34 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: index * 0.08, ease: 'easeOut' }}
              className="glass flex h-full flex-col rounded-3xl p-6"
            >
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">Website Package</p>
              <h3 className="mt-3 font-heading text-2xl font-bold text-white">{item.category}</h3>
              <p className="mt-4 flex-1 leading-8 text-slate-400">{item.summary}</p>
              <button onClick={() => setActivePackage(item)} className="button-primary mt-6">
                View Packages
              </button>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass rounded-3xl p-6">
            <h3 className="flex items-center gap-2 font-heading text-2xl font-bold text-white">
              <FiPlus className="text-cyan" /> Add-on Services
            </h3>
            <div className="mt-5 space-y-3">
              {addOns.map((item) => (
                <div key={item.service} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <span className="font-semibold text-slate-200">{item.service}</span>
                  <span className="font-bold text-cyan">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6">
            <h3 className="font-heading text-2xl font-bold text-white">Ready to discuss?</h3>
            <p className="mt-4 leading-8 text-slate-300">
              Free consultation is available. Personal meeting on request. Open any category above to see the full
              Basic, Standard, and Premium package details.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="button-primary" href={`https://wa.me/91${profile.phone}`} target="_blank" rel="noreferrer">
                WhatsApp Now
              </a>
              <a className="button-secondary" href={`mailto:${profile.email}`}>
                Email BuiltByAmos
              </a>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activePackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              className="glass flex max-h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 p-4 sm:p-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">Package Pricing</p>
                  <h3 className="mt-1 font-heading text-2xl font-bold text-white">{activePackage.category}</h3>
                </div>
                <button
                  onClick={() => setActivePackage(null)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition hover:border-cyan hover:text-cyan"
                  aria-label="Close package pricing"
                >
                  <FiX />
                </button>
              </div>

              <div className="overflow-y-auto p-4 sm:p-5">
                <div className="grid gap-5 lg:grid-cols-3">
                  {planNames.map((plan, planIndex) => (
                    <div key={`${activePackage.category}-${plan}`} className="rounded-2xl border border-white/10 bg-slate-950/55 p-5">
                      <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan">{plan}</p>
                      <p className="mt-3 font-heading text-3xl font-bold text-white">{activePackage.prices[planIndex]}</p>
                      <p className="mt-2 text-sm font-semibold text-slate-400">Pages: {activePackage.pages[planIndex]}</p>
                      <ul className="mt-5 space-y-3">
                        {activePackage.plans[planIndex].map((feature) => (
                          <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-300">
                            <FiCheck className="mt-1 shrink-0 text-cyan" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 flex items-center gap-2 text-sm font-bold text-slate-200">
                        <FiClock className="text-cyan" /> Delivery: {activePackage.delivery[planIndex]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
