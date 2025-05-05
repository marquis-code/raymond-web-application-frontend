<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />
    <!-- {{allCategories}} -->
    <!-- Featured Categories -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 
          class="text-xl font-bold text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          Explore Art Categories
        </h2>
        
        <div v-if="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="(category, index) in allCategories" 
            :key="category._id"
            class="relative overflow-hidden rounded-lg aspect-[4/3] group cursor-pointer"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
            @click="navigateToCategory(category._id)"
          >
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
    </section>
    
    <!-- New Arrivals -->
    <section v-if="newArrivals.length > 0" class="py-16">
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
        
        <div v-if="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
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
          
          <!-- Products grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="product in filteredNewArrivals" 
              :key="product._id"
              class="bg-white rounded-lg overflow-hidden shadow-md group"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
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
          class="text-3xl font-bold text-center mb-12"
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
    <section v-if="bestSellers.length > 0" class="py-16">
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
        
        <div v-if="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
        
        <div v-else>
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
          
          <!-- Products grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="product in filteredBestSellers" 
              :key="product._id"
              class="bg-white rounded-lg overflow-hidden shadow-md group"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
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
    
    <!-- Featured Products -->
    <section v-if="featuredProducts.length > 0" class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 
          class="text-2xl font-bold text-center mb-4"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          Featured Products
        </h2>
        <p 
          class="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { delay: 100 } }"
        >
          Handpicked selections from our exclusive collection
        </p>
        
        <div v-if="loading" class="flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
        
        <div v-else>
          <!-- Category filters -->
          <div class="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              class="px-6 py-2 rounded-full transition-colors duration-300"
              :class="selectedFeaturedCategory === 'all' ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'"
              @click="selectedFeaturedCategory = 'all'"
            >
              All
            </button>
            <button 
              v-for="category in featuredCategories" 
              :key="category._id"
              class="px-6 py-2 rounded-full transition-colors duration-300"
              :class="selectedFeaturedCategory === category._id ? 'bg-black text-white' : 'bg-gray-200 hover:bg-gray-300'"
              @click="selectedFeaturedCategory = category._id"
            >
              {{ category.name }}
            </button>
          </div>
          
          <!-- Products grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div 
              v-for="product in filteredFeaturedProducts" 
              :key="product._id"
              class="bg-white rounded-lg overflow-hidden shadow-md group"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
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
                  Featured
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
    
    <!-- Commission CTA -->
    <section class="py-20 bg-black/10">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :enter="{ opacity: 1, x: 0 }"
          >
            <h2 class="text-3xl font-bold mb-6">Commission Your Custom Artwork</h2>
            <p class="text-gray-700 mb-8">
              Looking for something truly unique? Commission a custom artwork tailored to your vision. Whether it's a portrait, landscape, or conceptual piece, Raymond brings your ideas to life with exceptional skill and attention to detail.
            </p>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="bg-black/20 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
                </div>
                <div>
                  <h4 class="font-medium">Personalized Consultation</h4>
                  <p class="text-gray-600">Discuss your vision directly with the artist</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-black/20 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
                </div>
                <div>
                  <h4 class="font-medium">Progress Updates</h4>
                  <p class="text-gray-600">Receive regular updates throughout the creation process</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-black/20 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
                </div>
                <div>
                  <h4 class="font-medium">Worldwide Shipping</h4>
                  <p class="text-gray-600">Safe and secure delivery to your doorstep</p>
                </div>
              </div>
            </div>
            <NuxtLink 
              to="/commission" 
              class="mt-8 inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-black-dark transition-all duration-300 transform hover:scale-105"
            >
              Start Your Commission
            </NuxtLink>
          </div>
          
          <div 
            class="relative"
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :enter="{ opacity: 1, x: 0 }"
          >
            <img 
              src="@/assets/img/event-go.webp" 
              alt="Commission artwork" 
              class="rounded-lg shadow-xl w-full"
            />
            <div class="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg>
                </div>
                <div>
                  <h4 class="font-medium">100% Satisfaction</h4>
                  <p class="text-sm text-gray-600">Guaranteed or full refund</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Instagram Feed -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 
            class="text-2xl font-bold mb-4 md:mb-0"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
          >
            Follow Us on Instagram
          </h2>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            class="flex items-center text-primary hover:text-primary-dark transition-colors duration-300"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 200 } }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
            @raymondaworoart
          </a>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div 
            v-for="(post, index) in instagramPosts" 
            :key="index"
            class="relative aspect-square rounded-lg overflow-hidden group"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 50 } }"
          >
            <img 
              :src="post.image" 
              :alt="`Instagram post ${index + 1}`"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div class="flex gap-3 text-white">
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                  <span>{{ post.likes }}</span>
                </div>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path></svg>
                  <span>{{ post.comments }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter -->
    <section class="py-20 bg-gray-900 text-white">
      <div 
        class="container mx-auto px-4 max-w-4xl text-center"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
      >
        <h2 class="text-3xl font-bold mb-4">Join Our Art Community</h2>
        <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive updates on new artworks, exhibitions, and exclusive offers.
        </p>
        <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input 
            v-model="email"
            type="email"
            placeholder="Your email address"
            class="px-6 py-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary flex-grow"
            required
          />
          <button 
            type="submit"
            class="px-8 py-3 bg-black hover:bg-black-dark text-white rounded-full transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
        <p class="text-gray-400 text-sm mt-4">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from Raymond Aworo Art.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
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
const { products, loading } = useFetchProducts()
const { categories: allCategories, loading: categoriesLoading } = useFetchCategories()

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
    avatar: "/images/testimonial-1.jpg"
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
]
)
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

// Clean up intervals on component unmount
onMounted(() => {
    Object.values(carouselIntervals.value).forEach(interval => {
      clearInterval(interval)
    })
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