// src/entities/Custodian.ts
export default interface Custodian {
    id: number
    name: string
    custodian: string
    account?: string
    kind: CustodianKind // "Exchange" | "Wallet" | "Bank" | "Blockchain" | "Other"
    colorCode: string
    description?: string
}

export type CustodianKind = "Exchange" | "Pension" | "Bank" | "Blockchain Wallet" | "Other"

export const parseKindFromString = (value: string) => value as CustodianKind
