<template>
    <div class="container mx-auto px-4 py-16">
      <!-- Section Title -->
      <div class="text-center mb-12">
        <h2 
          class="text-3xl md:text-4xl font-bold mb-4"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          {{ title }}
        </h2>
        <p 
          v-if="description" 
          class="text-gray-600 max-w-2xl mx-auto"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 200 } }"
        >
          {{ description }}
        </p>
      </div>
  
      <!-- Category Filter -->
      <div 
        v-if="showFilters" 
        class="flex flex-wrap justify-center gap-4 mb-10"
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
      >
        <button 
          v-for="category in categories" 
          :key="category"
          @click="activeCategory = category"
          class="px-6 py-2 rounded-full text-sm transition-all duration-300"
          :class="activeCategory === category 
            ? 'bg-black text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
        >
          {{ category }}
        </button>
      </div>
  
      <!-- Artwork Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        <div 
          v-for="(artwork, index) in filteredArtworks" 
          :key="artwork.id"
          class="group"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 100 * (index % 8) } }"
        >
          <ArtworkCard 
            :artwork="artwork" 
            @view="$emit('view-artwork', artwork)"
            @add-to-cart="$emit('add-to-cart', artwork)"
          />
        </div>
      </div>
  
      <!-- Load More Button -->
      <div 
        v-if="showLoadMore" 
        class="mt-12 text-center"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 500 } }"
      >
        <button 
          @click="$emit('load-more')"
          class="px-8 py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
        >
          Load More Artworks
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, PropType } from 'vue'
  
  interface Artwork {
    id: number
    title: string
    image: string
    category: string
    price: number
    medium: string
    isNewArrival?: boolean
    isBestSeller?: boolean
    isOnSale?: boolean
  }
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    artworks: {
      type: Array as PropType<Artwork[]>,
      required: true
    },
    categories: {
      type: Array as PropType<string[]>,
      default: () => ['All', 'Portraits', 'Landscapes', 'Abstract', 'Religious']
    },
    showFilters: {
      type: Boolean,
      default: true
    },
    showLoadMore: {
      type: Boolean,
      default: false
    }
  })
  
  defineEmits(['view-artwork', 'add-to-cart', 'load-more'])
  
  const activeCategory = ref('All')
  
  const filteredArtworks = computed(() => {
    if (activeCategory.value === 'All') {
      return props.artworks
    }
    return props.artworks.filter(artwork => artwork.category === activeCategory.value)
  })
  </script>