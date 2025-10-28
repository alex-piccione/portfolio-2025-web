import type Custodian from "@/entities/Custodian"
import api from "./apiClient"
import type { create } from "./schemas/custodian.schema"
import { Result } from "@/utils/result"

export default class CustodianApi {
    static async create(request: create.Request): Promise<Result<number>> {
        try {
            const response = await api.client.post("/custodian", request)
            return Result.success(api.getNewId(response))
        } catch (error) {
            return api.handleError(error)
        }
    }

    static async list(): Promise<Result<Custodian[]>> {
        try {
            const response = await api.client.get(`/custodian`)
            // TODO: api.getResult(response)
            return Result.success(api.deserialize<Custodian[]>(response.data))
        } catch (error) {
            return api.handleError(error)
        }
    }
}
