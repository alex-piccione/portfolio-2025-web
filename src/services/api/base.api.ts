import api from "./apiClient"

const Api = {
    client: api.client,
    handleError: api.handleError,
}

export class ApiBase {
    client = api.client
    handleError = api.handleError
}

export default Api
