<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <div v-if="loading" class="space-y-4">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p class="text-gray-600">Completing authentication...</p>
        </div>
        
        <div v-else-if="error" class="space-y-4">
          <div class="text-red-600">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Authentication Failed</h2>
          <p class="text-gray-600">{{ error }}</p>
          <button
            @click="$router.push('/login')"
            class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
        
        <div v-else class="space-y-4">
          <div class="text-green-600">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-xl font-semibold text-gray-900">Authentication Successful</h2>
          <p class="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { definePageMeta, useRoute, ref, onMounted, navigateTo } from '#imports';
  import { useUser } from '@/composables/auth/user';
  import { useSocialAuth } from '@/composables/auth/useSocialAuth';
  import { auth_api } from '@/api_factory/modules/auth';
  
  definePageMeta({
    layout: 'auth'
  });
  
  const route = useRoute();
  const loading = ref(true);
  const error = ref<string | null>(null);
  
  onMounted(async () => {
    const token = route.query.token as string;
    const provider = route.query.provider as string;
    const errorMessage = route.query.message as string;
  
    if (errorMessage) {
      error.value = decodeURIComponent(errorMessage);
      loading.value = false;
      return;
    }
  
    if (!token) {
      error.value = 'No authentication token received';
      loading.value = false;
      return;
    }
  
    try {
      // Store the token
      useSocialAuth().storeAuthToken(token);
      
      // Get user profile
      const response = await auth_api.$_get_profile();
      
      if (response.type === 'ERROR') {
        throw new Error(response.message || 'Failed to get user profile');
      }
      
      // Store user data
      useUser().createUser(response.data);
      
      // Redirect to dashboard
      setTimeout(() => {
        navigateTo('/dashboard');
      }, 1500);
      
    } catch (err: any) {
      error.value = err.message || 'Authentication failed';
    } finally {
      loading.value = false;
    }
  });
  </script>
  