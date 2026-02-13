import { z } from "zod"

export const CardPropsSchema = z
    .object({
        title: z.string()
    })
    .strict()
