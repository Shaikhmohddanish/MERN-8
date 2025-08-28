# Spread and Rest Operators

The spread (`...`) and rest operators are powerful features in modern JavaScript that are extensively used in React development for manipulating arrays and objects immutably, handling component props, and simplifying function parameters.

## Table of Contents
- [Spread Operator](#spread-operator)
- [Rest Operator](#rest-operator)
- [Combining with Destructuring](#combining-with-destructuring)
- [React Use Cases](#react-use-cases)
- [Practice Exercises](#practice-exercises)

## Spread Operator

The spread operator (`...`) allows an iterable (like an array or string) or an object to be expanded in places where zero or more arguments/elements/properties are expected.

### Array Spreading

```javascript
// Combining arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Creating a copy of an array
const original = [1, 2, 3];
const copy = [...original];
console.log(copy); // [1, 2, 3]
// Modifying the copy doesn't affect the original
copy.push(4);
console.log(original); // [1, 2, 3]
console.log(copy); // [1, 2, 3, 4]

// Adding elements to an array
const numbers = [1, 2, 3];
const withFour = [...numbers, 4];
const withZeroAtStart = [0, ...numbers];
console.log(withFour); // [1, 2, 3, 4]
console.log(withZeroAtStart); // [0, 1, 2, 3]

// Spreading elements into a function call
const numbers = [1, 2, 3];
const max = Math.max(...numbers);
console.log(max); // 3
```

### Object Spreading

```javascript
// Creating a new object with properties from another object
const defaults = { theme: 'light', fontSize: 16 };
const userPrefs = { fontSize: 20 };
const settings = { ...defaults, ...userPrefs };
console.log(settings); // { theme: 'light', fontSize: 20 }

// Adding new properties
const user = { name: 'John', age: 30 };
const userWithEmail = { ...user, email: 'john@example.com' };
console.log(userWithEmail); // { name: 'John', age: 30, email: 'john@example.com' }

// Overriding properties
const product = { name: 'Laptop', price: 999 };
const discountedProduct = { ...product, price: 799 };
console.log(discountedProduct); // { name: 'Laptop', price: 799 }

// Shallow copy limitations
const nestedObj = { info: { name: 'John' } };
const shallowCopy = { ...nestedObj };
shallowCopy.info.name = 'Jane';
console.log(nestedObj.info.name); // 'Jane' - nested object is still referenced, not copied

// Conditional properties (ES2020+)
const includeDetails = true;
const user = {
  name: 'John',
  ...(includeDetails && { details: { age: 30, role: 'admin' } })
};
console.log(user); // { name: 'John', details: { age: 30, role: 'admin' } }
```

### Spreading Strings

```javascript
// String to array of characters
const str = 'hello';
const chars = [...str];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']
```

## Rest Operator

The rest operator (`...`) collects multiple elements and condenses them into a single array element. It's often used in function parameters and destructuring.

### Rest in Function Parameters

```javascript
// Collecting remaining arguments
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// Combining named parameters with rest
function processUser(name, email, ...otherDetails) {
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log('Other details:', otherDetails);
}

processUser('John', 'john@example.com', 'admin', 30, 'active');
// Name: John
// Email: john@example.com
// Other details: ['admin', 30, 'active']
```

### Rest in Array Destructuring

```javascript
// Collecting remaining array elements
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// Using rest in array manipulation functions
const removeFirst = ([, ...rest]) => rest;
console.log(removeFirst([1, 2, 3, 4])); // [2, 3, 4]
```

### Rest in Object Destructuring

```javascript
// Collecting remaining object properties
const { id, name, ...details } = { 
  id: 123, 
  name: 'John', 
  age: 30, 
  email: 'john@example.com',
  role: 'admin' 
};
console.log(id); // 123
console.log(name); // 'John'
console.log(details); // { age: 30, email: 'john@example.com', role: 'admin' }

// Using rest to omit properties
const removePassword = ({ password, ...userWithoutPassword }) => userWithoutPassword;
const user = { name: 'John', email: 'john@example.com', password: 'secret123' };
console.log(removePassword(user)); // { name: 'John', email: 'john@example.com' }
```

## Combining with Destructuring

Spread and rest operators are often used together with destructuring for powerful data manipulation.

```javascript
// Function that takes an object and returns a modified version
const updateUser = ({ ...user }, updates) => {
  return { ...user, ...updates };
};

const user = { id: 1, name: 'John', email: 'john@example.com' };
const updatedUser = updateUser(user, { name: 'Jane', role: 'admin' });
console.log(updatedUser); // { id: 1, name: 'Jane', email: 'john@example.com', role: 'admin' }

// Function that swaps and collects array elements
function reorganize([first, second, ...others]) {
  return [second, first, ...others];
}

console.log(reorganize([1, 2, 3, 4, 5])); // [2, 1, 3, 4, 5]

// Extracting specific properties while keeping the rest
function processUser({ name, email, ...otherDetails }) {
  // Process name and email
  console.log(`Processing ${name} (${email})`);
  
  // Return processed user with other details preserved
  return {
    processed: true,
    timestamp: Date.now(),
    name,
    email,
    ...otherDetails
  };
}
```

## React Use Cases

Spread and rest operators are fundamental in React development.

### Component Props

```jsx
// Passing props to a child component
function ParentComponent() {
  const userProps = {
    name: 'John',
    age: 30,
    role: 'admin'
  };
  
  return <UserProfile {...userProps} avatar="user.jpg" />;
}

// Collecting and forwarding unknown props
function Button({ className, children, ...otherProps }) {
  return (
    <button className={`btn ${className}`} {...otherProps}>
      {children}
    </button>
  );
}

// Usage
<Button className="primary" onClick={handleClick} disabled={isLoading}>
  Submit
</Button>
```

### State Management

```jsx
// Immutable state updates in useState hook
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    preferences: {
      theme: 'light',
      notifications: true
    }
  });
  
  const handleNameChange = (e) => {
    setUser({
      ...user,
      name: e.target.value
    });
  };
  
  const toggleNotifications = () => {
    setUser({
      ...user,
      preferences: {
        ...user.preferences,
        notifications: !user.preferences.notifications
      }
    });
  };
  
  // ...
}
```

### Custom Hooks

```jsx
// Custom hook that accepts any number of dependencies
function useCustomEffect(callback, ...dependencies) {
  useEffect(() => {
    console.log('Effect running with dependencies:', dependencies);
    return callback();
  }, dependencies);
}

// Creating enhanced objects with defaults
function useFormField(initialValue, options = {}) {
  const config = {
    validate: () => true,
    transform: (value) => value,
    ...options
  };
  
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);
  
  // Rest of the hook implementation...
  
  return { value, setValue, error };
}
```

## Practice Exercises

### Exercise 1: Array Operations with Spread
Implement functions for the following array operations using the spread operator:

```javascript
// 1. Merge two arrays
function mergeArrays(arr1, arr2) {
  // Your code here
}

// 2. Create a function that adds an element to the beginning and end of an array
function wrapArray(arr, startElement, endElement) {
  // Your code here
}

// 3. Create a function that inserts an element at a specific position
function insertAt(arr, element, position) {
  // Your code here
}

// Test your functions
console.log(mergeArrays([1, 2], [3, 4])); // [1, 2, 3, 4]
console.log(wrapArray([2, 3, 4], 1, 5)); // [1, 2, 3, 4, 5]
console.log(insertAt([1, 2, 4, 5], 3, 2)); // [1, 2, 3, 4, 5]
```

### Exercise 2: Object Manipulation with Spread
Implement functions for the following object operations:

```javascript
// 1. Merge two objects, with the second object overriding any duplicate properties
function mergeObjects(obj1, obj2) {
  // Your code here
}

// 2. Create a new object excluding specific properties
function excludeProperties(obj, ...propsToExclude) {
  // Your code here
}

// 3. Create a function that adds properties only if they don't already exist
function addDefaultProperties(obj, defaults) {
  // Your code here
}

// Test your functions
console.log(mergeObjects({ a: 1, b: 2 }, { b: 3, c: 4 })); // { a: 1, b: 3, c: 4 }

console.log(excludeProperties({ a: 1, b: 2, c: 3, d: 4 }, 'b', 'd')); // { a: 1, c: 3 }

console.log(addDefaultProperties({ a: 1 }, { a: 5, b: 2, c: 3 })); // { a: 1, b: 2, c: 3 }
```

### Exercise 3: Rest Parameter Functions
Implement the following functions using rest parameters:

```javascript
// 1. Calculate the average of any number of arguments
function average(...numbers) {
  // Your code here
}

// 2. Find the maximum value among any number of arguments
function findMax(...values) {
  // Your code here
}

// 3. Count how many arguments match a specific condition
function countMatches(condition, ...items) {
  // Your code here
}

// Test your functions
console.log(average(1, 2, 3, 4)); // 2.5
console.log(findMax(5, 12, 3, 8, 9)); // 12
console.log(countMatches(x => x > 10, 5, 15, 8, 20, 3)); // 2
```

### Exercise 4: React Component Challenge
Write a simplified React component that uses spread and rest operators:

```jsx
// Create a Card component that:
// 1. Accepts title and content as named props
// 2. Passes all other props to the outer div
// 3. Has a default className that can be extended by a className prop

function Card({ title, content, className, ...otherProps }) {
  // Your code here
}

// Example usage should work like this:
/*
<Card 
  title="Welcome" 
  content="This is a card component"
  className="special-card"
  onClick={handleClick}
  data-testid="welcome-card"
/>
*/
```

## Solutions

<details>
<summary>Click to view solutions</summary>

### Exercise 1 Solution:
```javascript
// 1. Merge two arrays
function mergeArrays(arr1, arr2) {
  return [...arr1, ...arr2];
}

// 2. Create a function that adds an element to the beginning and end of an array
function wrapArray(arr, startElement, endElement) {
  return [startElement, ...arr, endElement];
}

// 3. Create a function that inserts an element at a specific position
function insertAt(arr, element, position) {
  return [
    ...arr.slice(0, position),
    element,
    ...arr.slice(position)
  ];
}
```

### Exercise 2 Solution:
```javascript
// 1. Merge two objects, with the second object overriding any duplicate properties
function mergeObjects(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

// 2. Create a new object excluding specific properties
function excludeProperties(obj, ...propsToExclude) {
  const result = { ...obj };
  propsToExclude.forEach(prop => {
    delete result[prop];
  });
  return result;
  
  // Alternative with object destructuring and rest
  // const { [propsToExclude[0]]: _, [propsToExclude[1]]: __, ...rest } = obj;
  // return rest; // This only works for known property names
}

// 3. Create a function that adds properties only if they don't already exist
function addDefaultProperties(obj, defaults) {
  return { ...defaults, ...obj };
}
```

### Exercise 3 Solution:
```javascript
// 1. Calculate the average of any number of arguments
function average(...numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((total, num) => total + num, 0);
  return sum / numbers.length;
}

// 2. Find the maximum value among any number of arguments
function findMax(...values) {
  if (values.length === 0) return undefined;
  return Math.max(...values);
}

// 3. Count how many arguments match a specific condition
function countMatches(condition, ...items) {
  return items.filter(condition).length;
}
```

### Exercise 4 Solution:
```jsx
function Card({ title, content, className = '', ...otherProps }) {
  return (
    <div className={`card ${className}`.trim()} {...otherProps}>
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        {content}
      </div>
    </div>
  );
}
```
</details>
