# Using the Evaluation Tool

> The [Anthropic Console](https://console.anthropic.com/dashboard) features an **Evaluation tool** that allows you to test your prompts under various scenarios.

## Accessing the Evaluate Feature

To get started with the Evaluation tool:

1. Open the Anthropic Console and navigate to the prompt editor.
2. After composing your prompt, look for the 'Evaluate' tab at the top of the screen.

<img src="https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/access_evaluate.png?maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=3ac4039f82825d73f107ec786e4b78f9" alt="Accessing Evaluate Feature" width="1999" height="1061" data-path="images/access_evaluate.png" srcset="https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/access_evaluate.png?w=280&maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=c766858d387bdf6ad9d47d3b0352bb9a 280w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/access_evaluate.png?w=560&maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=0dc34fef05de854af214384924c77a7b 560w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/access_evaluate.png?w=840&maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=2f491d9a883792441c12a99d1b13fca9 840w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/access_evaluate.png?w=1100&maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=0020dd5d31c45db233f649d0c39e3774 1100w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/access_evaluate.png?w=1650&maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=ddee628b28493ff306bcbb33da40c385 1650w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/access_evaluate.png?w=2500&maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=5350086df31aeec959f7c5f1189a58ee 2500w" data-optimize="true" data-opv="2" />

<Tip>
  Ensure your prompt includes at least 1-2 dynamic variables using the double brace syntax: \{\{variable}}. This is required for creating eval test sets.
</Tip>

## Generating Prompts

The Console offers a built-in [prompt generator](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-generator) powered by Claude Opus 4:

<Steps>
  <Step title="Click 'Generate Prompt'">
    Clicking the 'Generate Prompt' helper tool will open a modal that allows you to enter your task information.
  </Step>

  <Step title="Describe your task">
    Describe your desired task (e.g., "Triage inbound customer support requests") with as much or as little detail as you desire. The more context you include, the more Claude can tailor its generated prompt to your specific needs.
  </Step>

  <Step title="Generate your prompt">
    Clicking the orange 'Generate Prompt' button at the bottom will have Claude generate a high quality prompt for you. You can then further improve those prompts using the Evaluation screen in the Console.
  </Step>
</Steps>

This feature makes it easier to create prompts with the appropriate variable syntax for evaluation.

<img src="https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/promptgenerator.png?maxW=1654&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=b419e1df5e89f3168872228b9f94e84f" alt="Prompt Generator" width="1654" height="904" data-path="images/promptgenerator.png" srcset="https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/promptgenerator.png?w=280&maxW=1654&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=0ab88586edf4c42391750fdd9c19dd0f 280w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/promptgenerator.png?w=560&maxW=1654&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=6384b953d7ecdabfa763e4838111b8fb 560w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/promptgenerator.png?w=840&maxW=1654&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=7fb267d0e8b45aceafde82593e2f51d5 840w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/promptgenerator.png?w=1100&maxW=1654&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=d52b452dae430781b30aa067f98a64e5 1100w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/promptgenerator.png?w=1650&maxW=1654&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=bf84027f99e4de1e090e967d177931a3 1650w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/promptgenerator.png?w=2500&maxW=1654&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=8c627341df0336095e4ed5b225f576c4 2500w" data-optimize="true" data-opv="2" />

## Creating Test Cases

When you access the Evaluation screen, you have several options to create test cases:

1. Click the '+ Add Row' button at the bottom left to manually add a case.
2. Use the 'Generate Test Case' feature to have Claude automatically generate test cases for you.
3. Import test cases from a CSV file.

To use the 'Generate Test Case' feature:

<Steps>
  <Step title="Click on 'Generate Test Case'">
    Claude will generate test cases for you, one row at a time for each time you click the button.
  </Step>

  <Step title="Edit generation logic (optional)">
    You can also edit the test case generation logic by clicking on the arrow dropdown to the right of the 'Generate Test Case' button, then on 'Show generation logic' at the top of the Variables window that pops up. You may have to click \`Generate' on the top right of this window to populate initial generation logic.

    Editing this allows you to customize and fine tune the test cases that Claude generates to greater precision and specificity.
  </Step>
</Steps>

Here's an example of a populated Evaluation screen with several test cases:

<img src="https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/eval_populated.png?maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=7898be62f2163f36c1f67a0b4f4f92fa" alt="Populated Evaluation Screen" width="1999" height="1061" data-path="images/eval_populated.png" srcset="https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/eval_populated.png?w=280&maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=1633bea8f11ddcd8ad28f606262cba86 280w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/eval_populated.png?w=560&maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=001aa9191ec36f644ecbcc4009541b64 560w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/eval_populated.png?w=840&maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=3572cf4a58f814f0ccf68ac050171819 840w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/eval_populated.png?w=1100&maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=d2b88c280420e54440c2be10b260911b 1100w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/eval_populated.png?w=1650&maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=703e485af82ad8d41f0826ef77686946 1650w, https://mintcdn.com/anthropic/PF_69UDRSEsLpN9D/images/eval_populated.png?w=2500&maxW=1999&auto=format&n=PF_69UDRSEsLpN9D&q=85&s=f36532476dc353330f2906698b274249 2500w" data-optimize="true" data-opv="2" />

<Note>
  If you update your original prompt text, you can re-run the entire eval suite against the new prompt to see how changes affect performance across all test cases.
</Note>

## Tips for Effective Evaluation

<Accordion title="Prompt Structure for Evaluation">
  To make the most of the Evaluation tool, structure your prompts with clear input and output formats. For example:

  ```
  In this task, you will generate a cute one sentence story that incorporates two elements: a color and a sound.
  The color to include in the story is:
  <color>
  {{COLOR}}
  </color>
  The sound to include in the story is:
  <sound>
  {{SOUND}}
  </sound>
  Here are the steps to generate the story:
  1. Think of an object, animal, or scene that is commonly associated with the color provided. For example, if the color is "blue", you might think of the sky, the ocean, or a bluebird.
  2. Imagine a simple action, event or scene involving the colored object/animal/scene you identified and the sound provided. For instance, if the color is "blue" and the sound is "whistle", you might imagine a bluebird whistling a tune.
  3. Describe the action, event or scene you imagined in a single, concise sentence. Focus on making the sentence cute, evocative and imaginative. For example: "A cheerful bluebird whistled a merry melody as it soared through the azure sky."
  Please keep your story to one sentence only. Aim to make that sentence as charming and engaging as possible while naturally incorporating the given color and sound.
  Write your completed one sentence story inside <story> tags.

  ```

  This structure makes it easy to vary inputs (\{\{COLOR}} and \{\{SOUND}}) and evaluate outputs consistently.
</Accordion>

<Tip>
  Use the 'Generate a prompt' helper tool in the Console to quickly create prompts with the appropriate variable syntax for evaluation.
</Tip>

## Understanding and comparing results

The Evaluation tool offers several features to help you refine your prompts:

1. **Side-by-side comparison**: Compare the outputs of two or more prompts to quickly see the impact of your changes.
2. **Quality grading**: Grade response quality on a 5-point scale to track improvements in response quality per prompt.
3. **Prompt versioning**: Create new versions of your prompt and re-run the test suite to quickly iterate and improve results.

By reviewing results across test cases and comparing different prompt versions, you can spot patterns and make informed adjustments to your prompt more efficiently.

Start evaluating your prompts today to build more robust AI applications with Claude!