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

// Magnetic hover effect on cards
document.querySelectorAll('.detail-card, .work-project-card, .project-card, .contact-card').forEach(card => {
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
document.querySelectorAll('.project-card, .detail-card, .work-project-card').forEach(card => {
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

// Language toggle (EN/TR)
const translations = {
  tr: {
    // Nav
    'nav-about': 'Hakkımda',
    'nav-exp': 'Deneyim',
    'nav-work': 'Çalışmalar',
    'nav-projects': 'Projeler',
    'nav-contact': 'İletişim',
    // Hero
    'hero-badge': 'AI Operasyonları Lideri @ <a href="https://aioperator.com" target="_blank" rel="noopener"><strong>AI Operator</strong></a>',
    'hero-title': 'Merhaba, ben <span class="hero-name"><span class="text-orange">Kubilay</span> Zengin</span>',
    'hero-subtitle': 'Ekiplerin daha verimli çalışmasını sağlayan <span class="text-blue">AI otomasyonları</span> ve <span class="text-orange">AI ajanları</span> geliştiriyorum.',
    'hero-desc': 'Mekatronik mühendisinden AI operasyon uzmanına. Şu anda <a href="https://aioperator.com" target="_blank" rel="noopener"><strong>AI Operator</strong></a>\'da AI operasyonlarını yönetiyorum; otomasyonlar tasarlıyor, AI ajanları geliştiriyor ve ekipleri AI kullanımı konusunda eğitiyorum.',
    'hero-cta1': 'İletişime Geç',
    'hero-cta2': 'Çalışmalarımı Gör',
    // About
    'about-tag': 'Hakkımda',
    'about-title': 'Ben Kimim',
    'about-p1': 'Ben <strong>Kubilay Zengin</strong>, diğer adıyla <strong>Kubi Rich</strong>. İzmir Ekonomi Üniversitesi Mekatronik Mühendisliği mezunu, Bilgisayar Bilimi yan dal. İzmir, Türkiye\'de yaşıyorum.',
    'about-p2': 'Şu anda ABD merkezli bir startup olan <a href="https://aioperator.com" target="_blank" rel="noopener"><strong>AI Operator</strong></a>\'da AI operasyonlarını yönetiyorum; AI otomasyonları tasarlıyor, AI ajanları geliştirip test ediyor ve operasyonel iş akışlarını standartlaştırıyorum. Daha önce <a href="https://acrome.io" target="_blank" rel="noopener"><strong>Acrome Robotics</strong></a>\'te akıllı motor sürücüleri için arayüz tasarımcısı/geliştirici olarak çalıştım.',
    'about-p3': 'Geçmişim robotik, endüstriyel otomasyon ve yazılımı modern AI ile birleştiriyor. AI\'ın gerçek iş sorunlarına pratik olarak uygulanmasıyla ilgileniyorum, sadece demolarla değil.',
    'about-card1-t': 'AI Operasyonları',
    'about-card1-d': 'Gerçek iş sorunlarını çözen AI otomasyonları ve ajanları geliştirme',
    'about-card2-t': 'Eğitim',
    'about-card2-d': 'Ekiplere günlük işlerinde AI araçlarını kullanmayı öğretme',
    'about-card3-t': 'Mühendislik',
    'about-card3-d': 'Robotik, otomasyon ve gömülü sistemler alanında mekatronik altyapı',
    // Experience
    'exp-tag': 'Deneyim',
    'exp-title': 'Çalıştığım Yerler',
    'exp-role1': 'AI Operasyonları Lideri',
    'exp-d1a': 'İş süreçleri için AI otomasyonları tasarlama ve kurma',
    'exp-d1b': 'AI ajanları geliştirme, test etme ve iyileştirme',
    'exp-d1c': 'Operasyonel iş akışları, dokümantasyon ve kalite kontrol standardizasyonu',
    'exp-role2': 'UI Tasarımcı / Geliştirici',
    'exp-d2a': 'PyQt kullanarak Akıllı Motor Sürücüleri (SMD) için arayüz tasarımı ve geliştirme',
    'exp-d2b': 'Ball and Beam robotik ürünü için arayüz geliştirme',
    'edu-title': 'Eğitim',
    'edu1-t': 'Mekatronik Mühendisliği',
    'edu1-s': 'İzmir Ekonomi Üniversitesi',
    'edu2-t': 'Bilgisayar Bilimi ve BT (Yan Dal)',
    'edu2-s': 'İzmir Ekonomi Üniversitesi',
    'edu3-t': 'Yönetim Bilişim Sistemleri',
    'edu3-s': 'Anadolu Üniversitesi',
    // Work
    'work-tag': 'Çalışmalar',
    'work-title': 'Neler Geliştirdim',
    'work-intro': '<a href="https://aioperator.com" target="_blank" rel="noopener"><strong>AI Operator</strong></a>\'da müşteriler ve dahili kullanım için tasarlayıp hayata geçirdiğim AI otomasyonları, sesli ajanlar ve operasyonel sistemler.',
    'work-cat1': 'Müşteri Projeleri',
    'work-cat2': 'Dahili Araçlar ve Sistemler',
    'w-athena-t': 'Athena - AI Sesli Ajan',
    'w-athena-d': 'Seyahat potansiyel müşterilerini arayan, onları değerlendiren, Calendly müsaitliğini kontrol eden ve satış görüşmelerini otomatik ayarlayan AI sesli ajan.',
    'w-athena-m': 'Uçtan uca ses otomasyonu',
    'w-npu-t': 'NPU Otomasyon Paketi',
    'w-npu-d': '7 otomasyon: bülten ajanları, fatura ayrıştırıcı, Slack HelpDesk botu, Salesforce senkronizasyonu ve Asana çalışma alanı orkestrasyonu.',
    'w-npu-m': '%60 günlük AI kullanımı',
    'w-mkt-t': 'AI Pazarlama Motoru',
    'w-mkt-d': 'Claude Code sistemi: 1 girdi, 9+ kanalda 8+ içerik üretiyor. Uçtan uca içerik üretimi için 49 özel beceri geliştirildi.',
    'w-mkt-m': '33 kat ROI',
    'w-pod-t': 'AI Haber Podcast Oluşturucu',
    'w-pod-d': 'Tam otomatik günlük podcast: haberleri topla, senaryo oluştur, ses üret ve yayınla. Sıfır manuel adım.',
    'w-pod-m': '270+ bölüm',
    'w-post-t': 'Eğitim Sonrası AI Ajanı',
    'w-post-d': 'Eğitim kayıtlarını işleyerek otomatik olarak özetler, raporlar, podcastler ve sınavlar üretir.',
    'w-post-m': 'Tam otomasyon',
    'w-assess-t': 'AI Hazırlık Değerlendirmesi',
    'w-assess-d': '7 soruluk değerlendirme, otomatik süreç hattı aracılığıyla özelleştirilmiş 90 günlük AI yol haritası üretir.',
    'w-assess-m': '68+ lider değerlendirildi',
    // Skills
    'skills-tag': 'Yetenekler',
    'skills-title': 'Kullandığım Teknolojiler',
    'skills-cat1': 'AI ve Otomasyon',
    'skills-cat2': 'Geliştirme',
    'skills-cat3': 'Mühendislik',
    'skills-cat4': 'Platformlar ve Araçlar',
    // Projects
    'proj-tag': 'Projeler',
    'proj-title': 'Mühendislik ve Yan Projeler',
    'proj1-t': 'AI Operator Web Sitesi',
    'proj1-d': 'AI destekli SSS, sohbet asistanı ve CMS tabanlı içerikli full-stack pazarlama sitesi.',
    'proj2-t': 'Havalimanı Rehber Robotu',
    'proj2-d': 'Bitirme projesi. Havalimanı navigasyonu için 10 kg yük kapasiteli otonom mobil robot.',
    'proj3-t': 'Lab Değerlendirme Derleyicisi',
    'proj3-d': 'Üniversite lab ödevleri için otomatik notlandırmalı Java tabanlı çevrimiçi derleyici.',
    // Contact
    'contact-tag': 'İletişim',
    'contact-title': 'İletişime Geçin',
    'contact-intro': 'AI, otomasyon veya birlikte çalışma hakkında konuşmak ister misiniz? Ulaşın.',
  }
};

// Store original English content
const originalContent = {};

function setLanguage(lang) {
  if (lang === 'tr') {
    // Save English originals and apply Turkish
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (!originalContent[key]) originalContent[key] = el.textContent;
      if (translations.tr[key]) el.textContent = translations.tr[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (!originalContent[key]) originalContent[key] = el.innerHTML;
      if (translations.tr[key]) el.innerHTML = translations.tr[key];
    });
    document.documentElement.setAttribute('lang', 'tr');
  } else {
    // Restore English
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (originalContent[key]) el.textContent = originalContent[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (originalContent[key]) el.innerHTML = originalContent[key];
    });
    document.documentElement.setAttribute('lang', 'en');
  }
  document.getElementById('lang-label').textContent = lang === 'tr' ? 'EN' : 'TR';
  localStorage.setItem('lang', lang);
}

// Language toggle button
document.getElementById('lang-toggle').addEventListener('click', () => {
  const current = localStorage.getItem('lang') || 'en';
  setLanguage(current === 'en' ? 'tr' : 'en');
});

// Apply saved language on load
(function() {
  const saved = localStorage.getItem('lang');
  if (saved === 'tr') setLanguage('tr');
})();

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
