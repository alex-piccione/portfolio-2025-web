// src/utils/result.ts

export type Result<T> =
    | { isSuccess: true; value: T }
    | { isSuccess: false; error: string }

export const Result = {
    success: <T>(value: T): { isSuccess: true; value: T } => ({
        isSuccess: true,
        value,
    }),
    failed: (error: string): { isSuccess: false; error: string } => ({
        isSuccess: false,
        error,
    }),
    dataOrError: <T>(result: Result<T>, error?: string): T => {
        if (result.isSuccess) return result.value

        throw Error(error || result.error)
    },
}

// ref 1: https://www.webdevtutor.net/blog/typescript-result-option
