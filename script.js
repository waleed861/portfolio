/* ============================================================
   PORTFOLIO SCRIPT – Waleed Ur Rehman
   ============================================================ */

'use strict';

/* ────────────────────────────────────────────────────────────
   CUSTOM CURSOR
───────────────────────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

(function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
})();

document.querySelectorAll('a, button, .skill-card, .project-card, .edu-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '16px';
    cursor.style.height = '16px';
    cursorFollower.style.width = '52px';
    cursorFollower.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursorFollower.style.width = '36px';
    cursorFollower.style.height = '36px';
  });
});

/* ────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  updateActiveLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinkEls.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 120;
    if (window.scrollY >= top) current = s.id;
  });
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ────────────────────────────────────────────────────────────
   THEME TOGGLE
───────────────────────────────────────────────────────────── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let isDark = true;

const savedTheme = localStorage.getItem('portfolioTheme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  isDark = savedTheme === 'dark';
  themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  const theme = isDark ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolioTheme', theme);
  themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
});

/* ────────────────────────────────────────────────────────────
   TYPING ANIMATION
───────────────────────────────────────────────────────────── */
const phrases = [
  'Frontend Developer',
  'UI/UX Designer',
  'React Developer',
  'Next.js Enthusiast',
  'Graphic Designer',
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typingEl.textContent = current.slice(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 60);
  } else {
    typingEl.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
    setTimeout(typeEffect, 90);
  }
}
typeEffect();

/* ────────────────────────────────────────────────────────────
   PARTICLES
───────────────────────────────────────────────────────────── */
const particleContainer = document.getElementById('particles');
const PARTICLE_COUNT = 50;

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('div');
  p.style.cssText = `
    position: absolute;
    width: ${Math.random() * 3 + 1}px;
    height: ${Math.random() * 3 + 1}px;
    background: rgba(108,99,255,${Math.random() * 0.5 + 0.1});
    border-radius: 50%;
    left: ${Math.random() * 100}%;
    top: ${Math.random() * 100}%;
    animation: particleFloat ${Math.random() * 15 + 10}s ease-in-out infinite ${Math.random() * -15}s;
  `;
  particleContainer.appendChild(p);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes particleFloat {
    0%,100% { transform: translate(0,0) rotate(0deg); opacity: 0.3; }
    25% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * -80}px) rotate(90deg); opacity: 0.8; }
    75% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80}px) rotate(270deg); opacity: 0.2; }
  }
`;
document.head.appendChild(style);

/* ────────────────────────────────────────────────────────────
   SCROLL ANIMATIONS (Intersection Observer)
───────────────────────────────────────────────────────────── */
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-animate]').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
  animObserver.observe(el);
});

/* ────────────────────────────────────────────────────────────
   STAT COUNTER ANIMATION
───────────────────────────────────────────────────────────── */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 40);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-count]').forEach(el => counterObserver.observe(el));

/* ────────────────────────────────────────────────────────────
   SKILL BAR ANIMATION
───────────────────────────────────────────────────────────── */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-progress').forEach(bar => {
        bar.classList.add('animated');
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-panel').forEach(p => barObserver.observe(p));

/* ────────────────────────────────────────────────────────────
   SKILLS TABS
───────────────────────────────────────────────────────────── */
const tabs = document.querySelectorAll('.skill-tab');
const panels = document.querySelectorAll('.skill-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.getElementById('tab-' + tab.dataset.tab);
    if (target) {
      target.classList.add('active');
      // Trigger bar animations when tab is shown
      target.querySelectorAll('.skill-progress').forEach(bar => {
        bar.classList.remove('animated');
        setTimeout(() => bar.classList.add('animated'), 50);
      });
    }
  });
});

// Animate bars in default (active) tab on load
setTimeout(() => {
  document.querySelectorAll('.skill-panel.active .skill-progress').forEach(bar => {
    bar.classList.add('animated');
  });
}, 500);

/* ────────────────────────────────────────────────────────────
   PROJECTS FILTER
───────────────────────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      card.style.transition = 'all 0.3s ease';

      if (show) {
        card.classList.remove('hidden');
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      } else {
        setTimeout(() => card.classList.add('hidden'), 300);
      }
    });
  });
});

/* ────────────────────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    // Simple validation
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !subject || !message) {
      shakeForm();
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    btnText.textContent = 'Sending…';
    btnIcon.className = 'fas fa-spinner fa-spin';

    // Send real message using FormSubmit API
    fetch("https://formsubmit.co/ajax/waleedurrehman861@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message
      })
    })
      .then(response => response.json())
      .then(data => {
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
        btnIcon.className = 'fas fa-paper-plane';
        formSuccess.classList.add('show');
        contactForm.reset();

        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      })
      .catch(error => {
        console.error('Error sending message:', error);
        submitBtn.disabled = false;
        btnText.textContent = 'Send Message';
        btnIcon.className = 'fas fa-paper-plane';
        alert('There was an error sending your message. Please try again later.');
      });
  });
}

function shakeForm() {
  contactForm.style.animation = 'shake 0.4s ease';
  setTimeout(() => contactForm.style.animation = '', 400);
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = '@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }';
  document.head.appendChild(shakeStyle);
}

/* ────────────────────────────────────────────────────────────
   BACK TO TOP
───────────────────────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ────────────────────────────────────────────────────────────
   SMOOTH SCROLL for anchor links
───────────────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

/* ────────────────────────────────────────────────────────────
   TIMELINE ITEM STAGGER
───────────────────────────────────────────────────────────── */
document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.setAttribute('data-animate', '');
  item.style.transitionDelay = i * 150 + 'ms';
  animObserver.observe(item);
});

/* ────────────────────────────────────────────────────────────
   SKILL CARD STAGGER ON TAB SWITCH
───────────────────────────────────────────────────────────── */
function staggerCards(panel) {
  panel.querySelectorAll('.skill-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 80);
  });
}

document.querySelectorAll('.skill-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const panel = document.getElementById('tab-' + tab.dataset.tab);
    if (panel) setTimeout(() => staggerCards(panel), 50);
  });
});
// stagger on load
setTimeout(() => {
  const activePanel = document.querySelector('.skill-panel.active');
  if (activePanel) staggerCards(activePanel);
}, 300);

/* ────────────────────────────────────────────────────────────
   PAGE LOADED
───────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
  updateActiveLink();
});
