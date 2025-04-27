<template>
    <div>

      <section class="relative bg-gray-900 text-white py-16">
        <div class="absolute inset-0 overflow-hidden opacity-30">
          <img 
            src="@/assets/img/event-go.webp" 
            alt="Art Works" 
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
              Art Works
            </h1>
            <p 
              class="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
              v-motion
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1, transition: { delay: 200 } }"
            >
              Explore Raymond Aworo's collection of hyper-realistic artworks that blend emotion, faith, and extraordinary talent.
            </p>
          </div>
        </div>
      </section>
      

      <section class="py-12">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row gap-8">

            <div 
              class="lg:w-1/4"
              v-motion
              :initial="{ opacity: 0, x: -20 }"
              :enter="{ opacity: 1, x: 0 }"
            >
              <div class="bg-white p-6 rounded-lg shadow-md sticky top-24">
                <h2 class="text-xl font-bold mb-6">Filters</h2>
                

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
                

                <div class="mb-6">
                  <h3 class="font-medium mb-3">Medium</h3>
                  <div class="space-y-2">
                    <label v-for="medium in mediums" :key="medium.value" class="flex items-center">
                      <input 
                        type="checkbox" 
                        :value="medium.value" 
                        v-model="selectedMediums"
                        class="rounded text-primary focus:ring-primary"
                      />
                      <span class="ml-2 text-gray-700">{{ medium.label }}</span>
                    </label>
                  </div>
                </div>
                
 
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
                

                <button 
                  @click="clearFilters"
                  class="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300 text-gray-700"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
            

            <div class="lg:w-3/4">

              <div 
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
                v-motion
                :initial="{ opacity: 0, y: 20 }"
                :enter="{ opacity: 1, y: 0 }"
              >
                <div class="text-gray-600">
                  Showing <span class="font-medium text-gray-900">{{ filteredArtworks.length }}</span> artworks
                </div>
                
                <div class="flex items-center gap-4">
                  <div class="flex items-center">
                    <label for="sort" class="mr-2 text-gray-700">Sort by:</label>
                    <select 
                      id="sort" 
                      v-model="sortOption"
                      class="border-gray-300 rounded-md focus:ring-primary py-2.5 outline-none px-3 focus:border-primary text-gray-700"
                    >
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name-asc">Name: A-Z</option>
                      <option value="name-desc">Name: Z-A</option>
                    </select>
                  </div>
                  
                  <div class="flex items-center gap-2 border rounded-lg">
                    <button
                      @click="viewMode = 'grid'"
                      class="p-2  transition-colors duration-300"
                      :class="viewMode === 'grid' ? 'bg-black/10 text-primary' : 'text-gray-500 hover:text-gray-700'"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,80H136V56h64ZM120,56v64H56V56ZM56,136h64v64H56Zm144,64H136V136h64v64Z"></path></svg>
                    </button>
                    <button
                      @click="viewMode = 'list'"
                      class="p-2  transition-colors duration-300"
                      :class="viewMode === 'list' ? 'bg-black/10 text-primary' : 'text-gray-500 hover:text-gray-700'"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path></svg>
                    </button>
                  </div>
                </div>
              </div>
              
     
              <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  v-for="(artwork, index) in filteredArtworks" 
                  :key="artwork.id"
                  v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :enter="{ opacity: 1, y: 0, transition: { delay: index * 50 } }"
                >
                  <ArtworkCard 
                    :artwork="artwork" 
                    @view="viewArtwork"
                    @add-to-cart="addToCart"
                  />
                </div>
              </div>
              

              <div v-else class="space-y-6">
                <div 
                  v-for="(artwork, index) in filteredArtworks" 
                  :key="artwork.id"
                  class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row"
                  v-motion
                  :initial="{ opacity: 0, y: 20 }"
                  :enter="{ opacity: 1, y: 0, transition: { delay: index * 50 } }"
                >

                  <div class="sm:w-1/3 relative overflow-hidden">
                    <img 
                      :src="artwork.image" 
                      :alt="artwork.title"
                      class="w-full h-full object-cover aspect-square sm:aspect-auto"
                    />
                    

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
                  

                  <div class="sm:w-2/3 p-6 flex flex-col">
                    <div class="mb-2">
                      <span class="text-sm text-primary font-medium">{{ artwork.category }}</span>
                    </div>
                    
                    <h3 class="text-xl font-semibold mb-2 text-gray-900">{{ artwork.title }}</h3>
                    <p class="text-sm text-gray-600 mb-4">{{ artwork.medium }}</p>
                    
                    <p class="text-gray-700 mb-6 line-clamp-3">{{ artwork.description }}</p>
                    
                    <div class="mt-auto flex flex-wrap justify-between items-center gap-4">
                      <span class="text-xl font-bold text-primary">${{ formatPrice(artwork.price) }}</span>
                      
                      <div class="flex gap-2">
                        <button 
                          @click="viewArtwork(artwork)"
                          class="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300 text-gray-700"
                        >
                          View Details
                        </button>
                        <button 
                          @click="addToCart(artwork)"
                          class="px-4 py-2 bg-black text-white rounded-md hover:bg-black-dark transition-colors duration-300 flex items-center gap-2"
                          :disabled="!artwork.inStock"
                          :class="{ 'opacity-50 cursor-not-allowed': !artwork.inStock }"
                        >
                          <!-- <Icon name="lucide:shopping-bag" size="16" /> -->
                          {{ artwork.inStock ? 'Add to Cart' : 'Sold Out' }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
  
              <div 
                v-if="filteredArtworks.length === 0" 
                class="py-12 text-center"
                v-motion
                :initial="{ opacity: 0 }"
                :enter="{ opacity: 1 }"
              >
                <div class="w-20 h-20 mx-auto mb-4 text-gray-300">
                  <!-- <Icon name="lucide:search-x" size="80" /> -->
                </div>
                <h3 class="text-xl font-medium text-gray-900 mb-2">No artworks found</h3>
                <p class="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  @click="clearFilters"
                  class="px-6 py-2 bg-black text-white rounded-full hover:bg-black-dark transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
              

              <div 
                v-if="filteredArtworks.length > 0 && hasMoreArtworks" 
                class="mt-12 text-center"
                v-motion
                :initial="{ opacity: 0 }"
                :enter="{ opacity: 1, transition: { delay: 300 } }"
              >
                <button 
                  @click="loadMoreArtworks"
                  class="px-8 py-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  Load More Artworks
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useCartStore } from '~/composables/useCartStore'
  import { useRouter } from 'vue-router'
  import { onMounted } from 'vue';
  import image1 from '@/assets/img/corporate.png'
import image2 from '@/assets/img/services6.jpg'
import image3 from '@/assets/img/services8.jpg'
import image4 from '@/assets/img/services9.jpg'
  
  const router = useRouter()
  const { addToCart: addItemToCart } = useCartStore()
  
  // Filter state
  const selectedCategories = ref<string[]>([])
  const selectedMediums = ref<string[]>([])
  const priceRange = ref([0, 3000])
  const minPrice = 0
  const maxPrice = 3000
  const inStockOnly = ref(false)
  const sortOption = ref('newest')
  const viewMode = ref('grid')
  const visibleCount = ref(9)
  
  // Categories and mediums
  const categories = [
    { label: 'Portraits', value: 'Portrait' },
    { label: 'Religious', value: 'Religious' },
    { label: 'Landscapes', value: 'Landscape' },
    { label: 'Abstract', value: 'Abstract' },
    { label: 'Still Life', value: 'Still Life' }
  ]
  
  const mediums = [
    { label: 'Charcoal on Paper', value: 'Charcoal on Paper' },
    { label: 'Acrylic on Canvas', value: 'Acrylic on Canvas' },
    { label: 'Oil on Canvas', value: 'Oil on Canvas' },
    { label: 'Mixed Media', value: 'Mixed Media' },
    { label: 'Pastel', value: 'Pastel' }
  ]
  
  // Artwork data
  const artworks = ref([
    {
      id: 1,
      title: "No Greater Love",
      image: image1,
      category: "Religious",
      price: 1200,
      medium: "Charcoal on Paper",
      description: "This Artwork depicts the suffering of Christ on His way to Calvary and then ponders how Christ exhibits each of the qualities of love in His Passion.",
      inStock: true,
      isNewArrival: true,
      year: 2023,
      dimensions: "24 x 36 inches"
    },
    {
      id: 2,
      title: "Divine Light",
      image: image2,
      category: "Religious",
      price: 950,
      medium: "Acrylic on Canvas",
      description: "An exploration of spirituality through light and shadow, capturing the divine essence in everyday moments.",
      inStock: true,
      isNewArrival: true,
      year: 2023,
      dimensions: "30 x 40 inches"
    },
    {
      id: 3,
      title: "Serenity Falls",
      image: image3,
      category: "Landscape",
      price: 850,
      medium: "Mixed Media",
      description: "A vibrant landscape capturing the tranquility of nature, with cascading waterfalls under a moonlit sky.",
      inStock: true,
      isNewArrival: false,
      year: 2022,
      dimensions: "36 x 48 inches"
    },
    {
      id: 4,
      title: "Reflection",
      image: image4,
      category: "Portrait",
      price: 1100,
      medium: "Oil on Canvas",
      description: "A powerful portrait exploring themes of identity, introspection, and self-discovery through a striking visual composition.",
      inStock: true,
      isBestSeller: true,
      year: 2022,
      dimensions: "24 x 30 inches"
    },
    {
      id: 5,
      title: "Ethereal Wings",
      image: image1,
      category: "Religious",
      price: 1300,
      medium: "Charcoal on Paper",
      description: "A depiction of angelic presence, symbolizing protection, guidance, and divine intervention in human affairs.",
      inStock: true,
      isBestSeller: true,
      year: 2021,
      dimensions: "30 x 40 inches"
    },
    {
      id: 6,
      title: "Moonlit Waterfall",
      image: image2,
      category: "Landscape",
      price: 900,
      medium: "Acrylic on Canvas",
      description: "A dreamlike landscape featuring a serene waterfall under the glow of a full moon, creating a magical atmosphere.",
      inStock: false,
      isBestSeller: true,
      year: 2021,
      dimensions: "36 x 48 inches"
    },
    {
      id: 7,
      title: "Inner Vision",
      image: image3,
      category: "Portrait",
      price: 1050,
      medium: "Charcoal on Paper",
      description: "A thought-provoking portrait that explores the concept of inner sight and spiritual perception beyond physical vision.",
      inStock: true,
      isBestSeller: true,
      year: 2020,
      dimensions: "24 x 36 inches"
    },
    {
      id: 8,
      title: "Butterfly Effect",
      image: image4,
      category: "Portrait",
      price: 980,
      medium: "Mixed Media",
      description: "A symbolic representation of transformation and the interconnectedness of all things, featuring delicate butterfly motifs.",
      inStock: true,
      isOnSale: true,
      year: 2020,
      dimensions: "24 x 30 inches"
    },
    {
      id: 9,
      title: "Sacred Heart",
      image: image1,
      category: "Religious",
      price: 1150,
      medium: "Oil on Canvas",
      description: "A devotional piece depicting the Sacred Heart, symbolizing divine love and compassion with intricate detail.",
      inStock: true,
      year: 2019,
      dimensions: "24 x 30 inches"
    },
    {
      id: 10,
      title: "Ocean Whispers",
      image: image2,
      category: "Landscape",
      price: 870,
      medium: "Acrylic on Canvas",
      description: "A serene seascape capturing the rhythmic dance of waves against a shoreline at sunset, evoking peace and contemplation.",
      inStock: true,
      year: 2019,
      dimensions: "30 x 40 inches"
    },
    {
      id: 11,
      title: "Contemplation",
      image: image3,
      category: "Portrait",
      price: 1200,
      medium: "Charcoal on Paper",
      description: "A powerful portrait capturing a moment of deep thought and introspection, with masterful use of light and shadow.",
      inStock: false,
      year: 2018,
      dimensions: "24 x 36 inches"
    },
    {
      id: 12,
      title: "Abstract Emotions",
      image: image4,
      category: "Abstract",
      price: 950,
      medium: "Mixed Media",
      description: "An abstract exploration of human emotions through color, texture, and form, inviting viewers to find their own meaning.",
      inStock: true,
      isOnSale: true,
      year: 2018,
      dimensions: "36 x 36 inches"
    }
  ])
  
  // // Computed properties
  const filteredArtworks = computed(() => {
    let result = [...artworks.value]
    
    // Filter by category
    if (selectedCategories.value.length > 0) {
      result = result.filter(artwork => selectedCategories.value.includes(artwork.category))
    }
    
    // Filter by medium
    if (selectedMediums.value.length > 0) {
      result = result.filter(artwork => selectedMediums.value.includes(artwork.medium))
    }
    
    // Filter by price range
    result = result.filter(artwork => 
      artwork.price >= priceRange.value[0] && artwork.price <= priceRange.value[1]
    )
    
    // Filter by availability
    if (inStockOnly.value) {
      result = result.filter(artwork => artwork.inStock)
    }
    
    // Sort
    switch (sortOption.value) {
      case 'newest':
        result.sort((a, b) => b.id - a.id)
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
  
  const hasMoreArtworks = computed(() => {
    const filteredTotal = artworks.value.filter(artwork => {
      let matches = true
      
      // Filter by category
      if (selectedCategories.value.length > 0) {
        matches = matches && selectedCategories.value.includes(artwork.category)
      }
      
      // Filter by medium
      if (selectedMediums.value.length > 0) {
        matches = matches && selectedMediums.value.includes(artwork.medium)
      }
      
      // Filter by price range
      matches = matches && artwork.price >= priceRange.value[0] && artwork.price <= priceRange.value[1]
      
      // Filter by availability
      if (inStockOnly.value) {
        matches = matches && artwork.inStock
      }
      
      return matches
    }).length
    
    return visibleCount.value < filteredTotal
  })
  
  // Methods
  const clearFilters = () => {
    selectedCategories.value = []
    selectedMediums.value = []
    priceRange.value = [minPrice, maxPrice]
    inStockOnly.value = false
    sortOption.value = 'newest'
  }
  
  const loadMoreArtworks = () => {
    visibleCount.value += 6
  }
  
  const viewArtwork = (artwork: any) => {
    router.push(`/artworks/${artwork.id}`)
  }
  
  const addToCart = (artwork: any) => {
    if (artwork.inStock) {
      addItemToCart({
        id: artwork.id,
        title: artwork.title,
        image: artwork.image,
        price: artwork.price,
        quantity: 1
      })
    }
  }
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US')
  }
  
  // Initialize with URL params if any
  const initializeWithQueryParams = () => {
    const route = router.currentRoute.value;
    if (route.query.category) {
      const category = route.query.category as string;
      selectedCategories.value = [category];
    }
  };
  
  onMounted(() => {
    initializeWithQueryParams();
  });
  </script>