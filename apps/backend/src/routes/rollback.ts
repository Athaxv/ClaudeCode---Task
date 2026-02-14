import { Router } from "express"
import { versionStore } from "@repo/versioning"

const router: Router = Router()

router.post("/", (req, res) => {
    try {
        const { versionId } = req.body

        if (!versionId) {
            return res.status(400).json({ error: "versionId required" })
        }

        const version = versionStore.rollback(versionId)

        return res.json({
            versionId: version.id,
            ast: version.ast,
            explanation: version.explanation
        })

    } catch (error: any) {
        return res.status(500).json({
            error: error.message
        })
    }
})

export default router
