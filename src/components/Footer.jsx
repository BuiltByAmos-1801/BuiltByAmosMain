import { FaGithub, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useState } from 'react';
import { FiExternalLink, FiHeart, FiMail, FiPhone, FiShield } from 'react-icons/fi';

const googleMapsUrl =
  'https://www.google.com/maps/place/Built+By+Amos/@23.3432048,85.3213263,12z/data=!4m16!1m9!3m8!1s0x4a3fc7fbfa2c4d35:0xea72bbafd57f2b89!2sBuilt+By+Amos!8m2!3d23.3432048!4d85.3213263!9m1!1b1!16s%2Fg%2F11z7cmc6jm!3m5!1s0x4a3fc7fbfa2c4d35:0xea72bbafd57f2b89!8m2!3d23.3432048!4d85.3213263!16s%2Fg%2F11z7cmc6jm?entry=ttu';

export default function Footer() {
  const [showMap, setShowMap] = useState(false);

  return (
    <footer className="border-t border-white/10 bg-ink px-5 py-8 sm:px-8 lg:px-12">
      {/* Map Section */}
      <div className="section-shell mb-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-center text-lg font-bold text-white sm:text-left">Find Built By Amos in Ranchi</h2>
          <a
            className="inline-flex items-center justify-center gap-2 text-sm font-bold text-cyan transition hover:text-white"
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open Google Maps <FiExternalLink />
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          {showMap ? (
            <iframe
              src="https://www.google.com/maps?q=Built%20By%20Amos%2023.3432048,85.3213263&z=15&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Built By Amos Google Maps location in Ranchi"
              className="w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setShowMap(true)}
              className="flex h-[220px] w-full flex-col items-center justify-center gap-3 bg-slate-950/60 px-5 text-center transition hover:bg-slate-900 sm:h-[300px]"
            >
              <span className="font-heading text-xl font-bold text-white">Built By Amos, Ranchi</span>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-cyan">
                Load map <FiExternalLink />
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Contact and Social Section */}
      <div className="section-shell flex flex-col items-center justify-between gap-8 text-center sm:flex-row sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <div className="flex items-center gap-3">
            <img
              src="/images/builtbyamos-logo.svg"
              alt="Built By Amos MSME registered company logo"
              loading="lazy"
              className="h-10 w-10 rounded-full object-contain"
            />
            <p className="flex flex-wrap items-center justify-center gap-2 text-sm text-slate-400 sm:justify-start">
              Built by <span className="font-heading text-lg font-extrabold text-white sm:text-xl">BuiltByAmos</span> <FiHeart className="text-cyan" /> Copyright 2025
            </p>
          </div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            <FiShield className="text-cyan" /> MSME Registered Company
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Web Developer in Jharkhand • Website Development Services in India • SEO Services • Contact / WhatsApp • Location: Jharkhand, India
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-end">
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
