class FakeAccountProvider {
  async login(email: string, password: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "test@example.com" && password === "password") {
          resolve({
            success: true,
            message: "Login successful",
            user: {
              id: "fakeUserId",
              email: "test@example.com",
              name: "Test User",
            },
            token: "fakeToken", // Simulate a token
          })
        } else {
          resolve({
            success: false,
            message: "Invalid email or password",
          })
        }
      }, 500) // Simulate a network request delay
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

export default new FakeAccountProvider()
