<template>
    <div class="relative w-full h-screen overflow-hidden">
      <!-- Background Image -->
      <img 
        src="/path-to-your-image.jpg" 
        alt="Raymond Aworo Art Background" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      
      <!-- Black Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <!-- Content Overlay -->
      <div class="relative z-10 hidden bg-black bg-opacity-80 md:flex text-white p-8 md:p-16 flex-col justify-center h-full">
        <h1 
          class="text-2xl md:text-4xl font-bold mb-4 animate-slide-up"
          :class="{ 'animate-active': isVisible }"
        >
          RAYMOND AWORO ART
        </h1>
        <p 
          class="text-base md:text-xl text-zinc-300 italic mb-8 animate-fade-in-up delay-300"
          :class="{ 'animate-active': isVisible }"
        >
          Creating Art; Exploring Life at the Intersection of Faith and Creativity
        </p>
  
        <!-- Desktop social media icons -->
        <div class="flex justify-center gap-6">
          <a
            v-for="(social, index) in socialLinks"
            :key="social.name"
            :href="social.url"
            class="bg-white hover:bg-zinc-100 rounded-full p-3 transition-all duration-300 hover:scale-110 animate-bounce-in"
            :style="{ animationDelay: `${0.6 + index * 0.1}s` }"
            :class="{ 'animate-active': isVisible }"
          >
            <span class="sr-only">{{ social.name }}</span>
            <img :src="social.icon" class="h-5 w-5 text-zinc-800" />
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import instagram from "@/assets/icons/instagram.svg"
  import facebook from "@/assets/icons/facebook.svg"
  import twitter from "@/assets/icons/logo-black.png"
  import tiktok from "@/assets/icons/tiktok.svg"
  import youtube from "@/assets/icons/youtube.svg"
  interface SocialLink {
    name: string;
    url: string;
    icon: string;
  }
  
  const isVisible = ref(false);
  
  const socialLinks: SocialLink[] = [
    {
      name: 'Facebook',
      url: '#',
      icon: facebook
    },
    {
      name: 'Instagram', 
      url: '#',
      icon: instagram
    },
    {
      name: 'Twitter',
      url: '#',
      icon: twitter
    },
    {
      name: 'TikTok',
      url: '#',
      icon: tiktok
    },
    {
      name: 'YouTube',
      url: '#',
      icon: youtube
    }
  ];
  
  onMounted(() => {
    // Trigger animations after component mounts
    setTimeout(() => {
      isVisible.value = true;
    }, 100);
  });
  </script>
  
  <style scoped>
  /* Custom animations */
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-slide-up {
    animation: slide-up 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .animate-bounce-in {
    animation: bounce-in 0.6s ease-out forwards;
    opacity: 0;
  }
  
  .animate-active {
    animation-play-state: running;
  }
  
  .delay-300 {
    animation-delay: 300ms;
  }
  </style>