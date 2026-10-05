/**
 * Sagar Kumar Portfolio — Main Application & Router
 */

import {
  PROJECTS,
  CATS,
  AREAS,
  WORKS,
  PUBS,
  TIMELINE,
  BADGES,
  CERTS,
  SKILLS,
  COURSES,
  INTERESTS,
  FDPS,
  INTL,
  CONTACTS
} from './data.js';

import { renderSvg, renderResearchMapSvg, getIcon } from './art.js';

class App {
  constructor() {
    this.mainEl = document.getElementById('main-content');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.mobileToggle = document.getElementById('mobile-toggle');

    this.state = {
      route: this.parseRoute(),
      selectedArea: 'qml',
      projectFilter: 'all',
      pubFilter: 'all',
      timelineFilter: 'all',
      courseLevel: 'ug',
      contactForm: { name: '', email: '', org: '', message: '', type: 'Research collaboration' },
      formErrors: {},
      formSent: false,
      copiedPubId: null
    };

    this.init();
  }

  parseRoute() {
    const hash = (window.location.hash || '').replace(/^#\/?/, '');
    const parts = hash.split('/').filter(Boolean);
    const validPages = ['about', 'research', 'projects', 'publications', 'teaching', 'contact'];
    
    if (parts.length === 0 || !validPages.includes(parts[0])) {
      return { page: 'home', slug: null };
    }
    return { page: parts[0], slug: parts[1] || null };
  }

  init() {
    // Navigation events
    window.addEventListener('hashchange', () => {
      this.state.route = this.parseRoute();
      if (this.state.route.page === 'research' && this.state.route.slug) {
        if (AREAS.some(a => a.id === this.state.route.slug)) {
          this.state.selectedArea = this.state.route.slug;
        }
      }
      this.closeMobileMenu();
      this.render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile menu toggle
    if (this.mobileToggle) {
      this.mobileToggle.addEventListener('click', () => {
        const isOpen = this.mobileMenu.classList.toggle('open');
        this.mobileToggle.setAttribute('aria-expanded', isOpen);
        this.mobileToggle.innerHTML = isOpen ? getIcon('x') : getIcon('menu');
      });
    }

    // Parallax mousemove & scroll listener
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e), { passive: true });
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    // Initial render
    this.render();
  }

  closeMobileMenu() {
    if (this.mobileMenu && this.mobileMenu.classList.contains('open')) {
      this.mobileMenu.classList.remove('open');
      this.mobileToggle.setAttribute('aria-expanded', 'false');
      this.mobileToggle.innerHTML = getIcon('menu');
    }
  }

  updateNavActiveState() {
    const page = this.state.route.page;
    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkPage = href.replace(/^#\/?/, '').split('/')[0] || 'home';
      const isActive = (page === 'home' && (href === '#/' || href === '')) || (page === linkPage);
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  render() {
    this.updateNavActiveState();
    const { page, slug } = this.state.route;

    if (page === 'projects' && slug) {
      const project = PROJECTS.find(p => p.slug === slug);
      if (project) {
        this.mainEl.innerHTML = this.renderProjectDetail(project);
        this.attachProjectDetailEvents();
      } else {
        this.mainEl.innerHTML = this.renderProjectsView();
        this.attachProjectsEvents();
      }
    } else {
      switch (page) {
        case 'about':
          this.mainEl.innerHTML = this.renderAboutView();
          this.attachAboutEvents();
          break;
        case 'research':
          this.mainEl.innerHTML = this.renderResearchView();
          this.attachResearchEvents();
          break;
        case 'projects':
          this.mainEl.innerHTML = this.renderProjectsView();
          this.attachProjectsEvents();
          break;
        case 'publications':
          this.mainEl.innerHTML = this.renderPublicationsView();
          this.attachPublicationsEvents();
          break;
        case 'teaching':
          this.mainEl.innerHTML = this.renderTeachingView();
          this.attachTeachingEvents();
          break;
        case 'contact':
          this.mainEl.innerHTML = this.renderContactView();
          this.attachContactEvents();
          break;
        case 'home':
        default:
          this.mainEl.innerHTML = this.renderHomeView();
          this.attachHomeEvents();
          break;
      }
    }

    this.initScrollReveal();
  }

  /* ==========================================================================
     View: HOME
     ========================================================================== */
  renderHomeView() {
    const featuredProjects = ['quantum-speed-up-nlp', 'quantum-healthcare-ai', 'neo-nash']
      .map(slug => PROJECTS.find(p => p.slug === slug))
      .filter(Boolean);

    const areasHtml = AREAS.map((a, i) => `
      <div data-reveal="${i * 70}">
        <a href="#/research/${a.id}" class="card" style="padding: 20px 22px; height: 100%; text-decoration: none; color: var(--color-text);">
          <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 700;">
            <span style="color: var(--color-accent-700)">${a.no}</span>
            ${getIcon('arrowUpRight')}
          </div>
          <div style="height: 120px; width: 100%; margin: 8px 0;">${renderSvg(a.art, { seed: i + 3 })}</div>
          <h3 style="font-size: 1.25rem; margin: 0;">${a.title}</h3>
          <p style="margin: 0; font-size: 0.92rem; color: var(--color-neutral-800);">${a.short}</p>
        </a>
      </div>
    `).join('');

    const featuredHtml = featuredProjects.map((p, i) => {
      const cat = CATS[p.cat] || { label: p.cat, art: 'circuit' };
      const tagsHtml = p.tags.map(t => `<span class="tag tag-neutral">${t}</span>`).join('');
      return `
        <div data-reveal="${i * 90}">
          <a href="#/projects/${p.slug}" class="card" style="padding: 0; height: 100%; text-decoration: none; color: var(--color-text); overflow: hidden;">
            <div style="height: 180px; padding: 18px; border-bottom: 2px solid var(--color-divider); background: var(--color-bg);">
              ${renderSvg(cat.art, { seed: i + 5 })}
            </div>
            <div style="padding: 22px; display: flex; flex-direction: column; gap: 10px; flex: 1;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700;">
                <span style="color: var(--color-accent-700)">${cat.label}</span>
                <span style="color: var(--color-neutral-700)">P0${i + 1}</span>
              </div>
              <h3 style="font-size: 1.35rem; margin: 0;">${p.title}</h3>
              <p style="margin: 0; font-size: 0.94rem; color: var(--color-neutral-800); flex: 1;">${p.sum}</p>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">${tagsHtml}</div>
              <div style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 0.92rem; padding-top: 14px; margin-top: 8px; border-top: 2px solid var(--color-divider);">
                <span>Read case study</span>
                ${getIcon('arrowRight')}
              </div>
            </div>
          </a>
        </div>
      `;
    }).join('');

    return `
      <!-- Hero -->
      <section class="section-hero" aria-labelledby="h-home">
        <div class="content-wrap hero-grid">
          <div class="hero-left">
            <div data-reveal="0">
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                <img src="assets/sagar.png" alt="Sagar Kumar" style="width: 58px; height: 58px; object-fit: cover; border: 2px solid var(--color-accent); display: block;" loading="eager" fetchpriority="high">
                <div class="hero-tags" style="margin-bottom: 0;">
                  <span class="tag tag-outline">Assistant Professor</span>
                  <span class="tag tag-neutral">Researcher</span>
                  <span class="tag tag-neutral">Founder &amp; CEO, Kosmatron</span>
                </div>
              </div>
              <h1 id="h-home" class="hero-title">Sagar<br>Kumar<span class="dot">.</span></h1>
            </div>
            <div data-reveal="120">
              <p class="hero-lead">Researcher and educator in quantum computing, quantum machine learning and AI-driven systems. International Relation Coordinator &amp; Assistant Professor at Poornima University, Jaipur.</p>
              <div class="hero-actions">
                <a href="#/research" class="btn btn-primary">Explore the research ${getIcon('arrowRight')}</a>
                <a href="#/contact" class="btn btn-secondary">Get in touch ${getIcon('arrowRight')}</a>
              </div>
            </div>
          </div>
          <div class="hero-art-box">
            <div class="hero-svg-wrap">
              ${renderSvg('orbital', { seed: 1 })}
            </div>
            <div class="hero-caption">Fig. 01 — Bloch sphere, electron orbits, particle field</div>
          </div>
        </div>
      </section>

      <!-- Stats Bar -->
      <section class="stats-section" aria-label="At a glance">
        <div class="content-wrap stats-grid">
          <div class="stat-item" data-reveal="0">
            <div class="stat-number">03<span>.</span></div>
            <div class="stat-label">Published papers &amp; book chapters</div>
          </div>
          <div class="stat-item" data-reveal="80">
            <div class="stat-number">02<span>.</span></div>
            <div class="stat-label">Accepted — De Gruyter &amp; CRC Press</div>
          </div>
          <div class="stat-item" data-reveal="160">
            <div class="stat-number">01<span>.</span></div>
            <div class="stat-label">Patent published (In-Orbit Simulation)</div>
          </div>
          <div class="stat-item" data-reveal="240">
            <div class="stat-number">07<span>.</span></div>
            <div class="stat-label">Credly badges from IBM &amp; Linux Foundation</div>
          </div>
        </div>
      </section>

      <!-- Research Themes Overview -->
      <section style="padding: clamp(56px, 7vw, 96px) 0;">
        <div class="content-wrap">
          <div class="section-header-bar" data-reveal="0">
            <div>
              <div class="section-label">Research themes</div>
              <h2 class="section-heading">Five lines of inquiry, one quantum-AI thread.</h2>
            </div>
            <a href="#/research" class="btn btn-ghost">Open research map ${getIcon('arrowRight')}</a>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr)); gap: 24px;">
            ${areasHtml}
          </div>
        </div>
      </section>

      <!-- Featured Projects -->
      <section style="background: var(--color-surface); border-top: 2px solid var(--color-divider); padding: clamp(56px, 7vw, 96px) 0;">
        <div class="content-wrap">
          <div class="section-header-bar" data-reveal="0">
            <div>
              <div class="section-label">Featured builds</div>
              <h2 class="section-heading">Hybrid quantum-classical systems.</h2>
            </div>
            <a href="#/projects" class="btn btn-ghost">All nine projects ${getIcon('arrowRight')}</a>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 24px;">
            ${featuredHtml}
          </div>
        </div>
      </section>

      <!-- Call to Action Banner -->
      <section style="background: var(--color-accent); color: var(--color-bg); padding: clamp(56px, 8vw, 108px) 0;">
        <div class="content-wrap" style="display: flex; flex-direction: column; gap: 32px;">
          <h2 data-reveal="0" style="font-size: clamp(36px, 6vw, 84px); line-height: 0.95; letter-spacing: -0.04em; margin: 0; color: var(--color-bg);">
            Research collaboration, invited talks and academic partnerships.
          </h2>
          <div data-reveal="100" style="display: flex; gap: 14px; flex-wrap: wrap;">
            <a href="#/contact" class="btn" style="background: var(--color-bg); color: var(--color-text);">Start a conversation ${getIcon('arrowRight')}</a>
            <a href="assets/Sagar_Kumar_CV.pdf" download="Sagar_Kumar_CV.pdf" class="btn btn-secondary" style="color: var(--color-bg); border-color: var(--color-bg);">Download CV ${getIcon('download')}</a>
          </div>
        </div>
      </section>
    `;
  }
  attachHomeEvents() {}

  /* ==========================================================================
     View: ABOUT
     ========================================================================== */
  renderAboutView() {
    const filteredTimeline = TIMELINE.filter(t => 
      this.state.timelineFilter === 'all' || t.kind === this.state.timelineFilter
    );

    const timelineHtml = filteredTimeline.map(t => {
      const tagClass = t.kind === 'education' ? 'tag-neutral' : t.kind === 'venture' ? 'tag-outline' : 'tag-accent';
      const kindLabel = t.kind.charAt(0).toUpperCase() + t.kind.slice(1);
      const isPresent = /Present/.test(t.range);
      const pointsHtml = t.points.length > 0 
        ? `<ul style="margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 6px; font-size: 0.95rem; color: var(--color-neutral-900);">
            ${t.points.map(p => `<li>${p}</li>`).join('')}
           </ul>`
        : '';

      return `
        <article class="timeline-item" data-reveal="0">
          <div class="timeline-year">${t.year}</div>
          <div class="timeline-content">
            <span class="timeline-dot ${isPresent ? 'active' : ''}"></span>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 10px;">
              <span class="tag ${tagClass}">${kindLabel}</span>
              <span style="font-size: 0.88rem; color: var(--color-neutral-700); font-weight: 600;">${t.range}</span>
            </div>
            <h3 style="font-size: clamp(20px, 2vw, 26px); margin: 0 0 4px;">${t.role}</h3>
            <div style="font-size: 1rem; color: var(--color-neutral-800); margin-bottom: 12px; font-weight: 600;">${t.org}</div>
            ${pointsHtml}
          </div>
        </article>
      `;
    }).join('');

    const badgesHtml = BADGES.map((b, i) => `
      <div data-reveal="${(i % 4) * 60}">
        <a href="${b.url}" target="_blank" rel="noopener" class="card" style="height: 100%; text-decoration: none; color: var(--color-text);">
          <div style="display: flex; justify-content: space-between; color: var(--color-accent);">
            ${getIcon('award')}
            ${getIcon('arrowUpRight')}
          </div>
          <div class="card-title" style="font-size: 1.05rem;">${b.t}</div>
          <div class="card-meta" style="font-size: 0.82rem; font-weight: 600;">${b.by}</div>
        </a>
      </div>
    `).join('');

    const skillsHtml = SKILLS.map((g, i) => `
      <div data-reveal="${i * 70}" style="border-top: 2px solid var(--color-accent-500); padding-top: 18px;">
        <h3 style="font-size: 1.25rem; margin: 0 0 14px; color: var(--color-bg);">${g.g}</h3>
        ${g.rows.map(r => `
          <div style="padding: 10px 0; border-top: 1px solid var(--color-neutral-800);">
            <div style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-400); font-weight: 700; margin-bottom: 4px;">${r.k}</div>
            <div style="font-size: 0.94rem; line-height: 1.5; color: var(--color-bg);">${r.v}</div>
          </div>
        `).join('')}
      </div>
    `).join('');

    const certsHtml = CERTS.map((c, i) => `
      <div data-reveal="${i * 60}" style="border-top: 2px solid var(--color-divider); padding: 18px 0;">
        <h3 style="font-size: 1.05rem; margin: 0 0 10px;">${c.g}</h3>
        <ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; font-size: 0.94rem;">
          ${c.items.map(item => `<li style="color: var(--color-neutral-800);">• ${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    return `
      <!-- About Header -->
      <section class="section-hero" aria-labelledby="h-about">
        <div class="content-wrap hero-grid">
          <div class="hero-left">
            <div data-reveal="0">
              <div class="section-label">02 — About</div>
              <h1 id="h-about" class="hero-title" style="font-size: clamp(48px, 7vw, 92px);">Jaipur, St.&nbsp;Petersburg, and back again.</h1>
            </div>
            <p class="hero-lead">An academic and professional journey through computer science, data science, quantum systems and international higher education.</p>
          </div>
          <div class="hero-art-box">
            <div class="hero-svg-wrap">
              ${renderSvg('galaxy', { seed: 2 })}
            </div>
          </div>
        </div>
      </section>

      <!-- Biography -->
      <section style="padding: clamp(48px, 6vw, 88px) 0;">
        <div class="content-wrap" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: clamp(32px, 5vw, 72px);">
          <div>
            <div style="width: 100%; max-width: 440px; border: 2px solid var(--color-divider); overflow: hidden; background: var(--color-surface); box-shadow: var(--shadow-sm);">
              <img src="assets/sagar.png" alt="Sagar Kumar — Assistant Professor &amp; Researcher" style="width: 100%; height: auto; max-height: 540px; object-fit: cover; display: block;" loading="eager" fetchpriority="high">
            </div>
            <div style="font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; margin-top: 10px; color: var(--color-neutral-700);">Sagar Kumar — Poornima University, Jaipur</div>
          </div>
          <div data-reveal="100" style="display: flex; flex-direction: column; gap: 20px; font-size: 1.1rem; line-height: 1.65;">
            <p style="font-size: clamp(20px, 2vw, 26px); font-weight: 700; line-height: 1.35; margin: 0;">
              Sagar Kumar is an Assistant Professor and International Relation Coordinator at Poornima University, Jaipur, researching quantum computing, quantum machine learning and AI-driven systems.
            </p>
            <p>
              He teaches undergraduate and postgraduate courses in Computer Science &amp; Engineering — including Quantum Computing, AI, Android Application Development and MEAN Stack Web Development — and mentors students on research projects, academic publications and industry-aligned software.
            </p>
            <p>
              He holds a Master of Engineering in Computer Science &amp; Engineering from ITMO University, St. Petersburg, Russia, and a B.Tech (CSE) from ICFAI University, Jaipur. Prior to academia he worked as a data engineer and data scientist; in 2023 he founded Kosmatron, a technology startup focused on quantum computing, space-technology research and software product development.
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-top: 8px;">
              <div style="padding: 12px 0; border-top: 2px solid var(--color-divider);">
                <div style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-700); font-weight: 700;">Based in</div>
                <div style="font-size: 1rem; font-weight: 800; margin-top: 4px;">Jaipur, Rajasthan, India</div>
              </div>
              <div style="padding: 12px 0; border-top: 2px solid var(--color-divider);">
                <div style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-700); font-weight: 700;">Current Role</div>
                <div style="font-size: 1rem; font-weight: 800; margin-top: 4px;">Poornima University</div>
              </div>
              <div style="padding: 12px 0; border-top: 2px solid var(--color-divider);">
                <div style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-700); font-weight: 700;">Venture</div>
                <div style="font-size: 1rem; font-weight: 800; margin-top: 4px;">Kosmatron, Jodhpur</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Timeline -->
      <section style="border-top: 2px solid var(--color-divider); padding: clamp(48px, 6vw, 88px) 0;">
        <div class="content-wrap">
          <div class="section-header-bar" data-reveal="0">
            <div>
              <div class="section-label">Timeline</div>
              <h2 class="section-heading">Education &amp; experience</h2>
            </div>
            <div class="seg-group" id="tl-filters">
              ${[['all', 'All'], ['academia', 'Academia'], ['industry', 'Industry'], ['venture', 'Venture'], ['education', 'Education']].map(([k, label]) => `
                <button class="seg-btn ${this.state.timelineFilter === k ? 'active' : ''}" data-filter="${k}">${label}</button>
              `).join('')}
            </div>
          </div>
          <div class="timeline-wrap" id="timeline-container">
            <div class="timeline-spine"></div>
            <div class="timeline-spine-fill" id="tl-spine-fill"></div>
            ${timelineHtml}
          </div>
        </div>
      </section>

      <!-- Skills Matrix -->
      <section style="background: var(--color-text); color: var(--color-bg); padding: clamp(56px, 7vw, 96px) 0;">
        <div class="content-wrap">
          <div class="section-header-bar" data-reveal="0" style="margin-bottom: 36px;">
            <div>
              <div class="section-label" style="color: var(--color-accent-400)">Expertise</div>
              <h2 class="section-heading" style="color: var(--color-bg)">Technical capabilities</h2>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 32px;">
            ${skillsHtml}
          </div>
        </div>
      </section>

      <!-- Credentials & Badges -->
      <section style="padding: clamp(56px, 7vw, 96px) 0;">
        <div class="content-wrap">
          <div class="section-header-bar" data-reveal="0">
            <div>
              <div class="section-label">Credentials</div>
              <h2 class="section-heading">Verified badges &amp; certifications</h2>
            </div>
            <a href="https://www.credly.com/users/sagar-kumar.a51d16f1" target="_blank" rel="noopener" class="btn btn-ghost">
              Credly profile ${getIcon('arrowUpRight')}
            </a>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 16px; margin-bottom: 56px;">
            ${badgesHtml}
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); column-gap: 24px;">
            ${certsHtml}
          </div>
        </div>
      </section>
    `;
  }

  attachAboutEvents() {
    const filterBtns = document.querySelectorAll('#tl-filters .seg-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.timelineFilter = btn.getAttribute('data-filter');
        this.render();
      });
    });
  }

  /* ==========================================================================
     View: RESEARCH
     ========================================================================== */
  renderResearchView() {
    const selArea = AREAS.find(a => a.id === this.state.selectedArea) || AREAS[1];
    const linkedWorks = WORKS.filter(w => w.area === selArea.id);

    const linkedWorksHtml = linkedWorks.map(w => `
      <a href="${w.href}" class="linked-work-link">
        <span>
          <span class="linked-work-badge">${w.kind}</span>
          ${w.label}
        </span>
        ${getIcon('arrowRight')}
      </a>
    `).join('');

    const areasCardsHtml = AREAS.map((a, i) => {
      const isSelected = a.id === this.state.selectedArea;
      return `
        <div data-reveal="${i * 70}">
          <div class="card area-select-card" data-area-id="${a.id}" style="cursor: pointer; height: 100%; border-top: 4px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-divider)'};">
            <div style="height: 140px; padding: 16px; border-bottom: 2px solid var(--color-divider); background: var(--color-bg);">
              ${renderSvg(a.art, { seed: i + 7 })}
            </div>
            <div style="padding: 16px 0 0; display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 13px; font-weight: 700; color: var(--color-accent-700);">${a.no} · ${WORKS.filter(w => w.area === a.id).length} linked works</div>
              <h3 style="font-size: 1.25rem; margin: 0;">${a.title}</h3>
              <p style="margin: 0; font-size: 0.92rem; color: var(--color-neutral-800);">${a.desc}</p>
              <div style="display: flex; gap: 6px; align-items: center; font-size: 0.88rem; font-weight: 700; color: var(--color-accent-700); margin-top: 6px;">
                <span>View on map</span>
                ${getIcon('arrowUp')}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <!-- Research Header -->
      <section class="section-hero" aria-labelledby="h-research">
        <div class="content-wrap hero-grid">
          <div class="hero-left">
            <div data-reveal="0">
              <div class="section-label">03 — Research</div>
              <h1 id="h-research" class="hero-title" style="font-size: clamp(48px, 7vw, 92px);">From qubits to orbit.</h1>
            </div>
            <p class="hero-lead">Research lines cover quantum computing algorithms, quantum machine learning, space computing, lightweight neural architectures and production software platforms.</p>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;">
              ${INTERESTS.map(item => `<span class="tag tag-neutral">${item}</span>`).join('')}
            </div>
          </div>
          <div class="hero-art-box">
            <div class="hero-svg-wrap">
              ${renderSvg('constellation', { seed: 3 })}
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Research Map -->
      <section class="research-map-section" id="research-map-anchor" aria-labelledby="h-map">
        <div class="content-wrap">
          <div class="section-header-bar" data-reveal="0" style="margin-bottom: 28px;">
            <div>
              <div class="section-label" style="color: var(--color-accent-400)">Interactive research map</div>
              <h2 class="section-heading" style="color: var(--color-bg)">Trace a theme to its projects and publications.</h2>
            </div>
            <p style="margin: 0; font-size: 0.9rem; color: var(--color-neutral-400); max-width: 320px;">
              Select any theme on the left to illuminate linked research work and publications.
            </p>
          </div>
          <div class="map-layout">
            <div class="map-svg-container">
              ${renderResearchMapSvg(this.state.selectedArea)}
            </div>
            <div class="map-theme-card">
              <div class="map-theme-kicker">Theme ${selArea.no}</div>
              <h3 class="map-theme-title">${selArea.title}</h3>
              <p class="map-theme-desc">${selArea.desc}</p>
              <div style="font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: var(--color-neutral-400); margin-bottom: 8px;">
                Linked work · ${linkedWorks.length}
              </div>
              <div class="linked-works-list">
                ${linkedWorksHtml}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Detailed Areas -->
      <section style="padding: clamp(56px, 7vw, 96px) 0;">
        <div class="content-wrap">
          <div class="section-header-bar" data-reveal="0">
            <div>
              <div class="section-label">Research lines</div>
              <h2 class="section-heading">Areas in detail</h2>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 24px;">
            ${areasCardsHtml}
          </div>
        </div>
      </section>
    `;
  }

  attachResearchEvents() {
    // Map theme buttons
    document.querySelectorAll('.map-theme-btn').forEach(el => {
      el.addEventListener('click', () => {
        const areaId = el.getAttribute('data-area-id');
        this.state.selectedArea = areaId;
        this.render();
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.state.selectedArea = el.getAttribute('data-area-id');
          this.render();
        }
      });
    });

    // Map work links
    document.querySelectorAll('.map-work-btn').forEach(el => {
      el.addEventListener('click', () => {
        window.location.hash = el.getAttribute('data-href');
      });
    });

    // Lower area cards
    document.querySelectorAll('.area-select-card').forEach(card => {
      card.addEventListener('click', () => {
        const areaId = card.getAttribute('data-area-id');
        this.state.selectedArea = areaId;
        this.render();
        const mapAnchor = document.getElementById('research-map-anchor');
        if (mapAnchor) {
          mapAnchor.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /* ==========================================================================
     View: PROJECTS
     ========================================================================== */
  renderProjectsView() {
    const filteredProjects = PROJECTS.filter(p => 
      this.state.projectFilter === 'all' || p.cat === this.state.projectFilter
    );

    const categories = [
      ['all', 'All'],
      ['quantum', 'Quantum'],
      ['ai', 'AI & Data'],
      ['physics', 'Physics & Space'],
      ['software', 'Software']
    ];

    const filterBtnsHtml = categories.map(([k, label]) => {
      const count = k === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.cat === k).length;
      return `
        <button class="seg-btn ${this.state.projectFilter === k ? 'active' : ''}" data-filter="${k}">
          ${label} <span class="seg-count">${count}</span>
        </button>
      `;
    }).join('');

    const projectsGridHtml = filteredProjects.map((p, i) => {
      const cat = CATS[p.cat] || { label: p.cat, art: 'circuit' };
      const tagsHtml = p.tags.map(t => `<span class="tag tag-neutral" style="background: var(--color-bg);">${t}</span>`).join('');
      return `
        <div data-reveal="${(i % 3) * 80}">
          <a href="#/projects/${p.slug}" class="card" style="padding: 0; height: 100%; text-decoration: none; color: var(--color-text); overflow: hidden;">
            <div style="height: 180px; padding: 18px; border-bottom: 2px solid var(--color-divider); background: var(--color-bg);">
              ${renderSvg(cat.art, { seed: i + 2 })}
            </div>
            <div style="padding: 22px; display: flex; flex-direction: column; gap: 10px; flex: 1;">
              <div style="display: flex; justify-content: space-between; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700;">
                <span style="color: var(--color-accent-700)">${cat.label}</span>
                <span style="color: var(--color-neutral-700)">P0${PROJECTS.indexOf(p) + 1}</span>
              </div>
              <h3 style="font-size: 1.35rem; margin: 0;">${p.title}</h3>
              <div style="font-size: 0.94rem; font-weight: 700; color: var(--color-neutral-800);">${p.sub}</div>
              <p style="margin: 0; font-size: 0.94rem; color: var(--color-neutral-800); flex: 1;">${p.sum}</p>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">${tagsHtml}</div>
              <div style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; font-size: 0.92rem; padding-top: 14px; margin-top: 8px; border-top: 2px solid var(--color-divider);">
                <span>Read case study</span>
                ${getIcon('arrowRight')}
              </div>
            </div>
          </a>
        </div>
      `;
    }).join('');

    return `
      <!-- Projects Header -->
      <section class="section-hero" aria-labelledby="h-projects">
        <div class="content-wrap hero-grid">
          <div class="hero-left">
            <div data-reveal="0">
              <div class="section-label">04 — Projects</div>
              <h1 id="h-projects" class="hero-title" style="font-size: clamp(48px, 7vw, 92px);">Research &amp; development.</h1>
            </div>
            <p class="hero-lead">Nine builds — hybrid quantum-classical models, variational eigensolvers, physics simulations, financial LLMs, and production Android and MEAN-stack applications.</p>
          </div>
          <div class="hero-art-box">
            <div class="hero-svg-wrap">
              ${renderSvg('circuit', { seed: 4 })}
            </div>
          </div>
        </div>
      </section>

      <!-- Projects Grid -->
      <section style="padding: clamp(48px, 6vw, 96px) 0;">
        <div class="content-wrap">
          <div style="margin-bottom: 32px;">
            <div class="seg-group" id="proj-filters">
              ${filterBtnsHtml}
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr)); gap: 24px;">
            ${projectsGridHtml}
          </div>
        </div>
      </section>
    `;
  }

  attachProjectsEvents() {
    document.querySelectorAll('#proj-filters .seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.projectFilter = btn.getAttribute('data-filter');
        this.render();
      });
    });
  }

  /* ==========================================================================
     View: PROJECT DETAIL
     ========================================================================== */
  renderProjectDetail(p) {
    const idx = PROJECTS.indexOf(p);
    const prev = PROJECTS[(idx + PROJECTS.length - 1) % PROJECTS.length];
    const next = PROJECTS[(idx + 1) % PROJECTS.length];
    const cat = CATS[p.cat] || { label: p.cat, art: 'circuit' };
    const area = AREAS.find(a => a.id === p.area) || AREAS[0];

    const pointsHtml = p.points.map((pt, k) => `
      <li data-reveal="0" style="display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 12px; padding: 18px 0; border-top: 2px solid var(--color-divider); font-size: 1.05rem; line-height: 1.6;">
        <span style="font-weight: 800; color: var(--color-accent-700);">0${k + 1}</span>
        <span>${pt}</span>
      </li>
    `).join('');

    const evalBanner = p.metric ? `
      <div data-reveal="0" style="background: var(--color-accent-100); padding: 20px 24px; margin-bottom: 28px; border-top: 4px solid var(--color-accent);">
        <div style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700; color: var(--color-accent-800); margin-bottom: 4px;">User Evaluation</div>
        <div style="font-size: 1.15rem; font-weight: 800; color: var(--color-accent-900);">${p.metric}</div>
      </div>
    ` : '';

    return `
      <section class="section-hero">
        <div class="content-wrap" style="padding-top: 24px;">
          <nav aria-label="Breadcrumb" style="display: flex; gap: 10px; align-items: center; font-size: 0.88rem; font-weight: 600; margin-bottom: 24px;">
            <a href="#/projects" style="color: var(--color-neutral-800); text-decoration: none; display: flex; gap: 6px; align-items: center;">
              ${getIcon('arrowLeft')} Projects
            </a>
            <span style="color: var(--color-neutral-500)">/</span>
            <span style="color: var(--color-accent-700)">${p.title}</span>
          </nav>
          <div class="hero-grid" style="min-height: auto; padding-bottom: 48px;">
            <div style="display: flex; flex-direction: column; justify-content: center; gap: 16px;">
              <div class="section-label">${cat.label} — P0${idx + 1}</div>
              <h1 style="font-size: clamp(38px, 5.5vw, 76px); margin: 0; line-height: 0.95;">${p.title}</h1>
              <div style="font-size: clamp(18px, 1.8vw, 24px); font-weight: 700; color: var(--color-neutral-800);">${p.sub}</div>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px;">
                ${p.tags.map(t => `<span class="tag tag-accent">${t}</span>`).join('')}
              </div>
            </div>
            <div class="hero-art-box" style="padding: 0;">
              <div class="hero-svg-wrap" style="max-height: 380px;">
                ${renderSvg(cat.art, { seed: idx + 8 })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Case study contents -->
      <section style="padding: clamp(48px, 6vw, 88px) 0;">
        <div class="content-wrap" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: clamp(32px, 5vw, 72px); align-items: start;">
          <aside style="display: flex; flex-direction: column;">
            <div style="padding: 14px 0; border-top: 2px solid var(--color-divider);">
              <div style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-700); font-weight: 700;">Category</div>
              <div style="font-weight: 800; font-size: 1.05rem; margin-top: 4px;">${cat.label}</div>
            </div>
            <div style="padding: 14px 0; border-top: 2px solid var(--color-divider);">
              <div style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-700); font-weight: 700;">Research Line</div>
              <a href="#/research/${area.id}" style="display: flex; gap: 6px; align-items: center; font-weight: 800; font-size: 1.05rem; margin-top: 4px;">
                ${area.title} ${getIcon('arrowRight')}
              </a>
            </div>
            <div style="padding: 14px 0; border-top: 2px solid var(--color-divider);">
              <div style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-700); font-weight: 700;">Tech Stack</div>
              <div style="margin-top: 4px; font-size: 0.95rem; line-height: 1.55;">${p.stack}</div>
            </div>
          </aside>
          <div style="grid-column: span 2;">
            ${evalBanner}
            <h2 style="font-size: clamp(26px, 3vw, 36px); margin: 0 0 16px;">What was built</h2>
            <ol style="list-style: none; margin: 0; padding: 0;">
              ${pointsHtml}
            </ol>
          </div>
        </div>
      </section>

      <!-- Prev / Next Navigation -->
      <nav style="border-top: 2px solid var(--color-divider);" aria-label="More projects">
        <div class="content-wrap" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 24px;">
          <a href="#/projects/${prev.slug}" style="display: flex; flex-direction: column; gap: 6px; padding: 28px 0; text-decoration: none; color: var(--color-text);">
            <span style="display: flex; gap: 6px; align-items: center; font-size: 0.85rem; font-weight: 700; color: var(--color-neutral-700);">
              ${getIcon('arrowLeft')} Previous project
            </span>
            <span style="font-size: 1.35rem; font-weight: 800;">${prev.title}</span>
          </a>
          <a href="#/projects/${next.slug}" style="display: flex; flex-direction: column; gap: 6px; padding: 28px 0; text-decoration: none; color: var(--color-text); text-align: right; align-items: flex-end;">
            <span style="display: flex; gap: 6px; align-items: center; font-size: 0.85rem; font-weight: 700; color: var(--color-neutral-700);">
              Next project ${getIcon('arrowRight')}
            </span>
            <span style="font-size: 1.35rem; font-weight: 800;">${next.title}</span>
          </a>
        </div>
      </nav>
    `;
  }
  attachProjectDetailEvents() {}

  /* ==========================================================================
     View: PUBLICATIONS
     ========================================================================== */
  renderPublicationsView() {
    const filteredPubs = PUBS.filter(p => 
      this.state.pubFilter === 'all' || p.f === this.state.pubFilter
    );

    const categories = [
      ['all', 'All'],
      ['published', 'Published'],
      ['accepted', 'Accepted'],
      ['patent', 'Patent'],
      ['review', 'Book review']
    ];

    const filterBtnsHtml = categories.map(([k, label]) => {
      const count = k === 'all' ? PUBS.length : PUBS.filter(p => p.f === k).length;
      return `
        <button class="seg-btn ${this.state.pubFilter === k ? 'active' : ''}" data-filter="${k}">
          ${label} <span class="seg-count">${count}</span>
        </button>
      `;
    }).join('');

    const pubsHtml = filteredPubs.map((b, i) => {
      const isCopied = this.state.copiedPubId === b.id;
      const statusClass = b.f === 'accepted' ? 'tag-outline' : 'tag-accent';
      const doiLink = b.doi ? `<div style="font-size: 0.88rem; font-variant-numeric: tabular-nums;">DOI: <a href="https://doi.org/${b.doi}" target="_blank" rel="noopener">${b.doi}</a></div>` : '';
      const noteHtml = b.note ? `<div style="font-size: 0.85rem; padding: 8px 10px; border: 1px dashed var(--color-neutral-500); color: var(--color-neutral-700);">${b.note}</div>` : '';

      return `
        <article data-reveal="${(i % 4) * 60}" style="display: grid; grid-template-columns: clamp(48px, 6vw, 88px) minmax(0, 1fr); gap: 16px; padding: 26px 0; border-top: 2px solid var(--color-divider);">
          <div style="font-size: clamp(22px, 2.4vw, 34px); font-weight: 800; color: var(--color-neutral-500);">0${PUBS.indexOf(b) + 1}</div>
          <div style="display: flex; flex-wrap: wrap; gap: 16px 32px; justify-content: space-between; align-items: flex-start;">
            <div style="flex: 1 1 420px; min-width: 0; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <span class="tag ${statusClass}">${b.status}</span>
                <span class="tag tag-neutral">${b.type}</span>
              </div>
              <h3 style="font-size: clamp(19px, 1.8vw, 24px); line-height: 1.25; margin: 0;">${b.title}</h3>
              <div style="font-size: 0.95rem; color: var(--color-neutral-800);">${b.venue}</div>
              ${doiLink}
              ${noteHtml}
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="btn btn-secondary copy-citation-btn" data-id="${b.id}">
                ${isCopied ? getIcon('check') : getIcon('copy')}
                <span>${isCopied ? 'Copied' : 'Copy citation'}</span>
              </button>
              ${b.doi ? `
                <a href="https://doi.org/${b.doi}" target="_blank" rel="noopener" class="btn btn-ghost">
                  Open DOI ${getIcon('arrowUpRight')}
                </a>
              ` : ''}
            </div>
          </div>
        </article>
      `;
    }).join('');

    return `
      <!-- Publications Header -->
      <section class="section-hero" aria-labelledby="h-pubs">
        <div class="content-wrap hero-grid">
          <div class="hero-left">
            <div data-reveal="0">
              <div class="section-label">05 — Publications &amp; writing</div>
              <h1 id="h-pubs" class="hero-title" style="font-size: clamp(48px, 7vw, 92px);">Papers, chapters, a patent.</h1>
            </div>
            <p class="hero-lead">Three published works, two accepted in major volumes (De Gruyter &amp; CRC Press), a published space-simulation patent, and book reviews for Manning Publications.</p>
          </div>
          <div class="hero-art-box">
            <div class="hero-svg-wrap">
              ${renderSvg('wave', { seed: 5 })}
            </div>
          </div>
        </div>
      </section>

      <!-- Publications List -->
      <section style="padding: clamp(48px, 6vw, 96px) 0;">
        <div class="content-wrap">
          <div style="margin-bottom: 28px;">
            <div class="seg-group" id="pub-filters">
              ${filterBtnsHtml}
            </div>
          </div>
          <div role="list">
            ${pubsHtml}
          </div>
        </div>
      </section>
    `;
  }

  attachPublicationsEvents() {
    document.querySelectorAll('#pub-filters .seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.pubFilter = btn.getAttribute('data-filter');
        this.render();
      });
    });

    document.querySelectorAll('.copy-citation-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const pub = PUBS.find(p => p.id === id);
        if (pub) {
          const citation = `Kumar, S. "${pub.title}". ${pub.venue}${pub.doi ? '. https://doi.org/' + pub.doi : ''}.`;
          navigator.clipboard.writeText(citation).then(() => {
            this.state.copiedPubId = id;
            this.render();
            setTimeout(() => {
              this.state.copiedPubId = null;
              this.render();
            }, 1800);
          });
        }
      });
    });
  }

  /* ==========================================================================
     View: TEACHING
     ========================================================================== */
  renderTeachingView() {
    const isUg = this.state.courseLevel === 'ug';
    const activeCourses = COURSES[this.state.courseLevel] || [];

    const coursesHtml = activeCourses.map(([name, prog], i) => `
      <div data-reveal="${(i % 4) * 50}" style="display: flex; justify-content: space-between; gap: 12px; align-items: baseline; padding: 18px 0; border-top: 2px solid var(--color-divider);">
        <span style="font-size: 1.1rem; font-weight: 700;">${name}</span>
        <span style="font-size: 0.85rem; color: var(--color-neutral-700); white-space: nowrap;">${prog}</span>
      </div>
    `).join('');

    const rolesHtml = [
      {
        range: 'June 2025 – Present',
        role: 'Assistant Professor & International Coordinator',
        org: 'Poornima University, Jaipur',
        points: [
          'Teaching UG and PG courses in Computer Science & Engineering including Quantum Computing, AI, Android Application Development and MEAN Stack Web Development.',
          'Mentoring students on research projects, academic publications and industry-aligned software projects.',
          'Spearheading international university partnerships, global faculty & student mobility, and collaborative academic curricula.'
        ]
      },
      {
        range: 'August 2023 – June 2025',
        role: 'Visiting Assistant Professor',
        org: 'ICFAI University, Jaipur',
        points: [
          'Taught 7 courses across UG and PG levels: Machine Learning, Big Data Analytics, Data Science, Fuzzy Logic, Wireless Networks and Computer Networks.',
          'Supervised student projects integrating quantum computing, AI and full-stack development methodologies.',
          'Contributed to curriculum design and academic development activities.'
        ]
      }
    ].map((r, i) => `
      <div class="card" data-reveal="${i * 90}" style="padding: 26px;">
        <div class="card-kicker">${r.range}</div>
        <h2 style="font-size: 1.45rem; margin: 4px 0 8px;">${r.role}</h2>
        <div style="font-size: 1rem; color: var(--color-neutral-800); font-weight: 700; margin-bottom: 12px;">${r.org}</div>
        <ul style="margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 8px; font-size: 0.95rem;">
          ${r.points.map(pt => `<li>${pt}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    return `
      <!-- Teaching Header -->
      <section class="section-hero" aria-labelledby="h-teach">
        <div class="content-wrap hero-grid">
          <div class="hero-left">
            <div data-reveal="0">
              <div class="section-label">06 — Teaching &amp; collaborations</div>
              <h1 id="h-teach" class="hero-title" style="font-size: clamp(48px, 7vw, 92px);">Classrooms, curricula, partnerships.</h1>
            </div>
            <p class="hero-lead">Teaching quantum computing, AI, data science and software engineering across undergraduate and postgraduate programmes — while expanding international academic alliances.</p>
          </div>
          <div class="hero-art-box">
            <div class="hero-svg-wrap">
              ${renderSvg('neural', { seed: 6 })}
            </div>
          </div>
        </div>
      </section>

      <!-- Roles -->
      <section style="padding: clamp(48px, 6vw, 88px) 0;">
        <div class="content-wrap">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: 24px;">
            ${rolesHtml}
          </div>
        </div>
      </section>

      <!-- Courses -->
      <section style="border-top: 2px solid var(--color-divider); padding: clamp(48px, 6vw, 88px) 0;">
        <div class="content-wrap">
          <div class="section-header-bar" data-reveal="0">
            <div>
              <div class="section-label">Courses taught</div>
              <h2 class="section-heading">${isUg ? 'Eight undergraduate courses' : 'Five postgraduate courses'}</h2>
            </div>
            <div class="seg-group" id="course-level-filters">
              <button class="seg-btn ${isUg ? 'active' : ''}" data-level="ug">Undergraduate</button>
              <button class="seg-btn ${!isUg ? 'active' : ''}" data-level="pg">Postgraduate</button>
            </div>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr)); column-gap: 24px;">
            ${coursesHtml}
          </div>
        </div>
      </section>

      <!-- Global Internationalization -->
      <section style="background: var(--color-text); color: var(--color-bg); padding: clamp(56px, 7vw, 96px) 0;">
        <div class="content-wrap" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr)); gap: clamp(32px, 5vw, 72px); align-items: center;">
          <div data-reveal="0">
            <div class="section-label" style="color: var(--color-accent-400)">International engagement</div>
            <h2 class="section-heading" style="color: var(--color-bg); margin-bottom: 24px;">International Relation Coordinator, Poornima University.</h2>
            ${INTL.map(i => `
              <div style="display: grid; grid-template-columns: 40px minmax(0, 1fr); gap: 12px; padding: 16px 0; border-top: 1px solid var(--color-neutral-700); font-size: 1rem; line-height: 1.55;">
                <span style="font-weight: 800; color: var(--color-accent-400);">${i.n}</span>
                <span>
                  <strong style="display: block; margin-bottom: 2px;">${i.t}</strong>
                  <span style="color: var(--color-neutral-300);">${i.d}</span>
                </span>
              </div>
            `).join('')}
          </div>
          <div data-reveal="120" style="display: flex; flex-direction: column; align-items: center;">
            <div style="width: 100%; max-width: 480px; aspect-ratio: 1;">
              ${renderSvg('globe', { seed: 8 })}
            </div>
            <div style="font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-400); margin-top: 12px;">
              Fig. — Global engagement &amp; academic linkages from Jaipur
            </div>
          </div>
        </div>
      </section>

      <!-- FDPs -->
      <section style="padding: clamp(56px, 7vw, 96px) 0;">
        <div class="content-wrap">
          <div class="section-header-bar" data-reveal="0">
            <div>
              <div class="section-label">Professional Development</div>
              <h2 class="section-heading">Faculty development programmes</h2>
            </div>
          </div>
          ${FDPS.map(f => `
            <div data-reveal="0" style="display: grid; grid-template-columns: clamp(48px, 6vw, 88px) minmax(0, 1fr); gap: 16px; padding: 22px 0; border-top: 2px solid var(--color-divider);">
              <span style="font-size: 1.5rem; font-weight: 800; color: var(--color-neutral-500);">${f.n}</span>
              <span>
                <strong style="display: block; font-size: 1.15rem; line-height: 1.35;">${f.t}</strong>
                <span style="display: block; font-size: 0.95rem; color: var(--color-neutral-800); margin-top: 4px;">${f.by}</span>
              </span>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  attachTeachingEvents() {
    document.querySelectorAll('#course-level-filters .seg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.state.courseLevel = btn.getAttribute('data-level');
        this.render();
      });
    });
  }

  /* ==========================================================================
     View: CONTACT
     ========================================================================== */
  renderContactView() {
    const f = this.state.contactForm;
    const err = this.state.formErrors;

    const contactsListHtml = CONTACTS.map(c => `
      <a href="${c.href}" target="${c.target}" rel="noopener" style="display: grid; grid-template-columns: 28px minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 18px 0; border-top: 2px solid var(--color-divider); text-decoration: none; color: var(--color-text); transition: padding .2s ease;">
        <span style="color: var(--color-accent);">${getIcon(c.icon)}</span>
        <span style="min-width: 0;">
          <span style="display: block; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-neutral-700); font-weight: 700;">${c.k}</span>
          <span style="display: block; font-size: 1.05rem; font-weight: 800; overflow-wrap: anywhere;">${c.v}</span>
        </span>
        <span>${getIcon('arrowUpRight')}</span>
      </a>
    `).join('');

    return `
      <!-- Contact Header -->
      <section class="section-hero" aria-labelledby="h-contact">
        <div class="content-wrap hero-grid">
          <div class="hero-left">
            <div data-reveal="0">
              <div class="section-label">07 — Contact</div>
              <h1 id="h-contact" class="hero-title" style="font-size: clamp(48px, 7vw, 92px);">Let’s talk research.</h1>
            </div>
            <p class="hero-lead">For research collaboration, invited keynote speaking, student mentorship or global university partnership opportunities.</p>
          </div>
          <div class="hero-art-box">
            <div class="hero-svg-wrap">
              ${renderSvg('signal', { seed: 7 })}
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Form & Direct Details -->
      <section style="padding: clamp(48px, 6vw, 96px) 0;">
        <div class="content-wrap" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr)); gap: clamp(40px, 6vw, 88px); align-items: start;">
          <div>
            ${!this.state.formSent ? `
              <form id="contact-form" novalidate style="display: flex; flex-direction: column; gap: 18px;">
                <h2 style="font-size: clamp(26px, 3vw, 36px); margin: 0 0 8px;">Send a message</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
                  <div class="field">
                    <label class="label" for="cf-name">Name *</label>
                    <input id="cf-name" class="input" name="name" type="text" autocomplete="name" value="${f.name}" placeholder="Your name" aria-invalid="${!!err.name}">
                    ${err.name ? `<div class="form-error" role="alert">${err.name}</div>` : ''}
                  </div>
                  <div class="field">
                    <label class="label" for="cf-email">Email *</label>
                    <input id="cf-email" class="input" name="email" type="email" autocomplete="email" value="${f.email}" placeholder="you@domain.com" aria-invalid="${!!err.email}">
                    ${err.email ? `<div class="form-error" role="alert">${err.email}</div>` : ''}
                  </div>
                </div>
                <div class="field">
                  <label class="label" for="cf-org">Organisation / Institution</label>
                  <input id="cf-org" class="input" name="org" type="text" value="${f.org}" placeholder="University or company">
                </div>
                <div class="field">
                  <label class="label">Enquiry type</label>
                  <div class="seg-group" style="margin-top: 4px;">
                    ${['Research collaboration', 'Speaking', 'Teaching', 'Partnership', 'Other'].map(type => `
                      <button type="button" class="seg-btn contact-type-btn ${f.type === type ? 'active' : ''}" data-type="${type}">
                        ${type}
                      </button>
                    `).join('')}
                  </div>
                </div>
                <div class="field">
                  <label class="label" for="cf-msg">Message *</label>
                  <textarea id="cf-msg" class="input" name="message" rows="5" placeholder="How can we collaborate?" aria-invalid="${!!err.message}">${f.message}</textarea>
                  ${err.message ? `<div class="form-error" role="alert">${err.message}</div>` : ''}
                </div>
                <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
                  <button type="submit" class="btn btn-primary">Send message ${getIcon('arrowRight')}</button>
                  <span style="font-size: 0.85rem; color: var(--color-neutral-700);">Opens your email application with the pre-filled enquiry.</span>
                </div>
              </form>
            ` : `
              <div role="status" style="background: var(--color-accent-100); border-top: 4px solid var(--color-accent); padding: 28px; display: flex; flex-direction: column; gap: 14px;">
                <div style="color: var(--color-accent);">${getIcon('check')}</div>
                <h2 style="font-size: 1.75rem; margin: 0; color: var(--color-accent-900);">Thank you, ${f.name}.</h2>
                <p style="margin: 0; font-size: 1rem; color: var(--color-accent-900);">
                  Your message has been formatted. If your email application did not launch automatically, please email directly to:
                  <a href="mailto:ersagark1997@gmail.com" style="color: var(--color-accent-900); font-weight: 700;">ersagark1997@gmail.com</a>.
                </p>
                <button type="button" class="btn btn-secondary" id="reset-contact-btn" style="align-self: flex-start; margin-top: 8px;">Write another message</button>
              </div>
            `}
          </div>

          <!-- Direct Info -->
          <aside>
            <h2 style="font-size: clamp(26px, 3vw, 36px); margin: 0 0 16px;">Direct channels</h2>
            ${contactsListHtml}
            <a href="assets/Sagar_Kumar_CV.pdf" download="Sagar_Kumar_CV.pdf" class="btn btn-primary btn-block" style="margin-top: 24px;">
              <span>Download CV (PDF)</span>
              ${getIcon('download')}
            </a>
          </aside>
        </div>
      </section>
    `;
  }

  attachContactEvents() {
    const form = document.getElementById('contact-form');
    if (form) {
      form.querySelectorAll('.contact-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.state.contactForm.type = btn.getAttribute('data-type');
          this.render();
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const f = this.state.contactForm;
        f.name = (form.querySelector('[name="name"]').value || '').trim();
        f.email = (form.querySelector('[name="email"]').value || '').trim();
        f.org = (form.querySelector('[name="org"]').value || '').trim();
        f.message = (form.querySelector('[name="message"]').value || '').trim();

        const errs = {};
        if (!f.name) errs.name = 'Please enter your name.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = 'Please enter a valid email address.';
        if (f.message.length < 10) errs.message = 'Please write a message with at least 10 characters.';

        this.state.formErrors = errs;
        if (Object.keys(errs).length > 0) {
          this.render();
          return;
        }

        const subject = `[${f.type}] Enquiry from ${f.name}${f.org ? ' — ' + f.org : ''}`;
        const body = `${f.message}\n\n— ${f.name}\n${f.email}${f.org ? '\n' + f.org : ''}`;
        window.open(`mailto:ersagark1997@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');

        this.state.formSent = true;
        this.render();
      });
    }

    const resetBtn = document.getElementById('reset-contact-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.state.formSent = false;
        this.state.contactForm = { name: '', email: '', org: '', message: '', type: 'Research collaboration' };
        this.state.formErrors = {};
        this.render();
      });
    }
  }

  /* ==========================================================================
     Interactivity: Parallax & Scroll Reveal
     ========================================================================== */
  handleMouseMove(e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mx = e.clientX / window.innerWidth - 0.5;
    const my = e.clientY / window.innerHeight - 0.5;

    document.querySelectorAll('[data-depth]').forEach(el => {
      const depth = parseFloat(el.getAttribute('data-depth')) || 0;
      const tx = (-mx * depth * 26).toFixed(1);
      const ty = (-my * depth * 26).toFixed(1);
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    });
  }

  handleScroll() {
    const tlWrap = document.getElementById('timeline-container');
    const spineFill = document.getElementById('tl-spine-fill');
    if (tlWrap && spineFill) {
      const rect = tlWrap.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - rect.top) / rect.height));
      spineFill.style.height = `${(progress * 100).toFixed(1)}%`;
    }
  }

  initScrollReveal() {
    const elements = document.querySelectorAll('[data-reveal]:not([data-revealed])');
    if (!elements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof IntersectionObserver === 'undefined') {
      elements.forEach(el => el.setAttribute('data-revealed', 'true'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.getAttribute('data-reveal'), 10) || 0;
          el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)';
          el.style.transitionDelay = `${delay}ms`;
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.setAttribute('data-revealed', 'true');
          observer.unobserve(el);
        }
      });
    }, { rootMargin: '60px 0px' });

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 60 && rect.bottom > -60) {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.setAttribute('data-revealed', 'true');
      } else {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        observer.observe(el);
      }
    });
  }
}

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  window.__portfolioApp = new App();
});
