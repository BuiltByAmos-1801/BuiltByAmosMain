import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiCode,
  FiGlobe,
  FiMonitor,
  FiSearch,
  FiSettings,
  FiShoppingBag,
  FiStar,
  FiTool,
  FiUser
} from 'react-icons/fi';
import useSiteContent from '../hooks/useSiteContent.js';
import SectionHeader from './SectionHeader.jsx';

const serviceIcons = [FiMonitor, FiShoppingBag, FiSearch, FiUser, FiSettings, FiCode, FiTool, FiGlobe];

export default function ServicesTestimonialsBlog() {
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const blogRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true, margin: '-120px' });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-120px' });
  const blogInView = useInView(blogRef, { once: true, margin: '-120px' });
  const { services, testimonials, blogs } = useSiteContent();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    if (!testimonials.length || !testimonialsInView || document.hidden) return undefined;
    const timer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [testimonials.length, testimonialsInView]);

  const showPrevious = () => {
    if (!testimonials.length) return;
    setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const showNext = () => {
    if (!testimonials.length) return;
    setActiveTestimonial((current) => (current + 1) % testimonials.length);
  };

  const testimonial = testimonials[activeTestimonial] || {};
  const isSquareImage = testimonial.imageStyle === 'square' || testimonial.image?.includes('blackyserieschill');
  const clientName =
    testimonial.client ||
    {
      'Oracle Tattoo Studio': 'Jenny',
      'Gift Hub': 'Vishal Pandey',
      'Blacky Series Chill': 'Sadiq'
    }[testimonial.name];

  return (
    <>
      <section id="services" className="section-padding bg-midnight">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Services"
            title="Website, Video, SEO & Digital Marketing"
            copy="Built By Amos delivers website design, video shoot & editing, digital marketing & branding, and SEO & online growth solutions in Ranchi, Jharkhand and across India."
          />

          <div ref={servicesRef} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 36 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.62, delay: index * 0.07, ease: 'easeOut' }}
                className="glass group relative min-h-[240px] overflow-hidden rounded-3xl p-6 transition duration-300 hover:border-cyan/45 hover:shadow-glow"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-electric/20 blur-2xl transition group-hover:bg-cyan/30" />
                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan/25 bg-cyan/10 text-2xl text-cyan transition group-hover:scale-110 group-hover:bg-cyan group-hover:text-slate-950">
                    {(() => {
                      const Icon = serviceIcons[index % serviceIcons.length];
                      return <Icon />;
                    })()}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white">{service.title}</h3>
                  <p className="mt-4 leading-7 text-slate-400">{service.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="section-padding bg-ink/70">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Testimonials"
            title="What Our Clients Say"
            copy="Trusted by growing businesses and startups."
          />

          <motion.div
            ref={testimonialsRef}
            initial={{ opacity: 0, y: 34 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.72, ease: 'easeOut' }}
            className="glass relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10"
          >
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                {testimonial?.image ? (
                  <div
                    className={`group relative flex items-center justify-center overflow-hidden rounded-3xl border border-cyan/25 bg-gradient-to-br from-cyan/15 via-white/[0.05] to-electric/10 shadow-glow ${
                      isSquareImage
                        ? 'h-48 w-full max-w-xs p-4'
                        : 'h-40 w-full max-w-xs p-4 sm:h-48'
                    }`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,255,255,0.22),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(59,130,246,0.22),transparent_36%)] opacity-80" />
                    <div className="absolute right-4 top-4 rounded-full border border-white/15 bg-slate-950/75 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                      Client Work
                    </div>
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name} client testimonial image`}
                      loading="lazy"
                      className={`relative rounded-2xl border border-white/10 bg-slate-950/70 p-2 transition duration-500 group-hover:scale-[1.04] ${
                        isSquareImage ? 'h-36 w-36' : 'h-full w-full'
                      } object-contain`}
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan to-electric text-3xl font-black text-slate-950 shadow-glow">
                    {testimonial?.avatar || testimonial?.name?.slice(0, 2) || 'BB'}
                  </div>
                )}
                <h3 className="mt-6 font-heading text-3xl font-bold text-white">{testimonial?.name}</h3>
                {clientName && (
                  <p className="mt-3 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-200">
                    Client: <span className="ml-2 text-cyan">{clientName}</span>
                  </p>
                )}
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-cyan">{testimonial?.type}</p>
                <div className="mt-5 flex gap-1 text-xl text-cyan" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FiStar key={index} className="fill-current" />
                  ))}
                </div>
              </div>

              <div>
                <p className="font-heading text-2xl font-semibold leading-10 text-white sm:text-3xl">
                  &ldquo;{testimonial?.review}&rdquo;
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button className="button-secondary h-12 w-12 px-0" onClick={showPrevious} aria-label="Previous testimonial">
                    <FiArrowLeft />
                  </button>
                  <button className="button-secondary h-12 w-12 px-0" onClick={showNext} aria-label="Next testimonial">
                    <FiArrowRight />
                  </button>
                  <div className="ml-1 flex gap-2">
                    {testimonials.map((item, index) => (
                      <button
                        key={item.name}
                        onClick={() => setActiveTestimonial(index)}
                        className={`h-2.5 rounded-full transition ${index === activeTestimonial ? 'w-8 bg-cyan' : 'w-2.5 bg-white/20'}`}
                        aria-label={`Show testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="blog" className="section-padding bg-midnight">
        <div className="section-shell">
          <SectionHeader
            eyebrow="Blog"
            title="Latest Insights & SEO Tips"
            copy="Helpful articles to grow your business online."
          />

          <div ref={blogRef} className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {blogs.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 34 }}
                animate={blogInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: index * 0.08, ease: 'easeOut' }}
                className="glass group flex h-full overflow-hidden rounded-3xl"
              >
                <div className="flex min-h-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={`${post.title} blog image for Built By Amos SEO services`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-cyan backdrop-blur">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm font-semibold text-slate-500">{post.date}</p>
                    <h3 className="mt-3 font-heading text-xl font-bold leading-7 text-white">{post.title}</h3>
                    <p className="mt-3 flex-1 leading-7 text-slate-400">{post.excerpt}</p>
                    <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan transition hover:text-white">
                      Read More <FiBriefcase />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
