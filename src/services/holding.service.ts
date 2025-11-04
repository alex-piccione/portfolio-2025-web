import type Holding from "@/entities/Holding"
import type { create, update } from "./api/schemas/holding.schema"
import HoldingApi from "./api/holding.api"
import { debug } from "@/utils/utils"
import { useCurrencyStore } from "@/stores/currency.store"
import { useCustodianStore } from "@/stores/custodian.store"
import { ApiResult } from "./api/helper"

const custodianStore = useCustodianStore()
const currencyStore = useCurrencyStore()

export default class HoldingService {
    static async create(request: create.Request) {
        return await HoldingApi.create(request)
    }

    static async get(id: number) {
        return await HoldingApi.get(id)
    }

    static async update(request: update.Request) {
        return await HoldingApi.update(request)
    }

    static async delete(id: number) {
        return await HoldingApi.delete(id)
    }

    static async list(userId: string): Promise<Holding[]> {
        debug("HoldingService.list - userId: " + userId)

        const result = await HoldingApi.list()
        const holdings = ApiResult.dataOrError(result)

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
}
