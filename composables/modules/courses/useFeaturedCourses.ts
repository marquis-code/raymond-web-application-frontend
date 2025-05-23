import { courses_api } from '@/api_factory/modules/courses'
import { ref } from 'vue'

export const useFeaturedCourses = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const courses = ref<any[]>([])

  const getFeaturedCourses = async (limit?: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await courses_api.$_get_featured_courses(limit)
      courses.value = response.data
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch featured courses'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    courses,
    getFeaturedCourses,
  }
}