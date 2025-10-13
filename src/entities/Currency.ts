/*export default interface Currency {
  id: number
  name: string
  symbol: string
  kind: "Fiat" | "Cryptocurrency"
}*/


export default interface Currency {
    id: number,
    symbol: String,
    name: String,
    kind: String,
    is_active: boolean,
    precision: number,
}
