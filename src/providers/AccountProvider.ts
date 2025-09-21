import axios from "axios"

const API_BASE_URL = "/api"

class AccountProvider {
  async login(email: string, password: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      })
      return response.data
    } catch (error: any) {
      throw new Error("Invalid email or password")
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
