// src/services/api/helper.ts
import { debug } from "@/utils/utils"
import { AxiosError, type AxiosResponse } from "axios"
import { NewIdResponseSchema } from "./schemas/common.schema"
import type { ZodSafeParseResult } from "zod"

// TODO: keep private
export function deserialize<T>(item: unknown) {
    try {
        return item as T
    } catch (error) {
        //const t = generic
        throw new Error(`Failed to deserialize data to {T}. ${error}`)
    }
}

export type ApiSuccess<T> = { isSuccess: true; data: T }
export type ApiFailure = {
    isSuccess: false
    apiError: ApiError
    getError: () => string
}
export type ApiResult<T> = ApiSuccess<T> | ApiFailure

export const ApiResult = {
    success: <T>(data: T): ApiSuccess<T> => ({
        isSuccess: true,
        data,
    }),
    failed: (apiError: ApiError): ApiFailure => ({
        isSuccess: false,
        apiError,
        getError() {
            switch (this.apiError.type) {
                case "generic":
                    return this.apiError.error
                case "form":
                    return this.apiError.errors[0] ?? "no form error found"
            }
        },
    }),
    genericError: (error: string, status?: number, code?: string): ApiFailure => ApiResult.failed({ type: "generic", error, status, code }),
    formError: (errors: string[]): ApiFailure => ApiResult.failed({ type: "form", errors }),
    dataOrError: <T>(result: ApiResult<T>): T => {
        if (result.isSuccess) return result.data
        throw Error(result.getError())
    },
}

export const isApiError = (obj: unknown): obj is ApiError => obj !== null && typeof obj === "object" && "type" in obj

export type ApiGenericError = {
    type: "generic"
    error: string
    status: number | undefined
    code: string | undefined
}
export type ApiFormError = { type: "form"; errors: string[] }
export type ApiError = ApiGenericError | ApiFormError

export const parseAxiosError = (error: AxiosError): ApiFailure => {
    const responseData = error.response?.data

    if (responseData && typeof responseData === "object") {
        const status = "status" in responseData && typeof responseData.status === "string" ? parseInt(responseData.status) : undefined

        const code = "code" in responseData ? (responseData.code as string) : undefined

        if ("error" in responseData && typeof responseData.error === "string") return ApiResult.genericError(responseData.error, status, code) // ApiGenericError

        if ("errors" in responseData && Array.isArray(responseData.errors)) return ApiResult.formError(responseData.errors) // ApiFormError
    }

    return ApiResult.genericError(error.message ?? String(error) ?? "An unknown error occurred") // ApiGenericError
}

export const parseNewIdResponse = (response: AxiosResponse): number => {
    const result = NewIdResponseSchema.safeParse(response.data)
    if (!result.success) throw new Error(`Failed to parse NewIdResponse: ${result.error}`)

    return result.data.newId
}

export const parseZodParseResult = <T>(parseResult: ZodSafeParseResult<T>): ApiResult<T> => {
    if (!parseResult.success) {
        debug(`Response validation failed (parseResponse.error.message): ${parseResult.error.message}`)

        const errorMessages = parseResult.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")

        return ApiResult.genericError(`Response validation failed: ${errorMessages}`)
    }

    return ApiResult.success(parseResult.data)
}

/*
export type ApiResult<T> =
    | { isSuccess: true; data: T }
    | { isSuccess: false; error: ApiError }

export const ApiResult = {
    success: <T>(data: T): { isSuccess: true; data: T } => ({
        isSuccess: true,
        data,
    }),
    failed: (error: ApiError): { isSuccess: false; error: ApiError } => ({
        isSuccess: false,
        error,
    }),
    dataOrError: <T>(result: ApiResult<T>): T => {
        if (result.isSuccess) return result.data
        throw Error(
            isGenericError(result.error)
                ? result.error.message
                : `Form has ${result.error.errors.length} errors`,
        )
    },
}
*/
