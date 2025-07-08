<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <!-- Hero Section -->
    <section class="py-20 px-4 sm:px-6 mt-10 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-4xl md:text-5xl font-light mb-6 text-gray-800 tracking-wide animate-fade-in-up">
          Discover Original Masterpieces
        </h2>
        <p class="text-xl text-gray-600 mb-10 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up animation-delay-200">
          Immerse yourself in a curated collection of contemporary art that captures raw emotion and technical excellence.
        </p>
        <NuxtLink 
          to="/contact" 
          class="inline-flex items-center justify-center px-10 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-xl transform group animate-fade-in-up animation-delay-400"
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
        <h3 class="text-3xl font-light text-gray-800 mb-4 animate-fade-in-up">Featured Artworks</h3>
        <div class="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto animate-scale-in animation-delay-300"></div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        <div
          v-for="(artwork, index) in products"
          :key="artwork._id"
          class="artwork-card group cursor-pointer relative animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
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
                  class="text-xl md:text-2xl font-light text-white mb-2 tracking-wider"
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
            <div v-if="artwork.images && artwork.images.length > 1" class="absolute bottom-4 right-4 z-10">
              <div class="bg-white/90 backdrop-blur-sm text-gray-900 text-xs px-3 py-1.5 rounded-full shadow-lg font-medium">
                {{ (currentImageIndices[index] || 0) + 1 }}/{{ artwork.images.length }}
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
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="selectedArtwork" 
          class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
          @click="closeFullScreenModal"
        >
          <!-- Animated Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          </div>

          <!-- Modal Container -->
          <div class="relative h-full flex flex-col" @click.stop>
            <!-- Header -->
            <div class="flex items-center justify-between p-4 md:p-6 bg-black/20 backdrop-blur-sm border-b border-white/10">
              <!-- Navigation Info -->
              <div class="flex items-center space-x-4">
                <div class="text-white/80 text-sm font-medium">
                  {{ selectedArtworkIndex + 1 }} / {{ products.length }}
                </div>
                <div class="hidden md:block w-px h-6 bg-white/20"></div>
                <div class="hidden md:block text-white/60 text-sm">
                  {{ selectedArtwork.category?.name || 'Original Art' }}
                </div>
              </div>

              <!-- Controls -->
              <div class="flex items-center space-x-2">
                <!-- Previous/Next Navigation -->
                <button 
                  @click="navigateToPrevious"
                  class="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                  aria-label="Previous artwork"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </button>

                <button 
                  @click="navigateToNext"
                  class="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
                  aria-label="Next artwork"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>

                <!-- Close Button -->
                <button 
                  @click="closeFullScreenModal"
                  class="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 ml-2"
                  aria-label="Close artwork details"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m18 6-12 12"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Main Content -->
            <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
              <!-- Image Section -->
              <div class="flex-1 flex items-center justify-center p-4 md:p-8 relative">
                <!-- Image Container -->
                <Transition
                  enter-active-class="transition-all duration-700 ease-out"
                  enter-from-class="opacity-0 scale-95 rotate-1"
                  enter-to-class="opacity-100 scale-100 rotate-0"
                  leave-active-class="transition-all duration-300 ease-in"
                  leave-from-class="opacity-100 scale-100 rotate-0"
                  leave-to-class="opacity-0 scale-95 -rotate-1"
                  mode="out-in"
                >
                  <div 
                    :key="currentModalImageIndex"
                    class="relative max-w-full max-h-full flex items-center justify-center"
                  >
                    <img 
                      :src="selectedArtwork.images[currentModalImageIndex]" 
                      :alt="selectedArtwork.name" 
                      class="max-w-full max-h-[70vh] lg:max-h-[80vh] object-contain rounded-lg shadow-2xl"
                      @load="imageLoaded = true"
                    />
                    
                    <!-- Image Loading Overlay -->
                    <div v-if="!imageLoaded" class="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                      <div class="flex items-center space-x-2 text-white/60">
                        <div class="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white/60"></div>
                        <span class="text-sm">Loading...</span>
                      </div>
                    </div>
                  </div>
                </Transition>

                <!-- Image Navigation Arrows (for multiple images) -->
                <div v-if="selectedArtwork?.images?.length > 1" class="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button 
                    @click="previousImage"
                    class="p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all duration-300 backdrop-blur-sm pointer-events-auto"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                  </button>

                  <button 
                    @click="nextImage"
                    class="p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all duration-300 backdrop-blur-sm pointer-events-auto"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Details Sidebar -->
              <div class="w-full lg:w-96 bg-black/40 backdrop-blur-md border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto">
                <div class="p-6 space-y-6">
                  <!-- Title Section -->
                  <div class="animate-slide-in-right">
                    <h1 class="text-2xl md:text-3xl font-light mb-3 text-white tracking-wide">
                      {{ selectedArtwork.name.toUpperCase() }}
                    </h1>
                    <div class="w-16 h-0.5 bg-gradient-to-r from-white to-white/40 rounded-full"></div>
                  </div>

                  <!-- Category & Date -->
                  <div class="animate-slide-in-right animation-delay-100">
                    <div class="flex flex-wrap gap-2 text-sm">
                      <div class="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                        <span class="text-white/80">{{ selectedArtwork.category?.name || 'Original Art' }}</span>
                      </div>
                      <div v-if="selectedArtwork.createdAt" class="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                        <span class="text-white/80">{{ formatDate(selectedArtwork.createdAt) }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Description -->
                  <div v-if="selectedArtwork.description" class="animate-slide-in-right animation-delay-200">
                    <h3 class="text-lg font-medium mb-3 text-white">About This Piece</h3>
                    <div v-html="selectedArtwork.description" class="text-white/70 leading-relaxed text-sm prose prose-invert"></div>
                  </div>

                  <!-- Expandable Sections -->
                  <div class="space-y-3 animate-slide-in-right animation-delay-300">
                    <!-- Product Info -->
                    <div v-if="selectedArtwork.productInfo" class="border border-white/20 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm">
                      <button 
                        @click="toggleSection('productInfo')"
                        class="flex justify-between items-center w-full text-left p-4 hover:bg-white/10 transition-all duration-300"
                        :aria-expanded="expandedSections.productInfo"
                      >
                        <h3 class="font-medium text-white text-sm">ARTWORK DETAILS</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/60 transition-transform duration-300" :class="{'rotate-45': expandedSections.productInfo}">
                          <path d="M12 5v14m-7-7h14"/>
                        </svg>
                      </button>
                      <Transition
                        enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="max-h-0 opacity-0"
                        enter-to-class="max-h-96 opacity-100"
                        leave-active-class="transition-all duration-300 ease-in"
                        leave-from-class="max-h-96 opacity-100"
                        leave-to-class="max-h-0 opacity-0"
                      >
                        <div v-if="expandedSections.productInfo" class="overflow-hidden p-4 pt-0">
                          <div class="text-white/70 text-sm leading-relaxed prose prose-invert" v-html="selectedArtwork.productInfo"></div>
                        </div>
                      </Transition>
                    </div>

                    <!-- Shipping Info -->
                    <div class="border border-white/20 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm">
                      <button 
                        @click="toggleSection('shippingInfo')"
                        class="flex justify-between items-center w-full text-left p-4 hover:bg-white/10 transition-all duration-300"
                        :aria-expanded="expandedSections.shippingInfo"
                      >
                        <h3 class="font-medium text-white text-sm">SHIPPING & DELIVERY</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/60 transition-transform duration-300" :class="{'rotate-45': expandedSections.shippingInfo}">
                          <path d="M12 5v14m-7-7h14"/>
                        </svg>
                      </button>
                      <Transition
                        enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="max-h-0 opacity-0"
                        enter-to-class="max-h-96 opacity-100"
                        leave-active-class="transition-all duration-300 ease-in"
                        leave-from-class="max-h-96 opacity-100"
                        leave-to-class="max-h-0 opacity-0"
                      >
                        <div v-if="expandedSections.shippingInfo" class="overflow-hidden p-4 pt-0">
                          <div class="text-white/70 text-sm leading-relaxed">
                            <p class="mb-2">• Worldwide shipping available</p>
                            <p class="mb-2">• Professional packaging and handling</p>
                            <p>• Estimated delivery: 7-14 business days</p>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </div>

                  <!-- Contact Section -->
                  <div class="animate-slide-in-right animation-delay-400">
                    <div class="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <h3 class="font-medium mb-2 text-white text-sm">Interested in This Piece?</h3>
                      <p class="text-white/70 text-xs mb-4 leading-relaxed">Contact our gallery to discuss availability, pricing, and commission opportunities.</p>
                      <NuxtLink 
                        to="/contact-us"
                        class="block w-full bg-white text-gray-900 text-center py-3 font-medium rounded-lg hover:bg-white/90 transition-all duration-300 text-sm"
                      >
                        INQUIRE NOW
                      </NuxtLink>
                    </div>
                  </div>

                  <!-- Progress Indicator -->
                  <div class="animate-slide-in-right animation-delay-500">
                    <div class="flex items-center justify-center space-x-3 pt-2">
                      <span class="text-xs text-white/60">{{ selectedArtworkIndex + 1 }} of {{ products.length }}</span>
                      <div class="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          class="h-full bg-gradient-to-r from-white to-white/60 rounded-full transition-all duration-700"
                          :style="{ width: `${((selectedArtworkIndex + 1) / products.length) * 100}%` }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Image Navigation Dots (for multiple images) -->
            <div v-if="selectedArtwork?.images?.length > 1" class="flex justify-center p-4 bg-black/20 backdrop-blur-sm border-t border-white/10">
              <div class="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <button 
                  @click="previousImage"
                  class="p-1 hover:bg-white/20 rounded-full transition-all duration-300"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/80">
                    <path d="m15 18-6-6 6-6"/>
                  </svg>
                </button>
                
                <div class="flex items-center space-x-2">
                  <button
                    v-for="(image, index) in selectedArtwork.images"
                    :key="index"
                    @click="setModalImage(index)"
                    class="w-2 h-2 rounded-full transition-all duration-300"
                    :class="currentModalImageIndex === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'"
                    :aria-label="`View image ${index + 1}`"
                    :aria-current="currentModalImageIndex === index"
                  ></button>
                </div>

                <button 
                  @click="nextImage"
                  class="p-1 hover:bg-white/20 rounded-full transition-all duration-300"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white/80">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue'
import { useFetchProducts } from "@/composables/modules/products/useFetchProducts"

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
  document.body.style.overflow = 'hidden'
  
  // Stop auto-rotation for the selected artwork
  if (imageRotationIntervals[index]) {
    clearInterval(imageRotationIntervals[index])
  }
}

const closeFullScreenModal = () => {
  modalOpen.value = false
  document.body.style.overflow = ''
  
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
  document.body.style.overflow = ''
  
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

/* Custom scrollbar for dark theme */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Animations */
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

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-out forwards;
  opacity: 0;
}

.animate-scale-in {
  animation: scaleIn 0.6s ease-out forwards;
  opacity: 0;
}

.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

/* Prose styling for dark theme */
.prose-invert p {
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.prose-invert strong {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.prose-invert em {
  font-style: italic;
}
</style>