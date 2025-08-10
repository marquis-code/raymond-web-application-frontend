<template>
  <div class="mt-20">
    <!-- Splash Screen for Loading States -->
    <SplashScreen 
      :show="showSplash" 
      :duration="0"
      @hide="onSplashHide"
    />
    
    <!-- Main Content - Hidden when splash is showing -->
    <div v-show="!showSplash">
      <ArtistHero />
      
      <!-- Promo Sale Section -->
      <HeroBanner :promosale="promosale" class="mt-16" :loading="fetchingPromoSale" />
      
      <!-- Products Section -->
      <section ref="productGalleryRef" class="pt-16 overflow-hidden">
        <div class="mx-auto px-4">
          <h2 class="text-xl font-bold text-center mb-12 slide-up">
            Shop Artworks
          </h2>
          
          <div class="relative product-slider">
            <!-- Navigation Arrows -->
            <button
              class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors"
              @click="scrollProducts('left')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            
            <ProductsMap :products="sortedProducts" />
            
            <button
              class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors"
              @click="scrollProducts('right')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <!-- Gallery & Portrait Order Section -->
      <section class="grid grid-cols-1 md:grid-cols-2">
        <CustomGallery />
        <CustomPortrait />
      </section>

      <!-- <TestimonialsCarousel /> -->

      <TestimonialScroll />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";
import hero1 from "@/assets/img/commission-art1.jpg";
import hero2 from "@/assets/img/raymond-hero.png";
import { useFetchProducts } from "@/composables/modules/products/useFetchProducts";
import { useFetchPromosale } from "@/composables/modules/promosale/useFetchPromosale";
import { useCurrencyConverter } from "@/composables/core/useCurrencyConverter";
// import { fixedInstallmentPayment } from "@/constants"; // Declare the variable before using it

// Splash Screen Control
const showSplash = ref(true);

const onSplashHide = () => {
  showSplash.value = false;
};

// Initialize currency converter
const {
  userCountry,
  userCurrency,
  exchangeRates,
  isLoading: currencyLoading,
  error: currencyError,
  lastUpdated,
  initializeUserCurrency,
  convertFromUSD,
  convertCurrency,
} = useCurrencyConverter();

const convertedPrice = ref<any>({});
const fromCurrency = ref<string>('USD');
const toCurrency = ref<string>('NGN');
const manualConversionResult = ref<any>(null);

// Available currencies for dropdown
const availableCurrencies = computed(() => {
  return Object.keys(exchangeRates.value).sort();
});

// Initialize on mount
onMounted(async () => {
  await initializeUserCurrency();
  updateConvertedPrice();
});

// Watch for currency changes
watch([userCurrency, exchangeRates], () => {
  updateConvertedPrice();
});

// Update converted price when user currency or exchange rates change
const updateConvertedPrice = () => {
  if (userCurrency.value && Object.keys(exchangeRates.value).length > 0) {
    convertedPrice.value = convertFromUSD(100); // Example conversion
  }
};

// Retry initialization on error
const retryInitialization = async () => {
  await initializeUserCurrency();
  updateConvertedPrice();
};

// Set default target currency to user currency when it changes
watch(userCurrency, (newCurrency) => {
  toCurrency.value = newCurrency;
});

const { products, loading } = useFetchProducts();
const { promosale, loading: fetchingPromoSale } = useFetchPromosale();

// Watch loading states and control splash screen
watch([loading, fetchingPromoSale, currencyLoading], ([productsLoading, promoLoading, currencyLoad]) => {
  const isAnyLoading = productsLoading || promoLoading || currencyLoad;
  
  if (!isAnyLoading && showSplash.value) {
    // Add a minimum display time for better UX
    setTimeout(() => {
      showSplash.value = false;
    }, 1500);
  } else if (isAnyLoading) {
    showSplash.value = true;
  }
});

import gsap from "gsap";
import PromoSaleCTA from "../components/PromoSaleCTA.vue";

const router = useRouter();

// Hero section image carousel
const heroImages = [hero2];
const currentImageIndex = ref(0);
let imageInterval: number | null = null;

// Typewriter effect refs
const titleRef = ref<HTMLElement | null>(null);
const taglineRef = ref<HTMLElement | null>(null);

// Parallax effect refs
const promotionRef = ref<HTMLElement | null>(null);
const parallaxBgRef = ref<HTMLElement | null>(null);

// Product gallery refs and state
const productGalleryRef = ref<HTMLElement | null>(null);
const productContainerRef = ref<HTMLElement | null>(null);
const productRefs = reactive<HTMLElement[]>([]);
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

// Navigation helper
const navigateTo = (path: string) => {
  router.push(path);
};

// Image carousel functionality
const startImageCarousel = () => {
  imageInterval = window.setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % heroImages.length;
  }, 5000);
};

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

// Updated function to get converted installment payment
const getConvertedInstallmentPayment = () => {
  const converted = convertFromUSD(fixedInstallmentPayment);
  return converted.formattedAmount || fixedInstallmentPayment;
};

// Updated function to get converted minimum price for each product
const getConvertedMinPrice = (product: any) => {
  let minUSDPrice = 0;
  if (product.sizes && product.sizes.length > 0) {
    minUSDPrice = Math.min(...product.sizes.map((size: any) => size.price));
  } else {
    minUSDPrice = product.price || 0;
  }
  
  // Convert from USD to user's currency using the composable
  const converted = convertFromUSD(minUSDPrice);
  return converted.formattedAmount || minUSDPrice;
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

// Computed property to sort products by position and filter out unavailable products
const sortedProducts = computed(() => {
  if (!products.value) return [];
  return [...products.value]
    .filter(product => product.isAvailable !== false) // Filter out products that are explicitly unavailable
    .sort((a, b) => {
      // Handle cases where position might be undefined or null
      const positionA = a.position ?? Number.MAX_SAFE_INTEGER;
      const positionB = b.position ?? Number.MAX_SAFE_INTEGER;
      return positionA - positionB;
    });
});

onBeforeUnmount(() => {
  // Clean up
  if (imageInterval) clearInterval(imageInterval);
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
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
