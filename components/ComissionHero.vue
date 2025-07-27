<template>
        <div class="max-w-7xl mx-auto">
            <!-- {{content}} -->
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
                  <img :src="content?.images[0]"  alt="Commission artwork example" class="relative z-10 rounded-lg shadow-xl w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFetchContentByType } from "@/composables/modules/content/useFetchContentByType"
const { fetchContentByType, loading: fetchingContent, content } = useFetchContentByType()


// Set minimum date on component mount
onMounted(() => {
  fetchContentByType("commission_hero")
})

</script>