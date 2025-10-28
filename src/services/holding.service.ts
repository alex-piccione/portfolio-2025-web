import type Holding from "@/entities/Holding"
import type { create } from "./api/schemas/holding.schema"
import HoldingApi from "./api/holding.api"
import { debug } from "@/utils/utils"
import { useCurrencyStore } from "@/stores/currency.store"
import { Result } from "@/utils/result"
import { useCustodianStore } from "@/stores/custodian.store"

const custodianStore = useCustodianStore()
const currencyStore = useCurrencyStore()

export default class HoldingService {
    static async list(userId: string): Promise<Holding[]> {
        debug("HoldingService.list - userId: " + userId)

        const holdings = Result.valueOrError(await HoldingApi.list())

        const holdingsFull: Holding[] = holdings.map((holding) => {
            return {
                id: holding.id,
                currency: currencyStore.get(holding.currencyId),
                custodian: custodianStore.get(holding.custodianId),
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
