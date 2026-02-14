import type { UIComponentNode } from "./ast.js"
import { randomUUID } from "crypto"

export function injectIds(node: any): UIComponentNode {
    const id = node.id ?? randomUUID()

    return {
        id,
        type: node.type,
        props: node.props,
        children: node.children?.map(injectIds)
    }
}
