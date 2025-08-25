// Event Listeners JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Initialize all demonstration sections
    initEventBasics();
    initCommonEvents();
    initEventPropagation();
    initEventDelegation();
    initCustomEvents();
});

// =============== Event Basics Section ===============
function initEventBasics() {
    const clickBox = document.getElementById('click-box');
    const clickLog = document.getElementById('click-log');
    const clearButton = document.getElementById('clear-click-log');
    
    // Click event
    clickBox.addEventListener('click', function(event) {
        const time = new Date().toLocaleTimeString();
        clickLog.textContent += `[${time}] Clicked! | `;
        
        // Change background color temporarily
        clickBox.style.backgroundColor = '#d4edda';
        setTimeout(function() {
            clickBox.style.backgroundColor = '';
        }, 300);
        
        console.log('Click event fired:', event);
    });
    
    // Clear log button
    clearButton.addEventListener('click', function() {
        clickLog.textContent = '';
    });
}

// =============== Common Events Section ===============
function initCommonEvents() {
    initMouseEvents();
    initKeyboardEvents();
    initFormEvents();
    initDocumentEvents();
}

// Mouse Events
function initMouseEvents() {
    const demoArea = document.querySelector('#mouse-events .event-demo-area');
    const eventLog = document.querySelector('#mouse-events .event-log span');
    const eventButtons = document.querySelectorAll('#mouse-events .event-buttons button');
    
    const events = {
        click: false,
        dblclick: false,
        mousedown: false,
        mouseup: false,
        mousemove: false,
        mouseenter: false,
        mouseleave: false
    };
    
    // Toggle event listeners when buttons are clicked
    eventButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventType = button.getAttribute('data-event');
            events[eventType] = !events[eventType];
            
            // Update button appearance
            if (events[eventType]) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
            
            // Add or remove the event listener
            if (events[eventType]) {
                demoArea.addEventListener(eventType, logMouseEvent);
            } else {
                demoArea.removeEventListener(eventType, logMouseEvent);
            }
        });
    });
    
    // Function to log mouse events
    function logMouseEvent(event) {
        const time = new Date().toLocaleTimeString();
        eventLog.textContent = `[${time}] ${event.type}`;
        
        // For mousemove, add coordinates
        if (event.type === 'mousemove') {
            // Only update every 100ms to prevent too many updates
            if (!demoArea.lastMoveTime || Date.now() - demoArea.lastMoveTime > 100) {
                eventLog.textContent += ` at x:${event.offsetX}, y:${event.offsetY}`;
                demoArea.lastMoveTime = Date.now();
            }
        }
        
        // Flash the demo area
        demoArea.style.backgroundColor = '#f0f0f0';
        setTimeout(() => {
            demoArea.style.backgroundColor = '';
        }, 200);
    }
}

// Keyboard Events
function initKeyboardEvents() {
    const inputField = document.getElementById('keyboard-input');
    const eventLog = document.querySelector('#keyboard-events .event-log span');
    const eventButtons = document.querySelectorAll('#keyboard-events .event-buttons button');
    
    const events = {
        keydown: false,
        keyup: false,
        keypress: false
    };
    
    // Toggle event listeners when buttons are clicked
    eventButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventType = button.getAttribute('data-event');
            events[eventType] = !events[eventType];
            
            // Update button appearance
            if (events[eventType]) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
            
            // Add or remove the event listener
            if (events[eventType]) {
                inputField.addEventListener(eventType, logKeyboardEvent);
            } else {
                inputField.removeEventListener(eventType, logKeyboardEvent);
            }
        });
    });
    
    // Function to log keyboard events
    function logKeyboardEvent(event) {
        const time = new Date().toLocaleTimeString();
        eventLog.textContent = `[${time}] ${event.type}: ${event.key} (code: ${event.code})`;
        
        // Flash the input field
        inputField.style.backgroundColor = '#f0f0f0';
        setTimeout(() => {
            inputField.style.backgroundColor = '';
        }, 200);
    }
}

// Form Events
function initFormEvents() {
    const form = document.getElementById('demo-form');
    const nameInput = document.getElementById('form-name');
    const selection = document.getElementById('form-selection');
    const eventLog = document.querySelector('#form-events .event-log span');
    const eventButtons = document.querySelectorAll('#form-events .event-buttons button');
    
    const events = {
        focus: false,
        blur: false,
        change: false,
        submit: false
    };
    
    // Toggle event listeners when buttons are clicked
    eventButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventType = button.getAttribute('data-event');
            events[eventType] = !events[eventType];
            
            // Update button appearance
            if (events[eventType]) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
            
            // Add or remove the event listener based on the event type
            if (eventType === 'submit') {
                if (events[eventType]) {
                    form.addEventListener(eventType, logFormEvent);
                } else {
                    form.removeEventListener(eventType, logFormEvent);
                }
            } else {
                // For focus, blur, change events, add to both input and select
                if (events[eventType]) {
                    nameInput.addEventListener(eventType, logFormEvent);
                    selection.addEventListener(eventType, logFormEvent);
                } else {
                    nameInput.removeEventListener(eventType, logFormEvent);
                    selection.removeEventListener(eventType, logFormEvent);
                }
            }
        });
    });
    
    // Function to log form events
    function logFormEvent(event) {
        const time = new Date().toLocaleTimeString();
        
        // For submit events, prevent the default action
        if (event.type === 'submit') {
            event.preventDefault();
            eventLog.textContent = `[${time}] Form submitted`;
        } else {
            // For other events, show which element triggered it
            const elementType = event.target.tagName.toLowerCase();
            const elementId = event.target.id;
            eventLog.textContent = `[${time}] ${event.type} on ${elementType}#${elementId}`;
            
            // For change events, show the new value
            if (event.type === 'change') {
                eventLog.textContent += ` (value: ${event.target.value})`;
            }
        }
        
        // Highlight the element that triggered the event
        if (event.target !== form) {
            event.target.style.backgroundColor = '#f0f0f0';
            setTimeout(() => {
                event.target.style.backgroundColor = '';
            }, 500);
        }
    }
}

// Document/Window Events
function initDocumentEvents() {
    const resizeDemo = document.getElementById('resize-demo');
    const triggerScrollButton = document.getElementById('trigger-scroll');
    const eventLog = document.querySelector('#document-events .event-log span');
    const eventButtons = document.querySelectorAll('#document-events .event-buttons button');
    
    const events = {
        load: false,
        resize: false,
        scroll: false
    };
    
    // Initial window dimensions
    updateResizeDemo();
    
    // Toggle event listeners when buttons are clicked
    eventButtons.forEach(button => {
        button.addEventListener('click', function() {
            const eventType = button.getAttribute('data-event');
            events[eventType] = !events[eventType];
            
            // Update button appearance
            if (events[eventType]) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
            
            // Add or remove the event listener
            if (events[eventType]) {
                window.addEventListener(eventType, logDocumentEvent);
            } else {
                window.removeEventListener(eventType, logDocumentEvent);
            }
        });
    });
    
    // Trigger scroll button
    triggerScrollButton.addEventListener('click', function() {
        // Scroll to the top of the document
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Function to log document events
    function logDocumentEvent(event) {
        const time = new Date().toLocaleTimeString();
        
        if (event.type === 'resize') {
            eventLog.textContent = `[${time}] Window resized to ${window.innerWidth}x${window.innerHeight}`;
            updateResizeDemo();
        } else if (event.type === 'scroll') {
            eventLog.textContent = `[${time}] Scrolled to position y:${window.scrollY}`;
        } else {
            eventLog.textContent = `[${time}] ${event.type} event fired`;
        }
    }
    
    // Update the resize demo with current window dimensions
    function updateResizeDemo() {
        resizeDemo.textContent = `Window: ${window.innerWidth}x${window.innerHeight}`;
    }
}

// =============== Event Propagation Section ===============
function initEventPropagation() {
    const outer = document.getElementById('outer');
    const middle = document.getElementById('middle');
    const inner = document.getElementById('inner');
    const propagationLog = document.getElementById('propagation-log');
    const phaseSelect = document.getElementById('propagation-phase');
    const stopPropagationCheckbox = document.getElementById('stop-propagation');
    const preventDefaultCheckbox = document.getElementById('prevent-default');
    
    // Clear log
    propagationLog.innerHTML = '';
    
    // Track which phases to show
    let showPhases = {
        capturing: true,
        bubbling: true
    };
    
    // Update phases to show based on select value
    phaseSelect.addEventListener('change', function() {
        const phase = phaseSelect.value;
        
        if (phase === 'both') {
            showPhases.capturing = true;
            showPhases.bubbling = true;
        } else if (phase === 'bubbling') {
            showPhases.capturing = false;
            showPhases.bubbling = true;
        } else if (phase === 'capturing') {
            showPhases.capturing = true;
            showPhases.bubbling = false;
        }
        
        // Reset event listeners
        removeEventListeners();
        addEventListeners();
    });
    
    // Add event listeners
    addEventListeners();
    
    function addEventListeners() {
        // Add event listeners for both phases if needed
        if (showPhases.capturing) {
            outer.addEventListener('click', handleClick, true);
            middle.addEventListener('click', handleClick, true);
            inner.addEventListener('click', handleClick, true);
        }
        
        if (showPhases.bubbling) {
            outer.addEventListener('click', handleClick, false);
            middle.addEventListener('click', handleClick, false);
            inner.addEventListener('click', handleClick, false);
        }
    }
    
    function removeEventListeners() {
        // Remove all event listeners
        outer.removeEventListener('click', handleClick, true);
        middle.removeEventListener('click', handleClick, true);
        inner.removeEventListener('click', handleClick, true);
        outer.removeEventListener('click', handleClick, false);
        middle.removeEventListener('click', handleClick, false);
        inner.removeEventListener('click', handleClick, false);
    }
    
    function handleClick(event) {
        // Get element ID and phase
        const elementId = event.currentTarget.id;
        const phase = event.eventPhase === 1 ? 'Capturing' : 'Bubbling';
        
        // Check if we should log this phase
        if ((phase === 'Capturing' && !showPhases.capturing) ||
            (phase === 'Bubbling' && !showPhases.bubbling)) {
            return;
        }
        
        // Create log entry
        const logEntry = document.createElement('div');
        logEntry.className = `propagation-log-entry phase-${phase.toLowerCase()}`;
        logEntry.textContent = `${phase} phase: ${elementId}`;
        propagationLog.appendChild(logEntry);
        
        // Scroll log to bottom
        propagationLog.scrollTop = propagationLog.scrollHeight;
        
        // Stop propagation if checkbox is checked and element is inner
        if (stopPropagationCheckbox.checked && elementId === 'inner') {
            event.stopPropagation();
            logEntry.textContent += ' (propagation stopped)';
        }
        
        // Prevent default if checkbox is checked
        if (preventDefaultCheckbox.checked) {
            event.preventDefault();
            logEntry.textContent += ' (default prevented)';
        }
    }
}

// =============== Event Delegation Section ===============
function initEventDelegation() {
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task');
    let taskCount = taskList.children.length;
    
    // Event delegation for the task list
    taskList.addEventListener('click', function(event) {
        // Check if a delete button was clicked
        if (event.target.classList.contains('delete-btn')) {
            // Remove the parent li element
            event.target.parentElement.remove();
        } 
        // Check if a task item was clicked (but not the delete button)
        else if (event.target.classList.contains('task-item')) {
            // Toggle completed class
            event.target.classList.toggle('completed');
        }
    });
    
    // Add new task
    addTaskButton.addEventListener('click', function() {
        taskCount++;
        
        // Create new task element
        const newTask = document.createElement('li');
        newTask.className = 'task-item';
        newTask.innerHTML = `Task ${taskCount} <span class="delete-btn">×</span>`;
        
        // Add task to the list
        taskList.appendChild(newTask);
    });
}

// =============== Custom Events Section ===============
function initCustomEvents() {
    const notificationContainer = document.getElementById('notification-container');
    const infoButton = document.getElementById('trigger-info');
    const warningButton = document.getElementById('trigger-warning');
    const errorButton = document.getElementById('trigger-error');
    
    // Add event listener for custom 'notification' events
    document.addEventListener('notification', function(event) {
        const { type, message } = event.detail;
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add to container
        notificationContainer.appendChild(notification);
        
        // Remove after delay
        setTimeout(function() {
            notification.style.opacity = '0';
            setTimeout(function() {
                notification.remove();
            }, 500);
        }, 3000);
    });
    
    // Info notification button
    infoButton.addEventListener('click', function() {
        dispatchNotification('info', 'This is an informational message');
    });
    
    // Warning notification button
    warningButton.addEventListener('click', function() {
        dispatchNotification('warning', 'Warning: This is a warning message');
    });
    
    // Error notification button
    errorButton.addEventListener('click', function() {
        dispatchNotification('error', 'Error: Something went wrong!');
    });
    
    // Function to dispatch a custom notification event
    function dispatchNotification(type, message) {
        const customEvent = new CustomEvent('notification', {
            detail: {
                type: type,
                message: message
            },
            bubbles: true,
            cancelable: true
        });
        
        // Dispatch the event
        document.dispatchEvent(customEvent);
    }
}
