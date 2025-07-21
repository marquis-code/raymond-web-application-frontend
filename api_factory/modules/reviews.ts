import { GATEWAY_ENDPOINT } from "../axios.config";

export const review_api = {
  $_create_review(data: any) {
    return GATEWAY_ENDPOINT.post("/reviews", data);
  },
  $_fetch_review_by_productId(productId: string) {
    return GATEWAY_ENDPOINT.get(`/reviews/product/${productId}`);
  },
  $_fetch_reviews() {
    return GATEWAY_ENDPOINT.get(`/reviews`);
  }
};