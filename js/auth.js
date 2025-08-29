// ========== Constants ==========
const USERS_STORAGE_KEY = 'registeredUsers';

// ========== Storage Functions ==========
function getRegisteredUsers() {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
}

function saveRegisteredUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function isLoggedIn() {
    return !!getCurrentUser();
}

function logout() {
    localStorage.removeItem('currentUser');
    redirectTo('index.html');
}

function redirectTo(url) {
    window.location.href = url;
}

// ========== Auth Functions ==========
async function registerUser(username, email, password) {
    try {
        const users = getRegisteredUsers();
        const existing = users.find(user => user.email.toLowerCase() === email.toLowerCase());

        if (existing) {
            return { success: false, error: 'Email already registered' };
        }

        const newUser = {
            username: username.trim(),
            email: email.trim(),
            password: password.trim()
        };

        users.push(newUser);
        saveRegisteredUsers(users);
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        return { success: true, data: { user: newUser } };
    } catch {
        return { success: false, error: 'Registration failed' };
    }
}

async function loginUser(email, password) {
    try {
        const users = getRegisteredUsers();
        const user = users.find(u =>
            u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true, data: { user } };
        } else {
            return { success: false, error: 'Invalid email or password' };
        }
    } catch {
        return { success: false, error: 'Login failed' };
    }
}

// ========== UI Functions ==========
function updateAuthUI() {
    const authButton = document.querySelector('.auth-button');
    const profileDropdown = document.querySelector('.profile-dropdown');
    const currentUser = getCurrentUser();

    if (authButton) {
        if (currentUser) {
            authButton.innerHTML = `<i class="fas fa-user"></i><span>${currentUser.username}</span>`;
            profileDropdown && (profileDropdown.style.display = 'block');
        } else {
            authButton.innerHTML = `<i class="fas fa-user"></i><span>Regjistrohu</span>`;
            profileDropdown && (profileDropdown.style.display = 'none');
        }
    }
}

// ========== Form Handlers ==========
async function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await registerUser(username, email, password);
    if (result.success) {
        alert('Registration successful!');
        redirectTo('index.html');
    } else {
        alert(`Registration failed: ${result.error}`);
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await loginUser(email, password);
    if (result.success) {
        alert('Login successful!');
        redirectTo('index.html');
    } else {
        alert(`Login failed: ${result.error}`);
    }
}

function clearLocalStorage() {
    localStorage.clear();
    alert('Të gjitha të dhënat u fshinë me sukses!');
    redirectTo('index.html');
}

// ========== DOM Event Binding ==========
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutBtn');
    const clearButton = document.getElementById('clearStorageBtn');

    if (registerForm) registerForm.addEventListener('submit', handleRegister);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (logoutButton) logoutButton.addEventListener('click', logout);
    if (clearButton) clearButton.addEventListener('click', clearLocalStorage);

    updateAuthUI();

    // Profile dropdown logic
    document.querySelectorAll('.profile-dropdown a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === 'llogaria.html') {
                redirectTo('llogaria.html?tab=profile');
            } else if (href === '#') {
                logout();
            }
        });
    });

    // Auth button redirect
    document.querySelector('.auth-button')?.addEventListener('click', () => {
        if (!isLoggedIn()) redirectTo('login.html');
    });

    // Dev console output
    console.log('Registered Users:', getRegisteredUsers());
    console.log('Current User:', getCurrentUser());
});
