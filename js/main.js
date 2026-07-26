/* main.js - Core application coordinator & multi-page transition controller */

import { initCustomCursor } from './cursor.js';
import { initTiltCards } from './tilt.js';
import { initStatCounters } from './counter.js';
import { initForms } from './form.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  const transitionOverlay = document.getElementById('transition-overlay');
  
  // 1. Loading Screen Simulation
  const loader = document.getElementById('loading-screen');
  const loaderProgress = document.getElementById('loader-progress');
  const loaderPercentage = document.getElementById('loader-percentage');
  
  let currentProgress = 0;
  const loadInterval = setInterval(() => {
    currentProgress += Math.floor(Math.random() * 15) + 5;
    if (currentProgress >= 100) {
      currentProgress = 100;
      clearInterval(loadInterval);
      
      setTimeout(() => {
        if (loader) loader.classList.add('loaded');
        initAppComponents();
        
        // Slide away transition overlay once loader fades out
        if (transitionOverlay) {
          setTimeout(() => {
            transitionOverlay.style.transform = 'translateY(-100%)';
          }, 150);
        }
      }, 350);
    }
    
    if (loaderProgress) loaderProgress.style.width = `${currentProgress}%`;
    if (loaderPercentage) loaderPercentage.textContent = `${currentProgress}%`;
  }, 80);

  // 2. Intercept local page links for GSAP frosted slide transition Wipes
  const transitionLinks = document.querySelectorAll('a[href^="./"], a[href*=".html"]');
  transitionLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Ignore hashes, blank tabs, and generic links
      if (!href || href.startsWith('#') || link.getAttribute('target') === '_blank') return;
      
      e.preventDefault();
      
      if (transitionOverlay) {
        // Slide pane back up
        transitionOverlay.style.transform = 'translateY(0)';
        setTimeout(() => {
          window.location.href = href;
        }, 600); // Wait for transition animation (0.6s)
      } else {
        window.location.href = href;
      }
    });
  });

  // 3. Mobile Responsive Menu Toggling
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // App components initializer
  function initAppComponents() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    initCustomCursor();
    initTiltCards();
    initStatCounters();
    initForms();
    initAnimations();
    
    // Initialize SwiperJS Testimonials Slider
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonials-slider')) {
      new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }

    // Initialize Leaflet Map
    initLeafletMap();
  }

  // Styled Leaflet Ranchi office location map
  function initLeafletMap() {
    const mapElement = document.getElementById('leaflet-map');
    if (!mapElement || typeof L === 'undefined') return;

    // Center coordinates: Ranchi Main Road, Ranchi, Jharkhand
    const officeCoords = [23.3441, 85.3096];
    
    const map = L.map('leaflet-map', {
      zoomControl: false,
      scrollWheelZoom: false
    }).setView(officeCoords, 14);

    // Apply minimal CartoDB light tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CartoDB'
    }).addTo(map);

    // Custom map marker pin
    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="
          width: 20px; 
          height: 20px; 
          background: #3B82F6; 
          border: 3px solid #FFFFFF; 
          border-radius: 50%; 
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
          position: relative;
        ">
          <div style="
            position: absolute; 
            top: -5px; 
            left: -5px; 
            width: 30px; 
            height: 30px; 
            border: 1px solid rgba(59,130,246,0.3); 
            border-radius: 50%; 
            animation: mapMarkerPulse 2s infinite;
          "></div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    L.marker(officeCoords, { icon: customIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.85rem; padding: 4px;">
          <strong style="color: #111827;">Built By Amos Office</strong><br/>
          <span style="color: #4B5563;">Premium Digital Solutions</span>
        </div>
      `)
      .openPopup();
      
    // Inject marker animation pulses
    const style = document.createElement('style');
    style.textContent = `
      @keyframes mapMarkerPulse {
        0% { transform: scale(0.5); opacity: 1; }
        100% { transform: scale(2.2); opacity: 0; }
      }
      .leaflet-popup-content-wrapper {
        border-radius: 12px !important;
        box-shadow: 0 10px 25px rgba(59, 130, 246, 0.08) !important;
        border: 1px solid rgba(59, 130, 246, 0.1) !important;
      }
    `;
    document.head.appendChild(style);
  }
});
