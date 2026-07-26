/* cursor.js - Custom dual cursor and magnetic hover styling */

export function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');

  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0; // target position
  let dotX = 0, dotY = 0;     // current dot position
  let ringX = 0, ringY = 0;   // current ring position

  // Track mouse coordinates
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth interpolation using requestAnimationFrame
  function tick() {
    // Dot spring (fast)
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;

    // Ring spring (slower, creates lag effect)
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Hover states for links and interactive elements
  const hoverElements = document.querySelectorAll('a, button, input, textarea, select, .faq-header, [role="button"]');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  // Stripe-style Mouse Glow effect coordinates for glass cards
  const glowCards = document.querySelectorAll('.mouse-glow-card');
  
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
