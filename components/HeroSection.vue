<template>
  <section class="relative h-screen overflow-hidden bg-gray-900">
    <!-- Background artwork with parallax effect -->
    <div class="absolute inset-0 opacity-30">
      <div 
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${currentArtwork.image})`, transform: `translateY(${scrollY * 0.2}px)` }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
    </div>

    <div class="container mx-auto px-4 h-full flex items-center relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div 
          class="text-white"
          v-motion
          :initial="{ opacity: 0, x: -100 }"
          :visible="{ opacity: 1, x: 0, transition: { delay: 200, duration: 800 } }"
        >
          <h1 class="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Discover Unique <span class="text-primary">Artistic</span> Expressions
          </h1>
          <p class="text-lg md:text-xl mb-8 text-gray-300 max-w-lg">
            Explore the captivating world of Raymond Aworo's hyper-realistic artworks that blend emotion, faith, and extraordinary talent.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink 
              to="/shop" 
              class="px-8 py-3 bg-black text-white rounded-full hover:bg-black-dark transition-all duration-300 transform hover:scale-105"
            >
              Explore Collection
            </NuxtLink>
            <NuxtLink 
              to="/commission" 
              class="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Commission Art
            </NuxtLink>
          </div>
        </div>

        <div 
          class="relative hidden md:block"
          v-motion
          :initial="{ opacity: 0, scale: 0.8 }"
          :visible="{ opacity: 1, scale: 1, transition: { delay: 400, duration: 800 } }"
        >
          <!-- Floating artwork display -->
          <div class="relative w-full aspect-[3/4] perspective-1000">
            <div 
              class="absolute inset-0 bg-white p-3 shadow-2xl transform transition-all duration-700 ease-out"
              :style="{ transform: `rotateY(${mouseX * 5}deg) rotateX(${-mouseY * 5}deg)` }"
              @mousemove="handleMouseMove"
              @mouseleave="resetMousePosition"
            >
              <img 
                :src="currentArtwork.image" 
                :alt="currentArtwork.title" 
                class="w-full h-full object-cover"
              />
            </div>
          </div>

          <!-- Artwork info -->
          <div 
            class="absolute -bottom-10 -right-10 bg-white/90 backdrop-blur-sm p-6 shadow-xl max-w-xs"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible="{ opacity: 1, y: 0, transition: { delay: 800 } }"
          >
            <h3 class="text-xl font-bold text-gray-900">{{ currentArtwork.title }}</h3>
            <p class="text-gray-600 mb-2">{{ currentArtwork.medium }}</p>
            <div class="flex justify-between items-center">
              <span class="text-primary font-bold">${{ currentArtwork.price }}</span>
              <button 
                @click="viewArtwork(currentArtwork)" 
                class="text-sm text-primary hover:underline"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Artwork navigation dots -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <button 
        v-for="(artwork, index) in featuredArtworks" 
        :key="artwork.id"
        @click="currentIndex = index"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="currentIndex === index ? 'bg-black scale-125' : 'bg-white/50 hover:bg-white/80'"
      ></button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
// Import the motion plugin
import { directive as motion } from '@vueuse/motion'

// Import images
import image1 from '@/assets/img/no-love.jpg'
import image2 from '@/assets/img/commission-art1.jpg'
import image3 from '@/assets/img/artist.png'

interface Artwork {
  id: number
  title: string
  image: string
  medium: string
  price: number
  description: string
}

const featuredArtworks = ref<Artwork[]>([
  {
    id: 1,
    title: "No Greater Love",
    image: image1,
    medium: "Charcoal on Paper",
    price: 1200,
    description: "This Artwork depicts the suffering of Christ on His way to Calvary and then ponders how Christ exhibits each of the qualities of love in His Passion."
  },
  {
    id: 2,
    title: "Divine Light",
    image: image2,
    medium: "Acrylic on Canvas",
    price: 950,
    description: "An exploration of spirituality through light and shadow."
  },
  {
    id: 3,
    title: "Serenity Falls",
    image: image3,
    medium: "Mixed Media",
    price: 850,
    description: "A vibrant landscape capturing the tranquility of nature."
  }
])

const currentIndex = ref(0)
const currentArtwork = computed(() => featuredArtworks.value[currentIndex.value])
const mouseX = ref(0)
const mouseY = ref(0)
const scrollY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  const rect = (e.target as HTMLElement).getBoundingClientRect()
  mouseX.value = ((e.clientX - rect.left) / rect.width - 0.5) * 2
  mouseY.value = ((e.clientY - rect.top) / rect.height - 0.5) * 2
}

const resetMousePosition = () => {
  mouseX.value = 0
  mouseY.value = 0
}

const router = useRouter()

const viewArtwork = (artwork: Artwork) => {
  // Navigate to artwork detail page
  router.push(`/artworks/${artwork.id}`)
}

const handleScroll = () => {
  scrollY.value = window.scrollY
}

// Auto-rotate featured artworks
let autoRotateInterval: NodeJS.Timeout | null = null

const startAutoRotate = () => {
  // Clear any existing interval first
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval)
  }
  
  autoRotateInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % featuredArtworks.value.length
  }, 5000)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Start auto-rotate immediately after component is mounted
  startAutoRotate()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  // Clear interval when component is unmounted
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval)
  }
})
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}
</style>