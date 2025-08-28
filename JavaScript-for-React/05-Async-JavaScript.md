# Async JavaScript

Asynchronous JavaScript is essential for React development, especially when fetching data from APIs, handling user interactions, and managing side effects. Understanding promises, async/await, and the Fetch API will help you build responsive and efficient React applications.

## Table of Contents
- [Promises](#promises)
- [Async/Await](#asyncawait)
- [Fetch API](#fetch-api)
- [Error Handling](#error-handling)
- [Common Async Patterns in React](#common-async-patterns-in-react)
- [Practice Exercises](#practice-exercises)

## Promises

Promises are objects representing the eventual completion or failure of an asynchronous operation. They allow you to chain asynchronous operations and handle success and error conditions cleanly.

### Promise States

A promise can be in one of three states:
1. **Pending**: Initial state, neither fulfilled nor rejected
2. **Fulfilled**: The operation completed successfully
3. **Rejected**: The operation failed

### Creating Promises

```javascript
// Creating a promise
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;
  
  if (success) {
    resolve('Operation completed successfully!');
  } else {
    reject(new Error('Operation failed!'));
  }
});

// Using the promise
myPromise
  .then(result => {
    console.log(result); // 'Operation completed successfully!'
  })
  .catch(error => {
    console.error(error); // Error: 'Operation failed!'
  });
```

### Promise Chaining

Promises can be chained to handle sequences of asynchronous operations:

```javascript
function getUserData(userId) {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: 'User ' + userId });
      } else {
        reject(new Error('Invalid user ID'));
      }
    }, 1000);
  });
}

function getUserPosts(user) {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (user.id > 0) {
        resolve({
          user,
          posts: [
            { id: 1, title: 'Post 1' },
            { id: 2, title: 'Post 2' }
          ]
        });
      } else {
        reject(new Error('User has no posts'));
      }
    }, 1000);
  });
}

// Chain promises
getUserData(1)
  .then(user => {
    console.log('User data:', user);
    return getUserPosts(user);
  })
  .then(userWithPosts => {
    console.log('User posts:', userWithPosts.posts);
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Operation completed, successful or not');
  });
```

### Promise.all, Promise.race, Promise.allSettled

```javascript
// Promise.all - waits for all promises to resolve or any to reject
const promises = [
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
];

Promise.all(promises)
  .then(([usersResponse, postsResponse, commentsResponse]) => {
    // All promises resolved successfully
    return Promise.all([
      usersResponse.json(),
      postsResponse.json(),
      commentsResponse.json()
    ]);
  })
  .then(([users, posts, comments]) => {
    // Process the data
    console.log(users, posts, comments);
  })
  .catch(error => {
    // If any promise rejects, this catch handles it
    console.error('Error fetching data:', error);
  });

// Promise.race - resolves or rejects as soon as the first promise resolves or rejects
const promiseWithTimeout = (promise, timeout) => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timed out')), timeout);
  });
  
  return Promise.race([promise, timeoutPromise]);
};

promiseWithTimeout(fetch('/api/data'), 5000)
  .then(response => response.json())
  .then(data => console.log('Data received:', data))
  .catch(error => console.error('Error:', error.message));

// Promise.allSettled - waits for all promises to settle (resolve or reject)
Promise.allSettled([
  fetch('/api/critical').then(r => r.json()),
  fetch('/api/optional1').then(r => r.json()),
  fetch('/api/optional2').then(r => r.json())
])
  .then(results => {
    // Process all results, regardless of fulfilled or rejected state
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
      } else {
        console.log('Error:', result.reason);
      }
    });
  });
```

## Async/Await

Async/await is syntactic sugar over promises, making asynchronous code look and behave more like synchronous code. It's based on promises but provides a more readable and maintainable way to write asynchronous logic.

### Basic Syntax

```javascript
// Function declaration
async function fetchUserData() {
  // Inside an async function, you can use await
  const response = await fetch('/api/users/1');
  const userData = await response.json();
  return userData;
}

// Arrow function
const fetchUserData = async () => {
  const response = await fetch('/api/users/1');
  const userData = await response.json();
  return userData;
};

// Using the async function (it returns a promise)
fetchUserData()
  .then(userData => {
    console.log('User data:', userData);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Or with await (inside another async function)
async function displayUserData() {
  try {
    const userData = await fetchUserData();
    console.log('User data:', userData);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Sequential vs. Parallel Execution

```javascript
// Sequential execution - each await waits for the previous one
async function fetchSequential() {
  console.time('sequential');
  
  const users = await fetch('/api/users').then(r => r.json());
  const posts = await fetch('/api/posts').then(r => r.json());
  const comments = await fetch('/api/comments').then(r => r.json());
  
  console.timeEnd('sequential');
  return { users, posts, comments };
}

// Parallel execution - start all fetches at once
async function fetchParallel() {
  console.time('parallel');
  
  const usersPromise = fetch('/api/users').then(r => r.json());
  const postsPromise = fetch('/api/posts').then(r => r.json());
  const commentsPromise = fetch('/api/comments').then(r => r.json());
  
  const users = await usersPromise;
  const posts = await postsPromise;
  const comments = await commentsPromise;
  
  console.timeEnd('parallel');
  return { users, posts, comments };
}

// Even cleaner parallel execution with Promise.all
async function fetchParallelWithPromiseAll() {
  console.time('promise.all');
  
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  console.timeEnd('promise.all');
  return { users, posts, comments };
}
```

### Error Handling with Async/Await

```javascript
// Using try/catch
async function fetchWithErrorHandling() {
  try {
    const response = await fetch('/api/users/1');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Fetching user failed:', error);
    // Re-throw or return a default value
    return { name: 'Unknown', error: error.message };
  } finally {
    console.log('Fetch operation completed');
  }
}

// Alternative approach for multiple operations
async function fetchMultipleWithErrorHandling() {
  try {
    // User data
    const userResponse = await fetch('/api/users/1');
    if (!userResponse.ok) throw new Error('User fetch failed');
    const userData = await userResponse.json();
    
    try {
      // Posts data - separate try/catch allows continuing even if this fails
      const postsResponse = await fetch(`/api/users/${userData.id}/posts`);
      if (!postsResponse.ok) throw new Error('Posts fetch failed');
      userData.posts = await postsResponse.json();
    } catch (postsError) {
      console.warn('Could not fetch posts:', postsError);
      userData.posts = [];
    }
    
    return userData;
  } catch (error) {
    console.error('Operation failed:', error);
    throw error; // Re-throw to propagate the error
  }
}
```

## Fetch API

The Fetch API provides a modern, promise-based interface for making HTTP requests. It's widely used in React applications for data fetching.

### Basic GET Request

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

// With async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
```

### POST Request

```javascript
const newUser = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
};

fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newUser)
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// With async/await
async function createUser(userData) {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}
```

### Using Fetch with Different Response Types

```javascript
// JSON (most common)
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));

// Text
fetch('/api/text')
  .then(response => response.text())
  .then(text => console.log(text));

// Blob (for images, files)
fetch('/api/image.png')
  .then(response => response.blob())
  .then(blob => {
    const imageUrl = URL.createObjectURL(blob);
    document.getElementById('myImage').src = imageUrl;
  });

// FormData
fetch('/api/form')
  .then(response => response.formData())
  .then(formData => {
    console.log(formData.get('field1'));
  });

// ArrayBuffer (for binary data)
fetch('/api/binary')
  .then(response => response.arrayBuffer())
  .then(buffer => {
    // Process binary data
  });
```

### Fetch with AbortController

The AbortController interface allows you to abort fetch requests when needed, such as when a component unmounts or a user navigates away.

```javascript
// Creating an AbortController
const controller = new AbortController();
const signal = controller.signal;

// Using the signal with fetch
fetch('https://api.example.com/data', { signal })
  .then(response => response.json())
  .then(data => console.log('Data:', data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch was aborted');
    } else {
      console.error('Fetch error:', error);
    }
  });

// Aborting the fetch after 5 seconds
setTimeout(() => {
  controller.abort();
  console.log('Fetch aborted');
}, 5000);

// React example: aborting fetch when component unmounts
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchData() {
      try {
        const response = await fetch('/api/data', { 
          signal: controller.signal 
        });
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
    // Clean up function will run when component unmounts
    return () => {
      controller.abort();
    };
  }, []);
  
  if (loading) return <p>Loading...</p>;
  return <div>{/* Display data */}</div>;
}
```

## Error Handling

Proper error handling is crucial for building robust asynchronous applications.

### Types of Errors

1. **Network errors**: Problems with the connection
2. **HTTP errors**: Server responded with an error status code
3. **Parsing errors**: Invalid JSON or other response format issues
4. **Application errors**: Logical errors in your code
5. **Abort errors**: Requests that were intentionally canceled

### Comprehensive Error Handling

```javascript
async function fetchWithCompleteErrorHandling(url) {
  // For aborting the request if it takes too long
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
  
  try {
    const response = await fetch(url, { 
      signal: controller.signal,
      // Optional: credentials, headers, etc.
    });
    
    // Clear the timeout since we got a response
    clearTimeout(timeoutId);
    
    // Handle HTTP errors
    if (!response.ok) {
      // Try to get error details from response
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error;
      } catch (e) {
        // If parsing JSON fails, use status text
        errorMessage = response.statusText;
      }
      
      // Create error with details
      const error = new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;
    }
    
    // Parse the response
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle different error types
    if (error.name === 'AbortError') {
      throw new Error('Request timed out');
    } else if (error instanceof TypeError && error.message.includes('NetworkError')) {
      throw new Error('Network error - check your connection');
    } else if (error instanceof SyntaxError) {
      throw new Error('Invalid response format');
    } else {
      // Re-throw with more context
      throw new Error(`Error fetching from ${url}: ${error.message}`);
    }
  } finally {
    // Ensure timeout is cleared
    clearTimeout(timeoutId);
  }
}

// Usage
try {
  const data = await fetchWithCompleteErrorHandling('/api/important-data');
  processData(data);
} catch (error) {
  // Handle specific error types or show user-friendly message
  if (error.message.includes('timed out')) {
    showTimeoutMessage();
  } else if (error.message.includes('Network error')) {
    showConnectionError();
  } else {
    showGenericError(error.message);
  }
  
  // Log for debugging
  console.error('Operation failed:', error);
}
```

### Error Boundaries in React

Error boundaries are React components that catch JavaScript errors in their child component tree, log those errors, and display a fallback UI.

```jsx
// ErrorBoundary.js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="error-container">
          <h2>Something went wrong.</h2>
          {this.props.fallback || <p>Please try again later</p>}
          {process.env.NODE_ENV !== 'production' && (
            <details>
              <summary>Error Details</summary>
              <p>{this.state.error && this.state.error.toString()}</p>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <div className="app">
      <ErrorBoundary>
        <UserProfile userId={123} />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<p>Could not load posts. <button>Retry</button></p>}>
        <UserPosts userId={123} />
      </ErrorBoundary>
    </div>
  );
}
```

## Common Async Patterns in React

### Data Fetching in useEffect

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset state when userId changes
    setLoading(true);
    setError(null);
    
    let isMounted = true;
    const controller = new AbortController();
    
    async function fetchUser() {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const userData = await response.json();
        
        // Only update state if component is still mounted
        if (isMounted) {
          setUser(userData);
          setLoading(false);
        }
      } catch (error) {
        if (error.name !== 'AbortError' && isMounted) {
          console.error('Fetching user failed:', error);
          setError(error.message);
          setLoading(false);
        }
      }
    }
    
    fetchUser();
    
    // Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [userId]); // Re-run when userId changes
  
  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data found</div>;
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      {/* Other user details */}
    </div>
  );
}
```

### Custom Hook for Data Fetching

```jsx
// useFetch.js
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
    
    async function fetchData() {
      setLoading(true);
      
      try {
        const response = await fetch(url, {
          ...options,
          signal,
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (error) {
        if (isMounted && error.name !== 'AbortError') {
          setError(error.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchData();
    
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, JSON.stringify(options)]);
  
  return { data, loading, error };
}

// Usage
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');
  
  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Async Event Handlers

```jsx
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Using async function directly in event handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Form validation
      if (!username || !password) {
        throw new Error('Please enter both username and password');
      }
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Handle successful login
      console.log('Login successful:', data);
      // Redirect or update app state
    } catch (error) {
      setError(error.message);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Managing Concurrent Requests

```jsx
function UserDashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        // Start all requests in parallel
        const [userResponse, postsResponse, commentsResponse] = await Promise.all([
          fetch(`/api/users/${userId}`),
          fetch(`/api/users/${userId}/posts`),
          fetch(`/api/users/${userId}/comments`)
        ]);
        
        // Handle response status
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        if (!postsResponse.ok) throw new Error('Failed to fetch posts');
        if (!commentsResponse.ok) throw new Error('Failed to fetch comments');
        
        // Parse all responses in parallel
        const [userData, postsData, commentsData] = await Promise.all([
          userResponse.json(),
          postsResponse.json(),
          commentsResponse.json()
        ]);
        
        // Update state
        setUser(userData);
        setPosts(postsData);
        setComments(commentsData);
      } catch (error) {
        console.error('Dashboard error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [userId]);
  
  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div className="dashboard">
      {user && <UserProfile user={user} />}
      <div className="dashboard-content">
        <PostsList posts={posts} />
        <CommentsList comments={comments} />
      </div>
    </div>
  );
}
```

## Practice Exercises

### Exercise 1: Promise Basics
Implement a function that simulates an API call with promises:

```javascript
/**
 * Simulates fetching a user by ID
 * Returns a promise that resolves with user data if id > 0
 * Rejects with an error if id <= 0
 * Adds a random delay between 500-1500ms
 */
function fetchUser(id) {
  // Your code here
}

// Test cases
fetchUser(1)
  .then(user => console.log('User found:', user))
  .catch(error => console.error('Error:', error));

fetchUser(-1)
  .then(user => console.log('User found:', user))
  .catch(error => console.error('Error:', error));
```

### Exercise 2: Async/Await Implementation
Refactor the following promise chain to use async/await:

```javascript
function getUser(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`GitHub user not found: ${username}`);
      }
      return response.json();
    });
}

function getRepos(user) {
  return fetch(user.repos_url)
    .then(response => response.json());
}

function getTopRepos(username) {
  let userData;
  
  return getUser(username)
    .then(user => {
      userData = user;
      return getRepos(user);
    })
    .then(repos => {
      const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      return {
        user: userData,
        topRepos: sortedRepos.slice(0, 5)
      };
    })
    .catch(error => {
      console.error('Error in getTopRepos:', error);
      throw error;
    });
}

// Refactor the above functions using async/await
```

### Exercise 3: Error Handling
Implement a robust fetch function with proper error handling:

```javascript
/**
 * Enhanced fetch function with:
 * - Timeout functionality (default: 5000ms)
 * - Automatic retry on failure (default: 3 attempts)
 * - Proper error handling with different error types
 * - JSON parsing
 */
async function enhancedFetch(url, options = {}) {
  // Your code here
}

// Test it with a real API
async function testEnhancedFetch() {
  try {
    // Test successful fetch
    const data = await enhancedFetch('https://jsonplaceholder.typicode.com/todos/1');
    console.log('Success:', data);
    
    // Test timeout
    const timeoutData = await enhancedFetch('https://httpbin.org/delay/10', { timeout: 2000 });
    console.log('Should not see this:', timeoutData);
  } catch (error) {
    console.error('Error caught:', error.message);
  }
}

testEnhancedFetch();
```

### Exercise 4: React Data Fetching Hook
Implement a custom hook for data fetching with loading, error states and refetch capability:

```jsx
/**
 * Custom hook for data fetching with:
 * - Loading state
 * - Error handling
 * - Data caching
 * - Refetch functionality
 * - Abort on unmount
 */
function useDataFetching(url, options = {}) {
  // Your code here
}

// Example usage in a component
function ExampleComponent() {
  const { 
    data, 
    loading, 
    error, 
    refetch 
  } = useDataFetching('https://jsonplaceholder.typicode.com/users');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <button onClick={refetch}>Refresh Data</button>
      <ul>
        {data && data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Solutions

<details>
<summary>Click to view solutions</summary>

### Exercise 1 Solution:
```javascript
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    // Generate random delay between 500-1500ms
    const delay = Math.floor(Math.random() * 1000) + 500;
    
    setTimeout(() => {
      if (id > 0) {
        // Simulate successful response
        resolve({
          id,
          name: `User ${id}`,
          email: `user${id}@example.com`,
          registeredAt: new Date().toISOString()
        });
      } else {
        // Simulate error
        reject(new Error(`Invalid user ID: ${id}`));
      }
    }, delay);
  });
}
```

### Exercise 2 Solution:
```javascript
async function getUser(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  
  if (!response.ok) {
    throw new Error(`GitHub user not found: ${username}`);
  }
  
  return response.json();
}

async function getRepos(user) {
  const response = await fetch(user.repos_url);
  return response.json();
}

async function getTopRepos(username) {
  try {
    const user = await getUser(username);
    const repos = await getRepos(user);
    
    const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    
    return {
      user,
      topRepos: sortedRepos.slice(0, 5)
    };
  } catch (error) {
    console.error('Error in getTopRepos:', error);
    throw error;
  }
}
```

### Exercise 3 Solution:
```javascript
async function enhancedFetch(url, options = {}) {
  const {
    timeout = 5000,
    retries = 3,
    retryDelay = 1000,
    ...fetchOptions
  } = options;
  
  let lastError;
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      try {
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal
        });
        
        // Clear timeout as fetch completed
        clearTimeout(timeoutId);
        
        // Handle HTTP errors
        if (!response.ok) {
          const errorMessage = `HTTP error! Status: ${response.status}`;
          const error = new Error(errorMessage);
          error.status = response.status;
          error.response = response;
          throw error;
        }
        
        // Parse JSON
        return await response.json();
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error) {
      lastError = error;
      
      // Don't retry if it was aborted or we're on the last attempt
      if (error.name === 'AbortError') {
        throw new Error(`Request timed out after ${timeout}ms`);
      }
      
      if (attempt === retries - 1) {
        break;
      }
      
      // Log retry attempt
      console.warn(`Attempt ${attempt + 1} failed, retrying in ${retryDelay}ms...`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
  
  // All retries failed
  throw new Error(`Failed after ${retries} attempts: ${lastError.message}`);
}
```

### Exercise 4 Solution:
```jsx
function useDataFetching(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0); // Used to trigger refetches
  
  // Keep track of the cache outside of render cycles
  const cache = useRef({});
  
  // Function to trigger a refetch
  const refetch = useCallback(() => {
    setVersion(v => v + 1);
  }, []);
  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    
    async function fetchData() {
      // Only show loading for initial fetch, not refetches if we have data
      if (!data) setLoading(true);
      setError(null);
      
      try {
        // Check the cache if caching is enabled (default: true)
        const shouldUseCache = options.cache !== false && version === 0;
        
        if (shouldUseCache && cache.current[url]) {
          // Use cached data
          if (isMounted) {
            setData(cache.current[url]);
            setLoading(false);
          }
          return;
        }
        
        // Perform the fetch
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Update cache
        if (options.cache !== false) {
          cache.current[url] = result;
        }
        
        // Update state if component is still mounted
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        // Only update error state if this isn't an abort error and component is mounted
        if (isMounted && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        // Update loading state if component is still mounted
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    
    fetchData();
    
    // Cleanup function to run on unmount or when dependencies change
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url, JSON.stringify(options), version]);
  
  return { data, loading, error, refetch };
}
```
</details>
