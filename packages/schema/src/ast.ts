// packages/schema/ast.ts

export interface UIComponentNode {
    id: string
    type: ComponentType
    props: Record<string, any>
    children?: UIComponentNode[]
}
