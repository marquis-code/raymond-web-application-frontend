import { GATEWAY_ENDPOINT } from "../axios.config";

export const review_mgt_api = {
  $_fetch_reviews(page: number = 1, limit: number = 10) {
    return GATEWAY_ENDPOINT.get(`/review-mgt?page=${page}&limit=${limit}`);
  }
};
