import { review_api } from '@/api_factory/modules/reviews'
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
import { ref } from 'vue'

export const useCreateReview = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const apiRes = ref({})

  const createReview = async (data: any) => {
    loading.value = true
    error.value = null
    try {
      const res = await review_api.$_create_review(data)
      showToast({
        title: "Success",
        message: "Review submitted successfully",
        toastType: "success",
        duration: 3000
      });
      apiRes.value = res
      return res
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to create review'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    apiRes,
    error,
    createReview,
  }
}
