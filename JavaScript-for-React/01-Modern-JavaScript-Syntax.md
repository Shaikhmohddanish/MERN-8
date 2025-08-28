# Modern JavaScript Syntax

Modern JavaScript features (ES6 and beyond) have transformed how we write JavaScript code. These features are extensively used in React development and form the foundation of React's syntax and patterns.

## Table of Contents
- [Variable Declaration](#variable-declaration)
- [Template Literals](#template-literals)
- [Arrow Functions](#arrow-functions)
- [Enhanced Object Literals](#enhanced-object-literals)
- [Practice Exercises](#practice-exercises)

## Variable Declaration

ES6 introduced `let` and `const` for variable declaration, replacing the use of `var` in modern JavaScript.

### `let`

`let` allows you to declare block-scoped variables that can be reassigned.

```javascript
// let - can be reassigned
let count = 0;
count = 1; // Valid

// Block scope
if (true) {
  let blockScoped = 'only available inside this block';
  console.log(blockScoped); // 'only available inside this block'
}
// console.log(blockScoped); // ReferenceError: blockScoped is not defined
```

### `const`

`const` is used for variables that should not be reassigned.

```javascript
// const - cannot be reassigned
const API_URL = 'https://api.example.com';
// API_URL = 'https://api.different.com'; // TypeError: Assignment to constant variable

// But objects and arrays declared with const can be modified
const user = { name: 'John' };
user.name = 'Jane'; // Valid - we're modifying a property, not reassigning the variable
console.log(user); // { name: 'Jane' }

const numbers = [1, 2, 3];
numbers.push(4); // Valid - modifying the array, not reassigning
console.log(numbers); // [1, 2, 3, 4]
```

### When to use which?

- Use `const` by default (for most variables)
- Use `let` when you know the variable will be reassigned
- Avoid using `var` in modern JavaScript code

## Template Literals

Template literals (template strings) allow for easier string interpolation and multiline strings.

```javascript
// String interpolation
const name = 'World';
const greeting = `Hello, ${name}!`; // 'Hello, World!'

// Expressions inside interpolation
const a = 5;
const b = 10;
console.log(`Sum: ${a + b}`); // 'Sum: 15'

// Multiline strings
const multiline = `
  This is a multiline string.
  No need for \n or concatenation.
  Much cleaner!
`;

// Tagged templates (advanced)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return `${result}${str}${values[i] ? `<strong>${values[i]}</strong>` : ''}`;
  }, '');
}

const language = 'JavaScript';
const highlighted = highlight`I love ${language} programming!`;
// 'I love <strong>JavaScript</strong> programming!'
```

## Arrow Functions

Arrow functions provide a more concise syntax for writing functions and have lexical `this` binding.

### Basic Syntax

```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const addArrow = (a, b) => {
  return a + b;
};

// Implicit return (when function body is a single expression)
const addConcise = (a, b) => a + b;

// Single parameter (parentheses optional)
const square = x => x * x;

// No parameters require parentheses
const getRandomNumber = () => Math.random();
```

### Lexical `this`

Arrow functions don't have their own `this` context. They inherit `this` from the enclosing scope.

```javascript
// Problem with traditional functions
const user = {
  name: 'John',
  greetAfterDelay: function() {
    setTimeout(function() {
      console.log('Hello, ' + this.name); // 'this' refers to the global object, not 'user'
    }, 1000);
  }
};
user.greetAfterDelay(); // 'Hello, undefined'

// Solution with arrow function
const user2 = {
  name: 'John',
  greetAfterDelay: function() {
    setTimeout(() => {
      console.log('Hello, ' + this.name); // 'this' refers to 'user2'
    }, 1000);
  }
};
user2.greetAfterDelay(); // 'Hello, John'
```

### When to use arrow functions

- Use for short, simple functions, especially callbacks
- Use when you need to preserve the lexical `this`
- Avoid for methods in objects (use shorthand method syntax instead)
- Avoid for constructor functions

## Enhanced Object Literals

ES6 introduced several enhancements to object literals, making them more expressive and concise.

### Property Shorthand

```javascript
// Old way
const name = 'John';
const age = 30;
const oldUser = {
  name: name,
  age: age
};

// Property shorthand
const user = {
  name,
  age
};
console.log(user); // { name: 'John', age: 30 }
```

### Method Shorthand

```javascript
// Old way
const calculator = {
  add: function(a, b) {
    return a + b;
  }
};

// Method shorthand
const betterCalculator = {
  add(a, b) {
    return a + b;
  }
};
console.log(betterCalculator.add(2, 3)); // 5
```

### Computed Property Names

```javascript
const propertyName = 'dynamicKey';
const actionTypes = {
  FETCH_START: 'FETCH_START',
  [propertyName]: 'DYNAMIC_VALUE',
  [`${propertyName}_EXTENDED`]: 'DYNAMIC_EXTENDED'
};

console.log(actionTypes); 
// { FETCH_START: 'FETCH_START', dynamicKey: 'DYNAMIC_VALUE', dynamicKey_EXTENDED: 'DYNAMIC_EXTENDED' }
```

## Practice Exercises

### Exercise 1: Variable Declaration
Refactor the following code to use modern variable declarations:

```javascript
// Before
var count = 0;
var API_KEY = 'abc123';
var user = { name: 'John' };

function updateCount() {
  var newCount = count + 1;
  count = newCount;
  // Add logic here
}
```

### Exercise 2: Template Literals
Rewrite the string concatenation using template literals:

```javascript
// Before
function generateUserMessage(user, items) {
  var message = 'Hello, ' + user.name + '! You have ' + items.length + ' items in your cart.';
  if (items.length > 0) {
    message += ' Your total is $' + calculateTotal(items) + '.';
  }
  return message;
}
```

### Exercise 3: Arrow Functions
Convert the following functions to arrow functions where appropriate:

```javascript
// Before
function multiply(a, b) {
  return a * b;
}

var numbers = [1, 2, 3, 4, 5];
var doubled = numbers.map(function(number) {
  return number * 2;
});

var button = document.getElementById('button');
button.addEventListener('click', function() {
  var self = this;
  setTimeout(function() {
    self.classList.add('clicked');
  }, 1000);
});
```

### Exercise 4: Enhanced Object Literals
Refactor the following object to use enhanced object literal syntax:

```javascript
// Before
function createUser(name, email, age) {
  return {
    name: name,
    email: email,
    age: age,
    login: function() {
      console.log(this.name + ' logged in');
    },
    logout: function() {
      console.log(this.name + ' logged out');
    }
  };
}
```

## Solutions

<details>
<summary>Click to view solutions</summary>

### Exercise 1 Solution:
```javascript
// After
let count = 0;
const API_KEY = 'abc123';
const user = { name: 'John' };

function updateCount() {
  const newCount = count + 1;
  count = newCount;
  // Add logic here
}
```

### Exercise 2 Solution:
```javascript
// After
function generateUserMessage(user, items) {
  let message = `Hello, ${user.name}! You have ${items.length} items in your cart.`;
  if (items.length > 0) {
    message += ` Your total is $${calculateTotal(items)}.`;
  }
  return message;
}

// Or even better, in one template literal:
function generateUserMessage(user, items) {
  return `Hello, ${user.name}! You have ${items.length} items in your cart.${
    items.length > 0 ? ` Your total is $${calculateTotal(items)}.` : ''
  }`;
}
```

### Exercise 3 Solution:
```javascript
// After
const multiply = (a, b) => a * b;

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(number => number * 2);

const button = document.getElementById('button');
button.addEventListener('click', function() {
  // Keep this as a regular function to maintain 'this' context
  setTimeout(() => {
    this.classList.add('clicked'); // Use arrow function here to inherit 'this'
  }, 1000);
});
```

### Exercise 4 Solution:
```javascript
// After
function createUser(name, email, age) {
  return {
    name,
    email,
    age,
    login() {
      console.log(`${this.name} logged in`);
    },
    logout() {
      console.log(`${this.name} logged out`);
    }
  };
}
```
</details>
