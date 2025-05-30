<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <!-- Header Section -->
      <header class="w-full py-6 px-4 md:px-8 bg-white/80 backdrop-blur-sm shadow-md">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
          <h1 class="text-2xl md:text-3xl font-bold text-indigo-800">
            <span class="inline-block animate-pulse">Privacy</span> Policy
          </h1>
          <div class="hidden md:block">
            <button class="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </header>
  
      <!-- Main Content -->
      <main class="max-w-6xl mx-auto py-8 px-4 md:px-8">
        <!-- Introduction with animation -->
        <section 
          class="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8 transform transition-all duration-700"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
          ref="introSection"
        >
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="md:w-1/2">
              <h2 class="text-2xl md:text-3xl font-bold text-indigo-800 mb-4">Privacy Matters To Us</h2>
              <p class="text-gray-700 mb-4">
                At our website, accessible from www.raymondaworoart.com, one of our main priorities is the privacy 
                of our visitors. This Privacy Policy document contains types of information that is collected and 
                recorded by us and how we use it.
              </p>
              <p class="text-gray-700">
                This Privacy Policy applies only to our online activities and is valid for visitors to our website 
                with regards to the information that they shared and/or collect in Raymond Aworo Art. This policy 
                is not applicable to any information collected offline or via channels other than this website.
              </p>
            </div>
            <div class="md:w-1/2 flex justify-center">
              <svg class="w-60 h-60" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="#EEF2FF" />
                <g class="animate-bounce">
                  <rect x="70" y="60" width="60" height="80" rx="6" fill="#C7D2FE" />
                  <rect x="80" y="75" width="40" height="6" rx="2" fill="#4F46E5" />
                  <rect x="80" y="90" width="30" height="6" rx="2" fill="#4F46E5" />
                  <rect x="80" y="105" width="40" height="6" rx="2" fill="#4F46E5" />
                  <rect x="80" y="120" width="20" height="6" rx="2" fill="#4F46E5" />
                </g>
                <path d="M120 40 L140 60 L120 60 Z" fill="#818CF8" class="animate-spin origin-center" style="animation-duration: 10s;" />
              </svg>
            </div>
          </div>
        </section>
  
        <!-- Consent Section -->
        <section 
          class="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8 transform transition-all duration-700 delay-100"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
          ref="consentSection"
        >
          <h2 class="text-2xl font-bold text-indigo-800 mb-4">Consent</h2>
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="md:w-2/3">
              <p class="text-gray-700">
                By using our website, you hereby consent to our Privacy Policy and agree to its terms.
              </p>
            </div>
            <div class="md:w-1/3 flex justify-center">
              <svg class="w-40 h-40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="#EEF2FF" />
                <g class="animate-pulse">
                  <path d="M35 50 L45 60 L65 40" stroke="#4F46E5" stroke-width="4" fill="none" />
                </g>
              </svg>
            </div>
          </div>
        </section>
  
        <!-- Information We Collect -->
        <section 
          class="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8 transform transition-all duration-700 delay-200"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
          ref="infoSection"
        >
          <h2 class="text-2xl font-bold text-indigo-800 mb-4">Information We Collect</h2>
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="md:w-1/3 order-2 md:order-1 flex justify-center">
              <svg class="w-48 h-48" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="#EEF2FF" />
                <g>
                  <rect x="40" y="30" width="40" height="60" rx="4" fill="#C7D2FE" />
                  <rect x="45" y="40" width="30" height="5" rx="1" fill="#4F46E5" />
                  <rect x="45" y="50" width="30" height="5" rx="1" fill="#4F46E5" />
                  <rect x="45" y="60" width="20" height="5" rx="1" fill="#4F46E5" />
                  <rect x="45" y="70" width="30" height="5" rx="1" fill="#4F46E5" />
                  <circle cx="72" cy="30" r="10" fill="#818CF8" class="animate-ping opacity-75" style="animation-duration: 3s" />
                </g>
              </svg>
            </div>
            <div class="md:w-2/3 order-1 md:order-2">
              <p class="text-gray-700 mb-4">
                The personal information that you are asked to provide, and the reasons why you are asked 
                to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <p class="text-gray-700 mb-4">We may collect the following information:</p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                <li class="transform hover:translate-x-1 transition-transform">Name and job title</li>
                <li class="transform hover:translate-x-1 transition-transform">Contact information including email address and social media accounts</li>
                <li class="transform hover:translate-x-1 transition-transform">Demographic information such as postcode, preferences and interests</li>
                <li class="transform hover:translate-x-1 transition-transform">Other information relevant to customer surveys and/or offers</li>
                <li class="transform hover:translate-x-1 transition-transform">Any additional information/attachments provided by you</li>
              </ul>
            </div>
          </div>
        </section>
  
        <!-- How We Use Information -->
        <section 
          class="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8 transform transition-all duration-700 delay-300"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
          ref="usageSection"
        >
          <h2 class="text-2xl font-bold text-indigo-800 mb-4">How We Use Your Information</h2>
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="md:w-2/3">
              <p class="text-gray-700 mb-4">We use the information we collect in various ways, including to:</p>
              <ul class="list-disc pl-6 text-gray-700 space-y-2">
                <li class="transform hover:translate-x-1 transition-transform">Provide, operate, and maintain our website</li>
                <li class="transform hover:translate-x-1 transition-transform">Improve, personalize, and expand our website</li>
                <li class="transform hover:translate-x-1 transition-transform">Understand and analyze how you use our website</li>
                <li class="transform hover:translate-x-1 transition-transform">Develop new products, services, features, and functionality</li>
                <li class="transform hover:translate-x-1 transition-transform">Communicate with you for customer service, updates, and marketing</li>
                <li class="transform hover:translate-x-1 transition-transform">Send you emails</li>
                <li class="transform hover:translate-x-1 transition-transform">Find and prevent fraud</li>
              </ul>
            </div>
            <div class="md:w-1/3 flex justify-center">
              <svg class="w-48 h-48" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="#EEF2FF" />
                <g class="animate-spin origin-center" style="animation-duration: 20s">
                  <circle cx="60" cy="30" r="8" fill="#818CF8" />
                  <circle cx="85" cy="45" r="8" fill="#818CF8" />
                  <circle cx="85" cy="75" r="8" fill="#818CF8" />
                  <circle cx="60" cy="90" r="8" fill="#818CF8" />
                  <circle cx="35" cy="75" r="8" fill="#818CF8" />
                  <circle cx="35" cy="45" r="8" fill="#818CF8" />
                  <circle cx="60" cy="60" r="15" fill="#C7D2FE" />
                </g>
              </svg>
            </div>
          </div>
        </section>
  
        <!-- Log Files, Security, and Cookies -->
        <section 
          class="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8 transform transition-all duration-700 delay-400"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
          ref="logsSection"
        >
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-indigo-50 p-6 rounded-xl transition-transform transform hover:scale-105">
              <h3 class="text-xl font-bold text-indigo-800 mb-3">Log Files</h3>
              <p class="text-gray-700">
                We follow a standard procedure of using log files. These files log visitors when they visit websites.
                The information collected includes IP addresses, browser type, ISP, date and time stamps, 
                referring/exit pages, and clicks.
              </p>
              <div class="mt-4 flex justify-center">
                <svg class="w-20 h-20" viewBox="0 0 60 60">
                  <rect x="10" y="10" width="40" height="40" rx="3" fill="#C7D2FE" />
                  <rect x="15" y="15" width="30" height="4" rx="1" fill="#4F46E5" />
                  <rect x="15" y="24" width="30" height="4" rx="1" fill="#4F46E5" />
                  <rect x="15" y="33" width="20" height="4" rx="1" fill="#4F46E5" />
                  <rect x="15" y="42" width="30" height="4" rx="1" fill="#4F46E5" />
                </svg>
              </div>
            </div>
            
            <div class="bg-indigo-50 p-6 rounded-xl transition-transform transform hover:scale-105">
              <h3 class="text-xl font-bold text-indigo-800 mb-3">Security</h3>
              <p class="text-gray-700">
                We are committed to ensuring your information is secure. We have physical, electronic and managerial procedures
                to safeguard and secure the information we collect online.
              </p>
              <div class="mt-4 flex justify-center">
                <svg class="w-20 h-20" viewBox="0 0 60 60">
                  <rect x="15" y="20" width="30" height="30" rx="3" fill="#C7D2FE" />
                  <rect x="24" y="10" width="12" height="20" rx="6" fill="#818CF8" />
                  <circle cx="30" cy="35" r="5" fill="#4F46E5" class="animate-pulse" />
                </svg>
              </div>
            </div>
            
            <div class="bg-indigo-50 p-6 rounded-xl transition-transform transform hover:scale-105">
              <h3 class="text-xl font-bold text-indigo-800 mb-3">Cookies</h3>
              <p class="text-gray-700">
                Like any other website, we use 'cookies' to store information including visitors' preferences, 
                and the pages visited. This optimizes the users' experience by customizing our web page content.
              </p>
              <div class="mt-4 flex justify-center">
                <svg class="w-20 h-20" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="20" fill="#C7D2FE" />
                  <circle cx="23" cy="25" r="3" fill="#4F46E5" />
                  <circle cx="37" cy="25" r="3" fill="#4F46E5" />
                  <path d="M22 35 Q30 42 38 35" stroke="#4F46E5" stroke-width="3" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Third Party Policies -->
        <section 
          class="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8 transform transition-all duration-700 delay-500"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
          ref="thirdPartySection"
        >
          <h2 class="text-2xl font-bold text-indigo-800 mb-4">Third Party Privacy Policies</h2>
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="md:w-1/4 flex justify-center">
              <svg class="w-40 h-40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="#EEF2FF" />
                <g>
                  <circle cx="30" cy="50" r="15" fill="#C7D2FE" />
                  <circle cx="70" cy="50" r="15" fill="#C7D2FE" />
                  <circle cx="50" cy="50" r="10" fill="#818CF8" class="animate-pulse" />
                  <path d="M25 30 L75 30" stroke="#4F46E5" stroke-width="2" />
                  <path d="M25 70 L75 70" stroke="#4F46E5" stroke-width="2" />
                </g>
              </svg>
            </div>
            <div class="md:w-3/4">
              <p class="text-gray-700 mb-4">
                Our Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to 
                consult the respective Privacy Policies of these third-party ad servers for more detailed information.
                It may include their practices and instructions about how to opt-out of certain options.
              </p>
              <p class="text-gray-700">
                You can choose to disable cookies through your individual browser options. To know more detailed 
                information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
              </p>
            </div>
          </div>
        </section>
  
        <!-- GDPR Rights -->
        <section 
          class="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-8 transform transition-all duration-700 delay-600"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
          ref="gdprSection"
        >
          <h2 class="text-2xl font-bold text-indigo-800 mb-4">GDPR Data Protection Rights</h2>
          <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-2/3">
              <p class="text-gray-700 mb-4">
                We would like to make sure you are fully aware of all of your data protection rights. 
                Every user is entitled to the following:
              </p>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="bg-indigo-50 p-4 rounded-lg transform transition-transform hover:scale-105">
                  <h4 class="font-bold text-indigo-700">Right to Access</h4>
                  <p class="text-gray-700 text-sm">You have the right to request copies of your personal data.</p>
                </div>
                <div class="bg-indigo-50 p-4 rounded-lg transform transition-transform hover:scale-105">
                  <h4 class="font-bold text-indigo-700">Right to Rectification</h4>
                  <p class="text-gray-700 text-sm">You have the right to request that we correct any information you believe is inaccurate.</p>
                </div>
                <div class="bg-indigo-50 p-4 rounded-lg transform transition-transform hover:scale-105">
                  <h4 class="font-bold text-indigo-700">Right to Erasure</h4>
                  <p class="text-gray-700 text-sm">You have the right to request that we erase your personal data, under certain conditions.</p>
                </div>
                <div class="bg-indigo-50 p-4 rounded-lg transform transition-transform hover:scale-105">
                  <h4 class="font-bold text-indigo-700">Right to Restrict Processing</h4>
                  <p class="text-gray-700 text-sm">You have the right to request that we restrict the processing of your data.</p>
                </div>
                <div class="bg-indigo-50 p-4 rounded-lg transform transition-transform hover:scale-105">
                  <h4 class="font-bold text-indigo-700">Right to Object</h4>
                  <p class="text-gray-700 text-sm">You have the right to object to our processing of your personal data.</p>
                </div>
                <div class="bg-indigo-50 p-4 rounded-lg transform transition-transform hover:scale-105">
                  <h4 class="font-bold text-indigo-700">Right to Data Portability</h4>
                  <p class="text-gray-700 text-sm">You have the right to request that we transfer the data to another organization.</p>
                </div>
              </div>
            </div>
            <div class="md:w-1/3 flex justify-center items-center">
              <svg class="w-60 h-60" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="#EEF2FF" />
                <g>
                  <path d="M40 40 L80 40 L80 80 L40 80 Z" fill="#C7D2FE" />
                  <path d="M35 60 L45 70 L35 80" stroke="#4F46E5" stroke-width="3" fill="none" />
                  <path d="M85 60 L75 70 L85 80" stroke="#4F46E5" stroke-width="3" fill="none" />
                  <path d="M60 35 L60 45" stroke="#4F46E5" stroke-width="3" fill="none" />
                  <path d="M60 75 L60 85" stroke="#4F46E5" stroke-width="3" fill="none" />
                  <circle cx="60" cy="60" r="15" fill="#818CF8" class="animate-ping opacity-50" style="animation-duration: 4s" />
                </g>
              </svg>
            </div>
          </div>
        </section>
  
        <!-- Contact Form -->
        <section 
          class="bg-indigo-600 text-white rounded-2xl p-6 md:p-8 shadow-lg transform transition-all duration-700 delay-700"
          :class="isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'"
          ref="contactSection"
        >
          <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-1/2">
              <h2 class="text-2xl font-bold mb-4">Questions About Our Privacy Policy?</h2>
              <p class="mb-4">
                If you have any questions or concerns about our privacy practices, please don't hesitate to contact us.
              </p>
              <div class="flex items-center mb-4">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>contact@raymondaworoart.com</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
                <span>123 Art Street, Creative City, 12345</span>
              </div>
            </div>
            <div class="md:w-1/2">
              <div class="bg-white rounded-lg p-6">
                <h3 class="text-lg font-semibold text-indigo-800 mb-4">Send Us a Message</h3>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your Name" />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your Email" />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2" for="message">Message</label>
                  <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" rows="3" placeholder="Your Message"></textarea>
                </div>
                <div class="flex items-center justify-between">
                  <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors" type="button">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  
      <!-- Footer -->
      <footer class="bg-indigo-800 text-white py-8 px-4 md:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-6 md:mb-0">
              <h3 class="text-xl font-bold mb-2">Raymond Aworo Art</h3>
              <p class="text-indigo-200">Privacy matters to us as much as art does.</p>
            </div>
            <div class="flex space-x-4">
              <a href="#" class="text-white hover:text-indigo-200 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" class="text-white hover:text-indigo-200 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                </svg>
              </a>
              <!-- <a href="#" class="text-white hover:text-indigo-200 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1. -->
        </div>
        </div>
        </div>
        </footer>

    </div>
</template>