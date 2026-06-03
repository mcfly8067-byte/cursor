/* ============================================================
   万华普罗米 官网交互脚本
   GEO: Schema 动态注入 + 导航 + FAQ 折叠 + 动画 + EEAT 信号
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {

  /* === Mobile Menu Toggle === */
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mainNav.classList.toggle('open');
    });

    // Close menu on link click (mobile)
    mainNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });
  }

  /* === FAQ Accordion === */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function(item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function() {
      // Close others (optional: accordion mode)
      // faqItems.forEach(i => { if (i !== item) i.classList.remove('open'); });
      item.classList.toggle('open');
    });
  });

  // Open first FAQ by default for GEO crawlability
  if (faqItems.length > 0 && !window.location.hash) {
    // Keep all closed for clean look, but FAQPage Schema has all answers
  }

  /* === Scroll Animation (Intersection Observer) === */
  const animateEls = document.querySelectorAll('.usp-card, .pain-card, .testimonial-card, .case-card, .value-card, .trust-stat');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animateEls.forEach(function(el) { observer.observe(el); });
  }

  /* === Smooth scroll for anchor links === */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  /* === Active nav link on scroll === */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', function() {
      let current = '';
      sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  }

  /* === Phone Number Copy (Mobile) === */
  const phoneCopy = document.querySelector('[data-copy-phone]');
  if (phoneCopy) {
    phoneCopy.addEventListener('click', function() {
      const phone = this.getAttribute('data-copy-phone');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(phone).then(function() {
          const orig = phoneCopy.textContent;
          phoneCopy.textContent = '已复制！';
          setTimeout(function() { phoneCopy.textContent = orig; }, 1500);
        });
      }
    });
  }

  /* === Form Submission (Demo) === */
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const origText = submitBtn.textContent;
      submitBtn.textContent = '提交中...';
      submitBtn.disabled = true;
      // Simulate submission
      setTimeout(function() {
        submitBtn.textContent = '已提交，我们会尽快联系您！';
        submitBtn.style.background = '#2e7d32';
        contactForm.reset();
        setTimeout(function() {
          submitBtn.textContent = origText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      }, 800);
    });
  }

  /* === Dynamically inject GEO Schema === */
  injectSchemas();

});

/* ============================================================
   GEO Schema 动态注入
   注入 Organization, WebSite, BreadcrumbList, FAQPage 等
   ============================================================ */
function injectSchemas() {
  const schemas = [];

  // 1. Organization Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://wanhuapromili.com/#organization',
    'name': '万华普罗米（北京）建筑工程有限公司',
    'alternateName': '万华普罗米',
    'description': '万华普罗米（北京）建筑工程有限公司是聚焦于中小型、经济型及中档酒店领域的工程总包与旧改服务商，核心特色为模块化装配式装修工艺，结合自有产品供应链与酒店金融解决方案。',
    'url': 'https://wanhuapromili.com',
    'telephone': '18601909855',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': '北京',
      'addressCountry': 'CN'
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'China'
    },
    'knowsAbout': [
      '酒店公装', '装配式内装', '酒店旧改', '模块化装修',
      '酒店工程总包', '酒店翻新', '酒店装修金融方案'
    ],
    'makesOffer': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': '酒店工程总包施工',
          'description': '一站式交钥匙酒店工程总包服务，涵盖图纸深化、预制构件生产到现场拼装全流程'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': '酒店旧改翻新',
          'description': '模块化装配式干法施工，零甲醛即装即住，大幅压缩停业时间'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': '酒店装修金融方案',
          'description': '为合规酒店投资人匹配定制化装修融资与垫资方案'
        }
      }
    ]
  });

  // 2. WebSite Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://wanhuapromili.com/#website',
    'url': 'https://wanhuapromili.com',
    'name': '万华普罗米 - 酒店装配式内装总包服务商',
    'description': '万华普罗米专注酒店公装总包与旧改，以模块化装配式技术、自有供应链和酒店金融方案赋能酒店投资人',
    'publisher': { '@id': 'https://wanhuapromili.com/#organization' },
    'inLanguage': 'zh-CN',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://wanhuapromili.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  });

  // 3. BreadcrumbList Schema
  const breadcrumbs = document.querySelector('.breadcrumbs');
  if (breadcrumbs) {
    const bcLinks = breadcrumbs.querySelectorAll('a');
    const items = [];
    bcLinks.forEach(function(link, i) {
      items.push({
        '@type': 'ListItem',
        'position': i + 1,
        'name': link.textContent.trim(),
        'item': link.href
      });
    });
    // Add current page
    const currentSpan = breadcrumbs.querySelector('span.current');
    if (currentSpan) {
      items.push({
        '@type': 'ListItem',
        'position': items.length + 1,
        'name': currentSpan.textContent.trim()
      });
    }
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items
    });
  }

  // 4. FAQPage Schema
  const faqSection = document.querySelector('.faq-list');
  if (faqSection) {
    const faqEntities = [];
    faqSection.querySelectorAll('.faq-item').forEach(function(item) {
      const q = item.querySelector('.faq-question span:first-child');
      const a = item.querySelector('.faq-answer-inner');
      if (q && a) {
        faqEntities.push({
          '@type': 'Question',
          'name': q.textContent.trim(),
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': a.textContent.trim()
          }
        });
      }
    });
    if (faqEntities.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqEntities
      });
    }
  }

  // 5. LocalBusiness Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': 'https://wanhuapromili.com/#localbusiness',
    'name': '万华普罗米（北京）建筑工程有限公司',
    'telephone': '18601909855',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': '北京',
      'addressCountry': 'CN'
    },
    'areaServed': '全国',
    'priceRange': '根据项目规模定制报价',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': '酒店工程服务目录',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': { '@type': 'Service', 'name': '酒店工程总包施工' }
        },
        {
          '@type': 'Offer',
          'itemOffered': { '@type': 'Service', 'name': '酒店旧改翻新' }
        },
        {
          '@type': 'Offer',
          'itemOffered': { '@type': 'Service', 'name': '酒店装修金融方案' }
        }
      ]
    }
  });

  // 6. Service Schema (if on service page)
  const servicePage = document.querySelector('[data-page="services"]');
  if (servicePage) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': '万华普罗米酒店工程服务',
      'provider': { '@id': 'https://wanhuapromili.com/#organization' },
      'serviceType': '酒店公装工程',
      'areaServed': { '@type': 'Country', 'name': 'China' },
      'description': '提供酒店总包施工、酒店旧改翻新、装配式内装与酒店金融方案一体化服务',
      'termsOfService': '根据项目签订正式工程合同',
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': '核心服务',
        'itemListElement': [
          {
            '@type': 'OfferCatalog',
            'name': '酒店工程总包施工',
            'description': '一站式交钥匙总包服务，从图纸深化到现场拼装全流程标准化管理'
          },
          {
            '@type': 'OfferCatalog',
            'name': '酒店旧改翻新',
            'description': '模块化装配式干法施工，零甲醛即装即住，大幅压缩停业时间'
          },
          {
            '@type': 'OfferCatalog',
            'name': '自有供应链与金融方案',
            'description': '核心材料自有工厂直发，联合金融机构提供定制化装修融资方案'
          }
        ]
      }
    });
  }

  // 7. Article Schema (case study pages)
  const caseArticles = document.querySelectorAll('[data-article="case-study"]');
  caseArticles.forEach(function(article) {
    const headline = article.querySelector('h2') || article.querySelector('h1');
    const body = article.querySelector('.case-body') || article.querySelector('article');
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': headline ? headline.textContent.trim() : '万华普罗米酒店工程案例',
      'author': {
        '@type': 'Organization',
        'name': '万华普罗米（北京）建筑工程有限公司'
      },
      'publisher': { '@id': 'https://wanhuapromili.com/#organization' },
      'description': body ? body.textContent.trim().substring(0, 160) : '',
      'about': '酒店装配式装修案例'
    });
  });

  // Inject schemas
  const scriptEl = document.createElement('script');
  scriptEl.type = 'application/ld+json';
  scriptEl.textContent = JSON.stringify(
    schemas.length === 1 ? schemas[0] : schemas,
    null, 0
  );
  document.head.appendChild(scriptEl);
}
