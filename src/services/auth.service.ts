// src/services/auth.service.ts

import CookieUtils from "@/utils/cookie.utils"
import AuthApi from "./api/auth.api"
import { Result } from "@/utils/result"

const api = new AuthApi()
export default class AuthService {

    static async login(username: string, password: string): Promise<Result<{ username: string }>> {
        try {
            const result = await AuthApi.login(username, password)

            if (result.isSuccess) {
                CookieUtils.setCookie("AuthToken", result.value.accessToken, new Date(result.value.accessTokenExpiresAt)) 
                return Result.success( { username } )
            } else {
                return Result.failed(result.error)
            }
        } catch (error: any) {
            // TODO logger.error("Login failed.", error)
            throw new Error(`Unexpected error.  ${error}`) 
        }
    }

}