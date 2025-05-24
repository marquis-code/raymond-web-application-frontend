import { enquires_api } from '@/api_factory/modules/enquires'
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
import { ref } from 'vue'

export const useCreateEnquires = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const apiRes = ref({})

  const createEnquires = async (data: any) => {
    loading.value = true
    error.value = null
    try {
      const res = await enquires_api.$_create_enquiry(data)
      showToast({
        title: "Success",
        message: "Enquiry submitted successfully",
        toastType: "success",
        duration: 3000
      });
      apiRes.value = res
      return res
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to create enquiry'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    apiRes,
    error,
    createEnquires,
  }
}
