// Enhanced ML Portfolio Application with 3D Elements - Single Page App with Multi-page Navigation
// Application Data (integrated from provided JSON)
const appData = {
  profile: {
    name: "Niharika Pant",
    title: "Machine Learning Engineer & AI Researcher",
    tagline: "Building intelligent systems that solve complex real-world problems",
    bio: "Passionate Machine Learning Engineer with 4+ years of experience developing and deploying AI solutions at scale. Specialized in computer vision, natural language processing, and MLOps with a track record of delivering production systems that serve millions of users.",
    location: "Available for remote opportunities worldwide",
    email: "niharika.ml@gmail.com",
    linkedin: "linkedin.com/in/niharikapant",
    github: "github.com/niharikapant",
    specializations: ["Computer Vision", "Natural Language Processing", "Deep Learning", "MLOps", "Recommender Systems", "Time Series Analysis"]
  },
  skills: {
    languages: [
      {name: "Python", level: 95, icon: "🐍"},
      {name: "R", level: 85, icon: "📊"},
      {name: "SQL", level: 90, icon: "🗃️"},
      {name: "JavaScript", level: 80, icon: "⚡"}
    ],
    frameworks: [
      {name: "TensorFlow", level: 95, icon: "🧠"},
      {name: "PyTorch", level: 90, icon: "🔥"},
      {name: "Scikit-learn", level: 95, icon: "📚"},
      {name: "Keras", level: 90, icon: "🎯"}
    ],
    cloud: [
      {name: "AWS", level: 90, icon: "☁️"},
      {name: "GCP", level: 85, icon: "🌐"},
      {name: "Azure", level: 80, icon: "⚡"}
    ],
    mlops: [
      {name: "Docker", level: 90, icon: "🐳"},
      {name: "Kubernetes", level: 85, icon: "⚙️"},
      {name: "MLflow", level: 85, icon: "📈"},
      {name: "DVC", level: 80, icon: "🔄"}
    ]
  },
  projects: [
    {
      id: 1,
      title: "Medical Image Classification System",
      description: "End-to-end CNN system for detecting pneumonia in chest X-rays with 94% accuracy",
      longDescription: "Developed and deployed a production-ready medical image classification system that assists radiologists in pneumonia detection using advanced deep learning techniques.",
      techStack: ["TensorFlow", "Keras", "OpenCV", "Flask", "Docker", "AWS", "PostgreSQL"],
      impact: "Deployed in 3 hospitals, reduced diagnosis time by 60%",
      category: "Computer Vision",
      metrics: [
        { value: "94%", label: "Accuracy" },
        { value: "15k+", label: "Images" },
        { value: "60%", label: "Time Saved" }
      ]
    },
    {
      id: 2,
      title: "Real-time Recommendation Engine",
      description: "Hybrid recommendation system for e-commerce platform serving 100k+ users",
      longDescription: "Built a scalable recommendation system combining collaborative filtering and content-based approaches for personalized product recommendations in real-time.",
      techStack: ["Python", "Scikit-learn", "Apache Spark", "Redis", "Kubernetes", "MongoDB"],
      impact: "Increased engagement by 35%",
      category: "Recommender Systems",
      metrics: [
        { value: "100k+", label: "Users" },
        { value: "<50ms", label: "Latency" },
        { value: "35%", label: "Engagement ↑" }
      ]
    },
    {
      id: 3,
      title: "Multilingual NLP Pipeline",
      description: "Sentiment analysis system for social media monitoring across 5 languages",
      longDescription: "Created a comprehensive NLP pipeline for real-time sentiment analysis of social media content across multiple languages with an intuitive dashboard.",
      techStack: ["Transformers", "BERT", "PyTorch", "FastAPI", "MongoDB", "React", "Docker"],
      impact: "Processing 1M+ tweets daily with 91% accuracy",
      category: "Natural Language Processing",
      metrics: [
        { value: "91%", label: "Accuracy" },
        { value: "5", label: "Languages" },
        { value: "1M+", label: "Daily Tweets" }
      ]
    },
    {
      id: 4,
      title: "Autonomous Vision System",
      description: "Object detection and tracking for autonomous vehicle navigation",
      longDescription: "Developed a computer vision system for autonomous vehicles performing real-time object detection, tracking, and scene understanding optimized for edge deployment.",
      techStack: ["YOLO", "PyTorch", "OpenCV", "ROS", "CUDA", "TensorRT", "C++"],
      impact: "Achieved 99.2% accuracy",
      category: "Computer Vision",
      metrics: [
        { value: "99.2%", label: "Accuracy" },
        { value: "Real-time", label: "Processing" },
        { value: "Edge", label: "Optimized" }
      ]
    }
  ],
  greetings: [
    {language: "English", greeting: "Hello", priority: "major"},
    {language: "Hindi", greeting: "नमस्ते", priority: "major"},
    {language: "Spanish", greeting: "Hola", priority: "major"},
    {language: "German", greeting: "Hallo", priority: "major"},
    {language: "Italian", greeting: "Ciao", priority: "major"},
    {language: "French", greeting: "Bonjour", priority: "minor"},
    {language: "Japanese", greeting: "こんにちは", priority: "minor"},
    {language: "Korean", greeting: "안녕하세요", priority: "minor"},
    {language: "Portuguese", greeting: "Olá", priority: "minor"},
    {language: "Russian", greeting: "Привет", priority: "minor"}
  ]
};

// Global variables
let lastScrollY = 0;
let scrollDirection = 'down';
let isLoading = true;
let isLoadingComplete = false;
let scrollTimeout;
let animationFrameId = null;
let currentPage = 'home';

// DOM Elements
let loadingScreen, greetingText, mainContent, bottomNameContainer, bottomName, navbar;
let homePage, projectsPage;
let floatingShapes = [];
let projectCards = [];
let skillItems = [];
let filterButtons = [];
let projectsGrid = null;

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 ML Portfolio initializing...');
  
  try {
    // Get DOM elements with error checking
    loadingScreen = document.getElementById('loading-screen');
    greetingText = document.getElementById('greeting-text');
    mainContent = document.getElementById('main-content');
    bottomNameContainer = document.getElementById('bottom-name');
    bottomName = document.querySelector('.bottom-name');
    navbar = document.querySelector('.navbar');
    
    // Get page containers
    homePage = document.getElementById('home-page');
    projectsPage = document.getElementById('projects-page');
    
    // Get floating shapes
    floatingShapes = Array.from(document.querySelectorAll('.floating-shapes > div'));
    
    // Get skill items (from home page)
    skillItems = Array.from(document.querySelectorAll('.skill-item'));
    
    // Get projects page elements
    projectsGrid = document.getElementById('projects-grid');
    filterButtons = Array.from(document.querySelectorAll('.filter-btn'));

    console.log('✅ DOM elements found:', {
      loadingScreen: !!loadingScreen,
      greetingText: !!greetingText,
      mainContent: !!mainContent,
      bottomNameContainer: !!bottomNameContainer,
      bottomName: !!bottomName,
      navbar: !!navbar,
      homePage: !!homePage,
      projectsPage: !!projectsPage,
      floatingShapes: floatingShapes.length,
      skillItems: skillItems.length,
      projectsGrid: !!projectsGrid,
      filterButtons: filterButtons.length
    });

    // Initialize loading sequence
    if (loadingScreen && greetingText) {
      initializeLoading();
    } else {
      console.log('⚠️ Loading elements not found, skipping to main content');
      completeLoadingImmediately();
    }
    
    // Setup functionality
    setupNavigation();
    setupPageNavigation();
    setupFormHandling();
    setupScrollAnimations();
    setupIntersectionObserver();
    setup3DInteractions();
    initializeFloatingShapes();
    generateProjectCards();
    setupProjectFilters();
    
    console.log('✅ ML Portfolio initialized successfully');
  } catch (error) {
    console.error('❌ Error during initialization:', error);
    completeLoadingImmediately();
  }
});

// Page Navigation System
function setupPageNavigation() {
  console.log('🔄 Setting up page navigation system...');
  
  try {
    // Handle all navigation buttons/links with data-navigate attribute
    document.addEventListener('click', function(e) {
      const navigateTarget = e.target.closest('[data-navigate]');
      if (navigateTarget) {
        e.preventDefault();
        const targetPage = navigateTarget.getAttribute('data-navigate');
        const scrollTarget = navigateTarget.getAttribute('data-scroll');
        
        console.log(`📍 Navigation clicked: ${targetPage}${scrollTarget ? ` (scroll to ${scrollTarget})` : ''}`);
        navigateToPage(targetPage, scrollTarget);
      }
    });
    
    console.log('✅ Page navigation setup complete');
  } catch (error) {
    console.error('❌ Error setting up page navigation:', error);
  }
}

function navigateToPage(targetPage, scrollTarget = null) {
  if (targetPage === currentPage && !scrollTarget) {
    console.log(`⚠️ Already on ${targetPage} page`);
    return;
  }
  
  console.log(`🎯 Navigating to ${targetPage} page...`);
  
  try {
    // Add fade out effect to current page
    const currentPageEl = currentPage === 'home' ? homePage : projectsPage;
    const targetPageEl = targetPage === 'home' ? homePage : projectsPage;
    
    if (currentPageEl) {
      currentPageEl.style.opacity = '0';
      currentPageEl.style.transform = 'translateY(20px)';
    }
    
    setTimeout(() => {
      // Hide current page
      if (currentPageEl) {
        currentPageEl.classList.add('hidden');
      }
      
      // Show target page
      if (targetPageEl) {
        targetPageEl.classList.remove('hidden');
        setTimeout(() => {
          targetPageEl.style.opacity = '1';
          targetPageEl.style.transform = 'translateY(0)';
        }, 50);
      }
      
      // Update current page
      const prevPage = currentPage;
      currentPage = targetPage;
      
      // Update bottom name visibility
      if (bottomNameContainer) {
        if (targetPage === 'home') {
          bottomNameContainer.style.display = 'flex';
        } else {
          bottomNameContainer.style.display = 'none';
        }
      }
      
      // Update navigation active states
      updateNavActiveStates();
      
      // Setup page-specific interactions
      if (targetPage === 'projects') {
        setTimeout(() => {
          setupProjectCard3D();
        }, 300);
      } else if (targetPage === 'home' && prevPage === 'projects') {
        setTimeout(() => {
          setup3DInteractions();
          if (scrollTarget) {
            scrollToSection(scrollTarget);
          } else {
            // Scroll to top of home page
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 300);
      }
      
      // Scroll to top for page changes (unless specific scroll target)
      if (!scrollTarget) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      console.log(`✅ Navigation complete: ${prevPage} → ${targetPage}`);
    }, 300);
    
  } catch (error) {
    console.error('❌ Error navigating to page:', error);
  }
}

function scrollToSection(sectionId) {
  const targetSection = document.querySelector(`#${sectionId}`);
  if (targetSection) {
    const headerOffset = 100;
    const elementPosition = targetSection.offsetTop;
    const offsetPosition = elementPosition - headerOffset;
    
    setTimeout(() => {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }, 500);
    
    console.log(`✅ Scrolled to ${sectionId} section`);
  }
}

function updateNavActiveStates() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('data-page');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Generate project cards from data
function generateProjectCards() {
  if (!projectsGrid) {
    console.warn('⚠️ Projects grid not found');
    return;
  }
  
  console.log(`🏗️ Generating ${appData.projects.length} project cards...`);
  
  projectsGrid.innerHTML = '';
  
  appData.projects.forEach((project, index) => {
    const projectCard = createProjectCard(project, index);
    projectsGrid.appendChild(projectCard);
  });
  
  // Update projectCards array for 3D interactions
  projectCards = Array.from(document.querySelectorAll('.project-card'));
  console.log(`✅ Generated ${projectCards.length} project cards`);
}

function createProjectCard(project, index) {
  const card = document.createElement('div');
  card.className = 'project-card project-card-3d';
  card.setAttribute('data-category', project.category);
  card.setAttribute('data-project', index.toString());
  
  card.innerHTML = `
    <div class="card-3d-container">
      <div class="card-front">
        <div class="project-category">${project.category}</div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-brief">${project.description}</p>
        <div class="project-impact-preview">${project.impact}</div>
        <div class="card-hover-indicator">
          <span>Hover to learn more</span>
          <div class="hover-arrow">→</div>
        </div>
      </div>
      <div class="card-back">
        <div class="project-details">
          <h3>${project.title}</h3>
          <p>${project.longDescription}</p>
          <div class="project-tech">
            ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <div class="project-metrics">
            ${project.metrics.map(metric => `
              <div class="metric">
                <div class="metric-value">${metric.value}</div>
                <div class="metric-label">${metric.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  
  return card;
}

// Setup project filters
function setupProjectFilters() {
  console.log(`🔍 Setting up project filters for ${filterButtons.length} buttons...`);
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active state with 3D effect
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.transform = 'translateY(0) scale(1)';
      });
      this.classList.add('active');
      this.style.transform = 'translateY(-2px) scale(1.05)';
      
      // Filter projects
      filterProjects(filter);
      
      console.log(`🎯 Applied filter: ${filter}`);
    });
  });
}

function filterProjects(filter) {
  if (!projectCards.length) return;
  
  projectCards.forEach((card, index) => {
    const category = card.getAttribute('data-category');
    const shouldShow = filter === 'all' || category === filter;
    
    if (shouldShow) {
      card.classList.remove('filtered-out');
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
        card.style.pointerEvents = 'auto';
      }, index * 50);
    } else {
      card.classList.add('filtered-out');
      card.style.opacity = '0.3';
      card.style.transform = 'scale(0.95) translateY(20px)';
      card.style.pointerEvents = 'none';
    }
  });
}

// Setup 3D interactions for project cards
function setupProjectCard3D() {
  console.log('🎪 Setting up project card 3D interactions...');
  
  projectCards.forEach((card, index) => {
    const container = card.querySelector('.card-3d-container');
    if (!container) return;
    
    // Ensure card is visible
    card.style.opacity = '1';
    card.style.visibility = 'visible';
    card.classList.add('visible');
    
    // Add enhanced hover effects
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02) rotateX(2deg)';
      this.style.boxShadow = '0 25px 80px rgba(74, 93, 35, 0.25)';
      
      // Add subtle pulsing effect
      const pulse = () => {
        if (card.matches(':hover')) {
          container.style.boxShadow = '0 0 30px rgba(74, 93, 35, 0.4)';
          setTimeout(() => {
            if (card.matches(':hover')) {
              container.style.boxShadow = '0 0 20px rgba(74, 93, 35, 0.2)';
            }
          }, 500);
          setTimeout(pulse, 1000);
        }
      };
      pulse();
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
      this.style.boxShadow = '0 8px 32px rgba(74, 93, 35, 0.15), 0 4px 16px rgba(74, 93, 35, 0.1)';
      container.style.boxShadow = 'none';
    });
  });
}

// Complete loading immediately for fallback
function completeLoadingImmediately() {
  console.log('🔄 Completing loading immediately...');
  
  isLoading = false;
  isLoadingComplete = true;
  
  try {
    // Hide loading screen immediately
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
    
    // Show main content
    if (mainContent) {
      mainContent.classList.remove('hidden');
      mainContent.classList.add('visible');
      mainContent.style.opacity = '1';
      mainContent.style.visibility = 'visible';
    }
    
    // Show home page by default, hide projects page
    if (homePage) {
      homePage.classList.remove('hidden');
      homePage.style.opacity = '1';
      homePage.style.transform = 'translateY(0)';
    }
    if (projectsPage) {
      projectsPage.classList.add('hidden');
    }
    
    // Show bottom name
    if (bottomNameContainer) {
      bottomNameContainer.classList.remove('hidden');
      bottomNameContainer.classList.add('visible');
      bottomNameContainer.style.opacity = '1';
      bottomNameContainer.style.visibility = 'visible';
      bottomNameContainer.style.display = 'flex';
    }
    
    // Make sure all sections are visible
    const sections = document.querySelectorAll('.about-section, .skills-section, .contact-section');
    sections.forEach(section => {
      section.style.opacity = '1';
      section.style.visibility = 'visible';
      section.classList.add('visible');
    });
    
    // Initialize animations
    setTimeout(() => {
      initializeScrollAnimations();
      startFloatingAnimations();
      animateSkillBars();
      updateNavActiveStates();
    }, 100);
    
    console.log('✅ Loading completed immediately');
  } catch (error) {
    console.error('❌ Error in immediate loading completion:', error);
  }
}

// Enhanced Loading Screen Animation with ML Greetings
function initializeLoading() {
  let currentIndex = 0;
  const greetings = appData.greetings;
  
  console.log('🔄 Starting ML portfolio loading sequence...');
  
  // Ensure loading screen is visible
  if (loadingScreen) {
    loadingScreen.style.opacity = '1';
    loadingScreen.style.visibility = 'visible';
    loadingScreen.style.display = 'flex';
  }
  
  // Hide main content during loading
  if (mainContent) {
    mainContent.classList.add('hidden');
  }
  
  if (bottomNameContainer) {
    bottomNameContainer.classList.add('hidden');
  }
  
  function showNextGreeting() {
    if (currentIndex < greetings.length && greetingText) {
      const currentGreeting = greetings[currentIndex];
      console.log(`📢 Showing greeting: ${currentGreeting.greeting} (${currentGreeting.language})`);
      
      // Fade out current text with 3D effect
      greetingText.classList.remove('visible');
      greetingText.style.transform = 'translateY(30px) rotateX(15deg)';
      greetingText.style.opacity = '0';
      
      setTimeout(() => {
        // Change text and fade in with 3D animation
        greetingText.textContent = currentGreeting.greeting;
        greetingText.classList.add('visible');
        greetingText.style.transform = 'translateY(0) rotateX(0deg)';
        greetingText.style.opacity = '1';
        
        currentIndex++;
        
        // Show next greeting after delay
        const delay = currentIndex < greetings.length ? 800 : 1200;
        setTimeout(showNextGreeting, delay);
      }, 300);
    } else {
      // Loading complete
      console.log('🎯 Loading sequence complete');
      setTimeout(() => {
        completeLoading();
      }, 500);
    }
  }
  
  // Start greeting animation after initial delay
  setTimeout(() => {
    if (greetingText) {
      greetingText.textContent = greetings[0].greeting;
      greetingText.classList.add('visible');
      greetingText.style.transform = 'translateY(0) rotateX(0deg)';
      greetingText.style.opacity = '1';
      setTimeout(showNextGreeting, 1000);
    } else {
      completeLoading();
    }
  }, 500);
}

function completeLoading() {
  isLoading = false;
  isLoadingComplete = true;
  
  console.log('🏁 Completing loading with 3D transitions...');
  
  try {
    // Hide loading screen with enhanced 3D effect
    if (loadingScreen) {
      loadingScreen.classList.add('fade-out');
      loadingScreen.style.transform = 'translateY(-100%) rotateX(-15deg)';
      loadingScreen.style.opacity = '0';
    }
    
    // Show main content and bottom name
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.style.display = 'none';
      }
      
      if (mainContent) {
        mainContent.classList.remove('hidden');
        mainContent.classList.add('visible');
        mainContent.style.opacity = '1';
        mainContent.style.visibility = 'visible';
      }
      
      // Show home page by default, hide projects page
      if (homePage) {
        homePage.classList.remove('hidden');
        homePage.style.opacity = '1';
        homePage.style.transform = 'translateY(0)';
      }
      if (projectsPage) {
        projectsPage.classList.add('hidden');
      }
      
      // Show bottom name with 3D effect
      if (bottomNameContainer) {
        bottomNameContainer.classList.remove('hidden');
        bottomNameContainer.classList.add('visible');
        bottomNameContainer.style.opacity = '1';
        bottomNameContainer.style.visibility = 'visible';
        bottomNameContainer.style.display = 'flex';
        console.log('🎯 Bottom name container made visible with 3D effects');
      }
      
      // Make sure all sections are visible
      const sections = document.querySelectorAll('.about-section, .skills-section, .contact-section');
      sections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
        section.classList.add('visible');
      });
      
      // Initialize post-loading animations
      initializeScrollAnimations();
      startFloatingAnimations();
      animateSkillBars();
      updateNavActiveStates();
      
      console.log('✅ Loading complete, ML portfolio fully loaded with 3D elements');
    }, 600);
  } catch (error) {
    console.error('❌ Error completing loading:', error);
    completeLoadingImmediately();
  }
}

// Initialize floating 3D shapes
function initializeFloatingShapes() {
  console.log('🎨 Initializing 3D floating shapes...');
  
  floatingShapes.forEach((shape, index) => {
    // Add random positioning and animation delays
    const randomDelay = Math.random() * 5;
    const randomScale = 0.8 + Math.random() * 0.4;
    
    shape.style.animationDelay = `-${randomDelay}s`;
    shape.style.transform = `scale(${randomScale})`;
    shape.style.opacity = '0.1';
    
    // Add mouseover 3D interactions
    shape.addEventListener('mouseenter', function() {
      if (isLoadingComplete) {
        this.style.opacity = '0.3';
        this.style.transform = `scale(${randomScale * 1.2}) rotateY(15deg)`;
      }
    });
    
    shape.addEventListener('mouseleave', function() {
      if (isLoadingComplete) {
        this.style.opacity = '0.1';
        this.style.transform = `scale(${randomScale})`;
      }
    });
  });
}

function startFloatingAnimations() {
  console.log('🎭 Starting floating shape animations...');
  
  floatingShapes.forEach((shape, index) => {
    // Add subtle breathing animation
    const breatheAnimation = () => {
      if (!isLoadingComplete) return;
      
      const time = Date.now() * 0.001;
      const offset = index * 0.5;
      const breathe = Math.sin(time + offset) * 0.1 + 1;
      const rotate = Math.cos(time * 0.5 + offset) * 5;
      
      shape.style.transform = `scale(${breathe}) rotateZ(${rotate}deg)`;
      
      requestAnimationFrame(breatheAnimation);
    };
    
    setTimeout(() => breatheAnimation(), index * 200);
  });
}

// Enhanced Scroll-based animations with 3D effects
function setupScrollAnimations() {
  let ticking = false;
  
  function updateScrollAnimations() {
    if (!isLoadingComplete) return;
    
    try {
      const currentScrollY = window.pageYOffset || window.scrollY || 0;
      
      // Determine scroll direction with threshold
      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      }
      
      // Enhanced bottom name animation with 3D effects (only on home page)
      if (currentPage === 'home') {
        animateBottomName3D(currentScrollY, scrollDirection);
      }
      
      // Enhanced navbar with 3D effects
      updateNavbar3D(currentScrollY);
      
      // Enhanced parallax effects
      updateParallax3D(currentScrollY);
      
      // Update floating shapes based on scroll
      updateFloatingShapesScroll(currentScrollY);
      
      lastScrollY = currentScrollY;
    } catch (error) {
      console.error('❌ Error in scroll animation:', error);
    }
    
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      animationFrameId = requestAnimationFrame(updateScrollAnimations);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', onScroll, { passive: true });
  console.log('📜 Enhanced 3D scroll animations setup complete');
}

function initializeScrollAnimations() {
  try {
    // Make sure all elements are visible and ready for animation
    const sections = document.querySelectorAll('.about-section, .skills-section, .contact-section');
    sections.forEach(section => {
      section.classList.add('visible');
      section.style.opacity = '1';
      section.style.visibility = 'visible';
    });
    
    // Project cards with staggered 3D animations
    projectCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.15}s`;
      card.classList.add('visible');
      card.style.opacity = '1';
      card.style.transform = 'translateY(0) rotateX(0deg)';
    });
    
    // Skill categories with 3D entrance
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
      category.style.transitionDelay = `${index * 0.2}s`;
      category.classList.add('visible');
      category.style.opacity = '1';
      category.style.transform = 'translateY(0) rotateX(0deg)';
    });
    
    // About and contact elements
    const aboutCard = document.querySelector('.about-card');
    if (aboutCard) {
      aboutCard.classList.add('visible');
      aboutCard.style.opacity = '1';
      aboutCard.style.visibility = 'visible';
    }
    
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form-container');
    if (contactInfo) {
      contactInfo.classList.add('visible');
      contactInfo.style.opacity = '1';
      contactInfo.style.visibility = 'visible';
    }
    if (contactForm) {
      contactForm.classList.add('visible');
      contactForm.style.opacity = '1';
      contactForm.style.visibility = 'visible';
    }
    
    console.log('✅ 3D scroll animations initialized with all elements visible');
  } catch (error) {
    console.error('❌ Error initializing scroll animations:', error);
  }
}

function animateBottomName3D(scrollY, direction) {
  if (!bottomName || !isLoadingComplete || currentPage !== 'home') {
    return;
  }
  
  try {
    const scrollThreshold = 150;
    
    // Clear any existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    
    // Remove existing classes
    bottomName.classList.remove('scroll-right', 'scroll-left');
    
    if (scrollY > scrollThreshold) {
      if (direction === 'down') {
        bottomName.classList.add('scroll-right');
        bottomName.style.transform = 'translateX(30vw) rotateY(-15deg)';
      } else if (direction === 'up') {
        bottomName.classList.add('scroll-left');
        bottomName.style.transform = 'translateX(-30vw) rotateY(15deg)';
      }
    } else {
      // Reset when near top
      bottomName.classList.remove('scroll-right', 'scroll-left');
      bottomName.style.transform = 'translateX(0) rotateY(0deg)';
    }
  } catch (error) {
    console.error('❌ Error animating bottom name:', error);
  }
}

function updateNavbar3D(scrollY) {
  if (!navbar) return;
  
  try {
    if (scrollY > 100) {
      navbar.classList.add('scrolled');
      navbar.style.transform = 'translateY(0) translateZ(10px)';
    } else {
      navbar.classList.remove('scrolled');
      navbar.style.transform = 'translateY(0) translateZ(0px)';
    }
  } catch (error) {
    console.error('❌ Error updating navbar:', error);
  }
}

function updateParallax3D(scrollY) {
  try {
    // Enhanced parallax effect for hero background layers
    const layers = document.querySelectorAll('.parallax-layer');
    layers.forEach((layer, index) => {
      const speed = (index + 1) * 0.2;
      const yPos = scrollY * speed;
      const rotateX = scrollY * 0.01;
      layer.style.transform = `translateY(${yPos}px) rotateX(${rotateX}deg) translateZ(-${(index + 1) * 100}px)`;
    });
    
    // Floating shapes parallax
    updateFloatingShapesScroll(scrollY);
  } catch (error) {
    console.error('❌ Error updating parallax:', error);
  }
}

function updateFloatingShapesScroll(scrollY) {
  floatingShapes.forEach((shape, index) => {
    const speed = 0.1 + (index * 0.05);
    const yOffset = scrollY * speed;
    const rotateOffset = scrollY * 0.05;
    
    shape.style.transform += ` translateY(${-yOffset}px) rotateZ(${rotateOffset}deg)`;
  });
}

// Enhanced Navigation with 3D effects
function setupNavigation() {
  try {
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log(`🧭 Setting up 3D navigation for ${navLinks.length} links`);
    
    navLinks.forEach((link, index) => {
      // Add 3D hover effects
      link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) rotateX(5deg)';
      });
      
      link.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
          this.style.transform = 'translateY(0) rotateX(0deg)';
        }
      });
      
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href');
        const targetPage = this.getAttribute('data-page');
        
        // Add 3D click effect
        this.style.transform = 'translateY(1px) scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'translateY(-2px) rotateX(5deg)';
        }, 150);
        
        if (targetPage === 'projects') {
          // Navigate to projects page
          navigateToPage('projects');
        } else if (href && href.startsWith('#')) {
          // Handle internal anchors on home page
          if (currentPage !== 'home') {
            // Navigate to home page first, then scroll
            navigateToPage('home', href.substring(1));
          } else {
            // Already on home page, just scroll
            const targetSection = document.querySelector(href);
            if (targetSection) {
              const headerOffset = 100;
              const elementPosition = targetSection.offsetTop;
              const offsetPosition = elementPosition - headerOffset;
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }
        }
        
        console.log(`🎯 Navigation clicked: ${href} (page: ${targetPage})`);
      });
    });
    
    console.log('✅ 3D Navigation setup complete');
  } catch (error) {
    console.error('❌ Error setting up navigation:', error);
  }
}

// Enhanced 3D Interactions for projects and skills
function setup3DInteractions() {
  console.log('🎪 Setting up 3D interactions...');
  
  // Enhanced skill item 3D interactions
  skillItems.forEach((item, index) => {
    // Ensure skill item is visible
    item.style.opacity = '1';
    item.style.visibility = 'visible';
    
    item.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.skill-icon');
      if (icon) {
        icon.style.transform = 'scale(1.3) rotateY(20deg) translateZ(10px)';
      }
      this.style.transform = 'translateX(12px) scale(1.05) rotateY(2deg)';
      this.style.boxShadow = '0 8px 25px rgba(74, 93, 35, 0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.skill-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotateY(0deg) translateZ(0px)';
      }
      this.style.transform = 'translateX(0) scale(1) rotateY(0deg)';
      this.style.boxShadow = 'none';
    });
  });
  
  console.log('✅ 3D interactions setup complete');
}

// Animate skill bars with 3D effects
function animateSkillBars() {
  const skillCategories = document.querySelectorAll('.skill-category');
  
  console.log(`🎯 Animating skill bars for ${skillCategories.length} categories`);
  
  skillCategories.forEach((category) => {
    // Make sure category is visible
    category.style.opacity = '1';
    category.style.visibility = 'visible';
    category.classList.add('visible');
    
    const skillItems = category.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
      setTimeout(() => {
        const progressBar = item.querySelector('.skill-progress');
        const level = item.getAttribute('data-level');
        
        if (progressBar && level) {
          // Animate the progress bar
          progressBar.style.width = `${level}%`;
          
          // Add 3D glow effect
          progressBar.style.boxShadow = '0 0 15px rgba(74, 93, 35, 0.8)';
          
          // Add number counting animation
          const skillLevel = item.querySelector('.skill-level');
          if (skillLevel) {
            animateNumber(skillLevel, 0, parseInt(level), 1000);
          }
        }
      }, index * 200);
    });
  });
}

function animateNumber(element, start, end, duration) {
  const range = end - start;
  const startTime = Date.now();
  
  const updateNumber = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Use easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(start + (range * easeOutQuart));
    
    element.textContent = `${current}%`;
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  };
  
  updateNumber();
}

// Enhanced Intersection Observer for scroll animations
function setupIntersectionObserver() {
  try {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.style.opacity = '1';
          entry.target.style.visibility = 'visible';
          
          // Add specific 3D animations based on element type
          if (entry.target.classList.contains('project-card')) {
            entry.target.style.transform = 'translateY(0) rotateX(0deg)';
          } else if (entry.target.classList.contains('skill-category')) {
            entry.target.style.transform = 'translateY(0) rotateX(0deg)';
          }
        }
      });
    }, observerOptions);
    
    // Observe elements for scroll animations
    setTimeout(() => {
      const elementsToObserve = [
        ...document.querySelectorAll('.about-card'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.skill-category'),
        ...document.querySelectorAll('.contact-info'),
        ...document.querySelectorAll('.contact-form-container'),
        ...document.querySelectorAll('.scroll-animate')
      ];
      
      // Make sure all elements are visible by default
      elementsToObserve.forEach(el => {
        if (el) {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.classList.add('visible');
          observer.observe(el);
        }
      });
      
      console.log(`👁️ Observing ${elementsToObserve.length} elements for 3D scroll animations`);
    }, 500);
  } catch (error) {
    console.error('❌ Error setting up intersection observer:', error);
  }
}

// Enhanced Form handling for ML contact form
function setupFormHandling() {
  try {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      // Add 3D focus effects to form controls
      const formControls = contactForm.querySelectorAll('.form-control-3d');
      formControls.forEach(control => {
        control.addEventListener('focus', function() {
          this.style.transform = 'translateY(-2px) rotateX(1deg)';
          this.style.boxShadow = '0 0 0 3px rgba(74, 93, 35, 0.1), 0 8px 25px rgba(74, 93, 35, 0.15)';
        });
        
        control.addEventListener('blur', function() {
          this.style.transform = 'translateY(0) rotateX(0deg)';
          this.style.boxShadow = '0 0 0 3px rgba(74, 93, 35, 0.1), 0 4px 12px rgba(74, 93, 35, 0.15)';
        });
      });
      
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const project = formData.get('project');
        const message = formData.get('message');
        
        console.log('📧 ML Contact form submitted:', { name, email, project, message });
        
        // Handle form submission with 3D effects
        handleMLFormSubmission(name, email, project, message);
      });
    }
  } catch (error) {
    console.error('❌ Error setting up form handling:', error);
  }
}

function handleMLFormSubmission(name, email, project, message) {
  const submitButton = document.querySelector('#contact-form button[type="submit"]');
  if (!submitButton) return;
  
  const btnText = submitButton.querySelector('.btn-text');
  const btnIcon = submitButton.querySelector('.btn-icon');
  
  // Show loading state with 3D effects
  if (btnText) btnText.textContent = 'Sending...';
  if (btnIcon) {
    btnIcon.textContent = '⚡';
    btnIcon.style.animation = 'spin 1s linear infinite';
  }
  
  submitButton.disabled = true;
  submitButton.style.transform = 'scale(0.95) translateY(1px)';
  submitButton.style.opacity = '0.7';
  
  // Add spinning animation
  const spinKeyframes = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  const style = document.createElement('style');
  style.textContent = spinKeyframes;
  document.head.appendChild(style);
  
  // Simulate API call
  setTimeout(() => {
    // Show success message with 3D effects
    showMLFormMessage(
      `Thank you ${name}! Your ${project || 'inquiry'} has been received. I'll get back to you soon regarding your ML project.`, 
      'success'
    );
    
    // Reset form
    const form = document.getElementById('contact-form');
    if (form) {
      form.reset();
    }
    
    // Reset button with 3D animation
    if (btnText) btnText.textContent = 'Send Message';
    if (btnIcon) {
      btnIcon.textContent = '🚀';
      btnIcon.style.animation = 'none';
    }
    
    submitButton.disabled = false;
    submitButton.style.transform = 'scale(1) translateY(0)';
    submitButton.style.opacity = '1';
    
    // Add success bounce animation
    submitButton.style.animation = 'bounce 0.6s ease-out';
    setTimeout(() => {
      submitButton.style.animation = 'none';
    }, 600);
    
    // Remove spin styles
    document.head.removeChild(style);
    
    console.log('✅ ML form submission completed successfully');
  }, 2000);
}

function showMLFormMessage(message, type) {
  try {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    
    // Enhanced 3D styling for ML theme
    const bgColor = type === 'success' ? 'rgba(107, 142, 35, 0.1)' : 'rgba(139, 69, 19, 0.1)';
    const textColor = type === 'success' ? '#6B8E23' : '#8B4513';
    const borderColor = type === 'success' ? 'rgba(107, 142, 35, 0.2)' : 'rgba(139, 69, 19, 0.2)';
    const shadowColor = type === 'success' ? 'rgba(107, 142, 35, 0.3)' : 'rgba(139, 69, 19, 0.3)';
    
    messageEl.style.cssText = `
      padding: 20px;
      border-radius: 12px;
      margin-top: 20px;
      font-weight: 500;
      text-align: center;
      background-color: ${bgColor};
      color: ${textColor};
      border: 2px solid ${borderColor};
      box-shadow: 0 8px 25px ${shadowColor};
      opacity: 0;
      transform: translateY(20px) rotateX(10deg);
      transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
    `;
    
    // Insert message
    const form = document.getElementById('contact-form');
    if (form) {
      form.appendChild(messageEl);
      
      // Animate in with 3D effect
      setTimeout(() => {
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateY(0) rotateX(0deg)';
      }, 100);
      
      // Remove after delay with fade out
      setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transform = 'translateY(-20px) rotateX(-10deg) scale(0.9)';
        setTimeout(() => {
          if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
          }
        }, 600);
      }, 5000);
    }
  } catch (error) {
    console.error('❌ Error showing form message:', error);
  }
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Performance optimizations and cleanup
window.addEventListener('load', function() {
  console.log('🚀 Window loaded, applying 3D performance optimizations');
  
  try {
    // Enable hardware acceleration for key elements
    const acceleratedElements = [bottomName, navbar, ...floatingShapes, ...projectCards];
    acceleratedElements.forEach(el => {
      if (el) {
        el.style.willChange = 'transform, opacity';
        el.style.transform = 'translateZ(0)';
      }
    });
    
    // Preload animations
    if (document.body) {
      document.body.style.transform = 'translateZ(0)';
      document.body.style.perspective = '1000px';
    }
    
    // Ensure everything is visible after window load
    if (!isLoadingComplete) {
      setTimeout(() => {
        completeLoadingImmediately();
      }, 100);
    }
    
    console.log('✅ 3D Performance optimizations applied');
  } catch (error) {
    console.error('❌ Error applying performance optimizations:', error);
  }
});

// Handle resize events with 3D updates
window.addEventListener('resize', debounce(function() {
  console.log('📐 Window resized, recalculating 3D animations');
  if (isLoadingComplete) {
    const scrollY = window.pageYOffset || window.scrollY || 0;
    if (currentPage === 'home') {
      animateBottomName3D(scrollY, scrollDirection);
    }
    updateNavbar3D(scrollY);
    updateParallax3D(scrollY);
  }
}, 250));

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
});

// Export for external use and debugging
window.MLPortfolio = {
  appData,
  currentPage,
  navigateToPage,
  filterProjects,
  animateBottomName3D,
  updateNavbar3D,
  handleMLFormSubmission,
  isLoadingComplete: () => isLoadingComplete,
  completeLoading: () => {
    if (isLoading) {
      completeLoading();
    } else {
      completeLoadingImmediately();
    }
  },
  // Test functions
  testNavigation: (page) => {
    navigateToPage(page);
    console.log(`✅ Test: Navigated to ${page} page`);
  },
  testFilter: (filter) => {
    if (currentPage === 'projects') {
      filterProjects(filter);
      console.log(`✅ Test: Applied ${filter} filter`);
    } else {
      console.log('⚠️ Navigate to projects page first');
    }
  },
  debugInfo: () => {
    return {
      currentPage,
      isLoadingComplete,
      isLoading,
      scrollDirection,
      lastScrollY,
      elements: {
        loadingScreen: !!loadingScreen,
        mainContent: !!mainContent,
        homePage: !!homePage,
        projectsPage: !!projectsPage,
        bottomNameContainer: !!bottomNameContainer,
        bottomName: !!bottomName,
        navbar: !!navbar,
        floatingShapes: floatingShapes.length,
        projectCards: projectCards.length,
        skillItems: skillItems.length,
        filterButtons: filterButtons.length,
        projectsGrid: !!projectsGrid
      }
    };
  }
};

console.log('🎯 ML Portfolio with 3D enhancements and page navigation loaded successfully!');