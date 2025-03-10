# Sayless Design System

This document outlines the design system for the Sayless application, a conversational search engine for fashion and clothing discovery. The design system is built with Tailwind CSS and follows a mobile-first responsive approach.

## Table of Contents

1. [Colors](#colors)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Breakpoints](#breakpoints)
5. [Components](#components)
   - [Buttons](#buttons)
   - [Inputs](#inputs)
   - [Cards](#cards)
   - [Chat Bubbles](#chat-bubbles)
   - [Badges](#badges)
   - [Header](#header)
6. [Layouts](#layouts)
   - [Container](#container)
   - [Product Grid](#product-grid)
7. [Utilities](#utilities)
   - [Text Utilities](#text-utilities)
   - [Overlay Utilities](#overlay-utilities)
   - [Aspect Ratios](#aspect-ratios)
8. [Responsive Design](#responsive-design)
9. [Accessibility](#accessibility)

## Colors

The Sayless color palette consists of primary brand colors and supporting colors for text, backgrounds, and status indicators.

### Brand Colors

- **Burgundy**: Primary brand color
  - `burgundy` - `#32181B` (Main burgundy color)
  - `burgundy-light` - `#4A2A2D`
  - `burgundy-dark` - `#251214`
  - `burgundy-hover` - `#3F2023`

- **Beige**: Secondary brand color
  - `beige` - `#E3C9A2` (Main beige color)
  - `beige-light` - `#EBD8B9`
  - `beige-dark` - `#D4B68C`
  - `beige-hover` - `#DBBC91`

### Text Colors

- `text-primary` - `#151926` (Main text color)
- `text-secondary` - `#4A4B57`
- `text-light` - `#6E7081`
- `text-muted` - `#9CA3AF`

### Background Colors

- `background-white` - `#FFFFFF`
- `background-light` - `#F9F9F9`
- `background-overlay` - `rgba(0, 0, 0, 0.05)` (For dusty overlay effect)

### Status Colors

- `status-success` - `#10B981`
- `status-warning` - `#F59E0B`
- `status-error` - `#EF4444`
- `status-info` - `#3B82F6`

### Usage Examples

```jsx
// Background colors
<div className="bg-burgundy text-white">Burgundy background</div>
<div className="bg-beige text-burgundy">Beige background</div>

// Text colors
<p className="text-text-primary">Primary text</p>
<p className="text-text-secondary">Secondary text</p>
<p className="text-text-light">Light text</p>
<p className="text-text-muted">Muted text</p>

// Status colors
<div className="text-status-success">Success message</div>
<div className="text-status-error">Error message</div>
```

## Typography

Sayless uses two main font families:

- **Goldman**: Primary font for headings and brand elements
- **Inter**: Secondary font for body text and product information

### Font Sizes

- `text-2xs` - 10px (0.625rem)
- `text-xs` - 12px (0.75rem)
- `text-sm` - 14px (0.875rem)
- `text-base` - 16px (1rem)
- `text-lg` - 18px (1.125rem)
- `text-xl` - 20px (1.25rem)
- `text-2xl` - 24px (1.5rem)
- `text-3xl` - 30px (1.875rem)
- `text-4xl` - 36px (2.25rem)
- `text-5xl` - 48px (3rem)

### Font Weights

- `font-normal` - 400
- `font-medium` - 500
- `font-semibold` - 600
- `font-bold` - 700

### Usage Examples

```jsx
// Headings
<h1 className="font-goldman text-4xl font-bold">Heading 1</h1>
<h2 className="font-goldman text-3xl font-bold">Heading 2</h2>
<h3 className="font-goldman text-2xl font-semibold">Heading 3</h3>

// Body text
<p className="font-inter text-base">Regular paragraph text</p>
<p className="font-inter text-sm text-text-secondary">Smaller secondary text</p>

// Product information
<p className="font-inter text-lg font-medium">Product name</p>
<p className="font-inter text-sm text-text-light">Product description</p>
```

## Spacing

The spacing scale follows a consistent pattern with additional values for fine-tuning layouts.

Key spacing values:
- `0.5` - 2px (0.125rem)
- `1` - 4px (0.25rem)
- `2` - 8px (0.5rem)
- `3` - 12px (0.75rem)
- `4` - 16px (1rem)
- `6` - 24px (1.5rem)
- `8` - 32px (2rem)
- `12` - 48px (3rem)
- `16` - 64px (4rem)
- `20` - 80px (5rem)

### Usage Examples

```jsx
// Margin
<div className="mt-4">Margin top 16px</div>
<div className="mb-6">Margin bottom 24px</div>
<div className="mx-auto">Horizontal center</div>
<div className="my-8">Vertical margin 32px</div>

// Padding
<div className="p-4">Padding 16px all around</div>
<div className="px-6 py-4">Horizontal padding 24px, vertical padding 16px</div>

// Gap
<div className="flex gap-4">Items with 16px gap</div>
<div className="grid gap-6">Grid items with 24px gap</div>
```

## Breakpoints

Sayless follows a mobile-first approach with these breakpoints:

- `xs`: 480px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Usage Examples

```jsx
// Responsive text size
<h1 className="text-2xl md:text-3xl lg:text-4xl">Responsive heading</h1>

// Responsive layout
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {/* Grid items */}
</div>

// Responsive padding
<div className="p-4 md:p-6 lg:p-8">
  {/* Content with responsive padding */}
</div>
```

## Components

### Buttons

Buttons come in several variants and sizes:

#### Button Variants

- `.btn-primary`: Main call-to-action buttons
- `.btn-secondary`: Secondary actions
- `.btn-beige`: Alternative accent buttons
- `.btn-outline`: Outlined buttons
- `.btn-ghost`: Minimal buttons for less emphasis

#### Button Sizes

- Default: Standard size
- `.btn-sm`: Small buttons
- `.btn-lg`: Large buttons

#### Usage Examples

```jsx
// Primary button
<button className="btn-primary">Shop Now</button>

// Secondary button
<button className="btn-secondary">View Details</button>

// Beige button
<button className="btn-beige">Add to Cart</button>

// Outline button
<button className="btn-outline">Learn More</button>

// Ghost button
<button className="btn-ghost">Cancel</button>

// Size variants
<button className="btn-primary btn-sm">Small Button</button>
<button className="btn-primary btn-lg">Large Button</button>
```

### Inputs

Input components for forms and search:

#### Input Variants

- `.input`: Standard input field
- `.input-search`: Search input with icon space
- `.input-sm`: Small input
- `.input-lg`: Large input

#### Usage Examples

```jsx
// Standard input
<input type="text" className="input" placeholder="Enter your name" />

// Search input (with icon)
<div className="relative">
  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
    <SearchIcon className="w-5 h-5 text-gray-400" />
  </span>
  <input type="text" className="input-search" placeholder="Search for products..." />
</div>

// Size variants
<input type="text" className="input-sm" placeholder="Small input" />
<input type="text" className="input-lg" placeholder="Large input" />
```

### Cards

Card components for displaying products and content:

#### Card Variants

- `.card`: Standard card
- `.card-hover`: Card with hover effect
- `.card-product`: Product card

#### Usage Examples

```jsx
// Standard card
<div className="card p-6">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p>Card content goes here</p>
</div>

// Card with hover effect
<div className="card card-hover p-6">
  <h3 className="text-xl font-semibold mb-2">Hover Card</h3>
  <p>This card has a hover effect</p>
</div>

// Product card
<div className="card-product">
  <div className="aspect-product">
    <img src="/product-image.jpg" alt="Product" className="w-full h-full object-cover" />
  </div>
  <div className="p-4">
    <h3 className="font-inter text-lg font-medium">Product Name</h3>
    <p className="text-text-secondary">$99.99</p>
  </div>
</div>
```

### Chat Bubbles

Chat components for the conversational interface:

#### Chat Bubble Variants

- `.chat-bubble`: Base chat bubble
- `.chat-bubble-user`: User message bubble
- `.chat-bubble-system`: System/AI message bubble

#### Usage Examples

```jsx
// User message
<div className="chat-bubble-user">
  I'm looking for a black dress for a wedding
</div>

// System message
<div className="chat-bubble-system">
  I found several black dresses that would be perfect for a wedding. Here are some options:
</div>
```

### Badges

Badge components for labels and status indicators:

#### Badge Variants

- `.badge-primary`: Primary badge
- `.badge-secondary`: Secondary badge
- `.badge-outline`: Outlined badge

#### Usage Examples

```jsx
// Primary badge
<span className="badge-primary">New</span>

// Secondary badge
<span className="badge-secondary">Sale</span>

// Outline badge
<span className="badge-outline text-status-success">In Stock</span>
```

### Header

Header component for navigation:

#### Usage Example

```jsx
<header className="header">
  <div className="container-custom flex items-center justify-between">
    <div className="flex items-center">
      <img src="/logo.svg" alt="Sayless" className="h-8" />
    </div>
    <nav className="hidden md:flex space-x-6">
      <a href="#" className="header-nav-item">Home</a>
      <a href="#" className="header-nav-item">Shop</a>
      <a href="#" className="header-nav-item">Trending</a>
      <a href="#" className="header-nav-item">About</a>
    </nav>
    <div className="flex items-center space-x-4">
      <button className="header-nav-item">
        <SearchIcon className="w-6 h-6" />
      </button>
      <button className="header-nav-item">
        <UserIcon className="w-6 h-6" />
      </button>
    </div>
  </div>
</header>
```

## Layouts

### Container

The `.container-custom` class provides a responsive container with appropriate padding:

```jsx
<div className="container-custom">
  {/* Page content */}
</div>
```

### Product Grid

The `.product-grid` class creates a responsive grid for product listings:

```jsx
<div className="product-grid">
  {products.map(product => (
    <div key={product.id} className="card-product">
      {/* Product content */}
    </div>
  ))}
</div>
```

## Utilities

### Text Utilities

- `.text-shadow`: Adds a subtle text shadow
- `.text-shadow-lg`: Adds a larger text shadow
- `.text-gradient`: For gradient text (use with background gradient)
- `.line-clamp-1`, `.line-clamp-2`, `.line-clamp-3`: Truncate text with ellipsis

#### Usage Examples

```jsx
// Text shadow
<h2 className="text-shadow">Featured Products</h2>

// Gradient text
<h1 className="text-gradient bg-gradient-burgundy">Sayless</h1>

// Line clamp
<p className="line-clamp-2">
  This is a long product description that will be truncated after two lines with an ellipsis.
</p>
```

### Overlay Utilities

- `.overlay-burgundy`: Burgundy overlay with 75% opacity
- `.overlay-beige`: Beige overlay with 75% opacity

#### Usage Examples

```jsx
<div className="relative">
  <img src="/banner-image.jpg" alt="Banner" className="w-full" />
  <div className="absolute inset-0 overlay-burgundy flex items-center justify-center">
    <h2 className="text-white text-3xl font-bold">Summer Collection</h2>
  </div>
</div>
```

### Aspect Ratios

- `.aspect-product`: 3:4 aspect ratio for product images

#### Usage Example

```jsx
<div className="aspect-product">
  <img src="/product-image.jpg" alt="Product" className="w-full h-full object-cover" />
</div>
```

## Responsive Design

Sayless follows a mobile-first approach. Start with styles for mobile devices and then add responsive variants for larger screens.

### Key Principles

1. **Mobile-First**: Design for mobile first, then enhance for larger screens
2. **Fluid Typography**: Use responsive text sizes that scale with screen size
3. **Flexible Layouts**: Use flexbox and grid for adaptive layouts
4. **Appropriate Touch Targets**: Ensure buttons and interactive elements are large enough on mobile (min 44px)
5. **Conditional Rendering**: Show/hide elements based on screen size when appropriate

### Example of Responsive Component

```jsx
// Responsive product card
<div className="card-product">
  <div className="aspect-product">
    <img src="/product-image.jpg" alt="Product" className="w-full h-full object-cover" />
  </div>
  <div className="p-3 md:p-4">
    <h3 className="font-inter text-base md:text-lg font-medium line-clamp-1">Product Name</h3>
    <p className="text-sm md:text-base text-text-secondary mt-1">$99.99</p>
    <div className="mt-2 md:mt-3 flex flex-col sm:flex-row gap-2">
      <button className="btn-primary btn-sm md:btn-md w-full sm:w-auto">Add to Cart</button>
      <button className="btn-outline btn-sm md:btn-md w-full sm:w-auto hidden sm:block">Details</button>
    </div>
  </div>
</div>
```

## Accessibility

The design system is built with accessibility in mind:

### Color Contrast

All color combinations meet WCAG 2.1 AA standards for contrast:
- Text on backgrounds has a minimum contrast ratio of 4.5:1
- Large text has a minimum contrast ratio of 3:1

### Focus States

All interactive elements have visible focus states:
```css
:focus-visible {
  @apply outline-none ring-2 ring-burgundy ring-offset-2;
}
```

### Semantic HTML

Use semantic HTML elements for better accessibility:
```jsx
<article className="card-product">
  <figure className="aspect-product">
    <img src="/product-image.jpg" alt="Product" />
  </figure>
  <div className="p-4">
    <h3>Product Name</h3>
    <p>$99.99</p>
  </div>
</article>
```

### Screen Reader Text

For visually hidden text that should be read by screen readers:
```jsx
<span className="sr-only">Search</span>
<SearchIcon className="w-5 h-5" />
```

## Implementation Examples

### Product Listing Page

```jsx
<div className="container-custom py-8 md:py-12">
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-goldman font-bold mb-6">
    Featured Products
  </h1>
  
  <div className="product-grid">
    {products.map(product => (
      <div key={product.id} className="card-product">
        <div className="aspect-product relative">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {product.isNew && (
            <span className="badge-primary absolute top-2 right-2">New</span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-inter text-lg font-medium line-clamp-1">{product.name}</h3>
          <p className="text-text-secondary mt-1">${product.price}</p>
          <div className="mt-3">
            <button className="btn-primary w-full">Add to Cart</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
```

### Chat Interface

```jsx
<div className="container-custom max-w-3xl py-6">
  <div className="bg-white rounded-xl shadow-soft p-4 md:p-6">
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div key={index} className={message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-system'}>
          {message.content}
        </div>
      ))}
    </div>
    
    <div className="mt-6">
      <div className="relative">
        <input 
          type="text" 
          className="input pr-12" 
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-primary btn-sm"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  </div>
</div>
```

### Header with Search

```jsx
<header className="header sticky top-0 z-50">
  <div className="container-custom flex items-center justify-between">
    <div className="flex items-center">
      <img src="/logo.svg" alt="Sayless" className="h-6 md:h-8" />
    </div>
    
    <div className="hidden md:block w-1/2 max-w-md">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="w-5 h-5 text-gray-400" />
        </span>
        <input 
          type="text" 
          className="input-search w-full" 
          placeholder="Search for products..."
        />
      </div>
    </div>
    
    <div className="flex items-center space-x-4">
      <button className="header-nav-item md:hidden">
        <SearchIcon className="w-6 h-6" />
      </button>
      <button className="header-nav-item">
        <UserIcon className="w-6 h-6" />
      </button>
      <button className="header-nav-item">
        <ShoppingBagIcon className="w-6 h-6" />
      </button>
    </div>
  </div>
</header>
``` 