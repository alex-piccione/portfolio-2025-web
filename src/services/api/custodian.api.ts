import type Custodian from "@/entities/Custodian"
import api from "./apiClient"
import { single, type create, type update } from "./schemas/custodian.schema"
import { ApiResult } from "./helper"

export default class CustodianApi {
    static async create(request: create.Request): Promise<ApiResult<number>> {
        try {
            const response = await api.client.post("/custodian", request)
            return ApiResult.success(api.getNewId(response))
        } catch (error) {
            return api.handleError(error)
        }
    }

    static async get(id: number) {
        try {
            const response = await api.client.get(`/custodian/${id}`)
            const parseResult = single.ResponseSchema.safeParse(response.data)
            return api.getResult(parseResult)
        } catch (error) {
            return api.handleError(error)
        }
    }
    
    static async update(request: update.Request): Promise<ApiResult<void>> {
        try {
            await api.client.put(`/custodian/${request.id}`, request)
            return ApiResult.success(undefined)
        } catch (error) {
            return api.handleError(error)
        }
    }

    static async delete(id: number) {
        try {
            await api.client.delete(`/custodian/${id}`)
            return ApiResult.success({})
        } catch (error) {
            return api.handleError(error)
        }
    }

    static async list(): Promise<ApiResult<Custodian[]>> {
        try {
            const response = await api.client.get(`/custodian`)
            // TODO: api.getResult(response)
            return ApiResult.success(api.deserialize<Custodian[]>(response.data))
        } catch (error) {
            return api.handleError(error)
        }
    }
}
