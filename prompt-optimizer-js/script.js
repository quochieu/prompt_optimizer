// Simple Prompt Optimizer - Traditional JavaScript
(function() {
    'use strict';

    // Element selectors
    const $ = (id) => document.getElementById(id);

    // Main elements
    const elements = {
        // Input fields
        systemPrompt: $('system-prompt'),
        userInstructions: $('user-instructions'),
        context: $('context'),
        examples: $('examples'),
        documents: $('documents'),
        variables: $('variables'),
        successCriteria: $('success-criteria'),
        
        // Selects
        targetModel: $('target-model'),
        toneStyle: $('tone-style'),
        reasoningEffort: $('reasoning-effort'),
        
        // Checkboxes
        useXmlExamples: $('use-xml-examples'),
        quoteFirst: $('quote-first'),
        restrictDocs: $('restrict-docs'),
        askClarify: $('ask-clarify'),
    // Additional grounding / advanced toggles (added in vanilla UI)
    optQuoteExtraction: $('opt-quote-extraction'),
    optLongContextMode: $('opt-long-context-mode'),
    optCleanupFiles: $('opt-cleanup-files'),
    optAssistantPrefill: $('opt-assistant-prefill'),
    askCite: $('ask-cite'),
    addValidation: $('add-validation'),
    addBudget: $('add-budget'),
        
        // Advanced options
        chainOfThought: $('chain-of-thought'),
        selfReview: $('self-review'),
        agenticProactivity: $('agentic-proactivity'),
        allowUnknown: $('allow-unknown'),
        requireCitations: $('require-citations'),
    enforceStructure: $('enforce-structure'),
        verifyClaims: $('verify-claims'),
        codeQuality: $('code-quality'),
        parallelTools: $('parallel-tools'),
        useXml: $('use-xml'),
        preferJson: $('prefer-json'),
        noMarkdown: $('no-markdown'),
        
        // Frontend builder
        enableFrontendBuilder: $('enable-frontend-builder'),
        frontendBoard: $('frontend-board'),
        feTemplate: $('fe-template'),
        feReasoningEffort: $('fe-reasoning-effort'),
        feHiddenRubric: $('fe-hidden-rubric'),
        feBrief: $('fe-brief'),
        feStyle: $('fe-style'),
        fePages: $('fe-pages'),
        feInteractions: $('fe-interactions'),
        feImage: $('fe-image'),
        feEnableImageInput: $('fe-enable-image-input'),
        
        // Output
        improveBtn: $('improve'),
        copyBtn: $('copy'),
        downloadBtn: $('download'),
        optimized: $('optimized'),
        statusIndicator: $('status'),
        
        // Prefill
        prefillBlock: $('prefill-block'),
        assistantPrefill: $('assistant-prefill'),
        prefillCopy: $('prefill-copy'),
        prefillDownload: $('prefill-download')
    };

    // Utility functions
    function showStatus(message, type = 'success') {
        const status = elements.statusIndicator;
        if (!status) return;
        
        status.textContent = message;
        status.className = `status-indicator ${type}`;
        status.classList.remove('hidden');
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            status.classList.add('hidden');
        }, 3000);
    }

    // Centralized option prompts (loaded from prompt_options.json)
    let PROMPT_OPTIONS = [];

    async function loadPromptOptions() {
        try {
            const resp = await fetch('./prompt_options.json');
            if (!resp.ok) return;
            const data = await resp.json();

            // Support two schemas:
            // 1) Flat array: [ { option: 'Name', prompt: '...' }, ... ]
            // 2) Nested sessions: [ { session: '...', options: [ { option: 'Name', output: [ { param:'', prompt: '...' } ] } ] } ]
            const flat = [];
            if (Array.isArray(data) && data.length > 0 && data[0].session) {
                // nested sessions -> flatten
                data.forEach(sess => {
                    (sess.options || []).forEach(opt => {
                        let promptText = '';
                        if (Array.isArray(opt.output) && opt.output.length > 0) {
                            // take the first output entry's prompt as the canonical short prompt
                            promptText = opt.output[0].prompt || '';
                        } else if (opt.prompt) {
                            promptText = opt.prompt;
                        }
                        flat.push({ option: opt.option, prompt: promptText, raw: opt });
                    });
                });
            } else if (Array.isArray(data)) {
                // already flat or unknown shape; keep as-is
                data.forEach(d => flat.push(d));
            }

            PROMPT_OPTIONS = flat;
            console.log('Loaded prompt options:', PROMPT_OPTIONS.length);
        } catch (err) {
            console.warn('Could not load prompt options:', err);
        }
    }

    function getOptionPrompt(optionName) {
        const entry = PROMPT_OPTIONS.find(e => e.option === optionName);
        return entry?.prompt || '';
    }

    function formatExamples(examples, useXml) {
        if (!examples?.trim()) return '';

        // Allow multi-line examples separated by one or more blank lines.
        // Split into blocks where each block is an example (preserve internal newlines).
        const blocks = examples
            .trim()
            .split(/\n\s*\n+/) // split on one or more blank lines
            .map(b => b.trim())
            .filter(b => b.length > 0);

        if (blocks.length === 0) return '';

        if (useXml) {
            const xmlBlocks = blocks.map(b => `<example>\n${b}\n</example>`).join('\n');
            return `<examples>\n${xmlBlocks}\n</examples>`;
        }

        // Plain text format: numbered Example blocks separated by a blank line
        const formatted = blocks.map((b, i) => `Example ${i + 1}:\n${b}`).join('\n\n');
        return formatted;
    }

    // Document processing helper (verbatim from the Tailwind app.js)
    function processDocuments(docs, enableQuoteExtraction) {
                if (!docs?.trim()) return "";

                // keep document block minimal; specific behaviors (quotes-first, long-context) are added in buildPrompt
                let docSection = `Document References:\n${docs}`;
                return docSection;
    }

    function getReasoningInstructions(level) {
        const instructions = {
            low: [
                'Provide a direct, concise response',
                'Focus on the most essential points',
                'Avoid lengthy explanations'
            ],
            medium: [
                'Think through the problem step by step',
                'Provide clear reasoning for your conclusions',
                'Balance thoroughness with efficiency'
            ],
            high: [
                'Analyze the problem from multiple angles',
                'Consider alternative approaches and solutions',
                'Provide detailed reasoning and validation',
                'Double-check your work before responding'
            ]
        };
        
        return instructions[level] || instructions.medium;
    }

    function buildPrompt() {
        const data = getFormData();

        if (!data.systemPrompt && !data.userInstructions) {
            showStatus('Add either a System Prompt or User Instructions to continue.', 'error');
            return;
        }

        // Process documents (keep identical behavior to Tailwind app.js)
        const docSection = processDocuments(data.documents, data.quoteFirst || data.optQuoteExtraction);

        // Build final prompt using the same section headings and wording as the Tailwind version
        let finalPrompt = '';

        // === SYSTEM PROMPT SECTION ===
        let systemSection = data.systemPrompt ? data.systemPrompt : '';

        if (data.chainOfThought) {
            // use centralized wording when available
            const text = getOptionPrompt('Include Chain of Thought / Thinking') || 'Think step by step. Break down complex problems into smaller components and explain your reasoning process clearly.';
            systemSection += `\n\nInstructions for reasoning: ${text}`;
        }

        if (data.allowUnknown || data.restrictDocs) {
            systemSection += `\n\nGrounding rules:`;
            if (data.allowUnknown) {
                const text = getOptionPrompt('Allow "I don\'t know" answers') || 'You can say "I don\'t know" when uncertain.';
                systemSection += ` ${text}`;
            }
            if (data.restrictDocs) {
                const text = getOptionPrompt('Restrict to provided documents') || 'Base your response only on the provided documents.';
                systemSection += ` ${text}`;
            }
        }

        if (data.codeQuality) {
            const text = getOptionPrompt('Include general code editing rules') || 'Code generation rules:\n\u2022 Use clear, readable code with appropriate comments\n\u2022 Follow best practices for the programming language\n\u2022 Include error handling where appropriate\n\u2022 Write modular, reusable code';
            systemSection += `\n\n${text}`;
        }

        if (data.parallelTools) {
            const text = getOptionPrompt('Encourage parallel tool calling') || 'Tool usage: When multiple tools can be used simultaneously, call them in parallel to improve efficiency.';
            systemSection += `\n\n${text}`;
        }

        if (data.optCleanupFiles) {
            const text = getOptionPrompt('Ask to clean up temp files') || 'File management: Clean up temporary files and maintain organized project structure.';
            systemSection += `\n\n${text}`;
        }

        if (systemSection) {
            finalPrompt += `# System Prompt\n\n${systemSection}\n\n`;
        }

        // === USER INSTRUCTIONS SECTION ===
        let userSection = '';

        if (data.userInstructions) {
            userSection += data.userInstructions;
        }

        // Add context, examples, documents, variables, success criteria and frontend config into the user section
        if (data.context) {
            const contextTag = data.useXml ? '<context>' : '';
            const contextCloseTag = data.useXml ? '</context>' : '';
            userSection += `\n\n${contextTag}Context:\n${data.context}${contextCloseTag}`;
        }

        if (data.examples) {
            const formatted = formatExamples(data.examples, data.useXmlExamples);
            const examplesTag = data.useXmlExamples ? '<examples>' : '';
            const examplesCloseTag = data.useXmlExamples ? '</examples>' : '';
            userSection += `\n\n${examplesTag}Examples:\n${formatted}${examplesCloseTag}`;
        }

        if (docSection) {
            const docsTag = data.useXmlExamples ? '<documents>' : '';
            const docsCloseTag = data.useXmlExamples ? '</documents>' : '';
            userSection += `\n\n${docsTag}${docSection}${docsCloseTag}`;

            if (data.quoteFirst) {
                const text = getOptionPrompt('Extract supporting quotes first') || 'When using information from the reference documents, extract and include direct quotes first, then provide your analysis.';
                userSection += `\n\nINSTRUCTION: ${text}`;
            }

            if (data.restrictDocs) {
                const text = getOptionPrompt('Restrict to provided documents') || 'Base your response only on the information provided in the reference documents above. Do not use external knowledge.';
                userSection += `\n\nCONSTRAINT: ${text} Do not use external knowledge.`;
            }

            if (data.optQuoteExtraction) {
                const text = getOptionPrompt('Extract supporting quotes first') || 'Prioritize extracting relevant supporting quotes from the reference documents before generating analysis.';
                userSection += `\n\nINSTRUCTION: ${text}`;
            }

            if (data.optLongContextMode) {
                const text = getOptionPrompt('Optimize for Long Context') || 'Optimize ordering of large documents (place most relevant or larger documents first) and use long-context strategies to preserve important references.';
                userSection += `\n\nINSTRUCTION: ${text}`;
            }
        }

        if (data.variables) {
            userSection += `\n\nVariables to use:\n${data.variables}`;
        }

        if (data.successCriteria) {
            userSection += `\n\nSuccess criteria:\n${data.successCriteria}`;
        }

        // Frontend prompt if present
        if (data.enableFrontendBuilder && (data.feBrief || data.feStyle)) {
            let feSection = `\n\n---\nFRONTEND CONFIGURATION\n`;
            if (data.feBrief) feSection += `Objective: ${data.feBrief}\n`;
            if (data.feStyle) feSection += `Theme & Style: ${data.feStyle}\n`;
            if (data.fePages) feSection += `Information Architecture: ${data.fePages}\n`;
            if (data.feImage) feSection += `Reference Image: ${data.feImage}\n`;
            userSection += feSection;
        }

        // Behavioral / additional instructions
        const behaviorInstructions = [];
        if (data.toneStyle && data.toneStyle !== 'default') {
            behaviorInstructions.push(`Use a ${data.toneStyle} tone in your response.`);
        }

        if (data.reasoningEffort && data.reasoningEffort !== 'medium') {
            const ri = getReasoningInstructions(data.reasoningEffort);
            behaviorInstructions.push(...ri);
        }

        if (data.askClarify) {
            const txt = getOptionPrompt("Ask clarifying questions if needed") || 'Ask clarifying questions if the request is ambiguous or lacks important details.';
            behaviorInstructions.push(txt);
        }
        if (data.enforceStructure) {
            behaviorInstructions.push('Follow the specified output structure precisely.');
        }
        if (data.hiddenRubric || data.selfReview) {
            const text = getOptionPrompt('Use Hidden Self-Review Rubric') || 'Review your response against quality criteria before finalizing.';
            behaviorInstructions.push(text);
        }
        if (data.addValidation) {
            const txt = getOptionPrompt('Add validation and acceptance criteria') || 'Include validation steps and acceptance criteria to verify the solution.';
            behaviorInstructions.push(txt);
        }
        if (data.addBudget) {
            const txt = getOptionPrompt('Add tool/step budget hints') || 'Consider tool/step budgets and keep solutions within provided resource limits.';
            behaviorInstructions.push(txt);
        }
        if (data.citeSources || data.requireCitations || data.citeSources) {
            const text = getOptionPrompt('Ask to cite sources when relevant') || getOptionPrompt('Require citations / claim verification') || 'Cite sources and provide references for factual claims.';
            behaviorInstructions.push(text);
        }
        if (data.agenticProactivity) {
            const text = getOptionPrompt('Encourage Agentic Proactivity') || 'Be proactive and thorough. Continue working until the task is fully resolved.';
            behaviorInstructions.push(text);
        }
        if (data.preferJson) {
            const text = getOptionPrompt('Prefer JSON output') || 'Structure your response as valid JSON when appropriate.';
            behaviorInstructions.push(text);
        }
        if (data.noMarkdown) {
            const text = getOptionPrompt('Forbid Markdown in output') || 'Do not use Markdown formatting. Use plain text with clear structure.';
            behaviorInstructions.push(text);
        }

        if (behaviorInstructions.length > 0) {
            userSection += `\n\nAdditional instructions:\n${behaviorInstructions.map(s => `\u2022 ${s}`).join('\n')}`;
        }

        finalPrompt += `# User Instructions\n\n${userSection}`;

        // Assistant prefill
        if (data.optAssistantPrefill) {
            const text = getOptionPrompt('Show Assistant Prefill skeleton') || "I'll help you with this task. Let me break it down and provide a comprehensive response...";
            finalPrompt += `\n\n---\n\n**Assistant Response Preview:**\n${text}`;
        }

        // Output
        elements.optimized.value = finalPrompt;
        showStatus('Universal prompt generated successfully!', 'success');

        // Persist prefs
        saveData();
    }

    function generatePrefill(data) {
        let prefill = '';
        
        if (data.useXml) {
            prefill += '<thinking>\n[Analysis and reasoning will go here]\n</thinking>\n\n';
        }
        
        if (data.preferJson) {
            prefill += '{\n  "response": "';
        } else {
            prefill += 'I understand the requirements. Let me ';
            
            if (data.chainOfThought) {
                prefill += 'think through this step by step:\n\n1. ';
            } else {
                prefill += 'provide a comprehensive response:\n\n';
            }
        }
        
        return prefill;
    }

    function getFormData() {
        return {
            systemPrompt: elements.systemPrompt?.value?.trim() || '',
            userInstructions: elements.userInstructions?.value?.trim() || '',
            context: elements.context?.value?.trim() || '',
            examples: elements.examples?.value?.trim() || '',
            documents: elements.documents?.value?.trim() || '',
            variables: elements.variables?.value?.trim() || '',
            successCriteria: elements.successCriteria?.value?.trim() || '',
            
            targetModel: elements.targetModel?.value || 'universal',
            toneStyle: elements.toneStyle?.value || 'default',
            reasoningEffort: elements.reasoningEffort?.value || 'medium',
            
            useXmlExamples: elements.useXmlExamples?.checked || false,
            quoteFirst: elements.quoteFirst?.checked || false,
            restrictDocs: elements.restrictDocs?.checked || false,
            askClarify: elements.askClarify?.checked || false,
            optQuoteExtraction: elements.optQuoteExtraction?.checked || false,
            optLongContextMode: elements.optLongContextMode?.checked || false,
            optCleanupFiles: elements.optCleanupFiles?.checked || false,
            optAssistantPrefill: elements.optAssistantPrefill?.checked || false,
            citeSources: elements.askCite?.checked || false,
            addValidation: elements.addValidation?.checked || false,
            addBudget: elements.addBudget?.checked || false,
            enforceStructure: elements.enforceStructure?.checked || false,
            
            chainOfThought: elements.chainOfThought?.checked || false,
            selfReview: elements.selfReview?.checked || false,
            agenticProactivity: elements.agenticProactivity?.checked || false,
            allowUnknown: elements.allowUnknown?.checked || false,
            requireCitations: elements.requireCitations?.checked || false,
            verifyClaims: elements.verifyClaims?.checked || false,
            codeQuality: elements.codeQuality?.checked || false,
            parallelTools: elements.parallelTools?.checked || false,
            useXml: elements.useXml?.checked || false,
            preferJson: elements.preferJson?.checked || false,
            noMarkdown: elements.noMarkdown?.checked || false,
            
            enableFrontendBuilder: elements.enableFrontendBuilder?.checked || false,
            feTemplate: elements.feTemplate?.value || '',
            feReasoningEffort: elements.feReasoningEffort?.value || 'medium',
            feHiddenRubric: elements.feHiddenRubric?.checked || false,
            feBrief: elements.feBrief?.value?.trim() || '',
            feStyle: elements.feStyle?.value?.trim() || '',
            fePages: elements.fePages?.value?.trim() || '',
            feInteractions: elements.feInteractions?.value?.trim() || '',
            feImage: elements.feImage?.value?.trim() || '',
            feEnableImageInput: elements.feEnableImageInput?.checked || false
        };
    }

    // Copy to clipboard
    async function copyToClipboard(text, type = 'prompt') {
        try {
            await navigator.clipboard.writeText(text);
            showStatus(`${type} copied to clipboard!`, 'success');
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showStatus(`${type} copied to clipboard!`, 'success');
        }
    }

    // Download as file
    function downloadAsFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showStatus(`Downloaded as ${filename}`, 'success');
    }

    // Toggle frontend builder panel
    function toggleFrontendBuilder() {
        const isEnabled = elements.enableFrontendBuilder?.checked || false;
        if (elements.frontendBoard) {
            if (isEnabled) {
                elements.frontendBoard.classList.remove('hidden', 'dimmed');
            } else {
                elements.frontendBoard.classList.add('hidden', 'dimmed');
            }
        }
    }

    // Load saved data from localStorage
    function loadSavedData() {
        try {
            const saved = localStorage.getItem('prompt-optimizer-data');
            if (saved) {
                const data = JSON.parse(saved);
                Object.keys(data).forEach(key => {
                    const element = elements[key];
                    if (element) {
                        if (element.type === 'checkbox') {
                            element.checked = data[key];
                        } else {
                            element.value = data[key];
                        }
                    }
                });
                // Update frontend builder visibility
                toggleFrontendBuilder();
            }
        } catch (err) {
            console.warn('Could not load saved data:', err);
        }
    }

    // Save data to localStorage
    function saveData() {
        try {
            const data = getFormData();
            localStorage.setItem('prompt-optimizer-data', JSON.stringify(data));
        } catch (err) {
            console.warn('Could not save data:', err);
        }
    }

    // Initialize the application
    function init() {
        console.log('Initializing Prompt Optimizer...');
        
        // Load saved data
        loadSavedData();
        // Load centralized prompt option data
        loadPromptOptions();
        
        // Event listeners
        if (elements.improveBtn) {
            elements.improveBtn.addEventListener('click', buildPrompt);
        }
        
        if (elements.copyBtn) {
            elements.copyBtn.addEventListener('click', () => {
                const prompt = elements.optimized?.value;
                if (prompt) {
                    copyToClipboard(prompt, 'Prompt');
                } else {
                    showStatus('No prompt to copy. Generate one first.', 'error');
                }
            });
        }
        
        if (elements.downloadBtn) {
            elements.downloadBtn.addEventListener('click', () => {
                const prompt = elements.optimized?.value;
                if (prompt) {
                    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                    downloadAsFile(prompt, `prompt-${timestamp}.txt`);
                } else {
                    showStatus('No prompt to download. Generate one first.', 'error');
                }
            });
        }
        
        if (elements.prefillCopy) {
            elements.prefillCopy.addEventListener('click', () => {
                const prefill = elements.assistantPrefill?.value;
                if (prefill) {
                    copyToClipboard(prefill, 'Prefill');
                } else {
                    showStatus('No prefill to copy.', 'error');
                }
            });
        }
        
        if (elements.prefillDownload) {
            elements.prefillDownload.addEventListener('click', () => {
                const prefill = elements.assistantPrefill?.value;
                if (prefill) {
                    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                    downloadAsFile(prefill, `prefill-${timestamp}.txt`);
                } else {
                    showStatus('No prefill to download.', 'error');
                }
            });
        }
        
        if (elements.enableFrontendBuilder) {
            elements.enableFrontendBuilder.addEventListener('change', toggleFrontendBuilder);
        }
        
        // Auto-save on input changes
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', saveData);
            input.addEventListener('change', saveData);
        });
        
        console.log('Prompt Optimizer initialized successfully!');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();