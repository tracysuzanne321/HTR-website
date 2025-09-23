// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Form Handling with FormSubmit
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Let FormSubmit handle the submission naturally
        // We'll show success message after a delay
        setTimeout(() => {
            showSuccessMessage();
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
        
        // Don't prevent default - let the form submit normally
        // The form will redirect to FormSubmit's success page
    });
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'form-message success';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #10b981;
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        text-align: center;
        max-width: 400px;
    `;
    message.innerHTML = `
        <h3 style="margin: 0 0 10px 0; font-size: 18px;">Booking Request Sent!</h3>
        <p style="margin: 0;">Thank you for your booking request. We will contact you shortly to confirm your appointment.</p>
    `;
    document.body.appendChild(message);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 5000);
}

function showErrorMessage() {
    const message = document.createElement('div');
    message.className = 'form-message error';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ef4444;
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        text-align: center;
        max-width: 400px;
    `;
    message.innerHTML = `
        <h3 style="margin: 0 0 10px 0; font-size: 18px;">Error Sending Request</h3>
        <p style="margin: 0;">Please try again or call us directly at 01952 240213.</p>
    `;
    document.body.appendChild(message);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 5000);
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Observe about cards
document.querySelectorAll('.about-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Set minimum date for booking form to today and disable weekends
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    
    dateInput.min = `${year}-${month}-${day}`;
    
    // Set max date to 3 months from now
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 3);
    
    const maxYear = maxDate.getFullYear();
    const maxMonth = String(maxDate.getMonth() + 1).padStart(2, '0');
    const maxDay = String(maxDate.getDate()).padStart(2, '0');
    
    dateInput.max = `${maxYear}-${maxMonth}-${maxDay}`;
    
    // Disable weekends (Saturday = 6, Sunday = 0)
    dateInput.addEventListener('change', function() {
        if (this.value) {
            const selectedDate = new Date(this.value + 'T00:00:00');
            const dayOfWeek = selectedDate.getDay();
            
            if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
                // Find the next available weekday
                let nextDate = new Date(selectedDate);
                do {
                    nextDate.setDate(nextDate.getDate() + 1);
                } while (nextDate.getDay() === 0 || nextDate.getDay() === 6);
                
                // Format the next available date
                const nextYear = nextDate.getFullYear();
                const nextMonth = String(nextDate.getMonth() + 1).padStart(2, '0');
                const nextDay = String(nextDate.getDate()).padStart(2, '0');
                
                this.value = `${nextYear}-${nextMonth}-${nextDay}`;
                
                // Show a message to the user
                showWeekendMessage();
            }
        }
    });
    
    // Also check on blur event for better compatibility
    dateInput.addEventListener('blur', function() {
        if (this.value) {
            const selectedDate = new Date(this.value + 'T00:00:00');
            const dayOfWeek = selectedDate.getDay();
            
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                let nextDate = new Date(selectedDate);
                do {
                    nextDate.setDate(nextDate.getDate() + 1);
                } while (nextDate.getDay() === 0 || nextDate.getDay() === 6);
                
                const nextYear = nextDate.getFullYear();
                const nextMonth = String(nextDate.getMonth() + 1).padStart(2, '0');
                const nextDay = String(nextDate.getDate()).padStart(2, '0');
                
                this.value = `${nextYear}-${nextMonth}-${nextDay}`;
                showWeekendMessage();
            }
        }
    });
    
    function showWeekendMessage() {
        // Remove any existing messages
        const existingMessage = document.querySelector('.weekend-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = 'weekend-message';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f59e0b;
            color: white;
            padding: 12px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideIn 0.3s ease-out;
        `;
        message.textContent = 'Weekends are not available. Date moved to next weekday.';
        document.body.appendChild(message);
        
        // Remove message after 4 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.style.animation = 'slideOut 0.3s ease-in';
                setTimeout(() => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }, 300);
            }
        }, 4000);
    }
}

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(button => {
    if (button.type === 'submit') {
        button.addEventListener('click', function() {
            if (button.form && button.form.checkValidity()) {
                button.textContent = 'Processing...';
                button.disabled = true;
                setTimeout(() => {
                    button.textContent = 'Submit Booking Request';
                    button.disabled = false;
                }, 2000);
            }
        });
    }
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = '';
        
        if (value.length > 0) {
            if (value.length <= 5) {
                formattedValue = value;
            } else if (value.length <= 8) {
                formattedValue = value.slice(0, 5) + ' ' + value.slice(5);
            } else {
                formattedValue = value.slice(0, 5) + ' ' + value.slice(5, 8) + ' ' + value.slice(8, 11);
            }
        }
        
        e.target.value = formattedValue;
    });
}

// Vehicle registration formatting
const regInput = document.getElementById('registration');
if (regInput) {
    regInput.addEventListener('input', function(e) {
        e.target.value = e.target.value.toUpperCase();
    });
}
