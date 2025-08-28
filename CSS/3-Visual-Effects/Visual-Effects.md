# CSS Visual Effects

## Introduction

CSS visual effects allow you to add aesthetically pleasing elements to your website without relying on images or JavaScript. Modern CSS provides powerful features for creating gradients, shadows, animations, and other visual enhancements that can greatly improve the user experience.

In this module, we'll explore various CSS visual effects and how to implement them.

## Colors and Backgrounds

### Color Models

CSS supports several color models:

1. **Hexadecimal**
   - Six-digit notation: `#RRGGBB`
   - Three-digit shorthand: `#RGB`
   - Eight-digit with alpha: `#RRGGBBAA`
   
   ```css
   .hex-color {
     color: #0066cc;             /* Full hex */
     background-color: #f00;     /* Shorthand hex */
     border-color: #00cc0088;    /* Hex with alpha (transparent green) */
   }
   ```

2. **RGB and RGBA**
   - RGB: `rgb(red, green, blue)`
   - RGBA: `rgba(red, green, blue, alpha)`
   - Values range from 0 to 255 (or 0% to 100%)
   
   ```css
   .rgb-color {
     color: rgb(0, 102, 204);           /* RGB */
     background-color: rgba(255, 0, 0, 0.5); /* Red with 50% opacity */
   }
   ```

3. **HSL and HSLA**
   - HSL: `hsl(hue, saturation, lightness)`
   - HSLA: `hsla(hue, saturation, lightness, alpha)`
   - Hue: 0-360, Saturation & Lightness: 0-100%
   
   ```css
   .hsl-color {
     color: hsl(210, 100%, 40%);           /* HSL blue */
     background-color: hsla(0, 100%, 50%, 0.5); /* Red with 50% opacity */
   }
   ```

4. **Modern CSS Color Functions**
   - `color-mix()`: Mixes two colors
   - `color-contrast()`: Determines the best contrasting color
   - `color()`: Creates colors in different color spaces
   
   ```css
   .modern-color {
     /* Mix blue and red to get purple */
     background-color: color-mix(in srgb, blue, red);
     
     /* Mix blue and red, with red at 25% strength */
     border-color: color-mix(in srgb, blue, red 25%);
   }
   ```

### Backgrounds

#### Background Color

```css
.bg-color {
  background-color: #f0f0f0;
}
```

#### Background Images

```css
.bg-image {
  background-image: url('path/to/image.jpg');
  background-repeat: no-repeat;  /* Options: repeat, repeat-x, repeat-y, no-repeat */
  background-position: center;   /* Position: top, right, bottom, left, center, or specific values */
  background-size: cover;        /* Options: auto, cover, contain, or specific values */
  background-attachment: fixed;  /* Options: scroll, fixed, local */
}
```

#### Multiple Backgrounds

```css
.multiple-bg {
  background: 
    url('top-image.png') no-repeat top center / 100% auto,
    url('middle-image.png') no-repeat center / cover,
    linear-gradient(to bottom, #f0f0f0, #e0e0e0);
  /* The last layer (gradient) will be at the bottom */
}
```

#### Background Shorthand

```css
.bg-shorthand {
  background: #f0f0f0 url('image.jpg') no-repeat center / cover fixed;
  /* color image repeat position/size attachment */
}
```

## Gradients

CSS gradients allow you to display smooth transitions between two or more colors.

### Linear Gradients

```css
.linear-gradient {
  /* Simple top to bottom */
  background: linear-gradient(#0066cc, #00ccff);
  
  /* Angled gradient (45 degrees) */
  background: linear-gradient(45deg, #0066cc, #00ccff);
  
  /* Using directions */
  background: linear-gradient(to bottom right, #0066cc, #00ccff);
  
  /* Multiple color stops */
  background: linear-gradient(#0066cc, #00ccff, #0066cc);
  
  /* Precise color stops */
  background: linear-gradient(#0066cc 0%, #00ccff 50%, #0066cc 100%);
}
```

### Radial Gradients

```css
.radial-gradient {
  /* Simple radial gradient */
  background: radial-gradient(#0066cc, #00ccff);
  
  /* Shaped radial gradient */
  background: radial-gradient(circle, #0066cc, #00ccff);
  
  /* Positioned radial gradient */
  background: radial-gradient(circle at top right, #0066cc, #00ccff);
  
  /* Multiple color stops */
  background: radial-gradient(#0066cc, #00ccff, #ffffff);
  
  /* Precise color stops */
  background: radial-gradient(#0066cc 0%, #00ccff 50%, #ffffff 100%);
  
  /* Size keywords */
  background: radial-gradient(circle closest-side at center, #0066cc, #00ccff);
  /* Size options: closest-side, closest-corner, farthest-side, farthest-corner */
}
```

### Conic Gradients

```css
.conic-gradient {
  /* Basic conic gradient */
  background: conic-gradient(#0066cc, #00ccff, #0066cc);
  
  /* From a specific angle */
  background: conic-gradient(from 45deg, #0066cc, #00ccff, #0066cc);
  
  /* From a specific position */
  background: conic-gradient(at top right, #0066cc, #00ccff, #0066cc);
  
  /* With color stops */
  background: conic-gradient(#0066cc 0%, #00ccff 50%, #0066cc 100%);
}
```

### Repeating Gradients

```css
.repeating-gradient {
  /* Repeating linear gradient */
  background: repeating-linear-gradient(45deg, #0066cc, #0066cc 10px, #00ccff 10px, #00ccff 20px);
  
  /* Repeating radial gradient */
  background: repeating-radial-gradient(circle, #0066cc, #0066cc 10px, #00ccff 10px, #00ccff 20px);
  
  /* Repeating conic gradient */
  background: repeating-conic-gradient(#0066cc 0deg 10deg, #00ccff 10deg 20deg);
}
```

## Shadows

### Box Shadow

The `box-shadow` property adds shadow effects to elements.

```css
.box-shadow {
  /* Basic shadow */
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  
  /* Horizontal offset, vertical offset, blur radius, spread radius, color */
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.3);
  
  /* Inset shadow */
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.3);
  
  /* Multiple shadows */
  box-shadow: 
    5px 5px 10px rgba(0, 0, 0, 0.3),
    inset 2px 2px 5px rgba(0, 0, 0, 0.2);
}
```

### Text Shadow

The `text-shadow` property adds shadow effects to text.

```css
.text-shadow {
  /* Basic shadow */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  /* Horizontal offset, vertical offset, blur radius, color */
  text-shadow: 2px 2px 4px #000000;
  
  /* Multiple shadows */
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.3),
    -1px -1px 2px rgba(255, 255, 255, 0.5);
  
  /* Glow effect */
  text-shadow: 0 0 10px rgba(0, 102, 204, 0.8);
}
```

### Drop Shadow Filter

The CSS `filter` property provides a `drop-shadow()` function that can create shadows that follow the exact shape of the element (including transparent parts).

```css
.drop-shadow {
  /* Basic drop shadow */
  filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3));
  
  /* Multiple filters */
  filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.3)) brightness(1.1);
}
```

## Opacity and Transparency

### Opacity Property

The `opacity` property sets the opacity for the entire element (including its children).

```css
.transparent {
  opacity: 0.5; /* 50% opacity (semi-transparent) */
}

.fully-opaque {
  opacity: 1; /* 100% opacity (fully visible) */
}

.fully-transparent {
  opacity: 0; /* 0% opacity (fully transparent) */
}
```

### Alpha Channel in Colors

Using the alpha channel in colors only affects the color itself, not the entire element.

```css
.transparent-color {
  background-color: rgba(0, 102, 204, 0.5); /* Blue with 50% opacity */
  color: rgba(0, 0, 0, 0.7); /* Black text with 70% opacity */
  border: 2px solid rgba(255, 0, 0, 0.3); /* Red border with 30% opacity */
}
```

## Filters

CSS filters allow you to apply graphical effects to elements.

```css
.filtered {
  /* Blur effect */
  filter: blur(5px);
  
  /* Brightness adjustment */
  filter: brightness(150%);
  
  /* Contrast adjustment */
  filter: contrast(200%);
  
  /* Grayscale conversion */
  filter: grayscale(100%);
  
  /* Hue rotation */
  filter: hue-rotate(90deg);
  
  /* Invert colors */
  filter: invert(100%);
  
  /* Opacity adjustment */
  filter: opacity(50%);
  
  /* Saturation adjustment */
  filter: saturate(200%);
  
  /* Sepia effect */
  filter: sepia(100%);
  
  /* Multiple filters */
  filter: brightness(120%) contrast(120%) saturate(120%);
}
```

## Blend Modes

CSS blend modes control how elements blend with the content behind them.

### Background Blend Mode

Controls how an element's background images and colors blend with each other.

```css
.bg-blend {
  background-image: url('image.jpg');
  background-color: #0066cc;
  background-blend-mode: multiply;
  /* Options: normal, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, difference, exclusion, hue, saturation, color, luminosity */
}
```

### Mix Blend Mode

Controls how an element's content blends with the content of its parent and background.

```css
.mix-blend {
  mix-blend-mode: difference;
  /* Options: normal, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, difference, exclusion, hue, saturation, color, luminosity */
}
```

## Transformations

CSS transforms allow you to modify the appearance and position of elements without affecting the document flow.

### 2D Transforms

```css
.transform-2d {
  /* Translate (move) */
  transform: translate(50px, 20px);
  transform: translateX(50px);
  transform: translateY(20px);
  
  /* Scale (resize) */
  transform: scale(1.5);
  transform: scale(1.5, 0.8);
  transform: scaleX(1.5);
  transform: scaleY(0.8);
  
  /* Rotate */
  transform: rotate(45deg);
  
  /* Skew */
  transform: skew(10deg, 20deg);
  transform: skewX(10deg);
  transform: skewY(20deg);
  
  /* Multiple transforms */
  transform: translate(50px, 20px) rotate(45deg) scale(1.5);
  
  /* Transform origin */
  transform-origin: top left;
}
```

### 3D Transforms

```css
.transform-3d {
  /* Rotate in 3D space */
  transform: rotateX(45deg);
  transform: rotateY(45deg);
  transform: rotateZ(45deg);
  
  /* Translate in 3D space */
  transform: translate3d(50px, 20px, 30px);
  transform: translateZ(30px);
  
  /* Scale in 3D space */
  transform: scale3d(1.5, 0.8, 2);
  transform: scaleZ(2);
  
  /* Perspective */
  transform: perspective(500px) rotateY(45deg);
  
  /* Perspective property (for children) */
  perspective: 500px;
  
  /* Perspective origin */
  perspective-origin: center;
}
```

### Transform-Style and Backface-Visibility

```css
.transform-container {
  transform-style: preserve-3d; /* Makes children render in 3D space */
  perspective: 1000px;
}

.transform-child {
  backface-visibility: hidden; /* Hides the back face when it's facing away */
}
```

## Transitions

CSS transitions allow you to change property values smoothly over a specified duration.

```css
.transition {
  /* Single property transition */
  transition: background-color 0.5s ease;
  
  /* Multiple property transitions */
  transition: 
    background-color 0.5s ease,
    transform 0.3s ease-in-out;
  
  /* All properties transition */
  transition: all 0.5s ease;
  
  /* Individual transition properties */
  transition-property: background-color, transform;
  transition-duration: 0.5s, 0.3s;
  transition-timing-function: ease, ease-in-out;
  transition-delay: 0s, 0.1s;
}

.transition:hover {
  background-color: #0066cc;
  transform: scale(1.1);
}
```

### Timing Functions

```css
.timing-functions {
  /* Preset timing functions */
  transition-timing-function: ease;        /* Slow start, fast middle, slow end */
  transition-timing-function: linear;      /* Constant speed */
  transition-timing-function: ease-in;     /* Slow start, fast end */
  transition-timing-function: ease-out;    /* Fast start, slow end */
  transition-timing-function: ease-in-out; /* Slow start, fast middle, slow end */
  
  /* Cubic Bezier function */
  transition-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
  
  /* Steps function */
  transition-timing-function: steps(5, jump-start);
}
```

## Animations

CSS animations allow you to create more complex transitions by defining keyframes.

### Keyframes

```css
@keyframes slide-in {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes color-cycle {
  0% { background-color: red; }
  25% { background-color: yellow; }
  50% { background-color: green; }
  75% { background-color: blue; }
  100% { background-color: red; }
}
```

### Animation Properties

```css
.animated {
  /* Basic animation */
  animation: slide-in 1s ease;
  
  /* Animation with multiple parameters */
  animation: slide-in 1s ease 0.5s 2 alternate forwards;
  
  /* Multiple animations */
  animation: 
    slide-in 1s ease,
    pulse 2s ease infinite;
  
  /* Individual animation properties */
  animation-name: slide-in;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-delay: 0.5s;
  animation-iteration-count: 2;
  animation-direction: alternate;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

/* Pause animation on hover */
.animated:hover {
  animation-play-state: paused;
}
```

### Animation Fill Modes

```css
.fill-modes {
  /* Apply starting values before animation starts and keep end values after it ends */
  animation-fill-mode: both;
  
  /* Apply starting values before animation starts */
  animation-fill-mode: backwards;
  
  /* Keep end values after animation ends */
  animation-fill-mode: forwards;
  
  /* No fill mode (default) */
  animation-fill-mode: none;
}
```

### Animation Direction

```css
.direction {
  /* Play from 0% to 100% repeatedly */
  animation-direction: normal;
  
  /* Play from 100% to 0% repeatedly */
  animation-direction: reverse;
  
  /* Play from 0% to 100%, then 100% to 0% */
  animation-direction: alternate;
  
  /* Play from 100% to 0%, then 0% to 100% */
  animation-direction: alternate-reverse;
}
```

## Clipping and Masking

### Clip Path

The `clip-path` property creates a clipping region that sets which part of an element should be shown.

```css
.clipped {
  /* Basic shapes */
  clip-path: circle(50% at center);
  clip-path: ellipse(50% 40% at center);
  clip-path: inset(10% 20% 30% 10%);
  clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
  
  /* From SVG */
  clip-path: url(#clipPath);
  
  /* Animated clip path */
  transition: clip-path 0.5s ease;
}

.clipped:hover {
  clip-path: circle(75% at center);
}
```

### Mask

The `mask` property allows you to use images as alpha masks.

```css
.masked {
  /* Using an image as a mask */
  mask-image: url('mask.png');
  
  /* Using a gradient as a mask */
  mask-image: linear-gradient(to bottom, black, transparent);
  
  /* Mask position and size */
  mask-position: center;
  mask-size: contain;
  mask-repeat: no-repeat;
  
  /* Shorthand */
  mask: url('mask.png') center / contain no-repeat;
}
```

## Shape Outside

The `shape-outside` property defines a shape around which adjacent content should wrap.

```css
.shape {
  float: left;
  width: 200px;
  height: 200px;
  
  /* Basic shapes */
  shape-outside: circle(50%);
  shape-outside: ellipse(50% 40%);
  shape-outside: inset(10% 20% 30% 10% round 10px);
  shape-outside: polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%);
  
  /* Using an image */
  shape-outside: url('shape.png');
  
  /* Using a gradient */
  shape-outside: linear-gradient(45deg, transparent 50%, black 50%);
  
  /* Shape margin */
  shape-margin: 20px;
}
```

## CSS Variables (Custom Properties)

CSS variables, or custom properties, allow you to store specific values to be reused throughout your stylesheet.

```css
:root {
  --primary-color: #0066cc;
  --secondary-color: #00ccff;
  --border-radius: 5px;
  --box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  --transition-duration: 0.3s;
}

.element {
  color: var(--primary-color);
  background-color: var(--secondary-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  transition: all var(--transition-duration) ease;
}

/* Variables with fallbacks */
.fallback-example {
  color: var(--undefined-color, #333);
}

/* Changing variables with media queries */
@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #66ccff;
    --secondary-color: #003366;
  }
}

/* Changing variables with JavaScript */
/* In JavaScript: document.documentElement.style.setProperty('--primary-color', '#ff0000'); */
```

## Practical Examples

### Gradient Button with Hover Effect

```css
.gradient-button {
  padding: 12px 24px;
  background: linear-gradient(to right, #0066cc, #00ccff);
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.gradient-button:hover {
  background: linear-gradient(to right, #00ccff, #0066cc);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.gradient-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
```

### Animated Card Flip

```css
.card-container {
  perspective: 1000px;
  width: 300px;
  height: 400px;
}

.card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s;
}

.card-container:hover .card {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.card-front {
  background-color: #0066cc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-back {
  background-color: #00ccff;
  color: white;
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Animated Loading Spinner

```css
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 102, 204, 0.2);
  border-radius: 50%;
  border-top-color: #0066cc;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

### Animated Notification Badge

```css
.notification-badge {
  position: relative;
}

.notification-badge::after {
  content: attr(data-count);
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #cc0000;
  color: white;
  border-radius: 50%;
  padding: 0.25em 0.6em;
  font-size: 12px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(204, 0, 0, 0.7);
  }
  70% {
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(204, 0, 0, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(204, 0, 0, 0);
  }
}
```

## Exercises

1. Create a gradient button with a hover effect that changes the gradient direction and adds a shadow.
2. Design a card with a box shadow that changes on hover and has an animated icon.
3. Create a loading animation using CSS animations and transforms.
4. Design a photo gallery with hover effects that zoom in and add a caption.
5. Implement a text effect that changes color and adds a glow on hover.

Refer to the HTML and CSS files in this module for examples and practice exercises.
