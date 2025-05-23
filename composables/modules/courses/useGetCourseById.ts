import { courses_api } from '@/api_factory/modules/courses'
import { ref } from 'vue'

export const useGetCourseById = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const course = ref<any>(null)
  const route = useRoute()

  const getCourseById = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await courses_api.$_get_course_by_id(route.params.id)
      course.value = response.data
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to fetch course'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    getCourseById()
  })

  return {
    loading,
    error,
    course,
    getCourseById,
  }
}