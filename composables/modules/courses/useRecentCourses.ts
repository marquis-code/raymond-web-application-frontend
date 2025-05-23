import { courses_api } from '@/api_factory/modules/courses'
import { ref } from 'vue'

export const useRecentCourses = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const courses = ref<any[]>([])

  const getRecentCourses = async (limit?: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await courses_api.$_get_recent_courses(limit)
      courses.value = response.data
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch recent courses'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    courses,
    getRecentCourses,
  }
}