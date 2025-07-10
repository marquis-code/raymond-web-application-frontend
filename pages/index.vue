<template>
  <div class="mt-20">
    <!-- <div v-if="fetchingPromoSale" class="flex justify-center items-center py-20">
      <div class="relative">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent absolute top-0 left-0"></div>
      </div>
    </div> -->

    <!-- Hero Section with animated image carousel and typewriter effect -->
     <ArtistHero />
    <!-- <section class="relative">
      <div class="grid grid-cols-1 md:grid-cols-2">

        <div class="relative h-screen overflow-hidden">
          <div
            v-for="(image, index) in heroImages"
            :key="index"
            class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            :class="{
              'opacity-100': currentImageIndex === index,
              'opacity-0': currentImageIndex !== index,
            }"
          >
            <img
              :src="image"
              alt="Artist with artwork"
              class="w-full h-full"
            />
          </div>
        </div>


        <div
          class="bg-zinc-800 text-white p-8 md:p-16 flex flex-col justify-center"
        >
          <h1
            ref="titleRef"
            class="text-2xl md:text-4xl font-bold mb-4 slide-up"
          >
            RAYMOND AWORO ART
          </h1>
          <p
            class="text-base md:text-xl text-zinc-300 italic mb-8 overflow-hidden"
          >
            Creating Art; Exploring Life at the Intersection of Faith and
            Creativity
          </p>
          <div class="mt-6 md:hidden flex justify-center gap-x-8">
            <a
              href="https://web.facebook.com/people/raymondaworo/100067199633701/?mibextid=LQQJ4d"
              class="bg-white rounded-full p-2"
            >
              <span class="sr-only">Facebook</span>
              <img class="h-4 w-4" src="@/assets/icons/facebook.svg" />
            </a>
            <a
              href="https://www.instagram.com/raymondaworo/?igshid=OGQ5ZDc2ODk2ZA%3D%3D"
              class="bg-white rounded-full p-2"
            >
              <span class="sr-only">Instagram</span>
              <img class="h-4 w-4" src="@/assets/icons/instagram.svg" />
            </a>
            <a
              href="https://x.com/raymondaworo/status/1546911697776115714?s=46&t=wja9T8NIysGx2Vtni1WECQ"
              class="bg-white rounded-full p-2"
            >
              <span class="sr-only">X</span>
              <img class="h-4 w-4" src="@/assets/icons/logo-black.png" />
            </a>
            <a
              href="https://www.tiktok.com/@raymondaworo?_t=8fvTbrYZSA1&_r=1"
              class="bg-white rounded-full p-2"
            >
              <span class="sr-only">Tiktok</span>
              <img class="h-4 w-4" src="@/assets/icons/tiktok.svg" />
            </a>
            <a
              href="https://www.youtube.com/@raymondaworo"
              class="bg-white rounded-full p-2"
            >
              <span class="sr-only">YouTube</span>
              <img class="h-4 w-4" src="@/assets/icons/youtube.svg" />
            </a>
          </div>
        </div>
      </div>
    </section> -->

    <div v-if="fetchingPromoSale" class="flex items-center justify-center lg:py-44">
        <div class="relative">
          <!-- Main Loader -->
          <div class="w-16 h-16 border-4 border-gray-200 border-t-pink-500 rounded-full animate-spin"></div>
          
          <!-- Orbiting Dots -->
          <div class="absolute inset-0 animate-orbit-loader">
            <div class="absolute top-0 left-1/2 w-3 h-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full transform -translate-x-1/2 animate-pulse"></div>
          </div>
          <div class="absolute inset-0 animate-orbit-loader-reverse">
            <div class="absolute bottom-0 left-1/2 w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform -translate-x-1/2 animate-pulse"></div>
          </div>
          
          <!-- Loading Text -->
          <!-- <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm font-medium animate-pulse">
            Loading amazing offers...
          </div> -->
        </div>
      </div>
    <PromoSection class="mt-16" v-else :promosale="promosale" :loading="fetchingPromoSale" />


        <!-- Product Gallery with advanced scroll and hover effects -->
        <section ref="productGalleryRef" class="pt-16 overflow-hidden">
      <div class="mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-12 slide-up">
          Shop Artworks
        </h2>

        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="relative">
            <div
              class="animate-spin rounded-full h-20 w-20 border-4 border-gray-200"
            ></div>
            <div
              class="animate-spin rounded-full h-20 w-20 border-4 border-gray-900 border-t-transparent absolute top-0 left-0"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-8 h-8 bg-gray-900 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div v-else class="relative product-slider">
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

          <div
            ref="productContainerRef"
            class="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            @mousedown="startDrag"
            @mousemove="onDrag"
            @mouseup="endDrag"
            @mouseleave="endDrag"
            @touchstart="startDragTouch"
            @touchmove="onDragTouch"
            @touchend="endDragTouch"
          >
            <div
              v-for="(product, index) in products"
              :key="index"
              class="product-card flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-start relative group"
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
                  class="w-full h-80 rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  v-if="product.isFeatured"
                  class="absolute top-2 rounded-lg left-2 bg-black text-white text-xs px-2 py-1"
                >
                  Sale
                </div>
                <div
                  v-if="product.isNew"
                  class="absolute top-2 rounded-lg left-2 bg-black text-white text-xs px-2 py-1"
                >
                  New Arrival
                </div>
                <div
                  v-if="product.isBestseller"
                  class="absolute top-2 rounded-lg left-2 bg-black text-white text-xs px-2 py-1"
                >
                  Best Seller
                </div>
                <div
                  class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <button
                    class="bg-white text-black text-sm px-6 py-2 font-medium hover:bg-gray-100 transition quick-view-button"
                    @click="navigateTo(`/artworks/${product.id}`)"
                  >
                    Quick View
                  </button>
                </div>
              </div>
              <h3 class="text-center font-medium text-sm text-lg mb-1">
                {{ product?.name }}
              </h3>
              <p class="text-center font-medium text-sm text-gray-700 mb-1">
                From {{ formatCurrency(product.price, { showSymbol: true }) }} or {{ formatCurrency(fixedInstallmentPayment, { showSymbol: true }) }}/month
                <!-- From ${{ product.price }} or $50/month fixedInstallmentPayment -->
              </p>
            </div>
          </div>

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

    <!-- Gallery & Portrait Order Section with hover animations -->
    <section class="grid grid-cols-1 md:grid-cols-2">
      <!-- Gallery Section -->
      <div
        class="relative h-[500px] overflow-hidden section-transition cursor-pointer"
        @click="navigateTo('/artworks')"
      >
        <img
          src="@/assets/img/snap.jpg"
          alt="Artist with artwork"
          class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-blue-900 text-white p-4 transition-all duration-300 hover:bg-blue-800"
        >
          <h3 class="text-2xl font-bold mb-1">Gallery</h3>
          <p class="text-sm">
            Click here to view collection of original artworks
          </p>
        </div>
      </div>

      <!-- Portrait Order Section -->
      <div
        class="relative h-[500px] overflow-hidden section-transition cursor-pointer"
        @click="navigateTo('/commission')"
      >
        <img
          src="@/assets/img/potrait.png"
          alt="Portrait display"
          class="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-amber-800 text-white p-4 transition-all duration-300 hover:bg-amber-700"
        >
          <h3 class="text-2xl font-bold mb-1">Order a Portrait</h3>
          <p class="text-sm">
            Click here to order for a custom artwork made for you.
          </p>
        </div>
      </div>
    </section>

    <!-- <CourseTestimonialCarousel /> -->
    <TestimonialsCarousel />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive } from "vue";
import { useRouter } from "vue-router";
import hero1 from "@/assets/img/commission-art1.jpg";
import hero2 from "@/assets/img/raymond-hero.png";
import { useFetchProducts } from "@/composables/modules/products/useFetchProducts";
import { useFetchPromosale } from "@/composables/modules/promosale/useFetchPromosale";
import { useCurrencyConverter } from "@/composables/useConvertCurrency"
const {
  countryCode,
  currency,
  isLoading,
  error,
  currencyCode,
  currencySymbol,
  currencyName,
  detectCountry,
  formatCurrency,
  setCurrency,
  setCountry,
  getSupportedCurrencies,
  getSupportedCountries
} = useCurrencyConverter()

const fixedInstallmentPayment = ref(50)


// Auto-detect country on mount
onMounted(() => {
  detectCountry()
})

const { products, loading } = useFetchProducts();
const { promosale, loading: fetchingPromoSale } = useFetchPromosale();

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
