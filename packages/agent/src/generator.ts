import { callLLM } from "./llm.js"
import { buildGeneratorPrompt } from "./generatorPrompt.js"
import { parseUIAst } from "@repo/schema"
import { injectIds } from "@repo/schema/idInjector"
import { safeLLMCall } from "./safeCall.js"

export async function runGenerator(
    plan: any,
    currentAst: any | null
) {
    const prompt = buildGeneratorPrompt(
        JSON.stringify(plan),
        currentAst ? JSON.stringify(currentAst) : null
    )

    const raw = await safeLLMCall(() =>
        callLLM(
            "You are a strict JSON generator.",
            prompt
        )
    )

    let parsed

    try {
        parsed = JSON.parse(raw)
    } catch {
        throw new Error("Generator returned invalid JSON")
    }

    const astWithIds = injectIds(parsed)
    const validatedAst = parseUIAst(astWithIds)

    return validatedAst
}
