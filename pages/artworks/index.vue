<template>
  <div class="min-h-screen bg-black text-white overflow-hidden">
    <!-- Floating Elements -->
    <div class="fixed w-full h-full pointer-events-none">
      <div class="absolute top-20 left-10 w-32 h-32 bg-rose-500/20 rounded-full mix-blend-screen blur-xl animate-float-slow"></div>
      <div class="absolute bottom-40 right-20 w-40 h-40 bg-amber-500/20 rounded-full mix-blend-screen blur-xl animate-float-medium"></div>
      <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-emerald-500/20 rounded-full mix-blend-screen blur-xl animate-float-fast"></div>
    </div>
    
    <!-- Hero Section -->
    <section class="relative py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-5xl md:text-7xl font-bold mb-4 relative inline-block">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-300 to-rose-400 animate-gradient">
              ARTWORKS
            </span>
          </h1>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the soul-stirring creations that blend faith, emotion, and technical mastery.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Unique Artwork Layout -->
    <section class="relative px-4 sm:px-6 lg:px-8 pb-24">
      <div class="max-w-7xl mx-auto">
        <!-- Honeycomb Layout for Desktop -->
        <div class="hidden lg:block">
          <div class="honeycomb">
            <div 
              v-for="(artwork, index) in artworks" 
              :key="artwork.id"
              class="honeycomb-cell"
              :class="{ 'honeycomb-cell-featured': index % 7 === 0 }"
              @click="openArtworkModal(artwork)"
            >
              <div class="honeycomb-cell-inner">
                <img 
                  :src="artwork.imageUrl" 
                  :alt="artwork.title" 
                  class="honeycomb-cell-image"
                  @error="handleImageError"
                />
                <div class="honeycomb-cell-overlay">
                  <h3 class="text-lg font-bold">{{ artwork.title }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Staggered Grid for Mobile/Tablet -->
        <div class="lg:hidden">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-6">
              <div 
                v-for="artwork in artworksLeft" 
                :key="artwork.id"
                class="artwork-card"
                @click="openArtworkModal(artwork)"
              >
                <div class="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                  <img 
                    :src="artwork.imageUrl" 
                    :alt="artwork.title" 
                    class="w-full h-auto object-cover"
                    @error="handleImageError"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div class="p-4">
                      <h3 class="text-lg font-bold text-white">{{ artwork.title }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="space-y-6 mt-12 sm:mt-24">
              <div 
                v-for="artwork in artworksRight" 
                :key="artwork.id"
                class="artwork-card"
                @click="openArtworkModal(artwork)"
              >
                <div class="relative overflow-hidden rounded-lg transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                  <img 
                    :src="artwork.imageUrl" 
                    :alt="artwork.title" 
                    class="w-full h-auto object-cover"
                    @error="handleImageError"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div class="p-4">
                      <h3 class="text-lg font-bold text-white">{{ artwork.title }}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Artwork Modal -->
    <Teleport to="body">
      <transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="selectedArtwork" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-20" @click="closeArtworkModal">
          <div class="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true"></div>
          
          <div 
            class="relative bg-black border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            @click.stop
          >
            <div class="absolute top-4 right-4 z-10">
              <button 
                @click="closeArtworkModal" 
                class="rounded-full p-2 bg-black/50 text-white hover:bg-black/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2">
              <div class="relative h-[50vh] md:h-[80vh] overflow-hidden">
                <img 
                  :src="selectedArtwork.imageUrl" 
                  :alt="selectedArtwork.title" 
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
              </div>
              
              <div class="p-6 md:p-8 flex flex-col h-full justify-between">
                <div>
                  <h2 class="text-2xl md:text-3xl font-bold mb-4 text-white">{{ selectedArtwork.title }}</h2>
                  
                  <div class="space-y-4">
                    <p class="text-gray-300">{{ selectedArtwork.description }}</p>
                    
                    <div class="border-t border-gray-800 pt-4">
                      <h3 class="text-lg font-semibold mb-2 text-white">Details</h3>
                      <ul class="space-y-2 text-gray-300">
                        <li class="flex items-start">
                          <span class="font-medium mr-2">Medium:</span>
                          <span>{{ selectedArtwork.medium }}</span>
                        </li>
                        <li class="flex items-start">
                          <span class="font-medium mr-2">Dimensions:</span>
                          <span>{{ selectedArtwork.dimensions }}</span>
                        </li>
                        <li class="flex items-start">
                          <span class="font-medium mr-2">Year:</span>
                          <span>{{ selectedArtwork.year }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div class="mt-8 flex flex-col sm:flex-row gap-4">
                  <a 
                    :href="`/shop/${selectedArtwork.id}`" 
                    class="inline-flex items-center justify-center px-6 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors"
                  >
                    Purchase Print
                  </a>
                  
                  <button 
                    @click="addToFavorites(selectedArtwork)" 
                    class="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-gray-600 text-white font-medium rounded-md hover:bg-white/10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                    </svg>
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
    
    <!-- Prints Information Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6 text-white">PRINTS</h2>
            <div class="space-y-4 text-gray-300">
              <p>
                Limited edition of 10 and 20 prints printed on Hahnemühle german etching 310 gsm. Prints are available in 2 sizes which are medium and large.
              </p>
              <p>
                All prints arrive with Certificate of Authenticity.
              </p>
              <p>
                All prints are shipped rolled in a protective tube only.
              </p>
            </div>
            
            <div class="mt-8">
              <a 
                href="/shop" 
                class="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
              >
                Shop Prints
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src="@/assets/img/commission-art.png" 
                alt="Print Sample 1" 
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>
            <div class="aspect-[3/4] bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src="@/assets/img/artist.avif" 
                alt="Print Sample 2" 
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import artwork1 from '@/assets/img/artist.avif'
import artwork2 from '@/assets/img/commission-art1.jpg'
import artwork3 from '@/assets/img/commission-art.png'

interface Artwork {
  id: number;
  title: string;
  description: string;
  medium: string;
  dimensions: string;
  year: number;
  imageUrl: string;
}

// Sample artwork data
const artworks = ref<Artwork[]>([
  {
    id: 1,
    title: "No Greater Love",
    description: "A powerful portrayal of sacrifice and redemption, inspired by themes of faith and humanity's capacity for love.",
    medium: "Charcoal on paper",
    dimensions: "24 x 36 inches",
    year: 2023,
    imageUrl: artwork1
  },
  {
    id: 2,
    title: "Heart of Hope",
    description: "A delicate study of hands cradling a heart, symbolizing the fragility and strength of hope in difficult times.",
    medium: "Charcoal on paper",
    dimensions: "18 x 24 inches",
    year: 2022,
    imageUrl: artwork2
  },
  {
    id: 3,
    title: "Signs & Symbols of Hope I",
    description: "Part of a series exploring religious iconography and its role in providing comfort and guidance through life's challenges.",
    medium: "Charcoal on paper",
    dimensions: "24 x 30 inches",
    year: 2023,
    imageUrl: artwork3
  },
  {
    id: 4,
    title: "Bound Together",
    description: "An intimate portrayal of human connection, showing hands intertwined in a gesture of solidarity and support.",
    medium: "Charcoal on paper",
    dimensions: "20 x 24 inches",
    year: 2022,
    imageUrl: artwork1
  },
  {
    id: 5,
    title: "Rebirth",
    description: "A vibrant depiction of renewal and transformation, using warm colors to evoke the energy of a new beginning.",
    medium: "Acrylic on canvas",
    dimensions: "30 x 40 inches",
    year: 2023,
    imageUrl: artwork2
  },
  {
    id: 6,
    title: "Coastal Serenity",
    description: "A peaceful landscape capturing the tranquility of a coastal scene at dawn, with subtle color transitions.",
    medium: "Acrylic on canvas",
    dimensions: "24 x 36 inches",
    year: 2021,
    imageUrl: artwork3
  },
  {
    id: 7,
    title: "Divine Protection",
    description: "A powerful image of an angel protecting a vulnerable figure, symbolizing divine intervention in times of need.",
    medium: "Charcoal and pastel on paper",
    dimensions: "36 x 48 inches",
    year: 2023,
    imageUrl: artwork1
  },
  {
    id: 8,
    title: "Radiant Heart",
    description: "A striking anatomical heart surrounded by radiating lines, representing the power of love to illuminate darkness.",
    medium: "Mixed media on canvas",
    dimensions: "24 x 24 inches",
    year: 2022,
    imageUrl: artwork2
  },
  {
    id: 9,
    title: "Ascension",
    description: "A dramatic portrayal of spiritual elevation, featuring a figure rising above earthly constraints.",
    medium: "Charcoal and white chalk on toned paper",
    dimensions: "30 x 40 inches",
    year: 2023,
    imageUrl: artwork3
  },
])

// Split artworks for staggered mobile layout
const artworksLeft = computed(() => {
  return artworks.value.filter((_, index) => index % 2 === 0)
})

const artworksRight = computed(() => {
  return artworks.value.filter((_, index) => index % 2 === 1)
})

// Modal functionality
const selectedArtwork = ref<Artwork | null>(null)

const openArtworkModal = (artwork: Artwork) => {
  selectedArtwork.value = artwork
  document.body.classList.add('overflow-hidden')
}

const closeArtworkModal = () => {
  selectedArtwork.value = null
  document.body.classList.remove('overflow-hidden')
}

// Favorites functionality
const addToFavorites = (artwork: Artwork) => {
  // Here you would implement the logic to add to favorites
  alert(`Added "${artwork.title}" to favorites!`)
}

// Image error handling
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder.svg?height=400&width=300'
}
</script>

<style scoped>
/* Animations */
@keyframes float-slow {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes float-medium {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-15px) rotate(-5deg); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-10px) rotate(3deg); }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float-medium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float-fast 4s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

/* Honeycomb Layout */
.honeycomb {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  transform: translateY(25px);
  max-width: 1200px;
}

.honeycomb-cell {
  flex: 0 1 250px;
  max-width: 250px;
  height: 280px;
  margin: 25px 12px 0;
  position: relative;
  padding: 0.5em;
  text-align: center;
  z-index: 1;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.4s ease;
}

.honeycomb-cell:hover {
  transform: scale(1.05);
  z-index: 2;
}

.honeycomb-cell-featured {
  flex: 0 1 300px;
  max-width: 300px;
  height: 330px;
}

.honeycomb-cell-inner {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #1a1a1a;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.honeycomb-cell-image {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.honeycomb-cell:hover .honeycomb-cell-image {
  transform: scale(1.1);
}

.honeycomb-cell-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 1rem 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.honeycomb-cell:hover .honeycomb-cell-overlay {
  opacity: 1;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .honeycomb {
    display: none;
  }
}

/* Artwork cards for mobile */
.artwork-card {
  transform: translateY(0);
  transition: transform 0.5s ease;
}

.artwork-card:hover {
  transform: translateY(-10px);
}
</style>