/* tilt.js - 3D Tilt Card hover effect */

export function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x coordinate within the element.
      const y = e.clientY - rect.top;  // y coordinate within the element.

      // Calculate width and height offsets (normalized between -0.5 and 0.5)
      const width = rect.width;
      const height = rect.height;
      
      const px = (x / width) - 0.5;
      const py = (y / height) - 0.5;

      // Max tilt angles in degrees
      const maxTilt = 8;
      
      const tiltX = (py * maxTilt * -1).toFixed(2);
      const tiltY = (px * maxTilt).toFixed(2);

      // Apply style transform
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      // Smoothly snap back to original position
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      // Remove transitions while moving mouse to avoid laggy animation
      card.style.transition = 'transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
}
