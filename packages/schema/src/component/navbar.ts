import { z } from "zod"

export const NavbarPropsSchema = z
    .object({
        title: z.string()
    })
    .strict()
