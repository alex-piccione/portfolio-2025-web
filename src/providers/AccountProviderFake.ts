import { success, failed, type Result } from "@/_result"
import type { IAccountProvider, LoginSuccess } from "./AccountProvider"

class AccountProviderFake implements IAccountProvider {
  async login(email: string, password: string) {
    return new Promise<Result<LoginSuccess>>((resolve) => {
      setTimeout(() => {
        if (email === "demo@email.com" && password === "demo") {
          let expiresAt = new Date()
          expiresAt = new Date(expiresAt.getTime() + (24 * 60 * 60 * 1000))
          resolve(success({
            email: "demo@email.com" ,
            authToken: "fakeToken", // Simulate a token
            authTokeExpiresAt: expiresAt
          }))
        } else {
          resolve(failed("Invalid email or password"))
        }
      }, 1500) // Simulate a network request delay
    })
  }

  async register(userData: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Registration successful",
          user: {
            id: "fakeUserId",
            ...userData,
          },
        })
      }, 500) // Simulate a network request delay
    })
  }

  async getAccount() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: "fakeUserId",
          email: "test@example.com",
          name: "Test User",
        })
      }, 500) // Simulate a network request delay
    })
  }
}

export default new AccountProviderFake()
