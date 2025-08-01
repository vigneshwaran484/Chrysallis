// Event Card Toggle Functionality
document.querySelectorAll('.event-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const eventCard = this.closest('.event-card');
        const details = eventCard.querySelector('.event-details');
        const allDetails = document.querySelectorAll('.event-details');
        const allCards = document.querySelectorAll('.event-card');

        // Close all other open event details
        allDetails.forEach(detail => {
            if (detail !== details && detail.classList.contains('active')) {
                detail.classList.remove('active');
                const card = detail.closest('.event-card');
                card.querySelector('.event-toggle').textContent = 'View & Register';
            }
        });

        // Toggle current event details
        details.classList.toggle('active');
        this.textContent = details.classList.contains('active') ? 'Hide Details' : 'View & Register';

        // Scroll to event if opening
        if (details.classList.contains('active')) {
            setTimeout(() => {
                eventCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        }
    });
});

// Smooth scroll to registration for event register buttons
document.querySelectorAll('.event-register').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close all open event details first
            document.querySelectorAll('.event-details').forEach(detail => {
                detail.classList.remove('active');
                detail.closest('.event-card').querySelector('.event-toggle').textContent = 'View & Register';
            });
            
            // Scroll to registration
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 300);
        }
    });
});