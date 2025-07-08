import { product_api } from '@/api_factory/modules/products'
import { ref } from 'vue'

export const useFetchProduct = () => {
  const product = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const route = useRoute() as any

  // Fetch products with pagination
  const fetchProduct = async (id?: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await product_api.$_get_product_by_id(route?.params?.id || route?.query?.productId || id)
      product.value = response.data.product || response.data
      
      
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch products'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    if(route?.params?.id || route?.query?.productId){
      fetchProduct()
    }
  })

  return {
    fetchProduct,
    product,
    loading,
    error
  }
}