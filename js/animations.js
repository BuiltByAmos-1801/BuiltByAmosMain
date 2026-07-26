/* animations.js - GSAP scroll indicators, Lenis, typing timers, and reveal controls */

export function initAnimations() {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard inertia curve
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Sync ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Sticky Glass Navbar Scroll Transition
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Update top progress bar width
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }
  });

  // 3. Hero Text Typing / Cycling Effect
  initTypingEffect();

  // 4. GSAP Landing Anim on Hero
  const heroTl = gsap.timeline();
  
  heroTl.from('.hero-badge', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  })
  .from('.hero-title', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.hero-description', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.hero-actions', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.dashboard-showcase', {
    scale: 0.95,
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: 'power4.out'
  }, '-=1');

  // 5. Scroll Reveals for Cards and Sections (ScrollTrigger)
  gsap.registerPlugin(ScrollTrigger);

  // General Fade-In Up transitions for sections
  const revealContainers = document.querySelectorAll('.reveal-fade');
  revealContainers.forEach(container => {
    gsap.from(container, {
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Grid Stagger Animation
  const gridStaggers = document.querySelectorAll('.stagger-grid');
  gridStaggers.forEach(grid => {
    const cards = grid.querySelectorAll('.glass-card, .industry-card, .service-card, .product-card, .blog-card');
    
    gsap.from(cards, {
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      clearProps: 'all'
    });
  });

  // 6. Interactive Process Timeline scroll trigger
  initProcessTimeline();

  // 7. FAQ Accordion Height Animation using GSAP
  initFaqAccordion();
}

// Typing cycling animation function
function initTypingEffect() {
  const words = ["Websites", "Mobile Apps", "Business Software", "AI Solutions", "Automation"];
  const container = document.getElementById('typewrite-text');
  if (!container) return;
  
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      container.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      container.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start typewriter
  setTimeout(type, 1000);
}

// Process Section active step timeline tracer
function initProcessTimeline() {
  const timeline = document.querySelector('.timeline-container');
  if (!timeline) return;

  const items = document.querySelectorAll('.timeline-item');
  const progressLine = document.querySelector('.timeline-progress');

  ScrollTrigger.create({
    trigger: timeline,
    start: 'top 70%',
    end: 'bottom 40%',
    scrub: true,
    onUpdate: (self) => {
      // Scale progress height
      const progressPercent = self.progress * 100;
      progressLine.style.height = `${progressPercent}%`;

      // Highlight active timeline node based on viewport height
      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.65;
        
        if (itemRect.top < triggerPoint) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });
}

// FAQ accordion toggles
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll('.faq-header');
  
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('active');
      
      // Close all other accordion drawers
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const content = item.querySelector('.faq-content');
        if (content) content.style.maxHeight = '0px';
      });

      // Toggle clicked drawer
      if (!isOpen) {
        parent.classList.add('active');
        const content = parent.querySelector('.faq-content');
        if (content) {
          // Set to scroll height to expand naturally
          content.style.maxHeight = `${content.scrollHeight + 32}px`;
        }
      }
    });
  });
}
