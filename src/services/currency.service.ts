// src/services/currency.service.ts
import { debug } from "@/utils/utils"
import apiClient, { deserialize} from "./apiClient"

interface Currency {
    id: number,
    symbol: String,
    name: String,
    kind: String,
    is_active: boolean,
    precision: number,
}

export default class CurrencyService {

    static async list() {
        try {
            const response = await apiClient.get(`/currency`)
            return deserialize<Currency []>( response.data );
        } catch (error) {
            debug(`Error fetching currencies: ${error}`);
            throw error;
        }
    }

}
