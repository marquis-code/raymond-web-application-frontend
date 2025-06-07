import { promosale_api } from '@/api_factory/modules/promosale'
import { ref } from 'vue'


export const useFetchPromosale = () => {
  const promosale = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  // Fetch products with pagination
  const fetchPromosales = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await promosale_api.$_fetch_currently_active_promosale()
      console.log(response, 'res hee')
      promosale.value = response?.data
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch active promosale'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchPromosales()
  })

  return {
    promosale,
    loading,
    error,
    fetchPromosales,
  }
}