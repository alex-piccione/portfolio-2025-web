// src/services/auth.service.ts

import CookieUtils from "@/utils/cookie.utils"
import AuthApi from "./api/auth.api"

const api = new AuthApi()
export default class AuthService {

    static async login(email: string, password: string): Promise<{ email: string }> {
        try {
            const result = await AuthApi.login(email, password)

            if (result.isSuccess) {
                CookieUtils.setCookie("AuthToken", result.value.authToken, result.value.authTokenExpiresAt) 
                return { email } 
            } else {
                throw new Error(result.error || "Login failed")
            }
        } catch (error: any) {
            // TODO logger.error("Login failed.", error)
            throw new Error("Login failed") 
        }
    }

  static getLoggedIn() {

  }

}