<template>
  <section v-if="Object.keys(promosale)?.length" ref="promotionRef" class="relative pt-32 pb-16 overflow-hidden bg-white">
    <!-- Light Background with Subtle Patterns -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <!-- Animated Geometric Shapes - Light Theme -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-100/60 to-purple-100/60 rounded-full blur-3xl animate-morph-1"></div>
        <div class="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-orange-100/60 to-pink-100/60 rounded-full blur-3xl animate-morph-2"></div>
        <div class="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-100/60 to-purple-100/60 rounded-full blur-3xl animate-morph-3"></div>
      </div>
      
      <!-- Subtle Grid Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="grid grid-cols-12 gap-4 h-full">
          <div v-for="i in 144" :key="i" 
               class="border border-gray-400 animate-grid-pulse"
               :style="{ animationDelay: (i * 0.1) + 's' }">
          </div>
        </div>
      </div>

      <!-- Top Fade for Navigation Visibility -->
      <div class="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white via-white/95 to-transparent z-30"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Header Section with Floating Elements -->
      <div class="text-center mb-16">
        <div class="relative inline-block">
          <!-- Floating Icons Around Discount -->
          <div class="absolute -top-8 -left-8 animate-orbit-1">
            <div class="w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
          <div class="absolute -top-4 -right-12 animate-orbit-2">
            <div class="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
          <div class="absolute -bottom-6 -left-10 animate-orbit-3">
            <div class="w-5 h-5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-pulse shadow-lg"></div>
          </div>
          
          <!-- Main Discount Badge -->
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse-slow"></div>
            <div class="relative bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-black text-2xl md:text-3xl shadow-2xl transform hover:scale-110 transition-all duration-300">
              <span class="animate-number-glow">{{ promosale?.discountPercentage }}%</span>
              <span class="block text-sm font-normal opacity-90">OFF</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        
        <!-- Left Column - Content -->
        <div class="space-y-8">
          <!-- Limited Time Badge -->
          <div class="inline-flex items-center space-x-2 bg-black/5 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-2 animate-slide-in-left shadow-lg">
            <div class="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <span class="text-gray-700 text-sm uppercase tracking-widest font-medium">Limited Time Offer</span>
          </div>

          <!-- Title with Staggered Animation -->
          <h1 class="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
            <div class="overflow-hidden">
              <div v-for="(word, wordIndex) in promosale?.title?.split(' ')" 
                   :key="wordIndex"
                   class="inline-block mr-4 animate-slide-up-word"
                   :style="{ animationDelay: wordIndex * 0.2 + 's' }">
                <span v-for="(char, charIndex) in word.split('')" 
                      :key="charIndex"
                      class="inline-block animate-char-reveal"
                      :style="{ 
                        animationDelay: (wordIndex * 0.2 + charIndex * 0.05) + 's',
                        background: `linear-gradient(45deg, hsl(${(charIndex * 30) % 360}, 70%, 40%), hsl(${((charIndex * 30) + 60) % 360}, 70%, 60%))`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }">
                  {{ char }}
                </span>
              </div>
            </div>
          </h1>

          <!-- Description -->
          <p class="text-xl md:text-2xl text-gray-600 font-light leading-relaxed animate-fade-in-up animation-delay-800">
            {{ promosale?.description }}
          </p>

          <!-- Countdown Timer (if applicable) -->
          <div v-if="!promosale?.isLifetime && timeRemaining.total > 0" 
               class="animate-fade-in-up animation-delay-1000">
            <div class="text-gray-500 text-sm uppercase tracking-widest mb-4 font-medium">Offer Expires In</div>
            <div class="grid grid-cols-4 gap-4 max-w-md">
              <div v-for="(unit, key) in timeUnits" :key="key" 
                   class="text-center group">
                <div class="relative">
                  <!-- Glowing Background -->
                  <div class="absolute inset-0 bg-gradient-to-br from-pink-200/50 to-purple-200/50 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 animate-glow-pulse"></div>
                  
                  <!-- Timer Box -->
                  <div class="relative bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl p-4 hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg">
                    <div class="text-2xl md:text-3xl font-bold text-gray-900 mb-1 animate-flip-number">
                      {{ String(timeRemaining[key]).padStart(2, '0') }}
                    </div>
                    <div class="text-xs text-gray-500 uppercase tracking-wider font-medium">
                      {{ unit }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <div class="animate-fade-in-up animation-delay-1200">
            <NuxtLink
              to="/artworks"
              class="group relative inline-flex items-center space-x-4 bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-pink-500/25"
            >
              <!-- Animated Background -->
              <div class="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-gradient-shift"></div>
              
              <!-- Button Content -->
              <span class="relative z-10 group-hover:text-white transition-colors duration-300">
                {{ promosale?.actionText }}
              </span>
              
              <!-- Animated Arrow -->
              <div class="relative z-10 w-6 h-6 transition-all duration-300 group-hover:translate-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              
              <!-- Sparkle Effects -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div class="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-sparkle-1"></div>
                <div class="absolute bottom-3 left-4 w-1 h-1 bg-white rounded-full animate-sparkle-2"></div>
                <div class="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full animate-sparkle-3"></div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Right Column - Image with Creative Frame -->
        <div class="relative animate-fade-in-right animation-delay-600">
          <!-- Decorative Frame -->
          <div class="absolute -inset-4 bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-orange-200/30 rounded-3xl blur-2xl animate-frame-glow"></div>
          
          <!-- Image Container -->
          <div class="relative bg-white/60 backdrop-blur-sm border border-gray-200 rounded-3xl p-6 hover:bg-white/80 transition-all duration-500 group shadow-xl">
            <!-- Corner Decorations -->
            <div class="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-pink-500 rounded-tl-lg animate-corner-glow"></div>
            <div class="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-purple-500 rounded-tr-lg animate-corner-glow animation-delay-200"></div>
            <div class="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-orange-500 rounded-bl-lg animate-corner-glow animation-delay-400"></div>
            <div class="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-pink-500 rounded-br-lg animate-corner-glow animation-delay-600"></div>
            
            <!-- Main Image -->
            <div class="relative overflow-hidden rounded-2xl bg-gray-50">
              <img
                :src="promosale?.imageUrl"
                :alt="promosale?.title"
                class="w-full h-auto object-contain max-h-96 transition-all duration-700 group-hover:scale-105"
              />
              
              <!-- Image Overlay Effects -->
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          <!-- Floating Elements Around Image -->
          <div class="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-float-1 opacity-80 shadow-lg"></div>
          <div class="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-float-2 opacity-80 shadow-lg"></div>
          <div class="absolute top-1/2 -right-8 w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-float-3 opacity-80 shadow-lg"></div>
        </div>
      </div>

      <!-- Urgency Message -->
      <div v-if="!promosale?.isLifetime && timeRemaining.total > 0 && timeRemaining.total < 86400" 
           class="text-center mt-12 animate-urgent-pulse">
        <div class="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-6 py-3 shadow-lg">
          <div class="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          <span class="text-red-600 font-medium">⚡ Less than 24 hours remaining!</span>
        </div>
      </div>
    </div>

    <!-- Bottom Decorative Elements -->
    <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 to-transparent"></div>
    
    <!-- Floating Particles - Light Theme -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-for="i in 15" :key="i" 
           class="absolute w-1 h-1 bg-gray-400/30 rounded-full animate-float-particle"
           :style="{
             left: Math.random() * 100 + '%',
             top: Math.random() * 100 + '%',
             animationDelay: Math.random() * 5 + 's',
             animationDuration: (Math.random() * 4 + 3) + 's'
           }">
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
  promosale: PromoSale
}>()

const promotionRef = ref<HTMLElement>()
const countdownInterval = ref<NodeJS.Timeout>()

const timeRemaining = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  total: 0
})

const timeUnits = {
  days: 'Days',
  hours: 'Hours',
  minutes: 'Min',
  seconds: 'Sec'
}

const calculateTimeRemaining = () => {
  if (props.promosale?.isLifetime || !props.promosale?.endDate) {
    timeRemaining.value = { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
    return
  }

  const now = new Date().getTime()
  const endTime = new Date(props.promosale.endDate).getTime()
  const difference = endTime - now

  if (difference > 0) {
    timeRemaining.value = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      total: Math.floor(difference / 1000)
    }
  } else {
    timeRemaining.value = { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
  }
}

onMounted(() => {
  calculateTimeRemaining()
  countdownInterval.value = setInterval(calculateTimeRemaining, 1000)
})

onUnmounted(() => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value)
  }
})
</script>

<style scoped>
/* All previous animations remain the same, just adding new ones */

@keyframes float-particle {
  0%, 100% { 
    transform: translateY(0px) translateX(0px) rotate(0deg); 
    opacity: 0.3;
  }
  50% { 
    transform: translateY(-30px) translateX(20px) rotate(180deg); 
    opacity: 0.8;
  }
}

/* Morphing Background Animations */
@keyframes morph-1 {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  33% { transform: translate(30px, -30px) scale(1.1) rotate(120deg); }
  66% { transform: translate(-20px, 20px) scale(0.9) rotate(240deg); }
}

@keyframes morph-2 {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  50% { transform: translate(-40px, -20px) scale(1.2) rotate(180deg); }
}

@keyframes morph-3 {
  0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
  25% { transform: translate(20px, 30px) scale(0.8) rotate(90deg); }
  75% { transform: translate(-30px, -10px) scale(1.1) rotate(270deg); }
}

/* Orbital Animations */
@keyframes orbit-1 {
  0% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
}

@keyframes orbit-2 {
  0% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
  100% { transform: rotate(-360deg) translateX(50px) rotate(360deg); }
}

@keyframes orbit-3 {
  0% { transform: rotate(0deg) translateX(45px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(45px) rotate(-360deg); }
}

/* Text Animations */
@keyframes slide-up-word {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes char-reveal {
  from {
    opacity: 0;
    transform: translateY(50px) rotateX(-90deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
}

/* Floating Animations */
@keyframes float-1 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes float-2 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(-180deg); }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(180deg); }
}

/* Sparkle Effects */
@keyframes sparkle-1 {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}

@keyframes sparkle-2 {
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
}

@keyframes sparkle-3 {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}

/* Other Animations */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.8; }
}

@keyframes frame-glow {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.6; }
}

@keyframes corner-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes urgent-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes flip-number {
  0% { transform: rotateY(0); }
  50% { transform: rotateY(-90deg); }
  100% { transform: rotateY(0); }
}

@keyframes number-glow {
  0%, 100% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
  50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 182, 193, 0.6); }
}

@keyframes grid-pulse {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.75; }
  50% { opacity: 1; }
}

/* Apply Animations */
.animate-morph-1 { animation: morph-1 20s ease-in-out infinite; }
.animate-morph-2 { animation: morph-2 25s ease-in-out infinite; }
.animate-morph-3 { animation: morph-3 30s ease-in-out infinite; }

.animate-orbit-1 { animation: orbit-1 10s linear infinite; }
.animate-orbit-2 { animation: orbit-2 15s linear infinite; }
.animate-orbit-3 { animation: orbit-3 12s linear infinite; }

.animate-slide-up-word { animation: slide-up-word 0.8s ease-out forwards; }
.animate-char-reveal { animation: char-reveal 0.6s ease-out forwards; }

.animate-float-1 { animation: float-1 3s ease-in-out infinite; }
.animate-float-2 { animation: float-2 4s ease-in-out infinite; }
.animate-float-3 { animation: float-3 3.5s ease-in-out infinite; }
.animate-float-particle { animation: float-particle infinite ease-in-out; }

.animate-sparkle-1 { animation: sparkle-1 1.5s ease-in-out infinite; }
.animate-sparkle-2 { animation: sparkle-2 1.8s ease-in-out infinite; }
.animate-sparkle-3 { animation: sparkle-3 1.2s ease-in-out infinite; }

.animate-gradient-shift { animation: gradient-shift 3s ease infinite; }
.animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
.animate-frame-glow { animation: frame-glow 3s ease-in-out infinite; }
.animate-corner-glow { animation: corner-glow 2s ease-in-out infinite; }
.animate-urgent-pulse { animation: urgent-pulse 1s ease-in-out infinite; }
.animate-flip-number { animation: flip-number 0.6s ease-in-out; }
.animate-number-glow { animation: number-glow 2s ease-in-out infinite; }
.animate-grid-pulse { animation: grid-pulse 4s ease-in-out infinite; }
.animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
.animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
.animate-fade-in-right { animation: fade-in-right 0.8s ease-out forwards; }
.animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }

/* Animation Delays */
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-600 { animation-delay: 0.6s; }
.animation-delay-800 { animation-delay: 0.8s; }
.animation-delay-1000 { animation-delay: 1s; }
.animation-delay-1200 { animation-delay: 1.2s; }
</style>