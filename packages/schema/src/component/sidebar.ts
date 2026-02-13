import { z } from "zod"

export const SidebarPropsSchema = z
    .object({
        items: z.array(z.string())
    })
    .strict()
