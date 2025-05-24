import { GATEWAY_ENDPOINT } from "../axios.config";

export const enquires_api = {
  $_create_enquiry(data: any) {
    return GATEWAY_ENDPOINT.post("/enquiries", data);
  }
};