<template>
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-50">
        <!-- Backdrop overlay -->
        <div 
          class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          @click="onClose"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1 }"
          :leave="{ opacity: 0 }"
        ></div>
  
        <!-- Cart drawer -->
        <div 
          class="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
          v-motion
          :initial="{ x: '100%' }"
          :enter="{ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } }"
          :leave="{ x: '100%', transition: { duration: 300 } }"
        >
          <div class="h-full flex flex-col">
            <!-- Cart Header -->
            <div 
              class="p-4 border-b border-gray-200 flex justify-between items-center"
              v-motion
              :initial="{ opacity: 0, y: -10 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 100 } }"
            >
              <h2 class="text-xl font-bold">Your Cart ({{ cartItemCount }})</h2>
              <button 
                @click="onClose" 
                class="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-all duration-300"
              >
                <XIcon class="w-5 h-5" />
              </button>
            </div>
  
            <!-- Empty Cart State -->
            <div 
              v-if="cartItemCount === 0" 
              class="flex-grow flex flex-col items-center justify-center p-6 text-center"
              v-motion
              :initial="{ opacity: 0, scale: 0.9 }"
              :enter="{ opacity: 1, scale: 1, transition: { delay: 200 } }"
            >
              <div 
                class="w-24 h-24 mb-4 text-gray-300"
                v-motion
                :initial="{ opacity: 0, scale: 0.5 }"
                :enter="{ opacity: 1, scale: 1, transition: { delay: 300, type: 'spring', stiffness: 260, damping: 20 } }"
              >
                <ShoppingBagIcon class="w-24 h-24" />
              </div>
              <h3 
                class="text-lg font-medium text-gray-900 mb-2"
                v-motion
                :initial="{ opacity: 0, y: 10 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
              >
                Your cart is empty
              </h3>
              <p 
                class="text-gray-600 mb-6"
                v-motion
                :initial="{ opacity: 0, y: 10 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 500 } }"
              >
                Looks like you haven't added any artwork to your cart yet.
              </p>
              <button 
                @click="onClose"
                class="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                v-motion
                :initial="{ opacity: 0, y: 10 }"
                :enter="{ opacity: 1, y: 0, transition: { delay: 600 } }"
              >
                Continue Shopping
              </button>
            </div>
  
            <!-- Cart Items -->
            <div 
              v-else 
              class="flex-grow overflow-y-auto p-4 custom-scrollbar"
              v-motion
              :initial="{ opacity: 0 }"
              :enter="{ opacity: 1, transition: { delay: 200 } }"
            >
              <TransitionGroup 
                name="cart-item" 
                tag="ul" 
                class="space-y-4"
              >
                <li 
                  v-for="(item, index) in cart" 
                  :key="item.id"
                  class="flex gap-4 py-4 border-b border-gray-100 last:border-0"
                  v-motion
                  :initial="{ opacity: 0, x: 20 }"
                  :enter="{ opacity: 1, x: 0, transition: { delay: 100 * (index + 1) } }"
                >
                  <!-- Item Image -->
                  <div 
                    class="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 hover:shadow-md transition-shadow duration-300"
                    v-motion:hover="{ scale: 1.05 }"
                  >
                    <img 
                      :src="item.image || '/placeholder.svg'" 
                      :alt="item.title" 
                      class="w-full h-full object-cover"
                    />
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
                          class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-300"
                          :disabled="item.quantity <= 1"
                          :class="{ 'opacity-50 cursor-not-allowed': item.quantity <= 1 }"
                        >
                          <MinusIcon class="w-4 h-4" />
                        </button>
                        <button 
                          @click="updateQuantity(item.id, item.quantity + 1)"
                          class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors duration-300"
                        >
                          <PlusIcon class="w-4 h-4" />
                        </button>
                        <button 
                          @click="removeItem(item.id)"
                          class="text-gray-400 hover:text-rose-500 p-1 rounded-full hover:bg-rose-50 transition-colors duration-300"
                        >
                          <Trash2Icon class="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </TransitionGroup>
            </div>
  
            <!-- Cart Summary -->
            <div 
              v-if="cartItemCount > 0" 
              class="border-t border-gray-200 p-4 bg-gray-50"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { delay: 300 } }"
            >
              <div class="space-y-2 mb-4">
                <div class="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${{ formatPrice(subtotal) }}</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{{ subtotal > 100 ? 'Free' : '$10.00' }}</span>
                </div>
                <div 
                  class="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200"
                  v-motion
                  :initial="{ opacity: 0, y: 5 }"
                  :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }"
                >
                  <span>Total</span>
                  <span>${{ formatPrice(total) }}</span>
                </div>
              </div>
  
              <div v-motion:hover="{ scale: 1.02 }" v-motion:tap="{ scale: 0.98 }">
                <button 
                  @click="proceedToCheckout"
                  class="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md flex items-center justify-center gap-2"
                >
                  <CreditCardIcon class="w-5 h-5" />
                  Proceed to Checkout
                </button>
              </div>
  
              <div v-motion:initial="{ opacity: 0 }" v-motion:enter="{ opacity: 1, transition: { delay: 500 } }">
                <button 
                  @click="onClose"
                  class="w-full py-3 mt-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  import { computed, watch, ref } from 'vue'
  import { useCartStore } from '@/composables/useCartStore'
  import { useCheckoutStore } from '@/composables/useCheckoutStore'
  import { useRouter } from 'vue-router'
  import { 
    XIcon, 
    ShoppingBagIcon, 
    MinusIcon, 
    PlusIcon, 
    Trash2Icon, 
    CreditCardIcon 
  } from 'lucide-vue-next'
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(['close'])
  
  const router = useRouter()
  const { cart, removeFromCart, updateCartItemQuantity } = useCartStore()
  const { initializeCheckout } = useCheckoutStore()
  
  // Lock body scroll when drawer is open
  const bodyOverflow = ref(document.body.style.overflow);
  
  watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
      bodyOverflow.value = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = bodyOverflow.value;
    }
  }, { immediate: true })
  
  const cartItemCount = computed(() => cart.value.length)
  
  const subtotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })
  
  const shipping = computed(() => {
    return subtotal.value > 100 ? 0 : 10
  })
  
  const total = computed(() => {
    return subtotal.value + shipping.value
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
      shipping: shipping.value,
      total: total.value
    })
    
    // Close the drawer
    emit('close')
    
    // Navigate to checkout page
    router.push('/checkout')
  }
  
  const onClose = () => {
    emit('close')
  }
  
  const formatPrice = (price: number) => {
    return price.toFixed(2)
  }
  </script>
  
  <style scoped>
  /* Fade transition for overlay */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  /* Cart item transitions */
  .cart-item-enter-active,
  .cart-item-leave-active {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .cart-item-enter-from {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .cart-item-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
  
  .cart-item-move {
    transition: transform 0.5s ease;
  }
  
  /* Custom scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d1d1;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #b1b1b1;
  }
  </style>
  