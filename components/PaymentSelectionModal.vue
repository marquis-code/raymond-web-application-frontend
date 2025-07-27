<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
         :class="{'opacity-100': isOpen, 'opacity-0': !isOpen}">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
           @click="onClose"></div>

      <!-- Modal Container -->
      <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl transform transition-all duration-300 mx-auto"
           :class="{'translate-y-0 scale-100': isOpen, 'translate-y-8 scale-95': !isOpen}"
           @click.stop>
        <!-- Close Button -->
        <button 
          @click="onClose"
          class="absolute top-4 right-4 z-20 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-all duration-300 shadow-sm"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
            <path d="m18 6-12 12"/>
            <path d="m6 6 12 12"/>
          </svg>
        </button>

        <!-- Modal Content -->
        <div class="lg:p-6 p-3">
          <!-- Header -->
          <div class="text-center mb-6">
            <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1"/>
                <path d="M3 12v6c0 .552.448 1 1 1h16c.552 0 1-.448 1-1v-6"/>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-900 mb-2">Choose Payment Option</h2>
            <p class="text-gray-600 text-sm">How would you like to pay for your selected items?</p>
          </div>

          <!-- Product Summary -->
          <div v-if="cartItem" class="bg-gray-50 rounded-xl p-4 mb-6">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                <img
                  :src="cartItem.image || '/placeholder.svg?height=64&width=64'"
                  :alt="cartItem.title"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 text-sm truncate">{{ cartItem.title }}</h3>
                <p class="text-sm text-gray-600">{{ cartItem.size }} • Qty: {{ cartItem.quantity }}</p>
                <p class="text-lg font-bold text-gray-900">{{ convertFromUSD(cartItem.price * cartItem.quantity).formattedAmount }}</p>
              </div>
            </div>
          </div>

          <!-- Payment Options -->
          <div class="space-y-4 mb-6">
            <!-- Pay in Full Option -->
            <div class="border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                 :class="selectedPaymentType === 'full' ? 'border-gray-800 bg-gray-50 shadow-md' : 'border-gray-200 hover:border-gray-300'"
                 @click="selectPaymentType('full')">
              <div class="flex items-center">
                <div class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200"
                     :class="selectedPaymentType === 'full' ? 'border-gray-800 bg-gray-800' : 'border-gray-300'">
                  <div v-if="selectedPaymentType === 'full'" class="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <div class="flex-1">
                  <div class="flex flex-col justify-between items-start mb-1">
                    <span class="font-semibold block  text-gray-800">Pay Full Amount</span>
                    <span class="font-bold block  text-emerald-600">{{ convertFromUSD(getTotalAmount()).formattedAmount }}</span>
                  </div>
                  <p class="text-sm text-gray-600">Complete payment now with no additional fees</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-md flex items-center justify-center ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600">
                    <rect width="20" height="14" x="2" y="5" rx="2"/>
                    <line x1="2" x2="22" y1="10" y2="10"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Installment Payment Option -->
            <div v-if="hasInstallmentOption"
                 class="border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                 :class="selectedPaymentType === 'installment' ? 'border-gray-800 bg-gray-50 shadow-md' : 'border-gray-200 hover:border-gray-300'"
                 @click="selectPaymentType('installment')">
              <div class="flex items-center">
                <div class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200"
                     :class="selectedPaymentType === 'installment' ? 'border-gray-800 bg-gray-800' : 'border-gray-300'">
                  <div v-if="selectedPaymentType === 'installment'" class="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <div class="flex-1">
                  <div class="flex flex-col justify-between items-start mb-1">
                    <span class="font-semibold block text-gray-800">Installment Plan</span>
                    <span class="font-bold block text-blue-600">{{ getInstallmentPaymentDisplay() }}</span>
                  </div>
                  <p class="text-sm text-gray-600">
                    Split your payment into {{ getAvailableTermsDisplay() }} manageable installments
                    <span v-if="getInterestRate() > 0" class="text-xs text-gray-500">
                      ({{ getInterestRate() }}% APR)
                    </span>
                  </p>
                </div>
                <div class="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center ml-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                    <line x1="16" x2="16" y1="2" y2="6"/>
                    <line x1="8" x2="8" y1="2" y2="6"/>
                    <line x1="3" x2="21" y1="10" y2="10"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- No Installment Available Message -->
            <div v-if="!hasInstallmentOption" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-600 mr-2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
                <span class="text-sm text-yellow-800">
                  Installment payment is not available for this item
                  <span v-if="cartItem && getTotalAmount() < getMinimumInstallmentThreshold()">
                    (minimum {{ convertFromUSD(getMinimumInstallmentThreshold()).formattedAmount }} required)
                  </span>
                </span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              @click="onClose"
              class="flex-1 text-sm py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              @click="proceedToCheckout"
              :disabled="!selectedPaymentType"
              class="flex-1 text-sm py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { navigateTo } from '#app'
import { useCurrencyConverter } from "@/composables/core/useCurrencyConverter"

const {
  userCountry,
  userCurrency,
  exchangeRates,
  isLoading: currencyLoading,
  error: currencyError,
  lastUpdated,
  initializeUserCurrency,
  convertFromUSD,
  convertCurrency,
} = useCurrencyConverter()

// Remove hardcoded values
// const fixedInstallmentPayment = ref(50) - REMOVED
const convertedPrice = ref<any>({})
const fromCurrency = ref<string>('USD')
const toCurrency = ref<string>('NGN')
const manualConversionResult = ref<any>(null)

// Available currencies for dropdown
const availableCurrencies = computed(() => {
  return Object.keys(exchangeRates.value).sort()
})

const selectedPaymentType = ref<'full' | 'installment'>('full')

interface CartItem {
  id: string
  productId: string
  title: string
  image: string
  price: number
  quantity: number
  size: string
  color?: string
  hasInstallmentOption?: boolean
  installmentConfig?: {
    enabled: boolean
    maxInstallments: number
    interestRate: number
    minimumAmount: number
    availableTerms: number[]
    minimumDownPaymentPercentage: number
    maximumDownPaymentPercentage: number
  }
}

interface Props {
  isOpen: boolean
  cartItem: CartItem | null
  onClose: () => void
  onProceed: (paymentType: string, cartItem: CartItem) => void
}

const props = defineProps<Props>()

const hasInstallmentOption = computed(() => {
  if (!props.cartItem?.installmentConfig) return false
  
  const config = props.cartItem.installmentConfig
  const totalAmount = getTotalAmount()
  
  return config.enabled && 
         totalAmount >= (config.minimumAmount || 0)
})

const getTotalAmount = () => {
  if (!props.cartItem) return 0
  return props.cartItem.price * props.cartItem.quantity
}

const getMinimumInstallmentThreshold = () => {
  return props.cartItem?.installmentConfig?.minimumAmount || 100
}

const getInterestRate = () => {
  return props.cartItem?.installmentConfig?.interestRate || 0
}

const getAvailableTermsDisplay = () => {
  if (!props.cartItem?.installmentConfig?.availableTerms) return ''
  
  const terms = props.cartItem.installmentConfig.availableTerms
  if (terms.length === 1) return `${terms[0]} months`
  if (terms.length === 2) return `${terms[0]} or ${terms[1]} months`
  
  const sortedTerms = [...terms].sort((a, b) => a - b)
  return `${sortedTerms[0]}-${sortedTerms[sortedTerms.length - 1]} months`
}

const calculateInstallmentPayment = (term: number) => {
  if (!props.cartItem?.installmentConfig) return 0
  
  const config = props.cartItem.installmentConfig
  const totalAmount = getTotalAmount()
  const monthlyInterestRate = (config.interestRate / 100) / 12
  
  if (monthlyInterestRate > 0) {
    // Calculate with compound interest
    return (totalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term)) / 
           (Math.pow(1 + monthlyInterestRate, term) - 1)
  } else {
    // Simple division if no interest
    return totalAmount / term
  }
}

const getInstallmentPaymentDisplay = () => {
  if (!props.cartItem?.installmentConfig?.availableTerms) return ''
  
  const terms = props.cartItem.installmentConfig.availableTerms
  const minTerm = Math.min(...terms)
  const maxTerm = Math.max(...terms)
  
  const minPayment = calculateInstallmentPayment(maxTerm) // Lower payment with longer term
  const maxPayment = calculateInstallmentPayment(minTerm) // Higher payment with shorter term
  
  if (minTerm === maxTerm) {
    return `${convertFromUSD(minPayment).formattedAmount}/mo`
  }
  
  return `${convertFromUSD(minPayment).formattedAmount} - ${convertFromUSD(maxPayment).formattedAmount}/mo`
}

const selectPaymentType = (type: 'full' | 'installment') => {
  selectedPaymentType.value = type
}

const proceedToCheckout = async () => {
  if (!props.cartItem || !selectedPaymentType.value) return

  try {
    // Call the parent's proceed function
    props.onProceed(selectedPaymentType.value, props.cartItem)

    // Navigate to checkout with payment type in query params using Nuxt 3
    await navigateTo({
      path: '/checkout',
      query: {
        paymentType: selectedPaymentType.value,
        productId: props.cartItem.productId,
        size: props.cartItem.size
      }
    })
  } catch (error) {
    console.error('Error navigating to checkout:', error)
  }
}

const formatPrice = (price: number) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0.00'
  }
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Initialize on mount
onMounted(async () => {
  await initializeUserCurrency()
  updateConvertedPrice()
})

// Watch for currency changes
watch([userCurrency, exchangeRates], () => {
  updateConvertedPrice()
})

// Update converted price when user currency or exchange rates change
const updateConvertedPrice = () => {
  if (userCurrency.value && Object.keys(exchangeRates.value).length > 0) {
    convertedPrice.value = convertFromUSD(100).formattedAmount // Example conversion
  }
}

// Retry initialization on error
const retryInitialization = async () => {
  await initializeUserCurrency()
  updateConvertedPrice()
}

// Set default target currency to user currency when it changes
watch(userCurrency, (newCurrency) => {
  toCurrency.value = newCurrency
})
</script>

<style scoped>
/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(20px);
}
</style>
