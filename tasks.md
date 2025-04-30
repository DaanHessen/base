# React to WordPress Conversion Plan - File-by-File Analysis

## Approach
We'll use ReactPress plugin to embed our existing React components in WordPress without rebuilding them from scratch. This allows us to maintain the exact same appearance and functionality while making the site maintainable by non-developers through WordPress.

## Component Files Analysis

### Main App Structure
**src/App.js**
- Migrate to ReactPress app structure 
- Keep all routes (/, /menu, /about)
- No changes needed to the component logic
- Ensure routing functions within WordPress URL structure

### Components: Layout
**src/components/layout/Layout.jsx**
- Keep intact as the main wrapper 
- Connect WordPress menus API to the navigation if dynamic menus are needed
- Add WordPress hook insertion points if needed

**src/components/layout/Navbar.jsx**
- Convert to ReactPress component 
- Update links to use WordPress URL structure
- Modify language switcher to work with WordPress language plugins

**src/components/layout/Footer.jsx**
- Convert to ReactPress component
- Move hardcoded footer.json data to WordPress customizer or ACF fields
- Maintain all styling and functionality 

### Components: Sections
**src/components/sections/Home.jsx**
- Convert to ReactPress component
- Update data source from home.json to WordPress REST API endpoints
- Maintain all animations and transitions
- Preserve multilingual functionality

**src/components/sections/Menu.jsx**
- Convert to ReactPress component
- Create custom post type for menu items in WordPress
- Modify data fetching to use WordPress REST API instead of menu.json
- Preserve category structure and item display

**src/components/sections/AboutUs.jsx**
- Convert to ReactPress component
- Move about-us.json content to WordPress pages or ACF fields
- Maintain map integration with proper API key handling
- Preserve language switching functionality
- Keep all animations and transitions

### Components: UI Elements
**src/components/Logo.jsx**
- Convert to ReactPress component
- No changes needed to the component functionality
- Ensure SVG rendering works properly in WordPress

**src/components/CookieConsent.jsx**
- Convert to ReactPress component
- Ensure cookie functionality works with WordPress environment
- Maintain multilingual support

**src/components/menu/MenuCategory.jsx**
- Convert to ReactPress component
- Update to fetch data from WordPress custom post types
- Maintain all styling and display logic

### Utilities
**src/utils/language.js**
- Adapt to work with WordPress language plugins (Polylang or WPML)
- Maintain cookie-based language switching
- Ensure event dispatching works in WordPress context

## Data Migration

### JSON to WordPress
**src/data/about-us.json**
- Create WordPress page for About Us
- Use ACF for structured content
- Set up multilingual fields with Polylang
- Create location custom fields for address and information

**src/data/menu.json**
- Create custom post type 'menu_item'
- Create taxonomies for menu categories
- Create custom fields for prices, descriptions, etc.
- Create import script to migrate all data with proper relationships

**src/data/home.json**
- Migrate to WordPress home page
- Use ACF for hero section content
- Set up multilingual fields for all text content
- Preserve button linking structure

**src/data/footer.json**
- Move to either WordPress widgets, ACF options page, or theme customizer
- Maintain structure for social links, address, hours
- Set up multilingual fields for all content

## Styling

**src/index.css**
- Ensure Tailwind CSS is properly loaded in WordPress
- Add necessary WordPress-specific styles
- Resolve any potential conflicts with WordPress default styles
- Maintain all custom styling from the React application

## Implementation Tasks

### WordPress Setup
1. Install WordPress on hosting environment
2. Install and activate ReactPress plugin
3. Set up required plugins:
   - Advanced Custom Fields Pro
   - Polylang for multilingual support
   - Custom Post Type UI for menu items

### Content Structure Creation
1. Create custom post types for Menu Items
2. Set up taxonomies for Menu Categories
3. Create ACF field groups for:
   - About Us page content
   - Home page hero section
   - Footer information
   - Location information

### ReactPress Configuration
1. Set up ReactPress app structure
2. Configure build process for React components
3. Set up proper URL routing with WordPress permalinks
4. Configure data fetching from WordPress REST API

### Component Migration
1. Move all React components to ReactPress structure
2. Update data fetching methods to use WordPress REST API
3. Adapt components to work with WordPress hooks if needed
4. Configure multilingual support for all components

### Data Import
1. Create import scripts for:
   - Menu items and categories
   - About Us content
   - Home page content
   - Footer information
2. Run imports to populate WordPress database
3. Verify all content is properly imported with multilingual support

### Testing
1. Test all components in WordPress environment
2. Verify multilingual functionality
3. Test responsive layouts and animations
4. Ensure all links and routing work properly
5. Test performance and loading times

## File Conversion Details

### ReactPress App Structure
```
wp-content/plugins/reactpress/apps/base-restaurant/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── menu/
│   ├── utils/
│   ├── App.js
│   └── index.js
└── public/
```

### WordPress Database Structure
```
- wp_posts
  - post_type: page (Home, About, Menu)
  - post_type: menu_item
- wp_postmeta (ACF fields)
  - about_sections
  - location_info
  - menu_price
  - menu_description
- wp_term_taxonomy
  - taxonomy: menu_category
```

## Tasks Sequencing

1. **Initial Setup**
   - Install WordPress and required plugins
   - Create ReactPress app structure

2. **WordPress Content Structure**
   - Create custom post types and taxonomies
   - Set up ACF field groups
   - Configure Polylang for multilingual support

3. **Data Migration**
   - Import all JSON data to WordPress
   - Verify multilingual content

4. **Component Migration**
   - Move React components to ReactPress structure
   - Update data fetching to use WordPress API
   - Configure routing with WordPress

5. **Integration and Testing**
   - Test all components
   - Verify exact appearance matches original
   - Test performance and responsiveness

## Estimated Timeline
- Setup and Content Structure: 3 days
- Data Migration: 2 days
- Component Migration: 4 days
- Integration and Testing: 3 days
- Refinement and Documentation: 2 days

**Total: 14 days** 

# BASE Restaurant Website - Updates and Fixes

## Completed Tasks

### Styling & Design
- ✅ Fixed Monsees SVG icon hover effect in the footer (removed inline style conflict).
- ✅ Increased price text font size slightly (0.75rem).
- ✅ Decreased overall logo size (max-h adjusted).
- ✅ Adjusted logo color to be more pink (RGB 255, 192, 203).
- ✅ Added animated skeleton loader for the map component.

### Menu Page
- ✅ Removed `vegan` and `allergens` properties from all drink items in `menu.json`.
- ✅ Updated `MenuItem.jsx` to conditionally render vegan/allergen info.

### Animations
- ✅ Further refined page transition animations (timing, synchronization) to reduce glitches.

### Navbar & Navigation
- ✅ Implemented dropdown submenu for "Menu" link in Navbar (options: Food, Drinks).
- ✅ Created mobile navigation links directly to Food/Drinks sections on the Menu page.
- ✅ Fixed Navbar logo centering using absolute positioning.
- ✅ Prevented Navbar/Footer from animating during page transitions by moving transition logic inside Layout.
- ✅ Modified Menu dropdown to open on hover (as well as click).

### Menu Page (Continued)
- ✅ Reverted Drinks menu display: removed subcategory tabs, showing all drinks in one list.
- ✅ Ensured Menu page scrolls to the correct section (#food or #drinks) based on Navbar links.
- ✅ Improved styling for "Food" and "Drinks" section titles.
- ✅ Added more top spacing above the menu content.
- ✅ Added "Soda" (Fris) subcategory to Drinks.
- ✅ Reviewed and adjusted "Non-alcoholic" drink category content/naming.

### Styling & Design (Continued)
- ✅ Removed pixel font from menu item prices, using default font now.
- ✅ Added a new light pink color (#ffdee9) to the theme palette.
- ✅ Updated Logo component to use the new light pink color and improved responsiveness.

### Footer
- ✅ Updated Newsletter submit button styling to match homepage reservation button.
- ✅ Implemented `mailto:` functionality for the Newsletter form.

### SEO
- ✅ Reviewed SEO setup: Technical foundation is okay, but content/keyword specificity and structured data need improvement for optimal ranking.

### Translations
- ✅ Added missing translation keys for footer contact copy messages.
- ✅ Updated footer copyright year handling.
- ✅ Changed newsletter button text.

## Remaining Tasks / Recommendations

### SEO Improvements
- [ ] Refine keywords in translation files (titles, descriptions) to be more specific (e.g., "Restaurant BASE Dordrecht", specific cuisine types).
- [ ] Implement Schema.org structured data (Restaurant, Menu, OpeningHoursSpecification) for better search engine understanding.
- [ ] Enhance Open Graph (OG) tags (og:image, og:type, og:url).
- [ ] Focus on Local SEO (Google Business Profile) and off-page factors.

### General Improvements (From Previous Plan)
- [ ] Add loading indicators for menu transitions/scrolling.
- [ ] Add unit tests for key components.
- [ ] Add reservation form *actual* submission logic (currently placeholder/mailto).
- [ ] Implement restaurant photo gallery.
- [ ] Add more menu items and images to JSON.
- [ ] Integrate map view for location.
- [ ] Create a responsive email template for newsletter subscriptions.

## Documentation

### Menu Structure
The menu is now organized with a tabbed interface:
- Food tab contains all food categories:
  - Starters
  - Main Courses
  - Intermediate Courses
  - Desserts
  - Sides
- Drinks tab contains subcategories:
  - Wines
  - Beers
  - Cocktails
  - Non-alcoholic

### JSON Data Structure
- Food categories use a simple structure with `items` array
- Drinks category uses a nested structure with `subcategories` which each have their own `items` array
- All items support multilingual content with `nl` and `en` language keys

### Responsive Design
- Desktop: Logo centered with menu items on left, language dropdown on right
- Mobile: Logo centered with hamburger menu
- Tablet/mobile: All content stacks for better readability 

# Tasks

## Mobile Issues
- [ ] Fix homescreen image moving when scrolling (glitchy effect)
- [ ] Fix mobile navigation not accounting for scrolled position

## Both Mobile and Desktop
- [ ] Improve top bar animation smoothness
- [ ] Make text background consistent between mobile and desktop versions

## Menu Layout
- [ ] Make drinks menu handle last category the same way as food menu (centered in the bottom)

## SEO Improvements
- [ ] Add additional SEO optimizations

## Safety and Best Practices
- [ ] Review and implement any missing safety/best practice measures

## Progress Tracking
- [ ] Commit regularly with descriptive messages 