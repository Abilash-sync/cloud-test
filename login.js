// Real-time clock for status bar
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Update time immediately and then every second
updateTime();
setInterval(updateTime, 1000);

// Password visibility toggle
const toggleButton = document.querySelector('.toggle-visibility');
const passwordInput = document.getElementById('password');
const toggleIcon = document.getElementById('toggleIcon');

if (toggleButton && passwordInput && toggleIcon) {
    toggleButton.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        toggleIcon.textContent = isPassword ? '◎' : '◉';
        
        // Add animation feedback
        toggleButton.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            toggleButton.style.transform = 'translateY(-50%) scale(1)';
        }, 100);
    });
}

// Form validation and submission
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const submitButton = document.querySelector('.submit-button');

if (loginForm) {
    // Real-time input validation feedback
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    // Add input listeners for real-time validation
    if (emailInput) {
        emailInput.addEventListener('input', (e) => {
            const isValid = validateEmail(e.target.value);
            updateInputState(e.target, isValid);
        });

        emailInput.addEventListener('blur', (e) => {
            if (e.target.value.length > 0) {
                const isValid = validateEmail(e.target.value);
                updateInputState(e.target, isValid);
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            const isValid = validatePassword(e.target.value);
            updateInputState(e.target, isValid);
        });

        passwordInput.addEventListener('blur', (e) => {
            if (e.target.value.length > 0) {
                const isValid = validatePassword(e.target.value);
                updateInputState(e.target, isValid);
            }
        });
    }

    // Form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput?.value || '';
        const password = passwordInput?.value || '';
        const remember = document.getElementById('remember')?.checked || false;

        // Validate inputs
        const emailValid = validateEmail(email);
        const passwordValid = validatePassword(password);

        updateInputState(emailInput, emailValid);
        updateInputState(passwordInput, passwordValid);

        if (!emailValid || !passwordValid) {
            showFormError('Please check your credentials');
            return;
        }

        // Disable form during submission
        submitButton.disabled = true;
        submitButton.querySelector('.btn-label').textContent = 'AUTHENTICATING...';

        // Simulate authentication
        try {
            await simulateAuth(email, password, remember);
            
            // Success animation
            submitButton.querySelector('.btn-label').textContent = 'ACCESS GRANTED';
            submitButton.style.borderColor = 'var(--color-accent)';
            submitButton.style.background = 'var(--color-accent)';
            
            // Update session status
            updateSessionStatus('AUTHENTICATED');
            
            setTimeout(() => {
                console.log('Login successful!');
                // In a real app, redirect to dashboard
                // window.location.href = '/dashboard';
            }, 1500);
            
        } catch (error) {
            // Error animation
            submitButton.querySelector('.btn-label').textContent = 'ACCESS DENIED';
            submitButton.style.borderColor = 'var(--color-warning)';
            
            showFormError(error.message);
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.querySelector('.btn-label').textContent = 'AUTHENTICATE';
                submitButton.style.borderColor = 'var(--color-accent)';
            }, 2000);
        }
    });
}

// Helper function to update input validation state
function updateInputState(input, isValid) {
    if (!input) return;
    
    const container = input.closest('.input-container');
    const statusIndicator = container?.querySelector('.status-indicator');
    
    if (input.value.length === 0) {
        // Reset state when empty
        input.style.borderColor = 'var(--color-border)';
        if (statusIndicator) {
            statusIndicator.style.borderColor = 'var(--color-border)';
            statusIndicator.style.background = 'transparent';
            statusIndicator.style.boxShadow = 'none';
        }
        return;
    }
    
    if (isValid) {
        input.style.borderColor = 'var(--color-accent)';
        if (statusIndicator) {
            statusIndicator.style.borderColor = 'var(--color-accent)';
            statusIndicator.style.background = 'var(--color-accent)';
            statusIndicator.style.boxShadow = '0 0 12px var(--color-accent)';
        }
    } else {
        input.style.borderColor = 'var(--color-warning)';
        if (statusIndicator) {
            statusIndicator.style.borderColor = 'var(--color-warning)';
            statusIndicator.style.background = 'transparent';
            statusIndicator.style.boxShadow = 'none';
        }
    }
}

// Helper function to show form errors
function showFormError(message) {
    // Create error message element if it doesn't exist
    let errorElement = document.querySelector('.form-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            background: var(--color-surface);
            border: 2px solid var(--color-warning);
            color: var(--color-warning);
            font-family: var(--font-mono);
            font-size: 0.875rem;
            font-weight: 700;
            letter-spacing: 0.05em;
            z-index: 10000;
            animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.body.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        errorElement.style.animation = 'slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 300);
    }, 3000);
}

// Helper function to simulate authentication
function simulateAuth(email, password, remember) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate authentication logic
            if (email && password.length >= 8) {
                // Store session data
                if (remember) {
                    localStorage.setItem('authToken', 'demo-token-' + Date.now());
                    localStorage.setItem('userEmail', email);
                } else {
                    sessionStorage.setItem('authToken', 'demo-token-' + Date.now());
                    sessionStorage.setItem('userEmail', email);
                }
                resolve({ success: true });
            } else {
                reject(new Error('INVALID CREDENTIALS'));
            }
        }, 1500);
    });
}

// Update session status in status bar
function updateSessionStatus(status) {
    const sessionValue = document.querySelector('.status-item:nth-child(2) .status-value');
    if (sessionValue) {
        sessionValue.textContent = status;
        
        if (status === 'AUTHENTICATED') {
            sessionValue.style.color = 'var(--color-accent)';
        }
    }
}

// OAuth button handlers
const oauthButtons = document.querySelectorAll('.oauth-btn');

oauthButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const provider = button.dataset.provider;
        console.log(`OAuth login initiated with ${provider}`);
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
        
        // In a real app, initiate OAuth flow
        showFormError(`${provider.toUpperCase()} AUTH NOT CONFIGURED`);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + L to focus email input
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        emailInput?.focus();
    }
    
    // Escape to clear form
    if (e.key === 'Escape') {
        if (document.activeElement.tagName === 'INPUT') {
            document.activeElement.blur();
        }
    }
});

// Add CSS for error animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Check for existing session on page load
window.addEventListener('DOMContentLoaded', () => {
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');
    
    if (authToken && userEmail) {
        console.log('Existing session found:', userEmail);
        updateSessionStatus('ACTIVE');
        
        // Auto-fill email if remembered
        if (emailInput && userEmail) {
            emailInput.value = userEmail;
        }
    }
});

// Enhance form with Enter key support
if (emailInput) {
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            passwordInput?.focus();
        }
    });
}

// Add focus animations
const allInputs = document.querySelectorAll('.form-input');

allInputs.forEach(input => {
    input.addEventListener('focus', () => {
        const container = input.closest('.input-container');
        container?.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        const container = input.closest('.input-container');
        container?.classList.remove('focused');
    });
});

console.log('Login page initialized');
console.log('Keyboard shortcuts:');
console.log('- Alt + L: Focus email input');
console.log('- Enter: Navigate to next field');
console.log('- Escape: Blur current input');
