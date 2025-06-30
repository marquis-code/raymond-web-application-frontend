<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
    <!-- Hero Section -->
    <div class="overflow-hidden pt-20 mt-16">
      <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
          <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8 animate-fade-in-up">
            <h2 class="text-5xl font-light tracking-tight text-gray-900 sm:text-6xl mb-8">
              <span class="block">Fine Art</span>
              <span class="block text-gray-600">PRINTS</span>
            </h2>
            <div class="space-y-6 text-gray-600 leading-relaxed">
              <p class="text-xl font-light">Limited edition prints on premium Hahnemühle German etching paper (310 gsm). Each piece is carefully crafted in editions of 10 to 20.</p>
              <p class="text-base">Every print includes a Certificate of Authenticity and arrives professionally packaged in protective tubes.</p>
              <p class="text-base">Available in multiple sizes to suit any space.</p>
            </div>
          </div>
          
          <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end animate-fade-in-up animation-delay-200">
              <img src="@/assets/img/print1.jpg" alt="Featured artwork" class="aspect-[7/5] w-[37rem] max-w-none rounded-3xl bg-gray-50 object-cover shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105">
            </div>
            <div class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
              <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto animate-fade-in-up animation-delay-300">
                <img src="@/assets/img/print2.jpg" alt="Gallery piece" class="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-3xl bg-gray-50 object-cover shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-105">
              </div>
              <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none animate-fade-in-up animation-delay-400">
                <img src="@/assets/img/print3.png" alt="Art collection" class="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-3xl bg-gray-50 object-cover shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-105">
              </div>
              <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none animate-fade-in-up animation-delay-500">
                <img src="@/assets/img/print4.png" alt="Artistic work" class="aspect-[4/3] w-[24rem] max-w-none rounded-3xl bg-gray-50 object-cover shadow-xl hover:shadow-2xl transition-all duration-700 hover:scale-105">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="fetchingPromoSale" class="flex justify-center items-center py-20">
      <div class="relative">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent absolute top-0 left-0"></div>
      </div>
    </div>
    <PromoSaleCTA v-else :promosale="promosale" />
      
    <!-- Products Gallery Section -->
    <div class="container mx-auto px-6 py-20">
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
      <div v-else class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-8">
        <div
          v-for="(product, index) in products"
          :key="product._id"
          class="product-card group cursor-pointer animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
          @mouseenter="handleProductHover(index, true)"
          @mouseleave="handleProductHover(index, false)"
          @click="openQuickView(product)"
        >
          <!-- Product Image Container -->
          <div class="relative overflow-hidden bg-white rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-700">
            <!-- Product Tag -->
            <div v-if="getProductTag(product)" class="absolute top-4 left-4 z-10">
              <span class="bg-white/95 backdrop-blur-sm text-gray-900 text-xs px-3 py-2 font-medium rounded-full shadow-lg">
                {{ getProductTag(product) }}
              </span>
            </div>

            <!-- Main Product Image -->
            <div class="aspect-[3/4] overflow-hidden">
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

            <!-- Quick View Overlay -->
            <div 
              class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8"
            >
              <div class="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <span class="text-white text-lg font-medium tracking-wide">Quick View</span>
                <div class="w-16 h-0.5 bg-white mx-auto mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="pt-6 text-center space-y-3">
            <h3 class="text-lg font-medium text-gray-900 tracking-wide group-hover:text-gray-700 transition-colors">
              {{ product.name }}
            </h3>
            <p class="text-gray-600 font-light">From ${{ getMinPrice(product) }}</p>
            
            <div class="pt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              <button 
                class="w-full bg-gray-900 text-white py-3 px-6 text-sm rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
                @click.stop="addToCart(product)"
              >
                Add to Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Quick View Modal -->
    <Teleport to="body">
      <div 
        v-if="selectedProduct" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto"
        :class="{'opacity-100': modalOpen, 'opacity-0': !modalOpen}"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          @click="closeQuickView"
        ></div>
        
        <!-- Modal Container -->
        <div 
          class="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl transform transition-all duration-500 max-h-[90vh] overflow-hidden flex flex-col"
          :class="{'translate-y-0 scale-100': modalOpen, 'translate-y-8 scale-95': !modalOpen}"
          @click.stop
        >
          <!-- Close Button -->
          <button 
            @click="closeQuickView"
            class="absolute top-4 right-4 z-20 bg-white hover:bg-gray-100 p-2 rounded-full transition-all duration-300 shadow-md"
            aria-label="Close preview"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
              <path d="m18 6-12 12"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>

          <!-- Content Container with Scrollable Area -->
          <div class="overflow-y-auto flex-1 flex flex-col md:flex-row">
            <!-- Image Section -->
            <div class="md:w-1/2 p-6 flex items-center justify-center">
              <div class="relative w-full">
                <img 
                  :src="selectedProduct.images[currentImageIndex]" 
                  :alt="selectedProduct.name" 
                  class="w-full h-auto object-contain rounded-lg"
                />
                
                <!-- Image Navigation -->
                <div v-if="selectedProduct.images.length > 1" class="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-2">
                  <button 
                    @click.stop="previousImage" 
                    class="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </button>
                  <button 
                    @click.stop="nextImage" 
                    class="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-300"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Product Details Section -->
            <div class="md:w-1/2 p-6 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-100">
              <div class="space-y-6">
                <!-- Title Section -->
                <div>
                  <h2 class="text-2xl font-medium text-gray-900 mb-2">{{ selectedProduct.name }}</h2>
                  <div class="w-16 h-1 bg-gray-400 rounded-full"></div>
                </div>

                <!-- Price Section -->
                <div>
                  <p class="text-xl font-medium text-gray-800">
                    <span v-if="!selectedSize">From ${{ getMinPrice(selectedProduct) }}</span>
                    <span v-else>${{ getSelectedSizePrice() }}</span>
                  </p>
                </div>
                
                <!-- Size Selection -->
                <div>
                  <label class="block text-sm font-medium mb-2 text-gray-700">Size Selection</label>
                  <select 
                    v-model="selectedSize" 
                    class="w-full p-3 border border-gray-200 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300"
                  >
                    <option disabled value="">Choose your size</option>
                    <option 
                      v-for="size in selectedProduct.sizes" 
                      :key="size._id" 
                      :value="size._id"
                    >
                      {{ size.size.charAt(0).toUpperCase() + size.size.slice(1) }} - ${{ size.price }}
                    </option>
                  </select>
                </div>
                
                <!-- Quantity Selection -->
                <div>
                  <label class="block text-sm font-medium mb-2 text-gray-700">Quantity</label>
                  <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      @click.stop="decrementQuantity" 
                      class="px-4 py-2 hover:bg-gray-50 transition-colors duration-300 text-gray-600"
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
                      class="flex-1 py-2 text-center border-0 bg-white text-gray-900 focus:ring-0 focus:outline-none"
                      aria-label="Quantity"
                    />
                    <button 
                      @click.stop="incrementQuantity" 
                      class="px-4 py-2 hover:bg-gray-50 transition-colors duration-300 text-gray-600"
                      aria-label="Increase quantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 5v14m-7-7h14"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <!-- Total Price -->
                <div v-if="selectedSize && quantity > 1" class="text-gray-700">
                  Total: <span class="font-medium">${{ getTotalPrice() }}</span>
                </div>
                
                <!-- Add to Cart Button -->
                <div>
                  <button 
                    @click.stop="addToCartFromModal" 
                    class="w-full bg-gray-900 text-white py-3 font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="!selectedSize"
                  >
                    Add to Collection
                  </button>
                </div>

                <!-- View More Details Link -->
                <div class="text-center">
                  <NuxtLink 
                    :to="`/artworks/${selectedProduct._id}`"
                    class="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
                  >
                    View Complete Details →
                  </NuxtLink>
                </div>
                
                <!-- Product Info Accordion -->
                <div v-if="selectedProduct.productInfo" class="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    @click.stop="toggleSection('productInfo')"
                    class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-all duration-300"
                    :aria-expanded="expandedSections.productInfo"
                  >
                    <h3 class="font-medium text-gray-800">Product Details</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" :class="{'rotate-45': expandedSections.productInfo}">
                      <path d="M12 5v14m-7-7h14"/>
                    </svg>
                  </button>
                  <div 
                    class="overflow-hidden transition-all duration-300"
                    :class="expandedSections.productInfo ? 'max-h-96 p-4 pt-0' : 'max-h-0'"
                  >
                    <div class="text-gray-600 text-sm" v-html="selectedProduct.productInfo"></div>
                  </div>
                </div>
                
                <!-- Shipping Info Accordion -->
                <div v-if="selectedProduct.shippingInfo" class="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    @click.stop="toggleSection('shippingInfo')"
                    class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-all duration-300"
                    :aria-expanded="expandedSections.shippingInfo"
                  >
                    <h3 class="font-medium text-gray-800">Shipping Information</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" :class="{'rotate-45': expandedSections.shippingInfo}">
                      <path d="M12 5v14m-7-7h14"/>
                    </svg>
                  </button>
                  <div 
                    class="overflow-hidden transition-all duration-300"
                    :class="expandedSections.shippingInfo ? 'max-h-96 p-4 pt-0' : 'max-h-0'"
                  >
                    <div class="text-gray-600 text-sm" v-html="selectedProduct.shippingInfo"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Image Thumbnails -->
          <div v-if="selectedProduct?.images?.length > 1" class="flex justify-center p-4 border-t border-gray-100 bg-white">
            <div class="flex space-x-2 overflow-x-auto pb-2 max-w-full">
              <button
                v-for="(image, index) in selectedProduct.images"
                :key="index"
                @click.stop="currentImageIndex = index"
                class="w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-300 flex-shrink-0"
                :class="currentImageIndex === index ? 'border-gray-800' : 'border-transparent hover:border-gray-300'"
                :aria-label="`View image ${index + 1}`"
                :aria-current="currentImageIndex === index"
              >
                <img :src="image" :alt="`${selectedProduct.name} - view ${index + 1}`" class="w-full h-full object-cover">
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue'
import { useFetchProducts } from "@/composables/modules/products/useFetchProducts"
import { useCartStore } from '@/composables/useCartStore'
  import type { InstallmentPlan, InstallmentCalculation, PaymentType } from '~/types/installment'
import { useCustomToast } from '@/composables/core/useCustomToast'
const { addToCart: addItemToCart } = useCartStore()
import { useFetchPromosale } from "@/composables/modules/promosale/useFetchPromosale";
const { showToast } = useCustomToast();
const { promosale, loading: fetchingPromoSale } = useFetchPromosale();
// Modal state
const modalOpen = ref(false)
const selectedProduct = ref<any>(null)
const selectedSize = ref('')
const quantity = ref(1)
const currentImageIndex = ref(0)

// Image hover state
const imageLoading = reactive<Record<number, boolean>>({})
const hoveredProducts = reactive<Record<number, boolean>>({})

// Expandable sections state
const expandedSections = reactive({
  productInfo: false,
  returnPolicy: false,
  shippingInfo: false
})

  // Payment state
  const paymentType = ref<PaymentType>('full')
  const selectedInstallmentPlan = ref<InstallmentPlan | null>(null)
  const installmentCalculation = ref<InstallmentCalculation | null>(null)

// Fetch products outside of conditional block
const { products, loading } = useFetchProducts()

// Parallax effect refs
const promotionRef = ref<HTMLElement | null>(null)
const parallaxBgRef = ref<HTMLElement | null>(null)

const getProductTag = (product: any) => {
  if (product.isFeatured) return 'Featured'
  if (product.isNew) return 'New Arrival'
  if (product.isBestseller) return 'Best Seller'
  return null
}

const getMinPrice = (product: any) => {
  if (product.sizes && product.sizes.length > 0) {
    return Math.min(...product.sizes.map((size: any) => size.price))
  }
  return product.price
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

// const openQuickView = (product: any) => {
//   selectedProduct.value = product
//   selectedSize.value = product.sizes[0]?._id || ''
//   quantity.value = 1
//   currentImageIndex.value = 0
//   modalOpen.value = true
//   document.body.style.overflow = 'hidden'
// }

// const closeQuickView = () => {
//   modalOpen.value = false
//   document.body.style.overflow = 'auto'
//   setTimeout(() => {
//     selectedProduct.value = null
//   }, 300)
// }

const openQuickView = (product: any) => {
  selectedProduct.value = product
  selectedSize.value = product.sizes && product.sizes.length > 0 ? product.sizes[0]._id : ''
  quantity.value = 1
  currentImageIndex.value = 0
  modalOpen.value = true
  
  // Don't completely disable scrolling, as we want the modal to be scrollable
  document.body.classList.add('modal-open')
}

const closeQuickView = () => {
  modalOpen.value = false
  document.body.classList.remove('modal-open')
  setTimeout(() => {
    selectedProduct.value = null
  }, 300)
}

const nextImage = () => {
  if (selectedProduct.value && selectedProduct.value.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % selectedProduct.value.images.length
  }
}

const previousImage = () => {
  if (selectedProduct.value && selectedProduct.value.images.length > 1) {
    currentImageIndex.value = currentImageIndex.value === 0 
      ? selectedProduct.value.images.length - 1 
      : currentImageIndex.value - 1
  }
}

const toggleSection = (section: keyof typeof expandedSections) => {
  expandedSections[section] = !expandedSections[section]
}

// const addToCart = (product: any) => {
//   console.log('Adding to cart:', product)
// }

const selectSize = (size: any) => {
  selectedSize.value = size
}

const addToCart = (product: any) => {
  const defaultSize = product?.sizes[0]?.size
  const defaultPrice = product?.sizes[0]?.price
  console.log(product.sizes, 'product here', defaultPrice)
  const cartItem = {
        id: product._id,
        title: product.name,
        image: product.images[0],
        price: selectedSize.price,
        quantity: 1,
        size: selectedSize.size,
        paymentType: paymentType.value,
        installmentPlan: selectedInstallmentPlan.value,
        installmentCalculation: installmentCalculation.value
      }

  if (product && product?.isAvailable) {
    addItemToCart(cartItem)
    // addItemToCart({
    //   id: product?._id,
    //   title: product?.name,
    //   image: product?.images[0],
    //   price: defaultPrice,
    //   quantity: 1
    //   // size: selectedSize.value.size
    // })
  
  }
}

// const addToCartFromModal = () => {
//   if (!selectedProduct.value || !selectedSize.value) return
  
//   const size = selectedProduct.value.sizes.find((s: any) => s._id === selectedSize.value)
//   if (!size) return
  
//   console.log(`Added ${quantity.value} ${selectedProduct.value.name} (${size.size}) to cart`)
// }

const addToCartFromModal = () => {
  if (!selectedProduct.value || !selectedSize.value) return
  
  const size = selectedProduct.value.sizes.find((s: any) => s._id === selectedSize.value)
  if (!size) return
  
  addItemToCart({
    id: selectedProduct.value._id,
    title: selectedProduct.value.name,
    image: selectedProduct.value.images[0],
    price: size.price,
    quantity: quantity.value,
    size: size.size
  })
  
  showToast({
    title: 'Added to Collection',
    message: `${quantity.value} × ${selectedProduct.value.name} (${size.size}) has been added to your collection.`,
    toastType: 'success'
  })
  
  closeQuickView()
}

const handleImageLoad = (index: number) => {
  imageLoading[index] = false
}

const handleImageError = (index: number) => {
  imageLoading[index] = false
}

const getSelectedSizePrice = () => {
  if (!selectedProduct.value || !selectedSize.value) return 0
  
  const size = selectedProduct.value.sizes.find((s: any) => s._id === selectedSize.value)
  return size ? size.price : getMinPrice(selectedProduct.value)
}

const getTotalPrice = () => {
  return getSelectedSizePrice() * quantity.value
}

const handleScroll = () => {
  if (parallaxBgRef.value && promotionRef.value) {
    const scrollPosition = window.scrollY
    const promotionPosition = promotionRef.value.offsetTop
    const offset = scrollPosition - promotionPosition

    if (
      scrollPosition > promotionPosition - window.innerHeight &&
      scrollPosition < promotionPosition + promotionRef.value.offsetHeight
    ) {
      parallaxBgRef.value.style.transform = `translateY(${offset * 0.3}px) scale(1.1)`
    }
  }
}

watch(() => products.value, (newProducts) => {
  if (newProducts) {
    newProducts.forEach((_, index) => {
      imageLoading[index] = true
      hoveredProducts[index] = false
    })
  }
}, { immediate: true })

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && modalOpen.value) {
    closeQuickView()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = 'auto'
  document.removeEventListener('keydown', handleKeydown)
})
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