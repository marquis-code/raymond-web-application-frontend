<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div class="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Left Column - Form -->
        <div class="p-8 md:p-12 flex flex-col">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p class="text-gray-600">Join our community and discover amazing artwork</p>
          </div>
  
          <form @submit.prevent="handleSignup" class="flex-1 flex flex-col">
            <div class="space-y-4 flex-1">
              <!-- Name Fields -->
              <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <div class="relative">
                    <input 
                      id="firstName"
                      v-model="signupData.firstName"
                      type="text"
                      :class="{'border-red-500': errors.firstName}"
                      class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="John"
                    />
                    <User class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                  <p v-if="errors.firstName" class="mt-1 text-sm text-red-500">{{ errors.firstName }}</p>
                </div>
                
                <div class="form-group">
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <div class="relative">
                    <input 
                      id="lastName"
                      v-model="signupData.lastName"
                      type="text"
                      :class="{'border-red-500': errors.lastName}"
                      class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      placeholder="Doe"
                    />
                    <User class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                  </div>
                  <p v-if="errors.lastName" class="mt-1 text-sm text-red-500">{{ errors.lastName }}</p>
                </div>
              </div>
              
              <!-- Email -->
              <div class="form-group">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div class="relative">
                  <input 
                    id="email"
                    v-model="signupData.email"
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
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div class="relative">
                  <input 
                    id="password"
                    v-model="signupData.password"
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
                <div class="mt-2">
                  <div class="flex items-center gap-2 mb-1">
                    <div class="h-1 flex-1 rounded-full" :class="passwordStrength >= 1 ? 'bg-red-500' : 'bg-gray-200'"></div>
                    <div class="h-1 flex-1 rounded-full" :class="passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-gray-200'"></div>
                    <div class="h-1 flex-1 rounded-full" :class="passwordStrength >= 3 ? 'bg-green-500' : 'bg-gray-200'"></div>
                    <div class="h-1 flex-1 rounded-full" :class="passwordStrength >= 4 ? 'bg-green-600' : 'bg-gray-200'"></div>
                  </div>
                  <p class="text-xs text-gray-500">
                    {{ passwordStrengthText }}
                  </p>
                </div>
              </div>
              
              <!-- Phone (Optional) -->
              <div class="form-group">
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                <div class="relative">
                  <input 
                    id="phone"
                    v-model="signupData.phone"
                    type="tel"
                    class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="+1 (234) 567-8900"
                  />
                  <Phone class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>
              
              <!-- Terms and Conditions -->
              <div class="form-group">
                <label class="flex items-start gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="acceptTerms"
                    :class="{'border-red-500': errors.terms}"
                    class="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span class="text-sm text-gray-600">
                    I agree to the <a href="#" class="text-primary-600 hover:underline">Terms of Service</a> and <a href="#" class="text-primary-600 hover:underline">Privacy Policy</a>
                  </span>
                </label>
                <p v-if="errors.terms" class="mt-1 text-sm text-red-500">{{ errors.terms }}</p>
              </div>
            </div>
            
            <!-- Submit Button -->
            <div class="mt-8">
              <button 
                type="submit"
                :disabled="loading"
                class="w-full py-3 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                <Loader v-if="loading" class="w-5 h-5 mr-2 animate-spin" />
                {{ loading ? 'Creating Account...' : 'Create Account' }}
              </button>
            </div>
            
            <!-- Login Link -->
            <div class="mt-6 text-center">
              <p class="text-sm text-gray-600">
                Already have an account? 
                <NuxtLink to="/login" class="text-primary-600 hover:underline font-medium">
                  Log in
                </NuxtLink>
              </p>
            </div>
          </form>
        </div>
        
        <!-- Right Column - Illustration -->
        <div class="hidden md:block relative bg-primary-600 overflow-hidden">
          <div class="absolute inset-0 bg-pattern opacity-10"></div>
          <div class="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
            <div class="w-full max-w-sm">
              <h2 class="text-2xl font-bold mb-4">Join Our Art Community</h2>
              <p class="mb-8 opacity-90">Discover unique artwork from talented artists around the world.</p>
              
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Palette class="w-5 h-5" />
                  </div>
                  <div>
                    <h3 class="font-medium">Curated Collections</h3>
                    <p class="text-sm opacity-80">Explore handpicked artwork collections</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <ShoppingBag class="w-5 h-5" />
                  </div>
                  <div>
                    <h3 class="font-medium">Secure Purchases</h3>
                    <p class="text-sm opacity-80">Buy art with confidence and security</p>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Truck class="w-5 h-5" />
                  </div>
                  <div>
                    <h3 class="font-medium">Fast Delivery</h3>
                    <p class="text-sm opacity-80">Artwork delivered to your doorstep</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Decorative Elements -->
          <div class="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/10"></div>
          <div class="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10"></div>
        </div>
      </div>
      
      <!-- Success Modal -->
      <Transition name="fade">
        <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-bounce-in">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <CheckCircle class="w-8 h-8" />
              </div>
              <h2 class="text-2xl font-bold mb-2">Account Created!</h2>
              <p class="text-gray-600 mb-6">Your account has been created successfully. You can now log in.</p>
              <NuxtLink 
                to="/login"
                class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-all duration-300 inline-block"
              >
                Go to Login
              </NuxtLink>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
import { use_auth_signup } from '@/composables/auth/register'
  import { ref, computed, watch } from 'vue'
  import { 
    User, 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    Phone, 
    Loader, 
    CheckCircle,
    Palette,
    ShoppingBag,
    Truck
  } from 'lucide-vue-next'
  
  // Form data
  const signupData = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer'
  })
  
  // UI state
  const showPassword = ref(false)
  const acceptTerms = ref(false)
  // const loading = ref(false)
  const showSuccessModal = ref(false)
  const errors = ref<Record<string, string>>({})
  const { credential, signup, loading, isFormDisabled } = use_auth_signup()
  
  // Password strength
  const passwordStrength = computed(() => {
    const password = signupData.value.password
    if (!password) return 0
    
    let strength = 0
    
    // Length check
    if (password.length >= 8) strength++
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength++
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength++
    
    // Contains number
    if (/[0-9]/.test(password)) strength++
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) strength++
    
    return Math.min(4, strength)
  })
  
  const passwordStrengthText = computed(() => {
    switch (passwordStrength.value) {
      case 0: return 'Password is required'
      case 1: return 'Password is weak'
      case 2: return 'Password is fair'
      case 3: return 'Password is good'
      case 4: return 'Password is strong'
      default: return ''
    }
  })
  
  // Form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!signupData.value.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!signupData.value.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!signupData.value.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.value.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!signupData.value.password) {
      newErrors.password = 'Password is required'
    } else if (signupData.value.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (!acceptTerms.value) {
      newErrors.terms = 'You must accept the terms and conditions'
    }
    
    errors.value = newErrors
    return Object.keys(newErrors).length === 0
  }
  
  // Handle form submission
  const handleSignup = async () => {
    if (!validateForm()) return
    
    try {
      loading.value = true
      
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1500))
      await signup(signupData.value).then((res) => {
        console.log(res, 'res hee')
        if(res.type !== "ERROR"){
          showSuccessModal.value = true
          // Reset form
          signupData.value = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            role: 'customer'
          }
          acceptTerms.value = false
        }
      })
      
      // Store user data in localStorage (for demo purposes)
      // localStorage.setItem('user-data', JSON.stringify({
      //   ...signupData.value,
      //   id: Math.floor(Math.random() * 1000000),
      //   createdAt: new Date().toISOString()
      // }))
      
      // Show success modal
      
    } catch (error) {
      console.error('Signup failed:', error)
      // Handle error (could add error state and message)
    } finally {
      loading.value = false
    }
  }
  
  // Clear validation errors when form fields change
  watch(signupData, () => {
    if (Object.keys(errors.value).length > 0) {
      errors.value = {}
    }
  }, { deep: true })
  
  watch(acceptTerms, () => {
    if (errors.value.terms) {
      delete errors.value.terms
    }
  })
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
  
  /* Transitions */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .animate-bounce-in {
    animation: bounceIn 0.5s ease-out;
  }
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  </style>