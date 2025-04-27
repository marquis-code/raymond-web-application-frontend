<template>
  <div>
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Featured Categories -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 
          class="text-3xl font-bold text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          Explore Art Categories
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="(category, index) in categories" 
            :key="category.name"
            class="relative overflow-hidden rounded-lg aspect-[4/3] group cursor-pointer"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
            @click="navigateTo(category.link)"
          >
            <img 
              :src="category.image" 
              :alt="category.name"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <h3 class="text-xl font-bold text-white mb-2">{{ category.name }}</h3>
              <p class="text-white/80 mb-4">{{ category.description }}</p>
              <span class="inline-flex items-center text-white text-sm font-medium">
                Explore
                <!-- <Icon name="lucide:arrow-right" size="16" class="ml-1 transition-transform duration-300 group-hover:translate-x-1" /> -->
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- New Arrivals -->
    <section class="py-16">
      <ArtworkGrid 
        title="New Arrivals" 
        description="Discover the latest additions to our collection"
        :artworks="newArrivals"
        @view-artwork="viewArtwork"
        @add-to-cart="addToCart"
      />
    </section>
    
    <!-- Testimonial Section -->
    <section class="py-16 bg-gray-900 text-white">
      <div class="container mx-auto px-4">
        <h2 
          class="text-3xl font-bold text-center mb-12"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          What Our Collectors Say
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="bg-gray-800 p-6 rounded-lg"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }"
          >
            <div class="flex items-center mb-4">
              <div class="flex text-amber-400">
                <!-- <Icon v-for="i in 5" :key="i" name="lucide:star" size="16" :class="i <= testimonial.rating ? 'text-amber-400' : 'text-gray-600'" /> -->
              </div>
            </div>
            <p class="text-gray-300 mb-6">{{ testimonial.text }}</p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-gray-600 overflow-hidden mr-3">
                <img v-if="testimonial.avatar" :src="testimonial.avatar" :alt="testimonial.name" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center bg-black text-white font-bold">
                  {{ testimonial.name.charAt(0) }}
                </div>
              </div>
              <div>
                <h4 class="font-medium">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-400">{{ testimonial.location }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Best Sellers -->
    <section class="py-16">
      <ArtworkGrid 
        title="Best Sellers" 
        description="Our most popular artworks loved by collectors worldwide"
        :artworks="bestSellers"
        @view-artwork="viewArtwork"
        @add-to-cart="addToCart"
      />
    </section>
    
    <!-- Commission CTA -->
    <section class="py-20 bg-black/10">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :enter="{ opacity: 1, x: 0 }"
          >
            <h2 class="text-3xl font-bold mb-6">Commission Your Custom Artwork</h2>
            <p class="text-gray-700 mb-8">
              Looking for something truly unique? Commission a custom artwork tailored to your vision. Whether it's a portrait, landscape, or conceptual piece, Raymond brings your ideas to life with exceptional skill and attention to detail.
            </p>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="bg-black/20 p-2 rounded-full mr-4">
                  <!-- <Icon name="lucide:check" size="20" class="text-primary" /> -->
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
                </div>
                <div>
                  <h4 class="font-medium">Personalized Consultation</h4>
                  <p class="text-gray-600">Discuss your vision directly with the artist</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-black/20 p-2 rounded-full mr-4">
                  <!-- <Icon name="lucide:check" size="20" class="text-primary" /> -->
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
                </div>
                <div>
                  <h4 class="font-medium">Progress Updates</h4>
                  <p class="text-gray-600">Receive regular updates throughout the creation process</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="bg-black/20 p-2 rounded-full mr-4">
                  <!-- <Icon name="lucide:check" size="20" class="text-primary" /> -->
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
                </div>
                <div>
                  <h4 class="font-medium">Worldwide Shipping</h4>
                  <p class="text-gray-600">Safe and secure delivery to your doorstep</p>
                </div>
              </div>
            </div>
            <NuxtLink 
              to="/commission" 
              class="mt-8 inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-black-dark transition-all duration-300 transform hover:scale-105"
            >
              Start Your Commission
            </NuxtLink>
          </div>
          
          <div 
            class="relative"
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :enter="{ opacity: 1, x: 0 }"
          >
            <img 
              src="@/assets/img/event-go.webp" 
              alt="Commission artwork" 
              class="rounded-lg shadow-xl w-full"
            />
            <div class="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                  <!-- <Icon name="lucide:heart" size="18" class="text-primary" /> -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000000" viewBox="0 0 256 256"><path d="M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z"></path></svg>
                </div>
                <div>
                  <h4 class="font-medium">100% Satisfaction</h4>
                  <p class="text-sm text-gray-600">Guaranteed or full refund</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Instagram Feed -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 
            class="text-3xl font-bold mb-4 md:mb-0"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
          >
            Follow Us on Instagram
          </h2>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            class="flex items-center text-primary hover:text-primary-dark transition-colors duration-300"
            v-motion
            :initial="{ opacity: 0 }"
            :enter="{ opacity: 1, transition: { delay: 200 } }"
          >
            <!-- <Icon name="lucide:instagram" size="20" class="mr-2" /> -->
            @raymondaworoart
          </a>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div 
            v-for="(post, index) in instagramPosts" 
            :key="index"
            class="relative aspect-square overflow-hidden group"
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: index * 50 } }"
          >
            <img 
              :src="post.image" 
              :alt="`Instagram post ${index + 1}`"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div class="flex gap-3 text-white">
                <div class="flex items-center">
                  <!-- <Icon name="lucide:heart" size="16" class="mr-1" /> -->
                  <span>{{ post.likes }}</span>
                </div>
                <div class="flex items-center">
                  <!-- <Icon name="lucide:message-circle" size="16" class="mr-1" /> -->
                  <span>{{ post.comments }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter -->
    <section class="py-20 bg-gray-900 text-white">
      <div 
        class="container mx-auto px-4 max-w-4xl text-center"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
      >
        <h2 class="text-3xl font-bold mb-4">Join Our Art Community</h2>
        <p class="text-gray-300 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive updates on new artworks, exhibitions, and exclusive offers.
        </p>
        <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input 
            v-model="email"
            type="email"
            placeholder="Your email address"
            class="px-6 py-3 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary flex-grow"
            required
          />
          <button 
            type="submit"
            class="px-8 py-3 bg-black hover:bg-black-dark text-white rounded-full transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
        <p class="text-gray-400 text-sm mt-4">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from Raymond Aworo Art.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import image1 from '@/assets/img/corporate.png'
import image2 from '@/assets/img/services6.jpg'
import image3 from '@/assets/img/services8.jpg'
import image4 from '@/assets/img/services9.jpg'
import image5 from '@/assets/img/comiles-desktop-mockup.png'
import image6 from '@/assets/img/business-ride.jpg'
import { useCartStore } from '~/composables/useCartStore'
import { useRouter } from 'vue-router';

const { addToCart: addItemToCart } = useCartStore()
const email = ref('')
const router = useRouter();

const navigateTo = (path: string) => {
  router.push(path);
}

// Categories
const categories = [
  {
    name: 'Portraits',
    description: 'Hyper-realistic portraits capturing emotion and character',
    image: image1,
    link: '/artworks?category=portraits'
  },
  {
    name: 'Religious Art',
    description: 'Spiritual artworks inspired by faith and devotion',
    image: image2,
    link: '/artworks?category=religious'
  },
  {
    name: 'Landscapes',
    description: 'Vibrant landscapes showcasing the beauty of nature',
    image: image3,
    link: '/artworks?category=landscapes'
  }
]

// New Arrivals
const newArrivals = [
  {
    id: 1,
    title: "No Greater Love",
    image: image4,
    category: "Religious",
    price: 1200,
    medium: "Charcoal on Paper",
    isNewArrival: true
  },
  {
    id: 2,
    title: "Divine Light",
    image: image5,
    category: "Religious",
    price: 950,
    medium: "Acrylic on Canvas",
    isNewArrival: true
  },
  {
    id: 3,
    title: "Serenity Falls",
    image: image6,
    category: "Landscape",
    price: 850,
    medium: "Mixed Media",
    isNewArrival: true
  },
  {
    id: 4,
    title: "Reflection",
    image: image2,
    category: "Portrait",
    price: 1100,
    medium: "Oil on Canvas",
    isNewArrival: true
  }
]

// Best Sellers
const bestSellers = [
  {
    id: 5,
    title: "Ethereal Wings",
    image: image1,
    category: "Religious",
    price: 1300,
    medium: "Charcoal on Paper",
    isBestSeller: true
  },
  {
    id: 6,
    title: "Moonlit Waterfall",
    image: image2,
    category: "Landscape",
    price: 900,
    medium: "Acrylic on Canvas",
    isBestSeller: true
  },
  {
    id: 7,
    title: "Inner Vision",
    image: image3,
    category: "Portrait",
    price: 1050,
    medium: "Charcoal on Paper",
    isBestSeller: true
  },
  {
    id: 8,
    title: "Butterfly Effect",
    image: image4,
    category: "Portrait",
    price: 980,
    medium: "Mixed Media",
    isBestSeller: true
  }
]

// Testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    text: "The portrait Raymond created for me exceeded all my expectations. His attention to detail and ability to capture emotion is truly remarkable. I'll cherish this artwork forever.",
    rating: 5,
    avatar: "/images/testimonial-1.jpg"
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada",
    text: "Working with Raymond on my commission was a wonderful experience. He was attentive to my vision and delivered a masterpiece that now takes pride of place in my home.",
    rating: 5,
    avatar: "/images/testimonial-2.jpg"
  },
  {
    name: "Olivia Williams",
    location: "London, UK",
    text: "I've purchased several prints from Raymond's collection and each one is stunning. The quality is exceptional and they arrive beautifully packaged. Highly recommend!",
    rating: 5,
    avatar: "/images/testimonial-3.jpg"
  }
]

// Instagram Posts
const instagramPosts = [
  { image: "/images/instagram-1.jpg", likes: 243, comments: 18 },
  { image: "/images/instagram-2.jpg", likes: 187, comments: 12 },
  { image: "/images/instagram-3.jpg", likes: 321, comments: 24 },
  { image: "/images/instagram-4.jpg", likes: 156, comments: 9 },
  { image: "/images/instagram-5.jpg", likes: 278, comments: 21 },
  { image: "/images/instagram-6.jpg", likes: 192, comments: 15 }
]

// Methods
const viewArtwork = (artwork: any) => {
  navigateTo(`/artworks/${artwork.id}`)
}

const addToCart = (artwork: any) => {
  addItemToCart({
    id: artwork.id,
    title: artwork.title,
    image: artwork.image,
    price: artwork.price,
    quantity: 1
  })
}

const subscribeNewsletter = () => {
  // Handle newsletter subscription
  alert(`Thank you for subscribing with ${email.value}!`)
  email.value = ''
}
</script>