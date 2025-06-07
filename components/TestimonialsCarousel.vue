<template>
  <section ref="testimonialsSectionRef" class="py-16 bg-white overflow-hidden">
    <div class="container mx-auto px-4">
   <div class="flex justify-center items-center flex-col">
    <h2 class="text-3xl font-bold text-center mb-6 text-gray-800 relative inline-block">
            What Clients Say
            <span class="absolute -bottom-2 left-0 w-full h-1 bg-emerald-400"></span>
          </h2>
      <!-- <h2 class="text-3xl font-bold text-center mb-4 slide-up">Client Testimonials</h2> -->
      <p class="text-gray-600 text-center max-w-2xl mx-auto mb-12 fade-in">
        Hear what collectors and art enthusiasts have to say about my work
      </p>
   </div>
      
      <!-- Decorative elements -->
      <!-- <div class="absolute left-0 top-1/4 -translate-x-1/2 opacity-10 hidden lg:block">
        <svg width="400" height="400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="2" class="text-amber-800" />
          <circle cx="50" cy="50" r="35" stroke="currentColor" stroke-width="1" class="text-amber-800" />
          <circle cx="50" cy="50" r="25" stroke="currentColor" stroke-width="0.5" class="text-amber-800" />
        </svg>
      </div>
      
      <div class="absolute right-0 bottom-1/4 translate-x-1/2 opacity-10 hidden lg:block">
        <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="80" height="80" stroke="currentColor" stroke-width="2" class="text-amber-800" />
          <rect x="25" y="25" width="50" height="50" stroke="currentColor" stroke-width="1" class="text-amber-800" />
          <rect x="40" y="40" width="20" height="20" stroke="currentColor" stroke-width="0.5" class="text-amber-800" />
        </svg>
      </div> -->
      
      <div class="relative testimonial-slider">
        <!-- Navigation Arrows -->
        <button 
          class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110 active:scale-95 duration-300"
          @click="scrollTestimonials('left')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div 
          ref="testimonialsContainerRef" 
          class="flex space-x-6 overflow-x-auto scrollbar-hide pb-8 pt-4 px-2 snap-x snap-mandatory"
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
            class="testimonial-card flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-start relative group"
            :ref="el => { if (el) testimonialRefs[index] = el }"
          >
            <div class="bg-white p-8 rounded-xl shadow-custom h-full flex flex-col relative overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-custom-hover">
              <!-- Decorative corner elements -->
              <div class="absolute top-0 left-0 w-16 h-16 opacity-10">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0L100 0L100 100" stroke="currentColor" stroke-width="8" class="text-amber-800" />
                </svg>
              </div>
              <div class="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 100L0 100L0 0" stroke="currentColor" stroke-width="8" class="text-amber-800" />
                </svg>
              </div>
              
              <!-- Quote icon -->
              <div class="absolute top-4 right-4 text-amber-800 opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <div class="mb-6 relative z-10">
                <!-- Initials Avatar -->
                <div class="flex justify-center mb-6">
                  <div 
                    class="h-20 w-20 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md transform transition-transform duration-500 group-hover:scale-110"
                    :style="{ backgroundColor: getAvatarColor(testimonial.name) }"
                  >
                    {{ getInitials(testimonial.name) }}
                  </div>
                </div>
                
                <!-- Star Rating with Animation -->
                <div class="flex justify-center mb-6">
                  <div class="flex space-x-1">
                    <svg 
                      v-for="star in 5" 
                      :key="star" 
                      class="h-6 w-6 text-yellow-500 transform transition-transform duration-300"
                      :class="{ 'group-hover:rotate-12': star === 1, 'group-hover:rotate-6': star === 2, 'group-hover:rotate-0': star === 3, 'group-hover:-rotate-6': star === 4, 'group-hover:-rotate-12': star === 5 }"
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                
                <!-- Testimonial Text with Animated Underline -->
                <div class="relative">
                  <p class="text-gray-700 italic text-center mb-6 leading-relaxed">"{{ testimonial.text }}"</p>
                  <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-amber-800 opacity-50 group-hover:w-32 transition-all duration-500"></div>
                </div>
              </div>
              
              <!-- Client Info with Animated Border -->
              <div class="mt-auto text-center pt-4 border-t border-gray-100 group-hover:border-amber-100 transition-colors duration-500">
                <h4 class="font-medium text-lg">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {{ testimonial.location }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors transform hover:scale-110 active:scale-95 duration-300"
          @click="scrollTestimonials('right')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <!-- View All Testimonials Button with Animation -->
      <!-- <div class="text-center mt-12">
        <button class="px-8 py-3 border-2 border-amber-800 text-amber-800 font-medium rounded-md hover:bg-amber-800 hover:text-white transition-all duration-300 transform hover:scale-105 relative overflow-hidden group">
          <span class="relative z-10">View All Testimonials</span>
          <span class="absolute inset-0 bg-amber-800 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        </button>
      </div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import gsap from 'gsap'

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
  // List of pleasant, accessible colors
  const colors = [
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#06B6D4', // Cyan
    '#F97316', // Orange
    '#14B8A6'  // Teal
  ]
  
  // Simple hash function to get consistent color for the same name
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  // Get color from the array using the hash
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
  const walk = (x - startX.value) * 2 // Scroll speed multiplier
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

// Animation on scroll
const animateOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })
  
  // Observe testimonial cards
  testimonialRefs.forEach(el => {
    if (el) observer.observe(el)
  })
}

onMounted(() => {
  // Initialize animations
  gsap.from('.testimonial-card', {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.testimonial-card',
      start: 'top bottom-=100',
    }
  })
  
  // Initialize animations on scroll
  animateOnScroll()
  
  // Add floating animation to decorative elements
  gsap.to('.absolute svg', {
    y: 10,
    duration: 2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  })
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}

.fade-in {
  animation: fadeIn 0.8s ease-in-out forwards;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.slide-up {
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  0% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

.shadow-custom {
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.1);
}

.shadow-custom-hover {
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.2);
}

/* Button hover effect */
.group:hover .group-hover\:translate-y-0 {
  color: white;
}

@keyframes float {
    0% {
      transform: translateY(0px) rotate(6deg);
    }
    50% {
      transform: translateY(-10px) rotate(8deg);
    }
    100% {
      transform: translateY(0px) rotate(6deg);
    }
  }
  
  .absolute {
    animation: float 6s ease-in-out infinite;
  }
</style>