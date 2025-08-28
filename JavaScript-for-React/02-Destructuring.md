# Destructuring in JavaScript

Destructuring is a powerful feature in JavaScript that allows you to extract values from arrays or properties from objects into distinct variables. This feature is extensively used in React for props handling, state management, and working with component data.

## Table of Contents
- [Array Destructuring](#array-destructuring)
- [Object Destructuring](#object-destructuring)
- [Parameter Destructuring](#parameter-destructuring)
- [Nested Destructuring](#nested-destructuring)
- [Practice Exercises](#practice-exercises)

## Array Destructuring

Array destructuring allows you to extract values from arrays and assign them to variables in a single operation.

### Basic Array Destructuring

```javascript
// Before destructuring
const coordinates = [10, 20];
const x = coordinates[0];
const y = coordinates[1];

// With destructuring
const [a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2
```

### Skipping Elements

```javascript
const [first, , third] = [1, 2, 3];
console.log(first); // 1
console.log(third); // 3
```

### Default Values

```javascript
const [name = 'Guest', age = 25] = ['John'];
console.log(name); // 'John' (uses provided value)
console.log(age); // 25 (uses default value)
```

### Rest Pattern

```javascript
const [leader, ...team] = ['Alex', 'Bob', 'Charlie', 'Dave'];
console.log(leader); // 'Alex'
console.log(team); // ['Bob', 'Charlie', 'Dave']
```

### Swapping Variables

```javascript
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a); // 2
console.log(b); // 1
```

## Object Destructuring

Object destructuring allows you to extract properties from objects and assign them to variables with the same name.

### Basic Object Destructuring

```javascript
// Before destructuring
const user = { name: 'John', age: 30 };
const userName = user.name;
const userAge = user.age;

// With destructuring
const { name, age } = user;
console.log(name); // 'John'
console.log(age); // 30
```

### Assigning to New Variable Names

```javascript
const { name: userName, age: userAge } = user;
console.log(userName); // 'John'
console.log(userAge); // 30
```

### Default Values

```javascript
const { name = 'Guest', role = 'User' } = { name: 'John' };
console.log(name); // 'John' (uses provided value)
console.log(role); // 'User' (uses default value)

// Combining new variable names with default values
const { name: userName = 'Guest', role: userRole = 'User' } = {};
console.log(userName); // 'Guest'
console.log(userRole); // 'User'
```

### Rest Pattern

```javascript
const { id, ...userDetails } = { id: 123, name: 'John', age: 30, email: 'john@example.com' };
console.log(id); // 123
console.log(userDetails); // { name: 'John', age: 30, email: 'john@example.com' }
```

## Parameter Destructuring

Function parameters can be destructured directly, making it easier to work with objects and arrays passed to functions.

### Object Parameter Destructuring

```javascript
// Before destructuring
function displayUser(user) {
  console.log(`Name: ${user.name}, Age: ${user.age}`);
}

// With destructuring
function displayUser({ name, age }) {
  console.log(`Name: ${name}, Age: ${age}`);
}

displayUser({ name: 'John', age: 30 }); // 'Name: John, Age: 30'
```

### Default Values in Parameters

```javascript
function displayUser({ name = 'Guest', age = 'Unknown' }) {
  console.log(`Name: ${name}, Age: ${age}`);
}

displayUser({}); // 'Name: Guest, Age: Unknown'
displayUser({ name: 'John' }); // 'Name: John, Age: Unknown'
```

### Array Parameter Destructuring

```javascript
function getCoordinates([x, y]) {
  return `X: ${x}, Y: ${y}`;
}

console.log(getCoordinates([10, 20])); // 'X: 10, Y: 20'
```

### Mixed Parameter Destructuring

```javascript
function processData({ id, data: [firstItem] }) {
  console.log(`Processing data with ID ${id}, first item: ${firstItem}`);
}

processData({ id: 123, data: ['apple', 'banana', 'cherry'] });
// 'Processing data with ID 123, first item: apple'
```

## Nested Destructuring

You can destructure nested objects and arrays to access deeply nested properties.

### Nested Object Destructuring

```javascript
const user = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    }
  }
};

const { name, address: { city, country, coordinates: { lat, lng } } } = user;

console.log(name); // 'John'
console.log(city); // 'New York'
console.log(country); // 'USA'
console.log(lat); // 40.7128
console.log(lng); // -74.0060

// Note: 'address' itself is not defined as a variable
// console.log(address); // ReferenceError
```

### Nested Array Destructuring

```javascript
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const [
  [a, b, c],
  [d, e, f],
  [g, h, i]
] = matrix;

console.log(a, e, i); // 1 5 9
```

### Mixed Nested Destructuring

```javascript
const data = {
  user: {
    name: 'John',
    socials: ['twitter', 'facebook', 'instagram']
  },
  stats: [
    { views: 100, likes: 20 },
    { views: 150, likes: 30 }
  ]
};

const { 
  user: { name, socials: [primarySocial] },
  stats: [firstStat]
} = data;

console.log(name); // 'John'
console.log(primarySocial); // 'twitter'
console.log(firstStat); // { views: 100, likes: 20 }
```

## React Examples

### Component Props Destructuring

```jsx
// Without destructuring
function UserProfile(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Age: {props.age}</p>
      <p>Role: {props.role}</p>
    </div>
  );
}

// With destructuring
function UserProfile({ name, age, role = 'User' }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Role: {role}</p>
    </div>
  );
}
```

### React Hooks Destructuring

```jsx
// useState hook
const [count, setCount] = useState(0);

// useContext hook
const { theme, toggleTheme } = useContext(ThemeContext);

// Custom hook
function useUserData(userId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  // ... fetch logic
  
  return { loading, error, data };
}

// Using the custom hook
function UserComponent({ userId }) {
  const { loading, error, data } = useUserData(userId);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const { name, email } = data;
  
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
    </div>
  );
}
```

## Practice Exercises

### Exercise 1: Array Destructuring
Extract values from the following array using destructuring:

```javascript
const colors = ['red', 'green', 'blue', 'yellow', 'orange'];

// Extract the first, third, and fifth elements into variables
// Skip the second and fourth elements
// Your code here
```

### Exercise 2: Object Destructuring
Extract properties from the following object using destructuring:

```javascript
const product = {
  id: 'prod-123',
  name: 'Laptop',
  price: 999.99,
  specs: {
    cpu: 'Intel i7',
    ram: '16GB',
    storage: '512GB SSD'
  },
  stock: 15
};

// Extract id, name, and price into variables
// Extract the specs.cpu and specs.storage into variables named processor and hardDrive
// Set a default value for a missing 'brand' property to 'Unknown'
// Your code here
```

### Exercise 3: Function Parameter Destructuring
Refactor the following function to use parameter destructuring:

```javascript
function displayUserActivity(user, activity) {
  console.log(`${user.name} (${user.email}) performed ${activity.type} at ${activity.time} with a score of ${activity.score || 'N/A'}`);
}

// Call the function with these objects:
const user = { name: 'John', email: 'john@example.com', role: 'admin' };
const activity = { type: 'login', time: '14:30', ipAddress: '192.168.1.1' };

// Refactor the function and function call
// Your code here
```

### Exercise 4: Nested Destructuring
Extract data from the following nested structure:

```javascript
const organization = {
  name: 'TechCorp',
  address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94101'
  },
  departments: [
    { name: 'Engineering', employees: 50, head: { name: 'Alice', startYear: 2018 } },
    { name: 'Marketing', employees: 30, head: { name: 'Bob', startYear: 2019 } },
    { name: 'HR', employees: 15, head: { name: 'Charlie', startYear: 2020 } }
  ]
};

// Extract the organization name
// Extract the city and state from the address
// Extract the name of the Engineering department head
// Extract the number of employees in Marketing
// Your code here
```

## Solutions

<details>
<summary>Click to view solutions</summary>

### Exercise 1 Solution:
```javascript
const [first, , third, , fifth] = colors;
console.log(first, third, fifth); // 'red' 'blue' 'orange'
```

### Exercise 2 Solution:
```javascript
const { id, name, price, specs: { cpu: processor, storage: hardDrive }, brand = 'Unknown' } = product;
console.log(id, name, price); // 'prod-123' 'Laptop' 999.99
console.log(processor, hardDrive); // 'Intel i7' '512GB SSD'
console.log(brand); // 'Unknown'
```

### Exercise 3 Solution:
```javascript
function displayUserActivity({ name, email }, { type, time, score = 'N/A' }) {
  console.log(`${name} (${email}) performed ${type} at ${time} with a score of ${score}`);
}

// Call the function
displayUserActivity(user, activity);
// 'John (john@example.com) performed login at 14:30 with a score of N/A'
```

### Exercise 4 Solution:
```javascript
const { 
  name: orgName, 
  address: { city, state }, 
  departments: [ 
    { head: { name: engineeringHeadName } }, 
    { employees: marketingEmployees } 
  ] 
} = organization;

console.log(orgName); // 'TechCorp'
console.log(city, state); // 'San Francisco' 'CA'
console.log(engineeringHeadName); // 'Alice'
console.log(marketingEmployees); // 30
```
</details>
