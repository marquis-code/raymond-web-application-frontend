import { courses_api } from '@/api_factory/modules/courses'
import { ref } from 'vue'

export const useDeleteSection = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const deleteSection = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await courses_api.$_delete_section(id)
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to delete section'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    deleteSection,
  }
}