<template>
    <div class="relative w-full h-[384px] overflow-hidden bg-gray-900">
      <!-- Background Image -->
      <img 
      :src="promosale?.imageUrl" 
        alt="New Prints Edition Background"
        class="absolute inset-0 h-full  w-full transition-transform duration-700 hover:scale-110" 
      />
      
      <!-- Dark Overlay for better text readability -->
      <div class="absolute h-96 inset-0 bg-black/40 transition-opacity duration-300 hover:bg-black/30"></div>
      
      <!-- Text Overlay Content -->
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <!-- Top Line -->
        <div class="mb-4 transform -translate-y-2 opacity-0 animate-fade-in-up">
          <h2 class="text-white text-lg font-bold tracking-wider uppercase letterspacing-widest">
            {{ promosale?.description }}
          </h2>
        </div>
        
        <!-- Main Title -->
        <div class="mb-6 transform translate-y-2 opacity-0 animate-fade-in-up-delay">
          <h1 class="text-white text-5xl  font-black tracking-tight uppercase leading-tight">
            <span>{{ promosale?.title }}</span>
          </h1>
        </div>
        
        <!-- Discount Text -->
        <div class="mb-8 transform translate-y-4 opacity-0 animate-fade-in-up-delay-2">
          <p class="text-white text-xl md:text-2xl lg:text-3xl font-bold tracking-wide uppercase">
            GET <span class="text-yellow-400">{{ promosale?.discountPercentage }}% OFF</span>!!!!!
          </p>
        </div>
        
        <!-- Call to Action Button -->
        <div class="transform translate-y-6 opacity-0 animate-fade-in-up-delay-3">
          <button 
            @click="handleShopClick"
            class="group relative bg-white text-gray-900 px-8 py-2 md:px-12 md:py-4 text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/50"
          >
            <!-- Button background animation -->
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="relative z-10 group-hover:text-white transition-colors duration-300">
                {{ promosale?.actionText }}
            </span>
            
            <!-- Button shine effect -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </div>
          </button>
        </div>
      </div>
      
      <!-- Decorative Elements -->
      <div class="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-white/30 opacity-0 animate-fade-in-delay"></div>
      <div class="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-white/30 opacity-0 animate-fade-in-delay-2"></div>
      
      <!-- Floating particles effect -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          v-for="particle in particles" 
          :key="particle.id"
          class="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
          :style="{ 
            left: particle.x + '%', 
            top: particle.y + '%',
            animationDelay: particle.delay + 's',
            animationDuration: particle.duration + 's'
          }"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  // Props (optional - for customization)
  interface PromoSale {
  title: string
  description: string
  discountPercentage: number
  priority: number
  startDate: string
  endDate: string
  actionText: string
  isLifetime: boolean
  imageUrl: string
}
  
  const props = defineProps<{
  promosale: PromoSale,
  loading: Boolean
}>()
  
  // Emits
  interface Emits {
    (e: 'shop-click'): void
  }
  
  const emit = defineEmits<Emits>()
  
  // Floating particles for visual effect
  interface Particle {
    id: number
    x: number
    y: number
    delay: number
    duration: number
  }
  
  const particles = ref<Particle[]>([])
  
  // Methods
  const handleShopClick = () => {
    // Add click animation effect
    const button = event?.target as HTMLButtonElement
    if (button) {
      button.classList.add('animate-pulse')
      setTimeout(() => {
        button.classList.remove('animate-pulse')
      }, 200)
    }
    
    // Emit shop click event
    emit('shop-click')
    
    // Navigate to shop page (adjust route as needed)
    navigateTo('/shop')
  }
  
  const generateParticles = () => {
    particles.value = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }))
  }
  
  // Lifecycle
  onMounted(() => {
    generateParticles()
    
    // Add intersection observer for scroll animations
    if (process.client) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      }, { threshold: 0.3 })
      
      // Observe the main container
      const container = document.querySelector('.relative.w-full.h-72')
      if (container) {
        observer.observe(container)
      }
    }
  })

//   const handleShopClick = async() => {
//     // Add your shop navigation logic here
//     await navigateTo('/shop')
//   };
  </script>
  
  <style scoped>
  /* Custom animations */
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.1;
    }
    50% {
      transform: translateY(-20px) rotate(180deg);
      opacity: 0.3;
    }
  }
  
  /* Animation classes */
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out 0.2s forwards;
  }
  
  .animate-fade-in-up-delay {
    animation: fade-in-up 0.8s ease-out 0.4s forwards;
  }
  
  .animate-fade-in-up-delay-2 {
    animation: fade-in-up 0.8s ease-out 0.6s forwards;
  }
  
  .animate-fade-in-up-delay-3 {
    animation: fade-in-up 0.8s ease-out 0.8s forwards;
  }
  
  .animate-fade-in-delay {
    animation: fade-in-up 0.6s ease-out 0.5s forwards;
  }
  
  .animate-fade-in-delay-2 {
    animation: fade-in-up 0.6s ease-out 1s forwards;
  }
  
  .animate-float {
    animation: float linear infinite;
  }
  
  /* Custom letter spacing */
  .letterspacing-widest {
    letter-spacing: 0.2em;
  }
  
  /* Responsive typography adjustments */
  @media (max-width: 640px) {
    .text-4xl {
      font-size: 2.5rem;
    }
    
    .text-xl {
      font-size: 1.125rem;
    }
  }
  
  /* Text shadow for better readability */
  h1, h2, p {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  }
  
  /* Button hover glow effect */
  button:hover {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  }
  
  /* Image overlay gradient alternative */
  .gradient-overlay {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
  </style>