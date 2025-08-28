# CSS Fundamentals

## Introduction to CSS

CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.

## Why CSS is Important

- **Separation of concerns**: HTML for structure, CSS for presentation
- **Consistency**: Apply the same styles across multiple pages
- **Efficiency**: Change the appearance of an entire website by modifying a single file
- **Accessibility**: Make content more accessible by controlling presentation
- **Responsive design**: Adapt content for different devices and screen sizes

## CSS Syntax

The basic structure of CSS consists of:

```css
selector {
  property: value;
  /* More property-value pairs */
}
```

- **Selector**: Targets the HTML element(s) to style
- **Property**: The attribute you want to change
- **Value**: The specific setting for the property

Example:
```css
h1 {
  color: blue;
  font-size: 24px;
}
```

## How to Include CSS in HTML

There are three methods to include CSS in an HTML document:

### 1. Inline CSS
Adding styles directly to HTML elements using the `style` attribute:

```html
<p style="color: red; font-size: 16px;">This is a paragraph with inline styles.</p>
```

**Pros**: Quick for small changes
**Cons**: Not reusable, mixes content with presentation

### 2. Internal CSS
Embedding CSS in the `<head>` section using the `<style>` tag:

```html
<head>
  <style>
    p {
      color: red;
      font-size: 16px;
    }
  </style>
</head>
```

**Pros**: No extra files needed
**Cons**: Increases page size, styles limited to one page

### 3. External CSS (Recommended)
Linking to a separate CSS file:

```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```

**Pros**: Separation of concerns, reusability, caching
**Cons**: Extra HTTP request (minor with HTTP/2)

## CSS Selectors

CSS selectors define which elements to target for styling:

### Basic Selectors

1. **Element Selector**
   Targets all instances of a specific HTML element.
   ```css
   p {
     color: blue;
   }
   ```

2. **Class Selector**
   Targets elements with a specific class attribute.
   ```css
   .highlight {
     background-color: yellow;
   }
   ```

3. **ID Selector**
   Targets a single element with a specific ID.
   ```css
   #header {
     font-size: 24px;
   }
   ```

### Combinatorial Selectors

1. **Descendant Selector**
   Targets elements that are descendants of another element.
   ```css
   article p {
     font-style: italic;
   }
   ```

2. **Child Selector**
   Targets direct children of another element.
   ```css
   ul > li {
     list-style-type: square;
   }
   ```

3. **Adjacent Sibling Selector**
   Targets an element that directly follows another.
   ```css
   h2 + p {
     font-weight: bold;
   }
   ```

### Pseudo-classes and Pseudo-elements

1. **Pseudo-classes**
   Target elements in a specific state.
   ```css
   a:hover {
     text-decoration: underline;
   }
   
   li:first-child {
     font-weight: bold;
   }
   ```

2. **Pseudo-elements**
   Target specific parts of an element.
   ```css
   p::first-letter {
     font-size: 200%;
   }
   
   p::before {
     content: "→ ";
   }
   ```

## CSS Box Model

The CSS box model is fundamental to understanding layout in CSS. Every HTML element is treated as a box with:

1. **Content**: The actual content of the element
2. **Padding**: Space between the content and the border
3. **Border**: A line around the padding and content
4. **Margin**: Space outside the border

```css
div {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  margin: 30px;
}
```

The total width calculation is:
- Default box model: width + padding + border + margin
- With `box-sizing: border-box`: The specified width includes padding and border

## Basic Text Formatting

### Font Properties

```css
p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: bold;
  font-style: italic;
  line-height: 1.5;
}
```

### Text Properties

```css
h1 {
  color: #333333;
  text-align: center;
  text-decoration: underline;
  text-transform: uppercase;
  letter-spacing: 2px;
  word-spacing: 5px;
}
```

## Colors in CSS

CSS supports various color formats:

1. **Color Names**
   ```css
   h1 { color: red; }
   ```

2. **Hexadecimal**
   ```css
   h1 { color: #ff0000; }
   ```

3. **RGB**
   ```css
   h1 { color: rgb(255, 0, 0); }
   ```

4. **RGBA** (with alpha/transparency)
   ```css
   h1 { color: rgba(255, 0, 0, 0.5); }
   ```

5. **HSL** (hue, saturation, lightness)
   ```css
   h1 { color: hsl(0, 100%, 50%); }
   ```

6. **HSLA** (with alpha/transparency)
   ```css
   h1 { color: hsla(0, 100%, 50%, 0.5); }
   ```

## Units in CSS

CSS uses various units for measurements:

### Absolute Units
- **px**: Pixels
- **pt**: Points (1/72 of an inch)
- **in**: Inches
- **cm**: Centimeters
- **mm**: Millimeters

### Relative Units
- **%**: Percentage relative to the parent element
- **em**: Relative to the font-size of the element
- **rem**: Relative to the font-size of the root element
- **vw**: 1% of viewport width
- **vh**: 1% of viewport height
- **vmin**: 1% of viewport's smaller dimension
- **vmax**: 1% of viewport's larger dimension

## Specificity and the Cascade

CSS stands for Cascading Style Sheets. The "cascade" refers to how styles are applied and which styles take precedence:

1. **Importance**: `!important` declarations override normal declarations
2. **Specificity**: More specific selectors override less specific ones
3. **Source order**: Later styles override earlier ones

Specificity hierarchy (lowest to highest):
- Element selectors (`p`, `div`)
- Class selectors (`.class`), attribute selectors (`[type="text"]`), pseudo-classes (`:hover`)
- ID selectors (`#id`)
- Inline styles (`style` attribute)

## Exercise

Try to style a simple webpage using the concepts learned in this module. Look at the accompanying HTML and CSS files for examples and practice.

In the next module, we'll explore CSS layout techniques in detail.
