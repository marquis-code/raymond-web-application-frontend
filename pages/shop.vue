<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Floating Elements -->
    <div class="fixed w-full h-full pointer-events-none">
      <div class="absolute top-20 left-10 w-32 h-32 bg-rose-500/20 rounded-full mix-blend-screen blur-xl animate-float-slow"></div>
      <div class="absolute bottom-40 right-20 w-40 h-40 bg-amber-500/20 rounded-full mix-blend-screen blur-xl animate-float-medium"></div>
      <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-emerald-500/20 rounded-full mix-blend-screen blur-xl animate-float-fast"></div>
    </div>
    
    <!-- Hero Banner - Flash Sale -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-black"></div>
      <div class="absolute inset-0 opacity-40">
        <img 
          src="@/assets/img/no-love.jpg" 
          alt="Hero Background" 
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
      </div>
      
      <div class="relative max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="animate-pulse-slow mb-4">
              <span class="inline-block px-4 py-1 bg-rose-600 text-white text-sm font-bold rounded-full">
                NEW PRINTS EDITION!!!
              </span>
            </div>
            
            <h1 class="text-5xl md:text-7xl font-bold mb-6 text-white">
              NO GREATER LOVE
            </h1>
            
            <div class="flex items-center mb-8">
              <div class="text-3xl font-bold text-rose-500 mr-4">GET 50% OFF!!!!!</div>
              <div class="text-xl line-through text-gray-400">$200</div>
              <div class="text-2xl font-bold text-white ml-2">$100</div>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-4">
              <button 
                @click="addToCart(featuredProduct)"
                class="inline-flex items-center justify-center px-8 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add to Cart
              </button>
              
              <a 
                href="#shop-now" 
                class="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                Shop Now
              </a>
            </div>
            
            <!-- Countdown Timer -->
            <div class="mt-8">
              <p class="text-gray-300 mb-2">Flash Sale Ends In:</p>
              <div class="flex space-x-4">
                <div class="bg-gray-800 px-4 py-2 rounded-lg text-center min-w-[70px]">
                  <div class="text-2xl font-bold">{{ countdown.days }}</div>
                  <div class="text-xs text-gray-400">Days</div>
                </div>
                <div class="bg-gray-800 px-4 py-2 rounded-lg text-center min-w-[70px]">
                  <div class="text-2xl font-bold">{{ countdown.hours }}</div>
                  <div class="text-xs text-gray-400">Hours</div>
                </div>
                <div class="bg-gray-800 px-4 py-2 rounded-lg text-center min-w-[70px]">
                  <div class="text-2xl font-bold">{{ countdown.minutes }}</div>
                  <div class="text-xs text-gray-400">Minutes</div>
                </div>
                <div class="bg-gray-800 px-4 py-2 rounded-lg text-center min-w-[70px]">
                  <div class="text-2xl font-bold">{{ countdown.seconds }}</div>
                  <div class="text-xs text-gray-400">Seconds</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="relative">
            <div class="absolute -inset-4 bg-rose-500/20 rounded-full blur-md animate-pulse-slow"></div>
            <div class="relative bg-gray-900 p-2 rounded-lg transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src="@/assets/img/no-love.jpg" 
                alt="Featured Artwork" 
                class="w-full h-auto rounded"
                @error="handleImageError"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Category Navigation -->
    <section id="shop-now" class="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 sticky top-0 z-30">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-2xl font-bold text-white">Shop Artwork</h2>
          
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="setActiveCategory(category.id)"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              :class="activeCategory === category.id ? 'bg-rose-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'"
            >
              {{ category.name }}
            </button>
          </div>
          
          <div class="relative">
            <button 
              @click="isCartOpen = !isCartOpen"
              class="relative p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span v-if="cart.length > 0" class="absolute -top-1 -right-1 bg-rose-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {{ cart.length }}
              </span>
            </button>
            
            <!-- Mini Cart Dropdown -->
            <transition 
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div v-if="isCartOpen" class="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl z-50">
                <div class="p-4">
                  <h3 class="text-lg font-bold text-white mb-4">Your Cart ({{ cart.length }})</h3>
                  
                  <div v-if="cart.length === 0" class="text-gray-400 text-center py-4">
                    Your cart is empty
                  </div>
                  
                  <div v-else class="space-y-4 max-h-60 overflow-y-auto">
                    <div v-for="(item, index) in cart" :key="index" class="flex items-center gap-3">
                      <div class="w-16 h-16 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                        <img 
                          :src="item.imageUrl" 
                          :alt="item.title" 
                          class="w-full h-full object-cover"
                          @error="handleImageError"
                        />
                      </div>
                      <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-medium text-white truncate">{{ item.title }}</h4>
                        <p class="text-sm text-gray-400">${{ item.price.toFixed(2) }}</p>
                      </div>
                      <button 
                        @click="removeFromCart(index)"
                        class="text-gray-400 hover:text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div v-if="cart.length > 0" class="mt-4 pt-4 border-t border-gray-700">
                    <div class="flex justify-between text-white mb-4">
                      <span>Total:</span>
                      <span class="font-bold">${{ cartTotal.toFixed(2) }}</span>
                    </div>
                    
                    <button 
                      class="w-full py-2 bg-rose-600 text-white font-medium rounded hover:bg-rose-700 transition-colors"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Product Grid -->
    <section class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div v-if="filteredProducts.length === 0" class="text-center py-20">
          <p class="text-xl text-gray-400">No products found in this category.</p>
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div 
            v-for="product in filteredProducts" 
            :key="product.id"
            class="group"
          >
            <div class="relative overflow-hidden bg-gray-900 rounded-lg transform transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/10">
              <!-- Product Badge -->
              <div v-if="product.badge" class="absolute top-4 left-4 z-10">
                <span 
                  class="inline-block px-3 py-1 text-xs font-bold rounded-full"
                  :class="{
                    'bg-rose-600 text-white': product.badge === 'sale',
                    'bg-amber-500 text-black': product.badge === 'new',
                    'bg-emerald-500 text-white': product.badge === 'limited'
                  }"
                >
                  {{ getBadgeText(product.badge) }}
                </span>
              </div>
              
              <!-- Quick Actions -->
              <div class="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  @click="toggleFavorite(product)"
                  class="p-2 bg-black/50 rounded-full text-white hover:bg-black/80 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{ 'text-rose-500 fill-rose-500': product.isFavorite }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              <!-- Product Image -->
              <div class="aspect-[4/5] overflow-hidden">
                <img 
                  :src="product.imageUrl" 
                  :alt="product.title" 
                  class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  @error="handleImageError"
                />
              </div>
              
              <!-- Product Info -->
              <div class="p-4">
                <h3 class="text-lg font-bold text-white mb-1 truncate">{{ product.title }}</h3>
                <p class="text-sm text-gray-400 mb-3 line-clamp-2">{{ product.description }}</p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span v-if="product.salePrice" class="text-lg font-bold text-white mr-2">${{ product.salePrice.toFixed(2) }}</span>
                    <span 
                      class="text-base" 
                      :class="product.salePrice ? 'line-through text-gray-500' : 'font-bold text-white'"
                    >
                      ${{ product.price.toFixed(2) }}
                    </span>
                  </div>
                  
                  <button 
                    @click="addToCart(product)"
                    class="p-2 bg-rose-600 rounded-full text-white hover:bg-rose-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- View Details Button (Overlay) -->
              <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  @click="openProductModal(product)"
                  class="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors transform transition-transform duration-300 hover:scale-105"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Product Modal -->
    <Teleport to="body">
      <transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="selectedProduct" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-20" @click="closeProductModal">
          <div class="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true"></div>
          
          <div 
            class="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            @click.stop
          >
            <div class="absolute top-4 right-4 z-10">
              <button 
                @click="closeProductModal" 
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
                  :src="selectedProduct.imageUrl" 
                  :alt="selectedProduct.title" 
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
                <div v-if="selectedProduct.badge" class="absolute top-4 left-4">
                  <span 
                    class="inline-block px-3 py-1 text-xs font-bold rounded-full"
                    :class="{
                      'bg-rose-600 text-white': selectedProduct.badge === 'sale',
                      'bg-amber-500 text-black': selectedProduct.badge === 'new',
                      'bg-emerald-500 text-white': selectedProduct.badge === 'limited'
                    }"
                  >
                    {{ getBadgeText(selectedProduct.badge) }}
                  </span>
                </div>
              </div>
              
              <div class="p-6 md:p-8 flex flex-col h-full">
                <div class="flex-1">
                  <h2 class="text-2xl md:text-3xl font-bold mb-2 text-white">{{ selectedProduct.title }}</h2>
                  
                  <div class="flex items-center mb-4">
                    <span v-if="selectedProduct.salePrice" class="text-2xl font-bold text-white mr-3">${{ selectedProduct.salePrice.toFixed(2) }}</span>
                    <span 
                      class="text-xl" 
                      :class="selectedProduct.salePrice ? 'line-through text-gray-500' : 'font-bold text-white'"
                    >
                      ${{ selectedProduct.price.toFixed(2) }}
                    </span>
                    
                    <span v-if="selectedProduct.salePrice" class="ml-3 px-2 py-1 bg-rose-600 text-white text-xs font-bold rounded">
                      {{ Math.round((1 - selectedProduct.salePrice / selectedProduct.price) * 100) }}% OFF
                    </span>
                  </div>
                  
                  <p class="text-gray-300 mb-6">{{ selectedProduct.description }}</p>
                  
                  <div class="space-y-6">
                    <div>
                      <h3 class="text-lg font-semibold mb-2 text-white">Details</h3>
                      <ul class="space-y-2 text-gray-300">
                        <li class="flex items-start">
                          <span class="font-medium mr-2">Medium:</span>
                          <span>{{ selectedProduct.medium }}</span>
                        </li>
                        <li class="flex items-start">
                          <span class="font-medium mr-2">Dimensions:</span>
                          <span>{{ selectedProduct.dimensions }}</span>
                        </li>
                        <li class="flex items-start">
                          <span class="font-medium mr-2">Edition:</span>
                          <span>{{ selectedProduct.edition }}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 class="text-lg font-semibold mb-2 text-white">Size Options</h3>
                      <div class="flex flex-wrap gap-2">
                        <button 
                          v-for="size in selectedProduct.sizes" 
                          :key="size.id"
                          @click="selectSize(size.id)"
                          class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                          :class="selectedSize === size.id ? 'bg-rose-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'"
                        >
                          {{ size.name }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="mt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    @click="addToCart(selectedProduct)"
                    class="flex-1 inline-flex items-center justify-center px-6 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </button>
                  
                  <button 
                    @click="toggleFavorite(selectedProduct)"
                    class="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-gray-600 text-white font-medium rounded-md hover:bg-white/10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" :class="{ 'text-rose-500 fill-rose-500': selectedProduct.isFavorite }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {{ selectedProduct.isFavorite ? 'Saved' : 'Save' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
    
    <!-- Call to Action -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">
          Interested in Collecting an Original Piece?
        </h2>
        
        <p class="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Own a one-of-a-kind masterpiece that captures the depth of emotion and technical excellence that defines my work.
        </p>
        
        <a 
          href="/commission" 
          class="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
        >
          PURCHASE
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import artwork1 from '@/assets/img/artist.avif'
import artwork2 from '@/assets/img/commission-art1.jpg'
import artwork3 from '@/assets/img/commission-art.png'

interface Size {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  medium: string;
  dimensions: string;
  edition: string;
  imageUrl: string;
  categoryId: number;
  badge?: 'sale' | 'new' | 'limited';
  isFavorite: boolean;
  sizes: Size[];
}

interface Category {
  id: number;
  name: string;
}

interface CountdownTime {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

// Sample categories
const categories = ref<Category[]>([
  { id: 0, name: 'All' },
  { id: 1, name: 'Prints' },
  { id: 2, name: 'Originals' },
  { id: 3, name: 'Limited Editions' },
  { id: 4, name: 'New Arrivals' }
])

// Sample products
const products = ref<Product[]>([
  {
    id: 1,
    title: "No Greater Love",
    description: "A powerful portrayal of sacrifice and redemption, inspired by themes of faith and humanity's capacity for love.",
    price: 200,
    salePrice: 100,
    medium: "Fine Art Print",
    dimensions: "24 x 36 inches",
    edition: "Limited Edition of 20",
    imageUrl: artwork1,
    categoryId: 1,
    badge: 'sale',
    isFavorite: false,
    sizes: [
      { id: 1, name: 'Medium (18" x 24")' },
      { id: 2, name: 'Large (24" x 36")' }
    ]
  },
  {
    id: 2,
    title: "Heart of Hope",
    description: "A delicate study of hands cradling a heart, symbolizing the fragility and strength of hope in difficult times.",
    price: 150,
    medium: "Fine Art Print",
    dimensions: "18 x 24 inches",
    edition: "Limited Edition of 20",
    imageUrl: artwork2,
    categoryId: 1,
    isFavorite: false,
    sizes: [
      { id: 1, name: 'Medium (18" x 24")' },
      { id: 2, name: 'Large (24" x 36")' }
    ]
  },
  {
    id: 3,
    title: "Signs & Symbols of Hope I",
    description: "Part of a series exploring religious iconography and its role in providing comfort and guidance through life's challenges.",
    price: 180,
    medium: "Fine Art Print",
    dimensions: "24 x 30 inches",
    edition: "Limited Edition of 20",
    imageUrl: artwork3,
    categoryId: 1,
    isFavorite: false,
    sizes: [
      { id: 1, name: 'Medium (18" x 24")' },
      { id: 2, name: 'Large (24" x 36")' }
    ]
  },
  {
    id: 4,
    title: "Bound Together",
    description: "An intimate portrayal of human connection, showing hands intertwined in a gesture of solidarity and support.",
    price: 150,
    medium: "Fine Art Print",
    dimensions: "20 x 24 inches",
    edition: "Limited Edition of 20",
    imageUrl: artwork1,
    categoryId: 1,
    isFavorite: false,
    sizes: [
      { id: 1, name: 'Medium (18" x 24")' },
      { id: 2, name: 'Large (24" x 36")' }
    ]
  },
  {
    id: 5,
    title: "Rebirth",
    description: "A vibrant depiction of renewal and transformation, using warm colors to evoke the energy of a new beginning.",
    price: 800,
    medium: "Original Acrylic on Canvas",
    dimensions: "30 x 40 inches",
    edition: "Original",
    imageUrl: artwork2,
    categoryId: 2,
    badge: 'new',
    isFavorite: false,
    sizes: [
      { id: 3, name: 'Original Size (30" x 40")' }
    ]
  },
  {
    id: 6,
    title: "Coastal Serenity",
    description: "A peaceful landscape capturing the tranquility of a coastal scene at dawn, with subtle color transitions.",
    price: 700,
    medium: "Original Acrylic on Canvas",
    dimensions: "24 x 36 inches",
    edition: "Original",
    imageUrl: artwork3,
    categoryId: 2,
    isFavorite: false,
    sizes: [
      { id: 3, name: 'Original Size (24" x 36")' }
    ]
  },
  {
    id: 7,
    title: "Divine Protection",
    description: "A powerful image of an angel protecting a vulnerable figure, symbolizing divine intervention in times of need.",
    price: 250,
    medium: "Fine Art Print",
    dimensions: "36 x 48 inches",
    edition: "Limited Edition of 10",
    imageUrl: artwork1,
    categoryId: 3,
    badge: 'limited',
    isFavorite: false,
    sizes: [
      { id: 2, name: 'Large (24" x 36")' },
      { id: 4, name: 'Extra Large (36" x 48")' }
    ]
  },
  {
    id: 8,
    title: "Radiant Heart",
    description: "A striking anatomical heart surrounded by radiating lines, representing the power of love to illuminate darkness.",
    price: 200,
    medium: "Fine Art Print",
    dimensions: "24 x 24 inches",
    edition: "Limited Edition of 10",
    imageUrl: artwork2,
    categoryId: 3,
    badge: 'limited',
    isFavorite: false,
    sizes: [
      { id: 1, name: 'Medium (18" x 18")' },
      { id: 2, name: 'Large (24" x 24")' }
    ]
  },
])

// Featured product
const featuredProduct = computed(() => products.value.find(p => p.id === 1) || products.value[0])

// State management
const activeCategory = ref(0)
const selectedProduct = ref<Product | null>(null)
const selectedSize = ref(1)
const isCartOpen = ref(false)
const cart = ref<Product[]>([])

// Countdown timer
const countdown = ref<CountdownTime>({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
})

let countdownInterval: number | null = null

// Filter products by category
const filteredProducts = computed(() => {
  if (activeCategory.value === 0) {
    return products.value
  }
  return products.value.filter(product => product.categoryId === activeCategory.value)
})

// Calculate cart total
const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => {
    return total + (item.salePrice || item.price)
  }, 0)
})

// Set active category
const setActiveCategory = (categoryId: number) => {
  activeCategory.value = categoryId
}

// Open product modal
const openProductModal = (product: Product) => {
  selectedProduct.value = product
  selectedSize.value = product.sizes[0].id
  document.body.classList.add('overflow-hidden')
}

// Close product modal
const closeProductModal = () => {
  selectedProduct.value = null
  document.body.classList.remove('overflow-hidden')
}

// Select size
const selectSize = (sizeId: number) => {
  selectedSize.value = sizeId
}

// Add to cart
const addToCart = (product: Product) => {
  cart.value.push({...product})
  isCartOpen.value = true
  
  // Auto close cart after 3 seconds
  setTimeout(() => {
    isCartOpen.value = false
  }, 3000)
}

// Remove from cart
const removeFromCart = (index: number) => {
  cart.value.splice(index, 1)
}

// Toggle favorite
const toggleFavorite = (product: Product) => {
  product.isFavorite = !product.isFavorite
}

// Get badge text
const getBadgeText = (badge: string) => {
  switch (badge) {
    case 'sale': return 'SALE'
    case 'new': return 'NEW'
    case 'limited': return 'LIMITED'
    default: return ''
  }
}

// Image error handling
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder.svg?height=400&width=300'
}

// Update countdown timer
const updateCountdown = () => {
  const now = new Date().getTime()
  // Set end date to 7 days from now
  const endDate = now + (7 * 24 * 60 * 60 * 1000)
  const distance = endDate - now
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)
  
  countdown.value = {
    days: days.toString().padStart(2, '0'),
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  }
}

// Lifecycle hooks
onMounted(() => {
  updateCountdown()
  countdownInterval = window.setInterval(updateCountdown, 1000)
})

onBeforeUnmount(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
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

@keyframes pulse-slow {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
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

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

/* Line clamp for product descriptions */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>