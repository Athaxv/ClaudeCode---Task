import { callLLM } from "./llm.js"
import { buildExplainerPrompt } from "./explainerPrompt.js"
import { safeLLMCall } from "./safeCall.js"

export async function runExplainer(
    diff: any,
    plannerReasoning: string
) {
    const prompt = buildExplainerPrompt(
        JSON.stringify(diff),
        plannerReasoning
    )

    const explanation = await safeLLMCall(() =>
        callLLM(
            "You are a helpful UI assistant.",
            prompt
        )
    )

    return explanation
}
