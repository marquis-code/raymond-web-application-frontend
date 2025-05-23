<template>
  <div>
{{course}}
    <div v-if="loading" class="container mx-auto px-4 py-20 flex justify-center items-center">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
    </div>
    
    <div v-else-if="!product" class="container mx-auto px-4 py-20 text-center">
      <h1 class="text-3xl font-bold mb-4">Product Not Found</h1>
      <p class="mb-8">The artwork you're looking for doesn't exist or has been removed.</p>
      <NuxtLink to="/artworks" class="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300">
        Browse All Artworks
      </NuxtLink>
    </div>
    
    
    <div v-else class="container mx-auto px-4 py-12 md:py-20">
      <!-- Breadcrumb -->
      <nav class="mb-8 text-sm" aria-label="Breadcrumb">
        <ol class="flex flex-wrap items-center space-x-2">
          <li>
            <NuxtLink to="/" class="text-gray-500 hover:text-black transition-colors duration-300">Home</NuxtLink>
          </li>
          <li class="flex items-center space-x-2">
            <span class="text-gray-400">/</span>
            <NuxtLink to="/artworks" class="text-gray-500 hover:text-black transition-colors duration-300">Artworks</NuxtLink>
          </li>
          <li class="flex items-center space-x-2">
            <span class="text-gray-400">/</span>
            <NuxtLink 
              :to="`/artworks?category=${product.category._id}`" 
              class="text-gray-500 hover:text-black transition-colors duration-300"
            >
              {{ product.category.name }}
            </NuxtLink>
          </li>
          <li class="flex items-center space-x-2">
            <span class="text-gray-400">/</span>
            <span class="text-black font-medium truncate max-w-[200px]">{{ product.name }}</span>
          </li>
        </ol>
      </nav>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Artwork Images Carousel -->
        <div 
          class="relative"
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }"
        >
          <!-- Main Image -->
          <div class="relative overflow-hidden bg-gray-100 rounded-lg aspect-square">
            <img 
              :src="product.images[activeImageIndex]" 
              :alt="product.name"
              class="w-full h-full object-contain transition-all duration-700"
              :class="{ 'scale-105': isZoomed }"
              @mouseenter="isZoomed = true"
              @mouseleave="isZoomed = false"
            />
            
            <!-- Status Badge -->
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              <div v-if="product.isNew" class="bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                New Arrival
              </div>
              <div v-if="product.isBestseller" class="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Best Seller
              </div>
              <div v-if="product.isFeatured" class="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </div>
            </div>
            
            <!-- Fullscreen View Button -->
            <button 
              @click="openFullscreen"
              class="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-300"
              aria-label="View fullscreen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg>
            </button>
          </div>
          
          <!-- Thumbnail Navigation -->
          <div class="mt-4 flex gap-2 overflow-x-auto pb-2 snap-x">
            <button 
              v-for="(image, index) in product.images" 
              :key="index"
              @click="activeImageIndex = index"
              class="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden snap-start transition-all duration-300"
              :class="activeImageIndex === index ? 'ring-2 ring-black' : 'opacity-70 hover:opacity-100'"
              :aria-label="`View image ${index + 1}`"
            >
              <img :src="image" :alt="`${product.name} thumbnail ${index + 1}`" class="w-full h-full object-cover" />
            </button>
          </div>
          
          <!-- Navigation Arrows -->
          <button 
            v-if="product.images.length > 1"
            @click="prevImage" 
            class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-300"
            :class="{ 'opacity-50 cursor-not-allowed': activeImageIndex === 0 }"
            :disabled="activeImageIndex === 0"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>
          </button>
          
          <button 
            v-if="product.images.length > 1"
            @click="nextImage" 
            class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors duration-300"
            :class="{ 'opacity-50 cursor-not-allowed': activeImageIndex === product.images.length - 1 }"
            :disabled="activeImageIndex === product.images.length - 1"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
          </button>
        </div>
        
        <!-- Artwork Details -->
        <div 
          class="flex flex-col"
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }"
        >
          <div class="mb-2">
            <span class="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full">{{ product.category.name }}</span>
          </div>
          
          <h1 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{{ product.name }}</h1>
          
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <div class="flex items-center">
              <div class="flex text-amber-400">
                <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="i <= (product.rating || 0) ? 'fill-amber-400' : 'text-gray-300'"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <span class="ml-2 text-sm text-gray-600">({{ product.reviewCount || 0 }} reviews)</span>
            </div>
            
            <div v-if="product.tags && product.tags.length > 0" class="flex flex-wrap gap-2">
              <span 
                v-for="tag in product.tags" 
                :key="tag"
                class="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
          
          <div class="mb-6">
            <div class="flex items-baseline gap-3">
              <span class="text-2xl font-bold text-gray-900">${{ formatPrice(product.discountPrice) }}</span>
              <span class="text-lg text-gray-500 line-through">${{ formatPrice(product.price) }}</span>
              <span class="text-sm text-rose-600">-{{ product.discountPercentage }}% off</span>
            </div>
            <p v-if="product.isAvailable" class="text-sm text-emerald-600 mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path></svg>
              In Stock
            </p>
            <p v-else class="text-sm text-rose-600 mt-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
              Out of Stock
            </p>
          </div>
          
          <div class="prose prose-sm mb-8 text-gray-700">
            <p>{{ product.description }}</p>
          </div>
          
          <div class="mb-8">
            <h3 class="text-lg font-semibold mb-3">Artwork Details</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Dimensions</p>
                <p class="text-gray-900">{{ product.width }} × {{ product.height }} inches</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Weight</p>
                <p class="text-gray-900">{{ product.weight }} lbs</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Created</p>
                <p class="text-gray-900">{{ formatDate(product.createdAt) }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Category</p>
                <p class="text-gray-900">{{ product.category.name }}</p>
              </div>
            </div>
          </div>
          
          <!-- Add to Cart Section -->
          <div class="mt-auto">
            <div class="flex flex-col sm:flex-row gap-4 mb-6">
              <div class="flex border border-gray-300 rounded-md">
                <button 
                  @click="decrementQuantity" 
                  class="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-300"
                  :disabled="quantity <= 1"
                  :class="{ 'opacity-50 cursor-not-allowed': quantity <= 1 }"
                  aria-label="Decrease quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path></svg>
                </button>
                <div class="px-4 py-2 border-l border-r border-gray-300 min-w-[50px] text-center">
                  {{ quantity }}
                </div>
                <button 
                  @click="incrementQuantity" 
                  class="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-300"
                  aria-label="Increase quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                </button>
              </div>
              
              <button 
                @click="addToCart"
                class="flex-grow px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
                :disabled="!product.isAvailable"
                :class="{ 'opacity-50 cursor-not-allowed': !product.isAvailable }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                {{ product.isAvailable ? 'Add to Cart' : 'Sold Out' }}
              </button>
              
              <button 
                @click="toggleFavorite"
                class="px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300"
                :class="{ 'text-rose-500 border-rose-300': isFavorite }"
                aria-label="Add to wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{ 'fill-rose-500': isFavorite }"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
            </div>
            
            <!-- Shipping & Returns Info -->
            <div class="border-t border-gray-200 pt-6 space-y-4">
              <div class="flex items-start gap-3">
                <div class="bg-gray-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Secure Payment</h4>
                  <p class="text-sm text-gray-600">We use industry-leading encryption to keep your data safe</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="bg-gray-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"></rect><rect width="4" height="4" x="10" y="10" rx="1"></rect><path d="M4 16h.01"></path><path d="M4 12h.01"></path><path d="M4 8h.01"></path><path d="M8 4v.01"></path><path d="M12 4v.01"></path><path d="M16 4v.01"></path><path d="M20 8h.01"></path><path d="M20 12h.01"></path><path d="M20 16h.01"></path><path d="M16 20v.01"></path><path d="M12 20v.01"></path><path d="M8 20v.01"></path></svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Certificate of Authenticity</h4>
                  <p class="text-sm text-gray-600">Each artwork comes with a certificate of authenticity</p>
                </div>
              </div>
              
              <div class="flex items-start gap-3">
                <div class="bg-gray-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Satisfaction Guaranteed</h4>
                  <p class="text-sm text-gray-600">30-day money-back guarantee if you're not completely satisfied</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related Artworks -->
      <div class="mt-32">
        <h2 class="text-xl font-bold mb-8">You May Also Like</h2>
        
        <div v-if="fetchingRelatedProducts" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
        
        <div v-else-if="relatedProducts.length === 0" class="text-center py-12">
          <p class="text-gray-500">No related products found</p>
        </div>
        
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="relatedProduct in relatedProducts" 
            :key="relatedProduct._id"
            class="bg-white rounded-lg overflow-hidden shadow-md group"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
          >
            <div class="relative overflow-hidden aspect-square">
              <!-- Image carousel -->
              <div class="relative w-full h-full">
                <div 
                  v-for="(image, imageIndex) in relatedProduct.images" 
                  :key="imageIndex"
                  class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                  :class="imageIndex === productImageIndices[relatedProduct._id] ? 'opacity-100' : 'opacity-0'"
                >
                  <img 
                    :src="image" 
                    :alt="relatedProduct.name"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
              
              <!-- Badge -->
              <div class="absolute top-4 left-4 flex flex-col gap-2">
                <div v-if="relatedProduct.isNew" class="bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-medium">
                  New Arrival
                </div>
                <div v-if="relatedProduct.isBestseller" class="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Best Seller
                </div>
                <div v-if="relatedProduct.isFeatured" class="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              </div>
              
              <!-- Quick actions -->
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button 
                  @click="viewProduct(relatedProduct)"
                  class="bg-white text-black rounded-full p-3 hover:bg-gray-100 transition-colors duration-300"
                  aria-label="Quick view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
                <button 
                  @click="addRelatedToCart(relatedProduct)"
                  class="bg-black text-white rounded-full p-3 hover:bg-gray-800 transition-colors duration-300"
                  aria-label="Add to cart"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                </button>
              </div>
            </div>
            
            <div class="p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-500">{{ relatedProduct.category?.name || 'Uncategorized' }}</span>
                <div class="flex items-center">
                  <span class="text-amber-500 mr-1">★</span>
                  <span class="text-sm">{{ relatedProduct.rating || 0 }}</span>
                </div>
              </div>
              <h3 class="font-medium mb-2 truncate">{{ relatedProduct.name }}</h3>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="font-bold">${{ formatPrice(relatedProduct.discountPrice) }}</span>
                  <span class="text-sm text-gray-500 line-through">${{ formatPrice(relatedProduct.price) }}</span>
                </div>
                <span class="text-green-600 text-sm">-{{ relatedProduct.discountPercentage }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Fullscreen Image Modal -->
      <div 
        v-if="isFullscreenOpen" 
        class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        @click="isFullscreenOpen = false"
      >
        <button 
          class="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
          aria-label="Close fullscreen view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
        </button>
        
        <img 
          :src="product.images[activeImageIndex]" 
          :alt="product.name"
          class="max-w-full max-h-[90vh] object-contain"
        />
        
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <button 
            v-for="(image, index) in product.images" 
            :key="index"
            @click.stop="activeImageIndex = index"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="activeImageIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'"
            :aria-label="`View image ${index + 1}`"
          ></button>
        </div>
        
        <!-- Navigation Arrows -->
        <button 
          v-if="product.images.length > 1"
          @click.stop="prevImage" 
          class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors duration-300"
          :class="{ 'opacity-50 cursor-not-allowed': activeImageIndex === 0 }"
          :disabled="activeImageIndex === 0"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="m15 18-6-6 6-6"></path></svg>
        </button>
        
        <button 
          v-if="product.images.length > 1"
          @click.stop="nextImage" 
          class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors duration-300"
          :class="{ 'opacity-50 cursor-not-allowed': activeImageIndex === product.images.length - 1 }"
          :disabled="activeImageIndex === product.images.length - 1"
          aria-label="Next image"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="m9 18 6-6-6-6"></path></svg>
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
            <path   stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="m9 18 6-6-6-6"></path>
          </svg> -->
        </button>
      </div>
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
import { useGetCourseById } from "@/composables/modules/courses/useGetCourseById"
const { loading: fetching, course } = useGetCourseById()

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

// Related products (exclude current product and limit to 4)
const relatedProducts = computed(() => {
  if (!product.value || !allProducts.value.length) return []
  
  // Filter out current product and get products in the same category
  const sameCategory = allProducts.value.filter(p => 
    p._id !== product.value?._id && 
    p.category?._id === product.value?.category?._id
  )
  
  // If we have enough products in the same category, return those
  if (sameCategory.length >= 4) {
    return sameCategory.slice(0, 4)
  }
  
  // Otherwise, add random products from other categories
  const otherProducts = allProducts.value.filter(p => 
    p._id !== product.value?._id && 
    p.category?._id !== product.value?.category?._id
  )
  
  // Shuffle the other products
  const shuffled = [...otherProducts].sort(() => 0.5 - Math.random())
  
  // Combine and limit to 4
  return [...sameCategory, ...shuffled].slice(0, 4)
})

// Product image carousel
const productImageIndices = ref<Record<string, number>>({})
const carouselIntervals = ref<Record<string, number>>({})

// State
const activeImageIndex = ref(0)
const quantity = ref(1)
const isFavorite = ref(false)
const isZoomed = ref(false)
const isFullscreenOpen = ref(false)

// Methods
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
}

const openFullscreen = () => {
  isFullscreenOpen.value = true
}

const addToCart = () => {
  if (product.value && product.value.isAvailable) {
    addItemToCart({
      id: product.value._id,
      title: product.value.name,
      image: product.value.images[0],
      price: product.value.discountPrice || product.value.price,
      quantity: quantity.value
    })
    
    // Show success notification
    // alert(`Added ${quantity.value} ${product.value.name} to cart`)
    showToast({
        title: "Success",
        message: `Added ${quantity.value} ${product.value.name} to cart`,
        toastType: "success",
        duration: 3000
      });
  }
}

const addRelatedToCart = (relatedProduct: any) => {
  addItemToCart({
    id: relatedProduct._id,
    title: relatedProduct.name,
    image: relatedProduct.images[0],
    price: relatedProduct.discountPrice || relatedProduct.price,
    quantity: 1
  })
  
  // Show success notification
  // alert(`Added ${relatedProduct.name} to cart`)
  showToast({
        title: "Success",
        message: `Added ${relatedProduct.name} to cart`,
        toastType: "success",
        duration: 3000
      });
}

const formatPrice = (price: number) => {
  return price.toFixed(2)
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Initialize image carousel for related products
watch(() => allProducts.value, (newProducts) => {
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
onUnmounted(() => {
  Object.values(carouselIntervals.value).forEach(interval => {
    clearInterval(interval)
  })
})
</script>