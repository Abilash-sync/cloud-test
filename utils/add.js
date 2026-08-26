// referred by instructions.md
// ## AGENTS_MD_VERIFIED ##

/**
 * Sum all provided numbers. Throws if any argument is not a finite number.
 * @param {...number} nums
 * @returns {number}
 */
export function add(...nums) {
  return nums.reduce((total, n) => {
    if (typeof n !== 'number' || !Number.isFinite(n)) {
      throw new TypeError('All arguments must be finite numbers');
    }
    return total + n;
  }, 0);
}

// Example usage:
// import { add } from './add.js';
// console.log(add(1, 2, 3)); // 6
