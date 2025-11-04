import axios from "axios"

import CookieUtils from "@/utils/cookie.utils"
import { debug } from "@/utils/utils"
import ConfigurationProvider from "@/utils/configuration"
import {
    ApiResult,
    deserialize,
    parseAxiosError,
    parseNewIdResponse,
    parseZodParseResult,
    type ApiFailure,
} from "./helper"
import { goToLogin } from "@/utils/router"
import { useAuthStore } from "@/stores/auth.store"

const configuration = await ConfigurationProvider.getInstance()
debug(`apiUrl: ${configuration.apiUrl}`)

// Create a centralized axios instance
const apiClient = axios.create({
    baseURL: configuration.apiUrl,
    timeout: 10000, // 10 seconds timeout
})

const apiClientNoAuth = axios.create({
    baseURL: configuration.apiUrl,
    timeout: 10000, // 10 seconds timeout
})

// Add Request interceptor to automatically include auth token
apiClient.interceptors.request.use(
    async (config) => {
        switch (await useAuthStore().checkSessionValidity()) {
            case "SessionOk":
                const authToken = CookieUtils.getCookie("AuthToken")
                if (!authToken)
                    return Promise.reject(
                        "AuthToken cookie was not found or empty.",
                    )
                config.headers["X-Auth-Token"] = authToken

                debug(
                    `API Request: ${config.method?.toUpperCase()} ${config.url} with auth: ${!!authToken}`,
                )

                return config
            case "SessionCheckFailed":
            case "SessionExpired":
                debug(`interceptors.request = Session expired or check failed.`)
                await goToLogin()
                return Promise.reject(
                    new Error("Session expired. Redirecting to login."),
                )
        }
    },
    (error) => {
        debug(`API Request Error: ${error}`)
        return Promise.reject(error)
    },
)

// Add Response interceptor for global error handling (optional but useful)
apiClient.interceptors.response.use(
    (response) => {
        debug(`API Response: ${response.status} ${response.config.url}`)
        return response
    },
    (error) => {
        if (typeof error === "object")
            debug(
                `API Response Error: ${error.response?.status} ${error.config?.url} - ${error.message} (${error})`,
            )
        else debug(`API Response Error: ${error}`)

        if (error.response?.status === 401) {
            debug("Unauthorized request - token may be invalid")
        }

        return Promise.reject(error)
    },
)

apiClientNoAuth.interceptors.response.use(
    (response) => {
        debug(`API Response: ${response.status} ${response.config.url}`)
        return response
    },
    (error) => {
        debug(
            `API Response Error: ${error.response?.status} ${error.config?.url} - ${error.message}`,
        )

        return Promise.reject(error)
    },
)

const handleError = (error: unknown): ApiFailure => {
    if (axios.isAxiosError(error)) return parseAxiosError(error)

    return ApiResult.genericError(`${error}`)
}

/**
 * Analyze the error from API call and return Generic or Form error (inside ApiResult).
 * @param error
 * @returns
 */
/*
const parseError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const apiError = parseErrorResponse(error)
        if (isGenericError(apiError)) return ApiResult.failed(apiError)
        else if (isFormError(apiError)) {
            return ApiResult.failed(apiError)
            //const firstFormError = apiError.errors[0] || 'Form validation failed.'
            //return ApiResult.failed(`Form error: ${firstFormError}`)
        }
    }

    const apiError: ApiErrorResponse = {
        kind: "generic",
        //isGeneric: true,
        status: undefined,
        message: `${error}`,
        code: undefined,
    }

    return ApiResult.failed(apiError)
}*/

export default {
    client: apiClient,
    publicClient: apiClientNoAuth,
    handleError,
    //getError: parseErrorResponse,
    getNewId: parseNewIdResponse,
    getResult: parseZodParseResult,
    deserialize,
}
