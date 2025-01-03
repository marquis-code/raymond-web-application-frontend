<!-- components/AppFooter.vue -->
<template>
    <footer class="bg-[#1d4449] text-white pt-20 pb-8 px-4 sm:px-6 lg:px-8">
      <!-- Download Section -->
      <div class="max-w-7xl mx-auto mb-20">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-3xl  font-bold mb-4">Available on web and mobile</h2>
            <p class="text-gray-400 mb-8 max-w-md">
              Register to use CoMiles on web or click the links below to download the CoMiles mobile application.
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="#" class="h-12">
                <img src="@/assets/icons/ios-store.svg" alt="Download on App Store" class="h-full" />
              </a>
              <a href="#" class="h-12">
                <img src="@/assets/icons/play-store.svg" alt="Get it on Google Play" class="h-full" />
              </a>
            </div>
          </div>
          <div class="relative h-[400px] md:h-[500px]">
            <img 
              src="@/assets/img/comiles-desktop-mockup.png" 
              alt="CoMiles on devices" 
              class="absolute right-0 top-1/2 transform -translate-y-1/2 max-w-none w-auto h-72 object-contain"
            />
            <img 
              src="@/assets/img/mockup.jpeg" 
              alt="CoMiles on devices" 
              class="absolute right-0 top-1/2 transform rounded-lg -translate-y-1/2 max-w-none w-auto h-60 object-contain"
            />
          </div>
        </div>
      </div>
  
      <div class="max-w-7xl mx-auto">
        <!-- Divider -->
        <div class="h-px bg-gray-800 mb-16"></div>
  
        <!-- Main Footer Content -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          <!-- Brand Column -->
          <div class="lg:col-span-1">
            <img src="@/assets/img/logo_main_white.png" alt="CoMiles" class="h-8 mb-4" />
            <p class="text-gray-400 mb-6">CoMiles – Elevating Ride Experiences</p>
            <div class="flex gap-4">
              <a href="https://www.linkedin.com/company/comiles-technologies/" class="text-gray-400 hover:text-white">
                <img src="@/assets/icons/white-linkedin.svg" alt="LinkedIn" class="h-6 w-6" />
              </a>
              <!-- <a href="#" class="text-gray-400 hover:text-white">
                <img src="@/assets/icons/white-facebook.svg" alt="Facebook" class="h-6 w-6" />
              </a> -->
              <!-- <a href="#" class="text-gray-400 hover:text-white">
                <img src="@/assets/icons/white-instagram.svg" alt="Instagram" class="h-6 w-6" />
              </a> -->
              <a href="https://x.com/CoMiles_Tech?t=qdlVCb2Rt_-JheB3qgA53g&s=08" class="text-gray-400 hover:text-white">
                <img src="@/assets/icons/white-twitter.svg" alt="X" class="h-6 w-6" />
              </a>
            </div>
          </div>
  
          <!-- Solutions Column -->
          <div>
            <h3 class="font-semibold mb-4">Solutions</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-400 hover:text-white">Private Rides</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Route share</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Delivery</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Schedule</a></li>
              <!-- <li><a href="#" class="text-gray-400 hover:text-white">Drive for us</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Vehicle Partner</a></li> -->
            </ul>
          </div>
  
          <!-- Products Column -->
          <!-- <div>
            <h3 class="font-semibold mb-4">Products</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-400 hover:text-white">Pilot</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Vehicle partner</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Marshal</a></li>
            </ul>
          </div> -->
  
          <!-- Policies Column -->
          <div>
            <h3 class="font-semibold mb-4">Policies</h3>
            <ul class="space-y-3">
              <li><a href="https://www.freeprivacypolicy.com/live/a1dc564a-a3ad-4a1f-8169-894f91eab58d" class="text-gray-400 hover:text-white">Terms of use</a></li>
              <li><a href="https://www.freeprivacypolicy.com/live/1a78f921-f078-45cc-ac85-907382cb8072" class="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <!-- <li><a href="#" class="text-gray-400 hover:text-white">Refund Policy</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Behavior Policy</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Charter terms</a></li> -->
            </ul>
          </div>
  
          <!-- Resources Column -->
          <div>
            <h3 class="font-semibold mb-4">Resources</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">FAQs</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">CoMiles community</a></li>
            </ul>
          </div>
        </div>
  
        <!-- Copyright -->
        <div class="text-gray-400 text-sm">
          © {{ new Date().getFullYear() }} CoMiles. All rights reserved.
        </div>
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  // No additional logic needed for this component
  </script>
  
  <style scoped>
  /* Any custom styles can be added here if needed */
  </style>