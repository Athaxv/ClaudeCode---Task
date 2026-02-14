import { Router } from "express"
import { runPlanner, runGenerator, runExplainer, applyOperations } from "@repo/agent"
import { versionStore, diffAST, type DiffResult } from "@repo/versioning"
import { parseUIAst } from "@repo/schema"

const router: Router = Router()

router.post("/", async (req, res) => {
    try {
        const { message } = req.body

        if (!message) {
            return res.status(400).json({ error: "Message required" })
        }

        // 1️⃣ Get current version
        const currentVersion = versionStore.getCurrent()
        const currentAst = currentVersion?.ast ?? null
        console.log("Current AST before generation:", JSON.stringify(currentAst, null, 2))

        // 2️⃣ Run Planner
        const plan = await runPlanner(message, currentAst)
        console.log("Planner output:", JSON.stringify(plan, null, 2))

        // 3️⃣ Run Generator
        let newAst

        if (plan.modificationType === "full" || !currentAst) {
            newAst = await runGenerator(plan, currentAst)
        } else {
            newAst = applyOperations(currentAst, plan.operations)
        }
        console.log("New AST after generation:", JSON.stringify(newAst, null, 2))


        // 4️⃣ Compute diff
        let diff: DiffResult = { added: [], removed: [], modified: [] }

        if (currentAst) {
            diff = diffAST(currentAst, newAst)
        }
        console.log("Diff:", JSON.stringify(diff, null, 2))

        // 5️⃣ Run Explainer
        const explanation = await runExplainer(diff, plan.reasoning)
        console.log("Explanation:", explanation)

        // 6️⃣ Store version
        const newVersion = versionStore.create(newAst, explanation)

        return res.json({
            versionId: newVersion.id,
            ast: newVersion.ast,
            explanation: newVersion.explanation,
            diff: newVersion.diff,
            timestamp: newVersion.timestamp
        })

    } catch (error: any) {
        console.error(error)
        return res.status(500).json({
            error: error.message || "Internal Server Error"
        })
    }
})

router.post("/validate-ast", (req, res) => {
    try {
        const { ast } = req.body

        const validated = parseUIAst(ast)
        const version = versionStore.create(validated, "Manual AST edit")
        res.json(version)

    } catch (err: any) {
        res.status(400).json({
            error: err.message
        })
    }
})

export default router
