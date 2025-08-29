// Custom Popup Functionality
function showPopup(message, type = 'info') {
    // Create popup container
    const popup = document.createElement('div');
    popup.className = `custom-popup ${type}`;
    
    // Create popup content
    const content = document.createElement('div');
    content.className = 'popup-content';
    
    // Add icon based on type
    const icon = document.createElement('span');
    icon.className = 'popup-icon';
    icon.innerHTML = type === 'success' ? '✓' : 'ℹ';
    
    // Add message
    const messageEl = document.createElement('p');
    messageEl.textContent = message;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'popup-close';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => {
        popup.classList.add('fade-out');
        setTimeout(() => popup.remove(), 300);
    };
    
    // Assemble popup
    content.appendChild(icon);
    content.appendChild(messageEl);
    content.appendChild(closeBtn);
    popup.appendChild(content);
    
    // Add to document
    document.body.appendChild(popup);
    
    // Show popup after a small delay to ensure the transition works
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => popup.remove(), 300);
    }, 5000);
}

// Predictive Destination Search
const destinations = [
    { name: 'Dubai', description: 'Qyteti i artit modern dhe luksi', image: 'images/dubai.jpg' },
    { name: 'Paris', description: 'Qyteti i dashurisë dhe kulturës', image: 'images/paris.jpg' },
    { name: 'Rome', description: 'Qyteti i historisë dhe arkitekturës', image: 'images/rome.jpg' },
    { name: 'Tokyo', description: 'Qyteti i teknologjisë dhe traditës', image: 'images/tokyo.jpg' },
    { name: 'Bali', description: 'Ishulli i bukurisë natyrore', image: 'images/bali.jpg' },
    { name: 'Switzerland', description: 'Vendi i alpeve dhe qetësisë', image: 'images/switzerland.jpg' }
];

document.addEventListener('DOMContentLoaded', function() {
    // Destination Search Dropdown Functionality
    const destinationSearch = document.getElementById('destinationSearch');
    const destinationDropdown = document.querySelector('.search-dropdown');

    if (destinationSearch && destinationDropdown) {
        // Clear existing content and create new list
        destinationDropdown.innerHTML = '<ul class="destination-list"></ul>';
        const destinationList = destinationDropdown.querySelector('.destination-list');

        // Function to create destination item
        function createDestinationItem(destination) {
            const li = document.createElement('li');
            li.className = 'destination-item';
            li.innerHTML = `
                <div class="destination-info">
                    <span class="destination-name">${destination.name}</span>
                </div>
                <div class="destination-arrow">
                    <i class="fas fa-chevron-right"></i>
                </div>
            `;
            return li;
        }

        // Function to filter and show predictions
        function showPredictions(searchTerm) {
            const filtered = destinations.filter(dest => 
                dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dest.description.toLowerCase().includes(searchTerm.toLowerCase())
            );

            destinationList.innerHTML = '';
            
            if (filtered.length > 0) {
                filtered.forEach(dest => {
                    const li = createDestinationItem(dest);
                    li.addEventListener('click', () => {
                        destinationSearch.value = dest.name;
                        destinationDropdown.classList.remove('active');
                        showPopup(`Destinacioni i zgjedhur: ${dest.name}`, 'success');
                    });
                    destinationList.appendChild(li);
                });
                destinationDropdown.classList.add('active');
            } else if (searchTerm) {
                const noResults = document.createElement('li');
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <div class="no-results-content">
                        <i class="fas fa-search"></i>
                        <span>Nuk u gjet asnjë destinacion</span>
                    </div>
                `;
                destinationList.appendChild(noResults);
                destinationDropdown.classList.add('active');
            } else {
                destinationDropdown.classList.remove('active');
            }
        }

        // Show all destinations on focus
        destinationSearch.addEventListener('focus', () => {
            showPredictions(destinationSearch.value);
        });

        // Filter as user types
        destinationSearch.addEventListener('input', (e) => {
            showPredictions(e.target.value);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!destinationSearch.contains(e.target) && !destinationDropdown.contains(e.target)) {
                destinationDropdown.classList.remove('active');
            }
        });
    }

    // Custom Dropdown Functionality
    const customDropdowns = document.querySelectorAll('.custom-dropdown');
    
    customDropdowns.forEach(dropdown => {
        const selected = dropdown.querySelector('.selected-option');
        const options = dropdown.querySelector('.dropdown-options');
        
        selected.addEventListener('click', () => {
            dropdown.classList.toggle('active');
        });
        
        const dropdownOptions = dropdown.querySelectorAll('.dropdown-option');
        dropdownOptions.forEach(option => {
            option.addEventListener('click', () => {
                selected.querySelector('span').textContent = option.textContent;
                dropdown.classList.remove('active');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = this.querySelectorAll('span');
        spans[0].classList.toggle('rotate-45');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('rotate--45');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Navigation link clicked:', this.getAttribute('href'));
            const target = document.querySelector(this.getAttribute('href'));
            console.log('Target element:', target);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking a link
                navMenu.classList.remove('active');
            }
        });
    });

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                message: this.querySelector('#message').value
            };

            // Here you would typically send the data to your server
            // For now, we'll just log it and show a success message
            console.log('Form Data:', formData);

            // Show success message using our custom popup
            showPopup('Mesazhi u dërgua me sukses! Faleminderit për kontaktimin.', 'success');
            
            // Reset form
            this.reset();
        });
    }

    // Search Functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const searchInput = this.querySelector('.search-input');
            const searchTerm = searchInput.value.trim().toLowerCase();
            
            if (searchTerm) {
                // Here you would typically send the search term to your server
                // For now, we'll just log it and show a message
                console.log('Searching for:', searchTerm);
                
                // You could implement a search results page or filter destinations
                // For now, we'll just show a message
                alert(`Kërkim për: "${searchTerm}"\n\nKjo funksionalitet do të implementohet së shpejti!`);
            }
        });
    }

    // Search Dropdown Functionality
    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.getElementById('searchDropdown');
    const popularDestinations = document.querySelectorAll('.popular-destinations li');
    
    if (searchInput && searchDropdown) {
        // Show dropdown when input is focused
        searchInput.addEventListener('focus', function() {
            searchDropdown.classList.add('active');
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!searchInput.contains(event.target) && !searchDropdown.contains(event.target)) {
                searchDropdown.classList.remove('active');
            }
        });
        
        // Handle destination selection
        popularDestinations.forEach(destination => {
            destination.addEventListener('click', function() {
                const destinationName = this.getAttribute('data-destination');
                const destinationFullName = this.querySelector('.destination-name').textContent;
                searchInput.value = destinationFullName;
                searchDropdown.classList.remove('active');
                
                // Trigger search with the selected destination
                console.log('Selected destination:', destinationName);
                alert(`Destinacioni i zgjedhur: ${destinationFullName}\n\nKjo funksionalitet do të implementohet së shpejti!`);
            });
        });
        
        // Filter destinations as user types
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm.length > 0) {
                searchDropdown.classList.add('active');
                
                // Filter destinations based on search term
                popularDestinations.forEach(destination => {
                    const destinationName = destination.querySelector('.destination-name').textContent.toLowerCase();
                    const destinationDesc = destination.querySelector('.destination-desc').textContent.toLowerCase();
                    
                    if (destinationName.includes(searchTerm) || destinationDesc.includes(searchTerm)) {
                        destination.style.display = '';
                    } else {
                        destination.style.display = 'none';
                    }
                });
            } else {
                searchDropdown.classList.remove('active');
                popularDestinations.forEach(destination => {
                    destination.style.display = '';
                });
            }
        });
    }

    // Scroll Animations
    function onScroll() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                el.classList.add('animated');
            }
        });
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    // Intersection Observer for animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Show More Toggle with Reset Animations
    const showMoreButton = document.querySelector('.show-more-button');
    if (showMoreButton) {
        showMoreButton.addEventListener('click', () => {
            const hiddenItems = document.querySelectorAll('.hidden-item');
            hiddenItems.forEach(item => {
                item.classList.toggle('hidden');
                item.classList.remove('animated'); // Reset animation
                setTimeout(() => item.classList.add('animated'), 100); // Restart animation
            });

            showMoreButton.textContent = showMoreButton.textContent === 'Trego më shumë' ? 'Trego më pak' : 'Trego më shumë';
        });
    }

    // Insurance Plan Selection Alert
    const planButtons = document.querySelectorAll('.plan-button');
    planButtons.forEach(button => {
        button.addEventListener('click', () => {
            const plan = button.textContent.trim();
            alert(`Keni zgjedhur planin: ${plan}\n\nFaleminderit për zgjedhjen tuaj!`);
        });
    });

    // Search Tab Switcher with Animation
    const tabs = document.querySelectorAll('.search-tab');
    const tabContents = document.querySelectorAll('.search-tab-content');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            tab.classList.add('active');
            tabContents[index].classList.add('active');
            
            // Restart animation for the active tab content
            tabContents[index].classList.remove('animated');
            setTimeout(() => tabContents[index].classList.add('animated'), 10);
        });
    });

    // Hero Video Parallax and Tilt Effect
    const heroVideo = document.querySelector('.hero-video');
    const heroSection = document.querySelector('.hero');
    
    if (heroVideo && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            heroVideo.style.transform = `translate(-${x * 10}px, -${y * 10}px) rotateX(${(y - 0.5) * 10}deg) rotateY(${(x - 0.5) * 10}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroVideo.style.transform = 'translate(0, 0) rotateX(0) rotateY(0)';
        });

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            heroVideo.style.transform += ` translateY(${scrollY * 0.3}px)`;
        });
    }

    // Search Container Pulse Effect
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        setInterval(() => {
            searchContainer.classList.toggle('pulse');
        }, 2000);
    }

    // === PROFILE DROPDOWN TOGGLE ADDED HERE ===
    const authButton = document.getElementById('authButton');
    const profileDropdown = document.querySelector('.profile-dropdown');

    if (authButton && profileDropdown) {
        authButton.addEventListener('click', () => {
            profileDropdown.classList.toggle('hidden');
        });

        // Close dropdown if clicking outside
        document.addEventListener('click', (e) => {
            if (!authButton.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }
});
