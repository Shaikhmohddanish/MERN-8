# CSS Best Practices

This module covers best practices for writing maintainable, scalable, and efficient CSS code.

## Table of Contents
- [Organization and Naming Conventions](#organization-and-naming-conventions)
- [CSS Architecture](#css-architecture)
- [Performance Optimization](#performance-optimization)
- [Browser Compatibility](#browser-compatibility)
- [CSS Variables (Custom Properties)](#css-variables-custom-properties)
- [CSS Preprocessors](#css-preprocessors)
- [CSS Frameworks](#css-frameworks)

## Organization and Naming Conventions

Well-organized CSS is easier to maintain, especially in large projects.

### File Organization

Organize your CSS files in a logical structure:

```
styles/
  ├── main.css          # Main entry point
  ├── base/             # Base styles
  │   ├── reset.css     # CSS reset
  │   ├── typography.css
  │   └── variables.css
  ├── components/       # Reusable components
  │   ├── buttons.css
  │   ├── forms.css
  │   └── navigation.css
  ├── layout/           # Layout components
  │   ├── header.css
  │   ├── footer.css
  │   └── grid.css
  └── pages/            # Page-specific styles
      ├── home.css
      └── contact.css
```

### Naming Conventions

#### BEM (Block, Element, Modifier)

BEM is a naming methodology that helps create reusable components.

```css
/* Block */
.card {
  background-color: white;
  border-radius: 4px;
}

/* Element */
.card__title {
  font-size: 1.2rem;
  font-weight: bold;
}

/* Element */
.card__content {
  padding: 1rem;
}

/* Modifier */
.card--featured {
  border: 2px solid gold;
}
```

How to use in HTML:

```html
<div class="card card--featured">
  <h2 class="card__title">Card Title</h2>
  <div class="card__content">Content goes here...</div>
</div>
```

#### SMACSS (Scalable and Modular Architecture for CSS)

SMACSS categorizes CSS rules into:

1. **Base** - Default styles for HTML elements
2. **Layout** - Dividing the page into sections
3. **Module** - Reusable, modular parts of design
4. **State** - Describes how modules or layouts look in a particular state
5. **Theme** - Visual styles that define a look and feel

```css
/* Base */
body, p, h1 {
  margin: 0;
  padding: 0;
}

/* Layout */
.l-header {
  padding: 20px;
}

/* Module */
.btn {
  padding: 10px 15px;
}

/* State */
.is-active {
  background: #f5f5f5;
}

/* Theme */
.theme-dark {
  background: #333;
  color: white;
}
```

### Comments and Documentation

Good documentation makes your CSS more maintainable:

```css
/* ==========================================================================
   Section comment block
   ========================================================================== */

/* Sub-section comment block
   ========================================================================== */

/**
 * Short description using Doxygen-style comment format
 *
 * The first sentence of the long description starts here and continues on this
 * line for a while finally concluding here at the end of this paragraph.
 *
 * @param {String} selector - Element selector
 */

/* Basic comment */
```

## CSS Architecture

A good CSS architecture helps manage growing CSS in large projects.

### ITCSS (Inverted Triangle CSS)

ITCSS organizes CSS files by specificity and reach, from broad to narrow:

1. **Settings** - Variables and config
2. **Tools** - Mixins and functions
3. **Generic** - Reset and normalize
4. **Elements** - Bare HTML elements
5. **Objects** - Class-based selectors for patterns
6. **Components** - Specific UI components
7. **Utilities** - Helpers and overrides

```css
/* Settings Layer Example */
:root {
  --primary-color: #0066cc;
}

/* Elements Layer Example */
h1 {
  font-size: 2rem;
}

/* Components Layer Example */
.btn-primary {
  background-color: var(--primary-color);
}

/* Utilities Layer Example */
.text-center {
  text-align: center;
}
```

### Atomic CSS

Atomic CSS uses small, single-purpose classes:

```css
.p-10 { padding: 10px; }
.m-20 { margin: 20px; }
.flex { display: flex; }
.bg-blue { background-color: blue; }
.text-center { text-align: center; }
```

Usage in HTML:

```html
<div class="p-10 m-20 bg-blue text-center">
  Atomic CSS example
</div>
```

### CSS Modules

CSS Modules scope CSS locally by default, avoiding conflicts:

```css
/* Button.module.css */
.button {
  padding: 10px;
  color: white;
}

.primary {
  background-color: blue;
}
```

In JavaScript:

```javascript
import styles from './Button.module.css';

// Renders with unique class names like "button_abc123" and "primary_def456"
return <button className={`${styles.button} ${styles.primary}`}>Click me</button>;
```

## Performance Optimization

Optimizing CSS helps improve loading and rendering performance.

### Selector Performance

Selectors are read from right to left by browsers:

```css
/* Inefficient - checks ALL div elements */
div.specific-class {
  color: red;
}

/* More efficient - starts with the class */
.specific-class {
  color: red;
}
```

Avoid deep nesting:

```css
/* Inefficient - too many levels */
.header .nav ul li a {
  color: red;
}

/* More efficient */
.nav-link {
  color: red;
}
```

### Minimize Repaints and Reflows

Some properties trigger layout recalculations (reflows) which are expensive:

- Properties that affect layout: `width`, `height`, `margin`, `padding`, `border`, `position`, `top`, `left`, etc.
- Properties that only trigger repaints (less expensive): `color`, `background-color`, `visibility`, `text-decoration`, etc.

Use transforms for animations when possible:

```css
/* Causes reflow - less efficient */
.inefficient-animation {
  animation: move 1s linear;
}
@keyframes move {
  from { left: 0; top: 0; }
  to { left: 100px; top: 100px; }
}

/* Uses transform - more efficient */
.efficient-animation {
  animation: move-transform 1s linear;
}
@keyframes move-transform {
  from { transform: translate(0, 0); }
  to { transform: translate(100px, 100px); }
}
```

### Critical CSS

Inline critical CSS to improve perceived load time:

```html
<head>
  <!-- Critical CSS inlined -->
  <style>
    /* Styles needed for above-the-fold content */
    body { margin: 0; font-family: sans-serif; }
    .header { background: #333; color: white; padding: 1rem; }
  </style>
  
  <!-- Non-critical CSS loaded asynchronously -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
```

### Minification and Compression

Always minify CSS for production:

```css
/* Before minification */
.example {
  margin: 0;
  padding: 20px;
  background-color: #ffffff;
}

/* After minification */
.example{margin:0;padding:20px;background-color:#fff}
```

## Browser Compatibility

Ensuring CSS works across browsers is crucial for a good user experience.

### Vendor Prefixes

Vendor prefixes help support experimental features:

```css
.example {
  -webkit-transition: all 0.3s ease; /* Safari, Chrome */
  -moz-transition: all 0.3s ease;    /* Firefox */
  -ms-transition: all 0.3s ease;     /* Internet Explorer */
  -o-transition: all 0.3s ease;      /* Opera */
  transition: all 0.3s ease;         /* Standard syntax */
}
```

Consider using tools like Autoprefixer to automatically add prefixes.

### Feature Queries (@supports)

Use feature queries to test browser support:

```css
.example {
  /* Base styles */
  background-color: lightgray;
  
  /* Apply only if CSS Grid is supported */
  @supports (display: grid) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
```

### Graceful Degradation & Progressive Enhancement

Provide basic functionality for all browsers, then enhance for modern ones:

```css
/* Base styles for all browsers */
.container {
  overflow: hidden;
}
.item {
  float: left;
  width: 33.33%;
}

/* Enhanced layout for browsers with flexbox */
@supports (display: flex) {
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    float: none;
    flex: 1 1 200px;
  }
}
```

### Normalize.css or Reset.css

Use a CSS reset to start with consistent styles across browsers:

```css
/* Simple CSS reset example */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Or use Normalize.css */
```

## CSS Variables (Custom Properties)

CSS Variables provide powerful dynamic styling capabilities.

### Defining and Using Variables

```css
:root {
  /* Define variables in the root scope */
  --primary-color: #0066cc;
  --secondary-color: #ff6600;
  --spacing-unit: 8px;
  --font-family: 'Segoe UI', sans-serif;
}

/* Using variables */
.button {
  background-color: var(--primary-color);
  padding: calc(var(--spacing-unit) * 2);
  font-family: var(--font-family);
}

.button.secondary {
  background-color: var(--secondary-color);
}
```

### Changing Variables with Media Queries

```css
:root {
  --header-height: 60px;
  --font-size-base: 16px;
}

@media (min-width: 768px) {
  :root {
    --header-height: 80px;
    --font-size-base: 18px;
  }
}
```

### Local Variable Scope

```css
.dark-theme {
  --text-color: white;
  --bg-color: #333;
}

.light-theme {
  --text-color: #333;
  --bg-color: white;
}

.theme-section {
  color: var(--text-color);
  background-color: var(--bg-color);
}
```

### Variable Fallbacks

```css
.element {
  /* Use --custom-width if defined, otherwise 100px */
  width: var(--custom-width, 100px);
}
```

## CSS Preprocessors

Preprocessors like Sass, Less, and Stylus extend CSS with programming features.

### Sass Features

#### Variables

```scss
// Sass variables
$primary-color: #0066cc;
$padding-base: 10px;

.button {
  background-color: $primary-color;
  padding: $padding-base;
}
```

#### Nesting

```scss
.navbar {
  background-color: #333;
  
  // Nested selectors
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    
    li {
      display: inline-block;
      
      a {
        color: white;
        text-decoration: none;
        padding: 10px 15px;
        
        &:hover {
          background-color: #555;
        }
      }
    }
  }
}
```

#### Mixins and Functions

```scss
// Mixin
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Mixin with parameters
@mixin box-shadow($x, $y, $blur, $color) {
  -webkit-box-shadow: $x $y $blur $color;
  -moz-box-shadow: $x $y $blur $color;
  box-shadow: $x $y $blur $color;
}

// Function
@function calculate-width($columns) {
  @return $columns * 60px + ($columns - 1) * 20px;
}

// Usage
.card {
  @include flex-center;
  @include box-shadow(0, 2px, 5px, rgba(0, 0, 0, 0.1));
  width: calculate-width(3);
}
```

#### Inheritance

```scss
%button-base {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.primary-button {
  @extend %button-base;
  background-color: blue;
  color: white;
}

.secondary-button {
  @extend %button-base;
  background-color: gray;
  color: black;
}
```

### Less Features

```less
// Variables
@primary-color: #0066cc;

// Mixins
.border-radius(@radius) {
  border-radius: @radius;
}

// Usage
.button {
  background-color: @primary-color;
  .border-radius(4px);
}
```

### PostCSS

PostCSS processes CSS with JavaScript plugins:

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')
  ]
}
```

## CSS Frameworks

CSS frameworks provide pre-built components and utilities.

### When to Use a Framework

- Pros: Faster development, consistent UI, cross-browser compatibility
- Cons: Increased file size, learning curve, potentially less customization

### Popular CSS Frameworks

1. **Bootstrap**
   ```html
   <div class="container">
     <div class="row">
       <div class="col-md-6">Column 1</div>
       <div class="col-md-6">Column 2</div>
     </div>
   </div>
   ```

2. **Tailwind CSS**
   ```html
   <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
     Button
   </button>
   ```

3. **Bulma**
   ```html
   <div class="columns">
     <div class="column">First column</div>
     <div class="column">Second column</div>
     <div class="column">Third column</div>
   </div>
   ```

### Utility-First CSS

Utility-first CSS frameworks like Tailwind use atomic classes:

```html
<!-- Traditional approach -->
<style>
  .btn {
    padding: 0.5rem 1rem;
    background-color: blue;
    color: white;
    border-radius: 0.25rem;
  }
</style>
<button class="btn">Button</button>

<!-- Utility-first approach -->
<button class="p-2 bg-blue-500 text-white rounded">Button</button>
```

### Custom Framework Integration

For more control, extract components from frameworks:

```scss
// Import just what you need
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/grid";
@import "bootstrap/scss/buttons";

// Customize variables
$primary: #3498db;
```

## Practical Examples

For practical examples, refer to the accompanying HTML and CSS files in this module.

- [View Examples](./index.html)
