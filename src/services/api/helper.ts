// src/services/api/helper.ts
import { AxiosError } from "axios"

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

/*
export function getNewId(response: AxiosResponse): number {
    return response.data?.newId
}*/

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
