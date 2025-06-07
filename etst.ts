import { loan_request } from '@/api_factory/modules/investmentEnquiry'
import { ref } from 'vue'

export const useCreateIndividualEnquiry = () => {
  const loading = ref(false)
  const createIndividualEnquiry = async (payload: Record<string, any>) => {
    loading.value = true
    try {
      const response = await loan_request.$_create_individual_loan_request(payload)
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to create individual loan request'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    createIndividualEnquiry
  }
}

import { loan_request } from '@/api_factory/modules/investmentEnquiry'
import { ref } from 'vue'

export const useCreateEmployeeEnquiry = () => {
  const loading = ref(false)
  const createEmployeeEnquiry = async (payload: Record<string, any>) => {
    loading.value = true
    try {
      const response = await loan_request.$_create_emoloyee_loan_request(payload)
      return response.data
    } catch (e: any) {
      error.value = e.response?.data?.message || 'Failed to create employee loan request'
      throw error.value
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    createEmployeeEnquiry
  }
}