// import { ref, computed, watch } from 'vue'

// interface CartItem {
//   id: number
//   title: string
//   image: string
//   price: number
//   quantity: number
// }

// // Create a reactive cart store
// const cart = ref<CartItem[]>([])

// // Load cart from localStorage on initialization
// if (process.client) {
//   const savedCart = localStorage.getItem('art-gallery-cart')
//   if (savedCart) {
//     try {
//       cart.value = JSON.parse(savedCart)
//     } catch (e: any) {
//       console.error('Failed to parse cart from localStorage', e)
//     }
//   }
  
//   // Save cart to localStorage when it changes
//   watch(cart, (newCart) => {
//     localStorage.setItem('art-gallery-cart', JSON.stringify(newCart))
//   }, { deep: true })
// }

// export function useCartStore() {
//   // Add item to cart
//   const addToCart = (item: CartItem) => {
//     const existingItem = cart.value.find(cartItem => cartItem.id === item.id)
    
//     if (existingItem) {
//       // Update quantity if item already exists
//       existingItem.quantity += item.quantity
//     } else {
//       // Add new item
//       cart.value.push(item)
//     }
    
//     // Show notification
//     // ...
//   }
  
//   // Remove item from cart
//   const removeFromCart = (id: number) => {
//     const index = cart.value.findIndex(item => item.id === id)
//     if (index !== -1) {
//       cart.value.splice(index, 1)
//     }
//   }
  
//   // Update item quantity
//   const updateCartItemQuantity = (id: number, quantity: number) => {
//     const item = cart.value.find(item => item.id === id)
//     if (item) {
//       item.quantity = quantity
//     }
//   }
  
//   // Clear cart
//   const clearCart = () => {
//     cart.value = []
//   }
  
//   // Calculate total
//   const cartTotal = computed(() => {
//     return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
//   })
  
//   // Calculate item count
//   const cartItemCount = computed(() => {
//     return cart.value.reduce((count, item) => count + item.quantity, 0)
//   })
  
//   return {
//     cart,
//     addToCart,
//     removeFromCart,
//     updateCartItemQuantity,
//     clearCart,
//     cartTotal,
//     cartItemCount
//   }
// }


// composables/useCartStore.ts
import { ref, computed, watch } from 'vue'

interface CartItem {
  id: number
  title: string
  image: string
  price: number
  quantity: number
}

// Create a reactive cart store
const cart = ref<CartItem[]>([])

// Load cart from localStorage on initialization
if (process.client) {
  const savedCart = localStorage.getItem('art-gallery-cart')
  if (savedCart) {
    try {
      cart.value = JSON.parse(savedCart)
    } catch (e: any) {
      console.error('Failed to parse cart from localStorage', e)
    }
  }
  
  // Save cart to localStorage when it changes
  watch(cart, (newCart) => {
    localStorage.setItem('art-gallery-cart', JSON.stringify(newCart))
  }, { deep: true })
}

export function useCartStore() {
  // Add item to cart
  const addToCart = (item: CartItem) => {
    const existingItem = cart.value.find(cartItem => cartItem.id === item.id)
    
    if (existingItem) {
      // Update quantity if item already exists
      existingItem.quantity += item.quantity
    } else {
      // Add new item
      cart.value.push(item)
    }
  }
  
  // Remove item from cart
  const removeFromCart = (id: number) => {
    const index = cart.value.findIndex(item => item.id === id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }
  
  // Update item quantity
  const updateCartItemQuantity = (id: number, quantity: number) => {
    const item = cart.value.find(item => item.id === id)
    if (item) {
      item.quantity = quantity
    }
  }
  
  // Clear cart
  const clearCart = () => {
    cart.value = []
  }
  
  // Calculate total
  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })
  
  // Calculate item count
  const cartItemCount = computed(() => {
    return cart.value.reduce((count, item) => count + item.quantity, 0)
  })
  
  return {
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    cartTotal,
    cartItemCount
  }
}