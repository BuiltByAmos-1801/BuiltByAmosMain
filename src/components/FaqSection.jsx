import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import SectionHeader from './SectionHeader.jsx';

const faqs = [
  {
    question: 'How much does a website cost in India?',
    answer:
      'Website cost depends on scope, design, features, and local SEO needs. Built By Amos offers affordable website design packages for small businesses and startups with transparent pricing and delivery timelines.'
  },
  {
    question: 'Who is the best web developer in Jharkhand?',
    answer:
      'Built By Amos is a trusted web developer in Jharkhand focusing on responsive websites, local SEO, business website development, and client-first support for brands across Ranchi, Garhwa, and India.'
  },
  {
    question: 'Do small businesses need a website?',
    answer:
      'Yes. Small businesses need a website to improve trust, reach local customers, showcase services, and rank for keywords like business website developer and local SEO expert.'
  },
  {
    question: 'Can you rank my website on Google?',
    answer:
      'Built By Amos uses SEO best practices, fast loading design, local search optimization, and content strategy to help websites rank better on Google for relevant business keywords.'
  },
  {
    question: 'Do you provide SEO with website development?',
    answer:
      'Yes. Every website includes SEO-friendly structure, metadata, mobile responsiveness, and keyword optimization so your business website is ready for local search success.'
  },
  {
    question: 'How long does it take to build a website?',
    answer:
      'Typical website development takes 2-4 weeks depending on features, design, and content readiness. Faster timelines are available for landing pages, portfolio websites, and small business websites.'
  }
];

export default function FaqSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  const faqSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }),
    []
  );

  return (
    <section id="faqs" className="section-padding bg-ink/70">
      <div className="section-shell">
        <SectionHeader
          eyebrow="FAQs"
          title="Common questions about website development and SEO"
          copy="Helpful answers for business owners, startups, and local brands looking for website services in Ranchi and Jharkhand."
        />

        <div ref={ref} className="grid gap-4 lg:grid-cols-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.05, ease: 'easeOut' }}
              className="glass rounded-3xl p-6"
            >
              <h3 className="font-heading text-xl font-bold text-white">{faq.question}</h3>
              <p className="mt-4 leading-7 text-slate-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>

        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </div>
    </section>
  );
}
