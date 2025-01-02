<!-- <script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const words = ['Employee', 'Business', 'Corporate', 'Team']
const currentText = ref('Employee')
const currentWordIndex = ref(0)
const isDeleting = ref(false)
const typingSpeed = ref(150) // Increased base typing speed
const pauseBeforeDelete = 3000 // Longer pause before deleting (3 seconds)
const pauseBeforeNextWord = 1500 // Pause before typing next word (1.5 seconds)
const deleteSpeed = 100 // Slower deletion speed
let timeout: NodeJS.Timeout

const typeEffect = () => {
  const currentWord = words[currentWordIndex.value]
  
  if (!isDeleting.value) {
    // Typing effect
    currentText.value = currentWord.substring(0, currentText.value.length + 1)
    
    if (currentText.value === currentWord) {
      // Word is complete, prepare for deletion after pause
      isDeleting.value = true
      typingSpeed.value = pauseBeforeDelete
    }
  } else {
    // Deletion effect
    currentText.value = currentWord.substring(0, currentText.value.length - 1)
    
    if (currentText.value === '') {
      // Word is deleted, prepare for next word
      isDeleting.value = false
      currentWordIndex.value = (currentWordIndex.value + 1) % words.length
      typingSpeed.value = pauseBeforeNextWord
    }
  }
  
  // Calculate next timeout duration
  const nextTimeout = isDeleting.value 
    ? deleteSpeed  // Slower deletion
    : currentText.value === '' 
      ? pauseBeforeNextWord  // Pause before next word
      : currentText.value === currentWord 
        ? pauseBeforeDelete  // Pause before deletion
        : typingSpeed.value  // Normal typing speed
  
  timeout = setTimeout(typeEffect, nextTimeout)
}

onMounted(() => {
  typeEffect()
})

onBeforeUnmount(() => {
  clearTimeout(timeout)
})
</script>

<template>
  <div class="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          <span class="text-emerald-500 min-w-[120px] inline-block transition-all duration-200">
            {{ currentText }}
          </span>
          <br class="sm:hidden" />
          <span class="block sm:inline"> transportation made</span>
          <br />
          <span>easy with us</span>
        </h1>
        
        <p class="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          CoMiles is your All-in-One Shared Transport Solution. Trusted by over 120 businesses and 135k passengers.
        </p>
        
        <div class="mt-8 flex justify-center gap-4">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tracking-tight {
  letter-spacing: -0.025em;
}
</style> -->

<!-- components/LandingPage.vue -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const words = ['Employee', 'School', 'Event', 'Daily']
const currentText = ref('Employee')
const isFlipping = ref(false)
const intervalTime = 4000 // 4 seconds between flips
let interval: NodeJS.Timer

const flipText = () => {
  isFlipping.value = true
  
  // Change text halfway through the flip animation
  setTimeout(() => {
    const currentIndex = words.indexOf(currentText.value)
    const nextIndex = (currentIndex + 1) % words.length
    currentText.value = words[nextIndex]
  }, 150) // Half of the flip animation duration

  // Reset flipping state after animation completes
  setTimeout(() => {
    isFlipping.value = false
  }, 300) // Match the full animation duration
}

onMounted(() => {
  interval = setInterval(flipText, intervalTime)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="min-h-screen  px-4 py-12 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="">
        <!-- <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          <p 
            class="flip-text text-[#1d4449] inline-block min-w-[180px] text-left"
            :class="{ 'flipping': isFlipping }"
          >
            {{ currentText }}
          </p>
          <p class="block"> transportation made</p>
          <p>easy with us at CoMiles</p>
        </h1> -->
        <h1 class="mt-10 text-pretty text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Transit Made Easy with us at <span class="text-[#1d4449]">CoMiles</span></h1>
        
        <p class="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          CoMiles is an all-in-one transport solution for students and workers in search of an affordable, trendy, comfortable, and reliable ride. We bring comfort to your doorstep with just a few clicks.
        </p>
        
        <div class="mt-8 flex justify-start items-start gap-4">
          <!-- App Store Button -->
          <a href="#" class="inline-block">
            <img 
              src="@/assets/icons/ios-store.svg" 
              alt="Download on App Store" 
              class="h-12 w-auto"
            />
          </a>
          
          <!-- Google Play Button -->
          <a href="#" class="inline-block">
            <img 
              src="@/assets/icons/play-store.svg" 
              alt="Get it on Google Play" 
              class="h-12 w-auto"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tracking-tight {
  letter-spacing: -0.025em;
}

.flip-text {
  perspective: 1000px;
  transform-style: preserve-3d;
  transform-origin: center center;
  transition: transform 0.3s ease-out;
}

.flip-text.flipping {
  transform: rotateX(360deg);
}

/* Ensure text is crisp during animation */
.flip-text {
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>