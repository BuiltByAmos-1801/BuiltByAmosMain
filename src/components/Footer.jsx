import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiHeart, FiMail, FiPhone } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-5 py-8 sm:px-8 lg:px-12">
      <div className="section-shell flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <img src="/images/builtbyamos-logo.svg" alt="BuiltByAmos logo" className="h-10 w-10 rounded-full object-contain" />
          <p className="flex items-center gap-2 text-sm text-slate-400">
            Built by <span className="font-bold text-white">BuiltByAmos</span> <FiHeart className="text-cyan" /> Copyright 2025
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a className="text-slate-400 transition hover:text-cyan" href="https://github.com/BuiltByAmos-1801" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a className="text-slate-400 transition hover:text-cyan" href="https://www.linkedin.com/in/amos-anand-a1a57b390/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
          <a className="text-slate-400 transition hover:text-cyan" href="https://www.instagram.com/itz.poker__0/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a className="text-slate-400 transition hover:text-cyan" href="mailto:amosanand871@gmail.com" aria-label="Email">
            <FiMail />
          </a>
          <a className="text-slate-400 transition hover:text-cyan" href="tel:+918757603560" aria-label="Phone">
            <FiPhone />
          </a>
        </div>
      </div>
    </footer>
  );
}
