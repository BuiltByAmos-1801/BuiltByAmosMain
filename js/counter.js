/* counter.js - Viewport triggered numerical count-up effect */

export function initStatCounters() {
  const stats = document.querySelectorAll('.stat-number');

  const options = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseInt(target.getAttribute('data-target'), 10);
        const prefix = target.getAttribute('data-prefix') || '';
        const suffix = target.getAttribute('data-suffix') || '';
        
        animateCounter(target, targetVal, prefix, suffix);
        observer.unobserve(target); // Only animate once
      }
    });
  }, options);

  stats.forEach(stat => {
    observer.observe(stat);
  });

  function animateCounter(element, targetValue, prefix, suffix) {
    let startTimestamp = null;
    const duration = 2000; // 2 seconds

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * targetValue);

      element.textContent = `${prefix}${currentValue}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = `${prefix}${targetValue}${suffix}`;
      }
    }

    window.requestAnimationFrame(step);
  }
}
