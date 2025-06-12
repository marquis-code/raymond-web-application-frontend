<template>
    <div class="bg-white p-8 rounded-xl shadow-md border border-gray-100 animate-fade-in">
      <h2 class="text-xl font-semibold mb-6 flex items-center">
        <Truck class="w-5 h-5 mr-2" />
        Shipping Method
      </h2>
      
      <div class="space-y-4 mb-8">
        <div 
          class="border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
          :class="{ 'border-black bg-gray-50 shadow-sm': localDeliveryMethod === 'standard', 'border-gray-200': localDeliveryMethod !== 'standard' }"
          @click="setMethod('standard')"
        >
          <div class="flex items-center">
            <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200"
                 :class="{ 'border-black': localDeliveryMethod === 'standard', 'border-gray-300': localDeliveryMethod !== 'standard' }">
              <div v-if="localDeliveryMethod === 'standard'" class="w-3 h-3 rounded-full bg-black animate-scale-in"></div>
            </div>
            <div class="flex-1">
              <div class="flex justify-between">
                <span class="font-medium">Standard Delivery</span>
                <span class="font-medium">{{ subtotal > 100 ? 'Free' : '$10.00' }}</span>
              </div>
              <p class="text-sm text-gray-600">Delivery within 5-7 business days</p>
            </div>
          </div>
        </div>
        
        <div 
          class="border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
          :class="{ 'border-black bg-gray-50 shadow-sm': localDeliveryMethod === 'express', 'border-gray-200': localDeliveryMethod !== 'express' }"
          @click="setMethod('express')"
        >
          <div class="flex items-center">
            <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200"
                 :class="{ 'border-black': localDeliveryMethod === 'express', 'border-gray-300': localDeliveryMethod !== 'express' }">
              <div v-if="localDeliveryMethod === 'express'" class="w-3 h-3 rounded-full bg-black animate-scale-in"></div>
            </div>
            <div class="flex-1">
              <div class="flex justify-between">
                <span class="font-medium">Express Delivery</span>
                <span class="font-medium">$25.00</span>
              </div>
              <p class="text-sm text-gray-600">Delivery within 2-3 business days</p>
            </div>
          </div>
        </div>
        
        <!-- <div 
          class="border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
          :class="{ 'border-black bg-gray-50 shadow-sm': localDeliveryMethod === 'pickup', 'border-gray-200': localDeliveryMethod !== 'pickup' }"
          @click="setMethod('pickup')"
        >
          <div class="flex items-center">
            <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200"
                 :class="{ 'border-black': localDeliveryMethod === 'pickup', 'border-gray-300': localDeliveryMethod !== 'pickup' }">
              <div v-if="localDeliveryMethod === 'pickup'" class="w-3 h-3 rounded-full bg-black animate-scale-in"></div>
            </div>
            <div class="flex-1">
              <div class="flex justify-between">
                <span class="font-medium">Store Pickup</span>
                <span class="font-medium">Free</span>
              </div>
              <p class="text-sm text-gray-600">Pickup at our gallery location</p>
            </div>
          </div>
        </div> -->
      </div>
      
      <div class="flex gap-4">
        <button 
          @click="$emit('prev')"
          class="flex-1 py-3 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
        >
          <ArrowLeft class="w-4 h-4 mr-2" />
          Back
        </button>
        <button 
          @click="$emit('next')"
          class="flex-1 py-3 px-3 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          Continue to Payment
          <ArrowRight class="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { Truck, ArrowLeft, ArrowRight } from 'lucide-vue-next'
  import { useCheckoutStore } from '@/composables/useCheckoutStore'
  
  const props = defineProps({
    deliveryMethod: {
      type: String,
      required: true
    }
  })
  
  const emit = defineEmits(['update:delivery-method', 'next', 'prev'])
  
  // Get subtotal from checkout store
  const { checkoutSummary } = useCheckoutStore()
  const subtotal = computed(() => checkoutSummary.value?.subtotal || 0)
  
  // Create a local copy of the delivery method
  const localDeliveryMethod = ref(props.deliveryMethod)
  
  // Set delivery method
  const setMethod = (method) => {
    localDeliveryMethod.value = method
    emit('update:delivery-method', method)
  }
  
  // Watch for changes in props to update local delivery method
  watch(() => props.deliveryMethod, (newValue) => {
    localDeliveryMethod.value = newValue
  })
  </script>
  
  <style scoped>
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .animate-scale-in {
    animation: scaleIn 0.3s ease-out forwards;
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
  
  @keyframes scaleIn {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
  </style>
  