export function buildExplainerPrompt(
    diffJson: string,
    plannerReasoning: string
) {
    return `
You are a UI reasoning explainer.
Explain changes only based on diff and actual props.
Do NOT invent additional behavior.

Explain:
- What changed.
- Why it changed.
- What was preserved.

Planner reasoning:
${plannerReasoning}

Diff:
${diffJson}

Respond in clear plain English.
`
}
