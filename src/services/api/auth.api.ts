// src/services/api/auth.api.ts

import { Result } from "@/utils/result"
import api from "../apiClient"
import { debug } from "@/utils/utils"
import axios from "axios"
import { login, type LoginResponse } from "./schemas/auth.schema"

export default class AuthApi {
    static async login(
        username: string,
        password: string,
    ): Promise<Result<LoginResponse>> {
        try {
            const response = await api.client.post("/auth/login", {
                username,
                password,
            })
            debug(`Login response: ${response.status}`)

            const parseResult = login.ResponseSchema.safeParse(response.data)
            if (!parseResult.success) {
                debug(
                  `Response validation failed (parseResponse.error.message): ${parseResult.error.message}`,
                )

            const errorMessages = parseResult.error.issues
                .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
                .join("; ")

            return Result.failed(`Response validation failed: ${errorMessages}`)
        }

        return Result.success(parseResult.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorData = api.parseError(error)
                return Result.failed(errorData.message)
            }

            return Result.failed(`Unexpected error. ${error}`)
        }
    }
}
