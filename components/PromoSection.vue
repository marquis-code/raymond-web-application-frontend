<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

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
  loading: Boolean
}>()

// State management
const sectionRef = ref<HTMLElement>()
const imageRef = ref<HTMLElement>()
const countdownInterval = ref<NodeJS.Timeout>()
const isVisible = ref(false)
const imageLoaded = ref(false)
const mousePosition = ref({ x: 0, y: 0 })
const isHovering = ref(false)

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

// Calculate time remaining
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

// Handle mouse movement for parallax effects
const handleMouseMove = (event: MouseEvent) => {
  if (!sectionRef.value) return
  
  const rect = sectionRef.value.getBoundingClientRect()
  mousePosition.value = {
    x: ((event.clientX - rect.left) / rect.width - 0.5) * 2,
    y: ((event.clientY - rect.top) / rect.height - 0.5) * 2,
  }
}

// Handle image load
const handleImageLoad = () => {
  imageLoaded.value = true
}

// Intersection Observer for scroll animations
const setupIntersectionObserver = () => {
  if (!sectionRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
        }
      })
    },
    { threshold: 0.1 }
  )

  observer.observe(sectionRef.value)
}

// Computed styles for parallax effects
const parallaxStyle = computed(() => {
  const intensity = 15
  return {
    transform: `translate(${mousePosition.value.x * intensity}px, ${mousePosition.value.y * intensity}px)`,
  }
})

const imageParallaxStyle = computed(() => {
  const intensity = 8
  return {
    transform: `translate(${mousePosition.value.x * intensity}px, ${mousePosition.value.y * intensity}px) scale(${isHovering.value ? 1.05 : 1})`,
  }
})

onMounted(() => {
  calculateTimeRemaining()
  countdownInterval.value = setInterval(calculateTimeRemaining, 1000)
  
  nextTick(() => {
    setupIntersectionObserver()
  })
})

onUnmounted(() => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value)
  }
})
</script>

<template>
  <section 
    ref="sectionRef"
    class="promo-section relative py-8 lg:py-16 overflow-hidden"
    @mousemove="handleMouseMove"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <!-- Dynamic background elements -->
      <div class="floating-orbs">
        <div class="orb orb-1" :style="parallaxStyle"></div>
        <div class="orb orb-2" :style="parallaxStyle"></div>
        <div class="orb orb-3" :style="parallaxStyle"></div>
      </div>
      
      <!-- Animated grid pattern -->
      <div class="absolute inset-0 opacity-[0.02]">
        <div class="grid-pattern"></div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Loading State -->
      <Transition name="fade" mode="out-in">
        <div v-if="loading" class="loading-container">
          <div class="advanced-loader">
            <div class="loader-ring"></div>
            <div class="loader-ring loader-ring-2"></div>
            <div class="loader-ring loader-ring-3"></div>
            <div class="loader-center">
              <div class="loader-dot"></div>
            </div>
          </div>
          <p class="loading-text">Preparing amazing deals...</p>
        </div>

        <!-- Main Content -->
        <div v-else-if="Object.keys(promosale)?.length" class="promo-card-container">
          <div 
            class="promo-card"
            :class="{ 'visible': isVisible }"
          >
            <!-- Discount Badge - Floating -->
            <div class="discount-badge-container">
              <div class="discount-badge">
                <div class="badge-glow"></div>
                <div class="badge-content">
                  <span class="discount-number">{{ promosale?.discountPercentage }}%</span>
                  <span class="discount-text">OFF</span>
                </div>
                <div class="badge-sparkles">
                  <div class="sparkle sparkle-1"></div>
                  <div class="sparkle sparkle-2"></div>
                  <div class="sparkle sparkle-3"></div>
                </div>
              </div>
            </div>

            <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <!-- Content Section -->
              <div class="content-section space-y-6">
                <!-- Limited Time Badge -->
                <div class="limited-badge">
                  <div class="pulse-dot"></div>
                  <span>Limited Time Offer</span>
                </div>

                <!-- Title with animated gradient -->
                <h2 class="promo-title">
                  <span class="title-text">{{ promosale?.title }}</span>
                  <div class="title-underline"></div>
                </h2>

                <!-- Description -->
                <p class="promo-description">
                  {{ promosale?.description }}
                </p>

                <!-- Countdown Timer -->
                <div v-if="!promosale?.isLifetime && timeRemaining.total > 0" class="countdown-container">
                  <div class="countdown-label">Ends In</div>
                  <div class="countdown-grid">
                    <div 
                      v-for="(unit, key) in timeUnits" 
                      :key="key" 
                      class="countdown-item"
                    >
                      <div class="countdown-number">
                        <span class="number-display">
                          {{ String(timeRemaining[key]).padStart(2, '0') }}
                        </span>
                        <div class="number-glow"></div>
                      </div>
                      <div class="countdown-unit">{{ unit }}</div>
                    </div>
                  </div>
                </div>

                <!-- CTA Button -->
                <div class="cta-container">
                  <NuxtLink to="/shop" class="cta-button group">
                    <div class="button-bg"></div>
                    <div class="button-content">
                      <span class="button-text">{{ promosale?.actionText }}</span>
                      <div class="button-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    </div>
                    <div class="button-ripple"></div>
                  </NuxtLink>
                </div>
              </div>

              <!-- Image Section -->
              <div class="image-section">
                <div class="image-container" :style="imageParallaxStyle">
                  <!-- Image frame with effects -->
                  <div class="image-frame">
                    <div class="frame-glow"></div>
                    <div class="">
                      <img 
                        ref="imageRef"
                        :src="promosale?.imageUrl || '/placeholder.svg?height=400&width=400'"
                        :alt="promosale?.title"
                        @load="handleImageLoad"
                        class="promo-image"
                        :class="{ 'loaded': imageLoaded }"
                      />
                      <div class="image-overlay"></div>
                    </div>
                    
                    <!-- Decorative elements -->
                    <div class="decorative-elements">
                      <div class="deco-circle deco-1"></div>
                      <div class="deco-circle deco-2"></div>
                      <div class="deco-triangle"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Urgency Banner -->
            <Transition name="slide-up">
              <div 
                v-if="!promosale?.isLifetime && timeRemaining.total > 0 && timeRemaining.total < 86400" 
                class="urgency-banner"
              >
                <div class="urgency-content">
                  <div class="urgency-icon">⚡</div>
                  <span>Less than 24 hours remaining!</span>
                </div>
                <div class="urgency-glow"></div>
              </div>
            </Transition>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Floating particles -->
    <div class="particles-container">
      <div 
        v-for="i in 12" 
        :key="i"
        class="particle"
        :style="{
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 10 + 's',
          animationDuration: (Math.random() * 8 + 12) + 's'
        }"
      ></div>
    </div>
  </section>
</template>

<style scoped>
.promo-section {
  min-height: auto;
  max-width: 100%;
}

/* Background Elements */
.floating-orbs {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.6;
  animation: float-orb 8s ease-in-out infinite;
}

.orb-1 {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.orb-2 {
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #48cae4, #023e8a);
  bottom: 20%;
  right: 15%;
  animation-delay: 2s;
}

.orb-3 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #f72585, #b5179e);
  top: 60%;
  left: 70%;
  animation-delay: 4s;
}

.grid-pattern {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
}

.advanced-loader {
  position: relative;
  width: 80px;
  height: 80px;
}

.loader-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

.loader-ring:nth-child(1) {
  border-top-color: #ff6b6b;
  animation-duration: 2s;
}

.loader-ring-2 {
  border-right-color: #4ecdc4;
  animation-duration: 3s;
  animation-direction: reverse;
}

.loader-ring-3 {
  border-bottom-color: #45b7d1;
  animation-duration: 1.5s;
}

.loader-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loader-dot {
  width: 12px;
  height: 12px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  border-radius: 50%;
  animation: pulse-dot 1.5s ease-in-out infinite;
}

.loading-text {
  margin-top: 1.5rem;
  color: #64748b;
  font-weight: 500;
  animation: fade-pulse 2s ease-in-out infinite;
}

/* Main Card */
.promo-card-container {
  max-width: 1200px;
  margin: 0 auto;
}

.promo-card {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  padding: 2rem;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  opacity: 0;
  transform: translateY(50px) scale(0.95);
  transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.promo-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Discount Badge */
.discount-badge-container {
  position: absolute;
  top: -20px;
  right: 2rem;
  z-index: 20;
}

.discount-badge {
  position: relative;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  border-radius: 1.5rem;
  padding: 1rem 1.5rem;
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.4);
  animation: badge-float 3s ease-in-out infinite;
}

.badge-glow {
  position: absolute;
  inset: -4px;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  border-radius: 1.5rem;
  filter: blur(15px);
  opacity: 0.7;
  z-index: -1;
  animation: glow-pulse 2s ease-in-out infinite;
}

.badge-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-weight: 900;
}

.discount-number {
  font-size: 1.5rem;
  line-height: 1;
  animation: number-bounce 2s ease-in-out infinite;
}

.discount-text {
  font-size: 0.75rem;
  opacity: 0.9;
  letter-spacing: 1px;
}

.badge-sparkles {
  position: absolute;
  inset: 0;
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  animation: sparkle-twinkle 2s ease-in-out infinite;
}

.sparkle-1 {
  top: 10%;
  right: 15%;
  animation-delay: 0s;
}

.sparkle-2 {
  bottom: 15%;
  left: 10%;
  animation-delay: 0.7s;
}

.sparkle-3 {
  top: 50%;
  right: 5%;
  animation-delay: 1.4s;
}

/* Content Section */
.content-section {
  animation: slide-in-left 1s ease-out 0.3s both;
}

.limited-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 2rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #dc2626;
  animation: fade-in-up 0.8s ease-out 0.5s both;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #dc2626;
  border-radius: 50%;
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.promo-title {
  position: relative;
  animation: fade-in-up 0.8s ease-out 0.7s both;
}

.title-text {
  display: block;
  font-size: clamp(1.875rem, 4vw, 3rem);
  font-weight: 900;
  line-height: 1.1;
  background: linear-gradient(135deg, #1e293b, #475569, #0f172a);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradient-shift 3s ease-in-out infinite;
}

.title-underline {
  height: 4px;
  width: 60px;
  background: linear-gradient(90deg, #ff6b6b, #feca57);
  border-radius: 2px;
  margin-top: 0.5rem;
  animation: underline-expand 1s ease-out 1.2s both;
}

.promo-description {
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.7;
  animation: fade-in-up 0.8s ease-out 0.9s both;
}

/* Countdown Timer */
.countdown-container {
  animation: fade-in-up 0.8s ease-out 1.1s both;
}

.countdown-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.countdown-item {
  text-align: center;
}

.countdown-number {
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  padding: 1rem 0.5rem;
  margin-bottom: 0.5rem;
  backdrop-filter: blur(10px);
}

.number-display {
  font-size: 1.5rem;
  font-weight: 900;
  color: #1e293b;
  animation: number-flip 1s ease-in-out;
}

.number-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(254, 202, 87, 0.1));
  border-radius: 1rem;
  opacity: 0;
  animation: number-glow 2s ease-in-out infinite;
}

.countdown-unit {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* CTA Button */
.cta-container {
  animation: fade-in-up 0.8s ease-out 1.3s both;
}

.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  text-decoration: none;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.button-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #1e293b, #334155);
  border-radius: 1.5rem;
  transition: all 0.3s ease;
}

.cta-button:hover .button-bg {
  background: linear-gradient(135deg, #ff6b6b, #feca57);
}

.button-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  z-index: 2;
}

.button-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.cta-button:hover .button-icon {
  transform: translateX(4px);
}

.button-ripple {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 1.5rem;
  opacity: 0;
  transform: scale(0);
  transition: all 0.6s ease;
}

.cta-button:active .button-ripple {
  opacity: 1;
  transform: scale(1);
}

/* Image Section */
.image-section {
  animation: slide-in-right 1s ease-out 0.5s both;
}

.image-container {
  position: relative;
  transition: transform 0.3s ease;
}

.image-frame {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.frame-glow {
  position: absolute;
  inset: -20px;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(254, 202, 87, 0.2));
  border-radius: 2rem;
  filter: blur(30px);
  opacity: 0.8;
  animation: frame-pulse 3s ease-in-out infinite;
}

.image-wrapper {
  position: relative;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1.5rem;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  overflow: hidden;
}

.promo-image {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: contain;
  border-radius: 1rem;
  opacity: 0;
  transform: scale(0.9);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.promo-image.loaded {
  opacity: 1;
  transform: scale(1);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

/* Decorative Elements */
.decorative-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.deco-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.3), rgba(254, 202, 87, 0.3));
  animation: float-decoration 4s ease-in-out infinite;
}

.deco-1 {
  width: 20px;
  height: 20px;
  top: 10%;
  right: 10%;
  animation-delay: 0s;
}

.deco-2 {
  width: 15px;
  height: 15px;
  bottom: 15%;
  left: 15%;
  animation-delay: 2s;
}

.deco-triangle {
  position: absolute;
  top: 60%;
  right: 5%;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 12px solid rgba(255, 107, 107, 0.3);
  animation: rotate-decoration 6s linear infinite;
}

/* Urgency Banner */
.urgency-banner {
  position: relative;
  margin-top: 1.5rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  overflow: hidden;
}

.urgency-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #dc2626;
  font-weight: 600;
  z-index: 2;
}

.urgency-icon {
  animation: bounce 1s infinite;
}

.urgency-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.1), transparent);
  animation: urgency-sweep 2s ease-in-out infinite;
}

/* Particles */
.particles-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255, 107, 107, 0.3);
  border-radius: 50%;
  animation: float-particle 15s linear infinite;
}

/* Animations */
@keyframes float-orb {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

@keyframes fade-pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@keyframes badge-float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

@keyframes number-bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes sparkle-twinkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
}

@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes underline-expand {
  from { width: 0; }
  to { width: 60px; }
}

@keyframes number-flip {
  0% { transform: rotateY(0); }
  50% { transform: rotateY(-90deg); }
  100% { transform: rotateY(0); }
}

@keyframes number-glow {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

@keyframes frame-pulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
}

@keyframes float-decoration {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(180deg); }
}

@keyframes rotate-decoration {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
  40%, 43% { transform: translateY(-8px); }
  70% { transform: translateY(-4px); }
  90% { transform: translateY(-2px); }
}

@keyframes urgency-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes float-particle {
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
}

@keyframes ping {
  75%, 100% { transform: scale(2); opacity: 0; }
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive Design */
@media (max-width: 1023px) {
  .promo-card {
    padding: 1.5rem;
  }
  
  .discount-badge-container {
    top: -15px;
    right: 1rem;
  }
  
  .discount-badge {
    padding: 0.75rem 1rem;
  }
  
  .discount-number {
    font-size: 1.25rem;
  }
  
  .countdown-grid {
    gap: 0.75rem;
  }
  
  .countdown-number {
    padding: 0.75rem 0.25rem;
  }
  
  .number-display {
    font-size: 1.25rem;
  }
}

@media (max-width: 767px) {
  .promo-card {
    padding: 1rem;
    border-radius: 1.5rem;
  }
  
  .discount-badge {
    padding: 0.5rem 0.75rem;
  }
  
  .discount-number {
    font-size: 1rem;
  }
  
  .title-text {
    font-size: 1.875rem;
  }
  
  .promo-description {
    font-size: 1rem;
  }
  
  .countdown-grid {
    gap: 0.5rem;
  }
  
  .countdown-number {
    padding: 0.5rem 0.25rem;
  }
  
  .number-display {
    font-size: 1rem;
  }
  
  .countdown-unit {
    font-size: 0.625rem;
  }
  
  .cta-button {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
  }
  
  .image-frame {
    max-width: 300px;
  }
  
  .promo-image {
    max-height: 200px;
  }
  
  .image-wrapper {
    padding: 1rem;
  }
}

@media (max-width: 479px) {
  .promo-section {
    padding: 1rem 0;
  }
  
  .promo-card {
    margin: 0 0.5rem;
  }
  
  .discount-badge-container {
    position: relative;
    top: 0;
    right: 0;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .countdown-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .image-frame {
    max-width: 250px;
  }
}
</style>
