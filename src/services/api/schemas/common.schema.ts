export interface NewIdResponse {
    newId: number
}

export interface ApiErrorResponse {
    status?: number
    message: string
    code?: string
}
