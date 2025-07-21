<template>
  <div class="bg-white">
    <!-- Main Content with top padding for fixed header -->
    <div class="pt-10">
      <!-- Full Screen Loader -->
      <transition name="fullscreen-loader">
        <div v-if="showFullScreenLoader" class="fixed inset-0 z-[9999] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center">
          <div class="text-center text-white">
            <div class="relative mb-8">
              <div class="w-32 h-32 border-8 border-white/20 rounded-full animate-spin-slow"></div>
              <div class="absolute inset-4 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
              <div class="absolute inset-8 border-4 border-white/40 border-b-transparent rounded-full animate-spin-reverse"></div>
            </div>
            <h3 class="text-2xl font-bold mb-2 animate-pulse">Uploading Your Image</h3>
            <p class="text-lg opacity-90 animate-bounce">{{ uploadProgress }}%</p>
            <div class="w-64 h-2 bg-white/20 rounded-full mx-auto mt-4 overflow-hidden">
              <div class="h-full bg-white rounded-full transition-all duration-500 ease-out animate-shimmer" :style="{ width: uploadProgress + '%' }"></div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Step Content with Transitions -->
      <transition :name="slideDirection" mode="out-in">
        <!-- Step 1: Hero Section -->
        <section v-if="currentStep === 1" key="step1" class="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
          <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-1 lg:order-1 animate-slide-up">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 relative">
                  <span class="relative inline-block">
                    COMMISSION 
                    <span class="absolute -bottom-2 left-0 w-full h-1 bg-rose-400 transform -skew-x-12 animate-grow-line"></span>
                  </span>
                  <span class="block mt-2">AN ARTWORK</span>
                  <span class="block text-xl md:text-2xl lg:text-3xl font-medium mt-2">FULLY HAND-MADE WITH</span>
                  <span class="block text-xl md:text-2xl lg:text-3xl font-medium">CHARCOAL, PASTELS & ACRYLIC</span>
                </h1>
                <p class="text-lg md:text-xl text-gray-600 mb-8">Custom artwork, a special piece made for you...</p>
                <p class="text-gray-700 mb-6 text-sm md:text-base">
                  Would you like to order a portrait of your loved one, pet, a sentimental gift
                  for a special occasion or memorial portrait?
                </p>
                <div class="relative inline-block group">
                  <button 
                    @click="nextStep" 
                    class="relative z-10 inline-flex items-center px-6 md:px-8 py-3 bg-emerald-600 text-white font-medium rounded-md transition-transform duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1 text-sm md:text-base">
                    LEARN MORE
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 animate-bounce-x" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <div class="absolute inset-0 bg-emerald-800 rounded-md transform transition-transform duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
                </div>
              </div>
              <div class="order-2 lg:order-2 relative animate-fade-in">
                <div class="relative">
                  <img src="@/assets/img/commission1.jpg"  alt="Commission artwork example" class="relative z-10 rounded-lg shadow-xl w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Step 2: Information Section -->
        <section v-else-if="currentStep === 2" key="step2" class="bg-white pt-10">
          <div class="bg-gradient-to-r from-gray-900 to-black text-white py-8 md:py-12 px-4 text-center">
            <h2 class="text-2xl md:text-3xl font-bold mb-4">BOOK YOUR CUSTOM DRAWING</h2>
            <p class="text-base md:text-lg opacity-90 mb-6">NOTE: (kindly go through the details below for better description)</p>
            <div class="max-w-2xl mx-auto text-sm opacity-80">
              Please review all the information below to understand our process, pricing, and requirements before placing your order.
            </div>
          </div>
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <!-- Information sections remain the same as in original code -->
            <!-- 1. SIZES AND PRICES with Measurement Images -->
            <div class="mb-12 animate-slide-up bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-emerald-500">
              <h3 class="text-xl md:text-2xl font-bold mb-6 text-emerald-600 flex items-center">
                <span class="bg-emerald-100 text-emerald-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                SIZES AND PRICES
              </h3>
              <p class="mb-4 text-gray-700 text-sm md:text-base">Depending on your wall space, budget and photographs.</p>
              <p class="mb-6 text-gray-700 text-sm md:text-base">I offer the following sizes:</p>
              <!-- Size Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div class="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <h4 class="font-bold text-emerald-600 text-sm md:text-base">Small Size</h4>
                  <p class="text-gray-600 text-sm">16 x 20 Inches</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <h4 class="font-bold text-emerald-600 text-sm md:text-base">Basic Size</h4>
                  <p class="text-gray-600 text-sm">20 x 24 Inches</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <h4 class="font-bold text-emerald-600 text-sm md:text-base">Medium Size</h4>
                  <p class="text-gray-600 text-sm">24 x 30 / 24 x36 Inches</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <h4 class="font-bold text-emerald-600 text-sm md:text-base">Large Size</h4>
                  <p class="text-gray-600 text-sm">36 x 42 Inches</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <h4 class="font-bold text-emerald-600 text-sm md:text-base">Extra Large Size</h4>
                  <p class="text-gray-600 text-sm">40 x 46 Inches</p>
                </div>
              </div>
            </div>

            <!-- Other information sections... (keeping original content) -->
            <!-- 2. REFERENCE PHOTO -->
            <div class="mb-12 animate-slide-up bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-blue-500" style="animation-delay: 0.2s;">
              <h3 class="text-xl md:text-2xl font-bold mb-6 text-blue-600 flex items-center">
                <span class="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                REFERENCE PHOTO
              </h3>
              <div class="space-y-4 text-gray-700 text-sm md:text-base">
                <p>To create your drawing, you have to choose a reference photo. It is important to be able to determine which photo will allow for the best possible reference material, the clearer the photo, the better the portrait. That way I am able to achieve the desired final result.</p>
                <p>I draw portraits, preferably a head and shoulder portraits. But also pets or landscapes.</p>
                <p>Do you want to combine separate photos in one drawing? I can make that possible depending on the photos you have. I will present you with a mock-up (With different compositions, backgrounds etc.) to give you an idea of what the drawing can look like.</p>
                <p>Once you have submitted your commission form, I will contact you to discuss further details. If you are unsure of what photo to choose, I can help you in making the right decision for best results.</p>
              </div>
            </div>

            <!-- 3. CONTRACT & PAYMENT -->
            <div class="mb-12 animate-slide-up bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-purple-500" style="animation-delay: 0.4s;">
              <h3 class="text-xl md:text-2xl font-bold mb-6 text-purple-600 flex items-center">
                <span class="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                CONTRACT & PAYMENT
              </h3>
              <div class="space-y-4 text-gray-700 text-sm md:text-base">
                <p>Commissions require an initial deposit and contractual agreement.</p>
                <p>Once you have your chosen the portrait size and reference photo, simply submit your commission through the submission form.</p>
                <p>We will then discuss further details of your drawing.</p>
                <p>Once you are happy with the idea and you are ready to place your order. You will receive the contract and invoice.</p>
                <p>Payment can be made securely through Card, bank transfer, Western Union, Ria, Money Gram.</p>
              </div>
            </div>

            <!-- 4. TIME OF CREATION -->
            <div class="mb-12 animate-slide-up bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-orange-500" style="animation-delay: 0.6s;">
              <h3 class="text-xl md:text-2xl font-bold mb-6 text-orange-600 flex items-center">
                <span class="bg-orange-100 text-orange-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                TIME OF CREATION
              </h3>
              <div class="space-y-4 text-gray-700 text-sm md:text-base">
                <p>After your deposit has been successfully received, I will start working on your drawing. It is important to allow enough time for creation of the artwork. I will inform you on time needed depending on your choice of size and photo (At least 2-4 weeks).</p>
                <p>During this process you will receive updates of your drawing. That way you get to watch your artwork come together until it is completed.</p>
                <p>I will present you with final result photos. Once this is approved by you, I will start preparing the shipment.</p>
              </div>
            </div>

            <!-- 5. SHIPPING -->
            <div class="mb-12 animate-slide-up bg-white rounded-xl shadow-lg p-6 md:p-8 border-l-4 border-red-500" style="animation-delay: 0.8s;">
              <h3 class="text-xl md:text-2xl font-bold mb-6 text-red-600 flex items-center">
                <span class="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                SHIPPING
              </h3>
              <div class="space-y-4 text-gray-700 text-sm md:text-base">
                <p>The most exciting part! Your drawing has been approved by you and will now be prepared for shipment. I ship with DHL Express Fed Ex, and USPS worldwide. Estimated delivery time is 4-7 business days worldwide.</p>
                <p>Artworks are shipped rolled in a protective tube. All packages are well protected and insured for a guaranteed safe arrival of your artwork. Your portrait will arrive with a thank you note and certificate of authenticity.</p>
                <p>Your package is sent securely, tracked and will require a signature upon arrival. I am not responsible for expenses or delays that may occur depending on the regulations in your country.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Step 3: Enhanced Commission Form with Country Selection -->
        <section v-else-if="currentStep === 3" key="step3" class="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-8 md:mb-12">
              <h2 class="text-base md:text-4xl font-bold text-gray-800 mb-4">Commission Request</h2>
              <p class="text-base md:text-lg text-gray-600">Fill out the form below to start your custom artwork journey</p>
            </div>

            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Name Fields -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="animate-slide-up" style="animation-delay: 0.1s;">
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First name *</label>
                  <input 
                    id="firstName" 
                    v-model="form.firstName" 
                    type="text" 
                    required
                    :class="[
                      'w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 text-sm md:text-base',
                      formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                    ]"
                  />
                  <p v-if="formErrors.firstName" class="mt-1 text-sm text-red-600">{{ formErrors.firstName }}</p>
                </div>
                <div class="animate-slide-up" style="animation-delay: 0.2s;">
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
                  <input 
                    id="lastName" 
                    v-model="form.lastName" 
                    type="text" 
                    required
                    :class="[
                      'w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 text-sm md:text-base',
                      formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                    ]"
                  />
                  <p v-if="formErrors.lastName" class="mt-1 text-sm text-red-600">{{ formErrors.lastName }}</p>
                </div>
              </div>

              <!-- Email Field -->
              <div class="animate-slide-up" style="animation-delay: 0.3s;">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  id="email" 
                  v-model="form.email" 
                  type="email" 
                  required
                  :class="[
                    'w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 text-sm md:text-base',
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  ]"
                />
                <p v-if="formErrors.email" class="mt-1 text-sm text-red-600">{{ formErrors.email }}</p>
              </div>

              <!-- Country and Phone Fields -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Country Selection -->
                <div class="animate-slide-up" style="animation-delay: 0.4s;">
                  <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <div class="relative">
                    <select 
                      id="country" 
                      v-model="form.country" 
                      required
                      @change="onCountryChange"
                      :class="[
                        'w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 text-sm md:text-base appearance-none bg-white',
                        formErrors.country ? 'border-red-500' : 'border-gray-300'
                      ]"
                    >
                      <option value="" disabled>Select your country</option>
                      <option 
                        v-for="country in countries" 
                        :key="country.code" 
                        :value="country.code"
                      >
                        {{ country.flag }} {{ country.name }} (+{{ country.dialCode }})
                      </option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                  <p v-if="formErrors.country" class="mt-1 text-sm text-red-600">{{ formErrors.country }}</p>
                </div>

                <!-- Phone Number -->
                <div class="animate-slide-up" style="animation-delay: 0.5s;">
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span class="text-gray-500 text-sm">
                        {{ selectedCountry?.flag }} +{{ selectedCountry?.dialCode }}
                      </span>
                    </div>
                    <input 
                      id="phone" 
                      v-model="form.phone" 
                      type="tel"
                      :placeholder="selectedCountry?.placeholder || 'Enter phone number'"
                      :class="[
                        'w-full py-3 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 text-sm md:text-base',
                        selectedCountry ? 'pl-20' : 'pl-4',
                        formErrors.phone ? 'border-red-500' : 'border-gray-300'
                      ]"
                      @input="validatePhoneNumber"
                    />
                  </div>
                  <p v-if="formErrors.phone" class="mt-1 text-sm text-red-600">{{ formErrors.phone }}</p>
                  <p v-if="selectedCountry && form.phone" class="mt-1 text-xs text-gray-500">
                    Format: {{ selectedCountry.format }}
                  </p>
                </div>
              </div>

              <!-- Subject Field -->
              <div class="animate-slide-up" style="animation-delay: 0.6s;">
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                <input 
                  id="subject" 
                  v-model="form.subject" 
                  type="text" 
                  required
                  :class="[
                    'w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 text-sm md:text-base',
                    formErrors.subject ? 'border-red-500' : 'border-gray-300'
                  ]"
                />
                <p v-if="formErrors.subject" class="mt-1 text-sm text-red-600">{{ formErrors.subject }}</p>
              </div>

              <!-- Message Field -->
              <div class="animate-slide-up" style="animation-delay: 0.7s;">
                <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
                  Message - (Describe your idea/story for this artwork) *
                </label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  rows="5" 
                  required
                  :class="[
                    'w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-rose-50 transition-all duration-300 hover:border-emerald-300 text-sm md:text-base',
                    formErrors.message ? 'border-red-500' : 'border-gray-300'
                  ]"
                ></textarea>
                <p v-if="formErrors.message" class="mt-1 text-sm text-red-600">{{ formErrors.message }}</p>
              </div>

              <!-- Deadline Field -->
              <div class="animate-slide-up" style="animation-delay: 0.8s;">
                <label for="deadline" class="block text-sm font-medium text-gray-700 mb-1">Deadline *</label>
                <input 
                  id="deadline" 
                  v-model="form.deadline" 
                  type="date" 
                  required
                  :min="minDate"
                  :class="[
                    'w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 text-sm md:text-base',
                    formErrors.deadline ? 'border-red-500' : 'border-gray-300'
                  ]"
                />
                <p v-if="formErrors.deadline" class="mt-1 text-sm text-red-600">{{ formErrors.deadline }}</p>
              </div>

              <!-- Drawing Type Field -->
              <div class="animate-slide-up" style="animation-delay: 0.9s;">
                <label for="drawingType" class="block text-sm font-medium text-gray-700 mb-1">What kind of drawing would you like? *</label>
                <select 
                  v-if="!fetchingTypes"
                  id="drawingType" 
                  v-model="form.drawingType" 
                  required
                  :class="[
                    'w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300 text-sm md:text-base appearance-none bg-white',
                    formErrors.drawingType ? 'border-red-500' : 'border-gray-300'
                  ]"
                >
                  <option value="" disabled selected>Select drawing type</option>
                  <option v-for="(item, idx) in drawingTypes" :key="idx" :value="item._id">
                    {{ item?.name }}
                  </option>
                </select>
                <p v-if="formErrors.drawingType" class="mt-1 text-sm text-red-600">{{ formErrors.drawingType }}</p>
              </div>

              <!-- Main Photo Upload -->
              <div class="animate-slide-up" style="animation-delay: 1s;">
                <label class="block text-sm font-medium text-gray-700 mb-3">Main Reference Photo *</label>
                <div class="flex items-center justify-center w-full">
                  <label 
                    for="mainPhoto" 
                    class="flex flex-col items-center justify-center w-full h-32 md:h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]"
                    :class="{ 
                      'border-emerald-300 bg-emerald-50': isDraggingMain,
                      'pointer-events-none': uploadingMain,
                      'border-red-300': formErrors.mainPhoto,
                      'border-gray-300': !formErrors.mainPhoto
                    }"
                    @dragover.prevent="isDraggingMain = true"
                    @dragleave.prevent="isDraggingMain = false"
                    @drop.prevent="onDropMain"
                  >
                    <!-- Loading State -->
                    <div v-if="uploadingMain" class="flex flex-col items-center justify-center pt-5 pb-6">
                      <div class="w-8 md:w-10 h-8 md:h-10 mb-4">
                        <svg class="animate-spin text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                      <p class="text-sm text-emerald-600 font-medium">Uploading...</p>
                      <p class="text-xs text-gray-500">Please wait</p>
                    </div>
                    <!-- No File State -->
                    <div v-else-if="!mainPhotoUrl" class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-6 md:w-8 h-6 md:h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 text-center">
                        <span class="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p class="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 15MB)</p>
                    </div>
                    <!-- File Uploaded State -->
                    <div v-else class="flex flex-col items-center justify-center w-full h-full">
                      <div class="relative w-full h-full">
                        <img 
                          :src="mainPhotoPreview" 
                          alt="Main Photo Preview" 
                          class="w-full h-full object-contain rounded"
                        />
                        <button 
                          @click.stop="removeMainPhoto" 
                          class="absolute top-2 right-2 w-6 md:w-8 h-6 md:h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 transform hover:scale-110"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 md:h-5 w-4 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <input 
                      id="mainPhoto" 
                      type="file" 
                      class="hidden"
                      @change="handleMainPhotoUpload" 
                      ref="mainPhotoInput"
                      :disabled="uploadingMain"
                      accept="image/*"
                    />
                  </label>
                </div>
                <p class="mt-2 text-sm text-gray-500">Kindly upload clear photos.</p>
                <p v-if="formErrors.mainPhoto" class="mt-1 text-sm text-red-600">{{ formErrors.mainPhoto }}</p>
              </div>

              <!-- Optional Photo Uploads -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style="animation-delay: 1.1s;">
                <!-- Optional Photo 1 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Optional Photo 1</label>
                  <div class="flex items-center justify-center w-full">
                    <label 
                      for="optionalPhoto1" 
                      class="flex flex-col items-center justify-center w-full h-20 md:h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]"
                      :class="{ 
                        'border-emerald-300 bg-emerald-50': isDraggingOptional1,
                        'pointer-events-none': uploadingOptional1
                      }"
                      @dragover.prevent="isDraggingOptional1 = true"
                      @dragleave.prevent="isDraggingOptional1 = false"
                      @drop.prevent="onDropOptional1"
                    >
                      <!-- Loading State -->
                      <div v-if="uploadingOptional1" class="flex flex-col items-center justify-center py-2">
                        <div class="w-5 md:w-6 h-5 md:h-6 mb-2">
                          <svg class="animate-spin text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                        <p class="text-xs text-emerald-600 font-medium">Uploading...</p>
                      </div>
                      <!-- No File State -->
                      <div v-else-if="!optional1PhotoUrl" class="flex flex-col items-center justify-center pt-3 pb-3">
                        <svg class="w-5 md:w-6 h-5 md:h-6 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="text-xs text-gray-500 text-center">Upload File (MAX. 15MB)</p>
                      </div>
                      <!-- File Uploaded State -->
                      <div v-else class="relative w-full h-full p-2">
                        <img 
                          :src="optional1PhotoPreview" 
                          alt="Optional Photo 1 Preview" 
                          class="w-full h-full object-cover rounded"
                        />
                        <button 
                          @click.stop="removeOptional1Photo" 
                          class="absolute top-3 right-3 w-5 md:w-6 h-5 md:h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 transform hover:scale-110"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 md:h-4 w-3 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <input 
                        id="optionalPhoto1" 
                        type="file" 
                        class="hidden"
                        @change="handleOptional1PhotoUpload"
                        ref="optional1PhotoInput"
                        :disabled="uploadingOptional1"
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>

                <!-- Optional Photo 2 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Optional Photo 2</label>
                  <div class="flex items-center justify-center w-full">
                    <label 
                      for="optionalPhoto2" 
                      class="flex flex-col items-center justify-center w-full h-20 md:h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]"
                      :class="{ 
                        'border-emerald-300 bg-emerald-50': isDraggingOptional2,
                        'pointer-events-none': uploadingOptional2
                      }"
                      @dragover.prevent="isDraggingOptional2 = true"
                      @dragleave.prevent="isDraggingOptional2 = false"
                      @drop.prevent="onDropOptional2"
                    >
                      <!-- Loading State -->
                      <div v-if="uploadingOptional2" class="flex flex-col items-center justify-center py-2">
                        <div class="w-5 md:w-6 h-5 md:h-6 mb-2">
                          <svg class="animate-spin text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                        <p class="text-xs text-emerald-600 font-medium">Uploading...</p>
                      </div>
                      <!-- No File State -->
                      <div v-else-if="!optional2PhotoUrl" class="flex flex-col items-center justify-center pt-3 pb-3">
                        <svg class="w-5 md:w-6 h-5 md:h-6 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="text-xs text-gray-500 text-center">Upload File (MAX. 15MB)</p>
                      </div>
                      <!-- File Uploaded State -->
                      <div v-else class="relative w-full h-full p-2">
                        <img 
                          :src="optional2PhotoPreview" 
                          alt="Optional Photo 2 Preview" 
                          class="w-full h-full object-cover rounded"
                        />
                        <button 
                          @click.stop="removeOptional2Photo" 
                          class="absolute top-3 right-3 w-5 md:w-6 h-5 md:h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 transform hover:scale-110"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 md:h-4 w-3 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <input 
                        id="optionalPhoto2" 
                        type="file" 
                        class="hidden"
                        @change="handleOptional2PhotoUpload"
                        ref="optional2PhotoInput"
                        :disabled="uploadingOptional2"
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="pt-8 animate-slide-up" style="animation-delay: 1.2s;">
                <button 
                  type="submit" 
                  class="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg text-sm md:text-base"
                  :disabled="loading || isAnyUploading"
                >
                  <div v-if="loading" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Your Commission...
                  </div>
                  <span v-else class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Submit Commission Request
                  </span>
                </button>
              </div>
            </form>
          </div>
        </section>
      </transition>
    </div>

    <!-- Sticky Button for Step 2 -->
    <div v-if="currentStep === 2" class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 animate-bounce-in px-4">
      <button 
        @click="nextStep" 
        class="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full shadow-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 md:space-x-3 font-semibold text-sm md:text-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 md:h-6 w-5 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="">Submit Form</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 md:h-5 w-4 md:w-5 animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>

    <!-- Enhanced Success Modal with Confetti -->
    <transition name="modal">
      <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" @click="closeSuccessModal"></div>
        <!-- Confetti Animation -->
        <div class="absolute inset-0 pointer-events-none">
          <div 
            v-for="i in 50" 
            :key="i" 
            class="absolute animate-confetti"
            :style="getConfettiStyle(i)"
          >
            <div 
              class="w-2 h-2 rounded-full"
              :class="getConfettiColor(i)"
            ></div>
          </div>
        </div>
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 animate-modal-bounce">
          <div class="text-center">
            <!-- Animated Success Icon -->
            <div class="relative w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 md:h-12 w-10 md:w-12 text-white animate-check-mark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
              <div class="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20"></div>
            </div>
            <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 animate-text-reveal">Congratulations!</h3>
            <p class="text-gray-600 mb-6 animate-text-reveal text-sm md:text-base" style="animation-delay: 0.2s;">
              Your commission request has been submitted successfully! 🎨
            </p>
            <p class="text-sm text-gray-500 mb-8 animate-text-reveal" style="animation-delay: 0.4s;">
              We will contact you shortly to discuss the details and begin creating your masterpiece.
            </p>
            <button 
              @click="closeSuccessModal" 
              class="w-full py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 animate-button-reveal text-sm md:text-base"
              style="animation-delay: 0.6s;"
            >
              Continue Your Journey
            </button>
          </div>
        </div>
      </div>
    </transition>

    <TestimonialsCarousel />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import TestimonialsCarousel from '../components/TestimonialsCarousel.vue'

// Types
interface Country {
  name: string
  code: string
  dialCode: string
  flag: string
  format: string
  placeholder: string
  pattern: RegExp
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  country: string
  phone: string
  subject: string
  message: string
  deadline: string
  drawingType: string
  mainPhoto: string | null
  optionalPhoto1: string | null
  optionalPhoto2: string | null
}

interface FormErrors {
  [key: string]: string
}

// Mock composables for demonstration
const useCreateCommission = () => ({
  loading: ref(false),
  createCommission: async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Commission created:', data)
  }
})

const useSingleUploadFile = () => ({
  singleUploadFile: async (file: File) => {
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 1500))
    return { url: URL.createObjectURL(file) }
  }
})

const useFetchDrawingTypes = () => ({
  loading: ref(false),
  drawingTypes: ref([
    { _id: '1', name: 'Portrait Drawing' },
    { _id: '2', name: 'Pet Portrait' },
    { _id: '3', name: 'Landscape Drawing' },
    { _id: '4', name: 'Custom Artwork' }
  ])
})

// Composables
const { loading, createCommission } = useCreateCommission()
const { singleUploadFile } = useSingleUploadFile()
const { loading: fetchingTypes, drawingTypes } = useFetchDrawingTypes()

// Countries data with comprehensive list
const countries = ref<Country[]>([
  { name: 'United States', code: 'US', dialCode: '1', flag: '🇺🇸', format: '(XXX) XXX-XXXX', placeholder: '(555) 123-4567', pattern: /^$$\d{3}$$ \d{3}-\d{4}$/ },
  { name: 'United Kingdom', code: 'GB', dialCode: '44', flag: '🇬🇧', format: 'XXXX XXX XXXX', placeholder: '7911 123456', pattern: /^\d{4} \d{3} \d{4}$/ },
  { name: 'Canada', code: 'CA', dialCode: '1', flag: '🇨🇦', format: '(XXX) XXX-XXXX', placeholder: '(555) 123-4567', pattern: /^$$\d{3}$$ \d{3}-\d{4}$/ },
  { name: 'Australia', code: 'AU', dialCode: '61', flag: '🇦🇺', format: 'XXXX XXX XXX', placeholder: '0412 345 678', pattern: /^\d{4} \d{3} \d{3}$/ },
  { name: 'Germany', code: 'DE', dialCode: '49', flag: '🇩🇪', format: 'XXX XXXXXXXX', placeholder: '030 12345678', pattern: /^\d{3} \d{8}$/ },
  { name: 'France', code: 'FR', dialCode: '33', flag: '🇫🇷', format: 'XX XX XX XX XX', placeholder: '01 23 45 67 89', pattern: /^\d{2} \d{2} \d{2} \d{2} \d{2}$/ },
  { name: 'Italy', code: 'IT', dialCode: '39', flag: '🇮🇹', format: 'XXX XXX XXXX', placeholder: '320 123 4567', pattern: /^\d{3} \d{3} \d{4}$/ },
  { name: 'Spain', code: 'ES', dialCode: '34', flag: '🇪🇸', format: 'XXX XX XX XX', placeholder: '612 34 56 78', pattern: /^\d{3} \d{2} \d{2} \d{2}$/ },
  { name: 'Netherlands', code: 'NL', dialCode: '31', flag: '🇳🇱', format: 'XX XXXXXXXX', placeholder: '06 12345678', pattern: /^\d{2} \d{8}$/ },
  { name: 'Belgium', code: 'BE', dialCode: '32', flag: '🇧🇪', format: 'XXX XX XX XX', placeholder: '470 12 34 56', pattern: /^\d{3} \d{2} \d{2} \d{2}$/ },
  { name: 'Switzerland', code: 'CH', dialCode: '41', flag: '🇨🇭', format: 'XX XXX XX XX', placeholder: '79 123 45 67', pattern: /^\d{2} \d{3} \d{2} \d{2}$/ },
  { name: 'Austria', code: 'AT', dialCode: '43', flag: '🇦🇹', format: 'XXX XXXXXXX', placeholder: '664 1234567', pattern: /^\d{3} \d{7}$/ },
  { name: 'Sweden', code: 'SE', dialCode: '46', flag: '🇸🇪', format: 'XXX-XXX XX XX', placeholder: '070-123 45 67', pattern: /^\d{3}-\d{3} \d{2} \d{2}$/ },
  { name: 'Norway', code: 'NO', dialCode: '47', flag: '🇳🇴', format: 'XXX XX XXX', placeholder: '412 34 567', pattern: /^\d{3} \d{2} \d{3}$/ },
  { name: 'Denmark', code: 'DK', dialCode: '45', flag: '🇩🇰', format: 'XX XX XX XX', placeholder: '20 12 34 56', pattern: /^\d{2} \d{2} \d{2} \d{2}$/ },
  { name: 'Finland', code: 'FI', dialCode: '358', flag: '🇫🇮', format: 'XXX XXXXXXX', placeholder: '050 1234567', pattern: /^\d{3} \d{7}$/ },
  { name: 'Poland', code: 'PL', dialCode: '48', flag: '🇵🇱', format: 'XXX XXX XXX', placeholder: '512 345 678', pattern: /^\d{3} \d{3} \d{3}$/ },
  { name: 'Czech Republic', code: 'CZ', dialCode: '420', flag: '🇨🇿', format: 'XXX XXX XXX', placeholder: '601 123 456', pattern: /^\d{3} \d{3} \d{3}$/ },
  { name: 'Hungary', code: 'HU', dialCode: '36', flag: '🇭🇺', format: 'XX XXX XXXX', placeholder: '20 123 4567', pattern: /^\d{2} \d{3} \d{4}$/ },
  { name: 'Portugal', code: 'PT', dialCode: '351', flag: '🇵🇹', format: 'XXX XXX XXX', placeholder: '912 345 678', pattern: /^\d{3} \d{3} \d{3}$/ },
  { name: 'Greece', code: 'GR', dialCode: '30', flag: '🇬🇷', format: 'XXX XXX XXXX', placeholder: '694 123 4567', pattern: /^\d{3} \d{3} \d{4}$/ },
  { name: 'Turkey', code: 'TR', dialCode: '90', flag: '🇹🇷', format: 'XXX XXX XX XX', placeholder: '532 123 45 67', pattern: /^\d{3} \d{3} \d{2} \d{2}$/ },
  { name: 'Russia', code: 'RU', dialCode: '7', flag: '🇷🇺', format: 'XXX XXX-XX-XX', placeholder: '912 345-67-89', pattern: /^\d{3} \d{3}-\d{2}-\d{2}$/ },
  { name: 'Japan', code: 'JP', dialCode: '81', flag: '🇯🇵', format: 'XXX-XXXX-XXXX', placeholder: '090-1234-5678', pattern: /^\d{3}-\d{4}-\d{4}$/ },
  { name: 'South Korea', code: 'KR', dialCode: '82', flag: '🇰🇷', format: 'XXX-XXXX-XXXX', placeholder: '010-1234-5678', pattern: /^\d{3}-\d{4}-\d{4}$/ },
  { name: 'China', code: 'CN', dialCode: '86', flag: '🇨🇳', format: 'XXX XXXX XXXX', placeholder: '138 0013 8000', pattern: /^\d{3} \d{4} \d{4}$/ },
  { name: 'India', code: 'IN', dialCode: '91', flag: '🇮🇳', format: 'XXXXX XXXXX', placeholder: '98765 43210', pattern: /^\d{5} \d{5}$/ },
  { name: 'Singapore', code: 'SG', dialCode: '65', flag: '🇸🇬', format: 'XXXX XXXX', placeholder: '9123 4567', pattern: /^\d{4} \d{4}$/ },
  { name: 'Malaysia', code: 'MY', dialCode: '60', flag: '🇲🇾', format: 'XX-XXX XXXX', placeholder: '12-345 6789', pattern: /^\d{2}-\d{3} \d{4}$/ },
  { name: 'Thailand', code: 'TH', dialCode: '66', flag: '🇹🇭', format: 'XX-XXX-XXXX', placeholder: '08-1234-5678', pattern: /^\d{2}-\d{3}-\d{4}$/ },
  { name: 'Philippines', code: 'PH', dialCode: '63', flag: '🇵🇭', format: 'XXXX XXX XXXX', placeholder: '0917 123 4567', pattern: /^\d{4} \d{3} \d{4}$/ },
  { name: 'Indonesia', code: 'ID', dialCode: '62', flag: '🇮🇩', format: 'XXXX-XXXX-XXXX', placeholder: '0812-3456-7890', pattern: /^\d{4}-\d{4}-\d{4}$/ },
  { name: 'Vietnam', code: 'VN', dialCode: '84', flag: '🇻🇳', format: 'XXX XXX XXXX', placeholder: '091 234 5678', pattern: /^\d{3} \d{3} \d{4}$/ },
  { name: 'Hong Kong', code: 'HK', dialCode: '852', flag: '🇭🇰', format: 'XXXX XXXX', placeholder: '9123 4567', pattern: /^\d{4} \d{4}$/ },
  { name: 'Taiwan', code: 'TW', dialCode: '886', flag: '🇹🇼', format: 'XXXX XXX XXX', placeholder: '0912 345 678', pattern: /^\d{4} \d{3} \d{3}$/ },
  { name: 'Brazil', code: 'BR', dialCode: '55', flag: '🇧🇷', format: '(XX) XXXXX-XXXX', placeholder: '(11) 99999-9999', pattern: /^$$\d{2}$$ \d{5}-\d{4}$/ },
  { name: 'Argentina', code: 'AR', dialCode: '54', flag: '🇦🇷', format: 'XX XXXX-XXXX', placeholder: '11 1234-5678', pattern: /^\d{2} \d{4}-\d{4}$/ },
  { name: 'Mexico', code: 'MX', dialCode: '52', flag: '🇲🇽', format: 'XXX XXX XXXX', placeholder: '55 1234 5678', pattern: /^\d{3} \d{3} \d{4}$/ },
  { name: 'Chile', code: 'CL', dialCode: '56', flag: '🇨🇱', format: 'X XXXX XXXX', placeholder: '9 1234 5678', pattern: /^\d \d{4} \d{4}$/ },
  { name: 'Colombia', code: 'CO', dialCode: '57', flag: '🇨🇴', format: 'XXX XXX XXXX', placeholder: '300 123 4567', pattern: /^\d{3} \d{3} \d{4}$/ },
  { name: 'Peru', code: 'PE', dialCode: '51', flag: '🇵🇪', format: 'XXX XXX XXX', placeholder: '987 654 321', pattern: /^\d{3} \d{3} \d{3}$/ },
  { name: 'South Africa', code: 'ZA', dialCode: '27', flag: '🇿🇦', format: 'XXX XXX XXXX', placeholder: '082 123 4567', pattern: /^\d{3} \d{3} \d{4}$/ },
  { name: 'Nigeria', code: 'NG', dialCode: '234', flag: '🇳🇬', format: 'XXX XXX XXXX', placeholder: '803 123 4567', pattern: /^\d{3} \d{3} \d{4}$/ },
  { name: 'Kenya', code: 'KE', dialCode: '254', flag: '🇰🇪', format: 'XXX XXXXXX', placeholder: '712 123456', pattern: /^\d{3} \d{6}$/ },
  { name: 'Egypt', code: 'EG', dialCode: '20', flag: '🇪🇬', format: 'XXX XXX XXXX', placeholder: '100 123 4567', pattern: /^\d{3} \d{3} \d{4}$/ },
  { name: 'Morocco', code: 'MA', dialCode: '212', flag: '🇲🇦', format: 'XXX-XXXXXX', placeholder: '661-234567', pattern: /^\d{3}-\d{6}$/ },
  { name: 'Israel', code: 'IL', dialCode: '972', flag: '🇮🇱', format: 'XXX-XXX-XXXX', placeholder: '050-123-4567', pattern: /^\d{3}-\d{3}-\d{4}$/ },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '966', flag: '🇸🇦', format: 'XXX XXX XXXX', placeholder: '050 123 4567', pattern: /^\d{3} \d{3} \d{4}$/ },
  { name: 'UAE', code: 'AE', dialCode: '971', flag: '🇦🇪', format: 'XXX XXX XXXX', placeholder: '050 123 4567', pattern: /^\d{3} \d{3} \d{4}$/ },
  { name: 'New Zealand', code: 'NZ', dialCode: '64', flag: '🇳🇿', format: 'XXX XXX XXXX', placeholder: '021 123 4567', pattern: /^\d{3} \d{3} \d{4}$/ }
])

// Step navigation
const currentStep = ref(1)
const slideDirection = ref('slide-right')

const nextStep = () => {
  if (currentStep.value < 3) {
    slideDirection.value = 'slide-left'
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    slideDirection.value = 'slide-right'
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Form data with separate image variables
const form = ref<FormData>({
  firstName: '',
  lastName: '',
  email: '',
  country: '',
  phone: '',
  subject: '',
  message: '',
  deadline: '',
  drawingType: '',
  mainPhoto: null,
  optionalPhoto1: null,
  optionalPhoto2: null
})

// Form validation
const formErrors = ref<FormErrors>({})

// Separate upload states for each image
const uploadingMain = ref(false)
const uploadingOptional1 = ref(false)
const uploadingOptional2 = ref(false)
const showFullScreenLoader = ref(false)
const uploadProgress = ref(0)

// Separate drag states for each upload area
const isDraggingMain = ref(false)
const isDraggingOptional1 = ref(false)
const isDraggingOptional2 = ref(false)

// Separate preview URLs for each image
const mainPhotoUrl = ref('')
const optional1PhotoUrl = ref('')
const optional2PhotoUrl = ref('')
const mainPhotoPreview = ref('')
const optional1PhotoPreview = ref('')
const optional2PhotoPreview = ref('')

// File input refs
const mainPhotoInput = ref<HTMLInputElement | null>(null)
const optional1PhotoInput = ref<HTMLInputElement | null>(null)
const optional2PhotoInput = ref<HTMLInputElement | null>(null)

// Computed properties
const isAnyUploading = computed(() => 
  uploadingMain.value || uploadingOptional1.value || uploadingOptional2.value
)

const selectedCountry = computed(() => 
  countries.value.find(country => country.code === form.value.country)
)

const minDate = computed(() => {
  const today = new Date()
  const minDate = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000)) // 2 weeks from today
  return minDate.toISOString().split('T')[0]
})

// Country selection handler
const onCountryChange = () => {
  form.value.phone = ''
  formErrors.value.phone = ''
}

// Phone number validation
const validatePhoneNumber = () => {
  if (!form.value.phone || !selectedCountry.value) {
    formErrors.value.phone = ''
    return
  }

  const isValid = selectedCountry.value.pattern.test(form.value.phone)
  if (!isValid) {
    formErrors.value.phone = `Please enter a valid phone number in format: ${selectedCountry.value.format}`
  } else {
    formErrors.value.phone = ''
  }
}

// Form validation function
const validateForm = (): boolean => {
  const errors: FormErrors = {}

  // Required field validation
  if (!form.value.firstName.trim()) {
    errors.firstName = 'First name is required'
  }

  if (!form.value.lastName.trim()) {
    errors.lastName = 'Last name is required'
  }

  if (!form.value.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (!form.value.country) {
    errors.country = 'Please select your country'
  }

  if (form.value.phone && selectedCountry.value) {
    const isValid = selectedCountry.value.pattern.test(form.value.phone)
    if (!isValid) {
      errors.phone = `Please enter a valid phone number in format: ${selectedCountry.value.format}`
    }
  }

  if (!form.value.subject.trim()) {
    errors.subject = 'Subject is required'
  }

  if (!form.value.message.trim()) {
    errors.message = 'Message is required'
  }

  if (!form.value.deadline) {
    errors.deadline = 'Deadline is required'
  } else {
    const selectedDate = new Date(form.value.deadline)
    const minAllowedDate = new Date()
    minAllowedDate.setDate(minAllowedDate.getDate() + 14)
    
    if (selectedDate < minAllowedDate) {
      errors.deadline = 'Deadline must be at least 2 weeks from today'
    }
  }

  if (!form.value.drawingType) {
    errors.drawingType = 'Please select a drawing type'
  }

  if (!form.value.mainPhoto) {
    errors.mainPhoto = 'Main reference photo is required'
  }

  formErrors.value = errors
  return Object.keys(errors).length === 0
}

// Main photo upload handlers
const handleMainPhotoUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    await uploadMainPhoto(target.files[0])
  }
}

const onDropMain = async (event: DragEvent) => {
  isDraggingMain.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    await uploadMainPhoto(event.dataTransfer.files[0])
  }
}

const uploadMainPhoto = async (file: File) => {
  // Validate file size (15MB max)
  if (file.size > 15 * 1024 * 1024) {
    formErrors.value.mainPhoto = 'File size must be less than 15MB'
    return
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    formErrors.value.mainPhoto = 'Please upload an image file'
    return
  }

  uploadingMain.value = true
  showFullScreenLoader.value = true
  uploadProgress.value = 0
  formErrors.value.mainPhoto = ''

  // Simulate progress
  const progressInterval = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(progressInterval)
    }
  }, 150)

  try {
    const response = await singleUploadFile(file)
    mainPhotoUrl.value = response.url
    mainPhotoPreview.value = response.url
    form.value.mainPhoto = response.url
  } catch (error) {
    console.error('Upload failed:', error)
    formErrors.value.mainPhoto = 'Upload failed. Please try again.'
  } finally {
    uploadingMain.value = false
    showFullScreenLoader.value = false
    uploadProgress.value = 0
  }
}

const removeMainPhoto = () => {
  mainPhotoUrl.value = ''
  mainPhotoPreview.value = ''
  form.value.mainPhoto = null
  formErrors.value.mainPhoto = ''
  if (mainPhotoInput.value) {
    mainPhotoInput.value.value = ''
  }
}

// Optional Photo 1 upload handlers
const handleOptional1PhotoUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    await uploadOptional1Photo(target.files[0])
  }
}

const onDropOptional1 = async (event: DragEvent) => {
  isDraggingOptional1.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    await uploadOptional1Photo(event.dataTransfer.files[0])
  }
}

const uploadOptional1Photo = async (file: File) => {
  // Validate file size (15MB max)
  if (file.size > 15 * 1024 * 1024) {
    alert('File size must be less than 15MB')
    return
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file')
    return
  }

  uploadingOptional1.value = true
  showFullScreenLoader.value = true
  uploadProgress.value = 0

  // Simulate progress
  const progressInterval = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(progressInterval)
    }
  }, 150)

  try {
    const response = await singleUploadFile(file)
    optional1PhotoUrl.value = response.url
    optional1PhotoPreview.value = response.url
    form.value.optionalPhoto1 = response.url
  } catch (error) {
    console.error('Upload failed:', error)
    alert('Upload failed. Please try again.')
  } finally {
    uploadingOptional1.value = false
    showFullScreenLoader.value = false
    uploadProgress.value = 0
  }
}

const removeOptional1Photo = () => {
  optional1PhotoUrl.value = ''
  optional1PhotoPreview.value = ''
  form.value.optionalPhoto1 = null
  if (optional1PhotoInput.value) {
    optional1PhotoInput.value.value = ''
  }
}

// Optional Photo 2 upload handlers
const handleOptional2PhotoUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    await uploadOptional2Photo(target.files[0])
  }
}

const onDropOptional2 = async (event: DragEvent) => {
  isDraggingOptional2.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    await uploadOptional2Photo(event.dataTransfer.files[0])
  }
}

const uploadOptional2Photo = async (file: File) => {
  // Validate file size (15MB max)
  if (file.size > 15 * 1024 * 1024) {
    alert('File size must be less than 15MB')
    return
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file')
    return
  }

  uploadingOptional2.value = true
  showFullScreenLoader.value = true
  uploadProgress.value = 0

  // Simulate progress
  const progressInterval = setInterval(() => {
    uploadProgress.value += 10
    if (uploadProgress.value >= 100) {
      clearInterval(progressInterval)
    }
  }, 150)

  try {
    const response = await singleUploadFile(file)
    optional2PhotoUrl.value = response.url
    optional2PhotoPreview.value = response.url
    form.value.optionalPhoto2 = response.url
  } catch (error) {
    console.error('Upload failed:', error)
    alert('Upload failed. Please try again.')
  } finally {
    uploadingOptional2.value = false
    showFullScreenLoader.value = false
    uploadProgress.value = 0
  }
}

const removeOptional2Photo = () => {
  optional2PhotoUrl.value = ''
  optional2PhotoPreview.value = ''
  form.value.optionalPhoto2 = null
  if (optional2PhotoInput.value) {
    optional2PhotoInput.value.value = ''
  }
}

// Success modal
const showSuccessModal = ref(false)

const submitForm = async () => {
  if (!validateForm()) {
    // Scroll to first error
    const firstErrorField = Object.keys(formErrors.value)[0]
    const element = document.getElementById(firstErrorField)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      element.focus()
    }
    return
  }

  try {
    loading.value = true
    await createCommission(form.value)
    showSuccessModal.value = true
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      phone: '',
      subject: '',
      message: '',
      deadline: '',
      drawingType: '',
      mainPhoto: null,
      optionalPhoto1: null,
      optionalPhoto2: null
    }
    
    // Clear all previews
    removeMainPhoto()
    removeOptional1Photo()
    removeOptional2Photo()
    
    // Clear errors
    formErrors.value = {}
  } catch (error) {
    console.error('Submission failed:', error)
    alert('Submission failed. Please try again.')
  } finally {
    loading.value = false
  }
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  currentStep.value = 1
}

// Confetti animation helpers
const getConfettiStyle = (index: number) => ({
  left: Math.random() * 100 + '%',
  animationDelay: Math.random() * 3 + 's',
  animationDuration: (Math.random() * 3 + 2) + 's'
})

const getConfettiColor = (index: number) => {
  const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400']
  return colors[index % colors.length]
}

// Set minimum date on component mount
onMounted(() => {
  // Set minimum date for deadline input
  const today = new Date()
  const minDate = new Date(today.getTime() + (14 * 24 * 60 * 60 * 1000))
  form.value.deadline = minDate.toISOString().split('T')[0]
})
</script>

<style>
/* Enhanced animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes growLine {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes float {
  0% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-10px) rotate(14deg); }
  100% { transform: translateY(0) rotate(12deg); }
}

@keyframes floatSlow {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(3deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes floatReverse {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(15px) rotate(-3deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes pulseSlow {
  0% { transform: scale(1) rotate(3deg); }
  50% { transform: scale(1.05) rotate(3deg); }
  100% { transform: scale(1) rotate(3deg); }
}

@keyframes bounceX {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

@keyframes bounceIn {
  0% { opacity: 0; transform: translateY(100px) translateX(-50%) scale(0.3); }
  50% { opacity: 1; transform: translateY(-10px) translateX(-50%) scale(1.05); }
  70% { transform: translateY(5px) translateX(-50%) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) translateX(-50%) scale(1); }
}

@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spinReverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes confetti {
  0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}

@keyframes modalBounce {
  0% { opacity: 0; transform: scale(0.3) translateY(100px); }
  50% { opacity: 1; transform: scale(1.05) translateY(-10px); }
  70% { transform: scale(0.95) translateY(5px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes successIcon {
  0% { transform: scale(0) rotate(-180deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

@keyframes checkMark {
  0% { stroke-dasharray: 0 100; stroke-dashoffset: 0; }
  100% { stroke-dasharray: 100 0; stroke-dashoffset: 0; }
}

@keyframes textReveal {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes buttonReveal {
  0% { opacity: 0; transform: translateY(30px) scale(0.9); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

/* Step transition animations */
@keyframes slideLeftEnter {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideLeftLeave {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-100%); }
}

@keyframes slideRightEnter {
  from { opacity: 0; transform: translateX(-100%); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideRightLeave {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(100%); }
}

/* Apply animations */
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
.animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
.animate-grow-line { animation: growLine 1s ease-out forwards; animation-delay: 0.5s; }
.animate-float { animation: float 6s ease-in-out infinite; }
.animate-float-slow { animation: floatSlow 12s ease-in-out infinite; }
.animate-float-reverse { animation: floatReverse 10s ease-in-out infinite; }
.animate-pulse-slow { animation: pulseSlow 6s ease-in-out infinite; }
.animate-bounce-x { animation: bounceX 1s ease-in-out infinite; }
.animate-bounce-in { animation: bounceIn 0.8s ease-out forwards; }
.animate-spin-slow { animation: spinSlow 3s linear infinite; }
.animate-spin-reverse { animation: spinReverse 2s linear infinite; }
.animate-shimmer { 
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}
.animate-confetti { animation: confetti linear infinite; }
.animate-modal-bounce { animation: modalBounce 0.6s ease-out forwards; }
.animate-success-icon { animation: successIcon 0.8s ease-out forwards; }
.animate-check-mark { 
  stroke-dasharray: 100;
  animation: checkMark 0.8s ease-out forwards;
  animation-delay: 0.3s;
}
.animate-text-reveal { animation: textReveal 0.6s ease-out forwards; }
.animate-button-reveal { animation: buttonReveal 0.6s ease-out forwards; }

/* Step transition classes */
.slide-left-enter-active { animation: slideLeftEnter 0.5s ease-in-out; }
.slide-left-leave-active { animation: slideLeftLeave 0.5s ease-in-out; }
.slide-right-enter-active { animation: slideRightEnter 0.5s ease-in-out; }
.slide-right-leave-active { animation: slideRightLeave 0.5s ease-in-out; }

/* Transition styles */
.fullscreen-loader-enter-active, .fullscreen-loader-leave-active {
  transition: all 0.5s ease;
}
.fullscreen-loader-enter-from, .fullscreen-loader-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Enhanced hover effects */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #059669;
}

/* Mobile-specific improvements */
@media (max-width: 640px) {
  .animate-bounce-in {
    animation: bounceIn 0.6s ease-out forwards;
  }
  .fixed.bottom-6 {
    bottom: 1rem;
  }
}
</style>
