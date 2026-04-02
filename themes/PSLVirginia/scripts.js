// Navigation smooth scrolling and active state management
document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation buttons
  const navButtons = document.querySelectorAll('.nav-button');
  const sections = document.querySelectorAll('section[id]');
  
  // Function to update active navigation button
  function updateActiveNav() {
    let currentSectionId = '';
    
    // Find which section is currently in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Offset for fixed nav
      const sectionHeight = section.clientHeight;
      const scrollPosition = window.scrollY;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.id;
      }
    });
    
    // Update active class on nav buttons
    navButtons.forEach(button => {
      button.classList.remove('active');
      if (button.getAttribute('href') === `#${currentSectionId}`) {
        button.classList.add('active');
      }
    });
  }
  
  // Add click event listeners to nav buttons
  navButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Scroll to section with offset for fixed navigation
        const offset = 90; // Height of fixed navigation banner
        const targetPosition = targetSection.offsetTop - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active button
        navButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Update active nav on scroll
  window.addEventListener('scroll', updateActiveNav);
  
  // Initial update
  updateActiveNav();
  
  // Handle initial hash in URL
  if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
      setTimeout(() => {
        const offset = 90;
        const targetPosition = targetSection.offsetTop - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active button
        navButtons.forEach(btn => {
          btn.classList.remove('active');
          if (btn.getAttribute('href') === window.location.hash) {
            btn.classList.add('active');
          }
        });
      }, 100);
    }
  }
});