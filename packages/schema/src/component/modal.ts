import { z } from "zod"

export const ModalPropsSchema = z
    .object({
        title: z.string(),
        isOpen: z.boolean()
    })
    .strict()
