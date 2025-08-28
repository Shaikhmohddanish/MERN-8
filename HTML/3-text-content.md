# 3. Text Content Tags

HTML provides a rich set of elements designed specifically for structuring and formatting text content. These elements form the backbone of web content and are essential for creating readable, accessible, and well-structured documents.

## Headings (h1-h6)

HTML offers six levels of headings, ranging from `<h1>` (the highest level) to `<h6>` (the lowest level). Headings create a hierarchical structure for your content and help both users and search engines understand the organization of your page.

```html
<h1>Main Title (Used Once Per Page)</h1>
<h2>Major Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Sub-subsection Heading</h4>
<h5>Minor Heading</h5>
<h6>Lowest-level Heading</h6>
```

### Best Practices for Headings

1. **Use only one `<h1>` per page**, typically for the main title
2. **Maintain proper hierarchy** - don't skip levels (e.g., don't jump from `<h2>` to `<h4>`)
3. **Be descriptive** - headings should clearly indicate the content they introduce
4. **Keep headings concise** - typically under 60 characters
5. **Consider SEO** - headings carry significant weight for search engines
6. **Use for structure, not styling** - don't choose heading levels based on appearance

## Paragraphs and Text Formatting

### The `<p>` Element

The paragraph element is the basic building block for text content:

```html
<p>This is a paragraph of text. Paragraphs automatically have space before and after them. Browsers automatically handle the wrapping of text within paragraphs.</p>
```

### Line Breaks with `<br>`

The line break element forces a line break without creating a new paragraph:

```html
<p>This text will be<br>broken into<br>multiple lines.</p>
```

Unlike paragraphs, `<br>` elements don't add extra spacing between lines. Use sparingly and only for genuine line breaks, not for creating space between elements.

### Horizontal Rules with `<hr>`

The horizontal rule element creates a thematic break between paragraph-level elements:

```html
<p>This is the content above the horizontal rule.</p>
<hr>
<p>This is the content below the horizontal rule.</p>
```

Horizontal rules are often rendered as lines and can be useful for separating sections of content.

### Text Formatting Elements

HTML includes several elements for basic text formatting:

```html
<p><strong>Bold text</strong> for strong emphasis.</p>
<p><em>Italic text</em> for emphasis.</p>
<p><u>Underlined text</u> (use sparingly).</p>
<p><s>Strikethrough text</s> for deleted content.</p>
<p><mark>Highlighted text</mark> to mark or highlight text.</p>
<p>Text with <sub>subscript</sub> characters like H<sub>2</sub>O.</p>
<p>Text with <sup>superscript</sup> characters like 10<sup>2</sup>.</p>
<p><small>Smaller text</small> for fine print or disclaimers.</p>
```

Note that while these elements change the appearance of text, they also add semantic meaning. For purely visual styling, CSS is generally preferred.

## Lists (Ordered, Unordered, Description)

HTML provides three types of lists for organizing information.

### Unordered Lists

Unordered lists (`<ul>`) are used when the order of items doesn't matter. Each item is marked with a bullet point by default:

```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

### Ordered Lists

Ordered lists (`<ol>`) are used when the sequence of items is important. Items are automatically numbered:

```html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>
```

Ordered lists have several useful attributes:

- `type`: Specifies the type of marker (1, A, a, I, i)
- `start`: Specifies the start value of the list
- `reversed`: Reverses the counting (counts down instead of up)

```html
<!-- Roman numerals starting from 5 -->
<ol type="I" start="5">
  <li>Item V</li>
  <li>Item VI</li>
  <li>Item VII</li>
</ol>

<!-- Reversed counting -->
<ol reversed>
  <li>Third place</li>
  <li>Second place</li>
  <li>First place</li>
</ol>
```

### Description Lists

Description lists (`<dl>`) are used to display name-value pairs. Each pair consists of a term (`<dt>`) and its description (`<dd>`):

```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language, the standard language for creating web pages.</dd>
  
  <dt>CSS</dt>
  <dd>Cascading Style Sheets, used for describing the presentation of a document.</dd>
  
  <dt>JavaScript</dt>
  <dd>A programming language that enables interactive web pages.</dd>
</dl>
```

Description lists are ideal for glossaries, metadata, or any content with term-description pairs.

### Nested Lists

Lists can be nested within other lists to create hierarchical structures:

```html
<ul>
  <li>Main item 1</li>
  <li>Main item 2
    <ul>
      <li>Sub-item 2.1</li>
      <li>Sub-item 2.2
        <ul>
          <li>Sub-sub-item 2.2.1</li>
          <li>Sub-sub-item 2.2.2</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>Main item 3</li>
</ul>
```

## Quotes and Citations

HTML provides specialized elements for quoting content from other sources.

### Block Quotes

The `<blockquote>` element is used for extended quotations that form a separate paragraph or section:

```html
<blockquote cite="https://www.example.com/source">
  <p>This is an extended quotation from another source, set off from the main text as a block with indentation.</p>
</blockquote>
```

The optional `cite` attribute provides a URL to the source of the quotation.

### Inline Quotes

The `<q>` element is used for shorter, inline quotations:

```html
<p>According to the documentation, <q cite="https://example.com/docs">this feature is deprecated and will be removed in the next version</q>.</p>
```

Browsers typically render `<q>` elements with quotation marks.

### Citations

The `<cite>` element is used to reference a creative work, such as a book, movie, or article:

```html
<p>My favorite book is <cite>The Lord of the Rings</cite> by J.R.R. Tolkien.</p>
```

Browsers typically render `<cite>` elements in italics.

## Preformatted Text and Code

### Preformatted Text

The `<pre>` element preserves both spaces and line breaks exactly as they appear in the HTML code:

```html
<pre>
  This text maintains
    its exact formatting,
      including spaces
    and line breaks.
</pre>
```

This is useful for displaying code, ASCII art, or any content where whitespace is significant.

### Code Elements

The `<code>` element is used to represent computer code:

```html
<p>The <code>console.log()</code> function outputs a message to the console.</p>
```

For multi-line code blocks, combine `<pre>` and `<code>`:

```html
<pre><code>
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");
</code></pre>
```

### Other Code-Related Elements

HTML includes several specialized elements for different types of computer code and inputs:

- `<kbd>`: Represents keyboard input
- `<samp>`: Represents sample output from a computer program
- `<var>`: Represents a variable in a mathematical expression or programming context

```html
<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>
<p>The program returned <samp>Error: File not found</samp>.</p>
<p>The equation is <var>E</var> = <var>m</var><var>c</var><sup>2</sup>.</p>
```

## Other Text Content Elements

### Addresses

The `<address>` element is used to provide contact information for the nearest `<article>` or `<body>` element:

```html
<address>
  Written by <a href="mailto:john@example.com">John Doe</a>.<br>
  Visit us at:<br>
  Example.com<br>
  123 Main St.<br>
  Anytown, CA 12345<br>
  USA
</address>
```

### Time

The `<time>` element represents a specific period of time:

```html
<p>The meeting is scheduled for <time datetime="2025-09-15T13:00:00">September 15, 2025 at 1:00 PM</time>.</p>
```

The `datetime` attribute provides a machine-readable date/time.

### Details and Summary

The `<details>` and `<summary>` elements create an interactive disclosure widget that can be opened or closed by the user:

```html
<details>
  <summary>Click to show more information</summary>
  <p>This is the additional content that is hidden by default. It becomes visible when the user clicks on the summary.</p>
</details>
```

This is useful for FAQs, accordion interfaces, or any content that should be initially hidden but available on demand.

## Best Practices for Text Content

1. **Use semantic elements** that accurately describe the content's purpose
2. **Keep paragraphs focused** on a single idea or topic
3. **Use lists appropriately** to organize related items
4. **Structure content hierarchically** with proper heading levels
5. **Attribute quotes and citations** properly
6. **Use preformatted text sparingly**, as it can create accessibility challenges
7. **Consider readability** - break up long text with headings, lists, and short paragraphs
8. **Maintain consistency** in formatting throughout your document
9. **Focus on content structure**, not visual appearance (use CSS for styling)
10. **Test content accessibility** with screen readers or accessibility tools

By mastering these text content elements, you can create well-structured, readable, and accessible HTML documents that effectively communicate your message to all users.
