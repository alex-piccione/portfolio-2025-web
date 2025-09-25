// src/utils/auth.utils.ts
import CookieUtils from "@/utils/cookie.utils"

export type LoginStatus = {
    isLoggedIn: boolean
    username: string|undefined
}

//LoginStatus["ok"] = () => {}

export default class AuthUtils {
    static onLogin (email:string, authToken: string, authTokenExpiresAt: Date)  {
        CookieUtils.setCookie("AuthToken", authToken, authTokenExpiresAt)
        window.cookieStore.set("Email", email)
    }

    static onLogout () {
        CookieUtils.removeCookie("AuthToken")
        window.cookieStore.delete("Email")
    }

    static async getLoginStatus (caller: string) : Promise<LoginStatus> {
        const authToken = CookieUtils.readCookie("AuthToken", caller)
        return authToken ?
        {
            isLoggedIn: true,
            username: (await window.cookieStore.get("Email"))?.value ?? "unknown"
        } :
        { isLoggedIn: false, username: undefined }
    }
}