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


// Book Now button functionality
document.querySelectorAll('.car-card .btn').forEach(button => {
    button.addEventListener('click', function() {
        const carCard = this.closest('.car-card');
        const carName = carCard.querySelector('.car-name').textContent;
        const carPrice = carCard.querySelector('.car-price').textContent;
        
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
            
            <form id="bookingForm" name="CarReservation" method="POST" data-netlify="true" action="/success.html">
                <input type="hidden" name="form-name" value="CarReservation" />
                <input type="hidden" name="Car_Name" value="${carName}" /> 
                <input type="hidden" name="Car_Price" value="${carPrice}" /> 
                
                <div class="form-group">
                    <label for="pickup-date">Pickup Date</label>
                    <input type="date" id="pickup-date" name="Pickup_Date" required>
                </div>
                <div class="form-group">
                    <label for="return-date">Return Date</label>
                    <input type="date" id="return-date" name="Return_Date" required>
                </div>
                <div class="form-group">
                    <label for="booking-name">Full Name</label>
                    <input type="text" id="booking-name" name="Full_Name" required>
                </div>
                <div class="form-group">
                    <label for="booking-email">Email</label>
                    <input type="email" id="booking-email" name="Email" required>
                </div>
                <div class="form-group">
                    <label for="booking-phone">Phone</label>
                    <input type="tel" id="booking-phone" name="Phone" required>
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
        
        // ATTENTION : Aucun gestionnaire d'événement 'submit' n'est attaché ici. Netlify gère la soumission via l'attribut 'action="/success.html"'.

    });
});