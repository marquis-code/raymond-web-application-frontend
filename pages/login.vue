<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div class="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Left Column - Illustration -->
        <div class="hidden md:block relative bg-primary-600 overflow-hidden">
          <div class="absolute inset-0 bg-pattern opacity-10"></div>
          <div class="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
            <div class="w-full max-w-sm">
              <h2 class="text-2xl font-bold mb-4">Welcome Back</h2>
              <p class="mb-8 opacity-90">Log in to access your account and continue your art journey.</p>
              
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Heart class="w-5 h-5" />
                  </div>
                  <div>
                    <h3 class="font-medium">Favorites Collection</h3>
                    <p class="text-sm opacity-80">Access your saved artwork</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <ShoppingCart class="w-5 h-5" />
                  </div>
                  <div>
                    <h3 class="font-medium">Order History</h3>
                    <p class="text-sm opacity-80">View and track your purchases</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bell class="w-5 h-5" />
                  </div>
                  <div>
                    <h3 class="font-medium">Personalized Updates</h3>
                    <p class="text-sm opacity-80">Get notified about new artwork</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Decorative Elements -->
          <div class="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/10"></div>
          <div class="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10"></div>
        </div>
        
        <!-- Right Column - Form -->
        <div class="p-8 md:p-12 flex flex-col">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Log In</h1>
            <p class="text-gray-600">Welcome back! Please enter your details</p>
          </div>
  
          <form @submit.prevent="handleLogin" class="flex-1 flex flex-col">
            <div class="space-y-6 flex-1">
              <!-- Email -->
              <div class="form-group">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div class="relative">
                  <input 
                    id="email"
                    v-model="loginData.email"
                    type="email"
                    :class="{'border-red-500': errors.email}"
                    class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="john.doe@example.com"
                  />
                  <Mail class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                </div>
                <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
              </div>
              
              <!-- Password -->
              <div class="form-group">
                <div class="flex justify-between items-center mb-1">
                  <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                  <a href="#" class="text-sm text-primary-600 hover:underline">Forgot password?</a>
                </div>
                <div class="relative">
                  <input 
                    id="password"
                    v-model="loginData.password"
                    :type="showPassword ? 'text' : 'password'"
                    :class="{'border-red-500': errors.password}"
                    class="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="••••••••"
                  />
                  <Lock class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  <button 
                    type="button" 
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <Eye v-if="!showPassword" class="w-5 h-5" />
                    <EyeOff v-else class="w-5 h-5" />
                  </button>
                </div>
                <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
              </div>
              
              <!-- Remember Me -->
              <div class="form-group">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="rememberMe"
                    class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-600">Remember me for 30 days</span>
                </label>
              </div>
            </div>
            
            <!-- Error Message -->
            <div v-if="loginError" class="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {{ loginError }}
            </div>
            
            <!-- Submit Button -->
            <div class="mt-8">
              <button 
                type="submit"
                :disabled="loading"
                class="w-full py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                <Loader v-if="loading" class="w-5 h-5 mr-2 animate-spin" />
                {{ loading ? 'Logging in...' : 'Log in' }}
              </button>
            </div>
            
            <!-- Social Login -->
            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <div class="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  class="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <span class="sr-only">Sign in with Google</span>
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                  </svg>
                </button>
                
                <button
                  type="button"
                  class="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <span class="sr-only">Sign in with Facebook</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <button
                  type="button"
                  class="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <span class="sr-only">Sign in with Apple</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Signup Link -->
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600">
                Don't have an account? 
                <NuxtLink to="/signup" class="text-primary-600 hover:underline font-medium">
                  Sign up
                </NuxtLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { use_auth_login } from "@/composables/auth/login"
  import { 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    Loader,
    Heart,
    ShoppingCart,
    Bell
  } from 'lucide-vue-next'
  import { navigateTo } from '#app'
  const { credential, login, loading, isFormDisabled } = use_auth_login()
  
  // Form data
  const loginData = ref({
    email: '',
    password: ''
  })
  
  // UI state
  const showPassword = ref(false)
  const rememberMe = ref(false)
  // const loading = ref(false)
  const errors = ref<Record<string, string>>({})
  const loginError = ref('')
  
  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!loginData.value.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.value.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!loginData.value.password) {
      newErrors.password = 'Password is required'
    }
    
    errors.value = newErrors
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form submission
  const handleLogin = async () => {
    loginError.value = ''
    
    if (!validateForm()) return
    
    try {
      loading.value = true
      
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1500))
      await login(loginData.value).then(() => {
        navigateTo('/')
      })
      
      // For demo purposes, check if user exists in localStorage
      // const userData = localStorage.getItem('user-data')
      
      // if (userData) {
      //   const user = JSON.parse(userData)
        
      //   if (user.email === loginData.value.email && user.password === loginData.value.password) {
      //     // Successful login
      //     if (rememberMe.value) {
      //       localStorage.setItem('auth-token', 'demo-token-' + Math.random().toString(36).substring(2))
      //     }
          
      //     // Redirect to dashboard or home page
      //     navigateTo('/')
      //   } else {
      //     loginError.value = 'Invalid email or password'
      //   }
      // } else {
      //   loginError.value = 'No account found with this email. Please sign up.'
      // }
      
    } catch (error) {
      console.error('Login failed:', error)
      loginError.value = 'An error occurred. Please try again.'
    } finally {
      loading.value = false
    }
  }
  
  // Clear validation errors when form fields change
  watch(loginData, () => {
    if (Object.keys(errors.value).length > 0) {
      errors.value = {}
    }
    if (loginError.value) {
      loginError.value = ''
    }
  }, { deep: true })
  </script>
  
  <style scoped>
  .bg-primary-600 {
    background-color: #4f46e5;
  }
  
  .bg-primary-700 {
    background-color: #4338ca;
  }
  
  .text-primary-600 {
    color: #4f46e5;
  }
  
  .focus\:ring-primary-500:focus {
    --tw-ring-color: #6366f1;
  }
  
  .bg-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  
  /* Animations */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  </style>