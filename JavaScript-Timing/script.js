// JavaScript Timing Functions & Date Examples

// ======= Current Date & Time =======
function updateCurrentDate() {
    const now = new Date(); // Create a new Date object with current date/time
    const dateDisplay = document.getElementById('date-display');
    
    // Format the date as a string
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    
    // Examples of getting specific date components
    console.log('Date components examples:');
    console.log('Year:', now.getFullYear());
    console.log('Month (0-11):', now.getMonth()); // Note: months are 0-indexed (0 = January)
    console.log('Day of month:', now.getDate());
    console.log('Day of week (0-6):', now.getDay()); // 0 = Sunday, 6 = Saturday
    console.log('Hours:', now.getHours());
    console.log('Minutes:', now.getMinutes());
    console.log('Seconds:', now.getSeconds());
    console.log('Milliseconds:', now.getMilliseconds());
    console.log('Timestamp (ms since Jan 1, 1970):', now.getTime());
}

// Initial call
updateCurrentDate();
// Update every second
setInterval(updateCurrentDate, 1000);

// ======= setTimeout Example =======
const timeoutDisplay = document.getElementById('timeout-display');
const timeoutBtn = document.getElementById('timeout-btn');

timeoutBtn.addEventListener('click', () => {
    timeoutDisplay.textContent = 'Timeout started... waiting for 3 seconds';
    timeoutDisplay.style.color = '#3498db';
    timeoutBtn.disabled = true;
    
    // setTimeout executes a function once after a specified delay (in milliseconds)
    const timeoutId = setTimeout(() => {
        timeoutDisplay.textContent = 'Timeout completed!';
        timeoutDisplay.style.color = '#2ecc71';
        timeoutBtn.disabled = false;
        
        // Reset the message after 2 seconds
        setTimeout(() => {
            timeoutDisplay.textContent = 'Click the button to start again';
            timeoutDisplay.style.color = '#333';
        }, 2000);
    }, 3000); // 3000 ms = 3 seconds
    
    // Note: You can cancel a timeout before it executes using:
    // clearTimeout(timeoutId);
});

// ======= setInterval Example =======
const intervalDisplay = document.getElementById('interval-display');
const startIntervalBtn = document.getElementById('start-interval');
const stopIntervalBtn = document.getElementById('stop-interval');
let counter = 0;
let intervalId = null;

startIntervalBtn.addEventListener('click', () => {
    // Disable start button and enable stop button
    startIntervalBtn.disabled = true;
    stopIntervalBtn.disabled = false;
    
    // setInterval repeatedly executes a function with a fixed delay between each call
    intervalId = setInterval(() => {
        counter++;
        intervalDisplay.textContent = `Counter: ${counter}`;
    }, 1000); // 1000 ms = 1 second
});

stopIntervalBtn.addEventListener('click', () => {
    // Clear the interval to stop execution
    clearInterval(intervalId);
    
    // Enable start button and disable stop button
    startIntervalBtn.disabled = false;
    stopIntervalBtn.disabled = true;
});

// ======= Digital Clock Example =======
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    // Update the clock display
    document.getElementById('clock-display').textContent = `${hours}:${minutes}:${seconds}`;
}

// Initial call to avoid delay on page load
updateClock();
// Update clock every second
setInterval(updateClock, 1000);

// ======= Countdown Timer Example =======
const countdownDisplay = document.getElementById('countdown-display');
const startCountdownBtn = document.getElementById('start-countdown');
const resetCountdownBtn = document.getElementById('reset-countdown');
const minutesInput = document.getElementById('minutes-input');
let countdownIntervalId = null;
let endTime = null;

function updateCountdown() {
    if (!endTime) return;
    
    const currentTime = new Date().getTime();
    const timeLeft = endTime - currentTime;
    
    if (timeLeft <= 0) {
        // Timer has ended
        clearInterval(countdownIntervalId);
        countdownDisplay.textContent = 'Time\'s up!';
        countdownDisplay.classList.add('expired');
        startCountdownBtn.disabled = false;
        return;
    }
    
    // Calculate minutes and seconds
    const minutes = Math.floor(timeLeft / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000).toString().padStart(2, '0');
    
    // Update display
    countdownDisplay.textContent = `${minutes}:${seconds}`;
}

startCountdownBtn.addEventListener('click', () => {
    // Get minutes from input
    const minutes = parseInt(minutesInput.value, 10) || 1; // Default to 1 minute
    
    // Calculate end time
    endTime = new Date().getTime() + (minutes * 60 * 1000);
    
    // Clear any existing interval
    if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
    }
    
    // Start the countdown
    updateCountdown();
    countdownIntervalId = setInterval(updateCountdown, 1000);
    
    // Update UI
    startCountdownBtn.disabled = true;
    countdownDisplay.classList.remove('expired');
});

resetCountdownBtn.addEventListener('click', () => {
    // Clear interval and reset
    clearInterval(countdownIntervalId);
    countdownIntervalId = null;
    endTime = null;
    
    // Reset display
    countdownDisplay.textContent = '00:00';
    countdownDisplay.classList.remove('expired');
    
    // Enable start button
    startCountdownBtn.disabled = false;
});
