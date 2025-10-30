// src/services/currency.service.ts
import CurrencyApi from "./api/currency.api"

export default class CurrencyService {
    static listAll = async () => await CurrencyApi.list_all()
    static listOfUser = async () => await CurrencyApi.list_OfUser()
}
