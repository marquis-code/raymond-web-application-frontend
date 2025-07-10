<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
    <!-- Loading State -->
    <div v-if="loading" class="container mx-auto px-6 py-32 flex justify-center items-center">
      <div class="relative">
        <div class="animate-spin rounded-full h-20 w-20 border-4 border-gray-200"></div>
        <div class="animate-spin rounded-full h-20 w-20 border-4 border-gray-900 border-t-transparent absolute top-0 left-0"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-8 h-8 bg-gray-900 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
    
    <!-- Product Not Found -->
    <div v-else-if="!product" class="container mx-auto px-6 py-32 text-center">
      <div class="max-w-md mx-auto">
        <div class="w-24 h-24 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
          </svg>
        </div>
        <h1 class="text-3xl font-light mb-4 text-gray-900">Product Not Found</h1>
        <p class="text-gray-600 mb-8 leading-relaxed">The product you're looking for doesn't exist or has been removed from our collection.</p>
        <NuxtLink 
          to="/artworks" 
          class="inline-flex items-center px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <span class="mr-2">Browse Products</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
    
    <!-- Main Product Content -->
    <div v-else class="container mx-auto px-6 py-20">
      <!-- Elegant Breadcrumb -->
      <nav class="mb-12 animate-fade-in-up">
        <ol class="flex items-center space-x-3 text-sm">
          <li>
            <NuxtLink to="/" class="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light">
              Home
            </NuxtLink>
          </li>
          <li class="text-gray-300">/</li>
          <li>
            <NuxtLink to="/artworks" class="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light">
              Products
            </NuxtLink>
          </li>
          <li class="text-gray-300">/</li>
          <li>
            <NuxtLink 
              :to="`/artworks?category=${product.category._id}`" 
              class="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light"
            >
              {{ product.category.name }}
            </NuxtLink>
          </li>
          <li class="text-gray-300">/</li>
          <li class="text-gray-900 font-medium truncate max-w-[200px]">{{ product.name }}</li>
        </ol>
      </nav>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
        <!-- Product Gallery Section -->
        <div class="relative animate-slide-in-left">
          <!-- Main Image Display -->
          <div class="relative group">
            <div class="aspect-square overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-3xl transition-all duration-700">
              <img 
                :src="product.images[activeImageIndex]" 
                :alt="product.name"
                class="w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
                @click="openFullscreen"
              />
              
              <!-- Floating Status Badges -->
              <div class="absolute top-6 left-6 flex flex-col gap-3">
                <div 
                  v-if="product.isNew" 
                  class="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm animate-bounce-in"
                >
                  ✨ New Arrival
                </div>
                <div 
                  v-if="product.isBestseller" 
                  class="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm animate-bounce-in animation-delay-100"
                >
                  🔥 Best Seller
                </div>
                <div 
                  v-if="product.isFeatured" 
                  class="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm animate-bounce-in animation-delay-200"
                >
                  ⭐ Featured
                </div>
              </div>
              
              <!-- Fullscreen Button -->
              <button 
                @click="openFullscreen"
                class="absolute top-6 right-6 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 group-hover:opacity-100 opacity-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
                  <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
                  <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
                  <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
                </svg>
              </button>

              <!-- Image Counter -->
              <div v-if="product.images.length > 1" class="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                {{ activeImageIndex + 1 }} / {{ product.images.length }}
              </div>
            </div>
            
            <!-- Navigation Arrows -->
            <button 
              v-if="product.images.length > 1 && activeImageIndex > 0"
              @click="prevImage" 
              class="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <button 
              v-if="product.images.length > 1 && activeImageIndex < product.images.length - 1"
              @click="nextImage" 
              class="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
          
          <!-- Thumbnail Gallery -->
          <div v-if="product.images.length > 1" class="mt-8 animate-fade-in-up animation-delay-300">
            <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              <button 
                v-for="(image, index) in product.images" 
                :key="index"
                @click="activeImageIndex = index"
                class="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                :class="activeImageIndex === index ? 'ring-4 ring-gray-900 scale-105' : 'opacity-70 hover:opacity-100'"
              >
                <img :src="image" :alt="`${product.name} view ${index + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>
        </div>
        
        <!-- Product Details Section -->
        <div class="flex flex-col animate-slide-in-right">
          <!-- Category Badge -->
          <div class="mb-6 animate-fade-in-up">
            <span class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full text-sm font-medium text-gray-700 shadow-sm">
              {{ product.category.name }}
            </span>
          </div>
          
          <!-- Title -->
          <h1 class="text-4xl lg:text-5xl font-light mb-6 text-gray-900 leading-tight animate-fade-in-up animation-delay-100">
            {{ product.name }}
          </h1>
          
          <!-- Rating and Tags -->
          <div class="flex flex-wrap items-center gap-6 mb-8 animate-fade-in-up animation-delay-200">
            <div class="flex items-center">
              <div class="flex text-amber-400 mr-2">
                <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="i <= (product.rating || 5) ? 'fill-amber-400' : 'text-gray-300'">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <span class="text-sm text-gray-600 font-light">({{ product.reviewCount || 127 }} reviews)</span>
            </div>
            
            <div v-if="product.tags && product.tags.length > 0" class="flex flex-wrap gap-2">
              <span 
                v-for="tag in product.tags.slice(0, 3)" 
                :key="tag"
                class="text-xs px-3 py-1 bg-white rounded-full text-gray-600 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
          
          <!-- Dynamic Pricing -->
          <div class="mb-8 bg-gradient-to-r from-white to-gray-50 p-6 rounded-2xl shadow-lg animate-fade-in-up animation-delay-300">
            <div class="flex items-baseline gap-4 mb-3">
              <span class="text-4xl font-light text-gray-900">${{ formatPrice(currentPrice) }}</span>
              <span v-if="selectedSize && selectedSize.price !== product.price" class="text-xl text-gray-400 line-through">
                <!-- ${{ formatPrice(product.price) }} -->
                {{ formatCurrency(product.price, { showSymbol: true }) }}
              </span>
              <span v-if="product.discountPercentage" class="text-sm text-white bg-gradient-to-r from-rose-500 to-pink-500 px-3 py-1 rounded-full animate-pulse">
                -{{ product.discountPercentage }}% OFF
              </span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 rounded-full mr-3" :class="product.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'"></div>
              <p class="text-sm font-medium" :class="product.isAvailable ? 'text-emerald-600' : 'text-rose-600'">
                {{ product.isAvailable ? 'Available Now' : 'Currently Unavailable' }}
              </p>
            </div>
          </div>
          
          <!-- Description -->
          <div class="mb-8 bg-white p-6 rounded-2xl shadow-sm animate-fade-in-up animation-delay-400">
            <p class="text-gray-700 leading-relaxed" v-html="product.description"></p>
          </div>

          <!-- Size Selection -->
          <div v-if="product.sizes && product.sizes.length > 0" class="mb-8 animate-fade-in-up animation-delay-500">
            <label class="block text-lg font-medium text-gray-900 mb-4">Choose Your Size</label>
            <div class="grid gap-4">
              <div 
                v-for="size in product.sizes" 
                :key="size.size"
                @click="selectSize(size)"
                class="border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02]"
                :class="selectedSize?.size === size.size ? 'border-gray-900 bg-gray-50 shadow-lg scale-[1.02]' : 'border-gray-200 hover:border-gray-300'"
              >
                <div class="flex justify-between items-center">
                  <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                      <span class="font-medium text-lg capitalize">{{ size.size }}</span>
                      <span class="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">{{ size.color }}</span>
                      <span v-if="hasInstallmentOption(size)" class="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                        💳 Installments Available
                      </span>
                    </div>
                    <p class="text-sm text-gray-500">{{ getSizeDescription(size.size) }}</p>
                    <div v-if="hasInstallmentOption(size)" class="mt-2 text-xs text-emerald-600">
                      From {{ getInstallmentConfig(size).availableTerms[0] }}-{{ getInstallmentConfig(size).maxInstallments }} months • {{ getInstallmentConfig(size).interestRate }}% APR
                    </div>
                  </div>
                  <div class="text-right">
                    <span class="font-bold text-xl">
                      <!-- ${{ formatPrice(size.price) }} -->
                      {{ formatCurrency(size.price, { showSymbol: true }) }}
                    </span>
                    <div v-if="selectedSize?.size === size.size" class="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center mt-2 ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-white">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quantity and Total -->
          <div class="mb-8 bg-white p-6 rounded-2xl shadow-sm animate-fade-in-up animation-delay-600">
            <div class="flex items-center justify-between mb-4">
              <label class="text-lg font-medium text-gray-900">Quantity</label>
              <div class="text-right">
                <p class="text-sm text-gray-500">Total</p>
                <p class="text-2xl font-bold text-gray-900">
                  <!-- ${{ formatPrice(totalPrice) }} -->
                  {{ formatCurrency(totalPrice, { showSymbol: true }) }}
                </p>
              </div>
            </div>
            
            <div class="flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden w-fit shadow-sm">
              <button 
                @click="decrementQuantity" 
                class="px-6 py-4 text-gray-600 hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50"
                :disabled="quantity <= 1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"/>
                </svg>
              </button>
              <div class="px-8 py-4 border-l border-r border-gray-200 min-w-[80px] text-center font-bold text-lg">
                {{ quantity }}
              </div>
              <button 
                @click="incrementQuantity" 
                class="px-6 py-4 text-gray-600 hover:bg-gray-50 transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 5v14"/>
                  <path d="M5 12h14"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="mb-8 animate-fade-in-up animation-delay-700">
            <div class="flex flex-col gap-4">
              <button 
                @click="addToCart"
                class="w-full px-8 py-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                :disabled="!product.isAvailable || !selectedSize"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                <span class="font-medium">
                  {{ !selectedSize ? 'Select Size First' : product.isAvailable ? 'Add to Cart' : 'Unavailable' }}
                </span>
              </button>
              
              <div class="flex gap-4">
                <button 
                  @click="toggleFavorite"
                  class="flex-1 px-6 py-4 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                  :class="{ 'text-rose-500 border-rose-300 bg-rose-50': isFavorite }"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'fill-rose-500': isFavorite }">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span class="text-sm font-medium">{{ isFavorite ? 'Saved' : 'Save' }}</span>
                </button>
                
                <button 
                  @click="shareProduct"
                  class="flex-1 px-6 py-4 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16,6 12,2 8,6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  <span class="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Information Accordion -->
          <div class="space-y-4 animate-fade-in-up animation-delay-800">
            <!-- Product Info -->
            <div class="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <button 
                @click="toggleAccordion('productInfo')"
                class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
              >
                <span class="font-medium text-gray-900 text-lg">Product Details</span>
                <div class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 transition-all duration-300" :class="{ 'rotate-45 bg-gray-900': openAccordions.productInfo }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'text-white': openAccordions.productInfo }">
                    <path d="M12 5v14"/>
                    <path d="M5 12h14"/>
                  </svg>
                </div>
              </button>
              <transition
                enter-active-class="transition duration-500 ease-out"
                enter-from-class="transform -translate-y-4 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-300 ease-in"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform -translate-y-4 opacity-0"
              >
                <div v-if="openAccordions.productInfo" class="px-6 pb-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div class="pt-4 prose prose-sm max-w-none text-gray-700" v-html="product.productInfo"></div>
                </div>
              </transition>
            </div>

            <!-- Shipping Info -->
            <div class="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <button 
                @click="toggleAccordion('shippingInfo')"
                class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
              >
                <span class="font-medium text-gray-900 text-lg">Shipping & Delivery</span>
                <div class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 transition-all duration-300" :class="{ 'rotate-45 bg-gray-900': openAccordions.shippingInfo }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'text-white': openAccordions.shippingInfo }">
                    <path d="M12 5v14"/>
                    <path d="M5 12h14"/>
                  </svg>
                </div>
              </button>
              <transition
                enter-active-class="transition duration-500 ease-out"
                enter-from-class="transform -translate-y-4 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-300 ease-in"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform -translate-y-4 opacity-0"
              >
                <div v-if="openAccordions.shippingInfo" class="px-6 pb-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div class="pt-4 prose prose-sm max-w-none text-gray-700" v-html="product.shippingInfo"></div>
                </div>
              </transition>
            </div>

            <!-- Return Policy -->
            <div class="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <button 
                @click="toggleAccordion('returnPolicy')"
                class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
              >
                <span class="font-medium text-gray-900 text-lg">Return Policy</span>
                <div class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 transition-all duration-300" :class="{ 'rotate-45 bg-gray-900': openAccordions.returnPolicy }">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'text-white': openAccordions.returnPolicy }">
                    <path d="M12 5v14"/>
                    <path d="M5 12h14"/>
                  </svg>
                </div>
              </button>
              <transition
                enter-active-class="transition duration-500 ease-out"
                enter-from-class="transform -translate-y-4 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-300 ease-in"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform -translate-y-4 opacity-0"
              >
                <div v-if="openAccordions.returnPolicy" class="px-6 pb-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                  <div class="pt-4 prose prose-sm max-w-none text-gray-700" v-html="product.returnPolicy"></div>
                </div>
              </transition>
            </div>
          </div>

          <!-- Trust Badges -->
          <div class="mt-8 space-y-4 animate-fade-in-up animation-delay-1000">
            <div class="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-600">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">Authenticity Guaranteed</h4>
                <p class="text-sm text-gray-600">Certificate of authenticity included</p>
              </div>
            </div>
            
            <div class="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div class="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-gray-900">Secure Packaging</h4>
                <p class="text-sm text-gray-600">Professional handling & shipping</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related Products -->
      <div class="mt-32 animate-fade-in-up">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-light text-gray-900 mb-4">You May Also Like</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"></div>
        </div>
        
        <div v-if="fetchingRelatedProducts" class="flex justify-center py-20">
          <div class="relative">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent absolute top-0 left-0"></div>
          </div>
        </div>
        
        <div v-else-if="relatedProducts.length === 0" class="text-center py-20">
          <p class="text-gray-500 text-lg">No related products found</p>
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div 
            v-for="(relatedProduct, index) in relatedProducts" 
            :key="relatedProduct._id"
            class="group cursor-pointer animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
            @click="viewProduct(relatedProduct)"
          >
            <div class="relative overflow-hidden rounded-2xl bg-white shadow-lg group-hover:shadow-2xl transition-all duration-700">
              <div class="aspect-square overflow-hidden">
                <img 
                  :src="relatedProduct.images[productImageIndices[relatedProduct._id] || 0]" 
                  :alt="relatedProduct.name"
                  class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>
              
              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                <div class="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span class="text-white text-lg font-medium">View Product</span>
                </div>
              </div>
              
              <!-- Badge -->
              <div v-if="relatedProduct.isNew || relatedProduct.isBestseller || relatedProduct.isFeatured" class="absolute top-4 left-4">
                <span v-if="relatedProduct.isNew" class="bg-amber-400 text-white px-3 py-1 rounded-full text-sm font-medium">New</span>
                <span v-else-if="relatedProduct.isBestseller" class="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium">Popular</span>
                <span v-else-if="relatedProduct.isFeatured" class="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">Featured</span>
              </div>
            </div>
            
            <div class="pt-6 text-center">
              <div class="flex items-center justify-center mb-2">
                <span class="text-sm text-gray-500 mr-3">{{ relatedProduct.category?.name || 'Product' }}</span>
                <div class="flex items-center">
                  <span class="text-amber-500 mr-1">★</span>
                  <span class="text-sm text-gray-600">{{ relatedProduct.rating || 5.0 }}</span>
                </div>
              </div>
              <h3 class="font-medium mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">{{ relatedProduct.name }}</h3>
              <div class="flex items-center justify-center gap-3">
                <span class="font-bold text-lg">
                <!-- <span class="font-bold text-lg">
                  ${{ formatPrice(relatedProduct.discountPrice || relatedProduct.price) }} -->
                  {{ formatCurrency(relatedProduct.discountPrice || relatedProduct.price, { showSymbol: true }) }}
                
                </span>
                <span v-if="relatedProduct.discountPrice" class="text-sm text-gray-400 line-through">
                  {{ formatCurrency(relatedProduct.price, { showSymbol: true }) }}
                  <!-- ${{ formatPrice(relatedProduct.price) }} -->
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Fullscreen Modal -->
      <transition
        enter-active-class="transition duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="isFullscreenOpen" 
          class="fixed inset-0 bg-white/95 backdrop-blur-xl z-50 flex items-center justify-center"
          @click="isFullscreenOpen = false"
        >
          <button 
            class="absolute top-8 right-8 text-gray-700 p-3 hover:bg-gray-100 rounded-full transition-all duration-300 transform hover:scale-110 z-10"
            @click="isFullscreenOpen = false"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
          
          <img 
            :src="product.images[activeImageIndex]" 
            :alt="product.name"
            class="max-w-[90vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl transition-all duration-700"
          />
          
          <!-- Image Navigation -->
          <div v-if="product.images.length > 1" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
            <button 
              v-for="(image, index) in product.images" 
              :key="index"
              @click.stop="activeImageIndex = index"
              class="w-4 h-4 rounded-full transition-all duration-300"
              :class="activeImageIndex === index ? 'bg-gray-900 scale-125' : 'bg-gray-400 hover:bg-gray-600'"
            ></button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useFetchProducts } from "@/composables/modules/products/useFetchProducts"
import { useFetchProduct } from "@/composables/modules/products/useFetchProduct"
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useCartStore } from '~/composables/useCartStore'
import { useRoute, useRouter } from 'vue-router'
import { useCurrencyConverter } from "@/composables/useConvertCurrency"
const {
  countryCode,
  currency,
  isLoading,
  error,
  currencyCode,
  currencySymbol,
  currencyName,
  detectCountry,
  formatCurrency,
  setCurrency,
  setCountry,
  getSupportedCurrencies,
  getSupportedCountries
} = useCurrencyConverter()

const fixedInstallmentPayment = ref(50)


// Auto-detect country on mount
onMounted(() => {
  detectCountry()
})

const route = useRoute()
const router = useRouter()
const { addToCart: addItemToCart } = useCartStore()
const { showToast } = useCustomToast();

// Fetch product data
const productId = computed(() => route.params.id as string)
const { product, loading } = useFetchProduct()

// Fetch related products
const { products: allProducts, loading: fetchingProducts } = useFetchProducts()
const fetchingRelatedProducts = computed(() => loading.value || fetchingProducts.value)

// Related products computation
const relatedProducts = computed(() => {
  if (!product.value || !allProducts.value.length) return []
  
  const sameCategory = allProducts.value.filter(p => 
    p._id !== product.value?._id && 
    p.category?._id === product.value?.category?._id
  )
  
  if (sameCategory.length >= 4) {
    return sameCategory.slice(0, 4)
  }
  
  const otherProducts = allProducts.value.filter(p => 
    p._id !== product.value?._id && 
    p.category?._id !== product.value?.category?._id
  )
  
  const shuffled = [...otherProducts].sort(() => 0.5 - Math.random())
  return [...sameCategory, ...shuffled].slice(0, 4)
})

// Product image carousel for related products
const productImageIndices = ref<Record<string, number>>({})
const carouselIntervals = ref<Record<string, number>>({})

// Component state
const activeImageIndex = ref(0)
const quantity = ref(1)
const isFavorite = ref(false)
const isFullscreenOpen = ref(false)
const selectedSize = ref<any>(null)

// Accordion state
const openAccordions = ref({
  productInfo: false,
  returnPolicy: false,
  shippingInfo: false
})

// Computed properties
const currentPrice = computed(() => {
  return selectedSize.value ? selectedSize.value.price : (product.value?.discountPrice || product.value?.price || 0)
})

const totalPrice = computed(() => {
  return currentPrice.value * quantity.value
})

// Methods
const selectSize = (size: any) => {
  selectedSize.value = size
}

const getSizeDescription = (size: string) => {
  const descriptions: Record<string, string> = {
    small: '16" × 20" (40.64cm × 50.80cm)',
    basic: '18" × 24" (45.72cm × 60.96cm)',
    medium: '20" × 28" (50.80cm × 71.12cm)',
    large: '24" × 36" (60.96cm × 91.44cm)'
  }
  return descriptions[size.toLowerCase()] || 'Custom dimensions available'
}

const hasInstallmentOption = (size: any) => {
  return size.installmentConfig && size.installmentConfig.enabled
}

const getInstallmentConfig = (size: any) => {
  return size.installmentConfig || {}
}

const toggleAccordion = (section: keyof typeof openAccordions.value) => {
  if (openAccordions.value[section]) {
    openAccordions.value[section] = false
  } else {
    Object.keys(openAccordions.value).forEach(key => {
      openAccordions.value[key as keyof typeof openAccordions.value] = false
    })
    openAccordions.value[section] = true
  }
}

const prevImage = () => {
  if (activeImageIndex.value > 0) {
    activeImageIndex.value--
  }
}

const nextImage = () => {
  if (product.value && activeImageIndex.value < product.value.images.length - 1) {
    activeImageIndex.value++
  }
}

const viewProduct = (product: any) => {
  router.push(`/artworks/${product._id}`)
}

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  
  showToast({
    title: isFavorite.value ? "Added to Favorites" : "Removed from Favorites",
    message: isFavorite.value ? "Product saved to your favorites" : "Product removed from favorites",
    toastType: isFavorite.value ? "success" : "info",
    duration: 2000
  });
}

const shareProduct = async () => {
  if (navigator.share && product.value) {
    try {
      await navigator.share({
        title: product.value.name,
        text: product.value.description,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Error sharing:', err);
    }
  } else {
    // Fallback to copying URL to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast({
        title: "Link Copied",
        message: "Product link copied to clipboard",
        toastType: "success",
        duration: 2000
      });
    } catch (err) {
      console.log('Error copying to clipboard:', err);
    }
  }
}

const openFullscreen = () => {
  isFullscreenOpen.value = true
}

const addToCart = () => {
  if (product.value && product.value.isAvailable && selectedSize.value) {
    // Enhanced cart item with installment configuration
    const cartItem = {
      id: `${product.value._id}-${selectedSize.value.size}`,
      productId: product.value._id,
      title: product.value.name,
      image: product.value.images[0],
      price: selectedSize.value.price,
      quantity: quantity.value,
      size: selectedSize.value.size,
      color: selectedSize.value.color,
      // Include installment configuration for checkout
      installmentConfig: selectedSize.value.installmentConfig || null,
      hasInstallmentOption: hasInstallmentOption(selectedSize.value),
      // Additional product metadata
      category: product.value.category,
      weight: product.value.weight,
      dimensions: {
        width: product.value.width,
        height: product.value.height,
        length: product.value.length
      }
    }
    
    addItemToCart(cartItem)
    
    showToast({
      title: "Added to Cart",
      message: `${quantity.value} × ${product.value.name} (${selectedSize.value.size}) added to cart`,
      toastType: "success",
      duration: 3000
    });
  }
}

const formatPrice = (price: number) => {
  return price.toFixed(2)
}

// Initialize image carousel for related products
const initializeRelatedProductCarousels = () => {
  allProducts.value.forEach(product => {
    if (!productImageIndices.value[product._id]) {
      productImageIndices.value[product._id] = 0
      
      if (product.images.length > 1) {
        startImageCarousel(product._id, product.images.length)
      }
    }
  })
}

const startImageCarousel = (productId: string, imageCount: number) => {
  if (carouselIntervals.value[productId]) {
    clearInterval(carouselIntervals.value[productId])
  }
  
  carouselIntervals.value[productId] = window.setInterval(() => {
    productImageIndices.value[productId] = (productImageIndices.value[productId] + 1) % imageCount
  }, 4000)
}

const cleanupIntervals = () => {
  Object.values(carouselIntervals.value).forEach(interval => {
    clearInterval(interval)
  })
}

onMounted(() => {
  initializeRelatedProductCarousels()
})

onUnmounted(() => {
  cleanupIntervals()
})

// Watch for product changes to reset selection
watch(() => product.value, (newProduct) => {
  if (newProduct) {
    // Reset selections when product changes
    selectedSize.value = null
    quantity.value = 1
    activeImageIndex.value = 0
  }
}, { immediate: true })

watch(() => allProducts.value, () => {
  initializeRelatedProductCarousels()
})
</script>

<style scoped>
/* Animation Keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Animation Classes */
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-slide-in-left {
  animation: slideInLeft 1s ease-out forwards;
}

.animate-slide-in-right {
  animation: slideInRight 1s ease-out forwards;
}

.animate-bounce-in {
  animation: bounceIn 0.8s ease-out forwards;
}

/* Animation Delays */
.animation-delay-100 { animation-delay: 0.1s; opacity: 0; }
.animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
.animation-delay-300 { animation-delay: 0.3s; opacity: 0; }
.animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
.animation-delay-500 { animation-delay: 0.5s; opacity: 0; }
.animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
.animation-delay-700 { animation-delay: 0.7s; opacity: 0; }
.animation-delay-800 { animation-delay: 0.8s; opacity: 0; }
.animation-delay-900 { animation-delay: 0.9s; opacity: 0; }
.animation-delay-1000 { animation-delay: 1s; opacity: 0; }

/* Custom Scrollbar */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Shadow Utilities */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>