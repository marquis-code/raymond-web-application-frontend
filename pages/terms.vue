<template>
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header Section with Animation -->
        <div class="relative mb-12">
          <div class="flex flex-col md:flex-row items-center justify-between mb-8">
            <div class="text-center md:text-left mb-6 md:mb-0">
              <h1 class="text-3xl md:text-4xl font-bold text-indigo-800 mb-3 animate-fade-in">
                Terms & Conditions
              </h1>
              <p class="text-indigo-600 text-lg animate-fade-in-delay">
                Welcome to Raymond Aworo Art
              </p>
            </div>
            
            <!-- SVG Legal Illustration -->
            <div class="w-48 h-48 animate-float">
              <svg viewBox="0 0 200 200" class="w-full h-full">
                <circle cx="100" cy="100" r="80" fill="#e0e7ff" />
                <rect x="60" y="60" width="80" height="100" rx="6" fill="#ffffff" stroke="#4f46e5" stroke-width="3" />
                <line x1="70" y1="80" x2="130" y2="80" stroke="#4f46e5" stroke-width="2" />
                <line x1="70" y1="95" x2="130" y2="95" stroke="#4f46e5" stroke-width="2" />
                <line x1="70" y1="110" x2="130" y2="110" stroke="#4f46e5" stroke-width="2" />
                <line x1="70" y1="125" x2="110" y2="125" stroke="#4f46e5" stroke-width="2" />
                <circle cx="140" cy="50" r="20" fill="#c7d2fe" />
                <path d="M138 42 L142 42 L142 58 L138 58 Z" fill="#4f46e5" />
                <path d="M134 46 L146 46 L146 50 L134 50 Z" fill="#4f46e5" />
              </svg>
            </div>
          </div>
          
          <!-- Animated Divider -->
          <div class="h-1 w-full bg-gradient-to-r from-indigo-300 via-purple-500 to-indigo-300 animate-pulse"></div>
        </div>
  
        <!-- Terms Content Section -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
          <!-- Content Tabs -->
          <div class="flex flex-wrap text-sm font-medium text-center border-b">
            <button 
              v-for="(section, index) in sections" 
              :key="index"
              @click="activeTab = index"
              :class="[
                'py-3 px-4 transition-all duration-300', 
                activeTab === index 
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50' 
                  : 'text-gray-500 hover:text-indigo-500 hover:bg-indigo-50/50'
              ]"
            >
              {{ section.title }}
            </button>
          </div>
          
          <!-- Content Area -->
          <div class="p-6 md:p-8">
            <transition name="fade" mode="out-in">
              <div :key="activeTab" class="animate-fade-in">
                <h2 class="text-xl md:text-2xl font-bold text-indigo-800 mb-4">
                  {{ sections[activeTab].title }}
                </h2>
                
                <div class="prose prose-indigo max-w-none">
                  <div v-for="(paragraph, pIndex) in sections[activeTab].content" :key="pIndex" 
                       class="mb-4 text-gray-700">
                    <p>{{ paragraph }}</p>
                  </div>
                </div>
              </div>
            </transition>
          </div>
  
          <!-- Footer -->
          <div class="bg-indigo-50 p-6 flex flex-col md:flex-row justify-between items-center">
            <p class="text-indigo-700 text-sm mb-4 md:mb-0">
              Last updated: April 2025 &bull; Raymond Aworo Art
            </p>
            <button class="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-md">
              Accept Terms
            </button>
          </div>
        </div>
  
        <!-- Contact Info Card -->
        <div class="mt-8 bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl">
          <h3 class="text-lg font-semibold text-indigo-800 mb-3">Contact Information</h3>
          <p class="text-gray-700">All communications relating to the use of 'Raymondaworoart.com' must be sent to:</p>
          <div class="mt-4 flex items-center text-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a href="mailto:raymondraphael321@gmail.com" class="hover:underline">raymondraphael321@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // State for active tab
  const activeTab = ref(0)
  
  // Organize the terms and conditions into sections
  const sections = ref([
    {
      title: 'Overview',
      content: [
        'These Terms govern the use of raymondaworoart.com and any other related Agreement or legal relationship with the Owner in a legally binding way. Capitalized words are defined in the relevant dedicated section of this document.',
        'Welcome to our website. Unless otherwise specified, the terms of use detailed in this section apply generally when using www.raymondaworoart.com.',
        'The term \'Raymondaworoart\' or \'The owner\' or \'us\' or \'we\' refers to the owner of the website whose registered business is Raymondaworoart. The term \'you\' or \'Users\' refers to the user or viewer of our website.'
      ]
    },
    {
      title: 'Content',
      content: [
        'Unless where otherwise specified or clearly recognizable, all content available on our website is owned or provided by the Owner or its licensors.',
        'We undertake our utmost effort to ensure that the content provided by us infringes no applicable legal provisions or third-party rights. However, it may not always be possible to achieve such a result.',
        'In such cases, without prejudice to any legal prerogatives of Users to enforce their rights, Users are kindly asked to preferably report related complaints using the contact details provided in this document.'
      ]
    },
    {
      title: 'External Resources',
      content: [
        'Through our website Users may have access to external resources provided by third parties. Users acknowledge and accept we have no control over such resources and we are therefore not responsible for their content and availability.',
        'Conditions applicable to any resources provided by third parties, including those applicable to any possible grant of rights in content, result from each such third parties\' terms and conditions or, in the absence of those, applicable statutory law.'
      ]
    },
    {
      title: 'Acceptable Use',
      content: [
        '\'Raymondaworoart\' and the Service may only be used within the scope of what they are provided for, under these Terms and applicable law.',
        'Users are solely responsible for making sure that their use of our website and/or the Service violates no applicable law, regulations or third-party rights.'
      ]
    },
    {
      title: 'Service Provisions',
      content: [
        'NO WAIVER: Our failure to assert any right or provision under these Terms shall not constitute a waiver of any such right or provision. No waiver shall be considered a further or continuing waiver of such term or any other term.',
        'SERVICE INTERRUPTION: To ensure the best possible service level, we reserve the right to interrupt the Service for maintenance, system updates or any other changes, informing the Users appropriately.',
        'Within the limits of law, we may also decide to suspend or terminate the Service altogether. If the Service is terminated, we will cooperate with Users to enable them to withdraw Personal Data or information in accordance with applicable law.',
        'Additionally, the Service might not be available due to reasons outside of our control, such as "force majeure" (eg. labor actions, infrastructural breakdowns or blackouts etc).'
      ]
    },
    {
      title: 'Intellectual Property',
      content: [
        'Without prejudice to any more specific provision of these Terms, any intellectual property rights, such as copyrights, trademark rights, patent rights and design rights related to \'\'Raymondaworoart\' are the exclusive property of the Owner or its licensors and are subject to the protection granted by applicable laws or international treaties relating to intellectual property.',
        'All trademarks — nominal or figurative — and all other marks, trade names, service marks, word marks, illustrations, images, or logos appearing in connection with our website are, and remain, the exclusive property of \'Raymondaworoart\' or its licensors and are subject to the protection granted by applicable laws or international treaties related to intellectual property.',
        'SERVICE RESELLING: Users may not reproduce, duplicate, copy, sell, resell or exploit any portion of \'\'Raymondaworoart\' and of its Service without our express prior written permission, granted either directly or through a legitimate reselling programme.'
      ]
    },
    {
      title: 'Changes & Assignment',
      content: [
        'CHANGES TO THESE TERMS: We reserve the right to amend or otherwise modify these Terms at any time. In such cases, we will appropriately inform the Users of these changes.',
        'Such changes will only affect the relationship with the User for the future. The continued use of the Service will signify the User\'s acceptance of the revised Terms. If Users do not wish to be bound by the changes, they must stop using the Service. Failure to accept the revised Terms, may entitle either party to terminate the Agreement.',
        'ASSIGNMENT OF CONTRACT: We reserve the right to transfer, assign, dispose of by novation, or subcontract any or all rights or obligations under these Terms, taking the User\'s legitimate interests into account. Provisions regarding changes of these Terms will apply accordingly.',
        'Users may not assign or transfer their rights or obligations under these Terms in any way, without the written permission of the Owner.'
      ]
    },
    {
      title: 'Severability',
      content: [
        'Should any provision of these Terms be deemed or become invalid or unenforceable under applicable law, the invalidity or unenforceability of such provision shall not affect the validity of the remaining provisions, which shall remain in full force and effect.'
      ]
    }
  ])
  </script>
  
  <style scoped>
  .animate-fade-in {
    animation: fadeIn 0.8s ease-in forwards;
  }
  
  .animate-fade-in-delay {
    animation: fadeIn 0.8s ease-in 0.3s forwards;
    opacity: 0;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  </style>