<template>
    <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 lg:p-8">
      <!-- Header -->
      <div class="flex items-center mb-6">
        <div class="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14,2 14,8 20,8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10,9 9,9 8,9"/>
          </svg>
        </div>
        <div>
          <h3 class="text-xl font-bold text-gray-900">Installment Calculator</h3>
          <p class="text-sm text-gray-600">Choose a payment plan that works for you</p>
        </div>
      </div>
  
      <!-- Payment Amount Summary -->
      <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-6">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm text-blue-700 font-medium">Total Amount</p>
            <p class="text-2xl font-bold text-blue-900">${{ formatPrice(totalAmount) }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-blue-700 font-medium">Shipping Fee</p>
            <p class="text-lg font-semibold text-blue-800">${{ formatPrice(shippingFee) }}</p>
          </div>
        </div>
        <div class="mt-2 text-xs text-blue-600">
          <span class="inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1">
              <circle cx="12" cy="12" r="10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            Fixed shipping fee included in all plans
          </span>
        </div>
      </div>
  
      <!-- Installment Plans -->
      <div class="space-y-4 mb-6">
        <div 
          v-for="plan in installmentPlans" 
          :key="plan.id"
          @click="selectPlan(plan)"
          class="relative border-2 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 group"
          :class="selectedPlan?.id === plan.id ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' : 'border-gray-200 hover:border-blue-300'"
        >
          <!-- Popular Badge -->
          <div v-if="plan.isPopular" class="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span class="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
              ⭐ Most Popular
            </span>
          </div>
  
          <div class="flex items-center mb-3">
            <div class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200"
                 :class="selectedPlan?.id === plan.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300 group-hover:border-blue-400'">
              <div v-if="selectedPlan?.id === plan.id" class="w-3 h-3 rounded-full bg-white"></div>
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-center mb-1">
                <h4 class="font-bold text-lg text-gray-900">{{ plan.name }}</h4>
                <div class="text-right">
                  <span class="text-sm text-gray-600">Interest:</span>
                  <span class="font-bold text-lg text-gray-900 ml-1">{{ plan.interestRate }}%</span>
                </div>
              </div>
              <p class="text-sm text-gray-600 mb-2">{{ plan.description }}</p>
            </div>
          </div>
  
          <!-- Plan Details -->
          <div class="grid grid-cols-3 gap-4 text-center border-t border-gray-200 pt-3" :class="{ 'border-blue-200': selectedPlan?.id === plan.id }">
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wide">Down Payment</p>
              <p class="font-bold text-lg text-gray-900">{{ plan.downPaymentPercentage }}%</p>
              <p class="text-sm text-gray-600">${{ formatPrice(calculateDownPayment(plan)) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wide">Monthly</p>
              <p class="font-bold text-lg text-gray-900">${{ formatPrice(calculateMonthlyPayment(plan)) }}</p>
              <p class="text-sm text-gray-600">for {{ plan.months }} months</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wide">Total</p>
              <p class="font-bold text-lg text-gray-900">${{ formatPrice(calculateTotalPayable(plan)) }}</p>
              <p class="text-sm text-gray-600">+${{ formatPrice(calculateInterestAmount(plan)) }} interest</p>
            </div>
          </div>
  
          <!-- Selection Indicator -->
          <div v-if="selectedPlan?.id === plan.id" class="absolute top-4 right-4">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Payment Schedule Preview -->
      <Transition name="fade">
        <div v-if="calculation && showSchedule" class="border-t border-gray-200 pt-6">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-bold text-gray-900">Payment Schedule</h4>
            <button 
              @click="showSchedule = false"
              class="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>
          
          <div class="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
            <div 
              v-for="payment in calculation.schedule" 
              :key="payment.month"
              class="flex items-center p-3 rounded-lg border transition-all duration-200"
              :class="payment.isDownPayment ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'"
            >
              <div class="flex items-center justify-center w-8 h-8 rounded-full mr-3"
                   :class="payment.isDownPayment ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'">
                <span class="text-xs font-bold">{{ payment.isDownPayment ? 'D' : payment.month }}</span>
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900">
                  {{ payment.isDownPayment ? 'Down Payment' : `Month ${payment.month}` }}
                </p>
                <p class="text-sm text-gray-600">Due: {{ formatDate(payment.dueDate) }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-lg text-gray-900">${{ formatPrice(payment.amount) }}</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
  
      <!-- Action Buttons -->
      <div class="flex gap-3 mt-6" v-if="selectedPlan">
        <button 
          v-if="!showSchedule"
          @click="showSchedule = true"
          class="flex-1 py-3 border border-blue-500 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-medium flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          View Schedule
        </button>
        <button 
          @click="confirmInstallmentPlan"
          class="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
          Confirm Plan
        </button>
      </div>
  
      <!-- Summary Card -->
      <div v-if="calculation" class="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
        <h5 class="font-bold text-gray-900 mb-2">Payment Summary</h5>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Product + Shipping:</span>
            <span class="font-semibold">${{ formatPrice(calculation.totalAmount) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Interest ({{ selectedPlan?.interestRate }}%):</span>
            <span class="font-semibold text-orange-600">+${{ formatPrice(calculation.interestAmount) }}</span>
          </div>
          <div class="flex justify-between border-t border-gray-200 pt-1 mt-2">
            <span class="font-bold text-gray-900">Total Payable:</span>
            <span class="font-bold text-lg text-gray-900">${{ formatPrice(calculation.totalPayable) }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import type { InstallmentPlan, InstallmentCalculation, PaymentScheduleItem } from '~/types/installment'
  
  interface Props {
    baseAmount: number
    shippingFee: number
    modelValue: InstallmentPlan | null
  }
  
  interface Emits {
    (e: 'update:modelValue', value: InstallmentPlan | null): void
    (e: 'calculation-change', value: InstallmentCalculation | null): void
    (e: 'confirm-plan', value: { plan: InstallmentPlan; calculation: InstallmentCalculation }): void
  }
  
  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()
  
  const selectedPlan = ref<InstallmentPlan | null>(props.modelValue)
  const calculation = ref<InstallmentCalculation | null>(null)
  const showSchedule = ref(false)
  
  const totalAmount = computed(() => props.baseAmount + props.shippingFee)
  
  const installmentPlans: InstallmentPlan[] = [
    {
      id: 'plan-3',
      name: '3-Month Plan',
      months: 3,
      downPaymentPercentage: 30,
      monthlyPaymentPercentage: 25,
      interestRate: 5,
      totalPayablePercentage: 105,
      description: 'Perfect for smaller purchases with minimal interest',
    },
    {
      id: 'plan-6',
      name: '6-Month Plan',
      months: 6,
      downPaymentPercentage: 25,
      monthlyPaymentPercentage: 15,
      interestRate: 8,
      totalPayablePercentage: 108,
      description: 'Balanced payment schedule with moderate interest',
      isPopular: true,
    },
    {
      id: 'plan-12',
      name: '12-Month Plan',
      months: 12,
      downPaymentPercentage: 20,
      monthlyPaymentPercentage: 8,
      interestRate: 12,
      totalPayablePercentage: 112,
      description: 'Lowest monthly payments with extended timeline',
    },
  ]
  
  const calculateDownPayment = (plan: InstallmentPlan): number => {
    return (totalAmount.value * plan.downPaymentPercentage) / 100
  }
  
  const calculateTotalPayable = (plan: InstallmentPlan): number => {
    return (totalAmount.value * plan.totalPayablePercentage) / 100
  }
  
  const calculateInterestAmount = (plan: InstallmentPlan): number => {
    return calculateTotalPayable(plan) - totalAmount.value
  }
  
  const calculateMonthlyPayment = (plan: InstallmentPlan): number => {
    const totalPayable = calculateTotalPayable(plan)
    const downPayment = calculateDownPayment(plan)
    const remainingAfterDownPayment = totalPayable - downPayment
    return remainingAfterDownPayment / plan.months
  }
  
  const calculateInstallment = (plan: InstallmentPlan): InstallmentCalculation => {
    const downPayment = calculateDownPayment(plan)
    const totalPayable = calculateTotalPayable(plan)
    const interestAmount = calculateInterestAmount(plan)
    const monthlyPayment = calculateMonthlyPayment(plan)
  
    // Generate payment schedule
    const schedule: PaymentScheduleItem[] = []
    const today = new Date()
  
    // Down payment (due immediately)
    schedule.push({
      month: 0,
      amount: downPayment,
      dueDate: today.toISOString().split('T')[0],
      isDownPayment: true,
    })
  
    // Monthly payments
    for (let i = 1; i <= plan.months; i++) {
      const dueDate = new Date(today)
      dueDate.setMonth(dueDate.getMonth() + i)
      schedule.push({
        month: i,
        amount: monthlyPayment,
        dueDate: dueDate.toISOString().split('T')[0],
      })
    }
  
    return {
      totalAmount: totalAmount.value,
      downPayment,
      monthlyPayment,
      totalPayable,
      interestAmount,
      numberOfInstallments: plan.months,
      schedule,
    }
  }
  
  const selectPlan = (plan: InstallmentPlan) => {
    selectedPlan.value = plan
    emit('update:modelValue', plan)
  }
  
  const confirmInstallmentPlan = () => {
    if (selectedPlan.value && calculation.value) {
      emit('confirm-plan', {
        plan: selectedPlan.value,
        calculation: calculation.value
      })
    }
  }
  
  const formatPrice = (price: number): string => {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  // Watch for changes in selected plan
  watch(selectedPlan, (newPlan) => {
    if (newPlan) {
      calculation.value = calculateInstallment(newPlan)
      emit('calculation-change', calculation.value)
    } else {
      calculation.value = null
      emit('calculation-change', null)
    }
  }, { immediate: true })
  
  // Watch for changes in total amount (when prices change)
  watch(() => totalAmount.value, () => {
    if (selectedPlan.value) {
      calculation.value = calculateInstallment(selectedPlan.value)
      emit('calculation-change', calculation.value)
    }
  })
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
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