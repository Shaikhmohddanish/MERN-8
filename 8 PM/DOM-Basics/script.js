// DOM Basics Interactive JavaScript
// This script powers the interactive DOM learning experience

// Wait for the DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM fully loaded and parsed');
    
    // =====================================================================
    // SECTION 1: Element Selection Methods Demo
    // =====================================================================
    
    // Set up selection method demonstrations
    const tryButtons = document.querySelectorAll('.try-button');
    
    // Element Selection Guide - Accessible in Console
    window.elementSelectionGuide = {
        getElementById: {
            syntax: 'document.getElementById("elementId")',
            returns: 'A single Element object or null if not found',
            useCases: ['When you need to access a unique element with a specific ID', 'Most efficient selection method'],
            example: 'const header = document.getElementById("page-header");'
        },
        getElementsByClassName: {
            syntax: 'document.getElementsByClassName("className")',
            returns: 'A live HTMLCollection of elements (array-like)',
            useCases: ['When you need multiple elements with the same class', 'For dynamic collections that update automatically'],
            example: 'const buttons = document.getElementsByClassName("btn");'
        },
        getElementsByTagName: {
            syntax: 'document.getElementsByTagName("tagName")',
            returns: 'A live HTMLCollection of elements (array-like)',
            useCases: ['When you need all elements of a specific type (e.g., all paragraphs)', 'For scanning the entire document'],
            example: 'const allLinks = document.getElementsByTagName("a");'
        },
        querySelector: {
            syntax: 'document.querySelector("CSS selector")',
            returns: 'The first Element that matches the selector, or null',
            useCases: ['When you need complex selection criteria', 'When you only need the first match'],
            example: 'const firstActiveItem = document.querySelector(".item.active");'
        },
        querySelectorAll: {
            syntax: 'document.querySelectorAll("CSS selector")',
            returns: 'A static NodeList of all matching elements',
            useCases: ['When you need all elements matching complex criteria', 'For flexible selections using CSS selector syntax'],
            example: 'const requiredFields = document.querySelectorAll("input[required]");'
        }
    };
    
    console.log('Element Selection Guide available! Type window.elementSelectionGuide in the console to explore.');
    
    tryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const method = this.getAttribute('data-method');
            const resultDisplay = this.nextElementSibling;
            
            // Clear previous results
            resultDisplay.innerHTML = '';
            
            // Demonstrate different selection methods
            switch(method) {
                case 'byId':
                    // Get element by ID - fastest and most direct method
                    console.time('getElementById');
                    const uniqueElement = document.getElementById('unique-element');
                    console.timeEnd('getElementById'); // Measure performance
                    
                    const idCode = 'document.getElementById("unique-element")';
                    displayResult(resultDisplay, uniqueElement, idCode);
                    highlightElement(uniqueElement);
                    
                    // Add detailed explanation
                    resultDisplay.innerHTML += `
                        <div class="method-explanation">
                            <p><strong>Key points about getElementById:</strong></p>
                            <ul>
                                <li>Fastest selection method (uses browser's optimized lookup)</li>
                                <li>Returns a single element or null</li>
                                <li>IDs must be unique in the document</li>
                                <li>Most direct way to access a specific element</li>
                            </ul>
                        </div>
                    `;
                    break;
                    
                case 'byClass':
                    // Get elements by class name - returns a live HTMLCollection
                    console.time('getElementsByClassName');
                    const classElements = document.getElementsByClassName('example-class');
                    console.timeEnd('getElementsByClassName');
                    
                    const classCode = 'document.getElementsByClassName("example-class")';
                    displayResult(resultDisplay, classElements, classCode);
                    
                    // Highlight all elements with this class
                    Array.from(classElements).forEach(el => highlightElement(el));
                    
                    // Add detailed explanation
                    resultDisplay.innerHTML += `
                        <div class="method-explanation">
                            <p><strong>Key points about getElementsByClassName:</strong></p>
                            <ul>
                                <li>Returns a live HTMLCollection (updates automatically if DOM changes)</li>
                                <li>You need Array.from() or [...collection] to use array methods</li>
                                <li>Can select elements by multiple classes: "class1 class2"</li>
                                <li>Can be called on any element, not just document</li>
                            </ul>
                        </div>
                    `;
                    break;
                    
                case 'byTag':
                    // Get elements by tag name - selects all elements of specified type
                    console.time('getElementsByTagName');
                    const paragraphs = document.getElementsByTagName('p');
                    console.timeEnd('getElementsByTagName');
                    
                    // Only show the tag-example paragraphs in our result
                    const exampleParagraphs = Array.from(paragraphs).filter(p => 
                        p.classList.contains('tag-example')
                    );
                    
                    const tagCode = 'document.getElementsByTagName("p")';
                    displayResult(resultDisplay, exampleParagraphs, tagCode);
                    exampleParagraphs.forEach(el => highlightElement(el));
                    
                    // Add detailed explanation
                    resultDisplay.innerHTML += `
                        <div class="method-explanation">
                            <p><strong>Key points about getElementsByTagName:</strong></p>
                            <ul>
                                <li>Returns all elements of a specified HTML tag</li>
                                <li>Returns a live HTMLCollection</li>
                                <li>Good for selecting all of one element type (e.g., all images)</li>
                                <li>Use '*' to select all elements (though this is performance-heavy)</li>
                            </ul>
                        </div>
                    `;
                    break;
                    
                case 'querySelector':
                    // Use querySelector to select the first element matching a CSS selector
                    console.time('querySelector');
                    const firstQueryElement = document.querySelector('.query-test');
                    console.timeEnd('querySelector');
                    
                    const queryCode = 'document.querySelector(".query-test")';
                    displayResult(resultDisplay, firstQueryElement, queryCode);
                    highlightElement(firstQueryElement);
                    
                    // After a delay, show querySelector vs querySelectorAll
                    setTimeout(() => {
                        console.time('querySelectorAll');
                        const allQueryElements = document.querySelectorAll('.query-test');
                        console.timeEnd('querySelectorAll');
                        
                        const additionalHtml = `
                            <div class="additional-info">
                                <p><strong>querySelectorAll:</strong> Gets <em>all</em> matching elements</p>
                                <code>document.querySelectorAll('.query-test')</code>
                                <p>Found ${allQueryElements.length} elements</p>
                            </div>
                            
                            <div class="method-explanation">
                                <p><strong>Key points about querySelector/querySelectorAll:</strong></p>
                                <ul>
                                    <li>Uses CSS selector syntax for powerful, flexible selections</li>
                                    <li>querySelector returns first match only; querySelectorAll returns all matches</li>
                                    <li>querySelectorAll returns a static NodeList (doesn't update if DOM changes)</li>
                                    <li>Can use complex selectors like '.class[attribute="value"]:hover'</li>
                                    <li>Slightly slower than direct methods but much more versatile</li>
                                    <li>Can combine multiple selection criteria in one call</li>
                                </ul>
                                
                                <p><strong>Common CSS Selectors:</strong></p>
                                <table class="selector-table">
                                    <tr><th>Selector</th><th>Example</th><th>Selects</th></tr>
                                    <tr><td>.class</td><td>.active</td><td>Elements with class "active"</td></tr>
                                    <tr><td>#id</td><td>#header</td><td>Element with ID "header"</td></tr>
                                    <tr><td>element</td><td>div</td><td>All div elements</td></tr>
                                    <tr><td>parent > child</td><td>ul > li</td><td>All li elements directly inside ul</td></tr>
                                    <tr><td>[attribute]</td><td>[required]</td><td>Elements with "required" attribute</td></tr>
                                </table>
                            </div>
                        `;
                        resultDisplay.innerHTML += additionalHtml;
                        
                        // Highlight all matching elements
                        allQueryElements.forEach(el => highlightElement(el, 'blue'));
                    }, 1500);
                    break;
            }
        });
    });
    
    // Helper function to display selection results
    function displayResult(container, elements, methodCode) {
        let html = `<p><code>${methodCode}</code></p>`;
        
        if (!elements) {
            html += '<p>No elements found!</p>';
        } else if (elements.length === 0) {
            html += '<p>Empty collection (length: 0)</p>';
        } else if (elements.length) {
            // It's a collection
            html += `<p>Found ${elements.length} elements:</p>`;
            html += '<ul>';
            Array.from(elements).forEach((el, index) => {
                html += `<li>Element ${index}: ${el.tagName.toLowerCase()}${el.id ? ' #' + el.id : ''}${el.className ? ' .' + el.className.split(' ').join('.') : ''}</li>`;
            });
            html += '</ul>';
        } else {
            // It's a single element
            html += `<p>Found: ${elements.tagName.toLowerCase()}${elements.id ? ' #' + elements.id : ''}${elements.className ? ' .' + elements.className.split(' ').join('.') : ''}</p>`;
        }
        
        container.innerHTML = html;
    }
    
    // Function to temporarily highlight elements
    function highlightElement(element, color = '#ffeb3b') {
        if (!element) return;
        
        // Save original style
        const originalBackground = element.style.backgroundColor;
        const originalTransition = element.style.transition;
        
        // Apply highlight
        element.style.transition = 'background-color 0.3s ease';
        element.style.backgroundColor = color;
        
        // Remove highlight after a delay
        setTimeout(() => {
            element.style.backgroundColor = originalBackground;
            setTimeout(() => {
                element.style.transition = originalTransition;
            }, 300);
        }, 1500);
    }
    
    // =====================================================================
    // SECTION 2: DOM Traversal Demonstration
    // =====================================================================
    
    const traversalButtons = document.querySelectorAll('.traversal-buttons button');
    const traversalResult = document.getElementById('traversal-result');
    const familyTree = document.getElementById('family-tree');
    
    if (traversalButtons && traversalResult) {
        // For each traversal button, add appropriate event listener
        traversalButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Clear previous highlighting
                clearHighlights();
                
                const buttonId = this.id;
                
                switch(buttonId) {
                    case 'show-parent':
                        demonstrateParent();
                        break;
                    case 'show-children':
                        demonstrateChildren();
                        break;
                    case 'show-siblings':
                        demonstrateSiblings();
                        break;
                    case 'show-descendants':
                        demonstrateDescendants();
                        break;
                }
            });
        });
    }
    
    function demonstrateParent() {
        const secondChild = document.getElementById('second-child');
        const parent = secondChild.parentElement;
        
        traversalResult.innerHTML = `
            <p><strong>Parent Node Access:</strong></p>
            <code>const secondChild = document.getElementById('second-child');</code>
            <code>const parent = secondChild.parentElement;</code>
            <p>Result: ${formatElementInfo(parent)}</p>
            <p class="tip">Use <code>.parentElement</code> to get the parent element, or <code>.parentNode</code> for any parent node type.</p>
        `;
        
        // Highlight the elements
        addTemporaryHighlight(secondChild, '#bbdefb');
        setTimeout(() => {
            addTemporaryHighlight(parent, '#e0f7fa');
        }, 500);
    }
    
    function demonstrateChildren() {
        const parent = document.getElementById('parent');
        const children = parent.children;
        
        let childrenHTML = '<ul>';
        Array.from(children).forEach((child, index) => {
            childrenHTML += `<li>Child ${index}: ${formatElementInfo(child)}</li>`;
            setTimeout(() => {
                addTemporaryHighlight(child, '#bbdefb');
            }, 500 + (index * 300));
        });
        childrenHTML += '</ul>';
        
        traversalResult.innerHTML = `
            <p><strong>Children Access:</strong></p>
            <code>const parent = document.getElementById('parent');</code>
            <code>const children = parent.children;</code>
            <p>Found ${children.length} children:</p>
            ${childrenHTML}
            <p class="tip">Use <code>.children</code> for element children only, or <code>.childNodes</code> for all node types.</p>
        `;
        
        // Highlight the parent first
        addTemporaryHighlight(parent, '#e0f7fa');
    }
    
    function demonstrateSiblings() {
        const firstChild = document.getElementById('first-child');
        const nextSibling = firstChild.nextElementSibling;
        
        traversalResult.innerHTML = `
            <p><strong>Sibling Access:</strong></p>
            <code>const firstChild = document.getElementById('first-child');</code>
            <code>const nextSibling = firstChild.nextElementSibling;</code>
            <p>Next sibling: ${formatElementInfo(nextSibling)}</p>
            <p class="tip">Use <code>.nextElementSibling</code> and <code>.previousElementSibling</code> to navigate between element siblings.</p>
        `;
        
        // Highlight the elements with delay
        addTemporaryHighlight(firstChild, '#bbdefb');
        setTimeout(() => {
            addTemporaryHighlight(nextSibling, '#bbdefb');
        }, 500);
    }
    
    function demonstrateDescendants() {
        const parent = document.getElementById('parent');
        const descendants = parent.querySelectorAll('*');
        
        let descendantsHTML = '<ul>';
        Array.from(descendants).forEach((desc, index) => {
            descendantsHTML += `<li>${formatElementInfo(desc)}</li>`;
            setTimeout(() => {
                addTemporaryHighlight(desc, getColorByDepth(getElementDepth(desc, parent)));
            }, 300 + (index * 200));
        });
        descendantsHTML += '</ul>';
        
        traversalResult.innerHTML = `
            <p><strong>All Descendants:</strong></p>
            <code>const parent = document.getElementById('parent');</code>
            <code>const descendants = parent.querySelectorAll('*');</code>
            <p>Found ${descendants.length} descendants:</p>
            ${descendantsHTML}
            <p class="tip">Use <code>element.querySelectorAll('*')</code> to select all descendant elements.</p>
        `;
    }
    
    // Helper function to clear highlights
    function clearHighlights() {
        const highlighted = document.querySelectorAll('.temp-highlight');
        highlighted.forEach(el => el.classList.remove('temp-highlight'));
    }
    
    // Helper function to add temporary highlight
    function addTemporaryHighlight(element, bgColor = '#bbdefb') {
        if (!element) return;
        
        element.classList.add('temp-highlight');
        element.style.backgroundColor = bgColor;
        element.style.transition = 'background-color 0.5s ease';
        
        setTimeout(() => {
            element.classList.remove('temp-highlight');
            element.style.backgroundColor = '';
        }, 3000);
    }
    
    // Helper to format element info for display
    function formatElementInfo(element) {
        if (!element) return 'null';
        return `<span class="element-info">&lt;${element.tagName.toLowerCase()}${element.id ? ' id="'+element.id+'"' : ''}${element.className ? ' class="'+element.className+'"' : ''}&gt;</span>`;
    }
    
    // Helper to get element depth
    function getElementDepth(element, parent) {
        let depth = 0;
        let current = element;
        
        while (current !== parent && current !== null) {
            depth++;
            current = current.parentElement;
        }
        
        return depth;
    }
    
    // Helper to get color based on depth
    function getColorByDepth(depth) {
        const colors = ['#e0f7fa', '#bbdefb', '#d1c4e9', '#f8bbd0', '#ffccbc'];
        return colors[Math.min(depth, colors.length - 1)];
    }
    
    // =====================================================================
    // SECTION 3: DOM Manipulation Demo
    // =====================================================================
    
    const manipulationButtons = document.querySelectorAll('.control-panel button');
    const targetElement = document.getElementById('target-element');
    const originalTargetHTML = targetElement ? targetElement.innerHTML : '';
    const originalTargetStyle = targetElement ? targetElement.getAttribute('style') : '';
    
    // DOM Manipulation Reference - Accessible in Console
    window.domManipulationGuide = {
        creating: {
            createElement: {
                syntax: 'document.createElement("tagName")',
                description: 'Creates a new HTML element but does not add it to the DOM',
                example: 'const newDiv = document.createElement("div");'
            },
            createTextNode: {
                syntax: 'document.createTextNode("text")',
                description: 'Creates a text node (useful for adding text to elements)',
                example: 'const text = document.createTextNode("Hello world!");'
            },
            cloneNode: {
                syntax: 'element.cloneNode(deep)',
                description: 'Creates a copy of an element (deep=true copies descendants too)',
                example: 'const clone = element.cloneNode(true);'
            }
        },
        adding: {
            appendChild: {
                syntax: 'parent.appendChild(child)',
                description: 'Adds a node as the last child of a parent element',
                example: 'parentElement.appendChild(newElement);'
            },
            insertBefore: {
                syntax: 'parent.insertBefore(newNode, referenceNode)',
                description: 'Inserts a node before a reference node as a child of a parent node',
                example: 'parentElement.insertBefore(newElement, existingChild);'
            },
            insertAdjacentHTML: {
                syntax: 'element.insertAdjacentHTML(position, htmlString)',
                description: 'Inserts HTML text at a specified position ("beforebegin", "afterbegin", "beforeend", "afterend")',
                example: 'element.insertAdjacentHTML("beforeend", "<p>New content</p>");'
            },
            append: {
                syntax: 'element.append(...nodes)',
                description: 'Adds multiple nodes and strings to the end of an element (newer method)',
                example: 'element.append(node1, "Text", node2);'
            },
            prepend: {
                syntax: 'element.prepend(...nodes)',
                description: 'Adds nodes to the beginning of an element (newer method)',
                example: 'element.prepend("Start: ", newElement);'
            }
        },
        removing: {
            removeChild: {
                syntax: 'parent.removeChild(child)',
                description: 'Removes a child node from the DOM and returns it',
                example: 'const oldElement = parent.removeChild(child);'
            },
            remove: {
                syntax: 'element.remove()',
                description: 'Removes the element from the DOM (newer method)',
                example: 'element.remove();'
            }
        },
        modifying: {
            innerHTML: {
                syntax: 'element.innerHTML = htmlString',
                description: 'Gets or sets the HTML content inside an element',
                example: 'element.innerHTML = "<p>New content</p>";',
                warning: 'Can create security risks with untrusted content (XSS)'
            },
            textContent: {
                syntax: 'element.textContent = string',
                description: 'Gets or sets the text content of an element (safer than innerHTML)',
                example: 'element.textContent = "New text";'
            },
            setAttribute: {
                syntax: 'element.setAttribute(name, value)',
                description: 'Sets the value of an attribute on the element',
                example: 'element.setAttribute("class", "new-class");'
            },
            classList: {
                syntax: 'element.classList.add/remove/toggle/contains()',
                description: 'Modern way to manipulate classes on an element',
                example: 'element.classList.add("active"); element.classList.remove("hidden");'
            },
            style: {
                syntax: 'element.style.property = value',
                description: 'Sets inline CSS styles on an element',
                example: 'element.style.color = "blue"; element.style.marginTop = "10px";'
            }
        }
    };
    
    console.log('DOM Manipulation Guide available! Type window.domManipulationGuide in the console to explore.');
    
    if (manipulationButtons && targetElement) {
        manipulationButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.id;
                
                // Log the action to console with more detailed explanation
                console.log(`Executing DOM manipulation: ${action}`);
                
                switch(action) {
                    case 'change-text':
                        // Change the text content
                        console.log('Before: textContent =', targetElement.textContent);
                        targetElement.textContent = 'Text has been changed!';
                        console.log('After: textContent =', targetElement.textContent);
                        logAction('Changed text using: targetElement.textContent = "Text has been changed!"', 
                                 'textContent is safer than innerHTML when working with user input');
                        break;
                        
                    case 'change-style':
                        // Change multiple styles
                        console.log('Before:', targetElement.getAttribute('style'));
                        
                        targetElement.style.backgroundColor = '#e1f5fe';
                        targetElement.style.color = '#0277bd';
                        targetElement.style.padding = '15px';
                        targetElement.style.borderRadius = '10px';
                        targetElement.style.fontWeight = 'bold';
                        
                        console.log('After:', targetElement.getAttribute('style'));
                        logAction('Changed styles using: targetElement.style.property = "value"',
                                 'Remember that CSS properties with hyphens become camelCase in JavaScript (e.g., font-size → fontSize)');
                        break;
                        
                    case 'add-class':
                        // Add a class
                        console.log('Before classes:', targetElement.className);
                        targetElement.classList.add('highlight');
                        console.log('After classes:', targetElement.className);
                        
                        // Demonstrate other classList methods
                        const classDemo = `
                            <div class="additional-info">
                                <p>classList provides several useful methods:</p>
                                <ul>
                                    <li><code>add()</code>: Adds one or more classes</li>
                                    <li><code>remove()</code>: Removes one or more classes</li>
                                    <li><code>toggle()</code>: Adds a class if not present, removes it if present</li>
                                    <li><code>contains()</code>: Checks if an element has a class</li>
                                    <li><code>replace()</code>: Replaces one class with another</li>
                                </ul>
                            </div>
                        `;
                        
                        logAction('Added class using: targetElement.classList.add("highlight")', classDemo);
                        break;
                        
                    case 'create-element':
                        // Create and append a new element
                        console.log('Creating new element...');
                        
                        // DOM creation process - step by step
                        // 1. Create the element
                        const newElement = document.createElement('p');
                        console.log('1. Element created:', newElement);
                        
                        // 2. Set properties on the element
                        newElement.textContent = 'This is a dynamically created paragraph!';
                        console.log('2. Text content set');
                        
                        // 3. Add classes or other attributes
                        newElement.className = 'new-element';
                        console.log('3. Class added');
                        
                        // 4. Append to the DOM
                        targetElement.appendChild(newElement);
                        console.log('4. Element appended to DOM');
                        
                        // Show the element creation process
                        const creationProcess = `
                            <div class="creation-steps">
                                <p><strong>Element Creation Process:</strong></p>
                                <ol>
                                    <li>Create: <code>const el = document.createElement('p');</code></li>
                                    <li>Configure: <code>el.textContent = 'Text';</code></li>
                                    <li>Style: <code>el.className = 'new-element';</code></li>
                                    <li>Insert: <code>parent.appendChild(el);</code></li>
                                </ol>
                            </div>
                        `;
                        
                        logAction('Created element using: document.createElement() and appendChild()', creationProcess);
                        break;
                        
                    case 'remove-element':
                        // Check if there are any child elements to remove
                        if (targetElement.children.length > 0) {
                            // Show element before removal
                            console.log('Element to remove:', targetElement.lastChild);
                            
                            // Remove the last child element
                            const removedNode = targetElement.removeChild(targetElement.lastChild);
                            console.log('Element removed from DOM:', removedNode);
                            
                            // Show different removal methods
                            const removalMethods = `
                                <div class="additional-info">
                                    <p><strong>Different ways to remove elements:</strong></p>
                                    <ul>
                                        <li><code>parent.removeChild(child)</code> - Traditional method, returns the removed node</li>
                                        <li><code>element.remove()</code> - Modern method, simpler but no return value</li>
                                        <li><code>element.innerHTML = ''</code> - Quick way to remove all children (less efficient)</li>
                                    </ul>
                                </div>
                            `;
                            
                            logAction('Removed last child using: targetElement.removeChild(targetElement.lastChild)', removalMethods);
                        } else {
                            logAction('No child elements to remove!', 'warning');
                        }
                        break;
                        
                    case 'reset-playground':
                        // Reset the target element to its original state
                        console.log('Resetting target element...');
                        console.log('Before:', targetElement.outerHTML);
                        
                        targetElement.innerHTML = originalTargetHTML;
                        targetElement.className = '';
                        targetElement.setAttribute('style', originalTargetStyle || '');
                        
                        console.log('After:', targetElement.outerHTML);
                        logAction('Reset target element to original state');
                        break;
                }
            });
        });
    }
    
    // Helper to log DOM manipulation actions
    function logAction(message, type = 'info') {
        console.log(`DOM Manipulation: ${message}`);
        
        // Create a temporary toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Append to body
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
            
            // Remove after delay
            setTimeout(() => {
                toast.style.transform = 'translateY(-20px)';
                toast.style.opacity = '0';
                
                // Remove from DOM after animation
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 500);
            }, 3000);
        }, 10);
    }
    
    // =====================================================================
    // SECTION 4: DOM Events Demonstration
    // =====================================================================
    
    const eventBox = document.getElementById('event-box');
    const eventLog = document.getElementById('event-log');
    
    // Event Handling Reference - Accessible in Console
    window.eventHandlingGuide = {
        addingListeners: {
            addEventListener: {
                syntax: 'element.addEventListener(event, handler, options)',
                description: 'Modern way to attach event handlers. Can add multiple handlers to same event.',
                example: 'button.addEventListener("click", function(e) { console.log("Clicked!"); });'
            },
            onEvent: {
                syntax: 'element.onevent = handler',
                description: 'Traditional way. Overwrites any previous handler.',
                example: 'button.onclick = function() { alert("Button clicked"); };'
            },
            inline: {
                syntax: '<element onevent="code">',
                description: 'In HTML. Not recommended as it mixes code with markup.',
                example: '<button onclick="doSomething()">Click me</button>'
            }
        },
        removingListeners: {
            removeEventListener: {
                syntax: 'element.removeEventListener(event, handler)',
                description: 'Removes a previously attached event handler. Must use same function reference.',
                example: 'element.removeEventListener("click", handleClick);'
            }
        },
        eventObject: {
            properties: {
                target: 'The element that triggered the event',
                currentTarget: 'The element that the event handler is attached to',
                type: 'The type of event (e.g., "click", "mouseover")',
                clientX: 'X coordinate of mouse pointer, relative to viewport',
                clientY: 'Y coordinate of mouse pointer, relative to viewport',
                key: 'Key pressed (for keyboard events)',
                preventDefault: 'Method to prevent default browser behavior',
                stopPropagation: 'Method to stop event bubbling'
            }
        },
        eventTypes: {
            mouse: ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave'],
            keyboard: ['keydown', 'keyup', 'keypress'],
            form: ['submit', 'change', 'input', 'focus', 'blur'],
            window: ['load', 'resize', 'scroll', 'unload'],
            drag: ['dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop']
        },
        eventBubbling: {
            description: 'Events "bubble up" from the target element to its ancestors',
            example: 'Click on a button inside a div: button → div → body → document',
            capturing: {
                description: 'Events can also be captured in reverse order (top-down)',
                syntax: 'element.addEventListener(event, handler, { capture: true })'
            },
            stopping: {
                description: 'Prevent event from reaching parent elements',
                syntax: 'event.stopPropagation()'
            }
        }
    };
    
    console.log('Event Handling Guide available! Type window.eventHandlingGuide in the console to explore.');
    
    if (eventBox && eventLog) {
        // Initial instructions
        eventLog.innerHTML = '<p>Interact with the box above to see events in action</p>';
        
        // Define events to demonstrate
        const eventsToDemo = [
            { name: 'click', description: 'Triggered when the element is clicked' },
            { name: 'dblclick', description: 'Triggered when the element is double-clicked' },
            { name: 'mouseenter', description: 'Triggered when the mouse enters the element' },
            { name: 'mouseleave', description: 'Triggered when the mouse leaves the element' },
            { name: 'mousemove', description: 'Triggered when the mouse moves inside the element', throttle: 100 }
        ];
        
        // Add event listeners for each event type
        eventsToDemo.forEach(event => {
            let lastLogTime = 0;
            
            eventBox.addEventListener(event.name, function(e) {
                // Skip logging for throttled events
                if (event.throttle) {
                    const now = Date.now();
                    if (now - lastLogTime < event.throttle) return;
                    lastLogTime = now;
                }
                
                // For click events, show event properties in console
                if (event.name === 'click') {
                    console.group('Click Event Object Properties');
                    console.log('event.type:', e.type);
                    console.log('event.target:', e.target);
                    console.log('event.currentTarget:', e.currentTarget);
                    console.log('event.clientX/Y:', e.clientX, e.clientY);
                    console.log('event.screenX/Y:', e.screenX, e.screenY);
                    console.log('event.altKey/ctrlKey/shiftKey:', e.altKey, e.ctrlKey, e.shiftKey);
                    console.log('event.bubbles:', e.bubbles);
                    console.log('Full event object:', e);
                    console.groupEnd();
                }
                
                logEvent(event.name, e, event.description);
            });
        });
        
        // Add keydown event to document to demonstrate keyboard events
        document.addEventListener('keydown', function(e) {
            if (document.activeElement === document.body) {
                console.log('Key Event:', e.key, e.code, e.keyCode);
                logEvent('keydown', e, 'Triggered when a key is pressed down');
            }
        });
        
        // Add event propagation demo (event bubbling)
        const bubblingDemo = document.createElement('div');
        bubblingDemo.innerHTML = `
            <div class="event-propagation-demo">
                <h3>Event Propagation Demo</h3>
                <div id="outer-box" class="propagation-box">
                    Outer Box
                    <div id="middle-box" class="propagation-box">
                        Middle Box
                        <div id="inner-box" class="propagation-box">
                            Inner Box
                        </div>
                    </div>
                </div>
                <div class="propagation-log" id="propagation-log">Click on any box to see event bubbling</div>
                <label>
                    <input type="checkbox" id="stop-propagation"> Stop Propagation
                </label>
            </div>
        `;
        
        // Append the bubbling demo after the event log
        eventLog.parentNode.insertBefore(bubblingDemo, eventLog.nextSibling);
        
        // Add bubbling demo styles
        const bubblingStyles = document.createElement('style');
        bubblingStyles.textContent = `
            .event-propagation-demo {
                margin-top: 20px;
                padding: 15px;
                background-color: #f5f5f5;
                border-radius: 5px;
            }
            
            .propagation-box {
                padding: 20px;
                margin: 10px;
                border: 2px solid #333;
                border-radius: 5px;
                text-align: center;
                cursor: pointer;
                user-select: none;
                transition: background-color 0.3s;
            }
            
            #outer-box { background-color: #ffecb3; }
            #middle-box { background-color: #c8e6c9; }
            #inner-box { background-color: #bbdefb; }
            
            .propagation-log {
                margin-top: 15px;
                padding: 10px;
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 4px;
                min-height: 80px;
                max-height: 150px;
                overflow-y: auto;
                font-family: monospace;
            }
            
            .propagation-triggered {
                animation: flash 0.5s;
            }
            
            @keyframes flash {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
        `;
        document.head.appendChild(bubblingStyles);
        
        // Set up event propagation demo
        setTimeout(() => {
            const boxes = ['outer-box', 'middle-box', 'inner-box'];
            const propagationLog = document.getElementById('propagation-log');
            const stopPropCheckbox = document.getElementById('stop-propagation');
            
            if (propagationLog && stopPropCheckbox) {
                boxes.forEach(boxId => {
                    const box = document.getElementById(boxId);
                    if (box) {
                        box.addEventListener('click', function(e) {
                            // Log the event
                            const logItem = document.createElement('div');
                            logItem.textContent = `Clicked: ${this.id}`;
                            propagationLog.prepend(logItem);
                            
                            // Flash the element
                            this.classList.add('propagation-triggered');
                            setTimeout(() => this.classList.remove('propagation-triggered'), 500);
                            
                            // Stop propagation if checkbox is checked
                            if (stopPropCheckbox.checked) {
                                e.stopPropagation();
                                console.log('Event propagation stopped at:', this.id);
                                const stopNotice = document.createElement('div');
                                stopNotice.innerHTML = `<strong>Propagation stopped at ${this.id}</strong>`;
                                propagationLog.prepend(stopNotice);
                            }
                        });
                    }
                });
                
                // Clear log button
                const clearButton = document.createElement('button');
                clearButton.textContent = 'Clear Log';
                clearButton.addEventListener('click', function() {
                    propagationLog.innerHTML = '';
                });
                stopPropCheckbox.parentNode.after(clearButton);
            }
        }, 100);
        
        // Add custom event demo
        const customEventButton = document.createElement('button');
        customEventButton.textContent = 'Dispatch Custom Event';
        customEventButton.className = 'custom-event-button';
        customEventButton.style.marginTop = '15px';
        
        customEventButton.addEventListener('click', function() {
            // Create a custom event
            const customEvent = new CustomEvent('awesome', {
                bubbles: true,
                detail: { time: new Date(), message: 'Custom events are awesome!' }
            });
            
            // Log that we're dispatching the event
            console.log('Dispatching custom event:', customEvent);
            
            // Dispatch the event
            eventBox.dispatchEvent(customEvent);
        });
        
        // Add listener for the custom event
        eventBox.addEventListener('awesome', function(e) {
            console.log('Custom event received:', e.detail);
            
            // Log the custom event
            const customLogEntry = document.createElement('div');
            customLogEntry.className = 'event-entry custom-event';
            customLogEntry.innerHTML = `
                <strong>Custom Event: awesome</strong> @ ${new Date().toLocaleTimeString()}<br>
                <span class="event-description">Custom events can carry data in the detail property</span>
                <span class="event-details">Message: ${e.detail.message}</span>
            `;
            
            // Add special styling
            customLogEntry.style.backgroundColor = '#e8eaf6';
            customLogEntry.style.borderLeft = '4px solid #3f51b5';
            
            // Add to log
            eventLog.insertBefore(customLogEntry, eventLog.firstChild);
            
            // Special animation for custom events
            eventBox.style.transform = 'rotate(360deg)';
            eventBox.style.transition = 'transform 1s ease';
            
            setTimeout(() => {
                eventBox.style.transform = 'none';
            }, 1000);
        });
        
        // Add the custom event button after the event box
        eventBox.parentNode.insertBefore(customEventButton, eventBox.nextSibling);
    }
    // Function to log events
    function logEvent(eventName, event, description) {
        const time = new Date().toLocaleTimeString();
        let details = '';
        
        // Add event-specific details
        switch(eventName) {
            case 'click':
            case 'dblclick':
                details = `Position: (${event.clientX}, ${event.clientY})`;
                break;
            case 'mousemove':
                details = `Position: (${event.clientX}, ${event.clientY})`;
                break;
            case 'keydown':
                details = `Key: ${event.key}, Code: ${event.code}`;
                break;
        }
        
        // Create log entry
        const logEntry = document.createElement('div');
        logEntry.className = 'event-entry';
        logEntry.innerHTML = `
            <strong>${eventName}</strong> @ ${time}<br>
            <span class="event-description">${description}</span>
            ${details ? `<span class="event-details">${details}</span>` : ''}
        `;
        
        // Add to log
        eventLog.insertBefore(logEntry, eventLog.firstChild);
        
        // Limit log entries
        if (eventLog.children.length > 10) {
            eventLog.removeChild(eventLog.lastChild);
        }
        
        // Visual feedback on the event box
        addEventFeedback(eventBox, eventName);
    }
    
    // Function to add visual feedback to the event box
    function addEventFeedback(element, eventName) {
        // Remove any existing feedback classes
        element.classList.remove('event-click', 'event-dblclick', 'event-mouseenter', 'event-mouseleave', 'event-mousemove', 'event-keydown');
        
        // Add the new feedback class
        element.classList.add(`event-${eventName}`);
        
        // Remove the class after animation completes
        setTimeout(() => {
            element.classList.remove(`event-${eventName}`);
        }, 500);
    }
    
    // =====================================================================
    // Add CSS for enhanced features
    // =====================================================================
    
    const style = document.createElement('style');
    style.textContent = `
        .event-click {
            transform: scale(0.95);
            background-color: #c8e6c9 !important;
        }
        
        .event-dblclick {
            transform: scale(0.9);
            background-color: #b3e5fc !important;
        }
        
        .event-mouseenter {
            background-color: #e1bee7 !important;
        }
        
        .event-mouseleave {
            background-color: #ffccbc !important;
        }
        
        .event-mousemove {
            background-color: #fff9c4 !important;
        }
        
        .event-keydown {
            background-color: #bbdefb !important;
            transform: translateY(5px);
        }
        
        .event-entry {
            padding: 8px;
            margin-bottom: 5px;
            border-bottom: 1px solid #eee;
            animation: fadeIn 0.3s ease;
        }
        
        .event-description {
            font-size: 0.85em;
            color: #666;
            display: block;
        }
        
        .event-details {
            font-size: 0.85em;
            color: #0277bd;
            display: block;
            font-family: monospace;
        }
        
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 15px;
            background-color: #333;
            color: white;
            border-radius: 4px;
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .toast-info {
            background-color: #2196f3;
        }
        
        .toast-warning {
            background-color: #ff9800;
        }
        
        .element-info {
            font-family: monospace;
            background-color: #f5f5f5;
            padding: 2px 4px;
            border-radius: 3px;
        }
        
        .tip {
            font-size: 0.9em;
            color: #666;
            font-style: italic;
            margin-top: 10px;
            padding: 5px;
            background-color: #fff9c4;
            border-radius: 3px;
        }
        
        .method-explanation {
            margin-top: 15px;
            padding: 10px;
            background-color: #f1f8e9;
            border-left: 4px solid #8bc34a;
            border-radius: 0 4px 4px 0;
        }
        
        .creation-steps {
            margin-top: 15px;
            padding: 10px;
            background-color: #e8f5e9;
            border-radius: 4px;
        }
        
        .creation-steps ol {
            margin-left: 20px;
        }
        
        .creation-steps li {
            margin-bottom: 8px;
        }
        
        .additional-info {
            margin-top: 15px;
            padding: 10px;
            background-color: #e3f2fd;
            border-radius: 4px;
        }
        
        .selector-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            font-size: 0.9em;
        }
        
        .selector-table th, .selector-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        
        .selector-table th {
            background-color: #f5f5f5;
        }
        
        .custom-event {
            padding: 10px !important;
        }
    `;
    
    document.head.appendChild(style);
    
    // =====================================================================
    // SECTION 5: DOM Visualization - Document Structure
    // =====================================================================
    
    // Optional: Add a function to dynamically visualize the DOM structure
    console.log('✨ DOM Basics Interactive Tutorial loaded successfully');
    console.log('💡 Tip: Open the console and explore the guides:');
    console.log('- window.elementSelectionGuide');
    console.log('- window.domManipulationGuide');
    console.log('- window.eventHandlingGuide');
});
