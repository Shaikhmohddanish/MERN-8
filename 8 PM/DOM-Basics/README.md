# DOM Basics

## What is the DOM?

The **Document Object Model (DOM)** is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects; that way, programming languages like JavaScript can interact with the page.

Think of the DOM as a tree-like structure that represents your HTML page in a way JavaScript can understand and manipulate.

### Simple Analogy

Imagine your HTML document as a family tree:
- The `document` is the entire family
- Each HTML element is a family member
- Elements nested inside other elements are children of those elements
- Elements at the same level are siblings

## DOM Structure Visualization

The DOM represents an HTML document as a tree-like structure of nodes:

```
document
└── html
    ├── head
    │   ├── title
    │   │   └── "My Web Page"
    │   └── meta, link, etc.
    └── body
        ├── header
        │   └── h1
        │       └── "Welcome to My Website"
        ├── div (with class="container")
        │   ├── p
        │   │   └── "This is a paragraph."
        │   └── button
        │       └── "Click Me"
        └── footer
            └── "© 2025 My Website"
```

This hierarchical structure allows JavaScript to:
1. Navigate through the structure (like moving up and down the family tree)
2. Access and modify elements (change text, attributes, styles)
3. Add or remove elements (insert or delete parts of the tree)
4. React to events on these elements (like clicks or key presses)

## DOM Access - Finding Elements

JavaScript interacts with the DOM through the global `document` object. Here are the most common ways to find elements, with simple examples:

### 1. By ID - When you know the exact unique element

```javascript
// HTML: <div id="profile">John Doe</div>
const profileDiv = document.getElementById('profile');
console.log(profileDiv.textContent); // "John Doe"
```

### 2. By Class Name - When you want elements with a specific class

```javascript
// HTML: 
// <div class="card">Card 1</div>
// <div class="card">Card 2</div>
const cards = document.getElementsByClassName('card');
console.log(cards.length); // 2
console.log(cards[0].textContent); // "Card 1"
```

### 3. By Tag Name - When you want all elements of a specific type

```javascript
// HTML: 
// <p>First paragraph</p>
// <p>Second paragraph</p>
const paragraphs = document.getElementsByTagName('p');
console.log(paragraphs.length); // 2
```

### 4. By CSS Selector - Most flexible way to find elements

```javascript
// First element matching the selector
const firstCard = document.querySelector('.card');
console.log(firstCard.textContent); // "Card 1"

// All elements matching the selector
const allCards = document.querySelectorAll('.card');
allCards.forEach(card => console.log(card.textContent)); // "Card 1", "Card 2"

// More complex selection
const submitButton = document.querySelector('form button.submit');
```

## DOM Relationships - Navigating Between Elements

Each node in the DOM has relationships with other nodes:

```javascript
// HTML:
// <div id="parent">
//   <p>First child</p>
//   <span>Second child</span>
// </div>

const parentDiv = document.getElementById('parent');

// Going down the tree
const children = parentDiv.children; // HTMLCollection of child elements
const firstChild = parentDiv.firstElementChild; // <p>
const lastChild = parentDiv.lastElementChild; // <span>

// Going up the tree
const paragraph = document.querySelector('p');
const itsParent = paragraph.parentElement; // <div id="parent">

// Moving sideways
const span = document.querySelector('span');
const prevSibling = span.previousElementSibling; // <p>
```

## Types of Nodes

Not all nodes in the DOM are HTML elements. Here are the main types you'll encounter:

1. **Document** - The root of the DOM tree
2. **Element** - An HTML element (e.g., `<div>`, `<p>`, `<span>`)
3. **Text** - The text content of an element
4. **Attribute** - An attribute of an HTML element
5. **Comment** - An HTML comment

```javascript
// HTML:
// <!-- Header section -->
// <div id="header">
//   Welcome to my site
// </div>

const header = document.getElementById('header');
console.log(header.nodeType); // 1 (Element node)
console.log(header.firstChild.nodeType); // 3 (Text node)
```

## Live Example: Exploring the DOM

Open your browser's developer console on any webpage and try:

```javascript
// Print the entire DOM tree structure
function exploreDOM(element, depth = 0) {
  // Create an indentation based on depth
  const indent = ' '.repeat(depth * 2);
  
  // Log the current element with its indentation
  console.log(`${indent}${element.tagName.toLowerCase()}${element.id ? ' #' + element.id : ''}`);
  
  // Recursively explore all child elements
  Array.from(element.children).forEach(child => {
      exploreDOM(child, depth + 1);
  });
}

// See the structure of the current page
exploreDOM(document.body);
```

## Practical Exercises

1. **DOM Inspector**: Open the browser console and type `console.dir(document)` to see all DOM properties
2. **Element Finder**: Try `console.log(document.querySelector('h1'))` to find the first heading
3. **Tree Explorer**: Use the exploreDOM function above to visualize the page structure
4. **Child Counter**: Find the number of direct children in the body with `document.body.children.length`
5. **Family Tree**: Starting from any element, try navigating to its parent, siblings, and children

## Common Mistakes and Gotchas

1. **Forgetting that HTMLCollections are live** - They update automatically when the DOM changes
2. **Confusing textContent, innerText, and innerHTML** - They handle HTML tags differently
3. **Trying to manipulate elements before the DOM is loaded** - Always use event listeners like `DOMContentLoaded`
4. **Not checking if an element exists before using it** - Always verify the element was found

## Further Reading

- [MDN Web Docs: Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [W3C DOM Standard](https://dom.spec.whatwg.org/)
- [JavaScript DOM Manipulation Tutorial](https://www.javascripttutorial.net/javascript-dom/)
