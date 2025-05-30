<template>
  <div>
    <!-- Hero Section with animated image carousel and typewriter effect -->
    <section class="relative pt-20">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <!-- Left side with artist image carousel -->
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
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- Right side with text and typewriter effect -->
        <div
          class="bg-zinc-800 text-white p-8 md:p-16 flex flex-col justify-center"
        >
          <h1
            ref="titleRef"
            class="text-3xl md:text-4xl font-bold mb-4 slide-up"
          >
            RAYMOND AWORO ART
          </h1>
          <p
            ref="taglineRef"
            class="text-lg md:text-xl text-zinc-300 italic mb-8 overflow-hidden"
          >
            <span class="typewriter-text"
              >Creating Art: Exploring Life at the Intersection of Faith and
              Creativity</span
            >
          </p>
        </div>
      </div>
    </section>

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
        <NuxtLink to="/prints"
          class="bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition-all hover:scale-105 transform"
        >
          Shop Here
        </NuxtLink>
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

    <!-- Product Gallery with advanced scroll and hover effects -->
    <section ref="productGalleryRef" class="pt-16 overflow-hidden">
      <div class="mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-12 slide-up">
          Featured Artworks
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
                From ${{ product.price }}
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

    <TestimonialsCarousel />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, reactive } from "vue";
import { useRouter } from "vue-router";
import hero1 from "@/assets/img/commission-art1.jpg";
import hero2 from "@/assets/img/snap.jpg";
import { useFetchProducts } from "@/composables/modules/products/useFetchProducts"

const { products, loading } = useFetchProducts()

import gsap from "gsap";

const router = useRouter();

// Hero section image carousel
const heroImages = [hero1, hero2];
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
