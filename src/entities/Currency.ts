/*export default interface Currency {
  id: number
  name: string
  symbol: string
  kind: "Fiat" | "Cryptocurrency"
}*/

export default interface Currency {
    id: number
    symbol: string
    name: string
    kind: string
    isActive: boolean
    precision: number
}
