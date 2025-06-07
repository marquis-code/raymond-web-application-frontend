<template>
    <div class="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50">
      <div class="container mx-auto px-4 py-12 md:py-20">
        <div class="max-w-4xl mx-auto">
          <!-- Header Section -->
          <div class="text-center my-12">
            <h1 class="text-3xl font-bold text-black mb-4 animate-fade-in">
              Shipping Policy
            </h1>
            <div class="w-24 h-1 bg-indigo-500 mx-auto rounded-full animate-width"></div>
          </div>
          
          <!-- Main Content Card -->
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden animate-rise">
            <!-- Free Shipping Section -->
            <div class="p-6 md:p-10">
              <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div class="shrink-0">
                  <ShippingIllustration class="w-32 h-32" />
                </div>
                <div>
                  <h2 class="text-2xl md:text-3xl font-bold text-indigo-700 mb-4">
                    FREE SHIPPING
                  </h2>
                  <div class="prose prose-indigo max-w-none">
                    <p class="text-gray-700">
                      PRINTS Orders usually ship out within <span class="font-semibold text-indigo-600">72-hours</span> of your purchase, and will usually arrive within a maximum of <span class="font-semibold text-indigo-600">5-10 working days</span>.
                    </p>
                    <p class="text-gray-700 mt-4">
                      Our prints are sustainably packaged and carbon neutral from end-to-end. This was only made possible by the amazing efforts of our print studio partners.
                    </p>
                  </div>
                </div>
              </div>
              <!-- import { useFetchProducts } from "@/composables/modules/products/useFetchProducts"
const { products, loading } = useFetchProducts() -->
              
              <!-- Shipping Timeline Visualization -->
              <div class="mt-12">
                <ShippingTimeline />
              </div>
              
              <!-- Additional Shipping Information -->
              <div class="mt-12 bg-indigo-50 p-6 rounded-xl border border-indigo-100 animate-pulse-slow">
                <h3 class="text-xl font-semibold text-indigo-700 mb-4 flex items-center">
                  <InfoIcon class="w-5 h-5 mr-2" />
                  Important Information
                </h3>
                <p class="text-gray-700">
                  Standard Flat Rate worldwide shipping is <span class="font-bold text-indigo-600">free of charge</span> for prints. Please note that while shipping is free of charge, although rare, you will be responsible for any local tax duties outside of the UK and EU.
                </p>
              </div>
              
              <!-- Sustainable Packaging Section -->
              <div class="mt-12">
                <h3 class="text-xl font-semibold text-indigo-700 mb-4">Sustainable Packaging</h3>
                <div class="flex flex-col md:flex-row gap-6 items-center">
                  <div class="w-full md:w-1/2">
                    <p class="text-gray-700">
                      We take pride in our eco-friendly approach to shipping. All our packaging materials are recyclable and sustainably sourced.
                    </p>
                    <div class="flex gap-4 mt-4">
                      <SustainableIcon class="text-green-500" />
                      <RecyclableIcon class="text-green-500" />
                      <CarbonNeutralIcon class="text-green-500" />
                    </div>
                  </div>
                  <div class="w-full md:w-1/2">
                    <PackagingIllustration class="w-full h-48" />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- FAQ Section -->
            <div class="bg-indigo-50 p-6 md:p-10 border-t border-indigo-100">
              <h3 class="text-xl font-semibold text-indigo-700 mb-6">Frequently Asked Questions</h3>
              <ShippingFaq />
            </div>
          </div>
          
          <!-- Contact Support Section -->
          <div class="mt-12 text-center animate-fade-in">
            <p class="text-gray-600 mb-4">Have questions about your shipping?</p>
            <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 flex items-center mx-auto">
              <MailIcon class="w-5 h-5 mr-2" />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { ShippingIllustration } from '@/assets/illustrations/shipping';
  import { PackagingIllustration } from '@/assets/illustrations/packaging';
  import { ShippingTimeline } from '@/assets/illustrations/shipping-timeline';
  import { InfoIcon } from '@/assets/illustrations/info-icon';
  import { ShippingFaq } from "@/assets/illustrations/shipping-faq"
  import { MailIcon } from "@/assets/illustrations/mail-icon"
  import { SustainableIcon } from "@/assets/illustrations/sustainable-icon"
  import { RecyclableIcon } from "@/assets/illustrations/recycle-icon"
  import { CarbonNeutralIcon } from  "@/assets/illustrations/carbon-neutral"

  //   // Add Nuxt app plugin for animations
  // const defineComponent = (options: any) => options;
  // const h = (tag: any, props: any, children?: any) => ({ tag, props, children });
  
  
  // Define global CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    .animate-float-slow {
      animation: float 8s ease-in-out infinite;
    }
    .animate-width {
      animation: width 1s ease-out forwards;
    }
    .animate-rise {
      animation: rise 0.8s ease-out forwards;
    }
    .animate-fade-in {
      animation: fadeIn 1s ease-out forwards;
    }
    .animate-pulse-slow {
      animation: pulseSlow 3s infinite;
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes width {
      0% { width: 0; }
      100% { width: 6rem; }
    }
    
    @keyframes rise {
      0% { transform: translateY(20px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    
    @keyframes pulseSlow {
      0% { background-color: rgba(238, 242, 255, 1); }
      50% { background-color: rgba(224, 231, 255, 1); }
      100% { background-color: rgba(238, 242, 255, 1); }
    }
  `;
  
  onMounted(() => {
    document.head.appendChild(style);
  });
  </script>
  
  <style>
  /* Additional global styles */
  .prose p {
    line-height: 1.6;
  }
  </style>