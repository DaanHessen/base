# CSS Organization

This project uses a modular CSS approach with files organized by purpose.

## File Structure

- **base.css**: Contains global styles, CSS variables, and reset styles
- **layout.css**: Contains layout-specific styles (grid, flexbox, spacing)
- **navbar.css**: Contains styles specific to the navigation component
- **responsive.css**: Contains media queries and responsive adaptations
- **tailwind.css**: Contains Tailwind imports and custom Tailwind utilities

## Import Order

The files are imported in the main `index.css` file in the following order:

1. tailwind.css
2. base.css
3. layout.css
4. navbar.css
5. responsive.css

This order ensures proper cascade and specificity.

## CSS Variables

The project uses CSS variables for colors, spacing, and other design tokens:

```css
:root {
  --caribbean-current: #005f6a;
  --magnolia: #f8f1ff;
  --thistle: #decdf5;
  --dim-gray: #656176;
  --onyx: #3e3e3e;
  --gold: #d4af37;
  
  --vh: 1vh;
}
```

## Mobile-First Approach

The CSS is written with a mobile-first approach. Base styles are for mobile devices, with media queries for larger screens.

## Special Considerations

- **Layout**: The layout system uses flexbox for overall page structure and grid for content areas
- **Navbar**: The navbar transitions between transparent and solid background on scroll
- **Mobile Issues**: Special fixes are included for iOS Safari and other mobile browsers
- **Fixed Backgrounds**: Custom handling for fixed backgrounds on mobile devices

## Usage Guidelines

1. **Component-specific styles** should go in their respective component's CSS file
2. **Global styles** should go in base.css
3. **Layout styles** should go in layout.css
4. **Responsive adaptations** should go in responsive.css
5. **Custom Tailwind utilities** should go in tailwind.css

When adding new styles, follow existing patterns and conventions. 