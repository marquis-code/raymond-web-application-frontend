<template>
    <div class="bg-white p-8 rounded-xl shadow-md border border-gray-100 animate-fade-in">
      <h2 class="text-xl font-semibold mb-6 flex items-center">
        <CreditCard class="w-5 h-5 mr-2" />
        Payment Method
      </h2>
      
      <!-- Payment Method Selection -->
      <div class="space-y-4 mb-8">
        <div 
          class="border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
          :class="{ 'border-black bg-gray-50 shadow-sm': localPaymentMethod === 'flutterwave', 'border-gray-200': localPaymentMethod !== 'flutterwave' }"
          @click="setPaymentMethod('flutterwave')"
        >
          <div class="flex items-center">
            <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200"
                 :class="{ 'border-black': localPaymentMethod === 'flutterwave', 'border-gray-300': localPaymentMethod !== 'flutterwave' }">
              <div v-if="localPaymentMethod === 'flutterwave'" class="w-3 h-3 rounded-full bg-black animate-scale-in"></div>
            </div>
            <div class="flex-1">
              <span class="font-medium">Pay with Flutterwave</span>
              <p class="text-sm text-gray-600">Secure payment via Flutterwave</p>
            </div>
            <div class="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
              <img src="@/assets/icons/flutterwave.svg" alt="Flutterwave" class="w-6 h-6" @error="handleImageError" />
            </div>
          </div>
        </div>
        
        <div 
          class="border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
          :class="{ 'border-black bg-gray-50 shadow-sm': localPaymentMethod === 'manual', 'border-gray-200': localPaymentMethod !== 'manual' }"
          @click="setPaymentMethod('manual')"
        >
          <div class="flex items-center">
            <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200"
                 :class="{ 'border-black': localPaymentMethod === 'manual', 'border-gray-300': localPaymentMethod !== 'manual' }">
              <div v-if="localPaymentMethod === 'manual'" class="w-3 h-3 rounded-full bg-black animate-scale-in"></div>
            </div>
            <div class="flex-1">
              <span class="font-medium">Credit/Debit Card</span>
              <p class="text-sm text-gray-600">Pay directly with your card</p>
            </div>
            <div class="flex space-x-1">
              <div class="w-8 h-6 bg-gray-100 rounded flex items-center justify-center">
                <img src="@/assets/icons/card.svg" alt="Visa" class="h-3" @error="handleImageError" />
              </div>
              <div class="w-8 h-6 bg-gray-100 rounded flex items-center justify-center">
                <img src="@/assets/icons/card.svg" alt="Mastercard" class="h-3" @error="handleImageError" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Manual Payment Form -->
      <Transition name="fade">
        <div v-if="localPaymentMethod === 'manual'" class="border-t border-gray-200 pt-6 mt-6">
          <h3 class="text-lg font-medium mb-4">Card Details</h3>
          <form class="space-y-4">
            <div class="form-group">
              <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <div class="relative">
                <input 
                  id="cardNumber"
                  v-model="localCardDetails.cardNumber"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  required
                  class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                />
                <CreditCard class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            
            <div class="form-group">
              <label for="cardName" class="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
              <input 
                id="cardName"
                v-model="localCardDetails.cardName"
                type="text"
                placeholder="John Doe"
                required
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input 
                  id="expiryDate"
                  v-model="localCardDetails.expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div class="form-group">
                <label for="cvv" class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <div class="relative">
                  <input 
                    id="cvv"
                    v-model="localCardDetails.cvv"
                    type="text"
                    placeholder="123"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                  <div class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-help group">
                    <HelpCircle class="w-4 h-4 text-gray-400" />
                    <div class="absolute bottom-full right-0 mb-2 w-48 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      The 3-digit security code on the back of your card
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Transition>
      
      <div class="flex gap-4 mt-6">
        <button 
          @click="$emit('prev')"
          class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
        >
          <ArrowLeft class="w-4 h-4 mr-2" />
          Back
        </button>
        <button 
          @click="$emit('process-payment')"
          :disabled="isProcessing"
          class="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
        >
          <Loader v-if="isProcessing" class="w-5 h-5 mr-2 animate-spin" />
          {{ isProcessing ? 'Processing...' : 'Complete Order' }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { CreditCard, ArrowLeft, HelpCircle, Loader } from 'lucide-vue-next'
  
  const props = defineProps({
    paymentMethod: {
      type: String,
      required: true
    },
    cardDetails: {
      type: Object,
      required: true
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(['update:payment-method', 'update:card-details', 'process-payment', 'prev'])
  
  // Create local copies of the payment method and card details
  const localPaymentMethod = ref(props.paymentMethod)
  const localCardDetails = ref({ ...props.cardDetails })
  
  // Set payment method
  const setPaymentMethod = (method) => {
    localPaymentMethod.value = method
    emit('update:payment-method', method)
  }
  
  // Handle image error
  const handleImageError = (event) => {
    const target = event.target
    target.src = '/placeholder.svg?height=100&width=100'
  }
  
  // Watch for changes in local card details and emit updates
  watch(localCardDetails.value, (newValue) => {
    emit('update:card-details', newValue)
  }, { deep: true })
  
  // Watch for changes in props to update local values
  watch(() => props.paymentMethod, (newValue) => {
    localPaymentMethod.value = newValue
  })
  
  watch(() => props.cardDetails, (newValue) => {
    localCardDetails.value = { ...newValue }
  }, { deep: true })
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
  
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .animate-scale-in {
    animation: scaleIn 0.3s ease-out forwards;
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
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
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  