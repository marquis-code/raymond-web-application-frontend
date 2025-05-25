import { commission_api } from '@/api_factory/modules/commission'
import { ref } from 'vue'

export const useCreateCommission = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const createCommission = async (comissionData: any) => {
    loading.value = true
    error.value = null
    try {
      const response = await commission_api.$_create_commission_request(comissionData)
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to create commission '
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    section,
    createCommission,
  }
}