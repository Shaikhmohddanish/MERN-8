# Array Methods Practice Solutions

## 1. Map: Transforming Data for Display

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

## 2. Filter: Filtering Active Users

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

## 3. Reduce: Calculating Total Expense

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

## 4. Map & Filter: Filtering and Transforming Data

```javascript
const users = [
  { name: "John", age: 25, completedCourse: true },
  { name: "Jane", age: 17, completedCourse: false },
  { name: "Mark", age: 30, completedCourse: true },
  { name: "Paul", age: 22, completedCourse: false }
];

const adultCompleted = users
  .filter(user => user.age >= 18 && user.completedCourse)
  .map(user => user.name);

console.log(adultCompleted);
// Output: ["John", "Mark"]
```

## 5. Reduce: Grouping Data by Category

```javascript
const products = [
  { name: "Apple", category: "Fruit" },
  { name: "Banana", category: "Fruit" },
  { name: "Carrot", category: "Vegetable" },
  { name: "Lettuce", category: "Vegetable" }
];

const groupedProducts = products.reduce((result, product) => {
  if (!result[product.category]) {
    result[product.category] = [];
  }
  
  result[product.category].push(product.name);
  
  return result;
}, {});

console.log(groupedProducts);
// Output: {
//   "Fruit": ["Apple", "Banana"],
//   "Vegetable": ["Carrot", "Lettuce"]
// }
```

## 6. Map & Reduce: Average Salary Calculation

```javascript
const employees = [
  { name: "Alice", salary: 50000 },
  { name: "Bob", salary: 60000 },
  { name: "Charlie", salary: 70000 },
  { name: "David", salary: 80000 }
];

const salaries = employees.map(employee => employee.salary);
const totalSalary = salaries.reduce((total, salary) => total + salary, 0);
const averageSalary = totalSalary / salaries.length;

console.log(averageSalary);
// Output: 65000
```

## 7. Filter: Finding Missing Items in Stock

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

## 8. Map & Filter: Formatting and Filtering Data

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

## 9. Reduce: Product of All Elements

```javascript
const numbers = [1, 2, 3, 4, 5];

const product = numbers.reduce((accumulator, current) => {
  return accumulator * current;
}, 1); // Start with 1 (not 0) for multiplication

console.log(product);
// Output: 120 (1*2*3*4*5)
```

## 10. Map & Reduce: Converting Data to a Summary Report

```javascript
const items = [
  { name: "Item A", price: 10, quantity: 2 },
  { name: "Item B", price: 5, quantity: 5 },
  { name: "Item C", price: 20, quantity: 3 }
];

const totalValue = items.reduce((total, item) => {
  return total + (item.price * item.quantity);
}, 0);

console.log(totalValue);
// Output: 105 (10*2 + 5*5 + 20*3)
```
