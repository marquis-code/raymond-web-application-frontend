<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
    <!-- Hero Section -->
     <!-- {{ content }} -->
    <PrintsHeroSection class="mb-10" :loading="fetchingContent" :content="content" :images="content?.images" />
    <div class="container mx-auto px-3 lg:px-6">
      <div class="text-center mb-16 animate-fade-in-up">
        <h2 class="text-4xl font-light text-gray-900 mb-4">Curated Collection</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"></div>
        <p class="text-gray-600 mt-6 max-w-2xl mx-auto">Each piece tells a story, crafted with precision and passion to bring art into your space.</p>
      </div>

      <!-- Loading Spinner -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="relative">
          <div class="animate-spin rounded-full h-20 w-20 border-4 border-gray-200"></div>
          <div class="animate-spin rounded-full h-20 w-20 border-4 border-gray-900 border-t-transparent absolute top-0 left-0"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-8 h-8 bg-gray-900 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <div
    v-for="(product, index) in products"
    :key="product._id"
    class="product-card group cursor-pointer animate-fade-in-up"
    :style="{ animationDelay: `${index * 100}ms` }"
    @mouseenter="handleProductHover(index, true)"
    @mouseleave="handleProductHover(index, false)"
    @click="openProductModal(product._id)"
  >
    <!-- Product Image Container with Overlay Content -->
    <div class="relative overflow-hidden bg-white rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-700 h-96 flex flex-col">
      <!-- Product Tag -->
      <div v-if="getProductTag(product)" class="absolute top-4 left-4 z-10">
        <span class="bg-white/95 backdrop-blur-sm text-gray-900 text-xs px-3 py-2 font-medium rounded-full shadow-lg">
          {{ getProductTag(product) }}
        </span>
      </div>

      <!-- Main Product Image -->
      <div class="overflow-hidden flex-1">
        <img
          :src="getProductImage(product, index)"
          :alt="product.name"
          class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          @load="handleImageLoad(index)"
          @error="handleImageError(index)"
        />
      </div>

      <!-- Loading Overlay -->
      <div v-if="imageLoading[index]" class="absolute inset-0 bg-gray-100 flex items-center justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-600"></div>
      </div>

      <!-- Product Info Overlay - positioned at bottom -->
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white p-6 flex flex-col justify-end min-h-32">
        <!-- Product Title -->
        <h3 class="text-lg font-medium tracking-wide mb-2">
          {{ product?.name ?? 'Nil' }}
        </h3>
        
        <!-- Divider Line -->
        <div class="w-8 h-0.5 bg-white mb-4"></div>
        
        <!-- Price Info -->
        <p class="text-white/90 font-light mb-4 text-sm">
          From {{ getConvertedMinPrice(product) }}
          <span v-if="hasInstallmentOptions(product)">
            or {{ getConvertedInstallmentPayment(product) }}/month
          </span>
        </p>
        
        <!-- Promotion Text -->
        <p v-if="product?.promotionText" class="text-white/80 text-xs mb-4">
          {{ product?.promotionText }}
        </p>

        <!-- Add to Cart Button -->
        <button 
          class="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-3 text-sm px-6 rounded-lg font-medium hover:bg-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105"
          @click.stop="router.push(`/artworks/${product._id}`)"
        >
          Add to Cart
        </button>
      </div>

      <!-- Quick View Overlay (optional - for hover effect) -->
      <!-- <div class="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
        <div class="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
          <span class="text-white text-lg font-medium tracking-wide">Quick View</span>
          <div class="w-16 h-0.5 bg-white mx-auto mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>
      </div> -->
    </div>
  </div>
      </div>
    </div>

    <!-- Product Preview Modal -->
    <ProductPreviewModal
      :is-open="modalOpen"
      :product-id="selectedProductId"
      :on-close="closeProductModal"
      :on-add-to-cart="handleAddToCart"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import { useFetchProducts } from "@/composables/modules/products/useFetchProducts"
import { useCartStore } from '@/composables/useCartStore'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useFetchPromosale } from "@/composables/modules/promosale/useFetchPromosale"
import ProductPreviewModal from '@/components/ProductPreviewModal.vue'
import { useCurrencyConverter } from "@/composables/core/useCurrencyConverter"
import { useFetchContentByType } from "@/composables/modules/content/useFetchContentByType"
const { fetchContentByType, loading: fetchingContent, content } = useFetchContentByType()

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

// const fixedInstallmentPayment = ref(50) // USD base amount

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
  await fetchContentByType("shop_prints_hero")
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


const { addToCart: addItemToCart } = useCartStore()
const { showToast } = useCustomToast()
const { promosale, loading: fetchingPromoSale } = useFetchPromosale()

// import shop1 from '@/assets/img/print2.jpg'
// import shop2 from "@/assets/img/print3.png"
// import shop3 from "@/assets/img/print4.png"
// import shop4 from "@/assets/img/print1.jpg"

const router = useRouter()

interface Product {
  _id: string
  name: string
  images: string[]
  sizes: Array<{
    _id: string
    size: string
    price: number
    color?: string
    installmentConfig?: any
  }>
  category?: string
  isAvailable?: boolean
}

interface ArtPrint {
  id: number
  src: string
  alt: string
  aspectRatio?: string
}

// Modal state
const modalOpen = ref(false)
const selectedProductId = ref<string | null>(null)

// Art prints for hero section
const artPrints = ref<ArtPrint[]>([])
const isLoading = ref(true)

// Image hover state
const imageLoading = reactive<Record<number, boolean>>({})
const hoveredProducts = reactive<Record<number, boolean>>({})

// Fetch products
const { products, loading } = useFetchProducts()

// Simulate fetching images from backend
// const fetchArtPrints = async () => {
//   try {
//     await new Promise(resolve => setTimeout(resolve, 100))
//     artPrints.value = [
//       { id: 1, src: shop1, alt: 'Abstract Composition #1', aspectRatio: '7/5' },
//       { id: 2, src: shop2, alt: 'Minimalist Study', aspectRatio: '4/3' },
//       { id: 3, src: shop3, alt: 'Color Field Exploration', aspectRatio: '7/5' },
//       { id: 4, src: shop4, alt: 'Geometric Harmony', aspectRatio: '4/3' },
//     ]
//   } catch (error) {
//     console.error('Error fetching art prints:', error)
//   } finally {
//     isLoading.value = false
//   }
// }

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

const handleAddToCart = (cartItem: any) => {
  console.log('Item added to cart from modal:', cartItem)
  // Additional handling if needed
}

const getProductTag = (product: any) => {
  if (product.isFeatured) return 'Featured'
  if (product.isNew) return 'New Arrival'
  if (product.isBestseller) return 'Best Seller'
  return null
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
  // const converted = convertFromUSD(100, 'NGN')
  // return converted
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

// Updated function to get converted installment payment
// const getConvertedInstallmentPayment = () => {
//   const converted = convertFromUSD(fixedInstallmentPayment.value)
//   return converted.formattedAmount || fixedInstallmentPayment.value
// }

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


const getProductImage = (product: any, index: number) => {
  if (!product || !product.images || product.images.length === 0) {
    return ''
  }
  if (hoveredProducts[index] && product.images.length > 1) {
    return product.images[1]
  }
  return product.images[0]
}

const handleProductHover = (index: number, isHovered: boolean) => {
  hoveredProducts[index] = isHovered
}

const handleImageLoad = (index: number) => {
  imageLoading[index] = false
}

const handleImageError = (index: number) => {
  imageLoading[index] = false
}

// Watch for products changes to initialize loading states
watch(() => products.value, (newProducts) => {
  if (newProducts) {
    newProducts.forEach((_, index) => {
      imageLoading[index] = true
      hoveredProducts[index] = false
    })
  }
}, { immediate: true })

// onMounted(() => {
//   fetchArtPrints()
// })
</script>

<style scoped>
/* Animation Keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Animation Classes */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-out forwards;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 1s ease-out forwards;
}

.animate-bounce-in {
  animation: bounceIn 0.8s ease-out forwards;
}

/* Animation Delays */
.animation-delay-100 { animation-delay: 0.1s; opacity: 0; }
.animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
.animation-delay-300 { animation-delay: 0.3s; opacity: 0; }
.animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
.animation-delay-500 { animation-delay: 0.5s; opacity: 0; }
.animation-delay-600 { animation-delay: 0.6s; opacity: 0; }

/* Hover Effects */
.product-card {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  transform: translateY(-8px);
}

/* Custom Scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Shadow Utilities */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}
</style>