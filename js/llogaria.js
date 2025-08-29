document.addEventListener('DOMContentLoaded', function () {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to switch tabs
    function switchTab(tabId) {
        // Update URL without reloading the page
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('tab', tabId);
        window.history.pushState({}, '', newUrl);

        // Update active states
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            }
        });

        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === tabId) {
                content.classList.add('active');
            }
        });
    }

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.dataset.tab);
        });
    });

    // Set initial tab based on URL parameter or default to profile
    const initialTab = tab || 'profile';
    switchTab(initialTab);

    // Load user data into form
    function loadUserData() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            document.getElementById('username').value = currentUser.username || '';
            document.getElementById('email').value = currentUser.email || '';
            document.getElementById('bio').value = currentUser.bio || '';
        }
    }

    // Handle form submission
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            alert('Ju duhet të jeni të kyçur për të ruajtur ndryshimet!');
            return;
        }

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Check if current password matches
        if (currentPassword && currentPassword !== currentUser.password) {
            alert('Fjalëkalimi aktual është i gabuar!');
            return;
        }

        // Check if new passwords match
        if (newPassword && newPassword !== confirmPassword) {
            alert('Fjalëkalimet e rinj nuk përputhen!');
            return;
        }

        // Update user data
        currentUser.username = document.getElementById('username').value.trim();
        currentUser.email = document.getElementById('email').value.trim();
        currentUser.bio = document.getElementById('bio').value.trim();

        // Update password if provided
        if (newPassword) {
            currentUser.password = newPassword;
        }

        // Save updated user data
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Update registered users list
        const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('registeredUsers', JSON.stringify(users));
        }

        alert('Ndryshimet u ruajtën me sukses!');

        // Clear password fields
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    });

    // Load booking history
    function loadBookingHistory() {
        const bookingsList = document.getElementById('bookingsList');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (!currentUser) {
            bookingsList.innerHTML = '<p>Ju duhet të jeni të kyçur për të parë historikun e rezervimeve.</p>';
            return;
        }

        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const userBookings = bookings.filter(booking => booking.userEmail === currentUser.email);

        if (userBookings.length === 0) {
            bookingsList.innerHTML = '<p>Nuk keni asnjë rezervim të ruajtur.</p>';
            return;
        }

        bookingsList.innerHTML = userBookings.map(booking => `
            <div class="booking-item">
                <div class="booking-header">
                    <h3>${booking.type === 'flight' ? 'Fluturim' : 'Hotel'}: ${booking.title}</h3>
                    <span class="booking-date">${booking.date}</span>
                </div>
                <div class="booking-details">
                    ${booking.details.map(detail => `
                        <p><strong>${detail.label}:</strong> ${detail.value}</p>
                    `).join('')}
                    <p><strong>Çmimi:</strong> ${booking.price}</p>
                </div>
            </div>
        `).join('');
    }

    // Load initial data
    loadUserData();
    loadBookingHistory();
});
