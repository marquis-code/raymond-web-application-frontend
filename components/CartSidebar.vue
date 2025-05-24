<template>
  <div class="h-full flex flex-col">
    <!-- Cart Header -->
    <div class="p-4 border-b border-gray-200 flex justify-between items-center">
      <h2 class="text-xl font-bold">Your Cart ({{ cartItemCount }})</h2>
      <button @click="$emit('close')" class="p-2 text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
        <!-- <Icon name="lucide:x" size="20" /> -->
      </button>
    </div>
    
    <!-- Empty Cart State -->
    <div v-if="cartItemCount === 0" class="flex-grow flex flex-col items-center justify-center p-6 text-center">
      <div 
        class="w-24 h-24 mb-4 text-gray-300"
        v-motion
        :initial="{ opacity: 0, scale: 0.8 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 500 } }"
      >
        <!-- <Icon name="lucide:shopping-bag" size="96" /> -->
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
      <p class="text-gray-600 mb-6">Looks like you haven't added any artwork to your cart yet.</p>
      <button 
        @click="$emit('close')"
        class="px-6 py-2 bg-black text-white rounded-full hover:bg-black-dark transition-colors duration-300"
      >
        Continue Shopping
      </button>
    </div>
    
    <!-- Cart Items -->
    <div v-else class="flex-grow overflow-y-auto p-4">
      <TransitionGroup 
        name="cart-item" 
        tag="ul" 
        class="space-y-4"
      >
        <li 
          v-for="item in cart" 
          :key="item.id"
          class="flex gap-4 py-4 border-b border-gray-100 last:border-0"
        >
          <!-- Item Image -->
          <div class="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
          </div>
          
          <!-- Item Details -->
          <div class="flex-grow">
            <h4 class="font-medium text-gray-900">{{ item.title }}</h4>
            <p class="text-sm text-gray-600 mb-2">Qty: {{ item.quantity }}</p>
            <div class="flex justify-between">
              <span class="font-medium text-primary">${{ formatPrice(item.price * item.quantity) }}</span>
              <div class="flex gap-2">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="text-gray-400 hover:text-gray-600 p-1"
                  :disabled="item.quantity <= 1"
                  :class="{ 'opacity-50 cursor-not-allowed': item.quantity <= 1 }"
                >
                  <!-- <Icon name="lucide:minus" size="16" /> -->
                </button>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="text-gray-400 hover:text-gray-600 p-1"
                >
                  <!-- <Icon name="lucide:plus" size="16" /> -->
                </button>
                <button 
                  @click="removeItem(item.id)"
                  class="text-gray-400 hover:text-rose-500 p-1"
                >
                  <!-- <Icon name="lucide:trash-2" size="16" /> -->
                </button>
              </div>
            </div>
          </div>
        </li>
      </TransitionGroup>
    </div>
    
    <!-- Cart Summary -->
    <div v-if="cartItemCount > 0" class="border-t border-gray-200 p-4 bg-gray-50">
      <div class="space-y-2 mb-4">
        <div class="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${{ formatPrice(subtotal) }}</span>
        </div>
        <div class="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{{ subtotal > 100 ? 'Free' : '$10.00' }}</span>
        </div>
        <div class="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>${{ formatPrice(total) }}</span>
        </div>
      </div>
      
      <button 
        @click="proceedToCheckout"
        class="w-full py-3 bg-black text-white rounded-md hover:bg-black-dark transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <!-- <Icon name="lucide:credit-card" size="18" /> -->
        Proceed to Checkout
      </button>
      
      <button 
        @click="continueToShopping"
        class="w-full py-3 mt-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
      >
        Continue Shopping
      </button>
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
  // Close the sidebar and navigate to checkout
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
</style>