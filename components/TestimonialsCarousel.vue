<template>
  <section ref="testimonialsSectionRef" class="py-8 md:py-12 bg-gradient-to-br from-slate-50 to-gray-100 relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-200/30 to-transparent rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-200/20 to-transparent rounded-full blur-3xl"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <!-- Header with enhanced animations -->
      <div class="flex justify-center items-center flex-col mb-8" :class="headerAnimation">
        <div class="relative mb-4">
          <h2 class="text-2xl md:text-4xl font-bold text-center mb-2 text-gray-800 relative inline-block">
            <span class="bg-gradient-to-r from-gray-800 via-emerald-600 to-gray-800 bg-clip-text text-transparent">
              What Our Clients Say
            </span>
            <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"></div>
          </h2>
        </div>
        
        <p class="text-gray-600 text-center max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Discover what art collectors and enthusiasts have to say about their experience
        </p>
        
        <!-- Loading state -->
        <div v-if="loading" class="mt-8 flex justify-center">
          <div class="flex space-x-2">
            <div class="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
            <div class="w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-3 h-3 bg-emerald-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
        </div>
        
        <!-- Reviews stats -->
        <div v-if="!loading && processedReviews.length > 0" class="mt-6 flex items-center space-x-6 text-sm text-gray-600">
          <div class="flex items-center space-x-2">
            <div class="flex space-x-0.5">
              <svg v-for="star in 5" :key="star" class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="font-medium">{{ averageRating.toFixed(1) }}</span>
          </div>
          <div class="text-gray-400">•</div>
          <span>{{ processedReviews.length }} {{ processedReviews.length === 1 ? 'Review' : 'Reviews' }}</span>
        </div>
      </div>

      <!-- Reviews carousel container -->
      <div v-if="!loading && processedReviews.length > 0" class="relative w-full">
        <!-- Navigation Arrows - Desktop only -->
        <button 
          class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 group"
          @click="goToPrevious"
          :disabled="currentSlide === 0 && !infiniteLoop"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 && !infiniteLoop }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 group-hover:text-emerald-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <!-- Carousel wrapper -->
        <div class="relative overflow-hidden rounded-2xl">
          <div 
            ref="carouselRef"
            class="flex transition-transform duration-500 ease-out"
            :style="{ 
              transform: `translateX(-${currentSlide * slideWidth}%)`,
              width: `${processedReviews.length * slideWidth}%`
            }"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            @mouseleave="handleMouseUp"
          >
            <div 
              v-for="(review, index) in processedReviews" 
              :key="review.id"
              class="testimonial-slide flex-shrink-0 px-2 md:px-3"
              :style="{ width: `${100 / processedReviews.length}%` }"
            >
              <div 
                class="testimonial-card h-full"
                :class="{ 'animate-slide-in': visibleCards.includes(index) }"
                :style="{ animationDelay: `${(index % cardsPerView) * 150}ms` }"
              >
                <div class="group bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-lg flex flex-col relative overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-white/20 hover:border-emerald-200/50">
                  
                  <!-- Floating gradient orbs -->
                  <div class="absolute -top-4 -right-4 w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-emerald-200/30 to-amber-200/30 rounded-full blur-xl group-hover:scale-110 transition-transform duration-700"></div>
                  <div class="absolute -bottom-6 -left-6 w-20 md:w-24 h-20 md:h-24 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-700 delay-150"></div>
                  
                  <!-- Product info header -->
                  <div class="flex items-start space-x-3 md:space-x-4 mb-4 relative z-10">
                    <div class="relative">
                      <img 
                        :src="review.productId.images[0]" 
                        :alt="review.productId.name"
                        class="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover shadow-lg ring-2 ring-white group-hover:ring-emerald-200 transition-all duration-300"
                        @error="handleImageError"
                      />
                      <div class="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-xs px-1.5 md:px-2 py-0.5 rounded-full font-medium shadow-lg">
                        ${{ review.productId.price }}
                      </div>
                    </div>
                    
                    <div class="flex-1 min-w-0">
                      <h4 class="font-semibold text-gray-900 truncate text-base md:text-lg group-hover:text-emerald-700 transition-colors">
                        {{ review.productId.name }}
                      </h4>
                      <p class="text-xs md:text-sm text-gray-500 mb-2">{{ formatDate(review.createdAt) }}</p>
                      
                      <!-- Star Rating -->
                      <div class="flex space-x-1">
                        <svg 
                          v-for="star in 5" 
                          :key="star" 
                          class="h-3 w-3 md:h-4 md:w-4 transition-all duration-300"
                          :class="star <= review.rating ? 'text-yellow-400 hover:text-yellow-500 hover:scale-110' : 'text-gray-300'"
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Review content -->
                  <div class="relative z-10 mb-3">
                    <!-- Quote decoration -->
                    <div class="absolute -top-2 -left-2 text-emerald-200 opacity-50 group-hover:opacity-70 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    
                    <p class="text-gray-700 text-sm md:text-base leading-relaxed italic pl-4 md:pl-6 group-hover:text-gray-800 transition-colors line-clamp-6">
                      "{{ review.comment }}"
                    </p>
                  </div>
                  
                  <!-- Reviewer info -->
                  <div class="flex items-center space-x-3 pt-3 border-t border-gray-100 relative z-10">
                    <div 
                      class="h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center text-white text-xs md:text-sm font-bold shadow-lg transform group-hover:scale-110 transition-all duration-300 ring-2 ring-white group-hover:ring-opacity-50"
                      :style="{ backgroundColor: getAvatarColor(review.userName) }"
                    >
                      {{ getInitials(review.userName) }}
                    </div>
                    
                    <div class="flex-1">
                      <h5 class="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors text-sm md:text-base">
                        {{ formatUserName(review.userName) }}
                      </h5>
                      <p class="text-xs text-gray-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verified Purchase
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 group"
          @click="goToNext"
          :disabled="currentSlide >= maxSlide && !infiniteLoop"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide >= maxSlide && !infiniteLoop }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 group-hover:text-emerald-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Carousel indicators -->
        <div class="flex justify-center mt-6 space-x-2">
          <button
            v-for="(slide, index) in totalSlides"
            :key="index"
            class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 transform hover:scale-110"
            :class="index === currentSlide ? 'bg-emerald-500 w-6 md:w-8' : 'bg-gray-300 hover:bg-gray-400'"
            @click="goToSlide(index)"
          ></button>
        </div>

        <!-- Mobile swipe indicator -->
        <div class="flex justify-center mt-4 md:hidden">
          <div class="flex items-center space-x-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span class="text-xs text-gray-500">Swipe for more</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!loading && processedReviews.length === 0" class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No Reviews Yet</h3>
        <p class="text-gray-500">Be the first to share your experience with our artwork!</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed, nextTick, onUnmounted } from 'vue'
import { useFetchAllReviews } from "@/composables/modules/review/useFetchReviews"

// Interface for review structure
interface ProductId {
  _id: string
  name: string
  price: number
  images: string[]
  discountPercentage: number
  id: string
}

interface Review {
  _id: string
  productId: ProductId
  userId: string
  userName: string
  userRole: string
  rating: number
  comment: string
  status: string
  createdAt: string
  updatedAt: string
  id: string
}

const { loading, reviews } = useFetchAllReviews()

// Refs
const testimonialsSectionRef = ref<HTMLElement | null>(null)
const carouselRef = ref<HTMLElement | null>(null)

// Carousel state
const currentSlide = ref(0)
const cardsPerView = ref(1)
const infiniteLoop = ref(true)
const autoPlay = ref(true)
const autoPlayInterval = ref(5000)
let autoPlayTimer: NodeJS.Timeout | null = null

// Animation states
const headerAnimation = ref('opacity-0 translate-y-8')
const visibleCards = ref<number[]>([])

// Touch/Mouse interaction
const isDragging = ref(false)
const startX = ref(0)
const currentX = ref(0)
const dragThreshold = 50

// Computed properties
const processedReviews = computed(() => {
  if (!reviews.value || !Array.isArray(reviews.value)) return []
  return reviews.value.filter((review: Review) => review.status === 'approved')
})

const averageRating = computed(() => {
  if (processedReviews.value.length === 0) return 0
  const sum = processedReviews.value.reduce((acc: number, review: Review) => acc + review.rating, 0)
  return sum / processedReviews.value.length
})

const slideWidth = computed(() => {
  return 100 / cardsPerView.value
})

const totalSlides = computed(() => {
  return Math.ceil(processedReviews.value.length / cardsPerView.value)
})

const maxSlide = computed(() => {
  return totalSlides.value - 1
})

// Responsive cards per view
const updateCardsPerView = () => {
  if (!process.client) return
  
  const width = window.innerWidth
  if (width < 768) {
    cardsPerView.value = 1 // Mobile: 1 card full width
  } else if (width < 1024) {
    cardsPerView.value = 2 // Tablet: 2 cards
  } else if (width < 1280) {
    cardsPerView.value = 2 // Desktop small: 2 cards
  } else {
    cardsPerView.value = 3 // Desktop large: 3 cards
  }
}

// Navigation functions
const goToSlide = (index: number) => {
  if (index >= 0 && index <= maxSlide.value) {
    currentSlide.value = index
    updateVisibleCards()
    resetAutoPlay()
  }
}

const goToNext = () => {
  if (currentSlide.value < maxSlide.value) {
    currentSlide.value++
  } else if (infiniteLoop.value) {
    currentSlide.value = 0
  }
  updateVisibleCards()
  resetAutoPlay()
}

const goToPrevious = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else if (infiniteLoop.value) {
    currentSlide.value = maxSlide.value
  }
  updateVisibleCards()
  resetAutoPlay()
}

// Update visible cards for animation
const updateVisibleCards = () => {
  const startIndex = currentSlide.value * cardsPerView.value
  const endIndex = Math.min(startIndex + cardsPerView.value, processedReviews.value.length)
  visibleCards.value = Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i)
}

// Touch handlers
const handleTouchStart = (e: TouchEvent) => {
  isDragging.value = true
  startX.value = e.touches[0].clientX
  pauseAutoPlay()
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  currentX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  
  const diff = startX.value - currentX.value
  
  if (Math.abs(diff) > dragThreshold) {
    if (diff > 0) {
      goToNext()
    } else {
      goToPrevious()
    }
  }
  
  isDragging.value = false
  startAutoPlay()
}

// Mouse handlers
const handleMouseDown = (e: MouseEvent) => {
  isDragging.value = true
  startX.value = e.clientX
  pauseAutoPlay()
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  currentX.value = e.clientX
}

const handleMouseUp = () => {
  if (!isDragging.value) return
  
  const diff = startX.value - currentX.value
  
  if (Math.abs(diff) > dragThreshold) {
    if (diff > 0) {
      goToNext()
    } else {
      goToPrevious()
    }
  }
  
  isDragging.value = false
  startAutoPlay()
}

// Auto-play functionality
const startAutoPlay = () => {
  if (!autoPlay.value || processedReviews.value.length <= cardsPerView.value) return
  
  autoPlayTimer = setInterval(() => {
    goToNext()
  }, autoPlayInterval.value)
}

const pauseAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

const resetAutoPlay = () => {
  pauseAutoPlay()
  startAutoPlay()
}

// Utility functions
const getInitials = (email: string): string => {
  if (email.includes('@')) {
    const name = email.split('@')[0]
    return name.substring(0, 2).toUpperCase()
  }
  return email.substring(0, 2).toUpperCase()
}

const getAvatarColor = (name: string): string => {
  const colors = [
    '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', 
    '#EF4444', '#06B6D4', '#F97316', '#14B8A6', '#F472B6'
  ]
  
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}

const formatUserName = (email: string): string => {
  if (email.includes('@')) {
    const name = email.split('@')[0]
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/[._]/g, ' ')
  }
  return email
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/64x64?text=Art'
}

// Lifecycle
onMounted(async () => {
  // Initialize responsive behavior
  updateCardsPerView()
  updateVisibleCards()
  
  // Header animation
  await nextTick()
  setTimeout(() => {
    headerAnimation.value = 'opacity-100 translate-y-0 transition-all duration-1000 ease-out'
  }, 300)
  
  // Start auto-play
  setTimeout(() => {
    startAutoPlay()
  }, 2000)
  
  // Add resize listener
  if (process.client) {
    window.addEventListener('resize', updateCardsPerView)
  }
})

onUnmounted(() => {
  pauseAutoPlay()
  if (process.client) {
    window.removeEventListener('resize', updateCardsPerView)
  }
})

// Watch for reviews loading
watch(() => processedReviews.value.length, (newLength) => {
  if (newLength > 0) {
    updateCardsPerView()
    updateVisibleCards()
    nextTick(() => {
      startAutoPlay()
    })
  }
})
</script>

<style scoped>
.bg-grid-pattern {
  background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
}

.line-clamp-6 {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes slide-in {
  0% { 
    opacity: 0; 
    transform: translateY(30px) scale(0.95); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

.animate-slide-in {
  animation: slide-in 0.6s ease-out forwards;
}

/* Carousel specific styles */
.testimonial-slide {
  transition: transform 0.3s ease;
}

.testimonial-card {
  height: auto;
}

@media (max-width: 768px) {
  .testimonial-card {
    height: auto;
  }
}

/* Hover effects */
.testimonial-card .group:hover {
  background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%);
}

/* Smooth transitions */
.testimonial-slide {
  will-change: transform;
}

/* Prevent text selection during drag */
.testimonial-slide {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
</style>