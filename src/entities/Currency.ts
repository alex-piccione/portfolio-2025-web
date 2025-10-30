export interface CurrencyBase {
    id: number
    symbol: string
    name: string
    kind: string
}

export default interface Currency extends CurrencyBase {
    isActive: boolean
    precision: number
}

export interface UserCurrency extends CurrencyBase {
    isUsed: boolean
}
