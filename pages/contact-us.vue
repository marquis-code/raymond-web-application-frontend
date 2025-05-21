<template>
    <div class="min-h-screen w-full bg-white py-12 px-4 mt-20 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <!-- Left side animation -->
          <div class="hidden md:flex flex-col items-center justify-center">
            <div class="relative w-full h-96">
              <div class="contact-animation-container">
                <svg class="w-full h-full" viewBox="0 0 400 400">
                  <!-- Envelope -->
                  <rect x="100" y="150" width="200" height="150" fill="#f3f4f6" stroke="#374151" stroke-width="2" class="envelope-body" />
                  <!-- Envelope Flap (animated) -->
                  <path d="M100,150 L200,100 L300,150" fill="none" stroke="#374151" stroke-width="2" class="envelope-flap" />
                  <!-- Envelope Lines -->
                  <path d="M100,150 L200,250 L300,150" fill="none" stroke="#374151" stroke-width="2" class="envelope-lines" />
                  <!-- Message (animated) -->
                  <rect x="140" y="120" width="120" height="80" fill="#ffffff" stroke="#374151" stroke-width="1" class="message" />
                  <line x1="150" y1="140" x2="250" y2="140" stroke="#6b7280" stroke-width="1" class="message-line" />
                  <line x1="150" y1="160" x2="250" y2="160" stroke="#6b7280" stroke-width="1" class="message-line" />
                  <line x1="150" y1="180" x2="210" y2="180" stroke="#6b7280" stroke-width="1" class="message-line" />
                  <!-- Person's head icon -->
                  <circle cx="200" y="280" r="30" fill="#e5e7eb" stroke="#374151" stroke-width="1.5" class="person-head" />
                  <circle cx="190" y="273" r="3" fill="#374151" class="eye" />
                  <circle cx="210" y="273" r="3" fill="#374151" class="eye" />
                  <path d="M190,295 Q200,305 210,295" fill="none" stroke="#374151" stroke-width="1.5" class="smile" />
                </svg>
              </div>
            </div>
            <h2 class="text-3xl font-bold text-gray-800 mt-4">Get In Touch</h2>
            <p class="text-gray-600 mt-2 text-center">We'd love to hear from you. Send us a message!</p>
          </div>
  
          <!-- Right side form -->
          <div class="form-container">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-8">CONTACT</h1>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="form-group">
                <label for="name" class="block text-sm font-medium text-gray-700">Name <span class="text-red-500">*</span></label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  class="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  :class="{ 'border-red-500': errors.name }"
                />
                <p v-if="errors.name" class="mt-1 text-xs text-red-500">{{ errors.name }}</p>
              </div>
  
              <div class="form-group">
                <label for="email" class="block text-sm font-medium text-gray-700">Email <span class="text-red-500">*</span></label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  class="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  :class="{ 'border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
              </div>
  
              <div class="form-group">
                <label for="phone" class="block text-sm font-medium text-gray-700">Phone <span class="text-red-500">*</span></label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="Phone"
                  required
                  class="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  :class="{ 'border-red-500': errors.phone }"
                />
                <p v-if="errors.phone" class="mt-1 text-xs text-red-500">{{ errors.phone }}</p>
              </div>
  
              <div class="form-group">
                <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  placeholder="Type the subject"
                  class="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
              </div>
  
              <div class="form-group">
                <label for="message" class="block text-sm font-medium text-gray-700">Message <span class="text-red-500">*</span></label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  placeholder="Type your message here..."
                  required
                  class="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  :class="{ 'border-red-500': errors.message }"
                ></textarea>
                <p v-if="errors.message" class="mt-1 text-xs text-red-500">{{ errors.message }}</p>
              </div>
  
              <div class="flex justify-center w-full">
                <button
                  type="submit"
                  class="px-10 py-3.5 bg-black text-white font-medium w-full rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-all duration-300 transform hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  
  // Form data
  const form = reactive({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  // Form errors
  const errors = reactive({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  
  // Form submission
  const isSubmitting = ref(false)
  const submitForm = async () => {
    // Reset errors
    Object.keys(errors).forEach(key => {
      errors[key as keyof typeof errors] = ''
    })
    
    // Simple validation
    let isValid = true
    
    if (!form.name.trim()) {
      errors.name = 'Name is required'
      isValid = false
    }
    
    if (!form.email.trim()) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email'
      isValid = false
    }
    
    if (!form.phone.trim()) {
      errors.phone = 'Phone number is required'
      isValid = false
    }
    
    if (!form.message.trim()) {
      errors.message = 'Message is required'
      isValid = false
    }
    
    if (!isValid) return
    
    try {
      isSubmitting.value = true
      // Here you would normally send the form data to an API
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      // Reset form after successful submission
      Object.keys(form).forEach(key => {
        form[key as keyof typeof form] = ''
      })
      
      alert('Form submitted successfully!')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting the form. Please try again.')
    } finally {
      isSubmitting.value = false
    }
  }
  </script>
  
  <style scoped>
  /* Animation styles */
  .form-container {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeIn 0.8s ease-out forwards;
  }
  
  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .form-group {
    opacity: 0;
    transform: translateY(10px);
    animation: fadeInStaggered 0.5s ease-out forwards;
  }
  
  .form-group:nth-child(1) { animation-delay: 0.2s; }
  .form-group:nth-child(2) { animation-delay: 0.3s; }
  .form-group:nth-child(3) { animation-delay: 0.4s; }
  .form-group:nth-child(4) { animation-delay: 0.5s; }
  .form-group:nth-child(5) { animation-delay: 0.6s; }
  
  @keyframes fadeInStaggered {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Contact animation */
  .contact-animation-container {
    width: 100%;
    height: 100%;
  }
  
  .envelope-body {
    animation: pulseEnvelope 3s infinite alternate;
  }
  
  .envelope-flap {
    transform-origin: center;
    animation: flapOpen 3s infinite alternate;
  }
  
  .message {
    animation: messageFloat 5s infinite ease-in-out;
    transform-origin: center;
  }
  
  .message-line {
    opacity: 0;
    animation: fadeInLines 3s infinite;
  }
  
  .message-line:nth-child(1) { animation-delay: 0.3s; }
  .message-line:nth-child(2) { animation-delay: 0.6s; }
  .message-line:nth-child(3) { animation-delay: 0.9s; }
  
  .person-head {
    animation: bobHead 4s infinite ease-in-out;
  }
  
  .eye {
    animation: blink 4s infinite;
  }
  
  .smile {
    animation: smile 4s infinite alternate;
  }
  
  @keyframes pulseEnvelope {
    0% { transform: scale(1); }
    50% { transform: scale(1.03); }
    100% { transform: scale(1); }
  }
  
  @keyframes flapOpen {
    0%, 20% { transform: rotateX(0deg); }
    30%, 70% { transform: rotateX(-60deg); }
    100% { transform: rotateX(0deg); }
  }
  
  @keyframes messageFloat {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(2deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  
  @keyframes fadeInLines {
    0%, 20% { opacity: 0; }
    50%, 80% { opacity: 1; }
    100% { opacity: 0; }
  }
  
  @keyframes bobHead {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  
  @keyframes blink {
    0%, 48%, 52%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(0.1); }
  }
  
  @keyframes smile {
    0% { transform: scaleX(1); }
    50% { transform: scaleX(1.1); }
    100% { transform: scaleX(1); }
  }
  
  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    .form-container {
      padding: 0 16px;
    }
  }
  </style>