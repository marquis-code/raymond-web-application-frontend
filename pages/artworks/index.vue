<template>
    <div>
      <!-- Hero Banner -->
      <section class="relative bg-gray-900 text-white py-16">
        <div class="absolute inset-0 overflow-hidden opacity-30">
          <img 
            src="@/assets/img/event-go.webp" 
            alt="Shop" 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
        </div>
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-3xl">
            <h1 
              class="text-4xl md:text-5xl font-bold mb-6"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
            >
              Shop
            </h1>
            <p 
              class="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
              v-motion
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1, transition: { delay: 200 } }"
            >
              Browse and purchase original artworks, limited edition prints, and merchandise from Raymond Aworo's collection.
            </p>
          </div>
        </div>
      </section>
      
      <!-- Featured Categories -->
      <section class="py-12 bg-gray-50">
        <div class="container mx-auto px-4">
          <div 
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
          >
            <div 
              v-for="(category, index) in shopCategories" 
              :key="category.name"
              class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
              @click="filterByCategory(category.value)"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
            >
              <div class="h-40 overflow-hidden">
                <img 
                  :src="category.image" 
                  :alt="category.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div class="p-4 text-center">
                <h3 class="font-semibold text-lg mb-1">{{ category.name }}</h3>
                <p class="text-gray-600 text-sm">{{ category.count }} items</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Products Section -->
      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row gap-8">
            <!-- Filters Sidebar -->
            <div 
              class="lg:w-1/4"
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :enter="{ opacity: 1, x: 0 }"
            >
              <div class="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-xl font-bold">Filters</h2>
                  <button 
                    @click="clearFilters"
                    class="text-sm text-primary hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                
                <!-- Product Type -->
                <div class="mb-6">
                  <h3 class="font-medium mb-3">Product Type</h3>
                  <div class="space-y-2">
                    <label v-for="type in productTypes" :key="type.value" class="flex items-center">
                      <input 
                        type="checkbox" 
                        :value="type.value" 
                        v-model="selectedProductTypes"
                        class="rounded text-primary focus:ring-primary"
                      />
                      <span class="ml-2 text-gray-700">{{ type.label }}</span>
                    </label>
                  </div>
                </div>
                
                <!-- Categories -->
                <div class="mb-6">
                  <h3 class="font-medium mb-3">Categories</h3>
                  <div class="space-y-2">
                    <label v-for="category in categories" :key="category.value" class="flex items-center">
                      <input 
                        type="checkbox" 
                        :value="category.value" 
                        v-model="selectedCategories"
                        class="rounded text-primary focus:ring-primary"
                      />
                      <span class="ml-2 text-gray-700">{{ category.label }}</span>
                    </label>
                  </div>
                </div>
                
                <!-- Price Range -->
                <div class="mb-6">
                  <h3 class="font-medium mb-3">Price Range</h3>
                  <div class="px-2">
                    <div class="flex justify-between mb-2 text-sm text-gray-600">
                      <span>${{ priceRange[0] }}</span>
                      <span>${{ priceRange[1] }}</span>
                    </div>
                    <input 
                      type="range" 
                      v-model="priceRange[0]" 
                      :min="minPrice" 
                      :max="maxPrice"
                      class="w-full accent-primary mb-2"
                    />
                    <input 
                      type="range" 
                      v-model="priceRange[1]" 
                      :min="minPrice" 
                      :max="maxPrice"
                      class="w-full accent-primary"
                    />
                  </div>
                </div>
                
                <!-- Availability -->
                <div class="mb-6">
                  <h3 class="font-medium mb-3">Availability</h3>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input 
                        type="checkbox" 
                        v-model="inStockOnly"
                        class="rounded text-primary focus:ring-primary"
                      />
                      <span class="ml-2 text-gray-700">In Stock Only</span>
                    </label>
                  </div>
                </div>
                
                <!-- Apply Filters Button -->
                <button 
                  @click="applyFilters"
                  class="w-full py-2 bg-black text-white rounded-md hover:bg-black-dark transition-colors duration-300"
                >
                  Apply Filters
                </button>
              </div>
            </div>
            
            <!-- Products Grid -->
            <div class="lg:w-3/4">
              <!-- Sort and View Options -->
              <div 
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0 }"
              >
                <div class="text-gray-600">
                  Showing <span class="font-medium text-gray-900">{{ filteredProducts.length }}</span> products
                </div>
                
                <div class="flex items-center gap-4">
                  <div class="flex items-center">
                    <label for="sort" class="mr-2 text-gray-700">Sort by:</label>
                    <select 
                      id="sort" 
                      v-model="sortOption"
                      class="border-gray-300 rounded-md focus:ring-primary focus:border-primary text-gray-700"
                    >
                      <option value="featured">Featured</option>
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name-asc">Name: A-Z</option>
                      <option value="name-desc">Name: Z-A</option>
                    </select>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <button 
                      @click="viewMode = 'grid'"
                      class="p-2 rounded-md transition-colors duration-300"
                      :class="viewMode === 'grid' ? 'bg-black/10 text-primary' : 'text-gray-500 hover:text-gray-700'"
                    >
                      <!-- <Icon name="lucide:grid" size="20" /> -->
                    </button>
                    <button 
                      @click="viewMode = 'list'"
                      class="p-2 rounded-md transition-colors duration-300"
                      :class="viewMode === 'list' ? 'bg-black/10 text-primary' : 'text-gray-500 hover:text-gray-700'"
                    >
                      <!-- <Icon name="lucide:list" size="20" /> -->
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Grid View -->
              <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  v-for="(product, index) in filteredProducts" 
                  :key="product.id"
                  v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :enter="{ opacity: 1, y: 0, transition: { delay: index * 50 } }"
                >
                  <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                    <!-- Product Image -->
                    <div class="relative overflow-hidden aspect-square">
                      <img 
                        :src="product.image" 
                        :alt="product.title"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      <!-- Tags -->
                      <div class="absolute top-3 left-3 flex flex-col gap-2">
                        <span 
                          v-if="product.isNewArrival" 
                          class="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full"
                        >
                          New
                        </span>
                        <span 
                          v-if="product.isBestSeller" 
                          class="bg-amber-500 text-white text-xs px-3 py-1 rounded-full"
                        >
                          Best Seller
                        </span>
                        <span 
                          v-if="product.isOnSale" 
                          class="bg-rose-500 text-white text-xs px-3 py-1 rounded-full"
                        >
                          Sale
                        </span>
                      </div>
                      
                      <!-- Quick Actions -->
                      <div class="absolute bottom-3 right-3 flex flex-col gap-2">
                        <button 
                          @click.stop="quickView(product)"
                          class="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300"
                          title="Quick view"
                        >
                          <!-- <Icon name="lucide:eye" size="18" /> -->
                        </button>
                        <button 
                          @click.stop="toggleFavorite(product.id)"
                          class="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300"
                          :class="{ 'text-rose-500': favorites.includes(product.id) }"
                          title="Add to favorites"
                        >
                          <!-- <Icon :name="favorites.includes(product.id) ? 'lucide:heart' : 'lucide:heart'" size="18" /> -->
                        </button>
                      </div>
                    </div>
                    
                    <!-- Product Info -->
                    <div class="p-4 flex flex-col flex-grow">
                      <div class="mb-1">
                        <span class="text-xs text-gray-500">{{ product.type }}</span>
                      </div>
                      <h3 class="text-lg font-semibold mb-1 text-gray-900">{{ product.title }}</h3>
                      <p class="text-sm text-gray-600 mb-4">{{ product.category }}</p>
                      
                      <div class="mt-auto">
                        <div class="flex justify-between items-center mb-3">
                          <div class="flex items-baseline gap-2">
                            <span class="text-lg font-bold text-primary">${{ formatPrice(product.price) }}</span>
                            <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">${{ formatPrice(product.originalPrice) }}</span>
                          </div>
                          <div class="flex items-center">
                            <span class="text-sm text-gray-600">{{ product.inStock ? 'In Stock' : 'Sold Out' }}</span>
                          </div>
                        </div>
                        
                        <button 
                          @click="addToCart(product)"
                          class="w-full py-2 bg-black text-white rounded-md hover:bg-black-dark transition-colors duration-300 flex items-center justify-center gap-2"
                          :disabled="!product.inStock"
                          :class="{ 'opacity-50 cursor-not-allowed': !product.inStock }"
                        >
                          <!-- <Icon name="lucide:shopping-bag" size="16" /> -->
                          {{ product.inStock ? 'Add to Cart' : 'Sold Out' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- List View -->
              <div v-else class="space-y-6">
                <div 
                  v-for="(product, index) in filteredProducts" 
                  :key="product.id"
                  class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row"
                  v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :enter="{ opacity: 1, y: 0, transition: { delay: index * 50 } }"
                >
                  <!-- Product Image -->
                  <div class="sm:w-1/3 relative overflow-hidden">
                    <img 
                      :src="product.image" 
                      :alt="product.title"
                      class="w-full h-full object-cover aspect-square sm:aspect-auto"
                    />
                    
                    <!-- Tags -->
                    <div class="absolute top-3 left-3 flex flex-col gap-2">
                      <span 
                        v-if="product.isNewArrival" 
                        class="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full"
                      >
                        New
                      </span>
                      <span 
                        v-if="product.isBestSeller" 
                        class="bg-amber-500 text-white text-xs px-3 py-1 rounded-full"
                      >
                        Best Seller
                      </span>
                      <span 
                        v-if="product.isOnSale" 
                        class="bg-rose-500 text-white text-xs px-3 py-1 rounded-full"
                      >
                        Sale
                      </span>
                    </div>
                  </div>
                  
                  <!-- Product Info -->
                  <div class="sm:w-2/3 p-6 flex flex-col">
                    <div class="mb-1">
                      <span class="text-xs text-gray-500">{{ product.type }}</span>
                    </div>
                    
                    <h3 class="text-xl font-semibold mb-1 text-gray-900">{{ product.title }}</h3>
                    <p class="text-sm text-gray-600 mb-2">{{ product.category }}</p>
                    
                    <p class="text-gray-700 mb-4 line-clamp-2">{{ product.description }}</p>
                    
                    <div class="mt-auto flex flex-wrap justify-between items-center gap-4">
                      <div class="flex items-baseline gap-2">
                        <span class="text-xl font-bold text-primary">${{ formatPrice(product.price) }}</span>
                        <span v-if="product.originalPrice" class="text-sm text-gray-500 line-through">${{ formatPrice(product.originalPrice) }}</span>
                        <span class="text-sm text-gray-600 ml-2">{{ product.inStock ? 'In Stock' : 'Sold Out' }}</span>
                      </div>
                      
                      <div class="flex gap-2">
                        <button 
                          @click="quickView(product)"
                          class="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300"
                          title="Quick view"
                        >
                          <!-- <Icon name="lucide:eye" size="18" /> -->
                        </button>
                        <button 
                          @click="toggleFavorite(product.id)"
                          class="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300"
                          :class="{ 'text-rose-500': favorites.includes(product.id) }"
                          title="Add to favorites"
                        >
                          <!-- <Icon :name="favorites.includes(product.id) ? 'lucide:heart' : 'lucide:heart'" size="18" /> -->
                        </button>
                        <button 
                          @click="addToCart(product)"
                          class="px-4 py-2 bg-black text-white rounded-md hover:bg-black-dark transition-colors duration-300 flex items-center gap-2"
                          :disabled="!product.inStock"
                          :class="{ 'opacity-50 cursor-not-allowed': !product.inStock }"
                        >
                          <!-- <Icon name="lucide:shopping-bag" size="16" /> -->
                          {{ product.inStock ? 'Add to Cart' : 'Sold Out' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Empty State -->
              <div 
                v-if="filteredProducts.length === 0" 
                class="py-12 text-center"
                v-motion
                :initial="{ opacity: 0 }"
                :enter="{ opacity: 1 }"
              >
                <div class="w-20 h-20 mx-auto mb-4 text-gray-300">
                  <!-- <Icon name="lucide:search-x" size="80" /> -->
                </div>
                <h3 class="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p class="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  @click="clearFilters"
                  class="px-6 py-2 bg-black text-white rounded-full hover:bg-black-dark transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
              
              <!-- Load More -->
              <div 
                v-if="filteredProducts.length > 0 && hasMoreProducts" 
                class="mt-12 text-center"
                v-motion
                :initial="{ opacity: 0 }"
                :enter="{ opacity: 1, transition: { delay: 300 } }"
              >
                <button 
                  @click="loadMoreProducts"
                  class="px-8 py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  Load More Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Quick View Modal -->
      <Teleport to="body">
        <div 
          v-if="quickViewProduct"
          class="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          <div 
            class="absolute inset-0 bg-black/70 backdrop-blur-sm"
            @click="quickViewProduct = null"
          ></div>
          
          <div 
            class="bg-white rounded-lg shadow-xl max-w-4xl w-full relative z-10 overflow-hidden"
            v-motion
            :initial="{ opacity: 0, scale: 0.9 }"
            :enter="{ opacity: 1, scale: 1 }"
          >
            <button 
              @click="quickViewProduct = null"
              class="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-300 z-10"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
              <!-- <Icon name="lucide:x" size="20" /> -->
            </button>
            
            <div class="grid grid-cols-1 md:grid-cols-2">
              <!-- Product Image -->
              <div class="relative">
                <img 
                  :src="quickViewProduct.image" 
                  :alt="quickViewProduct.title"
                  class="w-full h-full object-cover aspect-square"
                />
              </div>
              
              <!-- Product Info -->
              <div class="p-6 md:p-8 flex flex-col">
                <div class="mb-1">
                  <span class="text-sm text-gray-500">{{ quickViewProduct.type }}</span>
                </div>
                
                <h3 class="text-2xl font-bold mb-2 text-gray-900">{{ quickViewProduct.title }}</h3>
                <p class="text-sm text-gray-600 mb-4">{{ quickViewProduct.category }}</p>
                
                <div class="flex items-baseline gap-3 mb-4">
                  <span class="text-2xl font-bold text-primary">${{ formatPrice(quickViewProduct.price) }}</span>
                  <span v-if="quickViewProduct.originalPrice" class="text-lg text-gray-500 line-through">${{ formatPrice(quickViewProduct.originalPrice) }}</span>
                </div>
                
                <p class="text-gray-700 mb-6">{{ quickViewProduct.description }}</p>
                
                <div class="mb-6">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium">Availability:</span>
                    <span :class="quickViewProduct.inStock ? 'text-green-600' : 'text-rose-600'">
                      {{ quickViewProduct.inStock ? 'In Stock' : 'Sold Out' }}
                    </span>
                  </div>
                  
                  <div v-if="quickViewProduct.type === 'Original Artwork'" class="flex items-center justify-between mb-2">
                    <span class="font-medium">Medium:</span>
                    <span>{{ quickViewProduct.medium }}</span>
                  </div>
                  
                  <div v-if="quickViewProduct.type === 'Original Artwork' || quickViewProduct.type === 'Limited Edition Print'" class="flex items-center justify-between mb-2">
                    <span class="font-medium">Dimensions:</span>
                    <span>{{ quickViewProduct.dimensions }}</span>
                  </div>
                </div>
                
                <div class="mt-auto">
                  <button 
                    @click="addToCart(quickViewProduct)"
                    class="w-full py-3 bg-black text-white rounded-md hover:bg-black-dark transition-colors duration-300 flex items-center justify-center gap-2 mb-3"
                    :disabled="!quickViewProduct.inStock"
                    :class="{ 'opacity-50 cursor-not-allowed': !quickViewProduct.inStock }"
                  >
                    <!-- <Icon name="lucide:shopping-bag" size="18" /> -->
                    {{ quickViewProduct.inStock ? 'Add to Cart' : 'Sold Out' }}
                  </button>
                  
                  <NuxtLink 
                    :to="`/shop/${quickViewProduct.id}`"
                    class="w-full py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300 text-center block"
                  >
                    View Full Details
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useCartStore } from '~/composables/useCartStore'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const { addToCart: addItemToCart } = useCartStore()
  
  // Filter state
  const selectedProductTypes = ref<string[]>([])
  const selectedCategories = ref<string[]>([])
  const priceRange = ref([0, 3000])
  const minPrice = 0
  const maxPrice = 3000
  const inStockOnly = ref(false)
  const sortOption = ref('featured')
  const viewMode = ref('grid')
  const visibleCount = ref(9)
  const favorites = ref<number[]>([])
  const quickViewProduct = ref(null)
  
  // Product types and categories
  const productTypes = [
    { label: 'Original Artwork', value: 'Original Artwork' },
    { label: 'Limited Edition Print', value: 'Limited Edition Print' },
    { label: 'Open Edition Print', value: 'Open Edition Print' },
    { label: 'Merchandise', value: 'Merchandise' }
  ]
  
  const categories = [
    { label: 'Portraits', value: 'Portrait' },
    { label: 'Religious', value: 'Religious' },
    { label: 'Landscapes', value: 'Landscape' },
    { label: 'Abstract', value: 'Abstract' },
    { label: 'Still Life', value: 'Still Life' }
  ]
  
  // Shop categories for the featured section
  const shopCategories = [
    { 
      name: 'Original Artworks', 
      value: 'Original Artwork',
      image: '/images/category-originals.jpg',
      count: 12
    },
    { 
      name: 'Limited Edition Prints', 
      value: 'Limited Edition Print',
      image: '/images/category-limited-prints.jpg',
      count: 24
    },
    { 
      name: 'Open Edition Prints', 
      value: 'Open Edition Print',
      image: '/images/category-open-prints.jpg',
      count: 18
    },
    { 
      name: 'Merchandise', 
      value: 'Merchandise',
      image: '/images/category-merchandise.jpg',
      count: 15
    }
  ]
  
  // Product data
  const products = ref([
    {
      id: 1,
      title: "No Greater Love",
      image: "/images/no-greater-love.jpg",
      type: "Original Artwork",
      category: "Religious",
      price: 1200,
      medium: "Charcoal on Paper",
      dimensions: "24 x 36 inches",
      description: "This Artwork depicts the suffering of Christ on His way to Calvary and then ponders how Christ exhibits each of the qualities of love in His Passion.",
      inStock: true,
      isNewArrival: true,
      isFeatured: true
    },
    {
      id: 2,
      title: "Divine Light",
      image: "/images/divine-light.jpg",
      type: "Original Artwork",
      category: "Religious",
      price: 950,
      medium: "Acrylic on Canvas",
      dimensions: "30 x 40 inches",
      description: "An exploration of spirituality through light and shadow, capturing the divine essence in everyday moments.",
      inStock: true,
      isNewArrival: true,
      isFeatured: true
    },
    {
      id: 3,
      title: "Serenity Falls",
      image: "/images/serenity-falls.jpg",
      type: "Original Artwork",
      category: "Landscape",
      price: 850,
      medium: "Mixed Media",
      dimensions: "36 x 48 inches",
      description: "A vibrant landscape capturing the tranquility of nature, with cascading waterfalls under a moonlit sky.",
      inStock: true,
      isFeatured: false
    },
    {
      id: 4,
      title: "Reflection - Limited Edition",
      image: "/images/reflection.jpg",
      type: "Limited Edition Print",
      category: "Portrait",
      price: 250,
      originalPrice: 300,
      dimensions: "18 x 24 inches",
      description: "A limited edition print of the powerful portrait exploring themes of identity and introspection. Edition of 25, signed and numbered by the artist.",
      inStock: true,
      isBestSeller: true,
      isFeatured: true
    },
    {
      id: 5,
      title: "Ethereal Wings - Limited Edition",
      image: "/images/ethereal-wings.jpg",
      type: "Limited Edition Print",
      category: "Religious",
      price: 280,
      dimensions: "20 x 30 inches",
      description: "A limited edition print of the angelic presence artwork. Edition of 20, signed and numbered by the artist.",
      inStock: true,
      isBestSeller: true
    },
    {
      id: 6,
      title: "Moonlit Waterfall - Open Edition",
      image: "/images/moonlit-waterfall.jpg",
      type: "Open Edition Print",
      category: "Landscape",
      price: 120,
      dimensions: "16 x 20 inches",
      description: "An open edition print of the dreamlike landscape featuring a serene waterfall under the glow of a full moon.",
      inStock: false
    },
    {
      id: 7,
      title: "Inner Vision - Open Edition",
      image: "/images/inner-vision.jpg",
      type: "Open Edition Print",
      category: "Portrait",
      price: 100,
      dimensions: "12 x 16 inches",
      description: "An open edition print of the thought-provoking portrait that explores the concept of inner sight and spiritual perception.",
      inStock: true,
      isBestSeller: true
    },
    {
      id: 8,
      title: "Butterfly Effect T-Shirt",
      image: "/images/butterfly-effect-tshirt.jpg",
      type: "Merchandise",
      category: "Apparel",
      price: 35,
      description: "A premium quality t-shirt featuring the Butterfly Effect artwork. Available in sizes S, M, L, XL.",
      inStock: true,
      isOnSale: true
    },
    {
      id: 9,
      title: "Sacred Heart - Limited Edition",
      image: "/images/sacred-heart.jpg",
      type: "Limited Edition Print",
      category: "Religious",
      price: 220,
      dimensions: "16 x 20 inches",
      description: "A limited edition print of the devotional piece depicting the Sacred Heart. Edition of 30, signed and numbered by the artist.",
      inStock: true
    },
    {
      id: 10,
      title: "Ocean Whispers - Open Edition",
      image: "/images/ocean-whispers.jpg",
      type: "Open Edition Print",
      category: "Landscape",
      price: 90,
      originalPrice: 120,
      dimensions: "12 x 16 inches",
      description: "An open edition print of the serene seascape capturing the rhythmic dance of waves against a shoreline at sunset.",
      inStock: true,
      isOnSale: true
    },
    {
      id: 11,
      title: "Contemplation Notebook",
      image: "/images/contemplation-notebook.jpg",
      type: "Merchandise",
      category: "Stationery",
      price: 25,
      description: "A premium quality hardcover notebook featuring the Contemplation artwork on the cover. 120 pages of acid-free paper.",
      inStock: false
    },
    {
      id: 12,
      title: "Abstract Emotions Tote Bag",
      image: "/images/abstract-emotions-tote.jpg",
      type: "Merchandise",
      category: "Accessories",
      price: 30,
      description: "A durable canvas tote bag featuring the Abstract Emotions artwork. Perfect for everyday use.",
      inStock: true,
      isNewArrival: true
    }
  ])
  
  // Computed properties
  const filteredProducts = computed(() => {
    let result = [...products.value]
    
    // Filter by product type
    if (selectedProductTypes.value.length > 0) {
      result = result.filter(product => selectedProductTypes.value.includes(product.type))
    }
    
    // Filter by category
    if (selectedCategories.value.length > 0) {
      result = result.filter(product => selectedCategories.value.includes(product.category))
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange.value[0] && product.price <= priceRange.value[1]
    )
    
    // Filter by availability
    if (inStockOnly.value) {
      result = result.filter(product => product.inStock)
    }
    
    // Sort
    switch (sortOption.value) {
      case 'featured':
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
        break
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0))
        break
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
    }
    
    return result.slice(0, visibleCount.value)
  })
  
  const hasMoreProducts = computed(() => {
    const filteredTotal = products.value.filter(product => {
      let matches = true
      
      // Filter by product type
      if (selectedProductTypes.value.length > 0) {
        matches = matches && selectedProductTypes.value.includes(product.type)
      }
      
      // Filter by category
      if (selectedCategories.value.length > 0) {
        matches = matches && selectedCategories.value.includes(product.category)
      }
      
      // Filter by price range
      matches = matches && product.price >= priceRange.value[0] && product.price <= priceRange.value[1]
      
      // Filter by availability
      if (inStockOnly.value) {
        matches = matches && product.inStock
      }
      
      return matches
    }).length
    
    return visibleCount.value < filteredTotal
  })
  
  // Methods
  const clearFilters = () => {
    selectedProductTypes.value = []
    selectedCategories.value = []
    priceRange.value = [minPrice, maxPrice]
    inStockOnly.value = false
    sortOption.value = 'featured'
  }
  
  const applyFilters = () => {
    // This function is just for the button click effect
    // Filters are applied reactively through computed properties
  }
  
  const loadMoreProducts = () => {
    visibleCount.value += 6
  }
  
  const filterByCategory = (category: string) => {
    selectedProductTypes.value = [category]
    // Scroll to products section
    const productsSection = document.querySelector('.py-12:not(.bg-gray-50)')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  const toggleFavorite = (id: number) => {
    const index = favorites.value.indexOf(id)
    if (index === -1) {
      favorites.value.push(id)
    } else {
      favorites.value.splice(index, 1)
    }
  }
  
  const quickView = (product: any) => {
    quickViewProduct.value = product
  }
  
  const addToCart = (product: any) => {
    if (product.inStock) {
      addItemToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1
      })
    }
  }
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US')
  }
  
  // Initialize with URL params if any
  onMounted(() => {
    const route = router.currentRoute.value
    if (route.query.type) {
      const type = route.query.type as string
      selectedProductTypes.value = [type]
    }
    if (route.query.category) {
      const category = route.query.category as string
      selectedCategories.value = [category]
    }
  })
  </script>