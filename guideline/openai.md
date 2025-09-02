### GPT-5 Prompt Optimizer Features (General)

This file outlines the features for a general-purpose prompt optimizer tool based on the provided documentation for GPT-5.

### **1. Model & API Configuration**

These top-level settings define the core model and API to be used.

* **Model Selection (Dropdown):**
    * **Label:** `Target Model`
    * **Description:** Allows the user to select the appropriate GPT-5 variant for their task.
    * **Options:**
        * `gpt-5`: Best for complex reasoning, broad world knowledge, and code-heavy or multi-step agentic tasks.
        * `gpt-5-mini`: Balances speed, cost, and capability; ideal for cost-optimized reasoning and chat.
        * `gpt-5-nano`: Suited for high-throughput tasks, especially simple instruction-following or classification.
* **API Selection (Radio Buttons):**
    * **Label:** `API Mode`
    * **Description:** Choose between the modern Responses API (recommended for GPT-5) and the legacy Chat Completions API.
    * **Options:**
        * **Responses API:** Recommended for GPT-5 to pass chain of thought (CoT) between turns, leading to fewer reasoning tokens, higher cache hit rates, and lower latency.
        * **Chat Completions API:** For maintaining compatibility with older systems.

### **2. Core Prompt Structure**

This section helps users structure the content of their prompts according to best practices.

* **Message Roles (Distinct Text Areas):**
    * **Label 1:** `Developer Message`
    * **Description:** For instructions from the application developer. These are prioritized ahead of user messages. This area should contain the main identity, instructions, and examples.
    * **Label 2:** `User Message`
    * **Description:** For instructions or input provided by the end-user. These are prioritized behind developer messages.
* **Prompt Section Builder (Templates):**
    * **Label:** `Structure Developer Message`
    * **Description:** A feature to insert a structured template into the `Developer Message` text area, guiding the user to provide comprehensive instructions. The template can use Markdown and XML tags for clarity.
    * **Template Sections:**
        * `# Identity`: Describe the purpose and communication style of the assistant.
        * `# Instructions`: Provide rules, guidelines, and constraints for the model.
        * `# Examples`: Provide few-shot examples of inputs and desired outputs.
        * `# Context`: Give the model additional information or proprietary data to use for the response.

### **3. Reasoning & Verbosity Control**

These parameters give granular control over the model's thought process and response length.

* **Reasoning Effort (Dropdown):**
    * **Label:** `Reasoning Effort`
    * **Description:** Controls how many reasoning tokens the model generates before responding.
    * **Options:**
        * `high`: For complex tasks like coding and multi-step planning that require thorough reasoning.
        * `medium`: The default setting, a good balance for most tasks.
        * `low`: For faster, lower-latency responses.
        * `minimal`: Produces very few reasoning tokens for the fastest possible time-to-first-token, ideal for replacing `gpt-4.1`.
* **Text Verbosity (Dropdown):**
    * **Label:** `Text Verbosity`
    * **Description:** Determines the length of the final generated output, affecting overall latency. This can be overridden by in-prompt instructions.
    * **Options:**
        * `high`: For thorough explanations or extensive code refactoring.
        * `medium`: The default level.
        * `low`: For concise answers or simple code generation like SQL queries.

### **4. Structured Outputs (JSON Schema)**

This feature ensures the model's output is reliable, type-safe, and adheres to a specific JSON schema.

* **JSON Schema Enforcer (Toggle + Text Area):**
    * **Label:** `Enforce Structured JSON Output`
    * **Description:** When enabled, the tool will use the `response_format: { type: "json_schema", ... }` parameter to constrain the model's output to a user-provided JSON Schema. This is more reliable than JSON mode and guarantees schema adherence.
    * **Input Field:** A text area for the user to paste their valid JSON Schema.
* **Pydantic/Zod Support (Helper Functionality):**
    * **Label:** `Generate Schema from Pydantic/Zod`
    * **Description:** A helper tool where users can paste Python Pydantic models or JavaScript Zod schemas, which the tool then converts into the required JSON Schema format for the API call. This is the recommended way to avoid schema divergence.
* **Refusal Handling (UI Note):**
    * **Description:** The tool should include a note reminding the user that safety-based refusals will appear in a separate `refusal` field in the API response, not conforming to the schema. The application code must handle this case.

### **5. Agentic & Tool Use Features**

These options are designed for building complex, multi-step agents that can interact with external tools.

* **Agentic Eagerness Control (Template Inserter):**
    * **Label:** `Agent Eagerness`
    * **Description:** Buttons to insert prompt snippets that control the agent's proactivity.
    * **Options:**
        * **`Make Less Eager`:** Inserts instructions to parallelize discovery, use early stop criteria, and set tool call budgets to reduce latency.
        * **`Make More Eager`:** Inserts a `<persistence>` block instructing the agent to continue until the query is fully resolved and to not ask for clarification.
* **Tool Preamble Enforcer (Checkbox):**
    * **Label:** `Enable Tool Preambles`
    * **Description:** If checked, adds an instruction like "Before you call a tool, explain why you are calling it." This provides transparency into the model's reasoning.
* **Metaprompting Helper (Utility):**
    * **Label:** `Optimize with GPT-5`
    * **Description:** A utility based on the metaprompting technique. The user provides their current prompt, describes the desired behavior, and describes the actual (undesired) behavior. The tool then uses GPT-5 with a template to suggest minimal edits to fix the prompt.

---