<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />

    <!-- Featured Categories - Animated Carousel -->
    <section class="py-16 bg-gray-50 overflow-hidden">
      <div class="container mx-auto px-4">
        <h2 
          class="text-xl font-bold text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          Explore Art Categories
        </h2>
        
        <!-- Animated Loader for Categories -->
        <div v-if="categoriesLoading" class="flex justify-center items-center py-16">
          <div class="category-loader">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <p class="text-gray-500 mt-4">Loading art categories...</p>
          </div>
        </div>
        
        <!-- Empty State for Categories -->
        <div v-else-if="allCategories.length === 0" class="empty-state">
          <div class="flex flex-col items-center justify-center py-16">
            <div class="w-24 h-24 mb-6 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">No Categories Found</h3>
            <p class="text-gray-500 text-center max-w-md mb-6">
              We couldn't find any art categories at the moment. Please check back later.
            </p>
            <button 
              @click="refreshCategories" 
              class="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 21h5v-5"></path></svg>
              Refresh
            </button>
          </div>
        </div>
        
        <!-- Animated Continuous Carousel -->
        <div v-else 
          class="categories-carousel-container relative"
          @mouseenter="pauseCarousel"
          @mouseleave="resumeCarousel"
          @touchstart="pauseCarousel"
          @touchend="resumeCarousel"
        >
          <div 
            class="categories-carousel" 
            :style="{ transform: `translateX(${carouselPosition}px)`, transition: carouselPaused ? 'none' : 'transform 50ms linear' }"
          >
            <div 
              v-for="(category, index) in duplicatedCategories" 
              :key="`${category._id}-${index}`"
              class="category-item"
              @click="navigateToCategory(category._id)"
            >
              <div class="relative overflow-hidden rounded-lg aspect-[4/3] group cursor-pointer">
                <img 
                  :src="category.image" 
                  :alt="category.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <h3 class="text-xl font-bold text-white mb-2">{{ category.name }}</h3>
                  <p class="text-white/80 mb-4">{{ category.description }}</p>
                  <span class="inline-flex items-center text-white text-sm font-medium">
                    Explore
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- New Arrivals -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 
          class="text-3xl font-bold text-center mb-4"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          New Arrivals
        </h2>
        <p 
          class="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 100 } }"
        >
          Discover the latest additions to our collection
        </p>
        
        <!-- Animated Loader for Products -->
        <div v-if="loading" class="flex justify-center items-center py-16">
          <div class="product-loader">
            <div class="product-loader-item"></div>
            <div class="product-loader-item"></div>
            <div class="product-loader-item"></div>
            <div class="product-loader-item"></div>
            <p class="text-gray-500 mt-8">Loading new arrivals...</p>
          </div>
        </div>
        
        <!-- Empty State for New Arrivals -->
        <div v-else-if="newArrivals.length === 0" class="empty-state">
          <div class="flex flex-col items-center justify-center py-16">
            <div class="w-24 h-24 mb-6 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z"></path><path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z"></path><line x1="12" x2="12" y1="22" y2="13"></line><path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5"></path></svg>
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">No New Arrivals Yet</h3>
            <p class="text-gray-500 text-center max-w-md mb-6">
              We're working on adding new artworks to our collection. Check back soon for exciting new pieces!
            </p>
            <button 
              @click="refreshProducts" 
              class="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 21h5v-5"></path></svg>
              Refresh
            </button>
          </div>
        </div>
        
        <div v-else>
          <!-- Category filters -->
          <div class="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              class="px-6 py-2 rounded-full transition-colors duration-300"
              :class="selectedNewArrivalCategory === 'all' ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'"
              @click="selectedNewArrivalCategory = 'all'"
            >
              All
            </button>
            <button 
              v-for="category in newArrivalCategories" 
              :key="category._id"
              class="px-6 py-2 rounded-full transition-colors duration-300"
              :class="selectedNewArrivalCategory === category._id ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'"
              @click="selectedNewArrivalCategory = category._id"
            >
              {{ category.name }}
            </button>
          </div>
          
          <!-- Products grid with animation -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="(product, index) in filteredNewArrivals" 
              :key="product._id"
              class="bg-white rounded-lg overflow-hidden shadow-md group"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
            >
              <div class="relative overflow-hidden aspect-square">
                <!-- Image carousel -->
                <div class="relative w-full h-full">
                  <div 
                    v-for="(image, imageIndex) in product.images" 
                    :key="imageIndex"
                    class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                    :class="imageIndex === productImageIndices[product._id] ? 'opacity-100' : 'opacity-0'"
                  >
                    <img 
                      :src="image" 
                      :alt="product.name"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                
                <!-- Badge -->
                <div class="absolute top-4 left-4 bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                  New Arrival
                </div>
                
                <!-- Quick actions -->
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button 
                    @click="viewProduct(product)"
                    class="bg-white text-black rounded-full p-3 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                  <button 
                    @click="addToCart(product)"
                    class="bg-black text-white rounded-full p-3 hover:bg-gray-800 transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                  </button>
                </div>
              </div>
              
              <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-500">{{ product.category?.name || 'Uncategorized' }}</span>
                  <div class="flex items-center">
                    <span class="text-amber-500 mr-1">★</span>
                    <span class="text-sm">{{ product.rating || 0 }}</span>
                  </div>
                </div>
                <h3 class="font-medium mb-2 truncate">{{ product.name }}</h3>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="font-bold">${{ product.discountPrice.toFixed(2) }}</span>
                    <span class="text-sm text-gray-500 line-through">${{ product.price.toFixed(2) }}</span>
                  </div>
                  <span class="text-green-600 text-sm">-{{ product.discountPercentage }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonial Section -->
    <section class="py-16 bg-gray-900 text-white">
      <div class="container mx-auto px-4">
        <h2 
          class="text-2xl lg:text-3xl font-bold text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          What Our Collectors Say
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="bg-gray-800 p-6 rounded-lg"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{ opacity: 1, scale: 1, transition: { delay: index * 150 } }"
          >
            <div class="flex items-center mb-4">
              <div class="flex text-amber-400">
                <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="i <= testimonial.rating ? 'fill-amber-400' : 'text-gray-600'"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
            </div>
            <p class="text-gray-300 mb-6">{{ testimonial.text }}</p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-gray-600 overflow-hidden mr-3">
                <img v-if="testimonial.avatar" :src="testimonial.avatar" :alt="testimonial.name" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center bg-black text-white font-bold">
                  {{ testimonial.name.charAt(0) }}
                </div>
              </div>
              <div>
                <h4 class="font-medium">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-400">{{ testimonial.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Best Sellers -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <h2 
          class="text-3xl font-bold text-center mb-4"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          Best Sellers
        </h2>
        <p 
          class="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 100 } }"
        >
          Our most popular artworks loved by collectors worldwide
        </p>
        
        <!-- Animated Loader for Best Sellers -->
        <div v-if="loading" class="flex justify-center items-center py-16">
          <div class="pulse-loader">
            <div class="pulse-loader-inner"></div>
            <p class="text-gray-500 mt-8">Loading best sellers...</p>
          </div>
        </div>
        
        <!-- Empty State for Best Sellers -->
        <div v-else-if="bestSellers.length === 0" class="empty-state">
          <div class="flex flex-col items-center justify-center py-16">
            <div class="w-24 h-24 mb-6 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"></path><path d="m6.8 14-3.5-2"></path><path d="m20.7 12-3.5 2"></path><path d="M6.8 10 3.3 12"></path><path d="m20.7 12-3.5-2"></path><path d="m9 17 3 5 3-5"></path><path d="M9 9a3 3 0 1 0 6 0 3 3 0 1 0-6 0"></path></svg>
            </div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">No Best Sellers Yet</h3>
            <p class="text-gray-500 text-center max-w-md mb-6">
              We're still collecting data on our most popular items. Check back soon to see our community favorites!
            </p>
            <button 
              @click="refreshProducts" 
              class="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 21h5v-5"></path></svg>
              Refresh
            </button>
          </div>
        </div>
        
        <div v-else>
          <!-- Rest of the Best Sellers section remains the same -->
          <!-- Category filters -->
          <div class="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              class="px-6 py-2 rounded-full transition-colors duration-300"
              :class="selectedBestSellerCategory === 'all' ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'"
              @click="selectedBestSellerCategory = 'all'"
            >
              All
            </button>
            <button 
              v-for="category in bestSellerCategories" 
              :key="category._id"
              class="px-6 py-2 rounded-full transition-colors duration-300"
              :class="selectedBestSellerCategory === category._id ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'"
              @click="selectedBestSellerCategory = category._id"
            >
              {{ category.name }}
            </button>
          </div>
          
          <!-- Products grid with animation -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="(product, index) in filteredBestSellers" 
              :key="product._id"
              class="bg-white rounded-lg overflow-hidden shadow-md group"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
            >
              <!-- Product content remains the same -->
              <div class="relative overflow-hidden aspect-square">
                <!-- Image carousel -->
                <div class="relative w-full h-full">
                  <div 
                    v-for="(image, imageIndex) in product.images" 
                    :key="imageIndex"
                    class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                    :class="imageIndex === productImageIndices[product._id] ? 'opacity-100' : 'opacity-0'"
                  >
                    <img 
                      :src="image" 
                      :alt="product.name"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                
                <!-- Badge -->
                <div class="absolute top-4 left-4 bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                  Best Seller
                </div>
                
                <!-- Quick actions -->
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button 
                    @click="viewProduct(product)"
                    class="bg-white text-black rounded-full p-3 hover:bg-gray-100 transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                  <button 
                    @click="addToCart(product)"
                    class="bg-black text-white rounded-full p-3 hover:bg-gray-800 transition-colors duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                  </button>
                </div>
              </div>
              
              <div class="p-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-500">{{ product.category?.name || 'Uncategorized' }}</span>
                  <div class="flex items-center">
                    <span class="text-amber-500 mr-1">★</span>
                    <span class="text-sm">{{ product.rating || 0 }}</span>
                  </div>
                </div>
                <h3 class="font-medium mb-2 truncate">{{ product.name }}</h3>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="font-bold">${{ product.discountPrice.toFixed(2) }}</span>
                    <span class="text-sm text-gray-500 line-through">${{ product.price.toFixed(2) }}</span>
                  </div>
                  <span class="text-green-600 text-sm">-{{ product.discountPercentage }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Products section with similar loader and empty state patterns -->
    <!-- Other sections remain the same -->
    
    <!-- Rest of the sections remain the same -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useFetchProducts } from "@/composables/modules/products/useFetchProducts"
import { useFetchCategories } from "@/composables/modules/products/useFetchCategories"
import { useCartStore } from '~/composables/useCartStore'
import insta1 from '@/assets/img/event-go.webp'
import insta2 from '@/assets/img/services9.jpg'
import insta3 from '@/assets/img/services3.jpg'
import insta4 from '@/assets/img/services5.jpg'
import insta5 from '@/assets/img/services6.jpg'
import { useRouter } from 'vue-router'

const { addToCart: addItemToCart } = useCartStore()
const email = ref('')
const router = useRouter()

// Fetch products and categories
const { products, loading, refresh: refreshProducts } = useFetchProducts()
const { categories: allCategories, loading: categoriesLoading, refresh: refreshCategories } = useFetchCategories()

// Product image carousel
const productImageIndices = ref<Record<string, number>>({})
const carouselIntervals = ref<Record<string, number>>({})

// Category filters
const selectedNewArrivalCategory = ref('all')
const selectedBestSellerCategory = ref('all')
const selectedFeaturedCategory = ref('all')

// Testimonials
const testimonials = ref([
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "The portrait Raymond created for me exceeded all my expectations. His attention to detail and ability to capture emotion is truly remarkable. I'll cherish this artwork forever.",
    rating: 5,
    avatar: "/images/testimonial-1.jpg."
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada",
    text: "Working with Raymond on my commission was a wonderful experience. He was attentive to my vision and delivered a masterpiece that now takes pride of place in my home.",
    rating: 5,
    avatar: "/images/testimonial-2.jpg"
  },
  {
    name: "Olivia Williams",
    location: "London, UK",
    text: "I've purchased several prints from Raymond's collection and each one is stunning. The quality is exceptional and they arrive beautifully packaged. Highly recommend!",
    rating: 5,
    avatar: "/images/testimonial-3.jpg"
  }
])

// Instagram Posts
const instagramPosts = ref([
  { image: insta1, likes: 243, comments: 18 },
  { image: insta2, likes: 187, comments: 12 },
  { image: insta3, likes: 321, comments: 24 },
  { image: insta4, likes: 156, comments: 9 },
  { image: insta5, likes: 278, comments: 21 },
  { image: insta1, likes: 192, comments: 15 }
])

// Filter products by attributes
const newArrivals = computed(() => {
  return products.value.filter(product => product.isNew)
})

const bestSellers = computed(() => {
  return products.value.filter(product => product.isBestseller)
})

const featuredProducts = computed(() => {
  return products.value.filter(product => product.isFeatured)
})

// Get unique categories for each product group
const newArrivalCategories = computed(() => {
  const categoryIds = new Set(newArrivals.value.map(product => product.category?._id))
  return allCategories.value.filter(category => categoryIds.has(category._id))
})

const bestSellerCategories = computed(() => {
  const categoryIds = new Set(bestSellers.value.map(product => product.category?._id))
  return allCategories.value.filter(category => categoryIds.has(category._id))
})

const featuredCategories = computed(() => {
  const categoryIds = new Set(featuredProducts.value.map(product => product.category?._id))
  return allCategories.value.filter(category => categoryIds.has(category._id))
})

// Filter products by selected category
const filteredNewArrivals = computed(() => {
  if (selectedNewArrivalCategory.value === 'all') {
    return newArrivals.value
  }
  return newArrivals.value.filter(product => product.category?._id === selectedNewArrivalCategory.value)
})

const filteredBestSellers = computed(() => {
  if (selectedBestSellerCategory.value === 'all') {
    return bestSellers.value
  }
  return bestSellers.value.filter(product => product.category?._id === selectedBestSellerCategory.value)
})

const filteredFeaturedProducts = computed(() => {
  if (selectedFeaturedCategory.value === 'all') {
    return featuredProducts.value
  }
  return featuredProducts.value.filter(product => product.category?._id === selectedFeaturedCategory.value)
})

// Initialize image carousel for each product
watch(() => products.value, (newProducts) => {
  newProducts.forEach(product => {
    if (!productImageIndices.value[product._id]) {
      productImageIndices.value[product._id] = 0
      
      // Start carousel for products with multiple images
      if (product.images.length > 1) {
        startImageCarousel(product._id, product.images.length)
      }
    }
  })
}, { immediate: true })

// Start image carousel
const startImageCarousel = (productId: string, imageCount: number) => {
  // Clear any existing interval
  if (carouselIntervals.value[productId]) {
    clearInterval(carouselIntervals.value[productId])
  }
  
  // Set new interval
  carouselIntervals.value[productId] = window.setInterval(() => {
    productImageIndices.value[productId] = (productImageIndices.value[productId] + 1) % imageCount
  }, 3000)
}

// Categories carousel functionality
const carouselPosition = ref(0)
const carouselPaused = ref(false)
const carouselAnimationFrame = ref<number | null>(null)
const CATEGORY_ITEM_WIDTH = 320 // Width of each category item in pixels

// Create duplicated categories for infinite carousel effect
const duplicatedCategories = computed(() => {
  // Duplicate the categories array to create a seamless loop
  return [...allCategories.value, ...allCategories.value, ...allCategories.value]
})

// Animate the carousel
const animateCarousel = () => {
  if (carouselPaused.value) return
  
  carouselPosition.value -= 1 // Speed of movement
  
  // Reset position when we've moved enough to the left
  const totalWidth = allCategories.value.length * CATEGORY_ITEM_WIDTH
  if (Math.abs(carouselPosition.value) >= totalWidth) {
    carouselPosition.value = 0
  }
  
  carouselAnimationFrame.value = requestAnimationFrame(animateCarousel)
}

// Pause and resume carousel
const pauseCarousel = () => {
  carouselPaused.value = true
  if (carouselAnimationFrame.value) {
    cancelAnimationFrame(carouselAnimationFrame.value)
    carouselAnimationFrame.value = null
  }
}

const resumeCarousel = () => {
  carouselPaused.value = false
  if (!carouselAnimationFrame.value) {
    carouselAnimationFrame.value = requestAnimationFrame(animateCarousel)
  }
}

// Start carousel animation when component is mounted
onMounted(() => {
  carouselAnimationFrame.value = requestAnimationFrame(animateCarousel)
})

// Clean up intervals and animation frames on component unmount
onBeforeUnmount(() => {
  // Clear product image carousel intervals
  Object.values(carouselIntervals.value).forEach(interval => {
    clearInterval(interval)
  })
  
  // Clear category carousel animation frame
  if (carouselAnimationFrame.value) {
    cancelAnimationFrame(carouselAnimationFrame.value)
  }
})

// Methods
const navigateToCategory = (categoryId: string) => {
  router.push(`/artworks?category=${categoryId}`)
}

const viewProduct = (product: any) => {
  router.push(`/artworks/${product._id}`)
}

const addToCart = (product: any) => {
  addItemToCart({
    id: product._id,
    title: product.name,
    image: product.images[0],
    price: product.discountPrice || product.price,
    quantity: 1
  })
}

const subscribeNewsletter = () => {
  // Handle newsletter subscription
  alert(`Thank you for subscribing with ${email.value}!`)
  email.value = ''
}
</script>

<style scoped>
/* Category Carousel Styles */
.categories-carousel-container {
  overflow: hidden;
  margin: 0 -20px;
  padding: 0 20px;
}

.categories-carousel {
  display: flex;
  gap: 20px;
}

.category-item {
  flex: 0 0 320px;
  width: 320px;
}

/* Category Loader Animation */
.category-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.category-loader .circle {
  width: 20px;
  height: 20px;
  background-color: #000;
  border-radius: 50%;
  display: inline-block;
  margin: 0 8px;
  animation: bounce 1.4s infinite ease-in-out both;
}

.category-loader .circle:nth-child(1) {
  animation-delay: -0.32s;
}

.category-loader .circle:nth-child(2) {
  animation-delay: -0.16s;
}

.category-loader .shadow {
  width: 20px;
  height: 5px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 12px 8px 0;
  animation: shadow 1.4s infinite ease-in-out both;
}

.category-loader .shadow:nth-child(4) {
  animation-delay: -0.32s;
}

.category-loader .shadow:nth-child(5) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% { 
    transform: scale(0);
  } 
  40% { 
    transform: scale(1.0);
  }
}

@keyframes shadow {
  0%, 80%, 100% { 
    opacity: 0.1;
    transform: scale(0.8);
  } 
  40% { 
    opacity: 0.3;
    transform: scale(1.0);
  }
}

/* Product Loader Animation */
.product-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-loader-item {
  width: 60px;
  height: 60px;
  background-color: #f3f4f6;
  margin: 10px;
  border-radius: 8px;
  display: inline-block;
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.product-loader-item:nth-child(1) {
  animation-delay: 0s;
}

.product-loader-item:nth-child(2) {
  animation-delay: 0.2s;
}

.product-loader-item:nth-child(3) {
  animation-delay: 0.4s;
}

.product-loader-item:nth-child(4) {
  animation-delay: 0.6s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
}

/* Pulse Loader Animation */
.pulse-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pulse-loader-inner {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
}

.pulse-loader-inner:before, 
.pulse-loader-inner:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.05);
  animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

.pulse-loader-inner:after {
  animation-delay: 0.5s;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: scale(1.8);
    opacity: 0;
  }
}

/* Empty State Styles */
.empty-state {
  background-color: #f9fafb;
  border-radius: 12px;
  padding: 20px;
}
</style>