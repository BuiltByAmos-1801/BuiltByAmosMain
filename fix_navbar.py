from pathlib import Path
import re

standard_header = '''    <header class="fixed inset-x-0 top-0 z-30 border-b border-line bg-gradient-to-r from-ink/90 via-ink/80 to-ink/95 backdrop-blur-xl shadow-xl">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
        <a href="./index.html" class="flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-white">
          <img src="./images/builtbyamos-logo.svg" alt="Built By Amos" class="h-9 w-auto" />
          <span class="hidden sm:inline">Built By Amos</span>
        </a>
        <div class="hidden items-center gap-8 text-sm text-white/80 md:flex">
          <a class="magnetic-link hover:text-white" href="./index.html">Home</a>
          <a class="magnetic-link hover:text-white" href="./services.html">Services</a>
          <a class="magnetic-link hover:text-white" href="./website-development-ranchi.html">Web Dev</a>
          <a class="magnetic-link hover:text-white" href="./portfolio.html">Portfolio</a>
          <a class="magnetic-link hover:text-white" href="./blog.html">Blog</a>
          <a class="magnetic-link hover:text-white" href="./about.html">About</a>
          <a class="magnetic-link hover:text-white" href="./pricing.html">Pricing</a>
          <a class="magnetic-link hover:text-white" href="./contact.html">Contact</a>
        </div>
        <div class="flex items-center gap-3">
          <a href="./contact.html" class="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink shadow-lg transition hover:opacity-95 md:inline-flex">Contact</a>
          <button id="menuButton" class="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:border-white/20 hover:bg-white/6" type="button" aria-expanded="false" aria-controls="mobileMenu">Menu</button>
        </div>
      </nav>
      <div id="mobileMenu" class="hidden border-t border-line bg-ink/95 px-5 py-6 md:hidden">
        <div class="mx-auto grid max-w-7xl gap-4 text-lg font-semibold">
          <a href="./index.html" class="mobile-link text-white/85 transition hover:text-white">Home</a>
          <a href="./services.html" class="mobile-link text-white/85 transition hover:text-white">Services</a>
          <a href="./website-development-ranchi.html" class="mobile-link text-white/85 transition hover:text-white">Web Dev</a>
          <a href="./portfolio.html" class="mobile-link text-white/85 transition hover:text-white">Portfolio</a>
          <a href="./blog.html" class="mobile-link text-white/85 transition hover:text-white">Blog</a>
          <a href="./about.html" class="mobile-link text-white/85 transition hover:text-white">About</a>
          <a href="./pricing.html" class="mobile-link text-white/85 transition hover:text-white">Pricing</a>
          <a href="./contact.html" class="mobile-link text-white/85 transition hover:text-white">Contact</a>
        </div>
      </div>
    </header>'''

pattern = re.compile(r'(?s)<header[^>]*>.*?</header>')
files = [
    'index.html',
    'about.html',
    'services.html',
    'portfolio.html',
    'pricing.html',
    'contact.html',
    'website-development-ranchi.html',
    'local-seo-ranchi.html',
    'blog.html'
]

for fn in files:
    path = Path(fn)
    if not path.exists():
        print(f'MISSING {fn}')
        continue
    text = path.read_text(encoding='utf-8')
    if not pattern.search(text):
        print(f'NO HEADER MATCH {fn}')
        continue
    text = pattern.sub(standard_header + '\n\n', text, count=1)
    if fn == 'website-development-ranchi.html':
        text = text.replace('href="/styles.css"', 'href="./styles.css"')
        text = text.replace('href="/blog.html"', 'href="./blog.html"')
        text = text.replace('href="/contact.html"', 'href="./contact.html"')
    path.write_text(text, encoding='utf-8')
    print(f'UPDATED {fn}')
