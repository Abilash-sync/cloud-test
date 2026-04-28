// Login form interactivity

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const submitBtn = document.querySelector('.submit-btn');
    
    // Password visibility toggle
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const eyeIcon = togglePasswordBtn.querySelector('.eye-icon');
            if (type === 'text') {
                eyeIcon.innerHTML = `
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                `;
            } else {
                eyeIcon.innerHTML = `
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;
            }
        });
    }
    
    // Form validation
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    
    const showError = (input, message) => {
        const wrapper = input.closest('.input-wrapper');
        let errorMsg = wrapper.querySelector('.error-message');
        
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.style.cssText = 'color: var(--color-error); font-size: 0.875rem; margin-top: 0.5rem; animation: fadeInUp 0.3s ease;';
            wrapper.appendChild(errorMsg);
        }
        
        errorMsg.textContent = message;
        input.style.borderColor = 'var(--color-error)';
    };
    
    const clearError = (input) => {
        const wrapper = input.closest('.input-wrapper');
        const errorMsg = wrapper.querySelector('.error-message');
        
        if (errorMsg) {
            errorMsg.remove();
        }
        
        input.style.borderColor = '';
    };
    
    // Real-time validation
    emailInput?.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        
        if (email && !validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
        } else {
            clearError(emailInput);
        }
    });
    
    emailInput?.addEventListener('input', () => {
        if (emailInput.value.trim()) {
            clearError(emailInput);
        }
    });
    
    passwordInput?.addEventListener('input', () => {
        clearError(passwordInput);
    });
    
    // Form submission
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        let isValid = true;
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Clear previous errors
        clearError(emailInput);
        clearError(passwordInput);
        
        // Validate email
        if (!email) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Simulate login (replace with actual API call)
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        const originalText = submitBtn.querySelector('.btn-text').textContent;
        submitBtn.querySelector('.btn-text').textContent = 'Signing in...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success animation
            submitBtn.querySelector('.btn-text').textContent = 'Success!';
            submitBtn.style.background = 'linear-gradient(135deg, var(--color-success), #10b981)';
            
            // Store form data (in production, handle securely)
            const formData = {
                email: email,
                remember: document.getElementById('remember').checked,
                timestamp: new Date().toISOString()
            };
            
            console.log('Login attempted with:', formData);
            
            // Redirect after success (replace with actual redirect)
            setTimeout(() => {
                // window.location.href = '/dashboard';
                alert('Login successful! (This is a demo - no actual authentication)');
                loginForm.reset();
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.style.background = '';
            }, 1000);
            
        } catch (error) {
            // Error handling
            submitBtn.querySelector('.btn-text').textContent = 'Error - Try again';
            submitBtn.style.background = 'linear-gradient(135deg, var(--color-error), #ef4444)';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.style.background = '';
            }, 2000);
            
            console.error('Login error:', error);
        }
    });
    
    // Social login buttons (demo handlers)
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const provider = btn.textContent.includes('Google') ? 'Google' : 'GitHub';
            console.log(`Social login clicked: ${provider}`);
            alert(`${provider} authentication would be triggered here (demo mode)`);
        });
    });
    
    // Input focus effects
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.closest('.form-group')?.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.closest('.form-group')?.classList.remove('focused');
        });
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.activeElement?.blur();
        }
    });
    
    // Add entrance animations on scroll (for mobile)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe form groups for staggered animation
    document.querySelectorAll('.form-group').forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(group);
    });
});
