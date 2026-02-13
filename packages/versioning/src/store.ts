import { v4 as uuidv4 } from "uuid"
import { type Version } from "./types.js"

export class VersionStore {
    private versions: Version[] = []
    private currentVersionId: string | null = null

    create(ast: any, explanation: string) {
        const version: Version = {
            id: uuidv4(),
            ast,
            explanation,
            timestamp: Date.now()
        }

        this.versions.push(version)
        this.currentVersionId = version.id

        return version
    }

    get(id: string) {
        return this.versions.find(v => v.id === id) || null
    }

    getCurrent() {
        if (!this.currentVersionId) return null
        return this.get(this.currentVersionId)
    }

    getAll() {
        return this.versions
    }

    rollback(id: string) {
        const version = this.get(id)
        if (!version) {
            throw new Error("Version not found")
        }

        this.currentVersionId = id
        return version
    }
}
