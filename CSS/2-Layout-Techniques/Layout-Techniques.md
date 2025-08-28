# CSS Layout Techniques

## Introduction

CSS layout techniques are essential for controlling how elements are positioned and displayed on a webpage. The evolution of CSS has provided us with increasingly powerful tools for creating complex layouts.

In this module, we'll explore various CSS layout techniques, from traditional methods to modern approaches like Flexbox and CSS Grid.

## Display Property

The `display` property is one of the most important CSS properties for controlling layout. It specifies how an element is displayed on the page.

### Common Display Values

1. **block**
   - Elements take up the full width available
   - Start on a new line
   - Examples: `<div>`, `<p>`, `<h1>` to `<h6>`, `<section>`
   
   ```css
   .block-element {
     display: block;
     width: 50%; /* Can set width */
     height: 100px; /* Can set height */
     margin: auto; /* Can be centered with margin auto */
   }
   ```

2. **inline**
   - Elements take up only as much width as necessary
   - Do not start on a new line
   - Examples: `<span>`, `<a>`, `<strong>`, `<em>`
   
   ```css
   .inline-element {
     display: inline;
     /* width and height properties are ignored */
     /* margin-top and margin-bottom are ignored */
     padding: 10px; /* Padding works, but may affect layout */
   }
   ```

3. **inline-block**
   - A hybrid between block and inline
   - Elements flow inline but can have block properties
   - Can set width, height, margins, and padding
   
   ```css
   .inline-block-element {
     display: inline-block;
     width: 100px; /* Can set width */
     height: 100px; /* Can set height */
     margin: 10px; /* All margins work */
   }
   ```

4. **none**
   - The element is completely removed from the document flow
   - It does not take up any space
   
   ```css
   .hidden-element {
     display: none;
   }
   ```

5. **flex**
   - Enables a flex context for its children
   - Provides powerful alignment capabilities
   
   ```css
   .flex-container {
     display: flex;
   }
   ```

6. **grid**
   - Enables a grid context for its children
   - Provides two-dimensional layout capabilities
   
   ```css
   .grid-container {
     display: grid;
   }
   ```

## CSS Positioning

The `position` property specifies how an element is positioned in the document flow.

### Position Values

1. **static** (default)
   - Elements are positioned according to the normal document flow
   - `top`, `right`, `bottom`, `left`, and `z-index` properties have no effect
   
   ```css
   .static-element {
     position: static;
   }
   ```

2. **relative**
   - Elements are positioned relative to their normal position
   - Setting `top`, `right`, `bottom`, `left` properties will adjust the element's position
   - Other elements will not adjust to fill any gap left by the element
   
   ```css
   .relative-element {
     position: relative;
     top: 20px;
     left: 20px; /* Moves 20px down and 20px right from normal position */
   }
   ```

3. **absolute**
   - Elements are removed from the normal document flow
   - Positioned relative to the nearest positioned ancestor (not static)
   - If no positioned ancestor exists, it uses the document body
   
   ```css
   .absolute-element {
     position: absolute;
     top: 20px;
     right: 20px; /* 20px from the top and 20px from the right of its positioned parent */
   }
   ```

4. **fixed**
   - Elements are removed from the normal document flow
   - Positioned relative to the viewport
   - Stays in the same position even when the page is scrolled
   
   ```css
   .fixed-element {
     position: fixed;
     bottom: 20px;
     right: 20px; /* Always 20px from the bottom and 20px from the right of the viewport */
   }
   ```

5. **sticky**
   - A hybrid of relative and fixed positioning
   - Elements are treated as relative until they cross a specified threshold
   - Then they are treated as fixed
   
   ```css
   .sticky-element {
     position: sticky;
     top: 20px; /* Sticks when it's 20px from the top of the viewport */
   }
   ```

### Z-index

The `z-index` property specifies the stack order of an element (which element should be placed in front of or behind others).

```css
.stacked-element {
  position: relative; /* z-index only works on positioned elements */
  z-index: 1; /* Higher values appear in front */
}
```

## Floating Elements

The `float` property was traditionally used for layout before Flexbox and Grid. It specifies whether an element should float to the left or right of its container.

```css
.float-left {
  float: left;
  width: 50%;
}

.float-right {
  float: right;
  width: 50%;
}

.clear-both {
  clear: both; /* Prevents elements from floating beside this element */
}
```

### Clearfix

A common technique to ensure a container expands to contain floated elements:

```css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

## Flexbox Layout

Flexbox (Flexible Box Layout) is a one-dimensional layout method designed for laying out items in rows or columns. It's particularly effective for distributing space and aligning items in a container, even when their size is unknown or dynamic.

### Flex Container Properties

1. **display: flex**
   - Defines a flex container
   
   ```css
   .flex-container {
     display: flex;
   }
   ```

2. **flex-direction**
   - Defines the direction of the main axis
   - Values: `row` (default), `row-reverse`, `column`, `column-reverse`
   
   ```css
   .flex-container {
     display: flex;
     flex-direction: row; /* Items are placed horizontally */
   }
   ```

3. **flex-wrap**
   - Controls whether items should wrap or not if they run out of space
   - Values: `nowrap` (default), `wrap`, `wrap-reverse`
   
   ```css
   .flex-container {
     display: flex;
     flex-wrap: wrap; /* Items will wrap to new lines if needed */
   }
   ```

4. **justify-content**
   - Aligns items along the main axis
   - Values: `flex-start` (default), `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`
   
   ```css
   .flex-container {
     display: flex;
     justify-content: space-between; /* Items are evenly distributed with the first item at the start and the last item at the end */
   }
   ```

5. **align-items**
   - Aligns items along the cross axis
   - Values: `stretch` (default), `flex-start`, `flex-end`, `center`, `baseline`
   
   ```css
   .flex-container {
     display: flex;
     align-items: center; /* Items are centered along the cross axis */
   }
   ```

6. **align-content**
   - Aligns multiple lines of items within the container
   - Only applies when there are multiple lines of items (when `flex-wrap` is set to `wrap` or `wrap-reverse`)
   - Values: `stretch` (default), `flex-start`, `flex-end`, `center`, `space-between`, `space-around`
   
   ```css
   .flex-container {
     display: flex;
     flex-wrap: wrap;
     align-content: space-between; /* Multiple lines are evenly distributed with the first line at the top and the last line at the bottom */
   }
   ```

### Flex Item Properties

1. **flex-grow**
   - Determines how much an item can grow relative to other items
   - Default is 0 (items don't grow)
   
   ```css
   .flex-item {
     flex-grow: 1; /* Item can grow to fill available space */
   }
   ```

2. **flex-shrink**
   - Determines how much an item can shrink relative to other items
   - Default is 1 (items can shrink)
   
   ```css
   .flex-item {
     flex-shrink: 0; /* Item won't shrink below its initial size */
   }
   ```

3. **flex-basis**
   - Defines the initial size of an item before growing or shrinking
   - Default is `auto` (size based on content)
   
   ```css
   .flex-item {
     flex-basis: 200px; /* Initial width (for row) or height (for column) is 200px */
   }
   ```

4. **flex** (shorthand)
   - Combines `flex-grow`, `flex-shrink`, and `flex-basis`
   
   ```css
   .flex-item {
     flex: 1 0 200px; /* flex-grow: 1, flex-shrink: 0, flex-basis: 200px */
   }
   ```

5. **align-self**
   - Overrides the `align-items` value for a specific item
   - Values: `auto` (default), `stretch`, `flex-start`, `flex-end`, `center`, `baseline`
   
   ```css
   .flex-item {
     align-self: flex-end; /* This item is aligned to the end of the cross axis, regardless of the container's align-items value */
   }
   ```

6. **order**
   - Controls the order in which items appear
   - Default is 0 (follows source order)
   
   ```css
   .first-item {
     order: -1; /* Appears before items with higher order values */
   }
   ```

## CSS Grid Layout

CSS Grid Layout is a two-dimensional layout system designed for laying out items in rows and columns simultaneously. It's perfect for creating complex layouts with precise control over both dimensions.

### Grid Container Properties

1. **display: grid**
   - Defines a grid container
   
   ```css
   .grid-container {
     display: grid;
   }
   ```

2. **grid-template-columns**
   - Defines the columns of the grid
   
   ```css
   .grid-container {
     display: grid;
     grid-template-columns: 100px 200px 100px; /* Three columns with fixed widths */
   }
   ```

3. **grid-template-rows**
   - Defines the rows of the grid
   
   ```css
   .grid-container {
     display: grid;
     grid-template-rows: 100px auto 100px; /* Three rows, middle row adjusts to content */
   }
   ```

4. **grid-template-areas**
   - Defines named grid areas
   
   ```css
   .grid-container {
     display: grid;
     grid-template-columns: 1fr 3fr 1fr;
     grid-template-rows: auto 1fr auto;
     grid-template-areas:
       "header header header"
       "sidebar content aside"
       "footer footer footer";
   }
   ```

5. **grid-gap**, **grid-column-gap**, **grid-row-gap**
   - Sets the gaps between rows and columns
   
   ```css
   .grid-container {
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     grid-gap: 20px; /* Adds 20px gap between all rows and columns */
     /* Alternatively: */
     grid-column-gap: 20px; /* Only between columns */
     grid-row-gap: 10px; /* Only between rows */
   }
   ```

6. **justify-items**
   - Aligns grid items horizontally within their cells
   - Values: `stretch` (default), `start`, `end`, `center`
   
   ```css
   .grid-container {
     display: grid;
     justify-items: center; /* Centers items horizontally in their cells */
   }
   ```

7. **align-items**
   - Aligns grid items vertically within their cells
   - Values: `stretch` (default), `start`, `end`, `center`
   
   ```css
   .grid-container {
     display: grid;
     align-items: center; /* Centers items vertically in their cells */
   }
   ```

### Grid Item Properties

1. **grid-column**, **grid-row**
   - Specifies the grid lines an item should start and end at
   
   ```css
   .grid-item {
     grid-column: 1 / 3; /* Starts at line 1, ends at line 3 (spans 2 columns) */
     grid-row: 2 / 4; /* Starts at line 2, ends at line 4 (spans 2 rows) */
   }
   ```

2. **grid-area**
   - Places an item in a named grid area or specifies the grid lines
   
   ```css
   .header {
     grid-area: header; /* Places this item in the area named "header" */
   }
   
   .sidebar {
     grid-area: 2 / 1 / 3 / 2; /* row-start / column-start / row-end / column-end */
   }
   ```

3. **justify-self**
   - Overrides the container's `justify-items` value for a specific item
   - Values: `stretch` (default), `start`, `end`, `center`
   
   ```css
   .grid-item {
     justify-self: end; /* Aligns this item to the end of its cell horizontally */
   }
   ```

4. **align-self**
   - Overrides the container's `align-items` value for a specific item
   - Values: `stretch` (default), `start`, `end`, `center`
   
   ```css
   .grid-item {
     align-self: start; /* Aligns this item to the start of its cell vertically */
   }
   ```

### Useful Grid Functions and Keywords

1. **repeat()**
   - Repeats a pattern of track sizes
   
   ```css
   .grid-container {
     display: grid;
     grid-template-columns: repeat(3, 1fr); /* Creates 3 equal-width columns */
     grid-template-columns: repeat(3, 100px); /* Creates 3 columns of 100px each */
     grid-template-columns: repeat(2, 100px 200px); /* Creates 4 columns: 100px, 200px, 100px, 200px */
   }
   ```

2. **minmax()**
   - Sets a minimum and maximum size
   
   ```css
   .grid-container {
     display: grid;
     grid-template-columns: minmax(100px, 300px) 1fr; /* First column is between 100px and 300px, second column takes remaining space */
   }
   ```

3. **fr unit**
   - Represents a fraction of the available space
   
   ```css
   .grid-container {
     display: grid;
     grid-template-columns: 1fr 2fr 1fr; /* Three columns, middle one takes twice the space of the others */
   }
   ```

4. **auto-fill** and **auto-fit**
   - Create as many tracks as can fit in the container
   
   ```css
   .grid-container {
     display: grid;
     /* As many 100px columns as can fit, with at least 20px gap */
     grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
     grid-gap: 20px;
   }
   ```

## Responsive Layouts

Creating responsive layouts is crucial for ensuring your websites look good on devices of all sizes. Here are some techniques:

### Media Queries

Media queries allow you to apply different styles based on device characteristics like width, height, or orientation.

```css
/* Base styles for all screen sizes */
.container {
  padding: 20px;
}

/* Styles for screens wider than 600px */
@media (min-width: 600px) {
  .container {
    padding: 40px;
  }
}

/* Styles for screens wider than 1024px */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
    margin: 0 auto;
  }
}
```

### Responsive Grid with Flexbox

```css
.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.flex-item {
  flex: 1 0 100%; /* Full width on small screens */
}

@media (min-width: 600px) {
  .flex-item {
    flex: 1 0 50%; /* Half width on medium screens */
  }
}

@media (min-width: 1024px) {
  .flex-item {
    flex: 1 0 33.333%; /* One-third width on large screens */
  }
}
```

### Responsive Grid with CSS Grid

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr; /* One column on small screens */
  grid-gap: 20px;
}

@media (min-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr); /* Two columns on medium screens */
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr); /* Three columns on large screens */
  }
}
```

## Common Layout Patterns

### Holy Grail Layout

A common web layout with header, footer, and three columns in the middle (sidebar, content, sidebar).

With Flexbox:
```css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header, footer {
  flex: 0 0 auto;
}

.main {
  display: flex;
  flex: 1 0 auto;
}

.content {
  flex: 1 0 auto;
}

.sidebar-left, .sidebar-right {
  flex: 0 0 200px;
}

@media (max-width: 768px) {
  .main {
    flex-direction: column;
  }
  .sidebar-left, .sidebar-right {
    flex: 0 0 auto;
  }
}
```

With CSS Grid:
```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "sidebar-left content sidebar-right"
    "footer footer footer";
  min-height: 100vh;
}

header { grid-area: header; }
.sidebar-left { grid-area: sidebar-left; }
.content { grid-area: content; }
.sidebar-right { grid-area: sidebar-right; }
footer { grid-area: footer; }

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "sidebar-left"
      "content"
      "sidebar-right"
      "footer";
  }
}
```

### Card Layout

A grid of cards commonly used for products, blog posts, etc.

With Flexbox:
```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 0 0 calc(33.333% - 20px);
  display: flex;
  flex-direction: column;
}

.card-image {
  height: 200px;
  background-size: cover;
}

.card-content {
  flex: 1 0 auto;
  padding: 20px;
}

@media (max-width: 1024px) {
  .card {
    flex: 0 0 calc(50% - 20px);
  }
}

@media (max-width: 600px) {
  .card {
    flex: 0 0 100%;
  }
}
```

With CSS Grid:
```css
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
}

.card {
  display: grid;
  grid-template-rows: 200px 1fr;
}

.card-image {
  background-size: cover;
}

.card-content {
  padding: 20px;
}
```

## Exercises

1. Create a responsive navigation bar that changes from horizontal to vertical on small screens.
2. Build a photo gallery grid that rearranges based on screen size.
3. Implement the "Holy Grail" layout using both Flexbox and CSS Grid.
4. Create a card layout for a product listing page.

Refer to the HTML and CSS files in this module for examples and practice exercises.
