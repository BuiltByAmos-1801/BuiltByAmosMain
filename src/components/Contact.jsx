import emailjs from '@emailjs/browser';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import SectionHeader from './SectionHeader.jsx';

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/BuiltByAmos-1801', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amos-anand-a1a57b390/', icon: FaLinkedinIn },
  { label: 'Instagram', href: 'https://www.instagram.com/itz.poker__0/', icon: FaInstagram },
  { label: 'Email', href: 'mailto:amosanand871@gmail.com', icon: FiMail }
];

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitWithMailto = () => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:amosanand871@gmail.com?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'idle', message: '' });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in every field before sending.' });
      return;
    }

    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
        setStatus({ type: 'success', message: 'Message sent successfully. I will reply soon.' });
      } else {
        submitWithMailto();
        setStatus({ type: 'success', message: 'Your email app is ready with the message filled in.' });
      }
      setForm(initialForm);
    } catch {
      submitWithMailto();
      setStatus({ type: 'success', message: 'EmailJS was unavailable, so your email app is ready instead.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Contact"
          title="Let us build something useful"
          copy="For freelance work, collaborations, or project discussions, send a message and I will get back to you."
        />

        <div ref={ref} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -34 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <h3 className="font-heading text-2xl font-bold text-white">Contact details</h3>
            <div className="mt-6 space-y-5">
              <a className="flex items-center gap-4 text-slate-300 transition hover:text-cyan" href="mailto:amosanand871@gmail.com">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/10 text-cyan">
                  <FiMail />
                </span>
                amosanand871@gmail.com
              </a>
              <a className="flex items-center gap-4 text-slate-300 transition hover:text-cyan" href="tel:+918757603560">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/10 text-cyan">
                  <FiPhone />
                </span>
                +91 8757603560
              </a>
              <div className="flex items-center gap-4 text-slate-300">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/10 text-cyan">
                  <FiMapPin />
                </span>
                Ranchi, Jharkhand, India
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-300 transition hover:-translate-y-1 hover:border-cyan hover:text-cyan"
                  aria-label={link.label}
                >
                  <link.icon />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            ref={formRef}
            initial={{ opacity: 0, x: 34 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            onSubmit={onSubmit}
            className="glass rounded-3xl p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-300">Name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-300">Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-slate-300">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows="6"
                className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan"
                placeholder="Tell me about your project"
              />
            </label>
            {status.message && (
              <p className={`mt-4 text-sm font-semibold ${status.type === 'error' ? 'text-red-300' : 'text-cyan'}`}>
                {status.message}
              </p>
            )}
            <button disabled={isSubmitting} className="button-primary mt-6 disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? 'Sending...' : 'Send Message'} <FiSend />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
