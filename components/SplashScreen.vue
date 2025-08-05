<template>
    <Transition
      name="splash"
      @enter="onEnter"
      @leave="onLeave"
    >
      <div
        v-if="isVisible"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      >
        <!-- Animated Background -->
        <div class="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <!-- Floating Particles -->
          <div class="absolute inset-0">
            <div
              v-for="i in 20"
              :key="i"
              class="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
              :style="{
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                animationDuration: (3 + Math.random() * 2) + 's'
              }"
            ></div>
          </div>
          
          <!-- Gradient Overlay Animation -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
        </div>
  
        <!-- Main Content Container -->
        <div class="relative z-10 text-center">
          <!-- Logo Container - Made More Prominent -->
          <div class="mb-12">
            <div class="relative inline-block">
              <!-- Enhanced Logo Background Glow -->
              <div class="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 rounded-full blur-2xl opacity-60 animate-pulse-glow scale-150"></div>
              
              <!-- Main Logo - Larger and More Prominent -->
              <div class="relative bg-white rounded-full p-12 shadow-2xl animate-logo-entrance">
                <!-- Company Art Logo - Made Larger -->
                <svg
                  class="w-24 h-24 text-purple-600 animate-logo-spin"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.54 0 3-.35 4.31-.99.19-.09.29-.29.29-.51 0-.22-.1-.42-.29-.51C15.35 19.65 15 18.54 15 17.5c0-1.89 1.34-3.5 3-3.9.28-.07.5-.32.5-.6 0-.83-.67-1.5-1.5-1.5H15c-1.1 0-2-.9-2-2 0-3.87 3.13-7 7-7h1c.55 0 1-.45 1-1s-.45-1-1-1h-1c-4.97 0-9 4.03-9 9 0 .34.02.67.07 1H12c-5.52 0-10-4.48-10-10S6.48 2 12 2z"/>
                  <circle cx="6.5" cy="11.5" r="1.5"/>
                  <circle cx="9.5" cy="8.5" r="1.5"/>
                  <circle cx="15" cy="6" r="1"/>
                  <circle cx="17" cy="8" r="1"/>
                </svg>
              </div>
              
              <!-- Additional Logo Ring Animation -->
              <div class="absolute inset-0 border-4 border-white/20 rounded-full animate-spin-slow"></div>
              <div class="absolute inset-2 border-2 border-purple-300/30 rounded-full animate-spin-reverse"></div>
            </div>
          </div>
  
          <!-- Brand Name - Enhanced -->
          <div class="space-y-4">
            <h1 class="text-5xl md:text-7xl font-bold text-white animate-text-reveal">
              <span class="inline-block animate-letter-1">A</span>
              <span class="inline-block animate-letter-2">r</span>
              <span class="inline-block animate-letter-3">t</span>
              <span class="inline-block animate-letter-4 ml-6">S</span>
              <span class="inline-block animate-letter-5">h</span>
              <span class="inline-block animate-letter-6">o</span>
              <span class="inline-block animate-letter-7">p</span>
            </h1>
            
            <p class="text-xl md:text-2xl text-purple-200 animate-subtitle-fade font-light">
              Where Art Comes to Life
            </p>
          </div>
  
          <!-- Enhanced Loading Animation -->
          <div class="mt-16">
            <div class="flex justify-center space-x-3">
              <div
                v-for="i in 3"
                :key="i"
                class="w-4 h-4 bg-white rounded-full animate-bounce"
                :style="{ animationDelay: (i * 0.3) + 's' }"
              ></div>
            </div>
            <p class="text-purple-300 mt-4 text-sm animate-pulse">Loading your art experience...</p>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { ref, watch, readonly } from 'vue'
  
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 2500
    }
  })
  
  const emit = defineEmits(['hide'])
  
  const isVisible = ref(props.show)
  
  // Watch for external show prop changes
  watch(() => props.show, (newValue) => {
    isVisible.value = newValue
    
    if (newValue && props.duration > 0) {
      // Auto-hide after duration only if duration is provided
      setTimeout(() => {
        isVisible.value = false
        emit('hide')
      }, props.duration)
    }
  })
  
  const onEnter = (el) => {
    // Add any enter animations here
  }
  
  const onLeave = (el) => {
    // Add any leave animations here
    emit('hide')
  }
  
  // Expose method to manually hide
  const hide = () => {
    isVisible.value = false
    emit('hide')
  }
  
  defineExpose({
    hide,
    isVisible: readonly(isVisible)
  })
  </script>
  
  <style scoped>
  /* Enhanced Animations */
  @keyframes spin-slow {
    from { transform: rotate(0deg) scale(1); }
    to { transform: rotate(360deg) scale(1.05); }
  }
  
  @keyframes spin-reverse {
    from { transform: rotate(360deg) scale(1); }
    to { transform: rotate(0deg) scale(0.95); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 4s linear infinite;
  }
  
  .animate-spin-reverse {
    animation: spin-reverse 3s linear infinite;
  }
  
  /* Enhanced Logo Animations */
  @keyframes logo-entrance {
    0% {
      transform: scale(0) rotate(-180deg);
      opacity: 0;
    }
    50% {
      transform: scale(1.2) rotate(-90deg);
      opacity: 0.8;
    }
    100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
  }
  
  @keyframes pulse-glow {
    0%, 100% {
      opacity: 0.4;
      transform: scale(1);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.1);
    }
  }
  
  /* All other existing styles remain the same */
  .splash-enter-active {
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .splash-leave-active {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  .splash-enter-from {
    opacity: 0;
    transform: scale(1.1);
  }
  
  .splash-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
  
  .animate-logo-entrance {
    animation: logo-entrance 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  .animate-logo-spin {
    animation: logo-spin 3s linear infinite;
    animation-delay: 1.5s;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  .animate-text-reveal {
    animation: text-reveal 1s ease-out forwards;
    animation-delay: 0.8s;
    opacity: 0;
  }
  
  .animate-subtitle-fade {
    animation: subtitle-fade 1s ease-out forwards;
    animation-delay: 1.2s;
    opacity: 0;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-shimmer {
    animation: shimmer 3s ease-in-out infinite;
  }
  
  /* Letter Animations */
  .animate-letter-1 { animation: letter-bounce 0.6s ease-out forwards; animation-delay: 1s; }
  .animate-letter-2 { animation: letter-bounce 0.6s ease-out forwards; animation-delay: 1.1s; }
  .animate-letter-3 { animation: letter-bounce 0.6s ease-out forwards; animation-delay: 1.2s; }
  .animate-letter-4 { animation: letter-bounce 0.6s ease-out forwards; animation-delay: 1.3s; }
  .animate-letter-5 { animation: letter-bounce 0.6s ease-out forwards; animation-delay: 1.4s; }
  .animate-letter-6 { animation: letter-bounce 0.6s ease-out forwards; animation-delay: 1.5s; }
  .animate-letter-7 { animation: letter-bounce 0.6s ease-out forwards; animation-delay: 1.6s; }
  
  @keyframes logo-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes text-reveal {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes letter-bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
  
  @keyframes subtitle-fade {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.5; }
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  </style>
  