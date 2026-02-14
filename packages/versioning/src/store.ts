import { v4 as uuidv4 } from "uuid"
import { diffAST } from "./diff.js"
import { type Version } from "./types.js"

export class VersionStore {
    private sessions: Map<string, Version[]> = new Map()
    private currentVersion: Map<string, string> = new Map()

    create(sessionId: string, ast: any, explanation: string) {
        const versions = this.sessions.get(sessionId) || []

        const previous =
            versions.length > 0
                ? versions[versions.length - 1].ast
                : null

        const diff = previous
            ? diffAST(previous, ast)
            : { added: [], removed: [], modified: [] }

        const version: Version = {
            id: uuidv4(),
            ast,
            explanation,
            timestamp: Date.now(),
            diff
        }

        versions.push(version)

        this.sessions.set(sessionId, versions)
        this.currentVersion.set(sessionId, version.id)

        return version
    }

    get(sessionId: string, id: string) {
        const versions = this.sessions.get(sessionId) || []
        return versions.find(v => v.id === id) || null
    }

    getCurrent(sessionId: string) {
        const currentId = this.currentVersion.get(sessionId)
        if (!currentId) return null
        return this.get(sessionId, currentId)
    }

    getAll(sessionId: string) {
        return this.sessions.get(sessionId) || []
    }

    rollback(sessionId: string, id: string) {
        const version = this.get(sessionId, id)
        if (!version) {
            throw new Error("Version not found")
        }

        this.currentVersion.set(sessionId, id)
        return version
    }

    clear(sessionId: string) {
        this.sessions.delete(sessionId)
        this.currentVersion.delete(sessionId)
    }
}

export const versionStore = new VersionStore()
