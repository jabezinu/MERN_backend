// Initialize AOS Animation Library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-in-out'
    });

    // Enhanced Scroll Down Functionality
    const scrollDownBtn = document.querySelector('.scroll-down');
    const aboutSection = document.getElementById('about');
    
    if (scrollDownBtn && aboutSection) {
        scrollDownBtn.addEventListener('click', () => {
            // Smooth scroll to About section when clicking the scroll down button
            aboutSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
        
        // Add hover effect with mouse movement
        scrollDownBtn.addEventListener('mousemove', (e) => {
            const rect = scrollDownBtn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate the tilt based on mouse position
            const tiltX = (y / rect.height - 0.5) * 10;
            const tiltY = (x / rect.width - 0.5) * -10;
            
            // Apply the tilt effect
            scrollDownBtn.style.transform = `translateX(-50%) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        // Reset tilt when mouse leaves
        scrollDownBtn.addEventListener('mouseleave', () => {
            scrollDownBtn.style.transform = 'translateX(-50%)';
        });
    }

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply saved theme or system preference
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Toggle icon
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // DOM Elements
    const body = document.body;
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const backToTop = document.querySelector('.back-to-top');
    const navItems = document.querySelectorAll('.nav-link');
    const cursorFollower = document.querySelector('.cursor-follower');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const contactForm = document.getElementById('contactForm');
    const sections = document.querySelectorAll('section');
    
    // Add index attribute to each nav link for animation
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
    });
    
    // Typing Animation for Hero
    const typingText = document.querySelector('.typing-text');
    const roles = ['Full Stack Developer', 'Backend Developer', 'Problem Solver', 'JavaScript Enthusiast'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Deleting
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50; // Faster when deleting
        } else {
            // Typing
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 150; // Slower when typing
        }
        
        // If typing is complete, start deleting after delay
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingDelay = 1500; // Pause at the end
        } 
        
        // If deleting is complete, move to next role
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500; // Pause before typing new role
        }
        
        setTimeout(typeEffect, typingDelay);
    }
    
    // Start typing animation
    setTimeout(typeEffect, 1000);
    
    // Cursor Follower for Desktop
    if (window.matchMedia('(min-width: 992px)').matches) {
        cursorFollower.classList.add('visible');
        
        document.addEventListener('mousemove', function(e) {
            gsapCursorAnimation(e);
        });
        
        // For smooth cursor animation
        function gsapCursorAnimation(e) {
            // Check if we have GSAP available, otherwise use simpler animation
            if (typeof gsap !== 'undefined') {
                gsap.to(cursorFollower, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.15
                });
            } else {
                cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        }
        
        // Interactive elements make cursor bigger or change color
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.backgroundColor = 'rgba(126, 87, 194, 0.4)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.backgroundColor = 'rgba(126, 87, 194, 0.2)';
            });
        });
    }
    
    // Navbar Scroll Effect with improved performance
    let lastScrollTop = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (scrollTop > 50) {
                    nav.classList.add('scrolled');
                    backToTop.classList.add('visible');
                } else {
                    nav.classList.remove('scrolled');
                    backToTop.classList.remove('visible');
                }
                
                // Highlight Active Nav Link based on scroll position
                highlightNavOnScroll();
                
                ticking = false;
            });
            
            ticking = true;
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Toggle navigation menu with improved animations
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('nav-open');
        
        // Reset animation for nav items when menu opens
        if (navLinks.classList.contains('active')) {
            navItems.forEach(item => {
                item.style.opacity = "0";
                // Trigger reflow to restart animation
                void item.offsetWidth;
            });
            // Delay slightly to ensure animations restart properly
            setTimeout(() => {
                navItems.forEach(item => {
                    item.style.opacity = "";
                });
            }, 10);
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('nav-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });
    
    // Highlight Nav Link on Scroll
    function highlightNavOnScroll() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    }
    
    // Project Filtering with smoother transitions
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide projects based on filter
            projectCards.forEach(card => {
                // Prepare all cards for transition
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                
                if (filter === 'all') {
                    card.style.display = 'block';
                    
                    // Add animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    
                    // Add animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    // Hide after animation
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Smooth Scrolling for Nav Links and Back to Top with better handling of mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // For mobile, adjust scroll offset based on screen size
                const offset = window.innerWidth <= 768 ? 60 : 70;
                
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const formElements = contactForm.elements;
            const formStatus = document.getElementById('form-status');
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit' && formElements[i].required && formElements[i].value.trim() === '') {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else {
                    formElements[i].classList.remove('error');
                }
            }
            
            if (isValid) {
                // Show loading indicator
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Get form data
                const formData = new FormData(contactForm);
                const formValues = {};
                formData.forEach((value, key) => {
                    formValues[key] = value;
                });
                
                // Prepare template parameters for EmailJS
                const templateParams = {
                    user_name: formValues.user_name,
                    user_email: formValues.user_email,
                    subject: formValues.subject,
                    message: formValues.message,
                    to_email: 'jabezzinu31@gmail.com'
                };
                
                // Send email using EmailJS
                emailjs.send('service_aifc615', 'template_28cuieu', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Create success message
                        const successMessage = document.createElement('div');
                        successMessage.className = 'success-message';
                        successMessage.innerHTML = `
                            <i class="fas fa-check-circle"></i>
                            <p>Thanks for your message, ${formValues.user_name}! I'll get back to you soon.</p>
                        `;
                        
                        // Clear the form
                        contactForm.reset();
                        
                        // Show success message
                        formStatus.innerHTML = '';
                        formStatus.appendChild(successMessage);
                        formStatus.style.display = 'block';
                        
                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                        
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            formStatus.style.display = 'none';
                        }, 5000);
                    })
                    .catch(function(error) {
                        console.log('FAILED...', error);
                        
                        // Create error message
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.innerHTML = `
                            <i class="fas fa-exclamation-circle"></i>
                            <p>Oops! Something went wrong. Please try again later or contact me directly at jabezzinu31@gmail.com</p>
                        `;
                        
                        // Show error message
                        formStatus.innerHTML = '';
                        formStatus.appendChild(errorMessage);
                        formStatus.style.display = 'block';
                        
                        // Reset button
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                    });
            }
        });
    }
    
    // Parallax effect on scroll for home section with improved performance
    const homeSection = document.querySelector('#home');
    let parallaxTicking = false;
    
    if (homeSection && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            if (!parallaxTicking) {
                window.requestAnimationFrame(function() {
                    const scrollPosition = window.scrollY;
                    if (scrollPosition < homeSection.offsetHeight) {
                        homeSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
                    }
                    parallaxTicking = false;
                });
                parallaxTicking = true;
            }
        });
    }
    
    // Skills Animation - Trigger when in view
    const progressBars = document.querySelectorAll('.progress');
    
    const animateProgressBar = function() {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s ease-in-out';
            }, 100);
        });
    };
    
    // Trigger progress bar animation when skills section is in view
    const skillsSection = document.querySelector('#skills');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Detect orientation change and adjust UI accordingly
    window.addEventListener('orientationchange', function() {
        // Wait for orientation change to complete
        setTimeout(function() {
            // Reset any fixed positioning that might cause issues
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.classList.remove('nav-open');
            }
            
            // Recalculate any height-based elements if needed
            // ...
            
            // Re-initialize AOS animations
            AOS.refresh();
        }, 200);
    });
    
    // Navbar active state - highlight nav link of current section
    highlightNavOnScroll();
}); 