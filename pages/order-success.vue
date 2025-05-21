<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="fixed w-full h-full pointer-events-none overflow-hidden">
      <div class="absolute top-20 left-10 w-32 h-32 bg-emerald-500/10 rounded-full mix-blend-screen blur-xl animate-float-slow"></div>
      <div class="absolute bottom-40 right-20 w-40 h-40 bg-blue-500/10 rounded-full mix-blend-screen blur-xl animate-float-medium"></div>
      <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full mix-blend-screen blur-xl animate-float-fast"></div>
      <div class="absolute bottom-1/4 left-1/4 w-36 h-36 bg-amber-500/10 rounded-full mix-blend-screen blur-xl animate-float-medium"></div>
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
      <div class="p-6 sm:p-8">
        <h2 class="text-2xl font-bold text-center mb-2 animate-fade-in-up delay-300">Transaction Successful!</h2>
        <p class="text-gray-600 text-center mb-6 animate-fade-in-up delay-400">Your payment has been processed successfully.</p>
        
        <!-- Transaction Details -->
        <div class="space-y-4 animate-fade-in-up delay-500">
          <div class="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div class="flex flex-col sm:flex-row sm:justify-between mb-2">
              <span class="text-gray-600 mb-1 sm:mb-0">Transaction ID:</span>
              <span class="font-medium break-all">{{ transactionId }}</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:justify-between mb-2">
              <span class="text-gray-600 mb-1 sm:mb-0">Date:</span>
              <span class="font-medium">{{ formattedDate }}</span>
            </div>
            <div class="flex flex-col sm:flex-row sm:justify-between">
              <span class="text-gray-600 mb-1 sm:mb-0">Amount:</span>
              <span class="font-medium text-emerald-600">${{ formattedAmount }}</span>
            </div>
          </div>
          
          <!-- Confetti Animation -->
          <div class="confetti-container">
            <div v-for="n in 30" :key="n" class="confetti" :style="getConfettiStyle(n)"></div>
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
              class="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 group-hover:translate-x-[-2px] transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Return to Home</span>
            </button>
            
            <button 
              @click="downloadReceipt"
              class="w-full py-3 border border-emerald-200 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-all duration-300 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <span>Download Receipt</span>
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
        
        <!-- Share Success -->
        <div class="mt-6 pt-6 border-t border-gray-100 animate-fade-in-up delay-900">
          <p class="text-center text-sm text-gray-500 mb-3">Share your success</p>
          <div class="flex justify-center space-x-4">
            <button class="social-button bg-blue-500 hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </button>
            <button class="social-button bg-blue-700 hover:bg-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </button>
            <button class="social-button bg-pink-600 hover:bg-pink-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Success Toast Notification -->
    <div class="success-toast">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <span>Payment Successful!</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// import { definePageMeta, defineNuxtConfig } from '#app'

const router = useRouter();
const route = useRoute();

// Extract transaction details from URL query parameters
const transactionId = ref(route.query.tranxId as string || '');
const amount = ref(parseFloat(route.query.amount as string || '0'));
const date = ref(new Date());
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

// Format amount with proper currency formatting
const formattedAmount = computed(() => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount.value);
});

// Generate random confetti styles with more variety
const getConfettiStyle = (index: number) => {
  const colors = ['#FFC700', '#FF0058', '#2E7CF6', '#01FF89', '#8A2BE2', '#FF6B6B', '#54E346'];
  const shapes = ['circle', 'square', 'triangle', 'rect'];
  const size = Math.floor(Math.random() * 10) + 5; // 5-15px
  const left = Math.floor(Math.random() * 100); // 0-100%
  const animationDelay = (Math.random() * 3).toFixed(2); // 0-3s
  const animationDuration = (Math.random() * 3 + 2).toFixed(2); // 2-5s
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  
  return {
    '--size': `${size}px`,
    '--color': colors[index % colors.length],
    '--left': `${left}%`,
    '--delay': `${animationDelay}s`,
    '--duration': `${animationDuration}s`,
    '--shape': shape
  };
};

// Navigation functions
const viewDetails = () => {
  router.push(`/transactions/${transactionId.value}`);
};

const goHome = () => {
  router.push('/');
};

const downloadReceipt = () => {
  // Simulate download with animation
  const button = document.activeElement as HTMLElement;
  if (button) {
    button.classList.add('downloading');
    setTimeout(() => {
      button.classList.remove('downloading');
      // Show toast notification
      const toast = document.querySelector('.success-toast') as HTMLElement;
      if (toast) {
        toast.textContent = 'Receipt downloaded!';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
      }
    }, 1500);
  }
};

// Play success sound and show toast on mount
onMounted(() => {
  // Play success sound
  try {
    const audio = new Audio('/sounds/success.mp3');
    audio.volume = 0.5;
    audio.play().catch(err => console.log('Audio play failed:', err));
  } catch (error) {
    console.log('Audio not supported');
  }
  
  // Show toast notification
  setTimeout(() => {
    const toast = document.querySelector('.success-toast') as HTMLElement;
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 5000);
    }
  }, 1000);
  
  // Add lottie animation if available
  if (typeof window !== 'undefined' && (window as any).lottie) {
    try {
      (window as any).lottie.loadAnimation({
        container: document.querySelector('.lottie-container'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/animations/success.json'
      });
    } catch (error) {
      console.log('Lottie animation failed to load');
    }
  }
});

definePageMeta({
  layout: 'auth'
});
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
  animation: checkmark-fill 0.4s ease-in-out 0.4s forwards, 
             checkmark-scale 0.3s ease-in-out 0.9s both, 
             checkmark-pulse 2s infinite 1.2s;
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

.delay-900 {
  animation-delay: 0.9s;
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
  border-radius: 50%;
  animation: confetti-fall var(--duration) ease-in-out var(--delay) forwards;
}

.confetti[style*="--shape:square"] {
  border-radius: 0;
}

.confetti[style*="--shape:triangle"] {
  width: 0;
  height: 0;
  background-color: transparent;
  border-left: calc(var(--size) / 2) solid transparent;
  border-right: calc(var(--size) / 2) solid transparent;
  border-bottom: var(--size) solid var(--color);
}

.confetti[style*="--shape:rect"] {
  border-radius: 0;
  height: calc(var(--size) * 1.5);
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

/* Social Buttons */
.social-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s;
  transform: scale(1);
}

.social-button:hover {
  transform: scale(1.1);
}

.social-button:active {
  transform: scale(0.95);
}

/* Success Toast */
.success-toast {
  position: fixed;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #10b981;
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: bottom 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.success-toast.show {
  bottom: 30px;
}

/* Download Animation */
.downloading {
  position: relative;
  overflow: hidden;
}

.downloading::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: downloading 1.5s infinite;
}

@keyframes downloading {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}

/* Responsive Adjustments */
@media (max-width: 640px) {
  .checkmark {
    width: 80px;
    height: 80px;
  }
  
  .social-button {
    width: 36px;
    height: 36px;
  }
}
</style>