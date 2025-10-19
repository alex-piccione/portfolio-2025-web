// src/entities/Custodian.ts
export default interface Custodian {
  id: string
  name: string
  desription?: string
  kind: "Exchange" | "Wallet" | "Bank" | "Other"
  url?: string
  accountCountryCode?: string
  walletAddress?: string
  // AccountId?: string
}
