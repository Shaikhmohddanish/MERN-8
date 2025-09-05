// Event logging functionality
const eventLog = document.getElementById('eventLog');
const clearLogButton = document.getElementById('clearLog');

function logEvent(eventType, details = '') {
  const entry = document.createElement('div');
  entry.classList.add('log-entry');
  const time = new Date().toLocaleTimeString();
  entry.textContent = `${time} - ${eventType}${details ? ': ' + details : ''}`;
  eventLog.appendChild(entry);
  eventLog.scrollTop = eventLog.scrollHeight;
}

clearLogButton.addEventListener('click', function() {
  eventLog.innerHTML = '';
});

// Dark Mode Toggle (preserving your original code)
const toggle = document.getElementById('toggle');
toggle.addEventListener('change', (e) => {
  if (toggle.checked) {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    document.body.classList.add('dark-mode');
  } else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    document.body.classList.remove('dark-mode');
  }
  logEvent('change', 'Dark mode toggled');
});

// Mouse Events

// 1. click
const clickButton = document.getElementById('clickButton');
const clickOutput = document.getElementById('clickOutput');

clickButton.addEventListener('click', function(e) {
  clickOutput.innerHTML = '<h1 style="color: green;">Button clicked!</h1>';
  this.classList.add('btn-success');
  setTimeout(() => this.classList.remove('btn-success'), 1000);
  logEvent('click', 'Button clicked');
});

// 2. dblclick
const dblclickArea = document.getElementById('dblclickArea');
const dblclickOutput = document.getElementById('dblclickOutput');

dblclickArea.addEventListener('dblclick', function(e) {
  dblclickOutput.textContent = 'Double-clicked!';
  this.style.backgroundColor = '#9ccc65';
  setTimeout(() => this.style.backgroundColor = '', 500);
  logEvent('dblclick', 'Area double-clicked');
});

// 3. mousedown
const mousedownArea = document.getElementById('mousedownArea');
const mousedownOutput = document.getElementById('mousedownOutput');

mousedownArea.addEventListener('mousedown', function(e) {
  mousedownOutput.textContent = `Mouse button ${e.button} pressed`;
  this.classList.add('active-mousedown');
  logEvent('mousedown', `Button: ${e.button}`);
});

// 4. mouseup
const mouseupArea = document.getElementById('mouseupArea');
const mouseupOutput = document.getElementById('mouseupOutput');

mouseupArea.addEventListener('mouseup', function(e) {
  mouseupOutput.textContent = `Mouse button ${e.button} released`;
  this.classList.add('active-mouseup');
  setTimeout(() => this.classList.remove('active-mouseup'), 500);
  logEvent('mouseup', `Button: ${e.button}`);
});

// Also add mouseup listener to mousedown area to remove the pressed effect
mousedownArea.addEventListener('mouseup', function() {
  this.classList.remove('active-mousedown');
});

// Also add mouseout listener to mousedown area in case the cursor leaves while pressing
mousedownArea.addEventListener('mouseout', function() {
  this.classList.remove('active-mousedown');
});

// 5. mousemove
const mousemoveArea = document.getElementById('mousemoveArea');
const mousemoveOutput = document.getElementById('mousemoveOutput');
let mousemoveThrottle = false;

mousemoveArea.addEventListener('mousemove', function(e) {
  // Throttle the event to avoid performance issues
  if (!mousemoveThrottle) {
    mousemoveThrottle = true;
    
    // Get position relative to the element
    const rect = this.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    
    mousemoveOutput.textContent = `X: ${x}, Y: ${y}`;
    
    // Log the event (but not too frequently)
    if (Math.random() < 0.1) { // Only log about 10% of mousemove events
      logEvent('mousemove', `X: ${x}, Y: ${y}`);
    }
    
    setTimeout(() => mousemoveThrottle = false, 50);
  }
});

// 6. mouseover
const mouseoverArea = document.getElementById('mouseoverArea');
const mouseoverOutput = document.getElementById('mouseoverOutput');
const mouseoverInner = mouseoverArea.querySelector('.inner-element');

mouseoverArea.addEventListener('mouseover', function(e) {
  mouseoverOutput.textContent = `Mouseover: ${e.target.tagName.toLowerCase()}`;
  this.style.backgroundColor = '#e3f2fd';
  logEvent('mouseover', `Target: ${e.target.tagName.toLowerCase()}`);
});

mouseoverArea.addEventListener('mouseout', function() {
  this.style.backgroundColor = '';
});

// 7. mouseenter
const mouseenterArea = document.getElementById('mouseenterArea');
const mouseenterOutput = document.getElementById('mouseenterOutput');

mouseenterArea.addEventListener('mouseenter', function(e) {
  mouseenterOutput.textContent = 'Mouse entered area';
  this.style.backgroundColor = '#bbdefb';
  logEvent('mouseenter');
});

// 8. mouseleave
const mouseleaveArea = document.getElementById('mouseleaveArea');
const mouseleaveOutput = document.getElementById('mouseleaveOutput');

mouseleaveArea.addEventListener('mouseleave', function(e) {
  mouseleaveOutput.textContent = 'Mouse left area';
  this.style.backgroundColor = '';
  logEvent('mouseleave');
});

// Clear mouseleave area background when entering
mouseleaveArea.addEventListener('mouseenter', function() {
  this.style.backgroundColor = '#bbdefb';
});

// 9. mouseout
const mouseoutArea = document.getElementById('mouseoutArea');
const mouseoutOutput = document.getElementById('mouseoutOutput');
const mouseoutInner = mouseoutArea.querySelector('.inner-element');

mouseoutArea.addEventListener('mouseout', function(e) {
  mouseoutOutput.textContent = `Mouseout: ${e.target.tagName.toLowerCase()}`;
  if (e.target === this) {
    this.style.backgroundColor = '';
  }
  logEvent('mouseout', `Target: ${e.target.tagName.toLowerCase()}`);
});

mouseoutArea.addEventListener('mouseover', function() {
  this.style.backgroundColor = '#e3f2fd';
});

// 10. contextmenu
const contextmenuArea = document.getElementById('contextmenuArea');
const contextmenuOutput = document.getElementById('contextmenuOutput');

contextmenuArea.addEventListener('contextmenu', function(e) {
  e.preventDefault(); // Prevent the default context menu
  contextmenuOutput.textContent = 'Right-clicked!';
  this.style.backgroundColor = '#ffccbc';
  setTimeout(() => this.style.backgroundColor = '', 500);
  logEvent('contextmenu', `At: ${e.clientX}, ${e.clientY}`);
});

// Keyboard Events

// 11. keydown
const keydownInput = document.getElementById('keydownInput');
const keydownOutput = document.getElementById('keydownOutput');

keydownInput.addEventListener('keydown', function(e) {
  keydownOutput.textContent = `Key pressed: ${e.key} (Code: ${e.code})`;
  
  // Highlight special keys
  if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
    let modifiers = [];
    if (e.ctrlKey) modifiers.push('Ctrl');
    if (e.altKey) modifiers.push('Alt');
    if (e.shiftKey) modifiers.push('Shift');
    if (e.metaKey) modifiers.push('Meta');
    
    keydownOutput.textContent += ` - Modifiers: ${modifiers.join('+')}`;
  }
  
  logEvent('keydown', `Key: ${e.key}, Code: ${e.code}`);
});

// 12. keyup
const keyupInput = document.getElementById('keyupInput');
const keyupOutput = document.getElementById('keyupOutput');

keyupInput.addEventListener('keyup', function(e) {
  keyupOutput.textContent = `Key released: ${e.key} (Code: ${e.code})`;
  logEvent('keyup', `Key: ${e.key}, Code: ${e.code}`);
});

// 13. keypress (deprecated)
const keypressInput = document.getElementById('keypressInput');
const keypressOutput = document.getElementById('keypressOutput');

keypressInput.addEventListener('keypress', function(e) {
  keypressOutput.textContent = `Character: ${e.key} (CharCode: ${e.charCode})`;
  logEvent('keypress', `Character: ${e.key}, CharCode: ${e.charCode}`);
});

// Add a warning about keypress being deprecated
keypressOutput.innerHTML = '<small>Note: keypress is deprecated. Use keydown instead.</small>';

