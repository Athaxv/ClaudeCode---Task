import { Router } from "express"
import { versionStore } from "@repo/versioning"

const router: Router = Router()

router.post("/", (req, res) => {
    try {
        const { versionId, sessionId } = req.body

        if (!sessionId) {
            return res.status(400).json({ error: "SessionId required" })
        }

        if (!versionId) {
            return res.status(400).json({ error: "versionId required" })
        }

        const version = versionStore.rollback(sessionId, versionId)

        return res.json({
            versionId: version.id,
            ast: version.ast,
            explanation: version.explanation,
            diff: version.diff,
            timestamp: version.timestamp
        })

    } catch (error: any) {
        if (error.message === "Version not found") {
            return res.status(404).json({ error: "Version not found" })
        }

        return res.status(500).json({
            error: error.message || "Internal Server Error"
        })
    }
})

export default router
