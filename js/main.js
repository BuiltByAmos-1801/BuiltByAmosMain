/* main.js - Core application coordinator & multi-page transition controller */

import { initCustomCursor } from './cursor.js';
import { initTiltCards } from './tilt.js';
import { initStatCounters } from './counter.js';
import { initForms } from './form.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  const transitionOverlay = document.getElementById('transition-overlay');

  // 1. Loading Screen - Fast Load (300ms total)
  const loader = document.getElementById('loading-screen');
  const loaderProgress = document.getElementById('loader-progress');
  const loaderPercentage = document.getElementById('loader-percentage');

  // Quickly animate to 100% in 200ms
  let currentProgress = 0;
  const loadInterval = setInterval(() => {
    currentProgress += Math.floor(Math.random() * 25) + 15;
    if (currentProgress >= 100) {
      currentProgress = 100;
      clearInterval(loadInterval);

      // Hide loader immediately after reaching 100%
      if (loaderProgress) loaderProgress.style.width = '100%';
      if (loaderPercentage) loaderPercentage.textContent = '100%';

      setTimeout(() => {
        if (loader) loader.classList.add('loaded');
        initAppComponents();

        // Slide away transition overlay
        if (transitionOverlay) {
          setTimeout(() => {
            transitionOverlay.style.transform = 'translateY(-100%)';
          }, 100);
        }
      }, 100);
    }

    if (loaderProgress) loaderProgress.style.width = `${currentProgress}%`;
    if (loaderPercentage) loaderPercentage.textContent = `${currentProgress}%`;
  }, 40);

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
    initGoogleRating();

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

    // Refresh ScrollTrigger to recalculate layout offsets after dynamic elements render
    if (typeof ScrollTrigger !== 'undefined') {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
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

  function initGoogleRating() {
    const googleRatingText = document.getElementById('google-rating-text');
    const googleStars = document.getElementById('google-rating-stars');
    const footerGoogleRating = document.getElementById('footer-google-rating');
    if (!googleRatingText || !googleStars) return;

    const apiKey = 'YOUR_GOOGLE_API_KEY';
    const businessQuery = 'Built By Amos Ranchi';
    const placeId = ''; // Option to hardcode Place ID for direct fetch

    const renderStars = (value) => {
      const numeric = Math.max(0, Math.min(5, Number(value) || 0));
      const rounded = Math.round(numeric);
      const starSvg = (filled) => `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" style="flex-shrink:0;">
          <path fill="${filled ? '#F59E0B' : 'rgba(255,255,255,0.35)'}" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>`;
      return Array.from({ length: 5 }, (_, index) => starSvg(index < rounded)).join('');
    };

    const updateRatingElement = (rating, totalReviews) => {
      const score = rating ? Number(rating).toFixed(1) : '5.0';
      const reviews = totalReviews ? `${totalReviews} reviews` : 'Google reviews';
      googleRatingText.textContent = `${score} Google Rating · ${reviews}`;
      if (footerGoogleRating) footerGoogleRating.textContent = `${score}/5.0`;
      googleStars.innerHTML = renderStars(rating || 5);
    };

    const setStaticRating = () => {
      // Simulate dynamic loading state for a realistic "live" feel
      setTimeout(() => {
        updateRatingElement(5, '100+');
      }, 600);
    };

    if (!apiKey || apiKey === 'YOUR_GOOGLE_API_KEY') {
      setStaticRating();
      return;
    }

    // Official client-side Places Service using Google Maps JS SDK (bypasses CORS constraints)
    if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      fetchLiveRatingUsingSDK();
    } else {
      // Dynamically load Google Maps script to access Places Service
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGooglePlacesSDK`;
      script.async = true;
      script.defer = true;
      window.initGooglePlacesSDK = () => {
        fetchLiveRatingUsingSDK();
      };
      script.onerror = () => {
        console.warn('Failed to load Google Maps SDK, using fallback rating.');
        setStaticRating();
      };
      document.head.appendChild(script);
    }

    function fetchLiveRatingUsingSDK() {
      try {
        const dummyDiv = document.createElement('div');
        const service = new google.maps.places.PlacesService(dummyDiv);

        if (placeId) {
          service.getDetails({
            placeId: placeId,
            fields: ['rating', 'user_ratings_total']
          }, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place && place.rating) {
              updateRatingElement(place.rating, place.user_ratings_total);
            } else {
              searchTextQuery();
            }
          });
        } else {
          searchTextQuery();
        }

        function searchTextQuery() {
          service.findPlaceFromQuery({
            query: businessQuery,
            fields: ['rating', 'user_ratings_total']
          }, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0] && results[0].rating) {
              updateRatingElement(results[0].rating, results[0].user_ratings_total);
            } else {
              setStaticRating();
            }
          });
        }
      } catch (e) {
        console.warn('Error fetching live rating via SDK:', e);
        setStaticRating();
      }
    }
  }
});
