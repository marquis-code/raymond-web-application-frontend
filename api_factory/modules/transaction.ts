import { GATEWAY_ENDPOINT } from "../axios.config";

export const transaction_api = {
  $_create_transaction(data: any) {
    return GATEWAY_ENDPOINT.post("/transactions", data);
  }
};