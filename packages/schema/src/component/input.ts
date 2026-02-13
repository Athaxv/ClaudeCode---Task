import { z } from "zod"

export const InputPropsSchema = z
    .object({
        placeholder: z.string()
    })
    .strict()
