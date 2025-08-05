<template>
<main>
  <div
      ref="productContainerRef"
      class="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @touchstart="startDragTouch"
      @touchmove="onDragTouch"
      @touchend="endDragTouch"
    >
      <div
        v-for="(product, index) in products"
         @click="openProductModal(product._id)"
        :key="product.id || index"
        class="product-card flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-start group cursor-pointer"
        :ref="(el) => { if (el) productRefs[index] = el; }"
      >
        <!-- Product Card Container with Fixed Height -->
        <div class="bg-white rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 h-[420px] flex flex-col overflow-hidden transform group-hover:-translate-y-2">
          
          <!-- Product Image Container -->
          <div class="relative overflow-hidden rounded-t-2xl h-72 flex-shrink-0">
            <!-- Product Tag -->
            <div v-if="getProductTag(product)" class="absolute top-4 left-4 z-20 transform transition-all duration-300 group-hover:scale-110">
              <span class="bg-black text-white text-xs px-3 py-2 font-medium rounded-lg shadow-lg">
                {{ getProductTag(product) }}
              </span>
            </div>
  
            <!-- Main Product Image -->
            <div class="relative overflow-hidden h-full">
              <img
                :src="getProductImage(product)"
                :alt="product.title || product.name"
                class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                @error="handleImageError"
              />
              
              <!-- Image Overlay Gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            </div>
  
            <!-- Hover Content Overlay -->
            <div class="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <!-- Quick View Button at Center -->
              <div class="flex-1 flex items-center justify-center">
                <button
                  class="bg-white text-black text-sm px-8 py-3 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-xl"
                  @click="handleQuickView(product)"
                >
                  Quick View
                </button>
              </div>
  
              <!-- Product Info at Bottom -->
              <div class="transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <h3 class="text-white font-semibold text-lg mb-2 text-center line-clamp-2">
                  {{ product?.name || product?.title || 'Untitled' }}
                </h3>
                <div class="w-12 h-0.5 bg-white mx-auto mb-3"></div>
                <p class="text-white/90 font-light text-sm text-center">
                  From {{ getConvertedMinPrice(product) }}
                  <span v-if="hasInstallmentOptions(product)" class="block mt-1 text-xs text-white/80">
                    or {{ getConvertedInstallmentPayment(product) }}/month
                  </span>
                </p>
              </div>
            </div>
          </div>
  
          <!-- Default Product Info (Hidden on Hover) -->
          <div class="p-6 flex flex-col justify-center flex-1 transition-all duration-500 group-hover:opacity-0 group-hover:transform group-hover:-translate-y-2">
            <h3 class="text-center font-semibold text-lg mb-3 text-gray-900 line-clamp-2">
              {{ product?.name || product?.title || 'Untitled' }}
            </h3>
            <div class="w-8 h-0.5 bg-gray-900 mx-auto mb-3"></div>
            <p class="text-center font-medium text-sm text-gray-700">
              From {{ getConvertedMinPrice(product) }}
              <span v-if="hasInstallmentOptions(product)" class="block mt-1 text-xs text-gray-500">
                or {{ getConvertedInstallmentPayment(product) }}/month
              </span>
            </p>
          </div>
  
          <!-- Add to Cart Button (Slides up from bottom on hover) -->
          <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 delay-200">
            <button 
              class="w-full bg-gray-900 text-white py-3 text-sm px-6 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg"
              @click="openProductModal(product._id)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <ProductPreviewModal
      :is-open="modalOpen"
      :product-id="selectedProductId"
      :on-close="closeProductModal"
      :on-add-to-cart="handleAddToCart"
    />
</main>
  </template>
  
  <script setup lang="ts">
  import { useCurrencyConverter } from "@/composables/core/useCurrencyConverter"
  interface Product {
    id?: string
    _id?: string
    name?: string
    title?: string
    images?: string[]
    isFeatured?: boolean
    isNew?: boolean
    isBestseller?: boolean
    price?: number
    installment?: number
    [key: string]: any
  }

  const router = useRouter()
  
  interface Props {
    products: Product[]
  }

  const convertedPrice = ref<any>({})
const fromCurrency = ref<string>('USD')
const toCurrency = ref<string>('NGN')
const manualConversionResult = ref<any>(null)


const openProductModal = (productId: string) => {
  console.log(productId, 'opening modal for product')
  selectedProductId.value = productId
  
  // Add product ID as query parameter
  router.push({
    query: { ...router.currentRoute.value.query, productId }
  })
  
  modalOpen.value = true
}

const closeProductModal = () => {
  modalOpen.value = false
  selectedProductId.value = null
  
  // Remove product ID from query parameters
  const query = { ...router.currentRoute.value.query }
  delete query.productId
  router.push({ query })
}



// Modal state
const modalOpen = ref(false)
const selectedProductId = ref<string | null>(null)

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
  
  const props = defineProps<Props>()
  
  // Refs
  const productContainerRef = ref<HTMLElement>()
  const productRefs = ref<Record<number, HTMLElement>>({})
  
  // Helper Functions
  const getProductTag = (product: Product): string | null => {
    if (product.isFeatured) return 'Sale'
    if (product.isNew) return 'New Arrival'
    if (product.isBestseller) return 'Best Seller'
    return null
  }
  
  const getProductImage = (product: Product): string => {
    return product.images?.[0] || '/placeholder-image.jpg'
  }
  
// Updated function to get converted minimum price for each product
const getConvertedMinPrice = (product: any) => {
  let minUSDPrice = 0
  
  if (product.sizes && product.sizes.length > 0) {
    minUSDPrice = Math.min(...product.sizes.map((size: any) => size.price))
  } else {
    minUSDPrice = product.price || 0
  }
  
  // Convert from USD to user's currency using the composable
  const converted = convertFromUSD(minUSDPrice)
  return converted.formattedAmount || minUSDPrice
}
  

// New function to check if product has installment options
const hasInstallmentOptions = (product: any) => {
  if (!product.sizes || product.sizes.length === 0) return false
  
  return product.sizes.some((size: any) => 
    size.installmentConfig && 
    size.installmentConfig.enabled && 
    size.price >= (size.installmentConfig.minimumAmount || 0)
  )
}

const getConvertedInstallmentPayment = (product: any) => {
  if (!product.sizes || product.sizes.length === 0) return '0'
  
  // Find the size with the lowest price that has installment enabled
  const eligibleSizes = product.sizes.filter((size: any) => 
    size.installmentConfig && 
    size.installmentConfig.enabled && 
    size.price >= (size.installmentConfig.minimumAmount || 0)
  )
  
  if (eligibleSizes.length === 0) return '0'
  
  // Get the size with minimum price
  const minPriceSize = eligibleSizes.reduce((min: any, current: any) => 
    current.price < min.price ? current : min
  )
  
  const config = minPriceSize.installmentConfig
  const price = minPriceSize.price
  
  // Use the minimum available term for calculation
  const term = Math.min(...config.availableTerms)
  
  // Calculate monthly payment with interest
  const monthlyInterestRate = (config.interestRate / 100) / 12
  let monthlyPayment
  
  if (monthlyInterestRate > 0) {
    // Calculate with compound interest
    monthlyPayment = (price * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term)) / 
                    (Math.pow(1 + monthlyInterestRate, term) - 1)
  } else {
    // Simple division if no interest
    monthlyPayment = price / term
  }
  
  // Convert from USD to user's currency
  const converted = convertFromUSD(monthlyPayment)
  return converted.formattedAmount || Math.round(monthlyPayment).toString()
}
  
  // Event Handlers
  const handleImageError = (event: Event) => {
    const img = event.target as HTMLImageElement
    img.src = '/placeholder-image.jpg'
  }
  
  const handleQuickView = (product: Product) => {
    const productId = product.id || product._id
    if (productId) {
      navigateTo(`/artworks/${productId}`)
    }
  }
  
  const handleAddToCart = (product: Product) => {
    // Add your cart logic here
    console.log('Adding to cart:', product)
    // Prevent event bubbling to avoid triggering quick view
    event?.stopPropagation()
  }
  
  // Drag functionality placeholders
  const startDrag = (event: MouseEvent) => {
    // Implement your drag logic
  }
  
  const onDrag = (event: MouseEvent) => {
    // Implement your drag logic
  }
  
  const endDrag = () => {
    // Implement your drag logic
  }
  
  const startDragTouch = (event: TouchEvent) => {
    // Implement your touch drag logic
  }
  
  const onDragTouch = (event: TouchEvent) => {
    // Implement your touch drag logic
  }
  
  const endDragTouch = () => {
    // Implement your touch drag logic
  }
  </script>
  
  <style scoped>
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Custom animation for smoother transitions */
  .product-card {
    will-change: transform;
  }
  
  .product-card:hover {
    z-index: 10;
  }
  
  /* Staggered animation delays for elements */
  .product-card .transform {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  </style>