// EMAIL DROPDOWN
const emailLink = document.getElementById('email-nav-link');
const emailContainer = emailLink.closest('.email-container');
const navMenu = document.querySelector('.nav-menu');
const emailIcon = emailLink.querySelector('.email-icon');
const emailText = emailLink.querySelector('.email-text');

let isEmailExpanded = false;
let isSelecting = false;

// Handle clicks on the email icon only
emailIcon.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  
  const mainNav = document.querySelector('.main-nav');
  
  if (!isEmailExpanded) {
    // Expand the email
    emailContainer.classList.add('expanded');
    navMenu.classList.add('email-expanded');
    mainNav.classList.add('email-expanded');
    isEmailExpanded = true;
  } else {
    // Collapse the email
    emailContainer.classList.remove('expanded');
    navMenu.classList.remove('email-expanded');
    mainNav.classList.remove('email-expanded');
    isEmailExpanded = false;
  }
});

// Smooth scroll behavior for any internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Handle text selection events
emailText.addEventListener('mousedown', (e) => {
  e.stopPropagation();
  isSelecting = true;
});

emailText.addEventListener('mousemove', (e) => {
  if (isSelecting) {
    e.stopPropagation();
  }
});

emailText.addEventListener('mouseup', (e) => {
  e.stopPropagation();
  isSelecting = false;
});

emailText.addEventListener('click', (e) => {
  e.stopPropagation();
  const selection = window.getSelection();
  if (selection.toString().length === 0) {
    e.preventDefault();
  }
});

// Prevent the main link from interfering with text selection
emailLink.addEventListener('mousedown', (e) => {
  if (e.target === emailText) {
    e.stopPropagation();
    return;
  }
  e.preventDefault();
  e.stopPropagation();
});

emailLink.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

// Disable drag on the link to prevent interference
emailLink.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

// Close email when clicking elsewhere
document.addEventListener('click', (e) => {
  if (!emailContainer.contains(e.target) && isEmailExpanded) {
    const mainNav = document.querySelector('.main-nav');
    emailContainer.classList.remove('expanded');
    navMenu.classList.remove('email-expanded');
    mainNav.classList.remove('email-expanded');
    isEmailExpanded = false;
  }
});

//END EMAIL DROPDOWN

// Nav scroll functionality
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.main-nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Image and Video expansion functionality
document.addEventListener('click', function(e) {
    if (e.target.matches('.portfolio-media img') && !e.target.classList.contains('expanded')) {
        e.stopPropagation();
        
        // Close any currently expanded images or videos first
        const currentlyExpanded = document.querySelectorAll('.portfolio-media img.expanded, .portfolio-media video.expanded');
        currentlyExpanded.forEach(media => {
            media.classList.remove('expanded');
            media.closest('.portfolio-media').classList.remove('has-expanded');
        });
        
        // Small delay to ensure smooth transition
        setTimeout(() => {
            // Expand clicked image
            e.target.classList.add('expanded');
            e.target.closest('.portfolio-media').classList.add('has-expanded');
            
            // Prevent body scroll when image is expanded
            document.body.style.overflow = 'hidden';
        }, 50);
    }
    
    if (e.target.matches('.portfolio-media video') && !e.target.classList.contains('expanded')) {
        e.stopPropagation();
        
        // Close any currently expanded images or videos first
        const currentlyExpanded = document.querySelectorAll('.portfolio-media img.expanded, .portfolio-media video.expanded');
        currentlyExpanded.forEach(media => {
            media.classList.remove('expanded');
            media.closest('.portfolio-media').classList.remove('has-expanded');
        });
        
        // Small delay to ensure smooth transition
        setTimeout(() => {
            // Expand clicked video
            e.target.classList.add('expanded');
            e.target.closest('.portfolio-media').classList.add('has-expanded');
            
            // Prevent body scroll when video is expanded
            document.body.style.overflow = 'hidden';
        }, 50);
    }
});

// Close expanded image or video when clicking anywhere
document.addEventListener('click', function(e) {
    const expandedImg = document.querySelector('.portfolio-media img.expanded');
    const expandedVideo = document.querySelector('.portfolio-media video.expanded');
    const expandedMedia = expandedImg || expandedVideo;
    
    if (expandedMedia && !e.target.matches('.portfolio-media img:not(.expanded), .portfolio-media video:not(.expanded)')) {
        expandedMedia.classList.remove('expanded');
        expandedMedia.closest('.portfolio-media').classList.remove('has-expanded');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
});

// Close expanded image or video with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const expandedImg = document.querySelector('.portfolio-media img.expanded');
        const expandedVideo = document.querySelector('.portfolio-media video.expanded');
        const expandedMedia = expandedImg || expandedVideo;
        
        if (expandedMedia) {
            expandedMedia.classList.remove('expanded');
            expandedMedia.closest('.portfolio-media').classList.remove('has-expanded');
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }
});

// Portfolio filtering and accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Add expand icons to existing portfolio items
    function addExpandIcons() {
        const portfolioHeaders = document.querySelectorAll('.portfolio-header-card');
        
        portfolioHeaders.forEach(header => {
            if (!header.querySelector('.portfolio-expand-icon')) {
                const expandIcon = document.createElement('div');
                expandIcon.className = 'portfolio-expand-icon';
                expandIcon.textContent = '+';
                
                const headerRow = header.querySelector('.portfolio-header-row');
                if (headerRow) {
                    headerRow.appendChild(expandIcon);
                } else {
                    header.appendChild(expandIcon);
                }
            }
        });
    }

    // Initialize expand icons
    addExpandIcons();

    // Filter functionality
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Close any expanded images/videos when filtering
            const expandedMedia = document.querySelectorAll('.portfolio-media img.expanded, .portfolio-media video.expanded');
            expandedMedia.forEach(media => {
                media.classList.remove('expanded');
                media.closest('.portfolio-media').classList.remove('has-expanded');
            });
            document.body.style.overflow = '';
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.dataset.filter;

            // Filter items with smooth animation
            portfolioItems.forEach(item => {
                const itemCategory = item.dataset.category;
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                    // Close expanded items when hiding them
                    item.classList.remove('expanded');
                    const icon = item.querySelector('.portfolio-expand-icon');
                    if (icon) icon.textContent = '+';
                    const content = item.querySelector('.portfolio-content');
                    if (content) content.style.maxHeight = '0';
                }
            });
        });
    });

    // Function to adjust content height dynamically
    function adjustContentHeight(item) {
        const content = item.querySelector('.portfolio-content');
        const contentInner = item.querySelector('.portfolio-content-inner');
        
        if (item.classList.contains('expanded') && content && contentInner) {
            // Reset max-height to measure content
            content.style.maxHeight = 'none';
            const height = contentInner.scrollHeight;
            // Add extra padding to ensure nothing gets cut off
            content.style.maxHeight = (height + 40) + 'px';
        }
    }

    // Portfolio accordion functionality
    function setupAccordion() {
        const portfolioHeaders = document.querySelectorAll('.portfolio-header-card');

        portfolioHeaders.forEach(header => {
            // Remove existing click listeners by cloning the element
            const newHeader = header.cloneNode(true);
            header.parentNode.replaceChild(newHeader, header);
        });

        // Re-query after cloning and re-add icons
        addExpandIcons();
        const newPortfolioHeaders = document.querySelectorAll('.portfolio-header-card');

        newPortfolioHeaders.forEach(header => {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const item = header.closest('.portfolio-item');
                const icon = header.querySelector('.portfolio-expand-icon');
                const isExpanded = item.classList.contains('expanded');

                // Close all other items
                portfolioItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('expanded')) {
                        otherItem.classList.remove('expanded');
                        const otherIcon = otherItem.querySelector('.portfolio-expand-icon');
                        if (otherIcon) otherIcon.textContent = '+';
                        const otherContent = otherItem.querySelector('.portfolio-content');
                        if (otherContent) otherContent.style.maxHeight = '0';
                    }
                });

                // Toggle current item
                if (isExpanded) {
                    item.classList.remove('expanded');
                    if (icon) icon.textContent = '+';
                    const content = item.querySelector('.portfolio-content');
                    if (content) content.style.maxHeight = '0';
                } else {
                    item.classList.add('expanded');
                    if (icon) icon.textContent = '−';
                    // Adjust height after a short delay to allow for transition
                    setTimeout(() => {
                        const content = item.querySelector('.portfolio-content');
                        const contentInner = item.querySelector('.portfolio-content-inner');
                        if (content && contentInner) {
                            content.style.maxHeight = 'none';
                            const height = contentInner.scrollHeight;
                            // Add extra padding to ensure buttons aren't cut off
                            content.style.maxHeight = (height + 60) + 'px';
                        }
                    }, 10);
                }
            });
        });
    }

    // Initialize accordion
    setupAccordion();

    // Add stagger animation to portfolio items on load
    portfolioItems.forEach((item, index) => {
        item.style.transition = `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
    });

    // Reinitialize when new items are added dynamically
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('portfolio-item')) {
                        addExpandIcons();
                        setupAccordion();
                    }
                });
            }
        });
    });

    // Observe the portfolio list for changes
    const portfolioList = document.querySelector('.portfolio-list');
    if (portfolioList) {
        observer.observe(portfolioList, { childList: true, subtree: true });
    }
});

// Direct link handler
window.addEventListener('load', function() {
    const hash = window.location.hash;
    if (hash) {
        setTimeout(() => {
            const targetItem = document.getElementById(hash.substring(1));
            if (targetItem && targetItem.classList.contains('portfolio-item')) {
                const header = targetItem.querySelector('.portfolio-header-card');
                if (header) {
                    header.click();
                    setTimeout(() => {
                        targetItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }
            }
        }, 1000);
    }
});

function alignHeroLinksWithImage() {
  const heroLinks = document.querySelector('.hero-links');
  const landingImg = document.querySelector('.landing-img');
  
  if (!heroLinks || !landingImg) return;
  
  // Function to set the width
  function setWidth() {
    // Only apply on desktop (above 768px)
    if (window.innerWidth > 768) {
      // Wait for image to load and get its rendered width
      if (landingImg.complete) {
        const imgWidth = landingImg.offsetWidth;
        heroLinks.style.width = imgWidth + 'px';
      } else {
        landingImg.onload = function() {
          const imgWidth = landingImg.offsetWidth;
          heroLinks.style.width = imgWidth + 'px';
        };
      }
    } else {
      // On mobile, remove the width override
      heroLinks.style.width = '';
    }
  }
  
  // Set width on load
  setWidth();
  
  // Update on window resize
  window.addEventListener('resize', setWidth);
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', alignHeroLinksWithImage);

// Also run when page is fully loaded (in case image wasn't cached)
window.addEventListener('load', alignHeroLinksWithImage);