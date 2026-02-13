import { z } from "zod"

export const ChartPropsSchema = z
    .object({
        type: z.enum(["bar", "line", "pie"]),
        data: z.array(z.record(z.string(), z.any()))
    })
    .strict()
