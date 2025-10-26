import type Holding from "@/entities/Holding"
import type { create } from "./api/schemas/holding.schema"
import HoldingApi from "./api/holding.api"
import { debug } from "@/utils/utils"
import { useCurrencyStore } from "@/stores/currency.store"
import { Result } from "@/utils/result"

const currencyStore = useCurrencyStore()

export default class HoldingService {
    static async list(userId: string): Promise<Holding[]> {
        debug("HoldingService.list - userId: " + userId)

        const holdings = Result.dataOrError(await HoldingApi.list())

        const currencies = currencyStore.currencies // is this updated ?

        const getCurrency = (id: number) => {
            // currencies.find(c => c.id === id) ?? throw new Error(`Currency not found with id=${id}`);
            const currency = currencies.find((c) => c.id === id)
            if (!currency) throw new Error(`Currency not found with id=${id}`)
            return currency
        }

        const holdingsFull: Holding[] = holdings.map((holding) => {
            return {
                id: holding.id,
                currency: getCurrency(holding.currencyId),
                custodian: { id: 1, name: "Fineco" }, // TODO: use custodian store
                date: holding.date,
                action: holding.action,
                amount: parseFloat(holding.amount),
                note: holding.note,
            }
        })

        return holdingsFull
    }

    static async create(request: create.Request) {
        return await HoldingApi.create(request)
    }
}
