<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header section with animation -->
        <div class="text-center mt-20" v-motion-slide-bottom>
          <h1 class="text-3xl font-bold text-black mb-4">Refund & Returns Policy</h1>
          <p class="text-lg text-gray-600">Welcome to Raymond Aworo Art</p>
        </div>
  
        <!-- Animated illustration -->
        <div class="flex justify-center mb-12">
          <div class="w-64 h-64 relative" v-motion-slide-visible>
            <div class="absolute inset-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-full h-full text-black">
                <g>
                  <path d="M128,144v224a8,8,0,0,0,8,8H376a8,8,0,0,0,8-8V144a8,8,0,0,0-8-8H136A8,8,0,0,0,128,144Z" 
                    fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" 
                    class="animate-pulse"/>
                  <polyline points="176 248 232 304 336 200" 
                    fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"
                    class="animate-draw"/>
                  <path d="M328,256V352a24,24,0,0,1-24,24H104a24,24,0,0,1-24-24V160a24,24,0,0,1,24-24H262.66" 
                    fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
  
        <!-- Policy cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <PolicyCard 
            title="Returns Process" 
            description="Return requests must be made within 14 days of delivery. Items must be in original condition."
            icon="return-icon"
          />
          <PolicyCard 
            title="Non-Refundable Items" 
            description="Online courses, artwork booking deposits, and personalized artworks are non-refundable."
            icon="ban-icon"
          />
          <PolicyCard 
            title="Damaged Products" 
            description="We will replace or refund any items damaged during shipping. Photo evidence required."
            icon="damage-icon"
          />
          <PolicyCard 
            title="Refund Processing" 
            description="Refunds are issued to original payment method within 3-5 business days after approval."
            icon="refund-icon"
          />
        </div>
  
        <!-- Main content with accordion -->
        <div class="bg-white rounded-xl shadow-xl p-6 mb-12 border border-indigo-100">
          <div v-for="(section, index) in policySections" :key="index" class="mb-6 last:mb-0">
            <AccordionItem :title="section.title" :index="index">
              <div class="prose prose-indigo max-w-none leading-loose" v-html="section.content"></div>
            </AccordionItem>
          </div>
        </div>
  
        <!-- Contact section -->
        <div class="bg-black rounded-xl p-6 text-white text-center relative overflow-hidden" v-motion-slide-visible>
          <!-- Decorative element -->
          <div class="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-indigo-500 rounded-full opacity-20"></div>
          <div class="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-indigo-500 rounded-full opacity-20"></div>
          
          <h2 class="text-2xl font-bold mb-4 relative z-10">Questions about our policy?</h2>
          <p class="mb-6 relative z-10">Contact Raymond Aworo at:</p>
          <div class="flex justify-center items-center space-x-2 relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <a href="mailto:raymondraphael321@gmail.com" class="text-white hover:underline">
              raymondraphael321@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Policy section content
  const policySections = ref([
    {
      title: '1. NON-REFUNDABLE PRODUCTS',
      content: `
        <p>Due to the nature of some of our products such as digital products and products created according to customer specifications, purchases of the following products are final and non-refundable:</p>
        <ul class="list-disc pl-5 mt-2">
          <li>Online courses</li>
          <li>Payments for Artwork bookings/ deposit fee for custom artworks</li>
          <li>Personalized Artworks</li>
        </ul>
      `
    },
    {
      title: '2. RETURNS',
      content: `
        <p>Customer satisfaction with our products is important to us, therefore, for all other products except the non-refundable category, we offer a money back guarantee if the customer is not satisfied with the product. Purchases made on our website (except for non-refundable products) can be returned for a refund within 14 days from the date of delivery. If 14 days have passed since the delivery of the product, the guarantee cannot be applied and we cannot offer a refund.</p>
        <p class="mt-2">In the case of requesting the return of the product within the established period (14 days), the costs of returning the product will be charged to the buyer.</p>
      `
    },
    {
      title: '3. CONDITIONS OF RETURN',
      content: `
        <ul class="list-disc pl-5">
          <li>Full name of the person who placed the order.</li>
          <li>Order number.</li>
          <li>Items must be in its original condition (unmarked, unaltered, and undamaged).</li>
          <li>All returns must be accompanied with your invoice as proof of purchase.</li>
          <li>Any item you have accepted and then returned is your responsibility until it reaches our warehouse. Please therefore ensure that you send your item back to us using a delivery service that insures you for the value of the products. Please package the product securely.</li>
          <li>The costs of returning the product will be charged to the buyer.</li>
        </ul>
        <p class="mt-2">Raymond Aworo Art reserves the right to reject any returns which do not comply with our Return Policy. Returns that do not fulfil our Return Policy may be shipped back to the client at their own cost.</p>
        <p class="mt-2">To request a return please send us your request through our contact information and you will receive instructions on how to return the product.</p>
      `
    },
    {
      title: '4. DEFECTIVE OR DAMAGED PRODUCTS',
      content: `
        <p>We do our best to avoid any damage or defect in your products, however, if upon receiving the product (including custom Artworks), it is found to be defective or damaged and you need to exchange the product for an equal one or need a refund, please send us your request through our contact information. Only in these cases, we will assume the value of the shipping. In case you request a return, the shipping value will also be refunded. If a personalised Artwork gets damaged or lost during shipping, Raymond Aworo Art will not offer a refund but however, she will replace the Artwork with a new Artwork that resembles the original version as closely as possible. These new versions may not be returned.</p>
        <p class="mt-3">The request for refund or return of a defective or damaged product must contain the following:</p>
        <ul class="list-disc pl-5 mt-2">
          <li>Full name of the person who placed the order.</li>
          <li>Order number.</li>
          <li>Proof of the damage or defect of the product (photo or video).</li>
        </ul>
      `
    },
    {
      title: '5. PROCESSING YOUR REFUND',
      content: `
        <p>Once your return has been received and accepted, please allow 3 to 5 business days for your return to be processed. If your return does not meet the conditions listed, the package will be sent back to you at your expense. If your return has been accepted, your refund will be issued and you will receive a return confirmation email. Your refund will be completed via the original payment method, with the amount of return shipping deducted from your refund.</p>
      `
    },
    {
      title: '6. COMMUNICATION WITH THE CUSTOMER',
      content: `
        <p>Once your turn in the waiting list arrives, I will reach out to you via email. If I don't receive a response, I will follow up with an SMS and/or WhatsApp message. If I am unable to reach you after multiple attempts through these channels, and there is no response within 60 days of the initial contact, your deposit and spot on the waiting list will unfortunately be forfeited. This policy helps maintain an efficient workflow and allows me to accommodate other clients who are eagerly waiting for their portraits.</p>
      `
    },
    {
      title: '7. REFUND OF DEPOSITS',
      content: `
        <p>Deposits are non-refundable; However, on some rare occasions they can only be refundable if the artwork/painting has not been started or done. When you book a portrait on my waiting list, you reserve a specific spot in my calendar, which prevents me from accepting other customers during that time. Every day dedicated to your booking means I am turning away other clients and substantial projects. Because your reservation directly impacts my ability to take on other work, I am unable to refund deposits.</p>
        <p class="mt-2">Also, a painting/artwork takes hours to weeks to create, once your painting/artwork has started or finished, the deposit fee cannot be refundable because a lot of work and hours has been invested into it.</p>
      `
    }
  ]);
  </script>
  
  <style scoped>
  .animate-draw {
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
    animation: draw 2s ease forwards;
  }
  
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
  </style>