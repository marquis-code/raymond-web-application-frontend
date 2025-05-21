<template>
    <div class="min-h-screen  text-white mt-20">
      <!-- Animated CTA Banner -->
      <!-- <div class="relative py-10 bg-black overflow-hidden">
        <div class="container mx-auto text-center">
          <h2 
            class="text-xl md:text-2xl font-medium mb-4 animate-pulse"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          >
            IF YOU ARE INTERESTED IN COLLECTING AN ORIGINAL PIECE, CLICK BELOW
          </h2>
          <NuxtLink to="/contact-us"
            class="bg-white text-black rounded-sm px-8 py-2 hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 400, duration: 600 } }"
            @click="navigateTo('/shop')"
          >
            PURCHASE
          </NuxtLink>
        </div>
      </div> -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div class="max-w-5xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">
          Interested in Collecting an Original Piece?
        </h2>
        
        <p class="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Own a one-of-a-kind masterpiece that captures the depth of emotion and technical excellence that defines my work.
        </p>
        
        <a 
          href="/contact-us" 
          class="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
        >
          PURCHASE
        </a>
      </div>
    </section>
  
      <!-- Artwork Gallery -->
      <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="(artwork, index) in artworks" 
            :key="index" 
            class="relative overflow-hidden rounded-lg cursor-pointer group"
            @click="openArtworkModal(artwork)"
          >
            <!-- Artwork Card with Flip Effect -->
            <div class="relative w-full h-[400px] perspective-1000">
              <div 
                class="absolute w-full h-full transition-all duration-700 transform-style-3d"
                :class="{'rotate-y-180': artwork.isFlipped}"
                @mouseenter="artwork.isFlipped = true"
                @mouseleave="artwork.isFlipped = false"
              >
                <!-- Front of Card -->
                <div class="absolute w-full h-full backface-hidden">
                  <img 
                    :src="artwork.image" 
                    :alt="artwork.title" 
                    class="w-full h-full object-cover"
                  />
                </div>
                
                <!-- Back of Card (Flipped View) -->
                <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900">
                  <img 
                    :src="artwork.imageAlt" 
                    :alt="artwork.title + ' (alternate view)'" 
                    class="w-full h-full object-cover opacity-80"
                  />
                  <div class="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 class="text-xl font-bold mb-2">{{ artwork.title }}</h3>
                    <p class="text-sm mb-3">{{ artwork.shortDescription }}</p>
                    <p class="text-lg font-semibold">From ${{ artwork.price }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Hover Overlay -->
            <div 
              class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
              v-if="!artwork.isFlipped"
            >
              <h3 class="text-xl font-bold mb-2">{{ artwork.title }}</h3>
              <p class="text-sm mb-3">{{ artwork.shortDescription }}</p>
              <p class="text-lg font-semibold">From ${{ artwork.price }}</p>
              <button class="bg-white rounded-lg text-black px-4 py-2.5 mt-2 hover:bg-gray-200 transition-all duration-300">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <TestimonialsCarousel />
  
      <!-- Artwork Preview Modal -->
      <Teleport to="body">
        <div 
          v-if="selectedArtwork" 
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-all duration-500"
          :class="{'opacity-100': modalOpen, 'opacity-0': !modalOpen}"
        >
          <div 
            class="relative w-full max-w-4xl bg-white p-4 md:p-8 rounded-lg shadow-xl transform transition-all duration-500"
            :class="{'translate-y-0 scale-100': modalOpen, 'translate-y-8 scale-95': !modalOpen}"
          >
            <div class="flex flex-col md:flex-row gap-8">
              <div class="w-full md:w-1/2">
                <img 
                  :src="selectedArtwork.image" 
                  :alt="selectedArtwork.title" 
                  class="w-full h-auto object-cover rounded"
                />
              </div>
              <div class="w-full md:w-1/2">
                <h2 class="text-2xl font-bold mb-4">{{ selectedArtwork.title }}</h2>
                <p class="text-lg mb-2">From ${{ selectedArtwork.price }}</p>
                <p class="text-sm text-gray-400 mb-6">{{ selectedArtwork.description }}</p>
                
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-2">Size *</label>
                  <select 
                    v-model="selectedSize" 
                    class="w-full p-2 border border-gray-700 bg-black text-white rounded"
                  >
                    <option disabled value="">Select</option>
                    <option 
                      v-for="size in selectedArtwork.sizes" 
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
                      class="px-3 py-1 border border-gray-700 hover:bg-gray-800"
                    >
                      -
                    </button>
                    <input 
                      v-model="quantity" 
                      type="number" 
                      min="1" 
                      class="w-16 p-1 text-center border-t border-b border-gray-700 bg-black text-white"
                    />
                    <button 
                      @click="quantity++" 
                      class="px-3 py-1 border border-gray-700 hover:bg-gray-800"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button 
                  @click="addToCart" 
                  class="w-full text-white py-3 font-medium  border rounded-lg bg-black transition-colors duration-300"
                >
                  Add to Cart
                </button>
                
                <div class="mt-8 space-y-4">
                  <div class="border-t border-gray-800 pt-4">
                    <div class="flex justify-between items-center">
                      <h3 class="font-medium">PRODUCT INFO</h3>
                      <button class="text-xl">+</button>
                    </div>
                  </div>
                  <div class="border-t border-gray-800 pt-4">
                    <div class="flex justify-between items-center">
                      <h3 class="font-medium">RETURN & REFUND POLICY</h3>
                      <button class="text-xl">+</button>
                    </div>
                  </div>
                  <div class="border-t border-gray-800 pt-4">
                    <div class="flex justify-between items-center">
                      <h3 class="font-medium">SHIPPING INFO</h3>
                      <button class="text-xl">-</button>
                    </div>
                    <div class="mt-2 text-sm">
                      <p>Free worldwide shipping</p>
                      <p>Estimated delivery time: 5-8 Business days after placing order.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Navigation Buttons -->
            <div class="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4">
              <button 
                @click="navigateToPrevArtwork" 
                class="bg-white/10 hover:bg-white/20 border-4 p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button 
                @click="navigateToNextArtwork" 
                class="bg-white/10 hover:bg-white/20 border-4 p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
            
            <!-- Close button - intentionally not included as per requirements -->
          </div>
        </div>
      </Teleport>
  
      <!-- Full Screen Modal -->
      <Teleport to="body">
        <div 
          v-if="fullScreenModalOpen" 
          class="fixed inset-0 z-50 bg-white transition-all duration-500 overflow-y-auto"
          :class="{'opacity-100': fullScreenModalOpen, 'opacity-0': !fullScreenModalOpen}"
        >
          <div class="container mx-auto px-4 py-8">
            <div class="flex justify-between items-center mb-6">
              <div class="text-sm breadcrumbs">
                <ul class="flex space-x-2">
                  <li><NuxtLink to="/" class="hover:text-gray-300">Home</NuxtLink></li>
                  <li><span>/</span></li>
                  <li><NuxtLink to="/shop" class="hover:text-gray-300">Shop</NuxtLink></li>
                  <li><span>/</span></li>
                  <li>{{ fullScreenArtwork?.title }}</li>
                </ul>
              </div>
              <div class="flex space-x-4">
                <button 
                  @click="navigateToPrevFullScreen" 
                  class="flex items-center hover:text-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                  <span>Prev</span>
                </button>
                <button 
                  @click="navigateToNextFullScreen" 
                  class="flex items-center hover:text-gray-300"
                >
                  <span>Next</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img 
                  :src="fullScreenArtwork?.image" 
                  :alt="fullScreenArtwork?.title" 
                  class="w-full h-auto object-contain"
                />
                <div class="grid grid-cols-5 gap-2 mt-4">
                  <div 
                    v-for="(thumb, index) in fullScreenArtwork?.thumbnails" 
                    :key="index" 
                    class="cursor-pointer border-2"
                    :class="{'border-white': selectedThumb === index, 'border-transparent': selectedThumb !== index}"
                    @click="selectedThumb = index"
                  >
                    <img :src="thumb" :alt="`Thumbnail ${index + 1}`" class="w-full h-auto" />
                  </div>
                </div>
              </div>
              
              <div>
                <h1 class="text-2xl font-bold mb-4">{{ fullScreenArtwork?.title }}</h1>
                <p class="text-xl mb-2">From ${{ fullScreenArtwork?.price }}</p>
                <p class="text-sm text-gray-400 mb-4">{{ fullScreenArtwork?.saleInfo }}</p>
                
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-2">Size *</label>
                  <select 
                    v-model="selectedFullScreenSize" 
                    class="w-full p-2 border border-gray-700 bg-black text-white rounded"
                  >
                    <option disabled value="">Select</option>
                    <option 
                      v-for="size in fullScreenArtwork?.sizes" 
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
                      @click="fullScreenQuantity > 1 ? fullScreenQuantity-- : null" 
                      class="px-3 py-2.5 border border-gray-700"
                    >
                      -
                    </button>
                    <input 
                      v-model="fullScreenQuantity" 
                      type="number" 
                      min="1" 
                      class="w-16 p-1 py-2.5 text-center border-t border-b border-gray-700 bg-black text-white"
                    />
                    <button 
                      @click="fullScreenQuantity++" 
                      class="px-3 py-2.5 border border-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button 
                  @click="addToCartFromFullScreen" 
                  class="w-full text-white bg-black py-3 text-sm font-medium rounded-lg  transition-colors duration-300"
                >
                  Add to Cart
                </button>
                
                <div class="mt-8 space-y-4">
                  <div class="border-t border-gray-800 pt-4">
                    <div 
                      class="flex justify-between items-center cursor-pointer"
                      @click="toggleSection('productInfo')"
                    >
                      <h3 class="font-medium">PRODUCT INFO</h3>
                      <button class="text-xl">{{ openSections.productInfo ? '-' : '+' }}</button>
                    </div>
                    <div v-if="openSections.productInfo" class="mt-2 text-sm">
                      <p>{{ fullScreenArtwork?.description }}</p>
                    </div>
                  </div>
                  
                  <div class="border-t border-gray-800 pt-4">
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
                  
                  <div class="border-t border-gray-800 pt-4">
                    <div 
                      class="flex justify-between items-center cursor-pointer"
                      @click="toggleSection('shippingInfo')"
                    >
                      <h3 class="font-medium">SHIPPING INFO</h3>
                      <button class="text-xl">{{ openSections.shippingInfo ? '-' : '+' }}</button>
                    </div>
                    <div v-if="openSections.shippingInfo" class="mt-2 text-sm">
                      <p>Free worldwide shipping</p>
                      <p>Estimated delivery time: 5-8 Business days after placing order.</p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-8">
                  <h3 class="text-xl font-medium mb-4">Reviews</h3>
                  <div class="flex items-center mb-2">
                    <div class="flex">
                      <span v-for="i in 5" :key="i" class="text-xl">
                        <span v-if="i <= Math.floor(fullScreenArtwork?.rating || 0)">★</span>
                        <span v-else-if="i - 0.5 <= fullScreenArtwork?.rating || 0">★</span>
                        <span v-else>☆</span>
                      </span>
                    </div>
                    <span class="ml-2 text-xl">{{ fullScreenArtwork?.rating }}</span>
                  </div>
                  <p class="text-sm text-gray-400 mb-4">Based on {{ fullScreenArtwork?.reviewCount }} reviews</p>
                  
                  <button class="border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors duration-300">
                    Leave a Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, computed } from 'vue'
  import hero1 from "@/assets/img/commission-art1.jpg";
import hero2 from "@/assets/img/snap.jpg";
  import featured1 from "@/assets/img/featured1.avif";
    import featured2 from "@/assets/img/featured2.jpg";
    import featured3 from "@/assets/img/featured3.jpg";
    import featured4 from "@/assets/img/featured4.avif";
    import featured5 from "@/assets/img/featured5.avif";
    import featured6 from "@/assets/img/featured6.avif";
    import featured7 from "@/assets/img/featured7.avif";
    import featured8 from "@/assets/img/featured8.avif";
    import featured9 from "@/assets/img/featured9.avif";
    import featured10 from "@/assets/img/featured10.avif";
    import featured11 from "@/assets/img/featured11.avif";
  
  // Types
  interface Size {
    id: string;
    name: string;
    price: number;
  }
  
  interface Artwork {
    id: string;
    title: string;
    image: string;
    imageAlt: string;
    price: number;
    description: string;
    shortDescription: string;
    sizes: Size[];
    isFlipped: boolean;
    thumbnails: string[];
    rating: number;
    reviewCount: number;
    saleInfo: string;
  }
  
  // Sample data
  const artworks = reactive<Artwork[]>([
    {
      id: '1',
      title: 'Guardian Angel',
      image: featured11,
      imageAlt: featured10,
      price: 185,
      shortDescription: 'A powerful depiction of divine protection',
      description: 'This artwork denotes the suffering of Christ on His way to Calvary and then ponder how Christ exhibits each of the qualities of love in His Passion.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 185 },
        { id: 'large', name: 'Large (24" x 36")', price: 285 }
      ],
      isFlipped: false,
      thumbnails: [
        featured1,   featured2,   featured3,   featured4,   featured5,
      ],
      rating: 4.7,
      reviewCount: 3,
      saleInfo: 'Spring Sale!!! Enjoy 50% off!'
    },
    {
      id: '2',
      title: 'Avenging Angel',
      image: hero1,
      imageAlt: hero1,
      price: 195,
      shortDescription: 'A striking image of divine justice',
      description: 'This powerful artwork represents divine justice and protection, showing the balance between mercy and judgment.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 195 },
        { id: 'large', name: 'Large (24" x 36")', price: 295 }
      ],
      isFlipped: false,
      thumbnails: [
      hero1,   featured2,   featured3,   featured4,   featured5,
      ],
      rating: 4.9,
      reviewCount: 7,
      saleInfo: 'Spring Sale!!! Enjoy 50% off!'
    },
    {
      id: '3',
      title: 'Cosmic Waterfall',
      image: featured11,
      imageAlt: featured10,
      price: 165,
      shortDescription: 'A mesmerizing blend of cosmic energy and natural beauty',
      description: 'This artwork combines the beauty of a waterfall with the mystery of the cosmos, creating a unique visual experience that transcends ordinary reality.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 165 },
        { id: 'large', name: 'Large (24" x 36")', price: 265 }
      ],
      isFlipped: false,
      thumbnails: [
      featured1,   featured2,   featured3,   featured4,   featured5,
      ],
      rating: 4.8,
      reviewCount: 5,
      saleInfo: 'Spring Sale!!! Enjoy 50% off!'
    },
    {
      id: '4',
      title: 'Sacred Hands',
      image: featured11,
      imageAlt: featured10,
      price: 155,
      shortDescription: 'A powerful symbol of faith and devotion',
      description: 'This artwork captures the essence of faith through the simple yet profound imagery of hands in prayer, reminding us of our connection to the divine.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 155 },
        { id: 'large', name: 'Large (24" x 36")', price: 255 }
      ],
      isFlipped: false,
      thumbnails: [
      featured1,   featured2,   featured3,   featured4,   featured5,
      ],
      rating: 4.6,
      reviewCount: 4,
      saleInfo: 'Spring Sale!!! Enjoy 50% off!'
    },
    {
      id: '5',
      title: 'Sunset Silhouette',
      image: featured11,
      imageAlt: featured10,
      price: 175,
      shortDescription: 'A dramatic silhouette against a vibrant sunset',
      description: 'This artwork captures the magic of a sunset, with a silhouette figure creating a powerful contrast against the vibrant colors of the sky.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 175 },
        { id: 'large', name: 'Large (24" x 36")', price: 275 }
      ],
      isFlipped: false,
      thumbnails: [
      featured1,   featured2,   featured3,   featured4,   featured5,
      ],
      rating: 4.5,
      reviewCount: 6,
      saleInfo: 'Spring Sale!!! Enjoy 50% off!'
    },
    {
      id: '6',
      title: 'Moonlit Lake',
      image: featured11,
      imageAlt: featured10,
      price: 185,
      shortDescription: 'A serene landscape bathed in moonlight',
      description: 'This artwork captures the tranquil beauty of a lake at night, with the moon casting its gentle light across the water and surrounding landscape.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 185 },
        { id: 'large', name: 'Large (24" x 36")', price: 285 }
      ],
      isFlipped: false,
      thumbnails: [
      featured1,   featured2,   featured3,   featured4,   featured5,
      ],
      rating: 4.9,
      reviewCount: 8,
      saleInfo: 'Spring Sale!!! Enjoy 50% off!'
    }
  ]);
  
  // Modal state
  const modalOpen = ref(false);
  const selectedArtwork = ref<Artwork | null>(null);
  const selectedSize = ref('');
  const quantity = ref(1);
  
  // Full screen modal state
  const fullScreenModalOpen = ref(false);
  const fullScreenArtwork = ref<Artwork | null>(null);
  const selectedFullScreenSize = ref('');
  const fullScreenQuantity = ref(1);
  const selectedThumb = ref(0);
  
  // Accordion sections
  const openSections = reactive({
    productInfo: false,
    returnPolicy: false,
    shippingInfo: true
  });
  
  // Methods
  const openArtworkModal = (artwork: Artwork) => {
    selectedArtwork.value = artwork;
    selectedSize.value = artwork.sizes[0].id;
    quantity.value = 1;
    modalOpen.value = true;
  };
  
  const closeArtworkModal = () => {
    modalOpen.value = false;
    setTimeout(() => {
      selectedArtwork.value = null;
    }, 500);
  };
  
  const openFullScreenModal = (artwork: Artwork) => {
    fullScreenArtwork.value = artwork;
    selectedFullScreenSize.value = artwork.sizes[0].id;
    fullScreenQuantity.value = 1;
    fullScreenModalOpen.value = true;
    selectedThumb.value = 0;
  };
  
  const closeFullScreenModal = () => {
    fullScreenModalOpen.value = false;
    setTimeout(() => {
      fullScreenArtwork.value = null;
    }, 500);
  };
  
  const addToCart = () => {
    if (!selectedArtwork.value || !selectedSize.value) return;
    
    const size = selectedArtwork.value.sizes.find(s => s.id === selectedSize.value);
    if (!size) return;
    
    // Add to cart logic would go here
    // alert(`Added ${quantity.value} ${selectedArtwork.value.title} (${size.name}) to cart`);
    
    // Open full screen modal
    openFullScreenModal(selectedArtwork.value);
    closeArtworkModal();
  };
  
  const addToCartFromFullScreen = () => {
    if (!fullScreenArtwork.value || !selectedFullScreenSize.value) return;
    
    const size = fullScreenArtwork.value.sizes.find(s => s.id === selectedFullScreenSize.value);
    if (!size) return;
    
    // Add to cart logic would go here
    // alert(`Added ${fullScreenQuantity.value} ${fullScreenArtwork.value.title} (${size.name}) to cart`);
  };
  
  const navigateToPrevArtwork = () => {
    if (!selectedArtwork.value) return;
    
    const currentIndex = artworks.findIndex(a => a.id === selectedArtwork.value?.id);
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    selectedArtwork.value = artworks[prevIndex];
    selectedSize.value = selectedArtwork.value.sizes[0].id;
  };
  
  const navigateToNextArtwork = () => {
    if (!selectedArtwork.value) return;
    
    const currentIndex = artworks.findIndex(a => a.id === selectedArtwork.value?.id);
    const nextIndex = (currentIndex + 1) % artworks.length;
    selectedArtwork.value = artworks[nextIndex];
    selectedSize.value = selectedArtwork.value.sizes[0].id;
  };
  
  const navigateToPrevFullScreen = () => {
    if (!fullScreenArtwork.value) return;
    
    const currentIndex = artworks.findIndex(a => a.id === fullScreenArtwork.value?.id);
    const prevIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    fullScreenArtwork.value = artworks[prevIndex];
    selectedFullScreenSize.value = fullScreenArtwork.value.sizes[0].id;
    selectedThumb.value = 0;
  };
  
  const navigateToNextFullScreen = () => {
    if (!fullScreenArtwork.value) return;
    
    const currentIndex = artworks.findIndex(a => a.id === fullScreenArtwork.value?.id);
    const nextIndex = (currentIndex + 1) % artworks.length;
    fullScreenArtwork.value = artworks[nextIndex];
    selectedFullScreenSize.value = fullScreenArtwork.value.sizes[0].id;
    selectedThumb.value = 0;
  };
  
  const toggleSection = (section: keyof typeof openSections) => {
    openSections[section] = !openSections[section];
  };
  </script>
  
  <style scoped>
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .transform-style-3d {
    transform-style: preserve-3d;
  }
  
  .backface-hidden {
    backface-visibility: hidden;
  }
  
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  </style>