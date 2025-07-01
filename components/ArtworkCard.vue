<template>
    <div 
      class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Artwork Image with Hover Effect -->
      <div class="relative overflow-hidden aspect-[3/4]">
        <img 
          :src="artwork.image" 
          :alt="artwork.title"
          class="w-full h-full object-cover transition-transform duration-700"
          :class="{ 'scale-110': isHovered }"
        />
        
        <!-- Overlay with Quick Actions -->
        <div 
          class="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300"
          :class="{ 'opacity-100': isHovered }"
        >
          <div class="space-y-3">
            <button 
              @click.stop="$emit('view', artwork)"
              class="px-6 py-2 bg-white text-gray-900 rounded-full hover:bg-black hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              <!-- <Icon name="lucide:eye" size="16" /> -->
              Quick View
            </button>
            <button 
              @click.stop="$emit('add-to-cart', artwork)"
              class="px-6 py-2 bg-black text-white rounded-full hover:bg-black-dark transition-colors duration-300 flex items-center gap-2"
            >
              <!-- <Icon name="lucide:shopping-bag" size="16" /> -->
              Add to Cart
            </button>
          </div>
        </div>
        
        <!-- Tags (New Arrival, Best Seller, Sale) -->
        <div class="absolute top-3 left-3 flex flex-col gap-2">
          <span 
            v-if="artwork.isNewArrival" 
            class="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full"
          >
            New Arrival
          </span>
          <span 
            v-if="artwork.isBestSeller" 
            class="bg-amber-500 text-white text-xs px-3 py-1 rounded-full"
          >
            Best Seller
          </span>
          <span 
            v-if="artwork.isOnSale" 
            class="bg-rose-500 text-white text-xs px-3 py-1 rounded-full"
          >
            Sale
          </span>
        </div>
      </div>
      
      <!-- Artwork Info -->
      <div class="p-4 flex flex-col flex-grow">
        <h3 class="text-lg font-semibold mb-1 text-gray-900">{{ artwork.title }}</h3>
        <p class="text-sm text-gray-600 mb-2">{{ artwork.medium }}</p>
        <div class="mt-auto flex justify-between items-center">
          <span class="text-primary font-bold">${{ formatPrice(artwork.price) }}</span>
          <div class="flex gap-2">
            <button 
              @click.stop="toggleFavorite"
              class="text-gray-400 hover:text-rose-500 transition-colors duration-300"
              :class="{ 'text-rose-500': isFavorite }"
            >
              <!-- <Icon :name="isFavorite ? 'lucide:heart' : 'lucide:heart'" size="18" /> -->
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, PropType } from 'vue'
  
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
    artwork: {
      type: Object as PropType<Artwork>,
      required: true
    }
  })
  
  defineEmits(['view', 'add-to-cart'])
  
  const isHovered = ref(false)
  const isFavorite = ref(false)
  
  const toggleFavorite = () => {
    isFavorite.value = !isFavorite.value
  }
  
  const formatPrice = (price: number) => {
    return price?.toLocaleString('en-US')
  }
  </script>