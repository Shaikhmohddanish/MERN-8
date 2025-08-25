# DOM Basics

## What is the DOM?

The **Document Object Model (DOM)** is a programming interface for web documents. It represents the page so that programs can change the document structure, style, and content. The DOM represents the document as nodes and objects; that way, programming languages like JavaScript can interact with the page.

## DOM Structure

The DOM represents an HTML document as a tree-like structure of nodes. This tree structure is called the DOM tree:

- At the top is the `document` object, representing the entire HTML document
- The `document` has one child: the `<html>` element (root element)
- The `<html>` element has two children: `<head>` and `<body>`
- These elements can have children, which can have their own children, and so on

This hierarchical structure allows JavaScript to:
1. Navigate through the structure
2. Access and modify elements
3. Add or remove elements
4. React to events on these elements

## DOM Access

JavaScript interacts with the DOM through the global `document` object, which is the entry point to the DOM. Common methods to access DOM elements include:

```javascript
// Returns a reference to the element by its ID
document.getElementById('myId');

// Returns a live HTMLCollection of elements with the given tag name
document.getElementsByTagName('div');

// Returns a live HTMLCollection of elements with the given class name
document.getElementsByClassName('myClass');

// Returns the first element that matches a CSS selector
document.querySelector('.myClass');

// Returns all elements that match a CSS selector
document.querySelectorAll('div.myClass');
```

## DOM Relationships

Each node in the DOM has relationships with other nodes:

- `parentNode` - The parent of the node
- `childNodes` - A list of the node's children
- `firstChild` - The first child of the node
- `lastChild` - The last child of the node
- `nextSibling` - The next node at the same level
- `previousSibling` - The previous node at the same level

## Types of Nodes

Not all nodes in the DOM are elements. The main types of nodes are:

1. **Document** - The root of the DOM tree
2. **Element** - An HTML element (e.g., `<div>`, `<p>`, `<span>`)
3. **Text** - The text content of an element
4. **Attribute** - An attribute of an HTML element
5. **Comment** - An HTML comment

## Browser Compatibility

While the DOM is standardized by the W3C, different browsers may implement some features differently. Modern browsers generally follow standards closely, but it's always good practice to check compatibility when using advanced features.

## DOM vs. HTML Source Code

It's important to understand that the DOM is not the same as the HTML source code:

1. The HTML source code is the initial HTML document
2. The DOM is created by the browser based on that HTML
3. JavaScript can modify the DOM, but not the original HTML source
4. The DOM may differ from the original HTML due to:
   - JavaScript modifications
   - Browser error correction of invalid HTML
   - Dynamic content loading

## Exercises for Students

1. Open the browser console and explore the document object
2. Use `console.dir(document)` to see all properties
3. Try accessing different elements using various selector methods
4. Explore the DOM tree of this page using `exploreDOM(document.body)`
5. Use `console.log(document.body.childNodes)` and examine the results

## Further Reading

- [MDN Web Docs: Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [W3C DOM Standard](https://dom.spec.whatwg.org/)
- [JavaScript DOM Manipulation Tutorial](https://www.javascripttutorial.net/javascript-dom/)
