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

    <!-- Promotion Banner -->
    <section ref="promotionRef" class="relative py-32 my-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/80 to-gray-900/90"></div>
      
      <!-- Background Image Container - maintains original aspect ratio -->
      <div class="absolute inset-0 flex items-center justify-center">
        <img 
          src="@/assets/img/no-love.jpg" 
          alt="Featured artwork" 
          class="max-w-full max-h-full object-contain opacity-60" 
          ref="parallaxBgRef"
        />
      </div>
      
      <div class="container mx-auto px-6 relative z-20 text-center">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-lg md:text-xl uppercase tracking-[0.3em] mb-6 text-white/90 font-light animate-fade-in">
            Limited Time Offer
          </h2>
          <h3 class="text-5xl md:text-7xl font-light mb-8 text-white tracking-tight animate-slide-up">
            NO GREATER LOVE
          </h3>
          <p class="text-2xl md:text-3xl mb-12 text-white/90 font-light animate-fade-in animation-delay-300">
            Special Collection Release
          </p>
          <NuxtLink 
            to="/collection" 
            class="inline-flex items-center px-12 py-4 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-all duration-500 hover:scale-110 transform shadow-2xl animate-bounce-in animation-delay-600"
          >
            <span class="mr-3">Explore Collection</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
      
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
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                class="w-full bg-gray-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
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
        class="fixed inset-0 z-50 flex items-center justify-center transition-all duration-500"
        :class="{'opacity-100': modalOpen, 'opacity-0': !modalOpen}"
        @click="closeQuickView"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-white/95 backdrop-blur-xl"></div>
        
        <div 
          class="relative w-full max-w-7xl mx-6 bg-white rounded-3xl shadow-2xl transform transition-all duration-700 overflow-hidden"
          :class="{'translate-y-0 scale-100': modalOpen, 'translate-y-8 scale-95': !modalOpen}"
          @click.stop
        >
          <!-- Close Button -->
          <button 
            @click="closeQuickView"
            class="absolute top-6 right-6 z-20 bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-all duration-300 shadow-lg group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700 group-hover:rotate-90 transition-transform duration-300">
              <path d="m18 6-12 12"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>

          <div class="flex flex-col lg:flex-row min-h-[80vh]">
            <!-- Image Section -->
            <div class="flex-1 p-8 lg:p-12 flex flex-col justify-center">
              <div class="relative">
                <img 
                  :src="selectedProduct.images[currentImageIndex]" 
                  :alt="selectedProduct.name" 
                  class="w-full h-auto max-h-[70vh] object-contain rounded-2xl shadow-2xl transition-all duration-700"
                />
                
                <!-- Image Navigation -->
                <div v-if="selectedProduct.images.length > 1" class="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4">
                  <button 
                    @click.stop="previousImage" 
                    class="bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </button>
                  <button 
                    @click.stop="nextImage" 
                    class="bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Image Thumbnails -->
              <div v-if="selectedProduct.images.length > 1" class="flex justify-center mt-8 space-x-3">
                <button
                  v-for="(image, index) in selectedProduct.images"
                  :key="index"
                  @click.stop="currentImageIndex = index"
                  class="w-4 h-4 rounded-full transition-all duration-300"
                  :class="currentImageIndex === index ? 'bg-gray-800 scale-125' : 'bg-gray-300 hover:bg-gray-500'"
                ></button>
              </div>
            </div>

            <!-- Product Details Section -->
            <div class="lg:w-96 bg-gradient-to-br from-gray-50 to-white p-8 lg:p-12 overflow-y-auto border-l border-gray-100">
              <div class="space-y-8">
                <!-- Title Section -->
                <div class="animate-slide-in-right">
                  <h2 class="text-3xl font-light text-gray-900 mb-3 tracking-wide">{{ selectedProduct.name }}</h2>
                  <div class="w-16 h-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
                </div>

                <!-- Price Section -->
                <div class="animate-slide-in-right animation-delay-100">
                  <p class="text-2xl font-light text-gray-800">
                    <span v-if="!selectedSize">From ${{ getMinPrice(selectedProduct) }}</span>
                    <span v-else-if="quantity === 1">${{ getSelectedSizePrice() }}</span>
                    <span v-else class="space-x-2">
                      <span>${{ getSelectedSizePrice() }}</span>
                      <span class="text-gray-500">×</span>
                      <span>{{ quantity }}</span>
                      <span class="text-gray-500">=</span>
                      <span class="font-medium">${{ getTotalPrice() }}</span>
                    </span>
                  </p>
                </div>
                
                <!-- Size Selection -->
                <div class="animate-slide-in-right animation-delay-200">
                  <label class="block text-sm font-medium mb-4 text-gray-700">Size Selection</label>
                  <select 
                    v-model="selectedSize" 
                    class="w-full p-4 border border-gray-200 bg-white text-gray-900 rounded-xl focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-300 shadow-sm"
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
                <div class="animate-slide-in-right animation-delay-300">
                  <label class="block text-sm font-medium mb-4 text-gray-700">Quantity</label>
                  <div class="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <button 
                      @click.stop="quantity > 1 ? quantity-- : null" 
                      class="px-6 py-4 hover:bg-gray-50 transition-colors duration-300 text-gray-600"
                      :disabled="quantity <= 1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"/>
                      </svg>
                    </button>
                    <input 
                      v-model="quantity" 
                      type="number" 
                      min="1" 
                      class="flex-1 py-4 text-center border-0 bg-white text-gray-900 focus:ring-0 font-medium"
                    />
                    <button 
                      @click.stop="quantity++" 
                      class="px-6 py-4 hover:bg-gray-50 transition-colors duration-300 text-gray-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 5v14m-7-7h14"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <!-- Add to Cart Button -->
                <div class="animate-slide-in-right animation-delay-400">
                  <button 
                    @click.stop="addToCartFromModal" 
                    class="w-full bg-gray-900 text-white py-4 font-medium rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    :disabled="!selectedSize"
                  >
                    Add to Collection
                  </button>
                </div>

                <!-- View More Details Link -->
                <div class="text-center animate-slide-in-right animation-delay-500">
                  <NuxtLink 
                    :to="`/artworks/${selectedProduct._id}`"
                    class="text-gray-600 hover:text-gray-900 transition-colors duration-300 font-medium"
                  >
                    View Complete Details →
                  </NuxtLink>
                </div>
                
                <!-- Expandable Sections -->
                <div class="space-y-4 animate-slide-in-right animation-delay-600">
                  <div class="border border-gray-200 rounded-xl overflow-hidden">
                    <button 
                      @click.stop="toggleSection('productInfo')"
                      class="flex justify-between items-center w-full text-left p-6 hover:bg-gray-50 transition-all duration-300"
                    >
                      <h3 class="font-medium text-gray-800">Product Details</h3>
                      <div class="w-6 h-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" :class="{'rotate-45': expandedSections.productInfo}">
                          <path d="M12 5v14m-7-7h14"/>
                        </svg>
                      </div>
                    </button>
                    <div 
                      class="overflow-hidden transition-all duration-500"
                      :class="expandedSections.productInfo ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
                    >
                      <div class="p-6 pt-0 text-gray-600 text-sm leading-relaxed" v-html="selectedProduct.productInfo"></div>
                    </div>
                  </div>
                  
                  <div class="border border-gray-200 rounded-xl overflow-hidden">
                    <button 
                      @click.stop="toggleSection('shippingInfo')"
                      class="flex justify-between items-center w-full text-left p-6 hover:bg-gray-50 transition-all duration-300"
                    >
                      <h3 class="font-medium text-gray-800">Shipping Information</h3>
                      <div class="w-6 h-6 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" :class="{'rotate-45': expandedSections.shippingInfo}">
                          <path d="M12 5v14m-7-7h14"/>
                        </svg>
                      </div>
                    </button>
                    <div 
                      class="overflow-hidden transition-all duration-500"
                      :class="expandedSections.shippingInfo ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
                    >
                      <div class="p-6 pt-0 text-gray-600 text-sm leading-relaxed" v-html="selectedProduct.shippingInfo"></div>
                    </div>
                  </div>
                </div>
              </div>
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
import { useCustomToast } from '@/composables/core/useCustomToast'
const { addToCart: addItemToCart } = useCartStore()
const { showToast } = useCustomToast();

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

const openQuickView = (product: any) => {
  selectedProduct.value = product
  selectedSize.value = product.sizes[0]?._id || ''
  quantity.value = 1
  currentImageIndex.value = 0
  modalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeQuickView = () => {
  modalOpen.value = false
  document.body.style.overflow = 'auto'
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
  if (product && product?.isAvailable) {
    addItemToCart({
      id: product?._id,
      title: product?.name,
      image: product?.images[0],
      price: defaultPrice,
      quantity: 1
      // size: selectedSize.value.size
    })
  
  }
}

const addToCartFromModal = () => {
  if (!selectedProduct.value || !selectedSize.value) return
  
  const size = selectedProduct.value.sizes.find((s: any) => s._id === selectedSize.value)
  if (!size) return
  
  console.log(`Added ${quantity.value} ${selectedProduct.value.name} (${size.size}) to cart`)
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