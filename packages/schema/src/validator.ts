// packages/schema/validator.ts

import { UIComponentNode } from "./ast"
import { componentPropSchemas } from "./componentSchemas"

export function validateNode(node: UIComponentNode) {
    if (!componentPropSchemas[node.type]) {
        throw new Error(`Invalid component type: ${node.type}`)
    }

    const allowedProps = componentPropSchemas[node.type]

    for (const key of Object.keys(node.props)) {
        if (!allowedProps.includes(key)) {
            throw new Error(
                `Invalid prop "${key}" on component "${node.type}"`
            )
        }
    }

    node.children?.forEach(validateNode)
}
