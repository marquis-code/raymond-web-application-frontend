<template>
  <div>
    <!-- Mobile menu backdrop -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
      @click="isMobileMenuOpen = false"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
    ></div>

    <!-- Main navigation -->
    <header 
      class="fixed top-0  left-0 right-0 z-50 transition-all duration-500"
      :class="[scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4']"
    >
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <NuxtLink to="/" class="text-2xl font-bold relative overflow-hidden group">
            <img src="@/assets/img/raymond-logo.png" class="h-10" />
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <NuxtLink 
              v-for="(item, index) in navItems" 
              :key="item.name"
              :to="item.path"
              class="relative text-gray-800 hover:text-primary transition-colors duration-300 py-2"
              v-motion
              :initial="{ y: -20, opacity: 0 }"
              :enter="{ y: 0, opacity: 1, transition: { delay: index * 100 } }"
            >
              <span>{{ item.name }}</span>
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </NuxtLink>
          </nav>

          <!-- Cart and User Actions -->
          <div class="flex items-center space-x-4">
            <button 
              @click="toggleCart"
              class="relative p-2 text-gray-800 hover:text-primary transition-colors duration-300"
              v-motion
              :initial="{ scale: 0.8, opacity: 0 }"
              :enter="{ scale: 1, opacity: 1, transition: { delay: 600 } }"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z"></path></svg>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z"></path></svg> -->
              <span v-if="localStorageCartCount > 0" class="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {{ localStorageCartCount }}
              </span>
            </button>
            
            <button 
              @click="toggleChat"
              class="p-2 text-gray-800 hover:text-primary transition-colors duration-300"
              v-motion
              :initial="{ scale: 0.8, opacity: 0 }"
              :enter="{ scale: 1, opacity: 1, transition: { delay: 700 } }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M168,112a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,112Zm-8,24H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm72-8A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path></svg>
            </button>

            <!-- Mobile menu button -->
            <button 
              @click="isMobileMenuOpen = !isMobileMenuOpen" 
              class="p-2 text-gray-800 md:hidden"
              v-motion
              :initial="{ scale: 0.8, opacity: 0 }"
              :enter="{ scale: 1, opacity: 1, transition: { delay: 800 } }"
            >
              <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Menu -->
    <div 
      class="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out"
      :class="isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="p-6 h-full flex flex-col">
        <div class="flex justify-between items-center mb-8">
          <!-- <h2 class="text-xl font-bold">Menu</h2> -->
           <img src="@/assets/img/raymond-logo.png" class="h-10 w-10" />
          <button @click="isMobileMenuOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
          </button>
        </div>
        
        <nav class="flex flex-col space-y-4">
          <NuxtLink 
            v-for="item in navItems" 
            :key="item.name"
            :to="item.path"
            class="text-base py-2 border-b border-gray-100 hover:text-primary transition-colors duration-300"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
        
        <div class="mt-auto">
          <div class="flex items-center justify-center space-x-4 py-4">
            <a
              href="https://web.facebook.com/people/raymondaworo/100067199633701/?mibextid=LQQJ4d"
              class="bg-white rounded-full p-2"
            >
              <span class="sr-only">Facebook</span>
              <img class="h-4 w-4" src="@/assets/icons/facebook.svg" />
            </a>
            <a
              href="https://www.instagram.com/raymondaworo/?igshid=OGQ5ZDc2ODk2ZA%3D%3D"
              class="bg-white rounded-full p-2"
            >
              <span class="sr-only">Instagram</span>
              <img class="h-4 w-4" src="@/assets/icons/instagram.svg" />
            </a>
            <a
              href="https://x.com/raymondaworo/status/1546911697776115714?s=46&t=wja9T8NIysGx2Vtni1WECQ"
              class="bg-white rounded-full p-2"
            >
              <span class="sr-only">X</span>
              <img class="h-4 w-4" src="@/assets/icons/logo-black.png" />
            </a>
            <a
              href="https://www.tiktok.com/@raymondaworo?_t=8fvTbrYZSA1&_r=1"
              class="bg-white rounded-full p-2"
            >
              <span class="sr-only">Tiktok</span>
              <img class="h-4 w-4" src="@/assets/icons/tiktok.svg" />
            </a>
            <a
              href="https://www.youtube.com/@raymondaworo"
              class="bg-white rounded-full p-2"
            >
              <span class="sr-only">YouTube</span>
              <img class="h-4 w-4" src="@/assets/icons/youtube.svg" />
            </a>
            <!-- <a href="#" class="text-gray-600 hover:text-primary transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path></svg>
            </a>
            <a href="#" class="text-gray-600 hover:text-primary transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M240,149.31c0,16.11-3.17,29.89-9.17,39.84-7.43,12.33-19,18.85-33.39,18.85-27.94,0-47.78-37-68.78-76.22C111.64,100,92.35,64,74,64c-9.38,0-19.94,10-28.25,26.67A138.18,138.18,0,0,0,32,149.31c0,13.2,2.38,24.12,6.88,31.58S49.82,192,58.56,192c15.12,0,30.85-24.54,44.23-48.55a8,8,0,0,1,14,7.8C101.46,178.71,83.07,208,58.56,208c-14.41,0-26-6.52-33.39-18.85-6-10-9.17-23.73-9.17-39.84A154.81,154.81,0,0,1,31.42,83.54C42.82,60.62,57.94,48,74,48c27.94,0,47.77,37,68.78,76.22C159.79,156,179.08,192,197.44,192c8.74,0,15.18-3.63,19.68-11.11S224,162.51,224,149.31a138.18,138.18,0,0,0-13.74-58.64C202,74,191.39,64,182,64c-8.36,0-17.68,7.48-28.51,22.88a8,8,0,1,1-13.08-9.21c9-12.74,23-29.67,41.59-29.67,16.05,0,31.17,12.62,42.57,35.54A154.81,154.81,0,0,1,240,149.31ZM164.39,208,62.57,48h29L193.43,208Z"></path></svg>
            </a>
            <a href="#" class="text-gray-600 hover:text-primary transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 256 256"><path d="M88,104a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,104Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16ZM232,56V184a16,16,0,0,1-16,16H155.57l-13.68,23.94a16,16,0,0,1-27.78,0L100.43,200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V184h65.07a8,8,0,0,1,7,4l16,28,16-28a8,8,0,0,1,7-4H216Z"></path></svg>
            </a> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Shopping Cart Sidebar -->
    <CartSidebar 
      v-if="isCartOpen" 
      @close="isCartOpen = false" 
    />

    <div 
      v-if="isChatOpen"
      class="fixed z-[9999] md:z-40 bg-white shadow-2xl overflow-hidden
            w-full h-full inset-0 
            md:inset-auto md:bottom-6 md:right-3 md:w-[400px] md:h-[600px]
            rounded-none md:rounded-lg"
      
      v-motion
      :initial="{ opacity: 0, y: 20 }"
      :enter="{ opacity: 1, y: 0 }"
      :leave="{ opacity: 0, y: 20 }"
    >
      <ChatWidget @close="isChatOpen = false" />
    </div>

    <!-- Chat Button -->
    <button 
      v-if="!isChatOpen"
      @click="toggleChat" 
      class="fixed bottom-4 right-4 text-white bg-black p-4 rounded-full shadow-lg z-40 hover:bg-black-dark transition-all duration-300 hover:scale-110"
      v-motion
      :initial="{ opacity: 0, scale: 0.8 }"
      :enter="{ opacity: 1, scale: 1, transition: { delay: 1000 } }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f8f7f7" viewBox="0 0 256 256"><path d="M88,104a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,104Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16ZM232,56V184a16,16,0,0,1-16,16H155.57l-13.68,23.94a16,16,0,0,1-27.78,0L100.43,200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V184h65.07a8,8,0,0,1,7,4l16,28,16-28a8,8,0,0,1,7-4H216Z"></path></svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useCartStore } from '@/composables/useCartStore'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Art Works', path: '/artworks' },
  { name: 'Shop', path: '/shop' },
  { name: 'Commission', path: '/commission' },
  { name: 'Contact', path: '/contact' },
  { name: 'About Us', path: '/about' },
  { name: 'Academy', path: '#' }
]

const isMobileMenuOpen = ref(false)
const isCartOpen = ref(false)
const isChatOpen = ref(false)
const scrolled = ref(false)

// Local storage cart tracking
const localStorageCartCount = ref(0)
const CART_STORAGE_KEY = 'art-gallery-cart'

// Cart store (keeping for potential fallback)
const { cart } = useCartStore()

// Function to get cart count from localStorage
const getCartCountFromStorage = (): number => {
  try {
    if (process.client && localStorage) {
      const cartData = localStorage.getItem(CART_STORAGE_KEY)
      if (cartData) {
        const parsedCart = JSON.parse(cartData)
        if (Array.isArray(parsedCart)) {
          return parsedCart.length
        }
      }
    }
  } catch (error) {
    console.error('Error reading cart from localStorage:', error)
  }
  return 0
}

// Function to update cart count from localStorage
const updateCartCountFromStorage = () => {
  localStorageCartCount.value = getCartCountFromStorage()
}

// Storage event listener for cross-tab synchronization
const handleStorageChange = (event: StorageEvent) => {
  if (event.key === CART_STORAGE_KEY) {
    updateCartCountFromStorage()
  }
}

// Polling function to check localStorage changes (fallback for same-tab changes)
let storagePollingInterval: NodeJS.Timeout | null = null

const startStoragePolling = () => {
  // Poll every 500ms to catch localStorage changes within the same tab
  storagePollingInterval = setInterval(() => {
    const currentCount = getCartCountFromStorage()
    if (currentCount !== localStorageCartCount.value) {
      localStorageCartCount.value = currentCount
    }
  }, 500)
}

const stopStoragePolling = () => {
  if (storagePollingInterval) {
    clearInterval(storagePollingInterval)
    storagePollingInterval = null
  }
}

// Watch for cart store changes and sync with localStorage
watch(cart, (newCart) => {
  if (process.client && localStorage && newCart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart))
      localStorageCartCount.value = newCart.length
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }
}, { deep: true })

// Computed property for cart count (prioritize localStorage)
const cartCount = computed(() => {
  // Always use localStorage count as the source of truth
  return localStorageCartCount.value
})

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value
  isMobileMenuOpen.value = false
  isChatOpen.value = false
}

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
  isCartOpen.value = false
  isMobileMenuOpen.value = false
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  // Initialize cart count from localStorage
  updateCartCountFromStorage()
  
  // Set up event listeners
  window.addEventListener('scroll', handleScroll)
  
  // Listen for storage changes from other tabs
  if (process.client) {
    window.addEventListener('storage', handleStorageChange)
    
    // Start polling for same-tab localStorage changes
    startStoragePolling()
    
    // Also listen for custom cart events (if your app dispatches them)
    window.addEventListener('cartUpdated', updateCartCountFromStorage)
  }
})

onUnmounted(() => {
  // Clean up event listeners
  window.removeEventListener('scroll', handleScroll)
  
  if (process.client) {
    window.removeEventListener('storage', handleStorageChange)
    window.removeEventListener('cartUpdated', updateCartCountFromStorage)
    
    // Stop polling
    stopStoragePolling()
  }
})

// Expose a method to manually refresh cart count (useful for debugging)
const refreshCartCount = () => {
  updateCartCountFromStorage()
}

// Make it available globally for debugging
if (process.client) {
  (window as any).refreshCartCount = refreshCartCount
}
</script>

<style scoped>
.router-link-active {
  color: var(--color-primary);
}
</style>
