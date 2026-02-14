import { Router } from "express"
import { versionStore } from "@repo/versioning"

const router: Router = Router()

router.get("/", (req, res) => {
    const versions = versionStore.getAll()

    return res.json(
        versions.map((v: any) => ({
            id: v.id,
            timestamp: v.timestamp
        }))
    )
})

export default router
