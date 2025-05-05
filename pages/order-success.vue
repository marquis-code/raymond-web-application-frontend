<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <!-- Animated Background Elements -->
      <div class="fixed w-full h-full pointer-events-none overflow-hidden">
        <div class="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full mix-blend-screen blur-xl animate-float-slow"></div>
        <div class="absolute bottom-40 right-20 w-40 h-40 bg-blue-500/10 rounded-full mix-blend-screen blur-xl animate-float-medium"></div>
        <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full mix-blend-screen blur-xl animate-float-fast"></div>
      </div>
      
      <!-- Success Card -->
      <div class="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden relative z-10 transform transition-all duration-700 animate-card-entrance">
        <!-- Success Checkmark Animation -->
        <div class="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 flex justify-center">
          <div class="relative w-24 h-24">
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-8">
          <h2 class="text-2xl font-bold text-center mb-2 animate-fade-in-up delay-300">Transaction Successful!</h2>
          <p class="text-gray-600 text-center mb-6 animate-fade-in-up delay-400">Your payment has been processed successfully.</p>
          
          <!-- Transaction Details -->
          <div class="space-y-4 animate-fade-in-up delay-500">
            <div class="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">Transaction ID:</span>
                <span class="font-medium">{{ transactionId }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">Date:</span>
                <span class="font-medium">{{ formattedDate }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Amount:</span>
                <span class="font-medium text-emerald-600">${{ formatPrice(amount) }}</span>
              </div>
            </div>
            
            <!-- Confetti Animation -->
            <div class="confetti-container">
              <div v-for="n in 20" :key="n" class="confetti" :style="getConfettiStyle(n)"></div>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex flex-col space-y-3 animate-fade-in-up delay-700">
              <button 
                @click="viewDetails"
                class="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <span>View Transaction Details</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <button 
                @click="goHome"
                class="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                <span>Return to Home</span>
              </button>
            </div>
          </div>
          
          <!-- Email Notification -->
          <div class="mt-6 text-center text-sm text-gray-500 animate-fade-in-up delay-800">
            <div class="flex items-center justify-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>We've sent a confirmation email to your inbox</span>
            </div>
            <p class="text-emerald-600 font-medium animate-pulse-slow">{{ email }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  // Transaction details
  const transactionId = ref('TXN-' + Math.floor(100000 + Math.random() * 900000));
  const date = ref(new Date());
  const amount = ref(149.99);
  const email = ref('user@example.com');
  
  // Format date
  const formattedDate = computed(() => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date.value);
  });
  
  // Format price
  const formatPrice = (price: number) => {
    return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Generate random confetti styles
  const getConfettiStyle = (index: number) => {
    const colors = ['#FFC700', '#FF0058', '#2E7CF6', '#01FF89', '#8A2BE2'];
    const size = Math.floor(Math.random() * 10) + 5; // 5-15px
    const left = Math.floor(Math.random() * 100); // 0-100%
    const animationDelay = (Math.random() * 3).toFixed(2); // 0-3s
    const animationDuration = (Math.random() * 3 + 2).toFixed(2); // 2-5s
    
    return {
      '--size': `${size}px`,
      '--color': colors[index % colors.length],
      '--left': `${left}%`,
      '--delay': `${animationDelay}s`,
      '--duration': `${animationDuration}s`
    };
  };
  
  // Navigation functions
  const viewDetails = () => {
    router.push(`/transactions/${transactionId.value}`);
  };
  
  const goHome = () => {
    router.push('/');
  };
  
  // Play success sound on mount
  onMounted(() => {
    try {
      const audio = new Audio('/sounds/success.mp3');
      audio.volume = 0.5;
      audio.play().catch(err => console.log('Audio play failed:', err));
    } catch (error) {
      console.log('Audio not supported');
    }
  });

  definePageMeta({
      layout: 'auth'
  })
  </script>
  
  <style scoped>
  /* Checkmark Animation */
  .checkmark {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: #fff;
    stroke-miterlimit: 10;
    box-shadow: 0 0 0 rgba(16, 185, 129, 0.4);
    animation: checkmark-fill 0.4s ease-in-out 0.4s forwards, checkmark-scale 0.3s ease-in-out 0.9s both, checkmark-pulse 2s infinite 1.2s;
  }
  
  .checkmark__circle {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: #fff;
    fill: none;
    animation: checkmark-stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }
  
  .checkmark__check {
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: checkmark-stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }
  
  @keyframes checkmark-stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  
  @keyframes checkmark-scale {
    0%, 100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }
  
  @keyframes checkmark-fill {
    100% {
      box-shadow: inset 0 0 0 100px rgba(255, 255, 255, 0.1);
    }
  }
  
  @keyframes checkmark-pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
    }
    70% {
      box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  }
  
  /* Card Entrance Animation */
  .animate-card-entrance {
    animation: card-entrance 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }
  
  @keyframes card-entrance {
    0% {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  /* Fade In Up Animation */
  .animate-fade-in-up {
    opacity: 0;
    animation: fade-in-up 0.5s ease-out forwards;
  }
  
  .delay-300 {
    animation-delay: 0.3s;
  }
  
  .delay-400 {
    animation-delay: 0.4s;
  }
  
  .delay-500 {
    animation-delay: 0.5s;
  }
  
  .delay-700 {
    animation-delay: 0.7s;
  }
  
  .delay-800 {
    animation-delay: 0.8s;
  }
  
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Floating Animations */
  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }
  
  .animate-float-medium {
    animation: float-medium 6s ease-in-out infinite;
  }
  
  .animate-float-fast {
    animation: float-fast 4s ease-in-out infinite;
  }
  
  @keyframes float-slow {
    0%, 100% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(-20px) rotate(5deg);
    }
  }
  
  @keyframes float-medium {
    0%, 100% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(-15px) rotate(-5deg);
    }
  }
  
  @keyframes float-fast {
    0%, 100% {
      transform: translateY(0) rotate(0);
    }
    50% {
      transform: translateY(-10px) rotate(3deg);
    }
  }
  
  /* Pulse Animation */
  .animate-pulse-slow {
    animation: pulse-slow 3s infinite;
  }
  
  @keyframes pulse-slow {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  /* Confetti Animation */
  .confetti-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: hidden;
    z-index: -1;
  }
  
  .confetti {
    position: absolute;
    top: -10px;
    width: var(--size);
    height: var(--size);
    background-color: var(--color);
    left: var(--left);
    opacity: 0;
    animation: confetti-fall var(--duration) ease-in-out var(--delay) forwards;
  }
  
  @keyframes confetti-fall {
    0% {
      opacity: 1;
      top: -10px;
      transform: translateX(0) rotate(0deg);
    }
    25% {
      opacity: 1;
      transform: translateX(100px) rotate(90deg);
    }
    50% {
      opacity: 1;
      transform: translateX(-100px) rotate(180deg);
    }
    75% {
      opacity: 1;
      transform: translateX(50px) rotate(270deg);
    }
    100% {
      opacity: 0;
      top: 100%;
      transform: translateX(-50px) rotate(360deg);
    }
  }
  </style>