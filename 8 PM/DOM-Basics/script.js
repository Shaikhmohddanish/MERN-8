// DOM Basics JavaScript

// Wait for the DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Get a reference to the button element
    const inspectButton = document.getElementById('inspect-btn');
    const demoBox = document.getElementById('demo-box');
    
    // Add an event listener to the button
    inspectButton.addEventListener('click', function() {
        // Log the demoBox element to the console
        console.log('Demo box element:', demoBox);
        
        // Log some properties of the element
        console.log('Element ID:', demoBox.id);
        console.log('Element tag name:', demoBox.tagName);
        console.log('Element classes:', demoBox.className);
        console.log('Element children count:', demoBox.children.length);
        
        // Show DOM relationship
        console.log('Parent node:', demoBox.parentNode);
        console.log('First child:', demoBox.firstChild);
        console.log('Child nodes:', demoBox.childNodes);
        
        // Temporarily highlight the element
        demoBox.classList.add('highlight');
        
        // Remove the highlight after 2 seconds
        setTimeout(function() {
            demoBox.classList.remove('highlight');
        }, 2000);
    });
    
    // Show a visual representation of the DOM traversal
    const domElements = document.querySelectorAll('body *');
    console.log('All DOM elements in the body:', domElements);
    
    // This function displays the DOM hierarchy of the current page
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
    
    // Add a special comment to help students find this function
    console.log('Try running this command to see the DOM structure:');
    console.log('exploreDOM(document.body)');
    
    // Make the function globally available
    window.exploreDOM = exploreDOM;
});
