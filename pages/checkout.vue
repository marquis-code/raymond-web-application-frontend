<!-- pages/checkout.vue -->
<template>
    <div class="container mx-auto px-4 py-8">
      <div v-if="!checkoutSummary" class="text-center py-12">
        <div class="mb-6">
          <!-- <Icon name="lucide:shopping-bag" size="64" class="text-gray-300 mx-auto" /> -->
        </div>
        <h2 class="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p class="text-gray-600 mb-6">Please add some items to your cart before proceeding to checkout.</p>
        <NuxtLink to="/" class="px-6 py-2 bg-black text-white rounded-full hover:bg-black-dark transition-colors duration-300">
          Browse Artwork
        </NuxtLink>
      </div>
      
      <div v-else-if="orderComplete" class="max-w-2xl mx-auto text-center py-12">
        <div class="mb-6 text-green-500">
          <!-- <Icon name="lucide:check-circle" size="64" class="mx-auto" /> -->
        </div>
        <h2 class="text-2xl font-bold mb-4">Thank you for your order!</h2>
        <p class="text-gray-600 mb-2">Your order has been successfully placed.</p>
        <!-- <p class="text-gray-600 mb-6">Order ID: <span class="font-medium">{{ orderId }}</span></p> -->
        <p class="text-gray-600 mb-6">We've sent a confirmation email with your order details.</p>
        <NuxtLink to="/" class="px-6 py-2 bg-black text-white rounded-full hover:bg-black-dark transition-colors duration-300">
          Continue Shopping
        </NuxtLink>
      </div>
      
      <div v-else class="grid md:grid-cols-3 gap-8">
        <!-- Checkout Steps -->
        <div class="md:col-span-2">
          <div class="mb-8">
            <h1 class="text-2xl font-bold mb-6">Checkout</h1>
            
            <!-- Checkout Progress -->
            <div class="flex items-center mb-8">
              <div 
                class="flex flex-col items-center"
                :class="{ 'text-black': checkoutStep >= 1, 'text-gray-400': checkoutStep < 1 }"
              >
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center mb-1"
                  :class="{ 'bg-black text-white': checkoutStep >= 1, 'bg-gray-200': checkoutStep < 1 }"
                >
                  1
                </div>
                <span class="text-xs">Delivery</span>
              </div>
              <div class="flex-1 h-1 mx-2" :class="{ 'bg-black': checkoutStep >= 2, 'bg-gray-200': checkoutStep < 2 }"></div>
              <div 
                class="flex flex-col items-center"
                :class="{ 'text-black': checkoutStep >= 2, 'text-gray-400': checkoutStep < 2 }"
              >
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center mb-1"
                  :class="{ 'bg-black text-white': checkoutStep >= 2, 'bg-gray-200': checkoutStep < 2 }"
                >
                  2
                </div>
                <span class="text-xs">Method</span>
              </div>
              <div class="flex-1 h-1 mx-2" :class="{ 'bg-black': checkoutStep >= 3, 'bg-gray-200': checkoutStep < 3 }"></div>
              <div 
                class="flex flex-col items-center"
                :class="{ 'text-black': checkoutStep >= 3, 'text-gray-400': checkoutStep < 3 }"
              >
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center mb-1"
                  :class="{ 'bg-black text-white': checkoutStep >= 3, 'bg-gray-200': checkoutStep < 3 }"
                >
                  3
                </div>
                <span class="text-xs">Payment</span>
              </div>
            </div>
            
            <!-- Step 1: Delivery Details -->
            <div v-if="checkoutStep === 1" class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 class="text-xl font-semibold mb-4">Delivery Details</h2>
              <form @submit.prevent="nextStep" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="form-group">
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    id="firstName"
                    v-model="deliveryDetails.firstName"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div class="form-group">
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    id="lastName"
                    v-model="deliveryDetails.lastName"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div class="form-group">
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    id="email"
                    v-model="deliveryDetails.email"
                    type="email"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div class="form-group">
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    id="phone"
                    v-model="deliveryDetails.phone"
                    type="tel"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div class="form-group md:col-span-2">
                  <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input 
                    id="address"
                    v-model="deliveryDetails.address"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div class="form-group">
                  <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    id="city"
                    v-model="deliveryDetails.city"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div class="form-group">
                  <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input 
                    id="state"
                    v-model="deliveryDetails.state"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div class="form-group">
                  <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <input 
                    id="zipCode"
                    v-model="deliveryDetails.zipCode"
                    type="text"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div class="form-group">
                  <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select 
                    id="country"
                    v-model="deliveryDetails.country"
                    required
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
                
                <div class="md:col-span-2 mt-4">
                  <button 
                    type="submit"
                    class="w-full py-3 bg-black text-white rounded-md hover:bg-black-dark transition-colors duration-300"
                  >
                    Continue to Delivery Method
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Step 2: Delivery Method -->
            <div v-if="checkoutStep === 2" class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 class="text-xl font-semibold mb-4">Delivery Method</h2>
              <div class="space-y-4 mb-6">
                <div 
                  class="border rounded-md p-4 cursor-pointer"
                  :class="{ 'border-black bg-gray-50': deliveryMethod === 'standard', 'border-gray-200': deliveryMethod !== 'standard' }"
                  @click="setDeliveryMethod('standard')"
                >
                  <div class="flex items-center">
                    <div class="w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center"
                         :class="{ 'border-black': deliveryMethod === 'standard', 'border-gray-300': deliveryMethod !== 'standard' }">
                      <div v-if="deliveryMethod === 'standard'" class="w-3 h-3 rounded-full bg-black"></div>
                    </div>
                    <div class="flex-1">
                      <div class="flex justify-between">
                        <span class="font-medium">Standard Delivery</span>
                        <span class="font-medium">{{ checkoutSummary.subtotal > 100 ? 'Free' : '$10.00' }}</span>
                      </div>
                      <p class="text-sm text-gray-600">Delivery within 5-7 business days</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  class="border rounded-md p-4 cursor-pointer"
                  :class="{ 'border-black bg-gray-50': deliveryMethod === 'express', 'border-gray-200': deliveryMethod !== 'express' }"
                  @click="setDeliveryMethod('express')"
                >
                  <div class="flex items-center">
                    <div class="w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center"
                         :class="{ 'border-black': deliveryMethod === 'express', 'border-gray-300': deliveryMethod !== 'express' }">
                      <div v-if="deliveryMethod === 'express'" class="w-3 h-3 rounded-full bg-black"></div>
                    </div>
                    <div class="flex-1">
                      <div class="flex justify-between">
                        <span class="font-medium">Express Delivery</span>
                        <span class="font-medium">$25.00</span>
                      </div>
                      <p class="text-sm text-gray-600">Delivery within 2-3 business days</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  class="border rounded-md p-4 cursor-pointer"
                  :class="{ 'border-black bg-gray-50': deliveryMethod === 'pickup', 'border-gray-200': deliveryMethod !== 'pickup' }"
                  @click="setDeliveryMethod('pickup')"
                >
                  <div class="flex items-center">
                    <div class="w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center"
                         :class="{ 'border-black': deliveryMethod === 'pickup', 'border-gray-300': deliveryMethod !== 'pickup' }">
                      <div v-if="deliveryMethod === 'pickup'" class="w-3 h-3 rounded-full bg-black"></div>
                    </div>
                    <div class="flex-1">
                      <div class="flex justify-between">
                        <span class="font-medium">Store Pickup</span>
                        <span class="font-medium">Free</span>
                      </div>
                      <p class="text-sm text-gray-600">Pickup at our gallery location</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="flex gap-4">
                <button 
                  @click="prevStep"
                  class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300"
                >
                  Back
                </button>
                <button 
                  @click="nextStep"
                  class="flex-1 py-3 bg-black text-white rounded-md hover:bg-black-dark transition-colors duration-300"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
            
            <!-- Step 3: Payment -->
            <div v-if="checkoutStep === 3" class="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 class="text-xl font-semibold mb-4">Payment Method</h2>
              
              <!-- Payment Method Selection -->
              <div class="space-y-4 mb-6">
                <div 
                  class="border rounded-md p-4 cursor-pointer"
                  :class="{ 'border-black bg-gray-50': paymentMethod === 'flutterwave', 'border-gray-200': paymentMethod !== 'flutterwave' }"
                  @click="setPaymentMethod('flutterwave')"
                >
                  <div class="flex items-center">
                    <div class="w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center"
                         :class="{ 'border-black': paymentMethod === 'flutterwave', 'border-gray-300': paymentMethod !== 'flutterwave' }">
                      <div v-if="paymentMethod === 'flutterwave'" class="w-3 h-3 rounded-full bg-black"></div>
                    </div>
                    <div class="flex-1">
                      <span class="font-medium">Pay with Flutterwave</span>
                      <p class="text-sm text-gray-600">Secure payment via Flutterwave</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  class="border rounded-md p-4 cursor-pointer"
                  :class="{ 'border-black bg-gray-50': paymentMethod === 'interswitch', 'border-gray-200': paymentMethod !== 'interswitch' }"
                  @click="setPaymentMethod('interswitch')"
                >
                  <div class="flex items-center">
                    <div class="w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center"
                         :class="{ 'border-black': paymentMethod === 'interswitch', 'border-gray-300': paymentMethod !== 'interswitch' }">
                      <div v-if="paymentMethod === 'interswitch'" class="w-3 h-3 rounded-full bg-black"></div>
                    </div>
                    <div class="flex-1">
                      <span class="font-medium">Pay with Interswitch</span>
                      <p class="text-sm text-gray-600">Secure payment via Interswitch</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  class="border rounded-md p-4 cursor-pointer"
                  :class="{ 'border-black bg-gray-50': paymentMethod === 'manual', 'border-gray-200': paymentMethod !== 'manual' }"
                  @click="setPaymentMethod('manual')"
                >
                  <div class="flex items-center">
                    <div class="w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center"
                         :class="{ 'border-black': paymentMethod === 'manual', 'border-gray-300': paymentMethod !== 'manual' }">
                      <div v-if="paymentMethod === 'manual'" class="w-3 h-3 rounded-full bg-black"></div>
                    </div>
                    <div class="flex-1">
                      <span class="font-medium">Credit/Debit Card</span>
                      <p class="text-sm text-gray-600">Pay directly with your card</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Manual Payment Form -->
              <div v-if="paymentMethod === 'manual'" class="border-t border-gray-200 pt-6 mt-6">
                <h3 class="text-lg font-medium mb-4">Card Details</h3>
                <form class="space-y-4">
                  <div class="form-group">
                    <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input 
                      id="cardNumber"
                      v-model="cardDetails.cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      required
                      class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="cardName" class="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input 
                      id="cardName"
                      v-model="cardDetails.cardName"
                      type="text"
                      placeholder="John Doe"
                      required
                      class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div class="form-group">
                      <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input 
                        id="expiryDate"
                        v-model="cardDetails.expiryDate"
                        type="text"
                        placeholder="MM/YY"
                        required
                        class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    
                    <div class="form-group">
                      <label for="cvv" class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input 
                        id="cvv"
                        v-model="cardDetails.cvv"
                        type="text"
                        placeholder="123"
                        required
                        class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>
                </form>
              </div>
              
              <div class="flex gap-4 mt-6">
                <button 
                  @click="prevStep"
                  class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-300"
                >
                  Back
                </button>
                <button 
                  @click="processPayment"
                  :disabled="isProcessing"
                  class="flex-1 py-3 bg-black text-white rounded-md hover:bg-black-dark transition-colors duration-300 flex items-center justify-center"
                >
                  <span v-if="isProcessing" class="mr-2">
                    <!-- <Icon name="lucide:loader" class="animate-spin" size="18" /> -->
                  </span>
                  {{ isProcessing ? 'Processing...' : 'Complete Order' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="md:col-span-1">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-6">
            <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div class="space-y-4 mb-6">
              <div v-for="item in checkoutSummary.items" :key="item.id" class="flex gap-3">
                <div class="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative">
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
                  <div class="absolute top-0 right-0 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full -mt-1 -mr-1">
                    {{ item.quantity }}
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-sm">{{ item.title }}</h4>
                  <p class="text-sm text-gray-600">${{ formatPrice(item.price) }} × {{ item.quantity }}</p>
                </div>
                <div class="text-right">
                  <span class="font-medium">${{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${{ formatPrice(checkoutSummary.subtotal) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>Shipping</span>
                <span>
                  <template v-if="deliveryMethod === 'standard'">
                    {{ checkoutSummary.subtotal > 100 ? 'Free' : '$10.00' }}
                  </template>
                  <template v-else-if="deliveryMethod === 'express'">
                    $25.00
                  </template>
                  <template v-else>
                    Free
                  </template>
                </span>
              </div>
              <div class="flex justify-between font-bold pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>${{ formatPrice(calculateTotal()) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useCartStore } from '@/composables/useCartStore'
  import { useCheckoutStore } from '@/composables/useCheckoutStore'
  
  const { clearCart } = useCartStore()
  const { 
    checkoutStep,
    checkoutSummary,
    deliveryDetails,
    deliveryMethod,
    paymentMethod,
    cardDetails,
    isProcessing,
    orderComplete,
    // orderId,
    nextStep,
    prevStep,
    setDeliveryMethod,
    setPaymentMethod,
    processPayment
  } = useCheckoutStore()
  
  // Calculate total based on delivery method
  const calculateTotal = () => {
    if (!checkoutSummary.value) return 0
    
    let shipping = 0
    
    if (deliveryMethod.value === 'standard') {
      shipping = checkoutSummary.value.subtotal > 100 ? 0 : 10
    } else if (deliveryMethod.value === 'express') {
      shipping = 25
    }
    
    return checkoutSummary.value.subtotal + shipping
  }
  
  // Format price
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US')
  }
  
  // // Process payment and clear cart on success
  // const handlePayment = async () => {
  //   await processPayment()
    
  //   if (orderComplete.value) {
  //     clearCart()
  //   }
  // }
  </script>
