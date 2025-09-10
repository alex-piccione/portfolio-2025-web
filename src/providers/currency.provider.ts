import type Currency from "../entities/Currency"

export const CurrencyProvider = {
  list: async () => {
    const currencies: Currency[] = [
      { id: 1, name: "Euro", symbol: "EUR", kind: "Fiat" },
      { id: 1, name: "Pound", symbol: "GBP", kind: "Fiat" },
      { id: 1, name: "Bitcoin", symbol: "BTC", kind: "Cryptocurrency" },
    ]

    return currencies
  },
}
