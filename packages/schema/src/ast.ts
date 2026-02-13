import { z } from "zod"
import { ComponentTypeEnum } from "./types.js"
import { ComponentPropsMap } from "./componentProp.js"

export const UIComponentNodeSchema: z.ZodType<any> = z.lazy(() =>
    z
        .object({
            id: z.string().uuid(),
            type: ComponentTypeEnum,
            props: z.any(),
            children: z.array(UIComponentNodeSchema).optional()
        })
        .strict()
        .superRefine((node, ctx) => {
            const schema =
                ComponentPropsMap[node.type as keyof typeof ComponentPropsMap]

            const result = schema.safeParse(node.props)

            if (!result.success) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: `Invalid props for component ${node.type}`
                })
            }
        })
)

export type UIComponentNode = z.infer<typeof UIComponentNodeSchema>
