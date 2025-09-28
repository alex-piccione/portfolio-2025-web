/*
import { z } from "zod"

// Define the schema with validation rules
export const CurrencySchema = z.object({
    id: z.number(),
    symbol: z.string().min(1),
    name: z.string().min(1), 
    kind: z.string(),
    is_active: z.boolean(),
    precision: z.number().int().min(0)
})

// Export the type inferred from the schema
export type Currency = z.infer<typeof CurrencySchema>

// Schema for array of currencies
export const CurrenciesSchema = z.array(CurrencySchema)
*/