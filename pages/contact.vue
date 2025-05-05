<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <!-- Decorative Elements -->
      <div class="absolute top-20 left-10 w-64 h-64 bg-rose-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
      <div class="absolute bottom-20 right-10 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply opacity-30 blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div class="text-center mb-16">
          <h1 class="text-5xl font-bold text-gray-800 mb-4 relative inline-block">
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
                    <p class="mt-1 text-gray-600">contact@artistname.com</p>
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
                
                <div class="flex items-start">
                  <div class="flex-shrink-0 h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h3 class="text-lg font-medium text-gray-900">Location</h3>
                    <p class="mt-1 text-gray-600">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Follow Me</h2>
              
              <div class="flex space-x-4">
                <a href="#" class="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                
                <a href="#" class="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                
                <a href="#" class="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                
                <a href="#" class="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-700">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
              
              <div class="mt-8 p-4 bg-gray-50 rounded-lg">
                <p class="text-gray-600 text-sm">
                  For business inquiries or collaborations, please email me directly at 
                  <a href="mailto:business@artistname.com" class="text-rose-600 font-medium hover:underline">business@artistname.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Map or Additional Info Section -->
        <div class="mt-16 bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-500 hover:shadow-2xl">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 class="text-2xl font-bold text-gray-800 mb-4">Visit My Studio</h2>
              <p class="text-gray-600 mb-6">
                I welcome visitors to my studio by appointment. Please contact me to schedule a visit and see my artwork in person.
              </p>
              
              <div class="bg-gray-100 p-4 rounded-lg">
                <p class="text-gray-700 font-medium">Studio Hours:</p>
                <ul class="mt-2 space-y-1 text-gray-600">
                  <li>Monday - Friday: 10:00 AM - 6:00 PM</li>
                  <li>Saturday: 11:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
            
            <div class="h-64 bg-gray-200 rounded-lg relative overflow-hidden">
              <!-- This would be a map in a real application -->
              <div class="absolute inset-0 flex items-center justify-center">
                <!-- <p class="text-gray-500 font-medium">Interactive Map Would Be Here</p> -->
                <GoogleMap 
                    mapUrl="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=lagos%20university%20teaching%20hospital%20+(Art%20Studio)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
                    width="100%" 
                    height="500px"
                />
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