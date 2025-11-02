import z from "zod"

export interface NewIdResponse {
    newId: number
}

export const NewIdResponseSchema = z.object({
  newId: z.number(),
})
