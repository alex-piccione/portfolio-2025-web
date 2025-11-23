// It's ok to use namespaces purely for type grouping — no runtime logic.
/* eslint-disable @typescript-eslint/no-namespace */
export namespace updateCurrency {
    export interface Request {
        currencyId: number
    }
}
