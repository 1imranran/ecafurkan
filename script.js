/* ============================================================
   KOMBICI MÜŞTERI AVCISI — Interactive Engine
   NEURAL-FORGE v10.0
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // === Scroll Reveal (IntersectionObserver) ===
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // === Sticky Header ===
  const header = document.querySelector('.header');

  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // === Testimonials Slider ===
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  const totalSlides = dots.length;

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Auto advance slider
  setInterval(() => {
    const next = (currentSlide + 1) % totalSlides;
    goToSlide(next);
  }, 5000);

  // === Mobile Menu ===
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeMobileNav = () => {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    };

    mobileNavClose.addEventListener('click', closeMobileNav);
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileNav));
  }

  // === Smooth Scroll for Nav Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // === Scroll to Top ===
  const scrollTopBtn = document.querySelector('.scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // === Contact Form Handler ===
  const form = document.getElementById('contactForm');
  const formSuccess = document.querySelector('.form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const service = formData.get('service');
      const message = formData.get('message');

      // Build WhatsApp message
      const waMessage = `Merhaba, ben ${name}. ${service} hizmeti hakkında bilgi almak istiyorum. Tel: ${phone}. ${message || ''}`;
      const waUrl = `https://wa.me/905392935499?text=${encodeURIComponent(waMessage)}`;

      // Open WhatsApp
      window.open(waUrl, '_blank');

      // Show success
      form.style.display = 'none';
      formSuccess.classList.add('show');

      // Reset after 4 seconds
      setTimeout(() => {
        form.reset();
        form.style.display = '';
        formSuccess.classList.remove('show');
      }, 4000);
    });
  }

  // === Counter Animation ===
  const statElements = document.querySelectorAll('.hero-stat-value[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statElements.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutExpo)
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(eased * target);

      el.textContent = current.toLocaleString('tr-TR') + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // === Phone Click Tracking (Analytics Placeholder) ===
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      // Google Analytics event (if gtag is loaded)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_call', {
          event_category: 'contact',
          event_label: link.href
        });
      }
      console.log('📞 Phone call initiated:', link.href);
    });
  });

  // === Parallax-like scroll depth indicator ===
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      if (scrolled < heroHeight) {
        const parallaxValue = scrolled * 0.3;
        const bgImg = heroSection.querySelector('.hero-bg img');
        if (bgImg) {
          bgImg.style.transform = `translateY(${parallaxValue}px) scale(1.1)`;
        }
      }
    }, { passive: true });
  }

  console.log('🔥 Kombici Müşteri Avcısı — Site aktif!');
});
