import { Router } from "express"
import { runPlanner, runGenerator, runExplainer, applyOperations } from "@repo/agent"
import { versionStore, diffAST, type DiffResult } from "@repo/versioning"
import { parseUIAst } from "@repo/schema"

const router: Router = Router()

router.post("/", async (req, res) => {
    try {
        const { message, sessionId } = req.body

        if (!message) {
            return res.status(400).json({ error: "Message required" })
        }

        if (!sessionId) {
            return res.status(400).json({ error: "SessionId required" })
        }

        // 1️⃣ Get current version
        const currentVersion = versionStore.getCurrent(sessionId)
        const currentAst = currentVersion?.ast ?? null

        // 2️⃣ Run Planner
        const plan = await runPlanner(message, currentAst)

        // 3️⃣ Generate or Apply Operations
        let newAst

        if (plan.modificationType === "full" || !currentAst) {
            newAst = await runGenerator(plan, currentAst)
        } else {
            newAst = applyOperations(currentAst, plan.operations)
        }

        // 4️⃣ Store version (this computes diff internally)
        const newVersion = versionStore.create(
            sessionId,
            newAst,
            "Pending explanation"
        )

        // 5️⃣ Run Explainer using stored diff
        const explanation = await runExplainer(
            newVersion.diff,
            plan.reasoning
        )

        // 6️⃣ Update explanation inside stored version
        newVersion.explanation = explanation

        return res.json(newVersion)

    } catch (error: any) {
        console.error(error)
        return res.status(500).json({
            error: error.message || "Internal Server Error"
        })
    }
})

router.post("/validate-ast", (req, res) => {
    try {
        const { ast, sessionId } = req.body

        if (!sessionId) {
            return res.status(400).json({ error: "SessionId required" })
        }

        const validated = parseUIAst(ast)

        const version = versionStore.create(
            sessionId,
            validated,
            "Manual AST edit"
        )

        res.json(version)

    } catch (err: any) {
        res.status(400).json({
            error: err.message
        })
    }
})


export default router
