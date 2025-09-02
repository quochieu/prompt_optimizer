// Prompt optimizer with frontend builder integration
(function() {
  const $ = (id) => document.getElementById(id);
  
  const els = {
    systemPrompt: $("system-prompt"),
    userInstructions: $("user-instructions"),
    context: $("context"),
    examples: $("examples"),
    documents: $("documents"),
    variables: $("variables"),
    success: $("success"),
    tone: $("tone"),
    effort: $("effort"),
    askClarify: $("ask-clarify"),
    enforceStructure: $("enforce-structure"),
    hiddenRubric: $("hidden-rubric"),
    addValidation: $("add-validation"),
    addBudget: $("add-budget"),
    citeSources: $("cite-sources"),
    improve: $("improve"),
    copy: $("copy"),
    download: $("download"),
    optimized: $("optimized"),
    status: $("status"),
    enableQuoteExtraction: $("enable-quote-extraction"),
    restrictToDocs: $("restrict-to-docs"),
    feBrief: $("fe-brief"),
    feStyle: $("fe-style"),
    fePages: $("fe-pages"),
    feImage: $("fe-image"),
    feOptimized: $("fe-optimized"),
    feStatus: $("fe-status"),
    feGenerate: $("fe-generate"),
    feCopy: $("fe-copy"),
    feDownload: $("fe-download"),
    // Unified advanced options
    optChainOfThought: $("opt-chain-of-thought"),
    optHiddenRubric: $("opt-hidden-rubric"),
    optAgentEagerness: $("opt-agent-eagerness"),
    optAllowIdk: $("opt-allow-idk"),
    optRestrictDocs: $("opt-restrict-docs"),
    optCiteSources: $("opt-cite-sources"),
    optQuoteExtraction: $("opt-quote-extraction"),
    optLongContextMode: $("opt-long-context-mode"),
    optIncludeCodeRules: $("opt-include-code-rules"),
    optParallelTools: $("opt-parallel-tools"),
    optCleanupFiles: $("opt-cleanup-files"),
    optUseXml: $("opt-use-xml"),
    optPreferJson: $("opt-prefer-json"),
    optForbidMarkdown: $("opt-forbid-markdown"),
    optAssistantPrefill: $("opt-assistant-prefill"),
    assistantPrefill: $("assistant-prefill"),
    prefillCopy: $("prefill-copy"),
    prefillDownload: $("prefill-download"),
  };

  // Utility functions
  function showStatus(message, type = 'success') {
    const status = els.status;
    if (!status) return;
    
    // Clear existing classes
    status.className = 'status-indicator';
    
    // Add appropriate status class
    switch(type) {
      case 'success':
        status.classList.add('status-success');
        break;
      case 'warning':
        status.classList.add('status-warning');
        break;
      case 'error':
        status.classList.add('status-error');
        break;
    }
    
    status.classList.remove('hidden');
    status.textContent = message;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      status.classList.add('hidden');
    }, 3000);
  }

  function asBullets(arr) {
    return arr.map(s => `• ${s}`).join("\n");
  }
  
  function processDocuments(docs, enableQuoteExtraction) {
    if (!docs?.trim()) return "";
    
    let docSection = `Document References:\n${docs}`;
    if (enableQuoteExtraction) {
      docSection += "\n\nNote: When referencing information from these documents, include direct quotes in your response using the format [Quote: \"exact text\" - Source].";
    }
    return docSection;
  }

  // Enhanced formatExamples function
  function formatExamples(examples) {
    if (!examples?.trim()) return "";
    const lines = examples.trim().split('\n').filter(Boolean);
    return lines.map((line, i) => `Example ${i + 1}:\n${line}`).join('\n\n');
  }

  // Enhanced effort guidance
  function effortHint(level) {
    switch(level){
      case "low": return [
        "Bias toward quickest viable answer over exploration.",
        "Avoid tangential analysis; keep scope tight.",
        "Limit self-reflection to a single brief pass."
      ];
      case "high": return [
        "Explore alternative approaches before deciding.",
        "Break down reasoning into explicit steps.",
        "Run a second self-review and refine if needed.",
        "Consider multiple solution paths before committing.",
        "Validate assumptions with evidence."
      ];
      default: return [
        "Be thorough but avoid unnecessary detours.",
        "Surface key assumptions explicitly.",
        "Perform a quick self-check before finalizing."
      ];
    }
  }

  // Main unified prompt building function
  function buildPrompt() {
    // Get input content
    const systemPrompt = els.systemPrompt?.value?.trim();
    const userInstructions = els.userInstructions?.value?.trim();
    
    if (!systemPrompt && !userInstructions) {
      els.status.textContent = "Add either a System Prompt or User Instructions to continue.";
      return;
    }
    
    const ctx = els.context?.value?.trim();
    const ex = els.examples?.value?.trim();
    const docs = els.documents?.value?.trim();
    const variables = els.variables?.value?.trim();
    const success = els.success?.value?.trim();
    const tone = els.tone?.value || 'neutral';
    const effort = els.effort?.value || 'medium';
    const enableClarify = els.askClarify?.checked;
    const enforce = els.enforceStructure?.checked;
    const includeRubric = els.hiddenRubric?.checked;
    const addValidation = els.addValidation?.checked;
    const addBudget = els.addBudget?.checked;
    const citeSources = els.citeSources?.checked;
    const enableQuoteExtraction = els.enableQuoteExtraction?.checked;
    const restrictToDocs = els.restrictToDocs?.checked;
    
    // Get advanced options
    const optChainOfThought = els.optChainOfThought?.checked;
    const optHiddenRubric = els.optHiddenRubric?.checked;
    const optAgentEagerness = els.optAgentEagerness?.checked;
    const optAllowIdk = els.optAllowIdk?.checked;
    const optRestrictDocs = els.optRestrictDocs?.checked;
    const optCiteSources = els.optCiteSources?.checked;
    const optQuoteExtraction = els.optQuoteExtraction?.checked;
    const optLongContextMode = els.optLongContextMode?.checked;
    const optIncludeCodeRules = els.optIncludeCodeRules?.checked;
    const optParallelTools = els.optParallelTools?.checked;
    const optCleanupFiles = els.optCleanupFiles?.checked;
    const optUseXml = els.optUseXml?.checked;
    const optPreferJson = els.optPreferJson?.checked;
    const optForbidMarkdown = els.optForbidMarkdown?.checked;
    const optAssistantPrefill = els.optAssistantPrefill?.checked;
    
    // Process documents
    const docSection = processDocuments(docs, enableQuoteExtraction || optQuoteExtraction);
    
    // Check if frontend builder is enabled and add frontend config
    let frontendPrompt = '';
    const feToggle = document.getElementById('enable-frontend-builder');
    if (feToggle && feToggle.checked) {
      const feBrief = document.getElementById('fe-brief')?.value?.trim();
      if (feBrief) {
        const feStyle = document.getElementById('fe-style')?.value?.trim();
        const fePages = document.getElementById('fe-pages')?.value?.trim();
        const feImage = document.getElementById('fe-image')?.value?.trim();
        const stack = collectStack();
        const stackLines = [];
        if (stack.framework.length) stackLines.push(`Frameworks: ${stack.framework.join(', ')}`);
        if (stack.styling.length) stackLines.push(`Styling/UI: ${stack.styling.join(', ')}`);
        if (stack.icons.length) stackLines.push(`Icons: ${stack.icons.join(', ')}`);
        if (stack.motion.length) stackLines.push(`Animation: ${stack.motion.join(', ')}`);
        if (stack.fonts.length) stackLines.push(`Fonts: ${stack.fonts.join(', ')}`);
        
        let feSection = `\n\n---\nFRONTEND CONFIGURATION\n`;
        feSection += `Objective: ${feBrief}\n`;
        if (feStyle) feSection += `Theme & Style: ${feStyle}\n`;
        if (fePages) feSection += `Information Architecture: ${fePages}\n`;
        if (feImage) feSection += `Reference Image: ${feImage}\n`;
        if (stackLines.length) feSection += `Preferred Stack:\n${stackLines.join('\n')}\n`;
        frontendPrompt = feSection;
      }
    }
    
    // Build the unified prompt
    let finalPrompt = '';
    
    // === SYSTEM PROMPT SECTION ===
    if (systemPrompt) {
      let systemSection = systemPrompt;
      
      // Add reasoning guidance if enabled
      if (optChainOfThought) {
        systemSection += `\n\nInstructions for reasoning: Think step by step. Break down complex problems into smaller components and explain your reasoning process clearly.`;
      }
      
      // Add grounding rules
      if (optAllowIdk || optRestrictDocs) {
        systemSection += `\n\nGrounding rules:`;
        if (optAllowIdk) systemSection += ` You can say "I don't know" when uncertain.`;
        if (optRestrictDocs || restrictToDocs) systemSection += ` Base your response only on the provided documents.`;
      }
      
      // Add code rules if enabled
      if (optIncludeCodeRules) {
        systemSection += `\n\nCode generation rules:
• Use clear, readable code with appropriate comments
• Follow best practices for the programming language
• Include error handling where appropriate
• Write modular, reusable code`;
      }
      
      // Add tool usage rules
      if (optParallelTools) {
        systemSection += `\n\nTool usage: When multiple tools can be used simultaneously, call them in parallel to improve efficiency.`;
      }
      
      if (optCleanupFiles) {
        systemSection += `\n\nFile management: Clean up temporary files and maintain organized project structure.`;
      }
      
      finalPrompt += `# System Prompt\n\n${systemSection}\n\n`;
    }
    
    // === USER INSTRUCTIONS SECTION ===
    let userSection = '';
    
    if (userInstructions) {
      userSection += userInstructions;
    }
    
    // Add context if provided
    if (ctx) {
      const contextTag = optUseXml ? '<context>' : '';
      const contextCloseTag = optUseXml ? '</context>' : '';
      userSection += `\n\n${contextTag}Context:\n${ctx}${contextCloseTag}`;
    }
    
    // Add examples if provided
    if (ex) {
      const examplesTag = optUseXml ? '<examples>' : '';
      const examplesCloseTag = optUseXml ? '</examples>' : '';
      userSection += `\n\n${examplesTag}Examples:\n${formatExamples(ex)}${examplesCloseTag}`;
    }
    
    // Add documents if provided
    if (docSection) {
      const docsTag = optUseXml ? '<documents>' : '';
      const docsCloseTag = optUseXml ? '</documents>' : '';
      userSection += `\n\n${docsTag}${docSection}${docsCloseTag}`;
    }
    
    // Add variables if provided
    if (variables) {
      userSection += `\n\nVariables to use:\n${variables}`;
    }
    
    // Add success criteria if provided
    if (success) {
      userSection += `\n\nSuccess criteria:\n${success}`;
    }
    
    // Add frontend prompt if enabled
    if (frontendPrompt) {
      userSection += frontendPrompt;
    }
    
    // Add behavioral instructions
    const behaviorInstructions = [];
    
    if (tone !== 'neutral' && tone) {
      behaviorInstructions.push(`Use a ${tone} tone in your response.`);
    }
    
    if (effort !== 'medium') {
      behaviorInstructions.push(effortHint(effort));
    }
    
    if (enableClarify) {
      behaviorInstructions.push('Ask clarifying questions if the request is ambiguous or lacks important details.');
    }
    
    if (enforce) {
      behaviorInstructions.push('Follow the specified output structure precisely.');
    }
    
    if (includeRubric || optHiddenRubric) {
      behaviorInstructions.push('Review your response against quality criteria before finalizing.');
    }
    
    if (addValidation) {
      behaviorInstructions.push('Include validation steps and acceptance criteria where applicable.');
    }
    
    if (addBudget) {
      behaviorInstructions.push('Consider efficiency and resource constraints in your approach.');
    }
    
    if (citeSources || optCiteSources) {
      behaviorInstructions.push('Cite sources and provide references for factual claims.');
    }
    
    if (optAgentEagerness) {
      behaviorInstructions.push('Be proactive and thorough. Continue working until the task is fully resolved.');
    }
    
    // Add output formatting instructions
    if (optPreferJson) {
      behaviorInstructions.push('Structure your response as valid JSON when appropriate.');
    }
    
    if (optForbidMarkdown) {
      behaviorInstructions.push('Do not use Markdown formatting. Use plain text with clear structure.');
    }
    
    if (behaviorInstructions.length > 0) {
      userSection += `\n\nAdditional instructions:\n${asBullets(behaviorInstructions)}`;
    }
    
    finalPrompt += `# User Instructions\n\n${userSection}`;
    
    // Show assistant prefill if enabled
    if (optAssistantPrefill) {
      finalPrompt += `\n\n---\n\n**Assistant Response Preview:**\nI'll help you with this task. Let me break it down and provide a comprehensive response...`;
    }
    
    els.optimized.value = finalPrompt;
    showStatus("Universal prompt generated successfully!", 'success');
    
    savePrefs();
  }

  function buildFrontendPrompt() {
    const brief = (els.feBrief?.value || "").trim();
    if (!brief) { 
      showStatus("Add a brief first.", 'warning'); 
      return; 
    }
    const style = (els.feStyle?.value || "").trim();
    const pages = (els.fePages?.value || "").trim();
    const image = (els.feImage?.value || "").trim();

    const sections = [];
    
    sections.push(`System / Role\nYou are a Senior Frontend Engineer. Produce production-quality, accessible, responsive UI with clean structure.`);
    sections.push(`Objective\n${brief}`);
    
    if (style) sections.push(`Theme & Style\n${style}`);
    if (pages) sections.push(`Information Architecture\n${pages}`);
    if (image) sections.push(`Reference Image\nUse this image as a primary style cue: ${image}`);
    
    sections.push(`Required Output\nProvide complete HTML, CSS, and JavaScript code that can be saved as a single working .html file.`);
    
    const finalPrompt = sections.join('\n\n');
    els.feOptimized.value = finalPrompt;
    showStatus("Frontend configuration updated.", 'success');
  }

  function copy() {
    if (!els.optimized.value.trim()) return;
    navigator.clipboard.writeText(els.optimized.value).then(() => {
      showStatus("Copied to clipboard.", 'success');
    }).catch(() => {
      els.optimized.select();
      document.execCommand("copy");
      showStatus("Copied.", 'success');
    });
  }

  function download() {
    const blob = new Blob([els.optimized.value || ""], {type: "text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "optimized-prompt.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function savePrefs() {
    // Save preferences to localStorage
    const prefs = {
      tone: els.tone?.value,
      effort: els.effort?.value,
      askClarify: els.askClarify?.checked,
      enforceStructure: els.enforceStructure?.checked,
      hiddenRubric: els.hiddenRubric?.checked,
      addValidation: els.addValidation?.checked,
      addBudget: els.addBudget?.checked,
      citeSources: els.citeSources?.checked,
      systemPrompt: els.systemPrompt?.value,
      userInstructions: els.userInstructions?.value,
      // Advanced options
      optChainOfThought: els.optChainOfThought?.checked,
      optHiddenRubric: els.optHiddenRubric?.checked,
      optAgentEagerness: els.optAgentEagerness?.checked,
      optAllowIdk: els.optAllowIdk?.checked,
      optRestrictDocs: els.optRestrictDocs?.checked,
      optCiteSources: els.optCiteSources?.checked,
      optQuoteExtraction: els.optQuoteExtraction?.checked,
      optLongContextMode: els.optLongContextMode?.checked,
      optIncludeCodeRules: els.optIncludeCodeRules?.checked,
      optParallelTools: els.optParallelTools?.checked,
      optCleanupFiles: els.optCleanupFiles?.checked,
      optUseXml: els.optUseXml?.checked,
      optPreferJson: els.optPreferJson?.checked,
      optForbidMarkdown: els.optForbidMarkdown?.checked,
      optAssistantPrefill: els.optAssistantPrefill?.checked
    };
    localStorage.setItem('promptOptimizerPrefs', JSON.stringify(prefs));
  }

  function loadPrefs() {
    // Load preferences from localStorage
    const prefs = JSON.parse(localStorage.getItem('promptOptimizerPrefs') || '{}');
    
    // Basic settings
    if (els.tone && prefs.tone) els.tone.value = prefs.tone;
    if (els.effort && prefs.effort) els.effort.value = prefs.effort;
    if (els.askClarify && prefs.askClarify !== undefined) els.askClarify.checked = prefs.askClarify;
    if (els.enforceStructure && prefs.enforceStructure !== undefined) els.enforceStructure.checked = prefs.enforceStructure;
    if (els.hiddenRubric && prefs.hiddenRubric !== undefined) els.hiddenRubric.checked = prefs.hiddenRubric;
    if (els.addValidation && prefs.addValidation !== undefined) els.addValidation.checked = prefs.addValidation;
    if (els.addBudget && prefs.addBudget !== undefined) els.addBudget.checked = prefs.addBudget;
    if (els.citeSources && prefs.citeSources !== undefined) els.citeSources.checked = prefs.citeSources;
    
    // Main content
    if (els.systemPrompt && prefs.systemPrompt) els.systemPrompt.value = prefs.systemPrompt;
    if (els.userInstructions && prefs.userInstructions) els.userInstructions.value = prefs.userInstructions;
    
    // Advanced options
    if (els.optChainOfThought && prefs.optChainOfThought !== undefined) els.optChainOfThought.checked = prefs.optChainOfThought;
    if (els.optHiddenRubric && prefs.optHiddenRubric !== undefined) els.optHiddenRubric.checked = prefs.optHiddenRubric;
    if (els.optAgentEagerness && prefs.optAgentEagerness !== undefined) els.optAgentEagerness.checked = prefs.optAgentEagerness;
    if (els.optAllowIdk && prefs.optAllowIdk !== undefined) els.optAllowIdk.checked = prefs.optAllowIdk;
    if (els.optRestrictDocs && prefs.optRestrictDocs !== undefined) els.optRestrictDocs.checked = prefs.optRestrictDocs;
    if (els.optCiteSources && prefs.optCiteSources !== undefined) els.optCiteSources.checked = prefs.optCiteSources;
    if (els.optQuoteExtraction && prefs.optQuoteExtraction !== undefined) els.optQuoteExtraction.checked = prefs.optQuoteExtraction;
    if (els.optLongContextMode && prefs.optLongContextMode !== undefined) els.optLongContextMode.checked = prefs.optLongContextMode;
    if (els.optIncludeCodeRules && prefs.optIncludeCodeRules !== undefined) els.optIncludeCodeRules.checked = prefs.optIncludeCodeRules;
    if (els.optParallelTools && prefs.optParallelTools !== undefined) els.optParallelTools.checked = prefs.optParallelTools;
    if (els.optCleanupFiles && prefs.optCleanupFiles !== undefined) els.optCleanupFiles.checked = prefs.optCleanupFiles;
    if (els.optUseXml && prefs.optUseXml !== undefined) els.optUseXml.checked = prefs.optUseXml;
    if (els.optPreferJson && prefs.optPreferJson !== undefined) els.optPreferJson.checked = prefs.optPreferJson;
    if (els.optForbidMarkdown && prefs.optForbidMarkdown !== undefined) els.optForbidMarkdown.checked = prefs.optForbidMarkdown;
    if (els.optAssistantPrefill && prefs.optAssistantPrefill !== undefined) els.optAssistantPrefill.checked = prefs.optAssistantPrefill;
  }

  function collectStack(){
    const nodes = Array.from(document.querySelectorAll('input.stack[type="checkbox"]'));
    const groups = { framework: [], styling: [], icons: [], motion: [], fonts: [] };
    nodes.forEach(n => { 
      if(n.checked){ 
        const g = n.getAttribute('data-group'); 
        if(groups[g]) groups[g].push(n.value); 
      }
    });
    return groups;
  }

  function initTabs(){
    const tabs = Array.from(document.querySelectorAll('nav.tabs .tab'));
    const views = {
      optimizer: document.getElementById('view-optimizer'),
      frontend: document.getElementById('view-frontend'),
    };
    tabs.forEach(btn => btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-view');
      tabs.forEach(b => b.classList.toggle('active', b===btn));
      Object.entries(views).forEach(([k,el]) => el.classList.toggle('active', k===key));
    }));
  }

  // Event listeners
  els.improve.addEventListener("click", buildPrompt);
  els.copy.addEventListener("click", copy);
  els.download.addEventListener("click", download);
  els.feGenerate.addEventListener("click", buildFrontendPrompt);
  
  els.feCopy.addEventListener("click", () => { 
    if(!els.feOptimized.value.trim()) return; 
    navigator.clipboard.writeText(els.feOptimized.value).then(()=>{
      els.feStatus.textContent='Copied.';
      setTimeout(()=>els.feStatus.textContent='',1200);
    });
  });
  
  els.feDownload.addEventListener("click", () => {
    const blob = new Blob([els.feOptimized.value || ""], {type: "text/plain;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; 
    a.download = "frontend-prompt.txt"; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove(); 
    URL.revokeObjectURL(url);
  });

  // --- INITIAL UI SETUP ON PAGE LOAD ---
  initTabs();
  loadPrefs();

  // Make showStatus available globally for other scripts
  window.showStatus = showStatus;

  // Add a console log to confirm that the script has initialized correctly.
  console.log("Unified Prompt Optimizer UI initialized successfully.");
})();

// Frontend templates and helpers outside the main IIFE
function applyTemplate(key){
  const original = document.getElementById('original');
  const context = document.getElementById('context');
  const examples = document.getElementById('examples');
  const t = templates[key];
  if(!t){ return; }
  if (t.original) original.value = t.original.trim();
  if (t.context) context.value = t.context.trim();
  if (t.examples) examples.value = t.examples.trim();
}

const templates = {
  landing_noir: {
    original: "Make a landing page for a retro-games store with a retro-arcade noir vibe.",
    context: "Theme: dark, neon accent, arcade textures. Visual mood: noir + retro arcade. Maintain accessibility and responsive layout.",
  },
  landing_pastel: {
    original: "Make a landing page for a retro-games store. Make it light, more pastel coloured & flowery (think Mario, not cyberpunk).",
    context: "Theme: light, pastel palette, playful shapes, soft shadows, friendly typography.",
  },
  login_match_theme: {
    original: "Create a login page that matches the existing dashboard's theme and design system.",
    context: [
      "You will be provided a reference screenshot. Match color palette, typography, spacing, and component style.",
      "If using an API with image input, include the screenshot as a data URL image and condition your design on it.",
      "Keep the login form simple: email, password, remember me, forgot password, and primary submit button.",
    ].join("\n"),
    examples: "If using the OpenAI Responses API, include an image input: see docs for input_image with data URL.",
  },
  snake_game: {
    original: "Make me a snake game. It should be futuristic, neon, cyberpunk style. Make sure the typography is suitably cool.",
    context: "Ensure keyboard controls, growing snake, collision detection, score display, and restart. Maintain theme consistency (colors, glow, type).",
  },
  zero_to_one: {
    original: "Build a one-shot, production-grade frontend for the following idea: [describe app goals and key features].",
    context: [
      "Start with a strong information architecture and component breakdown.",
      "Include responsive layout and accessible components.",
      "Prefer predictable state management patterns and modular components.",
    ].join("\n"),
    examples: [
      "Page sections: hero, features, testimonials, pricing, FAQ, footer.",
      "Components: Button, Card, Navbar, Footer, TestimonialItem.",
    ].join("\n"),
  },
};