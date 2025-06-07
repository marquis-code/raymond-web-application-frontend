<template>
  <div>
    <!-- Dark glassy overlay -->
    <div 
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      @click.self="$emit('close')"
    ></div>
    
    <div class="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white z-50 shadow-2xl flex flex-col h-full">
      <!-- Cart Header -->
      <div class="p-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
        <h2 class="text-xl font-bold flex items-center gap-2">
          <span>Your Cart</span>
          <span v-if="cartItemCount > 0" class="bg-black text-white text-xs px-2 py-1 rounded-full">
            {{ cartItemCount }}
          </span>
        </h2>
        <button 
          @click="$emit('close')" 
          class="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close cart"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
          </svg>
        </button>
      </div>
      
      <!-- Empty Cart State -->
      <div 
        v-if="cartItemCount === 0" 
        class="flex-grow flex flex-col items-center justify-center p-8 text-center"
      >
        <div class="w-24 h-24 mb-6 text-gray-300 animate-fadeIn">
          <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="currentColor" viewBox="0 0 256 256">
            <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H216Z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-3">Your cart is empty</h3>
        <p class="text-gray-500 mb-8 max-w-xs">Looks like you haven't added any artwork to your cart yet.</p>
        <button 
          @click="$emit('close')"
          class="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
      
      <!-- Cart Items -->
      <div v-else class="flex-grow overflow-y-auto p-5 bg-gray-50">
        <TransitionGroup 
          name="cart-item" 
          tag="ul" 
          class="space-y-5"
        >
          <li 
            v-for="item in cart" 
            :key="item.id"
            class="bg-white rounded-lg shadow-sm overflow-hidden animate-fadeIn"
          >
            <div class="flex p-4">
              <!-- Item Image -->
              <div class="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
              </div>
              
              <!-- Item Details -->
              <div class="flex-grow pl-4">
                <div class="flex justify-between">
                  <h4 class="font-medium text-gray-900 mb-1">{{ item.title }}</h4>
                  <button 
                    @click="removeItem(item.id)"
                    class="text-gray-400 hover:text-rose-500 p-1 transition-colors"
                    aria-label="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
                    </svg>
                  </button>
                </div>
                <p class="text-sm text-gray-500 mb-3">{{ item.quantity }} × ${{ formatPrice(item.price) }}</p>
                
                <div class="flex justify-between items-center">
                  <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      class="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                      :disabled="item.quantity <= 1"
                      :class="{ 'opacity-50 cursor-not-allowed': item.quantity <= 1 }"
                      aria-label="Decrease quantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></path>
                      </svg>
                    </button>
                    <span class="px-3 py-1 min-w-[30px] text-center">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      class="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                      </svg>
                    </button>
                  </div>
                  <span class="font-medium text-gray-900">${{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              </div>
            </div>
          </li>
        </TransitionGroup>
      </div>
      
      <!-- Cart Summary -->
      <div v-if="cartItemCount > 0" class="border-t border-gray-200 p-5 bg-white">
        <div class="space-y-3 mb-5">
          <div class="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${{ formatPrice(subtotal) }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span v-if="subtotal > 100" class="text-green-600 font-medium">Free</span>
            <span v-else>${{ formatPrice(10) }}</span>
          </div>
          <div class="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-100">
            <span>Total</span>
            <span>${{ formatPrice(total) }}</span>
          </div>
        </div>
        
        <button 
          @click="proceedToCheckout"
          class="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2 mb-3 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM216,192H40V112H216Zm0-96H40V64H216ZM56,160a8,8,0,0,1,8-8H80a8,8,0,0,1,0,16H64A8,8,0,0,1,56,160Zm48,0a8,8,0,0,1,8-8h16a8,8,0,0,1,0,16H112A8,8,0,0,1,104,160Z"></path>
          </svg>
          Proceed to Checkout
        </button>
        
        <button 
          @click="continueToShopping"
          class="w-full py-3 text-gray-600 hover:text-gray-900 transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
            <path d="M228,128a12,12,0,0,1-12,12H69l51.52,51.51a12,12,0,0,1-17,17l-72-72a12,12,0,0,1,0-17l72-72a12,12,0,0,1,17,17L69,116H216A12,12,0,0,1,228,128Z"></path>
          </svg>
          Continue Shopping
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '~/composables/useCartStore'
import { useCheckoutStore } from '~/composables/useCheckoutStore'
import { navigateTo } from '#app'
const router = useRouter()

const emit = defineEmits(['close'])

const { cart, removeFromCart, updateCartItemQuantity } = useCartStore()
const { initializeCheckout } = useCheckoutStore()

const cartItemCount = computed(() => cart.value.length)

const subtotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const total = computed(() => {
  const shipping = subtotal.value > 100 ? 0 : 10
  return subtotal.value + shipping
})

const removeItem = (id: number) => {
  removeFromCart(id)
}

const updateQuantity = (id: number, quantity: number) => {
  if (quantity < 1) return
  updateCartItemQuantity(id, quantity)
}

const proceedToCheckout = () => {
  // Initialize checkout with cart data
  initializeCheckout({
    items: cart.value,
    subtotal: subtotal.value,
    shipping: subtotal.value > 100 ? 0 : 10,
    total: total.value
  })
  emit('close')
  // Navigate to checkout
  navigateTo('/checkout')
}

const formatPrice = (price: number) => {
  return price.toLocaleString('en-US')
}

const continueToShopping = () => {
  emit('close')
  router.push('/artworks')
}
</script>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.3s ease;
}

.cart-item-enter-from,
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.cart-item-move {
  transition: transform 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
