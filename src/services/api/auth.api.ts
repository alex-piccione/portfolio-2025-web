// src/services/api/auth.api.ts
import { debug } from "@/utils/utils"
import api from "./apiClient"
import {
    login,
    refresh,
    type LoginResponse,
    type RefreshResponse,
} from "./schemas/auth.schema"
import { ApiResult } from "./helper"

export default class AuthApi {
    static async login(
        username: string,
        password: string,
    ): Promise<ApiResult<LoginResponse>> {
        try {
            const response = await api.publicClient.post("/auth/login", {
                username,
                password,
            })
            //debug(`Login response: ${response.status}`)

            const parseResult = login.ResponseSchema.safeParse(response.data)
            if (!parseResult.success) {
                debug(
                    `Response validation failed (parseResponse.error.message): ${parseResult.error.message}`,
                )

                const errorMessages = parseResult.error.issues
                    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
                    .join("; ")

                return ApiResult.genericError(
                    `Response validation failed: ${errorMessages}`,
                )
            }

            return ApiResult.success(parseResult.data)
        } catch (error) {
            return api.handleError(error)
        }
    }

    static async refreshToken(
        token: string,
    ): Promise<ApiResult<RefreshResponse>> {
        try {
            const response = await api.publicClient.post("/auth/refresh", {
                refreshToken: token,
            })
            //debug(`Refresh response: ${response.status}`)

            const parseResult = refresh.ResponseSchema.safeParse(response.data)

            if (!parseResult.success) {
                const errorMessage =
                    "Response validation failed. " +
                    parseResult.error.message +
                    ". " +
                    parseResult.error.issues
                        .map(
                            (issue) =>
                                `${issue.path.join(".")}: ${issue.message}`,
                        )
                        .join("; ")

                throw Error(errorMessage)
            }

            return ApiResult.success(parseResult.data)
        } catch (error) {
            return api.handleError(error)
        }
    }
}
