<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  src: string;
  alt: string;
  className?: string;
}>();

const isLoaded = ref(false);
const hasError = ref(false);

const handleLoad = () => {
  isLoaded.value = true;
};

const handleError = () => {
  hasError.value = true;
};
</script>

<template>
  <div class="image-loader-container" :class="[className, { 'loaded': isLoaded, 'error': hasError }]">
    <!-- Loading placeholder -->
    <div v-if="!isLoaded && !hasError" class="loading-placeholder shimmer"></div>
    
    <!-- Error placeholder -->
    <div v-if="hasError" class="error-placeholder">
      <span>Failed to load image</span>
    </div>
    
    <!-- Actual image -->
    <img
      :src="src"
      :alt="alt"
      @load="handleLoad"
      @error="handleError"
      :class="{ 'visible': isLoaded && !hasError }"
    />
  </div>
</template>

<style scoped>
.image-loader-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.loading-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f3f4f6;
}

.error-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  color: #6b7280;
  font-size: 0.875rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

img.visible {
  opacity: 1;
}

.shimmer {
  background: linear-gradient(90deg, 
    rgba(255,255,255,0) 0%, 
    rgba(255,255,255,0.2) 50%, 
    rgba(255,255,255,0) 100%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
