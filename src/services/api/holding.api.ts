import { debug } from "@/utils/utils"
import { Result } from "@/utils/result"
import api from "./apiClient"
import { type create, list } from "./schemas/holding.schema"

debug("HoldingApi")
export default class HoldingApi {
    static async create(request: create.Request) {
        try {
            const response = await api.client.post("/holding", request)
            return Result.success(api.getNewId(response))
        } catch (error) {
            return api.handleError(error)
        }
    }

    static async delete(id: number) {
        try {
            await api.client.delete(`/holding/${id}`)
            return Result.success({})
        } catch (error) {
            return api.handleError(error)
        }
    }

    static async list() {
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
