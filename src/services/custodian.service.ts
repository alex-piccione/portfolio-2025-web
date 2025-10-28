// src/services/custodian.service.ts
import CustodianApi from "./api/custodian.api"
import type { create } from "./api/schemas/custodian.schema"

export default class CustodianService {
    static async list() {
        return await CustodianApi.list()
    }

    static async create(data: create.Request) {
        return await CustodianApi.create(data)
    }
}
