import { Router } from "express"
import { versionStore } from "@repo/versioning"

const router: Router = Router()

router.get("/", (req, res) => {
    const sessionId = req.query.sessionId as string

    if (!sessionId) {
        return res.status(400).json({ error: "SessionId required" })
    }

    const versions = versionStore.getAll(sessionId)

    return res.json(
        versions.map((v) => ({
            id: v.id,
            timestamp: v.timestamp,
            explanation: v.explanation,
            diff: v.diff
        }))
    )
})

export default router
