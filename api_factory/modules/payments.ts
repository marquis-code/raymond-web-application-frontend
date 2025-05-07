import { GATEWAY_ENDPOINT } from "../axios.config";

export const payments_api = {
  $_verify_payment(data: any) {
    return GATEWAY_ENDPOINT.post("/payments/verify", data);
  },
};