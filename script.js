// Page loader
window.addEventListener('load', () => {
  document.getElementById('page-loader').classList.add('loaded');
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  if (next === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// Framer-style scroll animations
const animElements = document.querySelectorAll('.anim');

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0) * 100;
      setTimeout(() => {
        el.classList.add('in-view');
      }, delay);
      animObserver.unobserve(el);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

animElements.forEach(el => animObserver.observe(el));

// Counter animation for stats
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = eased * target;

    if (isDecimal) {
      el.textContent = current.toFixed(1);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el);
});

// Magnetic hover effect on cards
document.querySelectorAll('.detail-card, .method-card, .service, .project-card, .contact-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Cursor glow effect on project cards
document.querySelectorAll('.project-card, .detail-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// Navigation
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

const navToggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  links.classList.toggle('active');
  navToggle.classList.toggle('active');
});

links.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    links.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Parallax glow effect
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const glows = document.querySelectorAll('.hero-glow, .hero-glow-2');
  glows.forEach((glow, i) => {
    const speed = i === 0 ? 0.3 : 0.2;
    glow.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// Stagger tags on hover
document.querySelectorAll('.tags').forEach(container => {
  container.addEventListener('mouseenter', () => {
    const tags = container.querySelectorAll('.tag');
    tags.forEach((tag, i) => {
      tag.style.transitionDelay = `${i * 30}ms`;
    });
  });
  container.addEventListener('mouseleave', () => {
    const tags = container.querySelectorAll('.tag');
    tags.forEach(tag => {
      tag.style.transitionDelay = '0ms';
    });
  });
});
