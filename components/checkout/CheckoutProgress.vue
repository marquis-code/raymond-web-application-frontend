<template>
    <div class="max-w-4xl mx-auto mb-12 animate-fade-in">
      <div class="flex items-center justify-between">
        <div 
          class="flex flex-col items-center"
          :class="{ 'text-black': currentStep >= 1, 'text-gray-400': currentStep < 1 }"
        >
          <div 
            class="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500"
            :class="{ 
              'bg-black text-white scale-110 shadow-lg': currentStep === 1, 
              'bg-black text-white': currentStep > 1, 
              'bg-gray-200': currentStep < 1 
            }"
          >
            <User class="w-5 h-5" />
          </div>
          <span class="text-sm font-medium">Delivery</span>
        </div>
        
        <div class="flex-1 h-1 mx-4 relative">
          <div class="absolute inset-0 bg-gray-200"></div>
          <div 
            class="absolute inset-0 bg-black transition-all duration-500 ease-out"
            :style="{ width: currentStep >= 2 ? '100%' : '0%' }"
          ></div>
        </div>
        
        <div 
          class="flex flex-col items-center"
          :class="{ 'text-black': currentStep >= 2, 'text-gray-400': currentStep < 2 }"
        >
          <div 
            class="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500"
            :class="{ 
              'bg-black text-white scale-110 shadow-lg': currentStep === 2, 
              'bg-black text-white': currentStep > 2, 
              'bg-gray-200': currentStep < 2 
            }"
          >
            <Truck class="w-5 h-5" />
          </div>
          <span class="text-sm font-medium">Shipping</span>
        </div>
        
        <div class="flex-1 h-1 mx-4 relative">
          <div class="absolute inset-0 bg-gray-200"></div>
          <div 
            class="absolute inset-0 bg-black transition-all duration-500 ease-out"
            :style="{ width: currentStep >= 3 ? '100%' : '0%' }"
          ></div>
        </div>
        
        <div 
          class="flex flex-col items-center"
          :class="{ 'text-black': currentStep >= 3, 'text-gray-400': currentStep < 3 }"
        >
          <div 
            class="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500"
            :class="{ 
              'bg-black text-white scale-110 shadow-lg': currentStep === 3, 
              'bg-gray-200': currentStep < 3 
            }"
          >
            <CreditCard class="w-5 h-5" />
          </div>
          <span class="text-sm font-medium">Payment</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { User, Truck, CreditCard } from 'lucide-vue-next'
  
  defineProps({
    currentStep: {
      type: Number,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  