<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
    <!-- Animated Background Elements -->
    <div class="fixed w-full h-full pointer-events-none overflow-hidden">
      <div class="absolute top-20 left-10 w-32 h-32 bg-rose-500/10 rounded-full mix-blend-screen blur-xl animate-float-slow"></div>
      <div class="absolute bottom-40 right-20 w-40 h-40 bg-amber-500/10 rounded-full mix-blend-screen blur-xl animate-float-medium"></div>
      <div class="absolute top-1/3 right-1/4 w-24 h-24 bg-emerald-500/10 rounded-full mix-blend-screen blur-xl animate-float-fast"></div>
    </div>
    
    <!-- Empty Cart State -->
    <div v-if="!checkoutSummary" class="container mx-auto px-4 py-16 text-center">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100 transform transition-all duration-700 hover:shadow-xl">
        <div class="mb-6 text-gray-300">
          <div class="mx-auto w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center animate-pulse-slow">
            <ShoppingBag class="w-12 h-12" />
          </div>
        </div>
        <h2 class="text-2xl font-bold mb-4 animate-fade-in">Your cart is empty</h2>
        <p class="text-gray-600 mb-6 animate-fade-in delay-100">Please add some items to your cart before proceeding to checkout.</p>
        <NuxtLink to="/" class="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 animate-fade-in delay-200">
          <span class="flex items-center">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Browse Artwork
          </span>
        </NuxtLink>
      </div>
    </div>
    
    <!-- Order Complete State -->
    <div v-else-if="orderComplete" class="container mx-auto px-4 py-16">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-100 animate-scale-in">
        <div class="mb-6 text-green-500 flex justify-center">
          <div class="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center animate-bounce-once">
            <CheckCircle class="w-10 h-10" />
          </div>
        </div>
        <h2 class="text-2xl font-bold mb-4 text-center animate-fade-in delay-300">Thank you for your order!</h2>
        <p class="text-gray-600 mb-2 text-center animate-fade-in delay-400">Your order has been successfully placed.</p>
        <p class="text-gray-600 mb-6 text-center animate-fade-in delay-500">We've sent a confirmation email with your order details.</p>
        <div class="flex flex-col space-y-4 animate-fade-in delay-600">
          <div class="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Order Number:</span>
              <span class="font-medium">#{{ orderId || generateOrderNumber() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Total Amount:</span>
              <span class="font-medium">${{ formatPrice(calculateTotal()) }}</span>
            </div>
          </div>
          <NuxtLink to="/" class="block w-full px-6 py-3 bg-black text-white rounded-lg text-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
            Continue Shopping
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Checkout Flow -->
    <div v-else class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-8 text-center md:text-left animate-fade-in">Checkout</h1>
      
      <!-- Authentication Modal -->
      <Transition name="fade">
        <div v-if="showAuthModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
            <div v-if="authModalMode === 'check'">
              <h2 class="text-2xl font-bold mb-4">Create an Account?</h2>
              <p class="text-gray-600 mb-6">Creating an account helps you track your orders and get updates on your purchases.</p>
              <div class="flex flex-col gap-4">
                <button 
                  @click="authModalMode = 'signin'"
                  class="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </button>
                <button 
                  @click="authModalMode = 'signup'"
                  class="flex-1 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all duration-300 transform hover:scale-105"
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
            
            <div v-else-if="authModalMode === 'signin'">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Sign In</h2>
                <button @click="closeAuthModal" class="text-gray-500 hover:text-gray-700">
                  <X class="w-5 h-5" />
                </button>
              </div>
              
              <form @submit.prevent="handleSignin" class="space-y-4">
                <div class="form-group">
                  <label for="signinEmail" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    id="signinEmail"
                    v-model="signinData.email"
                    type="email"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <div class="form-group">
                  <label for="signinPassword" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input 
                    id="signinPassword"
                    v-model="signinData.password"
                    type="password"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
                
                <button 
                  type="submit"
                  :disabled="isSigningIn"
                  class="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
                >
                  <Loader v-if="isSigningIn" class="w-5 h-5 mr-2 animate-spin" />
                  {{ isSigningIn ? 'Signing In...' : 'Sign In' }}
                </button>
                
                <div class="text-center mt-4">
                  <p class="text-gray-600">
                    Don't have an account? 
                    <button 
                      @click="authModalMode = 'signup'" 
                      class="text-rose-600 hover:text-rose-700 font-medium"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            </div>
            
            <div v-else-if="authModalMode === 'signup'">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Create Account</h2>
                <button @click="closeAuthModal" class="text-gray-500 hover:text-gray-700">
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
                
                <div class="text-center mt-4">
                  <p class="text-gray-600">
                    Already have an account? 
                    <button 
                      @click="authModalMode = 'signin'" 
                      class="text-rose-600 hover:text-rose-700 font-medium"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Transition>
      
      <!-- Checkout Steps Progress -->
      <div class="max-w-4xl mx-auto mb-12 animate-fade-in">
        <div class="flex items-center justify-between">
          <div 
            class="flex flex-col items-center"
            :class="{ 'text-black': checkoutStep >= 1, 'text-gray-400': checkoutStep < 1 }"
          >
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500"
              :class="{ 
                'bg-black text-white scale-110 shadow-lg': checkoutStep === 1, 
                'bg-black text-white': checkoutStep > 1, 
                'bg-gray-200': checkoutStep < 1 
              }"
            >
              <User class="w-5 h-5" />
            </div>
            <span class="text-sm font-medium">Delivery</span>
          </div>
          
          <div class="flex-1 h-1 mx-4 relative">
            <div class="absolute inset-0 bg-gray-200"></div>
            <div 
              class="absolute inset-0 bg-black transition-all duration-500 ease-out"
              :style="{ width: checkoutStep >= 2 ? '100%' : '0%' }"
            ></div>
          </div>
          
          <div 
            class="flex flex-col items-center"
            :class="{ 'text-black': checkoutStep >= 2, 'text-gray-400': checkoutStep < 2 }"
          >
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500"
              :class="{ 
                'bg-black text-white scale-110 shadow-lg': checkoutStep === 2, 
                'bg-black text-white': checkoutStep > 2, 
                'bg-gray-200': checkoutStep < 2 
              }"
            >
              <Truck class="w-5 h-5" />
            </div>
            <span class="text-sm font-medium">Shipping</span>
          </div>
          
          <div class="flex-1 h-1 mx-4 relative">
            <div class="absolute inset-0 bg-gray-200"></div>
            <div 
              class="absolute inset-0 bg-black transition-all duration-500 ease-out"
              :style="{ width: checkoutStep >= 3 ? '100%' : '0%' }"
            ></div>
          </div>
          
          <div 
            class="flex flex-col items-center"
            :class="{ 'text-black': checkoutStep >= 3, 'text-gray-400': checkoutStep < 3 }"
          >
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-500"
              :class="{ 
                'bg-black text-white scale-110 shadow-lg': checkoutStep === 3, 
                'bg-gray-200': checkoutStep < 3 
              }"
            >
              <CreditCard class="w-5 h-5" />
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
            <div v-if="checkoutStep === 1" class="bg-white p-8 rounded-xl shadow-md border border-gray-100 animate-fade-in">
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
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    @input="persistDeliveryDetails"
                  />
                </div>
                
                <div class="form-group">
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input 
                    id="lastName"
                    v-model="deliveryDetails.lastName"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    @input="persistDeliveryDetails"
                  />
                </div>
                
                <div class="form-group">
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    id="email"
                    v-model="deliveryDetails.email"
                    type="email"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    @input="persistDeliveryDetails"
                  />
                </div>
                
                <div class="form-group">
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    id="phone"
                    v-model="deliveryDetails.phone"
                    type="tel"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    @input="persistDeliveryDetails"
                  />
                </div>
                
                <div class="form-group md:col-span-2">
                  <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input 
                    id="address"
                    v-model="deliveryDetails.address"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    @input="persistDeliveryDetails"
                  />
                </div>
                
                <div class="form-group">
                  <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    id="city"
                    v-model="deliveryDetails.city"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    @input="persistDeliveryDetails"
                  />
                </div>
                
                <div class="form-group">
                  <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input 
                    id="state"
                    v-model="deliveryDetails.state"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    @input="persistDeliveryDetails"
                  />
                </div>
                
                <div class="form-group">
                  <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input 
                    id="zipCode"
                    v-model="deliveryDetails.zipCode"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    @input="persistDeliveryDetails"
                  />
                </div>
                
                <div class="form-group">
                  <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select 
                    id="country"
                    v-model="deliveryDetails.country"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 hover:border-gray-400"
                    @change="persistDeliveryDetails"
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
                    class="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                  >
                    Continue to Shipping
                    <ArrowRight class="w-4 h-4 ml-2" />
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Step 2: Shipping Method -->
            <div v-else-if="checkoutStep === 2" class="bg-white p-8 rounded-xl shadow-md border border-gray-100 animate-fade-in">
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
                      <div v-if="deliveryMethod === 'standard'" class="w-3 h-3 rounded-full bg-black animate-scale-in"></div>
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
                      <div v-if="deliveryMethod === 'express'" class="w-3 h-3 rounded-full bg-black animate-scale-in"></div>
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
                      <div v-if="deliveryMethod === 'pickup'" class="w-3 h-3 rounded-full bg-black animate-scale-in"></div>
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
                  class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                >
                  <ArrowLeft class="w-4 h-4 mr-2" />
                  Back
                </button>
                <button 
                  @click="nextStep"
                  class="flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  Continue to Payment
                  <ArrowRight class="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
            
            <!-- Step 3: Payment -->
            <div v-else-if="checkoutStep === 3" class="bg-white p-8 rounded-xl shadow-md border border-gray-100 animate-fade-in">
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
                      <div v-if="paymentMethod === 'flutterwave'" class="w-3 h-3 rounded-full bg-black animate-scale-in"></div>
                    </div>
                    <div class="flex-1">
                      <span class="font-medium">Pay with Flutterwave</span>
                      <p class="text-sm text-gray-600">Secure payment via Flutterwave</p>
                    </div>
                    <div class="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                      <img src="@/assets/icons/flutterwave.svg" alt="Flutterwave" class="w-6 h-6" @error="handleImageError" />
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
                      <div v-if="paymentMethod === 'manual'" class="w-3 h-3 rounded-full bg-black animate-scale-in"></div>
                    </div>
                    <div class="flex-1">
                      <span class="font-medium">Credit/Debit Card</span>
                      <p class="text-sm text-gray-600">Pay directly with your card</p>
                    </div>
                    <div class="flex space-x-1">
                      <div class="w-8 h-6 bg-gray-100 rounded flex items-center justify-center">
                        <img src="@/assets/icons/card.svg" alt="Visa" class="h-3" @error="handleImageError" />
                      </div>
                      <div class="w-8 h-6 bg-gray-100 rounded flex items-center justify-center">
                        <img src="@/assets/icons/card.svg" alt="Mastercard" class="h-3" @error="handleImageError" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Manual Payment Form -->
              <Transition name="fade">
                <div v-if="paymentMethod === 'manual'" class="border-t border-gray-200 pt-6 mt-6">
                  <!-- <h3 class="text-lg font-medium mb-4  class="border-t border-gray-200 pt-6 mt-6"> -->
                  <h3 class="text-lg font-medium mb-4">Card Details</h3>
                  <form class="space-y-4">
                    <div class="form-group">
                      <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <div class="relative">
                        <input 
                          id="cardNumber"
                          v-model="cardDetails.cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          required
                          class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                        />
                        <CreditCard class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      </div>
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
                        <div class="relative">
                          <input 
                            id="cvv"
                            v-model="cardDetails.cvv"
                            type="text"
                            placeholder="123"
                            required
                            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                          />
                          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-help group">
                            <HelpCircle class="w-4 h-4 text-gray-400" />
                            <div class="absolute bottom-full right-0 mb-2 w-48 p-2 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                              The 3-digit security code on the back of your card
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Transition>
              
              <div class="flex gap-4 mt-6">
                <button 
                  @click="prevStep"
                  class="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                >
                  <ArrowLeft class="w-4 h-4 mr-2" />
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
          <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-6 animate-fade-in">
            <h2 class="text-xl font-semibold mb-4 flex items-center">
              <ShoppingCart class="w-5 h-5 mr-2" />
              Order Summary
            </h2>
            
            <div v-if="checkoutSummary && checkoutSummary.items.length > 0" class="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <div 
                v-for="item in checkoutSummary.items" 
                :key="item.id" 
                class="flex gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
              >
                <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div class="flex-1">
                  <h4 class="font-medium text-sm">{{ item.title }}</h4>
                  <p class="text-sm text-gray-600">${{ formatPrice(item.price) }}</p>
                  
                  <div class="flex items-center mt-2">
                    <button 
                      @click="updateItemQuantity(item.id, Math.max(1, item.quantity - 1))"
                      class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Minus class="w-3 h-3" />
                    </button>
                    <span class="mx-2 text-sm font-medium">{{ item.quantity }}</span>
                    <button 
                      @click="updateItemQuantity(item.id, item.quantity + 1)"
                      class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
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
                <span class="text-lg">${{ formatPrice(calculateTotal()) }}</span>
              </div>
            </div>
            
            <div class="mt-6 pt-4 border-t border-gray-200">
              <div class="flex items-center text-sm text-gray-600 mb-4">
                <LockIcon class="w-4 h-4 mr-2" />
                Secure checkout
              </div>
              <div class="flex gap-2">
                <div class="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <img src="@/assets/icons/card.svg" alt="Visa" class="h-3" @error="handleImageError" />
                </div>
                <div class="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <img src="@/assets/icons/card.svg" alt="Mastercard" class="h-3" @error="handleImageError" />
                </div>
                <div class="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <img src="@/assets/icons/card.svg" alt="American Express" class="h-3" @error="handleImageError" />
                </div>
                <div class="w-10 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <img src="@/assets/icons/card.svg" alt="PayPal" class="h-3" @error="handleImageError" />
                </div>
              </div>
            </div>
            
            <!-- Checkout Timer -->
            <div class="mt-6 pt-4 border-t border-gray-200">
              <div class="bg-rose-50 p-3 rounded-lg flex items-center">
                <Clock class="w-5 h-5 text-rose-500 mr-2" />
                <div>
                  <p class="text-sm font-medium text-rose-700">Your cart is reserved for:</p>
                  <p class="text-lg font-bold text-rose-600">{{ formatTime(checkoutTimer) }}</p>
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
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useCartStore } from '@/composables/useCartStore'
import { use_auth_signup } from '@/composables/auth/register'
import { use_auth_login } from '@/composables/auth/login'
import { useCheckoutStore } from '@/composables/useCheckoutStore'
import { useUser } from '@/composables/auth/user'
import { useLocalStorage } from '@/composables/useLocalStorage'
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
  LockIcon,
  HelpCircle,
  Clock
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'

// Router
const router = useRouter()

// Cart store
const { cart, removeFromCart, updateCartItemQuantity } = useCartStore()

// Auth
const { signup } = use_auth_signup()
const { login } = use_auth_login()
const { isLoggedIn, user } = useUser()

// Local storage
const { setItem, getItem, removeItem: removeStorageItem } = useLocalStorage()

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
  orderId,
  nextStep,
  prevStep,
  setDeliveryMethod,
  setPaymentMethod,
  processPayment,
  persistDeliveryDetails,
  resetCheckout
} = useCheckoutStore()

// Authentication state
const showAuthModal = ref(false)
const authModalMode = ref('check') // 'check', 'signin', 'signup'
const isSigningUp = ref(false)
const isSigningIn = ref(false)

// Checkout timer
const checkoutTimer = ref(15 * 60) // 15 minutes in seconds
let timerInterval = null

// Signup data
const signupData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  role: 'customer'
})

// Signin data
const signinData = ref({
  email: '',
  password: ''
})

// Proceed as guest
const proceedAsGuest = () => {
  showAuthModal.value = false
  setItem('checkout-guest-mode', 'true')
}

// Close auth modal
const closeAuthModal = () => {
  showAuthModal.value = false
  authModalMode.value = 'check'
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
    
    if (response) {
      showAuthModal.value = false
      
      // Pre-fill delivery details with user info
      deliveryDetails.firstName = signupData.value.firstName
      deliveryDetails.lastName = signupData.value.lastName
      deliveryDetails.email = signupData.value.email
      deliveryDetails.phone = signupData.value.phone || ''
      
      // Persist delivery details
      persistDeliveryDetails()
    }
  } catch (error) {
    console.error('Signup failed:', error)
    // Handle error (could add error state and message)
  } finally {
    isSigningUp.value = false
  }
}

// Handle signin
const handleSignin = async () => {
  try {
    isSigningIn.value = true
    
    // Call signin method from auth composable
    const payloadObj = {
      email: signinData.value.email,
      password: signinData.value.password
    }
    const response = await login(payloadObj)
    
    if (response) {
      showAuthModal.value = false
      
      // Pre-fill delivery details if available from user data
      const userData = JSON.parse(localStorage.getItem('user-data') || '{}')
      if (userData) {
        deliveryDetails.firstName = userData.firstName || ''
        deliveryDetails.lastName = userData.lastName || ''
        deliveryDetails.email = userData.email || ''
        deliveryDetails.phone = userData.phone || ''
        
        // Persist delivery details
        persistDeliveryDetails()
      }
    }
  } catch (error) {
    console.error('Signin failed:', error)
    // Handle error (could add error state and message)
  } finally {
    isSigningIn.value = false
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
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Format time for countdown
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Generate random order number
const generateOrderNumber = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Update item quantity in cart
const updateItemQuantity = (id: number, quantity: number) => {
  updateCartItemQuantity(id, quantity)
}

// Remove item from cart
const removeItem = (id: number) => {
  removeFromCart(id)
}

// Handle image error
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder.svg?height=100&width=100'
}

// Check if user is logged in on page load
const checkUserAuth = () => {
  // Only show auth modal if user is not logged in and not in guest mode
  const isGuestMode = getItem('checkout-guest-mode') === 'true'
  
  if (!isLoggedIn.value && !isGuestMode) {
    showAuthModal.value = true
  }
}

// Start checkout timer
const startCheckoutTimer = () => {
  // Restore timer from localStorage if exists
  const savedTimer = getItem('checkout-timer')
  if (savedTimer) {
    checkoutTimer.value = parseInt(savedTimer)
  }
  
  timerInterval = setInterval(() => {
    if (checkoutTimer.value > 0) {
      checkoutTimer.value--
      // Save timer to localStorage
      setItem('checkout-timer', checkoutTimer.value.toString())
    } else {
      clearInterval(timerInterval)
      // Handle expired timer - redirect to cart
      router.push('/cart')
    }
  }, 1000)
}

// Watch for cart changes to update checkout summary
watch(cart, () => {
  if (checkoutSummary.value) {
    checkoutSummary.value.items = cart.value
    checkoutSummary.value.subtotal = cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}, { deep: true })

// Watch for login status changes
watch(isLoggedIn, (newValue) => {
  if (newValue) {
    // User is now logged in, close auth modal if open
    showAuthModal.value = false
    
    // Pre-fill delivery details with user info if available
    if (user.value) {
      deliveryDetails.firstName = user.value.firstName || ''
      deliveryDetails.lastName = user.value.lastName || ''
      deliveryDetails.email = user.value.email || ''
      deliveryDetails.phone = user.value.phone || ''
      
      // Persist updated delivery details
      persistDeliveryDetails()
    }
  } else {
    // User is logged out, check if we should show auth modal
    checkUserAuth()
  }
})

// Watch for order completion
watch(orderComplete, (newValue) => {
  if (newValue) {
    // Clear checkout timer on successful order
    if (timerInterval) {
      clearInterval(timerInterval)
    }
    
    // Reset checkout timer
    checkoutTimer.value = 15 * 60
    removeStorageItem('checkout-timer')
  }
})

// Lifecycle hooks
onMounted(() => {
  // Check if user is logged in
  checkUserAuth()
  
  // Start checkout timer
  startCheckoutTimer()
  
  // Check if cart is empty
  if (!checkoutSummary.value || (checkoutSummary.value.items.length === 0)) {
    // Redirect to cart page
    router.push('/')
  }
})

onBeforeUnmount(() => {
  // Clear timer interval
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
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

/* Animations */
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.5s ease-out forwards;
}

.animate-bounce-once {
  animation: bounceOnce 1s ease-out forwards;
}

.animate-pulse-slow {
  animation: pulseSlow 3s infinite;
}

.animate-float-slow {
  animation: floatSlow 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: floatMedium 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: floatFast 4s ease-in-out infinite;
}

.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

.delay-300 {
  animation-delay: 0.3s;
}

.delay-400 {
  animation-delay: 0.4s;
}

.delay-500 {
  animation-delay: 0.5s;
}

.delay-600 {
  animation-delay: 0.6s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceOnce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes pulseSlow {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes floatSlow {
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes floatMedium {
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-15px) rotate(-5deg);
  }
}

@keyframes floatFast {
  0%, 100% {
    transform: translateY(0) rotate(0);
  }
  50% {
    transform: translateY(-10px) rotate(3deg);
  }
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
