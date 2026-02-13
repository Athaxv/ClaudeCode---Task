import { type UIComponentNode } from "@repo/schema"

export interface Version {
    id: string
    ast: UIComponentNode
    explanation: string
    timestamp: number
}

export interface DiffResult {
    added: string[]
    removed: string[]
    modified: string[]
}
