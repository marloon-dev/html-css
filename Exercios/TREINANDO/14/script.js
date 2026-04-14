const card = document.getElementById('card');
const title = document.getElementById('loginTitle');
const form = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const togglePassword = document.getElementById('togglePassword');
const formMessage = document.getElementById('formMessage');

const originalTitle = title.dataset.text;

function typeTitle(text, index = 0) {
    if (index === 0) {
        title.textContent = '';
    }

    if (index < text.length) {
        title.textContent += text[index];
        setTimeout(() => typeTitle(text, index + 1), 140);
    }
}

function setMessage(text) {
    formMessage.textContent = text;
    formMessage.classList.add('show');
}

function clearMessage() {
    formMessage.textContent = '';
    formMessage.classList.remove('show');
}

window.addEventListener('load', () => {
    typeTitle(originalTitle);
});

card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = (event.clientX - centerX) / 22;
    const rotateX = (centerY - event.clientY) / 22;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
});

[username, password].forEach((input) => {
    input.addEventListener('focus', () => {
        card.classList.add('is-active');
        clearMessage();
    });

    input.addEventListener('blur', () => {
        if (document.activeElement !== username && document.activeElement !== password) {
            card.classList.remove('is-active');
        }
    });
});

togglePassword.addEventListener('click', () => {
    const isPassword = password.type === 'password';
    password.type = isPassword ? 'text' : 'password';
    togglePassword.textContent = isPassword ? 'Hide' : 'Show';
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!username.value.trim() || !password.value.trim()) {
        setMessage('Preencha username e password.');
        return;
    }

    submitBtn.classList.add('loading');
    submitBtn.value = 'Loading...';
    setMessage('Verificando seus dados...');

    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.value = 'Sign in';
        setMessage(`Welcome back, ${username.value.trim()}!`);
        form.reset();
        password.type = 'password';
        togglePassword.textContent = 'Show';
        card.classList.remove('is-active');
    }, 1800);
});
