# Prompt Tools – Advanced GPT/Claude Prompt Optimizer + Frontend Builder

A comprehensive, local web application for crafting high-quality prompts and frontend development briefs using best practices from both GPT and Claude guidelines. This tool combines universal prompting techniques with model-agnostic features, advanced options, and integrated frontend configuration. Built with modern Tailwind CSS for optimal PC user experience.

## 🚀 Quick Start

1. **Clone/Download**: Get the project files to your local machine
2. **Install Dependencies**: 
   ```bash
   cd prompt-optimizer
   npm install
   ```
3. **Build CSS** (for development):
   ```bash
   npm run build
   # or for watching changes: npm run dev
   ```
4. **Run Local Server**:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000/prompt-optimizer/
   ```
5. **Start Building**: Use the unified prompt optimizer for all AI interactions

## 📁 Project Structure

```
prompt_optimizer/
├── README.md                          # This documentation
├── guideline/                         # Reference materials
│   ├── claude/                        # Claude-specific guidelines
│   │   ├── be-clear-and-direct.md
│   │   ├── chain-of-thought.md
│   │   ├── claude-4-best-practices.md
│   │   ├── define-success.md
│   │   ├── develop-tests.md
│   │   ├── increase-consistency.md
│   │   ├── multishot-prompting.md
│   │   ├── prompt-templates-and-variables.md
│   │   ├── reduce-hallucinations.md
│   │   ├── system-prompts.md
│   │   └── use-xml-tags.md
│   └── gpt/                           # GPT-specific guidelines
│       ├── gpt-5_frontend.txt
│       └── gpt-5_prompting_guide.txt
└── prompt-optimizer/                  # Main application
    ├── index.html                     # Primary interface (Tailwind-powered)
    ├── src/input.css                  # Tailwind CSS source
    ├── dist/output.css                # Generated CSS bundle
    ├── tailwind.config.js             # Tailwind configuration
    ├── package.json                   # Dependencies and build scripts
    ├── js/toggle-handler.js           # Modern toggle functionality
    ├── app.js                         # Core application logic
    └── frontend-builder.js            # Frontend configuration module
```

## ⭐ Key Features

### 🎯 **Universal Prompt Architecture**
- **Model-Agnostic Design**: Works optimally with both GPT and Claude
- **Dual Input System**: Separate System Prompt and User Instructions fields
- **Structured Output**: Generates well-formatted prompts with clear sections
- **PC-Optimized Interface**: Desktop-focused sizing and spacing for productivity

### 🧠 **Advanced Reasoning & Logic**
- **Chain of Thought**: Step-by-step reasoning instructions
- **Hidden Self-Review Rubric**: Internal quality criteria and iteration
- **Agentic Proactivity**: Persistence instructions for complex tasks
- **Effort Control**: Low/Medium/High reasoning thoroughness

### 📚 **Grounding & Factuality**
- **"I Don't Know" Permission**: Reduces hallucinations
- **Document Restriction**: Pure RAG mode for provided content only
- **Quote Extraction First**: Dramatically improves factual accuracy
- **Citation Requirements**: Automatic source attribution
- **Long Context Optimization**: Optimized document placement

### 💻 **Code Generation Excellence**
- **Code Quality Rules**: Best practices integration
- **Parallel Tool Calling**: Efficiency optimization
- **File Management**: Cleanup and organization instructions
- **Project Structure**: Directory scaffolding guidance

### 🎨 **Modern Design System**
- **Tailwind CSS 3.4+**: Utility-first styling with custom components
- **Semantic HTML5**: Proper accessibility and structure
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Custom Design Tokens**: Extended color palette and typography
- **Visual Toggle Feedback**: Enhanced user interface interactions

### 🏗️ **Integrated Frontend Builder**
- **Project Templates**: 7 pre-built templates (landing pages, games, dashboards, e-commerce)
- **Tech Stack Selection**: Curated recommendations (Next.js, TypeScript, Tailwind CSS)
- **Multimodal Support**: Image reference integration
- **Interactive Features**: Games, animations, user flows
- **PC-Optimized Forms**: Larger text areas and improved spacing for desktop productivity

## � Build Process & Development

### Modern Tailwind Workflow
```bash
# Install dependencies
npm install

# Development with hot reload
npm run dev

# Production build
npm run build

# Start local server for testing
python -m http.server 8000
```

### Custom Components Architecture
- **Toggle Switches**: Modern Tailwind-based switches with visual feedback
- **Form Elements**: PC-optimized sizing for desktop productivity
- **Cards & Panels**: Semantic HTML5 structure with accessibility
- **Button System**: Primary/secondary button variants with hover states
- **Typography Scale**: Desktop-appropriate text sizing

## 📊 Recent Improvements (v2.0)

### ✅ **Tailwind CSS Migration**
- **Complete UI Overhaul**: Migrated from custom CSS to Tailwind utilities
- **Semantic HTML5**: Restructured for accessibility and maintainability
- **Custom Components**: Created reusable @apply components for consistency
- **Build System**: npm-based workflow with development/production modes
- **Design Tokens**: Extended color palette and spacing system

### ✅ **PC User Experience Optimization**
- **Desktop Sizing**: Increased container widths to 1600px for wider screens
- **Enhanced Typography**: Upgraded text sizes (text-sm → text-base, text-2xl → text-3xl)
- **Improved Forms**: Larger textareas (min-height: 160px) and better spacing
- **Button Enhancement**: Increased padding and icon sizes for desktop interaction
- **Grid Spacing**: Expanded gaps from 6 to 8 units for better visual separation

### ✅ **UI/UX Improvements**
- **Toggle Visual Feedback**: Fixed Frontend Builder toggle to show state changes
- **Simplified Header**: Removed unnecessary About/Help/Share buttons for cleaner interface
- **File Cleanup**: Removed unused legacy CSS and JavaScript files
- **Enhanced Accessibility**: Better focus states and screen reader support

### ✅ **Component System**
- **Modern Toggle Handler**: JavaScript class-based toggle management
- **Visual State Management**: Proper checked/unchecked styling
- **Responsive Design**: Mobile-first with desktop enhancements
- **Animation System**: Smooth transitions and hover effects
### Core Settings
- **Tone Control**: Default, Conversational, Professional, Academic, Creative
- **Reasoning Effort**: Low (fast), Medium (balanced), High (thorough)
- **Structure Enforcement**: Output format compliance
- **Validation Criteria**: Quality checkpoints and acceptance criteria
- **Budget Constraints**: Resource and efficiency guidelines

### Advanced Options (22 Toggles)

#### Reasoning & Logic
- Chain of Thought / Thinking
- Hidden Self-Review Rubric  
- Agentic Proactivity

#### Grounding & Factuality
- Allow "I don't know" answers
- Restrict to provided documents
- Require citations / claim verification
- Extract supporting quotes first
- Optimize for long context

#### Code Generation
- Include general code editing rules
- Encourage parallel tool calling
- Ask to clean up temp files

#### Formatting & Structure
- Use XML tags for structure
- Prefer JSON output
- Forbid Markdown in output
- Show Assistant Prefill skeleton

### Frontend Builder Configuration
- **Project Description**: Detailed requirements and goals
- **Visual Theme**: Colors, typography, mood, aesthetic
- **Architecture**: Pages, components, and structure
- **Interactions**: Games, animations, dynamic features
- **Reference Images**: Design consistency tools
- **Tech Stack**: Framework, styling, icons, fonts selection

## 💡 Usage Patterns

### Basic Prompt Creation
1. **Define Identity**: Set system prompt with role and rules
2. **Specify Task**: Add detailed user instructions
3. **Add Context**: Include relevant background information
4. **Provide Examples**: Use multishot prompting for accuracy
5. **Configure Options**: Select appropriate advanced features
6. **Generate & Copy**: Create optimized prompt for any AI platform

### Frontend Development
1. **Enable Frontend Builder**: Toggle the frontend configuration
2. **Select Template**: Choose from 7 pre-built options or create custom
3. **Configure Project**: Set description, style, architecture
4. **Choose Tech Stack**: Select recommended or custom technologies
5. **Add References**: Include design images for consistency
6. **Generate Unified Prompt**: Get complete development instructions

### Document Grounding (RAG)
1. **Add Documents**: Paste reference materials
2. **Enable Quote Extraction**: Activate "quotes-first" technique
3. **Restrict Responses**: Limit to provided documents only
4. **Require Citations**: Ensure source attribution
5. **Generate**: Create fact-checked, grounded responses

## 🎨 Design System

### Light Theme Architecture
- **Professional Aesthetic**: Clean, modern interface design
- **Accessibility First**: High contrast, keyboard navigation
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Visual Hierarchy**: Clear information organization
- **Progressive Enhancement**: Works without JavaScript

### Color Palette
- **Primary**: Blue gradient (#5b5fe8 → #7d5fe8)
- **Backgrounds**: Soft grays (#f5f7fa, #ffffff)
- **Text**: Dark blues (#1d2733, #2f3b47)
- **Accents**: Success (#059669), Warning (#d97706), Danger (#dc2626)

## 🔧 Technical Implementation

### Modern Architecture
- **Tailwind CSS 3.4+**: Utility-first styling with custom component layer
- **Semantic HTML5**: Proper document structure with accessibility attributes
- **Modern JavaScript**: ES6+ classes and modules for maintainable code
- **Build Process**: npm-based Tailwind compilation with watch mode
- **Progressive Enhancement**: Core functionality works without advanced features

### Component System
```css
/* Custom Tailwind Components */
.toggle-switch {
  @apply relative inline-flex h-6 w-11 items-center rounded-full;
  @apply bg-neutral-300 focus:outline-none focus:ring-2;
}

.toggle-switch.checked {
  @apply bg-gradient-to-r from-primary-500 to-secondary-500;
}

.btn-primary {
  @apply inline-flex items-center justify-center px-8 py-4;
  @apply bg-gradient-to-r from-primary-500 to-secondary-500;
  @apply text-white font-semibold rounded-xl;
}
```

### File Structure
```
prompt-optimizer/
├── src/
│   └── input.css              # Tailwind source with custom components
├── dist/
│   └── output.css             # Generated CSS bundle
├── js/
│   └── toggle-handler.js      # Modern toggle management
├── tailwind.config.js         # Tailwind configuration
├── package.json               # Dependencies and scripts
├── index.html                 # Main application
├── app.js                     # Core logic
└── frontend-builder.js        # Frontend features
```

### Browser Compatibility
- **Modern Standards**: ES6+ JavaScript with class syntax
- **CSS Grid/Flexbox**: Advanced layout with Tailwind utilities
- **Web APIs**: Clipboard, localStorage, FileReader support
- **Tailwind CSS**: Modern browser support with autoprefixer

## 📊 Performance Features

### Optimization
- **Lightweight**: Fast loading with minimal dependencies
- **Efficient DOM**: Smart element caching and event handling
- **Memory Management**: Cleanup and resource optimization
- **Lazy Loading**: Components load as needed

### User Experience
- **Instant Feedback**: Real-time status updates
- **Auto-Save**: Preference persistence
- **Keyboard Shortcuts**: Efficient navigation
- **Copy/Download**: One-click export functionality

## 🎯 Best Practices Integration

### From Claude Guidelines
- **XML Structure**: Automatic tag wrapping for clarity
- **Thinking Blocks**: Chain-of-thought reasoning
- **Quote-First**: Factual accuracy improvements
- **System Prompts**: Role-based identity setting
- **Multishot Examples**: Consistency through examples

### From GPT Guidelines
- **Reasoning Effort**: Adaptive thoroughness control
- **Code Quality**: Best practices integration
- **Tool Efficiency**: Parallel processing optimization
- **Context Management**: Long-form document handling
- **Frontend Excellence**: Modern web development patterns

## 🚀 Advanced Features

### Template System
- **7 Frontend Templates**: Landing pages, games, dashboards, e-commerce
- **Custom Templates**: Save and reuse prompt configurations
- **Template Preview**: Quick understanding of each option
- **Auto-Application**: One-click template deployment

### Quality Assurance
- **Self-Review Integration**: Automatic quality criteria
- **Validation Steps**: Built-in acceptance criteria
- **Citation Enforcement**: Source attribution requirements
- **Format Compliance**: Structured output guarantees

### Developer Tools
- **Code Generation**: Programming best practices
- **Project Scaffolding**: Directory structure guidance
- **Tool Integration**: Multi-tool workflow optimization
- **File Management**: Organization and cleanup automation

## 📈 Workflow Integration

### AI Platform Compatibility
- **Universal Prompts**: Works with ChatGPT, Claude, Gemini, local models
- **Format Agnostic**: Adapts to different input requirements
- **Export Options**: Text files, clipboard copy, downloadable prompts
- **Template Sharing**: Reusable configurations

### Development Workflow
- **One-Shot Applications**: Complete project generation
- **Iterative Refinement**: Progressive prompt improvement
- **Reference Integration**: Design consistency tools
- **Quality Assurance**: Built-in testing and validation

## 🔍 Future Enhancements

### Planned Features
- **API Integration**: Optional live testing capabilities
- **Advanced Templates**: Domain-specific prompt libraries
- **Collaboration Tools**: Sharing and version control
- **Analytics Dashboard**: Usage patterns and optimization insights

### Community Integration
- **Template Marketplace**: Shared prompt configurations
- **Best Practice Updates**: Evolving guideline integration
- **User Contributions**: Community-driven improvements
- **Documentation Expansion**: Comprehensive usage guides

---

## 🎉 Getting Started

1. **Clone or Download**: Get the project files
2. **Open in Browser**: Navigate to `prompt-optimizer/index.html`
3. **Start Creating**: Build your first optimized prompt
4. **Explore Templates**: Try the frontend builder templates
5. **Customize**: Adjust settings for your specific needs

**Ready to create professional-grade prompts with cutting-edge AI capabilities!**

## How To Use
- **Prompt Optimizer**
  - Fill Original prompt; optionally add Context, Examples, Variables, Success Criteria.
  - Choose Target model (GPT or Claude), then set options under the model‑specific panel.
  - Click Improve Prompt; Copy/Download the result.
  - For Claude, enable “Assistant Prefill” to get a response skeleton that enforces structure.
- **Frontend Builder**
  - Pick Target model (defaults to GPT). Enter Brief, Theme & Style, Pages & Components; optionally a Reference Image URL.
  - Use Frontend Templates and Preferred Stack to steer outcomes.
  - For Claude, toggle extra guidance (maximal features, micro‑interactions, design principles, showcase, avoid hard‑coding).
  - Generate Frontend Prompt; Copy/Download for your workflow.

## Mapping To Guidelines
- **GPT (guideline/gpt):**
  - `guideline/gpt/gpt-5_prompting_guide.txt`: context gathering controls, tool‑budget hints, Responses API reuse, coding/UX rules.
  - `guideline/gpt/gpt-5_frontend.txt`: templates (retro noir/pastel, themed login with image context, neon snake), stack preferences.
- **Claude (guideline/claude):**
  - Clarity + system role: `be-clear-and-direct.md`, `system-prompts.md`.
  - Structure + consistency: `use-xml-tags.md`, `increase-consistency.md`, `prompt-templates-and-variables.md`.
  - Reliability: `reduce-hallucinations.md` (quotes‑first, verify claims, “I don’t know”).
  - Thinking: `chain-of-thought.md` (interleaved or silent reasoning).
  - Frontend emphasis: `claude-4-best-practices.md` (maximal features, micro‑interactions, design principles, showcase; avoid hard‑coding).

## Files Of Interest
- `prompt-optimizer/index.html:1` – App layout, tabs, panels, model selectors.
- `prompt-optimizer/style.css:1` – Dark UI, tabs, panel styles.
- `prompt-optimizer/app.js:1` – Prompt assembly logic, model options, templates, persistence.
- `guideline/gpt/gpt-5_prompting_guide.txt:1` – GPT prompting guidance.
- `guideline/gpt/gpt-5_frontend.txt:1` – GPT frontend examples and stack hints.
- `guideline/claude/*` – Claude guidelines powering options.

## What’s Implemented (Checklist)
- **Prompt Optimizer (General):**
  - Role/tone, stepwise Method, explicit Requirements.
  - Variables and Success Criteria sections.
  - Output structure enforcement; citations toggle.
- **GPT Options:**
  - Context gathering block with depth and optional tool budget.
  - Responses API reuse hint.
  - Code editing rules + sample Next.js‑style directory layout.
- **Claude Options:**
  - XML tags / JSON schema / prose tag.
  - “I don’t know” + no‑fabrication + restrict to provided docs.
  - Quotes‑first + claim verification.
  - Interleaved/silent thinking; parallel tools; temp files cleanup.
  - Assistant prefill generation (copy/download).
- **Frontend Builder:**
  - Model selector (GPT/Claude).
  - Templates (retro noir, pastel, themed login, snake game, zero‑to‑one).
  - Preferred stack (frameworks, styling/UI, icons/motion/fonts).
  - Claude frontend toggles (ambition, micro‑interactions, design principles, showcase, avoid hard‑coding).

## Roadmap
- **Optional API Runners:**
  - GPT Responses API demo; Claude Messages API with assistant prefill.
- **Eval Plan Generator:**
  - Create quick evaluation suites from `develop-tests.md` (task fidelity, consistency, tone).
- **Documents Input:**
  - Field to paste documents for quotes‑first grounding + verification.
- **Presets & Templates:**
  - Save/load custom prompt templates and per‑domain presets.

## Known Limitations
- No live API calls; the app only generates prompts.
- XML/JSON options shape output format but do not validate it against schemas.
- Image inputs are referenced but not uploaded (supply URLs or use your API client).

## Local Development
- Pure static app. Open `prompt-optimizer/index.html` directly.
- Edits:
  - UI: `prompt-optimizer/index.html`
  - Styles: `prompt-optimizer/style.css`
  - Logic: `prompt-optimizer/app.js`

## Changelog (High Level)
- Added Prompt Optimizer with GPT and Claude model‑specific panels and persistence.
- Added Frontend Builder with model selector, templates, stack hints, and Claude frontend options.
- Implemented Claude assistant prefill output and consistency/grounding controls.
- Implemented GPT context gathering, Responses API reuse hint, and code editing rules.

