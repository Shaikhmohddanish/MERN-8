# 1. Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language used to create web pages. It provides the structure for web content and defines how content is presented in a web browser.

## What is HTML?

HTML is not a programming language; it is a markup language that defines the structure of your content. HTML consists of a series of elements, which you use to enclose, or wrap, different parts of the content to make it appear or act in a certain way.

### Key Characteristics of HTML:

- **Markup Language**: Uses tags to define elements
- **Structure-focused**: Defines the structure rather than the behavior or appearance
- **Interpreted**: Processed by browsers without compilation
- **Hierarchical**: Elements can contain other elements, forming a tree-like structure
- **Platform Independent**: Works across all devices and operating systems

## HTML Elements and Tags

An HTML element is defined by a start tag, some content, and an end tag:

```html
<tagname>Content goes here...</tagname>
```

- The **start tag** (`<tagname>`) marks the beginning of an element
- The **end tag** (`</tagname>`) marks the end of an element
- The **content** is the information contained between the tags
- Some elements have no content and are called **empty elements** (e.g., `<img>` or `<br>`)

## HTML Document Structure

A basic HTML document has the following structure:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>This is a Heading</h1>
    <p>This is a paragraph.</p>
</body>
</html>
```

Let's break down each component:

1. **`<!DOCTYPE html>`**: Declares the document as HTML5
2. **`<html>`**: The root element of an HTML page
3. **`<head>`**: Contains meta information about the document
4. **`<title>`**: Specifies a title for the document (shown in browser tabs)
5. **`<meta>`**: Provides metadata about the HTML document
6. **`<body>`**: Contains the visible page content

## HTML Versions

HTML has evolved through several versions over the years:

| Version | Year | Key Features |
|---------|------|-------------|
| HTML 1.0 | 1991 | Basic document structure |
| HTML 2.0 | 1995 | Forms and tables |
| HTML 3.2 | 1997 | Scripts, applets, text flow around images |
| HTML 4.01 | 1999 | Stylesheets, scripts, frames, embedded objects |
| XHTML 1.0 | 2000 | Reformulation of HTML 4.01 as XML |
| HTML5 | 2014 | Native audio/video, canvas, local storage, semantic elements |

HTML5 is the current standard and includes many new elements and attributes that reflect typical usage on modern websites.

## HTML Comments

Comments in HTML are used to explain the code and may help when you edit the source code later. Comments are not displayed in the browser.

```html
<!-- This is an HTML comment -->
```

## HTML Attributes

HTML attributes provide additional information about HTML elements:

```html
<element attribute="value">Content</element>
```

Common attributes include:
- `id`: Specifies a unique id for an element
- `class`: Specifies one or more class names for an element
- `style`: Specifies an inline CSS style for an element
- `src`: Specifies the URL of the image or other media file
- `href`: Specifies the URL of the page the link goes to
- `alt`: Specifies an alternate text for an image

## HTML vs. XHTML

XHTML is a stricter, more XML-based version of HTML. The main differences include:

1. All XHTML elements must be properly nested
2. All XHTML elements must be closed
3. All XHTML elements must be in lowercase
4. All XHTML documents must have a root element
5. Attribute values must be quoted
6. Attribute minimization is forbidden

## Best Practices

When writing HTML, follow these best practices:

1. **Use semantic elements**: Choose tags that accurately describe the content
2. **Maintain proper indentation**: Makes code more readable
3. **Validate your HTML**: Use tools like the W3C Validator
4. **Use lowercase for tags and attributes**: For consistency
5. **Quote attribute values**: Even when not strictly required
6. **Specify alt text for images**: Improves accessibility
7. **Use proper document structure**: Include DOCTYPE, html, head, and body elements
8. **Separate structure (HTML) from presentation (CSS)**: Don't use deprecated attributes like `bgcolor`

## Resources for Learning HTML

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3Schools HTML Tutorial](https://www.w3schools.com/html/)
- [HTML Living Standard](https://html.spec.whatwg.org/)
- [W3C HTML Validator](https://validator.w3.org/)

In the next sections, we'll explore specific HTML elements in detail, along with practical examples of their usage.
