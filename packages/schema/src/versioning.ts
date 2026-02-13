// packages/versioning/types.ts

import { type UIComponentNode } from "./ast.js"

export interface Version {
    id: string
    ast: UIComponentNode
    explanation: string
    timestamp: number
}
