<template>
  <div class="min-h-screen bg-gray-50 mt-16">
    <!-- Header -->
    <div class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Back Button & Title -->
          <div class="flex items-center space-x-4">
            <button
              @click="$router.back()"
              class="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110"
              aria-label="Go back"
            >
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Shopping Cart</h1>
              <!-- <p class="text-sm text-gray-500" v-if="cartItemCount > 0">{{ cartItemCount }} {{ cartItemCount === 1 ? 'item' : 'items' }}</p> -->
            </div>
          </div>

          <!-- Cart Count Badge -->
          <div v-if="cartItemCount > 0" class="relative">
            <div class="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-medium animate-pulse">
              {{ cartItemCount }} {{ cartItemCount === 1 ? 'item' : 'items' }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Breadcrumbs -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <nav class="flex items-center space-x-2 text-sm text-gray-500">
        <NuxtLink to="/" class="hover:text-gray-700 transition-colors">Home</NuxtLink>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
        <span class="text-gray-900 font-medium">Shopping Cart</span>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <!-- Empty Cart State -->
      <div v-if="cartItemCount === 0" class="text-center py-16">
        <div class="animate-bounce-slow mb-8">
          <div class="w-32 h-32 mx-auto text-gray-300 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 256 256">
              <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H216Z"/>
            </svg>
          </div>
        </div>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p class="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Discover amazing artworks and add them to your cart to get started.
        </p>
        
        <div class="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <NuxtLink
            to="/artworks"
            class="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            Browse Artworks
          </NuxtLink>
          
          <NuxtLink
            to="/categories"
            class="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            Explore Categories
          </NuxtLink>
        </div>
      </div>

      <!-- Cart with Items -->
      <div v-else class="lg:grid lg:grid-cols-12 lg:gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-8">
          <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
            <!-- Cart Header -->
            <div class="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900">Cart Items</h2>
                <button
                  @click="clearCart"
                  v-if="cartItemCount > 1"
                  class="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            <!-- Items List -->
            <div class="divide-y divide-gray-100">
              <TransitionGroup name="cart-item" tag="div">
                <div
                  v-for="(item, index) in cart"
                  :key="item.id"
                  class="p-6 hover:bg-gray-50 transition-all duration-300"
                  :style="{ transitionDelay: `${index * 50}ms` }"
                >
                  <div class="flex items-start space-x-4">
                    <!-- Item Image -->
                    <div class="flex-shrink-0 group">
                      <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 shadow-md group-hover:shadow-lg transition-all duration-300">
                        <img
                          :src="item.image"
                          :alt="item.title"
                          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <!-- Item Details -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between">
                        <div class="flex-1 min-w-0">
                          <h3 class="text-lg font-semibold text-gray-900 mb-1 truncate">
                            {{ item.title }}
                          </h3>
                          <p class="text-sm text-gray-600 mb-2">
                            Size: <span class="font-medium">{{ item.size }}</span>
                          </p>
                          <p class="text-lg font-bold text-blue-600">
                            {{ convertFromUSD(item.price)?.formattedAmount }}
                          </p>
                        </div>

                        <!-- Remove Button -->
                        <button
                          @click="removeItemWithAnimation(item.id)"
                          class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
                          aria-label="Remove item"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                          </svg>
                        </button>
                      </div>

                      <!-- Quantity Controls & Total -->
                      <div class="flex items-center justify-between mt-4">
                        <!-- Quantity Controls -->
                        <div class="flex items-center">
                          <label class="text-sm font-medium text-gray-700 mr-3">Qty:</label>
                          <div class="flex items-center bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                            <button
                              @click="updateQuantity(item.id, item.quantity - 1)"
                              :disabled="item.quantity <= 1"
                              class="px-3 py-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                              aria-label="Decrease quantity"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                              </svg>
                            </button>
                            
                            <div class="px-4 py-2 bg-white border-x border-gray-200 min-w-[60px] text-center">
                              <span class="font-semibold text-gray-900">{{ item.quantity }}</span>
                            </div>
                            
                            <button
                              @click="updateQuantity(item.id, item.quantity + 1)"
                              class="px-3 py-2 text-gray-600 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
                              aria-label="Increase quantity"
                            >
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <!-- Item Total -->
                        <div class="text-right">
                          <p class="text-sm text-gray-500">Total</p>
                          <p class="text-xl font-bold text-gray-900">
                            {{ convertFromUSD(item.price * item.quantity)?.formattedAmount }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </div>

          <!-- Continue Shopping -->
          <div class="mt-6">
            <NuxtLink
              to="/artworks"
              class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group"
            >
              <svg class="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Continue Shopping
            </NuxtLink>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-4 mt-8 lg:mt-0">
          <div class="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-24">
            <!-- Summary Header -->
            <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900">Order Summary</h3>
            </div>

            <!-- Summary Details -->
            <div class="p-6 space-y-4">
              <!-- Subtotal -->
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Subtotal ({{ cartItemCount }} {{ cartItemCount === 1 ? 'item' : 'items' }})</span>
                <span class="font-semibold text-gray-900">
                  {{ convertFromUSD(subtotal)?.formattedAmount }}
                </span>
              </div>

              <!-- Shipping -->
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Shipping</span>
                <span class="font-semibold" :class="subtotal > 100 ? 'text-green-600' : 'text-gray-900'">
                  <span v-if="subtotal > 100" class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                    Free
                  </span>
                  <span v-else>{{ convertFromUSD(10)?.formattedAmount }}</span>
                </span>
              </div>

              <!-- Free Shipping Progress -->
              <div v-if="subtotal <= 100" class="bg-gray-100 rounded-full p-1">
                <div class="bg-blue-600 rounded-full h-2 transition-all duration-500" :style="{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }"></div>
                <p class="text-xs text-gray-600 mt-2 text-center">
                  Add {{ convertFromUSD(100 - subtotal)?.formattedAmount }} more for free shipping
                </p>
              </div>

              <!-- Divider -->
              <hr class="border-gray-200">

              <!-- Total -->
              <div class="flex justify-between items-center text-lg font-bold">
                <span class="text-gray-900">Total</span>
                <span class="text-blue-600">{{ convertFromUSD(total)?.formattedAmount }}</span>
              </div>

              <!-- Checkout Button -->
              <button
                @click="proceedToCheckout"
                :disabled="isCheckingOut"
                class="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 text-sm px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
              >
                <div class="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="relative z-10 flex items-center justify-center">
                  <svg v-if="!isCheckingOut" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                  <div v-if="isCheckingOut" class="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {{ isCheckingOut ? 'Processing...' : 'Proceed to Checkout' }}
                </span>
              </button>

              <!-- Security Badge -->
              <div class="flex items-center justify-center mt-4 text-sm text-gray-500">
                <svg class="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                Secure checkout powered by SSL
              </div>
            </div>
          </div>

          <!-- Recommended Items -->
          <div class="mt-6 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-100">
              <h3 class="text-lg font-semibold text-gray-900">You might also like</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="i in 2" :key="i" class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div class="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div class="flex-1">
                    <div class="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div class="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="bg-white rounded-2xl p-8 shadow-2xl">
        <div class="flex items-center space-x-4">
          <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-lg font-medium text-gray-900">Updating cart...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useCartStore } from '~/composables/useCartStore'
import { useCheckoutStore } from '~/composables/useCheckoutStore'
import { useCurrencyConverter } from "@/composables/core/useCurrencyConverter"
  import { useFetchProducts } from "@/composables/modules/products/useFetchProducts"
  
const { products: allProducts, loading: fetchingProducts } = useFetchProducts()
// Meta
definePageMeta({
  title: 'Shopping Cart',
  description: 'Review and manage your cart items'
})

// Composables
const router = useRouter()
const { cart, removeFromCart, updateCartItemQuantity, clearAllItems } = useCartStore()
const { initializeCheckout } = useCheckoutStore()

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

// State
const isLoading = ref(false)
const isCheckingOut = ref(false)
const removingItems = ref(new Set())

// Computed
const cartItemCount = computed(() => cart.value.length)

const subtotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const total = computed(() => {
  const shipping = subtotal.value > 100 ? 0 : 10
  return subtotal.value + shipping
})

  // Related products computation
  const relatedProducts = computed(() => {
    if (!product.value || !allProducts.value.length) return []
    
    const sameCategory = allProducts.value.filter(p => 
      p._id !== product.value?._id && 
      p.category?._id === product.value?.category?._id
    )
    
    if (sameCategory.length >= 4) {
      return sameCategory.slice(0, 4)
    }
    
    const otherProducts = allProducts.value.filter(p => 
      p._id !== product.value?._id && 
      p.category?._id !== product.value?.category?._id
    )
    
    const shuffled = [...otherProducts].sort(() => 0.5 - Math.random())
    return [...sameCategory, ...shuffled].slice(0, 4)
  })

// Methods
const removeItemWithAnimation = async (id: number) => {
  removingItems.value.add(id)
  
  // Add a small delay for animation
  setTimeout(() => {
    removeFromCart(id)
    removingItems.value.delete(id)
  }, 300)
}

const updateQuantity = async (id: number, quantity: number) => {
  if (quantity < 1) return
  
  isLoading.value = true
  
  // Simulate API call delay
  setTimeout(() => {
    updateCartItemQuantity(id, quantity)
    isLoading.value = false
  }, 300)
}

const clearCart = async () => {
  if (confirm('Are you sure you want to clear all items from your cart?')) {
    isLoading.value = true
    
    setTimeout(() => {
      clearAllItems()
      isLoading.value = false
    }, 500)
  }
}

const proceedToCheckout = async () => {
  isCheckingOut.value = true
  
  try {
    // Initialize checkout with cart data
    initializeCheckout({
      items: cart.value,
      subtotal: subtotal.value,
      shipping: subtotal.value > 100 ? 0 : 10,
      total: total.value
    })
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Navigate to checkout
    await navigateTo('/checkout')
  } catch (error) {
    console.error('Checkout error:', error)
  } finally {
    isCheckingOut.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await initializeUserCurrency()
})

// Watch for cart changes and show feedback
watch(cartItemCount, (newCount, oldCount) => {
  if (oldCount !== undefined && newCount < oldCount) {
    // Item was removed - could show a toast notification here
  }
})
</script>

<style scoped>
/* Cart item animations */
.cart-item-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.cart-item-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}

.cart-item-move {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom animations */
@keyframes bounce-slow {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 3s infinite;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Loading states */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

/* Hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:-translate-x-1 {
  transform: translateX(-0.25rem);
}

/* Button effects */
button:active {
  transform: scale(0.98);
}

/* Responsive improvements */
@media (max-width: 640px) {
  .sticky {
    position: relative;
  }
}

/* Focus states for accessibility */
button:focus,
a:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .bg-gray-50 {
    background-color: #ffffff;
  }
  
  .text-gray-600 {
    color: #000000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
