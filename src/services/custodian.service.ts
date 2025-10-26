// src/services/custodian.service.ts
import { debug } from "@/utils/utils"
import api, { deserialize } from "./apiClient"
import type Custodian from "@/entities/Custodian"
import type { CustodianKind } from "@/entities/Custodian"

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

    static async create(data: CreateRequest): Promise<number> {
        const response = await api.client.post("/custodian", data)
        return api.getNewId(response)
    }
}

export interface CreateRequest {
    name: string
    description: string | null
    kind: CustodianKind
    url: string | null
    accountCountryCode: string
    walletAddress: string | null
}

/*
export namespace create {
    interface Request {}

    interface Response {}
}

function getNewId(response: AxiosResponse<any, any, {}>) {
    throw new Error("Function not implemented.")
}
*/
