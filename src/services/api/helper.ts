// src/services/api/helper.ts
import type { AxiosError } from "axios"

interface ApiErrorResponse {
    status?: number
    message: string
    code?: string
}

export const parseErrorResponse = (error: AxiosError): ApiErrorResponse => {
    const responseData = error.response?.data as
        | { error: string; code?: string }
        | undefined
    return responseData
        ? {
              status: error.response?.status,
              message: responseData.error,
              code: responseData.code,
          }
        : {
              status: error.response?.status,
              message:
                  error.message ?? String(error) ?? "An unknown error occurred",
              code: undefined,
          }
}
