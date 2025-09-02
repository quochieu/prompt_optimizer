### GPT-5 Prompt Optimizer Features (Frontend Board)

This file outlines the features for a dedicated "Frontend Builder" board within your tool, designed based on the provided UI screenshots and frontend-specific documentation.

### **1. Frontend Stack Configuration**

This section, inspired by `image_4baee2.png`, allows the user to specify the technology stack, which heavily steers the model's code generation. The tool will assemble these choices into a clear instruction for the prompt.

* **Framework (Checkboxes - allow multiple):**
    * `[x] Next.js (TypeScript)`
    * `[ ] React`
    * `[ ] HTML`
* **Styling / UI (Checkboxes - allow multiple):**
    * `[x] Tailwind CSS`
    * `[ ] shadcn/ui`
    * `[ ] Radix Themes`
* **Icons & Typography (Checkboxes - allow multiple):**
    * `[x] Material Symbols`
    * `[ ] Heroicons`
    * `[ ] Lucide`
* **Animation & Motion (Checkboxes - allow multiple):**
    * `[x] Motion` (Framer Motion)
    * `[ ] CSS Animations`
* **Fonts (Checkboxes - allow multiple, San Serif recommended):**
    * `[x] San Serif (Recommended)`
    * `[ ] Inter`
    * `[ ] Geist`
    * And others listed in the docs...
* **Advanced Features (Checkboxes):**
    * `[ ] One-shot full application`
    * `[ ] Interactive elements (games, etc.)`
    * `[ ] Responsive design`

### **2. Project & Design Specification**

This section, inspired by `image_4baf1f.png`, captures the high-level requirements for the frontend project.

* **Project Description (Text Area):**
    * **Label:** `Project description`
    * **Description:** Describe the site/app, target audience, key features, and overall goals.
* **Theme & Visual Style (Text Area):**
    * **Label:** `Theme & visual style`
    * **Description:** Provide keywords to guide the aesthetic. Examples: "retro-arcade noir", "pastel & flowery (Mario-style)", "neon cyberpunk", "modern minimalist".
* **Pages & Components Structure (Text Area):**
    * **Label:** `Pages & components structure`
    * **Description:** Outline the desired pages and reusable components (e.g., Pages: Home, About, Pricing; Components: Navbar, Hero, Card).
* **Interactive Features (Text Area):**
    * **Label:** `Interactive features`
    * **Description:** Specify any dynamic or interactive elements like games, animations, user interactions, or API integrations.

### **3. Multimodal Input for Design Matching**

This feature leverages GPT-5's native multimodality to ensure design consistency with existing assets.

* **Reference Image Input (File Upload or URL):**
    * **Label:** `Reference image URL (optional)`
    * **Description:** Provide a design reference for style matching. The tool should encode this image (e.g., to base64) and include it in the prompt with an instruction like, "Can you make a login page for this website that maintains the same theme". This is a powerful feature for making additions to existing designs.

### **4. Advanced Generation Controls**

These controls allow for fine-tuning the generation process, as seen in `image_4baf1f.png`.

* **Reasoning Effort (Dropdown):**
    * **Description:** As described in the general tool, allows selection of `minimal`, `low`, `medium`, or `high` reasoning.
* **Hidden Self-Review Rubric (Checkbox):**
    * **Label:** `Use hidden self-review rubric`
    * **Description:** When checked, the tool will insert a `<self_reflection>` prompt block instructing GPT-5 to first create a 5-7 category rubric for a "world-class one-shot web app," keep it hidden, and then iterate internally until the solution meets the highest standard on that rubric. This is a key technique for improving one-shot generation quality.

### **5. Frontend Templates**

This section provides pre-configured starting points based on successful examples from the documentation.

* **Prompt Template Selector (Dropdown):**
    * **Label:** `Select template`
    * **Description:** A dropdown of pre-configured templates that populate the fields on this board.
    * **Example Options:**
        * "Landing: Retro-arcade noir"
        * "Landing: Pastel & flowery (Mario-style)"
        * "Interactive: Futuristic neon snake game"
        * "Page Addition: Login page from image"