<template>
  <section ref="testimonialsSectionRef" class="py-8 md:py-12 bg-white">
    <div class="container mx-auto px-4">
      <div class="flex justify-center items-center flex-col mb-8">
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-2 text-gray-800 relative inline-block">
          What Clients Say
          <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-400"></span>
        </h2>
        <p class="text-gray-600 text-center max-w-xl mx-auto text-sm md:text-base">
          Hear what collectors and art enthusiasts have to say about my work
        </p>
      </div>

      <div class="relative max-w-6xl mx-auto">
        <!-- Navigation Arrows - Hidden on mobile -->
        <button 
          class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110 active:scale-95 duration-300 -ml-4"
          @click="scrollTestimonials('left')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div 
          ref="testimonialsContainerRef" 
          class="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
          @mousedown="startDrag"
          @mousemove="onDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
          @touchstart="startDragTouch"
          @touchmove="onDragTouch"
          @touchend="endDragTouch"
        >
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index" 
            class="testimonial-card flex-shrink-0 w-80 md:w-96 snap-start"
            :ref="el => { if (el) testimonialRefs[index] = el }"
          >
            <div class="bg-white p-4 md:p-6 rounded-lg shadow-md h-full flex flex-col relative overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-gray-100">
              
              <!-- Quote icon - smaller and less prominent -->
              <div class="absolute top-2 right-2 text-amber-800 opacity-15">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <div class="flex items-start space-x-3 mb-3">
                <!-- Smaller Avatar -->
                <div 
                  class="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0"
                  :style="{ backgroundColor: getAvatarColor(testimonial.name) }"
                >
                  {{ getInitials(testimonial.name) }}
                </div>
                
                <!-- Client Info moved to top -->
                <div class="flex-1 min-w-0">
                  <h4 class="font-medium text-base text-gray-900 truncate">{{ testimonial.name }}</h4>
                  <p class="text-xs text-gray-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ testimonial.location }}
                  </p>
                </div>
                
                <!-- Compact Star Rating -->
                <div class="flex space-x-0.5 flex-shrink-0">
                  <svg 
                    v-for="star in 5" 
                    :key="star" 
                    class="h-3 w-3 text-yellow-500"
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              
              <!-- Testimonial Text - more compact -->
              <div class="flex-1">
                <p class="text-gray-700 text-sm md:text-base leading-relaxed italic">"{{ testimonial.text }}"</p>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110 active:scale-95 duration-300 -mr-4"
          @click="scrollTestimonials('right')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <!-- Mobile scroll indicator -->
      <div class="flex justify-center mt-4 md:hidden">
        <div class="flex space-x-1">
          <div 
            v-for="(testimonial, index) in testimonials.slice(0, 3)" 
            :key="index"
            class="w-2 h-2 rounded-full bg-gray-300"
          ></div>
          <span class="text-xs text-gray-400 ml-2">Swipe to see more</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'

// Testimonials data
const testimonials = ref([
  {
    text: "Raymond's artwork has transformed our home. The 'Guardian Angel' piece brings a sense of peace and protection to our living room. His attention to detail and ability to capture emotion is remarkable.",
    name: "Sarah Johnson",
    location: "New York, NY"
  },
  {
    text: "I commissioned a portrait of my parents for their 40th anniversary. Raymond captured not just their likeness, but their essence. The piece moved my entire family to tears. His talent is truly God-given.",
    name: "Michael Thompson",
    location: "Atlanta, GA"
  },
  {
    text: "The 'No Greater Love' piece speaks to me on a profound level. Every time I look at it, I discover new details and emotions. Raymond's work is not just art—it's a spiritual experience.",
    name: "Rebecca Martinez",
    location: "Chicago, IL"
  },
  {
    text: "As a collector of religious art, I can say with confidence that Raymond's work stands out for its authenticity and depth. His pieces don't just decorate a space—they transform it.",
    name: "David Wilson",
    location: "Dallas, TX"
  },
  {
    text: "The portrait Raymond created of my daughter captures her spirit in a way photographs never could. His ability to blend technical skill with emotional insight is unmatched.",
    name: "Jennifer Adams",
    location: "Los Angeles, CA"
  },
  {
    text: "I've been following Raymond's work for years, and was finally able to purchase 'Hope & Nearness to God.' The piece has become a centerpiece for reflection and prayer in our home.",
    name: "Robert Chen",
    location: "Seattle, WA"
  }
])

// Refs for the testimonials section
const testimonialsSectionRef = ref<HTMLElement | null>(null)
const testimonialsContainerRef = ref<HTMLElement | null>(null)
const testimonialRefs = reactive<HTMLElement[]>([])

// Drag functionality state
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

// Function to get initials from name
const getInitials = (name: string): string => {
  const nameParts = name.split(' ')
  if (nameParts.length >= 2) {
    return `${nameParts[0][0]}${nameParts[1][0]}`
  }
  return name.substring(0, 2).toUpperCase()
}

// Function to generate consistent color based on name
const getAvatarColor = (name: string): string => {
  const colors = [
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#F97316', // Orange
    '#14B8A6'  // Teal
  ]
  
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  const index = Math.abs(hash) % colors.length
  return colors[index]
}

// Drag functionality methods
const startDrag = (e: MouseEvent) => {
  if (!testimonialsContainerRef.value) return
  
  isDragging.value = true
  startX.value = e.pageX - testimonialsContainerRef.value.offsetLeft
  scrollLeft.value = testimonialsContainerRef.value.scrollLeft
}

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value || !testimonialsContainerRef.value) return
  
  e.preventDefault()
  const x = e.pageX - testimonialsContainerRef.value.offsetLeft
  const walk = (x - startX.value) * 2
  testimonialsContainerRef.value.scrollLeft = scrollLeft.value - walk
}

const endDrag = () => {
  isDragging.value = false
}

// Touch events for mobile
const startDragTouch = (e: TouchEvent) => {
  if (!testimonialsContainerRef.value) return
  
  isDragging.value = true
  startX.value = e.touches[0].pageX - testimonialsContainerRef.value.offsetLeft
  scrollLeft.value = testimonialsContainerRef.value.scrollLeft
}

const onDragTouch = (e: TouchEvent) => {
  if (!isDragging.value || !testimonialsContainerRef.value) return
  
  const x = e.touches[0].pageX - testimonialsContainerRef.value.offsetLeft
  const walk = (x - startX.value) * 2
  testimonialsContainerRef.value.scrollLeft = scrollLeft.value - walk
}

const endDragTouch = () => {
  isDragging.value = false
}

// Button scroll functionality
const scrollTestimonials = (direction: 'left' | 'right') => {
  if (!testimonialsContainerRef.value) return
  
  const scrollAmount = testimonialsContainerRef.value.clientWidth * 0.8
  if (direction === 'left') {
    testimonialsContainerRef.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  } else {
    testimonialsContainerRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}

onMounted(() => {
  // Simple fade-in animation for testimonial cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeIn')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })
  
  testimonialRefs.forEach(el => {
    if (el) observer.observe(el)
  })
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-in-out forwards;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Ensure smooth scrolling on mobile */
@media (max-width: 768px) {
  .testimonial-card {
    width: 320px;
  }
}
</style>