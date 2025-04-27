import { product_api } from '@/api_factory/modules/products'
import { ref } from 'vue'


export const useFetchCategories = () => {
  const categories = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  // Fetch products with pagination
  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await product_api.$_get_categories()
      console.log(response, 'res hee')
      categories.value = response?.data?.data      
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch products'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchCategories()
  })

  return {
    categories,
    loading,
    error,
    fetchCategories,
  }
}