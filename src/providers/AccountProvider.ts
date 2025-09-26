import { Result } from "@/utils/result"
import axios from "axios"

const API_BASE_URL = "/api"

export type LoginSuccess = {
  email: string,
  authToken: string
  authTokeExpiresAt: Date
}

export interface IAccountProvider {
  login(email:string, password:string): Promise<Result<LoginSuccess>>
}


class AccountProvider implements IAccountProvider {
  async login(email: string, password: string) : Promise<Result<LoginSuccess>> {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      })

      // TODO: check response
      //return success(response.data)

      let date = new Date()
      date = new Date(date.getTime() + (24 * 60 * 60 * 1000))

      return Result.success({email: email, authToken: "aaa", authTokeExpiresAt: date})      
    } catch (error: any) {      
      //throw new Error("Invalid email or password")
      return Result.failed(`Failed to login. ${error}`)
    }
  }

  async register(userData: any) {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, userData)
      return response.data
    } catch (error: any) {
      throw new Error("Registration failed")
    }
  }

  async getAccount() {
    // When the server sets the token as an HTTP-only cookie, the browser automatically includes this cookie in subsequent requests to the same domain.
    try {
      const response = await axios.get(`${API_BASE_URL}/account`)
      return response.data
    } catch (error: any) {
      throw new Error("Failed to get account")
    }
  }
}

export default new AccountProvider()
