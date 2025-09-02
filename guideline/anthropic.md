## Document 1: `be-clear-and-direct.md`

This document emphasizes providing explicit context and instructions. Your tool can have a dedicated section for this.

### **Features for Context & Specificity**

These options ensure the AI has all the necessary background information.

* **Role Definition (Text Field):**
    * **Label:** `Define Claude's Role`
    * **Description:** A text input where the user can define the persona for the AI (e.g., "You are a senior marketing analyst," "You are a helpful customer support agent"). This directly addresses the concept of treating the AI like a new employee who needs their role defined.
* **Target Audience (Text Field):**
    * **Label:** `Describe the Target Audience`
    * **Description:** A field to specify who the final output is for (e.g., "Technical experts," "Beginners with no prior knowledge," "C-level executives").
* **Task Goal (Text Field):**
    * **Label:** `What is the end goal or purpose of this task?`
    * **Description:** Allows the user to explain what a successful output will be used for. This gives the AI crucial context. For example: "This summary will be used in a quarterly business review presentation."
* **Instructional Steps (Numbered List Input):**
    * **Label:** `Sequential Task Instructions`
    * **Description:** A dynamic input area where users can add numbered or bulleted steps. The tool would format this into a clear, sequential list within the prompt, ensuring the AI follows a precise workflow. Example:
        1.  First, analyze the provided text for sentiment.
        2.  Next, extract the key topics.
        3.  Finally, summarize the text in three sentences.
* **Strict Output Formatting (Checkbox + Text Field):**
    * **Label:** `Enforce a specific output format`
    * **Description:** A checkbox that, when ticked, reveals a text field. The user can then specify an exact output format. For example: "Output the answer as a JSON object with the keys 'summary' and 'sentiment'."

---

## Document 2: `keep-claude-in-character.md`

This document focuses on maintaining a consistent persona, which builds on the role definition from the first document.

### **Features for Character Consistency**

These options help the AI maintain its persona throughout a conversation.

* **System Prompt Builder (Dedicated Text Area):**
    * **Label:** `System Prompt (Role & Rules)`
    * **Description:** A primary, distinct text area for the system prompt. This is where the user defines the AI's core character, rules, and personality traits. The tool should make it clear this is the foundational instruction.
* **Scenario Planning (Key-Value Input):**
    * **Label:** `Define Responses to Specific Scenarios`
    * **Description:** A feature allowing the user to provide "if-then" style guidelines. This prepares the AI for common situations.
    * **UI:** Could be two columns: `If the user asks about...` and `Then, you should respond with...`
    * **Example:**
        * **Scenario:** "AcmeTechCo's confidential IP"
        * **Expected Response:** "I cannot disclose proprietary information."
* **Response Prefill (Text Field):**
    * **Label:** `Prefill Assistant's Response`
    * **Description:** A text input where the user can provide the starting text for the AI's response. This is a powerful way to reinforce character.
    * **Example:** The user could input `[AcmeBot]:` to ensure every response starts with the character tag.

---

## Document 3: `claude-4-best-practices.md`

This document provides specific techniques for modern Claude models, focusing on explicitness and steering behavior.

### **Features for Advanced Steering**

These are more nuanced instructions to fine-tune the AI's behavior.

* **Instructional Framing (Checkboxes/Toggles):**
    * **Label:** `Behavioral Modifiers`
    * **Description:** A set of checkboxes to add encouraging phrases to the prompt.
    * **Options:**
        * `Go beyond the basics and create a fully-featured implementation.`
        * `Include as many relevant features and interactions as possible.`
        * `Apply design principles: hierarchy, contrast, balance, etc.`
        * `Write a high-quality, general-purpose solution.`
* **Negative Constraint Framing ("Do This, Not That" Input):**
    * **Label:** `Reframe Negative Instructions`
    * **Description:** Two text boxes. The user enters what they *don't* want in the first box (e.g., "Don't use markdown"). The tool helps rephrase it as a positive instruction in the second box (e.g., "Your response should be composed of smoothly flowing prose paragraphs."). This could even be an AI-assisted feature later, but for now, it can just be a guided template.
* **XML Formatting Helper (Button):**
    * **Label:** `Wrap Output in XML Tags`
    * **Description:** A button that prompts the user for a tag name (e.g., `summary`) and then adds an instruction to the prompt like: `Place your final summary inside <summary></summary> tags.`
* **Agentic Behavior Control (Checkboxes):**
    * **Label:** `Agentic Coding Options`
    * **Description:** Options specific to code generation tasks.
    * **Options:**
        * `Invoke all relevant tools simultaneously.` (For parallel tool use)
        * `Clean up temporary files at the end of the task.`

---

## Document 4: `chain-of-thought.md` & `chain-prompts.md`

These documents cover techniques for improving reasoning on complex tasks by breaking down the problem.

### **Features for Reasoning and Complexity**

These options structure the prompt to encourage step-by-step thinking.

* **Chain of Thought (CoT) Mode (Dropdown/Radio Buttons):**
    * **Label:** `Reasoning Style`
    * **Description:** Allows the user to select a CoT method.
    * **Options:**
        1.  **None:** No CoT prompting.
        2.  **Basic:** Automatically adds "Think step-by-step." to the prompt.
        3.  **Guided:** Provides a text area for the user to outline the specific thinking steps Claude should follow.
        4.  **Structured:** Automatically adds a template requesting the AI to put its reasoning in `<thinking>` tags and the final answer in `<answer>` tags. This is the most robust option for parsing the output.
* **Prompt Chaining Interface (Advanced Feature):**
    * **Label:** `Chain Multiple Prompts`
    * **Description:** A more advanced UI where a user can create multiple prompt steps. The output of the first prompt (e.g., wrapped in an XML tag) can be automatically used as an input variable for the second prompt.
    * **Example Workflow:**
        * **Step 1 Prompt:** "Analyze the contract and identify risks. Output them in `<risks>` tags."
        * **Step 2 Prompt:** "Draft an email to the vendor based on these concerns: `{{output_from_step_1}}`."

---

## Document 5: `increase-consistency.md`

This document focuses on getting structured and predictable outputs.

### **Features for Output Consistency**

These options are crucial for any application that needs reliable, machine-readable output.

* **JSON Mode Enforcer (Toggle):**
    * **Label:** `Enforce JSON Output`
    * **Description:** A toggle that adds instructions to output a valid JSON object and can also include a user-defined JSON schema in the prompt for the AI to follow.
* **Few-Shot Example Builder (Dynamic Input):**
    * **Label:** `Provide Examples`
    * **Description:** A feature to add multiple "few-shot" examples to the prompt. The user would provide pairs of example inputs and their desired example outputs. This is one of the most effective ways to guide the model.
* **Retrieval Augmented Generation (RAG) Section (Text Area):**
    * **Label:** `Provide Contextual Data (Knowledge Base)`
    * **Description:** A dedicated text area where the user can paste text (e.g., knowledge base articles, documentation) and instruct the AI to base its answer *only* on the provided information. This ensures contextual consistency.

---

## Document 6: `define-success.md` & `develop-tests.md`

These documents are about evaluation, which is a key part of the prompt engineering cycle. Your tool, as shown in the UI screenshot, should have features for this.

### **Features for Evaluation and Testing**

These options help the user define what "good" looks like and test their prompt against those criteria.

* **Success Criteria Definer (Text Area):**
    * **Label:** `Define Success Criteria`
    * **Description:** A field where the user can list measurable goals, as seen in your UI. This helps focus the prompt optimization process.
    * **Examples:** "F1 score must be > 0.85," "Response latency should be < 500ms," "99% of outputs must not contain any PII."
* **Test Case Manager (Table Input):**
    * **Label:** `Evaluation Test Cases`
    * **Description:** A table where each row is a test case and each column is a variable in the prompt. This matches the "Evaluation & testing" section of your UI.
    * **Example:** If the prompt has variables `{{PRODUCT}}` and `{{FEEDBACK}}`, the table would have columns for these, plus a column for the "Expected Outcome" or "Golden Answer."
* **Evaluation Rubric Builder (Text Area):**
    * **Label:** `LLM-based Grading Rubric`
    * **Description:** For qualitative assessments, this text area allows a user to write a detailed rubric. This rubric can then be used in a separate prompt to have an AI grade the output of the main prompt, a technique known as LLM-based evaluation.
    * **Instruction:** "Grade the answer on a scale of 1-5 based on the following rubric..."

---

## Document 7: `system-prompts.md`

This document clarifies the *best* way to use the `system` parameter: for defining a role. This is a critical distinction for structuring the prompt correctly.

### **Features for Role Prompting**

This refines the previous "Role Definition" feature into a more structured approach that separates the persona from the task.

* **Dedicated Prompt Sections (Two Main Text Areas):**
    * **Label 1:** `System Prompt (Claude's Role & Persona)`
    * **Description 1:** A text area specifically for the `system` parameter. The UI should guide the user to *only* put the role definition here. **Example Placeholder:** "You are a seasoned data scientist specializing in customer insight analysis for Fortune 500 companies."
    * **Label 2:** `User Prompt (Task, Instructions, and Context)`
    * **Description 2:** A separate, main text area where all other parts of the prompt (the user's question, instructions, data, examples) should go.
    * **Rationale:** This enforces the best practice of using the system prompt exclusively for setting the character/role, which improves focus and accuracy.

---

## Document 8: `prefill-claudes-response.md`

This document provides powerful, specific examples of using prefilling to control output.

### **Features for Response Prefilling**

This expands on the basic prefill feature with templates and shortcuts.

* **Response Prefill Field (Text Field with Helpers):**
    * **Label:** `Prefill Assistant's Response`
    * **Description:** A text input for the user to provide the starting text for Claude's response.
    * **Helper Buttons:** Add small buttons next to this field to automatically insert common, powerful pre-fills:
        * **`{` Button:** Prefills the response with a single open curly brace. This is a highly effective trick to force Claude to output only a JSON object and skip any preamble.
        * **`<` Button:** Prefills with an open angle bracket to encourage XML output.
        * **`[ROLE]` Button:** Inserts `[CHARACTER NAME]` as a template, reminding the user to replace it with their chosen role name to maintain character consistency in long conversations.

---

## Document 9: `use-xml-tags.md`

This document details the importance and best practices of using XML tags to structure prompts.

### **Features for XML Structuring**

These features will help users automatically and consistently structure their prompts for maximum clarity and accuracy.

* **Automatic XML Wrapping (Toggle):**
    * **Label:** `Automatically Wrap Inputs in XML Tags`
    * **Description:** When enabled, your tool will automatically wrap the content from different input fields into logical XML tags. For example:
        * Content from the `User Prompt` field goes into `<instructions>` tags.
        * Content from the `Provide Examples` field goes into `<examples><example>...</example></examples>` tags.
        * Content from the `Provide Contextual Data` field goes into `<document>` tags.
    * **Benefit:** This makes the prompt highly organized and parseable for Claude, reducing the chance it will misinterpret which part of the input is an instruction versus an example.
* **Custom Tag Manager (Advanced Feature):**
    * **Label:** `Manage Custom Tags`
    * **Description:** An area where users can define their own set of consistent tags (e.g., `<legal_brief>`, `<financial_data>`) and save them. This encourages the best practice of using consistent tag names throughout prompts.

---

## Document 10: `multishot-prompting.md`

This document explains how to use "few-shot" or "multishot" examples to guide Claude's behavior effectively.

### **Features for Example-Driven Prompting**

This enhances the "Few-Shot Example Builder" with quality checks and guidance.

* **Example Builder (Dynamic Input with Quality Checklist):**
    * **Label:** `Provide Examples (3-5 recommended)`
    * **Description:** A dynamic UI where users can add multiple pairs of "Input" and "Desired Output" examples.
    * **Quality Checklist:** Next to the examples section, include a small, non-intrusive checklist to remind users of best practices for crafting effective examples.
        * `[ ] Are the examples relevant to my task?`
        * `[ ] Do they cover diverse situations or edge cases?`
        * `[ ] Is the formatting clear and consistent?`

---

## Document 11: `prompt-templates-and-variables.md`

This document is the foundational concept for your tool. It validates the approach of separating fixed instructions from dynamic content using `{{variables}}`.

### **Features for Templating and Variables**

This is the core of your tool's functionality.

* **Variable Manager (Table Input):**
    * **Label:** `Define Prompt Variables`
    * **Description:** A table where the user can define all the variables used in their prompt template (e.g., `{{USER_QUERY}}`, `{{DOCUMENT_TEXT}}`).
    * **Functionality:** This section should link directly to your "Evaluation Test Cases" feature, where each column in the test case table corresponds to a variable defined here. This directly implements the concept of separating the fixed prompt from the variable inputs for efficient testing and scalability.

---

## Document 12: `long-context-tips.md`

This provides crucial, non-obvious tips for prompts that use a very large number of tokens.

### **Features for Long Context Optimization**

* **Long Context Mode (Toggle):**
    * **Label:** `Optimize for Long Context (>20k tokens)`
    * **Description:** A master switch that enables several best practices for long context prompts. When toggled on, the tool should:
        1.  **Reorder Prompt:** Automatically structure the final prompt so that large documents/data are placed at the very top, before the user's instructions and questions. This can improve performance by up to 30%.
        2.  **Enable Multi-Document Template:** Provide a template for users to input multiple documents, automatically wrapping each in `<document index="1"><source>...</source><document_content>...</document_content></document>` tags.
        3.  **Activate Quote Grounding:** Add a checkbox labeled `Require quotes before answering`. If checked, the tool adds an instruction to the prompt: "First, find and extract relevant quotes from the provided documents that support your answer. Then, provide your final answer based only on those quotes.".

---

## Document 13: `reduce-hallucinations.md`

This document provides a suite of techniques to improve the factual accuracy and trustworthiness of Claude's responses.

### **Features for Hallucination Reduction**

These can be presented as a dedicated checklist or section in your tool.

* **Hallucination Guardrails (Checkboxes):**
    * **Label:** `Accuracy & Grounding Options`
    * **Description:** A set of checkboxes that add specific instructions to the prompt aimed at minimizing hallucinations.
    * **Options:**
        * `[ ] Allow "I don't know"`: Adds the instruction: "If you do not have enough information to answer confidently, say 'I don't have enough information to answer.'".
        * `[ ] Restrict to provided knowledge only`: Adds: "You must only use the information from the documents provided. Do not use any of your external or general knowledge.".
        * `[ ] Require post-answer citation`: Adds a two-step instruction: "First, write your full response. Second, review every claim you made. For each claim, you must find a direct, word-for-word quote from the provided documents that supports it. If you cannot find a supporting quote, you must remove the claim.".