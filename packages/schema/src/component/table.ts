import { z } from "zod"

export const TablePropsSchema = z
    .object({
        columns: z.array(z.string()),
        data: z.array(z.record(z.string(), z.any()))
    })
    .strict()
