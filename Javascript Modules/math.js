// math.js
const PI = 3.14159;

export function add(a, b) {
  console.log("Add method called");
  return a + b;
}

export function subtract(a, b) {
  console.log("Subtract method called");  
  return a - b;
}

// You can also export multiple items at once
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

export { multiply, divide };

export default PI;