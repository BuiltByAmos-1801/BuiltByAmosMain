import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  FiAward,
  FiCode,
  FiCpu,
  FiExternalLink,
  FiHeadphones,
  FiRadio,
  FiShield,
  FiSun,
  FiTool,
  FiTrendingUp,
  FiX
} from 'react-icons/fi';
import SectionHeader from './SectionHeader.jsx';

const certificates = [
  {
    title: 'Software Product Developer',
    detail: 'Software Product Developer certificate received and completed.',
    status: 'Completed',
    icon: FiCpu,
    certificate: '/certificates/SoftwareProductDeveloper_AmosAnand.pdf'
  },
  {
    title: 'IT Technical Support',
    detail: 'Technical support training is currently in progress.',
    status: 'Running',
    icon: FiTool,
    certificate: '/certificates/IT-Technical-Support_AmosAnand.pdf'
  },
  {
    title: 'IT Customer Care Executive',
    detail: 'Customer case handling and support certificate added.',
    status: 'Completed',
    icon: FiHeadphones,
    certificate: '/certificates/IT-Customer-Care_AmosAnand.pdf'
  },
  {
    title: 'IOT Network Specialist',
    detail: 'Internet of Things networking certificate completed.',
    status: 'Completed',
    icon: FiRadio,
    certificate: '/certificates/IoT_AmosAnand.pdf'
  },
  {
    title: 'Solar Panel Installation Technician',
    detail: 'Solar panel installation technician certificate completed.',
    status: 'Completed',
    icon: FiSun,
    certificate: '/certificates/SolarPanelInstallation_AmosAnand.pdf'
  },
  { title: 'Web Design Development', detail: 'Website design and development training is currently in progress.', status: 'Running', icon: FiCode },
  {
    title: 'Cybersecurity',
    detail: 'Cybersecurity certificate completed.',
    status: 'Completed',
    icon: FiShield,
    certificate: '/certificates/CyberSecurity_AmosAnand.pdf'
  },
  { title: 'Digital Productivity', detail: 'Digital productivity training is currently in progress.', status: 'Running', icon: FiTrendingUp },
  { title: 'Software Testing Engineering', detail: 'Software testing engineering training is currently in progress.', status: 'Running', icon: FiAward },
  { title: 'Digital Mintra', detail: 'Website Development - 3 months completed. Certificate image can be added later.', status: 'Completed', icon: FiCode }
];

export default function Certifications() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const [activeCertificate, setActiveCertificate] = useState(null);

  return (
    <section id="certifications" className="section-padding bg-ink/70">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Certifications"
          title="Credentials and training"
          copy="Short programs and certificates that support hands-on technical work and software development growth."
        />

        <div ref={ref} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {certificates.map((certificate, index) => (
            <motion.article
              key={certificate.title}
              initial={{ opacity: 0, y: 34 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: index * 0.12, ease: 'easeOut' }}
              className="glass rounded-3xl p-6"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan/10 text-2xl text-cyan">
                <certificate.icon />
              </div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-slate-300">
                <FiAward /> {certificate.status}
              </div>
              <h3 className="font-heading text-xl font-bold text-white">{certificate.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{certificate.detail}</p>
              {certificate.certificate ? (
                <button
                  onClick={() => setActiveCertificate(certificate)}
                  className="button-secondary mt-5 px-5 py-2.5"
                >
                  View Certificate <FiExternalLink />
                </button>
              ) : (
                <div className="mt-5 rounded-2xl border border-dashed border-cyan/25 bg-slate-950/45 p-4 text-sm font-semibold text-slate-500">
                  Certificate image slot
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCertificate && (
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
              className="glass relative flex h-[86vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl"
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 p-4 sm:p-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">Certificate Preview</p>
                  <h3 className="mt-1 font-heading text-xl font-bold text-white">{activeCertificate.title}</h3>
                </div>
                <button
                  onClick={() => setActiveCertificate(null)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-white transition hover:border-cyan hover:text-cyan"
                  aria-label="Close certificate preview"
                >
                  <FiX />
                </button>
              </div>
              <iframe
                title={`${activeCertificate.title} certificate`}
                src={activeCertificate.certificate}
                className="min-h-0 flex-1 bg-white"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
