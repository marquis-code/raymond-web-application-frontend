import { payments_api } from '@/api_factory/modules/payments'
import { ref } from 'vue'

export const useVerifyPayment = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const verifyPayment = async (data: any) => {
    loading.value = true
    error.value = null
    try {
      await payments_api.$_verify_payment(data)
      return true
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to verify payment'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    verifyPayment,
  }
}
