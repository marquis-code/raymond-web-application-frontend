import { content_api } from "@/api_factory/modules/content"
import { ref } from "vue"

export const useFetchContentByType = () => {
  const content = ref<any>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchContentByType = async (type: string) => {
    loading.value = true
    error.value = null
    content.value = null

    try {
      const response = await content_api.$_get_content_by_type(type)
      content.value = response.data
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || "Failed to fetch content"
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    content,
    loading,
    error,
    fetchContentByType,
  }
}
