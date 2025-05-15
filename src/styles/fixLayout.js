// This script will fix the Layout.jsx file by removing the inline style and activeRouteConfig reference
// To run: node fixLayout.js

const fs = require('fs');
const path = require('path');

// Read the file content
const layoutPath = path.join(__dirname, '../components/layout/Layout.jsx');
const content = fs.readFileSync(layoutPath, 'utf8');

// Replace the style tag and activeRouteConfig reference
const fixedContent = content.replace(
  /<style>[\s\S]*?<\/style>\s*\n\s*{activeRouteConfig\?\.(header|content) && \(\s*<div[^>]*>\s*{activeRouteConfig\.(header|content)}\s*<\/div>\s*\)}/g,
  `{/* CSS styles have been moved to external files:
     - base.css: Global styles and variables
     - layout.css: Layout specific styles
     - navbar.css: Navigation styles
     - responsive.css: Media queries and responsive adjustments
  */}`
);

// Write the fixed content back to the file
fs.writeFileSync(layoutPath, fixedContent, 'utf8');

console.log('Layout.jsx has been fixed successfully.'); 