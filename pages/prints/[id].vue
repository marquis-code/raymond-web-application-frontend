<template>
    <div class="min-h-screen bg-white text-black">
      <div class="container mx-auto px-4 py-8">
        <!-- Breadcrumbs -->
        <div class="text-sm breadcrumbs mb-6">
          <ul class="flex space-x-2">
            <li><NuxtLink to="/" class="hover:text-gray-600">Home</NuxtLink></li>
            <li><span>/</span></li>
            <li><NuxtLink to="/shop" class="hover:text-gray-600">Shop</NuxtLink></li>
            <li><span>/</span></li>
            <li>{{ product?.title }}</li>
          </ul>
        </div>
        
        <div class="flex justify-between items-center mb-6">
          <div></div> <!-- Empty div for spacing -->
          <div class="flex space-x-4">
            <NuxtLink 
              :to="`/shop/${prevProductId}`" 
              class="flex items-center hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
              <span>Prev</span>
            </NuxtLink>
            <NuxtLink 
              :to="`/shop/${nextProductId}`" 
              class="flex items-center hover:text-gray-600"
            >
              <span>Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
            </NuxtLink>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Product Images -->
          <div>
            <div class="mb-4">
              <img 
                :src="product?.images[selectedImageIndex]" 
                :alt="product?.title" 
                class="w-full h-auto object-contain"
              />
            </div>
            
            <div class="grid grid-cols-5 gap-2">
              <div 
                v-for="(image, index) in product?.images" 
                :key="index" 
                class="cursor-pointer border-2"
                :class="{'border-black': selectedImageIndex === index, 'border-transparent': selectedImageIndex !== index}"
                @click="selectedImageIndex = index"
              >
                <img :src="image" :alt="`${product?.title} thumbnail ${index + 1}`" class="w-full h-auto" />
              </div>
            </div>
          </div>
          
          <!-- Product Details -->
          <div>
            <h1 class="text-2xl font-bold mb-4">{{ product?.title }}</h1>
            <p class="text-xl mb-2">From ${{ product?.price }}</p>
            <p class="text-sm text-gray-600 mb-4">{{ product?.saleInfo }}</p>
            
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">Size *</label>
              <select 
                v-model="selectedSize" 
                class="w-full p-2 border border-gray-300 bg-white text-black rounded"
              >
                <option disabled value="">Select</option>
                <option 
                  v-for="size in product?.sizes" 
                  :key="size.id" 
                  :value="size.id"
                >
                  {{ size.name }} - ${{ size.price }}
                </option>
              </select>
            </div>
            
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Quantity *</label>
              <div class="flex items-center">
                <button 
                  @click="quantity > 1 ? quantity-- : null" 
                  class="px-3 py-1 border border-gray-300 hover:bg-gray-100"
                >
                  -
                </button>
                <input 
                  v-model="quantity" 
                  type="number" 
                  min="1" 
                  class="w-16 p-1 text-center border-t border-b border-gray-300 bg-white text-black"
                />
                <button 
                  @click="quantity++" 
                  class="px-3 py-1 border border-gray-300 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            <button 
              @click="addToCart" 
              class="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors duration-300"
            >
              Add to Cart
            </button>
            
            <div class="mt-8 space-y-4">
              <div class="border-t border-gray-200 pt-4">
                <div 
                  class="flex justify-between items-center cursor-pointer"
                  @click="toggleSection('productInfo')"
                >
                  <h3 class="font-medium">PRODUCT INFO</h3>
                  <button class="text-xl">{{ openSections.productInfo ? '-' : '+' }}</button>
                </div>
                <div v-if="openSections.productInfo" class="mt-2 text-sm">
                  <p>{{ product?.description }}</p>
                </div>
              </div>
              
              <div class="border-t border-gray-200 pt-4">
                <div 
                  class="flex justify-between items-center cursor-pointer"
                  @click="toggleSection('returnPolicy')"
                >
                  <h3 class="font-medium">RETURN & REFUND POLICY</h3>
                  <button class="text-xl">{{ openSections.returnPolicy ? '-' : '+' }}</button>
                </div>
                <div v-if="openSections.returnPolicy" class="mt-2 text-sm">
                  <p>All sales are final. Due to the custom nature of our artwork, we do not accept returns or exchanges.</p>
                </div>
              </div>
              
              <div class="border-t border-gray-200 pt-4">
                <div 
                  class="flex justify-between items-center cursor-pointer"
                  @click="toggleSection('shippingInfo')"
                >
                  <h3 class="font-medium">SHIPPING INFO</h3>
                  <button class="text-xl">{{ openSections.shippingInfo ? '-' : '+' }}</button>
                </div>
                <div v-if="openSections.shippingInfo" class="mt-2 text-sm">
                  <p>worldwide shipping</p>
                  <p>Estimated delivery time: 5-8 Business days after placing order.</p>
                </div>
              </div>
            </div>
            
            <div class="mt-8 border-t border-gray-200 pt-6">
              <h3 class="text-xl font-medium mb-4">Reviews</h3>
              <div class="flex items-center mb-2">
                <div class="flex">
                  <span v-for="i in 5" :key="i" class="text-xl">
                    <span v-if="i <= Math.floor(product?.rating || 0)">★</span>
                    <span v-else-if="i - 0.5 <= product?.rating || 0">★</span>
                    <span v-else>☆</span>
                  </span>
                </div>
                <span class="ml-2 text-xl">{{ product?.rating }}</span>
              </div>
              <p class="text-sm text-gray-600 mb-4">Based on {{ product?.reviewCount }} reviews</p>
              
              <button class="border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300">
                Leave a Review
              </button>
              
              <!-- Reviews List -->
              <div class="mt-8 space-y-6">
                <div class="flex justify-between items-center">
                  <p class="text-sm">{{ product?.reviewCount }} reviews</p>
                  <div class="flex space-x-4">
                    <div>
                      <span class="text-sm">Filter by rating: </span>
                      <select class="text-sm border-b border-gray-300 bg-transparent">
                        <option>All stars</option>
                        <option>5 stars</option>
                        <option>4 stars</option>
                        <option>3 stars</option>
                        <option>2 stars</option>
                        <option>1 star</option>
                      </select>
                    </div>
                    <div>
                      <span class="text-sm">Sort by: </span>
                      <select class="text-sm border-b border-gray-300 bg-transparent">
                        <option>Most Relevant</option>
                        <option>Newest</option>
                        <option>Highest Rating</option>
                        <option>Lowest Rating</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <!-- Review Item -->
                <div v-for="(review, index) in product?.reviews" :key="index" class="border-t border-gray-200 pt-4">
                  <div class="flex justify-between">
                    <div>
                      <div class="flex">
                        <span v-for="i in 5" :key="i" class="text-sm">
                          <span v-if="i <= review.rating">★</span>
                          <span v-else>☆</span>
                        </span>
                      </div>
                      <h4 class="font-bold mt-2">{{ review.title }}</h4>
                    </div>
                    <div class="flex items-center">
                      <p class="text-sm text-gray-600">{{ review.author }} • {{ review.date }}</p>
                      <button class="ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                      </button>
                    </div>
                  </div>
                  <p class="mt-2">{{ review.content }}</p>
                  <div class="mt-4 flex items-center">
                    <p class="text-sm">Was this helpful?</p>
                    <button class="ml-2 flex items-center text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                      <span class="ml-1">Yes ({{ review.helpfulCount }})</span>
                    </button>
                  </div>
                  
                  <!-- Store Owner Reply -->
                  <div v-if="review.reply" class="mt-4 ml-6 p-4 bg-gray-100">
                    <p class="font-medium">Store Owner • {{ review.replyDate }}</p>
                    <p class="mt-2 text-sm">{{ review.reply }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  // Types
  interface Size {
    id: string;
    name: string;
    price: number;
  }
  
  interface Review {
    author: string;
    date: string;
    rating: number;
    title: string;
    content: string;
    helpfulCount: number;
    reply?: string;
    replyDate?: string;
  }
  
  interface Product {
    id: string;
    title: string;
    images: string[];
    price: number;
    description: string;
    sizes: Size[];
    saleInfo: string;
    rating: number;
    reviewCount: number;
    reviews: Review[];
  }
  
  // Sample data
  const products = reactive<Product[]>([
    {
      id: 'no-greater-love',
      title: 'NO GREATER LOVE',
      images: [
        '/placeholder.svg?height=600&width=500',
        '/placeholder.svg?height=600&width=500',
        '/placeholder.svg?height=600&width=500',
        '/placeholder.svg?height=600&width=500',
        '/placeholder.svg?height=600&width=500'
      ],
      price: 185,
      description: '"No Greater Love" - Greater Love has no one than this; to lay down one\'s life for one\'s friends. (John 15:13). This Artwork denotes the suffering of Christ on His way to Calvary and then ponder how Christ exhibits each of the qualities of love in His Passion. Love is patient, Love bears all things; whether insults, mockery, scourging, or crowning with thorns. Love endures all things; even death - death on a Cross!   Reflecting on this we ask ourselves; "Am I patient in my sufferings, as Christ was?, Am I kind to those who hurt me? Do I rejoice in wrongdoing and vengeance, or do I rejoice in truth and mercy?',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 185 },
        { id: 'large', name: 'Large (24" x 36")', price: 285 }
      ],
      saleInfo: 'Spring Sale!!! Enjoy 50% off!',
      rating: 4.7,
      reviewCount: 3,
      reviews: [
        {
          author: 'Moma',
          date: 'Apr 13, 2024',
          rating: 4,
          title: 'Beautiful painting',
          content: 'I saw this as I was scrolling online. It came across my feed. I think this painting is beautiful.',
          helpfulCount: 26
        },
        {
          author: 'Store Owner',
          date: 'Apr 17, 2024',
          rating: 5,
          title: 'Thank you!',
          content: 'Hi, thank you soo much for your review!!! You should order for a print as well. I\'m sure it would look good on your wall.',
          helpfulCount: 3,
          reply: 'Thank you for your kind words! We\'re so glad you enjoyed the artwork.',
          replyDate: 'Apr 18, 2024'
        }
      ]
    },
    {
      id: 'guardian-angel',
      title: 'GUARDIAN ANGEL',
      images: [
        '/placeholder.svg?height=600&width=500',
        '/placeholder.svg?height=600&width=500',
        '/placeholder.svg?height=600&width=500',
        '/placeholder.svg?height=600&width=500',
        '/placeholder.svg?height=600&width=500'
      ],
      price: 195,
      description: 'This powerful artwork represents divine protection, showing the guardian angel watching over and guiding those in need.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 195 },
        { id: 'large', name: 'Large (24" x 36")', price: 295 }
      ],
      saleInfo: 'Spring Sale!!! Enjoy 50% off!',
      rating: 4.9,
      reviewCount: 7,
      reviews: [
        {
          author: 'John D.',
          date: 'Mar 25, 2024',
          rating: 5,
          title: 'Absolutely stunning',
          content: 'This piece is even more beautiful in person. The details are incredible and it has become the focal point of my living room.',
          helpfulCount: 12
        }
      ]
    },
    {
      id: 'cosmic-waterfall',
      title: 'COSMIC WATERFALL',
      images: [
        '/placeholder.svg?height=600&width=500',
        '/placeholder.svg?height=600&width=500',
        '/placeholder.svg?height=600&width=500',
        '/placeholder.svg?height=600&width=500',
        '/placeholder.svg?height=600&width=500'
      ],
      price: 165,
      description: 'This artwork combines the beauty of a waterfall with the mystery of the cosmos, creating a unique visual experience that transcends ordinary reality.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 165 },
        { id: 'large', name: 'Large (24" x 36")', price: 265 }
      ],
      saleInfo: 'Spring Sale!!! Enjoy 50% off!',
      rating: 4.8,
      reviewCount: 5,
      reviews: [
        {
          author: 'Sarah M.',
          date: 'Apr 2, 2024',
          rating: 5,
          title: 'Mesmerizing artwork',
          content: 'The colors in this piece are absolutely breathtaking. It creates such a peaceful atmosphere in my meditation room.',
          helpfulCount: 8
        }
      ]
    }
  ]);
  
  // State
  const route = useRoute();
  const selectedImageIndex = ref(0);
  const selectedSize = ref('');
  const quantity = ref(1);
  
  // Accordion sections
  const openSections = reactive({
    productInfo: false,
    returnPolicy: false,
    shippingInfo: true
  });
  
  // Computed properties
  const productId = computed(() => route.params.id as string);
  
  const product = computed(() => {
    return products.find(p => p.id === productId.value) || null;
  });
  
  const productIndex = computed(() => {
    return products.findIndex(p => p.id === productId.value);
  });
  
  const prevProductId = computed(() => {
    const prevIndex = (productIndex.value - 1 + products.length) % products.length;
    return products[prevIndex].id;
  });
  
  const nextProductId = computed(() => {
    const nextIndex = (productIndex.value + 1) % products.length;
    return products[nextIndex].id;
  });
  
  // Methods
  const toggleSection = (section: keyof typeof openSections) => {
    openSections[section] = !openSections[section];
  };
  
  const addToCart = () => {
    if (!product.value || !selectedSize.value) return;
    
    const size = product.value.sizes.find(s => s.id === selectedSize.value);
    if (!size) return;
    
    // Add to cart logic would go here
    alert(`Added ${quantity.value} ${product.value.title} (${size.name}) to cart`);
  };
  
  // Lifecycle hooks
  onMounted(() => {
    if (product.value) {
      selectedSize.value = product.value.sizes[0].id;
    }
  });
  </script>
  
  <style scoped>
  /* Custom styles can be added here */
  </style>