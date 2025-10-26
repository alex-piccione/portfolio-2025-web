// src/entities/Custodian.ts
export default interface Custodian {
    id: number
    name: string
    desription?: string
    kind: CustodianKind // "Exchange" | "Wallet" | "Bank" | "Other"
    url?: string
    accountCountryCode?: string
    walletAddress?: string
    // AccountId?: string
}

export type CustodianKind = "Exchange" | "Wallet" | "Bank" | "Other"

export const parseKindFromString = (value: string) => value as CustodianKind
