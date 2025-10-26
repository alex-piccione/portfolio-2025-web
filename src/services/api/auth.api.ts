// src/services/api/auth.api.ts
import { debug } from "@/utils/utils"
import { Result } from "@/utils/result"
import api from "../apiClient"
import axios from "axios"
import {
    login,
    refresh,
    type LoginResponse,
    type RefreshResponse,
} from "./schemas/auth.schema"

export default class AuthApi {
    static async login(
        username: string,
        password: string,
    ): Promise<Result<LoginResponse>> {
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

                return Result.failed(
                    `Response validation failed: ${errorMessages}`,
                )
            }

            return Result.success(parseResult.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorData = api.parseError(error)
                return Result.failed(errorData.message)
            }

            return Result.failed(`AuthApi.login failed. ${error}`)
        }
    }

    static async refreshToken(token: string): Promise<Result<RefreshResponse>> {
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

            return Result.success(parseResult.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorData = api.parseError(error)
                return Result.failed(errorData.message)
            }

            return Result.failed(`AuthApi.refreshToken failed. ${error}`)
        }
    }
}
