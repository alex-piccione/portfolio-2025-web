export default interface Currency {
  id: number
  name: string
  symbol: string
  kind: "Fiat" | "Cryptocurrency"
}
