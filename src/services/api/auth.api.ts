// src/services/api/auth.api.ts

import { Result } from "@/utils/result"

export interface LoginResponse {
  authToken: string,
  authTokenExpiresAt: Date
}

export default class AuthApi {
  static async login(email:string, password: string) : Promise<Result<LoginResponse>> {
    // TODO: implement real call
    const authToken = "token-123"
    let expiresAt = new Date()
    expiresAt = new Date(expiresAt.getTime() + (24 * 60 * 60 * 1000))
    const response:Result<LoginResponse> = Result.success( { authToken, authTokenExpiresAt: expiresAt })
    return Promise.resolve(response)
  }
}