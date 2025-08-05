<template>
  <div class="min-h-screen text-gray-900">
    <!-- Hero Section -->
    <section class="py-20 px-4 sm:px-6 mt-10 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div class="max-w-5xl mx-auto text-center">
        <p class="text-xl text-gray-600 mb-6 max-w-3xl mx-auto font-medium leading-relaxed animate-fade-in-up animation-delay-200">
          IF YOU ARE INTERESTED IN COLLECTING AN ORIGINAL PIECE, CLICK BELOW
        </p>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center justify-center px-10 py-2.5 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-xl transform group animate-fade-in-up animation-delay-400"
        >
          <span class="mr-2">PURCHASE</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-transform group-hover:translate-x-1"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </NuxtLink>
      </div>
    </section>

    <!-- Loading Spinner -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="relative">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-900 border-t-transparent absolute top-0 left-0"></div>
      </div>
    </div>

    <!-- Artwork Gallery -->
    <div v-else class="container mx-auto px-6 pt-10">
      <div class="text-center my-10">
        <h3 class="text-3xl font-light text-gray-800 mb-4 animate-fade-in-up">
          Original Artworks
        </h3>
        <div class="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto animate-scale-in animation-delay-300"></div>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-3 gap-1 lg:gap-2">
        <div
          v-for="(artwork, index) in sortedOriginals"
          :key="artwork._id"
          class="artwork-card group cursor-pointer relative animate-fade-in-up h-full"
          :style="{ animationDelay: `${index * 100}ms` }"
          @click="openFullScreenModal(artwork, index)"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <div class="relative border overflow-hidden group-hover:shadow-xl transition-all duration-700 h-full">
            <img
              :src="getFirstImage(artwork)"
              :alt="artwork.name"
              :class="{
                'scale-110': hoveredIndex === index,
                'scale-100': hoveredIndex !== index,
              }"
            />
            <div
              class="absolute inset-0 bg-black/50 backdrop-blur-[0.5px] transition-all duration-500"
              :class="{
                'opacity-100': hoveredIndex === index,
                'opacity-0': hoveredIndex !== index,
              }"
            ></div>
            <div
              class="absolute inset-0 flex items-center justify-center p-4 transition-all duration-500"
              :class="{
                'opacity-100': hoveredIndex === index,
                'opacity-0': hoveredIndex !== index,
              }"
            >
              <div class="text-center transform transition-all duration-700">
                <h3
                  class="text-base md:text-xl font-semibold text-white mb-3 tracking-wide drop-shadow-lg"
                  :class="{
                    'translate-y-0 opacity-100': hoveredIndex === index,
                    'translate-y-4 opacity-0': hoveredIndex !== index,
                  }"
                >
                  {{ artwork.name.toUpperCase() }}
                </h3>
                <div
                  class="w-12 h-0.5 bg-white mx-auto transition-all duration-700 delay-100"
                  :class="{
                    'scale-x-100 opacity-100': hoveredIndex === index,
                    'scale-x-0 opacity-0': hoveredIndex !== index,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Full Screen Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedArtwork"
          class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          @click="closeFullScreenModal"
        >
          <!-- Modal Container -->
          <div class="relative h-full flex flex-col" @click.stop>
            <!-- Header -->
            <div class="flex items-center justify-between p-4 md:p-6 bg-white/10 backdrop-blur-md border-b border-white/20">
              <!-- Navigation Info -->
              <div class="flex items-center space-x-4">
                <div class="text-white/90 text-sm font-medium">
                  {{ selectedArtworkIndex + 1 }} / {{ sortedOriginals.length }}
                </div>
              </div>
              <!-- Close Button - More Prominent -->
              <button
                @click="closeFullScreenModal"
                class="flex items-center justify-center w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/30"
                aria-label="Close artwork details"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-white"
                >
                  <path d="m18 6-12 12" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <!-- Main Content -->
            <div class="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
              <!-- Large Navigation Buttons - Positioned over image area -->
              <button
                @click="navigateToPrevious"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/30 lg:w-16 lg:h-16"
                aria-label="Previous artwork"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-white"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                @click="navigateToNext"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full transition-all duration-300 border border-white/30 lg:right-[25rem] lg:w-16 lg:h-16"
                aria-label="Next artwork"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-white"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              <!-- Mobile: Single scrollable container -->
              <div class="flex-1 flex flex-col lg:hidden overflow-y-auto">
                <!-- Image Section - Mobile -->
                <div class="flex-1 flex items-center justify-center p-4 md:p-8 relative min-h-[60vh]">
                  <!-- Image Container -->
                  <Transition
                    enter-active-class="transition-all duration-700 ease-out"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition-all duration-300 ease-in"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                    mode="out-in"
                  >
                    <div
                      :key="selectedArtwork._id"
                      class="relative w-full h-full flex items-center justify-center"
                    >
                      <img
                        :src="getFirstImage(selectedArtwork)"
                        :alt="selectedArtwork.name"
                        @load="imageLoaded = true"
                      />
                      <!-- Image Loading Overlay -->
                      <div
                        v-if="!imageLoaded"
                        class="absolute inset-0 bg-white/10 rounded-lg flex items-center justify-center"
                      >
                        <div class="flex items-center space-x-2 text-white/70">
                          <div class="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white/70"></div>
                          <span class="text-sm">Loading...</span>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>

                <!-- Details Section - Mobile -->
                <div class="w-full bg-white/95 backdrop-blur-md border-t border-white/20 flex-shrink-0">
                  <div class="p-6 space-y-6">
                    <!-- Title Section -->
                    <div class="animate-slide-in-right">
                      <h1 class="text-2xl md:text-3xl font-light mb-3 text-gray-900 tracking-wide">
                        {{ selectedArtwork.name.toUpperCase() }}
                      </h1>
                      <div class="w-16 h-0.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full"></div>
                    </div>

                    <!-- Description -->
                    <div
                      v-if="selectedArtwork.description"
                      class="animate-slide-in-right animation-delay-200"
                    >
                      <h3 class="text-lg font-semibold mb-3 text-gray-900">
                        About This Piece
                      </h3>
                      <div
                        v-html="selectedArtwork.description"
                        class="text-gray-700 leading-relaxed text-sm prose prose-gray max-w-none"
                      ></div>
                    </div>

                    <!-- Contact Section -->
                    <div class="animate-slide-in-right animation-delay-400">
                      <div class="bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                        <h3 class="font-semibold mb-2 text-white text-base">
                          Interested in This Piece?
                        </h3>
                        <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                          Contact our gallery to discuss availability, pricing,
                          and commission opportunities.
                        </p>
                        <NuxtLink
                          to="/contact"
                          class="block w-full bg-white text-gray-900 text-center py-3 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm"
                        >
                          INQUIRE NOW
                        </NuxtLink>
                      </div>
                    </div>

                    <!-- Progress Indicator -->
                    <div class="animate-slide-in-right animation-delay-500">
                      <div class="flex items-center justify-center space-x-3 pt-2">
                        <span class="text-xs text-gray-600">
                          {{ selectedArtworkIndex + 1 }} of {{ sortedOriginals.length }}
                        </span>
                        <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            class="h-full bg-gradient-to-r from-gray-700 to-gray-500 rounded-full transition-all duration-700"
                            :style="{
                              width: `${
                                ((selectedArtworkIndex + 1) / sortedOriginals.length) * 100
                              }%`,
                            }"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Desktop: Image Section -->
              <div class="hidden lg:flex flex-1 items-center justify-center p-4 md:p-8 relative">
                <!-- Image Container -->
                <Transition
                  enter-active-class="transition-all duration-700 ease-out"
                  enter-from-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100"
                  leave-active-class="transition-all duration-300 ease-in"
                  leave-from-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-95"
                  mode="out-in"
                >
                  <div
                    :key="selectedArtwork._id"
                    class="relative w-full h-full flex items-center justify-center"
                  >
                    <img
                      :src="getFirstImage(selectedArtwork)"
                      :alt="selectedArtwork.name"
                      @load="imageLoaded = true"
                    />
                    <!-- Image Loading Overlay -->
                    <div
                      v-if="!imageLoaded"
                      class="absolute inset-0 bg-white/10 rounded-lg flex items-center justify-center"
                    >
                      <div class="flex items-center space-x-2 text-white/70">
                        <div class="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white/70"></div>
                        <span class="text-sm">Loading...</span>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>

              <!-- Desktop: Details Sidebar -->
              <div class="hidden lg:block w-96 bg-white/95 backdrop-blur-md border-l border-white/20 overflow-y-auto">
                <div class="p-6 space-y-6">
                  <!-- Title Section -->
                  <div class="animate-slide-in-right">
                    <h1 class="text-2xl md:text-3xl font-light mb-3 text-gray-900 tracking-wide">
                      {{ selectedArtwork.name.toUpperCase() }}
                    </h1>
                    <div class="w-16 h-0.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-full"></div>
                  </div>

                  <!-- Description -->
                  <div
                    v-if="selectedArtwork.description"
                    class="animate-slide-in-right animation-delay-200"
                  >
                    <h3 class="text-lg font-semibold mb-3 text-gray-900">
                      About This Piece
                    </h3>
                    <div
                      v-html="selectedArtwork.description"
                      class="text-gray-700 leading-relaxed text-sm prose prose-gray max-w-none"
                    ></div>
                  </div>

                  <!-- Contact Section -->
                  <div class="animate-slide-in-right animation-delay-400">
                    <div class="bg-gradient-to-r from-gray-900 to-gray-800 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                      <h3 class="font-semibold mb-2 text-white text-base">
                        Interested in This Piece?
                      </h3>
                      <p class="text-gray-300 text-sm mb-4 leading-relaxed">
                        Contact our gallery to discuss availability, pricing,
                        and commission opportunities.
                      </p>
                      <NuxtLink
                        to="/contact"
                        class="block w-full bg-white text-gray-900 text-center py-3 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm"
                      >
                        INQUIRE NOW
                      </NuxtLink>
                    </div>
                  </div>

                  <!-- Progress Indicator -->
                  <div class="animate-slide-in-right animation-delay-500">
                    <div class="flex items-center justify-center space-x-3 pt-2">
                      <span class="text-xs text-gray-600">
                        {{ selectedArtworkIndex + 1 }} of {{ sortedOriginals.length }}
                      </span>
                      <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          class="h-full bg-gradient-to-r from-gray-700 to-gray-500 rounded-full transition-all duration-700"
                          :style="{
                            width: `${
                              ((selectedArtworkIndex + 1) / sortedOriginals.length) * 100
                            }%`,
                          }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useFetchOriginals } from "@/composables/modules/originals/useFetchOriginals";

// Use originals composable instead of products
const { loading, originals } = useFetchOriginals();

// State
const hoveredIndex = ref<number | null>(null);
const selectedArtwork = ref<any>(null);
const selectedArtworkIndex = ref<number>(0);
const modalOpen = ref(false);
const currentModalImageIndex = ref(0);
const imageLoaded = ref(false);

// Sort originals by position
const sortedOriginals = computed(() => {
  if (!originals.value) return [];
  return [...originals.value].sort((a, b) => (a.position || 0) - (b.position || 0));
});

// Methods
const getFirstImage = (artwork: any) => {
  if (!artwork.images || artwork.images.length === 0) return "";
  return artwork.images[0];
};

const openFullScreenModal = (artwork: any, index: number) => {
  selectedArtwork.value = artwork;
  selectedArtworkIndex.value = index;
  currentModalImageIndex.value = 0;
  imageLoaded.value = false;
  modalOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeFullScreenModal = () => {
  modalOpen.value = false;
  document.body.style.overflow = "";
  setTimeout(() => {
    selectedArtwork.value = null;
  }, 300);
};

const navigateToPrevious = () => {
  const currentIndex = selectedArtworkIndex.value;
  const newIndex = currentIndex === 0 ? sortedOriginals.value.length - 1 : currentIndex - 1;
  selectedArtwork.value = sortedOriginals.value[newIndex];
  selectedArtworkIndex.value = newIndex;
  currentModalImageIndex.value = 0;
  imageLoaded.value = false;
};

const navigateToNext = () => {
  const currentIndex = selectedArtworkIndex.value;
  const newIndex = currentIndex === sortedOriginals.value.length - 1 ? 0 : currentIndex + 1;
  selectedArtwork.value = sortedOriginals.value[newIndex];
  selectedArtworkIndex.value = newIndex;
  currentModalImageIndex.value = 0;
  imageLoaded.value = false;
};

const previousImage = () => {
  if (selectedArtwork.value && selectedArtwork.value.images.length > 1) {
    currentModalImageIndex.value =
      currentModalImageIndex.value === 0
        ? selectedArtwork.value.images.length - 1
        : currentModalImageIndex.value - 1;
    imageLoaded.value = false;
  }
};

const nextImage = () => {
  if (selectedArtwork.value && selectedArtwork.value.images.length > 1) {
    currentModalImageIndex.value =
      (currentModalImageIndex.value + 1) % selectedArtwork.value.images.length;
    imageLoaded.value = false;
  }
};

const setModalImage = (index: number) => {
  currentModalImageIndex.value = index;
  imageLoaded.value = false;
};

// Handle escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && modalOpen.value) {
    closeFullScreenModal();
  } else if (modalOpen.value) {
    if (e.key === "ArrowLeft") {
      navigateToPrevious();
    } else if (e.key === "ArrowRight") {
      navigateToNext();
    }
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
});
</script>

<style scoped>
.artwork-card {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.artwork-card:hover {
  transform: translateY(-8px);
}

/* Custom scrollbar for dark theme */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-in-right {
  animation: slideInRight 0.6s ease-out forwards;
  opacity: 0;
}

.animate-scale-in {
  animation: scaleIn 0.6s ease-out forwards;
  opacity: 0;
}

.animation-delay-100 {
  animation-delay: 0.1s;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-500 {
  animation-delay: 0.5s;
}

.animation-delay-1000 {
  animation-delay: 1s;
}

/* Prose styling for dark theme */
.prose-gray p {
  margin-bottom: 1rem;
  color: rgb(75, 85, 99);
}

.prose-gray strong {
  font-weight: 600;
  color: rgb(31, 41, 55);
}

.prose-gray em {
  font-style: italic;
}
</style>
