import { commission_api } from '@/api_factory/modules/commission'
import { ref } from 'vue'

export const useFetchDrawingTypes = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const drawingTypes = ref<any[]>([])

  const fetchDrawingTypes = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await commission_api.$_fetch_drawing_types()
      console.log(response, 'drawing types response')
      drawingTypes.value = response.data.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch drawing types'
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchDrawingTypes()
  })

  return {
    loading,
    error,
    drawingTypes,
    fetchDrawingTypes,
  }
}
