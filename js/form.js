/* form.js - Interactive Form Validation & Submission Logic */

export function initForms() {
  const auditForm = document.getElementById('audit-form');
  const contactForm = document.getElementById('contact-form');

  // Input styling animations for form focus transitions
  const inputs = document.querySelectorAll('.form-input');

  inputs.forEach(input => {
    // Force set checked state for fields prefilled by browsers
    if (input.value !== '') {
      input.classList.add('has-content');
    }

    input.addEventListener('focus', () => {
      input.classList.add('has-content');
    });

    input.addEventListener('blur', () => {
      if (input.value === '') {
        input.classList.remove('has-content');
      }
    });
  });

  // Handle Audit Form submission
  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = auditForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      if (!validateForm(auditForm)) {
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Analyzing details...';

      // Simulate API submit or EmailJS trigger
      setTimeout(() => {
        showFormSuccess(auditForm, 'Audit Request Received! We will call you within 24 hours.');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        auditForm.reset();
        inputs.forEach(i => i.classList.remove('has-content'));
      }, 1500);
    });
  }

  // Handle Contact Form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      if (!validateForm(contactForm)) {
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending message...';

      // Setup standard EmailJS forwarding if API keys exist
      if (typeof window.emailjs !== 'undefined') {
        window.emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
          .then(() => {
            showFormSuccess(contactForm, 'Message Sent! We will contact you soon.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            contactForm.reset();
            inputs.forEach(i => i.classList.remove('has-content'));
          }, (error) => {
            console.error('EmailJS failed:', error);
            showFormError(contactForm, 'Something went wrong. Please call us directly.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          });
      } else {
        // Fallback simulated submission
        setTimeout(() => {
          showFormSuccess(contactForm, 'Message Sent! We will contact you soon.');
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          contactForm.reset();
          inputs.forEach(i => i.classList.remove('has-content'));
        }, 1500);
      }
    });
  }

  // Handle ApnaDukan Waitlist Form submission
  const waitlistForm = document.getElementById('waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = waitlistForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      if (!validateForm(waitlistForm)) {
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Joining waitlist...';

      setTimeout(() => {
        showFormSuccess(waitlistForm, 'You are on the ApnaDukan waitlist! Updates are on the way.');
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        waitlistForm.reset();
        inputs.forEach(i => i.classList.remove('has-content'));
      }, 1200);
    });
  }

  function validateForm(form) {
    let isValid = true;
    const requiredInputs = form.querySelectorAll('[required]');

    requiredInputs.forEach(input => {
      // Basic text validation
      if (input.value.trim() === '') {
        highlightError(input);
        isValid = false;
      } else {
        removeHighlight(input);
      }

      // Email field validation
      if (input.type === 'email' && input.value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          highlightError(input);
          isValid = false;
        }
      }

      // Phone field validation (exactly 10 digits as standard for India)
      if (input.type === 'tel' && input.value !== '') {
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(input.value.replace(/\s+/g, ''))) {
          highlightError(input);
          isValid = false;
        }
      }
    });

    return isValid;
  }

  function highlightError(input) {
    input.style.borderColor = '#EF4444';

    // Animate subtle shake effect
    input.style.transform = 'translateX(-5px)';
    setTimeout(() => input.style.transform = 'translateX(5px)', 80);
    setTimeout(() => input.style.transform = 'translateX(-3px)', 160);
    setTimeout(() => input.style.transform = 'translateX(3px)', 240);
    setTimeout(() => input.style.transform = 'translateX(0)', 320);
  }

  function removeHighlight(input) {
    input.style.borderColor = '';
  }

  function showFormSuccess(form, message) {
    const successDiv = document.createElement('div');
    successDiv.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
    successDiv.style.border = '1px solid rgba(16, 185, 129, 0.2)';
    successDiv.style.color = '#10B981';
    successDiv.style.padding = '1rem 1.5rem';
    successDiv.style.borderRadius = '12px';
    successDiv.style.marginTop = '1.5rem';
    successDiv.style.fontSize = '0.9rem';
    successDiv.style.fontWeight = '600';
    successDiv.style.textAlign = 'center';
    successDiv.style.fontFamily = 'var(--font-heading)';
    successDiv.textContent = message;

    // Fade in animation
    successDiv.style.opacity = '0';
    successDiv.style.transform = 'translateY(10px)';
    successDiv.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    form.appendChild(successDiv);

    setTimeout(() => {
      successDiv.style.opacity = '1';
      successDiv.style.transform = 'translateY(0)';
    }, 10);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      successDiv.style.opacity = '0';
      successDiv.style.transform = 'translateY(-10px)';
      setTimeout(() => successDiv.remove(), 400);
    }, 5000);
  }

  function showFormError(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
    errorDiv.style.border = '1px solid rgba(239, 68, 68, 0.2)';
    errorDiv.style.color = '#EF4444';
    errorDiv.style.padding = '1rem 1.5rem';
    errorDiv.style.borderRadius = '12px';
    errorDiv.style.marginTop = '1.5rem';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.fontWeight = '600';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.fontFamily = 'var(--font-heading)';
    errorDiv.textContent = message;

    form.appendChild(errorDiv);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }
}
