<template>
  <div>
    <!-- Enhanced Dark Overlay with Blur Animation -->
    <Transition name="overlay">
      <div 
        v-if="true"
        class="fixed inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50 backdrop-blur-md z-40"
        @click.self="$emit('close')"
      />
    </Transition>

    <!-- Revamped Side Drawer - Half Screen Width -->
    <Transition name="drawer">
      <div 
        v-if="true"
        class="fixed inset-y-0 right-0 w-96 min-w-2xl bg-gradient-to-br from-white via-gray-50 to-white z-50 shadow-2xl flex flex-col h-full border-l border-gray-200/50"
      >
        <!-- Animated Header with Gradient -->
        <div class="relative p-6 border-b border-gray-200/50 bg-gradient-to-r from-white to-gray-50 sticky top-0 z-10 backdrop-blur-sm">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-3">
              <div class="relative">
                <h2 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Your Cart
                </h2>
                <div class="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-black to-gray-600 transform scale-x-0 animate-scale-in" />
              </div>
              <Transition name="badge" mode="out-in">
                <span 
                  v-if="cartItemCount > 0" 
                  :key="cartItemCount"
                  class="bg-gradient-to-r from-black to-gray-800 text-white text-sm px-3 py-1.5 rounded-full shadow-lg animate-bounce-subtle"
                >
                  {{ cartItemCount }}
                </span>
              </Transition>
            </div>
            
            <button 
              @click="$emit('close')" 
              class="group p-3 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:rotate-90"
              aria-label="Close cart"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                fill="currentColor" 
                viewBox="0 0 256 256"
                class="group-hover:text-red-500 transition-colors duration-300"
              >
                <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
              </svg>
            </button>
          </div>
          
          <!-- Animated Progress Bar -->
          <div class="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-black via-gray-700 to-black transition-all duration-1000 ease-out"
              :style="{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }"
            />
          </div>
          <p class="text-xs text-gray-500 mt-1">
            <span v-if="subtotal < 500">Add {{ convertFromUSD(500 - subtotal).formattedAmount }} more for free shipping</span>
            <span v-else class="text-green-600 font-medium">🎉 You qualify for free shipping!</span>
          </p>
        </div>

        <!-- Enhanced Empty Cart State -->
        <div v-if="cartItemCount === 0" class="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <div class="relative mb-8">
            <div class="w-32 h-32 text-gray-300 animate-float">
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H216Z"/>
              </svg>
            </div>
            <div class="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
          </div>
          
          <h3 class="text-2xl font-bold text-gray-900 mb-4 animate-fade-in-up">Your cart is empty</h3>
          <p class="text-gray-500 mb-8 max-w-sm leading-relaxed animate-fade-in-up animation-delay-200">
            Discover amazing artwork and add them to your cart to get started on your creative journey.
          </p>
          
          <button 
            @click="$emit('close')"
            class="group px-8 py-4 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fade-in-up animation-delay-400"
          >
            <span class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" class="group-hover:animate-bounce">
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/>
              </svg>
              Start Shopping
            </span>
          </button>
        </div>

        <!-- Enhanced Cart Items with Creative Layout -->
        <div v-else class="flex-grow overflow-y-auto p-6 bg-gradient-to-b from-gray-50/50 to-white custom-scrollbar">
          <TransitionGroup name="cart-item" tag="div" class="space-y-4">
            <div 
              v-for="(item, index) in cart"
              :key="item.id"
              class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="flex p-5">
                <!-- Enhanced Item Image with Overlay Effects -->
                <div class="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200 group-hover:border-gray-300 transition-all duration-300">
                  <img 
                    :src="item.image" 
                    :alt="item.title" 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <!-- Quantity Badge on Image -->
                  <div class="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-black to-gray-800 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg animate-pulse-subtle">
                    {{ item.quantity }}
                  </div>
                </div>

                <!-- Enhanced Item Details -->
                <div class="flex-grow pl-5 flex flex-col justify-between">
                  <div>
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="font-semibold text-gray-900 text-lg leading-tight group-hover:text-black transition-colors duration-300">
                        {{ item.title }}
                      </h4>
                      <button 
                        @click="removeItem(item.id)"
                        class="group/remove p-2 rounded-full hover:bg-red-50 transition-all duration-300 hover:scale-110"
                        aria-label="Remove item"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="18" 
                          height="18" 
                          fill="currentColor" 
                          viewBox="0 0 256 256"
                          class="text-gray-400 group-hover/remove:text-red-500 transition-colors duration-300"
                        >
                          <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/>
                        </svg>
                      </button>
                    </div>
                    
                    <p class="text-sm text-gray-500 mb-3 flex items-center gap-2">
                      <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      {{ item.quantity }} × {{ convertFromUSD(item.price).formattedAmount }}
                    </p>
                  </div>

                  <!-- Enhanced Quantity Controls and Price -->
                  <div class="flex justify-between items-center">
                    <div class="flex items-center bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                      <button 
                        @click="updateQuantity(item.id, item.quantity - 1)"
                        class="px-4 py-2 text-gray-600 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                        :disabled="item.quantity <= 1"
                        :class="{ 'opacity-50 cursor-not-allowed': item.quantity <= 1 }"
                        aria-label="Decrease quantity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"/>
                        </svg>
                      </button>
                      
                      <span class="px-4 py-2 min-w-[40px] text-center font-semibold bg-white shadow-sm">
                        {{ item.quantity }}
                      </span>
                      
                      <button 
                        @click="updateQuantity(item.id, item.quantity + 1)"
                        class="px-4 py-2 text-gray-600 hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
                        aria-label="Increase quantity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                          <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>
                        </svg>
                      </button>
                    </div>
                    
                    <div class="text-right">
                      <span class="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {{ convertFromUSD(item.price * item.quantity).formattedAmount }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Enhanced Cart Summary with Animations -->
        <div v-if="cartItemCount > 0" class="border-t border-gray-200/50 p-6 bg-gradient-to-r from-white to-gray-50 backdrop-blur-sm">
          <div class="space-y-4 mb-6">
            <div class="flex justify-between text-gray-600 animate-slide-in-left">
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H216Z"/>
                </svg>
                Subtotal
              </span>
              <span class="font-medium">{{ convertFromUSD(subtotal)?.formattedAmount }}</span>
            </div>
            
            <div class="flex justify-between text-gray-600 animate-slide-in-left animation-delay-100">
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M240,104H229.2L201.42,41.5A16,16,0,0,0,186.8,32H69.2a16,16,0,0,0-14.62,9.5L26.8,104H16a8,8,0,0,0,0,16h8v80a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V120h8a8,8,0,0,0,0-16ZM69.2,48H186.8l24,56H45.2ZM216,200H40V120H216Z"/>
                </svg>
                Shipping
              </span>
              <span v-if="subtotal > 500" class="text-green-600 font-semibold animate-pulse">Free! 🎉</span>
              <span v-else class="font-medium">{{ convertFromUSD(10).formattedAmount }}</span>
            </div>
            
            <div class="flex justify-between font-bold text-xl text-gray-900 pt-4 border-t border-gray-200 animate-slide-in-left animation-delay-200">
              <span>Total</span>
              <span class="bg-gradient-to-r from-black to-gray-800 bg-clip-text text-transparent">
                {{ convertFromUSD(total)?.formattedAmount }}
              </span>
            </div>
          </div>

          <!-- Enhanced Action Buttons -->
          <div class="space-y-3">
            <button 
              @click="proceedToCheckout"
              class="group w-full py-4 bg-gradient-to-r from-black via-gray-900 to-black text-white rounded-xl hover:from-gray-800 hover:via-black hover:to-gray-800 transition-all duration-500 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] animate-slide-in-up"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" class="group-hover:animate-bounce">
                <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM216,192H40V112H216Zm0-96H40V64H216ZM56,160a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,160Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H112A8,8,0,0,1,104,160Z"/>
              </svg>
              <span class="font-semibold">Proceed to Checkout</span>
              <div class="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </button>
            
            <button 
              @click="continueToShopping"
              class="group w-full py-3 text-gray-600 hover:text-gray-900 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-gray-100 rounded-xl animate-slide-in-up animation-delay-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" class="group-hover:animate-bounce-horizontal">
                <path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z"/>
              </svg>
              <span class="font-medium">Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '~/composables/useCartStore'
import { useCheckoutStore } from '~/composables/useCheckoutStore'
import { navigateTo } from '#app'
const router = useRouter()
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

const fixedInstallmentPayment = ref(50)
const convertedPrice = ref<any>({})
const fromCurrency = ref<string>('USD')
const toCurrency = ref<string>('NGN')
const manualConversionResult = ref<any>(null)

const availableCurrencies = computed(() => {
  return Object.keys(exchangeRates.value).sort()
})

onMounted(async () => {
  await initializeUserCurrency()
  updateConvertedPrice()
})

watch([userCurrency, exchangeRates], () => {
  updateConvertedPrice()
})

const updateConvertedPrice = () => {
  if (userCurrency.value && Object.keys(exchangeRates.value).length > 0) {
    convertedPrice.value = convertFromUSD(100)
  }
}

const retryInitialization = async () => {
  await initializeUserCurrency()
  updateConvertedPrice()
}

const emit = defineEmits(['close'])
const { cart, removeFromCart, updateCartItemQuantity } = useCartStore()
const { initializeCheckout } = useCheckoutStore()

const cartItemCount = computed(() => cart.value.length)

const subtotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const total = computed(() => {
  const shipping = subtotal.value > 500 ? 0 : 10
  return subtotal.value + shipping
})

const removeItem = (id: number) => {
  removeFromCart(id)
}

const updateQuantity = (id: number, quantity: number) => {
  if (quantity < 1) return
  updateCartItemQuantity(id, quantity)
}

const proceedToCheckout = () => {
  initializeCheckout({
    items: cart.value,
    subtotal: subtotal.value,
    shipping: subtotal.value > 500 ? 0 : 10,
    total: total.value
  })
  emit('close')
  navigateTo('/checkout')
}

const formatPrice = (price: number) => {
  return price
}

const continueToShopping = () => {
  emit('close')
  router.push('/artworks')
}
</script>

<style scoped>
/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #64748b, #475569);
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #475569, #334155);
}

/* Enhanced Transitions */
.overlay-enter-active,
.overlay-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.cart-item-enter-from,
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.9);
}

.cart-item-move {
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.badge-enter-active,
.badge-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.badge-enter-from,
.badge-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

/* Custom Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes bounce-subtle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes pulse-subtle {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes scale-in {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-left {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-horizontal {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-5px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}

.animate-scale-in {
  animation: scale-in 0.8s ease-out 0.5s both;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out both;
}

.animate-slide-in-left {
  animation: slide-in-left 0.6s ease-out both;
}

.animate-slide-in-up {
  animation: slide-in-up 0.6s ease-out both;
}

.animate-bounce-horizontal {
  animation: bounce-horizontal 1s ease-in-out infinite;
}

/* Animation Delays */
.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}
</style>