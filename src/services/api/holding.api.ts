import { debug } from "@/utils/utils"
import { Result } from "@/utils/result"
import axios from "axios"
import api from "../apiClient"

import { type create, list } from "./schemas/holding.schema"

debug("HoldingApi")
export default class HoldingApi {
    static async create(request: create.Request) {
        try {
            const response = await api.client.post("/holding", request)
            return Result.success(api.getNewId(response))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorData = api.parseError(error)
                return Result.failed(errorData.message)
            }

            return Result.failed(`HoldingApi.create failed. ${error}`)
        }
    }

    static async list() {
        debug("HoldingApi - list")
        try {
            const response = await api.client.get("/holding")
            const parseResult = list.ResponseSchema.safeParse(response.data)
            return api.parseResult(parseResult)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorData = api.parseError(error)
                return Result.failed(errorData.message)
            }

            return Result.failed(`HoldingApi.list failed. ${error}`)
        }
    }
}
