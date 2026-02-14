import { parseUIAst, UIComponentNode } from "@repo/schema"
import crypto from "node:crypto"
import type { PlannerOperation } from "./planner.js"

function findNodeById(node: UIComponentNode, id: string): UIComponentNode | null {
    if (node.id === id) return node
    if (!node.children) return null
    for (const child of node.children) {
        const found = findNodeById(child, id)
        if (found) return found
    }
    return null
}

function removeNodeById(node: UIComponentNode, id: string): UIComponentNode | null {
    if (node.id === id) return null
    if (!node.children) return node
    node.children = node.children.filter(child => child.id !== id)
    node.children = node.children.map(child => removeNodeById(child, id)).filter((n: UIComponentNode | null): n is UIComponentNode => n !== null)
    return node
}

export function applyOperations(
    ast: UIComponentNode,
    operations: PlannerOperation[]
): UIComponentNode {
    let updatedAst = structuredClone(ast)

    for (const op of operations) {
        if (op.action === "add") {
            const parent = findNodeById(updatedAst, op.parentId)
            if (!parent) {
                throw new Error("Invalid parentId from planner")
            }
            const newNode = {
                id: crypto.randomUUID(),
                type: op.type,
                props: op.props
            }
            parent.children = parent.children || []

            if (typeof op.index === "number") {
                parent.children.splice(op.index, 0, newNode)
            } else {
                parent.children.push(newNode)
            }
        }

        if (op.action === "remove") {
            updatedAst = removeNodeById(updatedAst, op.targetId)
            if (!updatedAst) {
                throw new Error("Invalid targetId from planner")
            }
        }

        if (op.action === "modify") {
            const target = findNodeById(updatedAst, op.targetId)
            if (!target) {
                throw new Error("Invalid targetId from planner")
            }
            if (target) {
                target.props = { ...target.props, ...op.props }
            }
        }
    }

    const validatedAst = parseUIAst(updatedAst)
    return validatedAst
}
