<template>
    <div class="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100">
      <!-- Hero Section -->
      <section class="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-amber-100 rounded-full opacity-30 blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-100 rounded-full opacity-30 blur-3xl"></div>
        
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="order-2 lg:order-1 bg-gray-800 text-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:shadow-rose-100/20 hover:shadow-2xl">
              <h1 class="text-4xl font-bold mb-6">ABOUT</h1>
              
              <div class="space-y-6 text-gray-200">
                <p>
                  Raymond Aworo (born in 1999) is a hyper-realistic visual artist and also a medical 
                  doctor in training who was born in Nigeria. He started drawing at the age of 12. He's a self-taught 
                  artist who expresses in charcoal, pastel and acrylic paint and also nature photography.
                </p>
                
                <p>
                  He draws inspiration primarily from his Faith(Christianity), personal life struggles 
                  and immediate environment.
                </p>
                
                <p>
                  As he continues to explore his creativity and perfect his style, Raymond has debuted his 
                  works at few exhibitions while working on more international exhibitions.
                </p>
                
                <p>
                  He enjoys listening to music, eating, playing football, editing videos and creating content 
                  for his fans on social media.
                </p>
              </div>
            </div>
            
            <div class="order-1 lg:order-2 relative">
              <div class="relative">
                <div class="absolute inset-0 bg-amber-100 rounded-lg transform rotate-6"></div>
                <img 
                  src="@/assets/img/artist.png" 
                  alt="Artist Portrait" 
                  class="relative z-10 rounded-lg shadow-xl w-full h-auto transform -rotate-6 transition-transform duration-500 hover:rotate-0"
                  @error="handleImageError"
                />
              </div>
              
              <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-100 rounded-full flex items-center justify-center transform rotate-12 shadow-lg">
                <span class="text-rose-800 font-bold text-lg text-center px-4">Hyper-Realistic Artist</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      <!-- Testimonials -->
      <!-- <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-16 text-gray-800 relative inline-block">
            What Clients Say
            <span class="absolute -bottom-2 left-0 w-full h-1 bg-emerald-400"></span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-gray-50 p-6 rounded-xl shadow-md">
              <div class="flex items-center mb-4">
                <div class="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div class="ml-4">
                  <h4 class="font-bold text-gray-800">Sarah Johnson</h4>
                  <p class="text-gray-500 text-sm">New York, USA</p>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "Raymond's attention to detail is extraordinary. The portrait he created of my daughter captures not just her likeness, but her spirit. It's a treasure we'll cherish forever."
              </p>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-xl shadow-md">
              <div class="flex items-center mb-4">
                <div class="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div class="ml-4">
                  <h4 class="font-bold text-gray-800">Michael Thompson</h4>
                  <p class="text-gray-500 text-sm">London, UK</p>
                </div>
              </div>
              <div class="mb-4">
                <div class="flex text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "I commissioned a family portrait as an anniversary gift, and it exceeded all expectations. Raymond's ability to capture personalities through his art is truly remarkable."
              </p>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-xl shadow-md">
              <div class="flex items-center mb-4">
                <div class="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div class="ml-4">
                  <h4 class="font-bold text-gray-800">Amara Okafor</h4>
                  <p class="text-gray-500 text-sm">Lagos, Nigeria</p>
                </div>
              </div>
              <div class="mb-4">
                <div class="flex text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "Working with Raymond was a pleasure from start to finish. His professionalism and artistic vision brought my ideas to life in ways I couldn't have imagined."
              </p>
            </div>
          </div>
        </div>
      </section> -->

      <TestimonialsCarousel />

    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
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
      transform: translateY(0px) rotate(6deg);
    }
    50% {
      transform: translateY(-10px) rotate(8deg);
    }
    100% {
      transform: translateY(0px) rotate(6deg);
    }
  }
  
  .absolute {
    animation: float 6s ease-in-out infinite;
  }
  </style>