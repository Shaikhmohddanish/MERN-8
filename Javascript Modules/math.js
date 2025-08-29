// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// You can also export multiple items at once
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

export { multiply, divide };

export default PI;
