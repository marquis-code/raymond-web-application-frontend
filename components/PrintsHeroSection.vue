<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';

interface ArtPrint {
  id: number;
  src: string;
  alt: string;
  aspectRatio?: string;
}

// Props to receive images from parent component
const props = defineProps<{
  images?: string[];
  content?: Object;
  loading?: Boolean;
}>();

// State management
const loadedImages = ref<number[]>([]);
const activeImageIndex = ref(0);
const isHovering = ref(false);
const hoverImageIndex = ref(-1);
const galleryReady = ref(false);
const mousePosition = ref({ x: 0, y: 0 });

// Transform URL array to ArtPrint objects
const artPrints = computed((): ArtPrint[] => {
  if (!props?.images || !Array.isArray(props.images)) {
    return [];
  }
  
  return props.images.map((url, index) => ({
    id: index,
    src: url,
    alt: `Art print ${index + 1}`,
    aspectRatio: '4:3'
  }));
});

// Handle image load events
const handleImageLoaded = (imageId: number) => {
  if (!loadedImages.value.includes(imageId)) {
    loadedImages.value.push(imageId);
  }
  
  // When all images are loaded, set loading to false and trigger gallery animation
  if (loadedImages.value.length === artPrints.value.length && artPrints.value.length > 0) {
    setTimeout(() => {
      // Note: we can't modify props directly, so we'll just proceed with the animation
      nextTick(() => {
        setTimeout(() => {
          galleryReady.value = true;
        }, 300);
      });
    }, 500);
  }
};

// Rotate active image every 4 seconds
const startImageRotation = () => {
  if (artPrints.value.length === 0) return;
  
  setInterval(() => {
    if (!isHovering.value && artPrints.value.length > 0) {
      activeImageIndex.value = (activeImageIndex.value + 1) % artPrints.value.length;
    }
  }, 4000);
};

// Handle mouse interactions
const handleMouseEnter = (index: number) => {
  isHovering.value = true;
  hoverImageIndex.value = index;
  activeImageIndex.value = index;
};

const handleMouseLeave = () => {
  isHovering.value = false;
  hoverImageIndex.value = -1;
};

// Handle mouse movement for parallax effect
const handleMouseMove = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
  mousePosition.value = {
    x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
    y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
  };
};

// Initialize component
onMounted(() => {
  // Wait for artPrints to be computed before starting rotation
  nextTick(() => {
    if (artPrints.value.length > 0) {
      startImageRotation();
    }
  });
});

// Computed styles for parallax effect
const getParallaxStyle = (index: number) => {
  const baseDelay = 0.2 * index;
  const parallaxX = mousePosition.value.x * (5 + index * 2);
  const parallaxY = mousePosition.value.y * (3 + index * 1.5);
  
  return {
    '--delay': `${baseDelay}s`,
    transform: `translate(${parallaxX}px, ${parallaxY}px)`,
  };
};
</script>

<template>
  <div 
    class="hero-section overflow-hidden pt-20 mt-16 relative"
    @mousemove="handleMouseMove"
  >
    <!-- Loading overlay -->
    <Transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <div class="loader">
          <div class="loader-circle">
            <div class="circle-path"></div>
          </div>
          <span class="loader-text">Loading artwork</span>
        </div>
      </div>
    </Transition>

    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-12">
        <!-- Text content -->
        <div 
          class="lg:col-span-5 lg:pb-8 content-section"
          :class="{ 'animate-content': !loading }"
        >
          <h2 class="text-5xl font-light tracking-tight text-gray-900 sm:text-6xl mb-8">
            <span class="block text-reveal" style="--delay: 0.2s">{{ content?.title || 'Art Gallery' }}</span>
          </h2>

          <div class="space-y-6 text-gray-600 leading-relaxed">
            <p class="text-lg leading-loose text-reveal" style="--delay: 0.6s">
              {{ content?.description || 'Discover our curated collection of stunning art prints.' }}
            </p>
          </div>
        </div>

        <!-- Gallery section -->
        <div 
          v-if="artPrints.length > 0"
          class="lg:col-span-7 gallery-container" 
          :class="{ 'gallery-ready': galleryReady }"
        >
          <!-- Main featured image -->
          <div class="featured-image-container">
            <TransitionGroup name="image-transition" tag="div">
              <div 
                v-for="(image, index) in artPrints" 
                :key="image.id"
                v-show="activeImageIndex === index || hoverImageIndex === index"
                class="featured-image"
                :style="getParallaxStyle(index)"
                @mouseenter="handleMouseEnter(index)"
                @mouseleave="handleMouseLeave()"
              >
                <img 
                  :src="image.src" 
                  :alt="image.alt"
                  @load="handleImageLoaded(image.id)"
                  @error="console.warn('Failed to load image:', image.src)"
                  class="rounded-3xl object-cover shadow-2xl transition-all duration-700 hover:shadow-3xl hover:scale-105"
                />
                <div class="image-overlay"></div>
              </div>
            </TransitionGroup>
          </div>

          <!-- Thumbnail navigation -->
          <div class="thumbnails-container">
            <div 
              v-for="(image, index) in artPrints" 
              :key="`thumb-${image.id}`"
              class="thumbnail"
              :class="{ 'active': activeImageIndex === index }"
              @mouseenter="handleMouseEnter(index)"
              @mouseleave="handleMouseLeave()"
              :style="{ '--thumb-delay': `${1.2 + index * 0.1}s` }"
            >
              <img 
                :src="image.src" 
                :alt="`Thumbnail for ${image.alt}`"
                class="rounded-lg object-cover"
              />
            </div>
          </div>

          <!-- Decorative elements -->
          <div class="decorative-elements">
            <div class="floating-element element-1"></div>
            <div class="floating-element element-2"></div>
            <div class="floating-element element-3"></div>
          </div>
        </div>

        <!-- Fallback when no images -->
        <div v-else class="lg:col-span-7 flex items-center justify-center h-96 bg-gray-100 rounded-3xl">
          <p class="text-gray-500">No images available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  min-height: 90vh;
  perspective: 1000px;
  position: relative;
}

/* Loading overlay */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95));
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.loader-circle {
  width: 60px;
  height: 60px;
  position: relative;
}

.circle-path {
  width: 100%;
  height: 100%;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #374151;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loader-text {
  font-size: 0.875rem;
  color: #6b7280;
  letter-spacing: 1px;
  font-weight: 300;
}

/* Content animations */
.content-section {
  opacity: 0;
  transform: translateX(-30px);
}

.animate-content {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 1s ease, transform 1s ease;
}

.text-reveal {
  opacity: 0;
  transform: translateY(30px);
  animation: textReveal 0.8s forwards;
  animation-delay: var(--delay, 0s);
}

/* Gallery styling */
.gallery-container {
  position: relative;
  height: 600px;
  opacity: 0;
  transform: translateY(50px) scale(0.95);
  transition: opacity 1.2s ease, transform 1.2s ease;
}

.gallery-ready {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.featured-image-container {
  position: relative;
  width: 100%;
  height: 500px;
  transform-style: preserve-3d;
  border-radius: 24px;
  overflow: hidden;
}

.featured-image {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.33, 1, 0.68, 1);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.featured-image:hover .image-overlay {
  opacity: 1;
}

/* Thumbnail navigation */
.thumbnails-container {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.thumbnail {
  width: 80px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px) scale(0.8);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: thumbnailReveal 0.6s forwards;
  animation-delay: var(--thumb-delay, 1.2s);
  position: relative;
}

.thumbnail::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.thumbnail:hover::before {
  transform: translateX(100%);
}

.thumbnail.active {
  opacity: 1;
  transform: translateY(0) scale(1);
  box-shadow: 0 0 0 3px #374151, 0 8px 25px rgba(0, 0, 0, 0.15);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.thumbnail:hover img {
  transform: scale(1.1);
}

/* Decorative elements */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.floating-element {
  position: absolute;
  background: linear-gradient(135deg, rgba(156, 163, 175, 0.1), rgba(209, 213, 219, 0.1));
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.element-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.element-2 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 5%;
  animation-delay: 2s;
}

.element-3 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 5%;
  animation-delay: 4s;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.image-transition-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.image-transition-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

.image-transition-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.image-transition-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(1.05);
}

/* Animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes textReveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes thumbnailReveal {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  to {
    opacity: 0.7;
    transform: translateY(0) scale(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-10px) rotate(1deg);
  }
  66% {
    transform: translateY(5px) rotate(-1deg);
  }
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .gallery-container {
    height: auto;
    margin-top: 3rem;
  }
  
  .featured-image-container {
    height: 400px;
  }
  
  .decorative-elements {
    display: none;
  }
}

@media (max-width: 639px) {
  .featured-image-container {
    height: 300px;
  }
  
  .thumbnail {
    width: 60px;
    height: 45px;
  }
  
  .thumbnails-container {
    gap: 0.5rem;
  }
}
</style>
