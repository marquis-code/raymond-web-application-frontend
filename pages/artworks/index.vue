<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <!-- Hero Section -->
    <section class="py-20 px-4 sm:px-6 mt-10 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-light mb-6 text-gray-800 tracking-wide">
          Discover Original Masterpieces
        </h2>
        <p class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
          Immerse yourself in a curated collection of contemporary art that captures raw emotion and technical excellence.
        </p>
        <NuxtLink 
          to="/contact-us" 
          class="inline-flex items-center justify-center px-10 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-xl transform"
        >
          <span class="mr-2">EXPLORE COLLECTION</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </NuxtLink>
      </div>
    </section>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="relative">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent absolute top-0 left-0"></div>
      </div>
    </div>

    <!-- Artwork Gallery -->
    <div v-else class="container mx-auto px-6 py-20">
      <div class="text-center mb-16">
        <h3 class="text-3xl font-light text-gray-800 mb-4">Featured Artworks</h3>
        <div class="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto"></div>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-8">
        <div
          v-for="(artwork, index) in products"
          :key="artwork._id"
          class="artwork-card group cursor-pointer relative"
          @click="openFullScreenModal(artwork, index)"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <!-- Artwork Container -->
          <div class="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white shadow-lg group-hover:shadow-2xl transition-all duration-700">
            <!-- Artwork Image -->
            <img
              :src="getCurrentImage(artwork, index)"
              :alt="artwork.name"
              class="w-full h-full object-cover transition-all duration-700 ease-out"
              :class="{
                'scale-110': hoveredIndex === index,
                'scale-100': hoveredIndex !== index
              }"
            />
            
            <!-- Gradient Overlay -->
            <div 
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-500"
              :class="{
                'opacity-100': hoveredIndex === index,
                'opacity-0': hoveredIndex !== index
              }"
            ></div>

            <!-- Artwork Title Overlay -->
            <div 
              class="absolute inset-0 flex items-center justify-center transition-all duration-500"
              :class="{
                'opacity-100': hoveredIndex === index,
                'opacity-0': hoveredIndex !== index
              }"
            >
              <div class="text-center transform transition-all duration-700">
                <h3 
                  class="text-2xl md:text-3xl font-light text-white mb-2 tracking-wider"
                  :class="{
                    'translate-y-0 opacity-100': hoveredIndex === index,
                    'translate-y-8 opacity-0': hoveredIndex !== index
                  }"
                >
                  {{ artwork.name.toUpperCase() }}
                </h3>
                <div 
                  class="w-16 h-0.5 bg-white mx-auto transition-all duration-700 delay-100"
                  :class="{
                    'scale-x-100 opacity-100': hoveredIndex === index,
                    'scale-x-0 opacity-0': hoveredIndex !== index
                  }"
                ></div>
              </div>
            </div>

            <!-- Product Tags -->
            <div v-if="getProductTag(artwork)" class="absolute top-4 left-4 z-10">
              <span class="bg-white/90 backdrop-blur-sm text-gray-900 text-xs px-3 py-1.5 font-medium rounded-full shadow-lg">
                {{ getProductTag(artwork) }}
              </span>
            </div>

            <!-- Image Counter -->
            <div v-if="artwork.images.length > 1" class="absolute bottom-4 right-4 z-10">
              <div class="bg-white/90 backdrop-blur-sm text-gray-900 text-xs px-3 py-1.5 rounded-full shadow-lg font-medium">
                {{ currentImageIndices[index] + 1 }}/{{ artwork.images.length }}
              </div>
            </div>
          </div>

          <!-- Artwork Info -->
          <div class="mt-6 text-center">
            <h4 class="text-lg font-medium text-gray-800 mb-1">{{ artwork.name }}</h4>
            <p class="text-sm text-gray-500 font-light">{{ artwork.category?.name || 'Original Art' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Full Screen Modal -->
    <Teleport to="body">
      <div 
        v-if="selectedArtwork" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto"
        :class="{'opacity-100': modalOpen, 'opacity-0': !modalOpen}"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/80 backdrop-blur-sm" 
          @click="closeFullScreenModal"
        ></div>
        
        <!-- Modal Container -->
        <div 
          class="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl transform transition-all duration-500 max-h-[95vh] overflow-hidden flex flex-col"
          :class="{'translate-y-0 scale-100': modalOpen, 'translate-y-8 scale-95': !modalOpen}"
          @click.stop
        >
          <!-- Close Button -->
          <button 
            @click="closeFullScreenModal"
            class="absolute top-4 right-4 z-30 bg-white hover:bg-gray-100 p-2 rounded-full transition-all duration-300 shadow-md"
            aria-label="Close artwork details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
              <path d="m18 6-12 12"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>

          <!-- Navigation Buttons -->
          <button 
            @click="navigateToPrevious"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-gray-100 p-2 rounded-full transition-all duration-300 shadow-md"
            aria-label="Previous artwork"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          <button 
            @click="navigateToNext"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white hover:bg-gray-100 p-2 rounded-full transition-all duration-300 shadow-md"
            aria-label="Next artwork"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>

          <!-- Content Container with Scrollable Area -->
          <div class="overflow-y-auto flex-1 flex flex-col md:flex-row">
            <!-- Image Section -->
            <div class="md:w-2/3 p-6 flex items-center justify-center bg-gray-50">
              <div class="relative w-full h-full flex items-center justify-center">
                <img 
                  :src="selectedArtwork.images[currentModalImageIndex]" 
                  :alt="selectedArtwork.name" 
                  class="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  :key="currentModalImageIndex"
                  @load="imageLoaded = true"
                />
                
                <!-- Image Loading Overlay -->
                <div v-if="!imageLoaded" class="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div class="animate-pulse text-gray-400">Loading...</div>
                </div>
              </div>
            </div>

            <!-- Details Section - Scrollable -->
            <div class="md:w-1/3 bg-white border-t md:border-t-0 md:border-l border-gray-100">
              <div class="p-6 space-y-6 h-full overflow-y-auto">
                <!-- Title Section -->
                <div>
                  <h1 class="text-2xl md:text-3xl font-light mb-2 text-gray-800 tracking-wide">
                    {{ selectedArtwork.name.toUpperCase() }}
                  </h1>
                  <div class="w-12 h-0.5 bg-gray-400 rounded-full"></div>
                </div>

                <!-- Category & Date -->
                <div>
                  <div class="flex flex-wrap gap-2 text-sm">
                    <div class="bg-gray-100 px-3 py-1 rounded-full">
                      <span class="text-gray-600">{{ selectedArtwork.category?.name || 'Original Art' }}</span>
                    </div>
                    <div v-if="selectedArtwork.createdAt" class="bg-gray-100 px-3 py-1 rounded-full">
                      <span class="text-gray-600">{{ formatDate(selectedArtwork.createdAt) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <div v-if="selectedArtwork.description">
                  <h3 class="text-lg font-medium mb-3 text-gray-800">About This Piece</h3>
                  <div v-html="selectedArtwork.description" class="text-gray-600 leading-relaxed text-sm"></div>
                </div>

                <!-- Expandable Sections -->
                <div class="space-y-3">
                  <!-- Product Info -->
                  <div v-if="selectedArtwork.productInfo" class="border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      @click="toggleSection('productInfo')"
                      class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-all duration-300"
                      :aria-expanded="expandedSections.productInfo"
                    >
                      <h3 class="font-medium text-gray-800 text-sm">ARTWORK DETAILS</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" :class="{'rotate-45': expandedSections.productInfo}">
                        <path d="M12 5v14m-7-7h14"/>
                      </svg>
                    </button>
                    <div 
                      class="overflow-hidden transition-all duration-300"
                      :class="expandedSections.productInfo ? 'max-h-96 p-4 pt-0' : 'max-h-0'"
                    >
                      <div class="text-gray-600 text-sm leading-relaxed" v-html="selectedArtwork.productInfo"></div>
                    </div>
                  </div>

                  <!-- Shipping Info -->
                  <div class="border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      @click="toggleSection('shippingInfo')"
                      class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-all duration-300"
                      :aria-expanded="expandedSections.shippingInfo"
                    >
                      <h3 class="font-medium text-gray-800 text-sm">SHIPPING & DELIVERY</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300" :class="{'rotate-45': expandedSections.shippingInfo}">
                        <path d="M12 5v14m-7-7h14"/>
                      </svg>
                    </button>
                    <div 
                      class="overflow-hidden transition-all duration-300"
                      :class="expandedSections.shippingInfo ? 'max-h-96 p-4 pt-0' : 'max-h-0'"
                    >
                      <div class="text-gray-600 text-sm leading-relaxed">
                        <p class="mb-2">• Worldwide shipping available</p>
                        <p class="mb-2">• Professional packaging and handling</p>
                        <p>• Estimated delivery: 7-14 business days</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Contact Section -->
                <div>
                  <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 class="font-medium mb-2 text-gray-800 text-sm">Interested in This Piece?</h3>
                    <p class="text-gray-600 text-xs mb-4 leading-relaxed">Contact our gallery to discuss availability, pricing, and commission opportunities.</p>
                    <NuxtLink 
                      to="/contact-us"
                      class="block w-full bg-gray-900 text-white text-center py-3 font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 text-sm"
                    >
                      INQUIRE NOW
                    </NuxtLink>
                  </div>
                </div>

                <!-- Progress Indicator -->
                <div>
                  <div class="flex items-center justify-center space-x-2 pt-2">
                    <span class="text-xs text-gray-500">{{ selectedArtworkIndex + 1 }} of {{ products.length }}</span>
                    <div class="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        class="h-full bg-gray-600 rounded-full transition-all duration-700"
                        :style="{ width: `${((selectedArtworkIndex + 1) / products.length) * 100}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Image Navigation for Multiple Images -->
          <div v-if="selectedArtwork?.images?.length > 1" class="flex justify-center p-4 border-t border-gray-100 bg-white">
            <div class="flex items-center space-x-4 bg-gray-50 rounded-full px-4 py-2">
              <button 
                @click="previousImage"
                class="p-1 hover:bg-gray-200 rounded-full transition-all duration-300"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
              </button>
              
              <div class="flex items-center space-x-1">
                <button
                  v-for="(image, index) in selectedArtwork.images"
                  :key="index"
                  @click="setModalImage(index)"
                  class="w-2 h-2 rounded-full transition-all duration-300"
                  :class="currentModalImageIndex === index ? 'bg-gray-700 scale-125' : 'bg-gray-300 hover:bg-gray-400'"
                  :aria-label="`View image ${index + 1}`"
                  :aria-current="currentModalImageIndex === index"
                ></button>
              </div>

              <button 
                @click="nextImage"
                class="p-1 hover:bg-gray-200 rounded-full transition-all duration-300"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
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
import { NuxtLink } from '#components'

// State
const hoveredIndex = ref<number | null>(null)
const selectedArtwork = ref<any>(null)
const selectedArtworkIndex = ref<number>(0)
const modalOpen = ref(false)
const currentModalImageIndex = ref(0)
const currentImageIndices = reactive<Record<number, number>>({})
const imageLoaded = ref(false)

// Expandable sections
const expandedSections = reactive({
  productInfo: false,
  shippingInfo: false,
  returnPolicy: false
})

const { products, loading } = useFetchProducts()

// Declare imageRotationIntervals
let imageRotationIntervals: Record<number, number> = {}

// Methods
const getProductTag = (product: any) => {
  if (product.isFeatured) return 'Featured'
  if (product.isNew) return 'New'
  if (product.isBestseller) return 'Popular'
  return null
}

const getCurrentImage = (artwork: any, index: number) => {
  if (!artwork.images || artwork.images.length === 0) return ''
  const imageIndex = currentImageIndices[index] || 0
  return artwork.images[imageIndex] || artwork.images[0]
}

const openFullScreenModal = (artwork: any, index: number) => {
  selectedArtwork.value = artwork
  selectedArtworkIndex.value = index
  currentModalImageIndex.value = 0
  imageLoaded.value = false
  modalOpen.value = true
  document.body.classList.add('modal-open')
  
  // Stop auto-rotation for the selected artwork
  if (imageRotationIntervals[index]) {
    clearInterval(imageRotationIntervals[index])
  }
}

const closeFullScreenModal = () => {
  modalOpen.value = false
  document.body.classList.remove('modal-open')
  
  // Restart auto-rotation
  startImageRotation()
  
  setTimeout(() => {
    selectedArtwork.value = null
  }, 300)
}

const navigateToPrevious = () => {
  const currentIndex = selectedArtworkIndex.value
  const newIndex = currentIndex === 0 ? products.value.length - 1 : currentIndex - 1
  selectedArtwork.value = products.value[newIndex]
  selectedArtworkIndex.value = newIndex
  currentModalImageIndex.value = 0
  imageLoaded.value = false
}

const navigateToNext = () => {
  const currentIndex = selectedArtworkIndex.value
  const newIndex = currentIndex === products.value.length - 1 ? 0 : currentIndex + 1
  selectedArtwork.value = products.value[newIndex]
  selectedArtworkIndex.value = newIndex
  currentModalImageIndex.value = 0
  imageLoaded.value = false
}

const previousImage = () => {
  if (selectedArtwork.value && selectedArtwork.value.images.length > 1) {
    currentModalImageIndex.value = currentModalImageIndex.value === 0 
      ? selectedArtwork.value.images.length - 1 
      : currentModalImageIndex.value - 1
    imageLoaded.value = false
  }
}

const nextImage = () => {
  if (selectedArtwork.value && selectedArtwork.value.images.length > 1) {
    currentModalImageIndex.value = (currentModalImageIndex.value + 1) % selectedArtwork.value.images.length
    imageLoaded.value = false
  }
}

const setModalImage = (index: number) => {
  currentModalImageIndex.value = index
  imageLoaded.value = false
}

const toggleSection = (section: keyof typeof expandedSections) => {
  expandedSections[section] = !expandedSections[section]
}

const formatDate = (dateString: string) => {
  return new Date(dateString).getFullYear().toString()
}

// Auto-rotate images for artworks with multiple images
const startImageRotation = () => {
  // Clear existing intervals
  Object.values(imageRotationIntervals).forEach(interval => clearInterval(interval))
  imageRotationIntervals = {}

  products.value?.forEach((artwork, index) => {
    if (artwork.images && artwork.images.length > 1) {
      currentImageIndices[index] = 0
      
      imageRotationIntervals[index] = window.setInterval(() => {
        // Don't rotate if this artwork is currently being viewed in modal
        if (selectedArtwork.value?._id === artwork._id) return
        
        currentImageIndices[index] = (currentImageIndices[index] + 1) % artwork.images.length
      }, 4000 + (index * 500)) // Stagger the rotations
    } else {
      currentImageIndices[index] = 0
    }
  })
}

// Handle escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && modalOpen.value) {
    closeFullScreenModal()
  } else if (modalOpen.value) {
    if (e.key === 'ArrowLeft') {
      navigateToPrevious()
    } else if (e.key === 'ArrowRight') {
      navigateToNext()
    }
  }
}

// Watch for products changes
watch(() => products.value, (newProducts) => {
  if (newProducts && newProducts.length > 0) {
    startImageRotation()
  }
}, { immediate: true })

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.classList.remove('modal-open')
  
  // Clear all intervals
  Object.values(imageRotationIntervals).forEach(interval => clearInterval(interval))
})
</script>

<style scoped>
.artwork-card {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.artwork-card:hover {
  transform: translateY(-8px);
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

/* Modal Open Body Style */
:global(.modal-open) {
  overflow: auto;
  padding-right: 0 !important;
}

/* Animations */
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

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-out forwards;
}

.animation-delay-100 {
  animation-delay: 0.1s;
  opacity: 0;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

.animation-delay-300 {
  animation-delay: 0.3s;
  opacity: 0;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  opacity: 0;
}

.animation-delay-500 {
  animation-delay: 0.5s;
  opacity: 0;
}

/* Prose styling for descriptions */
.prose p {
  margin-bottom: 1rem;
}

.prose strong {
  font-weight: 600;
  color: #374151;
}

.prose em {
  font-style: italic;
}
</style>