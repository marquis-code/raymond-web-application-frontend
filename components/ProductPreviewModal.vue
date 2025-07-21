<template>
  <Teleport to="body">
    <!-- Full Screen Modal -->
    <transition 
      name="modal-animation"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <div 
        v-if="isOpen && product" 
        class="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white"
      >
        <!-- Header with Close Button -->
        <div class="sticky top-0 z-20 flex items-center justify-between p-3 md:p-4 bg-white/95 backdrop-blur-md border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <h2 class="text-lg md:text-xl font-medium text-gray-900 truncate">{{ product.name }}</h2>
            <div class="hidden md:flex items-center space-x-2">
              <span class="text-xs text-gray-500">{{ currentImageIndex + 1 }} of {{ product.images.length }}</span>
              <div class="flex space-x-1">
                <div 
                  v-for="(_, index) in product.images" 
                  :key="index"
                  class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  :class="currentImageIndex === index ? 'bg-gray-800' : 'bg-gray-300'"
                ></div>
              </div>
            </div>
          </div>
          <button 
            @click="onClose"
            class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
            aria-label="Close preview"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
              <path d="m18 6-12 12"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col lg:flex-row overflow-hidden lg:overflow-visible">
          <!-- Large Image Section - Takes up 70% of viewport height on mobile, 100% width on desktop -->
          <div class="relative flex-1 bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto lg:overflow-hidden min-h-[70vh] lg:min-h-full">
            <!-- Main Image Container -->
            <div class="relative w-full h-full flex items-center justify-center p-2 md:p-4">
              <!-- Image Carousel -->
              <div class="relative w-full max-w-5xl h-full flex items-center justify-center">
                <div class="relative w-full h-full overflow-hidden rounded-xl shadow-2xl bg-white">
                  <!-- Image Stack with 3D Effect -->
                  <div class="relative w-full h-full">
                    <transition-group 
                      name="image-slide" 
                      tag="div" 
                      class="relative w-full h-full"
                    >
                      <div
                        v-for="(image, index) in product.images"
                        :key="`image-${index}`"
                        v-show="index === currentImageIndex"
                        class="absolute inset-0 flex items-center justify-center p-2"
                        :style="{ 
                          transform: getImageTransform(index),
                          zIndex: index === currentImageIndex ? 10 : 1
                        }"
                      >
                        <img 
                          :src="image"
                          :alt="`${product.name} - view ${index + 1}`" 
                          class="max-w-full max-h-full object-contain transition-all duration-700 hover:scale-105"
                          :class="{ 'animate-zoom-in': index === currentImageIndex }"
                        />
                      </div>
                    </transition-group>
                  </div>

                  <!-- Navigation Arrows -->
                  <div v-if="product.images.length > 1" class="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                    <button 
                      @click.stop="previousImage" 
                      class="ml-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-300 transform hover:scale-110 hover:-translate-x-1 pointer-events-auto group"
                      aria-label="Previous image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700 group-hover:text-gray-900 transition-colors">
                        <path d="m15 18-6-6 6-6"/>
                      </svg>
                    </button>
                    <button 
                      @click.stop="nextImage" 
                      class="mr-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all duration-300 transform hover:scale-110 hover:translate-x-1 pointer-events-auto group"
                      aria-label="Next image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700 group-hover:text-gray-900 transition-colors">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </button>
                  </div>

                  <!-- Image Counter (Mobile) -->
                  <div class="lg:hidden absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs backdrop-blur-sm">
                    {{ currentImageIndex + 1 }} / {{ product.images.length }}
                  </div>

                  <!-- Zoom Indicator -->
                  <div class="hidden lg:block absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div class="flex items-center space-x-1 text-xs text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                        <path d="M11 8v6"/>
                        <path d="M8 11h6"/>
                      </svg>
                      <span>Hover to zoom</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop Thumbnail Navigation - Vertical on Right Side -->
            <div v-if="product?.images?.length > 1" class="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2">
              <div class="flex flex-col space-y-2 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
                <button
                  v-for="(image, index) in product.images"
                  :key="`thumb-${index}`"
                  @click.stop="setCurrentImage(index)"
                  class="relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 group flex-shrink-0"
                  :class="currentImageIndex === index ? 
                    'border-gray-800 scale-110 shadow-lg' : 
                    'border-transparent hover:border-gray-400 hover:scale-105'"
                  :aria-label="`View image ${index + 1}`"
                >
                  <img 
                    :src="image" 
                    :alt="`${product.name} - thumbnail ${index + 1}`" 
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <!-- Active Indicator -->
                  <div 
                    v-if="currentImageIndex === index"
                    class="absolute inset-0 bg-gray-800/20 flex items-center justify-center"
                  >
                    <div class="w-2 h-2 bg-white rounded-full shadow-lg"></div>
                  </div>
                </button>
              </div>
            </div>

            <!-- Mobile Thumbnail Navigation - Bottom -->
            <div v-if="product?.images?.length > 1" class="lg:hidden absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div class="flex space-x-2 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-xl border border-gray-200 max-w-xs overflow-x-auto">
                <button
                  v-for="(image, index) in product.images"
                  :key="`thumb-mobile-${index}`"
                  @click.stop="setCurrentImage(index)"
                  class="relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-300 group flex-shrink-0"
                  :class="currentImageIndex === index ? 
                    'border-gray-800 scale-110 shadow-lg' : 
                    'border-transparent hover:border-gray-400 hover:scale-105'"
                  :aria-label="`View image ${index + 1}`"
                >
                  <img 
                    :src="image" 
                    :alt="`${product.name} - thumbnail ${index + 1}`" 
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <!-- Active Indicator -->
                  <div 
                    v-if="currentImageIndex === index"
                    class="absolute inset-0 bg-gray-800/20 flex items-center justify-center"
                  >
                    <div class="w-2 h-2 bg-white rounded-full shadow-lg"></div>
                  </div>
                </button>
              </div>
            </div>

            <!-- Swipe Indicators (Mobile) -->
            <div class="lg:hidden absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 text-white/70">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-pulse">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
              <span class="text-xs">Swipe to navigate</span>
            </div>
          </div>

          <!-- Compact Product Details Section -->
          <div class="bg-white border-t lg:border-t-0 lg:border-l border-gray-200 lg:w-96 lg:max-w-md overflow-y-auto lg:overflow-y-auto">
            <div class="p-4 md:p-6">
              <div class="space-y-4">
                <!-- Compact Price Section -->
                <div class="animate-item">
                  <p class="text-xl md:text-2xl font-medium text-gray-800">
                    <span v-if="!selectedSize">From {{ convertFromUSD(getMinPrice(product))?.formattedAmount }}</span>
                    <span v-else>{{ convertFromUSD(getSelectedSizePrice())?.formattedAmount }}</span>
                  </p>
                </div>

                <!-- Compact Size Selection -->
                <div class="animate-item">
                  <label class="block text-sm font-medium mb-2 text-gray-700">Size Selection</label>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="size in product.sizes"
                      :key="size._id"
                      @click="selectedSize = size._id"
                      class="p-2 border rounded-lg text-center transition-all duration-300 group hover:shadow-md"
                      :class="selectedSize === size._id ? 
                        'border-gray-800 bg-gray-800 text-white shadow-lg transform scale-105' : 
                        'border-gray-200 hover:border-gray-400 text-gray-700'"
                    >
                      <div class="font-medium text-sm">{{ size.size.charAt(0).toUpperCase() + size.size.slice(1) }}</div>
                      <div class="text-xs mt-0.5 opacity-75">
                        {{ convertFromUSD(size.price)?.formattedAmount }}
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Compact Quantity Selection -->
                <div class="animate-item">
                  <label class="block text-sm font-medium mb-2 text-gray-700">Quantity</label>
                  <div class="flex items-center space-x-3">
                    <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        @click.stop="decrementQuantity" 
                        class="px-3 py-2 hover:bg-gray-50 transition-colors duration-300 text-gray-600 disabled:opacity-50"
                        :disabled="quantity <= 1"
                        aria-label="Decrease quantity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M5 12h14"/>
                        </svg>
                      </button>
                      <input 
                        v-model.number="quantity" 
                        type="number" 
                        min="1" 
                        class="w-12 py-2 text-center border-0 bg-white text-gray-900 focus:ring-0 focus:outline-none text-sm"
                        aria-label="Quantity"
                      />
                      <button 
                        @click.stop="incrementQuantity" 
                        class="px-3 py-2 hover:bg-gray-50 transition-colors duration-300 text-gray-600"
                        aria-label="Increase quantity"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 5v14m-7-7h14"/>
                        </svg>
                      </button>
                    </div>
                    
                    <!-- Total Price -->
                    <div v-if="selectedSize && quantity > 1" class="text-sm font-medium text-gray-700">
                      Total: <span class="text-gray-900">{{ convertFromUSD(getTotalPrice())?.formattedAmount }}</span>
                    </div>
                  </div>
                </div>

                <!-- Add to Cart Button -->
                <div class="animate-item">
                  <button 
                    @click.stop="handleAddToCart" 
                    class="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-4 font-medium rounded-lg hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm"
                    :disabled="!selectedSize"
                  >
                    <span v-if="!selectedSize">Select Size to Continue</span>
                    <span v-else>Add to Cart - {{ convertFromUSD(getTotalPrice())?.formattedAmount }}</span>
                  </button>
                </div>

                <!-- Compact Product Info Accordion -->
                <div class="space-y-2 animate-item">
                  <div v-if="product.productInfo" class="border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      @click.stop="toggleSection('productInfo')"
                      class="flex justify-between items-center w-full text-left p-3 hover:bg-gray-50 transition-all duration-300"
                      :aria-expanded="expandedSections.productInfo"
                    >
                      <h3 class="font-medium text-gray-800 text-sm">Product Details</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" :class="{'rotate-45': expandedSections.productInfo}">
                        <path d="M12 5v14m-7-7h14"/>
                      </svg>
                    </button>
                    <div 
                      class="overflow-hidden transition-all duration-300"
                      :class="expandedSections.productInfo ? 'max-h-64 p-3 pt-0' : 'max-h-0'"
                    >
                      <div class="text-gray-600 text-xs" v-html="product.productInfo"></div>
                    </div>
                  </div>

                  <!-- Compact Shipping Info Accordion -->
                  <div v-if="product.shippingInfo" class="border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      @click.stop="toggleSection('shippingInfo')"
                      class="flex justify-between items-center w-full text-left p-3 hover:bg-gray-50 transition-all duration-300"
                      :aria-expanded="expandedSections.shippingInfo"
                    >
                      <h3 class="font-medium text-gray-800 text-sm">Shipping Information</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" :class="{'rotate-45': expandedSections.shippingInfo}">
                        <path d="M12 5v14m-7-7h14"/>
                      </svg>
                    </button>
                    <div 
                      class="overflow-hidden transition-all duration-300"
                      :class="expandedSections.shippingInfo ? 'max-h-64 p-3 pt-0' : 'max-h-0'"
                    >
                      <div class="text-gray-600 text-xs" v-html="product.shippingInfo"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>

  <!-- Payment Selection Modal -->
  <PaymentSelectionModal
    :is-open="showPaymentModal"
    :cart-item="pendingCartItem"
    :on-close="closePaymentModal"
    :on-proceed="handlePaymentSelection"
  />
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useFetchProduct } from "@/composables/modules/products/useFetchProduct"
import { useCartStore } from '@/composables/useCartStore'
import { useCustomToast } from '@/composables/core/useCustomToast'
import PaymentSelectionModal from './PaymentSelectionModal.vue'
// import { useCurrencyConverter } from "@/composables/useConvertCurrency"
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

const fixedInstallmentPayment = ref(50) // USD base amount

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

// Modal state
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
    // Reset modal state
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
    setCurrentImage(currentImageIndex.value === 0 
      ? product.value.images.length - 1 
      : currentImageIndex.value - 1)
  }
}

const getImageTransform = (index: number) => {
  const offset = index - currentImageIndex.value
  if (offset === 0) return 'translateX(0) scale(1)'
  if (offset === 1) return 'translateX(100%) scale(0.8)'
  if (offset === -1) return 'translateX(-100%) scale(0.8)'
  return `translateX(${offset * 100}%) scale(0.6)`
}

const toggleSection = (section: keyof typeof expandedSections) => {
  // Close all sections first
  Object.keys(expandedSections).forEach(key => {
    expandedSections[key as keyof typeof expandedSections] = false
  })
  
  // Then open the selected section
  expandedSections[section] = true
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

const beforeEnter = (el: HTMLElement) => {
  document.body.style.overflow = 'hidden'
  el.style.opacity = '0'
  el.style.transform = 'scale(0.95)'
}

const enter = (el: HTMLElement, done: () => void) => {
  el.offsetHeight // Force reflow
  el.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  el.style.opacity = '1'
  el.style.transform = 'scale(1)'
  
  // Animate items with stagger
  const animateItems = el.querySelectorAll('.animate-item')
  animateItems.forEach((item, index) => {
    const element = item as HTMLElement
    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    element.style.transitionDelay = `${(index + 1) * 0.1}s`
    
    setTimeout(() => {
      element.style.opacity = '1'
      element.style.transform = 'translateY(0)'
    }, 100)
  })
  
  setTimeout(done, 400)
}

const leave = (el: HTMLElement, done: () => void) => {
  el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  el.style.opacity = '0'
  el.style.transform = 'scale(0.95)'
  
  setTimeout(() => {
    document.body.style.overflow = ''
    done()
  }, 300)
}
</script>

<style scoped>
/* Modal animations */
.modal-animation-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-animation-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-animation-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.modal-animation-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Image slide animations */
.image-slide-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-slide-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.image-slide-leave-to {
  opacity: 0;
  transform: translateX(-100%) scale(0.8);
}

/* Zoom animation for active image */
@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-zoom-in {
  animation: zoom-in 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Animation for staggered items */
.animate-item {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
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

/* Responsive adjustments */
@media (max-width: 1024px) {
  .aspect-square {
    aspect-ratio: 1/1;
  }
}

/* Touch feedback */
@media (hover: none) and (pointer: coarse) {
  button:active {
    transform: scale(0.95);
    transition: transform 0.1s;
  }
}

/* Ensure proper spacing on mobile */
@media (max-width: 768px) {
  .min-h-[70vh] {
    min-height: 70vh;
  }
}
</style>