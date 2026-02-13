import { z } from "zod";

// Base Props
const BaseProps = z.object({
    id: z.string().optional(),
    className: z.string().optional(),
});

// 1. Button
export const ButtonSchema = BaseProps.extend({
    type: z.literal("Button"),
    props: z.object({
        children: z.string(),
        variant: z.enum(["default", "destructive", "outline", "secondary", "ghost", "link"]).optional(),
        size: z.enum(["default", "sm", "lg", "icon"]).optional(),
        appName: z.string().optional(), // For the legacy prop we kept
        onClickAction: z.string().optional(), // For identifying actions
    }),
});

// 2. Card
export const CardSchema = BaseProps.extend({
    type: z.literal("Card"),
    props: z.object({
        title: z.string(),
        description: z.string().optional(),
        content: z.string().optional(), // Text content
        footer: z.string().optional(),
        children: z.any().optional(), // Can hold other nodes
    }),
    children: z.array(z.any()).optional(), // Recursive definition handled later
});

// 3. Input
export const InputSchema = BaseProps.extend({
    type: z.literal("Input"),
    props: z.object({
        type: z.enum(["text", "password", "email", "number"]).optional(),
        placeholder: z.string().optional(),
        label: z.string().optional(),
        name: z.string().optional(),
    }),
});

// 4. Modal
export const ModalSchema = BaseProps.extend({
    type: z.literal("Modal"),
    props: z.object({
        isOpen: z.boolean().default(false),
        title: z.string().optional(),
        triggerLabel: z.string().optional(), // To trigger it in preview
    }),
    children: z.array(z.any()).optional(),
});

// 5. Table
export const TableSchema = BaseProps.extend({
    type: z.literal("Table"),
    props: z.object({
        columns: z.array(z.object({
            header: z.string(),
            accessorKey: z.string(),
        })),
        data: z.array(z.record(z.string(), z.any())),
        caption: z.string().optional(),
    }),
});

// 6. Chart
export const ChartSchema = BaseProps.extend({
    type: z.literal("Chart"),
    props: z.object({
        type: z.enum(["bar", "line", "pie"]).default("bar"),
        data: z.array(z.any()),
        categories: z.array(z.string()),
        index: z.string(),
        colors: z.array(z.string()).optional(),
    }),
});

// 7. Layout (Sidebar/Navbar)
export const LayoutSchema = BaseProps.extend({
    type: z.literal("Layout"),
    props: z.object({
        type: z.enum(["sidebar", "navbar", "stacked"]),
        title: z.string().optional(),
        items: z.array(z.object({
            label: z.string(),
            href: z.string(),
            icon: z.string().optional(),
        })).optional(),
    }),
    children: z.array(z.any()).optional(),
});

// 8. Container / Div (for general layout)
export const ContainerSchema = BaseProps.extend({
    type: z.literal("Container"),
    props: z.object({
        layout: z.enum(["flex", "grid", "block"]).default("block"),
        direction: z.enum(["row", "col"]).optional(),
        gap: z.enum(["2", "4", "6", "8"]).optional(),
        padding: z.enum(["2", "4", "6", "8"]).optional(),
    }),
    children: z.array(z.any()).optional(),
});

// Union of all components
// We need a lazy reference for recursion
export const ComponentSchema: z.ZodType<any> = z.lazy(() =>
    z.discriminatedUnion("type", [
        ButtonSchema,
        CardSchema,
        InputSchema,
        ModalSchema,
        TableSchema,
        ChartSchema,
        LayoutSchema,
        ContainerSchema,
    ])
);

export type ComponentNode = z.infer<typeof ComponentSchema>;

// The "Plan" or "Root" schema
export const UISchema = z.object({
    id: z.string(),
    name: z.string(),
    root: ComponentSchema,
});

export type UI = z.infer<typeof UISchema>;
