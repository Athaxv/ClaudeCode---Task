import { type UIComponentNode } from "@repo/schema"
import { type DiffResult } from "./types.js"

function flattenTree(
    node: UIComponentNode,
    map: Map<string, UIComponentNode>
) {
    map.set(node.id, node)

    node.children?.forEach((child: UIComponentNode) => flattenTree(child, map))
}

export function diffAST(
    oldAst: UIComponentNode,
    newAst: UIComponentNode
): DiffResult {
    const oldMap = new Map<string, UIComponentNode>()
    const newMap = new Map<string, UIComponentNode>()

    flattenTree(oldAst, oldMap)
    flattenTree(newAst, newMap)

    const added: string[] = []
    const removed: string[] = []
    const modified: string[] = []

    for (const id of newMap.keys()) {
        if (!oldMap.has(id)) {
            added.push(id)
        }
    }

    for (const id of oldMap.keys()) {
        if (!newMap.has(id)) {
            removed.push(id)
        }
    }

    for (const id of newMap.keys()) {
        if (oldMap.has(id)) {
            const oldNode = oldMap.get(id)!
            const newNode = newMap.get(id)!

            if (JSON.stringify(oldNode.props) !== JSON.stringify(newNode.props)) {
                modified.push(id)
            }
        }
    }

    return { added, removed, modified }
}
