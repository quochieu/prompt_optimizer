// Frontend Builder enhancements for the Prompt Optimizer
// Based on GPT-5 frontend development best practices

// Override the main buildPrompt function to include frontend configuration
let originalBuildPrompt = null;

document.addEventListener('DOMContentLoaded', () => {
  // Frontend Builder toggle (dim/enable board)
  const feToggle = document.getElementById('enable-frontend-builder');
  const feBoard = document.getElementById('frontend-board');
  
  if (feToggle && feBoard) {
    const allControls = feBoard.querySelectorAll('input, select, textarea, button');
    
    const setEnabled = (enabled) => {
      if (enabled) {
        feBoard.classList.remove('dimmed');
        feBoard.classList.add('animate-in');
      } else {
        feBoard.classList.add('dimmed');
        feBoard.classList.remove('animate-in');
      }
      
      allControls.forEach(el => { 
        el.disabled = !enabled; 
      });
    };
    
    feToggle.addEventListener('change', () => {
      const isEnabled = feToggle.checked;
      setEnabled(isEnabled);
      
      if (isEnabled) {
        // Smooth scroll to frontend board
        setTimeout(() => {
          feBoard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
        // Show a brief intro message
        if (window.showStatus) {
          window.showStatus('Frontend Builder enabled! Configure your options below.', 'success');
        }
      }
    });
    
    // Initialize with current state
    setEnabled(feToggle.checked);
  }

  // Frontend template handlers
  const fePreviewTemplate = document.getElementById('fe-preview-template');
  if (fePreviewTemplate) {
    fePreviewTemplate.addEventListener('click', () => {
      const templateSelect = document.getElementById('fe-template');
      if (templateSelect && templateSelect.value) {
        previewFrontendTemplate(templateSelect.value);
      }
    });
  }

  // Auto-apply template when selection changes
  const feTemplateSelect = document.getElementById('fe-template');
  if (feTemplateSelect) {
    feTemplateSelect.addEventListener('change', () => {
      if (feTemplateSelect.value) {
        applyFrontendTemplate(feTemplateSelect.value);
      }
    });
  }
});

// Function to get frontend configuration for integration into main prompt
function getFrontendConfiguration() {
  const feToggle = document.getElementById('enable-frontend-builder');
  if (!feToggle || !feToggle.checked) {
    return null; // Frontend builder is disabled
  }

  const feBrief = document.getElementById('fe-brief')?.value?.trim();
  const feStyle = document.getElementById('fe-style')?.value?.trim();
  const fePages = document.getElementById('fe-pages')?.value?.trim();
  const feInteractions = document.getElementById('fe-interactions')?.value?.trim();
  const feImage = document.getElementById('fe-image')?.value?.trim();
  // Frontend builder is now model-agnostic, no need for model selection
  const feReasoning = document.getElementById('fe-reasoning-effort')?.value || 'medium';
  const feRubric = document.getElementById('fe-hidden-rubric')?.checked;
  const feImageInput = document.getElementById('fe-enable-image-input')?.checked;

  // Get selected tech stack
  const stack = getFrontendStack();

  // Only return config if there's actual content
  if (!feBrief && !feStyle && !fePages && !feInteractions) {
    return null;
  }

  return {
    brief: feBrief,
    style: feStyle,
    pages: fePages,
    interactions: feInteractions,
    image: feImage,
    reasoning: feReasoning,
    rubric: feRubric,
    imageInput: feImageInput,
    stack: stack
  };
}

// Function to get selected frontend tech stack
function getFrontendStack() {
  const stackInputs = document.querySelectorAll('#frontend-board input.stack[type="checkbox"]:checked');
  const stack = {
    framework: [],
    styling: [],
    icons: [],
    motion: [],
    fonts: []
  };

  stackInputs.forEach(input => {
    const group = input.getAttribute('data-group');
    if (stack[group]) {
      stack[group].push(input.value);
    }
  });

  return stack;
}

// Function to build frontend section for the main prompt
function buildFrontendSection(config) {
  if (!config) return '';

  const sections = [];

  sections.push('=== FRONTEND DEVELOPMENT REQUIREMENTS ===');
  
  if (config.brief) {
    sections.push(`Frontend Objective\n${config.brief}`);
  }

  if (config.style) {
    sections.push(`Visual Theme & Style\n${config.style}`);
  }

  if (config.pages) {
    sections.push(`Page Structure & Components\n${config.pages}`);
  }

  if (config.interactions) {
    sections.push(`Interactive Features\n${config.interactions}`);
  }

  if (config.image) {
    sections.push(`Reference Design\nUse this image as style reference: ${config.image}`);
    if (config.imageInput) {
      sections.push('Note: Include the reference image in your API call for better design matching.');
    }
  }

  // Add tech stack requirements
  const stackEntries = Object.entries(config.stack).filter(([_, arr]) => arr.length > 0);
  if (stackEntries.length > 0) {
    const stackLines = stackEntries.map(([category, items]) => 
      `${category.charAt(0).toUpperCase() + category.slice(1)}: ${items.join(', ')}`
    );
    sections.push(`Technology Stack Requirements\n${stackLines.join('\n')}`);
  }

  // Add frontend methodology
  const methodology = [
    'Follow component-based architecture principles',
    'Ensure responsive design (mobile-first approach)',
    'Implement proper semantic HTML and accessibility (ARIA)',
    'Optimize for performance and Core Web Vitals',
    'Use modern ES6+ JavaScript and TypeScript when applicable',
    'Apply consistent design tokens and spacing',
    'Include hover states and smooth transitions'
  ];

  if (config.rubric) {
    methodology.push('Apply internal quality rubric for production-ready code');
  }

  sections.push(`Frontend Development Method\n${methodology.map(m => `• ${m}`).join('\n')}`);

  const requirements = [
    'Produce complete, functional frontend code',
    'Ensure cross-browser compatibility',
    'Follow modern web standards and best practices',
    'Include proper error handling and loading states',
    'Provide clear component structure and documentation'
  ];

  sections.push(`Frontend Requirements\n${requirements.map(r => `• ${r}`).join('\n')}`);

  return sections.join('\n\n');
}

// Hook into the main application's prompt building
// This function will be called by the main app when building prompts
window.getFrontendConfiguration = getFrontendConfiguration;
window.buildFrontendSection = buildFrontendSection;

// Override the main improve button to include frontend when enabled
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const improveButton = document.getElementById('improve');
    if (improveButton) {
      improveButton.addEventListener('click', (e) => {
        // Add frontend section to the prompt if enabled
        const frontendConfig = getFrontendConfiguration();
        if (frontendConfig) {
          // Get current optimized prompt
          const optimizedTextarea = document.getElementById('optimized');
          if (optimizedTextarea) {
            const currentPrompt = optimizedTextarea.value || '';
            const frontendSection = buildFrontendSection(frontendConfig);
            
            if (frontendSection && !currentPrompt.includes('FRONTEND DEVELOPMENT REQUIREMENTS')) {
              // Add frontend section to the prompt
              setTimeout(() => {
                const updatedPrompt = currentPrompt + '\n\n' + frontendSection;
                optimizedTextarea.value = updatedPrompt;
                
                const status = document.getElementById('status');
                if (status) {
                  status.textContent = 'Prompt updated with frontend configuration.';
                  setTimeout(() => status.textContent = '', 2000);
                }
              }, 100);
            }
          }
        }
      });
    }
  }, 1000);
});

// Frontend template functions
function applyFrontendTemplate(templateKey) {
  const frontendTemplates = {
    landing_noir: {
      brief: "Create a landing page for a retro-games store with a retro-arcade noir aesthetic",
      style: "Dark theme with neon accents, arcade textures, noir atmosphere. High contrast, glowing elements, retro typography.",
      pages: "Single landing page with: Hero section, Featured games grid, About section, Newsletter signup, Footer",
      interactions: "Hover effects on game cards, animated neon elements, smooth scrolling navigation"
    },
    landing_pastel: {
      brief: "Create a landing page for a retro-games store with light, pastel, Mario-inspired design",
      style: "Light pastel palette, soft rounded shapes, playful typography, friendly and approachable feel.",
      pages: "Single landing page with: Hero section, Featured games, Story section, Community features, Footer",
      interactions: "Bouncy animations, hover effects, gentle transitions, interactive elements"
    },
    login_match_theme: {
      brief: "Create a login page that matches an existing design system from a reference image",
      style: "Match provided reference image: colors, typography, spacing, component styles, visual hierarchy.",
      pages: "Login form page with: Email field, Password field, Remember me, Forgot password, Submit button",
      interactions: "Form validation, loading states, error handling, accessibility features"
    },
    snake_game: {
      brief: "Create an interactive snake game with futuristic cyberpunk styling",
      style: "Neon cyberpunk theme: bright colors on dark background, glowing effects, futuristic typography, grid aesthetics.",
      pages: "Single game page with: Game canvas, Score display, Controls info, Start/restart buttons",
      interactions: "Keyboard controls (arrow keys), collision detection, score tracking, game over states, restart functionality"
    },
    zero_to_one: {
      brief: "Build a complete web application from concept to production-ready implementation",
      style: "Modern, clean design with consistent design system, professional appearance, scalable component architecture.",
      pages: "Multi-page application: Home, Features, Pricing, About, Contact, Dashboard (if applicable)",
      interactions: "Full user interactions, form handling, navigation, responsive behavior, loading states"
    },
    dashboard: {
      brief: "Create a modern dashboard interface with multimodal input capabilities",
      style: "Clean, data-focused design with charts, cards, sidebar navigation, light/dark theme support.",
      pages: "Dashboard with: Overview, Analytics, Settings, User profile sections",
      interactions: "Interactive charts, filters, search, drag-and-drop, real-time updates"
    },
    ecommerce: {
      brief: "Build a complete e-commerce storefront with shopping functionality",
      style: "Modern e-commerce design: product grids, clean typography, trust-building elements, conversion-optimized.",
      pages: "Product listing, Product detail, Shopping cart, Checkout, User account pages",
      interactions: "Add to cart, quantity controls, filtering, search, wishlist, checkout flow"
    }
  };

  const template = frontendTemplates[templateKey];
  if (!template) return;

  const feBrief = document.getElementById('fe-brief');
  const feStyle = document.getElementById('fe-style');
  const fePages = document.getElementById('fe-pages');
  const feInteractions = document.getElementById('fe-interactions');

  if (feBrief) feBrief.value = template.brief;
  if (feStyle) feStyle.value = template.style;
  if (fePages) fePages.value = template.pages;
  if (feInteractions) feInteractions.value = template.interactions;

  const status = document.getElementById('status');
  if (status) {
    status.textContent = `Frontend template "${templateKey}" applied successfully.`;
    setTimeout(() => status.textContent = '', 2000);
  }
}

function previewFrontendTemplate(templateKey) {
  const templateDescriptions = {
    landing_noir: "Dark, neon-accented landing page perfect for gaming or tech products. Features high contrast design with glowing elements.",
    landing_pastel: "Light, playful design with soft colors and rounded shapes. Great for family-friendly or creative products.",
    login_match_theme: "Adaptable login form that matches existing design systems using reference images.",
    snake_game: "Interactive game with cyberpunk aesthetics including neon colors and futuristic styling.",
    zero_to_one: "Complete application template with professional design and scalable architecture.",
    dashboard: "Modern admin interface with charts, analytics, and responsive layout.",
    ecommerce: "Full shopping experience with product catalogs, cart, and checkout flow."
  };

  const description = templateDescriptions[templateKey];
  if (description) {
    alert(`Preview: ${templateKey}\n\n${description}\n\nSelect this template to apply these settings to your frontend builder.`);
  }
}