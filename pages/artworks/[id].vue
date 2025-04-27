<template>
    <div>
      <div class="container mx-auto px-4 py-12 md:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Artwork Images Carousel -->
          <div 
            class="relative"
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }"
          >
            <!-- Main Image -->
            <div class="relative overflow-hidden bg-gray-100 rounded-lg aspect-square">
              <img 
                :src="artwork.images[activeImageIndex]" 
                :alt="artwork.title"
                class="w-full h-full object-contain transition-all duration-700"
                :class="{ 'scale-105': isZoomed }"
                @mouseenter="isZoomed = true"
                @mouseleave="isZoomed = false"
              />
              
              <!-- Fullscreen View Button -->
              <button 
                @click="openFullscreen"
                class="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-300"
              >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M200,80v32a8,8,0,0,1-16,0V88H160a8,8,0,0,1,0-16h32A8,8,0,0,1,200,80ZM96,168H72V144a8,8,0,0,0-16,0v32a8,8,0,0,0,8,8H96a8,8,0,0,0,0-16ZM232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56ZM216,200V56H40V200H216Z"></path></svg>
              </button>
            </div>
            
            <!-- Thumbnail Navigation -->
            <div class="mt-4 flex gap-2 overflow-x-auto pb-2 snap-x">
              <button 
                v-for="(image, index) in artwork.images" 
                :key="index"
                @click="activeImageIndex = index"
                class="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden snap-start transition-all duration-300"
                :class="activeImageIndex === index ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'"
              >
                <img :src="image" :alt="`${artwork.title} thumbnail ${index + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
            
            <!-- Navigation Arrows -->
            <button 
              @click="prevImage" 
              class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-300"
              :class="{ 'opacity-50 cursor-not-allowed': activeImageIndex === 0 }"
              :disabled="activeImageIndex === 0"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg>
            </button>
            
            <button 
              @click="nextImage" 
              class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-300"
              :class="{ 'opacity-50 cursor-not-allowed': activeImageIndex === artwork.images.length - 1 }"
              :disabled="activeImageIndex === artwork.images.length - 1"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>
            </button>
          </div>
          
          <!-- Artwork Details -->
          <div 
            class="flex flex-col"
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }"
          >
            <div class="mb-2">
              <span class="text-sm text-primary font-medium">{{ artwork.category }}</span>
            </div>
            
            <h1 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{{ artwork.title }}</h1>
            
            <div class="flex items-center gap-4 mb-6">
              <div class="flex items-center">
                <div class="flex">
                  <!-- <svg  v-for="i in 5" :key="i" name="lucide:star" size="16" :class="i <= artwork.rating ? 'text-amber-400' : 'text-gray-300'"  xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M229.5,113,166.06,89.94,143,26.5a16,16,0,0,0-30,0L89.94,89.94,26.5,113a16,16,0,0,0,0,30l63.44,23.07L113,229.5a16,16,0,0,0,30,0l23.07-63.44L229.5,143a16,16,0,0,0,0-30ZM157.08,152.3a8,8,0,0,0-4.78,4.78L128,223.9l-24.3-66.82a8,8,0,0,0-4.78-4.78L32.1,128l66.82-24.3a8,8,0,0,0,4.78-4.78L128,32.1l24.3,66.82a8,8,0,0,0,4.78,4.78L223.9,128Z"></path></svg> -->
                  <!-- <Icon v-for="i in 5" :key="i" name="lucide:star" size="16" :class="i <= artwork.rating ? 'text-amber-400' : 'text-gray-300'" /> -->
                </div>
                <span class="ml-2 text-sm text-gray-600">({{ artwork.reviewCount }} reviews)</span>
              </div>
              
              <span v-if="artwork.isOnSale" class="bg-rose-100 text-rose-800 text-xs px-3 py-1 rounded-full">
                Sale
              </span>
            </div>
            
            <div class="mb-6">
              <div class="flex items-baseline gap-3">
                <span class="text-2xl font-bold text-gray-900">${{ formatPrice(artwork.price) }}</span>
                <span v-if="artwork.originalPrice" class="text-lg text-gray-500 line-through">${{ formatPrice(artwork.originalPrice) }}</span>
                <span v-if="artwork.discountPercentage" class="text-sm text-rose-600">{{ artwork.discountPercentage }}% off</span>
              </div>
            </div>
            
            <div class="prose prose-sm mb-8 text-gray-700">
              <p>{{ artwork.description }}</p>
            </div>
            
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-3">Artwork Details</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500">Medium</p>
                  <p class="text-gray-900">{{ artwork.medium }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Dimensions</p>
                  <p class="text-gray-900">{{ artwork.dimensions }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Year</p>
                  <p class="text-gray-900">{{ artwork.year }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Availability</p>
                  <p class="text-gray-900">{{ artwork.inStock ? 'In Stock' : 'Sold Out' }}</p>
                </div>
              </div>
            </div>
            
            <!-- Add to Cart Section -->
            <div class="mt-auto">
              <div class="flex flex-col sm:flex-row gap-4 mb-6">
                <div class="flex border border-gray-300 rounded-md">
                  <button 
                    @click="decrementQuantity" 
                    class="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-300"
                    :disabled="quantity <= 1"
                    :class="{ 'opacity-50 cursor-not-allowed': quantity <= 1 }"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path></svg>
                  </button>
                  <div class="px-4 py-2 border-l border-r border-gray-300 min-w-[50px] text-center">
                    {{ quantity }}
                  </div>
                  <button 
                    @click="incrementQuantity" 
                    class="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-300"
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
                  </button>
                </div>
                
                <button 
                  @click="addToCart"
                  class="flex-grow px-6 py-3 bg-black text-white rounded-md hover:bg-black-dark transition-colors duration-300 flex items-center justify-center gap-2"
                  :disabled="!artwork.inStock"
                  :class="{ 'opacity-50 cursor-not-allowed': !artwork.inStock }"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V72H40V56Zm0,144H40V88H216V200Zm-40-88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z"></path></svg>
                  {{ artwork.inStock ? 'Add to Cart' : 'Sold Out' }}
                </button>
                
                <button 
                  @click="toggleFavorite"
                  class="px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300"
                  :class="{ 'text-rose-500 border-rose-300': isFavorite }"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg>
                  <!-- <Icon :name="isFavorite ? 'lucide:heart' : 'lucide:heart'" size="18" /> -->
                </button>
              </div>
              
              <!-- Shipping & Returns Info -->
              <div class="border-t border-gray-200 pt-6 space-y-4">
                <div class="flex items-start gap-3">
                  <!-- <Icon name="lucide:truck" size="20" class="text-gray-600 mt-0.5" /> -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M255.42,117l-14-35A15.93,15.93,0,0,0,226.58,72H192V64a8,8,0,0,0-8-8H32A16,16,0,0,0,16,72V184a16,16,0,0,0,16,16H49a32,32,0,0,0,62,0h50a32,32,0,0,0,62,0h17a16,16,0,0,0,16-16V120A7.94,7.94,0,0,0,255.42,117ZM192,88h34.58l9.6,24H192ZM32,72H176v64H32ZM80,208a16,16,0,1,1,16-16A16,16,0,0,1,80,208Zm81-24H111a32,32,0,0,0-62,0H32V152H176v12.31A32.11,32.11,0,0,0,161,184Zm31,24a16,16,0,1,1,16-16A16,16,0,0,1,192,208Zm48-24H223a32.06,32.06,0,0,0-31-24V128h48Z"></path></svg>
                  <div>
                    <h4 class="font-medium text-gray-900">Free Shipping</h4>
                    <p class="text-sm text-gray-600">Free worldwide shipping on all orders over $100</p>
                  </div>
                </div>
                
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,48V96a8,8,0,0,1-8,8H168a8,8,0,0,1,0-16h28.69L182.06,73.37a79.56,79.56,0,0,0-56.13-23.43h-.45A79.52,79.52,0,0,0,69.59,72.71,8,8,0,0,1,58.41,61.27a96,96,0,0,1,135,.79L208,76.69V48a8,8,0,0,1,16,0ZM186.41,183.29a80,80,0,0,1-112.47-.66L59.31,168H88a8,8,0,0,0,0-16H40a8,8,0,0,0-8,8v48a8,8,0,0,0,16,0V179.31l14.63,14.63A95.43,95.43,0,0,0,130,222.06h.53a95.36,95.36,0,0,0,67.07-27.33,8,8,0,0,0-11.18-11.44Z"></path></svg>
                  <div>
                    <h4 class="font-medium text-gray-900">Easy Returns</h4>
                    <p class="text-sm text-gray-600">30-day money back guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Related Artworks -->
        <div class="mt-20">
          <h2 class="text-2xl font-bold mb-8">You May Also Like</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="(relatedArtwork, index) in relatedArtworks" 
              :key="relatedArtwork.id"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 100 * index } }"
            >
              <ArtworkCard 
                :artwork="relatedArtwork" 
                @view="navigateToArtwork(relatedArtwork.id)"
                @add-to-cart="addRelatedToCart(relatedArtwork)"
              />
            </div>
          </div>
        </div>
      </div>
      
      <!-- Fullscreen Image Modal -->
      <div 
        v-if="isFullscreenOpen" 
        class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        @click="isFullscreenOpen = false"
      >
        <button class="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
        </button>
        
        <img 
          :src="artwork.images[activeImageIndex]" 
          :alt="artwork.title"
          class="max-w-full max-h-[90vh] object-contain"
        />
        
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <button 
            v-for="(image, index) in artwork.images" 
            :key="index"
            @click.stop="activeImageIndex = index"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="activeImageIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'"
          ></button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import image1 from '@/assets/img/corporate.png'
import image2 from '@/assets/img/services6.jpg'
import image3 from '@/assets/img/services8.jpg'
import image4 from '@/assets/img/services9.jpg'
  import { useCartStore } from '~/composables/useCartStore'
  import { useRoute, useRouter } from 'vue-router';
import image5 from '@/assets/img/comiles-desktop-mockup.png'
import image6 from '@/assets/img/business-ride.jpg'
  
  const route = useRoute()
  const router = useRouter();
  const { addToCart: addItemToCart } = useCartStore()
  
  // State
  const artwork = ref({
    id: 1,
    title: "No Greater Love",
    category: "Religious",
    images: [
      image1, image2, image3
    ],
    price: 1200,
    originalPrice: 1500,
    discountPercentage: 20,
    medium: "Charcoal on Paper",
    dimensions: "24 x 36 inches",
    year: 2023,
    description: "This Artwork depicts the suffering of Christ on His way to Calvary and then ponders how Christ exhibits each of the qualities of love in His Passion. Love is patient. Love bears all things, endures all things, even death - death on a Cross! Reflecting on this we ask ourselves: 'Am I patient in my sufferings, as Christ was? Am I kind to those who hurt me? Do I rejoice in wrongdoing and vengeance or do I rejoice in truth and mercy?'",
    inStock: true,
    rating: 5,
    reviewCount: 12,
    isOnSale: true
  })
  
  const relatedArtworks = ref([
    {
      id: 2,
      title: "Divine Light",
      image: image1,
      category: "Religious",
      price: 950,
      medium: "Acrylic on Canvas",
      isNewArrival: true
    },
    {
      id: 3,
      title: "Serenity Falls",
      image: image2,
      category: "Landscape",
      price: 850,
      medium: "Mixed Media"
    },
    {
      id: 4,
      title: "Reflection",
      image: image3,
      category: "Portrait",
      price: 1100,
      medium: "Oil on Canvas",
      isBestSeller: true
    },
    {
      id: 5,
      title: "Ethereal Wings",
      image: image4,
      category: "Religious",
      price: 1300,
      medium: "Charcoal on Paper"
    }
  ])
  
  const activeImageIndex = ref(0)
  const quantity = ref(1)
  const isFavorite = ref(false)
  const isZoomed = ref(false)
  const isFullscreenOpen = ref(false)
  
  // Methods
  const prevImage = () => {
    if (activeImageIndex.value > 0) {
      activeImageIndex.value--
    }
  }
  
  const nextImage = () => {
    if (activeImageIndex.value < artwork.value.images.length - 1) {
      activeImageIndex.value++
    }
  }
  
  const incrementQuantity = () => {
    quantity.value++
  }
  
  const decrementQuantity = () => {
    if (quantity.value > 1) {
      quantity.value--
    }
  }
  
  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value
  }
  
  const openFullscreen = () => {
    isFullscreenOpen.value = true
  }
  
  const addToCart = () => {
    if (artwork.value.inStock) {
      addItemToCart({
        id: artwork.value.id,
        title: artwork.value.title,
        image: artwork.value.images[0],
        price: artwork.value.price,
        quantity: quantity.value
      })
      
      // Show success notification
      // ...
    }
  }
  
  const addRelatedToCart = (relatedArtwork: any) => {
    addItemToCart({
      id: relatedArtwork.id,
      title: relatedArtwork.title,
      image: relatedArtwork.image,
      price: relatedArtwork.price,
      quantity: 1
    })
  }
  
  const navigateToArtwork = (id: number) => {
    router.push(`/artworks/${id}`);
  }
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US')
  }
  
  onMounted(() => {
    // Fetch artwork data based on route.params.id
    // ...
  })
  </script>