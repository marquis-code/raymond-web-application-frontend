import { GATEWAY_ENDPOINT } from "../axios.config"

export const originals_api = {


  $_fetch_originals() {
    return GATEWAY_ENDPOINT.get("/originals")
  },

  $_get_original_by_id(id: string) {
    return GATEWAY_ENDPOINT.get(`/originals/${id}`)
  }
}
