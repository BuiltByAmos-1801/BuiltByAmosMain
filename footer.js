(function renderSiteFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  const base = mount.dataset.base || "./";
  const mapsUrl = "https://www.google.com/maps/search/Built+By+Amos+Ranchi+Jharkhand";
  const mapsEmbed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117059.36247368419!2d85.2794034!3d23.3441017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f11e6080eef877%3A0x37df1ed9352a921b!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1719600000000!5m2!1sen!2sin";

  mount.outerHTML = `
    <footer class="relative z-10 border-t border-line px-5 pb-10 pt-12 sm:px-8">
      <div class="mx-auto max-w-7xl">
        <div class="grid gap-10 border-b border-line pb-12 lg:grid-cols-2">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.28em] text-white/50">Location</p>
            <h2 class="mt-3 text-2xl font-black uppercase sm:text-3xl">Find Built By Amos in Ranchi</h2>
            <p class="mt-3 text-white/60">Built By Amos, Ranchi</p>
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-ink">
              Open Google Maps
            </a>
          </div>
          <div class="overflow-hidden rounded-2xl border border-line">
            <iframe title="Built By Amos map — Ranchi, Jharkhand" src="${mapsEmbed}" class="h-64 w-full min-h-[240px] border-0 opacity-90 grayscale lg:h-full" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>

        <div class="grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <img src="${base}images/builtbyamos-logo.svg" alt="Built By Amos MSME registered company logo" class="h-12 w-auto" />
            <p class="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-white">Built by BuiltByAmos</p>
            <p class="mt-2 inline-flex rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/70">MSME Registered Company</p>
            <p class="mt-5 text-xs text-white/40">Copyright &copy; 2025 Built By Amos. All rights reserved.</p>
          </div>
          <div>
            <p class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50">Quick Links</p>
            <nav class="flex flex-col gap-2.5 text-sm text-white/55">
              <a class="hover:text-white transition" href="${base}index.html">Home</a>
              <a class="hover:text-white transition" href="${base}services.html">Services</a>
              <a class="hover:text-white transition" href="${base}website-development-ranchi.html">Web Development</a>
              <a class="hover:text-white transition" href="${base}local-seo-ranchi.html">Local SEO</a>
              <a class="hover:text-white transition" href="${base}portfolio.html">Portfolio</a>
              <a class="hover:text-white transition" href="${base}pricing.html">Pricing</a>
              <a class="hover:text-white transition" href="${base}blog.html">Blog</a>
              <a class="hover:text-white transition" href="${base}about.html">About</a>
            </nav>
          </div>
          <div>
            <p class="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/50">Contact</p>
            <div class="flex flex-col gap-2.5 text-sm text-white/55">
              <a class="hover:text-white transition" href="${base}contact.html">Contact Us</a>
              <a class="hover:text-white transition" href="https://wa.me/918757603560" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <a class="hover:text-white transition" href="mailto:builtbiamos@gmail.com">builtbiamos@gmail.com</a>
              <p class="mt-2 text-white/45">Location: Jharkhand, India</p>
            </div>
          </div>
        </div>

        <p class="border-t border-line pt-8 text-center text-xs leading-relaxed text-white/45">
          Web Developer in Jharkhand &middot; Website Development Services in India &middot; SEO Services &middot;
          <a href="${base}contact.html" class="hover:text-white underline underline-offset-2">Contact / WhatsApp</a>
          &middot; Location: Jharkhand, India
        </p>
      </div>
    </footer>`;
})();
