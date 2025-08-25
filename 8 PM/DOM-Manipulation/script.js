// DOM Manipulation JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Tab functionality
    setupTabs();
    
    // Initialize all demonstration sections
    initContentManipulation();
    initAttributeManipulation();
    initStyleManipulation();
    initCreateDelete();
});

// Set up the tab navigation
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show the corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Initialize content manipulation section
function initContentManipulation() {
    const contentExample = document.getElementById('content-example');
    const textContentInput = document.getElementById('text-content');
    const innerHtmlInput = document.getElementById('inner-html');
    const innerTextInput = document.getElementById('inner-text');
    
    // Set textContent button
    document.getElementById('set-text-content').addEventListener('click', function() {
        contentExample.textContent = textContentInput.value;
        console.log('Set textContent:', textContentInput.value);
    });
    
    // Set innerHTML button
    document.getElementById('set-inner-html').addEventListener('click', function() {
        contentExample.innerHTML = innerHtmlInput.value;
        console.log('Set innerHTML:', innerHtmlInput.value);
    });
    
    // Set innerText button
    document.getElementById('set-inner-text').addEventListener('click', function() {
        contentExample.innerText = innerTextInput.value;
        console.log('Set innerText:', innerTextInput.value);
    });
}

// Initialize attribute manipulation section
function initAttributeManipulation() {
    const attributeExample = document.getElementById('attribute-example');
    const attributeNameSelect = document.getElementById('attribute-name');
    const customAttributeNameInput = document.getElementById('custom-attribute-name');
    const attributeValueInput = document.getElementById('attribute-value');
    const attributeResult = document.getElementById('attribute-result');
    
    // Show/hide custom attribute input based on selection
    attributeNameSelect.addEventListener('change', function() {
        if (attributeNameSelect.value === 'custom') {
            customAttributeNameInput.style.display = 'block';
        } else {
            customAttributeNameInput.style.display = 'none';
        }
    });
    
    // Get attribute button
    document.getElementById('get-attribute').addEventListener('click', function() {
        const attributeName = getAttributeName();
        const attributeValue = attributeExample.getAttribute(attributeName);
        attributeResult.value = attributeValue !== null ? attributeValue : 'Attribute not found';
        console.log(`Get attribute ${attributeName}:`, attributeValue);
    });
    
    // Set attribute button
    document.getElementById('set-attribute').addEventListener('click', function() {
        const attributeName = getAttributeName();
        const attributeValue = attributeValueInput.value;
        attributeExample.setAttribute(attributeName, attributeValue);
        attributeResult.value = `Set ${attributeName} to "${attributeValue}"`;
        console.log(`Set attribute ${attributeName}:`, attributeValue);
    });
    
    // Remove attribute button
    document.getElementById('remove-attribute').addEventListener('click', function() {
        const attributeName = getAttributeName();
        attributeExample.removeAttribute(attributeName);
        attributeResult.value = `Removed ${attributeName} attribute`;
        console.log(`Removed attribute:`, attributeName);
    });
    
    // Helper function to get the attribute name (handles custom attributes)
    function getAttributeName() {
        if (attributeNameSelect.value === 'custom') {
            return customAttributeNameInput.value;
        }
        return attributeNameSelect.value;
    }
}

// Initialize style manipulation section
function initStyleManipulation() {
    const styleExample = document.getElementById('style-example');
    const originalStyles = {
        backgroundColor: '#ffffff',
        color: '#000000',
        fontSize: '16px',
        borderWidth: '1px',
        borderRadius: '0px',
        padding: '10px'
    };
    
    // Background color input
    const bgColorInput = document.getElementById('background-color');
    bgColorInput.addEventListener('input', function() {
        styleExample.style.backgroundColor = bgColorInput.value;
        console.log('Changed background color:', bgColorInput.value);
    });
    
    // Text color input
    const textColorInput = document.getElementById('text-color');
    textColorInput.addEventListener('input', function() {
        styleExample.style.color = textColorInput.value;
        console.log('Changed text color:', textColorInput.value);
    });
    
    // Font size input
    const fontSizeInput = document.getElementById('font-size');
    const fontSizeValue = document.getElementById('font-size-value');
    fontSizeInput.addEventListener('input', function() {
        const size = fontSizeInput.value + 'px';
        styleExample.style.fontSize = size;
        fontSizeValue.textContent = size;
        console.log('Changed font size:', size);
    });
    
    // Border width input
    const borderWidthInput = document.getElementById('border-width');
    const borderWidthValue = document.getElementById('border-width-value');
    borderWidthInput.addEventListener('input', function() {
        const width = borderWidthInput.value + 'px';
        styleExample.style.borderWidth = width;
        borderWidthValue.textContent = width;
        console.log('Changed border width:', width);
    });
    
    // Border radius input
    const borderRadiusInput = document.getElementById('border-radius');
    const borderRadiusValue = document.getElementById('border-radius-value');
    borderRadiusInput.addEventListener('input', function() {
        const radius = borderRadiusInput.value + 'px';
        styleExample.style.borderRadius = radius;
        borderRadiusValue.textContent = radius;
        console.log('Changed border radius:', radius);
    });
    
    // Padding input
    const paddingInput = document.getElementById('padding');
    const paddingValue = document.getElementById('padding-value');
    paddingInput.addEventListener('input', function() {
        const padding = paddingInput.value + 'px';
        styleExample.style.padding = padding;
        paddingValue.textContent = padding;
        console.log('Changed padding:', padding);
    });
    
    // Reset styles button
    document.getElementById('reset-styles').addEventListener('click', function() {
        // Reset all inputs
        bgColorInput.value = '#ffffff';
        textColorInput.value = '#000000';
        fontSizeInput.value = 16;
        borderWidthInput.value = 1;
        borderRadiusInput.value = 0;
        paddingInput.value = 10;
        
        // Reset display values
        fontSizeValue.textContent = '16px';
        borderWidthValue.textContent = '1px';
        borderRadiusValue.textContent = '0px';
        paddingValue.textContent = '10px';
        
        // Reset element styles
        Object.assign(styleExample.style, {
            backgroundColor: originalStyles.backgroundColor,
            color: originalStyles.color,
            fontSize: originalStyles.fontSize,
            borderWidth: originalStyles.borderWidth,
            borderRadius: originalStyles.borderRadius,
            padding: originalStyles.padding
        });
        
        // Remove any added classes
        styleExample.classList.remove('styled-box');
        
        console.log('Reset styles');
    });
    
    // Class manipulation buttons
    document.getElementById('add-class').addEventListener('click', function() {
        styleExample.classList.add('styled-box');
        console.log('Added class: styled-box');
    });
    
    document.getElementById('remove-class').addEventListener('click', function() {
        styleExample.classList.remove('styled-box');
        console.log('Removed class: styled-box');
    });
    
    document.getElementById('toggle-class').addEventListener('click', function() {
        styleExample.classList.toggle('styled-box');
        const hasClass = styleExample.classList.contains('styled-box');
        console.log(hasClass ? 'Added class: styled-box' : 'Removed class: styled-box');
    });
}

// Initialize create and delete elements section
function initCreateDelete() {
    const elementContainer = document.getElementById('element-container');
    const elementTypeSelect = document.getElementById('element-type');
    const elementContentInput = document.getElementById('element-content');
    const elementClassInput = document.getElementById('element-class');
    
    let selectedElement = null;
    
    // Create element button
    document.getElementById('create-element').addEventListener('click', function() {
        // Clear selected element
        if (selectedElement) {
            selectedElement.classList.remove('selected');
            selectedElement = null;
        }
        
        // Create a new element based on the selected type
        const elementType = elementTypeSelect.value;
        const newElement = document.createElement(elementType);
        
        // Add class
        if (elementClassInput.value) {
            newElement.className = elementClassInput.value;
        }
        
        // Add content or attributes based on the element type
        if (elementType === 'img') {
            newElement.src = 'https://via.placeholder.com/150';
            newElement.alt = elementContentInput.value || 'Image';
        } else {
            newElement.textContent = elementContentInput.value || 'New Element';
        }
        
        // Add click event to select the element
        newElement.addEventListener('click', function(event) {
            event.stopPropagation();
            
            // Deselect previously selected element
            if (selectedElement) {
                selectedElement.classList.remove('selected');
            }
            
            // Select the clicked element
            newElement.classList.add('selected');
            selectedElement = newElement;
            console.log('Selected element:', selectedElement);
        });
        
        // Don't add to DOM yet, just create it
        console.log('Created element:', newElement);
        alert('Element created! Use append/prepend/insert buttons to add it to the DOM.');
    });
    
    // Append element button
    document.getElementById('append-element').addEventListener('click', function() {
        if (!selectedElement) {
            createAndAddElement('append');
            return;
        }
        
        elementContainer.appendChild(selectedElement);
        console.log('Appended element:', selectedElement);
    });
    
    // Prepend element button
    document.getElementById('prepend-element').addEventListener('click', function() {
        if (!selectedElement) {
            createAndAddElement('prepend');
            return;
        }
        
        elementContainer.prepend(selectedElement);
        console.log('Prepended element:', selectedElement);
    });
    
    // Insert before button
    document.getElementById('insert-before').addEventListener('click', function() {
        if (!selectedElement) {
            alert('Create an element first and select a reference element to insert before.');
            return;
        }
        
        const referenceElement = elementContainer.firstElementChild;
        if (referenceElement) {
            elementContainer.insertBefore(selectedElement, referenceElement);
            console.log('Inserted element before:', referenceElement);
        } else {
            elementContainer.appendChild(selectedElement);
            console.log('No reference element, appended instead');
        }
    });
    
    // Replace element button
    document.getElementById('replace-element').addEventListener('click', function() {
        if (!selectedElement) {
            alert('Create an element first and select an element to replace.');
            return;
        }
        
        const referenceElement = elementContainer.firstElementChild;
        if (referenceElement && referenceElement !== selectedElement) {
            elementContainer.replaceChild(selectedElement, referenceElement);
            console.log('Replaced element:', referenceElement);
        } else {
            alert('No element to replace or trying to replace with itself.');
        }
    });
    
    // Clone element button
    document.getElementById('clone-element').addEventListener('click', function() {
        if (!selectedElement) {
            alert('Select an element to clone first.');
            return;
        }
        
        // Clone the element with its children
        const clonedElement = selectedElement.cloneNode(true);
        
        // Add click event to the cloned element
        clonedElement.addEventListener('click', function(event) {
            event.stopPropagation();
            
            // Deselect previously selected element
            if (selectedElement) {
                selectedElement.classList.remove('selected');
            }
            
            // Select the clicked element
            clonedElement.classList.add('selected');
            selectedElement = clonedElement;
            console.log('Selected element:', selectedElement);
        });
        
        // Add the cloned element to the container
        elementContainer.appendChild(clonedElement);
        console.log('Cloned and appended element:', clonedElement);
    });
    
    // Remove element button
    document.getElementById('remove-element').addEventListener('click', function() {
        if (!selectedElement) {
            alert('Select an element to remove first.');
            return;
        }
        
        // Check if the element is in the DOM
        if (selectedElement.parentNode) {
            selectedElement.remove();
            console.log('Removed element:', selectedElement);
            selectedElement = null;
        } else {
            alert('Element is not in the DOM.');
        }
    });
    
    // Helper function to create and add an element when none is selected
    function createAndAddElement(position) {
        // Create a new element
        const elementType = elementTypeSelect.value;
        const newElement = document.createElement(elementType);
        
        // Add class
        if (elementClassInput.value) {
            newElement.className = elementClassInput.value;
        }
        
        // Add content or attributes based on the element type
        if (elementType === 'img') {
            newElement.src = 'https://via.placeholder.com/150';
            newElement.alt = elementContentInput.value || 'Image';
        } else {
            newElement.textContent = elementContentInput.value || 'New Element';
        }
        
        // Add click event to select the element
        newElement.addEventListener('click', function(event) {
            event.stopPropagation();
            
            // Deselect previously selected element
            if (selectedElement) {
                selectedElement.classList.remove('selected');
            }
            
            // Select the clicked element
            newElement.classList.add('selected');
            selectedElement = newElement;
            console.log('Selected element:', selectedElement);
        });
        
        // Add to DOM based on position
        if (position === 'append') {
            elementContainer.appendChild(newElement);
            console.log('Created and appended element:', newElement);
        } else if (position === 'prepend') {
            elementContainer.prepend(newElement);
            console.log('Created and prepended element:', newElement);
        }
        
        // Select the new element
        if (selectedElement) {
            selectedElement.classList.remove('selected');
        }
        newElement.classList.add('selected');
        selectedElement = newElement;
    }
    
    // Click on container to deselect
    elementContainer.addEventListener('click', function(event) {
        if (event.target === elementContainer) {
            if (selectedElement) {
                selectedElement.classList.remove('selected');
                selectedElement = null;
                console.log('Deselected element');
            }
        }
    });
}
