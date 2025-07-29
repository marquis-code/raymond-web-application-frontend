import { review_api } from '@/api_factory/modules/reviews'
import { ref } from 'vue'

export const useFetchReview = () => {
  const review = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const route = useRoute() as any

  // Fetch products with pagination
  const fetchReviewByProductId = async (id?: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await review_api.$_fetch_review_by_productId(route?.params?.id || route?.query?.productId || id)
      console.log(response, 'response gere')
      review.value = response?.data?.reviews?.filter((item: Record<string, any>) => item?.status === 'approved')
      
      
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch reviews'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    if(route?.params?.id || route?.query?.productId){
      fetchReviewByProductId()
    }
  })

  return {
    fetchReviewByProductId,
    review,
    loading,
    error
  }
}