import type Currency from "./Currency"

//type HoldingAction = "Balance" | "Add" | "Remove"

export default interface Holding {
  id: number
  //custodian: Custodian;
  currency: Currency
  date: Date
  action: string // enum
  amount: number
  note?: string
}
