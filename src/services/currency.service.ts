// src/services/currency.service.ts
import CurrencyApi from "./api/currency.api"

export default class CurrencyService {
    static list = async () => await CurrencyApi.list()
}
