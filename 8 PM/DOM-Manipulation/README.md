# DOM Manipulation in JavaScript

DOM manipulation is the process of modifying the Document Object Model (DOM) of a web page using JavaScript. This allows developers to dynamically change the content, structure, and style of a web page without reloading it.

## Table of Contents

1. [Content Manipulation](#content-manipulation)
2. [Attribute Manipulation](#attribute-manipulation)
3. [Style Manipulation](#style-manipulation)
4. [Creating and Deleting Elements](#creating-and-deleting-elements)
5. [DOM Traversal](#dom-traversal)
6. [Event-Driven Manipulation](#event-driven-manipulation)
7. [Best Practices](#best-practices)

## Content Manipulation

Content manipulation involves changing the text or HTML content of elements.

### textContent

The `textContent` property sets or returns the text content of a node and all its descendants.

```javascript
// Get text content
const text = element.textContent;

// Set text content
element.textContent = "New text content";
```

- **Characteristics**:
  - Returns all text content, including text in `<script>` and `<style>` elements
  - Ignores HTML tags when setting content
  - Preserves whitespace and line breaks

### innerHTML

The `innerHTML` property sets or returns the HTML content inside an element.

```javascript
// Get HTML content
const html = element.innerHTML;

// Set HTML content
element.innerHTML = "<span>New HTML content</span>";
```

- **Characteristics**:
  - Parses the content as HTML, creating elements from tags
  - Can introduce security risks if used with user-provided content (XSS attacks)
  - More performance-intensive than textContent

### innerText

The `innerText` property sets or returns the visible text content of an element.

```javascript
// Get visible text
const visibleText = element.innerText;

// Set text
element.innerText = "New visible text";
```

- **Characteristics**:
  - Only returns visible text (affected by CSS)
  - Preserves some formatting like line breaks
  - Triggers a reflow when read (performance impact)

## Attribute Manipulation

Attributes are additional information stored within HTML tags. JavaScript provides several methods for working with attributes.

### Standard Attributes

```javascript
// Get attribute
const value = element.getAttribute("attribute-name");

// Set attribute
element.setAttribute("attribute-name", "value");

// Check if attribute exists
const hasAttribute = element.hasAttribute("attribute-name");

// Remove attribute
element.removeAttribute("attribute-name");
```

### Properties vs. Attributes

Many HTML attributes have corresponding DOM properties:

```javascript
// Using attribute method
element.setAttribute("class", "my-class");

// Using property directly
element.className = "my-class";
```

Some common property-attribute pairs:
- `id` attribute → `id` property
- `class` attribute → `className` property
- `value` attribute → `value` property (for form elements)
- `href` attribute → `href` property (for anchor elements)

### Data Attributes

HTML5 introduced data attributes for storing custom data:

```html
<div id="user" data-id="123" data-role="admin"></div>
```

```javascript
const user = document.getElementById("user");

// Get data attribute
const userId = user.dataset.id; // "123"
const userRole = user.dataset.role; // "admin"

// Set data attribute
user.dataset.status = "active";
```

## Style Manipulation

There are three main ways to manipulate CSS styles with JavaScript.

### Inline Styles

The `style` property allows you to set inline styles directly:

```javascript
// Set a single style
element.style.color = "red";
element.style.fontSize = "16px"; // Note the camelCase

// Set multiple styles
Object.assign(element.style, {
    backgroundColor: "black",
    padding: "10px",
    borderRadius: "5px"
});
```

- **Characteristics**:
  - Highest specificity in CSS cascade
  - Adds inline styles directly to the element
  - Property names use camelCase instead of kebab-case (e.g., `backgroundColor` not `background-color`)

### CSS Classes

Manipulating CSS classes is often a better approach than inline styles:

```javascript
// Add class
element.classList.add("highlight");

// Remove class
element.classList.remove("inactive");

// Toggle class (add if not present, remove if present)
element.classList.toggle("selected");

// Replace class
element.classList.replace("old-class", "new-class");

// Check if class exists
const hasClass = element.classList.contains("active");
```

- **Characteristics**:
  - More maintainable than inline styles
  - Allows for easy application of predefined style sets
  - Better performance when changing multiple styles at once

### Computed Styles

To get the actual applied styles (after CSS rules are applied):

```javascript
const computedStyle = window.getComputedStyle(element);
const color = computedStyle.color;
const fontSize = computedStyle.fontSize;
```

- **Characteristics**:
  - Read-only (can't set computed styles)
  - Returns the final used values of all CSS properties
  - Useful for calculations based on current styles

## Creating and Deleting Elements

### Creating Elements

```javascript
// Create a new element
const newElement = document.createElement("div");

// Set content and attributes
newElement.textContent = "New Element";
newElement.className = "my-class";
newElement.setAttribute("data-id", "123");
```

### Adding Elements to the DOM

```javascript
// Append as the last child
parentElement.appendChild(newElement);

// Prepend as the first child
parentElement.prepend(newElement);

// Insert before a specific element
parentElement.insertBefore(newElement, referenceElement);

// Insert at a specific position
parentElement.insertAdjacentElement("beforebegin", newElement); // Before the element itself
parentElement.insertAdjacentElement("afterbegin", newElement);  // Just inside, before first child
parentElement.insertAdjacentElement("beforeend", newElement);   // Just inside, after last child
parentElement.insertAdjacentElement("afterend", newElement);    // After the element itself
```

### Removing Elements

```javascript
// Remove an element (modern method)
element.remove();

// Remove a child element (traditional method)
parentElement.removeChild(childElement);
```

### Cloning Elements

```javascript
// Clone without children
const shallowClone = element.cloneNode(false);

// Clone with all descendants
const deepClone = element.cloneNode(true);
```

### Creating Document Fragments

Document fragments are useful for batch operations:

```javascript
// Create a document fragment
const fragment = document.createDocumentFragment();

// Add multiple elements to the fragment
for (let i = 0; i < 10; i++) {
    const li = document.createElement("li");
    li.textContent = `Item ${i}`;
    fragment.appendChild(li);
}

// Add the fragment to the DOM (only one reflow)
document.getElementById("list").appendChild(fragment);
```

## DOM Traversal

Navigating through the DOM structure.

### Parent Relationships

```javascript
// Get parent node
const parent = element.parentNode;

// Get parent element (excludes non-element parents)
const parentElement = element.parentElement;
```

### Child Relationships

```javascript
// Get all child nodes (including text nodes, comments, etc.)
const childNodes = element.childNodes;

// Get child elements only
const children = element.children;

// Get first and last child node
const firstChild = element.firstChild;
const lastChild = element.lastChild;

// Get first and last child element
const firstElementChild = element.firstElementChild;
const lastElementChild = element.lastElementChild;
```

### Sibling Relationships

```javascript
// Get next and previous sibling nodes
const nextSibling = element.nextSibling;
const previousSibling = element.previousSibling;

// Get next and previous sibling elements
const nextElementSibling = element.nextElementSibling;
const previousElementSibling = element.previousElementSibling;
```

## Event-Driven Manipulation

DOM manipulation is often triggered by events.

### Basic Event Handling

```javascript
// Add event listener
element.addEventListener("click", function(event) {
    // Manipulate DOM in response to event
    this.classList.toggle("active");
    
    // Access event information
    console.log(event.target);
    console.log(event.currentTarget);
    
    // Prevent default behavior
    event.preventDefault();
    
    // Stop propagation
    event.stopPropagation();
});

// Remove event listener
element.removeEventListener("click", handlerFunction);
```

### Event Delegation

Handling events at a higher level in the DOM:

```javascript
// Add a single event listener to a parent
document.getElementById("list").addEventListener("click", function(event) {
    // Check if the clicked element is a list item
    if (event.target.tagName === "LI") {
        // Manipulate the clicked item
        event.target.classList.toggle("selected");
    }
});
```

## Best Practices

### Performance Optimization

1. **Minimize DOM manipulations**:
   ```javascript
   // Bad: Multiple separate DOM operations
   for (let i = 0; i < 100; i++) {
       document.getElementById("list").innerHTML += `<li>Item ${i}</li>`;
   }
   
   // Good: Build content first, then update DOM once
   let items = "";
   for (let i = 0; i < 100; i++) {
       items += `<li>Item ${i}</li>`;
   }
   document.getElementById("list").innerHTML = items;
   
   // Better: Use DocumentFragment
   const fragment = document.createDocumentFragment();
   for (let i = 0; i < 100; i++) {
       const li = document.createElement("li");
       li.textContent = `Item ${i}`;
       fragment.appendChild(li);
   }
   document.getElementById("list").appendChild(fragment);
   ```

2. **Cache DOM references**:
   ```javascript
   // Bad: Repeatedly querying the DOM
   function updateCount(count) {
       document.getElementById("counter").textContent = count;
   }
   
   // Good: Cache the reference
   const counter = document.getElementById("counter");
   function updateCount(count) {
       counter.textContent = count;
   }
   ```

3. **Use appropriate selectors**:
   - `getElementById` is faster than `querySelector`
   - Class and tag selectors are slower than ID selectors
   - Overly complex selectors can be performance-intensive

### Security Considerations

1. **Prevent XSS attacks**:
   ```javascript
   // Dangerous: Direct insertion of user input
   element.innerHTML = userInput;
   
   // Safe: Sanitize content or use textContent
   element.textContent = userInput;
   
   // Alternative: Use a sanitization library
   element.innerHTML = DOMPurify.sanitize(userInput);
   ```

2. **Be cautious with dynamic script execution**:
   ```javascript
   // Dangerous: Evaluating strings as code
   eval(userInput);
   
   // Dangerous: Creating script elements from user input
   const script = document.createElement("script");
   script.textContent = userInput;
   document.body.appendChild(script);
   ```

### Maintainability

1. **Use classes for style changes**:
   ```javascript
   // Less maintainable: Inline styles
   element.style.color = "red";
   element.style.fontWeight = "bold";
   
   // More maintainable: CSS classes
   element.classList.add("highlight");
   ```

2. **Separate concerns**:
   ```javascript
   // Structure the code to separate:
   // - DOM selection
   // - Data processing
   // - DOM updates
   
   function updateUserInfo(userId) {
       // Select elements once
       const nameElement = document.getElementById("user-name");
       const emailElement = document.getElementById("user-email");
       
       // Fetch and process data
       fetchUserData(userId)
           .then(data => {
               // Update DOM with processed data
               nameElement.textContent = formatName(data.name);
               emailElement.textContent = data.email;
           });
   }
   ```

## Exercises for Students

1. Create a dynamic to-do list that allows adding, editing, and removing tasks
2. Build a form validator that provides real-time feedback on input
3. Implement a tabbed interface that switches content when tabs are clicked
4. Create an image carousel that cycles through images with transitions
5. Build a drag-and-drop interface for reordering list items

## Further Reading

- [MDN Web Docs: Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN Web Docs: Manipulating documents](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)
- [JavaScript DOM Manipulation – Full Course for Beginners](https://www.freecodecamp.org/news/javascript-dom-manipulation/)
