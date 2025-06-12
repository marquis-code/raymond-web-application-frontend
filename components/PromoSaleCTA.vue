<template>
  <section class="relative lg:py-12 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-200/40 to-purple-200/40 rounded-full blur-2xl animate-float-1"></div>
      <div class="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-orange-200/40 to-pink-200/40 rounded-full blur-2xl animate-float-2"></div>
      <div class="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full blur-2xl animate-morph"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Loading State -->
      <div v-if="loadding" class="flex items-center justify-center py-16">
        <div class="relative">
          <!-- Main Loader -->
          <div class="w-16 h-16 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin"></div>
          
          <!-- Orbiting Dots -->
          <div class="absolute inset-0 animate-orbit-loader">
            <div class="absolute top-0 left-1/2 w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full transform -translate-x-1/2 animate-pulse"></div>
          </div>
          <div class="absolute inset-0 animate-orbit-loader-reverse">
            <div class="absolute bottom-0 left-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform -translate-x-1/2 animate-pulse"></div>
          </div>
          
          <!-- Loading Text -->
          <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-medium animate-pulse">
            Loading amazing offers...
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else-if="Object.keys(promosale)?.length" class="lg:max-w-6xl mx-auto">
        <div class="lg:bg-white/70 lg:backdrop-blur-md lg:rounded-3xl lg:shadow-2xl border border-white/20 overflow-hidden animate-slide-in">
          <div class="grid lg:grid-cols-5 gap-0">
            
            <!-- Content Section (3/5) -->
            <div class="lg:col-span-3 py-8 lg:p-12 space-y-6">
              <!-- Discount Badge -->
              <div class="inline-flex items-center justify-center relative group">
                <div class="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
                <div class="relative bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-2xl font-black text-xl md:text-2xl shadow-xl hover:scale-105 transition-all duration-300">
                  <span class="animate-number-pulse">{{ promosale?.discountPercentage }}%</span>
                  <span class="block text-xs font-normal opacity-90">OFF</span>
                </div>
              </div>

              <!-- Limited Time Badge -->
              <div class="inline-flex items-center space-x-2 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-full px-4 py-2 animate-fade-in-up">
                <div class="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span class="text-red-600 text-xs uppercase tracking-wider font-medium">Limited Time</span>
              </div>

              <!-- Title -->
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight animate-slide-up">
                <span class="bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 bg-clip-text text-transparent animate-gradient-text">
                  {{ promosale?.title }}
                </span>
              </h2>

              <!-- Description -->
              <p class="text-lg text-gray-600 font-light leading-relaxed animate-fade-in-up animation-delay-300">
                {{ promosale?.description }}
              </p>

              <!-- Countdown Timer -->
              <div v-if="!promosale?.isLifetime && timeRemaining.total > 0" class="animate-fade-in-up animation-delay-400">
                <div class="text-gray-500 text-xs uppercase tracking-wider mb-3 font-medium">Ends In</div>
                <div class="flex space-x-3">
                  <div v-for="(unit, key) in timeUnits" :key="key" class="text-center">
                    <div class="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl px-3 py-2 hover:bg-white transition-all duration-300 shadow-md">
                      <div class="text-xl font-bold text-gray-900 animate-flip-number">
                        {{ String(timeRemaining[key]).padStart(2, '0') }}
                      </div>
                      <div class="text-xs text-gray-500 uppercase tracking-wider">
                        {{ unit }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CTA Button -->
              <div class="animate-fade-in-up animation-delay-500">
                <NuxtLink
                  to="/shop"
                  class="group relative inline-flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-pink-500/25"
                >
                  <div class="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  <span class="relative z-10">{{ promosale?.actionText }}</span>
                  
                  <div class="relative z-10 w-5 h-5 transition-all duration-300 group-hover:translate-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  
                  <!-- Sparkle Effects -->
                  <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div class="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-sparkle-1"></div>
                    <div class="absolute bottom-2 left-3 w-1 h-1 bg-white rounded-full animate-sparkle-2"></div>
                  </div>
                </NuxtLink>
              </div>
            </div>

            <!-- Image Section (2/5) -->
            <div class="lg:col-span-2 relative p-6 flex items-center justify-center animate-fade-in-right animation-delay-200">
              <!-- Decorative Elements -->
              <div class="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-float-3 opacity-60"></div>
              <div class="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-float-1 opacity-60"></div>
              
              <!-- Image Container -->
              <div class="relative group max-w-sm w-full">
                <div class="absolute -inset-2 bg-gradient-to-r from-pink-200/50 to-purple-200/50 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div class="relative bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-4 hover:bg-white/80 transition-all duration-500">
                  <img
                    :src="promosale?.imageUrl"
                    :alt="promosale?.title"
                    class="w-full h-auto object-contain max-h-48 rounded-xl transition-all duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Urgency Banner -->
          <div v-if="!promosale?.isLifetime && timeRemaining.total > 0 && timeRemaining.total < 86400" 
               class="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-t border-red-200 px-6 py-3 animate-urgent-glow">
            <div class="flex items-center justify-center space-x-2">
              <div class="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
              <span class="text-red-600 font-medium text-sm">⚡ Less than 24 hours remaining!</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-for="i in 8" :key="i" 
           class="absolute w-1 h-1 bg-gray-400/20 rounded-full animate-float-particle"
           :style="{
             left: Math.random() * 100 + '%',
             top: Math.random() * 100 + '%',
             animationDelay: Math.random() * 5 + 's',
             animationDuration: (Math.random() * 4 + 6) + 's'
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
  promosale: PromoSale,
  loadding: Boolean
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
  hours: 'Hrs',
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
/* Loader Animations */
@keyframes orbit-loader {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes orbit-loader-reverse {
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
}

/* Main Content Animations */
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Background Animations */
@keyframes float-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-10px, -15px) scale(1.1); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(15px, -10px) scale(0.9); }
}

@keyframes float-3 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes morph {
  0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
  33% { transform: translate(-50%, -50%) scale(1.2) rotate(120deg); }
  66% { transform: translate(-50%, -50%) scale(0.8) rotate(240deg); }
}

@keyframes float-particle {
  0%, 100% { 
    transform: translateY(0px) translateX(0px); 
    opacity: 0.2;
  }
  50% { 
    transform: translateY(-20px) translateX(10px); 
    opacity: 0.6;
  }
}

/* Text Effects */
@keyframes gradient-text {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes number-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Interactive Effects */
@keyframes sparkle-1 {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}

@keyframes sparkle-2 {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}

@keyframes flip-number {
  0% { transform: rotateY(0); }
  50% { transform: rotateY(-90deg); }
  100% { transform: rotateY(0); }
}

@keyframes urgent-glow {
  0%, 100% { background-color: rgba(239, 68, 68, 0.05); }
  50% { background-color: rgba(239, 68, 68, 0.15); }
}

/* Apply Animations */
.animate-orbit-loader { animation: orbit-loader 3s linear infinite; }
.animate-orbit-loader-reverse { animation: orbit-loader-reverse 4s linear infinite; }
.animate-slide-in { animation: slide-in 0.8s ease-out forwards; }
.animate-slide-up { animation: slide-up 0.6s ease-out forwards; }
.animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
.animate-fade-in-right { animation: fade-in-right 0.6s ease-out forwards; }
.animate-float-1 { animation: float-1 4s ease-in-out infinite; }
.animate-float-2 { animation: float-2 5s ease-in-out infinite; }
.animate-float-3 { animation: float-3 3s ease-in-out infinite; }
.animate-morph { animation: morph 8s ease-in-out infinite; }
.animate-float-particle { animation: float-particle infinite ease-in-out; }
.animate-gradient-text { animation: gradient-text 3s ease infinite; }
.animate-number-pulse { animation: number-pulse 2s ease-in-out infinite; }
.animate-sparkle-1 { animation: sparkle-1 1.5s ease-in-out infinite; }
.animate-sparkle-2 { animation: sparkle-2 1.8s ease-in-out infinite 0.3s; }
.animate-flip-number { animation: flip-number 0.6s ease-in-out; }
.animate-urgent-glow { animation: urgent-glow 2s ease-in-out infinite; }

/* Animation Delays */
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-500 { animation-delay: 0.5s; }
</style>