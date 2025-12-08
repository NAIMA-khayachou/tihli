// Mobile menu toggle
document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('mainNav').classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            document.getElementById('mainNav').classList.remove('active');
        }
    });
});

// Car filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const carCards = document.querySelectorAll('.car-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        carCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would normally send the form data to a server
    // For this demo, we'll just show a success message
    const formElements = this.elements;
    let formData = {};
    
    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].name) {
            formData[formElements[i].name] = formElements[i].value;
        }
    }
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.padding = '15px';
    successMessage.style.backgroundColor = '#4CAF50';
    successMessage.style.color = 'white';
    successMessage.style.marginTop = '20px';
    successMessage.style.borderRadius = '4px';
    successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
    
    // Add message to the form
    this.appendChild(successMessage);
    
    // Reset form
    this.reset();
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});

// Newsletter form submission
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.padding = '10px';
    successMessage.style.backgroundColor = '#4CAF50';
    successMessage.style.color = 'white';
    successMessage.style.marginTop = '10px';
    successMessage.style.borderRadius = '4px';
    successMessage.textContent = 'Thank you for subscribing!';
    
    // Add message to the form
    this.appendChild(successMessage);
    
    // Reset form
    this.reset();
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});

// Book Now button functionality
document.querySelectorAll('.car-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const carName = this.closest('.car-card').querySelector('.car-name').textContent;
        const carPrice = this.closest('.car-card').querySelector('.car-price').textContent;
        
        // Create booking modal
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '2000';
        
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#1e1e1e';
        modalContent.style.padding = '30px';
        modalContent.style.borderRadius = '8px';
        modalContent.style.maxWidth = '500px';
        modalContent.style.width = '90%';
        modalContent.style.position = 'relative';
        
        modalContent.innerHTML = `
            <button style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: white; font-size: 24px; cursor: pointer;">&times;</button>
            <h2 style="color: var(--primary-color); margin-bottom: 20px;">Book ${carName}</h2>
            <p style="margin-bottom: 20px;">Price: ${carPrice}</p>
            <form id="bookingForm">
                <div class="form-group">
                    <label for="pickup-date">Pickup Date</label>
                    <input type="date" id="pickup-date" required>
                </div>
                <div class="form-group">
                    <label for="return-date">Return Date</label>
                    <input type="date" id="return-date" required>
                </div>
                <div class="form-group">
                    <label for="booking-name">Full Name</label>
                    <input type="text" id="booking-name" required>
                </div>
                <div class="form-group">
                    <label for="booking-email">Email</label>
                    <input type="email" id="booking-email" required>
                </div>
                <div class="form-group">
                    <label for="booking-phone">Phone</label>
                    <input type="tel" id="booking-phone" required>
                </div>
                <button type="submit" class="btn">Confirm Booking</button>
            </form>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Close modal when clicking the X button
        modalContent.querySelector('button').addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Handle booking form submission
        document.getElementById('bookingForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.style.padding = '15px';
            successMessage.style.backgroundColor = '#4CAF50';
            successMessage.style.color = 'white';
            successMessage.style.marginTop = '20px';
            successMessage.style.borderRadius = '4px';
            successMessage.style.textAlign = 'center';
            successMessage.textContent = `Your booking for ${carName} has been confirmed! We will contact you shortly.`;
            
            // Replace form with success message
            modalContent.innerHTML = '';
            modalContent.appendChild(successMessage);
            
            // Close modal after 3 seconds
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 3000);
        });
    });
});