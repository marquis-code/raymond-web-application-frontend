import { GATEWAY_ENDPOINT } from "../axios.config";

interface PaginationDTO {
    page: number
    limit: number
    sort: string
    order: string
    search: string
}

export const product_api = {
  $_fetch_products() {
    // return GATEWAY_ENDPOINT.get(`/products?page=${metadata.page}&limit=${metadata.limit}&sort=${metadata.sort}&order=${metadata.order}&search=${metadata.search}`);
    return GATEWAY_ENDPOINT.get('/products');
  },
  $_fetch_featured_products(metadata: { limit: number }) {
    return GATEWAY_ENDPOINT.get(`/products/featured?limit=${metadata.limit}`);
  },
  $_get_new_products(metadata: { limit: number }) {
    return GATEWAY_ENDPOINT.get(`/products/new?limit=${metadata.limit}`);
  },
  $_get_new_best_seller_products(metadata: { limit: number }) {
    return GATEWAY_ENDPOINT.get(`/products/bestsellers?limit=${metadata.limit}`);
  },
  $_search_product(metadata: PaginationDTO) {
    return GATEWAY_ENDPOINT.get(`/products/search?page=${metadata.page}&limit=${metadata.limit}&sort=${metadata.sort}&order=${metadata.order}&q=${metadata.search}`);
  },
  $_get_product_by_category(id: string) {
    return GATEWAY_ENDPOINT.get(`/products/category/${id}`);
  },
  $_delete_product(id: string) {
    return GATEWAY_ENDPOINT.delete(`/products/${id}`);
  },
  $_get_product_by_id(id: string) {
    return GATEWAY_ENDPOINT.get(`/products/${id}`);
  },
  $_get_categories () {
    return GATEWAY_ENDPOINT.get("/products/categories");
  }
};
