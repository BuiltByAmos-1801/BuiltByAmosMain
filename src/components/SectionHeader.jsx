import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SectionHeader({ eyebrow, title, copy }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {copy && <p className="mt-4 text-base leading-8 text-slate-300">{copy}</p>}
    </motion.div>
  );
}
