<template>
    <Transition name="fade">
      <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
          <!-- Auth Check Mode -->
          <div v-if="mode === 'check'">
            <h2 class="text-2xl font-bold mb-4">Create an Account?</h2>
            <p class="text-gray-600 mb-6">Creating an account helps you track your orders and get updates on your purchases.</p>
            <div class="flex flex-col gap-4">
              <button 
                @click="$emit('mode-change', 'signin')"
                class="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </button>
              <button 
                @click="$emit('mode-change', 'signup')"
                class="flex-1 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all duration-300 transform hover:scale-105"
              >
                Create Account
              </button>
              <button 
                @click="$emit('guest-continue')"
                class="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                Continue as Guest
              </button>
            </div>
          </div>
          
          <!-- Sign In Mode -->
          <div v-else-if="mode === 'signin'">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">Sign In</h2>
              <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
                <X class="w-5 h-5" />
              </button>
            </div>
            
            <form @submit.prevent="handleSignin" class="space-y-4">
              <div class="form-group">
                <label for="signinEmail" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  id="signinEmail"
                  v-model="signinData.email"
                  type="email"
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <div class="form-group">
                <label for="signinPassword" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  id="signinPassword"
                  v-model="signinData.password"
                  type="password"
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <button 
                type="submit"
                :disabled="isSigningIn"
                class="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
              >
                <Loader v-if="isSigningIn" class="w-5 h-5 mr-2 animate-spin" />
                {{ isSigningIn ? 'Signing In...' : 'Sign In' }}
              </button>
              
              <div class="text-center mt-4">
                <p class="text-gray-600">
                  Don't have an account? 
                  <button 
                    @click="$emit('mode-change', 'signup')" 
                    class="text-rose-600 hover:text-rose-700 font-medium"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </form>
          </div>
          
          <!-- Sign Up Mode -->
          <div v-else-if="mode === 'signup'">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">Create Account</h2>
              <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
                <X class="w-5 h-5" />
              </button>
            </div>
            
            <form @submit.prevent="handleSignup" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    id="firstName"
                    v-model="signupData.firstName"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div class="form-group">
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    id="lastName"
                    v-model="signupData.lastName"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="signupEmail" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  id="signupEmail"
                  v-model="signupData.email"
                  type="email"
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <div class="form-group">
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  id="password"
                  v-model="signupData.password"
                  type="password"
                  required
                  minlength="6"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <p class="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
              </div>
              
              <div class="form-group">
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                <input 
                  id="phone"
                  v-model="signupData.phone"
                  type="tel"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <button 
                type="submit"
                :disabled="isSigningUp"
                class="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
              >
                <Loader v-if="isSigningUp" class="w-5 h-5 mr-2 animate-spin" />
                {{ isSigningUp ? 'Creating Account...' : 'Create Account' }}
              </button>
              
              <div class="text-center mt-4">
                <p class="text-gray-600">
                  Already have an account? 
                  <button 
                    @click="$emit('mode-change', 'signin')" 
                    class="text-rose-600 hover:text-rose-700 font-medium"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { X, Loader } from 'lucide-vue-next'
  import { use_auth_signup } from '@/composables/auth/register'
  import { use_auth_login } from '@/composables/auth/login'
  
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'check'
    }
  })
  
  const emit = defineEmits(['close', 'mode-change', 'signin-success', 'signup-success', 'guest-continue'])
  
  // Auth composables
  const { signup } = use_auth_signup()
  const { login } = use_auth_login()
  
  // Form states
  const isSigningUp = ref(false)
  const isSigningIn = ref(false)
  
  // Signup data
  const signupData = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer'
  })
  
  // Signin data
  const signinData = ref({
    email: '',
    password: ''
  })
  
  // Handle signup
  const handleSignup = async () => {
    try {
      isSigningUp.value = true
      
      // Call signup method from auth composable
      const payloadObj = {
        firstName: signupData.value.firstName,
        lastName: signupData.value.lastName,
        email: signupData.value.email,
        password: signupData.value.password,
        phone: signupData.value.phone,
        role: signupData.value.role
      }
      const response = await signup(payloadObj)
      
      if (response) {
        // Emit success event with user data
        emit('signup-success', {
          firstName: signupData.value.firstName,
          lastName: signupData.value.lastName,
          email: signupData.value.email,
          phone: signupData.value.phone
        })
        
        // Reset form
        signupData.value = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          phone: '',
          role: 'customer'
        }
      }
    } catch (error) {
      console.error('Signup failed:', error)
      // Handle error (could add error state and message)
    } finally {
      isSigningUp.value = false
    }
  }
  
  // Handle signin
  const handleSignin = async () => {
    try {
      isSigningIn.value = true
      
      // Call signin method from auth composable
      const payloadObj = {
        email: signinData.value.email,
        password: signinData.value.password
      }
      const response = await login(payloadObj)
      
      if (response) {
        // Get user data from localStorage
        const userData = JSON.parse(localStorage.getItem('user-data') || '{}')
        
        // Emit success event with user data
        emit('signin-success', userData)
        
        // Reset form
        signinData.value = {
          email: '',
          password: ''
        }
      }
    } catch (error) {
      console.error('Signin failed:', error)
      // Handle error (could add error state and message)
    } finally {
      isSigningIn.value = false
    }
  }
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-scale-in {
    animation: scaleIn 0.3s ease-out forwards;
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  