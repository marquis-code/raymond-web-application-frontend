<template>
    <div class="absolute inset-0 md:hidden bg-[#232323]">
      <div class="absolute bottom-0 left-0 right-0 p-8">
        <div class="animate-slide-up">
          <h1 
            ref="titleRef"
            class="text-3xl font-bold mb-4 text-white animate-fade-in-up"
            :class="{ 'animate-active': isVisible }"
          >
            RAYMOND AWORO ARTs
          </h1>
          <p 
            class="text-lg text-white italic mb-8 animate-fade-in-up delay-300"
            :class="{ 'animate-active': isVisible }"
          >
            Creating Art; Exploring Life at the Intersection of Faith and Creativity
          </p>
  

          <div class="flex justify-center gap-4">
            <a
              v-for="(social, index) in socialLinks"
              :key="social.name"
              :href="social.url"
              class="bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-300 hover:scale-110 animate-bounce-in"
              :style="{ animationDelay: `${0.8 + index * 0.1}s` }"
              :class="{ 'animate-active': isVisible }"
            >
              <span class="sr-only">{{ social.name }}</span>
              <img :src="social.icon" class="h-5 w-5 text-zinc-800" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  // Types
  interface SocialLink {
    name: string
    url: string
    icon: string
  }
  
  // Refs
  const titleRef = ref<HTMLElement | null>(null)
  const isVisible = ref<boolean>(false)
  
  // Data
  const socialLinks: SocialLink[] = [
    { name: 'Instagram', url: '#', icon: '/icons/instagram.svg' },
    { name: 'Twitter', url: '#', icon: '/icons/twitter.svg' },
    { name: 'Facebook', url: '#', icon: '/icons/facebook.svg' },
    { name: 'LinkedIn', url: '#', icon: '/icons/linkedin.svg' }
  ]
  
  // Lifecycle
  onMounted(() => {
    isVisible.value = true
  })
  </script>
  
  <style scoped>
  @keyframes slide-up {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes fade-in-up {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes bounce-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.8s ease-out forwards;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
    animation-fill-mode: both;
  }
  
  .animate-bounce-in {
    animation: bounce-in 0.5s ease-out forwards;
    animation-fill-mode: both;
  }
  
  .delay-300 {
    animation-delay: 0.3s;
  }
  </style>