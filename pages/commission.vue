<template>
  <div class="min-h-screen mt-20">
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
              <img 
                src="@/assets/img/commission.jpg" 
                alt="Artwork Sample" 
                class="relative z-10 rounded-lg shadow-xl w-full h-auto transform -rotate-3 transition-transform duration-500 hover:rotate-0"
                @error="handleImageError"
              />
            </div>
            
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-100 rounded-full flex items-center justify-center transform rotate-12 shadow-lg animate-float">
              <span class="text-rose-800 font-bold text-lg text-center px-4">Premium Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Step 2: Exactly as in the uploaded image -->
    <div v-if="currentStep === 2" class="animate-fade-in bg-white">
      <div class="bg-black text-white py-10 px-4 text-center">
        <h2 class="text-2xl font-bold mb-2">BOOK YOUR CUSTOM DRAWING</h2>
        <p class="text-sm">NOTE: (kindly go through the details below for better description)</p>
        <button @click="nextStep" class="text-sm mt-2">Please submit this form to place an order</button>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <!-- 1. SIZES AND PRICES -->
        <div class="mb-12">
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
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <img 
            src="@/assets/img/size1.jpg" 
            alt="Size Chart Left" 
            class="w-full h-auto rounded-lg"
          />
          <img 
          src="@/assets/img/size2.jpg" 
            alt="Size Chart Right" 
            class="w-full h-auto rounded-lg"
          />
        </div>
        
        <!-- 2. REFERENCE PHOTO -->
        <div class="mb-12">
          <h3 class="text-xl font-bold mb-4">2. REFERENCE PHOTO</h3>
          <p class="mb-2">To create your drawing, you have to choose a reference photo. It is important to be able to determine which photo will allow for the best possible reference material, the clearer the photo, the better the portrait. That way I am able to achieve the desired final result.</p>
          <p class="mb-2">I draw portraits, preferably a head and shoulder portraits. But also pets or landscapes.</p>
          <p class="mb-2">Do you want to combine separate photos in one drawing? I can make that possible depending on the photos you have. I will present you with a mock-up (With different compositions, backgrounds etc.) to give you an idea of what the drawing can look like.</p>
          <p class="mb-2">Once you have submitted your commission form, I will contact you to discuss further details. If you are unsure of what photo to choose, I can help you in making the right decision for best results.</p>
        </div>
        
        <!-- 3. CONTRACT & PAYMENT -->
        <div class="mb-12">
          <h3 class="text-xl font-bold mb-4">3. CONTRACT & PAYMENT</h3>
          <p class="mb-2">Commissions require an initial deposit and contractual agreement.</p>
          <p class="mb-2">Once you have your chosen the portrait size and reference photo, simply submit your commission through the submission form.</p>
          <p class="mb-2">We will then discuss further details of your drawing.</p>
          <p class="mb-2">Once you are happy with the idea and you are ready to place your order. You will receive the contract and invoice.</p>
          <p class="mb-2">Payment can be made securely through Card, bank transfer, Western Union, Ria, Money Gram.</p>
        </div>
        
        <!-- 4. TIME OF CREATION -->
        <div class="mb-12">
          <h3 class="text-xl font-bold mb-4">5. TIME OF CREATION</h3>
          <p class="mb-2">After your deposit has been successfully received, I will start working on your drawing. It is important to allow enough time for creation of the artwork. I will inform you on time needed depending on your choice of size and photo (At least 2-4 weeks).</p>
          <p class="mb-2">During this process you will receive updates of your drawing. That way you get to watch your artwork come together until it is completed.</p>
          <p class="mb-2">I will present you with final result photos. Once this is approved by you, I will start preparing the shipment.</p>
        </div>
        
        <!-- 5. SHIPPING -->
        <div class="mb-12">
          <h3 class="text-xl font-bold mb-4">4. SHIPPING</h3>
          <p class="mb-2">The most exciting part! Your drawing has been approved by you and will now be prepared for shipment. I ship with DHL Express Fed Ex, and USPS worldwide. Estimated delivery time is 4-7 business days worldwide.</p>
          <p class="mb-2">Artworks are shipped rolled in a protective tube. All packages are well protected and insured for a guaranteed safe arrival of your artwork. Your portrait will arrive with a thank you note and certificate of authenticity.</p>
          <p class="mb-2">Your package is sent securely, tracked and will require a signature upon arrival. I am not responsible for expenses or delays that may occur depending on the regulations in your country.</p>
        </div>
        
        <!-- Navigation Buttons -->
        <!-- <div class="flex justify-center py-8 space-x-4">
          <button 
            @click="prevStep" 
            class="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
            Back
          </button>
          <button 
            @click="nextStep" 
            class="px-6 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors duration-300 flex items-center"
          >
            Continue to Order Form
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div> -->
      </div>
    </div>
    
    <!-- Step 3: Commission Form -->
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
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div class="animate-slide-up" style="animation-delay: 0.2s;">
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
              <input 
                id="lastName" 
                v-model="form.lastName" 
                type="text" 
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div class="animate-slide-up" style="animation-delay: 0.4s;">
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input 
                id="phone" 
                v-model="form.phone" 
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div class="animate-slide-up" style="animation-delay: 0.6s;">
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
              Message - (Describe your idea/story for this artwork, if it is a gift, for a special occasion etc. Mention any important details.) *
            </label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="5" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-rose-50"
            ></textarea>
          </div>
          
          <div class="animate-slide-up" style="animation-delay: 0.7s;">
            <label for="deadline" class="block text-sm font-medium text-gray-700 mb-1">
              I would love my artwork to be ready on or before... (Include any deadline dates if necessary, e.g. Birthday. Please note that drawings take at least 3-4 weeks to make) *
            </label>
            <input 
              id="deadline" 
              v-model="form.deadline" 
              type="date" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div class="animate-slide-up" style="animation-delay: 0.8s;">
            <label for="drawingType" class="block text-sm font-medium text-gray-700 mb-1">What kind of drawing would you like? *</label>
            <select 
              id="drawingType" 
              v-model="form.drawingType" 
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="" disabled selected>Select drawing type</option>
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
              <option value="pet">Pet Portrait</option>
              <option value="family">Family Portrait</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div class="animate-slide-up" style="animation-delay: 0.9s;">
            <label class="block text-sm font-medium text-gray-700 mb-3">Upload the reference photo you want to use for the artwork</label>
            <div class="flex items-center justify-center w-full">
              <label 
                for="mainPhoto" 
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                :class="{ 'border-emerald-300 bg-emerald-50': isDragging }"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="onDrop"
              >
                <div v-if="!form.mainPhoto" class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 15MB)</p>
                </div>
                <div v-else class="flex flex-col items-center justify-center w-full h-full">
                  <div class="relative w-full h-full">
                    <img 
                      :src="previewImage" 
                      alt="Preview" 
                      class="w-full h-full object-contain"
                    />
                    <button 
                      @click.stop="removeFile" 
                      class="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                <input id="mainPhoto" type="file" class="hidden" @change="handleFileUpload" ref="fileInput" />
              </label>
            </div>
            <p class="mt-2 text-sm text-gray-500">Kindly upload clear photos.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up" style="animation-delay: 1s;">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Optional - For more than one reference photo</label>
              <div class="flex items-center justify-center w-full">
                <label 
                  for="optionalPhoto1" 
                  class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                >
                  <div class="flex flex-col items-center justify-center pt-3 pb-3">
                    <svg class="w-6 h-6 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="text-xs text-gray-500">Upload File (MAX. 15MB)</p>
                  </div>
                  <input id="optionalPhoto1" type="file" class="hidden" />
                </label>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Optional - For more than one reference photo</label>
              <div class="flex items-center justify-center w-full">
                <label 
                  for="optionalPhoto2" 
                  class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                >
                  <div class="flex flex-col items-center justify-center pt-3 pb-3">
                    <svg class="w-6 h-6 mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p class="text-xs text-gray-500">Upload File (MAX. 15MB)</p>
                  </div>
                  <input id="optionalPhoto2" type="file" class="hidden" />
                </label>
              </div>
            </div>
          </div>
          
          <div class="pt-4 animate-slide-up" style="animation-delay: 1.1s;">
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                type="button"
                @click="prevStep"
                class="py-3 px-4 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                </svg>
                Back
              </button>
              <button 
                type="submit" 
                class="flex-1 py-3 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
    
    <!-- Success Modal -->
    <transition name="modal">
      <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="showSuccessModal = false"></div>
        <div class="relative bg-white rounded-lg shadow-2xl max-w-md w-full p-6 animate-modal-in">
          <div class="text-center">
            <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
            <p class="text-gray-600 mb-6">Your commission request has been submitted successfully. We will contact you shortly to discuss the details.</p>
            <button 
              @click="closeSuccessModal" 
              class="w-full py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Step navigation
const currentStep = ref(1)
const stepTitles = [
  'Commission an Artwork',
  'Commission Process',
  'Request Form'
]

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    // Scroll to top when changing steps
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  deadline: '',
  drawingType: '',
  mainPhoto: null as File | null
})

// File upload handling
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const previewImage = ref('')

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    form.value.mainPhoto = target.files[0]
    createPreview()
  }
}

const onDrop = (event: DragEvent) => {
  isDragging.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    form.value.mainPhoto = event.dataTransfer.files[0]
    createPreview()
  }
}

const createPreview = () => {
  if (form.value.mainPhoto) {
    previewImage.value = URL.createObjectURL(form.value.mainPhoto)
  }
}

const removeFile = () => {
  form.value.mainPhoto = null
  previewImage.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Success modal
const showSuccessModal = ref(false)

const submitForm = () => {
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', form.value)
  
  // Show success modal
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
    mainPhoto: null
  }
  
  // Clear preview
  previewImage.value = ''
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  // Optionally, redirect back to step 1
  currentStep.value = 1
}

const handleImageError = (event: Event) => {
  // Fallback for image loading errors
  const target = event.target as HTMLImageElement
  target.src = '/placeholder.svg?height=400&width=300'
}
</script>

<style>
/* Base animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
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

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
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

.animate-modal-in {
  animation: modalIn 0.5s ease-out forwards;
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>