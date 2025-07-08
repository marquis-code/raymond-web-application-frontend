<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 bg-white overflow-y-auto"
      :class="{'opacity-100': modalVisible, 'opacity-0': !modalVisible}"
    >
      <!-- Header -->
      <div class="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
        <button
          @click="handleClose"
          class="absolute left-6 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"  width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
          <!-- <Icon name="lucide:x" class="w-5 h-5" /> -->
        </button>
        <div class="text-center">
          <h1 class="text-lg font-medium text-gray-900">Product Preview</h1>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center min-h-screen">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent absolute top-0 left-0"></div>
        </div>
      </div>

      <!-- Product Content -->
      <div v-else-if="product" class="max-w-7xl mx-auto px-6 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Image Section -->
          <div class="space-y-6">
            <div class="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <div v-if="imageLoading" class="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl"></div>
              <img
                v-if="product.images && product.images.length > 0"
                :src="product.images[currentImageIndex]"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                @load="imageLoading = false"
                @error="imageLoading = false"
              />
              
              <!-- Image Navigation -->
              <div v-if="product.images && product.images.length > 1" class="absolute inset-0 flex items-center justify-between p-4">
                <button
                  @click="previousImage"
                  class="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                >
                  <!-- <Icon name="lucide:chevron-left" class="w-5 h-5" /> -->
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg>
                </button>
                <button
                  @click="nextImage"
                  class="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                >
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>
                  <!-- <Icon name="lucide:chevron-right" class="w-5 h-5" /> -->
                </button>
              </div>
            </div>

            <!-- Image Thumbnails -->
            <div v-if="product.images && product.images.length > 1" class="flex space-x-3 justify-center">
              <button
                v-for="(image, index) in product.images"
                :key="index"
                @click="currentImageIndex = index"
                class="w-20 h-20 rounded-lg overflow-hidden border-2 transition-all transform hover:scale-105"
                :class="currentImageIndex === index ? 'border-gray-900 shadow-lg' : 'border-gray-200 hover:border-gray-300'"
              >
                <img
                  :src="image"
                  :alt="`${product.name} - view ${index + 1}`"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          <!-- Product Details -->
          <div class="space-y-8">
            <!-- Breadcrumb -->
            <div v-if="product.category" class="text-sm">
              <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                {{ typeof product.category === 'object' ? product.category.name : product.category }}
              </span>
            </div>

            <!-- Title -->
            <div>
              <h1 class="text-3xl font-light text-gray-900 mb-4">
                {{ product.name }}
              </h1>
            </div>

            <!-- Rating -->
            <div v-if="product.rating && product.rating > 0" class="flex items-center space-x-2">
              <div class="flex">
                <!-- <Icon 
                  v-for="star in 5" 
                  :key="star"
                  name="lucide:star" 
                  class="w-4 h-4"
                  :class="star <= Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'"
                /> -->
                <svg v-for="star in 5" :key="star"  class="w-4 h-4"  :class="star <= Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'"  xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"></path></svg>
              </div>
              <span v-if="product.reviewCount" class="text-sm text-gray-600">
                ({{ product.reviewCount }} reviews)
              </span>
            </div>

            <!-- Price -->
            <div class="space-y-2">
              <div class="flex items-center space-x-3">
                <span class="text-3xl font-medium text-gray-900">
                  ${{ selectedSize ? calculateDiscountedPrice(selectedSize?.price).toFixed(2) : (product?.discountPrice || product?.price)?.toFixed(2) }}
                </span>
                <span v-if="product.discountPercentage && selectedSize" class="text-lg text-gray-500 line-through">
                  ${{ selectedSize.price.toFixed(2) }}
                </span>
                <span v-if="product.discountPercentage" class="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  -{{ product.discountPercentage }}% OFF
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-sm text-gray-600">
                  {{ product.isAvailable ? 'Available Now' : 'Out of Stock' }}
                </span>
              </div>
            </div>

            <!-- Promotion Text -->
            <div v-if="product.promotionText" class="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,72H180.92c.39-.33.79-.65,1.17-1A29.53,29.53,0,0,0,192,49.57,32.62,32.62,0,0,0,158.44,16,29.53,29.53,0,0,0,137,25.91a54.94,54.94,0,0,0-9,14.48,54.94,54.94,0,0,0-9-14.48A29.53,29.53,0,0,0,97.56,16,32.62,32.62,0,0,0,64,49.57,29.53,29.53,0,0,0,73.91,71c.38.33.78.65,1.17,1H40A16,16,0,0,0,24,88v32a16,16,0,0,0,16,16v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V136a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM149,36.51a13.69,13.69,0,0,1,10-4.5h.49A16.62,16.62,0,0,1,176,49.08a13.69,13.69,0,0,1-4.5,10c-9.49,8.4-25.24,11.36-35,12.4C137.7,60.89,141,45.5,149,36.51Zm-64.09.36A16.63,16.63,0,0,1,96.59,32h.49a13.69,13.69,0,0,1,10,4.5c8.39,9.48,11.35,25.2,12.39,34.92-9.72-1-25.44-4-34.92-12.39a13.69,13.69,0,0,1-4.5-10A16.6,16.6,0,0,1,84.87,36.87ZM40,88h80v32H40Zm16,48h64v64H56Zm144,64H136V136h64Zm16-80H136V88h80v32Z"></path></svg>
                <!-- <Icon name="lucide:gift" class="w-5 h-5 text-blue-600" /> -->
                <span class="text-blue-800 font-medium">{{ product.promotionText }}</span>
              </div>
            </div>

            <!-- Description -->
            <p v-if="product.description" v-html="product.description" class="text-gray-600 leading-relaxed"></p>

            <!-- Size Selection -->
            <div v-if="product.sizes && product.sizes.length > 0" class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Choose Your Size</h3>
              <div class="space-y-3">
                <div
                  v-for="size in product.sizes"
                  :key="size.size"
                  class="relative border-2 rounded-xl p-4 cursor-pointer transition-all transform hover:scale-[1.02]"
                  :class="selectedSize?.size === size.size ? 'border-gray-900 bg-gray-50 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'"
                  @click="selectSize(size)"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                      <div class="flex items-center space-x-2">
                        <span class="font-medium text-gray-900 capitalize">{{ size.size }}</span>
                        <span v-if="size.color" class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded capitalize">
                          {{ size.color }}
                        </span>
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ getDimensions(size) }}
                      </div>
                    </div>
                    <div class="text-right">
                      <div class="font-medium text-gray-900">
                        ${{ calculateDiscountedPrice(size.price).toFixed(2) }}
                      </div>
                      <div v-if="size.installmentConfig && size.installmentConfig.enabled" class="text-sm text-green-600">
                        <svg class="w-3 h-3 inline mr-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
                        <!-- <Icon name="lucide:check" class="w-3 h-3 inline mr-1" /> -->
                        Installments Available
                      </div>
                    </div>
                  </div>
                  
                  <!-- Installment Details -->
                  <div v-if="selectedSize?.size === size.size && size.installmentConfig && size.installmentConfig.enabled" class="mt-3 pt-3 border-t border-gray-200">
                    <div class="text-sm text-gray-600">
                      From {{ size.installmentConfig.availableTerms[0] }}-{{ size.installmentConfig.maxInstallments }} months • {{ size.installmentConfig.interestRate }}% APR
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quantity -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Quantity</h3>
              <div class="flex items-center space-x-4">
                <div class="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    @click="decrementQuantity"
                    :disabled="quantity <= 1"
                    class="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path></svg>
                    <!-- <Icon name="lucide:minus" class="w-4 h-4" /> -->
                  </button>
                  <span class="px-4 py-3 font-medium min-w-[60px] text-center">
                    {{ quantity }}
                  </span>
                  <button
                    @click="incrementQuantity"
                    class="p-3 hover:bg-gray-50 transition-colors"
                  >
                  <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>
                    <!-- <Icon name="lucide:plus" class="w-4 h-4" /> -->
                  </button>
                </div>
                <div v-if="selectedSize && quantity > 1" class="text-lg font-medium text-gray-900">
                  Total: ${{ (calculateDiscountedPrice(selectedSize.price) * quantity).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-4">
              <button
                @click="addToCart"
                :disabled="!selectedSize || !product.isAvailable"
                class="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg"
              >
                <span>Add to Collection</span>
              </button>
              
              <div class="grid grid-cols-2 gap-4">
                <button class="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-[1.02]">
                  <!-- <Icon name="lucide:heart" class="w-5 h-5" /> -->
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path></svg>
                  <span>Save</span>
                </button>
                <button class="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all transform hover:scale-[1.02]">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58h0c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35ZM160,172.69V144a8,8,0,0,0-8-8c-28.08,0-55.43,7.33-81.29,21.8a196.17,196.17,0,0,0-36.57,26.52c5.8-23.84,20.42-46.51,42.05-64.86C99.41,99.77,127.75,88,152,88a8,8,0,0,0,8-8V51.32L220.69,112Z"></path></svg>
                  <!-- <Icon name="lucide:share-2" class="w-5 h-5" /> -->
                  <span>Share</span>
                </button>
              </div>
            </div>

            <!-- Expandable Sections -->
            <div class="space-y-4">
              <!-- Product Details -->
              <div v-if="product.productInfo" class="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  @click="toggleSection('productInfo')"
                  class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span class="font-medium text-gray-900">Product Details</span>
                  <!-- <Icon 
                    name="lucide:chevron-down" 
                    class="w-5 h-5 text-gray-500 transition-transform duration-300"
                    :class="{ 'rotate-180': expandedSections.productInfo }"
                  /> -->
                  <svg  class="w-5 h-5 text-gray-500 transition-transform duration-300"
                  :class="{ 'rotate-180': expandedSections.productInfo }" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                </button>
                <Transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="max-h-0 opacity-0"
                  enter-to-class="max-h-96 opacity-100"
                  leave-active-class="transition-all duration-300 ease-in"
                  leave-from-class="max-h-96 opacity-100"
                  leave-to-class="max-h-0 opacity-0"
                >
                  <div v-if="expandedSections.productInfo" class="px-4 pb-4 text-gray-600 overflow-hidden">
                    {{ product.productInfo }}
                  </div>
                </Transition>
              </div>

              <!-- Shipping Info -->
              <div v-if="product.shippingInfo" class="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  @click="toggleSection('shippingInfo')"
                  class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span class="font-medium text-gray-900">Shipping & Delivery</span>
                  <!-- <Icon 
                    name="lucide:chevron-down" 
                    class="w-5 h-5 text-gray-500 transition-transform duration-300"
                    :class="{ 'rotate-180': expandedSections.shippingInfo }"
                  /> -->
                  <svg class="w-5 h-5 text-gray-500 transition-transform duration-300"
                  :class="{ 'rotate-180': expandedSections.shippingInfo }" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                </button>
                <Transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="max-h-0 opacity-0"
                  enter-to-class="max-h-96 opacity-100"
                  leave-active-class="transition-all duration-300 ease-in"
                  leave-from-class="max-h-96 opacity-100"
                  leave-to-class="max-h-0 opacity-0"
                >
                  <div v-if="expandedSections.shippingInfo" class="px-4 pb-4 text-gray-600 overflow-hidden">
                    {{ product.shippingInfo }}
                  </div>
                </Transition>
              </div>

              <!-- Return Policy -->
              <div v-if="product.returnPolicy" class="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  @click="toggleSection('returnPolicy')"
                  class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span class="font-medium text-gray-900">Return Policy</span>
                  <!-- <Icon 
                    name="lucide:chevron-down" 
                    class="w-5 h-5 text-gray-500 transition-transform duration-300"
                    :class="{ 'rotate-180': expandedSections.returnPolicy }"
                  /> -->
                  <svg class="w-5 h-5 text-gray-500 transition-transform duration-300"
                  :class="{ 'rotate-180': expandedSections.returnPolicy }" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                </button>
                <Transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="max-h-0 opacity-0"
                  enter-to-class="max-h-96 opacity-100"
                  leave-active-class="transition-all duration-300 ease-in"
                  leave-from-class="max-h-96 opacity-100"
                  leave-to-class="max-h-0 opacity-0"
                >
                  <div v-if="expandedSections.returnPolicy" class="px-4 pb-4 text-gray-600 overflow-hidden">
                    {{ product.returnPolicy }}
                  </div>
                </Transition>
              </div>

              <!-- Product Attributes -->
              <div v-if="product.attributes" class="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  @click="toggleSection('attributes')"
                  class="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <span class="font-medium text-gray-900">Specifications</span>
                  <!-- <Icon 
                    name="lucide:chevron-down" 
                    class="w-5 h-5 text-gray-500 transition-transform duration-300"
                    :class="{ 'rotate-180': expandedSections.attributes }"
                  /> -->
                  <svg  class="w-5 h-5 text-gray-500 transition-transform duration-300"
                  :class="{ 'rotate-180': expandedSections.attributes }" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                </button>
                <Transition
                  enter-active-class="transition-all duration-300 ease-out"
                  enter-from-class="max-h-0 opacity-0"
                  enter-to-class="max-h-96 opacity-100"
                  leave-active-class="transition-all duration-300 ease-in"
                  leave-from-class="max-h-96 opacity-100"
                  leave-to-class="max-h-0 opacity-0"
                >
                  <div v-if="expandedSections.attributes" class="px-4 pb-4 overflow-hidden">
                    <div class="space-y-2">
                      <div v-for="(value, key) in product.attributes" :key="key" class="flex justify-between text-sm">
                        <span class="text-gray-600 capitalize">{{ key.replace(/([A-Z])/g, ' $1').trim() }}:</span>
                        <span class="text-gray-900 font-medium">{{ value }}</span>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Trust Badges -->
            <div class="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,40H48A16,16,0,0,0,32,56v56c0,52.72,25.52,84.67,46.93,102.19,23.06,18.86,46,25.26,47,25.53a8,8,0,0,0,4.2,0c1-.27,23.91-6.67,47-25.53C198.48,196.67,224,164.72,224,112V56A16,16,0,0,0,208,40Zm0,72c0,37.07-13.66,67.16-40.6,89.42A129.3,129.3,0,0,1,128,223.62a128.25,128.25,0,0,1-38.92-21.81C61.82,179.51,48,149.3,48,112l0-56,160,0ZM82.34,141.66a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32l-56,56a8,8,0,0,1-11.32,0Z"></path></svg>
                  <!-- <Icon name="lucide:shield-check" class="w-5 h-5 text-green-600" /> -->
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">Authenticity Guaranteed</div>
                  <div class="text-xs text-gray-500">Certificate of authenticity included</div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"></path></svg>
                  <!-- <Icon name="lucide:package" class="w-5 h-5 text-blue-600" /> -->
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-900">Secure Packaging</div>
                  <div class="text-xs text-gray-500">Professional handling & shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="flex items-center justify-center min-h-screen">
        <div class="text-center space-y-4">
          <svg  class="w-16 h-16 text-gray-400 mx-auto" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path></svg>
          <!-- <Icon name="lucide:alert-circle" class="w-16 h-16 text-gray-400 mx-auto" /> -->
          <p class="text-gray-500">Failed to load product details</p>
          <button 
            @click="handleClose"
            class="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useFetchProduct } from "@/composables/modules/products/useFetchProduct"
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useCartStore } from '~/composables/useCartStore'
const { showToast } = useCustomToast();
const { addToCart: addItemToCart } = useCartStore()


interface ProductSize {
  size: string
  price: number
  color?: string
  installmentConfig?: {
    enabled: boolean
    minimumAmount: number
    maxInstallments: number
    availableTerms: number[]
    interestRate: number
  }
}

interface Product {
  _id: string
  name: string
  description?: string
  price: number
  discountPrice?: number
  discountPercentage?: number
  images: string[]
  category?: any
  isAvailable: boolean
  weight?: number
  width?: number
  height?: number
  length?: number
  tags?: string[]
  attributes?: Record<string, any>
  rating?: number
  reviewCount?: number
  productInfo?: string
  shippingInfo?: string
  returnPolicy?: string
  sizes: ProductSize[]
  promotionText?: string
  hasInstallmentOptions?: boolean
}

interface Props {
  isOpen: boolean
  productId: string | null
  onClose: () => void
  onAddToCart: (product: Product, selectedSize: ProductSize, quantity: number) => void
}

const props = defineProps<Props>()

// Use your composable
const { product, loading, fetchProduct } = useFetchProduct()

// Reactive state
const modalVisible = ref(false)
const currentImageIndex = ref(0)
const selectedSize = ref<ProductSize | null>(null)
const quantity = ref(1)
const imageLoading = ref(true)

const expandedSections = reactive({
  productInfo: false,
  shippingInfo: false,
  returnPolicy: false,
  attributes: false
})

// Methods
const handleClose = () => {
  modalVisible.value = false
  setTimeout(() => {
    props.onClose()
    resetModal()
  }, 300)
}

const resetModal = () => {
  currentImageIndex.value = 0
  selectedSize.value = null
  quantity.value = 1
  imageLoading.value = true
  Object.keys(expandedSections).forEach(key => {
    expandedSections[key as keyof typeof expandedSections] = false
  })
}

const nextImage = () => {
  if (product.value && product.value.images && product.value.images.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % product.value.images.length
  }
}

const previousImage = () => {
  if (product.value && product.value.images && product.value.images.length > 1) {
    currentImageIndex.value = currentImageIndex.value === 0 
      ? product.value.images.length - 1 
      : currentImageIndex.value - 1
  }
}

const selectSize = (size: ProductSize) => {
  selectedSize.value = size
}

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const calculateDiscountedPrice = (price: number) => {
  if (product.value?.discountPercentage) {
    return price * (1 - product.value.discountPercentage / 100)
  }
  return price
}

const getDimensions = (size: ProductSize) => {
  // You can customize this based on your size mapping
  const dimensionMap: Record<string, string> = {
    small: '16" × 20" (40.64cm × 50.80cm)',
    basic: '18" × 24" (45.72cm × 60.96cm)',
    medium: '20" × 28" (50.80cm × 71.12cm)',
    large: '24" × 36" (60.96cm × 91.44cm)'
  }
  return dimensionMap[size.size.toLowerCase()] || '18" × 24" (45.72cm × 60.96cm)'
}

const toggleSection = (section: keyof typeof expandedSections) => {
  expandedSections[section] = !expandedSections[section]
}

const handleAddToCart = () => {
  if (product.value && selectedSize.value) {
    props.onAddToCart(product.value, selectedSize.value, quantity.value)
    handleClose()
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    handleClose()
  }
  if (e.key === 'ArrowLeft' && props.isOpen) {
    previousImage()
  }
  if (e.key === 'ArrowRight' && props.isOpen) {
    nextImage()
  }
}

// Watchers
watch(() => props.isOpen, async (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
    await nextTick()
    modalVisible.value = true
  } else {
    document.body.style.overflow = 'auto'
    modalVisible.value = false
  }
})

watch(() => props.productId, (newId) => {
  if (newId && props.isOpen) {
    fetchProduct(newId)
    resetModal()
  }
})

watch(product, (newProduct) => {
  if (newProduct && newProduct.sizes && newProduct.sizes.length > 0) {
    selectedSize.value = newProduct.sizes[0]
  }
}, { immediate: true })

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})

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

const hasInstallmentOption = (size: any) => {
  return size.installmentConfig && size.installmentConfig.enabled
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
</script>

<style scoped>
.modal-open {
  overflow: hidden;
}

/* Custom scrollbar for modal content */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: transform, box-shadow, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}
</style>