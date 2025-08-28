# Functional Programming in JavaScript

Functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. React heavily leverages functional programming concepts, making it essential for modern React development.

## Core Concepts of Functional Programming

### 1. Pure Functions

A pure function:
- Always returns the same output for the same input
- Has no side effects (doesn't modify external state)
- Doesn't depend on external state

```javascript
// Pure function
function add(a, b) {
  return a + b;
}

// Impure function (uses external state)
let counter = 0;
function incrementCounter() {
  counter++;  // Side effect: modifies external state
  return counter;
}
```

### 2. Immutability

In functional programming, data is immutable—once created, it cannot be changed. Instead of modifying existing data, you create new copies with the desired changes.

```javascript
// Incorrect (mutating)
function addItem(arr, item) {
  arr.push(item);  // Modifies the original array
  return arr;
}

// Correct (immutable)
function addItem(arr, item) {
  return [...arr, item];  // Creates a new array
}
```

This is especially important in React for performance optimization and predictable state updates.

### 3. Function Composition

Function composition is combining simple functions to build more complex ones.

```javascript
const double = x => x * 2;
const increment = x => x + 1;

// Compose functions manually
const doubleAndIncrement = x => increment(double(x));

console.log(doubleAndIncrement(5));  // 11
```

### 4. Higher-Order Functions

Higher-order functions either:
- Take one or more functions as arguments, or
- Return a function

```javascript
// Takes a function as an argument
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);  // [2, 4, 6, 8, 10]

// Returns a function (closure)
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

## Functional Programming Techniques

### Function Currying

Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument.

```javascript
// Regular function
function add(a, b, c) {
  return a + b + c;
}

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

// Arrow function syntax makes it more concise
const curriedAddArrow = a => b => c => a + b + c;

console.log(curriedAddArrow(1)(2)(3));  // 6
```

This is useful for creating specialized functions:

```javascript
const addFive = curriedAddArrow(5);
console.log(addFive(10)(20));  // 35
```

### Partial Application

Partial application is fixing some arguments of a function, producing another function with fewer parameters.

```javascript
function partial(fn, ...args) {
  return function(...moreArgs) {
    return fn(...args, ...moreArgs);
  };
}

function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, 'Hello');
console.log(sayHello('John'));  // "Hello, John!"
```

### Function Composition Utilities

```javascript
// Compose: Executes functions from right to left
function compose(...fns) {
  return function(x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

// Pipe: Executes functions from left to right
function pipe(...fns) {
  return function(x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

const double = x => x * 2;
const increment = x => x + 1;
const square = x => x * x;

const operation1 = compose(square, increment, double);
const operation2 = pipe(double, increment, square);

console.log(operation1(3));  // square(increment(double(3))) = square(increment(6)) = square(7) = 49
console.log(operation2(3));  // square(increment(double(3))) = square(increment(6)) = square(7) = 49
```

### Point-Free Style

Point-free style (or tacit programming) is a coding style where function definitions don't explicitly identify the arguments used.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Regular style
const isEven = (number) => number % 2 === 0;
const evenNumbers = numbers.filter(isEven);

// Point-free style using composition
const modulo = divisor => number => number % divisor;
const isZero = number => number === 0;
const isEvenPointFree = pipe(modulo(2), isZero);
const evenNumbersPointFree = numbers.filter(isEvenPointFree);
```

## Functional Programming in React

React leverages functional programming principles in several ways:

### 1. Pure Components

Functional components in React are essentially pure functions:

```jsx
// A pure functional component
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

### 2. Immutable State

React relies on immutable state updates:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // Correct: Immutable update
  const increment = () => setCount(count + 1);
  
  // Incorrect: Would mutate state directly
  const badIncrement = () => count++;
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### 3. Higher-Order Components (HOCs)

HOCs are functions that take a component and return a new enhanced component:

```jsx
// A higher-order component
function withLogging(Component) {
  return function(props) {
    console.log(`Rendering ${Component.name} with props:`, props);
    return <Component {...props} />;
  };
}

// Usage
const EnhancedButton = withLogging(Button);
```

### 4. Function Composition with Hooks

React hooks can be composed to create reusable logic:

```jsx
// Custom hook composition
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return size;
}

function useBreakpoint() {
  const { width } = useWindowSize();
  
  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024
  };
}
```

## Practice Exercises

### Exercise 1: Implement Array Utility Functions

Implement your own versions of `map`, `filter`, and `reduce` using functional programming principles:

```javascript
// Implement a map function
function map(array, fn) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(fn(array[i], i, array));
  }
  return result;
}

// Implement a filter function
function filter(array, fn) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}

// Implement a reduce function
function reduce(array, fn, initial) {
  let accumulator = initial !== undefined ? initial : array[0];
  const startIndex = initial !== undefined ? 0 : 1;
  
  for (let i = startIndex; i < array.length; i++) {
    accumulator = fn(accumulator, array[i], i, array);
  }
  
  return accumulator;
}
```

### Exercise 2: Function Composition and Transformation Pipeline

Create a data transformation pipeline using function composition:

```javascript
const users = [
  { id: 1, name: 'John Doe', age: 28, role: 'developer' },
  { id: 2, name: 'Jane Smith', age: 32, role: 'designer' },
  { id: 3, name: 'Bob Johnson', age: 45, role: 'manager' },
  { id: 4, name: 'Alice Williams', age: 24, role: 'developer' },
  { id: 5, name: 'Charlie Brown', age: 35, role: 'designer' }
];

// Create individual transformation functions
const filterByRole = role => users => users.filter(user => user.role === role);
const sortByAge = users => [...users].sort((a, b) => a.age - b.age);
const mapToNames = users => users.map(user => user.name);
const formatList = names => names.join(', ');

// Compose them into a pipeline
const getDeveloperNamesSortedByAge = pipe(
  filterByRole('developer'),
  sortByAge,
  mapToNames,
  formatList
);

const result = getDeveloperNamesSortedByAge(users);
console.log(result);  // "Alice Williams, John Doe"
```

### Exercise 3: Implement a Memoization Function

Create a memoization utility to cache function results:

```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }
    
    console.log('Cache miss!');
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Test with a computationally expensive function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
});

console.time('Regular');
console.log(fibonacci(35));
console.timeEnd('Regular');

console.time('Memoized');
console.log(memoizedFibonacci(35));
console.timeEnd('Memoized');
```

## Solutions

### Exercise 1 Test:
```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = map(numbers, x => x * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

const evens = filter(numbers, x => x % 2 === 0);
console.log(evens);  // [2, 4]

const sum = reduce(numbers, (acc, x) => acc + x, 0);
console.log(sum);  // 15
```

### Exercise 2 Output:
```
"Alice Williams, John Doe"
```

### Exercise 3 Output:
```
Cache miss!
Cache miss!
Cache miss!
Cache miss!
... (many more cache hits/misses)
9227465
Regular: 6.542s
Cache miss!
Cache hit!
Cache hit!
... (many more cache hits)
9227465
Memoized: 0.003s
```

## Key Takeaways

1. **Pure Functions**: Make your functions pure to reduce bugs and improve predictability
2. **Immutability**: Create new objects instead of mutating existing ones
3. **Function Composition**: Combine small, focused functions for complex operations
4. **Higher-Order Functions**: Use functions that accept or return other functions

These functional programming concepts are foundational to React development and will help you write more maintainable, predictable, and efficient code.
