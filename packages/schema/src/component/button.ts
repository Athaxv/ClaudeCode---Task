import { z } from "zod"

export const ButtonPropsSchema = z
    .object({
        label: z.string(),
        variant: z.enum(["default", "ghost", "outline"]).optional(),
        onClickAction: z.string().optional()
    })
    .strict()
