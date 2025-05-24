<template>
    <div class="min-h-screen bg-black text-white">
      <div class="fixed w-full h-full pointer-events-none">
        <div class="absolute top-20 left-10 w-32 h-32 bg-rose-500/20 rounded-full mix-blend-screen blur-xl animate-float-slow"></div>
        <div class="absolute bottom-40 right-20 w-40 h-40 bg-amber-500/20 rounded-full mix-blend-screen blur-xl animate-float-medium"></div>
        <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-emerald-500/20 rounded-full mix-blend-screen blur-xl animate-float-fast"></div>
      </div>
      
      <div 
        ref="courseHeader" 
        class="sticky top-0 z-30 transition-all duration-300"
        :class="{'bg-black/80 backdrop-blur-md shadow-lg': isHeaderSticky}"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div class="flex items-center">
              <router-link 
                to="/academy" 
                class="mr-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </router-link>
              
              <div>
                <h1 
                  class="text-xl md:text-2xl font-bold text-white transition-all duration-300"
                  :class="{'text-lg md:text-xl': isHeaderSticky}"
                >
                  {{ course.title }}
                </h1>
                <p 
                  v-if="!isHeaderSticky" 
                  class="text-gray-400 text-sm"
                >
                  A course by {{ courseObj?.instructor?.fullName }}
                </p>
              </div>
            </div>
            
            <div class="flex items-center gap-4">
              <div v-if="isHeaderSticky" class="hidden md:block">
                <span class="text-rose-500 font-bold">${{ course?.price?.toFixed(2) }}</span>
                <span class="text-gray-400 text-sm line-through ml-2">${{ course?.price?.toFixed(2) }}</span>
              </div>
              
              <button 
                @click="scrollToEnroll"
                class="inline-flex items-center justify-center px-6 py-2 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Course Hero -->
      <section class="relative py-8 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Course Info (Left Column) -->
            <div class="lg:col-span-2">
              <div class="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-2xl mb-8">
                <div class="absolute inset-0 flex items-center justify-center">
                  <button 
                    @click="playCourseVideo"
                    class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <img 
                  :src="course.thumbnail" 
                  :alt="course.title" 
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
              
              <div class="mb-8">
                <div class="flex flex-wrap items-center gap-4 mb-4">
                  <div class="flex items-center">
                    <div class="flex text-amber-400 mr-2">
                      <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="text-white">{{ course.averageRating }}% ({{ course.reviewCount }} reviews)</span>
                  </div>
                  
                  <div class="text-gray-400">
                    <span>{{ course.enrollmentCount }} students</span>
                  </div>
                  
                  <div class="text-gray-400">
                    <span>Last updated {{ getRandomDate() }}</span>
                  </div>
                </div>
                
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">{{ course.title }}</h1>
                
                <p class="text-xl text-gray-300 mb-6">
                  {{ course.fullDescription || course.description }}
                </p>
                
                <div class="flex flex-wrap items-center gap-4">
                  <div class="flex items-center">
                    <div class="h-12 w-12 bg-gray-700 rounded-full overflow-hidden">
                      <img 
                        src="@/assets/img/raymond-logo.png" 
                        :alt="course.instructor" 
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      />
                    </div>
                    <div class="ml-4">
                      <h4 class="font-bold text-white">{{ course?.instructor?.fullName }}</h4>
                      <p class="text-gray-400 text-sm">{{ instructorTitle }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-gray-400">{{ courseDuration }}</span>
                  </div>
                  
                  <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span class="text-gray-400">{{ courseResources }} resources</span>
                  </div>
                </div>
              </div>
              
              <!-- Course Content -->
              <div class="mb-12">
                <h2 class="text-2xl font-bold text-white mb-6">Course Content</h2>
                
                <div class="bg-gray-900 rounded-xl overflow-hidden">
                  <div class="p-4 border-b border-gray-800">
                    <div class="flex items-center justify-between">
                      <span class="text-white font-medium">{{ courseSections.length }} sections • {{ totalLessons }} lessons • {{ courseDuration }}</span>
                      <button class="text-rose-500 hover:text-rose-400 transition-colors">Expand All</button>
                    </div>
                  </div>
                  
                  <div v-for="(section, index) in courseSections" :key="index" class="border-b border-gray-800 last:border-b-0">
                    <div 
                      class="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-800/50 transition-colors"
                      @click="toggleSection(index)"
                    >
                      <div class="flex items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          class="h-5 w-5 text-gray-400 mr-2 transform transition-transform duration-200" 
                          :class="{'rotate-90': section.isOpen}"
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                        <span class="text-white font-medium">{{ section.title }}</span>
                      </div>
                      <span class="text-gray-400 text-sm">{{ section.lessons.length }} lessons • {{ section.duration }}</span>
                    </div>
                    
                    <div v-if="section.isOpen" class="bg-gray-800/30">
                      <div 
                        v-for="(lesson, lessonIndex) in section.lessons" 
                        :key="lessonIndex"
                        class="p-4 flex items-start border-t border-gray-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div class="flex-1">
                          <div class="flex items-center justify-between">
                            <span class="text-white">{{ lesson.title }}</span>
                            <span class="text-gray-400 text-sm">{{ lesson.duration }}</span>
                          </div>
                          <p v-if="lesson.preview" class="text-rose-500 text-sm mt-1">Preview available</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Requirements -->
              <div class="mb-12">
                <h2 class="text-2xl font-bold text-white mb-6">Requirements</h2>
                
                <ul class="space-y-2 text-gray-300">
                  <li v-for="(req, index) in courseObj?.requirements" :key="index" class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-rose-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ req }}</span>
                  </li>
                </ul>
              </div>
              
              <!-- What You'll Learn -->
              <div class="mb-12">
                <h2 class="text-2xl font-bold text-white mb-6">What You'll Learn</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="(item, index) in courseObj?.objectives" :key="index" class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-rose-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-gray-300">{{ item }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Instructor -->
              <div class="mb-12">
                <h2 class="text-2xl font-bold text-white mb-6">Your Instructor</h2>
                
                <div class="bg-gray-900 rounded-xl p-6">
                  <div class="flex flex-col sm:flex-row items-start gap-6">
                    <div class="w-24 h-24 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src="@/assets/img/raymond-logo.png" 
                        :alt="course.instructor" 
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      />
                    </div>
                    
                    <div>
                      <h3 class="text-xl font-bold text-white mb-2">{{ course.instructor }}</h3>
                      <p class="text-gray-400 mb-4">{{ instructorTitle }}</p>
                      
                      <div class="flex flex-wrap items-center gap-4 mb-4">
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span class="text-white">{{ instructorRating }} Instructor Rating</span>
                        </div>
                        
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          <span class="text-gray-400">{{ instructorReviews }} Reviews</span>
                        </div>
                        
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span class="text-gray-400">{{ instructorStudents }} Students</span>
                        </div>
                        
                        <div class="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span class="text-gray-400">{{ instructorCourses }} Courses</span>
                        </div>
                      </div>
                      
                      <p class="text-gray-300 leading-loose">
                        {{ instructorBio }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Student Reviews -->
              <div class="mb-12">
                <h2 class="text-2xl font-bold text-white mb-6">Student Reviews</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="bg-gray-900 rounded-xl p-6">
                    <div class="flex items-center mb-4">
                      <div class="h-12 w-12 bg-gray-700 rounded-full overflow-hidden">
                        <img 
                          src="@/assets/img/event-go.png" 
                          alt="Student Review" 
                          class="w-full h-full object-cover"
                          @error="handleImageError"
                        />
                      </div>
                      <div class="ml-4">
                        <h4 class="font-bold text-white">Sarah Johnson</h4>
                        <p class="text-gray-400 text-sm">2 weeks ago</p>
                      </div>
                    </div>
                    
                    <div class="mb-4">
                      <div class="flex text-amber-400">
                        <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    
                    <p class="text-gray-300">
                      This course exceeded all my expectations! The instructor breaks down complex techniques into manageable steps, and the practice exercises really helped me improve my skills. Highly recommended!
                    </p>
                  </div>
                  
                  <div class="bg-gray-900 rounded-xl p-6">
                    <div class="flex items-center mb-4">
                      <div class="h-12 w-12 bg-gray-700 rounded-full overflow-hidden">
                        <img 
                          src="@/assets/img/event-go.png" 
                          alt="Student Review" 
                          class="w-full h-full object-cover"
                          @error="handleImageError"
                        />
                      </div>
                      <div class="ml-4">
                        <h4 class="font-bold text-white">Michael Thompson</h4>
                        <p class="text-gray-400 text-sm">1 month ago</p>
                      </div>
                    </div>
                    
                    <div class="mb-4">
                      <div class="flex text-amber-400">
                        <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    
                    <p class="text-gray-300">
                      As someone who was already working in the field, I was amazed at how much I still learned from this course. The techniques taught have elevated my work to a new level. I've already recommended it to several colleagues who are looking to improve their skills."
                    </p>
                  </div>
                </div>
                
                <div class="mt-8 text-center">
                  <button class="inline-flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors">
                    Show More Reviews
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Course Sidebar (Right Column) - Becomes sticky on scroll -->
            <div class="lg:col-span-1">
              <div 
                ref="courseSidebar" 
                class="bg-gray-900 rounded-xl overflow-hidden shadow-xl transition-all duration-300"
                :class="{'lg:sticky': true, 'lg:top-24': isHeaderSticky, 'lg:top-8': !isHeaderSticky}"
              >
                <div class="p-6">
                  <div class="mb-6">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-rose-500 text-2xl font-bold">${{ course.salePrice.toFixed(2) }}</span>
                      <span class="text-gray-400 text-lg line-through">${{ course.regularPrice.toFixed(2) }}</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-white">98% discount</span>
                      <div class="bg-rose-600/20 text-rose-500 px-2 py-1 rounded text-sm">
                        <span class="countdown-timer">{{ offerEndsIn }}</span> left at this price!
                      </div>
                    </div>
                  </div>
                  
                  <div class="space-y-4 mb-6">
                    <button 
                      id="enroll-button"
                        @click="enrollInCourse"
                        :disabled="enrolling"
                      class="w-full py-3 bg-rose-600 disabled:cursor-not-allowed disabled:opacity-25 text-white font-medium rounded-md hover:bg-rose-700 transition-colors flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                      </svg>
                       {{ enrolling ? 'processing..' : 'Enroll Now'}}
                    </button>
                    
                    <button class="w-full py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors">
                      Try Free Preview
                    </button>
                  </div>
                  
                  <div class="text-center text-sm text-gray-400 mb-6">
                    30-Day Money-Back Guarantee
                  </div>
                  
                  <div class="space-y-4">
                    <h3 class="text-lg font-bold text-white">This course includes:</h3>
                    
                    <div class="space-y-3">
                      <div class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span class="text-gray-300">{{ totalLessons }} on-demand video lessons</span>
                      </div>
                      
                      <div class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <span class="text-gray-300">{{ courseResources }} downloadable resources</span>
                      </div>
                      
                      <div class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span class="text-gray-300">Full lifetime access</span>
                      </div>
                      
                      <div class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span class="text-gray-300">Certificate of completion</span>
                      </div>
                      
                      <div class="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span class="text-gray-300">Access on mobile and TV</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-6 pt-6 border-t border-gray-800">
                    <h3 class="text-lg font-bold text-white mb-4">Share this course</h3>
                    
                    <div class="flex space-x-3">
                      <a href="#" class="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                      
                      <a href="#" class="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </a>
                      
                      <a href="#" class="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                      
                      <a href="#" class="h-10 w-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Related Courses -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-2xl font-bold text-white mb-8">You Might Also Like</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="(relatedCourse, index) in coursesList" 
              :key="index"
              class="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:translate-y-[-8px] transition-all duration-300"
            >
              <div class="relative">
                <img 
                  :src="relatedCourse?.thumbnail" 
                  :alt="relatedCourse?.title" 
                  class="w-full h-48 object-cover"
                  @error="handleImageError"
                />
                <div v-if="relatedCourse.isBestSeller" class="absolute top-4 left-4">
                  <span class="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                    BEST SELLER
                  </span>
                </div>
              </div>
              
              <div class="p-6">
                <h4 class="text-xl font-bold text-white mb-2 line-clamp-2">{{ relatedCourse?.title }}</h4>
                <p class="text-gray-400 text-sm mb-4">A course by Raymond Aworo</p>
                <!-- <p class="text-gray-400 text-sm mb-4">A course by {{ relatedCourse?.instructor?.fullName }}</p> -->
                
                <div class="flex items-center mb-4">
                  <div class="flex text-amber-400 mr-2">
                    <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="text-white text-sm">{{ relatedCourse?.averagerating }}% ({{ relatedCourse?.reviewCount }})</span>
                </div>
                
                <div class="flex items-center justify-between">
                  <div>
                    <span class="text-rose-500 font-bold">${{ relatedCourse?.price.toFixed(2) }}</span>
                    <span class="text-gray-400 text-sm line-through ml-2">${{ relatedCourse?.price?.toFixed(2) }}</span>
                  </div>
                  
                  <router-link 
                    :to="`/academy/course/${relatedCourse?.id}`" 
                    class="inline-flex items-center justify-center px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-md hover:bg-rose-700 transition-colors"
                  >
                    View Course
                  </router-link>
                </div>
              </div>
            </div>
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
                :src="course.previewVideo" 
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
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import { useRoute } from 'vue-router'
  import artwork1 from '@/assets/img/artist.png'
import artwork2 from '@/assets/img/commission-art1.jpg'
import artwork3 from '@/assets/img/commission-art.png'
import { useGetCourses } from "@/composables/modules/courses/useGetCourses"
import { useGetCourseById } from "@/composables/modules/courses/useGetCourseById"
import { useEnrollInCourse } from "@/composables/modules/courses/useEnrollInCourse"
  
  // Route
  const route = useRoute()
  const courseId = computed(() => Number(route.params.id) || 1)
  
  // State
  const isHeaderSticky = ref(false)
  const isVideoModalOpen = ref(false)
  const courseHeader = ref<HTMLElement | null>(null)
  const courseSidebar = ref<HTMLElement | null>(null)
    const { courses: coursesList, loading } = useGetCourses()
    const { course: courseObj, loading:loadingCourse } = useGetCourseById()
    const { enrollInCourse, loading: enrolling} = useEnrollInCourse()
  
  // Sample course data
  const courses = ref([
    {
      id: 1,
      title: 'Mastering Hyper-Realistic Charcoal Portraits',
      instructor: 'Raymond Aworo',
      description: 'Learn the techniques to create stunning hyper-realistic portraits using charcoal.',
      fullDescription: 'From portfolios, presentations, and posters to videos, social media posts, and even web layout, you can create all that from a single platform. In this online course, Raymond Aworo, a hyper-realistic visual artist and medical doctor in training, teaches you how to master the art of charcoal portraiture from scratch.',
      imageUrl: artwork1,
      rating: 97,
      reviewCount: '1.5K',
      regularPrice: 49.99,
      salePrice: 0.99,
      categoryId: 1,
      isBestSeller: true,
      studentCount: 102849
    },
    {
      id: 2,
      title: 'Digital Art Fundamentals: From Beginner to Pro',
      instructor: 'Sarah Johnson',
      description: 'Master digital art from the ground up with professional techniques and workflows.',
      imageUrl: artwork2,
      rating: 95,
      reviewCount: '730',
      regularPrice: 49.99,
      salePrice: 0.99,
      categoryId: 2,
      isBestSeller: true,
      studentCount: 48779
    },
    {
      id: 3,
      title: 'Art Business: Marketing Your Work Online',
      instructor: 'Gabriel Perelman',
      description: 'Learn how to effectively market and sell your artwork in the digital age.',
      imageUrl: artwork3,
      rating: 98,
      reviewCount: '612',
      regularPrice: 49.99,
      salePrice: 0.99,
      categoryId: 5,
      isBestSeller: true,
      studentCount: 51308
    }
  ])
  
  // Course sections
  const courseSections = ref([
    {
      title: 'Introduction',
      isOpen: true,
      duration: '45 min',
      lessons: [
        { title: 'Welcome to the Course', duration: '5:23', preview: true },
        { title: 'Course Overview', duration: '8:45', preview: true },
        { title: 'Materials You Will Need', duration: '12:18', preview: false },
        { title: 'Setting Up Your Workspace', duration: '15:32', preview: false }
      ]
    },
    {
      title: 'Charcoal Drawing Basics',
      isOpen: false,
      duration: '1h 30min',
      lessons: [
        { title: 'Understanding Charcoal Types', duration: '10:45', preview: false },
        { title: 'Basic Shading Techniques', duration: '18:22', preview: false },
        { title: 'Creating Texture with Charcoal', duration: '15:10', preview: false },
        { title: 'Light and Shadow Fundamentals', duration: '22:15', preview: false },
        { title: 'Practice Exercise: Simple Objects', duration: '25:30', preview: false }
      ]
    },
    {
      title: 'Portrait Fundamentals',
      isOpen: false,
      duration: '2h 15min',
      lessons: [
        { title: 'Facial Proportions and Structure', duration: '20:12', preview: false },
        { title: 'Drawing Eyes with Depth', duration: '18:45', preview: false },
        { title: 'Capturing Realistic Noses', duration: '15:30', preview: false },
        { title: 'Drawing Expressive Lips', duration: '16:20', preview: false },
        { title: 'Hair Techniques for Realism', duration: '25:18', preview: false },
        { title: 'Practice Exercise: Basic Portrait', duration: '35:10', preview: false }
      ]
    },
    {
      title: 'Advanced Techniques',
      isOpen: false,
      duration: '3h 20min',
      lessons: [
        { title: 'Creating Skin Texture', duration: '22:15', preview: false },
        { title: 'Capturing Emotion in Portraits', duration: '25:30', preview: false },
        { title: 'Working with Reference Photos', duration: '18:45', preview: false },
        { title: 'Blending and Smudging Mastery', duration: '20:10', preview: false },
        { title: 'Adding Highlights for Dimension', duration: '15:25', preview: false },
        { title: 'Creating Dramatic Lighting', duration: '28:40', preview: false },
        { title: 'Practice Exercise: Dramatic Portrait', duration: '45:15', preview: false }
      ]
    },
    {
      title: 'Final Project',
      isOpen: false,
      duration: '1h 45min',
      lessons: [
        { title: 'Planning Your Hyper-Realistic Portrait', duration: '15:20', preview: false },
        { title: 'Step-by-Step Demonstration', duration: '45:30', preview: false },
        { title: 'Troubleshooting Common Issues', duration: '18:15', preview: false },
        { title: 'Final Touches and Presentation', duration: '22:10', preview: false }
      ]
    }
  ])
  
  // Course requirements
  const courseRequirements = [
    'No prior drawing experience required - this course is suitable for complete beginners',
    'Basic drawing materials: charcoal pencils, charcoal sticks, kneaded eraser, blending stumps',
    'Drawing paper or sketchbook (preferably with some texture)',
    'Reference photos for practice (provided in course resources)',
    'Patience and willingness to practice the techniques demonstrated'
  ]
  
  // Course outcomes
  const courseOutcomes = [
    'Create stunning hyper-realistic portraits using charcoal',
    'Master fundamental drawing techniques for portraiture',
    'Understand facial proportions and structure',
    'Render realistic skin textures, eyes, hair, and facial features',
    'Create dramatic lighting effects in your portraits',
    'Develop your own unique artistic style',
    'Build a portfolio of impressive charcoal portraits',
    'Gain confidence in your drawing abilities'
  ]
  
  // Related courses
  const relatedCourses = ref([
    {
      id: 6,
      title: 'Portrait Drawing: Capturing Likeness',
      instructor: 'Raymond Aworo',
      description: 'Learn the secrets to capturing accurate likenesses in your portrait drawings.',
      imageUrl: artwork1,
      rating: 99,
      reviewCount: '842',
      regularPrice: 49.99,
      salePrice: 0.99,
      isBestSeller: true
    },
    {
      id: 4,
      title: 'Acrylic Painting Masterclass',
      instructor: 'Maria Rodriguez',
      description: 'Discover the versatility of acrylic paints and create stunning artworks with this comprehensive course.',
      imageUrl: artwork2,
      rating: 96,
      reviewCount: '428',
      regularPrice: 49.99,
      salePrice: 0.99,
      isBestSeller: false
    },
    {
      id: 7,
      title: 'Composition Mastery for Visual Artists',
      instructor: 'Emma Thompson',
      description: 'Learn the principles of composition that will transform your artwork from amateur to professional.',
      imageUrl: artwork3,
      rating: 97,
      reviewCount: '512',
      regularPrice: 49.99,
      salePrice: 0.99,
      isBestSeller: false
    }
  ])
  
  // Computed properties
  const course = computed(() => {
    return courses.value.find(c => c.id === courseId.value) || courses.value[0]
  })
  
  const totalLessons = computed(() => {
    return courseSections.value.reduce((total, section) => total + section.lessons.length, 0)
  })
  
  const courseDuration = computed(() => {
    return  course?.value?.durationInMinutes
  })
  
  const courseResources = computed(() => {
    return 24
  })
  
  const instructorAvatar = computed(() => {
    return '/images/instructor.jpg'
  })
  
  const instructorTitle = computed(() => {
    if (course.value.instructor === 'Raymond Aworo') {
      return 'Hyper-Realistic Artist & Medical Doctor'
    }
    return 'Professional Artist & Instructor'
  })
  
  const instructorBio = computed(() => {
    if (course.value.instructor === 'Raymond Aworo') {
      return 'Raymond Aworo is a hyper-realistic visual artist and medical doctor in training who was born in Nigeria. He started drawing at the age of 12 and is a self-taught artist who expresses in charcoal, pastel, and acrylic paint. With over 10 years of experience, Raymond has taught thousands of students worldwide and has exhibited his work internationally.'
    }
    return 'A professional artist with over 10 years of experience in the field, specializing in digital and traditional art techniques. Known for breaking down complex concepts into easy-to-understand lessons for students of all skill levels.'
  })
  
  const instructorRating = computed(() => {
    return '4.8'
  })
  
  const instructorReviews = computed(() => {
    return '3,245'
  })
  
  const instructorStudents = computed(() => {
    return '125,780'
  })
  
  const instructorCourses = computed(() => {
    return '8'
  })
  
  const offerEndsIn = computed(() => {
    return '01h 56m 44s'
  })
  
  // Methods
  const toggleSection = (index: number) => {
    courseSections.value[index].isOpen = !courseSections.value[index].isOpen
  }
  
  const playCourseVideo = () => {
    isVideoModalOpen.value = true
  }
  
  const closeVideoModal = () => {
    isVideoModalOpen.value = false
  }
  
  const scrollToEnroll = () => {
    const enrollButton = document.getElementById('enroll-button')
    if (enrollButton) {
      enrollButton.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  const handleScroll = () => {
    if (courseHeader.value) {
      isHeaderSticky.value = window.scrollY > 100
    }
  }
  
  const getRandomDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June']
    const month = months[Math.floor(Math.random() * months.length)]
    return `${month} 2023`
  }
  
  const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement
    target.src = '/placeholder.svg?height=400&width=300'
  }
  
  // Lifecycle hooks
  const scrollListener = ref(null)
  
  onMounted(() => {
    scrollListener.value = () => handleScroll()
    window.addEventListener('scroll', scrollListener.value)
    handleScroll()
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', scrollListener.value)
  })
  </script>
  
  <style scoped>
  /* Animations */
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) rotate(0); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
  
  @keyframes float-medium {
  0% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0); }
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
  
  /* Line clamp for titles */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>