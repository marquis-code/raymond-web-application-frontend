<template>
    <div class="min-h-screen bg-gradient-to-br mt-10 from-gray-50 to-gray-100">
      <!-- Decorative Elements -->
      <div class="absolute top-20 left-10 w-64 h-64 bg-rose-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div class="text-center mb-16">
          <h1 class="text-3xl font-bold text-gray-800 mb-4 relative inline-block">
            CONTACT
            <span class="absolute -bottom-2 left-0 w-full h-1 bg-rose-400"></span>
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about commissions or just want to say hello? I'd love to hear from you!
          </p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            
            <form @submit.prevent="submitContactForm" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input 
                  id="name" 
                  v-model="contactForm.name" 
                  type="text" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label for="contactEmail" class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input 
                  id="contactEmail" 
                  v-model="contactForm.email" 
                  type="email" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label for="contactPhone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  id="contactPhone" 
                  v-model="contactForm.phone" 
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Phone"
                />
              </div>
              
              <div>
                <label for="contactSubject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input 
                  id="contactSubject" 
                  v-model="contactForm.subject" 
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                  placeholder="Type the subject"
                />
              </div>
              
              <div>
                <label for="contactMessage" class="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea 
                  id="contactMessage" 
                  v-model="contactForm.message" 
                  rows="5" 
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-rose-50"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              
              <div class="pt-2">
                <button 
                  type="submit" 
                  class="w-full py-3 px-6 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          
          <!-- Contact Information -->
          <div class="flex flex-col justify-between">
            <div class="bg-white rounded-2xl shadow-xl p-8 mb-8 transform transition-all duration-500 hover:shadow-2xl">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              
              <div class="space-y-6">
                <div class="flex items-start">
                  <div class="flex-shrink-0 h-10 w-10 bg-rose-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Email</h3>
                    <a href="mailto:raymondraphael321@gmail.com" class="mt-1 text-gray-600">raymondraphael321@gmail.com</a>
                  </div>
                </div>
                
                <div class="flex items-start">
                  <div class="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Phone</h3>
                    <p class="mt-1 text-gray-600">+1 (234) 567-8901</p>
                  </div>
                </div>
                
                <!-- <div class="flex items-start">
                  <div class="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Location</h3>
                    <p class="mt-1 text-gray-600">Lagos, Nigeria</p>
                  </div>
                </div> -->
              </div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Follow Me</h2>
              
              <div class="flex space-x-4">
                <a href="https://www.facebook.com/people/raymondaworo/100067199633701/?mibextid=LQQJ4d" class="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
                  <img class="h-8 w-8 rounded-full" src="@/assets/icons/facebook.svg" />
                </a>
                
                <a href="https://www.instagram.com/raymondaworo/?igshid=OGQ5ZDc2ODk2ZA%3D%3D" class="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
                  <img class="h-8 w-8" src="@/assets/icons/instagram.svg" />
                </a>
                
                <a href="https://x.com/raymondaworo/status/1546911697776115714?s=46&t=wja9T8NIysGx2Vtni1WECQ" class="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
                  <img class="h-8 w-8" src="@/assets/icons/logo-black.png" />
                </a>

                <a href="https://www.tiktok.com/@raymondaworo?_t=8fvTbrYZSA1&_r=1" class="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
                  <img class="h-8 w-8" src="@/assets/icons/tiktok.svg" />
                </a>

                <a href="https://www.youtube.com/@raymondaworo" class="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
                  <img class="h-8 w-8" src="@/assets/icons/youtube.svg" />
                </a>
                
              </div>
              
              <div class="mt-8 p-4 bg-gray-50 rounded-lg">
                <p class="text-gray-600 text-sm">
                  For business inquiries or collaborations, please email me directly at 
                  <a href="mailto:raymondraphael321@gmail.com" class="text-rose-600 font-medium hover:underline">raymondraphael321@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const contactForm = ref({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const submitContactForm = () => {
    // Here you would typically send the form data to your backend
    console.log('Contact form submitted:', contactForm.value)
    
    // Show success message
    alert('Thank you for your message! We will get back to you shortly.')
    
    // Reset form
    contactForm.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  }
  </script>
  
  <style scoped>
  /* Optional: Add any additional custom styles here */
  @keyframes pulse {
    0%, 100% {
      opacity: 0.8;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.05);
    }
  }
  
  .bg-rose-100, .bg-amber-100 {
    animation: pulse 10s ease-in-out infinite;
  }
  </style>