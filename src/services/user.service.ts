import UserApi from "@/services/api/user.api"
import type { updateCurrency } from "@/services/api/schemas/user.schema"

export default class UserService {
    static async updateCurrency(request: updateCurrency.Request) {
        return await UserApi.updateCurrency(request)
    }
}
