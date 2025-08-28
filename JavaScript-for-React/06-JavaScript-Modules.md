# JavaScript Modules

JavaScript modules are a crucial part of modern JavaScript development, especially in React applications. They allow you to split your code into separate files for better organization and reusability.

## What Are JavaScript Modules?

Modules are a way to structure and organize JavaScript code by splitting it into separate files that can import and export functionality from each other. They help:

- Organize code into manageable pieces
- Encapsulate code to prevent global namespace pollution
- Reuse code across different parts of an application
- Manage dependencies between components

## ES Modules Syntax

ES Modules (ESM) is the official standard format for JavaScript modules. They are supported in modern browsers and Node.js.

### Exporting

There are several ways to export functionality from a module:

#### Named Exports

```javascript
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
```

#### Default Exports

Each module can have one default export:

```javascript
// user.js
export default class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  getProfile() {
    return `${this.name} (${this.email})`;
  }
}
```

### Importing

#### Importing Named Exports

```javascript
// main.js
import { add, subtract, PI } from './math.js';

console.log(add(5, 3));         // 8
console.log(subtract(10, 4));   // 6
console.log(PI);                // 3.14159
```

You can also rename imports to avoid naming conflicts:

```javascript
import { add as mathAdd, PI as MATH_PI } from './math.js';

console.log(mathAdd(5, 3));     // 8
console.log(MATH_PI);           // 3.14159
```

#### Importing Default Exports

```javascript
import User from './user.js';

const john = new User('John Doe', 'john@example.com');
console.log(john.getProfile());  // John Doe (john@example.com)
```

#### Importing Both Default and Named Exports

```javascript
import User, { ROLES, isAdmin } from './user.js';
```

#### Importing All Exports as an Object

```javascript
import * as MathUtils from './math.js';

console.log(MathUtils.PI);               // 3.14159
console.log(MathUtils.add(5, 3));        // 8
console.log(MathUtils.multiply(4, 2));   // 8
```

## Dynamic Imports

ES Modules also support dynamic imports using the `import()` function, which returns a Promise:

```javascript
button.addEventListener('click', async () => {
  try {
    // Only load the module when needed
    const { formatDate } = await import('./date-utils.js');
    
    const formattedDate = formatDate(new Date());
    console.log(formattedDate);
  } catch (error) {
    console.error('Error loading module:', error);
  }
});
```

## Modules in React

In React applications, modules are used extensively:

```javascript
// Button.js
import React from 'react';
import './Button.css';

export default function Button({ text, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
}
```

```javascript
// App.js
import React, { useState } from 'react';
import Button from './Button';
import { fetchData } from './api';

function App() {
  const [data, setData] = useState(null);
  
  const handleClick = async () => {
    const result = await fetchData();
    setData(result);
  };
  
  return (
    <div>
      <Button text="Load Data" onClick={handleClick} />
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

export default App;
```

## Benefits of Using Modules in React

1. **Code Organization**: Each component can be in its own file
2. **Maintainability**: Easier to understand and maintain smaller files
3. **Reusability**: Components can be imported wherever needed
4. **Tree-Shaking**: Bundlers can eliminate unused code, reducing bundle size
5. **Lazy Loading**: Components can be loaded only when needed using dynamic imports

## Practice Exercises

### Exercise 1: Create and Use Modules

Create three files:
- `utils.js` with utility functions
- `data.js` with sample data
- `main.js` that imports and uses both modules

```javascript
// utils.js
export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

export function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// data.js
export const products = [
  { id: 1, name: 'laptop', price: 999.99 },
  { id: 2, name: 'phone', price: 699.99 },
  { id: 3, name: 'tablet', price: 399.99 }
];

export default {
  storeName: 'TechShop',
  location: 'Online'
};

// main.js
import { formatCurrency, capitalizeString } from './utils.js';
import storeInfo, { products } from './data.js';

console.log(`Welcome to ${storeInfo.storeName}!`);

products.forEach(product => {
  console.log(`${capitalizeString(product.name)}: ${formatCurrency(product.price)}`);
});
```

### Exercise 2: Dynamic Imports

Create a simple application that loads different modules based on user interaction:

```javascript
// index.js
const loadBasicFeatures = document.getElementById('loadBasic');
const loadAdvancedFeatures = document.getElementById('loadAdvanced');
const output = document.getElementById('output');

loadBasicFeatures.addEventListener('click', async () => {
  try {
    const { basic } = await import('./basic-features.js');
    output.innerHTML = basic.getFeatureList();
  } catch (error) {
    output.innerHTML = `Error: ${error.message}`;
  }
});

loadAdvancedFeatures.addEventListener('click', async () => {
  try {
    const { advanced } = await import('./advanced-features.js');
    output.innerHTML = advanced.getFeatureList();
  } catch (error) {
    output.innerHTML = `Error: ${error.message}`;
  }
});
```

## Solutions

### Exercise 1 Output:
```
Welcome to TechShop!
Laptop: $999.99
Phone: $699.99
Tablet: $399.99
```

### Exercise 2 Files:

```javascript
// basic-features.js
export const basic = {
  getFeatureList() {
    return `
      <h3>Basic Features</h3>
      <ul>
        <li>User authentication</li>
        <li>Product listing</li>
        <li>Shopping cart</li>
      </ul>
    `;
  }
};

// advanced-features.js
export const advanced = {
  getFeatureList() {
    return `
      <h3>Advanced Features</h3>
      <ul>
        <li>Real-time inventory</li>
        <li>Personalized recommendations</li>
        <li>Advanced search</li>
        <li>Payment processing</li>
      </ul>
    `;
  }
};
```
