import { Result } from "@/utils/result"
//import { debug } from "@/utils/utils"
import axios from "axios"
import api from "../apiClient"

import {
    type create,
    //login,
    //refresh,
    //type LoginResponse,
    //type RefreshResponse,
} from "./schemas/holding.schema"
import { getNewId } from "./helper"

export default class HoldingApi {
    static async create(request: create.Request) {
        try {
            const response = await api.client.post("/holding", request)

            return Result.success(getNewId(response))
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorData = api.parseError(error)
                return Result.failed(errorData.message)
            }

            return Result.failed(`HoldingApi.create failed. ${error}`)
        }
    }
}
