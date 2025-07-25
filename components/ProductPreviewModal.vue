<template>
  <Teleport to="body">
    <!-- Full Screen Modal -->
    <transition name="modal-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="isOpen && product" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
        <!-- Modal Container -->
        <div class="h-full w-full flex flex-col bg-white">
          <!-- Header -->
          <div class="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3 flex-1 min-w-0">
                <button 
                  @click="onClose" 
                  class="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
                <div class="min-w-0 flex-1">
                  <h1 class="text-base font-semibold text-gray-900 truncate">{{ product.name }}</h1>
                  <!-- <p class="text-xs text-gray-600 hidden md:block">{{ product.category }}</p> -->
                </div>
              </div>
              <!-- Image Counter -->
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <span class="text-xs">{{ currentImageIndex + 1 }} / {{ product.images.length }}</span>
              </div>
            </div>
          </div>

          <!-- Content Area -->
          <div class="flex-1 overflow-hidden">
            <!-- Mobile Layout -->
            <div class="lg:hidden h-full overflow-y-auto">
              <div class="pb-6">
                <!-- Image Section -->
                <div class="bg-gray-50 p-4">
                  <div class="aspect-square bg-white rounded-xl shadow-sm overflow-hidden relative">
                    <!-- Main Image -->
                    <div class="absolute inset-0 flex items-center justify-center p-4">
                      <transition-group name="image-fade" tag="div" class="relative w-full h-full">
                        <div
                          v-for="(image, index) in product.images"
                          :key="`image-${index}`"
                          v-show="index === currentImageIndex"
                          class="absolute inset-0 flex items-center justify-center"
                        >
                          <img
                            :src="image"
                            :alt="`${product.name} - view ${index + 1}`"
                            class="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </transition-group>
                    </div>

                    <!-- Navigation Arrows -->
                    <div v-if="product.images.length > 1" class="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                      <button
                        @click="previousImage"
                        class="ml-2 p-2 rounded-full bg-white/90 shadow-md transition-all duration-200 pointer-events-auto"
                        aria-label="Previous image"
                      >
                        <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                      </button>
                      <button
                        @click="nextImage"
                        class="mr-2 p-2 rounded-full bg-white/90 shadow-md transition-all duration-200 pointer-events-auto"
                        aria-label="Next image"
                      >
                        <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>

                    <!-- Touch Areas -->
                    <div class="absolute inset-0" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
                      <div class="absolute inset-y-0 left-0 w-1/3" @click="previousImage"></div>
                      <div class="absolute inset-y-0 right-0 w-1/3" @click="nextImage"></div>
                    </div>
                  </div>

                  <!-- Thumbnails -->
                  <div v-if="product.images.length > 1" class="mt-3">
                    <div class="flex space-x-2 overflow-x-auto pb-2">
                      <button
                        v-for="(image, index) in product.images"
                        :key="`thumb-${index}`"
                        @click="setCurrentImage(index)"
                        class="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200"
                        :class="currentImageIndex === index ? 'border-blue-500 scale-105' : 'border-gray-200'"
                      >
                        <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Product Details -->
                <div class="p-4 space-y-5">
                  <!-- Price -->
                  <div class="animate-item">
                    <div class="flex items-baseline space-x-2">
                      <span class="text-base font-bold text-gray-900">
                        <span v-if="!selectedSize">From {{ convertFromUSD(getMinPrice(product))?.formattedAmount }}</span>
                        <span v-else>{{ convertFromUSD(getSelectedSizePrice())?.formattedAmount }}</span>
                      </span>
                      <span v-if="selectedSize && quantity > 1" class="text-base text-gray-600">
                        × {{ quantity }}
                      </span>
                    </div>
                    <div v-if="selectedSize && quantity > 1" class="text-sm text-gray-600 mt-1">
                      Total: {{ convertFromUSD(getTotalPrice())?.formattedAmount }}
                    </div>
                  </div>

                  <!-- Size Selection -->
                  <div class="animate-item">
                    <h3 class="text-base font-semibold text-gray-900 mb-3">Select Size</h3>
                    <div class="grid grid-cols-2 gap-3">
                      <button
                        v-for="size in product.sizes"
                        :key="size._id"
                        @click="selectedSize = size._id"
                        class="relative p-3 border-2 rounded-xl transition-all duration-200"
                        :class="selectedSize === size._id 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'"
                      >
                        <div class="text-center">
                          <div class="text-sm font-semibold text-gray-900">{{ size.size.toUpperCase() }}</div>
                          <div class="text-xs text-gray-600 mt-1">{{ convertFromUSD(size.price)?.formattedAmount }}</div>
                        </div>
                        <div v-if="selectedSize === size._id" class="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>

                  <!-- Quantity -->
                  <div class="animate-item">
                    <h3 class="text-base font-semibold text-gray-900 mb-3">Quantity</h3>
                    <div class="flex items-center justify-center">
                      <div class="flex items-center bg-gray-100 rounded-xl p-1">
                        <button
                          @click="decrementQuantity"
                          :disabled="quantity <= 1"
                          class="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                          </svg>
                        </button>
                        <div class="w-16 text-center font-bold text-base text-gray-900">{{ quantity }}</div>
                        <button
                          @click="incrementQuantity"
                          class="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Add to Cart -->
                  <div class="animate-item">
                    <button
                      @click="handleAddToCart"
                      :disabled="!selectedSize"
                      class="w-full bg-blue-600 text-sm hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
                    >
                      <span v-if="!selectedSize">Select Size to Continue</span>
                      <span v-else>Add to Cart • {{ convertFromUSD(getTotalPrice())?.formattedAmount }}</span>
                    </button>
                  </div>

                  <!-- Product Info Accordions -->
                  <div class="space-y-3 animate-item">
                    <div v-if="product.productInfo" class="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        @click="toggleSection('productInfo')"
                        class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      >
                        <h3 class="text-base font-semibold text-gray-900">Product Details</h3>
                        <svg
                          class="w-5 h-5 text-gray-500 transition-transform duration-200"
                          :class="{ 'rotate-180': expandedSections.productInfo }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div
                        class="overflow-hidden transition-all duration-300"
                        :class="expandedSections.productInfo ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'"
                      >
                        <div class="px-4 pb-4">
                          <div class="text-sm text-gray-700 leading-relaxed" v-html="product.productInfo"></div>
                        </div>
                      </div>
                    </div>

                    <div v-if="product.shippingInfo" class="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        @click="toggleSection('shippingInfo')"
                        class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      >
                        <h3 class="text-base font-semibold text-gray-900">Shipping Information</h3>
                        <svg
                          class="w-5 h-5 text-gray-500 transition-transform duration-200"
                          :class="{ 'rotate-180': expandedSections.shippingInfo }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div
                        class="overflow-hidden transition-all duration-300"
                        :class="expandedSections.shippingInfo ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'"
                      >
                        <div class="px-4 pb-4">
                          <div class="text-sm text-gray-700 leading-relaxed" v-html="product.shippingInfo"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop Layout -->
            <div class="hidden lg:flex h-full">
              <!-- Image Section -->
              <div class="flex-[2] bg-gray-50 relative">
                <div class="absolute inset-0 flex items-center justify-center p-6">
                  <div class="relative w-full h-full max-w-3xl">
                    <div class="relative w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden">
                      <transition-group name="image-fade" tag="div" class="relative w-full h-full">
                        <div
                          v-for="(image, index) in product.images"
                          :key="`desktop-image-${index}`"
                          v-show="index === currentImageIndex"
                          class="absolute inset-0 flex items-center justify-center p-8"
                        >
                          <img
                            :src="image"
                            :alt="`${product.name} - view ${index + 1}`"
                            class="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </transition-group>
                    </div>

                    <!-- Desktop Navigation -->
                    <div v-if="product.images.length > 1" class="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                      <button
                        @click="previousImage"
                        class="ml-4 p-3 rounded-full bg-white/90 shadow-lg transition-all duration-200 pointer-events-auto hover:scale-110"
                      >
                        <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                      </button>
                      <button
                        @click="nextImage"
                        class="mr-4 p-3 rounded-full bg-white/90 shadow-lg transition-all duration-200 pointer-events-auto hover:scale-110"
                      >
                        <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Desktop Thumbnails -->
                <div v-if="product.images.length > 1" class="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div class="flex space-x-3 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
                    <button
                      v-for="(image, index) in product.images"
                      :key="`desktop-thumb-${index}`"
                      @click="setCurrentImage(index)"
                      class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200"
                      :class="currentImageIndex === index ? 'border-blue-500 scale-110' : 'border-gray-200 hover:border-gray-300'"
                    >
                      <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Details Section -->
              <div class="w-96 bg-white border-l border-gray-200 overflow-y-auto">
                <div class="p-6 space-y-6">
                  <!-- Price -->
                  <div class="animate-item">
                    <div class="flex items-baseline space-x-3">
                      <span class="text-2xl font-bold text-gray-900">
                        <span v-if="!selectedSize">From {{ convertFromUSD(getMinPrice(product))?.formattedAmount }}</span>
                        <span v-else>{{ convertFromUSD(getSelectedSizePrice())?.formattedAmount }}</span>
                      </span>
                      <span v-if="selectedSize && quantity > 1" class="text-base text-gray-600">
                        × {{ quantity }}
                      </span>
                    </div>
                    <div v-if="selectedSize && quantity > 1" class="text-base text-gray-600 mt-2">
                      Total: {{ convertFromUSD(getTotalPrice())?.formattedAmount }}
                    </div>
                  </div>

                  <!-- Size Selection -->
                  <div class="animate-item">
                    <h3 class="text-base font-semibold text-gray-900 mb-4">Select Size</h3>
                    <div class="grid grid-cols-2 gap-3">
                      <button
                        v-for="size in product.sizes"
                        :key="size._id"
                        @click="selectedSize = size._id"
                        class="relative p-4 border-2 rounded-xl transition-all duration-200"
                        :class="selectedSize === size._id 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'"
                      >
                        <div class="text-center">
                          <div class="text-sm font-semibold text-gray-900">{{ size.size.toUpperCase() }}</div>
                          <div class="text-sm text-gray-600 mt-1">{{ convertFromUSD(size.price)?.formattedAmount }}</div>
                        </div>
                        <div v-if="selectedSize === size._id" class="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>

                  <!-- Quantity -->
                  <div class="animate-item">
                    <h3 class="text-base font-semibold text-gray-900 mb-4">Quantity</h3>
                    <div class="flex items-center justify-center">
                      <div class="flex items-center bg-gray-100 rounded-xl p-1">
                        <button
                          @click="decrementQuantity"
                          :disabled="quantity <= 1"
                          class="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                          </svg>
                        </button>
                        <div class="w-20 text-center font-bold text-base text-gray-900">{{ quantity }}</div>
                        <button
                          @click="incrementQuantity"
                          class="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Add to Cart -->
                  <div class="animate-item">
                    <button
                      @click="handleAddToCart"
                      :disabled="!selectedSize"
                      class="w-full bg-blue-600 text-sm hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
                    >
                      <span v-if="!selectedSize">Select Size to Continue</span>
                      <span v-else>Add to Cart • {{ convertFromUSD(getTotalPrice())?.formattedAmount }}</span>
                    </button>
                  </div>

                  <!-- Product Info -->
                  <div class="space-y-4 animate-item">
                    <div v-if="product.productInfo" class="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        @click="toggleSection('productInfo')"
                        class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      >
                        <h3 class="text-base font-semibold text-gray-900">Product Details</h3>
                        <svg
                          class="w-5 h-5 text-gray-500 transition-transform duration-200"
                          :class="{ 'rotate-180': expandedSections.productInfo }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div
                        class="overflow-hidden transition-all duration-300"
                        :class="expandedSections.productInfo ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'"
                      >
                        <div class="px-4 pb-4">
                          <div class="text-sm text-gray-700 leading-relaxed" v-html="product.productInfo"></div>
                        </div>
                      </div>
                    </div>

                    <div v-if="product.shippingInfo" class="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        @click="toggleSection('shippingInfo')"
                        class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      >
                        <h3 class="text-base font-semibold text-gray-900">Shipping Information</h3>
                        <svg
                          class="w-5 h-5 text-gray-500 transition-transform duration-200"
                          :class="{ 'rotate-180': expandedSections.shippingInfo }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div
                        class="overflow-hidden transition-all duration-300"
                        :class="expandedSections.shippingInfo ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'"
                      >
                        <div class="px-4 pb-4">
                          <div class="text-sm text-gray-700 leading-relaxed" v-html="product.shippingInfo"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Payment Modal -->
    <PaymentSelectionModal
      :is-open="showPaymentModal"
      :cart-item="pendingCartItem"
      :on-close="closePaymentModal"
      :on-proceed="handlePaymentSelection"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useFetchProduct } from "@/composables/modules/products/useFetchProduct"
import { useCartStore } from '@/composables/useCartStore'
import { useCustomToast } from '@/composables/core/useCustomToast'
import PaymentSelectionModal from './PaymentSelectionModal.vue'
import { useCurrencyConverter } from "@/composables/core/useCurrencyConverter"

// Types
interface ProductSize {
  _id: string
  size: string
  price: number
  color?: string
  installmentConfig?: {
    enabled: boolean
    [key: string]: any
  } | null
}

interface Product {
  _id: string
  name: string
  images: string[]
  category?: string
  price?: number
  sizes: ProductSize[]
  productInfo?: string
  shippingInfo?: string
  weight?: number
  width?: number
  height?: number
  length?: number
}

interface CartItem {
  id: string
  productId: string
  title: string
  image: string
  price: number
  quantity: number
  size: string
  color?: string
  installmentConfig: any | null
  hasInstallmentOption: boolean
  category?: string
  weight?: number
  dimensions: {
    width?: number
    height?: number
    length?: number
  }
}

interface Props {
  isOpen: boolean
  productId: string | null
  onClose: () => void
  onAddToCart?: (item: CartItem) => void
}

const props = defineProps<Props>()

// Composables
const {
  initializeUserCurrency,
  convertFromUSD,
} = useCurrencyConverter()

const { product, loading, fetchProduct } = useFetchProduct()
const { addToCart: addItemToCart } = useCartStore()
const { showToast } = useCustomToast()

// State
const selectedSize = ref('')
const quantity = ref(1)
const currentImageIndex = ref(0)
const showPaymentModal = ref(false)
const pendingCartItem = ref<CartItem | null>(null)
const isTransitioning = ref(false)
const touchStartX = ref(0)
const touchEndX = ref(0)

const expandedSections = reactive({
  productInfo: false,
  shippingInfo: false
})

// Lifecycle
onMounted(async () => {
  await initializeUserCurrency()
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

// Methods
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

const getMinPrice = (product: Product) => {
  if (product.sizes && product.sizes.length > 0) {
    return Math.min(...product.sizes.map((size: ProductSize) => size.price))
  }
  return product.price || 0
}

const getSelectedSizePrice = () => {
  if (!product.value || !selectedSize.value) return 0
  const size = product.value.sizes.find((s: ProductSize) => s._id === selectedSize.value)
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
  // Close all sections first
  Object.keys(expandedSections).forEach(key => {
    expandedSections[key as keyof typeof expandedSections] = false
  })
  // Then open the selected section
  expandedSections[section] = true
}

const hasInstallmentOption = (size: ProductSize) => {
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

    const size = product.value.sizes.find((s: ProductSize) => s._id === selectedSize.value)
    if (!size) {
      showToast({
        title: "Invalid Selection",
        message: "Selected size is not available",
        toastType: "error",
        duration: 3000
      })
      return
    }

    const cartItem: CartItem = {
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

    pendingCartItem.value = cartItem
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

const handlePaymentSelection = (paymentType: string, cartItem: CartItem) => {
  addItemToCart(cartItem)
  showToast({
    title: "Added to Cart",
    message: `${cartItem.quantity} × ${cartItem.title} (${cartItem.size}) added to cart`,
    toastType: "success",
    duration: 3000
  })
  closePaymentModal()
  props.onClose()
  if (props.onAddToCart) {
    props.onAddToCart(cartItem)
  }
}

// Animation hooks
const beforeEnter = (el: HTMLElement) => {
  document.body.style.overflow = 'hidden'
  el.style.opacity = '0'
}

const enter = (el: HTMLElement, done: () => void) => {
  el.offsetHeight
  el.style.transition = 'opacity 0.3s ease-out'
  el.style.opacity = '1'
  
  const animateItems = el.querySelectorAll('.animate-item')
  animateItems.forEach((item, index) => {
    const element = item as HTMLElement
    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
    element.style.transition = 'all 0.5s ease-out'
    element.style.transitionDelay = `${index * 0.1}s`
    
    setTimeout(() => {
      element.style.opacity = '1'
      element.style.transform = 'translateY(0)'
    }, 100)
  })
  
  setTimeout(done, 300)
}

const leave = (el: HTMLElement, done: () => void) => {
  el.style.transition = 'opacity 0.2s ease-in'
  el.style.opacity = '0'
  setTimeout(() => {
    document.body.style.overflow = ''
    done()
  }, 200)
}

// Watchers
watch(() => props.productId, (newProductId) => {
  if (newProductId && props.isOpen) {
    fetchProduct(newProductId)
    selectedSize.value = ''
    quantity.value = 1
    currentImageIndex.value = 0
    Object.keys(expandedSections).forEach(key => {
      expandedSections[key as keyof typeof expandedSections] = false
    })
  }
}, { immediate: true })

watch(() => props.isOpen, (isOpen) => {
  if (!isOpen) {
    selectedSize.value = ''
    quantity.value = 1
    currentImageIndex.value = 0
    showPaymentModal.value = false
    pendingCartItem.value = null
    Object.keys(expandedSections).forEach(key => {
      expandedSections[key as keyof typeof expandedSections] = false
    })
  }
})
</script>

<style scoped>
.modal-fade-enter-active {
  transition: all 0.3s ease-out;
}

.modal-fade-leave-active {
  transition: all 0.2s ease-in;
}

.modal-fade-enter-from {
  opacity: 0;
}

.modal-fade-leave-to {
  opacity: 0;
}

.image-fade-enter-active {
  transition: all 0.4s ease-out;
}

.image-fade-leave-active {
  transition: all 0.4s ease-out;
}

.image-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.image-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

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

.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

.animate-item {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.5s ease-out;
}

button {
  transition: all 0.2s ease-out;
}

button:active {
  transform: scale(0.98);
}

img {
  transition: transform 0.3s ease-out;
}

@media (hover: none) and (pointer: coarse) {
  button:active {
    transform: scale(0.95);
    transition: transform 0.1s;
  }
}
</style>
