<template>
  <section class="relative">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <!-- Left side with artist image carousel -->
      <div class="relative h-screen overflow-hidden md:block hidden">
        <div
          v-for="(image, index) in heroImages"
          :key="index"
          class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          :class="{
            'opacity-100': currentImageIndex === index,
            'opacity-0': currentImageIndex !== index,
          }"
        >
          <img
            :src="image"
            alt="Artist with artwork"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Mobile layout - Image and content stacked vertically -->
      <div class="md:hidden flex flex-col h-screen">
        <!-- Mobile image section - takes remaining space -->
        <div class="relative flex-1 overflow-hidden">
          <div
            v-for="(image, index) in heroImages"
            :key="index"
            class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            :class="{
              'opacity-100': currentImageIndex === index,
              'opacity-0': currentImageIndex !== index,
            }"
          >
            <img
              :src="image"
              alt="Artist with artwork"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Mobile content section - fixed at bottom -->
        <div class="bg-[#232323] p-8 flex-shrink-0">
          <div class="animate-slide-up">
            <h1 
              ref="titleRef"
              class="text-3xl font-bold mb-4 text-white animate-fade-in-up"
              :class="{ 'animate-active': isVisible }"
            >
              RAYMOND AWORO ART
            </h1>
            <p 
              class="text-lg text-zinc-200 italic mb-8 animate-fade-in-up delay-300"
              :class="{ 'animate-active': isVisible }"
            >
              Creating Art; Exploring Life at the Intersection of Faith and Creativity
            </p>

            <!-- Mobile social media icons -->
            <div class="flex justify-center gap-4">
              <a
                v-for="(social, index) in socialLinks"
                :key="social.name"
                :href="social.url"
                class="bg-white/90 hover:bg-white rounded-full p-3 transition-all duration-300 hover:scale-110 animate-bounce-in"
                :style="{ animationDelay: `${0.8 + index * 0.1}s` }"
                :class="{ 'animate-active': isVisible }"
              >
                <span class="sr-only">{{ social.name }}</span>
                <img :src="social.icon" class="h-5 w-5 text-zinc-800" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side with text - desktop only -->
      <div class="hidden md:flex bg-zinc-800 text-white p-8 md:p-16 flex-col justify-center">
        <h1 
          class="text-2xl md:text-4xl font-bold mb-4 animate-slide-up"
          :class="{ 'animate-active': isVisible }"
        >
          RAYMOND AWORO ART
        </h1>
        <p 
          class="text-base md:text-xl text-zinc-300 italic mb-8 animate-fade-in-up delay-300"
          :class="{ 'animate-active': isVisible }"
        >
          Creating Art; Exploring Life at the Intersection of Faith and Creativity
        </p>

        <!-- Desktop social media icons -->
        <div class="flex justify-center gap-6">
          <a
            v-for="(social, index) in socialLinks"
            :key="social.name"
            :href="social.url"
            class="bg-white hover:bg-zinc-100 rounded-full p-3 transition-all duration-300 hover:scale-110 animate-bounce-in"
            :style="{ animationDelay: `${0.6 + index * 0.1}s` }"
            :class="{ 'animate-active': isVisible }"
          >
            <span class="sr-only">{{ social.name }}</span>
            <img :src="social.icon" class="h-5 w-5 text-zinc-800" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import instagram from "@/assets/icons/instagram.svg"
import facebook from "@/assets/icons/facebook.svg"
import twitter from "@/assets/icons/logo-black.png"
import tiktok from "@/assets/icons/tiktok.svg"
import youtube from "@/assets/icons/youtube.svg"
import hero2 from "@/assets/img/raymond-hero.png";

// Define types
interface SocialLink {
  name: string
  url: string
  icon: string
}

// Reactive data
const currentImageIndex = ref<number>(0)
const isVisible = ref<boolean>(false)
const titleRef = ref<HTMLElement | null>(null)

// Hero images array
const heroImages = ref<string[]>([
  hero2
])

// Social media links
const socialLinks = ref<SocialLink[]>([
  {
    name: 'Facebook',
    url: 'https://web.facebook.com/people/raymondaworo/100067199633701/?mibextid=LQQJ4d',
    icon: facebook
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/raymondaworo/?igshid=OGQ5ZDc2ODk2ZA%3D%3D',
    icon: instagram
  },
  {
    name: 'X',
    url: 'https://x.com/raymondaworo/status/1546911697776115714?s=46&t=wja9T8NIysGx2Vtni1WECQ',
    icon: twitter
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@raymondaworo?_t=8fvTbrYZSA1&_r=1',
    icon: tiktok
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@raymondaworo',
    icon: youtube
  }
])

// Carousel interval
let carouselInterval: NodeJS.Timeout | null = null

// Methods
const startCarousel = (): void => {
  carouselInterval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.value.length
  }, 4000)
}

const stopCarousel = (): void => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
}

// Lifecycle hooks
onMounted(() => {
  startCarousel()
  
  // Trigger animations after component mounts
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

onUnmounted(() => {
  stopCarousel()
})
</script>

<style scoped>
/* Animation keyframes */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Animation classes */
.animate-slide-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.animate-slide-up.animate-active {
  opacity: 1;
  transform: translateY(0);
}

.animate-fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.animate-fade-in-up.animate-active {
  opacity: 1;
  transform: translateY(0);
}

.animate-bounce-in {
  opacity: 0;
  transform: scale(0.3);
  transition: all 0.6s ease-out;
}

.animate-bounce-in.animate-active {
  animation: bounceIn 0.6s ease-out forwards;
}

.delay-300 {
  transition-delay: 0.3s;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .animate-slide-up,
  .animate-fade-in-up,
  .animate-bounce-in {
    animation-duration: 0.6s;
  }
}
</style>