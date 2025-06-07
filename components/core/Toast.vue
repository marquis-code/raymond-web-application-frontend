<template>
  <teleport to="body">
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="toastVisible"
        class="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50"
      >
        <div
          class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
          :class="[
            'transform transition-all duration-300 ease-in-out',
            toastData.toastType === 'error' 
              ? 'border-l-4 border-red-500' 
              : 'border-l-4 border-green-500'
          ]"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div
                  :class="[
                    'flex items-center justify-center w-8 h-8 rounded-full',
                    toastData.toastType === 'error'
                      ? 'bg-red-100'
                      : 'bg-green-100'
                  ]"
                >
                  <!-- Error Icon -->
                  <svg
                    v-if="toastData.toastType === 'error'"
                    class="w-5 h-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <!-- Success Icon -->
                  <svg
                    v-else
                    class="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p
                  class="text-sm font-medium text-gray-900 leading-5"
                  :class="{ 'mb-1': toastData.message }"
                >
                  {{ toastData.title }}
                </p>
                <p
                  v-if="toastData.message"
                  class="text-sm text-gray-500 leading-4"
                >
                  {{ toastData.message }}
                </p>
              </div>
              <div class="ml-4 flex-shrink-0 flex">
                <button
                  @click="closeToast"
                  class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    class="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- Progress bar for auto-dismiss -->
          <div
            v-if="showProgressBar"
            class="h-1 bg-gray-200"
          >
            <div
              class="h-full transition-all duration-100 ease-linear"
              :class="[
                toastData.toastType === 'error'
                  ? 'bg-red-500'
                  : 'bg-green-500'
              ]"
              :style="{ width: progressWidth + '%' }"
            />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { inject, ref, onMounted, onUnmounted } from 'vue'

interface ToastData {
  title: string
  message?: string
  toastType: 'success' | 'error'
  duration?: number
}

const toastVisible = inject<Ref<boolean>>('toastVisible')
const toastData = inject<Ref<ToastData>>('toastData')

// Progress bar functionality
const showProgressBar = ref(true)
const progressWidth = ref(100)
let progressInterval: NodeJS.Timeout | null = null
let autoCloseTimeout: NodeJS.Timeout | null = null

const closeToast = () => {
  if (toastVisible) {
    toastVisible.value = false
  }
  clearTimers()
}

const clearTimers = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout)
    autoCloseTimeout = null
  }
}

const startProgressBar = (duration: number) => {
  progressWidth.value = 100
  const interval = 50 // Update every 50ms
  const decrement = (interval / duration) * 100
  
  progressInterval = setInterval(() => {
    progressWidth.value -= decrement
    if (progressWidth.value <= 0) {
      progressWidth.value = 0
      clearInterval(progressInterval!)
    }
  }, interval)
}

// Watch for toast visibility changes
watch(() => toastVisible?.value, (visible) => {
  if (visible && toastData?.value) {
    const duration = toastData.value.duration || 5000
    
    // Start progress bar
    startProgressBar(duration)
    
    // Auto close after duration
    autoCloseTimeout = setTimeout(() => {
      closeToast()
    }, duration)
  } else {
    clearTimers()
  }
})

onUnmounted(() => {
  clearTimers()
})
</script>

<style scoped>
/* Additional mobile-specific styles */
@media (max-width: 640px) {
  .fixed {
    bottom: 0;
    top: auto;
  }
}

/* Smooth hover effects */
.hover\:text-gray-500:hover {
  transition: color 0.15s ease-in-out;
}

/* Focus styles for accessibility */
.focus\:ring-2:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
</style>