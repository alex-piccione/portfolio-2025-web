//import type { HoldingAction } from "@/entities/Holding"

import { z } from "zod"

const z_date = () => z.string().transform((str) => new Date(str))

// It's ok to use namespaces purely for type grouping — no runtime logic.
/* eslint-disable @typescript-eslint/no-namespace */
export namespace create {
    export interface Request {
        //userId: string,
        date: string
        custodianId: number
        currencyId: number
        action: string // HoldingAction,
        amount: number
        note: string | null
    }
}

export namespace list {
    export const ResponseSchema = z.array(
        z.object({
            id: z.int32(),
            date: z_date(),
            custodianId: z.int32(),
            currencyId: z.int32(),
            action: z.string().min(1),
            amount: z.string(),
            note: z.string().nullable(),
        }),
    )
    export type Response = z.infer<typeof list.ResponseSchema>
}
