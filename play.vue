<template>
    <div v-if="isOpen && product" class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <button
              @click="onClose"
              class="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              <span class="font-medium">Back</span>
            </button>
            
            <div class="flex items-center space-x-4">
              <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l11 11Z"/>
                </svg>
              </button>
              <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="18" cy="5" r="3"/>
                  <circle cx="6" cy="12" r="3"/>
                  <circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Product Images -->
          <div class="space-y-4">
            <!-- Main Image -->
            <div class="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg group">
              <!-- TV Badge -->
              <div class="absolute top-4 left-4 z-10">
                <div class="bg-orange-400 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1">
                  <span>AS SEEN ON</span>
                  <span class="font-bold">TV</span>
                </div>
              </div>
  
              <!-- Image Counter -->
              <div class="absolute top-4 right-4 z-10 bg-gray-900/70 text-white px-2 py-1 rounded-lg text-sm backdrop-blur-sm">
                {{ currentImageIndex + 1 }}/{{ product.images.length }}
              </div>
  
              <!-- Main Image Display -->
              <div class="relative w-full h-full">
                <transition-group 
                  name="image-fade" 
                  tag="div" 
                  class="relative w-full h-full"
                >
                  <div
                    v-for="(image, index) in product.images"
                    :key="`main-image-${index}`"
                    v-show="index === currentImageIndex"
                    class="absolute inset-0 flex items-center justify-center p-8"
                  >
                    <img 
                      :src="image"
                      :alt="`${product.name} - view ${index + 1}`" 
                      class="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </transition-group>
              </div>
  
              <!-- Navigation Arrows -->
              <div v-if="product.images.length > 1" class="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                <button 
                  @click="previousImage" 
                  class="ml-4 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-300 transform hover:scale-110 pointer-events-auto"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </button>
                <button 
                  @click="nextImage" 
                  class="mr-4 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-300 transform hover:scale-110 pointer-events-auto"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
  
              <!-- Dots Indicator -->
              <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <button
                  v-for="(_, index) in product.images"
                  :key="`dot-${index}`"
                  @click="setCurrentImage(index)"
                  class="w-3 h-3 rounded-full transition-all duration-300"
                  :class="currentImageIndex === index ? 'bg-orange-400' : 'bg-gray-300 hover:bg-gray-400'"
                  :aria-label="`View image ${index + 1}`"
                ></button>
              </div>
            </div>
  
            <!-- Thumbnail Grid -->
            <div v-if="product.images.length > 1" class="grid grid-cols-5 gap-2">
              <button
                v-for="(image, index) in product.images"
                :key="`thumb-${index}`"
                @click="setCurrentImage(index)"
                class="aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105"
                :class="currentImageIndex === index ? 'border-orange-400 ring-2 ring-orange-400/20' : 'border-gray-200 hover:border-gray-300'"
              >
                <img 
                  :src="image" 
                  :alt="`${product.name} - thumbnail ${index + 1}`" 
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
  
            <!-- Free Shipping Banner -->
            <div class="bg-teal-50 border border-teal-200 rounded-lg p-4 flex items-center space-x-3">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9,22 9,12 15,12 15,22"/>
                  </svg>
                </div>
              </div>
              <div>
                <p class="font-medium text-teal-900">Free shipping included.</p>
                <p class="text-sm text-teal-700">Delivered in 2-4 days</p>
              </div>
            </div>
          </div>
  
          <!-- Product Information -->
          <div class="space-y-6">
            <!-- Product Title and Rating -->
            <div class="space-y-4">
              <div>
                <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {{ product.name }}
                </h1>
              </div>
  
              <!-- Rating and Reviews -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-1">
                    <div class="flex items-center">
                      <svg v-for="star in 5" :key="star" class="w-5 h-5" :class="star <= 4 ? 'text-orange-400' : 'text-gray-300'" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <span class="text-lg font-medium text-gray-900 ml-2">4.6</span>
                    <span class="text-gray-500">(264 reviews)</span>
                  </div>
                </div>
                
                <!-- Trust Badge -->
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-gray-500">feefo</span>
                  <div class="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600 font-medium">
                    Independent Customer Feedback
                  </div>
                </div>
              </div>
  
              <!-- Product Description -->
              <p class="text-lg text-gray-600 leading-relaxed">
                Sensors, audio and comfortable noise-masking earbuds will transform your sleep
              </p>
            </div>
  
            <!-- Pricing -->
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <span class="text-2xl text-gray-400 line-through">
                  <span v-if="!selectedSize">From {{ convertFromUSD(getMinPrice(product) * 1.4)?.formattedAmount }}</span>
                  <span v-else>{{ convertFromUSD(getSelectedSizePrice() * 1.4)?.formattedAmount }}</span>
                </span>
                <span class="text-3xl lg:text-4xl font-bold text-teal-600">
                  <span v-if="!selectedSize">{{ convertFromUSD(getMinPrice(product))?.formattedAmount }}</span>
                  <span v-else>{{ convertFromUSD(getSelectedSizePrice())?.formattedAmount }}</span>
                </span>
              </div>
            </div>
  
            <!-- Size Selection -->
            <div v-if="product.sizes && product.sizes.length > 0" class="space-y-3">
              <label class="block text-lg font-medium text-gray-900">Size Selection</label>
              <div class="grid grid-cols-2 gap-3">
                <button
                  v-for="size in product.sizes"
                  :key="size._id"
                  @click="selectedSize = size._id"
                  class="p-4 border-2 rounded-xl text-center transition-all duration-300 hover:shadow-md"
                  :class="selectedSize === size._id ? 
                    'border-orange-400 bg-orange-50 text-orange-900 shadow-lg transform scale-105' : 
                    'border-gray-200 hover:border-gray-300 text-gray-700'"
                >
                  <div class="font-semibold">{{ size.size.charAt(0).toUpperCase() + size.size.slice(1) }}</div>
                  <div class="text-sm mt-1 opacity-75">
                    {{ convertFromUSD(size.price)?.formattedAmount }}
                  </div>
                </button>
              </div>
            </div>
  
            <!-- Quantity Selection -->
            <div class="space-y-3">
              <label class="block text-lg font-medium text-gray-900">Quantity</label>
              <div class="flex items-center justify-between">
                <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                  <button 
                    @click="decrementQuantity" 
                    class="px-4 py-3 hover:bg-gray-50 transition-colors duration-200 text-gray-600 disabled:opacity-50"
                    :disabled="quantity <= 1"
                    aria-label="Decrease quantity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M5 12h14"/>
                    </svg>
                  </button>
                  <input 
                    v-model.number="quantity" 
                    type="number" 
                    min="1" 
                    class="w-16 py-3 text-center border-0 bg-white text-gray-900 focus:ring-0 focus:outline-none font-medium"
                    aria-label="Quantity"
                  />
                  <button 
                    @click="incrementQuantity" 
                    class="px-4 py-3 hover:bg-gray-50 transition-colors duration-200 text-gray-600"
                    aria-label="Increase quantity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 5v14m-7-7h14"/>
                    </svg>
                  </button>
                </div>
                
                <!-- Total Price -->
                <div v-if="selectedSize && quantity > 1" class="text-lg font-medium text-gray-900">
                  Total: <span class="text-teal-600">{{ convertFromUSD(getTotalPrice())?.formattedAmount }}</span>
                </div>
              </div>
            </div>
  
            <!-- Order Button -->
            <div class="space-y-4">
              <button 
                @click="handleAddToCart" 
                class="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-4 px-6 font-semibold text-lg rounded-xl hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                :disabled="!selectedSize"
              >
                <span v-if="!selectedSize">Select Size to Continue</span>
                <span v-else>Order Now</span>
              </button>
            </div>
  
            <!-- Here is what you get! -->
            <div class="bg-orange-50 rounded-xl p-6 space-y-4 border border-orange-100">
              <h3 class="text-xl font-bold text-gray-900">Here is what you get!</h3>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">Pair of award winning Nightbuds</p>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">Access to the MyKokoon app</p>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">30-day trial</p>
                </div>
              </div>
            </div>
  
            <!-- What's included in the box? -->
            <div class="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-200">
              <h3 class="text-xl font-bold text-gray-900">What's included in the box?</h3>
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">Nightbuds headphone</p>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">Nightbuds carry case</p>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">4 pairs of silicone sizing tips</p>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p class="text-gray-700">USB Type-C charging cable</p>
                </div>
              </div>
            </div>
  
            <!-- Expandable Product Information -->
            <div class="space-y-4">
              <!-- Product Details -->
              <div v-if="product.productInfo" class="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button 
                  @click="toggleSection('productInfo')"
                  class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-all duration-300"
                  :aria-expanded="expandedSections.productInfo"
                >
                  <h3 class="font-semibold text-gray-900">Product Details</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" :class="{'rotate-45': expandedSections.productInfo}">
                    <path d="M12 5v14m-7-7h14"/>
                  </svg>
                </button>
                <div 
                  class="overflow-hidden transition-all duration-300 border-t border-gray-100"
                  :class="expandedSections.productInfo ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
                >
                  <div class="p-4 bg-gray-50">
                    <div class="text-gray-700 prose prose-sm max-w-none" v-html="product.productInfo"></div>
                  </div>
                </div>
              </div>
  
              <!-- Shipping Information -->
              <div v-if="product.shippingInfo" class="border border-gray-200 rounded-xl overflow-hidden bg-white">
                <button 
                  @click="toggleSection('shippingInfo')"
                  class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-all duration-300"
                  :aria-expanded="expandedSections.shippingInfo"
                >
                  <h3 class="font-semibold text-gray-900">Shipping Information</h3>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" :class="{'rotate-45': expandedSections.shippingInfo}">
                    <path d="M12 5v14m-7-7h14"/>
                  </svg>
                </button>
                <div 
                  class="overflow-hidden transition-all duration-300 border-t border-gray-100"
                  :class="expandedSections.shippingInfo ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
                >
                  <div class="p-4 bg-gray-50">
                    <div class="text-gray-700 prose prose-sm max-w-none" v-html="product.shippingInfo"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Payment Selection Modal -->
      <PaymentSelectionModal
        :is-open="showPaymentModal"
        :cart-item="pendingCartItem"
        :on-close="closePaymentModal"
        :on-proceed="handlePaymentSelection"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
  import { useFetchProduct } from "@/composables/modules/products/useFetchProduct"
  import { useCartStore } from '@/composables/useCartStore'
  import { useCustomToast } from '@/composables/core/useCustomToast'
  import PaymentSelectionModal from './PaymentSelectionModal.vue'
  import { useCurrencyConverter } from "@/composables/core/useCurrencyConverter"
  
  // Initialize currency converter
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
  
  // Available currencies for dropdown
  const availableCurrencies = computed(() => {
    return Object.keys(exchangeRates.value).sort()
  })
  
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
      convertedPrice.value = convertFromUSD(100) // Example conversion
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
  
  interface Props {
    isOpen: boolean
    productId: string | null
    onClose: () => void
    onAddToCart?: (item: any) => void
  }
  
  const props = defineProps<Props>()
  
  const { product, loading, fetchProduct } = useFetchProduct()
  const { addToCart: addItemToCart } = useCartStore()
  const { showToast } = useCustomToast()
  
  // Component state
  const selectedSize = ref('')
  const quantity = ref(1)
  const currentImageIndex = ref(0)
  const showPaymentModal = ref(false)
  const pendingCartItem = ref(null)
  const isTransitioning = ref(false)
  
  // Touch/swipe state
  const touchStartX = ref(0)
  const touchEndX = ref(0)
  
  // Expandable sections state
  const expandedSections = reactive({
    productInfo: false,
    shippingInfo: false
  })
  
  // Handle keyboard events for accessibility
  const handleKeyDown = (event: KeyboardEvent) => {
    if (!props.isOpen) return
    
    if (event.key === 'Escape') {
      props.onClose()
    } else if (event.key === 'ArrowRight') {
      nextImage()
    } else if (event.key === 'ArrowLeft') {
      previousImage()
    }
  }
  
  // Touch handlers for mobile swipe
  const handleTouchStart = (event: TouchEvent) => {
    touchStartX.value = event.changedTouches[0].screenX
  }
  
  const handleTouchEnd = (event: TouchEvent) => {
    touchEndX.value = event.changedTouches[0].screenX
    handleSwipe()
  }
  
  const handleSwipe = () => {
    const swipeThreshold = 50
    const diff = touchStartX.value - touchEndX.value
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextImage()
      } else {
        previousImage()
      }
    }
  }
  
  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchend', handleTouchEnd)
  })
  
  // Watch for product ID changes to fetch product data
  watch(() => props.productId, (newProductId) => {
    if (newProductId && props.isOpen) {
      fetchProduct(newProductId)
      // Reset component state
      selectedSize.value = ''
      quantity.value = 1
      currentImageIndex.value = 0
    }
  }, { immediate: true })
  
  // Watch for modal open/close to reset state
  watch(() => props.isOpen, (isOpen) => {
    if (!isOpen) {
      // Reset state when modal closes
      selectedSize.value = ''
      quantity.value = 1
      currentImageIndex.value = 0
      showPaymentModal.value = false
      pendingCartItem.value = null
    }
  })
  
  const getMinPrice = (product: any) => {
    if (product.sizes && product.sizes.length > 0) {
      return Math.min(...product.sizes.map((size: any) => size.price))
    }
    return product.price || 0
  }
  
  const getSelectedSizePrice = () => {
    if (!product.value || !selectedSize.value) return 0
    const size = product.value.sizes.find((s: any) => s._id === selectedSize.value)
    return size ? size.price : getMinPrice(product.value)
  }
  
  const getTotalPrice = () => {
    return getSelectedSizePrice() * quantity.value
  }
  
  const incrementQuantity = () => {
    quantity.value++
  }
  
  const decrementQuantity = () => {
    if (quantity.value > 1) {
      quantity.value--
    }
  }
  
  const setCurrentImage = (index: number) => {
    if (isTransitioning.value) return
    
    isTransitioning.value = true
    currentImageIndex.value = index
    
    setTimeout(() => {
      isTransitioning.value = false
    }, 300)
  }
  
  const nextImage = () => {
    if (product.value && product.value.images.length > 1 && !isTransitioning.value) {
      setCurrentImage((currentImageIndex.value + 1) % product.value.images.length)
    }
  }
  
  const previousImage = () => {
    if (product.value && product.value.images.length > 1 && !isTransitioning.value) {
      setCurrentImage(currentImageIndex.value === 0 ? product.value.images.length - 1 : currentImageIndex.value - 1)
    }
  }
  
  const toggleSection = (section: keyof typeof expandedSections) => {
    expandedSections[section] = !expandedSections[section]
  }
  
  const hasInstallmentOption = (size: any) => {
    return size.installmentConfig && size.installmentConfig.enabled
  }
  
  const handleAddToCart = () => {
    try {
      if (!product.value || !selectedSize.value) {
        showToast({
          title: "Selection Required",
          message: "Please select a size before adding to cart",
          toastType: "warning",
          duration: 3000
        })
        return
      }
  
      const size = product.value.sizes.find((s: any) => s._id === selectedSize.value)
      if (!size) {
        showToast({
          title: "Invalid Selection",
          message: "Selected size is not available",
          toastType: "error",
          duration: 3000
        })
        return
      }
  
      // Create cart item
      const cartItem = {
        id: `${product.value._id}-${size.size}-${Date.now()}`,
        productId: product.value._id,
        title: product.value.name,
        image: product.value.images?.[0] || '/placeholder.svg?height=300&width=300',
        price: size.price,
        quantity: quantity.value,
        size: size.size,
        color: size.color,
        installmentConfig: size.installmentConfig || null,
        hasInstallmentOption: hasInstallmentOption(size),
        category: product.value.category,
        weight: product.value.weight,
        dimensions: {
          width: product.value.width,
          height: product.value.height,
          length: product.value.length
        }
      }
  
      // Store the cart item for the payment modal
      pendingCartItem.value = cartItem
  
      // Show payment selection modal
      showPaymentModal.value = true
    } catch (error) {
      console.error('Error adding to cart:', error)
      showToast({
        title: "Error",
        message: "Failed to add item to cart. Please try again.",
        toastType: "error",
        duration: 3000
      })
    }
  }
  
  const closePaymentModal = () => {
    showPaymentModal.value = false
    pendingCartItem.value = null
  }
  
  const handlePaymentSelection = (paymentType: string, cartItem: any) => {
    // Add the item to cart
    addItemToCart(cartItem)
  
    // Show success toast
    showToast({
      title: "Added to Cart",
      message: `${cartItem.quantity} × ${cartItem.title} (${cartItem.size}) added to cart`,
      toastType: "success",
      duration: 3000
    })
  
    // Close both modals
    closePaymentModal()
    props.onClose()
  
    // Call the parent's onAddToCart if provided
    if (props.onAddToCart) {
      props.onAddToCart(cartItem)
    }
  }
  
  const formatPrice = (price: number) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return '0.00'
    }
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  </script>
  
  <style scoped>
  /* Image fade animations */
  .image-fade-enter-active {
    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .image-fade-leave-active {
    transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .image-fade-enter-from {
    opacity: 0;
  }
  
  .image-fade-leave-to {
    opacity: 0;
  }
  
  /* Custom scrollbar */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
  
  /* Button hover effects */
  button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  button:active {
    transform: scale(0.98);
  }
  
  /* Image hover effects */
  img {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* Performance optimizations */
  * {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }
  
  .overflow-y-auto {
    -webkit-overflow-scrolling: touch;
  }
  
  /* Touch feedback */
  @media (hover: none) and (pointer: coarse) {
    button:active {
      transform: scale(0.95);
      transition: transform 0.1s;
    }
  }
  
  /* Prose styling for content sections */
  .prose {
    line-height: 1.6;
  }
  
  </style>