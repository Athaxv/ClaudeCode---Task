import { callLLM } from "./llm.js"
import { buildPlannerPrompt } from "./plannerPrompt.js"
import { safeLLMCall } from "./safeCall.js";

export type PlannerOperation =
  | { action: "add"; parentId: string; type: string; props?: Record<string, any>; index?: number }
  | { action: "remove"; targetId: string }
  | { action: "modify"; targetId: string; props: Record<string, any> }

export async function runPlanner(
  userMessage: string,
  currentAstJson: any | null
) {
  const prompt = buildPlannerPrompt(
    userMessage,
    currentAstJson ? JSON.stringify(currentAstJson) : null
  )

  const raw = await safeLLMCall(() =>
    callLLM("You are a strict JSON generator.", prompt)
  )

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error("Planner returned invalid JSON")
  }
}
