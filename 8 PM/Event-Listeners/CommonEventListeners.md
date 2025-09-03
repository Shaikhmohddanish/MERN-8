# Common JavaScript Event Listeners with Examples

This guide provides practical examples of the most commonly used event listeners in JavaScript web development, with HTML examples to demonstrate implementation.

## Table of Contents
- [Mouse Events](#mouse-events)
- [Keyboard Events](#keyboard-events)
- [Form Events](#form-events)
- [Document/Window Events](#documentwindow-events)
- [Touch Events](#touch-events)
- [Drag and Drop Events](#drag-and-drop-events)
- [Media Events](#media-events)

## Mouse Events

### click
Triggers when an element is clicked.

**HTML:**
```html
<button id="myButton">Click Me</button>
<div id="output">Results will appear here</div>

<div class="toggle-example">
  <button id="toggleButton">Toggle Content</button>
  <div id="toggleContent" style="display: none;">
    This content can be toggled visible or hidden by clicking the button.
  </div>
</div>
```

**JavaScript:**
```javascript
// Simple click example
const button = document.getElementById('myButton');
button.addEventListener('click', function(e) {
  console.log('Button clicked!');
  document.getElementById('output').textContent = 'Button was clicked at: ' + new Date().toLocaleTimeString();
});

// Toggle visibility example
document.getElementById('toggleButton').addEventListener('click', function() {
  const element = document.getElementById('toggleContent');
  if (element.style.display === 'none' || element.style.display === '') {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
});
```

### dblclick
Triggers when an element is double-clicked.

**HTML:**
```html
<div id="editableText" class="editable-area">
  Double-click this text to edit it
</div>

<style>
  .editable-area {
    padding: 10px;
    border: 1px dashed #ccc;
    min-height: 50px;
  }
  .editing {
    border: 1px solid blue;
    background-color: #f0f8ff;
  }
</style>
```

**JavaScript:**
```javascript
document.getElementById('editableText').addEventListener('dblclick', function(e) {
  // Make text editable on double-click
  this.contentEditable = true;
  this.focus();
  this.classList.add('editing');
});
```

### mouseenter / mouseleave
Triggers when the mouse pointer enters or leaves an element.

**HTML:**
```html
<div class="hover-card">
  <h3>Hover Card Example</h3>
  <div class="card-details" style="display: none;">
    <p>This additional content appears when you hover over the card.</p>
    <p>Move your mouse away to hide it again.</p>
    <button>Learn More</button>
  </div>
</div>

<style>
  .hover-card {
    width: 300px;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  .expanded {
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    transform: translateY(-5px);
    background-color: #fff;
  }
  .card-details {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #ddd;
  }
</style>
```

**JavaScript:**
```javascript
const hoverCard = document.querySelector('.hover-card');

hoverCard.addEventListener('mouseenter', function() {
  this.classList.add('expanded');
  document.querySelector('.card-details').style.display = 'block';
});

hoverCard.addEventListener('mouseleave', function() {
  this.classList.remove('expanded');
  document.querySelector('.card-details').style.display = 'none';
});
```

### mousemove
Triggers continuously as the mouse moves over an element.

**HTML:**
```html
<!-- Mouse follower example -->
<div id="follower" class="cursor-follower"></div>

<!-- Coordinate tracking example -->
<div id="coordinateArea" class="coordinate-area">
  <h3>Move your mouse in this area</h3>
  <div id="coordinates" class="coordinate-display">X: 0, Y: 0</div>
</div>

<style>
  .cursor-follower {
    position: fixed;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(75, 105, 255, 0.5);
    pointer-events: none; /* So it doesn't interfere with other elements */
    transform: translate(-50%, -50%);
    z-index: 9999;
    transition: transform 0.07s ease;
  }
  
  .coordinate-area {
    width: 400px;
    height: 300px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }
  
  .coordinate-display {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: rgba(0,0,0,0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-family: monospace;
  }
</style>
```

**JavaScript:**
```javascript
// Create a following element
const follower = document.getElementById('follower');
document.addEventListener('mousemove', function(e) {
  // Update position with a slight delay for smooth effect
  requestAnimationFrame(function() {
    follower.style.left = (e.clientX - follower.offsetWidth / 2) + 'px';
    follower.style.top = (e.clientY - follower.offsetHeight / 2) + 'px';
  });
});

// Interactive coordinate display
const coordinateArea = document.getElementById('coordinateArea');
const coordinates = document.getElementById('coordinates');

coordinateArea.addEventListener('mousemove', function(e) {
  // Get position relative to the element
  const rect = coordinateArea.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  coordinates.textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
});
```

### contextmenu
Triggers when the right mouse button is clicked.

**HTML:**
```html
<div id="customContextMenu" class="context-area">
  Right-click in this area for a custom menu
</div>

<div id="myContextMenu" class="context-menu">
  <ul>
    <li><a href="#" data-action="view">View</a></li>
    <li><a href="#" data-action="edit">Edit</a></li>
    <li><a href="#" data-action="delete">Delete</a></li>
    <li class="divider"></li>
    <li><a href="#" data-action="properties">Properties</a></li>
  </ul>
</div>

<style>
  .context-area {
    width: 300px;
    height: 200px;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }
  
  .context-menu {
    position: absolute;
    display: none;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
    border-radius: 3px;
    z-index: 1000;
  }
  
  .context-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .context-menu li {
    padding: 8px 12px;
    cursor: pointer;
  }
  
  .context-menu li:hover {
    background-color: #f0f0f0;
  }
  
  .context-menu .divider {
    height: 1px;
    background-color: #ddd;
    padding: 0;
    margin: 5px 0;
  }
</style>
```

**JavaScript:**
```javascript
document.getElementById('customContextMenu').addEventListener('contextmenu', function(e) {
  e.preventDefault(); // Prevent the default context menu
  
  const contextMenu = document.getElementById('myContextMenu');
  
  // Position the custom context menu at the mouse position
  contextMenu.style.left = e.clientX + 'px';
  contextMenu.style.top = e.clientY + 'px';
  contextMenu.style.display = 'block';
  
  // Hide the menu when clicking elsewhere
  document.addEventListener('click', function hideMenu() {
    contextMenu.style.display = 'none';
    document.removeEventListener('click', hideMenu);
  });
});
```

## Keyboard Events

### keydown / keyup
Triggers when a key is pressed down or released.

**HTML:**
```html
<div class="keyboard-demo">
  <h3>Keyboard Event Demo</h3>
  <input type="text" id="keyInput" placeholder="Type something..." autofocus>
  <div id="keyOutput" class="key-display">Press any key</div>
  
  <div class="arrow-navigation">
    <h4>Arrow Key Navigation</h4>
    <div class="image-gallery">
      <div class="gallery-item active">Image 1</div>
      <div class="gallery-item">Image 2</div>
      <div class="gallery-item">Image 3</div>
      <div class="gallery-item">Image 4</div>
    </div>
    <p class="instructions">Use left/right arrow keys to navigate</p>
  </div>
</div>

<style>
  .keyboard-demo {
    width: 500px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .key-display {
    margin-top: 10px;
    padding: 15px;
    background-color: #333;
    color: #0f0;
    font-family: monospace;
    border-radius: 4px;
    min-height: 20px;
  }
  
  .image-gallery {
    display: flex;
    overflow: hidden;
    margin: 20px 0;
    position: relative;
    height: 100px;
    border: 1px solid #ddd;
  }
  
  .gallery-item {
    flex: 0 0 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    background-color: #eee;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .gallery-item.active {
    opacity: 1;
    z-index: 1;
  }
  
  .instructions {
    font-style: italic;
    color: #666;
    text-align: center;
  }
</style>
```

**JavaScript:**
```javascript
// Simple keypress logger
document.getElementById('keyInput').addEventListener('keydown', function(e) {
  document.getElementById('keyOutput').textContent = `Key pressed: ${e.key} (Code: ${e.code})`;
});

// Arrow key navigation
document.addEventListener('keydown', function(e) {
  const gallery = document.querySelector('.image-gallery');
  const currentImage = gallery.querySelector('.active');
  let nextImage;
  
  switch(e.key) {
    case 'ArrowLeft':
      nextImage = currentImage.previousElementSibling || gallery.lastElementChild;
      break;
    case 'ArrowRight':
      nextImage = currentImage.nextElementSibling || gallery.firstElementChild;
      break;
    default:
      return; // Exit for other keys
  }
  
  currentImage.classList.remove('active');
  nextImage.classList.add('active');
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl+S to save
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault(); // Prevent browser save dialog
    saveDocument();
  }
  
  // Ctrl+/ to toggle comments
  if (e.ctrlKey && e.key === '/') {
    e.preventDefault();
    toggleComments();
  }
});
```

### input
Triggers when the value of an input element changes.

**HTML:**
```html
<div class="input-demo">
  <h3>Character Counter</h3>
  <div class="textarea-container">
    <textarea id="messageInput" maxlength="280" placeholder="Type your message..."></textarea>
    <div id="charCounter" class="counter">280 characters remaining</div>
  </div>
  
  <h3>Live Search</h3>
  <div class="search-container">
    <input type="text" id="searchInput" placeholder="Search items...">
    <div class="search-stats">Results: <span id="resultCount">5</span></div>
    
    <ul class="search-results">
      <li class="search-item">Apple</li>
      <li class="search-item">Banana</li>
      <li class="search-item">Cherry</li>
      <li class="search-item">Date</li>
      <li class="search-item">Elderberry</li>
    </ul>
  </div>
</div>

<style>
  .input-demo {
    width: 500px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .textarea-container {
    position: relative;
    margin-bottom: 30px;
  }
  
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
    font-family: sans-serif;
  }
  
  .counter {
    position: absolute;
    bottom: -25px;
    right: 0;
    font-size: 0.9em;
    color: #666;
  }
  
  .counter.error, textarea.error {
    color: #d9534f;
    border-color: #d9534f;
  }
  
  .search-container {
    margin-top: 20px;
  }
  
  .search-stats {
    margin: 10px 0;
    font-size: 0.9em;
    color: #666;
  }
  
  .search-results {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  
  .search-item {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
  }
  
  .search-item:last-child {
    border-bottom: none;
  }
</style>
```

**JavaScript:**
```javascript
// Real-time character counter
const textarea = document.getElementById('messageInput');
const counter = document.getElementById('charCounter');
const maxLength = 280;

textarea.addEventListener('input', function() {
  const remaining = maxLength - this.value.length;
  counter.textContent = `${remaining} characters remaining`;
  
  if (remaining < 0) {
    counter.classList.add('error');
    textarea.classList.add('error');
  } else {
    counter.classList.remove('error');
    textarea.classList.remove('error');
  }
});

// Real-time search filter
document.getElementById('searchInput').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const items = document.querySelectorAll('.search-item');
  
  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  
  document.getElementById('resultCount').textContent = 
    document.querySelectorAll('.search-item[style="display: block"]').length;
});
```

## Form Events

### submit
Triggers when a form is submitted.

**HTML:**
```html
<div class="form-container">
  <h2>Registration Form</h2>
  <form id="registrationForm">
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" required>
    </div>
    
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required>
    </div>
    
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required>
    </div>
    
    <div class="form-group">
      <label for="confirmPassword">Confirm Password</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required>
    </div>
    
    <div id="formErrors" class="error-message"></div>
    
    <button type="submit" class="submit-btn">Register</button>
  </form>
</div>

<style>
  .form-container {
    max-width: 500px;
    padding: 25px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .error-message {
    color: #dc3545;
    margin: 10px 0;
    padding: 10px;
    background-color: rgba(220, 53, 69, 0.1);
    border-radius: 4px;
    display: none;
  }
  
  .error-message:not(:empty) {
    display: block;
  }
  
  .submit-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
  }
  
  .submit-btn:hover {
    background-color: #0069d9;
  }
</style>
```

**JavaScript:**
```javascript
document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission
  
  // Form validation
  const username = this.querySelector('#username').value;
  const password = this.querySelector('#password').value;
  const confirmation = this.querySelector('#confirmPassword').value;
  const errorElement = document.getElementById('formErrors');
  
  // Clear previous errors
  errorElement.textContent = '';
  
  // Validation checks
  if (username.length < 3) {
    errorElement.textContent = 'Username must be at least 3 characters';
    return;
  }
  
  if (password.length < 8) {
    errorElement.textContent = 'Password must be at least 8 characters';
    return;
  }
  
  if (password !== confirmation) {
    errorElement.textContent = 'Passwords do not match';
    return;
  }
  
  // If validation passes, submit the form data
  const formData = new FormData(this);
  fetch('/api/register', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      window.location.href = '/dashboard';
    } else {
      errorElement.textContent = data.message;
    }
  });
});
```

### change
Triggers when an input's value changes and it loses focus.

```javascript
// Color theme switcher
document.getElementById('themeSelector').addEventListener('change', function() {
  document.body.className = ''; // Reset classes
  document.body.classList.add(this.value);
  localStorage.setItem('theme', this.value);
});

// Image preview on file select
document.getElementById('imageUpload').addEventListener('change', function() {
  const preview = document.getElementById('imagePreview');
  const file = this.files[0];
  
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    }
    
    reader.readAsDataURL(file);
  } else {
    preview.style.display = 'none';
  }
});
```

### focus / blur
Triggers when an element gains or loses focus.

**HTML:**
```html
<div class="floating-label-form">
  <h3>Enhanced Form Fields</h3>
  <div class="form-field">
    <input type="text" id="name" class="form-input" data-required="true">
    <label for="name">Your Name</label>
    <div class="error-message"></div>
  </div>
  
  <div class="form-field">
    <input type="email" id="email" class="form-input" data-required="true">
    <label for="email">Your Email</label>
    <div class="error-message"></div>
  </div>
  
  <div class="form-field">
    <input type="text" id="subject" class="form-input">
    <label for="subject">Subject (Optional)</label>
    <div class="error-message"></div>
  </div>
</div>

<style>
  .floating-label-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  .form-field {
    position: relative;
    margin-bottom: 25px;
  }
  
  .form-input {
    width: 100%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid #ddd;
    background-color: transparent;
    font-size: 16px;
    outline: none;
  }
  
  .form-field label {
    position: absolute;
    top: 10px;
    left: 0;
    font-size: 16px;
    color: #777;
    transition: all 0.3s ease;
    pointer-events: none;
  }
  
  .form-input:focus {
    border-bottom: 2px solid #4285f4;
  }
  
  .form-field label.active,
  .form-input:focus + label {
    top: -20px;
    font-size: 12px;
    color: #4285f4;
  }
  
  .form-input.error {
    border-bottom: 2px solid #f44336;
  }
  
  .error-message {
    font-size: 12px;
    color: #f44336;
    margin-top: 5px;
  }
</style>
```

**JavaScript:**
```javascript
// Enhanced form labels
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.querySelector('label').classList.add('active');
  });
  
  input.addEventListener('blur', function() {
    if (this.value === '') {
      this.parentElement.querySelector('label').classList.remove('active');
    }
    
    // Validate on blur
    if (this.hasAttribute('data-required') && this.value === '') {
      this.classList.add('error');
      this.parentElement.querySelector('.error-message').textContent = 'This field is required';
    } else {
      this.classList.remove('error');
      this.parentElement.querySelector('.error-message').textContent = '';
    }
  });
});
```

## Document/Window Events

### load
Triggers when the page and all resources are fully loaded.

**HTML:**
```html
<div class="page-loader">
  <div id="loadingSpinner" class="spinner"></div>
  <div id="mainContent" class="content" style="display: none;">
    <h1>Welcome to My Website</h1>
    <p>This content is displayed after all resources have loaded.</p>
    <div class="carousel">
      <img src="image1.jpg" alt="Carousel Image 1">
      <img src="image2.jpg" alt="Carousel Image 2">
      <img src="image3.jpg" alt="Carousel Image 3">
    </div>
  </div>
</div>

<style>
  .page-loader {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #007bff;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .content {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .carousel {
    margin-top: 30px;
    overflow: hidden;
    position: relative;
    height: 300px;
  }
  
  .carousel img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1s ease;
  }
  
  .carousel img:first-child {
    opacity: 1;
  }
</style>
```

**JavaScript:**
```javascript
window.addEventListener('load', function() {
  // Hide loading spinner
  document.getElementById('loadingSpinner').style.display = 'none';
  
  // Show content
  document.getElementById('mainContent').style.display = 'block';
  
  // Initialize components
  initializeCarousel();
  loadSavedPreferences();
});

// Example function to initialize carousel
function initializeCarousel() {
  const images = document.querySelectorAll('.carousel img');
  let currentIndex = 0;
  
  setInterval(() => {
    images[currentIndex].style.opacity = 0;
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].style.opacity = 1;
  }, 3000);
}

function loadSavedPreferences() {
  // Example function to load user preferences from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme);
  }
}
```

### DOMContentLoaded
Triggers when the HTML document has been completely parsed, without waiting for stylesheets, images, and subframes to finish loading.

**HTML:**
```html
<div class="site-wrapper">
  <nav class="main-nav">
    <button id="navToggle" class="nav-toggle" aria-label="Toggle Navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="nav-menu">
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>
  
  <main>
    <h1>DOMContentLoaded Example</h1>
    <p>This page demonstrates the difference between DOMContentLoaded and load events.</p>
    <button id="themeSwitcher">Toggle Dark Mode</button>
  </main>
</div>

<style>
  .main-nav {
    background-color: #f8f9fa;
    padding: 1rem;
    position: relative;
  }
  
  .nav-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .nav-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 5px 0;
    transition: all 0.3s ease;
  }
  
  .nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-menu li {
    margin-right: 20px;
  }
  
  .dark-mode {
    background-color: #222;
    color: #f8f9fa;
  }
  
  .dark-mode .main-nav {
    background-color: #333;
  }
  
  .dark-mode .nav-toggle span {
    background-color: #f8f9fa;
  }
  
  @media (max-width: 768px) {
    .nav-toggle {
      display: block;
    }
    
    .nav-menu {
      display: none;
      flex-direction: column;
      width: 100%;
    }
    
    .nav-menu.expanded {
      display: flex;
    }
    
    .nav-menu li {
      margin: 10px 0;
    }
  }
</style>
```

**JavaScript:**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize UI elements that don't depend on external resources
  const navToggle = document.getElementById('navToggle');
  
  navToggle.addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('expanded');
  });
  
  // Check for stored user preferences
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  
  // Set up theme switcher
  document.getElementById('themeSwitcher').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
});
```

### resize
Triggers when the browser window is resized.

**HTML:**
```html
<div class="responsive-demo">
  <h2>Resize Your Browser Window</h2>
  <p>Current window size: <span id="windowSize"></span></p>
  
  <div class="grid-layout">
    <div class="responsive-element">Box 1</div>
    <div class="responsive-element">Box 2</div>
    <div class="responsive-element">Box 3</div>
    <div class="responsive-element">Box 4</div>
  </div>
</div>

<style>
  .responsive-demo {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }
  
  .grid-layout {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-top: 20px;
  }
  
  .responsive-element {
    background-color: #6c757d;
    color: white;
    padding: 30px;
    text-align: center;
    border-radius: 4px;
    font-weight: bold;
  }
  
  /* Mobile styles */
  .responsive-element.mobile {
    background-color: #007bff;
  }
  
  @media (max-width: 768px) {
    .grid-layout {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 480px) {
    .grid-layout {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**JavaScript:**
```javascript
// Display current window size
function updateWindowSize() {
  document.getElementById('windowSize').textContent = 
    window.innerWidth + 'px × ' + window.innerHeight + 'px';
}

// Update on initial load
updateWindowSize();

// Responsive layout adjustments
window.addEventListener('resize', function() {
  const width = window.innerWidth;
  const elements = document.querySelectorAll('.responsive-element');
  
  // Update the displayed window size
  updateWindowSize();
  
  if (width < 768) {
    elements.forEach(el => el.classList.add('mobile'));
  } else {
    elements.forEach(el => el.classList.remove('mobile'));
  }
});

// Debounced resize handler for performance
function debounce(func, wait) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), wait);
  };
}

const recalculateGridLayout = function() {
  console.log('Recalculating grid layout...');
  // Simulate a complex layout calculation
  const grid = document.querySelector('.grid-layout');
  // Add animation class
  grid.classList.add('recalculating');
  // Remove it after a delay
  setTimeout(() => grid.classList.remove('recalculating'), 300);
};

const updateLayout = debounce(function() {
  console.log('Window resized to: ' + window.innerWidth + 'x' + window.innerHeight);
  recalculateGridLayout();
}, 250);

window.addEventListener('resize', updateLayout);
```

### scroll
Triggers when the document or an element is scrolled.

**HTML:**
```html
<div class="scroll-demo">
  <header id="stickyHeader">Sticky Header</header>
  
  <div class="content-section">
    <h2>Scroll Effects Demo</h2>
    <p>Scroll down to see various scroll-based effects.</p>
  </div>
  
  <div class="lazy-load-section">
    <h3>Lazy Loading Images</h3>
    <div class="image-container">
      <img data-src="image1.jpg" src="placeholder.jpg" class="lazy-image" alt="Lazy loaded image 1">
      <img data-src="image2.jpg" src="placeholder.jpg" class="lazy-image" alt="Lazy loaded image 2">
      <img data-src="image3.jpg" src="placeholder.jpg" class="lazy-image" alt="Lazy loaded image 3">
      <img data-src="image4.jpg" src="placeholder.jpg" class="lazy-image" alt="Lazy loaded image 4">
    </div>
  </div>
  
  <div class="scroll-indicator">
    <div class="progress-bar" id="scrollProgress"></div>
  </div>
</div>

<style>
  .scroll-demo {
    height: 2000px; /* Create scrollable content */
    position: relative;
    padding-top: 70px;
  }
  
  header {
    background-color: #fff;
    padding: 20px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: all 0.3s ease;
    z-index: 100;
  }
  
  header.sticky {
    position: fixed;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    background-color: #f8f9fa;
  }
  
  .content-section {
    padding: 50px 20px;
    text-align: center;
  }
  
  .lazy-load-section {
    padding: 50px 20px;
    margin-top: 800px; /* Place this section far down the page */
  }
  
  .image-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
  }
  
  .lazy-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }
  
  .lazy-image.loaded {
    opacity: 1;
  }
  
  .scroll-indicator {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: rgba(0,0,0,0.1);
    z-index: 1000;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #4caf50;
    width: 0%;
    transition: width 0.1s ease;
  }
</style>
```

**JavaScript:**
```javascript
// Sticky header
window.addEventListener('scroll', function() {
  const header = document.getElementById('stickyHeader');
  if (window.scrollY > 100) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
  
  // Update scroll progress indicator
  const scrollProgress = document.getElementById('scrollProgress');
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  scrollProgress.style.width = progress + '%';
});

// Lazy loading images
document.addEventListener('scroll', function() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  lazyImages.forEach(img => {
    if (isElementInViewport(img)) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      img.classList.add('loaded');
    }
  });
});

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
```

## Touch Events

### touchstart / touchend / touchmove
Triggers when a touch point is placed, removed, or moved on the touch surface.

**HTML:**
```html
<div class="touch-demos">
  <div id="swipeArea" class="swipe-area">
    <div class="swipe-content">
      <h3>Swipe Detection</h3>
      <p>Swipe left, right, up, or down</p>
      <div id="swipeResult" class="swipe-result"></div>
    </div>
  </div>
  
  <div class="touch-slider-container">
    <h3>Touch Slider</h3>
    <div class="touch-slider" id="touchSlider">
      <div class="slide-item">Slide 1</div>
      <div class="slide-item">Slide 2</div>
      <div class="slide-item">Slide 3</div>
      <div class="slide-item">Slide 4</div>
      <div class="slide-item">Slide 5</div>
    </div>
  </div>
</div>

<style>
  .touch-demos {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .swipe-area {
    height: 200px;
    background-color: #e9ecef;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    overflow: hidden;
    position: relative;
  }
  
  .swipe-content {
    text-align: center;
    padding: 20px;
    transition: transform 0.3s ease;
  }
  
  .swipe-result {
    font-weight: bold;
    margin-top: 20px;
    min-height: 20px;
  }
  
  .touch-slider-container {
    padding: 20px 0;
  }
  
  .touch-slider {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
  }
  
  .touch-slider::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
  
  .slide-item {
    flex: 0 0 80%;
    scroll-snap-align: center;
    height: 200px;
    margin-right: 20px;
    background-color: #007bff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    border-radius: 8px;
  }
  
  .touch-slider.active {
    cursor: grabbing;
  }
</style>
```

**JavaScript:**
```javascript
// Swipe detection
let startX, startY;

document.getElementById('swipeArea').addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.getElementById('swipeArea').addEventListener('touchend', function(e) {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  
  const diffX = endX - startX;
  const diffY = endY - startY;
  
  const swipeResult = document.getElementById('swipeResult');
  
  // Determine if it was a horizontal or vertical swipe
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 50) {
      swipeResult.textContent = 'Swiped right';
      this.querySelector('.swipe-content').style.transform = 'translateX(10px)';
      setTimeout(() => this.querySelector('.swipe-content').style.transform = '', 300);
    } else if (diffX < -50) {
      swipeResult.textContent = 'Swiped left';
      this.querySelector('.swipe-content').style.transform = 'translateX(-10px)';
      setTimeout(() => this.querySelector('.swipe-content').style.transform = '', 300);
    }
  } else {
    if (diffY > 50) {
      swipeResult.textContent = 'Swiped down';
      this.querySelector('.swipe-content').style.transform = 'translateY(10px)';
      setTimeout(() => this.querySelector('.swipe-content').style.transform = '', 300);
    } else if (diffY < -50) {
      swipeResult.textContent = 'Swiped up';
      this.querySelector('.swipe-content').style.transform = 'translateY(-10px)';
      setTimeout(() => this.querySelector('.swipe-content').style.transform = '', 300);
    }
  }
});

// Mobile slider
const slider = document.querySelector('.touch-slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('touchstart', function(e) {
  isDown = true;
  slider.classList.add('active');
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchend', function() {
  isDown = false;
  slider.classList.remove('active');
  
  // Snap to closest item
  const itemWidth = slider.querySelector('.slide-item').offsetWidth;
  const position = slider.scrollLeft;
  const nearestItem = Math.round(position / itemWidth);
  
  slider.scrollTo({
    left: nearestItem * itemWidth,
    behavior: 'smooth'
  });
});

slider.addEventListener('touchmove', function(e) {
  if (!isDown) return;
  e.preventDefault();
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // Faster scrolling
  slider.scrollLeft = scrollLeft - walk;
});

// Mobile slider
const slider = document.querySelector('.touch-slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('touchstart', function(e) {
  isDown = true;
  slider.classList.add('active');
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchend', function() {
  isDown = false;
  slider.classList.remove('active');
  
  // Snap to closest item
  const itemWidth = slider.querySelector('.slide-item').offsetWidth;
  const position = slider.scrollLeft;
  const nearestItem = Math.round(position / itemWidth);
  
  slider.scrollTo({
    left: nearestItem * itemWidth,
    behavior: 'smooth'
  });
});

slider.addEventListener('touchmove', function(e) {
  if (!isDown) return;
  e.preventDefault();
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // Faster scrolling
  slider.scrollLeft = scrollLeft - walk;
});
```

## Drag and Drop Events

### dragstart / dragend / dragover / drop
Events that enable drag and drop functionality.

```javascript
// Basic drag and drop
const draggable = document.getElementById('draggableItem');
const dropzones = document.querySelectorAll('.dropzone');

draggable.addEventListener('dragstart', function(e) {
  e.dataTransfer.setData('text/plain', this.id);
  this.classList.add('dragging');
  
  // For Firefox compatibility
  e.dataTransfer.effectAllowed = 'move';
});

draggable.addEventListener('dragend', function() {
  this.classList.remove('dragging');
});

dropzones.forEach(zone => {
  zone.addEventListener('dragover', function(e) {
    e.preventDefault(); // Allow drop
    this.classList.add('drop-hover');
  });
  
  zone.addEventListener('dragleave', function() {
    this.classList.remove('drop-hover');
  });
  
  zone.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('drop-hover');
    
    const id = e.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);
    
    // Append the dragged element to the drop zone
    this.appendChild(draggableElement);
    
    // Optionally save the new state
    savePosition(id, this.id);
  });
});

// Drag and drop for task management
document.querySelectorAll('.task-item').forEach(task => {
  task.setAttribute('draggable', true);
  
  task.addEventListener('dragstart', function(e) {
    e.dataTransfer.setData('text/plain', this.id);
    e.dataTransfer.setData('source-column', this.parentElement.id);
  });
});

document.querySelectorAll('.task-column').forEach(column => {
  column.addEventListener('dragover', function(e) {
    e.preventDefault();
  });
  
  column.addEventListener('drop', function(e) {
    e.preventDefault();
    
    const taskId = e.dataTransfer.getData('text/plain');
    const sourceColumnId = e.dataTransfer.getData('source-column');
    const task = document.getElementById(taskId);
    
    // Move task to new column
    this.querySelector('.task-list').appendChild(task);
    
    // Update task status in database
    updateTaskStatus(taskId, this.dataset.status, sourceColumnId);
  });
});
```

## Media Events

### play / pause / ended
Events for audio and video elements.

```javascript
const video = document.getElementById('myVideo');
const playButton = document.getElementById('playButton');
const progress = document.getElementById('videoProgress');

// Play/Pause toggle
playButton.addEventListener('click', function() {
  if (video.paused) {
    video.play();
    this.textContent = 'Pause';
  } else {
    video.pause();
    this.textContent = 'Play';
  }
});

// Update play button when video state changes
video.addEventListener('play', function() {
  playButton.textContent = 'Pause';
  playButton.classList.add('playing');
});

video.addEventListener('pause', function() {
  playButton.textContent = 'Play';
  playButton.classList.remove('playing');
});

// Update progress bar
video.addEventListener('timeupdate', function() {
  const percent = (video.currentTime / video.duration) * 100;
  progress.style.width = percent + '%';
  
  document.getElementById('currentTime').textContent = 
    formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
});

// Handle video end
video.addEventListener('ended', function() {
  playButton.textContent = 'Replay';
  progress.style.width = '0%';
  
  // If playlist, play next video
  const nextVideo = document.querySelector('.playlist-item.next');
  if (nextVideo) {
    video.src = nextVideo.dataset.src;
    video.play();
    
    // Update active item in playlist
    document.querySelector('.playlist-item.active').classList.remove('active');
    nextVideo.classList.add('active');
    nextVideo.classList.remove('next');
    nextVideo.nextElementSibling?.classList.add('next');
  }
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' + secs : secs}`;
}
```

## Complete Examples

### Interactive Image Gallery

```html
<div class="gallery-container">
  <div class="main-image">
    <img id="featured" src="images/image1.jpg" alt="Featured Image">
  </div>
  <div class="thumbnails">
    <img src="images/image1.jpg" alt="Thumbnail 1" data-full="images/image1.jpg">
    <img src="images/image2.jpg" alt="Thumbnail 2" data-full="images/image2.jpg">
    <img src="images/image3.jpg" alt="Thumbnail 3" data-full="images/image3.jpg">
    <img src="images/image4.jpg" alt="Thumbnail 4" data-full="images/image4.jpg">
  </div>
  <div class="controls">
    <button id="prevBtn">Previous</button>
    <button id="nextBtn">Next</button>
  </div>
</div>
```

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const featured = document.getElementById('featured');
  const thumbnails = document.querySelectorAll('.thumbnails img');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  let currentIndex = 0;
  
  // Set up thumbnail click events
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', function() {
      featured.src = this.getAttribute('data-full');
      currentIndex = index;
      highlightThumbnail();
    });
  });
  
  // Highlight active thumbnail
  function highlightThumbnail() {
    thumbnails.forEach(t => t.classList.remove('active'));
    thumbnails[currentIndex].classList.add('active');
  }
  
  // Set up navigation buttons
  prevBtn.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    featured.src = thumbnails[currentIndex].getAttribute('data-full');
    highlightThumbnail();
  });
  
  nextBtn.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    featured.src = thumbnails[currentIndex].getAttribute('data-full');
    highlightThumbnail();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });
  
  // Initialize
  highlightThumbnail();
});
```

### To-Do List with Event Delegation

```html
<div class="todo-app">
  <form id="taskForm">
    <input type="text" id="taskInput" placeholder="Add a new task">
    <button type="submit">Add</button>
  </form>
  
  <ul id="taskList">
    <!-- Tasks will be added here -->
  </ul>
  
  <div class="filters">
    <button data-filter="all" class="active">All</button>
    <button data-filter="active">Active</button>
    <button data-filter="completed">Completed</button>
  </div>
</div>
```

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');
  const filters = document.querySelector('.filters');
  
  // Add new task
  taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const task = taskInput.value.trim();
    if (task === '') return;
    
    addTask(task);
    taskInput.value = '';
  });
  
  // Using event delegation for task list actions
  taskList.addEventListener('click', function(e) {
    const target = e.target;
    const taskItem = target.closest('li');
    
    if (!taskItem) return;
    
    // Handle checkbox clicks
    if (target.classList.contains('task-checkbox')) {
      taskItem.classList.toggle('completed');
      updateTaskCount();
      saveTasksToLocalStorage();
    }
    
    // Handle delete button clicks
    if (target.classList.contains('delete-btn')) {
      taskItem.remove();
      updateTaskCount();
      saveTasksToLocalStorage();
    }
    
    // Handle edit button clicks
    if (target.classList.contains('edit-btn')) {
      const taskText = taskItem.querySelector('.task-text');
      const currentText = taskText.textContent;
      
      const input = document.createElement('input');
      input.type = 'text';
      input.value = currentText;
      input.classList.add('edit-input');
      
      taskText.replaceWith(input);
      input.focus();
      
      // Save on blur or Enter key
      input.addEventListener('blur', saveEdit);
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          saveEdit.call(this);
        }
      });
      
      function saveEdit() {
        const newText = this.value.trim();
        const newTaskText = document.createElement('span');
        newTaskText.classList.add('task-text');
        newTaskText.textContent = newText || currentText;
        
        this.replaceWith(newTaskText);
        saveTasksToLocalStorage();
      }
    }
  });
  
  // Filter tasks
  filters.addEventListener('click', function(e) {
    if (e.target.tagName !== 'BUTTON') return;
    
    // Update active filter button
    document.querySelector('.filters button.active').classList.remove('active');
    e.target.classList.add('active');
    
    const filter = e.target.getAttribute('data-filter');
    filterTasks(filter);
  });
  
  // Function to add a new task
  function addTask(text, completed = false) {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${completed ? 'checked' : ''}>
      <span class="task-text">${text}</span>
      <div class="task-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    
    if (completed) {
      li.classList.add('completed');
    }
    
    taskList.appendChild(li);
    updateTaskCount();
    saveTasksToLocalStorage();
  }
  
  // Filter tasks based on status
  function filterTasks(filter) {
    const tasks = taskList.querySelectorAll('li');
    
    tasks.forEach(task => {
      switch(filter) {
        case 'all':
          task.style.display = 'flex';
          break;
        case 'active':
          task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
          break;
        case 'completed':
          task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
          break;
      }
    });
  }
  
  // Update task count
  function updateTaskCount() {
    const total = taskList.querySelectorAll('li').length;
    const completed = taskList.querySelectorAll('li.completed').length;
    
    const counter = document.querySelector('.task-counter') || 
                   (() => {
                     const counter = document.createElement('div');
                     counter.classList.add('task-counter');
                     document.querySelector('.todo-app').appendChild(counter);
                     return counter;
                   })();
    
    counter.textContent = `${completed}/${total} tasks completed`;
  }
  
  // Save tasks to localStorage
  function saveTasksToLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
      tasks.push({
        text: task.querySelector('.task-text').textContent,
        completed: task.classList.contains('completed')
      });
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Load tasks from localStorage
  function loadTasksFromLocalStorage() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    if (savedTasks.length > 0) {
      savedTasks.forEach(task => {
        addTask(task.text, task.completed);
      });
    }
  }
  
  // Initialize the app
  loadTasksFromLocalStorage();
  updateTaskCount();
});
```

This file provides practical and reusable code examples for the most commonly used event listeners in JavaScript web development. Each example demonstrates real-world usage patterns that you can adapt for your own projects.
