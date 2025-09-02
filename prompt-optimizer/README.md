# Prompt Optimizer - Tailwind CSS Migration

A modern AI prompt engineering tool with Tailwind CSS styling and enhanced UX.

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Watch for changes and rebuild CSS
npm run dev

# Build for production
npm run build

# Serve locally (Python required)
npm run serve
```

### Usage
1. Open `index.html` in a modern browser
2. Configure your prompt settings in the intuitive interface
3. Enable Frontend Builder for specialized frontend development prompts
4. Generate, copy, or download your optimized prompts

## 🎨 Design System

### Modern Features
- **Tailwind CSS 3.4+** with custom design tokens
- **Semantic HTML5** structure with proper accessibility
- **Responsive design** with mobile-first approach
- **Custom components** for consistent UI patterns
- **Smooth animations** and transitions
- **Dark mode ready** (can be enabled in config)

### Key Components
- **Toggle Switches**: Modern, accessible toggle controls
- **Form Elements**: Consistent input styling with focus states
- **Card Layouts**: Clean, elevated sections with hover effects
- **Gradient Text**: Brand-consistent gradient headings
- **Status Indicators**: User feedback with different states

### Color Palette
- **Primary**: Custom blue-purple gradient (`primary-500` to `secondary-500`)
- **Neutral**: Extended gray scale for better contrast
- **Surface**: Light/dark theme support
- **Semantic**: Success, warning, error, info states

## 📁 Project Structure

```
prompt-optimizer/
├── src/
│   └── input.css          # Tailwind source with custom components
├── dist/
│   └── output.css         # Compiled Tailwind CSS
├── js/
│   └── toggle-handler.js  # Modern toggle functionality
├── index.html             # Main application (semantic HTML)
├── app.js                 # Core application logic
├── frontend-builder.js    # Frontend builder functionality
├── package.json           # Dependencies and scripts
└── tailwind.config.js     # Tailwind configuration
```

## 🛠️ Customization

### Adding New Colors
Edit `tailwind.config.js` to extend the color palette:

```javascript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
      brand: {
        50: '#...',
        // ... other shades
      }
    }
  }
}
```

### Custom Components
Add new components in `src/input.css`:

```css
@layer components {
  .my-component {
    @apply bg-white rounded-xl shadow-soft p-6;
  }
}
```

### Responsive Breakpoints
Tailwind's default breakpoints are enhanced:
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🔧 Advanced Features

### Toggle System
Modern toggle switches with:
- Smooth animations
- Accessibility support (ARIA labels, keyboard navigation)
- Visual feedback states
- Programmatic control via JavaScript

### Form Validation
- Real-time status indicators
- User-friendly error messages
- Consistent styling across all form elements

### Performance
- Minified CSS build
- Optimized animations
- Efficient DOM manipulation
- Lazy loading for heavy sections

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first** approach
- **Touch-friendly** interface elements
- **Adaptive layouts** for different screen sizes
- **Optimized typography** scaling

## ♿ Accessibility

Built with accessibility in mind:
- **Semantic HTML** structure
- **ARIA labels** and roles
- **Keyboard navigation** support
- **High contrast** color schemes
- **Screen reader** compatibility

## 🚀 Deployment

### Static Hosting
The application is a static site that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting provider

### Build Process
1. `npm run build` - Creates optimized CSS
2. Deploy the entire directory (except `node_modules/`)
3. Ensure all paths are relative

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Note**: This migration modernizes the original prompt optimizer with Tailwind CSS while maintaining all original functionality and improving the user experience.