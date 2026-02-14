import { z } from "zod"

export const ContainerPropsSchema = z.object({
    direction: z.enum(["row", "column"]),
    gap: z.number().optional(),
    padding: z.number().optional()
}).strict()
