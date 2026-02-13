// packages/schema/validator.ts

import { type UIComponentNode } from "./ast.js"
import { componentPropSchemas } from "./componentSchema.js"

export function validateNode(node: UIComponentNode) {
    if (!componentPropSchemas[node.type]) {
        throw new Error(`Invalid component type: ${node.type}`)
    }

    const allowedProps = componentPropSchemas[node.type]!

    for (const key of Object.keys(node.props)) {
        if (!allowedProps.includes(key)) {
            throw new Error(
                `Invalid prop "${key}" on component "${node.type}"`
            )
        }
    }

    node.children?.forEach(validateNode)
}
