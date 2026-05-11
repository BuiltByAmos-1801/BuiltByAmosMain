import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaGoogle, FaStar } from 'react-icons/fa';
import SectionHeader from './SectionHeader.jsx';

export default function GoogleRating() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const rating = import.meta.env.VITE_GOOGLE_RATING || 'Connect';
  const reviewCount = import.meta.env.VITE_GOOGLE_REVIEW_COUNT || 'Google Business API';
  const reviewUrl = import.meta.env.VITE_GOOGLE_REVIEW_URL || 'https://www.google.com/search?q=Amos+Anand+BuiltByAmos';

  return (
    <section id="ratings" className="section-padding">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Google rating"
          title="Client reviews"
          copy="This section is ready for automatic Google rating sync after Google Business Profile API setup."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 34 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass mx-auto max-w-4xl rounded-3xl p-6 sm:p-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl text-slate-950">
                <FaGoogle />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan">BuiltByAmos</p>
                <h3 className="mt-2 font-heading text-3xl font-bold text-white">{rating}</h3>
                <p className="mt-1 text-slate-400">{reviewCount}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex gap-1 text-xl text-cyan">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <a className="button-primary" href={reviewUrl} target="_blank" rel="noreferrer">
                Rate on Google
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
