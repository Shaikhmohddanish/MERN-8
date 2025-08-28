# 2. Document Structure Tags

HTML documents follow a specific structure that provides organization and context for web browsers. This section explores the fundamental tags that create the backbone of every HTML document.

## The Foundation: `<html>`, `<head>`, and `<body>`

Every HTML document consists of three main structural components:

### `<html>` Element

The `<html>` element is the root element of an HTML page. All other elements must be descendants of this element.

```html
<html lang="en">
  <!-- All other content goes here -->
</html>
```

**Key attributes**:
- `lang`: Specifies the language of the document content (e.g., "en" for English, "fr" for French)
- `dir`: Specifies the text direction ("ltr" for left-to-right, "rtl" for right-to-left)
- `xmlns`: In XHTML, defines the XML namespace

### `<head>` Element

The `<head>` element is a container for metadata (data about data) and is placed between the `<html>` tag and the `<body>` tag. Metadata is not displayed on the page but is machine-parsable.

```html
<head>
  <title>Page Title</title>
  <meta charset="UTF-8">
  <meta name="description" content="Page description">
  <link rel="stylesheet" href="styles.css">
  <script src="script.js"></script>
</head>
```

The `<head>` section typically contains:
- Document title
- Character encoding
- Linked style sheets
- Scripts
- Meta information
- Favicon links
- Base URL

### `<body>` Element

The `<body>` element contains all the content that is visible to users when they visit the page, such as text, images, links, videos, and more.

```html
<body>
  <header>
    <h1>Welcome to My Website</h1>
  </header>
  <main>
    <p>This is the main content of the page.</p>
  </main>
  <footer>
    <p>&copy; 2025 My Website</p>
  </footer>
</body>
```

**Key attributes**:
- Event attributes (e.g., `onclick`, `onload`)
- `class`, `id`, and other global attributes
- Legacy attributes like `bgcolor` and `text` (discouraged in HTML5)

## Meta Tags: The Hidden Powers

Meta tags provide structured metadata about a webpage. They influence how your page appears in search results, how it behaves when shared on social media, and how browsers should handle the page.

### Essential Meta Tags

#### Character Encoding

```html
<meta charset="UTF-8">
```
This defines the character encoding for the document. UTF-8 is recommended as it covers almost all characters and symbols in the world.

#### Viewport Settings

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
This tag is crucial for responsive design, telling the browser how to control the page's dimensions and scaling on different devices.

#### Description

```html
<meta name="description" content="A detailed guide to HTML document structure tags">
```
This provides a brief description of the page that may be used by search engines in search results.

#### Keywords

```html
<meta name="keywords" content="HTML, document structure, head, body, meta tags">
```
While less important for SEO than in the past, this can still be used to provide keywords relevant to the page.

#### Author

```html
<meta name="author" content="John Doe">
```
Specifies the author of the document.

### Social Media Meta Tags

#### Open Graph Protocol (Facebook)

```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">
```

#### Twitter Card

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page description">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

### Other Important Meta Tags

#### Robots Control

```html
<meta name="robots" content="index, follow">
```
Instructs search engines whether to index the page and follow links.

#### Refresh or Redirect

```html
<meta http-equiv="refresh" content="5;url=https://example.com">
```
Refreshes the page or redirects to another URL after a specified time (in seconds).

## Title, Link, and Script Elements

### The `<title>` Element

The `<title>` element defines the title of the document, which appears in the browser's title bar or tab.

```html
<title>My Awesome Website | Home Page</title>
```

Best practices for titles:
- Keep them concise but descriptive (50-60 characters)
- Include important keywords
- Make each page's title unique
- Consider using a consistent pattern (e.g., "Page Name | Site Name")

### The `<link>` Element

The `<link>` element defines the relationship between the current document and an external resource. It's most commonly used to link to stylesheets.

```html
<!-- CSS Stylesheet -->
<link rel="stylesheet" href="styles.css">

<!-- Favicon -->
<link rel="icon" href="favicon.ico" type="image/x-icon">

<!-- Alternative Stylesheets -->
<link rel="alternate stylesheet" href="darkmode.css" title="Dark Mode">

<!-- Preconnect to External Domains -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- Font Loading -->
<link rel="preload" href="fonts/myfont.woff2" as="font" type="font/woff2" crossorigin>
```

**Key attributes**:
- `rel`: Specifies the relationship between the current document and the linked resource
- `href`: Specifies the location (URL) of the linked resource
- `type`: Specifies the MIME type of the linked resource
- `media`: Specifies which media/device the linked resource is optimized for
- `sizes`: Specifies the size of icons for visual media
- `crossorigin`: Specifies how the element handles crossorigin requests

### The `<script>` Element

The `<script>` element is used to embed or reference executable code, typically JavaScript.

```html
<!-- Internal JavaScript -->
<script>
  function greet() {
    alert("Hello, world!");
  }
</script>

<!-- External JavaScript -->
<script src="script.js"></script>

<!-- Deferred Loading -->
<script src="deferred.js" defer></script>

<!-- Asynchronous Loading -->
<script src="analytics.js" async></script>

<!-- Specifying Type -->
<script type="module" src="module.js"></script>
```

**Key attributes**:
- `src`: Specifies the URL of an external script file
- `type`: Specifies the MIME type of the script
- `defer`: Indicates that the script should be executed after the document has been parsed
- `async`: Indicates that the script should be executed asynchronously
- `integrity`: Allows browsers to verify that fetched resources haven't been manipulated
- `crossorigin`: Specifies how the element handles crossorigin requests
- `nomodule`: Specifies that the script should not be executed in browsers that support ES modules

## The `<base>` Element

The `<base>` element specifies the base URL and/or target for all relative URLs in a document. It must be placed in the `<head>` section, and there can only be one `<base>` element in a document.

```html
<base href="https://example.com/pages/">
<base target="_blank">
```

**Key attributes**:
- `href`: Specifies the base URL for all relative URLs in the page
- `target`: Specifies the default target for all hyperlinks and forms in the page

## The `<style>` Element

The `<style>` element is used to include internal CSS within an HTML document.

```html
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
  }
  h1 {
    color: navy;
  }
</style>
```

**Key attributes**:
- `type`: Specifies the MIME type of the style sheet language (default is "text/css")
- `media`: Specifies which media/device the style sheet should be applied to
- `scoped`: Specifies that the styles only apply to this element's parent and that parent's children (not supported in most browsers)

## HTML Document Template

Here's a comprehensive template combining all the essential document structure elements:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Character encoding -->
  <meta charset="UTF-8">
  
  <!-- Viewport for responsive design -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO meta tags -->
  <meta name="description" content="Description of your page">
  <meta name="keywords" content="relevant, keywords, here">
  <meta name="author" content="Your Name">
  <meta name="robots" content="index, follow">
  
  <!-- Social media sharing -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Page description">
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta property="og:url" content="https://example.com/page">
  <meta property="og:type" content="website">
  
  <!-- Page title -->
  <title>Page Title | Website Name</title>
  
  <!-- Favicon -->
  <link rel="icon" href="favicon.ico" type="image/x-icon">
  
  <!-- CSS stylesheets -->
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/styles.css">
  
  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Internal CSS -->
  <style>
    /* Critical CSS can go here */
    .hero {
      background-color: #f0f0f0;
      padding: 2rem;
    }
  </style>
  
  <!-- JavaScript - deferred for performance -->
  <script src="js/main.js" defer></script>
  
  <!-- Analytics or other third-party scripts - async for performance -->
  <script src="js/analytics.js" async></script>
</head>
<body>
  <header>
    <h1>Website Title</h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section class="hero">
      <h2>Welcome to our website</h2>
      <p>This is the main content area of the page.</p>
    </section>
    
    <section>
      <h2>Our Services</h2>
      <p>Information about services goes here.</p>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2025 Website Name. All rights reserved.</p>
  </footer>
  
  <!-- Scripts that need to be loaded last -->
  <script src="js/after-load.js"></script>
</body>
</html>
```

## Best Practices for Document Structure

1. **Always include the DOCTYPE**: This ensures the browser renders the page in standards mode.
2. **Specify the language**: Use the `lang` attribute on the `<html>` element for accessibility and SEO.
3. **Use UTF-8 encoding**: It's the most versatile character encoding.
4. **Include viewport meta tag**: Essential for responsive design.
5. **Place stylesheets in the head**: This prevents flash of unstyled content (FOUC).
6. **Place scripts at the end of the body or use defer/async**: This improves page load performance.
7. **Use semantic elements**: They provide meaning to the document structure.
8. **Keep the head section organized**: Group related meta tags, scripts, and links together.
9. **Validate your HTML**: Use tools like the W3C Validator to ensure your document structure is correct.
10. **Consider accessibility**: Proper document structure is the foundation of an accessible website.

By mastering these document structure elements, you create a solid foundation for building well-organized, SEO-friendly, and accessible websites.
