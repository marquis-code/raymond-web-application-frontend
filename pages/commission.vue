<template>
  <div class="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50">
    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-rose-100 rounded-full opacity-30 blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-100 rounded-full opacity-30 blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6 relative">
              <span class="relative inline-block">
                COMMISSION 
                <span class="absolute -bottom-2 left-0 w-full h-1 bg-rose-400 transform -skew-x-12"></span>
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
              <a 
                href="#commission-form" 
                class="relative z-10 inline-flex items-center px-8 py-3 bg-emerald-600 text-white font-medium rounded-md transition-transform duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ORDER NOW
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>
              <div class="absolute inset-0 bg-emerald-800 rounded-md transform transition-transform duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-2 group-hover:-translate-y-2"></div>
            </div>
          </div>
          
          <div class="order-1 lg:order-2 relative">
            <div class="relative">
              <div class="absolute inset-0 bg-amber-100 rounded-lg transform rotate-3"></div>
              <img 
                src="@/assets/img/commission-art1.jpg" 
                alt="Artwork Sample" 
                class="relative z-10 rounded-lg shadow-xl w-full h-auto transform -rotate-3 transition-transform duration-500 hover:rotate-0"
                @error="handleImageError"
              />
            </div>
            
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-100 rounded-full flex items-center justify-center transform rotate-12 shadow-lg">
              <span class="text-rose-800 font-bold text-lg text-center px-4">Premium Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Process Steps -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-16 text-gray-800">How It Works</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="bg-amber-50 p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-2">
            <div class="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">1</div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">Choose Size & Price</h3>
            <p class="text-gray-600">Select from various sizes based on your wall space and budget.</p>
          </div>
          
          <div class="bg-rose-50 p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-2">
            <div class="w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">2</div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">Submit Reference Photo</h3>
            <p class="text-gray-600">Provide a clear, high-quality photo for the best possible results.</p>
          </div>
          
          <div class="bg-emerald-50 p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-2">
            <div class="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">3</div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">Contract & Payment</h3>
            <p class="text-gray-600">Secure your commission with an initial deposit and agreement.</p>
          </div>
          
          <div class="bg-purple-50 p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:-translate-y-2">
            <div class="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">4</div>
            <h3 class="text-xl font-bold mb-3 text-gray-800">Creation & Delivery</h3>
            <p class="text-gray-600">Your artwork is created with care and shipped securely worldwide.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Sizes and Prices -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Sizes and Prices</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ul class="space-y-4">
              <li class="flex items-center">
                <div class="w-3 h-3 bg-amber-400 rounded-full mr-3"></div>
                <span class="font-bold text-gray-800 mr-2">Small Size:</span>
                <span class="text-gray-600">16 x 20 Inches</span>
              </li>
              <li class="flex items-center">
                <div class="w-3 h-3 bg-rose-400 rounded-full mr-3"></div>
                <span class="font-bold text-gray-800 mr-2">Basic Size:</span>
                <span class="text-gray-600">20 x 24 Inches</span>
              </li>
              <li class="flex items-center">
                <div class="w-3 h-3 bg-emerald-400 rounded-full mr-3"></div>
                <span class="font-bold text-gray-800 mr-2">Medium Size:</span>
                <span class="text-gray-600">24 x 30 Inch / 24 x36 Inches</span>
              </li>
              <li class="flex items-center">
                <div class="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                <span class="font-bold text-gray-800 mr-2">Large Size:</span>
                <span class="text-gray-600">36 x 42 Inches</span>
              </li>
              <li class="flex items-center">
                <div class="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                <span class="font-bold text-gray-800 mr-2">Extra Large Size:</span>
                <span class="text-gray-600">40 x 46 Inches</span>
              </li>
            </ul>
            
            <div class="mt-8 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-md">
              <p class="text-gray-700"><span class="font-bold">Note:</span> For portraits of more than one person, prices will be based on the number of faces - $200-$300 per face/person.</p>
            </div>
            
            <p class="mt-6 text-gray-600">
              If you wish to have a different size than what is stated, note that in your submission form.
            </p>
          </div>
          
          <div class="relative">
            <div class="grid grid-cols-3 gap-2 p-4 bg-white rounded-lg shadow-lg">
              <div class="aspect-[3/4] bg-gray-100 rounded"></div>
              <div class="aspect-[3/4] bg-gray-100 rounded col-span-2 row-span-2"></div>
              <div class="aspect-[3/4] bg-gray-100 rounded"></div>
              <div class="aspect-[3/4] bg-gray-100 rounded col-span-2"></div>
              <div class="aspect-[3/4] bg-gray-100 rounded"></div>
            </div>
            
            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-rose-100 rounded-full flex items-center justify-center transform rotate-12 shadow-lg">
              <span class="text-rose-800 font-bold text-center px-2">Custom sizes available!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Commission Form -->
    <section id="commission-form" class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Commission Request</h2>
        
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First name *</label>
              <input 
                id="firstName" 
                v-model="form.firstName" 
                type="text" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last name *</label>
              <input 
                id="lastName" 
                v-model="form.lastName" 
                type="text" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input 
                id="email" 
                v-model="form.email" 
                type="email" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input 
                id="phone" 
                v-model="form.phone" 
                type="tel"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
            <input 
              id="subject" 
              v-model="form.subject" 
              type="text" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">
              Message - (Describe your idea/story for this artwork, if it is a gift, for a special occasion etc. Mention any important details.) *
            </label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="5" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-rose-50"
            ></textarea>
          </div>
          
          <div>
            <label for="deadline" class="block text-sm font-medium text-gray-700 mb-1">
              I would love my artwork to be ready on or before... (Include any deadline dates if necessary, e.g. Birthday. Please note that drawings take at least 3-4 to make) *
            </label>
            <input 
              id="deadline" 
              v-model="form.deadline" 
              type="date" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          
          <div>
            <label for="drawingType" class="block text-sm font-medium text-gray-700 mb-1">What kind of drawing would you like? *</label>
            <select 
              id="drawingType" 
              v-model="form.drawingType" 
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="" disabled selected>Select drawing type</option>
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
              <option value="pet">Pet Portrait</option>
              <option value="family">Family Portrait</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Upload the reference photo you want to use for the artwork</label>
            <div class="flex items-center justify-center w-full">
              <label 
                for="mainPhoto" 
                class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 15MB)</p>
                </div>
                <input id="mainPhoto" type="file" class="hidden" @change="handleFileUpload" />
              </label>
            </div>
            <p class="mt-2 text-sm text-gray-500">Kindly upload clear photos.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Optional - For more than one reference photo</label>
              <div class="flex items-center justify-center w-full">
                <label 
                  for="optionalPhoto1" 
                  class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
                  class="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
          
          <div class="pt-4">
            <button 
              type="submit" 
              class="w-full py-3 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    form.value.mainPhoto = target.files[0]
  }
}

const submitForm = () => {
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', form.value)
  
  // Show success message or redirect
  alert('Thank you for your commission request! We will contact you shortly.')
  
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
}

const handleImageError = (event: Event) => {
  // Fallback for image loading errors
  const target = event.target as HTMLImageElement
  target.src = '/placeholder.svg?height=400&width=300'
}
</script>

<style scoped>
/* Optional: Add any additional custom styles here */
@keyframes float {
  0% {
    transform: translateY(0px) rotate(12deg);
  }
  50% {
    transform: translateY(-10px) rotate(14deg);
  }
  100% {
    transform: translateY(0px) rotate(12deg);
  }
}

.absolute {
  animation: float 6s ease-in-out infinite;
}
</style>