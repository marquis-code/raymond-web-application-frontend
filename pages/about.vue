<template>
    <div class="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-100">
      <!-- Hero Section -->
      <section class="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div class="absolute -top-40 -right-40 w-96 h-96 bg-amber-100 rounded-full opacity-30 blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-100 rounded-full opacity-30 blur-3xl"></div>
        
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="order-2 lg:order-1 bg-gray-800 text-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:shadow-rose-100/20 hover:shadow-2xl">
              <h1 class="text-4xl font-bold mb-6">ABOUT</h1>
              
              <div class="space-y-6 text-gray-200">
                <p>
                  Raymond Aworo (born in 1999) is a hyper-realistic visual artist and also a medical 
                  doctor in training who was born in Nigeria. He started drawing at the age of 12. He's a self-taught 
                  artist who expresses in charcoal, pastel and acrylic paint and also nature photography.
                </p>
                
                <p>
                  He draws inspiration primarily from his Faith(Christianity), personal life struggles 
                  and immediate environment.
                </p>
                
                <p>
                  As he continues to explore his creativity and perfect his style, Raymond has debuted his 
                  works at few exhibitions while working on more international exhibitions.
                </p>
                
                <p>
                  He enjoys listening to music, eating, playing football, editing videos and creating content 
                  for his fans on social media.
                </p>
              </div>
            </div>
            
            <div class="order-1 lg:order-2 relative">
              <div class="relative">
                <div class="absolute inset-0 bg-amber-100 rounded-lg transform rotate-6"></div>
                <img 
                  src="@/assets/img/artist.avif" 
                  alt="Artist Portrait" 
                  class="relative z-10 rounded-lg shadow-xl w-full h-auto transform -rotate-6 transition-transform duration-500 hover:rotate-0"
                  @error="handleImageError"
                />
              </div>
              
              <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-100 rounded-full flex items-center justify-center transform rotate-12 shadow-lg">
                <span class="text-rose-800 font-bold text-lg text-center px-4">Hyper-Realistic Artist</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Journey Section -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-16 text-gray-800 relative inline-block">
            My Artistic Journey
            <span class="absolute -bottom-2 left-0 w-full h-1 bg-amber-400"></span>
          </h2>
          
          <div class="relative">
            <!-- Timeline Line -->
            <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            
            <!-- Timeline Items -->
            <div class="space-y-16">
              <div class="relative">
                <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-500 border-4 border-white shadow"></div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="md:text-right md:pr-12">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">2011</h3>
                    <p class="text-gray-600">Started drawing at the age of 12, discovering a natural talent for capturing details.</p>
                  </div>
                  <div class="md:pl-12">
                    <div class="bg-gray-100 p-4 rounded-lg">
                      <p class="text-gray-700 italic">"I remember my first drawing was of my mother. It wasn't perfect, but it sparked my passion for art."</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="relative">
                <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-500 border-4 border-white shadow"></div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="md:text-right md:pr-12 md:order-1 order-2">
                    <div class="bg-gray-100 p-4 rounded-lg">
                      <p class="text-gray-700 italic">"Medical school taught me discipline and attention to detail that I apply to my artwork."</p>
                    </div>
                  </div>
                  <div class="md:pl-12 md:order-2 order-1">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">2017</h3>
                    <p class="text-gray-600">Began medical school while continuing to develop artistic skills in parallel.</p>
                  </div>
                </div>
              </div>
              
              <div class="relative">
                <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow"></div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="md:text-right md:pr-12">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">2020</h3>
                    <p class="text-gray-600">First local exhibition showcasing hyper-realistic portraits and nature studies.</p>
                  </div>
                  <div class="md:pl-12">
                    <div class="bg-gray-100 p-4 rounded-lg">
                      <p class="text-gray-700 italic">"Seeing people's reactions to my work was both terrifying and exhilarating."</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="relative">
                <div class="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-purple-500 border-4 border-white shadow"></div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div class="md:text-right md:pr-12 md:order-1 order-2">
                    <div class="bg-gray-100 p-4 rounded-lg">
                      <p class="text-gray-700 italic">"I'm excited to share my art with the world and connect with people through my creations."</p>
                    </div>
                  </div>
                  <div class="md:pl-12 md:order-2 order-1">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Present</h3>
                    <p class="text-gray-600">Working on international exhibitions while balancing medical training and artistic pursuits.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Skills & Expertise -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-16 text-gray-800 relative inline-block">
            Skills & Expertise
            <span class="absolute -bottom-2 left-0 w-full h-1 bg-rose-400"></span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Charcoal Drawing</h3>
              <p class="text-gray-600">Specializing in hyper-realistic charcoal portraits that capture the essence and emotion of subjects.</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div class="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Pastel Art</h3>
              <p class="text-gray-600">Creating vibrant and expressive pastel artworks with rich textures and depth.</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Acrylic Painting</h3>
              <p class="text-gray-600">Mastering acrylic techniques to create stunning portraits and landscapes with bold colors.</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Nature Photography</h3>
              <p class="text-gray-600">Capturing the beauty of natural landscapes and wildlife through a unique artistic lens.</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Creative Direction</h3>
              <p class="text-gray-600">Providing artistic vision and direction for collaborative projects and exhibitions.</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-3">Art Education</h3>
              <p class="text-gray-600">Sharing knowledge and techniques through workshops and online tutorials for aspiring artists.</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Testimonials -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-center mb-16 text-gray-800 relative inline-block">
            What Clients Say
            <span class="absolute -bottom-2 left-0 w-full h-1 bg-emerald-400"></span>
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-gray-50 p-6 rounded-xl shadow-md">
              <div class="flex items-center mb-4">
                <div class="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div class="ml-4">
                  <h4 class="font-bold text-gray-800">Sarah Johnson</h4>
                  <p class="text-gray-500 text-sm">New York, USA</p>
                </div>
              </div>
              <!-- <div class="mb-4"></div> -->
              <p class="text-gray-600 italic">
                "Raymond's attention to detail is extraordinary. The portrait he created of my daughter captures not just her likeness, but her spirit. It's a treasure we'll cherish forever."
              </p>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-xl shadow-md">
              <div class="flex items-center mb-4">
                <div class="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div class="ml-4">
                  <h4 class="font-bold text-gray-800">Michael Thompson</h4>
                  <p class="text-gray-500 text-sm">London, UK</p>
                </div>
              </div>
              <div class="mb-4">
                <div class="flex text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "I commissioned a family portrait as an anniversary gift, and it exceeded all expectations. Raymond's ability to capture personalities through his art is truly remarkable."
              </p>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-xl shadow-md">
              <div class="flex items-center mb-4">
                <div class="h-12 w-12 bg-gray-200 rounded-full"></div>
                <div class="ml-4">
                  <h4 class="font-bold text-gray-800">Amara Okafor</h4>
                  <p class="text-gray-500 text-sm">Lagos, Nigeria</p>
                </div>
              </div>
              <div class="mb-4">
                <div class="flex text-amber-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <p class="text-gray-600 italic">
                "Working with Raymond was a pleasure from start to finish. His professionalism and artistic vision brought my ideas to life in ways I couldn't have imagined."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Call to Action -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white">
        <div class="max-w-5xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Commission Your Own Artwork?</h2>
          <p class="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Transform your ideas, memories, and emotions into a timeless piece of art that you'll cherish for years to come.
          </p>
          
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/commission" 
              class="inline-flex items-center justify-center px-8 py-3 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors duration-300"
            >
              Commission Now
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
            
            <a 
              href="/contact" 
              class="inline-flex items-center justify-center px-8 py-3 bg-transparent text-white font-medium rounded-md border border-white hover:bg-white hover:text-gray-800 transition-colors duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const handleImageError = (event: Event) => {
    // Fallback for image loading errors
    const target = event.target as HTMLImageElement
    target.src = '/placeholder.svg?height=400&width=300'
  }
  </script>
  
  <style scoped>
  /* Optional: Add any additional custom styles here */
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