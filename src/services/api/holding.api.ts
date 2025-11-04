import { debug } from "@/utils/utils"
import api from "./apiClient"
import { type create, list, type update } from "./schemas/holding.schema"
import { ApiResult } from "./helper"

debug("HoldingApi")
export default class HoldingApi {
    static async create(request: create.Request): Promise<ApiResult<number>> {
        try {
            const response = await api.client.post("/holding", request)
            return ApiResult.success(api.getNewId(response))
        } catch (error) {
            return api.handleError(error)
        }
    }

    static async update(request: update.Request): Promise<ApiResult<void>> {
        try {
            await api.client.put(`/holding/${request.id}`, request)
            return ApiResult.success(undefined)
        } catch (error) {
            return api.handleError(error)
        }
    }

    static async delete(id: number) {
        try {
            await api.client.delete(`/holding/${id}`)
            return ApiResult.success({})
        } catch (error) {
            return api.handleError(error)
        }
    }

    static async list() /*: Promise<ApiResult<HoldingRecord>> */ {
        debug("HoldingApi - list")
        try {
            const response = await api.client.get("/holding")
            const parseResult = list.ResponseSchema.safeParse(response.data)
            return api.getResult(parseResult)
        } catch (error) {
            return api.handleError(error)
        }
    }
}
