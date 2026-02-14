import { type UIComponentNode } from "@repo/schema"

export interface Version {
    id: string
    ast: UIComponentNode
    explanation: string
    timestamp: number
    diff: {
        added: string[]
        removed: string[]
        modified: string[]
    }
}

export interface DiffResult {
    added: string[]
    removed: string[]
    modified: string[]
}
