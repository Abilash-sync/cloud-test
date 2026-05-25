// referred by instructions.md
// ## AGENTS_MD_VERIFIED ##
'use strict';

/**
 * Validate login form inputs.
 *
 * Rules:
 * - email: required, must match basic email format
 * - password: required, min length 8, must contain at least one letter and one number
 *
 * @param {string} rawEmail - The email input (may contain surrounding spaces)
 * @param {string} rawPassword - The password input (may contain surrounding spaces)
 * @returns {{ valid: boolean, errors: { email: string[], password: string[] }, values: { email: string, password: string } }}
 */
const validateLogin = (rawEmail, rawPassword) => {
  const email = typeof rawEmail === 'string' ? rawEmail.trim() : '';
  const password = typeof rawPassword === 'string' ? rawPassword : '';

  const errors = {
    email: [],
    password: [],
  };

  // Email validation
  if (!email) {
    errors.email.push('Email is required.');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email.push('Email format is invalid.');
    }
  }

  // Password validation
  if (!password) {
    errors.password.push('Password is required.');
  } else {
    if (password.length < 8) {
      errors.password.push('Password must be at least 8 characters long.');
    }
    if (!/[A-Za-z]/.test(password)) {
      errors.password.push('Password must contain at least one letter.');
    }
    if (!/\d/.test(password)) {
      errors.password.push('Password must contain at least one number.');
    }
  }

  const valid = errors.email.length === 0 && errors.password.length === 0;

  return {
    valid,
    errors,
    values: { email, password },
  };
};

module.exports = { validateLogin };
