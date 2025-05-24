<template>
    <div class="min-h-screen bg-white text-black ">
      <div class="overflow-hidden pt-32">
        <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">PRINTS</h2>
              <p class="mt-6 text-xl/8 text-gray-600">Limited edition of 10 and 20 prints printed on Hahnemühle german etching 310 gsm. Prints are available in 2 sizes which are medium and large..</p>
              <p class="mt-6 text-base/7 text-gray-600">All prints arrive with Certificate of Authenticity.</p>
              <p class="mt-6 text-base/7 text-gray-600">All prints are shipped rolled in a protective tube only</p>
            </div>
            <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <img src="@/assets/img/print1.jpg"  alt="" class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover">
              </div>
              <div class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <img src="@/assets/img/print2.jpg"  alt="" class="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover">
                </div>
                <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <img src="@/assets/img/print3.png"  alt="" class="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover">
                </div>
                <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <img src="@/assets/img/print4.png"  alt="" class="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Sale Banner Section -->
      <!-- <div class="relative py-16 bg-black text-white">
        <div 
          class="absolute inset-0 bg-cover bg-center opacity-50"
          style="background-image: url('/placeholder.svg?height=600&width=1200')"
        ></div>
        
        <div class="container mx-auto px-4 relative z-10 text-center">
          <h2 
            class="text-2xl md:text-4xl font-bold mb-4"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          >
            NEW PRINTS EDITION !!!
          </h2>
          
          <h3 
            class="text-3xl md:text-5xl font-bold mb-6"
            v-motion
            :initial="{ opacity: 0, scale: 0.8 }"
            :enter="{ opacity: 1, scale: 1, transition: { delay: 300, duration: 800 } }"
          >
            NO GREATER LOVE
          </h3>
          
          <p 
            class="text-xl md:text-3xl font-bold mb-8"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 600, duration: 800 } }"
          >
            GET 50% OFF!!!!!
          </p>
          
          <button 
            class="bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 900, duration: 600 } }"
            @click="navigateTo('/shop')"
          >
            Shop Here
          </button>
        </div>
      </div> -->

          <!-- Promotion Banner with parallax effect -->
    <section
      ref="promotionRef"
      class="relative text-white py-60 overflow-hidden"
    >
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img
          src="@/assets/img/no-love.jpg"
          alt="Artwork background"
          class="w-full h-full object-cover"
          ref="parallaxBgRef"
        />
      </div>

      <!-- Dark Overlay -->
      <div class="absolute inset-0 bg-black opacity-60 z-10"></div>

      <!-- Content -->
      <div class="container mx-auto px-4 relative z-20 text-center">
        <h2 class="text-lg md:text-xl uppercase tracking-wider mb-4 fade-in">
          NEW PRINTS EDITION!!!
        </h2>
        <h3 class="text-4xl md:text-6xl font-bold mb-6 slide-up">
          NO GREATER LOVE
        </h3>
        <p class="text-2xl md:text-3xl mb-8 fade-in">GET 50% OFF!!!!!</p>
        <NuxtLink to=""
          class="bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition-all hover:scale-105 transform"
        >
          Shop Here
        </NuxtLink>
      </div>
    </section>
      
      <!-- Prints Gallery Section -->
      <div class="container mx-auto px-4 py-16">
        <h2 class="text-2xl font-bold mb-12 text-center">Our Collection</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
              v-for="(product, index) in products"
              :key="index"
              class="product-card  flex-shrink-0 w-full relative group"
              :ref="
                (el) => {
                  if (el) productRefs[index] = el;
                }
              "
            >
              <div class="relative mb-4 overflow-hidden">
                <img
                  :src="product.images[0]"
                  :alt="product.title"
                  class="w-full h-[400px]  rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  v-if="product.isFeatured"
                  class="absolute top-2 left-2 bg-black text-white text-sm px-2 py-1"
                >
                Sale
                </div>
                <div
                  v-if="product.isNew"
                  class="absolute top-2 left-2 bg-black text-white text-sm px-2 py-1"
                >
                  New Arrival
                </div>
                <div
                  v-if="product.isBestseller"
                  class="absolute top-2 left-2 bg-black text-white text-sm px-2 py-1"
                >
                Best Seller
                </div>
                <div
                  class="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <div class="group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                    <h3 class="text-xl font-bold mb-2">{{ product.name }}</h3>
                      <p v-html="product.description" class="text-sm mb-3"></p>
                      <p class="text-lg font-semibold">From ${{ product.price }}</p>
                      <NuxtLink 
                        class="bg-white text-black text-center px-4 py-2 mt-2 hover:bg-gray-200 transition-all duration-300"
                        :to="`/artworks/${product.id}`"
                      >
                        View Details
                      </NuxtLink>
                  </div>
                </div>
              </div>
          </div>
        </div>







        <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(print, index) in prints" 
            :key="index" 
            class="group rounded-xl relative"
          >
            <div class="relative w-full rounded-xl h-[400px] perspective-1000 cursor-pointer" @click="openPrintModal(print)">
              <div 
                class="absolute w-full h-full rounded-xl transition-all duration-700 transform-style-3d"
                :class="{'rotate-y-180': print.isFlipped}"
                @mouseenter="print.isFlipped = true"
                @mouseleave="print.isFlipped = false"
              >
                <div class="absolute w-full h-full backface-hidden">
                  <img 
                    :src="print.image" 
                    :alt="print.title" 
                    class="w-full h-full object-cover"
                  />
                  
                  <div 
                    v-if="print.isBestSeller" 
                    class="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1"
                  >
                    Best Seller
                  </div>
                </div>
                
                <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-100">
                  <img 
                    :src="print.imageAlt" 
                    :alt="print.title + ' (alternate view)'" 
                    class="w-full h-full object-cover opacity-90"
                  />
                  <div class="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <h3 class="text-xl font-bold mb-2">{{ print.title }}</h3>
                    <p class="text-sm mb-3">{{ print.shortDescription }}</p>
                    <p class="text-lg font-semibold">From ${{ print.price }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div 
              class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white"
              v-if="!print.isFlipped"
            >
              <h3 class="text-xl font-bold mb-2">{{ print.title }}</h3>
              <p class="text-sm mb-3">{{ print.shortDescription }}</p>
              <p class="text-lg font-semibold">From ${{ print.price }}</p>
              <button 
                class="bg-white text-black px-4 py-2 mt-2 hover:bg-gray-200 transition-all duration-300"
                @click.stop="openPrintModal(print)"
              >
                View Details
              </button>
            </div>
          </div>
        </div> -->
      </div>

      <TestimonialsCarousel />
      
      <!-- Print Modal -->
      <Teleport to="body">
        <div 
          v-if="selectedPrint" 
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-all duration-500"
          :class="{'opacity-100': printModalOpen, 'opacity-0': !printModalOpen}"
        >
          <div 
            class="relative w-full max-w-4xl bg-white p-4 md:p-8 rounded-lg shadow-xl transform transition-all duration-500 text-black"
            :class="{'translate-y-0 scale-100': printModalOpen, 'translate-y-8 scale-95': !printModalOpen}"
          >
            <div class="flex flex-col md:flex-row gap-8">
              <div class="w-full md:w-1/2">
                <img 
                  :src="selectedPrint.image" 
                  :alt="selectedPrint.title" 
                  class="w-full h-auto object-cover rounded"
                />
              </div>
              <div class="w-full md:w-1/2">
                <h2 class="text-2xl font-bold mb-4">{{ selectedPrint.title }}</h2>
                <p class="text-lg mb-2">From ${{ selectedPrint.price }}</p>
                <p class="text-sm text-gray-600 mb-6">{{ selectedPrint.saleInfo }}</p>
                
                <div class="mb-4">
                  <label class="block text-sm font-medium mb-2">Size *</label>
                  <select 
                    v-model="selectedPrintSize" 
                    class="w-full p-2 border border-gray-300 bg-white text-black rounded"
                  >
                    <option disabled value="">Select</option>
                    <option 
                      v-for="size in selectedPrint.sizes" 
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
                      @click="printQuantity > 1 ? printQuantity-- : null" 
                      class="px-3 py-1 border border-gray-300 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input 
                      v-model="printQuantity" 
                      type="number" 
                      min="1" 
                      class="w-16 p-1 text-center border-t border-b border-gray-300 bg-white text-black"
                    />
                    <button 
                      @click="printQuantity++" 
                      class="px-3 py-1 border border-gray-300 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button 
                  @click="addPrintToCart" 
                  class="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors duration-300"
                >
                  Add to Cart
                </button>
                
                <div class="mt-8 space-y-4">
                  <div class="border-t border-gray-200 pt-4">
                    <div class="flex justify-between items-center">
                      <h3 class="font-medium">PRODUCT INFO</h3>
                      <button class="text-xl">+</button>
                    </div>
                  </div>
                  <div class="border-t border-gray-200 pt-4">
                    <div class="flex justify-between items-center">
                      <h3 class="font-medium">RETURN & REFUND POLICY</h3>
                      <button class="text-xl">+</button>
                    </div>
                  </div>
                  <div class="border-t border-gray-200 pt-4">
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
                @click="navigateToPrevPrint" 
                class="bg-black/10 hover:bg-black/20 p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button 
                @click="navigateToNextPrint" 
                class="bg-black/10 hover:bg-black/20 p-2 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
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
import { useFetchProducts } from "@/composables/modules/products/useFetchProducts"
const { products, loading } = useFetchProducts()

  // Parallax effect refs
const promotionRef = ref<HTMLElement | null>(null);
const parallaxBgRef = ref<HTMLElement | null>(null);

// Parallax scroll effect
const handleScroll = () => {
  if (parallaxBgRef.value && promotionRef.value) {
    const scrollPosition = window.scrollY;
    const promotionPosition = promotionRef.value.offsetTop;
    const offset = scrollPosition - promotionPosition;

    if (
      scrollPosition > promotionPosition - window.innerHeight &&
      scrollPosition < promotionPosition + promotionRef.value.offsetHeight
    ) {
      parallaxBgRef.value.style.transform = `translateY(${offset * 0.4}px)`;
    }
  }
};

  
onMounted(() => {
  // Add scroll event listener for parallax
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  // Clean up
  // if (imageInterval) clearInterval(imageInterval);
  window.removeEventListener("scroll", handleScroll);
});

  // Types
  interface Size {
    id: string;
    name: string;
    price: number;
  }
  
  interface Print {
    id: string;
    title: string;
    image: string;
    imageAlt: string;
    price: number;
    description: string;
    shortDescription: string;
    sizes: Size[];
    isFlipped: boolean;
    isBestSeller: boolean;
    saleInfo: string;
  }
  
  // Sample data
  const prints = reactive<Print[]>([
    {
      id: '1',
      title: 'No Greater Love',
      image: featured1,
      imageAlt:featured1,
      price: 185,
      shortDescription: 'Greater Love has no one than this; to lay down one\'s life for one\'s friends.',
      description: 'This Artwork denotes the suffering of Christ on His way to Calvary and then ponder how Christ exhibits each of the qualities of love in His Passion.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 185 },
        { id: 'large', name: 'Large (24" x 36")', price: 285 }
      ],
      isFlipped: false,
      isBestSeller: true,
      saleInfo: 'Spring Sale!!! Enjoy 50% off!'
    },
    {
      id: '2',
      title: 'Guardian Angel',
      image: featured2,
      imageAlt:featured2,
      price: 195,
      shortDescription: 'A powerful depiction of divine protection',
      description: 'This powerful artwork represents divine protection, showing the guardian angel watching over and guiding those in need.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 195 },
        { id: 'large', name: 'Large (24" x 36")', price: 295 }
      ],
      isFlipped: false,
      isBestSeller: false,
      saleInfo: 'Spring Sale!!! Enjoy 50% off!'
    },
    {
      id: '3',
      title: 'Avenging Angel',
      image: featured3,
      imageAlt:featured3,
      price: 175,
      shortDescription: 'A striking image of divine justice',
      description: 'This powerful artwork represents divine justice and protection, showing the balance between mercy and judgment.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 175 },
        { id: 'large', name: 'Large (24" x 36")', price: 275 }
      ],
      isFlipped: false,
      isBestSeller: false,
      saleInfo: 'Spring Sale!!! Enjoy 50% off!'
    },
    {
      id: '4',
      title: 'Cosmic Waterfall',
      image: featured4,
      imageAlt:featured4,
      price: 165,
      shortDescription: 'A mesmerizing blend of cosmic energy and natural beauty',
      description: 'This artwork combines the beauty of a waterfall with the mystery of the cosmos, creating a unique visual experience that transcends ordinary reality.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 165 },
        { id: 'large', name: 'Large (24" x 36")', price: 265 }
      ],
      isFlipped: false,
      isBestSeller: true,
      saleInfo: 'Spring Sale!!! Enjoy 50% off!'
    },
    {
      id: '5',
      title: 'Sacred Hands',
      image: featured5,
      imageAlt:featured5,
      price: 155,
      shortDescription: 'A powerful symbol of faith and devotion',
      description: 'This artwork captures the essence of faith through the simple yet profound imagery of hands in prayer, reminding us of our connection to the divine.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 155 },
        { id: 'large', name: 'Large (24" x 36")', price: 255 }
      ],
      isFlipped: false,
      isBestSeller: false,
      saleInfo: 'Spring Sale!!! Enjoy 50% off!'
    },
    {
      id: '6',
      title: 'Heart of Creation',
      image: featured6,
      imageAlt:featured6,
      price: 185,
      shortDescription: 'A symbolic representation of life and creation',
      description: 'This artwork symbolizes the essence of life and creation, with the heart at the center of all existence, radiating energy and vitality.',
      sizes: [
        { id: 'medium', name: 'Medium (18" x 24")', price: 185 },
        { id: 'large', name: 'Large (24" x 36")', price: 285 }
      ],
      isFlipped: false,
      isBestSeller: false,
      saleInfo: 'Spring Sale!!! Enjoy 50% off!'
    }
  ]);
  
  // Modal state
  const printModalOpen = ref(false);
  const selectedPrint = ref<Print | null>(null);
  const selectedPrintSize = ref('');
  const printQuantity = ref(1);
  
  // Methods
  const openPrintModal = (print: Print) => {
    selectedPrint.value = print;
    selectedPrintSize.value = print.sizes[0].id;
    printQuantity.value = 1;
    printModalOpen.value = true;
  };
  
  const closePrintModal = () => {
    printModalOpen.value = false;
    setTimeout(() => {
      selectedPrint.value = null;
    }, 500);
  };
  
  const addPrintToCart = () => {
    if (!selectedPrint.value || !selectedPrintSize.value) return;
    
    const size = selectedPrint.value.sizes.find(s => s.id === selectedPrintSize.value);
    if (!size) return;
    
    // Add to cart logic would go here
    alert(`Added ${printQuantity.value} ${selectedPrint.value.title} (${size.name}) to cart`);
  };
  
  const navigateToPrevPrint = () => {
    if (!selectedPrint.value) return;
    
    const currentIndex = prints.findIndex(p => p.id === selectedPrint.value?.id);
    const prevIndex = (currentIndex - 1 + prints.length) % prints.length;
    selectedPrint.value = prints[prevIndex];
    selectedPrintSize.value = selectedPrint.value.sizes[0].id;
  };
  
  const navigateToNextPrint = () => {
    if (!selectedPrint.value) return;
    
    const currentIndex = prints.findIndex(p => p.id === selectedPrint.value?.id);
    const nextIndex = (currentIndex + 1) % prints.length;
    selectedPrint.value = prints[nextIndex];
    selectedPrintSize.value = selectedPrint.value.sizes[0].id;
  };


// Hero section image carousel
const currentImageIndex = ref(0);
let imageInterval: number | null = null;

// Typewriter effect refs
const titleRef = ref<HTMLElement | null>(null);
const taglineRef = ref<HTMLElement | null>(null);

// Product gallery refs and state
const productGalleryRef = ref<HTMLElement | null>(null);
const productContainerRef = ref<HTMLElement | null>(null);
const productRefs = reactive<HTMLElement[]>([]);
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

// Image carousel functionality
const startImageCarousel = () => {
  imageInterval = window.setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.length;
  }, 5000);
};


// Product slider drag functionality
const startDrag = (e: MouseEvent) => {
  if (!productContainerRef.value) return;

  isDragging.value = true;
  startX.value = e.pageX - productContainerRef.value.offsetLeft;
  scrollLeft.value = productContainerRef.value.scrollLeft;
};

const onDrag = (e: MouseEvent) => {
  if (!isDragging.value || !productContainerRef.value) return;

  e.preventDefault();
  const x = e.pageX - productContainerRef.value.offsetLeft;
  const walk = (x - startX.value) * 2; // Scroll speed multiplier
  productContainerRef.value.scrollLeft = scrollLeft.value - walk;
};

const endDrag = () => {
  isDragging.value = false;
};

// Touch events for mobile
const startDragTouch = (e: TouchEvent) => {
  if (!productContainerRef.value) return;

  isDragging.value = true;
  startX.value = e.touches[0].pageX - productContainerRef.value.offsetLeft;
  scrollLeft.value = productContainerRef.value.scrollLeft;
};

const onDragTouch = (e: TouchEvent) => {
  if (!isDragging.value || !productContainerRef.value) return;

  const x = e.touches[0].pageX - productContainerRef.value.offsetLeft;
  const walk = (x - startX.value) * 2;
  productContainerRef.value.scrollLeft = scrollLeft.value - walk;
};

const endDragTouch = () => {
  isDragging.value = false;
};

// Button scroll functionality
const scrollProducts = (direction: "left" | "right") => {
  if (!productContainerRef.value) return;

  const scrollAmount = productContainerRef.value.clientWidth * 0.8;
  if (direction === "left") {
    productContainerRef.value.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  } else {
    productContainerRef.value.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
};

// Animation on scroll
const animateOnScroll = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe product cards
  productRefs.forEach((el) => {
    if (el) observer.observe(el);
  });
};

onMounted(() => {
  // Start image carousel
  startImageCarousel();

  // Initialize GSAP animations
  if (titleRef.value && taglineRef.value) {
    gsap.from(titleRef.value, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(taglineRef.value.querySelector(".typewriter-text"), {
      width: 0,
      duration: 3,
      ease: "steps(40)",
      delay: 1,
    });
  }

  // Add scroll event listener for parallax
  window.addEventListener("scroll", handleScroll);

  // Initialize animations on scroll
  animateOnScroll();
});

onBeforeUnmount(() => {
  // Clean up
  if (imageInterval) clearInterval(imageInterval);
  window.removeEventListener("scroll", handleScroll);
});
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

  .scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

.typewriter-text {
  display: inline-block;
  overflow: hidden;
  border-right: 0.15em solid #888;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.05em;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #888;
  }
}
  </style>