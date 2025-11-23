import api from "./apiClient"
//import { type create, list, single, type update } from "./schemas/user.schema"
import { ApiResult } from "./helper"
import type { updateCurrency } from "./schemas/user.schema"

export default class UserApi {
    static async updateCurrency(request: updateCurrency.Request): Promise<ApiResult<void>> {
        try {
            await api.client.patch(`/user`, request)
            return ApiResult.success(undefined)
        } catch (error) {
            return api.handleError(error)
        }
    }
}
