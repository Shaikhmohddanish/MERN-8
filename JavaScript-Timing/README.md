# JavaScript Timing Functions & Date Methods

This module explores JavaScript's timing functions (`setTimeout`, `setInterval`) and the `Date` object through interactive examples.

## Contents

- **index.html**: HTML structure for the examples
- **styles.css**: CSS styling for the examples
- **script.js**: JavaScript code with timing function implementations

## Concepts Covered

### 1. `setTimeout()`

The `setTimeout()` function executes a specified function once after a specified delay (in milliseconds).

```javascript
setTimeout(function, delayInMilliseconds);
```

Key features:
- Runs the function only once
- Can be canceled using `clearTimeout()`
- Commonly used for delayed actions and animations

### 2. `setInterval()`

The `setInterval()` function repeatedly executes a specified function with a fixed delay between each call.

```javascript
setInterval(function, delayInMilliseconds);
```

Key features:
- Runs the function repeatedly at specified intervals
- Continues until stopped with `clearInterval()`
- Used for recurring updates (like clocks, counters, animations)

### 3. `new Date()`

The Date object is used to work with dates and times in JavaScript.

```javascript
const now = new Date(); // Current date and time
```

Key features:
- Get individual components (year, month, day, hour, etc.)
- Format dates for display
- Calculate time differences
- Convert between timezones
- Create timestamps

## Examples in this Module

1. **Current Date and Time Display**: Shows how to create and format a Date object
2. **Timeout Demo**: Demonstrates `setTimeout()` with a 3-second delay
3. **Interval Counter**: Illustrates `setInterval()` with start/stop functionality
4. **Digital Clock**: Combines `setInterval()` and `Date` methods for a live clock
5. **Countdown Timer**: Uses `setInterval()` to create a configurable countdown

## Common Use Cases

- **Animations**: Creating timed visual effects
- **Polling**: Checking for updates at regular intervals
- **Delayed Execution**: Executing code after a specific delay
- **Throttling/Debouncing**: Limiting the frequency of function calls
- **Progress Indicators**: Updating loading or progress displays
- **Time-based Features**: Countdowns, timers, clocks, etc.

## Important Notes

- Timing is not guaranteed to be precise, especially for very short intervals
- Browser throttles inactive tabs, affecting timers
- Always clear intervals and timeouts when they're no longer needed
- Use caution with recursive timeouts for long-running processes
