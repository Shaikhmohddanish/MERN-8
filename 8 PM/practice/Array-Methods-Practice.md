# Array Methods Practice Questions

This file contains practice questions to help you master JavaScript's array methods (`map()`, `filter()`, and `reduce()`), which are essential for React development.

## Questions

### 1. Map: Transforming Data for Display

You have a list of products with their prices and quantities. You need to create a new list that calculates the total price for each product (price * quantity).

**Question**: Using the `map()` method, create a new array where each product is transformed into an object that includes the product name and its total price.

```javascript
const products = [
  { name: "Apple", price: 1.5, quantity: 3 },
  { name: "Banana", price: 1.2, quantity: 5 },
  { name: "Orange", price: 2, quantity: 2 }
];

// Map logic to calculate total price for each product
```

### 2. Filter: Filtering Active Users

You have a list of users, some of whom are active, and others are inactive. You need to create a new array containing only the active users.

**Question**: Using the `filter()` method, create an array with only the active users.

```javascript
const users = [
  { name: "Alice", isActive: true },
  { name: "Bob", isActive: false },
  { name: "Charlie", isActive: true },
  { name: "David", isActive: false }
];

// Filter logic to get only active users
```

### 3. Reduce: Calculating Total Expense

You have an array of expenses for the month (each expense has a category and amount). You need to calculate the total amount spent for the month.

**Question**: Using the `reduce()` method, calculate the total expense for the month.

```javascript
const expenses = [
  { category: "Food", amount: 200 },
  { category: "Transport", amount: 50 },
  { category: "Entertainment", amount: 100 },
  { category: "Food", amount: 150 }
];

// Reduce logic to sum up all expenses
```

### 4. Map & Filter: Filtering and Transforming Data

You have a list of users with their ages and whether or not they have completed a course. You need to create an array that contains the names of users who are 18 or older and have completed the course.

**Question**: Using both `map()` and `filter()`, return an array of names of users who are at least 18 years old and have completed the course.

```javascript
const users = [
  { name: "John", age: 25, completedCourse: true },
  { name: "Jane", age: 17, completedCourse: false },
  { name: "Mark", age: 30, completedCourse: true },
  { name: "Paul", age: 22, completedCourse: false }
];

// Filter to find users who are 18 or older and completed the course
```

### 5. Reduce: Grouping Data by Category

You have a list of products and their categories. You need to group the products by category using reduce().

**Question**: Using the `reduce()` method, group the products by their category.

```javascript
const products = [
  { name: "Apple", category: "Fruit" },
  { name: "Banana", category: "Fruit" },
  { name: "Carrot", category: "Vegetable" },
  { name: "Lettuce", category: "Vegetable" }
];

// Reduce logic to group products by category
```

### 6. Map & Reduce: Average Salary Calculation

You have a list of employees, and each has a name and salary. You need to calculate the average salary of all employees.

**Question**: Using `map()` to extract the salaries and `reduce()` to calculate the average salary.

```javascript
const employees = [
  { name: "Alice", salary: 50000 },
  { name: "Bob", salary: 60000 },
  { name: "Charlie", salary: 70000 },
  { name: "David", salary: 80000 }
];

// Map to extract the salaries and reduce to calculate the average
```

### 7. Filter: Finding Missing Items in Stock

You have a list of products in stock and a list of products that were sold. You need to filter out the products that are still in stock.

**Question**: Using the `filter()` method, create a list of products that are still in stock (not sold).

```javascript
const productsInStock = [
  { id: 1, name: "Laptop", isSold: false },
  { id: 2, name: "Tablet", isSold: true },
  { id: 3, name: "Smartphone", isSold: false },
  { id: 4, name: "Headphones", isSold: true }
];

// Filter logic to find products that are not sold
```

### 8. Map & Filter: Formatting and Filtering Data

You have a list of students with their names and grades. You need to create an array with the names of students who passed (grade >= 50), and format the names in uppercase.

**Question**: Using both `map()` and `filter()`, create an array of students who passed with their names in uppercase.

```javascript
const students = [
  { name: "John", grade: 45 },
  { name: "Jane", grade: 80 },
  { name: "Mark", grade: 60 },
  { name: "Paul", grade: 30 }
];

// Filter out students who passed and map their names to uppercase
```

### 9. Reduce: Product of All Elements

You have an array of numbers, and you need to calculate the product of all the numbers in the array using reduce().

**Question**: Using the `reduce()` method, calculate the product of all the numbers in the array.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Reduce logic to calculate the product of all elements
```

### 10. Map & Reduce: Converting Data to a Summary Report

You have an array of items that contain quantities and prices. You need to create a summary report that shows the total value of all items.

**Question**: Using `map()` to calculate the total price for each item and `reduce()` to get the overall total value.

```javascript
const items = [
  { name: "Item A", price: 10, quantity: 2 },
  { name: "Item B", price: 5, quantity: 5 },
  { name: "Item C", price: 20, quantity: 3 }
];

// Map to calculate total price for each item, reduce to calculate total value
```

## Solutions

### 1. Map: Transforming Data for Display

```javascript
const products = [
  { name: "Apple", price: 1.5, quantity: 3 },
  { name: "Banana", price: 1.2, quantity: 5 },
  { name: "Orange", price: 2, quantity: 2 }
];

const productsWithTotalPrice = products.map(product => {
  return {
    name: product.name,
    totalPrice: product.price * product.quantity
  };
});

console.log(productsWithTotalPrice);
// Output: [
//   { name: "Apple", totalPrice: 4.5 },
//   { name: "Banana", totalPrice: 6 },
//   { name: "Orange", totalPrice: 4 }
// ]
```

**Explanation**: The `map()` method is used to transform each product object into a new object that contains only the name and the calculated total price. For each product, we multiply the price by the quantity to get the total price.

### 2. Filter: Filtering Active Users

```javascript
const users = [
  { name: "Alice", isActive: true },
  { name: "Bob", isActive: false },
  { name: "Charlie", isActive: true },
  { name: "David", isActive: false }
];

const activeUsers = users.filter(user => user.isActive);

console.log(activeUsers);
// Output: [
//   { name: "Alice", isActive: true },
//   { name: "Charlie", isActive: true }
// ]
```

**Explanation**: The `filter()` method creates a new array with all elements that pass the test implemented by the provided function. In this case, we're keeping only the users where `isActive` is `true`.

### 3. Reduce: Calculating Total Expense

```javascript
const expenses = [
  { category: "Food", amount: 200 },
  { category: "Transport", amount: 50 },
  { category: "Entertainment", amount: 100 },
  { category: "Food", amount: 150 }
];

const totalExpense = expenses.reduce((total, expense) => {
  return total + expense.amount;
}, 0);

console.log(totalExpense);
// Output: 500
```

**Explanation**: The `reduce()` method executes a reducer function on each element of the array, resulting in a single output value. We start with an initial value of 0 and then add each expense amount to our running total.

### 4. Map & Filter: Filtering and Transforming Data

```javascript
const users = [
  { name: "John", age: 25, completedCourse: true },
  { name: "Jane", age: 17, completedCourse: false },
  { name: "Mark", age: 30, completedCourse: true },
  { name: "Paul", age: 22, completedCourse: false }
];

// Method 1: Filter first, then map
const adultCompleted = users
  .filter(user => user.age >= 18 && user.completedCourse)
  .map(user => user.name);

// Method 2: Using a single filter + map chain
const adultCompletedAlt = users
  .reduce((result, user) => {
    if (user.age >= 18 && user.completedCourse) {
      result.push(user.name);
    }
    return result;
  }, []);

console.log(adultCompleted);
// Output: ["John", "Mark"]
```

**Explanation**: We first use `filter()` to select only users who are 18 or older AND have completed the course. Then we use `map()` to extract just the names from the filtered array. The alternative method with `reduce()` accomplishes the same thing in a single pass.

### 5. Reduce: Grouping Data by Category

```javascript
const products = [
  { name: "Apple", category: "Fruit" },
  { name: "Banana", category: "Fruit" },
  { name: "Carrot", category: "Vegetable" },
  { name: "Lettuce", category: "Vegetable" }
];

const groupedProducts = products.reduce((result, product) => {
  // If the category doesn't exist in our result yet, create it
  if (!result[product.category]) {
    result[product.category] = [];
  }
  
  // Add the product to the appropriate category
  result[product.category].push(product.name);
  
  return result;
}, {});

console.log(groupedProducts);
// Output: {
//   "Fruit": ["Apple", "Banana"],
//   "Vegetable": ["Carrot", "Lettuce"]
// }
```

**Explanation**: We use `reduce()` to build up an object where each key is a category name, and each value is an array of product names in that category. For each product, we check if its category exists in our result object. If not, we create an empty array for that category. Then we add the product name to the appropriate category array.

### 6. Map & Reduce: Average Salary Calculation

```javascript
const employees = [
  { name: "Alice", salary: 50000 },
  { name: "Bob", salary: 60000 },
  { name: "Charlie", salary: 70000 },
  { name: "David", salary: 80000 }
];

// Method 1: Extract salaries first with map, then calculate average with reduce
const salaries = employees.map(employee => employee.salary);
const totalSalary = salaries.reduce((total, salary) => total + salary, 0);
const averageSalary = totalSalary / salaries.length;

// Method 2: Do it all in one reduce operation
const averageSalaryAlt = employees.reduce((total, employee, index, array) => {
  total += employee.salary;
  
  // If this is the last item, calculate the average
  if (index === array.length - 1) {
    return total / array.length;
  }
  
  return total;
}, 0);

console.log(averageSalary);
// Output: 65000
```

**Explanation**: In Method 1, we first use `map()` to extract just the salary values from each employee object. Then we use `reduce()` to sum all salaries, and finally divide by the number of employees to get the average. Method 2 does everything in a single `reduce()` call, checking if we're on the last item to perform the division.

### 7. Filter: Finding Missing Items in Stock

```javascript
const productsInStock = [
  { id: 1, name: "Laptop", isSold: false },
  { id: 2, name: "Tablet", isSold: true },
  { id: 3, name: "Smartphone", isSold: false },
  { id: 4, name: "Headphones", isSold: true }
];

const availableProducts = productsInStock.filter(product => !product.isSold);

console.log(availableProducts);
// Output: [
//   { id: 1, name: "Laptop", isSold: false },
//   { id: 3, name: "Smartphone", isSold: false }
// ]
```

**Explanation**: We use `filter()` to create a new array that only includes products where `isSold` is `false`. The negation operator (`!`) inverts the boolean value, so `!product.isSold` is true when a product is not sold.

### 8. Map & Filter: Formatting and Filtering Data

```javascript
const students = [
  { name: "John", grade: 45 },
  { name: "Jane", grade: 80 },
  { name: "Mark", grade: 60 },
  { name: "Paul", grade: 30 }
];

const passedStudentsUppercase = students
  .filter(student => student.grade >= 50)
  .map(student => student.name.toUpperCase());

console.log(passedStudentsUppercase);
// Output: ["JANE", "MARK"]
```

**Explanation**: First, we use `filter()` to select only students with a grade of 50 or higher. Then, we use `map()` to transform each student object into just the name in uppercase using the `toUpperCase()` string method.

### 9. Reduce: Product of All Elements

```javascript
const numbers = [1, 2, 3, 4, 5];

const product = numbers.reduce((accumulator, current) => {
  return accumulator * current;
}, 1); // Start with 1 (not 0) for multiplication

console.log(product);
// Output: 120 (1*2*3*4*5)
```

**Explanation**: The `reduce()` method is used to multiply all numbers in the array. We start with an initial value of 1 (because starting with 0 would result in 0 for any multiplication). Then for each number, we multiply it by our accumulated product.

### 10. Map & Reduce: Converting Data to a Summary Report

```javascript
const items = [
  { name: "Item A", price: 10, quantity: 2 },
  { name: "Item B", price: 5, quantity: 5 },
  { name: "Item C", price: 20, quantity: 3 }
];

// Method 1: Map first, then reduce
const itemTotals = items.map(item => item.price * item.quantity);
const grandTotal = itemTotals.reduce((total, itemTotal) => total + itemTotal, 0);

// Method 2: Directly with reduce
const grandTotalAlt = items.reduce((total, item) => {
  return total + (item.price * item.quantity);
}, 0);

console.log(grandTotal);
// Output: 105 (10*2 + 5*5 + 20*3)
```

**Explanation**: In Method 1, we first use `map()` to transform each item into its total value (price * quantity). Then we use `reduce()` to sum all these values. Method 2 is more efficient, using a single `reduce()` call to calculate the sum directly.
