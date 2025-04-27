<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Empty Cart State -->
    <div v-if="!checkoutSummary" class="container mx-auto px-4 py-16 text-center">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <div class="mb-6 text-gray-300">
          <div class="mx-auto w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center">
            <ShoppingBag class="w-12 h-12" />
          </div>
        </div>
        <h2 class="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p class="text-gray-600 mb-6">Please add some items to your cart before proceeding to checkout.</p>
        <NuxtLink to="/" class="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
          Browse Artwork
        </NuxtLink>
      </div>
    </div>
    
    <!-- Order Complete State -->
    <div v-else-if="orderComplete" class="container mx-auto px-4 py-16">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <div class="mb-6 text-green-500 flex justify-center">
          <div class="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle class="w-10 h-10" />
          </div>
        </div>
        <h2 class="text-2xl font-bold mb-4 text-center">Thank you for your order!</h2>
        <p class="text-gray-600 mb-2 text-center">Your order has been successfully placed.</p>
        <p class="text-gray-600 mb-6 text-center">We've sent a confirmation email with your order details.</p>
        <NuxtLink to="/" class="block w-full px-6 py-3 bg-black text-white rounded-lg text-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
          Continue Shopping
        </NuxtLink>
      </div>
    </div>
    
    <!-- Checkout Flow -->
    <div v-else class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-center md:text-left">Checkout</h1>
      
      <!-- Authentication Check Modal -->
      <Transition name="fade">
        <div v-if="showAuthCheck && !isLoggedIn && !showSignupForm" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-fade-in">
            <h2 class="text-2xl font-bold mb-4">Create an Account?</h2>
            <p class="text-gray-600 mb-6">Creating an account helps you track your orders and get updates on your purchases.</p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button 
                @click="showSignupForm = true; showAuthCheck = false"
                class="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300"
              >
                Create Account
              </button>
              <button 
                @click="proceedAsGuest"
                class="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </Transition>
      
      <!-- Signup Form Modal -->
      <Transition name="fade">
        <div v-if="showSignupForm" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-fade-in overflow-y-auto max-h-[90vh]">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">Create Account</h2>
              <button @click="showSignupForm = false" class="text-gray-500 hover:text-gray-700">
                <X class="w-5 h-5" />
              </button>
            </div>
            
            <form @submit.prevent="handleSignup" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="form-group">
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    id="firstName"
                    v-model="signupData.firstName"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div class="form-group">
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    id="lastName"
                    v-model="signupData.lastName"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
              </div>
              
              <div class="form-group">
                <label for="signupEmail" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  id="signupEmail"
                  v-model="signupData.email"
                  type="email"
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <div class="form-group">
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input 
                  id="password"
                  v-model="signupData.password"
                  type="password"
                  required
                  minlength="6"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <p class="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
              </div>
              
              <div class="form-group">
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                <input 
                  id="phone"
                  v-model="signupData.phone"
                  type="tel"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <button 
                type="submit"
                :disabled="isSigningUp"
                class="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
              >
                <Loader v-if="isSigningUp" class="w-5 h-5 mr-2 animate-spin" />
                {{ isSigningUp ? 'Creating Account...' : 'Create Account' }}
              </button>
            </form>
          </div>
        </div>
      </Transition>
      
      <!-- Success Modal -->
      <Transition name="fade">
        <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-bounce-in">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
                <CheckCircle class="w-8 h-8" />
              </div>
              <h2 class="text-2xl font-bold mb-2">Account Created!</h2>
              <p class="text-gray-600 mb-6">Your account has been created successfully. You can now proceed with checkout.</p>
              <button 
                @click="showSuccessModal = false"
                class="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300"
              >
                Continue to Checkout
              </button>
            </div>
          </div>
        </div>
      </Transition>
      
      <!-- Checkout Steps Progress -->
      <div class="max-w-4xl mx-auto mb-8">
        <div class="flex items-center justify-between">
          <div 
            class="flex flex-col items-center"
            :class="{ 'text-black': checkoutStep >= 1, 'text-gray-400': checkoutStep < 1 }"
          >
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300"
              :class="{ 'bg-black text-white scale-110': checkoutStep === 1, 'bg-black text-white': checkoutStep > 1, 'bg-gray-200': checkoutStep < 1 }"
            >
              1
            </div>
            <span class="text-sm font-medium">Delivery</span>
          </div>
          
          <div class="flex-1 h-1 mx-4" :class="{ 'bg-black': checkoutStep >= 2, 'bg-gray-200': checkoutStep < 2 }"></div>
          
          <div 
            class="flex flex-col items-center"
            :class="{ 'text-black': checkoutStep >= 2, 'text-gray-400': checkoutStep < 2 }"
          >
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300"
              :class="{ 'bg-black text-white scale-110': checkoutStep === 2, 'bg-black text-white': checkoutStep > 2, 'bg-gray-200': checkoutStep < 2 }"
            >
              2
            </div>
            <span class="text-sm font-medium">Shipping</span>
          </div>
          
          <div class="flex-1 h-1 mx-4" :class="{ 'bg-black': checkoutStep >= 3, 'bg-gray-200': checkoutStep < 3 }"></div>
          
          <div 
            class="flex flex-col items-center"
            :class="{ 'text-black': checkoutStep >= 3, 'text-gray-400': checkoutStep < 3 }"
          >
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300"
              :class="{ 'bg-black text-white scale-110': checkoutStep === 3, 'bg-gray-200': checkoutStep < 3 }"
            >
              3
            </div>
            <span class="text-sm font-medium">Payment</span>
          </div>
        </div>
      </div>
      
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Checkout Steps -->
        <div class="lg:col-span-2">
          <!-- Step 1: Delivery Details -->
          <Transition name="slide-fade" mode="out-in">
            <div v-if="checkoutStep === 1" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 class="text-xl font-semibold mb-6 flex items-center">
                <User class="w-5 h-5 mr-2" />
                Delivery Details
              </h2>
              
              <form @submit.prevent="nextStep" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="form-group">
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    id="firstName"
                    v-model="deliveryDetails.firstName"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div class="form-group">
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    id="lastName"
                    v-model="deliveryDetails.lastName"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div class="form-group">
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    id="email"
                    v-model="deliveryDetails.email"
                    type="email"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div class="form-group">
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    id="phone"
                    v-model="deliveryDetails.phone"
                    type="tel"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div class="form-group md:col-span-2">
                  <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input 
                    id="address"
                    v-model="deliveryDetails.address"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div class="form-group">
                  <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    id="city"
                    v-model="deliveryDetails.city"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div class="form-group">
                  <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input 
                    id="state"
                    v-model="deliveryDetails.state"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div class="form-group">
                  <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input 
                    id="zipCode"
                    v-model="deliveryDetails.zipCode"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div class="form-group">
                  <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select 
                    id="country"
                    v-model="deliveryDetails.country"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
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
                    class="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                  >
                    Continue to Shipping
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Step 2: Shipping Method -->
            <div v-else-if="checkoutStep === 2" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 class="text-xl font-semibold mb-6 flex items-center">
                <Truck class="w-5 h-5 mr-2" />
                Shipping Method
              </h2>
              
              <div class="space-y-4 mb-8">
                <div 
                  class="border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                  :class="{ 'border-black bg-gray-50 shadow-sm': deliveryMethod === 'standard', 'border-gray-200': deliveryMethod !== 'standard' }"
                  @click="setDeliveryMethod('standard')"
                >
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200"
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
                  class="border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                  :class="{ 'border-black bg-gray-50 shadow-sm': deliveryMethod === 'express', 'border-gray-200': deliveryMethod !== 'express' }"
                  @click="setDeliveryMethod('express')"
                >
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200"
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
                  class="border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                  :class="{ 'border-black bg-gray-50 shadow-sm': deliveryMethod === 'pickup', 'border-gray-200': deliveryMethod !== 'pickup' }"
                  @click="setDeliveryMethod('pickup')"
                >
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200"
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
                  class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  <ArrowLeft class="w-4 h-4 inline mr-2" />
                  Back
                </button>
                <button 
                  @click="nextStep"
                  class="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  Continue to Payment
                  <ArrowRight class="w-4 h-4 inline ml-2" />
                </button>
              </div>
            </div>
            
            <!-- Step 3: Payment -->
            <div v-else-if="checkoutStep === 3" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 class="text-xl font-semibold mb-6 flex items-center">
                <CreditCard class="w-5 h-5 mr-2" />
                Payment Method
              </h2>
              
              <!-- Payment Method Selection -->
              <div class="space-y-4 mb-8">
                <div 
                  class="border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                  :class="{ 'border-black bg-gray-50 shadow-sm': paymentMethod === 'flutterwave', 'border-gray-200': paymentMethod !== 'flutterwave' }"
                  @click="setPaymentMethod('flutterwave')"
                >
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200"
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
                  class="border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                  :class="{ 'border-black bg-gray-50 shadow-sm': paymentMethod === 'interswitch', 'border-gray-200': paymentMethod !== 'interswitch' }"
                  @click="setPaymentMethod('interswitch')"
                >
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200"
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
                  class="border rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                  :class="{ 'border-black bg-gray-50 shadow-sm': paymentMethod === 'manual', 'border-gray-200': paymentMethod !== 'manual' }"
                  @click="setPaymentMethod('manual')"
                >
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-200"
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
              <Transition name="fade">
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
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
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
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
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
                          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
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
                          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </Transition>
              
              <div class="flex gap-4 mt-6">
                <button 
                  @click="prevStep"
                  class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                >
                  <ArrowLeft class="w-4 h-4 inline mr-2" />
                  Back
                </button>
                <button 
                  @click="processPayment"
                  :disabled="isProcessing"
                  class="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <Loader v-if="isProcessing" class="w-5 h-5 mr-2 animate-spin" />
                  {{ isProcessing ? 'Processing...' : 'Complete Order' }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
        
        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
              <ShoppingCart class="w-5 h-5 mr-2" />
              Order Summary
            </h2>
            
            <div v-if="checkoutSummary && checkoutSummary.items.length > 0" class="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              <div v-for="item in checkoutSummary.items" :key="item.id" class="flex gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all duration-200">
                <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-sm">{{ item.title }}</h4>
                  <p class="text-sm text-gray-600">${{ formatPrice(item.price) }}</p>
                  
                  <div class="flex items-center mt-2">
                    <button 
                      @click="updateItemQuantity(item.id, Math.max(1, item.quantity - 1))"
                      class="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                      <Minus class="w-3 h-3" />
                    </button>
                    <span class="mx-2 text-sm font-medium">{{ item.quantity }}</span>
                    <button 
                      @click="updateItemQuantity(item.id, item.quantity + 1)"
                      class="w-7 h-7 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                      <Plus class="w-3 h-3" />
                    </button>
                    
                    <button 
                      @click="removeItem(item.id)"
                      class="ml-auto text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-medium">${{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-4 space-y-3">
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
              <div class="flex justify-between font-bold pt-3 border-t border-gray-200 mt-3">
                <span>Total</span>
                <span>${{ formatPrice(calculateTotal()) }}</span>
              </div>
            </div>
            
            <div class="mt-6 pt-4 border-t border-gray-200">
              <div class="flex items-center text-sm text-gray-600 mb-4">
                <LockIcon class="w-4 h-4 mr-2" />
                Secure checkout
              </div>
              <div class="flex gap-2">
                <div class="w-10 h-6 bg-gray-200 rounded"></div>
                <div class="w-10 h-6 bg-gray-200 rounded"></div>
                <div class="w-10 h-6 bg-gray-200 rounded"></div>
                <div class="w-10 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCartStore } from '@/composables/useCartStore'
import { use_auth_signup } from '@/composables/auth/register'
import { useCheckoutStore } from '@/composables/useCheckoutStore'
import { useUser } from '@/composables/auth/user'
import { 
  ShoppingBag, 
  CheckCircle, 
  User, 
  Truck, 
  CreditCard, 
  ShoppingCart, 
  ArrowLeft, 
  ArrowRight, 
  Minus, 
  Plus, 
  Trash2, 
  X, 
  Loader,
  LockIcon
} from 'lucide-vue-next'

// Cart store
const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useCartStore()

// Auth
const { signup } = use_auth_signup()
const { isLoggedIn } = useUser()

// Checkout store
const { 
  checkoutStep,
  checkoutSummary,
  deliveryDetails,
  deliveryMethod,
  paymentMethod,
  cardDetails,
  isProcessing,
  orderComplete,
  nextStep,
  prevStep,
  setDeliveryMethod,
  setPaymentMethod,
  processPayment
} = useCheckoutStore()

// Authentication state
// const isUserLoggedIn = ref(false)
const showAuthCheck = ref(false)
const showSignupForm = ref(false)
const showSuccessModal = ref(false)
const isSigningUp = ref(false)

// Signup data
const signupData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  role: 'customer'
})

// Check if user is logged in
// onMounted(() => {
//   // Check localStorage for user data
//   const userData = localStorage.getItem('user-data')
//   if (userData) {
//     try {
//       const parsedData = JSON.parse(userData)
//       if (parsedData && parsedData.email) {
//         isUserLoggedIn.value = true
//       }
//     } catch (e) {
//       console.error('Failed to parse user data from localStorage', e)
//     }
//   }
  
//   // If not logged in, show auth check modal after a short delay
//   if (!isUserLoggedIn.value) {
//     setTimeout(() => {
//       showAuthCheck.value = true
//     }, 500)
//   }
// })

// Proceed as guest
const proceedAsGuest = () => {
  showAuthCheck.value = false
}

// Handle signup
const handleSignup = async () => {
  try {
    isSigningUp.value = true
    
    // Call signup method from auth composable
    const payloadObj = {
      firstName: signupData.value.firstName,
      lastName: signupData.value.lastName,
      email: signupData.value.email,
      password: signupData.value.password,
      phone: signupData.value.phone,
      role: signupData.value.role
    }
    const response = await signup(payloadObj)
    
    // Store user data in localStorage
    if (response) {
      // localStorage.setItem('user-data', JSON.stringify(response))
      // isUserLoggedIn.value = true
      showSignupForm.value = false
      
      // Show success modal
      showSuccessModal.value = true
      
      // Pre-fill delivery details with user info
      deliveryDetails.value.firstName = signupData.value.firstName
      deliveryDetails.value.lastName = signupData.value.lastName
      deliveryDetails.value.email = signupData.value.email
      deliveryDetails.value.phone = signupData.value.phone || ''
    }
  } catch (error) {
    console.error('Signup failed:', error)
    // Handle error (could add error state and message)
  } finally {
    isSigningUp.value = false
  }
}

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

// Update item quantity in cart
const updateItemQuantity = (id: number, quantity: number) => {
  updateCartItemQuantity(id, quantity)
}

// Remove item from cart
const removeItem = (id: number) => {
  removeFromCart(id)
}

// Watch for cart changes to update checkout summary
watch(cart, () => {
  if (checkoutSummary.value) {
    checkoutSummary.value.items = cart.value
    checkoutSummary.value.subtotal = cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}, { deep: true })

const isCartEmpty = computed(() => {
  return !checkoutSummary.value || checkoutSummary.value.items.length === 0;
});

watch(isCartEmpty, (newValue) => {
  if (newValue && !isLoggedIn.value) {
    setTimeout(() => {
      showAuthCheck.value = true;
    }, 500);
  }
});

onMounted(() => {
  if (cart.value.length === 0) {
    showAuthCheck.value = true;
  }
});
</script>

<style scoped>
/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-bounce-in {
  animation: bounceIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>