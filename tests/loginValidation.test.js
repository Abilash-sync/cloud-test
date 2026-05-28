// referred by instructions.md
// ## AGENTS_MD_VERIFIED ##
'use strict';

const assert = require('node:assert');
const { validateLogin } = require('../src/validation/loginValidation.js');

const cases = [
  {
    name: 'valid credentials',
    input: { email: 'user@example.com', password: 'Password1' },
    expectValid: true,
  },
  {
    name: 'trims email whitespace',
    input: { email: '  user@example.com  ', password: 'Password1' },
    expectValid: true,
  },
  {
    name: 'missing email',
    input: { email: '', password: 'Password1' },
    expectValid: false,
    expectEmailErrors: ['Email is required.'],
  },
  {
    name: 'invalid email format',
    input: { email: 'user@invalid', password: 'Password1' },
    expectValid: false,
    expectEmailErrors: ['Email format is invalid.'],
  },
  {
    name: 'missing password',
    input: { email: 'user@example.com', password: '' },
    expectValid: false,
    expectPasswordErrors: ['Password is required.'],
  },
  {
    name: 'short password',
    input: { email: 'user@example.com', password: 'Pass1' },
    expectValid: false,
    expectPasswordErrors: ['Password must be at least 8 characters long.'],
  },
  {
    name: 'password missing letter',
    input: { email: 'user@example.com', password: '12345678' },
    expectValid: false,
    expectPasswordErrors: ['Password must contain at least one letter.'],
  },
  {
    name: 'password missing number',
    input: { email: 'user@example.com', password: 'Password' },
    expectValid: false,
    expectPasswordErrors: ['Password must contain at least one number.'],
  },
];

let passed = 0;

for (const tc of cases) {
  const res = validateLogin(tc.input.email, tc.input.password);
  try {
    assert.strictEqual(res.valid, tc.expectValid, `${tc.name}: expected valid=${tc.expectValid} got ${res.valid}`);

    if (tc.expectEmailErrors) {
      for (const err of tc.expectEmailErrors) {
        assert.ok(res.errors.email.includes(err), `${tc.name}: expected email error to include: ${err}`);
      }
    }

    if (tc.expectPasswordErrors) {
      for (const err of tc.expectPasswordErrors) {
        assert.ok(res.errors.password.includes(err), `${tc.name}: expected password error to include: ${err}`);
      }
    }

    // If expected valid true, ensure no errors
    if (tc.expectValid) {
      assert.strictEqual(res.errors.email.length, 0, `${tc.name}: expected no email errors`);
      assert.strictEqual(res.errors.password.length, 0, `${tc.name}: expected no password errors`);
    }

    passed++;
  } catch (e) {
    console.error(`Test failed: ${tc.name}`);
    console.error(e.message);
    process.exitCode = 1;
  }
}

console.log(`Tests passed: ${passed}/${cases.length}`);
