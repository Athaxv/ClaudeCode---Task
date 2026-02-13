import { z } from "zod"

export const ComponentTypeEnum = z.enum([
    "Button",
    "Card",
    "Input",
    "Table",
    "Modal",
    "Sidebar",
    "Navbar",
    "Chart"
])

export type ComponentType = z.infer<typeof ComponentTypeEnum>
