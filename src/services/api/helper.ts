// src/services/api/helper.ts
import { debug } from "@/utils/utils"
import { Result } from "@/utils/result"
import { AxiosError, type AxiosResponse } from "axios"
import type { ApiErrorResponse, NewIdResponse } from "./schemas/common.schema"
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

export const parseNewIdResponse = (response: AxiosResponse) =>
    deserialize<NewIdResponse>(response).newId

export const parseZodParseResult = <T>(
    parseResult: ZodSafeParseResult<T>,
): Result<T> => {
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
}

/*

// extend AxiosResponse
// Add the method to AxiosResponse's prototype
(axios. as any).prototype.getNewId = function () {
  return this.data?.newId;
};


export interface AxiosResponseNewId extends AxiosResponse<NewIdResponse> {
    getNewId(): number;
}

*/
