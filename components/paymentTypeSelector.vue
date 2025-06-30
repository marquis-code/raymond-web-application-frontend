<template>
    <div class="mb-8 bg-white p-6 rounded-2xl shadow-sm animate-fade-in-up animation-delay-650">
      <label class="block text-lg font-medium text-gray-900 mb-4">Payment Options</label>
      
      <div class="grid gap-4">
        <!-- Full Payment Option -->
        <div 
          @click="selectPaymentType('full')"
          class="border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 group"
          :class="paymentType === 'full' ? 'border-gray-900 bg-gray-50 shadow-lg scale-105' : 'border-gray-200 hover:border-gray-300'"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200"
                   :class="paymentType === 'full' ? 'border-gray-900 bg-gray-900' : 'border-gray-300 group-hover:border-gray-400'">
                <div v-if="paymentType === 'full'" class="w-3 h-3 rounded-full bg-white"></div>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <h4 class="font-bold text-lg text-gray-900">Pay in Full</h4>
                  <span class="bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </span>
                </div>
                <p class="text-sm text-gray-600">Complete your purchase with a single payment</p>
                <div class="flex items-center mt-2 text-sm text-emerald-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                  <span>No interest • No additional fees • Immediate ownership</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-2xl text-gray-900">${{ formatPrice(totalPrice) }}</p>
              <p class="text-sm text-gray-500">Total</p>
            </div>
          </div>
        </div>
  
        <!-- Installment Payment Option -->
        <div 
          @click="selectPaymentType('installment')"
          class="border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 group"
          :class="paymentType === 'installment' ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' : 'border-gray-200 hover:border-blue-300'"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200"
                   :class="paymentType === 'installment' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 group-hover:border-blue-400'">
                <div v-if="paymentType === 'installment'" class="w-3 h-3 rounded-full bg-white"></div>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <h4 class="font-bold text-lg text-gray-900">Pay with Installments</h4>
                  <span class="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    Flexible
                  </span>
                </div>
                <p class="text-sm text-gray-600">Split your payment across multiple months</p>
                <div class="flex items-center mt-2 text-sm text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                  <span>3, 6, or 12 month plans • Low down payment • Fixed shipping fee</span>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-lg text-gray-900">Starting at</p>
              <p class="font-bold text-2xl text-blue-600">${{ formatPrice(calculateMinimumDownPayment()) }}</p>
              <p class="text-sm text-gray-500">Down payment</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Installment Calculator - Show when installment is selected -->
      <Transition name="slide-fade">
        <div v-if="paymentType === 'installment'" class="mt-6">
          <InstallmentCalculator
            :base-amount="baseAmount"
            :shipping-fee="shippingFee"
            v-model="selectedInstallmentPlan"
            @calculation-change="handleCalculationChange"
            @confirm-plan="handlePlanConfirm"
          />
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { InstallmentPlan, InstallmentCalculation } from '~/types/installment'
  import InstallmentCalculator from './InstallmentCalculator.vue'
  
  interface Props {
    baseAmount: number
    shippingFee: number
    totalPrice: number
    modelValue: 'full' | 'installment'
  }
  
  interface Emits {
    (e: 'update:modelValue', value: 'full' | 'installment'): void
    (e: 'installment-selected', value: { plan: InstallmentPlan; calculation: InstallmentCalculation }): void
    (e: 'full-payment-selected'): void
  }
  
  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  
  const paymentType = ref<'full' | 'installment'>(props.modelValue)
  const selectedInstallmentPlan = ref<InstallmentPlan | null>(null)
  
  const selectPaymentType = (type: 'full' | 'installment') => {
    paymentType.value = type
    emit('update:modelValue', type)
    
    if (type === 'full') {
      selectedInstallmentPlan.value = null
      emit('full-payment-selected')
    }
  }
  
  const calculateMinimumDownPayment = (): number => {
    // Minimum down payment from the 12-month plan (20%)
    const totalAmount = props.baseAmount + props.shippingFee
    return (totalAmount * 20) / 100
  }
  
  const handleCalculationChange = (calculation: InstallmentCalculation | null) => {
    // This is called when the calculation changes in the calculator
  }
  
  const handlePlanConfirm = (data: { plan: InstallmentPlan; calculation: InstallmentCalculation }) => {
    emit('installment-selected', data)
  }
  
  const formatPrice = (price: number): string => {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  </script>
  
  <style scoped>
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.5s ease;
  }
  
  .slide-fade-enter-from {
    opacity: 0;
    transform: translateY(-20px);
  }
  
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  </style>