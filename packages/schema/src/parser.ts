import { UIRootSchema } from "./root.js"

export function parseUIAst(input: unknown) {
    const result = UIRootSchema.safeParse(input)

    if (!result.success) {
        throw new Error(
            "Invalid UI AST: " + JSON.stringify(result.error.format())
        )
    }

    return result.data
}
