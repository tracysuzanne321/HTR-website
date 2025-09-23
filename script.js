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



// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// Animate elements on scroll - Fixed version
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        if (card && card.nodeType === Node.ELEMENT_NODE) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        }
    });

    // Observe about cards
    document.querySelectorAll('.about-card').forEach(card => {
        if (card && card.nodeType === Node.ELEMENT_NODE) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        }
    });
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

// Form submission with loading state
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.booking-form');
    
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.textContent : 'Send';

        form.addEventListener('submit', function (e) {
            console.log('Form submit event triggered'); // Debug log
            
            // Only proceed if form is valid
            if (form.checkValidity()) {
                console.log('Form is valid, proceeding with submission'); // Debug log
                
                // Show loading state
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';
                }

                // Optional fallback: reset button after timeout in case formsubmit.co fails
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalBtnText;
                    }
                }, 10000); // 10 seconds timeout
                
                // Let the form submit naturally to FormSubmit
                // Don't prevent default
            } else {
                console.log('Form validation failed'); // Debug log
            }
        });
    } else {
        console.log('Form not found'); // Debug log
    }
});

// Opening Hours Status Indicator
document.addEventListener('DOMContentLoaded', function () {
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');
    
    if (statusDot && statusText) {
        function updateStatus() {
            const now = new Date();
            const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
            const hour = now.getHours();
            const minute = now.getMinutes();
            const currentTime = hour * 60 + minute;
            
            // UK Bank Holidays 2025
            const bankHolidays2025 = [
                '2025-01-01', // New Year's Day
                '2025-04-18', // Good Friday
                '2025-04-21', // Easter Monday
                '2025-05-05', // Early May Bank Holiday
                '2025-05-26', // Spring Bank Holiday
                '2025-08-25', // Summer Bank Holiday
                '2025-12-25', // Christmas Day
                '2025-12-26'  // Boxing Day
            ];
            
            // Check if today is a bank holiday
            const todayString = now.toISOString().split('T')[0];
            const isBankHoliday = bankHolidays2025.includes(todayString);
            
            // Opening hours: Mon-Fri 8:30 AM - 5:00 PM (8:30 = 510 minutes, 17:00 = 1020 minutes)
            const openTime = 8 * 60 + 30; // 8:30 AM
            const closeTime = 17 * 60; // 5:00 PM
            
            let isOpen = false;
            let statusMessage = '';
            
            // Check if it's a bank holiday first
            if (isBankHoliday) {
                statusMessage = 'We are closed (bank holiday)';
            }
            // Check if it's a weekday (Monday = 1 to Friday = 5)
            else if (day >= 1 && day <= 5) {
                if (currentTime >= openTime && currentTime < closeTime) {
                    isOpen = true;
                    statusMessage = 'We are open';
                } else if (currentTime < openTime) {
                    statusMessage = 'We open at 8:30 AM';
                } else {
                    statusMessage = 'We are closed';
                }
            } else {
                statusMessage = 'We are closed (weekend)';
            }
            
            // Update the status indicator
            statusDot.className = 'status-dot ' + (isOpen ? 'open' : 'closed');
            statusText.textContent = statusMessage;
        }
        
        // Update status immediately and then every minute
        updateStatus();
        setInterval(updateStatus, 60000); // Update every minute
    }
});

// Custom Date Picker
document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date-picker');
    const datePickerContainer = document.getElementById('date-picker-container');
    
    if (dateInput && datePickerContainer) {
        // UK Bank Holidays 2025
        const bankHolidays2025 = [
            '2025-01-01', // New Year's Day
            '2025-04-18', // Good Friday
            '2025-04-21', // Easter Monday
            '2025-05-05', // Early May Bank Holiday
            '2025-05-26', // Spring Bank Holiday
            '2025-08-25', // Summer Bank Holiday
            '2025-12-25', // Christmas Day
            '2025-12-26'  // Boxing Day
        ];
        
        let currentDate = new Date();
        let selectedDate = null;
        
        function isWeekend(date) {
            const day = date.getDay();
            return day === 0 || day === 6; // Sunday = 0, Saturday = 6
        }
        
        function isBankHoliday(date) {
            const dateString = date.toISOString().split('T')[0];
            return bankHolidays2025.includes(dateString);
        }
        
        function isValidBookingDate(date) {
            const today = new Date();
            const twoDaysFromNow = new Date(today);
            twoDaysFromNow.setDate(today.getDate() + 2);
            
            // Must be at least 2 days in the future
            if (date < twoDaysFromNow) {
                return false;
            }
            
            // Cannot be weekend
            if (isWeekend(date)) {
                return false;
            }
            
            // Cannot be bank holiday
            if (isBankHoliday(date)) {
                return false;
            }
            
            return true;
        }
        
        function formatDate(date) {
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
        
        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());
            
            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            
            const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            
            datePickerContainer.innerHTML = `
                <div class="date-picker-header">
                    <button class="date-picker-nav" id="prev-month">‹</button>
                    <div class="date-picker-month-year">${monthNames[month]} ${year}</div>
                    <button class="date-picker-nav" id="next-month">›</button>
                </div>
                <div class="date-picker-weekdays">
                    ${weekdays.map(day => `<div class="date-picker-weekday">${day}</div>`).join('')}
                </div>
                <div class="date-picker-days" id="calendar-days"></div>
            `;
            
            const calendarDays = document.getElementById('calendar-days');
            const today = new Date();
            
            for (let i = 0; i < 42; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                
                const dayButton = document.createElement('button');
                dayButton.className = 'date-picker-day';
                dayButton.textContent = date.getDate();
                
                // Check if this date is valid for booking
                const isValid = isValidBookingDate(date);
                const isCurrentMonth = date.getMonth() === month;
                const isToday = date.toDateString() === today.toDateString();
                const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                
                if (!isValid) {
                    dayButton.classList.add('disabled');
                }
                
                if (!isCurrentMonth) {
                    dayButton.classList.add('other-month');
                }
                
                if (isToday) {
                    dayButton.classList.add('today');
                }
                
                if (isSelected) {
                    dayButton.classList.add('selected');
                }
                
                if (isValid) {
                    dayButton.addEventListener('click', (e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        selectedDate = date;
                        dateInput.value = formatDate(date);
                        datePickerContainer.classList.remove('show');
                        renderCalendar(); // Re-render to show selection
                    });
                }
                
                calendarDays.appendChild(dayButton);
            }
            
            // Add navigation event listeners
            document.getElementById('prev-month').addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });
            
            document.getElementById('next-month').addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event bubbling
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });
        }
        
        // Show/hide date picker
        dateInput.addEventListener('click', () => {
            datePickerContainer.classList.toggle('show');
        });
        
        // Close date picker when clicking outside
        document.addEventListener('click', (e) => {
            if (!dateInput.contains(e.target) && !datePickerContainer.contains(e.target)) {
                datePickerContainer.classList.remove('show');
            }
        });
        
        // Initialize calendar
        renderCalendar();
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
