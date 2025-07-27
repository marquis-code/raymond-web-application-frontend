<template>
    <div class="min-h-screen bg-gradient-to-tr mt-16 from-gray-50 to-gray-100">
      <!-- Hero Section -->
      <section class="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-amber-100 rounded-full opacity-30 blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-100 rounded-full opacity-30 blur-3xl"></div>
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="order-2 lg:order-1 bg-gray-800 text-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:shadow-rose-100/20 hover:shadow-2xl">
              <h1 class="text-4xl font-bold mb-6">{{content?.title}}</h1>
              
              <div class="space-y-6 text-gray-200">
                <p class="leading-loose">
                  {{content?.metadata?.aboutInfo?.biography[0]}}
                </p>
              </div>
            </div>
            
            <div class="order-1 lg:order-2 relative">
              <div class="relative">
                <!-- <div class="absolute inset-0 bg-amber-100 rounded-lg transform rotate-6"></div> -->
                <img 
                  :src="content?.images[0]" 
                  alt="Artist Portrait" 
                  class="relative z-10 rounded-lg shadow-xl w-full h-auto"
                  @error="handleImageError"
                />
              </div>
              
              <!-- <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-100 rounded-full flex items-center justify-center transform rotate-12 shadow-lg">
                <span class="text-rose-800 font-bold text-lg text-center px-4">Hyper-Realistic Artist</span>
              </div> -->
            </div>
          </div>
        </div>
      </section>
      
    
      <TestimonialsCarousel />

    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useFetchContentByType } from "@/composables/modules/content/useFetchContentByType"
import { useCreateEnquires } from "@/composables/modules/enquires/useCreateEnquires"
const { fetchContentByType, loading: fetchingContent, content } = useFetchContentByType()
  
  const handleImageError = (event: Event) => {
    // Fallback for image loading errors
    const target = event.target as HTMLImageElement
    target.src = '/placeholder.svg?height=400&width=300'
  }

  onMounted(() => {
    fetchContentByType('about_section')
  })
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