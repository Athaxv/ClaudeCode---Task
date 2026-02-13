import { z } from "zod"

export const ChartPropsSchema = z
    .object({
        type: z.enum(["bar", "line", "pie"]),
        data: z.array(z.record(z.any()))
    })
    .strict()
