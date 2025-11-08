//import z from "zod"
//import helper from "./helper"

import z from "zod"

// It's ok to use namespaces purely for type grouping — no runtime logic.
/* eslint-disable @typescript-eslint/no-namespace */
export namespace create {
    export interface Request {
        name: string
        custodian: string
        account: string | null
        kind: string
        colorCode: string
        description: string | null
    }
}

export namespace update {
    export interface Request extends create.Request {
        id: number
    }
}

const readSchema = z.object({
    id: z.int32(),
    name: z.string(),
    custodian: z.string(),
    account: z.string(),
    kind: z.string(),
    colorCode: z.string(),
    description: z.string().nullable(),
})

export namespace single {
    export const ResponseSchema = readSchema
    export type Response = z.infer<typeof readSchema>
}
