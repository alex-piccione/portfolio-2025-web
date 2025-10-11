// src/services/api/auth.api.ts

import { Result } from "@/utils/result"
import apiClient from "../apiClient"
import { debug } from "@/utils/utils"
import axios from "axios"

export interface LoginResponse {
  authToken: string,
  authTokenExpiresAt: Date,
  refreshToken: string,
  refreshTokenExpiresAt: Date
}

const parseErrorResponse = (response: any) => {
  return {
    status: response?.status ?? 0,
    message: response?.data?.error ?? 'An unknown error occurred',
    code: response?.data?.code
  }
}

export default class AuthApi {
  static async login(username:string, password: string) : Promise<Result<LoginResponse>> {
    try {
      const response = await apiClient.post('/login', { username, password }) // TODO: update server to be /auth/login
      debug(`Login response: ${response.status}`)

      const { authToken, authTokenExpiresAt, refreshToken, refreshTokenExpiresAt} = response.data
      
      return Promise.resolve(Result.success( { authToken, authTokenExpiresAt, refreshToken, refreshTokenExpiresAt }))
    } catch (error) {
      debug(`axios.isAxiosError(error): ${axios.isAxiosError(error)}`)
      if (axios.isAxiosError(error)) {
        const errorData = parseErrorResponse(error.response)
        //debug(`errorData.status: ${errorData.status}`)
        //debug(`errorData.message: ${errorData.message}`)
        //debug(`errorData.code: ${errorData.code}`)
        if (errorData.status === 401) {          
          return Promise.resolve(Result.failed(errorData.message))
        }
      }

       const message = axios.isAxiosError(error) 
        ? error.response?.data?.message || 'Login failed'
        : 'An unexpected error occurred'; 
       debug(`Login error: ${message}`)
       return Promise.resolve(Result.failed(message))
    }
  }
}