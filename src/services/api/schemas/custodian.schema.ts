//import z from "zod"
//import helper from "./helper"

// It's ok to use namespaces purely for type grouping — no runtime logic.
/* eslint-disable @typescript-eslint/no-namespace */
export namespace create {
    export interface Request {
        name: string
        description: string | null
        kind: string
        url: string | null
        accountCountryCode: string
        walletAddress: string | null
    }

    /*export const ResponseSchema = z.object({
            id: z.int32(),
            date: helper.z_date(),
            custodianId: z.int32(),
            currencyId: z.int32(),
            action: z.string().min(1),
            amount: z.string(),
            note: z.string().nullable(),
        })    */
}
