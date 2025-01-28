document.addEventListener('DOMContentLoaded', function() {
    // Counter Animation
    const counter = document.getElementById('memberCounter');
    const targetNumber = 2500; // Set your target number
    let currentNumber = 0;
    
    function animateCounter() {
        const increment = Math.ceil(targetNumber / 100);
        if (currentNumber < targetNumber) {
            currentNumber = Math.min(currentNumber + increment, targetNumber);
            counter.textContent = currentNumber.toString().padStart(4, '0');
            requestAnimationFrame(animateCounter);
        }
    }
    
    animateCounter();

    // Club Items Interaction
    const clubItems = document.querySelectorAll('.club-item');
    
    clubItems.forEach(club => {
        // Ensure all clubs have dropdowns
        if (!club.querySelector('.details-sidebar')) {
            const sidebar = document.createElement('div');
            sidebar.className = 'details-sidebar';
            sidebar.innerHTML = `
                <h3>DETAILS:</h3>
                <ul>
                    <li data-action="helpdesk">HELPDESK</li>
                    <li data-action="events">EVENTS</li>
                    <li data-action="contacts">CONTACTS</li>
                </ul>
            `;
            club.appendChild(sidebar);
        }

        // Handle mouseenter event
        club.addEventListener('mouseenter', () => {
            // Close other dropdowns
            clubItems.forEach(otherClub => {
                if (otherClub !== club) {
                    const otherSidebar = otherClub.querySelector('.details-sidebar');
                    if (otherSidebar) {
                        otherSidebar.style.display = 'none';
                        otherSidebar.style.opacity = '0';
                        otherSidebar.style.transform = 'translateX(20px)';
                    }
                }
            });
        });

        // Handle sidebar item clicks
        const sidebarItems = club.querySelectorAll('.details-sidebar li');
        sidebarItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const clubName = club.dataset.club;
                handleSidebarAction(clubName, action);
            });
        });
    });

    // Handle mobile touch events
    if ('ontouchstart' in window) {
        clubItems.forEach(club => {
            club.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const sidebar = club.querySelector('.details-sidebar');
                
                // Close all other dropdowns
                clubItems.forEach(otherClub => {
                    if (otherClub !== club) {
                        const otherSidebar = otherClub.querySelector('.details-sidebar');
                        if (otherSidebar) {
                            otherSidebar.style.display = 'none';
                            otherSidebar.style.opacity = '0';
                            otherSidebar.style.transform = 'translateX(20px)';
                        }
                    }
                });

                // Toggle current dropdown
                if (sidebar.style.display === 'block') {
                    sidebar.style.display = 'none';
                    sidebar.style.opacity = '0';
                    sidebar.style.transform = 'translateX(20px)';
                } else {
                    sidebar.style.display = 'block';
                    sidebar.style.opacity = '1';
                    sidebar.style.transform = 'translateX(0)';
                }
            });
        });
    }

    // Handle sidebar actions
    function handleSidebarAction(clubName, action) {
        // You can customize these actions based on your needs
        switch(action) {
            case 'helpdesk':
                console.log(`Opening helpdesk for ${clubName}`);
                // Add your helpdesk logic here
                break;
            case 'events':
                console.log(`Showing events for ${clubName}`);
                // Add your events logic here
                break;
            case 'contacts':
                console.log(`Showing contacts for ${clubName}`);
                // Add your contacts logic here
                break;
        }
    }

    // Optional: Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.club-item')) {
            clubItems.forEach(club => {
                const sidebar = club.querySelector('.details-sidebar');
                if (sidebar) {
                    sidebar.style.display = 'none';
                    sidebar.style.opacity = '0';
                    sidebar.style.transform = 'translateX(20px)';
                }
            });
        }
    });
});