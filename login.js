const loginForm = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  if (username.value === 'admin' && password.value === 'admin123') {
    window.location.href = '/dashboard.html';
  }
});
