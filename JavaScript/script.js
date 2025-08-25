// Basic Clock Functionality
function updateClock() {
    const now = new Date();
    
    // Format time (adding leading zeros for single digits)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    // Format date
    // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // const dateString = now.toLocaleDateString('en-US', options);
    
    // Update DOM elements
    document.getElementById('time').textContent = timeString;
    // document.getElementById('date').textContent = dateString;
}

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);
