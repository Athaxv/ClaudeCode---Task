// packages/versioning/types.ts

import { UIComponentNode } from "@repo/schema"

export interface Version {
    id: string
    ast: UIComponentNode
    explanation: string
    timestamp: number
}
