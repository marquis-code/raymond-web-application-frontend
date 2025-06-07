<template>
    <div class="bg-white lg:p-8 rounded-xl shadow-md border border-gray-100 animate-fade-in">
      <h2 class="text-xl font-semibold mb-6 flex items-center">
        <User class="w-5 h-5 mr-2" />
        Delivery Details
      </h2>
      
      <form @submit.prevent="$emit('next')" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="form-group">
          <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input 
            id="firstName"
            v-model="localDetails.firstName"
            type="text"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
          />
        </div>
        
        <div class="form-group">
          <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input 
            id="lastName"
            v-model="localDetails.lastName"
            type="text"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
          />
        </div>
        
        <div class="form-group">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            id="email"
            v-model="localDetails.email"
            type="email"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
          />
        </div>
        
        <div class="form-group">
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input 
            id="phone"
            v-model="localDetails.phone"
            type="tel"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
          />
        </div>
        
        <div class="form-group md:col-span-2">
          <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input 
            id="address"
            v-model="localDetails.address"
            type="text"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
          />
        </div>
        
        <div class="form-group">
          <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input 
            id="city"
            v-model="localDetails.city"
            type="text"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
          />
        </div>
        
        <div class="form-group">
          <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input 
            id="state"
            v-model="localDetails.state"
            type="text"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
          />
        </div>
        
        <div class="form-group">
          <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
          <input 
            id="zipCode"
            v-model="localDetails.zipCode"
            type="text"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
          />
        </div>
        
        <div class="form-group">
          <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select 
            id="country"
            v-model="localDetails.country"
            required
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
          >
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="Kenya">Kenya</option>
            <option value="South Africa">South Africa</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
        
        <div class="md:col-span-2 mt-4">
          <button 
            type="submit"
            class="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            Continue to Shipping
            <ArrowRight class="w-4 h-4 ml-2" />
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { User, ArrowRight } from 'lucide-vue-next'
  
  const props = defineProps({
    deliveryDetails: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['update:delivery-details', 'next'])
  
  // Create a local copy of the delivery details
  const localDetails = ref({ ...props.deliveryDetails })
  
  // Watch for changes in the local details and emit updates
  watch(localDetails.value, (newValue) => {
    emit('update:delivery-details', newValue)
  }, { deep: true })
  
  // Watch for changes in props to update local details
  watch(() => props.deliveryDetails, (newValue) => {
    localDetails.value = { ...newValue }
  }, { deep: true })
  </script>
  
  <style scoped>
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  