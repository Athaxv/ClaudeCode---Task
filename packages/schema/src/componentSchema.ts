// packages/schema/componentSchemas.ts

export const componentPropSchemas: Record<string, string[]> = {
    Button: ["label", "variant", "onClickAction"],
    Card: ["title"],
    Input: ["placeholder"],
    Table: ["columns", "data"],
    Modal: ["title", "isOpen"],
    Sidebar: ["items"],
    Navbar: ["title"],
    Chart: ["type", "data"]
}
