# Frontend Mentor - FAQ accordion solution

This is my solution to the [FAQ accordion challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/faq-accordion-wyfFdeBwBz).  
The goal was to build an accessible, responsive accordion with smooth show/hide interactions using HTML, CSS, and JavaScript.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [How the core challenges were solved](#how-the-core-challenges-were-solved)
  - [Accessibility notes](#accessibility-notes)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Hide/show an answer when its question is activated
- Use keyboard navigation and keyboard activation for accordion controls
- View an optimized layout on both mobile and desktop
- See clear hover and focus states for interactive controls

### Screenshot

![FAQ accordion project preview](./screenshot/faq-accordion%202026-03-02.png)

### Links

- Solution URL: [GitHub Repo](https://github.com/Dadir-Dev/faq-accordion-main)
- Live Site URL: [Demo](https://faqaccordion01.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox layout
- Mobile-first responsive styling with media queries
- Vanilla JavaScript (DOM events + state classes)

### How the core challenges were solved

1. **Show/hide behavior for each FAQ item**  
   Each question uses a `<button>` and toggles an `.active` class on its parent `.question`. The script first closes all items, then opens only the selected one when needed. This creates classic accordion behavior (one open item at a time).

2. **Plus/minus icon switching**  
   The icon swap is handled in CSS using the `.active` class:
   - Default: plus icon visible, minus icon hidden
   - Active: plus icon hidden, minus icon visible

3. **Answer expand/collapse animation with dynamic `height`**  
   Instead of fixed `max-height` values, each answer is animated with JavaScript using measured content height (`scrollHeight`):
   - Closed state is set to `height: 0px`
   - Open state animates to `height: ${answer.scrollHeight}px`
   - CSS handles transition timing for `height`, `opacity`, and `transform`

   This refactor removed fixed height limits and made the animation more consistent across different answer lengths.

4. **Responsive background + spacing adjustments**  
   The project switches background artwork and scales typography/spacing for smaller screens through a media query at `max-width: 540px`.

### Accessibility notes

The implementation includes key accessibility improvements directly in the markup and behavior:

- Questions are real `<button type="button">` elements (keyboard and screen-reader friendly by default)
- `aria-expanded` is updated dynamically in JavaScript to reflect open/closed state
- `aria-controls` connects each button to its associated answer panel
- Answer containers use `role="region"` and `aria-labelledby` for better assistive technology context
- Decorative icons have `aria-hidden="true"` so they are ignored by screen readers
- Visible keyboard focus style is provided via `:focus-visible`
- Keyboard activation is explicitly supported for both `Enter` and `Space`

### What I learned

- Building an accordion is cleaner when state is represented with one CSS class (`.active`)
- Combining CSS transitions with JavaScript-measured heights makes accordion animations smoother and more flexible than fixed `max-height`
- Accessibility attributes (`aria-expanded`, `aria-controls`, `aria-labelledby`) are essential for interactive UI components, not optional extras
- Designing with responsive constraints early avoids layout issues later

### Continued development

- Add reduced-motion support for users who prefer less animation
- Extend keyboard interactions (for example, optional arrow-key navigation between questions)
- Add lightweight tests for interaction and accessibility behavior

### Useful resources

- [MDN - ARIA: `aria-expanded`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
- [MDN - Button element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
- [CSS-Tricks - A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Author

- Frontend Mentor - [@Dadir-Dev](https://www.frontendmentor.io/profile/yourusername)
- Coded by Dadir Dev

## Acknowledgments

Thanks to Frontend Mentor for providing structured real-world practice challenges and design references.  
I also used some AI assistance during refactoring, especially for improving the answer animation and setting the first question to be open in the initial state.
