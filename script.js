/* ==========================================================================
   PYAE PHYO MAUNG MAUNG - PORTFOLIO INTERACTION LOGIC (LIGHT THEME)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initSkillsFilter();
  initProjectsFilter();
  initEcoBiteSimulator();
  initTerminalCLI();
  initContactForm();
  initCopyEmail();
  initBackToTop();
});

/* ==========================================================================
   1. NAVBAR & SCROLLING
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveSection();
  });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
}

function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

/* ==========================================================================
   2. SKILLS CATEGORY FILTER
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter-nav .skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3. PROJECTS FILTER
   ========================================================================== */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.projects-filter-nav .skill-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-pfilter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-pcategory').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. ECOBITE SIMULATOR LOGIC
   ========================================================================== */
const simulatorData = {
  almond: {
    name: "Oat Milk Organic 1L",
    category: "Plant-Based Beverages",
    simScore: 0.92,
    ecoGrade: "A",
    ecoScore: 0.95,
    nudge: "Switching to Oat Milk Organic cuts water consumption by 82% and greenhouse carbon emissions by 64% compared to dairy alternatives!"
  },
  beef: {
    name: "Plant-Based High-Protein Jerky",
    category: "Sustainable Snacks",
    simScore: 0.88,
    ecoGrade: "A",
    ecoScore: 0.98,
    nudge: "Choosing Plant-Based Jerky saves ~1,500 gallons of water per package and eliminates intensive agricultural deforestation impact."
  },
  oat: {
    name: "Raw Organic Nut & Seed Bar",
    category: "Wholesome Snacks",
    simScore: 0.94,
    ecoGrade: "A",
    ecoScore: 0.91,
    nudge: "Selecting Raw Organic Energy Bars reduces packaging plastic waste by 75% via compostable plant cellulose wrappers."
  },
  cola: {
    name: "Zero-Sugar Kombucha Beverage",
    category: "Natural Fermented Drinks",
    simScore: 0.81,
    ecoGrade: "B",
    ecoScore: 0.84,
    nudge: "Opting for locally brewed glass Kombucha lowers carbon footprint logistics by 40% over imported aluminum cans."
  }
};

function initEcoBiteSimulator() {
  const selectEl = document.getElementById('sim-product-select');
  const sliderEl = document.getElementById('sim-weight-slider');
  const weightValBadge = document.getElementById('sim-weight-val');
  const recName = document.getElementById('sim-rec-name');
  const recCat = document.getElementById('sim-rec-category');
  const nudgeText = document.getElementById('sim-nudge-text');
  const simValEl = document.getElementById('score-sim-val');
  const ecoValEl = document.getElementById('score-eco-val');
  const finalValEl = document.getElementById('score-final-val');

  if (!selectEl || !sliderEl) return;

  function updateSimulation() {
    const selectedKey = selectEl.value;
    const wEco = parseFloat(sliderEl.value);
    const wSim = 1.0 - wEco;

    weightValBadge.textContent = wEco.toFixed(2);

    const item = simulatorData[selectedKey];
    if (item) {
      recName.textContent = item.name;
      recCat.textContent = `Category: ${item.category}`;
      nudgeText.textContent = `"${item.nudge}"`;
      
      simValEl.textContent = item.simScore.toFixed(2);
      ecoValEl.textContent = `Grade ${item.ecoGrade} (${item.ecoScore.toFixed(2)})`;

      // Multi-Objective Equation: R = (w_sim * S_sim) + (w_eco * S_eco)
      const finalScore = (wSim * item.simScore) + (wEco * item.ecoScore);
      finalValEl.textContent = finalScore.toFixed(3);
    }
  }

  selectEl.addEventListener('change', updateSimulation);
  sliderEl.addEventListener('input', updateSimulation);

  updateSimulation();
}

/* ==========================================================================
   5. PROJECT SPECS MODAL POPUP DATA & LOGIC
   ========================================================================== */
const projectDetailsData = {
  ecobite: {
    title: "EcoBite – AI-Powered Recommendation Engine & Eco-Nudge System",
    badge: "GenAI & Full-Stack API",
    year: "2026",
    tech: ["Python", "FastAPI", "Scikit-Learn", "Groq API", "Google Gemini API", "Pandas", "Unittest"],
    content: `
      <div style="margin-bottom:1.5rem;">
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Architecture Overview</h4>
        <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6;">
          EcoBite is a high-performance e-commerce engine engineered to balance user preference alignment with sustainability goals. Built using Python and FastAPI, it handles multi-objective reranking across large-scale datasets from OpenFoodFacts.
        </p>
      </div>

      <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:1.25rem; border-radius:14px; margin-bottom:1.5rem;">
        <h5 style="color:var(--text-main); margin-bottom:0.75rem;"><i class="fa-solid fa-sliders"></i> Reranking Formula</h5>
        <code style="display:block; background:#f1f5f9; padding:0.75rem; border-radius:8px; color:#0284c7; font-family:var(--font-mono); font-size:0.9rem; border:1px solid #cbd5e1;">
          Score = (w_sim * S_sim) + (w_eco * S_eco)
        </code>
        <ul style="margin-top:0.75rem; color:var(--text-muted); font-size:0.875rem; padding-left:1.25rem;">
          <li><strong>S_sim:</strong> Cosine similarity calculated over TF-IDF item feature vectors.</li>
          <li><strong>S_eco:</strong> Normalized eco-score grade (Grade A=1.0 down to Grade E=0.2).</li>
          <li><strong>Fallback Guarantee:</strong> Groq API primary -> Gemini API secondary -> Deterministic Rule-Based Fallback.</li>
        </ul>
      </div>

      <div>
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Key Technical Achievements</h4>
        <ul class="timeline-bullets">
          <li>Processed 50,000+ OpenFoodFacts dataset records using Pandas chunking and stratified sampling.</li>
          <li>Engineered startup in-memory vector caching for sub-millisecond API response latency.</li>
          <li>Achieved 100% test coverage for API routes and fallback routines using <code>unittest.mock</code>.</li>
        </ul>
      </div>
    `
  },
  sola: {
    title: "Sg Online Library Application (SOLA)",
    badge: "Algorithms & Custom Data Structures",
    year: "2025",
    tech: ["Python 3", "Binary Search Tree", "Doubly Linked List", "OOP Patterns", "UML"],
    content: `
      <div style="margin-bottom:1.5rem;">
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Custom Data Structures Implementation</h4>
        <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6;">
          SOLA was designed from first principles without relying on high-level database libraries to demonstrate pure algorithmic data structure mastery.
        </p>
      </div>

      <div style="grid-template-columns:1fr 1fr; display:grid; gap:1rem; margin-bottom:1.5rem;">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:1rem; border-radius:12px;">
          <h5 style="color:var(--accent-cyan); margin-bottom:0.4rem;">Binary Search Tree (BST)</h5>
          <p style="font-size:0.85rem; color:var(--text-muted);">
            Keys catalog items by title for O(log n) average search, insertion, and ordered in-order traversal printing.
          </p>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:1rem; border-radius:12px;">
          <h5 style="color:var(--accent-teal); margin-bottom:0.4rem;">Doubly Linked List</h5>
          <p style="font-size:0.85rem; color:var(--text-muted);">
            Manages dynamic borrower checkout records enabling O(1) additions/deletions at boundary nodes.
          </p>
        </div>
      </div>

      <div>
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Architecture & Access Control</h4>
        <ul class="timeline-bullets">
          <li>Enforced strict OOP encapsulation, inheritance, and polymorphism across Admin vs. Borrower roles.</li>
          <li>Modeled full domain classes using StarUML Class and Use Case diagrams.</li>
        </ul>
      </div>
    `
  },
  realestate: {
    title: "Real Estate Commission Management System",
    badge: "Financial Engine & Algorithm Analysis",
    year: "2025",
    tech: ["Python", "Multi-Tier OOP", "Dynamic Arrays", "Algorithm Analysis"],
    content: `
      <div style="margin-bottom:1.5rem;">
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Multi-Tier Hierarchy</h4>
        <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6;">
          Engineered to model real-world agency commissions across commercial properties, residential units, field agents, and executive directors.
        </p>
      </div>
      <div>
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Key Performance Metrics</h4>
        <ul class="timeline-bullets">
          <li>Utilized dynamic arrays for O(1) property inventory state updates.</li>
          <li>Calculated tiered percentage distribution loops with O(n) iteration efficiency.</li>
          <li>Eliminated manual calculation errors across distributed agent ledger statements.</li>
        </ul>
      </div>
    `
  },
  hotel: {
    title: "Hotel Management & Booking Platform",
    badge: "Full-Stack PHP Laravel",
    year: "2024",
    tech: ["PHP", "Laravel MVC", "MySQL", "Bootstrap", "XAMPP"],
    content: `
      <div style="margin-bottom:1.5rem;">
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">MVC Web Application</h4>
        <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6;">
          Full-stack web application featuring customer room discovery, booking modules, authentication, and an administrative control panel.
        </p>
      </div>
      <div>
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Database Schema & Tooling</h4>
        <ul class="timeline-bullets">
          <li>Designed relational ERD schemas using StarUML and implemented MySQL migrations in Laravel.</li>
          <li>Built dynamic, mobile-responsive client views using Bootstrap 5, HTML5, and JavaScript.</li>
        </ul>
      </div>
    `
  },
  diabetes: {
    title: "Diabetes Predictive Classification Engine",
    badge: "Machine Learning Benchmarks",
    year: "2025",
    tech: ["Python", "Scikit-Learn", "Neural Networks", "Random Forest", "Orange3"],
    content: `
      <div style="margin-bottom:1.5rem;">
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Dataset & Pipeline</h4>
        <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6;">
          Preprocessed and normalized the Pima Indians Diabetes medical dataset, resolving missing value distributions and outlier skew.
        </p>
      </div>
      <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:1rem; border-radius:12px;">
        <h5 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Model Classification Results</h5>
        <div style="display:flex; justify-content:space-around; text-align:center;">
          <div>
            <div style="font-size:1.5rem; font-weight:800; color:#047857;">83%</div>
            <div style="font-size:0.8rem; color:var(--text-dim);">Neural Network</div>
          </div>
          <div>
            <div style="font-size:1.5rem; font-weight:800; color:#0284c7;">76%</div>
            <div style="font-size:0.8rem; color:var(--text-dim);">Random Forest</div>
          </div>
        </div>
      </div>
    `
  },
  bms: {
    title: "Battery Management System (BMS) IoT Simulation",
    badge: "Cloud Telemetry & IoT Architecture",
    year: "2025",
    tech: ["Azure IoT Central", "Telemetry Monitoring", "System Architecture"],
    content: `
      <div style="margin-bottom:1.5rem;">
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Real-Time EV Telemetry</h4>
        <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.6;">
          Simulated electric vehicle battery telemetry inside Azure IoT Central to monitor voltage, current, temperature, State of Charge (SOC), and State of Health (SOH).
        </p>
      </div>
      <div>
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Impact Solution</h4>
        <ul class="timeline-bullets">
          <li>Architected cloud rule triggers to eliminate delayed fault detection.</li>
          <li>Unified fragmented diagnostic logs into a centralized dashboard.</li>
        </ul>
      </div>
    `
  }
};

function openProjectModal(id) {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('project-modal-body');
  const closeBtn = document.getElementById('modal-close-btn');

  const data = projectDetailsData[id];
  if (!data || !modal || !modalBody) return;

  const techBadgeHtml = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join(' ');

  modalBody.innerHTML = `
    <div style="margin-bottom:1rem;">
      <span class="project-badge">${data.badge}</span>
      <h3 style="font-size:1.6rem; font-weight:800; margin-top:0.25rem;">${data.title}</h3>
    </div>
    <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1.5rem;">
      ${techBadgeHtml}
    </div>
    <hr style="border:none; border-top:1px solid #e2e8f0; margin-bottom:1.5rem;">
    ${data.content}
  `;

  modal.classList.add('active');

  const closeModal = () => modal.classList.remove('active');
  closeBtn.onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
}

/* ==========================================================================
   6. INTERACTIVE CLI TERMINAL OVERLAY
   ========================================================================== */
function initTerminalCLI() {
  const triggerBtn = document.getElementById('terminal-trigger-btn');
  const modal = document.getElementById('terminal-modal');
  const closeBtn = document.getElementById('term-close-btn');
  const inputEl = document.getElementById('terminal-input');
  const outputEl = document.getElementById('terminal-output');

  if (!triggerBtn || !modal) return;

  const toggleTerminal = () => {
    modal.classList.toggle('active');
    if (modal.classList.contains('active') && inputEl) {
      setTimeout(() => inputEl.focus(), 100);
    }
  };

  triggerBtn.addEventListener('click', toggleTerminal);
  if (closeBtn) closeBtn.addEventListener('click', toggleTerminal);

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleTerminal();
    }
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });

  if (inputEl && outputEl) {
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = inputEl.value.trim().toLowerCase();
        inputEl.value = '';
        executeCommand(cmd, outputEl);
      }
    });
  }
}

function executeCommand(cmd, outputEl) {
  const pCmd = document.createElement('p');
  pCmd.innerHTML = `<span class="t-prompt">visitor@pyaephyo:~$</span> ${cmd}`;
  outputEl.appendChild(pCmd);

  const res = document.createElement('div');
  res.style.marginBottom = '0.75rem';

  switch (cmd) {
    case 'help':
      res.innerHTML = `
        <p style="color:#38bdf8;">Available commands:</p>
        <p>• <strong>whoami / bio</strong> - Brief background profile</p>
        <p>• <strong>skills</strong> - List core technical stack</p>
        <p>• <strong>projects</strong> - List key engineering projects</p>
        <p>• <strong>contact</strong> - Display email, phone, and links</p>
        <p>• <strong>gpa</strong> - View academic standing</p>
        <p>• <strong>clear</strong> - Clear terminal screen</p>
      `;
      break;
    case 'whoami':
    case 'bio':
      res.innerHTML = `<p>Pyae Phyo Maung Maung | CS Graduate & Applied AI Software Engineer based in Singapore. Specializing in LLM recommendations, custom DSA (BST/DLL), and full-stack web development.</p>`;
      break;
    case 'skills':
      res.innerHTML = `<p style="color:#34d399;">Languages: Python, JavaScript, Java, PHP, SQL<br>Frameworks: FastAPI, Laravel, Bootstrap<br>GenAI: Groq API, Gemini API, Prompt Engineering, Fallbacks<br>DSA: BST, Doubly Linked Lists, Algorithm Complexity</p>`;
      break;
    case 'projects':
      res.innerHTML = `<p>1. EcoBite (AI Recommendation Engine)<br>2. SOLA (Python BST CLI Library System)<br>3. Real Estate Commission Engine<br>4. Hotel Booking Platform (PHP Laravel)<br>5. Diabetes ML Prediction Engine (83% NN Accuracy)</p>`;
      break;
    case 'contact':
      res.innerHTML = `<p>Email: pyaephyomm191@gmail.com<br>Phone: +65 80787476<br>LinkedIn: linkedin.com/in/pyaephyo-maungmaung<br>GitHub: github.com/PyaePhyoMaungMaung-it</p>`;
      break;
    case 'gpa':
      res.innerHTML = `<p style="color:#facc15;">Academic Standing: GPA 3.90 / 4.00 (NCC Level 5 & Level 4 Computing)</p>`;
      break;
    case 'clear':
      outputEl.innerHTML = '';
      return;
    default:
      if (cmd !== '') {
        res.innerHTML = `<p style="color:#ef4444;">Command not recognized: '${cmd}'. Type 'help' for options.</p>`;
      }
      break;
  }

  outputEl.appendChild(res);
  outputEl.scrollTop = outputEl.scrollHeight;
}

/* ==========================================================================
   7. CONTACT FORM & COPY EMAIL TOAST
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.');
      form.reset();
    });
  }
}

function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('pyaephyomm191@gmail.com').then(() => {
        showToast('<i class="fa-solid fa-clipboard-check"></i> Email address copied to clipboard!');
      });
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   8. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
