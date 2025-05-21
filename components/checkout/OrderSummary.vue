<template>
    <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-6 animate-fade-in">
      <h2 class="text-xl font-semibold mb-4 flex items-center">
        <ShoppingCart class="w-5 h-5 mr-2" />
        Order Summary
      </h2>
      
      <div v-if="checkoutSummary && checkoutSummary.items.length > 0" class="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <div 
          v-for="item in checkoutSummary.items" 
          :key="item.id" 
          class="flex gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
        >
          <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" @error="handleImageError" />
          </div>
          <div class="flex-1">
            <h4 class="font-medium text-sm">{{ item.title }}</h4>
            <p class="text-sm text-gray-600">${{ formatPrice(item.price) }}</p>
            
            <div class="flex items-center mt-2">
              <button 
                @click="$emit('update-quantity', item.id, Math.max(1, item.quantity - 1))"
                class="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Minus class="w-3 h-3" />
              </button>
              <span class="mx-2 text-sm font-medium">{{ item.quantity }}</span>
              <button 
                @click="$emit('update-quantity', item.id, item.quantity + 1)"
                class="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Plus class="w-3 h-3" />
              </button>
              
              <button 
                @click="$emit('remove-item', item.id)"
                class="ml-auto text-gray-400 hover:text-red-500 transition-colors duration-200"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div class="text-right">
            <span class="font-medium">${{ formatPrice(item.price * item.quantity) }}</span>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-200 pt-4 space-y-3">
        <div class="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${{ formatPrice(checkoutSummary?.subtotal || 0) }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Shipping</span>
          <span>
            <template v-if="deliveryMethod === 'standard'">
              {{ (checkoutSummary?.subtotal || 0) > 100 ? 'Free' : '$10.00' }}
            </template>
            <template v-else-if="deliveryMethod === 'express'">
              $25.00
            </template>
            <template v-else>
              Free
            </template>
          </span>
        </div>
        <div class="flex justify-between font-bold pt-3 border-t border-gray-200 mt-3">
          <span>Total</span>
          <span class="text-lg">${{ formatPrice(calculateTotal()) }}</span>
        </div>
      </div>
      
      <div class="mt-6 pt-4 border-t border-gray-200">
        <div class="flex items-center text-sm text-gray-600 mb-4">
          <LockIcon class="w-4 h-4 mr-2" />
          Secure checkout
        </div>
        <div class="flex gap-2">
          <div class="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
            <img src="@/assets/icons/card.svg" alt="Visa" class="h-3" @error="handleImageError" />
          </div>
          <div class="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
            <img src="@/assets/icons/card.svg" alt="Mastercard" class="h-3" @error="handleImageError" />
          </div>
          <div class="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
            <img src="@/assets/icons/card.svg" alt="American Express" class="h-3" @error="handleImageError" />
          </div>
          <div class="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
            <img src="@/assets/icons/card.svg" alt="PayPal" class="h-3" @error="handleImageError" />
          </div>
        </div>
      </div>
      
      <!-- Checkout Timer -->
      <div class="mt-6 pt-4 border-t border-gray-200">
        <div class="bg-rose-50 p-3 rounded-lg flex items-center">
          <Clock class="w-5 h-5 text-rose-500 mr-2" />
          <div>
            <p class="text-sm font-medium text-rose-700">Your cart is reserved for:</p>
            <p class="text-lg font-bold text-rose-600">{{ formatTime(checkoutTimer) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { ShoppingCart, Minus, Plus, Trash2, LockIcon, Clock } from 'lucide-vue-next'
  
  const props = defineProps({
    checkoutSummary: {
      type: Object,
      required: true
    },
    deliveryMethod: {
      type: String,
      required: true
    },
    checkoutTimer: {
      type: Number,
      required: true
    }
  })
  
  const emit = defineEmits(['update-quantity', 'remove-item'])
  
  // Calculate total based on delivery method
  const calculateTotal = () => {
    if (!props.checkoutSummary) return 0
    
    let shipping = 0
    
    if (props.deliveryMethod === 'standard') {
      shipping = props.checkoutSummary.subtotal > 100 ? 0 : 10
    } else if (props.deliveryMethod === 'express') {
      shipping = 25
    }
    
    return props.checkoutSummary.subtotal + shipping
  }
  
  // Format price
  const formatPrice = (price) => {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  
  // Format time for countdown
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  // Handle image error
  const handleImageError = (event) => {
    const target = event.target
    target.src = '/placeholder.svg?height=100&width=100'
  }
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
  
  /* Custom scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  </style>
  