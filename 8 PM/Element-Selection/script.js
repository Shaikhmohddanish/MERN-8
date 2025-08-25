// Element Selection JavaScript

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Get references to the interactive elements
    const selectorMethod = document.getElementById('selector-method');
    const selectorValue = document.getElementById('selector-value');
    const selectButton = document.getElementById('select-button');
    const selectionOutput = document.getElementById('selection-output');
    
    // Previously highlighted elements
    let highlightedElements = [];
    
    // Function to clear previous highlights
    function clearHighlights() {
        highlightedElements.forEach(element => {
            element.classList.remove('highlight');
        });
        highlightedElements = [];
    }
    
    // Function to highlight elements
    function highlightElements(elements) {
        clearHighlights();
        
        // If elements is not an array or NodeList, convert it to an array
        if (!elements.length && elements !== null) {
            elements = [elements];
        }
        
        // Add highlight class to each element
        if (elements) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add('highlight');
                highlightedElements.push(elements[i]);
            }
        }
    }
    
    // Function to format the output for display
    function formatOutput(elements) {
        if (elements === null) {
            return "No elements found";
        }
        
        if (!elements.length && elements !== null) {
            // Single element (from getElementById or querySelector)
            return `Found 1 element: ${getElementDetails(elements)}`;
        } else if (elements.length === 0) {
            // Empty collection
            return "No elements found";
        } else {
            // Collection of elements
            let output = `Found ${elements.length} element(s):\n`;
            for (let i = 0; i < elements.length; i++) {
                output += `\n${i + 1}. ${getElementDetails(elements[i])}`;
            }
            return output;
        }
    }
    
    // Function to get details about an element
    function getElementDetails(element) {
        const tagName = element.tagName.toLowerCase();
        const id = element.id ? `id="${element.id}"` : '';
        const classes = element.className ? `class="${element.className}"` : '';
        const textPreview = element.textContent.trim().substring(0, 40) + (element.textContent.trim().length > 40 ? '...' : '');
        
        return `<${tagName} ${id} ${classes}> ${textPreview}`;
    }
    
    // Handle the select button click
    selectButton.addEventListener('click', function() {
        const method = selectorMethod.value;
        const value = selectorValue.value.trim();
        
        // Check if a value was provided
        if (!value) {
            selectionOutput.textContent = "Please enter a selector value";
            return;
        }
        
        let selectedElements;
        let outputText;
        
        try {
            // Select elements based on the chosen method
            switch (method) {
                case 'getElementById':
                    selectedElements = document.getElementById(value);
                    break;
                case 'getElementsByClassName':
                    selectedElements = document.getElementsByClassName(value);
                    break;
                case 'getElementsByTagName':
                    selectedElements = document.getElementsByTagName(value);
                    break;
                case 'querySelector':
                    selectedElements = document.querySelector(value);
                    break;
                case 'querySelectorAll':
                    selectedElements = document.querySelectorAll(value);
                    break;
            }
            
            // Format the output
            outputText = formatOutput(selectedElements);
            
            // Highlight the selected elements
            highlightElements(selectedElements);
        } catch (error) {
            outputText = `Error: ${error.message}`;
        }
        
        // Display the results
        selectionOutput.textContent = outputText;
    });
    
    // Add event listeners to update the placeholder based on selected method
    selectorMethod.addEventListener('change', function() {
        const method = selectorMethod.value;
        
        // Update placeholder text based on the selected method
        switch (method) {
            case 'getElementById':
                selectorValue.placeholder = 'unique-element';
                break;
            case 'getElementsByClassName':
                selectorValue.placeholder = 'common-class';
                break;
            case 'getElementsByTagName':
                selectorValue.placeholder = 'div';
                break;
            case 'querySelector':
                selectorValue.placeholder = '#unique-element or .common-class';
                break;
            case 'querySelectorAll':
                selectorValue.placeholder = '.nested-container .nested-element';
                break;
        }
    });
    
    // Initialize with default placeholder
    selectorMethod.dispatchEvent(new Event('change'));
    
    // Log some helpful information to the console
    console.log('Available elements for selection:');
    console.log('- Element with ID: "unique-element"');
    console.log('- Elements with class: "common-class", "special-class", "nested-element", "list-item", "selected"');
    console.log('- Tag names: div, p, span, ul, li');
    console.log('Try different combinations in the selector interface!');
});
