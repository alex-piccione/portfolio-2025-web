//import type { HoldingAction } from "@/entities/Holding"

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
