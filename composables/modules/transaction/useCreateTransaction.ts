import { transaction_api } from '@/api_factory/modules/transaction'
import { ref } from 'vue'

export const useCreateTransaction = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const apiRes = ref({}) as any

  const createTransaction = async (data: any) => {
    loading.value = true
    error.value = null
    try {
      const res = await transaction_api.$_create_transaction(data)
      apiRes.value = res
      return res
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to create transaction'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    apiRes,
    error,
    createTransaction,
  }
}
