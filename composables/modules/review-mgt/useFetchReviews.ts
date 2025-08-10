import { review_mgt_api } from "@/api_factory/modules/review-mgt";
import { ref } from "vue";

export const useFetchReviews = () => {
  const reviews = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchReviews = async (page: number = 1, limit: number = 10) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await review_mgt_api.$_fetch_reviews(page, limit);
      console.log(response, 'res hee')
      if (response.data) {
        reviews.value = response?.data?.reviews;
      }
      return response?.data?.reviews;
    } catch (e: any) {
      error.value = e.response?.data?.message || "Failed to fetch reviews";
      throw error.value;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchReviews()
  })

  return {
    reviews,
    loading,
    error,
    fetchReviews,
  };
};
