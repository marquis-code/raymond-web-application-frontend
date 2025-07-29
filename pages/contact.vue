<template>
  <div class="min-h-screen mt-16 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
      <!-- Enhanced Header Section -->
      <div class="text-center mb-12 md:mb-20 animate-slide-up">
        <div class="inline-block relative mb-6">
          <h1 class="text-xl  font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent relative">
            CONTACT
            <span class="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 transform -skew-x-12 animate-grow-line"></span>
          </h1>
          <div class="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full animate-bounce opacity-80"></div>
        </div>
        <p class="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style="animation-delay: 0.3s;">
          Have questions about commissions or just want to say hello? 
          <span class="text-rose-600 font-semibold">I'd love to hear from you!</span>
        </p>
        <div class="mt-8 flex justify-center animate-fade-in" style="animation-delay: 0.6s;">
          <div class="flex space-x-2">
            <div class="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
            <div class="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
            <div class="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <!-- Enhanced Contact Form -->
        <div class="order-1  animate-slide-up" style="animation-delay: 0.4s;">
          <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-10 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] border border-white/20">
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl mb-4 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">Get in Touch</h2>
              <p class="text-gray-600 mt-2">Let's start a conversation</p>
            </div>

            <form @submit.prevent="submitContactForm" class="space-y-6">
              <!-- Name Field -->
              <div class="animate-slide-up" style="animation-delay: 0.1s;">
                <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <div class="relative">
                  <input 
                    id="name" 
                    v-model="contactForm.name" 
                    type="text" 
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 hover:border-rose-300 bg-white/50 backdrop-blur-sm text-sm md:text-base"
                    placeholder="Enter your full name"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Email Field -->
              <div class="animate-slide-up" style="animation-delay: 0.2s;">
                <label for="contactEmail" class="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <div class="relative">
                  <input 
                    id="contactEmail" 
                    v-model="contactForm.email" 
                    type="email" 
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 hover:border-rose-300 bg-white/50 backdrop-blur-sm text-sm md:text-base"
                    placeholder="your.email@example.com"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Country Selection Field -->
              <div class="animate-slide-up" style="animation-delay: 0.3s;">
                <label for="country" class="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                <div class="relative">
                  <select 
                    id="country" 
                    v-model="contactForm.country" 
                    @change="onCountryChange"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 hover:border-rose-300 bg-white/50 backdrop-blur-sm text-sm md:text-base appearance-none"
                  >
                    <option value="">Select a country</option>
                    <option 
                      v-for="country in countries" 
                      :key="country.code" 
                      :value="country.code"
                    >
                      {{ country.flag }} {{ country.name }} (+{{ country.dialCode }})
                    </option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Phone Number Field -->
              <div class="animate-slide-up" style="animation-delay: 0.4s;">
                <label for="contactPhone" class="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <div class="relative">
                  <div class="flex">
                    <!-- Country Code Display -->
                    <div class="flex items-center px-4 py-3 bg-gray-50/80 border-2 border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-600 min-w-[80px]">
                      <span v-if="selectedCountry">+{{ selectedCountry.dialCode }}</span>
                      <span v-else>+</span>
                    </div>
                    <!-- Phone Input -->
                    <input
                      id="contactPhone"
                      v-model="displayPhone"
                      type="tel"
                      :placeholder="selectedCountry?.placeholder || 'Enter phone number'"
                      :disabled="!selectedCountry"
                      class="flex-1 px-4 py-3 border-2 border-gray-200 rounded-r-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 hover:border-rose-300 bg-white/50 backdrop-blur-sm text-sm md:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
                      @input="handlePhoneInput"
                    />
                  </div>
                </div>
                
                <!-- Phone Validation Messages -->
                <div class="mt-2">
                  <p v-if="!selectedCountry && displayPhone" class="text-xs text-amber-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    Please select a country first
                  </p>
                  
                  <p v-else-if="selectedCountry && displayPhone && isValidPhone" class="text-xs text-emerald-600 flex items-center animate-fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Valid {{ selectedCountry.name }} phone number
                  </p>
                  
                  <p v-else-if="selectedCountry && displayPhone && !isValidPhone && displayPhone.length > 3" class="text-xs text-red-600 flex items-center animate-fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Please enter a valid {{ selectedCountry.name }} phone number
                  </p>
                  
                  <p v-if="selectedCountry" class="text-xs text-gray-500 mt-1">
                    Format: {{ selectedCountry.format }}
                  </p>
                </div>
              </div>

              <!-- Subject Field -->
              <div class="animate-slide-up" style="animation-delay: 0.5s;">
                <label for="contactSubject" class="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                <div class="relative">
                  <input 
                    id="contactSubject" 
                    v-model="contactForm.subject" 
                    type="text"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-300 hover:border-rose-300 bg-white/50 backdrop-blur-sm text-sm md:text-base"
                    placeholder="What's this about?"
                  />
                  <div class="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Message Field -->
              <div class="animate-slide-up" style="animation-delay: 0.6s;">
                <label for="contactMessage" class="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                <div class="relative">
                  <textarea 
                    id="contactMessage" 
                    v-model="contactForm.message" 
                    rows="5" 
                    required
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-gradient-to-br from-rose-50/50 to-pink-50/50 backdrop-blur-sm transition-all duration-300 hover:border-rose-300 text-sm md:text-base resize-none"
                    placeholder="Tell me about your project, questions, or just say hello..."
                  ></textarea>
                  <div class="absolute bottom-4 right-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Enhanced Submit Button -->
              <div class="pt-4 animate-slide-up" style="animation-delay: 0.7s;">
                <button 
                  type="submit"
                  :disabled="loading"
                  class="group relative w-full py-3 px-8 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:via-pink-600 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-300 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl text-sm md:text-base"
                >
                  <div v-if="loading" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                  <span v-else class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 group-hover:animate-bounce-x" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Send Message
                  </span>
                  <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Enhanced Contact Information -->
        <div class="order-2 space-y-6 md:space-y-8 animate-slide-up" style="animation-delay: 0.6s;">
          <!-- Contact Info Card -->
          <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] border border-white/20">
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 class="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">{{ content?.title }}</h2>
              <p class="text-gray-600 text-base mt-2">{{ content?.description }}</p>
            </div>

            <div class="space-y-6">
              <!-- Email -->
              <div class="flex items-start group animate-slide-up" style="animation-delay: 0.1s;">
                <div class="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-rose-100 to-pink-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-4 flex-1">
                  <h3 class="text-base font-semibold text-gray-900 mb-1">Email</h3>
                  <a 
                    :href="`mailto:${content?.metadata?.contactInfo?.email?.address}`" 
                    class="text-rose-600 hover:text-rose-700 transition-colors duration-300 font-medium hover:underline text-sm md:text-base"
                  >
                  {{ content?.metadata?.contactInfo?.email?.address }}
                  </a>
                  <p class="text-xs text-gray-500 mt-1">{{ content?.metadata?.contactInfo?.email?.responseTime }}</p>
                </div>
              </div>

              <!-- Location -->
              <div class="flex items-start group animate-slide-up" style="animation-delay: 0.2s;">
                <div class="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-4 flex-1">
                  <h3 class="text-base font-semibold text-gray-900 mb-1">Location</h3>
                  <p v-for="location in content?.metadata?.contactInfo?.locations" class="text-gray-600 text-sm md:text-base leading-relaxed">
                    {{ location?.name }}:<br>
                    {{ location?.address }}<br>
                    {{ location?.phone }}
                  </p>
                  <!-- <p class="text-gray-600 text-sm md:text-base leading-relaxed">
                    U.S. Office:<br>
                    1234 Main Street, Suite 100, Wilmington, DE 19801<br>
                    +1 (559) 859-5124
                  </p> -->
                </div>
              </div>

              <!-- Response Time -->
              <!-- <div class="flex items-start group animate-slide-up" style="animation-delay: 0.3s;">
                <div class="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-4 flex-1">
                  <h3 class="text-base font-semibold text-gray-900 mb-1">Response Time</h3>
                  <p class="text-gray-600 text-sm md:text-base">Usually within 24 hours</p>
                  <p class="text-xs text-gray-500 mt-1">Monday - Friday, 9 AM - 6 PM WAT</p>
                </div>
              </div> -->
            </div>
          </div>

          <!-- Enhanced Social Media Card -->
          <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-8 transform transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] border border-white/20">
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4 animate-pulse-slow">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 class="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">Follow My Journey</h2>
              <p class="text-gray-600 text-sm mt-2">Stay connected on social media</p>
            </div>

            <div class="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
              <a v-for="social in content?.metadata?.contactInfo?.socialMedia"
                :href="social.url" 
                class="group flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div v-if="social?.platform === 'Facebook'" class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-2 group-hover:animate-bounce">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div v-if="social?.platform === 'Instagram'" class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-2 group-hover:animate-bounce">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.132-1.551-.684-.94-.684-2.126 0-3.066.684-.94 1.835-1.551 3.132-1.551s2.448.611 3.132 1.551c.684.94.684 2.126 0 3.066-.684.94-1.835 1.551-3.132 1.551zm7.718 0c-1.297 0-2.448-.611-3.132-1.551-.684-.94-.684-2.126 0-3.066.684-.94 1.835-1.551 3.132-1.551s2.448.611 3.132 1.551c.684.94.684 2.126 0 3.066-.684.94-1.835 1.551-3.132 1.551z"/>
                  </svg>
                </div>
                <div v-if="social?.platform === 'Twitter'" class="w-10 h-10 bg-black rounded-xl flex items-center justify-center mb-2 group-hover:animate-bounce">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <div v-if="social?.platform === 'TikTok'" class="w-10 h-10 bg-black rounded-xl flex items-center justify-center mb-2 group-hover:animate-bounce">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
                <div v-if="social?.platform === 'YouTube'" class="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center mb-2 group-hover:animate-bounce">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <span class="text-xs font-medium text-gray-700 group-hover:text-blue-700">{{ social?.platform }}</span>
              </a>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-gray-700 text-sm leading-relaxed">
                    For business inquiries or collaborations, please email me directly at 
                    <a 
                      :href="`mailto:${content?.metadata?.contactInfo?.email?.address}`" 
                      class="text-rose-600 font-semibold hover:text-rose-700 hover:underline transition-colors duration-300"
                    >
                     {{ content?.metadata?.contactInfo?.email?.address }}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Toast Notification -->
    <transition name="toast">
      <div 
        v-if="showSuccessToast" 
        class="fixed top-4 right-4 z-50 bg-white rounded-2xl shadow-2xl p-6 max-w-sm border border-emerald-200"
      >
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div class="ml-3 flex-1">
            <h3 class="text-sm font-semibold text-gray-900">Message Sent!</h3>
            <p class="text-sm text-gray-600 mt-1">Thanks for reaching out. I'll get back to you soon!</p>
          </div>
          <button 
            @click="showSuccessToast = false"
            class="ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetchContentByType } from "@/composables/modules/content/useFetchContentByType"
import { useCreateEnquires } from "@/composables/modules/enquires/useCreateEnquires"
const { fetchContentByType, loading: fetchingContent, content } = useFetchContentByType()
// Types
interface Country {
  name: string
  code: string
  dialCode: string
  flag: string
  format: string
  placeholder: string
  pattern: RegExp
  maxLength: number
}

interface ContactFormData {
  name: string
  email: string
  country: string
  phone: string
  subject: string
  message: string
}

// Composables
const { createEnquires, loading } = useCreateEnquires()

// Countries data
const countries = ref<Country[]>([
  { name: 'United States', code: 'US', dialCode: '1', flag: '🇺🇸', format: '(XXX) XXX-XXXX', placeholder: '(555) 123-4567', pattern: /^$$\d{3}$$ \d{3}-\d{4}$/, maxLength: 10 },
  { name: 'United Kingdom', code: 'GB', dialCode: '44', flag: '🇬🇧', format: 'XXXX XXX XXXX', placeholder: '7911 123 4567', pattern: /^\d{4} \d{3} \d{4}$/, maxLength: 11 },
  { name: 'Canada', code: 'CA', dialCode: '1', flag: '🇨🇦', format: '(XXX) XXX-XXXX', placeholder: '(555) 123-4567', pattern: /^$$\d{3}$$ \d{3}-\d{4}$/, maxLength: 10 },
  { name: 'Australia', code: 'AU', dialCode: '61', flag: '🇦🇺', format: 'XXXX XXX XXX', placeholder: '0412 345 678', pattern: /^\d{4} \d{3} \d{3}$/, maxLength: 10 },
  { name: 'Germany', code: 'DE', dialCode: '49', flag: '🇩🇪', format: 'XXX XXXXXXXX', placeholder: '030 12345678', pattern: /^\d{3} \d{8}$/, maxLength: 11 },
  { name: 'France', code: 'FR', dialCode: '33', flag: '🇫🇷', format: 'XX XX XX XX XX', placeholder: '01 23 45 67 89', pattern: /^\d{2} \d{2} \d{2} \d{2} \d{2}$/, maxLength: 10 },
  { name: 'Italy', code: 'IT', dialCode: '39', flag: '🇮🇹', format: 'XXX XXX XXXX', placeholder: '320 123 4567', pattern: /^\d{3} \d{3} \d{4}$/, maxLength: 10 },
  { name: 'Spain', code: 'ES', dialCode: '34', flag: '🇪🇸', format: 'XXX XX XX XX', placeholder: '612 34 56 78', pattern: /^\d{3} \d{2} \d{2} \d{2}$/, maxLength: 9 },
  { name: 'Netherlands', code: 'NL', dialCode: '31', flag: '🇳🇱', format: 'XX XXXXXXXX', placeholder: '06 12345678', pattern: /^\d{2} \d{8}$/, maxLength: 10 },
  { name: 'Belgium', code: 'BE', dialCode: '32', flag: '🇧🇪', format: 'XXX XX XX XX', placeholder: '470 12 34 56', pattern: /^\d{3} \d{2} \d{2} \d{2}$/, maxLength: 9 },
  { name: 'Switzerland', code: 'CH', dialCode: '41', flag: '🇨🇭', format: 'XX XXX XX XX', placeholder: '79 123 45 67', pattern: /^\d{2} \d{3} \d{2} \d{2}$/, maxLength: 9 },
  { name: 'Austria', code: 'AT', dialCode: '43', flag: '🇦🇹', format: 'XXX XXXXXXX', placeholder: '664 1234567', pattern: /^\d{3} \d{7}$/, maxLength: 10 },
  { name: 'Sweden', code: 'SE', dialCode: '46', flag: '🇸🇪', format: 'XXX-XXX XX XX', placeholder: '070-123 45 67', pattern: /^\d{3}-\d{3} \d{2} \d{2}$/, maxLength: 10 },
  { name: 'Norway', code: 'NO', dialCode: '47', flag: '🇳🇴', format: 'XXX XX XXX', placeholder: '412 34 567', pattern: /^\d{3} \d{2} \d{3}$/, maxLength: 8 },
  { name: 'Denmark', code: 'DK', dialCode: '45', flag: '🇩🇰', format: 'XX XX XX XX', placeholder: '20 12 34 56', pattern: /^\d{2} \d{2} \d{2} \d{2}$/, maxLength: 8 },
  { name: 'Finland', code: 'FI', dialCode: '358', flag: '🇫🇮', format: 'XXX XXXXXXX', placeholder: '050 1234567', pattern: /^\d{3} \d{7}$/, maxLength: 10 },
  { name: 'Poland', code: 'PL', dialCode: '48', flag: '🇵🇱', format: 'XXX XXX XXX', placeholder: '512 345 678', pattern: /^\d{3} \d{3} \d{3}$/, maxLength: 9 },
  { name: 'Czech Republic', code: 'CZ', dialCode: '420', flag: '🇨🇿', format: 'XXX XXX XXX', placeholder: '601 123 456', pattern: /^\d{3} \d{3} \d{3}$/, maxLength: 9 },
  { name: 'Hungary', code: 'HU', dialCode: '36', flag: '🇭🇺', format: 'XX XXX XXXX', placeholder: '20 123 4567', pattern: /^\d{2} \d{3} \d{4}$/, maxLength: 9 },
  { name: 'Portugal', code: 'PT', dialCode: '351', flag: '🇵🇹', format: 'XXX XXX XXX', placeholder: '912 345 678', pattern: /^\d{3} \d{3} \d{3}$/, maxLength: 9 },
  { name: 'Greece', code: 'GR', dialCode: '30', flag: '🇬🇷', format: 'XXX XXX XXXX', placeholder: '694 123 4567', pattern: /^\d{3} \d{3} \d{4}$/, maxLength: 10 },
  { name: 'Turkey', code: 'TR', dialCode: '90', flag: '🇹🇷', format: 'XXX XXX XX XX', placeholder: '532 123 45 67', pattern: /^\d{3} \d{3} \d{2} \d{2}$/, maxLength: 10 },
  { name: 'Russia', code: 'RU', dialCode: '7', flag: '🇷🇺', format: 'XXX XXX-XX-XX', placeholder: '912 345-67-89', pattern: /^\d{3} \d{3}-\d{2}-\d{2}$/, maxLength: 10 },
  { name: 'Japan', code: 'JP', dialCode: '81', flag: '🇯🇵', format: 'XXX-XXXX-XXXX', placeholder: '090-1234-5678', pattern: /^\d{3}-\d{4}-\d{4}$/, maxLength: 11 },
  { name: 'South Korea', code: 'KR', dialCode: '82', flag: '🇰🇷', format: 'XXX-XXXX-XXXX', placeholder: '010-1234-5678', pattern: /^\d{3}-\d{4}-\d{4}$/, maxLength: 11 },
  { name: 'China', code: 'CN', dialCode: '86', flag: '🇨🇳', format: 'XXX XXXX XXXX', placeholder: '138 0013 8000', pattern: /^\d{3} \d{4} \d{4}$/, maxLength: 11 },
  { name: 'India', code: 'IN', dialCode: '91', flag: '🇮🇳', format: 'XXXXX XXXXX', placeholder: '98765 43210', pattern: /^\d{5} \d{5}$/, maxLength: 10 },
  { name: 'Singapore', code: 'SG', dialCode: '65', flag: '🇸🇬', format: 'XXXX XXXX', placeholder: '9123 4567', pattern: /^\d{4} \d{4}$/, maxLength: 8 },
  { name: 'Malaysia', code: 'MY', dialCode: '60', flag: '🇲🇾', format: 'XX-XXX XXXX', placeholder: '12-345 6789', pattern: /^\d{2}-\d{3} \d{4}$/, maxLength: 10 },
  { name: 'Thailand', code: 'TH', dialCode: '66', flag: '🇹🇭', format: 'XX-XXX-XXXX', placeholder: '08-1234-5678', pattern: /^\d{2}-\d{3}-\d{4}$/, maxLength: 10 },
  { name: 'Philippines', code: 'PH', dialCode: '63', flag: '🇵🇭', format: 'XXXX XXX XXXX', placeholder: '0917 123 4567', pattern: /^\d{4} \d{3} \d{4}$/, maxLength: 11 },
  { name: 'Indonesia', code: 'ID', dialCode: '62', flag: '🇮🇩', format: 'XXXX-XXXX-XXXX', placeholder: '0812-3456-7890', pattern: /^\d{4}-\d{4}-\d{4}$/, maxLength: 12 },
  { name: 'Vietnam', code: 'VN', dialCode: '84', flag: '🇻🇳', format: 'XXX XXX XXXX', placeholder: '091 234 5678', pattern: /^\d{3} \d{3} \d{4}$/, maxLength: 10 },
  { name: 'Hong Kong', code: 'HK', dialCode: '852', flag: '🇭🇰', format: 'XXXX XXXX', placeholder: '9123 4567', pattern: /^\d{4} \d{4}$/, maxLength: 8 },
  { name: 'Taiwan', code: 'TW', dialCode: '886', flag: '🇹🇼', format: 'XXXX XXX XXX', placeholder: '0912 345 678', pattern: /^\d{4} \d{3} \d{3}$/, maxLength: 10 },
  { name: 'Brazil', code: 'BR', dialCode: '55', flag: '🇧🇷', format: '(XX) XXXXX-XXXX', placeholder: '(11) 99999-9999', pattern: /^$$\d{2}$$ \d{5}-\d{4}$/, maxLength: 11 },
  { name: 'Argentina', code: 'AR', dialCode: '54', flag: '🇦🇷', format: 'XX XXXX-XXXX', placeholder: '11 1234-5678', pattern: /^\d{2} \d{4}-\d{4}$/, maxLength: 10 },
  { name: 'Mexico', code: 'MX', dialCode: '52', flag: '🇲🇽', format: 'XXX XXX XXXX', placeholder: '55 1234 5678', pattern: /^\d{3} \d{3} \d{4}$/, maxLength: 10 },
  { name: 'Chile', code: 'CL', dialCode: '56', flag: '🇨🇱', format: 'X XXXX XXXX', placeholder: '9 1234 5678', pattern: /^\d \d{4} \d{4}$/, maxLength: 9 },
  { name: 'Colombia', code: 'CO', dialCode: '57', flag: '🇨🇴', format: 'XXX XXX XXXX', placeholder: '300 123 4567', pattern: /^\d{3} \d{3} \d{4}$/, maxLength: 10 },
  { name: 'Peru', code: 'PE', dialCode: '51', flag: '🇵🇪', format: 'XXX XXX XXX', placeholder: '987 654 321', pattern: /^\d{3} \d{3} \d{3}$/, maxLength: 9 },
  { name: 'South Africa', code: 'ZA', dialCode: '27', flag: '🇿🇦', format: 'XXX XXX XXXX', placeholder: '082 123 4567', pattern: /^\d{3} \d{3} \d{4}$/, maxLength: 10 },
  { name: 'Nigeria', code: 'NG', dialCode: '234', flag: '🇳🇬', format: 'XXX XXX XXXX', placeholder: '813 456 7890', pattern: /^\d{3} \d{3} \d{4}$/, maxLength: 10 },
  { name: 'Kenya', code: 'KE', dialCode: '254', flag: '🇰🇪', format: 'XXX XXXXXX', placeholder: '712 123456', pattern: /^\d{3} \d{6}$/, maxLength: 9 },
  { name: 'Egypt', code: 'EG', dialCode: '20', flag: '🇪🇬', format: 'XXX XXX XXXX', placeholder: '100 123 4567', pattern: /^\d{3} \d{3} \d{4}$/, maxLength: 10 },
  { name: 'Morocco', code: 'MA', dialCode: '212', flag: '🇲🇦', format: 'XXX-XXXXXX', placeholder: '661-234567', pattern: /^\d{3}-\d{6}$/, maxLength: 9 },
  { name: 'Israel', code: 'IL', dialCode: '972', flag: '🇮🇱', format: 'XXX-XXX-XXXX', placeholder: '050-123-4567', pattern: /^\d{3}-\d{3}-\d{4}$/, maxLength: 10 },
  { name: 'Saudi Arabia', code: 'SA', dialCode: '966', flag: '🇸🇦', format: 'XXX XXX XXXX', placeholder: '050 123 4567', pattern: /^\d{3} \d{3} \d{4}$/, maxLength: 10 },
  { name: 'UAE', code: 'AE', dialCode: '971', flag: '🇦🇪', format: 'XXX XXX XXXX', placeholder: '050 123 4567', pattern: /^\d{3} \d{3} \d{4}$/, maxLength: 10 },
  { name: 'New Zealand', code: 'NZ', dialCode: '64', flag: '🇳🇿', format: 'XXX XXX XXXX', placeholder: '021 123 4567', pattern: /^\d{3} \d{3} \d{4}$/, maxLength: 10 }
])

// Form data
const contactForm = ref<ContactFormData>({
  name: '',
  email: '',
  country: '',
  phone: '',
  subject: '',
  message: ''
})

onMounted(() => {
  fetchContentByType('contact_info')
})

// Phone input states
const displayPhone = ref('')
const showSuccessToast = ref(false)

// Computed properties
const selectedCountry = computed(() => 
  countries.value.find(country => country.code === contactForm.value.country)
)

const isValidPhone = computed(() => {
  if (!selectedCountry.value || !displayPhone.value) return false
  return selectedCountry.value.pattern.test(displayPhone.value)
})

// Phone formatting function
const formatPhoneNumber = (value: string, country: Country): string => {
  const digits = value.replace(/\D/g, '')
  
  switch (country.code) {
    case 'US':
    case 'CA':
      if (digits.length >= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
      } else if (digits.length >= 3) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
      } else {
        return digits
      }
    
    case 'NG': // Nigeria
      if (digits.length >= 6) {
        return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`
      } else if (digits.length >= 3) {
        return `${digits.slice(0, 3)} ${digits.slice(3)}`
      } else {
        return digits
      }
    
    case 'GB': // UK
      if (digits.length >= 7) {
        return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 11)}`
      } else if (digits.length >= 4) {
        return `${digits.slice(0, 4)} ${digits.slice(4)}`
      } else {
        return digits
      }
    
    case 'DE': // Germany
      if (digits.length >= 3) {
        return `${digits.slice(0, 3)} ${digits.slice(3, 11)}`
      } else {
        return digits
      }
    
    case 'FR': // France
      if (digits.length >= 8) {
        return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`
      } else if (digits.length >= 6) {
        return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`
      } else if (digits.length >= 4) {
        return `${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4)}`
      } else if (digits.length >= 2) {
        return `${digits.slice(0, 2)} ${digits.slice(2)}`
      } else {
        return digits
      }
    
    case 'BR': // Brazil
      if (digits.length >= 6) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
      } else if (digits.length >= 2) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
      } else {
        return digits
      }
    
    case 'JP': // Japan
    case 'KR': // South Korea
      if (digits.length >= 7) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`
      } else if (digits.length >= 3) {
        return `${digits.slice(0, 3)}-${digits.slice(3)}`
      } else {
        return digits
      }
    
    case 'AU': // Australia
      if (digits.length >= 7) {
        return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`
      } else if (digits.length >= 4) {
        return `${digits.slice(0, 4)} ${digits.slice(4)}`
      } else {
        return digits
      }
    
    case 'IN': // India
      if (digits.length >= 5) {
        return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`
      } else {
        return digits
      }
    
    default:
      // Generic formatting for other countries
      if (digits.length >= 6) {
        return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
      } else if (digits.length >= 3) {
        return `${digits.slice(0, 3)} ${digits.slice(3)}`
      } else {
        return digits
      }
  }
}

// Phone input handlers
const handlePhoneInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  if (!selectedCountry.value) return
  
  // Remove all non-digits for length checking
  const digits = value.replace(/\D/g, '')
  
  // Prevent input beyond max length
  if (digits.length > selectedCountry.value.maxLength) {
    return
  }
  
  // Format the phone number
  const formatted = formatPhoneNumber(value, selectedCountry.value)
  displayPhone.value = formatted
  contactForm.value.phone = digits // Store raw digits
}

// Country change handler
const onCountryChange = () => {
  // Clear phone input when country changes
  displayPhone.value = ''
  contactForm.value.phone = ''
}

// Form submission
const submitContactForm = async () => {
  try {
    await createEnquires(contactForm.value)
    
    // Show success toast
    showSuccessToast.value = true
    
    // Auto hide toast after 5 seconds
    setTimeout(() => {
      showSuccessToast.value = false
    }, 5000)
    
    // Reset form
    contactForm.value = {
      name: '',
      email: '',
      country: '',
      phone: '',
      subject: '',
      message: ''
    }
    
    // Clear phone display
    displayPhone.value = ''
  } catch (error) {
    console.error('Contact form submission failed:', error)
  }
}
</script>

<style scoped>
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
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(3deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes floatSlow {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(-2deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes floatReverse {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(15px) rotate(2deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes pulseSlow {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes bounceX {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

@keyframes toastEnter {
  from { opacity: 0; transform: translateX(100%) scale(0.95); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}

@keyframes toastLeave {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to { opacity: 0; transform: translateX(100%) scale(0.95); }
}

/* Apply animations */
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
.animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
.animate-grow-line { animation: growLine 1s ease-out forwards; animation-delay: 0.5s; }
.animate-float { animation: float 8s ease-in-out infinite; }
.animate-float-slow { animation: floatSlow 12s ease-in-out infinite; }
.animate-float-reverse { animation: floatReverse 10s ease-in-out infinite; }
.animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
.animate-bounce-x { animation: bounceX 1s ease-in-out infinite; }

/* Toast transition classes */
.toast-enter-active { animation: toastEnter 0.3s ease-out; }
.toast-leave-active { animation: toastLeave 0.3s ease-in; }

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
  background: #ec4899;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #db2777;
}

/* Glass morphism effect */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

/* Enhanced shadow */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Mobile-specific improvements */
@media (max-width: 640px) {
  .animate-slide-up {
    animation: slideUp 0.6s ease-out forwards;
  }
}

/* Focus styles */
.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* Gradient text */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Enhanced button styles */
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

button:disabled:hover {
  transform: none !important;
}

/* Form input enhancements */
input:focus, textarea:focus, select:focus {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Custom select styling */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Responsive text sizing */
@media (max-width: 768px) {
  .text-4xl { font-size: 2.5rem; }
  .text-5xl { font-size: 3rem; }
  .text-6xl { font-size: 3.5rem; }
}

@media (max-width: 640px) {
  .text-4xl { font-size: 2rem; }
  .text-5xl { font-size: 2.5rem; }
  .text-6xl { font-size: 3rem; }
}
</style>
