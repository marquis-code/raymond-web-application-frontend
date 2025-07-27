<template>
  <Teleport to="body">
    <!-- Full Screen Modal -->
    <transition name="modal-fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="isOpen && product" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
        <!-- Modal Container -->
        <div class="h-full w-full flex flex-col bg-white">
          <!-- Header -->
          <div class="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3 flex-1 min-w-0">
                <button
                  @click="onClose"
                  class="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
                <div class="min-w-0 flex-1">
                  <h1 class="text-base font-semibold text-gray-900 truncate">{{ product.name }}</h1>
                </div>
              </div>
              <!-- Image Counter -->
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <span class="text-xs">{{ currentImageIndex + 1 }} / {{ product.images.length }}</span>
              </div>
            </div>
          </div>

          <!-- Content Area -->
          <div class="flex-1 overflow-hidden">
            <!-- Mobile Layout -->
            <div class="lg:hidden h-full overflow-y-auto">
              <div class="pb-6">
                <!-- Image Section -->
                <div class="bg-gray-50 p-4">
                  <div class="aspect-square bg-white rounded-xl shadow-sm overflow-hidden relative">
                    <!-- Main Image -->
                    <div class="absolute inset-0 flex items-center justify-center p-4">
                      <transition-group name="image-fade" tag="div" class="relative w-full h-full">
                        <div
                          v-for="(image, index) in product.images"
                          :key="`image-${index}`"
                          v-show="index === currentImageIndex"
                          class="absolute inset-0 flex items-center justify-center"
                        >
                          <img
                            :src="image"
                            :alt="`${product.name} - view ${index + 1}`"
                            class="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </transition-group>
                    </div>
                    <!-- Navigation Arrows -->
                    <div v-if="product.images.length > 1" class="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                      <button
                        @click="previousImage"
                        class="ml-2 p-2 rounded-full bg-white/90 shadow-md transition-all duration-200 pointer-events-auto"
                        aria-label="Previous image"
                      >
                        <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                      </button>
                      <button
                        @click="nextImage"
                        class="mr-2 p-2 rounded-full bg-white/90 shadow-md transition-all duration-200 pointer-events-auto"
                        aria-label="Next image"
                      >
                        <svg class="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                    <!-- Touch Areas -->
                    <div class="absolute inset-0" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
                      <div class="absolute inset-y-0 left-0 w-1/3" @click="previousImage"></div>
                      <div class="absolute inset-y-0 right-0 w-1/3" @click="nextImage"></div>
                    </div>
                  </div>
                  <!-- Thumbnails -->
                  <div v-if="product.images.length > 1" class="mt-3">
                    <div class="flex space-x-2 overflow-x-auto pb-2">
                      <button
                        v-for="(image, index) in product.images"
                        :key="`thumb-${index}`"
                        @click="setCurrentImage(index)"
                        class="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-200"
                        :class="currentImageIndex === index ? 'border-blue-500 scale-105' : 'border-gray-200'"
                      >
                        <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Product Details -->
                <div class="p-4 space-y-5">
                  <!-- Price -->
                  <div class="animate-item">
                    <div class="flex items-baseline space-x-2">
                      <span class="text-base font-bold text-gray-900">
                        <span v-if="!selectedSize">From {{ convertFromUSD(getMinPrice(product))?.formattedAmount }}</span>
                        <span v-else>{{ convertFromUSD(getSelectedSizePrice())?.formattedAmount }}</span>
                      </span>
                      <span v-if="selectedSize && quantity > 1" class="text-base text-gray-600">
                        × {{ quantity }}
                      </span>
                    </div>
                    <div v-if="selectedSize && quantity > 1" class="text-sm text-gray-600 mt-1">
                      Total: {{ convertFromUSD(getTotalPrice())?.formattedAmount }}
                    </div>
                  </div>

                  <!-- Size Selection -->
                  <div class="animate-item">
                    <h3 class="text-base font-semibold text-gray-900 mb-3">Select Size</h3>
                    <!-- <button @click="openReviewModal">Open review modal</button> -->
                    <div class="grid grid-cols-1 gap-3">
                      <button
                        v-for="size in product.sizes"
                        :key="size._id"
                        @click="selectedSize = size._id"
                        class="relative p-4 border-2 rounded-xl transition-all duration-200"
                        :class="selectedSize === size._id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'"
                      >
                        <div class="flex justify-between items-center">
                          <div class="text-left">
                            <div class="text-sm font-semibold text-gray-900">{{ size.size.toUpperCase() }}</div>
                            <div class="text-xs text-gray-600 mt-1">
                              {{ convertFromUSD(size.price)?.formattedAmount }}
                              <span v-if="hasInstallmentOption(size)" class="text-blue-600">
                                or {{ getInstallmentPayment(size) }}/mo*
                              </span>
                            </div>
                          </div>
                          <div v-if="selectedSize === size._id" class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <!-- Quantity -->
                  <div class="animate-item">
                    <h3 class="text-base font-semibold text-gray-900 mb-3">Quantity</h3>
                    <div class="flex items-center justify-center">
                      <div class="flex items-center bg-gray-100 rounded-xl p-1">
                        <button
                          @click="decrementQuantity"
                          :disabled="quantity <= 1"
                          class="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                          </svg>
                        </button>
                        <div class="w-16 text-center font-bold text-base text-gray-900">{{ quantity }}</div>
                        <button
                          @click="incrementQuantity"
                          class="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Add to Cart -->
                  <div class="animate-item">
                    <button
                      @click="handleAddToCart"
                      :disabled="!selectedSize"
                      class="w-full bg-blue-600 text-sm hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
                    >
                      <span v-if="!selectedSize">Select Size to Continue</span>
                      <span v-else>Add to Cart • {{ convertFromUSD(getTotalPrice())?.formattedAmount }}</span>
                    </button>
                  </div>

                  <!-- Reviews Section -->
                  <div class="animate-item">
                    <div class="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        @click="toggleSection('reviews')"
                        class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div class="flex items-center space-x-3">
                          <h3 class="text-base font-semibold text-gray-900">Customer Reviews</h3>
                          <div v-if="product.reviewCount > 0" class="flex items-center space-x-1">
                            <div class="flex items-center">
                              <svg
                                v-for="star in 5"
                                :key="star"
                                class="w-4 h-4"
                                :class="star <= Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            </div>
                            <span class="text-sm text-gray-600">({{ product.reviewCount }})</span>
                          </div>
                        </div>
                        <svg
                          class="w-5 h-5 text-gray-500 transition-transform duration-200"
                          :class="{ 'rotate-180': expandedSections.reviews }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div
                        class="overflow-hidden transition-all duration-300"
                        :class="expandedSections.reviews ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
                      >
                        <div class="px-4 pb-4">
                          <!-- Reviews List -->
                          <div v-if="productReviews.length > 0" class="space-y-4">
                            <div
                              v-for="review in productReviews.slice(0, 3)"
                              :key="review.id"
                              class="border-b border-gray-100 pb-4 last:border-b-0"
                            >
                              <div class="flex items-start justify-between mb-2">
                                <div class="flex items-center space-x-2">
                                  <div class="flex items-center">
                                    <svg
                                      v-for="star in 5"
                                      :key="star"
                                      class="w-4 h-4"
                                      :class="star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                  </div>
                                  <span class="text-sm font-medium text-gray-900">{{ review.userName.split('@')[0] }}</span>
                                </div>
                                <span class="text-xs text-gray-500">{{ formatDate(review.createdAt) }}</span>
                              </div>
                              <p class="text-sm text-gray-700 leading-relaxed">{{ review.comment }}</p>
                            </div>
                            <div v-if="productReviews.length > 3" class="text-center">
                              <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                View all {{ productReviews.length }} reviews
                              </button>
                            </div>
                          </div>
                          <!-- Empty State -->
                          <div v-else class="text-center py-8">
                            <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                              </svg>
                            </div>
                            <h4 class="text-base font-medium text-gray-900 mb-2">No reviews yet</h4>
                            <p class="text-sm text-gray-600 mb-4">Be the first to share your thoughts about this product.</p>
                            <button
                              @click="openReviewModal"
                              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Write a Review
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Product Info Accordions -->
                  <div class="space-y-3 animate-item">
                    <div v-if="product.productInfo" class="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        @click="toggleSection('productInfo')"
                        class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      >
                        <h3 class="text-base font-semibold text-gray-900">Product Details</h3>
                        <svg
                          class="w-5 h-5 text-gray-500 transition-transform duration-200"
                          :class="{ 'rotate-180': expandedSections.productInfo }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div
                        class="overflow-hidden transition-all duration-300"
                        :class="expandedSections.productInfo ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'"
                      >
                        <div class="px-4 pb-4">
                          <div class="text-sm text-gray-700 leading-relaxed" v-html="product.productInfo"></div>
                        </div>
                      </div>
                    </div>
                    <div v-if="product.shippingInfo" class="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        @click="toggleSection('shippingInfo')"
                        class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      >
                        <h3 class="text-base font-semibold text-gray-900">Shipping Information</h3>
                        <svg
                          class="w-5 h-5 text-gray-500 transition-transform duration-200"
                          :class="{ 'rotate-180': expandedSections.shippingInfo }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div
                        class="overflow-hidden transition-all duration-300"
                        :class="expandedSections.shippingInfo ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'"
                      >
                        <div class="px-4 pb-4">
                          <div class="text-sm text-gray-700 leading-relaxed" v-html="product.shippingInfo"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop Layout -->
            <div class="hidden lg:flex h-full">
              <!-- Image Section -->
              <div class="flex-[2] bg-gray-50 relative">
                <div class="absolute inset-0 flex items-center justify-center p-6">
                  <div class="relative w-full h-full max-w-3xl">
                    <div class="relative w-full h-full bg-white rounded-2xl shadow-lg overflow-hidden">
                      <transition-group name="image-fade" tag="div" class="relative w-full h-full">
                        <div
                          v-for="(image, index) in product.images"
                          :key="`desktop-image-${index}`"
                          v-show="index === currentImageIndex"
                          class="absolute inset-0 flex items-center justify-center p-8"
                        >
                          <img
                            :src="image"
                            :alt="`${product.name} - view ${index + 1}`"
                            class="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </transition-group>
                    </div>
                    <!-- Desktop Navigation -->
                    <div v-if="product.images.length > 1" class="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                      <button
                        @click="previousImage"
                        class="ml-4 p-3 rounded-full bg-white/90 shadow-lg transition-all duration-200 pointer-events-auto hover:scale-110"
                      >
                        <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                      </button>
                      <button
                        @click="nextImage"
                        class="mr-4 p-3 rounded-full bg-white/90 shadow-lg transition-all duration-200 pointer-events-auto hover:scale-110"
                      >
                        <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <!-- Desktop Thumbnails -->
                <div v-if="product.images.length > 1" class="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div class="flex space-x-3 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
                    <button
                      v-for="(image, index) in product.images"
                      :key="`desktop-thumb-${index}`"
                      @click="setCurrentImage(index)"
                      class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200"
                      :class="currentImageIndex === index ? 'border-blue-500 scale-110' : 'border-gray-200 hover:border-gray-300'"
                    >
                      <img :src="image" :alt="`Thumbnail ${index + 1}`" class="w-full h-full object-cover" />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Details Section -->
              <div class="w-96 bg-white border-l border-gray-200 overflow-y-auto">
                <div class="p-6 space-y-6">
                  <!-- Price -->
                  <div class="animate-item">
                    <div class="flex items-baseline space-x-3">
                      <span class="text-2xl font-bold text-gray-900">
                        <span v-if="!selectedSize">From {{ convertFromUSD(getMinPrice(product))?.formattedAmount }}</span>
                        <span v-else>{{ convertFromUSD(getSelectedSizePrice())?.formattedAmount }}</span>
                      </span>
                      <span v-if="selectedSize && quantity > 1" class="text-base text-gray-600">
                        × {{ quantity }}
                      </span>
                    </div>
                    <div v-if="selectedSize && quantity > 1" class="text-base text-gray-600 mt-2">
                      Total: {{ convertFromUSD(getTotalPrice())?.formattedAmount }}
                    </div>
                  </div>

                  <!-- Size Selection -->
                  <div class="animate-item">
                    <h3 class="text-base font-semibold text-gray-900 mb-4">Select Size</h3>
                    <div class="grid grid-cols-1 gap-3">
                      <button
                        v-for="size in product.sizes"
                        :key="size._id"
                        @click="selectedSize = size._id"
                        class="relative p-4 border-2 rounded-xl transition-all duration-200"
                        :class="selectedSize === size._id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-gray-300'"
                      >
                        <div class="flex justify-between items-center">
                          <div class="text-left">
                            <div class="text-sm font-semibold text-gray-900">{{ size.size.toUpperCase() }}</div>
                            <div class="text-sm text-gray-600 mt-1">
                              {{ convertFromUSD(size.price)?.formattedAmount }}
                              <span v-if="hasInstallmentOption(size)" class="text-blue-600">
                                or {{ getInstallmentPayment(size) }}/mo*
                              </span>
                            </div>
                          </div>
                          <div v-if="selectedSize === size._id" class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                            </svg>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <!-- Quantity -->
                  <div class="animate-item">
                    <h3 class="text-base font-semibold text-gray-900 mb-4">Quantity</h3>
                    <div class="flex items-center justify-center">
                      <div class="flex items-center bg-gray-100 rounded-xl p-1">
                        <button
                          @click="decrementQuantity"
                          :disabled="quantity <= 1"
                          class="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center disabled:opacity-50 hover:bg-gray-50 transition-colors"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                          </svg>
                        </button>
                        <div class="w-20 text-center font-bold text-base text-gray-900">{{ quantity }}</div>
                        <button
                          @click="incrementQuantity"
                          class="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Add to Cart -->
                  <div class="animate-item">
                    <button
                      @click="handleAddToCart"
                      :disabled="!selectedSize"
                      class="w-full bg-blue-600 text-sm hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
                    >
                      <span v-if="!selectedSize">Select Size to Continue</span>
                      <span v-else>Add to Cart • {{ convertFromUSD(getTotalPrice())?.formattedAmount }}</span>
                    </button>
                  </div>

                  <!-- Reviews Section -->
                  <div class="animate-item">
                    <div class="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        @click="toggleSection('reviews')"
                        class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div class="flex items-center space-x-3">
                          <h3 class="text-base font-semibold text-gray-900">Customer Reviews</h3>
                          <div v-if="product.reviewCount > 0" class="flex items-center space-x-1">
                            <div class="flex items-center">
                              <svg
                                v-for="star in 5"
                                :key="star"
                                class="w-4 h-4"
                                :class="star <= Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                            </div>
                            <span class="text-sm text-gray-600">({{ product.reviewCount }})</span>
                          </div>
                        </div>
                        <svg
                          class="w-5 h-5 text-gray-500 transition-transform duration-200"
                          :class="{ 'rotate-180': expandedSections.reviews }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div
                        class="overflow-hidden transition-all duration-300"
                        :class="expandedSections.reviews ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
                      >
                        <div class="px-4 pb-4">
                          <!-- Reviews List -->
                          <div v-if="productReviews.length > 0" class="space-y-4">
                            <div
                              v-for="review in productReviews.slice(0, 3)"
                              :key="review.id"
                              class="border-b border-gray-100 pb-4 last:border-b-0"
                            >
                              <div class="flex items-start justify-between mb-2">
                                <div class="flex items-center space-x-2">
                                  <div class="flex items-center">
                                    <svg
                                      v-for="star in 5"
                                      :key="star"
                                      class="w-4 h-4"
                                      :class="star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                  </div>
                                  <span class="text-sm font-medium text-gray-900">{{ review.userName.split('@')[0] }}</span>
                                </div>
                                <span class="text-xs text-gray-500">{{ formatDate(review.createdAt) }}</span>
                              </div>
                              <p class="text-sm text-gray-700 leading-relaxed">{{ review.comment }}</p>
                            </div>
                            <div v-if="productReviews.length > 3" class="text-center">
                              <button class="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                View all {{ productReviews.length }} reviews
                              </button>
                            </div>
                          </div>
                          <!-- Empty State -->
                          <div v-else class="text-center py-8">
                            <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                              </svg>
                            </div>
                            <h4 class="text-base font-medium text-gray-900 mb-2">No reviews yet</h4>
                            <p class="text-sm text-gray-600 mb-4">Be the first to share your thoughts about this product.</p>
                            <button
                              @click="openReviewModal"
                              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Write a Review
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Product Info -->
                  <div class="space-y-4 animate-item">
                    <div v-if="product.productInfo" class="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        @click="toggleSection('productInfo')"
                        class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      >
                        <h3 class="text-base font-semibold text-gray-900">Product Details</h3>
                        <svg
                          class="w-5 h-5 text-gray-500 transition-transform duration-200"
                          :class="{ 'rotate-180': expandedSections.productInfo }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div
                        class="overflow-hidden transition-all duration-300"
                        :class="expandedSections.productInfo ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'"
                      >
                        <div class="px-4 pb-4">
                          <div class="text-sm text-gray-700 leading-relaxed" v-html="product.productInfo"></div>
                        </div>
                      </div>
                    </div>
                    <div v-if="product.shippingInfo" class="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        @click="toggleSection('shippingInfo')"
                        class="flex justify-between items-center w-full text-left p-4 hover:bg-gray-50 transition-colors"
                      >
                        <h3 class="text-base font-semibold text-gray-900">Shipping Information</h3>
                        <svg
                          class="w-5 h-5 text-gray-500 transition-transform duration-200"
                          :class="{ 'rotate-180': expandedSections.shippingInfo }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <div
                        class="overflow-hidden transition-all duration-300"
                        :class="expandedSections.shippingInfo ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'"
                      >
                        <div class="px-4 pb-4">
                          <div class="text-sm text-gray-700 leading-relaxed" v-html="product.shippingInfo"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Fixed Review Button -->
    <transition name="review-button-fade">
      <div
        v-if="isOpen && product"
        class="fixed bottom-6 right-6 z-50"
      >
        <button
          @click="showReviewModal = true"
          class="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce-slow"
        >
          <svg class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
          </svg>
          <div class="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </button>
        <div class="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Write a Review
        </div>
      </div>
    </transition>

    <!-- Review Modal -->
    <transition name="review-modal-fade">
      <div v-if="showReviewModal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300">
          <!-- Review Modal Header -->
          <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-900">Write a Review</h2>
            <button
              @click="closeReviewModal"
              class="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close review modal"
            >
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Review Form -->
          <div class="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            <form @submit.prevent="submitReview" class="space-y-6">
              <!-- Name and Email -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Name* <span class="text-gray-500">(this appears publicly)</span>
                  </label>
                  <input
                    v-model="reviewForm.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Email* <span class="text-gray-500">(this will be kept private)</span>
                  </label>
                  <input
                    v-model="reviewForm.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <!-- Rating -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Add a rating*</label>
                <div class="flex items-center space-x-1">
                  <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    @click="setRating(star)"
                    @mouseover="hoverRating = star"
                    @mouseleave="hoverRating = 0"
                    class="p-1 transition-transform duration-200 hover:scale-110"
                  >
                    <svg
                      class="w-8 h-8 transition-colors duration-200"
                      :class="star <= (hoverRating || reviewForm.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Review Title -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Review title*</label>
                <input
                  v-model="reviewForm.title"
                  type="text"
                  required
                  maxlength="100"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Give your review a title"
                />
                <div class="text-right text-xs text-gray-500 mt-1">{{ reviewForm.title.length }}/100</div>
              </div>

              <!-- Review Text -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Review*</label>
                <textarea
                  v-model="reviewForm.comment"
                  required
                  rows="6"
                  maxlength="500"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Share your thoughts about this product..."
                ></textarea>
                <div class="text-right text-xs text-gray-500 mt-1">{{ reviewForm.comment.length }}/500</div>
              </div>

              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">
                  Add images & videos ({{ uploadedImages.length }}/3)
                </label>
                <div
                  @click="triggerFileUpload"
                  @dragover.prevent
                  @drop.prevent="handleFileDrop"
                  class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
                >
                  <div class="w-12 h-12 mx-auto mb-4 text-gray-400">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </div>
                  <p class="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input
                ref="fileInput"
    type="file"
    multiple
    accept="image/*,video/*"
    @change="handleFileSelect"
    class="hidden"
    :disabled="uploadingFile"
                />

                      <!-- Success Indicator -->

                            <!-- Loading Overlay -->

                
                <!-- Uploaded Images Preview -->
                <div v-if="uploadedImages.length > 0" class="mt-4 grid grid-cols-3 gap-3">
    <div
      v-for="(image, index) in uploadedImages"
      :key="index"
      class="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
    >
      <!-- Image Preview -->
      <img :src="image.preview" :alt="`Upload ${index + 1}`" class="w-full h-full object-cover" />
      
      <!-- Loading Overlay -->
      <div 
        v-if="image.uploading"
        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="text-white text-center">
          <svg class="animate-spin w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-xs">Uploading...</span>
        </div>
      </div>

      <!-- Success Indicator -->
      <div 
        v-if="image.uploaded"
        class="absolute top-2 left-2 p-1 bg-green-500 text-white rounded-full"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      
      <!-- Remove Button -->
      <button
        @click="removeImage(index)"
        :disabled="image.uploading"
        class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
                <!-- <div v-if="uploadedImages.length > 0" class="mt-4 grid grid-cols-3 gap-3">
                  <div
                    v-for="(image, index) in uploadedImages"
                    :key="index"
                    class="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <img :src="image.preview" :alt="`Upload ${index + 1}`" class="w-full h-full object-cover" />
                    <button
                      @click="removeImage(index)"
                      :disabled="image.uploading"
                      class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div> -->
              </div>

              <!-- Form Actions -->
              <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  @click="closeReviewModal"
                  class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                 :disabled="!isReviewFormValid || isSubmittingReview || uploadingFile || uploadingFiles.size > 0"
                  class="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                >
                  <span v-if="isSubmittingReview">
                    <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  <span>
                    {{ 
                      uploadingFile || uploadingFiles.size > 0 
                        ? 'Uploading files...' 
                        : isSubmittingReview 
                          ? 'Publishing...' 
                          : 'Publish' 
                    }}
                  </span>
                  <!-- <span>{{ isSubmittingReview ? 'Publishing...' : 'Publish' }}</span> -->
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>

    <!-- Payment Modal -->
    <PaymentSelectionModal
      :is-open="showPaymentModal"
      :cart-item="pendingCartItem"
      :on-close="closePaymentModal"
      :on-proceed="handlePaymentSelection"
    />

  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useFetchProduct } from "@/composables/modules/products/useFetchProduct"
import { useCartStore } from '@/composables/useCartStore'
import { useCustomToast } from '@/composables/core/useCustomToast'
import PaymentSelectionModal from './PaymentSelectionModal.vue'
import { useCurrencyConverter } from "@/composables/core/useCurrencyConverter"
import { useSingleUploadFile  } from "@/composables/core/useSingleUpload"


const { singleUploadFile, loading: uploadingFile, uploadResponse } = useSingleUploadFile()

// Types
interface ProductSize {
  _id: string
  size: string
  price: number
  color?: string
  installmentConfig?: {
    enabled: boolean
    maxInstallments: number
    interestRate: number
    minimumAmount: number
    availableTerms: number[]
    minimumDownPaymentPercentage: number
    maximumDownPaymentPercentage: number
  } | null
}

interface Product {
  _id: string
  name: string
  images: string[]
  category?: string
  price?: number
  sizes: ProductSize[]
  productInfo?: string
  shippingInfo?: string
  weight?: number
  width?: number
  height?: number
  length?: number
  rating: number
  reviewCount: number
  reviews: ProductReview[]
}

interface ProductReview {
  _id: string
  productId: {
    _id: string
    name: string
    discountPercentage: number
    id: string
  }
  userId: string
  userName: string
  userRole: string
  rating: number
  comment: string
  status: string
  createdAt: string
  updatedAt: string
  id: string
}

interface CartItem {
  id: string
  productId: string
  title: string
  image: string
  price: number
  quantity: number
  size: string
  color?: string
  installmentConfig: any | null
  hasInstallmentOption: boolean
  category?: string
  weight?: number
  dimensions: {
    width?: number
    height?: number
    length?: number
  }
}

interface Props {
  isOpen: boolean
  productId: string | null
  onClose: () => void
  onAddToCart?: (item: CartItem) => void
}

const props = defineProps<Props>()

// Composables
const {
  initializeUserCurrency,
  convertFromUSD,
} = useCurrencyConverter()
const { product, loading, fetchProduct } = useFetchProduct()
const { addToCart: addItemToCart } = useCartStore()
const { showToast } = useCustomToast()

// State
const selectedSize = ref('')
const quantity = ref(1)
const currentImageIndex = ref(0)
const showPaymentModal = ref(false)
const pendingCartItem = ref<CartItem | null>(null)
const isTransitioning = ref(false)
const touchStartX = ref(0)
const touchEndX = ref(0)
const expandedSections = reactive({
  productInfo: false,
  shippingInfo: false,
  reviews: false
})
// Add loading state for individual files
const uploadingFiles = ref<Set<number>>(new Set())

// Review Modal State
const showReviewModal = ref(false)
const isSubmittingReview = ref(false)
const hoverRating = ref(0)
const fileInput = ref<HTMLInputElement | null>(null)
const uploadedImages = ref<Array<{ file: File; preview: string }>>([])

// Review Form
const reviewForm = reactive({
  name: '',
  email: '',
  rating: 0,
  title: '',
  comment: ''
})

// Mock reviews data (replace with actual API call)
const productReviews = ref<ProductReview[]>([
  {
    _id: "687c9c3451b23dd3ffac0078",
    productId: {
      _id: "684aa2c2a1708d756091adbe",
      name: "Fort Bragg CA 1",
      discountPercentage: 0,
      id: "684aa2c2a1708d756091adbe"
    },
    userId: "67fa8e31b42b0ed1af9e1a0f",
    userName: "raymond@gmail.com",
    userRole: "admin",
    rating: 5,
    comment: "Absolutely breathtaking. The colours and detail are so vivid, it feels alive on my wall.",
    status: "approved",
    createdAt: "2025-07-20T07:35:16.629Z",
    updatedAt: "2025-07-20T07:35:16.629Z",
    id: "687c9c3451b23dd3ffac0078"
  }
])

// Computed
const isReviewFormValid = computed(() => {
  return reviewForm.name.trim() !== '' &&
         reviewForm.email.trim() !== '' &&
         reviewForm.rating > 0 &&
         reviewForm.title.trim() !== '' &&
         reviewForm.comment.trim() !== ''
})

// Lifecycle
onMounted(async () => {
  await initializeUserCurrency()
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

// Methods
const handleKeyDown = (event: KeyboardEvent) => {
  if (!props.isOpen) return
  if (event.key === 'Escape') {
    if (showReviewModal.value) {
      closeReviewModal()
    } else {
      props.onClose()
    }
  } else if (event.key === 'ArrowRight') {
    nextImage()
  } else if (event.key === 'ArrowLeft') {
    previousImage()
  }
}

const handleTouchStart = (event: TouchEvent) => {
  touchStartX.value = event.changedTouches[0].screenX
}

const handleTouchEnd = (event: TouchEvent) => {
  touchEndX.value = event.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  const swipeThreshold = 50
  const diff = touchStartX.value - touchEndX.value
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextImage()
    } else {
      previousImage()
    }
  }
}

const getMinPrice = (product: Product) => {
  if (product.sizes && product.sizes.length > 0) {
    return Math.min(...product.sizes.map((size: ProductSize) => size.price))
  }
  return product.price || 0
}

const getSelectedSizePrice = () => {
  if (!product.value || !selectedSize.value) return 0
  const size = product.value.sizes.find((s: ProductSize) => s._id === selectedSize.value)
  return size ? size.price : getMinPrice(product.value)
}

const getTotalPrice = () => {
  return getSelectedSizePrice() * quantity.value
}

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const setCurrentImage = (index: number) => {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentImageIndex.value = index
  setTimeout(() => {
    isTransitioning.value = false
  }, 300)
}

const nextImage = () => {
  if (product.value && product.value.images.length > 1 && !isTransitioning.value) {
    setCurrentImage((currentImageIndex.value + 1) % product.value.images.length)
  }
}

const previousImage = () => {
  if (product.value && product.value.images.length > 1 && !isTransitioning.value) {
    setCurrentImage(currentImageIndex.value === 0 ? product.value.images.length - 1 : currentImageIndex.value - 1)
  }
}

const toggleSection = (section: keyof typeof expandedSections) => {
  // Close all sections first
  Object.keys(expandedSections).forEach(key => {
    expandedSections[key as keyof typeof expandedSections] = false
  })
  // Then open the selected section
  expandedSections[section] = true
}

const hasInstallmentOption = (size: ProductSize) => {
  return size.installmentConfig &&
         size.installmentConfig.enabled &&
         size.price >= (size.installmentConfig.minimumAmount || 0)
}

// New function to calculate installment payment for each size
const getInstallmentPayment = (size: ProductSize) => {
  if (!hasInstallmentOption(size) || !size.installmentConfig) {
    return '0'
  }
  const config = size.installmentConfig
  const price = size.price
  // Use the minimum available term for calculation
  const term = Math.min(...config.availableTerms)
  // Calculate monthly payment with interest
  const monthlyInterestRate = (config.interestRate / 100) / 12
  let monthlyPayment
  if (monthlyInterestRate > 0) {
    // Calculate with compound interest
    monthlyPayment = (price * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term)) /
                     (Math.pow(1 + monthlyInterestRate, term) - 1)
  } else {
    // Simple division if no interest
    monthlyPayment = price / term
  }
  // Convert from USD to user's currency
  const converted = convertFromUSD(monthlyPayment)
  return converted.formattedAmount || Math.round(monthlyPayment).toString()
}

const handleAddToCart = () => {
  try {
    if (!product.value || !selectedSize.value) {
      showToast({
        title: "Selection Required",
        message: "Please select a size before adding to cart",
        toastType: "warning",
        duration: 3000
      })
      return
    }

    const size = product.value.sizes.find((s: ProductSize) => s._id === selectedSize.value)
    if (!size) {
      showToast({
        title: "Invalid Selection",
        message: "Selected size is not available",
        toastType: "error",
        duration: 3000
      })
      return
    }

    const cartItem: CartItem = {
      id: `${product.value._id}-${size.size}-${Date.now()}`,
      productId: product.value._id,
      title: product.value.name,
      image: product.value.images?.[0] || '/placeholder.svg?height=300&width=300',
      price: size.price,
      quantity: quantity.value,
      size: size.size,
      color: size.color,
      installmentConfig: size.installmentConfig || null,
      hasInstallmentOption: hasInstallmentOption(size),
      category: product.value.category,
      weight: product.value.weight,
      dimensions: {
        width: product.value.width,
        height: product.value.height,
        length: product.value.length
      }
    }

    pendingCartItem.value = cartItem
    showPaymentModal.value = true
  } catch (error) {
    console.error('Error adding to cart:', error)
    showToast({
      title: "Error",
      message: "Failed to add item to cart. Please try again.",
      toastType: "error",
      duration: 3000
    })
  }
}

const closePaymentModal = () => {
  showPaymentModal.value = false
  pendingCartItem.value = null
}

const handlePaymentSelection = (paymentType: string, cartItem: CartItem) => {
  addItemToCart(cartItem)
  showToast({
    title: "Added to Cart",
    message: `${cartItem.quantity} × ${cartItem.title} (${cartItem.size}) added to cart`,
    toastType: "success",
    duration: 3000
  })
  closePaymentModal()
  props.onClose()
  if (props.onAddToCart) {
    props.onAddToCart(cartItem)
  }
}

// Review Modal Methods
const openReviewModal = () => {
  console.log('clicked again')
  showReviewModal.value = true
  // Reset form
  Object.assign(reviewForm, {
    name: '',
    email: '',
    rating: 0,
    title: '',
    comment: ''
  })
  uploadedImages.value = []
  hoverRating.value = 0
}

const closeReviewModal = () => {
  showReviewModal.value = false
  isSubmittingReview.value = false
}

const setRating = (rating: number) => {
  reviewForm.rating = rating
}

const triggerFileUpload = () => {
  if (uploadedImages.value.length < 3) {
    fileInput.value?.click()
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    handleFiles(Array.from(target.files))
  }
}

const handleFileDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files) {
    handleFiles(Array.from(event.dataTransfer.files))
  }
}

// const handleFiles = (files: File[]) => {
//   const remainingSlots = 3 - uploadedImages.value.length
//   const filesToProcess = files.slice(0, remainingSlots)

//   filesToProcess.forEach(file => {
//     if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         uploadedImages.value.push({
//           file,
//           preview: e.target?.result as string
//         })
//       }
//       reader.readAsDataURL(file)
//     }
//   })
// }

const handleFiles = async (files: File[]) => {
  const remainingSlots = 3 - uploadedImages.value.length
  const filesToProcess = files.slice(0, remainingSlots)

  for (const file of filesToProcess) {
    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      // Create preview immediately
      const reader = new FileReader()
      reader.onload = (e) => {
        const tempIndex = uploadedImages.value.length
        uploadedImages.value.push({
          file,
          preview: e.target?.result as string,
          uploading: true,
          uploaded: false,
          uploadUrl: null
        })
        
        // Start upload process
        uploadFile(file, tempIndex)
      }
      reader.readAsDataURL(file)
    }
  }
}

const uploadFile = async (file: File, index: number) => {
  try {
    uploadingFiles.value.add(index)
    
    // Upload file using the composable
    await singleUploadFile(file)
    
    // Update the uploaded image with the response
    if (uploadResponse.value) {
      uploadedImages.value[index] = {
        ...uploadedImages.value[index],
        uploading: false,
        uploaded: true,
        uploadUrl: uploadResponse.value.url || uploadResponse.value // Adjust based on your response structure
      }
    }
  } catch (error) {
    console.error('Upload failed:', error)
    // Remove the failed upload
    uploadedImages.value.splice(index, 1)
    // You might want to show a toast notification here
  } finally {
    uploadingFiles.value.delete(index)
  }
}

const removeImage = (index: number) => {
  uploadedImages.value.splice(index, 1)
}

const submitReview = async () => {
  if (!isReviewFormValid.value || !product.value) return

  isSubmittingReview.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    const newReview: ProductReview = {
      _id: Date.now().toString(),
      productId: {
        _id: product.value._id,
        name: product.value.name,
        discountPercentage: 0,
        id: product.value._id
      },
      userId: 'current-user-id',
      userName: reviewForm.email,
      userRole: 'customer',
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      id: Date.now().toString()
    }

    // Add to reviews list (in real app, this would be handled by API response)
    productReviews.value.unshift(newReview)

    showToast({
      title: "Review Submitted",
      message: "Thank you for your review! It will be published after moderation.",
      toastType: "success",
      duration: 4000
    })

    closeReviewModal()
  } catch (error) {
    console.error('Error submitting review:', error)
    showToast({
      title: "Error",
      message: "Failed to submit review. Please try again.",
      toastType: "error",
      duration: 3000
    })
  } finally {
    isSubmittingReview.value = false
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Animation hooks
const beforeEnter = (el: HTMLElement) => {
  document.body.style.overflow = 'hidden'
  el.style.opacity = '0'
}

const enter = (el: HTMLElement, done: () => void) => {
  el.offsetHeight
  el.style.transition = 'opacity 0.3s ease-out'
  el.style.opacity = '1'

  const animateItems = el.querySelectorAll('.animate-item')
  animateItems.forEach((item, index) => {
    const element = item as HTMLElement
    element.style.opacity = '0'
    element.style.transform = 'translateY(20px)'
    element.style.transition = 'all 0.5s ease-out'
    element.style.transitionDelay = `${index * 0.1}s`

    setTimeout(() => {
      element.style.opacity = '1'
      element.style.transform = 'translateY(0)'
    }, 100)
  })

  setTimeout(done, 300)
}

const leave = (el: HTMLElement, done: () => void) => {
  el.style.transition = 'opacity 0.2s ease-in'
  el.style.opacity = '0'
  setTimeout(() => {
    document.body.style.overflow = ''
    done()
  }, 200)
}

// Watchers
watch(() => props.productId, (newProductId) => {
  if (newProductId && props.isOpen) {
    fetchProduct(newProductId)
    selectedSize.value = ''
    quantity.value = 1
    currentImageIndex.value = 0
    Object.keys(expandedSections).forEach(key => {
      expandedSections[key as keyof typeof expandedSections] = false
    })
  }
}, { immediate: true })

watch(() => props.isOpen, (isOpen) => {
  if (!isOpen) {
    selectedSize.value = ''
    quantity.value = 1
    currentImageIndex.value = 0
    showPaymentModal.value = false
    pendingCartItem.value = null
    showReviewModal.value = false
    Object.keys(expandedSections).forEach(key => {
      expandedSections[key as keyof typeof expandedSections] = false
    })
  }
})
</script>

<style scoped>
.modal-fade-enter-active {
  transition: all 0.3s ease-out;
}

.modal-fade-leave-active {
  transition: all 0.2s ease-in;
}

.modal-fade-enter-from {
  opacity: 0;
}

.modal-fade-leave-to {
  opacity: 0;
}

.image-fade-enter-active {
  transition: all 0.4s ease-out;
}

.image-fade-leave-active {
  transition: all 0.4s ease-out;
}

.image-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.image-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.review-button-fade-enter-active {
  transition: all 0.5s ease-out;
}

.review-button-fade-leave-active {
  transition: all 0.3s ease-in;
}

.review-button-fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.review-button-fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.review-modal-fade-enter-active {
  transition: all 0.3s ease-out;
}

.review-modal-fade-leave-active {
  transition: all 0.2s ease-in;
}

.review-modal-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.review-modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.animate-bounce-slow {
  animation: bounce-slow 3s infinite;
}

@keyframes bounce-slow {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

.animate-item {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.5s ease-out;
}

button {
  transition: all 0.2s ease-out;
}

button:active {
  transform: scale(0.98);
}

img {
  transition: transform 0.3s ease-out;
}

@media (hover: none) and (pointer: coarse) {
  button:active {
    transform: scale(0.95);
    transition: transform 0.1s;
  }
}
</style>

