<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Floating background elements -->
    <div class="fixed w-full h-full pointer-events-none">
      <div class="absolute top-20 left-10 w-32 h-32 bg-rose-500/20 rounded-full mix-blend-screen blur-xl animate-float-slow"></div>
      <div class="absolute bottom-40 right-20 w-40 h-40 bg-amber-500/20 rounded-full mix-blend-screen blur-xl animate-float-medium"></div>
      <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-emerald-500/20 rounded-full mix-blend-screen blur-xl animate-float-fast"></div>
    </div>
    
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900 to-black"></div>
      <div class="absolute inset-0 opacity-30">
        <img 
          src="@/assets/img/commission-art1.jpg" 
          alt="Academy Hero" 
          class="w-full h-full object-cover"
          @error="handleImageError"
        />
      </div>
      
      <div class="relative max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-5xl md:text-7xl font-bold mb-6 text-white">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-amber-300 to-rose-400 animate-gradient">
                LEARN WITH US
              </span>
            </h1>
            
            <p class="text-xl text-gray-300 mb-8 max-w-2xl">
              Integrating the crucial role of being an entrepreneur as a young artist, we've built a dedicated platform focused on educational content showing specific aspects of the drawing process, as well as sharing tools to build a business in the creative industry.
            </p>
            
            <div class="flex flex-wrap gap-4">
              <a 
                href="#courses" 
                class="inline-flex items-center justify-center px-8 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors"
              >
                Explore Courses
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </a>
              
              <a 
                href="https://youtube.com" 
                target="_blank"
                class="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                Join YouTube
              </a>
              
              <a 
                href="https://patreon.com" 
                target="_blank"
                class="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.82 2.41c3.96 0 7.18 3.22 7.18 7.18 0 3.96-3.22 7.18-7.18 7.18-3.96 0-7.18-3.22-7.18-7.18 0-3.96 3.22-7.18 7.18-7.18M2 21.77h3.77V2.41H2v19.36z"/>
                </svg>
                Join Patreon
              </a>
            </div>
          </div>
          
          <div class="relative">
            <div class="absolute -inset-4 bg-rose-500/20 rounded-2xl blur-md animate-pulse-slow"></div>
            <div class="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <div class="absolute inset-0 flex items-center justify-center">
                <button 
                  @click="playIntroVideo"
                  class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <img 
                src="@/assets/img/commission-art1.jpg" 
                alt="Video Thumbnail" 
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div class="flex items-center justify-between">
                  <span class="text-white font-medium">Introduction to Art Academy</span>
                  <span class="text-gray-300 text-sm">03:45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Courses Section -->
    <section id="courses" class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 class="text-3xl font-bold text-white mb-4">Courses</h2>
            <p class="text-gray-400 max-w-2xl">
              Elevate your artistic skills with our comprehensive courses taught by professional artists and industry experts.
            </p>
          </div>
          
          <div class="mt-6 md:mt-0">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search courses..." 
                class="w-full md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                v-model="searchQuery"
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Category filters -->
        <div class="mb-12 overflow-x-auto scrollbar-hide">
          <div class="flex space-x-2 min-w-max">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="setActiveCategory(category.id)"
              class="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
              :class="activeCategory === category.id ? 'bg-rose-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'"
            >
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- {{featuredCourses}} -->
        
        <!-- Featured Courses Section -->
        <div v-if="activeCategory === 0 && featuredCourses.length > 0" class="mb-16">
          <h3 class="text-2xl font-bold text-white mb-8">Featured Courses</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="course in featuredCourses" 
              :key="course._id"
              class="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:translate-y-[-8px] transition-all duration-300"
            >
              <div class="relative">
                <img 
                  :src="course.imageUrl" 
                  :alt="course.title" 
                  class="w-full h-48 object-cover"
                  @error="handleImageError"
                />
                <div class="absolute top-4 left-4">
                  <span class="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                    FEATURED
                  </span>
                </div>
              </div>
              
              <div class="p-6">
                <h4 class="text-xl font-bold text-white mb-2 line-clamp-2">{{ course.title }}</h4>
                <p class="text-gray-400 text-sm mb-4">A course by {{ course.instructor?.fullName || 'Instructor' }}</p>
                
                <div class="flex items-center mb-4">
                  <div class="flex text-amber-400 mr-2">
                    <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="text-white text-sm">{{ course.averageRating || 0 }}% ({{ course.reviewCount || 0 }})</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-rose-500 font-bold">${{ (course.regularPrice|| course.price)?.toFixed(2) }}</span>
                    <span v-if="course.discountPrice && course.discountPrice < course.price" class="text-gray-400 text-sm line-through ml-2">${{ course.price?.toFixed(2) }}</span>
                  </div>
                  
                  <NuxtLink 
                    :to="`/academy/course/${course.id}`" 
                    class="inline-flex items-center justify-center px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-md hover:bg-rose-700 transition-colors"
                  >
                    View Course
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- All Courses Section -->
        <div>
          <h3 class="text-2xl font-bold text-white mb-8">{{ getCategoryName(activeCategory) }}</h3>
          
          <div v-if="loading" class="text-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
            <p class="text-gray-400 mt-4">Loading courses...</p>
          </div>
          
          <div v-else-if="filteredCourses.length === 0" class="text-center py-20">
            <p class="text-xl text-gray-400">No courses found{{ searchQuery ? ' for your search' : ' in this category' }}.</p>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="course in filteredCourses" 
              :key="course._id"
              class="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:translate-y-[-8px] transition-all duration-300"
            >
              <div class="relative">
                <img 
                  :src="course.thumbnail || '/placeholder.svg?height=300&width=400'" 
                  :alt="course.title" 
                  class="w-full h-48 object-cover"
                  @error="handleImageError"
                />
                <div v-if="course.isFeatured" class="absolute top-4 left-4">
                  <span class="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                    FEATURED
                  </span>
                </div>
                <div v-if="course.level" class="absolute top-4 right-4">
                  <span class="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full capitalize">
                    {{ course.level }}
                  </span>
                </div>
              </div>
              
              <div class="p-6">
                <h4 class="text-xl font-bold text-white mb-2 line-clamp-2">{{ course.title }}</h4>
                <p class="text-gray-400 text-sm mb-2">A course by {{ course.instructor?.fullName || 'Instructor' }}</p>
                <p class="text-gray-500 text-xs mb-4 line-clamp-2">{{ course.description }}</p>
                
                <div class="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>{{ course.totalLessons || 0 }} lessons</span>
                  <span>{{ formatDuration(course.durationInMinutes) }}</span>
                  <span>{{ course.enrollmentCount || 0 }} students</span>
                </div>
                
                <div class="flex items-center mb-4">
                  <div class="flex text-amber-400 mr-2">
                    <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="text-white text-sm">{{ course.averageRating || 0 }}% ({{ course.reviewCount || 0 }})</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-rose-500 font-bold">${{ (course.discountPrice || course.price)?.toFixed(2) }}</span>
                    <span v-if="course.discountPrice && course.discountPrice < course.price" class="text-gray-400 text-sm line-through ml-2">${{ course.price?.toFixed(2) }}</span>
                  </div>
                  
                  <NuxtLink 
                    :to="`/academy/course/${course._id}`" 
                    class="inline-flex items-center justify-center px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-md hover:bg-rose-700 transition-colors"
                  >
                    View Course
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Similar Products Section -->
    <section v-if="similarCourses?.length > 0" class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-white mb-4">You Might Also Like</h2>
          <p class="text-gray-400 max-w-2xl mx-auto">
            Discover more courses that complement your learning journey.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="course in similarCourses" 
            :key="`similar-${course._id}`"
            class="bg-gray-900 rounded-xl overflow-hidden shadow-lg transform hover:translate-y-[-4px] transition-all duration-300"
          >
            <div class="relative">
              <img 
                :src="course.thumbnail || '/placeholder.svg?height=200&width=300'" 
                :alt="course.title" 
                class="w-full h-32 object-cover"
                @error="handleImageError"
              />
              <div v-if="course.level" class="absolute top-2 right-2">
                <span class="inline-block px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded capitalize">
                  {{ course.level }}
                </span>
              </div>
            </div>
            
            <div class="p-4">
              <h4 class="text-lg font-bold text-white mb-1 line-clamp-2">{{ course.title }}</h4>
              <p class="text-gray-400 text-sm mb-3">{{ course.instructor?.fullName || 'Instructor' }}</p>
              
              <div class="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>{{ course.totalLessons || 0 }} lessons</span>
                <span>{{ course.enrollmentCount || 0 }} students</span>
              </div>
              
              <div class="flex items-center justify-between">
                <span class="text-rose-500 font-bold text-sm">${{ (course.discountPrice || course.price)?.toFixed(2) }}</span>
                <NuxtLink 
                  :to="`/academy/course/${course._id}`" 
                  class="inline-flex items-center justify-center px-3 py-1 bg-rose-600 text-white text-xs font-medium rounded hover:bg-rose-700 transition-colors"
                >
                  View
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <CourseTestimonialCarousel />
    
    <!-- CTA Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">
          Ready to Transform Your Artistic Journey?
        </h2>
        
        <p class="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Join our community of artists and elevate your skills with expert-led courses designed to help you succeed.
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="#courses" 
            class="inline-flex items-center justify-center px-8 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors"
          >
            Explore Courses
          </a>
          
          <NuxtLink 
            to="/contact" 
            class="inline-flex items-center justify-center px-8 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
          >
            Contact Us
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Video Modal -->
    <Teleport to="body">
      <transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="isVideoModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="closeVideoModal">
          <div class="fixed inset-0 bg-black/90" aria-hidden="true"></div>
          
          <div 
            class="relative bg-black rounded-xl max-w-4xl w-full aspect-video overflow-hidden shadow-2xl"
            @click.stop
          >
            <div class="absolute top-4 right-4 z-10">
              <button 
                @click="closeVideoModal" 
                class="rounded-full p-2 bg-black/50 text-white hover:bg-black/80 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>


  
<script setup lang="ts">
import { ref, computed } from 'vue'
import artwork1 from '@/assets/img/artist.avif'
import artwork2 from '@/assets/img/commission-art1.jpg'
import artwork3 from '@/assets/img/commission-art.png'
import { useGetCourses } from "@/composables/modules/courses/useGetCourses"

// Interface for course data structure
interface Instructor {
  _id: string
  email: string
  fullName: string
  id: string
}

interface Lesson {
  _id: string
  title: string
  description: string
  order: number
  section: string
  course: string
  type: string
  videoUrl: string
  content: string
  durationInMinutes: number
  isPreview: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

interface Section {
  _id: string
  title: string
  description: string
  order: number
  course: string
  lessons: Lesson[]
  createdAt: string
  updatedAt: string
  __v: number
}

interface Course {
  _id: string
  title: string
  slug: string
  description: string
  longDescription: string
  price: number
  discountPrice: number
  thumbnail: string
  previewVideo: string
  tags: string[]
  status: string
  sections: Section[]
  instructor: Instructor
  enrollmentCount: number
  totalLessons: number
  durationInMinutes: number
  requirements: string[]
  objectives: string[]
  level: string
  isFeatured: boolean
  averageRating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
  __v: number
}

const { courses, loading } = useGetCourses()

// State
const searchQuery = ref('')
const activeCategory = ref(0)
const isVideoModalOpen = ref(false)

// Categories
const categories = ref([
  { id: 0, name: 'All Courses' },
  { id: 1, name: 'Drawing Fundamentals' },
  { id: 2, name: 'Digital Art' },
  { id: 3, name: 'Painting' },
  { id: 4, name: 'Portrait Art' },
  { id: 5, name: 'Art Business' },
  { id: 6, name: 'Composition' },
  { id: 7, name: 'Color Theory' }
])

// Testimonials
const testimonials = ref([
  {
    name: 'Michael Thompson',
    title: 'Aspiring Artist',
    avatarUrl: '/images/testimonial-1.jpg',
    text: 'The Hyper-Realistic Charcoal Portraits course completely transformed my approach to drawing. Raymond is an incredible teacher who breaks down complex techniques into manageable steps.',
    course: 'Mastering Hyper-Realistic Charcoal Portraits'
  },
  {
    name: 'Jennifer Williams',
    title: 'Professional Illustrator',
    avatarUrl: '/images/testimonial-2.jpg',
    text: 'As someone who was already working in the field, I was amazed at how much I still learned from the Digital Art Fundamentals course. The techniques taught have elevated my work to a new level.',
    course: 'Digital Art Fundamentals: From Beginner to Pro'
  },
  {
    name: 'David Chen',
    title: 'Art Student',
    avatarUrl: '/images/testimonial-3.jpg',
    text: 'The Art Business course gave me the confidence and knowledge to start selling my work online. Within a month of completing the course, I had my first commission!',
    course: 'Art Business: Marketing Your Work Online'
  }
])

// Helper function to get placeholder images
const getPlaceholderImage = (index: number) => {
  const images = [artwork1, artwork2, artwork3]
  return images[index % images.length]
}

// Helper function to shuffle array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Helper function to get category ID based on tags or title
const getCategoryIdFromCourse = (course: Course): number => {
  const title = course.title.toLowerCase()
  const tags = course.tags.map(tag => tag.toLowerCase())
  
  if (tags.some(tag => tag.includes('portrait') || tag.includes('charcoal')) || 
      title.includes('portrait')) {
    return 4 // Portrait Art
  }
  if (title.includes('digital') || tags.some(tag => tag.includes('digital'))) {
    return 2 // Digital Art
  }
  if (title.includes('business') || title.includes('marketing')) {
    return 5 // Art Business
  }
  if (title.includes('painting') || title.includes('acrylic') || title.includes('watercolor')) {
    return 3 // Painting
  }
  if (title.includes('color') || title.includes('theory')) {
    return 7 // Color Theory
  }
  if (title.includes('composition')) {
    return 6 // Composition
  }
  
  return 1 // Default to Drawing Fundamentals
}

// Transform courses data to match the expected format
const transformedCourses = computed(() => {
  return courses.value.map((course: Course, index: number) => ({
    id: course._id,
    title: course.title,
    instructor: course.instructor?.fullName || 'Unknown Instructor',
    description: course.description,
    longDescription: course.longDescription,
    imageUrl: course.thumbnail || getPlaceholderImage(index),
    rating: course.averageRating || Math.floor(Math.random() * 10) + 90, // Random rating 90-99 if no rating
    reviewCount: course.reviewCount || Math.floor(Math.random() * 1000) + 100,
    regularPrice: course.price,
    salePrice: course.discountPrice || course.price * 0.02, // Use discount price or 2% of original price
    categoryId: getCategoryIdFromCourse(course),
    isBestSeller: course.isFeatured,
    studentCount: course.enrollmentCount || Math.floor(Math.random() * 50000) + 10000,
    slug: course.slug,
    previewVideo: course.previewVideo,
    level: course.level,
    totalLessons: course.totalLessons,
    durationInMinutes: course.durationInMinutes,
    requirements: course.requirements,
    objectives: course.objectives,
    tags: course.tags,
    sections: course.sections
  }))
})

// Computed properties
const featuredCourses = computed(() => {
  return transformedCourses.value.filter(course => course.isBestSeller).slice(0, 3)
})

const filteredCourses = computed(() => {
  let filtered = transformedCourses.value
  
  // Filter by category
  if (activeCategory.value !== 0) {
    filtered = filtered.filter(course => course.categoryId === activeCategory.value)
  }
  
  // Filter by search query
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(course => 
      course.title.toLowerCase().includes(query) || 
      course.instructor.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  return filtered
})

// Similar/Related courses logic
const getSimilarCourses = (currentCourseId: string, limit: number = 4) => {
  const currentCourse = transformedCourses.value.find(course => course.id === currentCourseId)
  if (!currentCourse) return []
  
  // Get courses from the same category, excluding the current course
  let similarCourses = transformedCourses.value.filter(course => 
    course.id !== currentCourseId && 
    course.categoryId === currentCourse.categoryId
  )
  
  // If not enough courses in the same category, add random courses
  if (similarCourses?.length < limit) {
    const remainingCourses = transformedCourses.value.filter(course => 
      course.id !== currentCourseId && 
      !similarCourses.some(similar => similar.id === course.id)
    )
    similarCourses = [...similarCourses, ...remainingCourses]
  }
  
  // Shuffle and return limited number
  return shuffleArray(similarCourses).slice(0, limit)
}

// Random courses for homepage recommendations
const randomizedCourses = computed(() => {
  return shuffleArray(transformedCourses.value).slice(0, 6)
})

// Get courses by level
const getCoursesByLevel = (level: string) => {
  return transformedCourses.value.filter(course => 
    course.level.toLowerCase() === level.toLowerCase()
  )
}

// Get courses by instructor
const getCoursesByInstructor = (instructorName: string) => {
  return transformedCourses.value.filter(course => 
    course.instructor.toLowerCase().includes(instructorName.toLowerCase())
  )
}

// Methods
const setActiveCategory = (categoryId: number) => {
  activeCategory.value = categoryId
}

const getCategoryName = (categoryId: number) => {
  const category = categories.value.find(cat => cat.id === categoryId)
  return category ? category.name : 'All Courses'
}

const playIntroVideo = () => {
  isVideoModalOpen.value = true
}

const closeVideoModal = () => {
  isVideoModalOpen.value = false
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder.svg?height=400&width=300'
}

// Format currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

// Format duration
const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours > 0) {
    return `${hours}h ${mins}m`
  }
  return `${mins}m`
}

// Format review count
const formatReviewCount = (count: number) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

// Expose methods and computed properties for template use
defineExpose({
  transformedCourses,
  featuredCourses,
  filteredCourses,
  getSimilarCourses,
  randomizedCourses,
  getCoursesByLevel,
  getCoursesByInstructor,
  formatPrice,
  formatDuration,
  formatReviewCount
})
</script>
  
  <style scoped>
  /* Animations */
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  
  @keyframes float-medium {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-15px) rotate(-5deg); }
  }
  
  @keyframes float-fast {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-10px) rotate(3deg); }
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
  }
  
  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }
  
  .animate-float-medium {
    animation: float-medium 6s ease-in-out infinite;
  }
  
  .animate-float-fast {
    animation: float-fast 4s ease-in-out infinite;
  }
  
  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }
  
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradient-shift 3s ease infinite;
  }
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  /* Line clamp for titles */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>