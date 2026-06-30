const menuButton = document.querySelector("#menuButton");
const mobileMenu = document.querySelector("#mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");
const cursorGlow = document.querySelector("#cursorGlow");
const canvas = document.querySelector("#particleCanvas");
const ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;

let particles = [];
let animationFrame;

function toggleMenuFactory(button, menu) {
  return function toggleMenu(forceClose = false) {
    if (!button || !menu) return;
    const isOpen = button.getAttribute("aria-expanded") === "true";
    const nextState = forceClose ? false : !isOpen;

    button.setAttribute("aria-expanded", String(nextState));
    menu.classList.toggle("hidden", !nextState);
  };
}

const toggleMenu = toggleMenuFactory(menuButton, mobileMenu);

if (menuButton) menuButton.addEventListener("click", () => toggleMenu());
if (mobileLinks && mobileLinks.length) mobileLinks.forEach((link) => link.addEventListener("click", () => toggleMenu(true)));

if (cursorGlow) {
  window.addEventListener("mousemove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

function initRevealAnimations() {
  document.querySelectorAll("main section, main article, main .card-hover, main blockquote").forEach((el) => {
    if (!el.classList.contains("reveal")) el.classList.add("reveal");
  });

  const revealItems = document.querySelectorAll(".reveal");

  if (!window.IntersectionObserver) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => {
    if (!item.classList.contains("is-visible")) revealObserver.observe(item);
  });
}

initRevealAnimations();

function isFixedParticleCanvas() {
  return canvas && canvas.classList.contains("particle-fixed");
}

function getParticleHeight() {
  if (!canvas) return 0;
  if (isFixedParticleCanvas()) return window.innerHeight;
  const parent = canvas.parentElement;
  return parent ? parent.offsetHeight : window.innerHeight;
}

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const height = getParticleHeight();
  canvas.width = window.innerWidth * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  createParticles();
}

function createParticles() {
  if (!canvas) return;
  const count = window.innerWidth < 768 ? 34 : 72;
  const height = getParticleHeight();
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * height,
    radius: Math.random() * 1.8 + 0.4,
    speedX: (Math.random() - 0.5) * 0.22,
    speedY: (Math.random() - 0.5) * 0.22,
    opacity: Math.random() * 0.42 + 0.18,
  }));
}

function drawParticles() {
  if (!canvas || !ctx) return;
  const height = getParticleHeight();
  ctx.clearRect(0, 0, window.innerWidth, height);

  particles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < 0 || particle.x > window.innerWidth) particle.speedX *= -1;
    if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
    ctx.fill();

    for (let next = index + 1; next < particles.length; next += 1) {
      const other = particles[next];
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

      if (distance < 130) {
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / 130) * 0.08})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  });

  animationFrame = requestAnimationFrame(drawParticles);
}

function initParticles() {
  if (!canvas || !ctx) return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  resizeCanvas();

  if (!prefersReducedMotion) {
    drawParticles();
  }
}

if (canvas && ctx) {
  window.addEventListener("resize", () => {
    cancelAnimationFrame(animationFrame);
    initParticles();
  });

  initParticles();
}
