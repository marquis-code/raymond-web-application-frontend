import { review_api } from '@/api_factory/modules/reviews'
import { ref } from 'vue'

export const useFetchAllReviews = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const reviews = ref<any[]>([])

  const fetchAllReviews = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await review_api.$_fetch_reviews()
      console.log(response.data, 'all revies hwew')
      reviews.value = response?.data?.reviews?.filter((item: Record<string, any>) => item?.status === 'approved')
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch orders'
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchAllReviews()
  })

  return {
    loading,
    error,
    reviews,
    fetchAllReviews,
  }
}
