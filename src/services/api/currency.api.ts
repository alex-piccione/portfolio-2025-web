import type Currency from "@/entities/Currency"
import type { UserCurrency } from "@/entities/Currency"
import api from "./apiClient"
import { Result } from "@/utils/result"

export default class CurrencyApi {
    /*
    static async create(request: create.Request) {
        try {
            const response = await api.client.post("/currency", request)
            return api.getNewId(response)
        } catch(error) {
            return api.handleError(error)
        }
    }*/

    static async list_all(): Promise<Result<Currency[]>> {
        try {
            const response = await api.client.get(`/currency/all`)
            // TODO: api.getResult(response)
            return Result.success(api.deserialize<Currency[]>(response.data))
        } catch (error) {
            return api.handleError(error)
        }
    }

    static async list_OfUser(): Promise<Result<UserCurrency[]>> {
        try {
            const response = await api.client.get(`/currency`)
            //const parseResult = list.ResponseSchema.safeParse(response.data)
            //return api.getResult(parseResult)
            //api.getResult(response)
            return Result.success(
                api.deserialize<UserCurrency[]>(response.data),
            )
        } catch (error) {
            return api.handleError(error)
        }
    }

    static async enableForUser(
        currencyId: number,
        enable: boolean,
    ): Promise<Result<void>> {
        try {
            await api.client.put(
                `/currency/${currencyId}/${enable ? "enable" : "disable"}`,
            )
            return Result.success(undefined)
        } catch (error) {
            return api.handleError(error)
        }
    }
}
