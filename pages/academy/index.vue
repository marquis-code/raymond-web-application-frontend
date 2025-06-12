<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Floating background elements -->
    <div class="fixed w-full h-full pointer-events-none overflow-hidden">
      <div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 blur-xl animate-float-slow"></div>
      <div class="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-20 blur-xl animate-float-medium"></div>
      <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-20 blur-xl animate-float-fast"></div>
      <div class="absolute top-1/2 left-1/3 w-28 h-28 bg-gradient-to-r from-orange-300 to-red-300 rounded-full opacity-15 blur-xl animate-float-reverse"></div>
    </div>
    
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100"></div>
      
      <div class="relative max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="animate-slide-in-left">
            <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 text-sm font-medium mb-6 animate-bounce-gentle">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              Premium Art Education Platform
            </div>
            
            <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-x">
                Master Your
              </span>
              <br>
              <span class="text-gray-800">Creative Journey</span>
            </h1>
            
            <p class="text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed">
              Transform your artistic vision into reality with our comprehensive courses. Learn from industry professionals and join a community of passionate creators building successful art careers.
            </p>
            
            <div class="flex flex-wrap gap-4 mb-8">
              <a 
                href="#courses" 
                class="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Courses
                <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </a>
              
              <a 
                href="https://www.youtube.com/@raymondaworo/shorts" 
                target="_blank"
                class="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg class="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
                Watch Tutorials
              </a>
            </div>
            
            <div class="flex items-center space-x-8 text-sm text-gray-500">
              <div class="flex items-center">
                <div class="flex -space-x-2 mr-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full border-2 border-white"></div>
                  <div class="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white"></div>
                </div>
                <span>10,000+ Students</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
          
          <div class="relative animate-slide-in-right">
            <div class="absolute -inset-4 bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl blur-lg opacity-30 animate-pulse-slow"></div>
            <div class="relative aspect-video bg-white rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 border border-gray-100">
              <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
                <button 
                  @click="playIntroVideo"
                  class="group w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                >
                  <svg class="w-10 h-10 text-purple-600 ml-1 group-hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
              <img 
                src="@/assets/img/commission.jpg" 
                alt="Video Thumbnail" 
                class="w-full h-full object-cover opacity-80"
                @error="handleImageError"
              />
              <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div class="flex items-center justify-between text-white">
                  <div>
                    <h3 class="font-semibold text-lg">Welcome to Art Academy</h3>
                    <p class="text-sm opacity-90">Discover your creative potential</p>
                  </div>
                  <span class="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">03:45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Stats Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center animate-fade-in-up" style="animation-delay: 0.1s">
            <div class="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50+</div>
            <div class="text-gray-600">Expert Courses</div>
          </div>
          <div class="text-center animate-fade-in-up" style="animation-delay: 0.2s">
            <div class="text-3xl md:text-4xl font-bold text-pink-600 mb-2">10K+</div>
            <div class="text-gray-600">Happy Students</div>
          </div>
          <div class="text-center animate-fade-in-up" style="animation-delay: 0.3s">
            <div class="text-3xl md:text-4xl font-bold text-blue-600 mb-2">95%</div>
            <div class="text-gray-600">Success Rate</div>
          </div>
          <div class="text-center animate-fade-in-up" style="animation-delay: 0.4s">
            <div class="text-3xl md:text-4xl font-bold text-green-600 mb-2">24/7</div>
            <div class="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Courses Section -->
    <section id="courses" class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Discover Our 
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Premium Courses
            </span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            From beginner fundamentals to advanced techniques, our expertly crafted courses will guide you through every step of your artistic journey.
          </p>
        </div>
        
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-6">
          <div class="relative animate-slide-in-left">
            <input 
              type="text" 
              placeholder="Search courses, instructors, or topics..." 
              class="w-full lg:w-96 px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-700 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 shadow-lg"
              v-model="searchQuery"
            />
            <svg class="w-6 h-6 absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          
          <div class="flex items-center space-x-2 animate-slide-in-right">
            <span class="text-gray-600 font-medium">Filter by:</span>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="category in categories.slice(0, 4)" 
                :key="category.id"
                @click="setActiveCategory(category.id)"
                class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105"
                :class="activeCategory === category.id 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'"
              >
                {{ category.name }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Category filters -->
        <div class="mb-12 overflow-x-auto scrollbar-hide animate-fade-in-up">
          <div class="flex space-x-3 min-w-max pb-2">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="setActiveCategory(category.id)"
              class="px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105"
              :class="activeCategory === category.id 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300'"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
        
        <!-- Featured Courses Section -->
        <div v-if="activeCategory === 0 && featuredCourses.length > 0" class="mb-20">
          <div class="flex items-center mb-8">
            <div class="flex items-center">
              <div class="w-1 h-8 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full mr-4"></div>
              <h3 class="text-3xl font-bold text-gray-800">Featured Courses</h3>
            </div>
            <div class="ml-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full animate-pulse">
              POPULAR
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="(course, index) in featuredCourses" 
              :key="course._id"
              class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:translate-y-[-12px] transition-all duration-500 border border-gray-100 animate-fade-in-up"
              :style="`animation-delay: ${index * 0.1}s`"
            >
              <div class="relative overflow-hidden">
                <img 
                  :src="course.imageUrl || '/placeholder.svg?height=300&width=400'" 
                  :alt="course.title" 
                  class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  @error="handleImageError"
                />
                <div class="absolute top-4 left-4">
                  <span class="inline-block px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg animate-bounce-gentle">
                    ⭐ FEATURED
                  </span>
                </div>
                <div class="absolute top-4 right-4">
                  <button class="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
                    <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <span class="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                    {{ course.level || 'All Levels' }}
                  </span>
                  <div class="flex items-center text-yellow-400">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="text-gray-600 text-sm font-medium">{{ course.rating || 95 }}%</span>
                  </div>
                </div>
                
                <h4 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {{ course.title }}
                </h4>
                <p class="text-gray-500 text-sm mb-4">
                  by {{ course.instructor?.fullName || course.instructor || 'Expert Instructor' }}
                </p>
                
                <div class="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <span>{{ course.totalLessons || 12 }} lessons</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{{ formatDuration(course.durationInMinutes || 180) }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <span>{{ course.enrollmentCount || 1250 }} students</span>
                  </div>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-2xl font-bold text-purple-600">
                      ${{ (course.discountPrice || course.salePrice || course.regularPrice || course.price || 49)?.toFixed(2) }}
                    </span>
                    <span v-if="course.regularPrice && course.regularPrice > (course.discountPrice || course.salePrice)" 
                          class="text-gray-400 text-lg line-through">
                      ${{ course.regularPrice?.toFixed(2) }}
                    </span>
                  </div>
                  
                  <NuxtLink 
                    :to="`/academy/course/${course._id || course.id}`" 
                    class="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Enroll Now
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- All Courses Section -->
        <div>
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center">
              <div class="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-4"></div>
              <h3 class="text-3xl font-bold text-gray-800">{{ getCategoryName(activeCategory) }}</h3>
            </div>
            <div class="text-gray-500">
              {{ filteredCourses.length }} course{{ filteredCourses.length !== 1 ? 's' : '' }} found
            </div>
          </div>
          
          <div v-if="loading" class="text-center py-20">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-spin mb-4">
              <div class="w-12 h-12 bg-white rounded-full"></div>
            </div>
            <p class="text-xl text-gray-600">Loading amazing courses...</p>
          </div>
          
          <div v-else-if="filteredCourses.length === 0" class="text-center py-20">
            <div class="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">No courses found</h3>
            <p class="text-xl text-gray-500 mb-6">
              {{ searchQuery ? `No results for "${searchQuery}"` : 'No courses available in this category' }}
            </p>
            <button 
              @click="searchQuery = ''; setActiveCategory(0)" 
              class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              View All Courses
            </button>
          </div>
          
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="(course, index) in filteredCourses" 
              :key="course._id || course.id"
              class="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:translate-y-[-8px] transition-all duration-500 border border-gray-100 animate-fade-in-up"
              :style="`animation-delay: ${index * 0.05}s`"
            >
              <div class="relative overflow-hidden">
                <img 
                  :src="course.thumbnail || course.imageUrl || '/placeholder.svg?height=300&width=400'" 
                  :alt="course.title" 
                  class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  @error="handleImageError"
                />
                <div v-if="course.isFeatured || course.isBestSeller" class="absolute top-4 left-4">
                  <span class="inline-block px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full shadow-lg">
                    ⭐ FEATURED
                  </span>
                </div>
                <div v-if="course.level" class="absolute top-4 right-4">
                  <span class="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full capitalize shadow-lg">
                    {{ course.level }}
                  </span>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center text-yellow-400">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="text-gray-600 text-sm font-medium">{{ course.averageRating || course.rating || 95 }}%</span>
                    <span class="text-gray-400 text-sm ml-1">({{ course.reviewCount || 127 }})</span>
                  </div>
                  <button class="w-8 h-8 bg-gray-100 hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors">
                    <svg class="w-4 h-4 text-gray-600 hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                </div>
                
                <h4 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {{ course.title }}
                </h4>
                <p class="text-gray-500 text-sm mb-2">
                  by {{ course.instructor?.fullName || course.instructor || 'Expert Instructor' }}
                </p>
                <p class="text-gray-400 text-xs mb-4 line-clamp-2">{{ course.description }}</p>
                
                <div class="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                    <span>{{ course.totalLessons || 8 }} lessons</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{{ formatDuration(course.durationInMinutes || 120) }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <span>{{ course.enrollmentCount || course.studentCount || 856 }}</span>
                  </div>
                </div>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <span class="text-2xl font-bold text-purple-600">
                      ${{ (course.discountPrice || course.salePrice || course.regularPrice || course.price || 39)?.toFixed(2) }}
                    </span>
                    <span v-if="course.regularPrice && course.regularPrice > (course.discountPrice || course.salePrice)" 
                          class="text-gray-400 text-lg line-through">
                      ${{ course.regularPrice?.toFixed(2) }}
                    </span>
                  </div>
                  
                  <NuxtLink 
                    :to="`/academy/course/${course._id || course.id}`" 
                    class="group inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    View Course
                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16 animate-fade-in-up">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What Our 
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Students Say
            </span>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of artists who have transformed their creative journey with our courses.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg hover:shadow-xl transform hover:translate-y-[-4px] transition-all duration-300 animate-fade-in-up"
            :style="`animation-delay: ${index * 0.1}s`"
          >
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                {{ testimonial.name.charAt(0) }}
              </div>
              <div>
                <h4 class="font-bold text-gray-800">{{ testimonial.name }}</h4>
                <p class="text-gray-600 text-sm">{{ testimonial.title }}</p>
              </div>
            </div>
            
            <div class="flex text-yellow-400 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            
            <p class="text-gray-700 mb-4 leading-relaxed">{{ testimonial.text }}</p>
            
            <div class="text-sm text-purple-600 font-semibold">
              Course: {{ testimonial.course }}
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 relative overflow-hidden">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float-slow"></div>
        <div class="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float-medium"></div>
        <div class="absolute top-1/2 left-1/2 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float-fast"></div>
      </div>
      
      <div class="relative max-w-5xl mx-auto text-center">
        <h2 class="text-4xl md:text-6xl font-bold mb-6 text-white animate-fade-in-up">
          Ready to Start Your
          <br>
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
            Creative Journey?
          </span>
        </h2>
        
        <p class="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style="animation-delay: 0.1s">
          Join our community of passionate artists and unlock your creative potential with expert-led courses, personalized feedback, and lifetime access to our learning platform.
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up" style="animation-delay: 0.2s">
          <a 
            href="#courses" 
            class="group inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Learning Today
            <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
          
          <NuxtLink 
            to="/contact" 
            class="group inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-2xl hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Get in Touch
          </NuxtLink>
        </div>
        
        <div class="mt-12 flex items-center justify-center space-x-8 text-white/80 animate-fade-in-up" style="animation-delay: 0.3s">
          <div class="flex items-center">
            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>Lifetime Access</span>
          </div>
          <div class="flex items-center">
            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Certificate of Completion</span>
          </div>
          <div class="flex items-center">
            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
            </svg>
            <span>Expert Support</span>
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
          <div class="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true"></div>
          
          <div 
            class="relative bg-white rounded-3xl max-w-4xl w-full aspect-video overflow-hidden shadow-2xl border border-gray-200"
            @click.stop
          >
            <div class="absolute top-4 right-4 z-10">
              <button 
                @click="closeVideoModal" 
                class="rounded-full p-3 bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-gray-800 transition-all duration-300 shadow-lg"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/9Cum1pxm3bM?autoplay=1" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              class="rounded-3xl"
            ></iframe>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGetCourses } from "@/composables/modules/courses/useGetCourses"

const { courses, loading, getCourses } = useGetCourses()

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

// // Mock composable for demo purposes
// const useGetCourses = () => {
//   const courses = ref<Course[]>([
//     {
//       _id: '1',
//       title: 'Mastering Digital Portrait Art',
//       slug: 'mastering-digital-portrait-art',
//       description: 'Learn to create stunning digital portraits with professional techniques and industry secrets.',
//       longDescription: 'This comprehensive course will take you from beginner to advanced in digital portrait creation.',
//       price: 89.99,
//       discountPrice: 59.99,
//       thumbnail: '/placeholder.svg?height=300&width=400',
//       previewVideo: '',
//       tags: ['digital art', 'portrait', 'advanced'],
//       status: 'published',
//       sections: [],
//       instructor: { _id: '1', email: 'instructor@example.com', fullName: 'Sarah Johnson', id: '1' },
//       enrollmentCount: 1250,
//       totalLessons: 24,
//       durationInMinutes: 480,
//       requirements: ['Basic drawing skills', 'Digital art software'],
//       objectives: ['Create professional portraits', 'Master lighting techniques'],
//       level: 'intermediate',
//       isFeatured: true,
//       averageRating: 96,
//       reviewCount: 234,
//       createdAt: '2024-01-01',
//       updatedAt: '2024-01-01',
//       __v: 0
//     },
//     {
//       _id: '2',
//       title: 'Watercolor Fundamentals',
//       slug: 'watercolor-fundamentals',
//       description: 'Master the basics of watercolor painting with step-by-step guidance.',
//       longDescription: 'Perfect for beginners who want to learn watercolor painting from scratch.',
//       price: 49.99,
//       discountPrice: 29.99,
//       thumbnail: '/placeholder.svg?height=300&width=400',
//       previewVideo: '',
//       tags: ['watercolor', 'painting', 'beginner'],
//       status: 'published',
//       sections: [],
//       instructor: { _id: '2', email: 'instructor2@example.com', fullName: 'Michael Chen', id: '2' },
//       enrollmentCount: 856,
//       totalLessons: 16,
//       durationInMinutes: 320,
//       requirements: ['Basic art supplies'],
//       objectives: ['Understand watercolor techniques', 'Create beautiful paintings'],
//       level: 'beginner',
//       isFeatured: false,
//       averageRating: 94,
//       reviewCount: 156,
//       createdAt: '2024-01-01',
//       updatedAt: '2024-01-01',
//       __v: 0
//     },
//     {
//       _id: '3',
//       title: 'Art Business Mastery',
//       slug: 'art-business-mastery',
//       description: 'Turn your artistic passion into a profitable business with proven strategies.',
//       longDescription: 'Learn how to market, price, and sell your artwork successfully.',
//       price: 129.99,
//       discountPrice: 89.99,
//       thumbnail: '/placeholder.svg?height=300&width=400',
//       previewVideo: '',
//       tags: ['business', 'marketing', 'entrepreneurship'],
//       status: 'published',
//       sections: [],
//       instructor: { _id: '3', email: 'instructor3@example.com', fullName: 'Emma Rodriguez', id: '3' },
//       enrollmentCount: 642,
//       totalLessons: 32,
//       durationInMinutes: 640,
//       requirements: ['Existing artwork portfolio'],
//       objectives: ['Build a successful art business', 'Master marketing strategies'],
//       level: 'intermediate',
//       isFeatured: true,
//       averageRating: 98,
//       reviewCount: 89,
//       createdAt: '2024-01-01',
//       updatedAt: '2024-01-01',
//       __v: 0
//     }
//   ])
  
//   const loading = ref(false)
  
//   return { courses, loading }
// }

// const { courses, loading } = useGetCourses()

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
    title: 'Professional Artist',
    text: 'The courses here completely transformed my approach to digital art. The instructors are incredibly knowledgeable and the community is so supportive. I\'ve seen my skills improve dramatically in just a few months.',
    course: 'Mastering Digital Portrait Art'
  },
  {
    name: 'Jennifer Williams',
    title: 'Art Student',
    text: 'As someone new to watercolor, I was amazed at how quickly I progressed. The step-by-step approach made everything so clear and achievable. I\'m now confident in my painting abilities.',
    course: 'Watercolor Fundamentals'
  },
  {
    name: 'David Chen',
    title: 'Creative Entrepreneur',
    text: 'The Art Business course gave me the tools and confidence to turn my passion into a profitable venture. Within months, I had my first major commission and a steady stream of clients.',
    course: 'Art Business Mastery'
  }
])

// Helper function to get category ID based on tags or title
const getCategoryIdFromCourse = (course: Course): number => {
  const title = course.title.toLowerCase()
  const tags = course.tags.map(tag => tag.toLowerCase())
  
  if (tags.some(tag => tag.includes('portrait')) || title.includes('portrait')) {
    return 4 // Portrait Art
  }
  if (title.includes('digital') || tags.some(tag => tag.includes('digital'))) {
    return 2 // Digital Art
  }
  if (title.includes('business') || title.includes('marketing')) {
    return 5 // Art Business
  }
  if (title.includes('painting') || title.includes('watercolor') || title.includes('acrylic')) {
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

// Transform courses data
const transformedCourses = computed(() => {
  return courses.value.map((course: Course) => ({
    ...course,
    id: course._id,
    categoryId: getCategoryIdFromCourse(course),
    isBestSeller: course.isFeatured,
    studentCount: course.enrollmentCount,
    rating: course.averageRating,
    imageUrl: course.thumbnail,
    regularPrice: course.price,
    salePrice: course.discountPrice
  }))
})

// Computed properties
const featuredCourses = computed(() => {
  return transformedCourses.value.filter(course => course.isFeatured).slice(0, 3)
})

const filteredCourses = computed(() => {
  let filtered = transformedCourses.value

  if (activeCategory.value !== 0) {
    filtered = filtered.filter(course => course.categoryId === activeCategory.value)
  }
  
  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(course => course.title.toLowerCase().includes(query) || course.instructor.fullName.toLowerCase().includes(query) || course.description.toLowerCase().includes(query) || course.tags.some(tag => tag.toLowerCase().includes(query)))
  }
  return filtered
})


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

// Format duration
const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours > 0) {
    return `${hours}h ${mins}m`
  }
  return `${mins}m`
}
</script>

<style scoped>
/* Custom Animations */
@keyframes float-slow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes float-medium {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(-3deg); }
}

@keyframes float-fast {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

@keyframes float-reverse {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(15px) rotate(-2deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes bounce-gentle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes slide-in-left {
  0% { transform: translateX(-50px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes slide-in-right {
  0% { transform: translateX(50px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes fade-in-up {
  0% { transform: translateY(30px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
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

.animate-float-reverse {
  animation: float-reverse 7s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-bounce-gentle {
  animation: bounce-gentle 2s ease-in-out infinite;
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

.animate-slide-in-left {
  animation: slide-in-left 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slide-in-right 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

/* Hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom gradient backgrounds */
.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

/* Enhanced hover effects */
.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

.group:hover .group-hover\:text-purple-600 {
  color: rgb(147 51 234);
}

.group:hover .group-hover\:text-pink-600 {
  color: rgb(219 39 119);
}

/* Custom focus styles */
input:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(147, 51, 234, 0.1);
}

/* Responsive design enhancements */
@media (max-width: 768px) {
  .animate-slide-in-left,
  .animate-slide-in-right {
    animation: fade-in-up 0.6s ease-out forwards;
  }
}
</style>


