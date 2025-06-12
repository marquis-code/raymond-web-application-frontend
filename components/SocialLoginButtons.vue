<template>
    <div class="space-y-3">
      <!-- Google Login -->
      <button
        v-if="authType === 'login'"
        @click="handleGoogleLogin"
        :disabled="loading || socialAuthLoading"
        class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span v-if="!loading && !socialAuthLoading">Sign in with Google</span>
        <span v-else>Signing in...</span>
      </button>

      <button
        v-if="authType === 'signup'"
        @click="handleGoogleLogin"
        :disabled="loading || socialAuthLoading"
        class="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span v-if="!loading && !socialAuthLoading">Sign up with Google</span>
        <span v-else>Signing up...</span>
      </button>
  
  
      <!-- Error Display -->
      <div v-if="error || socialAuthError" class="text-red-600 text-sm text-center">
        {{ error || socialAuthError }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCustomToast } from '@/composables/core/useCustomToast'
  import { useAuth } from '@/composables/auth/useAuth';
  const { showToast } = useCustomToast();
  
  const { 
    signInWithGoogle, 
    // signIn,
    loading, 
    error,
    socialAuthLoading,
    socialAuthError
  } = useAuth();

  const props = defineProps({
    authType: {
      type: String
    }
  })

  const emit = defineEmits(['callback'])

  // const handleSocialSignup = async () => {
  //   try {
  //     await signIn();
  //   } catch (err) {
  //     showToast({
  //       title: "Error",
  //       message: err,
  //       toastType: `${err} || Google login failed`,
  //       duration: 3000
  //     });
  //     // console.error('Google login failed:', err);
  //   }
  // }
  
  const handleGoogleLogin = async () => {
    try {
      const data = await signInWithGoogle()
      emit('callback', data)
    } catch (err) {
      showToast({
        title: "Error",
        message: err,
        toastType: `${err} || Google login failed`,
        duration: 3000
      });
      // console.error('Google login failed:', err);
    }
  };
  
  // const handleFacebookLogin = async () => {
  //   try {
  //     await signInWithFacebook();
  //   } catch (err) {
  //     console.error('Facebook login failed:', err);
  //   }
  // };
  
  // const handleAppleLogin = async () => {
  //   try {
  //     await signInWithApple();
  //   } catch (err) {
  //     console.error('Apple login failed:', err);
  //   }
  // };
  </script>
  