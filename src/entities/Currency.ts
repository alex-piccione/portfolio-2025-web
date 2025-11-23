export interface CurrencyBase {
    id: number
    symbol: string
    name: string
    kind: string
}

export default interface Currency extends CurrencyBase {
    isActive: boolean
    precision: number
    isMajor: boolean
}

export interface UserCurrency extends CurrencyBase {
    isUsed: boolean
}
