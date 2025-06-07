import { GATEWAY_ENDPOINT } from "../axios.config";

export const commission_api = {
  $_create_commission_request(data: any) {
    return GATEWAY_ENDPOINT.post("/commission-requests", data);
  },
  $_fetch_drawing_types() {
    return GATEWAY_ENDPOINT.get("/drawing-types");
  },
};