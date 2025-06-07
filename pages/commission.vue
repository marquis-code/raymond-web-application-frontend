<template>
  <div class="min-h-screen mt-20">
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
            <div 
              class="h-full bg-white rounded-full transition-all duration-500 ease-out animate-shimmer"
              :style="{ width: uploadProgress + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Step 1: Hero Section -->
    <section v-if="currentStep === 1" class="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-rose-100 rounded-full opacity-30 blur-3xl animate-float-slow"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-100 rounded-full opacity-30 blur-3xl animate-float-reverse"></div>
      
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1 animate-slide-up">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6 relative">
              <span class="relative inline-block">
                COMMISSION 
                <span class="absolute -bottom-2 left-0 w-full h-1 bg-rose-400 transform -skew-x-12 animate-grow-line"></span>
              </span>
              <span class="block mt-2">AN ARTWORK</span>
              <span class="block text-2xl md:text-3xl font-medium mt-2">FULLY HAND-MADE WITH</span>
              <span class="block text-2xl md:text-3xl font-medium">CHARCOAL, PASTELS & ACRYLIC</span>
            </h1>
            
            <p class="text-xl italic text-gray-600 mb-8">Custom artwork, a special piece made for you...</p>
            
            <p class="text-gray-700 mb-6">
              Would you like to order a portrait of your loved one, pet, a sentimental gift
              for a special occasion or memorial portrait?
            </p>
            
            <div class="relative inline-block group">
              <button 
                @click="nextStep" 
                class="relative z-10 inline-flex items-center px-8 py-3 bg-emerald-600 text-white font-medium rounded-md transition-transform duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                LEARN MORE
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 animate-bounce-x" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <div class="absolute inset-0 bg-emerald-800 rounded-md transform transition-transform duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
            </div>
          </div>
          
          <div class="order-1 lg:order-2 relative animate-fade-in">
            <div class="relative">
              <div class="absolute inset-0 bg-amber-100 rounded-lg transform rotate-3 animate-pulse-slow"></div>
                  <img src="@/assets/img/commission.jpg"  class="relative z-10 rounded-lg shadow-xl w-full h-auto transform -rotate-3 transition-transform duration-500 hover:rotate-0" />
            </div>
            
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-100 rounded-full flex items-center justify-center transform rotate-12 shadow-lg animate-float">
              <span class="text-rose-800 font-bold text-lg text-center px-4">Premium Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Step 2: Information Section -->
    <div v-if="currentStep === 2" class="animate-fade-in bg-white">
      <div class="bg-black text-white py-10 px-4 text-center">
        <h2 class="text-2xl font-bold mb-2">BOOK YOUR CUSTOM DRAWING</h2>
        <p class="text-sm">NOTE: (kindly go through the details below for better description)</p>
        <button @click="nextStep" class="text-sm mt-2 hover:text-emerald-300 transition-colors duration-300">Please submit this form to place an order</button>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- 1. SIZES AND PRICES -->
        <div class="mb-12 animate-slide-up">
          <h3 class="text-xl font-bold mb-4">1. SIZES AND PRICES</h3>
          <p class="mb-2">Depending on your wall space, budget and photographs.</p>
          <p class="mb-4">I offer the following sizes.</p>
          
          <ul class="space-y-1 mb-4">
            <li><span class="font-bold">Small Size</span> - 16 x 20 Inches</li>
            <li><span class="font-bold">Basic Size</span> - 20 x 24 Inches</li>
            <li><span class="font-bold">Medium Size</span> - 24 x 30 Inch / 24 x36 Inches</li>
            <li><span class="font-bold">Large Size</span> - 36 x 42 Inches</li>
            <li><span class="font-bold">Extra Large Size</span> - 40 x 46 Inches</li>
          </ul>
          
          <p class="mb-2">If you wish to have a different size than what is stated, note that in your submission form.</p>
          <p class="font-bold">NOTE: for portraits of more than one person, prices will be based on the number of faces - $200-$300 per faces/persons.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-slide-up" style="animation-delay: 0.2s;">
     

        </div>
        
        <!-- 2. REFERENCE PHOTO -->
        <div class="mb-12 animate-slide-up" style="animation-delay: 0.4s;">
          <h3 class="text-xl font-bold mb-4">2. REFERENCE PHOTO</h3>
          <p class="mb-2">To create your drawing, you have to choose a reference photo. It is important to be able to determine which photo will allow for the best possible reference material, the clearer the photo, the better the portrait. That way I am able to achieve the desired final result.</p>
          <p class="mb-2">I draw portraits, preferably a head and shoulder portraits. But also pets or landscapes.</p>
          <p class="mb-2">Do you want to combine separate photos in one drawing? I can make that possible depending on the photos you have. I will present you with a mock-up (With different compositions, backgrounds etc.) to give you an idea of what the drawing can look like.</p>
          <p class="mb-2">Once you have submitted your commission form, I will contact you to discuss further details. If you are unsure of what photo to choose, I can help you in making the right decision for best results.</p>
        </div>
        
        <!-- 3. CONTRACT & PAYMENT -->
        <div class="mb-12 animate-slide-up" style="animation-delay: 0.6s;">
          <h3 class="text-xl font-bold mb-4">3. CONTRACT & PAYMENT</h3>
          <p class="mb-2">Commissions require an initial deposit and contractual agreement.</p>
          <p class="mb-2">Once you have your chosen the portrait size and reference photo, simply submit your commission through the submission form.</p>
          <p class="mb-2">We will then discuss further details of your drawing.</p>
          <p class="mb-2">Once you are happy with the idea and you are ready to place your order. You will receive the contract and invoice.</p>
          <p class="mb-2">Payment can be made securely through Card, bank transfer, Western Union, Ria, Money Gram.</p>
        </div>
        
        <!-- 4. TIME OF CREATION -->
        <div class="mb-12 animate-slide-up" style="animation-delay: 0.8s;">
          <h3 class="text-xl font-bold mb-4">4. TIME OF CREATION</h3>
          <p class="mb-2">After your deposit has been successfully received, I will start working on your drawing. It is important to allow enough time for creation of the artwork. I will inform you on time needed depending on your choice of size and photo (At least 2-4 weeks).</p>
          <p class="mb-2">During this process you will receive updates of your drawing. That way you get to watch your artwork come together until it is completed.</p>
          <p class="mb-2">I will present you with final result photos. Once this is approved by you, I will start preparing the shipment.</p>
        </div>
        
        <!-- 5. SHIPPING -->
        <div class="mb-12 animate-slide-up" style="animation-delay: 1s;">
          <h3 class="text-xl font-bold mb-4">5. SHIPPING</h3>
          <p class="mb-2">The most exciting part! Your drawing has been approved by you and will now be prepared for shipment. I ship with DHL Express Fed Ex, and USPS worldwide. Estimated delivery time is 4-7 business days worldwide.</p>
          <p class="mb-2">Artworks are shipped rolled in a protective tube. All packages are well protected and insured for a guaranteed safe arrival of your artwork. Your portrait will arrive with a thank you note and certificate of authenticity.</p>
          <p class="mb-2">Your package is sent securely, tracked and will require a signature upon arrival. I am not responsible for expenses or delays that may occur depending on the regulations in your country.</p>
        </div>
      </div>
    </div>
    
    <!-- Step 3: Enhanced Commission Form -->
    <section v-if="currentStep === 3" id="commission-form" class="py-20 px-4 sm:px-6 lg:px-8 bg-white animate-fade-in">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Commission Request</h2>
        
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="animate-slide-up" style="animation-delay: 0.1s;">
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First name *</label>
              <input 
                id="firstName" 
                v-model="form.firstName" 
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300"
              />
            </div>
            
            <div class="animate-slide-up" style="animation-delay: 0.2s;">
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
              <input 
                id="lastName" 
                v-model="form.lastName" 
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="animate-slide-up" style="animation-delay: 0.3s;">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input 
                id="email" 
                v-model="form.email" 
                type="email" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300"
              />
            </div>
            
            <div class="animate-slide-up" style="animation-delay: 0.4s;">
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input 
                id="phone" 
                v-model="form.phone" 
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300"
              />
            </div>
          </div>
          
          <div class="animate-slide-up" style="animation-delay: 0.5s;">
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
            <input 
              id="subject" 
              v-model="form.subject" 
              type="text" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300"
            />
          </div>
          
          <div class="animate-slide-up" style="animation-delay: 0.6s;">
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
              Message - (Describe your idea/story for this artwork) *
            </label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="5" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-rose-50 transition-all duration-300 hover:border-emerald-300"
            ></textarea>
          </div>
          
          <div class="animate-slide-up" style="animation-delay: 0.7s;">
            <label for="deadline" class="block text-sm font-medium text-gray-700 mb-1">
              Deadline *
            </label>
            <input 
              id="deadline" 
              v-model="form.deadline" 
              type="date" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300"
            />
          </div>
          
          <div class="animate-slide-up" style="animation-delay: 0.8s;">
            <label for="drawingType" class="block text-sm font-medium text-gray-700 mb-1">What kind of drawing would you like? *</label>
            <select 
              v-if="!fetchingTypes"
              id="drawingType" 
              v-model="form.drawingType" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-emerald-300"
            >
              <option value="" disabled selected>Select drawing type</option>
              <option v-for="(item, idx) in drawingTypes" :key="idx" :value="item._id">{{item?.name}}</option>
            </select>
          </div>
          
          <!-- Main Photo Upload -->
          <div class="animate-slide-up" style="animation-delay: 0.9s;">
            <label class="block text-sm font-medium text-gray-700 mb-3">Main Reference Photo *</label>
            <div class="flex items-center justify-center w-full">
              <label 
                for="mainPhoto" 
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]"
                :class="{ 
                  'border-emerald-300 bg-emerald-50': isDraggingMain,
                  'pointer-events-none': uploadingMain
                }"
                @dragover.prevent="isDraggingMain = true"
                @dragleave.prevent="isDraggingMain = false"
                @drop.prevent="onDropMain"
              >
                <!-- Loading State -->
                <div v-if="uploadingMain" class="flex flex-col items-center justify-center pt-5 pb-6">
                  <div class="w-10 h-10 mb-4">
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
                  <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
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
                      class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 transform hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
          </div>
          
          <!-- Optional Photo Uploads -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style="animation-delay: 1s;">
            <!-- Optional Photo 1 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Optional Photo 1</label>
              <div class="flex items-center justify-center w-full">
                <label 
                  for="optionalPhoto1" 
                  class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]"
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
                    <div class="w-6 h-6 mb-2">
                      <svg class="animate-spin text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <p class="text-xs text-emerald-600 font-medium">Uploading...</p>
                  </div>
                  
                  <!-- No File State -->
                  <div v-else-if="!optional1PhotoUrl" class="flex flex-col items-center justify-center pt-3 pb-3">
                    <svg class="w-6 h-6 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
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
                      class="absolute top-3 right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 transform hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
                  class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]"
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
                    <div class="w-6 h-6 mb-2">
                      <svg class="animate-spin text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                    <p class="text-xs text-emerald-600 font-medium">Uploading...</p>
                  </div>
                  
                  <!-- No File State -->
                  <div v-else-if="!optional2PhotoUrl" class="flex flex-col items-center justify-center pt-3 pb-3">
                    <svg class="w-6 h-6 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
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
                      class="absolute top-3 right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 transform hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
          
          <div class="pt-4 animate-slide-up" style="animation-delay: 1.1s;">
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                type="button"
                @click="prevStep"
                class="py-3 px-4 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                :disabled="loading"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                Back
              </button>
              <button 
                type="submit" 
                class="flex-1 py-3 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                :disabled="loading || isAnyUploading"
              >
                <div v-if="loading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
                <span v-else>Submit Commission Request</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    
    <!-- Enhanced Success Modal with Confetti -->
    <transition name="modal">
      <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" @click="closeSuccessModal"></div>
        
        <!-- Confetti Animation -->
        <div class="absolute inset-0 pointer-events-none">
          <div v-for="i in 50" :key="i" 
               class="absolute animate-confetti"
               :style="getConfettiStyle(i)">
            <div class="w-2 h-2 rounded-full"
                 :class="getConfettiColor(i)"></div>
          </div>
        </div>
        
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-modal-bounce">
          <div class="text-center">
            <!-- Animated Success Icon -->
            <div class="relative w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white animate-check-mark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
              <div class="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20"></div>
            </div>
            
            <h3 class="text-3xl font-bold text-gray-800 mb-3 animate-text-reveal">Congratulations!</h3>
            <p class="text-gray-600 mb-6 animate-text-reveal" style="animation-delay: 0.2s;">
              Your commission request has been submitted successfully! 🎨
            </p>
            <p class="text-sm text-gray-500 mb-8 animate-text-reveal" style="animation-delay: 0.4s;">
              We will contact you shortly to discuss the details and begin creating your masterpiece.
            </p>
            
            <button 
              @click="closeSuccessModal" 
              class="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 animate-button-reveal"
              style="animation-delay: 0.6s;"
            >
              Continue Your Journey
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCreateCommission } from "@/composables/modules/commission/useCreateCommission"
import { useSingleUploadFile } from "@/composables/core/useSingleUpload"
import { useFetchDrawingTypes } from "@/composables/modules/commission/useFetchDrawingTypes"

// Composables
const { loading, createCommission } = useCreateCommission()
const { singleUploadFile } = useSingleUploadFile()
const { loading: fetchingTypes, drawingTypes } = useFetchDrawingTypes()

// Step navigation
const currentStep = ref(1)

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Form data with separate image variables
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  deadline: '',
  drawingType: '',
  mainPhoto: null as string | null,
  optionalPhoto1: null as string | null,
  optionalPhoto2: null as string | null
})

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

// Computed property to check if any upload is in progress
const isAnyUploading = computed(() => 
  uploadingMain.value || uploadingOptional1.value || uploadingOptional2.value
)

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
  uploadingMain.value = true
  showFullScreenLoader.value = true
  uploadProgress.value = 0
  
  try {
    const response = await singleUploadFile(file)
    mainPhotoUrl.value = response.url
    mainPhotoPreview.value = response.url
    form.value.mainPhoto = response.url
  } catch (error) {
    console.error('Upload failed:', error)
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
  uploadingOptional1.value = true
  showFullScreenLoader.value = true
  uploadProgress.value = 0
  
  try {
    const response = await singleUploadFile(file)
    optional1PhotoUrl.value = response.url
    optional1PhotoPreview.value = response.url
    form.value.optionalPhoto1 = response.url
  } catch (error) {
    console.error('Upload failed:', error)
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
  uploadingOptional2.value = true
  showFullScreenLoader.value = true
  uploadProgress.value = 0
  
  try {
    const response = await singleUploadFile(file)
    optional2PhotoUrl.value = response.url
    optional2PhotoPreview.value = response.url
    form.value.optionalPhoto2 = response.url
  } catch (error) {
    console.error('Upload failed:', error)
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
  try {
    await createCommission(form.value)
    showSuccessModal.value = true
    
    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
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
  } catch (error) {
    console.error('Submission failed:', error)
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
</script>

<style>
/* Enhanced animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
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
  0% { 
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% { 
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

@keyframes modalBounce {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(100px);
  }
  50% {
    opacity: 1;
    transform: scale(1.05) translateY(-10px);
  }
  70% {
    transform: scale(0.95) translateY(5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes successIcon {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

@keyframes checkMark {
  0% {
    stroke-dasharray: 0 100;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: 100 0;
    stroke-dashoffset: 0;
  }
}

@keyframes textReveal {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes buttonReveal {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Apply animations */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 0.8s ease-out forwards;
}

.animate-grow-line {
  animation: growLine 1s ease-out forwards;
  animation-delay: 0.5s;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: floatSlow 12s ease-in-out infinite;
}

.animate-float-reverse {
  animation: floatReverse 10s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulseSlow 6s ease-in-out infinite;
}

.animate-bounce-x {
  animation: bounceX 1s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spinSlow 3s linear infinite;
}

.animate-spin-reverse {
  animation: spinReverse 2s linear infinite;
}

.animate-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

.animate-confetti {
  animation: confetti linear infinite;
}

.animate-modal-bounce {
  animation: modalBounce 0.6s ease-out forwards;
}

.animate-success-icon {
  animation: successIcon 0.8s ease-out forwards;
}

.animate-check-mark {
  stroke-dasharray: 100;
  animation: checkMark 0.8s ease-out forwards;
  animation-delay: 0.3s;
}

.animate-text-reveal {
  animation: textReveal 0.6s ease-out forwards;
}

.animate-button-reveal {
  animation: buttonReveal 0.6s ease-out forwards;
}

/* Transition styles */
.fullscreen-loader-enter-active,
.fullscreen-loader-leave-active {
  transition: all 0.5s ease;
}

.fullscreen-loader-enter-from,
.fullscreen-loader-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
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
</style>