## AGENTS_MD_VERIFIED ##

# cloud-test

Login form validation function (JavaScript) with tests and usage instructions.

## Files
- src/validation/loginValidation.js — core validation logic
- tests/loginValidation.test.js — minimal, dependency-free test file
- login.html — sample login UI (not wired to the validator by default)

## Validation Rules
validateLogin(email, password) enforces:
- Email: required and must match basic email format (name@domain.tld)
- Password: required, at least 8 characters, includes at least one letter and one number

Return shape:
{
  valid: boolean,
  errors: { email: string[], password: string[] },
  values: { email: string, password: string }
}

## Usage (Node.js/CommonJS)
const { validateLogin } = require('./src/validation/loginValidation.js');
const res = validateLogin('user@example.com', 'Password1');
if (res.valid) {
  // proceed
} else {
  console.log(res.errors);
}

## Usage in the browser
- You can load the function via a bundler or expose it globally. For quick testing, copy the function into a script tag or use a bundler to include src/validation/loginValidation.js.

Example integration snippet:
<script>
  // assuming validateLogin is available in scope
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const result = validateLogin(email, password);
    if (!result.valid) {
      alert('Errors: ' + JSON.stringify(result.errors));
      return;
    }
    // submit or continue
  });
</script>

## Run tests
- Prerequisite: Node.js installed
- Command:
node tests/loginValidation.test.js

Expected output:
Tests passed: 8/8

## Notes
- This project avoids external dependencies and uses Node's built-in assert for tests.
- All new files include project-required headers.
