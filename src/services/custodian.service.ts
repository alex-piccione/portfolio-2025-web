// src/services/custodian.service.ts
import { debug } from "@/utils/utils"
import api, { deserialize } from "./apiClient"
import type Custodian from "@/entities/Custodian"

export default class CustodianService {
    static async list() {
        try {
            const response = await api.client.get(`/custodian`)
            return deserialize<Custodian[]>(response.data)
        } catch (error) {
            debug(`Error fetching custodians: ${error}`)
            throw error
        }
    }
}
