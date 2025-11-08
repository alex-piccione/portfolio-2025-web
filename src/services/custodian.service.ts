// src/services/custodian.service.ts
import CustodianApi from "./api/custodian.api"
import type { create, update } from "./api/schemas/custodian.schema"

export default class CustodianService {
    static async create(data: create.Request) {
        return await CustodianApi.create(data)
    }

    static async update(data: update.Request) {
        return await CustodianApi.update(data)
    }

    static async get(id: number) {
        return await CustodianApi.get(id)
    }

    static async delete(id: number) {
        return await CustodianApi.delete(id)
    }

    static async list() {
        return await CustodianApi.list()
    }
}
