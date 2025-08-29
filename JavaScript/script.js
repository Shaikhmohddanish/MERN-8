// Basic Clock Functionality
// function updateClock() {
//     const now = new Date();
    
//     // Format time (adding leading zeros for single digits)
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const seconds = String(now.getSeconds()).padStart(2, '0');
//     const timeString = `${hours}:${minutes}:${seconds}`;
    
//     // Format date
//     // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     // const dateString = now.toLocaleDateString('en-US', options);
    
//     // Update DOM elements
//     document.getElementById('time').textContent = timeString;
//     // document.getElementById('date').textContent = dateString;
// }

// // Update clock immediately and then every second
// updateClock();
// setInterval(updateClock, 1000);

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6,7,8];

// const combinedArray = [];

// for(let elements of arr1){
//     combinedArray.push(elements)
// }

// for(let elements of arr2){
//     combinedArray.push(elements)
// }

// console.log(combinedArray);

// const combinedArray = [...arr1, ...arr2];
// console.log(combinedArray);

// const numbers = [1, 2, 3];
// const withFour = [...numbers, 4];
// const withZeroAtStart = [-1,0, ...numbers];
// console.log(withFour);
// console.log(withZeroAtStart);


// const numbers = [1, 2, 3];
// const max = Math.max(...numbers);

// console.log(max);


// const defaults = { theme: 'light', fontSize: 16 };
// const userPrefs = { color: "Red" };
// const x = { fontSize: 20,color:"Blue" };
// const settings = { ...defaults, ...userPrefs, ...x };
// console.log(settings); // { theme: 'light', fontSize: 20, color: 'Blue' }
// settings.fontSize = 20;
// console.log(settings);

// Overriding properties
// const product = { name: 'Laptop', price: 999 };
// const discountedProduct = { ...product, price: 799 };
// console.log(discountedProduct); // { name: 'Laptop', price: 799 }


// const nestedObj = { info: { name: 'John' } };
// const shallowCopy = { ...nestedObj };
// console.log(shallowCopy);
// shallowCopy.info.name = 'Jane';
// console.log(nestedObj.info.name); 

// let name = "Danish";
// let age = 26;

// // console.log("Hello my name is",name,"and I am",age,"years old.");
// console.log(`Hello my name is ${name} and I am ${age} years old.`);

// const letters = ['a', 'b', 'c'];
// const indexed = letters.map((letter, index) => `${index + 1}: ${letter}`);
// console.log(indexed); // ['1: a', '2: b', '3: c']


// const users = [
//   { id: 1, name: 'John', role: 'admin' },
//   { id: 2, name: 'Jane', role: 'user' },
//   { id: 3, name: 'Bob', role: 'user' }
// ];

// // Find the admin user
// const adminUser = users.find(user => user.role === 'admin');
// console.log(adminUser);



const numbers = [1, 3, 5,7,9];

// Check if any number is even
const hasEven = numbers.every(num => num > 5);
console.log(hasEven); // true