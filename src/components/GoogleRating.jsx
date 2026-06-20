import { motion, useInView } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaGoogle, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FiExternalLink, FiMapPin, FiRefreshCw, FiShield } from 'react-icons/fi';
import SectionHeader from './SectionHeader.jsx';

const fallbackReviews = [
  {
    author_name: 'Oracle Tattoo Studio',
    rating: 5,
    text: 'Professional website planning, premium design direction, and clear communication from the start.',
    relative_time_description: 'Client feedback'
  },
  {
    author_name: 'Blacky Series Chill',
    rating: 5,
    text: 'The artist website feels clean, responsive, and professional for online branding.',
    relative_time_description: 'Client feedback'
  },
  {
    author_name: 'Gift Hub',
    rating: 5,
    text: 'Smooth communication and a strong website plan for local business growth.',
    relative_time_description: 'Client feedback'
  }
];

function Stars({ rating }) {
  const score = Number(rating) || 0;

  return (
    <div className="flex gap-1 text-xl text-cyan" aria-label={`${score} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        if (score >= starValue) return <FaStar key={starValue} />;
        if (score > index && score < starValue) return <FaStarHalfAlt key={starValue} />;
        return <FaStar key={starValue} className="text-white/15" />;
      })}
    </div>
  );
}

export default function GoogleRating() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const endpoint = import.meta.env.VITE_GOOGLE_RATING_ENDPOINT;
  const reviewUrl = import.meta.env.VITE_GOOGLE_REVIEW_URL || 'https://g.page/r/CYkrf9Wvu3LqEBM/review';
  const mapsUrl =
    import.meta.env.VITE_GOOGLE_MAPS_URL ||
    'https://www.google.com/maps/place/Built+By+Amos/@23.3432048,85.3213263,12z/data=!4m16!1m9!3m8!1s0x4a3fc7fbfa2c4d35:0xea72bbafd57f2b89!2sBuilt+By+Amos!8m2!3d23.3432048!4d85.3213263!9m1!1b1!16s%2Fg%2F11z7cmc6jm!3m5!1s0x4a3fc7fbfa2c4d35:0xea72bbafd57f2b89!8m2!3d23.3432048!4d85.3213263!16s%2Fg%2F11z7cmc6jm?entry=ttu';
  const [googleData, setGoogleData] = useState(null);
  const [status, setStatus] = useState(endpoint ? 'syncing' : 'manual');

  useEffect(() => {
    if (!endpoint) return undefined;

    const controller = new AbortController();
    setStatus('syncing');

    fetch(endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Google rating endpoint failed');
        return response.json();
      })
      .then((data) => {
        setGoogleData(data);
        setStatus('live');
      })
      .catch(() => {
        setStatus('fallback');
      });

    return () => controller.abort();
  }, [endpoint]);

  const rating = googleData?.rating || import.meta.env.VITE_GOOGLE_RATING || '5.0';
  const reviewCount = googleData?.user_ratings_total || import.meta.env.VITE_GOOGLE_REVIEW_COUNT || 'New';
  const reviews = useMemo(() => googleData?.reviews?.slice(0, 3) || fallbackReviews, [googleData]);
  const syncLabel = {
    live: 'Live Google data',
    syncing: 'Syncing Google data',
    fallback: 'Google API fallback',
    manual: 'Ready for Google API sync'
  }[status];

  return (
    <section id="ratings" className="section-padding">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Google Trust"
          title="Google rating and client proof"
          copy="A premium trust section built for real Google Business Profile data, local SEO, and customer confidence."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 34 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10"
        >
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan/15 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-44 w-44 rounded-tr-full bg-electric/10" />

          <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan">
                <FiRefreshCw /> {syncLabel}
              </div>

              <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white text-4xl text-slate-950 shadow-glow">
                  <FaGoogle />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan">Built By Amos on Google</p>
                  <div className="mt-2 flex flex-wrap items-end gap-3">
                    <h3 className="font-heading text-6xl font-black leading-none text-white">{rating}</h3>
                    <div className="pb-2">
                      <Stars rating={rating} />
                      <p className="mt-2 text-sm font-semibold text-slate-400">
                        {reviewCount} Google {Number(reviewCount) === 1 ? 'review' : 'reviews'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-white">
                    <FiShield className="text-cyan" /> Verified Business Profile
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Local presence for Ranchi, Jharkhand clients.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-white">
                    <FiMapPin className="text-cyan" /> Google Maps Visibility
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Helps customers find and trust the company.</p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a className="button-primary" href={reviewUrl} target="_blank" rel="noreferrer">
                  Review on Google <FiExternalLink />
                </a>
                <a className="button-secondary" href={mapsUrl} target="_blank" rel="noreferrer">
                  Open Maps <FiMapPin />
                </a>
              </div>
            </div>

            <div className="grid gap-4">
              {reviews.map((review, index) => (
                <article key={`${review.author_name}-${index}`} className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-heading text-xl font-bold text-white">{review.author_name}</h4>
                      <p className="mt-1 text-sm font-semibold text-slate-500">{review.relative_time_description}</p>
                    </div>
                    <Stars rating={review.rating || 5} />
                  </div>
                  <p className="mt-4 leading-7 text-slate-300">&ldquo;{review.text}&rdquo;</p>
                </article>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
