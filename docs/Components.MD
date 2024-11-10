# Code Editor Components Documentation

This document provides an overview of the **Components**, **ID**, **CSS**, and **JavaScript Code Editor** functionalities in the Evolution Application. These features allow users to visually design and edit websites, customizing their HTML, CSS, and JavaScript to achieve an immersive web development experience.

## Table of Contents
- [Code Editor Components Documentation](#code-editor-components-documentation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Code Editor Components](#code-editor-components)
    - [Available Components:](#available-components)
    - [Component Features:](#component-features)
  - [ID and CSS Customization](#id-and-css-customization)
    - [ID Customization:](#id-customization)
      - [Example:](#example)
    - [CSS Class Assignment:](#css-class-assignment)
      - [Example:](#example-1)
    - [CSS Editor Features:](#css-editor-features)
  - [JavaScript Code Editor](#javascript-code-editor)
    - [JavaScript Editor Features:](#javascript-editor-features)
    - [Example Usage:](#example-usage)
      - [Adding Event Listener to a Button:](#adding-event-listener-to-a-button)
      - [Form Validation Example:](#form-validation-example)
    - [JavaScript Libraries and External Scripts:](#javascript-libraries-and-external-scripts)
      - [Example External Script:](#example-external-script)
  - [Editor Features](#editor-features)
    - [Live Preview](#live-preview)
    - [Code Synchronization](#code-synchronization)
    - [Undo/Redo Functionality](#undoredo-functionality)
  - [Usage](#usage)
  - [Example Workflow](#example-workflow)

## Overview

The **Code Editor** provides an intuitive interface for editing the underlying HTML, CSS, and JavaScript code for a website. Users can interact with pre-built **components**, assign **IDs** and **CSS classes**, and modify the **JavaScript** to add custom functionality. This environment is designed to offer a smooth development experience with live preview capabilities and real-time updates.

## Code Editor Components

Components are modular building blocks used to create the layout and structure of a webpage. They can be drag-and-dropped into the design area, and their attributes can be customized through the editor. Below is a list of key component features:

### Available Components:
1. **Header**: Represents the top section of a webpage, typically containing navigation links or branding elements.
2. **Footer**: Contains the bottom section, usually with copyright information or additional navigation links.
3. **Sidebar**: A vertical navigation or information panel that can be placed to the left or right of the main content.
4. **Image**: Allows users to insert images that can be customized in size and positioning.
5. **Text Block**: A container for text content, allowing users to add headings, paragraphs, and other text-based content.
6. **Form**: A component that includes input fields, dropdowns, checkboxes, and buttons for user interaction.
7. **Button**: A clickable element used for submitting forms or triggering actions.
8. **Video**: Allows users to embed videos from external sources like YouTube or Vimeo.
9. **List**: A component for creating ordered or unordered lists, useful for displaying menu items, links, or steps.

### Component Features:
- **Drag-and-Drop Interface**: Users can easily drag components from the sidebar and drop them onto the workspace.
- **Attributes Panel**: Each component has an attributes panel where users can edit properties such as text, image sources, links, and more.
- **Predefined Templates**: Each component comes with predefined templates for quick layout generation.

## ID and CSS Customization

The **ID** and **CSS** functionality in the Code Editor allows users to style and uniquely identify components, giving them control over the page's design.

### ID Customization:
Each component in the workspace can be assigned a unique **ID** for styling or JavaScript manipulation. IDs should follow standard HTML conventions:

- **Purpose**: The **ID** allows components to be easily targeted by CSS or JavaScript.
- **Uniqueness**: Each ID must be unique on the page.
- **Usage**: The assigned ID can be used to apply specific styles or actions to the component.

#### Example:
```html
<div id="headerSection">
    <!-- Header content -->
</div>
# Code Editor Components Documentation

## CSS Customization

Users can apply custom **CSS styles** directly within the **Code Editor** to style components or the entire webpage. Each component can have **inline styles** or **external stylesheets** applied. The editor provides a live preview of changes as users modify the CSS.

### Example CSS:
```css
#headerSection {
    background-color: #4CAF50;
    color: white;
    padding: 20px;
    text-align: center;
}

.buttonStyle {
    background-color: blue;
    border-radius: 5px;
    color: white;
    padding: 10px 20px;
}
```

### CSS Class Assignment:
Users can assign **CSS classes** to components to apply common styles to multiple elements. This is useful for global styling or reusable design patterns.

#### Example:
```html
<button class="buttonStyle">Click Me</button>
```

### CSS Editor Features:
- **Inline Editing**: Users can modify CSS properties for individual components directly in the attributes panel.
- **Global Styles**: Users can create global styles for the entire page or component groups in the global CSS editor section.
- **Responsive Design**: CSS can be modified for different screen sizes, enabling users to create responsive layouts.

---

## JavaScript Code Editor

The **JavaScript Code Editor** enables users to write and edit JavaScript that controls interactivity on the webpage. This can include form validation, event handling, dynamic content changes, and custom animations.

### JavaScript Editor Features:
- **Live Preview**: Changes to JavaScript are reflected in real-time on the webpage.
- **Code Highlighting**: The JavaScript editor supports syntax highlighting for better code readability.
- **Error Notifications**: The editor highlights errors in the code and provides helpful messages for debugging.
- **Event Binding**: Users can bind JavaScript functions to HTML elements like buttons, forms, or images.

### Example Usage:

#### Adding Event Listener to a Button:
```javascript
document.getElementById("submitBtn").addEventListener("click", function() {
    alert("Button clicked!");
});
```

#### Form Validation Example:
```javascript
function validateForm() {
    var name = document.getElementById("name").value;
    if (name === "") {
        alert("Name must be filled out");
        return false;
    }
    return true;
}
```

### JavaScript Libraries and External Scripts:
Users can include external JavaScript libraries, such as jQuery, by adding them through the "External Scripts" section of the editor.

#### Example External Script:
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

---

## Editor Features

### Live Preview
- **Instant Feedback**: As users modify HTML, CSS, or JavaScript code, the changes are instantly reflected in the live preview section.
- **Mobile Preview**: Users can preview how their website will look on different devices by selecting from multiple screen sizes (e.g., desktop, tablet, mobile).

### Code Synchronization
- The editor automatically synchronizes all changes made in the HTML, CSS, and JavaScript files with the live preview.
- Users can toggle between different views of the code and the live preview.

### Undo/Redo Functionality
- Users can easily undo or redo actions performed in the editor, ensuring they can quickly correct mistakes.

---

## Usage

To use the **Code Editor**, follow these steps:

1. **Drag and Drop Components**: Choose from the available components and drag them into the workspace.
2. **Customize Component IDs**: Assign unique IDs to components using the attributes panel.
3. **Apply Custom CSS**: Modify the CSS for individual components or apply global styles.
4. **Edit JavaScript**: Write JavaScript code for interactivity and functionality in the JavaScript editor.
5. **Preview Changes**: Use the live preview section to see your changes in real time.

---

## Example Workflow

1. **Create a Header**: Drag the **Header** component into the workspace and customize it with a unique ID, e.g., `headerSection`.
2. **Style the Header**: In the CSS editor, add styles for `#headerSection` to change the background color and text alignment.
3. **Add a Button**: Drag a **Button** component to the page and assign it the class `buttonStyle`.
4. **Write JavaScript**: Add an event listener to the button in the JavaScript editor that triggers an alert when clicked.
5. **Preview the Page**: View the changes in the live preview window. Make adjustments as necessary.

---
