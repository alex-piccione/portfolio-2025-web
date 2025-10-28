import type Currency from "@/entities/Currency"
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

    static async list(): Promise<Result<Currency[]>> {
        try {
            const response = await api.client.get(`/currency`)
            // TODO: api.getResult(response)
            return Result.success(api.deserialize<Currency[]>(response.data))
        } catch (error) {
            return api.handleError(error)
        }
    }
}
