<!-- <template>
   <main>
   <TheNavbar v-if="!isAcademyCourseRoute" />
    <NuxtPage />
    <TheFooter />
   </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Check if current route matches the academy course pattern
const isAcademyCourseRoute = computed(() => {
  return route.path.startsWith('/academy/course/')
})
</script> -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Splash Screen Component -->
    <SplashScreen 
      v-if="showSplash"
      :duration="2500"
    />
    
    <!-- Main Content -->
    <Transition
      name="page"
      mode="out-in"
      @enter="onPageEnter"
      @leave="onPageLeave"
    >
      <main v-show="!showSplash">
        <TheNavbar v-if="!isAcademyCourseRoute" />
        <NuxtPage />
        <TheFooter />
      </main>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, provide, readonly } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showSplash = ref(true)
const isPageTransitioning = ref(false)

// Provide splash screen state to child components
provide('splashScreen', {
  show: () => { showSplash.value = true },
  hide: () => { showSplash.value = false },
  isVisible: readonly(showSplash)
})

// Check if current route matches the academy course pattern
const isAcademyCourseRoute = computed(() => {
  return route.path.startsWith('/academy/course/')
})

// Show splash screen on route changes
watch(() => route.path, (newPath, oldPath) => {
  if (oldPath && newPath !== oldPath) {
    showSplash.value = true
    isPageTransitioning.value = true
    
    // Hide splash after animation
    setTimeout(() => {
      showSplash.value = false
      isPageTransitioning.value = false
    }, 2500)
  }
}, { immediate: false })

// Handle initial page load
onMounted(() => {
  setTimeout(() => {
    showSplash.value = false
  }, 2500)
})

const onPageEnter = (el) => {
  // Page enter animation
}

const onPageLeave = (el) => {
  // Page leave animation
}
</script>

<style scoped>
/* Page Transitions */
.page-enter-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.page-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
