import axios from "axios"

import CookieUtils from "@/utils/cookie.utils"
import { debug } from "@/utils/utils"
import ConfigurationProvider from "@/utils/configuration"
import { parseErrorResponse } from "./api/helper"

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

// Add request interceptor to automatically include auth token
apiClient.interceptors.request.use(
    (config) => {
        const authToken = CookieUtils.getCookie("AuthToken")
        if (!authToken)
            return Promise.reject("AuthToken cookie was not found or empty.")
        config.headers["X-Auth-Token"] = authToken

        debug(
            `API Request: ${config.method?.toUpperCase()} ${config.url} with auth: ${!!authToken}`,
        )
        return config
    },
    (error) => {
        debug(`API Request Error: ${error}`)
        return Promise.reject(error)
    },
)

// Add response interceptor for global error handling (optional but useful)
apiClient.interceptors.response.use(
    (response) => {
        debug(`API Response: ${response.status} ${response.config.url}`)
        return response
    },
    (error) => {
        debug(
            `API Response Error: ${error.response?.status} ${error.config?.url} - ${error.message}`,
        )

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

export function deserialize<T>(item: unknown) {
    try {
        return item as T
    } catch (error) {
        //const t = generic
        throw new Error(`Failed to deserialize data to {T}. ${error}`)
    }
}

export default {
    client: apiClient,
    publicClient: apiClientNoAuth,
    parseError: parseErrorResponse,
    deserialize,
}
