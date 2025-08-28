// function getUser(username) {
//   return fetch(`https://api.github.com/users/${username}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`GitHub user not found: ${username}`);
//       }            
//       return response.json();
//     });
// }

// function getRepos(user) {
//   return fetch(user.repos_url)
//     .then(response => response.json());
// }

// function getTopRepos(username) {
//   let userData;
  
//   return getUser(username)
//     .then(user => {
//       userData = user;
//       console.log("USER DATA is",user);
      
//       return getRepos(user);
//     })
//     .then(repos => {
//       return {
//         user: userData,
//         topRepos: repos.slice(0, 5)
//       };
//     })
//     .catch(error => {
//       console.error('Error in getTopRepos:', error);
//       throw error;
//     });
// }

// getTopRepos('Shaikhmohddanish')
//   .then(data => {
//     console.log('User Information:');
//     console.log(`Name: ${data.user.name}`);
//     console.log(`Bio: ${data.user.bio}`);
//     console.log(`Public Repos: ${data.user.public_repos}`);
//     console.log('Top 5 Repositories:');
//     data.topRepos.forEach(repo => {
//       console.log(`- ${repo.name} (Stars: ${repo.stargazers_count})`);
//     });
//   })
//   .catch(error => {
//     console.error('Error fetching top repositories:', error);
//   });


// const count = 0;
// console.log(count);

// count = 10;
// console.log(count);

// let userName = "Danish";
// let age = 26;
// console.log(`Hello my name is ${userName} and I am ${age} years old.`);

// get random value from 1 to 100
// const getRandomNumber = () => Math.floor(Math.random()*100)+1;

// let roundValue = Math.sqrt(3);
// console.log(roundValue);

// Old way
// const userName = 'John';
// const userAge = 30;
// const oldUser = {
//   name: userName,
//   age: userAge
// };

// console.log(oldUser);


// // Property shorthand
// const user = {
//   userName,
//   userAge
// };
// console.log(user); // { userName: 'John', userAge: 30 }


// const [a,b] = [10, 20];
// console.log(a);
// console.log(b);

// const [first, , third] = [1, 2, 3];
// console.log(first); // 1
// console.log(third); // 3

// const [name = 'Guest', age = 25] = ["Danish",26];
// console.log(name); // 'John' (uses provided value)
// console.log(age); // 25 (uses default value)

// const [leader,secondLeader, ...team] = ['Alex', 'Bob', 'Charlie', 'Dave'];
// console.log(leader); // 'Alex'
// console.log(secondLeader);
// console.log(team); // ['Bob', 'Charlie', 'Dave']

// let a = 10;
// let b = 20;
// console.log(a);
// console.log(b);

// let temp = a;
// a = b;
// b = temp;
// console.log(a);
// console.log(b);

// let a = 1;
// let b = 2;
// [a, b] = [b, a];
// console.log(a); // 2
// console.log(b); // 1

// Before destructuring
const user = { name: 'John', age: 30 };
// const userName = user.name;
// const userAge = user.age;

// console.log(userName);
// console.log(userAge);

// const { name, age } = user;
// console.log(name); // 'John'
// console.log(age); // 30

// const { id, ...userDetails } = { id: 123, name: 'John', age: 30, email: 'john@example.com' };
// console.log(id); // 123
// console.log(userDetails);

// Before destructuring
// function displayUser(user) {
//   console.log(`Name: ${user.name}, Age: ${user.age}`);
// }

// With destructuring
function displayUser({ name, age }) {
  console.log(`Name: ${name}, Age: ${age}`);
}

displayUser({ name: 'John', age: 30 });