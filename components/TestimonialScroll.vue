<template>
    <div id="testimonials" class="w-full overflow-hidden bg-gray-25 py-32">
        <section class="pl-10 lg:pl-32">
            <div data-aos="fade-up" class="inline-block px-4 py-2.5 mb-6 bg-gray-50 rounded-full">
                <span class="text-[#284d79] font-medium">Testimonials</span>
            </div>
            <h1 data-aos="fade-up" class="text-4xl md:text-5xl font-medium text-gray-900 mb-4 -mt-2">
                What Our Clients Say
            </h1>
            <p data-aos="fade-up" class="text-gray-600 mb-16">
                Discover what art collectors and enthusiasts have to say about their experience
            </p>
        </section>

        <div data-aos="fade-up" class="relative">
            <!-- Single row - Left to Right with controls -->
            <div class="relative group">
                <!-- Navigation Buttons -->
                <button @click="scrollManually(-1)"
                    class="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                    <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button @click="scrollManually(1)"
                    class="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                    <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                <div class="scroll-container">
                    <div ref="scrollTrack" class="scroll-track" @mouseenter="pauseAnimation()"
                        @wheel="handleWheel($event)" @touchstart="handleTouchStart($event)"
                        @touchmove="handleTouchMove($event)" @touchend="handleTouchEnd($event)"
                        @mousedown="handleMouseDown($event)" @mousemove="handleMouseMove($event)"
                        @mouseup="handleMouseUp($event)" @mouseleave="handleMouseLeave($event)"
                        :style="{
                            transform: `translateX(${scrollPosition}px)`,
                            transition: isAnimating ? 'none' : 'transform 0.3s ease-out'
                        }">
                        <div v-for="testimonial in duplicatedTestimonials"
                            :key="`${testimonial.id}-${testimonial.copyIndex}-${testimonial.originalIndex}`"
                            class="testimonial-card">
                            <div
                                class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-[380px] h-[240px] flex flex-col justify-between hover:shadow-lg transition-all duration-300 select-none">
                                <div class="flex-1">
                                    <div class="flex items-start mb-3">
                                        <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                        </svg>
                                    </div>
                                    <p class="text-gray-700 text-base leading-relaxed line-clamp-4">{{ testimonial.content }}</p>
                                </div>
                                <div class="flex items-center mt-4">
                                    <div v-if="testimonial.avatar === 'initials'"
                                        :class="['w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm', testimonial.avatarColor]">
                                        {{ testimonial.initials }}</div>
                                    <img v-else :src="testimonial.avatar" :alt="testimonial.name"
                                        class="w-11 h-11 rounded-full object-cover" />
                                    <div class="ml-3 min-w-0 flex-1">
                                        <p class="text-gray-900 font-semibold text-sm truncate">{{ testimonial.name }}</p>
                                        <p class="text-gray-500 text-xs truncate">{{ testimonial.productName }}</p>
                                        <div class="flex items-center mt-1">
                                            <StarIcon v-for="n in testimonial.rating" :key="`filled-${n}`"
                                                class="h-3 w-3 text-yellow-400 fill-current" />
                                            <StarIcon v-for="n in (5 - testimonial.rating)" :key="`empty-${n}`"
                                                class="h-3 w-3 text-gray-300" />
                                        </div>
                                    </div>
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
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useFetchAllReviews } from "@/composables/modules/review/useFetchReviews"
import { useFetchReviews } from "@/composables/modules/review-mgt/useFetchReviews"
import { StarIcon } from 'lucide-vue-next';

// Interface definitions remain the same
interface ProductId {
    _id: string
    name: string
    price: number
    images: string[]
    discountPercentage: number
    id: string
}

interface Review {
    _id: string
    productId: ProductId
    userName: string
    email: string
    userRole: string
    rating: number
    comment: string
    title: string
    imageUrls: string[]
    status: string
    createdAt: string
    updatedAt: string
    approvedAt?: string
    approvedBy?: string
    id: string
}

interface AdminReview {
    _id: string
    productName: string
    customerName: string
    comment: string
    starRating: number
    createdAt: Date
    updatedAt: Date
}

interface Testimonial {
    id: string;
    content: string;
    name: string;
    role: string;
    avatar: string;
    initials?: string;
    avatarColor?: string;
    productName: string;
    rating: number;
    copyIndex?: number; // Added for unique keys in duplicated arrays
    originalIndex?: number; // Added for unique keys in duplicated arrays
    source: 'regular' | 'admin';
}

const { loading, reviews } = useFetchAllReviews();
const { reviews: adminReviews, loading: fetchingAdminReviews } = useFetchReviews();

// Animation and scroll state
const scrollTrack = ref<HTMLElement>();
const scrollPosition = ref(0);
const isAnimating = ref(true);
const animationFrame = ref<number>();

// Interaction state
const isDragging = ref(false);
const startX = ref(0);
const startScrollPosition = ref(0);
const velocity = ref(0);
const lastMoveTime = ref(0);
const lastMoveX = ref(0);

// Animation settings
const CARD_WIDTH = 404; // 380px + 24px margin
const SCROLL_SPEED = 1.2;
const MANUAL_SCROLL_AMOUNT = CARD_WIDTH;

// Transform functions (same as before)
const regularTestimonials = computed<Testimonial[]>(() => {
    if (!reviews.value) return [];
    return reviews.value.map((review: Review) => ({
        id: review.id,
        content: review.comment,
        name: review.userName,
        role: review.userRole,
        avatar: review.productId.images && review.productId.images.length > 0
            ? review.productId.images[0]
            : "/placeholder.svg?height=48&width=48",
        productName: review.productId.name,
        rating: review.rating,
        source: 'regular' as const,
    }));
});

const generateInitials = (name: string): string => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).slice(0, 2).join('');
};

const generateAvatarColor = (name: string): string => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-yellow-500', 'bg-red-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500', 'bg-emerald-500', 'bg-violet-500'];
    const index = name.length % colors.length;
    return colors[index];
};

const adminTestimonials = computed<Testimonial[]>(() => {
    if (!adminReviews.value) return [];
    return adminReviews.value.map((review: AdminReview) => ({
        id: review._id,
        content: review.comment,
        name: review.customerName,
        role: 'Customer',
        avatar: 'initials',
        initials: generateInitials(review.customerName),
        avatarColor: generateAvatarColor(review.customerName),
        productName: review.productName,
        rating: review.starRating,
        source: 'admin' as const,
    }));
});

const allTestimonials = computed<Testimonial[]>(() => {
    return [...regularTestimonials.value, ...adminTestimonials.value];
});

// Create 3x duplication for seamless infinite scroll
const duplicatedTestimonials = computed<Testimonial[]>(() => {
    const testimonials = allTestimonials.value;
    if (testimonials.length === 0) return [];
    // Create 3 copies of the testimonials, adding a unique index for keys
    return [
        ...testimonials.map((t, i) => ({ ...t, copyIndex: 0, originalIndex: i })),
        ...testimonials.map((t, i) => ({ ...t, copyIndex: 1, originalIndex: i })),
        ...testimonials.map((t, i) => ({ ...t, copyIndex: 2, originalIndex: i })),
    ];
});

// Calculate dimensions for one full set of testimonials
const oneSetWidth = computed(() => allTestimonials.value.length * CARD_WIDTH);

// Smooth animation loop with proper infinite scroll reset
const animateScroll = () => {
    if (!isAnimating.value) return;
    scrollPosition.value -= SCROLL_SPEED;

    // Reset when scrolled past the second copy (entering the third)
    if (scrollPosition.value <= -oneSetWidth.value * 2) {
        scrollPosition.value += oneSetWidth.value; // Jump back to the start of the second copy
    }
    // Reset if scrolled backward past the first copy (entering the "virtual" previous copy)
    else if (scrollPosition.value >= 0) {
        scrollPosition.value -= oneSetWidth.value; // Jump back to the start of the second copy
    }

    animationFrame.value = requestAnimationFrame(animateScroll);
};

// Control functions
const pauseAnimation = () => {
    isAnimating.value = false;
    if (animationFrame.value) cancelAnimationFrame(animationFrame.value);
};

const resumeAnimation = () => {
    if (!isAnimating.value) {
        isAnimating.value = true;
        animateScroll();
    }
};

// Manual scroll with buttons
const scrollManually = (direction: number) => {
    pauseAnimation();
    const scrollAmount = MANUAL_SCROLL_AMOUNT * direction;

    scrollPosition.value -= scrollAmount;
    // Handle infinite boundaries for manual scroll
    if (scrollPosition.value <= -oneSetWidth.value * 2) {
        scrollPosition.value += oneSetWidth.value;
    } else if (scrollPosition.value >= 0) {
        scrollPosition.value -= oneSetWidth.value;
    }

    setTimeout(() => resumeAnimation(), 3000);
};

// Enhanced wheel handling
const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    pauseAnimation();
    const scrollAmount = event.deltaY * 0.8;

    scrollPosition.value -= scrollAmount;
    // Smooth infinite boundaries
    if (scrollPosition.value <= -oneSetWidth.value * 2) {
        scrollPosition.value += oneSetWidth.value;
    } else if (scrollPosition.value >= 0) {
        scrollPosition.value -= oneSetWidth.value;
    }

    setTimeout(() => resumeAnimation(), 2000);
};

// Touch handlers with improved performance
const handleTouchStart = (event: TouchEvent) => {
    pauseAnimation();
    isDragging.value = true;
    startX.value = event.touches[0].clientX;
    startScrollPosition.value = scrollPosition.value;
    velocity.value = 0;
    lastMoveTime.value = Date.now();
    lastMoveX.value = event.touches[0].clientX;
};

const handleTouchMove = (event: TouchEvent) => {
    if (!isDragging.value) return;
    event.preventDefault();
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - startX.value;
    const now = Date.now();
    const timeDelta = now - lastMoveTime.value;

    if (timeDelta > 0) {
        velocity.value = (currentX - lastMoveX.value) / timeDelta;
    }

    const newPosition = startScrollPosition.value + deltaX;

    scrollPosition.value = newPosition;
    if (scrollPosition.value <= -oneSetWidth.value * 2) {
        scrollPosition.value += oneSetWidth.value;
    } else if (scrollPosition.value >= 0) {
        scrollPosition.value -= oneSetWidth.value;
    }

    lastMoveTime.value = now;
    lastMoveX.value = currentX;
};

const handleTouchEnd = (event: TouchEvent) => {
    isDragging.value = false;
    const momentum = velocity.value * 50; // Apply momentum

    scrollPosition.value += momentum;
    if (scrollPosition.value <= -oneSetWidth.value * 2) {
        scrollPosition.value += oneSetWidth.value;
    } else if (scrollPosition.value >= 0) {
        scrollPosition.value -= oneSetWidth.value;
    }

    setTimeout(() => resumeAnimation(), 2500);
};

// Mouse handlers (similar logic to touch)
const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    pauseAnimation();
    isDragging.value = true;
    startX.value = event.clientX;
    startScrollPosition.value = scrollPosition.value;
    velocity.value = 0;
    lastMoveTime.value = Date.now();
    lastMoveX.value = event.clientX;
};

const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging.value) return;
    event.preventDefault();
    const currentX = event.clientX;
    const deltaX = currentX - startX.value;
    const now = Date.now();
    const timeDelta = now - lastMoveTime.value;

    if (timeDelta > 0) {
        velocity.value = (currentX - lastMoveX.value) / timeDelta;
    }

    const newPosition = startScrollPosition.value + deltaX;

    scrollPosition.value = newPosition;
    if (scrollPosition.value <= -oneSetWidth.value * 2) {
        scrollPosition.value += oneSetWidth.value;
    } else if (scrollPosition.value >= 0) {
        scrollPosition.value -= oneSetWidth.value;
    }

    lastMoveTime.value = now;
    lastMoveX.value = currentX;
};

const handleMouseUp = (event: MouseEvent) => {
    if (!isDragging.value) return;
    isDragging.value = false;
    const momentum = velocity.value * 50; // Apply momentum

    scrollPosition.value += momentum;
    if (scrollPosition.value <= -oneSetWidth.value * 2) {
        scrollPosition.value += oneSetWidth.value;
    } else if (scrollPosition.value >= 0) {
        scrollPosition.value -= oneSetWidth.value;
    }

    setTimeout(() => resumeAnimation(), 2500);
};

const handleMouseLeave = (event: MouseEvent) => {
    // Only trigger mouse up logic if dragging was active
    if (isDragging.value) {
        handleMouseUp(event);
    }
    setTimeout(() => resumeAnimation(), 1000);
};

// Initialize
onMounted(() => {
    // Set initial scroll position to show the middle copy
    scrollPosition.value = -oneSetWidth.value;
    animateScroll();
});

// Cleanup
onUnmounted(() => {
    if (animationFrame.value) cancelAnimationFrame(animationFrame.value);
});
</script>

<style scoped>
.scroll-container {
    overflow: hidden;
    width: 100%;
    cursor: grab;
}

.scroll-container:active {
    cursor: grabbing;
}

.scroll-track {
    display: flex;
    width: fit-content;
    will-change: transform;
    /* Ensure smooth transitions for manual controls */
    backface-visibility: hidden;
    transform-style: preserve-3d;
}

.testimonial-card {
    flex-shrink: 0;
    margin-right: 1.5rem;
}

.line-clamp-4 {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.select-none {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>
