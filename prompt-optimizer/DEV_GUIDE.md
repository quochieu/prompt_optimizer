# Development Guide

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development mode (watch for changes)
npm run dev

# Build for production
npm run build

# Start local server
npm run serve
# Then open http://localhost:8000
```

## 🎨 Customizing the Design

### Adding New Colors
Edit `tailwind.config.js`:

```javascript
colors: {
  // Add your brand colors
  brand: {
    50: '#eff6ff',
    500: '#3b82f6',
    900: '#1e3a8a',
  }
}
```

### Creating Custom Components
Add to `src/input.css`:

```css
@layer components {
  .my-button {
    @apply px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors;
  }
}
```

### Responsive Design
Use Tailwind's responsive prefixes:

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Responsive grid -->
</div>
```

## 🔧 Project Structure

```
src/input.css           # Source CSS with custom components
dist/output.css         # Built CSS (auto-generated)
js/toggle-handler.js    # Toggle functionality
tailwind.config.js      # Tailwind configuration
package.json           # Dependencies and scripts
```

## 📱 Testing

### Browser Testing
- Chrome/Edge: Full feature support
- Firefox: Full feature support  
- Safari: Full feature support
- Mobile browsers: Responsive design

### Accessibility Testing
- Screen readers: NVDA, JAWS, VoiceOver
- Keyboard navigation: Tab through all controls
- Color contrast: All text meets WCAG AA standards

## 🚀 Deployment

### Static Hosting
Deploy the entire directory (except `node_modules/`) to:
- GitHub Pages
- Netlify
- Vercel
- Any static host

### Build Process
1. `npm run build` - Creates optimized CSS
2. Upload files to hosting provider
3. Ensure relative paths work correctly

## 🐛 Troubleshooting

### CSS Not Updating
```bash
# Clear cache and rebuild
rm -rf dist/output.css
npm run build
```

### JavaScript Errors
- Check browser console for errors
- Ensure all script files are loaded
- Verify file paths are correct

### Layout Issues
- Use browser dev tools to inspect Tailwind classes
- Check responsive breakpoints
- Verify grid/flexbox behavior