// // Function to update the clock
// function updateClock() {
//     // Get current date and time
//     const now = new Date();
    
//     // Extract hours, minutes, and seconds
//     let hours = now.getHours();
//     const minutes = now.getMinutes();
//     const seconds = now.getSeconds();
    
//     // Determine AM or PM
//     const amPm = hours >= 12 ? 'PM' : 'AM';
    
//     // Convert to 12-hour format
//     hours = hours % 12;
//     hours = hours ? hours : 12; // If hours is 0, display 12
    
//     // Format time with leading zeros
//     const formattedHours = String(hours).padStart(2, '0');
//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(seconds).padStart(2, '0');
    
//     // Format date
//     const options = { 
//         weekday: 'long', 
//         year: 'numeric', 
//         month: 'long', 
//         day: 'numeric' 
//     };
//     const dateString = now.toLocaleDateString('en-US', options);
    
//     // Update the DOM elements
//     document.getElementById('hours').textContent = formattedHours;
//     document.getElementById('minutes').textContent = formattedMinutes;
//     document.getElementById('seconds').textContent = formattedSeconds;
//     document.getElementById('am-pm').textContent = amPm;
//     document.getElementById('date').textContent = dateString;
// }

// // Initialize clock
// function initClock() {
//     // Update immediately when page loads
//     updateClock();
    
//     // Then update every second using setInterval
//     setInterval(updateClock, 1000);
    
//     console.log('Clock initialized and running!');
// }

// // Start the clock when the page loads
// document.addEventListener('DOMContentLoaded', initClock);

function returnDiv(){
    return ("<div></div>");
}

console.log(returnDiv());
