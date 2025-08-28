// Advanced DOM Functionality
// This script implements the more advanced DOM manipulation, element selection and event handling features

document.addEventListener('DOMContentLoaded', function() {
    console.log('⚡ Advanced DOM features initialized');
    
    // Initialize all advanced features
    initializeSelectionPlayground();
    initializeSelectionChallenges();
    initializeManipulationTabs();
    initializeEventTabs();
});

// =====================================================================
// Advanced Element Selection - Interactive Playground
// =====================================================================

function initializeSelectionPlayground() {
    const playground = document.querySelector('.selection-playground');
    if (!playground) return;
    
    console.log('Initializing selection playground...');

    // Set up event listeners for playground items
    const items = document.querySelectorAll('.playground-item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            const wasSelected = this.classList.contains('selected');
            
            // Clear previous selections
            items.forEach(i => i.classList.remove('selected'));
            
            // Toggle selection
            if (!wasSelected) {
                this.classList.add('selected');
                
                // Display selection info
                const selectionInfo = document.getElementById('selection-info');
                if (selectionInfo) {
                    const classes = Array.from(this.classList).join('.');
                    selectionInfo.innerHTML = `
                        <p>Selected: <code>&lt;div class="${this.className}"&gt;</code></p>
                        <p>To select this element:</p>
                        <code>document.querySelector('.${classes}');</code>
                    `;
                }
            }
        });
    });
}

// =====================================================================
// Element Selection Challenges
// =====================================================================

function initializeSelectionChallenges() {
    const challenges = document.querySelectorAll('.challenge-item');
    if (!challenges.length) return;
    
    console.log('Initializing selection challenges...');

    challenges.forEach(challenge => {
        const checkButton = challenge.querySelector('.check-button');
        const input = challenge.querySelector('input');
        const result = challenge.querySelector('.challenge-result');
        
        if (checkButton && input && result) {
            checkButton.addEventListener('click', function() {
                const selector = input.value.trim();
                const expectedCount = parseInt(challenge.dataset.expectedCount || "0");
                const expectedTarget = challenge.dataset.expectedTarget;
                
                if (!selector) {
                    result.textContent = "Please enter a selector";
                    result.className = 'challenge-result challenge-error';
                    return;
                }
                
                try {
                    const elements = document.querySelectorAll(selector);
                    
                    // Check if we found the expected number of elements
                    if (elements.length === expectedCount) {
                        // If specific target is expected, check if it's included
                        if (expectedTarget) {
                            const targetFound = Array.from(elements).some(el => 
                                el.matches(expectedTarget) || el.id === expectedTarget.replace('#', '')
                            );
                            
                            if (targetFound) {
                                result.textContent = "Correct! 🎉";
                                result.className = 'challenge-result challenge-success';
                                
                                // Highlight the selected elements
                                elements.forEach(el => highlightElement(el));
                            } else {
                                result.textContent = "Wrong selection. Try again!";
                                result.className = 'challenge-result challenge-error';
                            }
                        } else {
                            result.textContent = "Correct! 🎉";
                            result.className = 'challenge-result challenge-success';
                            
                            // Highlight the selected elements
                            elements.forEach(el => highlightElement(el));
                        }
                    } else {
                        result.textContent = `Found ${elements.length} elements, expected ${expectedCount}`;
                        result.className = 'challenge-result challenge-error';
                    }
                } catch (error) {
                    result.textContent = `Error: ${error.message}`;
                    result.className = 'challenge-result challenge-error';
                }
            });
            
            // Allow pressing Enter to check
            input.addEventListener('keyup', function(event) {
                if (event.key === "Enter") {
                    checkButton.click();
                }
            });
        }
    });
}

// =====================================================================
// Advanced DOM Manipulation Tabs
// =====================================================================

function initializeManipulationTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (!tabButtons.length || !tabContents.length) return;
    
    console.log('Initializing manipulation tabs...');
    
    // Initialize tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            const target = this.getAttribute('data-target');
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Set first tab as active by default
    if (tabButtons[0] && tabContents[0]) {
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
    }
    
    // Initialize the attributes demo
    initializeAttributesDemo();
    
    // Initialize the styles demo
    initializeStylesDemo();
    
    // Initialize the DOM creation demo
    initializeDOMCreationDemo();
}

// =====================================================================
// Attributes Demo
// =====================================================================

function initializeAttributesDemo() {
    const attributesDemo = document.querySelector('.attributes-demo');
    if (!attributesDemo) return;
    
    console.log('Initializing attributes demo...');
    
    const previewElement = document.querySelector('.preview-element');
    const attrNameInput = document.getElementById('attr-name');
    const attrValueInput = document.getElementById('attr-value');
    const setAttrBtn = document.getElementById('set-attr');
    const removeAttrBtn = document.getElementById('remove-attr');
    const getAttrBtn = document.getElementById('get-attr');
    const hasAttrBtn = document.getElementById('has-attr');
    const attrResult = document.getElementById('attr-result');
    
    if (previewElement && attrNameInput && attrValueInput && setAttrBtn && removeAttrBtn && getAttrBtn && hasAttrBtn && attrResult) {
        // Set attribute
        setAttrBtn.addEventListener('click', function() {
            const name = attrNameInput.value.trim();
            const value = attrValueInput.value.trim();
            
            if (name) {
                previewElement.setAttribute(name, value);
                attrResult.textContent = `Set attribute ${name}="${value}"`;
                updateElementDisplay();
            } else {
                attrResult.textContent = 'Please enter an attribute name';
            }
        });
        
        // Remove attribute
        removeAttrBtn.addEventListener('click', function() {
            const name = attrNameInput.value.trim();
            
            if (name) {
                if (previewElement.hasAttribute(name)) {
                    previewElement.removeAttribute(name);
                    attrResult.textContent = `Removed attribute "${name}"`;
                    updateElementDisplay();
                } else {
                    attrResult.textContent = `Attribute "${name}" does not exist`;
                }
            } else {
                attrResult.textContent = 'Please enter an attribute name';
            }
        });
        
        // Get attribute
        getAttrBtn.addEventListener('click', function() {
            const name = attrNameInput.value.trim();
            
            if (name) {
                const value = previewElement.getAttribute(name);
                if (value !== null) {
                    attrResult.textContent = `Attribute "${name}" has value "${value}"`;
                } else {
                    attrResult.textContent = `Attribute "${name}" does not exist`;
                }
            } else {
                attrResult.textContent = 'Please enter an attribute name';
            }
        });
        
        // Has attribute
        hasAttrBtn.addEventListener('click', function() {
            const name = attrNameInput.value.trim();
            
            if (name) {
                const hasAttr = previewElement.hasAttribute(name);
                attrResult.textContent = `Element ${hasAttr ? 'has' : 'does not have'} attribute "${name}"`;
            } else {
                attrResult.textContent = 'Please enter an attribute name';
            }
        });
        
        function updateElementDisplay() {
            const attributes = previewElement.attributes;
            let attrHTML = '';
            
            for (let i = 0; i < attributes.length; i++) {
                const attr = attributes[i];
                attrHTML += `${attr.name}="${attr.value}" `;
            }
            
            const elementCode = document.getElementById('element-code');
            if (elementCode) {
                elementCode.textContent = `<div ${attrHTML}>Element Preview</div>`;
            }
        }
        
        // Initialize the display
        updateElementDisplay();
    }
}

// =====================================================================
// Styles Demo
// =====================================================================

function initializeStylesDemo() {
    const stylesDemo = document.querySelector('.styles-demo');
    if (!stylesDemo) return;
    
    console.log('Initializing styles demo...');
    
    const styleTarget = document.querySelector('.style-target');
    const colorInput = document.getElementById('style-color');
    const bgColorInput = document.getElementById('style-bg-color');
    const fontSizeInput = document.getElementById('style-font-size');
    const borderRadiusInput = document.getElementById('style-border-radius');
    const paddingInput = document.getElementById('style-padding');
    const resetStylesBtn = document.getElementById('reset-styles');
    
    if (styleTarget && colorInput && bgColorInput && fontSizeInput && borderRadiusInput && paddingInput && resetStylesBtn) {
        // Apply color
        colorInput.addEventListener('input', function() {
            styleTarget.style.color = this.value;
            updateStyleDisplay();
        });
        
        // Apply background color
        bgColorInput.addEventListener('input', function() {
            styleTarget.style.backgroundColor = this.value;
            updateStyleDisplay();
        });
        
        // Apply font size
        fontSizeInput.addEventListener('input', function() {
            styleTarget.style.fontSize = `${this.value}px`;
            updateStyleDisplay();
        });
        
        // Apply border radius
        borderRadiusInput.addEventListener('input', function() {
            styleTarget.style.borderRadius = `${this.value}px`;
            updateStyleDisplay();
        });
        
        // Apply padding
        paddingInput.addEventListener('input', function() {
            styleTarget.style.padding = `${this.value}px`;
            updateStyleDisplay();
        });
        
        // Reset styles
        resetStylesBtn.addEventListener('click', function() {
            styleTarget.style = '';
            colorInput.value = '#000000';
            bgColorInput.value = '#ffffff';
            fontSizeInput.value = 16;
            borderRadiusInput.value = 0;
            paddingInput.value = 30;
            updateStyleDisplay();
        });
        
        function updateStyleDisplay() {
            const styleCode = document.getElementById('style-code');
            if (styleCode) {
                const computedStyle = window.getComputedStyle(styleTarget);
                styleCode.textContent = `
element.style.color = '${computedStyle.color}';
element.style.backgroundColor = '${computedStyle.backgroundColor}';
element.style.fontSize = '${computedStyle.fontSize}';
element.style.borderRadius = '${computedStyle.borderRadius}';
element.style.padding = '${computedStyle.padding}';
                `.trim();
            }
        }
        
        // Initialize the display
        updateStyleDisplay();
    }
}

// =====================================================================
// DOM Creation Demo
// =====================================================================

function initializeDOMCreationDemo() {
    const creationDemo = document.querySelector('.dom-creation-demo');
    if (!creationDemo) return;
    
    console.log('Initializing DOM creation demo...');
    
    const elementTypeSelect = document.getElementById('element-type');
    const elementTextInput = document.getElementById('element-text');
    const createElement = document.getElementById('create-element');
    const insertBefore = document.getElementById('insert-before');
    const appendElement = document.getElementById('append-element');
    const cloneElement = document.getElementById('clone-element');
    const removeElement = document.getElementById('remove-element');
    const replaceElement = document.getElementById('replace-element');
    const resetContainer = document.getElementById('reset-container');
    const dynamicContainer = document.querySelector('.dynamic-container');
    
    if (elementTypeSelect && elementTextInput && createElement && insertBefore && appendElement && 
        cloneElement && removeElement && replaceElement && resetContainer && dynamicContainer) {
        
        // Create element
        createElement.addEventListener('click', function() {
            const elementType = elementTypeSelect.value;
            const elementText = elementTextInput.value || `New ${elementType} element`;
            
            const newElement = document.createElement(elementType);
            newElement.textContent = elementText;
            newElement.className = 'created-element';
            newElement.style.padding = '10px';
            newElement.style.margin = '5px';
            newElement.style.backgroundColor = '#e3f2fd';
            newElement.style.borderRadius = '4px';
            
            // Add unique ID for identification
            newElement.id = `element-${Date.now()}`;
            
            dynamicContainer.appendChild(newElement);
            
            highlightElement(newElement);
            updateCreationCode('createElement', elementType, elementText);
        });
        
        // Insert before
        insertBefore.addEventListener('click', function() {
            const elements = dynamicContainer.querySelectorAll('.created-element');
            if (elements.length > 0) {
                const targetElement = elements[0]; // Insert before the first element
                
                const elementType = elementTypeSelect.value;
                const elementText = elementTextInput.value || `New ${elementType} (inserted before)`;
                
                const newElement = document.createElement(elementType);
                newElement.textContent = elementText;
                newElement.className = 'created-element';
                newElement.style.padding = '10px';
                newElement.style.margin = '5px';
                newElement.style.backgroundColor = '#fff9c4';
                newElement.style.borderRadius = '4px';
                
                // Add unique ID for identification
                newElement.id = `element-${Date.now()}`;
                
                dynamicContainer.insertBefore(newElement, targetElement);
                
                highlightElement(newElement);
                updateCreationCode('insertBefore', elementType, elementText);
            } else {
                alert('Create an element first');
            }
        });
        
        // Append element
        appendElement.addEventListener('click', function() {
            const elementType = elementTypeSelect.value;
            const elementText = elementTextInput.value || `New ${elementType} (appended)`;
            
            const newElement = document.createElement(elementType);
            newElement.textContent = elementText;
            newElement.className = 'created-element';
            newElement.style.padding = '10px';
            newElement.style.margin = '5px';
            newElement.style.backgroundColor = '#c8e6c9';
            newElement.style.borderRadius = '4px';
            
            // Add unique ID for identification
            newElement.id = `element-${Date.now()}`;
            
            dynamicContainer.appendChild(newElement);
            
            highlightElement(newElement);
            updateCreationCode('appendChild', elementType, elementText);
        });
        
        // Clone element
        cloneElement.addEventListener('click', function() {
            const elements = dynamicContainer.querySelectorAll('.created-element');
            if (elements.length > 0) {
                const lastElement = elements[elements.length - 1];
                const clonedElement = lastElement.cloneNode(true);
                
                // Update ID to make it unique
                clonedElement.id = `element-${Date.now()}`;
                clonedElement.textContent += ' (cloned)';
                clonedElement.style.backgroundColor = '#bbdefb';
                
                dynamicContainer.appendChild(clonedElement);
                
                highlightElement(clonedElement);
                updateCreationCode('cloneNode', lastElement.tagName.toLowerCase(), clonedElement.textContent);
            } else {
                alert('Create an element first');
            }
        });
        
        // Remove element
        removeElement.addEventListener('click', function() {
            const elements = dynamicContainer.querySelectorAll('.created-element');
            if (elements.length > 0) {
                const lastElement = elements[elements.length - 1];
                const elementInfo = {
                    type: lastElement.tagName.toLowerCase(),
                    text: lastElement.textContent
                };
                
                lastElement.remove();
                updateCreationCode('remove', elementInfo.type, elementInfo.text);
            } else {
                alert('No elements to remove');
            }
        });
        
        // Replace element
        replaceElement.addEventListener('click', function() {
            const elements = dynamicContainer.querySelectorAll('.created-element');
            if (elements.length > 0) {
                const targetElement = elements[0]; // Replace the first element
                
                const elementType = elementTypeSelect.value;
                const elementText = elementTextInput.value || `New ${elementType} (replacement)`;
                
                const newElement = document.createElement(elementType);
                newElement.textContent = elementText;
                newElement.className = 'created-element';
                newElement.style.padding = '10px';
                newElement.style.margin = '5px';
                newElement.style.backgroundColor = '#f8bbd0';
                newElement.style.borderRadius = '4px';
                
                // Add unique ID for identification
                newElement.id = `element-${Date.now()}`;
                
                targetElement.replaceWith(newElement);
                
                highlightElement(newElement);
                updateCreationCode('replaceWith', elementType, elementText);
            } else {
                alert('Create an element first');
            }
        });
        
        // Reset container
        resetContainer.addEventListener('click', function() {
            dynamicContainer.innerHTML = '';
            
            const creationCode = document.getElementById('creation-code');
            if (creationCode) {
                creationCode.textContent = '// Container has been reset';
            }
        });
        
        function updateCreationCode(method, elementType, elementText) {
            const creationCode = document.getElementById('creation-code');
            if (creationCode) {
                switch(method) {
                    case 'createElement':
                        creationCode.textContent = `
// Create a new element
const newElement = document.createElement('${elementType}');
newElement.textContent = '${elementText}';
newElement.className = 'created-element';

// Add the element to the container
container.appendChild(newElement);
                        `;
                        break;
                        
                    case 'insertBefore':
                        creationCode.textContent = `
// Create a new element
const newElement = document.createElement('${elementType}');
newElement.textContent = '${elementText}';
newElement.className = 'created-element';

// Insert before the first element in the container
const firstElement = container.querySelector('.created-element');
container.insertBefore(newElement, firstElement);
                        `;
                        break;
                        
                    case 'appendChild':
                        creationCode.textContent = `
// Create a new element
const newElement = document.createElement('${elementType}');
newElement.textContent = '${elementText}';
newElement.className = 'created-element';

// Append to the end of the container
container.appendChild(newElement);
                        `;
                        break;
                        
                    case 'cloneNode':
                        creationCode.textContent = `
// Clone the last element (including its content)
const lastElement = container.querySelector('.created-element:last-child');
const clonedElement = lastElement.cloneNode(true);
clonedElement.textContent += ' (cloned)';

// Add the cloned element to the container
container.appendChild(clonedElement);
                        `;
                        break;
                        
                    case 'remove':
                        creationCode.textContent = `
// Remove the last element
const lastElement = container.querySelector('.created-element:last-child');
lastElement.remove();
                        `;
                        break;
                        
                    case 'replaceWith':
                        creationCode.textContent = `
// Create a replacement element
const newElement = document.createElement('${elementType}');
newElement.textContent = '${elementText}';
newElement.className = 'created-element';

// Replace the first element with the new one
const firstElement = container.querySelector('.created-element:first-child');
firstElement.replaceWith(newElement);
                        `;
                        break;
                }
            }
        }
    }
}

// =====================================================================
// Event Listeners Advanced Tabs
// =====================================================================

function initializeEventTabs() {
    const eventTabButtons = document.querySelectorAll('.event-tab-button');
    const eventContents = document.querySelectorAll('.event-content');
    
    if (!eventTabButtons.length || !eventContents.length) return;
    
    console.log('Initializing event tabs...');
    
    // Initialize tabs
    eventTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            eventTabButtons.forEach(btn => btn.classList.remove('active'));
            eventContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            const target = this.getAttribute('data-target');
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Set first tab as active by default
    if (eventTabButtons[0] && eventContents[0]) {
        eventTabButtons[0].classList.add('active');
        eventContents[0].classList.add('active');
    }
    
    // Initialize event propagation demo
    initializeEventPropagation();
    
    // Initialize event delegation demo
    initializeEventDelegation();
    
    // Initialize custom events demo
    initializeCustomEvents();
}

// =====================================================================
// Event Propagation Demo
// =====================================================================

function initializeEventPropagation() {
    const propagationContainer = document.querySelector('.propagation-container');
    const propagationMiddle = document.querySelector('.propagation-middle');
    const propagationInner = document.querySelector('.propagation-inner');
    const propagationLog = document.querySelector('.propagation-log');
    const captureToggle = document.getElementById('capture-toggle');
    const stopToggle = document.getElementById('stop-toggle');
    const clearPropagationLog = document.getElementById('clear-propagation-log');
    
    if (!propagationContainer || !propagationMiddle || !propagationInner || !propagationLog) return;
    
    console.log('Initializing event propagation demo...');
    
    let useCapture = false;
    let stopPropagation = false;
    
    function logPropagation(level, phase) {
        const entry = document.createElement('div');
        entry.textContent = `${level} - ${phase} phase`;
        propagationLog.insertBefore(entry, propagationLog.firstChild);
    }
    
    function attachPropagationListeners() {
        // Remove old listeners first
        propagationContainer.removeEventListener('click', containerClick, true);
        propagationContainer.removeEventListener('click', containerClick, false);
        propagationMiddle.removeEventListener('click', middleClick, true);
        propagationMiddle.removeEventListener('click', middleClick, false);
        propagationInner.removeEventListener('click', innerClick, true);
        propagationInner.removeEventListener('click', innerClick, false);
        
        // Add new listeners
        propagationContainer.addEventListener('click', containerClick, useCapture);
        propagationMiddle.addEventListener('click', middleClick, useCapture);
        propagationInner.addEventListener('click', innerClick, useCapture);
    }
    
    function containerClick(event) {
        logPropagation('Outer div', useCapture ? 'Capture' : 'Bubble');
    }
    
    function middleClick(event) {
        logPropagation('Middle div', useCapture ? 'Capture' : 'Bubble');
        if (stopPropagation) event.stopPropagation();
    }
    
    function innerClick(event) {
        logPropagation('Inner div', useCapture ? 'Capture' : 'Bubble');
        if (stopPropagation) event.stopPropagation();
    }
    
    // Initialize listeners
    attachPropagationListeners();
    
    // Capture toggle
    if (captureToggle) {
        captureToggle.addEventListener('change', function() {
            useCapture = this.checked;
            attachPropagationListeners();
            const modeEntry = document.createElement('div');
            modeEntry.textContent = `Changed to ${useCapture ? 'Capture' : 'Bubble'} phase`;
            modeEntry.style.fontWeight = 'bold';
            propagationLog.insertBefore(modeEntry, propagationLog.firstChild);
        });
    }
    
    // Stop propagation toggle
    if (stopToggle) {
        stopToggle.addEventListener('change', function() {
            stopPropagation = this.checked;
            const modeEntry = document.createElement('div');
            modeEntry.textContent = `${stopPropagation ? 'Enabled' : 'Disabled'} stopPropagation()`;
            modeEntry.style.fontWeight = 'bold';
            propagationLog.insertBefore(modeEntry, propagationLog.firstChild);
        });
    }
    
    // Clear log button
    if (clearPropagationLog) {
        clearPropagationLog.addEventListener('click', function() {
            propagationLog.innerHTML = '';
        });
    }
}

// =====================================================================
// Event Delegation Demo
// =====================================================================

function initializeEventDelegation() {
    const delegationContainer = document.querySelector('.delegation-container');
    const delegationList = document.querySelector('.delegation-list');
    const addItemButton = document.getElementById('add-delegation-item');
    const resetItemsButton = document.getElementById('reset-delegation-items');
    const delegationLog = document.querySelector('.delegation-log');
    
    if (!delegationContainer || !delegationList || !addItemButton || !resetItemsButton || !delegationLog) return;
    
    console.log('Initializing event delegation demo...');
    
    // Add initial items
    for (let i = 1; i <= 3; i++) {
        addDelegationItem(i);
    }
    
    // Event delegation
    delegationList.addEventListener('click', function(event) {
        // Check if a list item was clicked
        if (event.target.matches('.delegation-item')) {
            logDelegationEvent(event.target.textContent);
            event.target.style.backgroundColor = getRandomColor(true);
        }
    });
    
    // Add item button
    addItemButton.addEventListener('click', function() {
        const itemCount = delegationList.children.length + 1;
        addDelegationItem(itemCount);
        logDelegationEvent(`Added item ${itemCount}`);
    });
    
    // Reset items button
    resetItemsButton.addEventListener('click', function() {
        delegationList.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
            addDelegationItem(i);
        }
        logDelegationEvent('Reset all items');
    });
    
    function addDelegationItem(num) {
        const item = document.createElement('li');
        item.className = 'delegation-item';
        item.textContent = `Item ${num}`;
        delegationList.appendChild(item);
    }
    
    function logDelegationEvent(message) {
        const entry = document.createElement('div');
        entry.textContent = message;
        delegationLog.insertBefore(entry, delegationLog.firstChild);
    }
}

// =====================================================================
// Custom Events Demo
// =====================================================================

function initializeCustomEvents() {
    const eventSender = document.querySelector('.event-sender');
    const eventReceiver = document.querySelector('.event-receiver');
    const senderBox = document.querySelector('.event-sender .event-box');
    const receiverBox = document.querySelector('.event-receiver .event-box');
    const customEventLog = document.querySelector('.custom-event-log');
    const customEventName = document.getElementById('custom-event-name');
    const customEventData = document.getElementById('custom-event-data');
    const dispatchEventButton = document.getElementById('dispatch-event');
    
    if (!eventSender || !eventReceiver || !senderBox || !receiverBox || !customEventLog || 
        !customEventName || !customEventData || !dispatchEventButton) return;
    
    console.log('Initializing custom events demo...');
    
    // Event listener for the receiver
    document.addEventListener('DOMContentLoaded', function() {
        // Add listener for the default custom event
        receiverBox.addEventListener('customMessage', function(event) {
            logCustomEvent(`Received custom event: ${event.type}`);
            
            if (event.detail) {
                logCustomEvent(`Event data: ${JSON.stringify(event.detail)}`);
            }
            
            // Visual feedback
            receiverBox.style.backgroundColor = getRandomColor(true);
            setTimeout(() => {
                receiverBox.style.backgroundColor = '';
            }, 1000);
        });
    });
    
    // Dispatch button
    dispatchEventButton.addEventListener('click', function() {
        const eventName = customEventName.value.trim() || 'customMessage';
        const data = customEventData.value.trim();
        let eventData = {};
        
        try {
            if (data) {
                eventData = JSON.parse(data);
            }
        } catch (e) {
            eventData = { message: data };
        }
        
        // Create and dispatch the custom event
        const customEvent = new CustomEvent(eventName, {
            bubbles: true,
            detail: eventData
        });
        
        senderBox.dispatchEvent(customEvent);
        
        // Visual feedback for the sender
        senderBox.style.backgroundColor = getRandomColor(true);
        setTimeout(() => {
            senderBox.style.backgroundColor = '';
        }, 1000);
        
        logCustomEvent(`Dispatched event: ${eventName}`);
    });
    
    function logCustomEvent(message) {
        const entry = document.createElement('div');
        entry.textContent = message;
        customEventLog.insertBefore(entry, customEventLog.firstChild);
    }
}

// =====================================================================
// Utility Functions
// =====================================================================

function highlightElement(element) {
    if (!element) return;
    
    // Store original styles
    const originalBg = element.style.backgroundColor;
    const originalBorder = element.style.border;
    const originalTransition = element.style.transition;
    
    // Apply highlight
    element.style.backgroundColor = '#ffeb3b';
    element.style.border = '2px solid #ffc107';
    element.style.transition = 'all 0.5s ease';
    
    // Remove highlight after animation
    setTimeout(() => {
        element.style.backgroundColor = originalBg;
        element.style.border = originalBorder;
        
        setTimeout(() => {
            element.style.transition = originalTransition;
        }, 500);
    }, 1000);
}

function getRandomColor(light = false) {
    let r, g, b;
    
    if (light) {
        // Generate lighter colors
        r = Math.floor(Math.random() * 100) + 155;
        g = Math.floor(Math.random() * 100) + 155;
        b = Math.floor(Math.random() * 100) + 155;
    } else {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    }
    
    return `rgb(${r}, ${g}, ${b})`;
}
