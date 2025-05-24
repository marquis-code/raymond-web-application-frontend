<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold mb-4">Start a Conversation</h3>
        <p class="text-gray-600 text-sm mb-6">Please provide your details to begin chatting with our support team.</p>
        
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              id="fullName"
              v-model="form.fullName"
              type="text"
              required
              class="w-full px-3 py-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-3 py-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
              placeholder="Enter your email address"
            />
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
              Initial Message *
            </label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="3"
              class="w-full px-3 py-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
              placeholder="How can we help you today?"
            ></textarea>
          </div>
          
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="$emit('cancel')"
              class="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-full text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!isFormValid || isSubmitting"
              class="flex-1 px-4 py-3 bg-black text-white rounded-full text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {{ isSubmitting ? 'Starting...' : 'Start Chat' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { UserInfo } from '@/composables/core/useUserChat'
  
  interface FormData {
    fullName: string
    email: string
    message: string
  }
  
  const emit = defineEmits<{
    submit: [userInfo: UserInfo, message: string]
    cancel: []
  }>()
  
  const form = ref<FormData>({
    fullName: '',
    email: '',
    message: ''
  })
  
  const isSubmitting = ref(false)
  
  const isFormValid = computed(() => {
    return form.value.fullName.trim() && 
           form.value.email.trim() && 
           form.value.message.trim() &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)
  })
  
  const submitForm = async () => {
    if (!isFormValid.value || isSubmitting.value) return
    
    isSubmitting.value = true
    
    try {
      const userInfo: UserInfo = {
        fullName: form.value.fullName.trim(),
        email: form.value.email.trim()
      }
      
      emit('submit', userInfo, form.value.message.trim())
    } finally {
      isSubmitting.value = false
    }
  }
  </script>
  