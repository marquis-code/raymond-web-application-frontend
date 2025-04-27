<template>
    <div class="min-h-screen bg-gradient-to-r from-indigo-50 to-blue-50">
      <div class="container mx-auto px-4 py-12 md:py-20">
        <div class="max-w-4xl mx-auto">
          <!-- Header Section -->
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-indigo-800 mb-4 animate-fade-in">
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
//   import ShippingIllustration from '@/components/ShippingIllustration';

    // Add Nuxt app plugin for animations
    const defineComponent = (options: any) => options;
  const h = (tag: any, props: any, children?: any) => ({ tag, props, children });
  
  // Custom Components
  const ShippingIllustration = defineComponent({
    setup() {
      return () => h('svg', { 
        xmlns: 'http://www.w3.org/2000/svg', 
        viewBox: '0 0 100 100',
        class: 'animate-float'
      }, [
        h('rect', { x: '10', y: '40', width: '80', height: '50', rx: '5', fill: '#f0f0ff', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('path', { d: 'M10 50h80', stroke: '#4f46e5', 'stroke-width': '1', 'stroke-dasharray': '2 2' }),
        h('rect', { x: '35', y: '25', width: '30', height: '15', rx: '2', fill: '#e0e7ff' }),
        h('path', { d: 'M35 40v-13 h30 v13', fill: 'none', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('circle', { cx: '30', cy: '90', r: '6', fill: '#c7d2fe', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('circle', { cx: '70', cy: '90', r: '6', fill: '#c7d2fe', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('path', { d: 'M20 60h60', stroke: '#818cf8', 'stroke-width': '2' }),
        h('path', { d: 'M20 70h40', stroke: '#818cf8', 'stroke-width': '2' }),
        h('path', { d: 'M10 30c0 0 20-25 40-15', stroke: '#4f46e5', 'stroke-width': '2', fill: 'none', 'stroke-dasharray': '3 3' }),
        h('path', { d: 'M90 30c0 0 -20-25 -40-15', stroke: '#4f46e5', 'stroke-width': '2', fill: 'none', 'stroke-dasharray': '3 3' }),
      ]);
    }
  });
  
  const PackagingIllustration = defineComponent({
    setup() {
      return () => h('svg', { 
        xmlns: 'http://www.w3.org/2000/svg', 
        viewBox: '0 0 100 100',
        class: 'animate-float-slow'
      }, [
        // Box
        h('rect', { x: '20', y: '20', width: '60', height: '60', fill: '#e0e7ff', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('path', { d: 'M20 20 L50 10 L80 20', fill: 'none', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('path', { d: 'M80 20 L80 80', fill: 'none', stroke: '#4f46e5', 'stroke-width': '2' }),
        h('path', { d: 'M50 10 L50 20', fill: 'none', stroke: '#4f46e5', 'stroke-width': '2' }),
        
        // Eco symbols
        h('circle', { cx: '50', cy: '50', r: '15', fill: '#bbf7d0', stroke: '#15803d', 'stroke-width': '1' }),
        h('path', { d: 'M50 40 C55 45, 60 50, 50 60 C40 50, 45 45, 50 40', fill: '#15803d', stroke: '#15803d', 'stroke-width': '1' }),
        h('path', { d: 'M45 50 L55 50', stroke: '#15803d', 'stroke-width': '1' }),
        h('path', { d: 'M50 45 L50 55', stroke: '#15803d', 'stroke-width': '1' }),
      ]);
    }
  });
  
  const ShippingTimeline = defineComponent({
    setup() {
      return () => h('div', { class: 'relative py-10' }, [
        // Timeline line
        h('div', { class: 'absolute h-1 w-full bg-gray-200 top-1/2 transform -translate-y-1/2' }),
        
        // Timeline items
        h('div', { class: 'relative flex justify-between' }, [
          // Order Placed
          h('div', { class: 'flex flex-col items-center' }, [
            h('div', { class: 'rounded-full h-12 w-12 flex items-center justify-center bg-indigo-600 text-white z-10' }, [
              h('svg', { class: 'w-6 h-6', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
                h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 13l4 4L19 7' })
              ])
            ]),
            h('div', { class: 'text-center mt-2' }, [
              h('div', { class: 'font-semibold text-indigo-700' }, 'Order Placed'),
              h('div', { class: 'text-sm text-gray-500' }, 'Day 0')
            ])
          ]),
          
          // Processing
          h('div', { class: 'flex flex-col items-center' }, [
            h('div', { class: 'rounded-full h-12 w-12 flex items-center justify-center bg-indigo-500 text-white z-10 animate-pulse' }, [
              h('svg', { class: 'w-6 h-6', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
                h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6v6m0 0v6m0-6h6m-6 0H6' })
              ])
            ]),
            h('div', { class: 'text-center mt-2' }, [
              h('div', { class: 'font-semibold text-indigo-700' }, 'Processing'),
              h('div', { class: 'text-sm text-gray-500' }, 'Within 72 hours')
            ])
          ]),
          
          // Shipped
          h('div', { class: 'flex flex-col items-center' }, [
            h('div', { class: 'rounded-full h-12 w-12 flex items-center justify-center bg-indigo-300 text-white z-10' }, [
              h('svg', { class: 'w-6 h-6', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
                h('path', { d: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z' }),
                h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' })
              ])
            ]),
            h('div', { class: 'text-center mt-2' }, [
              h('div', { class: 'font-semibold text-indigo-700' }, 'Shipped'),
              h('div', { class: 'text-sm text-gray-500' }, 'Day 3')
            ])
          ]),
          
          // Delivered
          h('div', { class: 'flex flex-col items-center' }, [
            h('div', { class: 'rounded-full h-12 w-12 flex items-center justify-center bg-gray-300 text-white z-10' }, [
              h('svg', { class: 'w-6 h-6', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
                h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
              ])
            ]),
            h('div', { class: 'text-center mt-2' }, [
              h('div', { class: 'font-semibold text-indigo-700' }, 'Delivered'),
              h('div', { class: 'text-sm text-gray-500' }, '5-10 working days')
            ])
          ])
        ])
      ]);
    }
  });
  
  const ShippingFaq = defineComponent({
    setup() {
      const faqs = ref([
        {
          question: 'How long does shipping take?',
          answer: 'Orders usually ship within 72 hours and arrive within 5-10 working days.',
          isOpen: false
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we offer free standard flat rate worldwide shipping for prints.',
          isOpen: false
        },
        {
          question: 'Are there any additional fees?',
          answer: 'While shipping is free, you may be responsible for local tax duties outside of the UK and EU.',
          isOpen: false
        },
        {
          question: 'How do you track my order?',
          answer: 'Once your order ships, you will receive a tracking number via email to monitor your delivery.',
          isOpen: false
        }
      ]);
  
      const toggleFaq = (index: number) => {
        faqs.value = faqs.value.map((faq, i) => {
          if (i === index) {
            return { ...faq, isOpen: !faq.isOpen };
          }
          return { ...faq, isOpen: false };
        });
      };
  
      return () => h('div', { class: 'space-y-4' }, 
        faqs.value.map((faq, index) => 
          h('div', { 
            key: index,
            // class: 'border rounded-lg overflow-hidden transition-all duration-300',
            class: faq.isOpen ? 'border-indigo-300 bg-white' : 'border-gray-200' 
          }, [
            h('button', {
              class: 'w-full flex justify-between items-center p-4 text-left focus:outline-none',
              onClick: () => toggleFaq(index)
            }, [
              h('span', { class: 'font-medium text-indigo-800' }, faq.question),
              h('svg', {
                class: `w-5 h-5 text-indigo-600 transform transition-transform ${faq.isOpen ? 'rotate-180' : ''}`,
                xmlns: 'http://www.w3.org/2000/svg',
                fill: 'none',
                viewBox: '0 0 24 24',
                stroke: 'currentColor'
              }, [
                h('path', {
                  'stroke-linecap': 'round',
                  'stroke-linejoin': 'round',
                  'stroke-width': '2',
                  d: 'M19 9l-7 7-7-7'
                })
              ])
            ]),
            h('div', {
              class: `px-4 pb-4 transition-all duration-300 ${faq.isOpen ? 'block' : 'hidden'}`,
            }, [
              h('p', { class: 'text-gray-600' }, faq.answer)
            ])
          ])
        )
      );
    }
  });
  
  // Icon Components
  const InfoIcon = defineComponent({
    setup() {
      return () => h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-5 w-5',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
        })
      ]);
    }
  });
  
  const MailIcon = defineComponent({
    setup() {
      return () => h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-5 w-5',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
        })
      ]);
    }
  });
  
  const SustainableIcon = defineComponent({
    setup() {
      return () => h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-8 w-8',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
        })
      ]);
    }
  });
  
  const RecyclableIcon = defineComponent({
    setup() {
      return () => h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-8 w-8',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
        })
      ]);
    }
  });
  
  const CarbonNeutralIcon = defineComponent({
    setup() {
      return () => h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        class: 'h-8 w-8',
        fill: 'none',
        viewBox: '0 0 24 24',
        stroke: 'currentColor'
      }, [
        h('path', {
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
        })
      ]);
    }
  });
  
  
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