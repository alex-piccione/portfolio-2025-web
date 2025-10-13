// src/services/currency.service.ts
import { debug } from "@/utils/utils"
import api, { deserialize} from "./apiClient"
import type Currency from "@/entities/Currency"

export default class CurrencyService {

    static async list() {
        try {
            const response = await api.client.get(`/currency`)
            return deserialize<Currency []>( response.data );
        } catch (error) {
            debug(`Error fetching currencies: ${error}`);
            throw error;
        }
    }

}
