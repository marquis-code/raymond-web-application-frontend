<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
    <!-- Background Pattern -->
    <div class="fixed inset-0 opacity-5 pointer-events-none">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0); background-size: 20px 20px;"></div>
    </div>

    <!-- Empty Cart State -->
    <div v-if="!cartItems || cartItems.length === 0" class="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
      <div class="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-200 text-center">
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
          <ShoppingBag class="w-12 h-12 text-slate-400" />
        </div>
        <h2 class="text-2xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
        <p class="text-slate-600 mb-8">Add some amazing artwork to your cart to continue with checkout.</p>
        <NuxtLink 
          to="/artworks" 
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl hover:from-slate-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft class="w-4 h-4 mr-2" />
          Browse Artwork
        </NuxtLink>
      </div>
    </div>

    <!-- Order Complete State -->
    <div v-else-if="orderComplete" class="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
      <div class="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <div class="text-center mb-8">
          <div class="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
            <CheckCircle class="w-10 h-10 text-emerald-600" />
          </div>
          <h2 class="text-3xl font-bold text-slate-800 mb-4">Order Confirmed!</h2>
          <p class="text-slate-600 mb-2">Thank you for your purchase</p>
          <p class="text-slate-500 text-sm">We've sent a confirmation email with your order details</p>
        </div>
        
        <div class="bg-slate-50 rounded-xl p-6 mb-8">
          <div class="flex justify-between items-center mb-3">
            <span class="text-slate-600 font-medium">Order Number</span>
            <span class="font-bold text-slate-800">#{{ orderId || generateOrderNumber() }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-600 font-medium">Total Amount</span>
            <span class="font-bold text-xl text-slate-800">${{ formatPrice(calculateTotal()) }}</span>
          </div>
        </div>
        
        <NuxtLink 
          to="/" 
          class="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl hover:from-slate-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium flex items-center justify-center"
        >
          Continue Shopping
        </NuxtLink>
      </div>
    </div>

    <!-- Main Checkout Flow -->
    <div v-else class="container mx-auto px-4 py-8 lg:py-12">
      <!-- Header -->
      <div class="text-center mt-20 mb-12">
        <h1 class="text-3xl font-bold text-slate-800 mb-4">Secure Checkout</h1>
        <p class="text-slate-600 max-w-2xl mx-auto">Complete your purchase securely. Your information is protected with industry-standard encryption.</p>
      </div>

      <!-- Progress Steps -->
      <div class="max-w-2xl mx-auto mb-12">
        <div class="flex items-center justify-between relative">
          <!-- Progress Line -->
          <div class="absolute top-4 left-0 right-0 h-0.5 bg-slate-200">
            <div 
              class="h-full bg-gradient-to-r from-slate-800 to-slate-900 transition-all duration-500 ease-out"
              :style="{ width: `${((currentStep - 1) / 2) * 100}%` }"
            ></div>
          </div>
          
          <!-- Step 1: Details -->
          <div class="relative flex flex-col items-center">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10"
              :class="currentStep >= 1 ? 'bg-slate-800 text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-400'"
            >
              <User class="w-4 h-4" />
            </div>
            <span class="text-xs font-medium mt-2 text-slate-600">Details</span>
          </div>
          
          <!-- Step 2: Shipping -->
          <div class="relative flex flex-col items-center">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10"
              :class="currentStep >= 2 ? 'bg-slate-800 text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-400'"
            >
              <Truck class="w-4 h-4" />
            </div>
            <span class="text-xs font-medium mt-2 text-slate-600">Shipping</span>
          </div>
          
          <!-- Step 3: Payment -->
          <div class="relative flex flex-col items-center">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10"
              :class="currentStep >= 3 ? 'bg-slate-800 text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-400'"
            >
              <CreditCard class="w-4 h-4" />
            </div>
            <span class="text-xs font-medium mt-2 text-slate-600">Payment</span>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
        <!-- Checkout Steps (Left Side) -->
        <div class="lg:col-span-3">
          <!-- Step 1: Customer Details -->
          <Transition name="slide-fade" mode="out-in">
            <div v-if="currentStep === 1" class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 lg:p-8">
              <div class="flex items-center mb-6">
                <div class="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mr-4">
                  <User class="w-5 h-5 text-slate-600" />
                </div>
                <h2 class="text-xl lg:text-2xl font-bold text-slate-800">Customer Details</h2>
              </div>
              
              <form @submit.prevent="handleNextStep" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <label for="firstName" class="block text-sm font-semibold text-slate-700">First Name</label>
                    <input 
                      id="firstName"
                      v-model="deliveryDetails.firstName"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="Enter your first name"
                      @input="persistDeliveryDetails"
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label for="lastName" class="block text-sm font-semibold text-slate-700">Last Name</label>
                    <input 
                      id="lastName"
                      v-model="deliveryDetails.lastName"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="Enter your last name"
                      @input="persistDeliveryDetails"
                    />
                  </div>
                </div>
                
                <div class="space-y-2">
                  <label for="email" class="block text-sm font-semibold text-slate-700">Email Address</label>
                  <input 
                    id="email"
                    v-model="deliveryDetails.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter your email address"
                    @input="persistDeliveryDetails"
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="phone" class="block text-sm font-semibold text-slate-700">Phone Number</label>
                  <input 
                    id="phone"
                    v-model="deliveryDetails.phone"
                    type="tel"
                    required
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter your phone number"
                    @input="persistDeliveryDetails"
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="address" class="block text-sm font-semibold text-slate-700">Street Address</label>
                  <input 
                    id="address"
                    v-model="deliveryDetails.address"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                    placeholder="Enter your street address"
                    @input="persistDeliveryDetails"
                  />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="space-y-2">
                    <label for="city" class="block text-sm font-semibold text-slate-700">City</label>
                    <input 
                      id="city"
                      v-model="deliveryDetails.city"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="City"
                      @input="persistDeliveryDetails"
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label for="state" class="block text-sm font-semibold text-slate-700">State</label>
                    <input 
                      id="state"
                      v-model="deliveryDetails.state"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="State"
                      @input="persistDeliveryDetails"
                    />
                  </div>
                  
                  <div class="space-y-2">
                    <label for="zipCode" class="block text-sm font-semibold text-slate-700">ZIP Code</label>
                    <input 
                      id="zipCode"
                      v-model="deliveryDetails.zipCode"
                      type="text"
                      required
                      class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                      placeholder="ZIP"
                      @input="persistDeliveryDetails"
                    />
                  </div>
                </div>
                
                <div class="space-y-2">
                  <label for="country" class="block text-sm font-semibold text-slate-700">Country</label>
                  <select 
                    id="country"
                    v-model="deliveryDetails.country"
                    required
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                    @change="handleCountryChange"
                  >
                    <option value="">Select Country</option>
                    <option 
                      v-for="country in availableCountries" 
                      :key="country.countryCode" 
                      :value="country.countryCode"
                    >
                      {{ country.countryName }}
                    </option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  class="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl hover:from-slate-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium flex items-center justify-center"
                >
                  Continue to Shipping
                  <ArrowRight class="w-5 h-5 ml-2" />
                </button>
              </form>
            </div>
            
            <!-- Step 2: Shipping Method -->
            <div v-else-if="currentStep === 2" class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 lg:p-8">
              <div class="flex items-center mb-6">
                <div class="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mr-4">
                  <Truck class="w-5 h-5 text-slate-600" />
                </div>
                <h2 class="text-xl lg:text-2xl font-bold text-slate-800">Shipping Method</h2>
              </div>
              
              <div class="space-y-4 mb-8">
                <div 
                  class="border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                  :class="deliveryMethod === 'standard' ? 'border-slate-800 bg-slate-50 shadow-md' : 'border-slate-200 hover:border-slate-300'"
                  @click="handleDeliveryMethodChange('standard')"
                >
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200"
                         :class="deliveryMethod === 'standard' ? 'border-slate-800 bg-slate-800' : 'border-slate-300'">
                      <div v-if="deliveryMethod === 'standard'" class="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div class="flex-1">
                      <div class="flex justify-between items-center mb-1">
                        <span class="font-semibold text-slate-800">Standard Shipping</span>
                        <span class="font-bold text-slate-800">${{ formatPrice(currentShippingFee) }}</span>
                      </div>
                      <p class="text-sm text-slate-600">Delivery within 5-7 business days</p>
                    </div>
                  </div>
                </div>
                
                <div 
                  class="border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                  :class="deliveryMethod === 'express' ? 'border-slate-800 bg-slate-50 shadow-md' : 'border-slate-200 hover:border-slate-300'"
                  @click="handleDeliveryMethodChange('express')"
                >
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200"
                         :class="deliveryMethod === 'express' ? 'border-slate-800 bg-slate-800' : 'border-slate-300'">
                      <div v-if="deliveryMethod === 'express'" class="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div class="flex-1">
                      <div class="flex justify-between items-center mb-1">
                        <span class="font-semibold text-slate-800">Express Shipping</span>
                        <span class="font-bold text-slate-800">${{ formatPrice(currentShippingFee * 2.5) }}</span>
                      </div>
                      <p class="text-sm text-slate-600">Delivery within 2-3 business days</p>
                    </div>
                  </div>
                </div>
                
                <!-- <div 
                  class="border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                  :class="deliveryMethod === 'pickup' ? 'border-slate-800 bg-slate-50 shadow-md' : 'border-slate-200 hover:border-slate-300'"
                  @click="handleDeliveryMethodChange('pickup')"
                >
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200"
                         :class="deliveryMethod === 'pickup' ? 'border-slate-800 bg-slate-800' : 'border-slate-300'">
                      <div v-if="deliveryMethod === 'pickup'" class="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div class="flex-1">
                      <div class="flex justify-between items-center mb-1">
                        <span class="font-semibold text-slate-800">Store Pickup</span>
                        <span class="font-bold text-slate-800">Free</span>
                      </div>
                      <p class="text-sm text-slate-600">Pickup at our gallery location</p>
                    </div>
                  </div>
                </div> -->
              </div>
              
              <div class="flex gap-2">
                <button 
                  @click="handlePrevStep"
                  class="flex-1 py-3 border-2 text-sm border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 font-medium flex items-center justify-center"
                >
                  <ArrowLeft class="w-4 h-4 mr-2" />
                  Back
                </button>
                <button 
                  @click="handleNextStep"
                  class="flex-1 py-3 px-3 text-sm bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl hover:from-slate-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium flex items-center justify-center"
                >
                  Continue to Payment
                  <ArrowRight class="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
            
            <!-- Step 3: Payment -->
            <div v-else-if="currentStep === 3" class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 lg:p-8">
              <div class="flex items-center mb-6">
                <div class="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mr-4">
                  <CreditCard class="w-5 h-5 text-slate-600" />
                </div>
                <h2 class="text-xl lg:text-2xl font-bold text-slate-800">Payment Method</h2>
              </div>
              
              <div class="space-y-4 mb-8">
                <div 
                  class="border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                  :class="paymentMethod === 'flutterwave' ? 'border-slate-800 bg-slate-50 shadow-md' : 'border-slate-200 hover:border-slate-300'"
                  @click="handlePaymentMethodChange('flutterwave')"
                >
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200"
                         :class="paymentMethod === 'flutterwave' ? 'border-slate-800 bg-slate-800' : 'border-slate-300'">
                      <div v-if="paymentMethod === 'flutterwave'" class="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div class="flex-1">
                      <span class="font-semibold text-slate-800">Pay with Flutterwave</span>
                      <p class="text-sm text-slate-600">Secure payment via Flutterwave</p>
                    </div>
                    <div class="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center">
                      <CreditCard class="w-6 h-6 text-slate-600" />
                    </div>
                  </div>
                </div>
                
                <!-- <div 
                  class="border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                  :class="paymentMethod === 'manual' ? 'border-slate-800 bg-slate-50 shadow-md' : 'border-slate-200 hover:border-slate-300'"
                  @click="handlePaymentMethodChange('manual')"
                >
                  <div class="flex items-center">
                    <div class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200"
                         :class="paymentMethod === 'manual' ? 'border-slate-800 bg-slate-800' : 'border-slate-300'">
                      <div v-if="paymentMethod === 'manual'" class="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                    <div class="flex-1">
                      <span class="font-semibold text-slate-800">Credit/Debit Card</span>
                      <p class="text-sm text-slate-600">Pay directly with your card</p>
                    </div>
                    <div class="flex space-x-3">
                      <div class="w-8 h-6 bg-slate-100 rounded flex items-center justify-center">
                        <span class="text-xs font-bold text-slate-600">VISA</span>
                      </div>
                      <div class="w-8 h-6 bg-slate-100 rounded flex items-center justify-center">
                        <span class="text-xs font-bold text-slate-600">MC</span>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
              
              <!-- Card Details Form -->
              <Transition name="fade">
                <div v-if="paymentMethod === 'manual'" class="border-t border-slate-200 pt-6 mb-8">
                  <h3 class="text-lg font-semibold text-slate-800 mb-4">Card Details</h3>
                  <div class="space-y-4">
                    <div class="space-y-2">
                      <label for="cardNumber" class="block text-sm font-semibold text-slate-700">Card Number</label>
                      <div class="relative">
                        <input 
                          id="cardNumber"
                          v-model="cardDetails.cardNumber"
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          required
                          class="w-full px-4 py-3 pl-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                          @input="formatCardNumber"
                        />
                        <CreditCard class="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                      </div>
                    </div>
                    
                    <div class="space-y-2">
                      <label for="cardName" class="block text-sm font-semibold text-slate-700">Cardholder Name</label>
                      <input 
                        id="cardName"
                        v-model="cardDetails.cardName"
                        type="text"
                        placeholder="John Doe"
                        required
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                      />
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                      <div class="space-y-2">
                        <label for="expiryDate" class="block text-sm font-semibold text-slate-700">Expiry Date</label>
                        <input 
                          id="expiryDate"
                          v-model="cardDetails.expiryDate"
                          type="text"
                          placeholder="MM/YY"
                          required
                          class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                          @input="formatExpiryDate"
                        />
                      </div>
                      
                      <div class="space-y-2">
                        <label for="cvv" class="block text-sm font-semibold text-slate-700">CVV</label>
                        <div class="relative">
                          <input 
                            id="cvv"
                            v-model="cardDetails.cvv"
                            type="text"
                            placeholder="123"
                            required
                            maxlength="4"
                            class="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 bg-white"
                          />
                          <HelpCircle class="w-5 h-5 text-slate-400 absolute right-4 top-1/2 transform -translate-y-1/2 cursor-help" title="3-digit security code on the back of your card" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
              
              <div class="flex gap-4">
                <button 
                  @click="handlePrevStep"
                  class="flex-1 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 font-medium flex items-center justify-center"
                >
                  <ArrowLeft class="w-4 h-4 mr-2" />
                  Back
                </button>
                <button 
                  @click="processPayment"
                  :disabled="isProcessing"
                  class="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Loader v-if="isProcessing" class="w-5 h-5 mr-2 animate-spin" />
                  {{ isProcessing ? 'Processing...' : `Complete Order - $${formatPrice(calculateTotal())}` }}
                </button>
              </div>
            </div>
          </Transition>
        </div>
        
        <!-- Order Summary (Right Side) -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-6">
            <div class="flex items-center mb-6">
              <div class="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mr-4">
                <ShoppingCart class="w-5 h-5 text-slate-600" />
              </div>
              <h2 class="text-xl font-bold text-slate-800">Order Summary</h2>
            </div>
            
            <!-- Cart Items -->
            <div v-if="cartItems && cartItems.length > 0" class="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              <div 
                v-for="item in cartItems" 
                :key="item.id" 
                class="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all duration-200 group"
              >
                <div class="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    :src="item.image || '/placeholder.svg?height=64&width=64'" 
                    :alt="item.title" 
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                    @error="handleImageError"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-slate-800 text-sm truncate">{{ item.title }}</h4>
                  <p class="text-sm text-slate-600">${{ formatPrice(item.price) }}</p>
                  <p v-if="item.size" class="text-xs text-slate-500">Size: {{ item.size }}</p>
                  
                  <div class="flex items-center mt-2">
                    <button 
                      @click="updateItemQuantity(item.id, Math.max(1, item.quantity - 1))"
                      class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                      :disabled="item.quantity <= 1"
                    >
                      <Minus class="w-3 h-3" />
                    </button>
                    <span class="mx-3 text-sm font-semibold min-w-[2rem] text-center">{{ item.quantity }}</span>
                    <button 
                      @click="updateItemQuantity(item.id, item.quantity + 1)"
                      class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                    >
                      <Plus class="w-3 h-3" />
                    </button>
                    
                    <button 
                      @click="removeItem(item.id)"
                      class="ml-auto w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                    >
                      <Trash2 class="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-semibold text-slate-800">${{ formatPrice(item.price * item.quantity) }}</span>
                </div>
              </div>
            </div>
            
            <!-- Order Totals -->
            <div class="border-t border-slate-200 pt-4 space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-slate-600">Subtotal</span>
                <span class="font-semibold text-slate-800">${{ formatPrice(subtotalAmount) }}</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-slate-600">Shipping</span>
                <span class="font-semibold text-slate-800">{{ getShippingCost() === 0 ? 'Free' : `$${formatPrice(getShippingCost())}` }}</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-slate-600">Tax ({{ currentTaxRate }}%)</span>
                <span class="font-semibold text-slate-800">${{ formatPrice(getTaxAmount()) }}</span>
              </div>
              
              <div v-if="selectedCountryInfo" class="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
                <p>Shipping to: {{ selectedCountryInfo.countryName }}</p>
                <p>Tax Rate: {{ currentTaxRate }}%</p>
              </div>
              
              <div class="flex justify-between font-bold text-lg pt-3 border-t border-slate-200">
                <span class="text-slate-800">Total</span>
                <span class="text-slate-800">${{ formatPrice(calculateTotal()) }}</span>
              </div>
            </div>
            
            <!-- Security Badge -->
            <div class="mt-6 pt-4 border-t border-slate-200">
              <div class="flex items-center text-sm text-slate-600 mb-3">
                <LockIcon class="w-4 h-4 mr-2" />
                <span>Secure 256-bit SSL encryption</span>
              </div>
              <div class="flex gap-2">
                <div class="w-10 h-6 bg-slate-100 rounded flex items-center justify-center">
                  <span class="text-xs font-bold text-slate-600">VISA</span>
                </div>
                <div class="w-10 h-6 bg-slate-100 rounded flex items-center justify-center">
                  <span class="text-xs font-bold text-slate-600">MC</span>
                </div>
                <div class="w-10 h-6 bg-slate-100 rounded flex items-center justify-center">
                  <span class="text-xs font-bold text-slate-600">AMEX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Authentication Modal - FIXED -->
    <Transition name="modal">
      <div v-if="showAuthModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
          <button 
            @click="closeAuthModal"
            class="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <X class="w-4 h-4" />
          </button>
          
          <div v-if="authModalMode === 'check'">
            <h2 class="text-2xl font-bold text-center text-slate-800 mb-4">Welcome!</h2>
            <p class="text-slate-600 text-center mb-6">Sign in to track your orders and save your preferences, or continue as a guest.</p>
            <div class="space-y-3">
              <button 
                @click="authModalMode = 'signin'"
                class="w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl hover:from-slate-900 hover:to-black transition-all duration-300 font-medium"
              >
                Sign In
              </button>
              <button 
                @click="authModalMode = 'signup'"
                class="w-full py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 font-medium"
              >
                Create Account
              </button>
              <button 
                @click="proceedAsGuest"
                class="w-full py-3 text-slate-600 hover:text-slate-800 transition-colors font-medium"
              >
                Continue as Guest
              </button>
            </div>
          </div>
          
          <div v-else-if="authModalMode === 'signin'">
            <h2 class="text-2xl font-bold text-center text-slate-800 mb-6">Sign In</h2>

            <div class="mb-4">
              <SocialLoginButtons @callback="handleCallback" authType="login" />
            </div>

            <form @submit.prevent="handleSignin" class="space-y-4">
              <div class="space-y-2">
                <label for="signinEmail" class="block text-sm font-semibold text-slate-700">Email</label>
                <input 
                  id="signinEmail"
                  v-model="signinData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              
              <div class="space-y-2">
                <label for="signinPassword" class="block text-sm font-semibold text-slate-700">Password</label>
                <input 
                  id="signinPassword"
                  v-model="signinData.password"
                  type="password"
                  required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
              
              <button 
                type="submit"
                :disabled="isSigningIn"
                class="w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl hover:from-slate-900 hover:to-black transition-all duration-300 font-medium flex items-center justify-center disabled:opacity-50"
              >
                <Loader v-if="isSigningIn" class="w-5 h-5 mr-2 animate-spin" />
                {{ isSigningIn ? 'Signing In...' : 'Sign In' }}
              </button>
              
              <div class="text-center">
                <button 
                  type="button"
                  @click="authModalMode = 'signup'" 
                  class="text-slate-600 hover:text-slate-800 font-medium"
                >
                  Don't have an account? Sign up
                </button>
              </div>
            </form>
          </div>
          
          <div v-else-if="authModalMode === 'signup'">
            <h2 class="text-2xl text-center font-bold text-slate-800 mb-6">Create Account</h2>
            <div class="mb-4">
              <SocialLoginButtons @callback="handleCallback" authType="signup" />
            </div>
            <form @submit.prevent="handleSignup" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="firstName" class="block text-sm font-semibold text-slate-700">First Name</label>
                  <input 
                    id="firstName"
                    v-model="signupData.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                    placeholder="First name"
                  />
                </div>
                
                <div class="space-y-2">
                  <label for="lastName" class="block text-sm font-semibold text-slate-700">Last Name</label>
                  <input 
                    id="lastName"
                    v-model="signupData.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                    placeholder="Last name"
                  />
                </div>
              </div>
              
              <div class="space-y-2">
                <label for="signupEmail" class="block text-sm font-semibold text-slate-700">Email</label>
                <input 
                  id="signupEmail"
                  v-model="signupData.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
              
              <div class="space-y-2">
                <label for="signupPassword" class="block text-sm font-semibold text-slate-700">Password</label>
                <input 
                  id="signupPassword"
                  v-model="signupData.password"
                  type="password"
                  required
                  minlength="6"
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  placeholder="Create a password"
                />
                <p class="text-xs text-slate-500">Password must be at least 6 characters</p>
              </div>
              
              <div class="space-y-2">
                <label for="phone" class="block text-sm font-semibold text-slate-700">Phone (Optional)</label>
                <input 
                  id="phone"
                  v-model="signupData.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <button 
                type="submit"
                :disabled="isSigningUp"
                class="w-full py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl hover:from-slate-900 hover:to-black transition-all duration-300 font-medium flex items-center justify-center disabled:opacity-50"
              >
                <Loader v-if="isSigningUp" class="w-5 h-5 mr-2 animate-spin" />
                {{ isSigningUp ? 'Creating Account...' : 'Create Account' }}
              </button>
              
              <div class="text-center">
                <button 
                  type="button"
                  @click="authModalMode = 'signin'" 
                  class="text-slate-600 hover:text-slate-800 font-medium"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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
  HelpCircle
} from 'lucide-vue-next'

// Import composables
import { useCartStore } from '@/composables/useCartStore'
import { use_auth_signup } from '@/composables/auth/register'
import { use_auth_login } from '@/composables/auth/login'
import { useCheckoutStore } from '@/composables/useCheckoutStore'
import { useUser } from '@/composables/auth/user'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { useTaxConfig } from '@/composables/modules/shipping-tax/useTaxConfig'
import { useShippingConfig } from '@/composables/modules/shipping-tax/useShippingConfig'
import { useCustomToast } from '@/composables/core/useCustomToast'

// Router
const router = useRouter()
const route = useRoute()

// FIXED: Use reactive ref for modal visibility instead of localStorage check
const showAuthModal = ref(false)

// Toast notifications
const { showToast } = useCustomToast()

const handleCallback = (data: any) => {
  if(data.success){
    showAuthModal.value = false
  }
}

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
  checkoutStep: storeCheckoutStep,
  checkoutSummary,
  deliveryDetails,
  deliveryMethod,
  paymentMethod,
  cardDetails,
  isProcessing,
  orderComplete,
  orderId,
  nextStep: storeNextStep,
  prevStep: storePrevStep,
  setDeliveryMethod,
  setPaymentMethod,
  processPayment: storeProcessPayment,
  persistDeliveryDetails,
  resetCheckout,
  initializeCheckout
} = useCheckoutStore()

// Shipping and Tax data
const { fetchShippingConfigs } = useShippingConfig()
const { fetchTaxConfigs } = useTaxConfig()

const shippingConfigs = ref([])
const taxConfigs = ref([])
const selectedCountryInfo = ref(null)
const currentShippingFee = ref(0)
const currentTaxRate = ref(0)
const isLoadingConfigs = ref(false)

// Current step with query parameter sync
const currentStep = ref(1)

// Authentication state
const authModalMode = ref('check') // 'check', 'signin', 'signup'
const isSigningUp = ref(false)
const isSigningIn = ref(false)

// Express delivery multiplier
const EXPRESS_DELIVERY_MULTIPLIER = 2.5

// Minimum step and maximum step
const MIN_STEP = 1
const MAX_STEP = 3

// Cart items - reactive reference that loads from localStorage
const cartItems = ref([])

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

// Enhanced persistence keys
const PERSISTENCE_KEYS = {
  CART: 'art-gallery-cart',
  CHECKOUT_STEP: 'checkout-step',
  DELIVERY_DETAILS: 'checkout-delivery-details',
  DELIVERY_METHOD: 'checkout-delivery-method',
  PAYMENT_METHOD: 'checkout-payment-method',
  SELECTED_COUNTRY: 'checkout-selected-country',
  SHIPPING_CONFIG: 'checkout-shipping-config',
  TAX_CONFIG: 'checkout-tax-config',
  GUEST_MODE: 'checkout-guest-mode'
}

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    if (process.client && localStorage) {
      const savedCart = localStorage.getItem(PERSISTENCE_KEYS.CART)
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          cartItems.value = parsedCart
          return parsedCart
        }
      }
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error)
  }
  return []
}

// Save cart to localStorage
const saveCartToStorage = () => {
  try {
    if (process.client && localStorage) {
      localStorage.setItem(PERSISTENCE_KEYS.CART, JSON.stringify(cartItems.value))
    }
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error)
  }
}

// Enhanced persistence functions
const persistCheckoutData = () => {
  try {
    if (process.client && localStorage) {
      // Persist all checkout-related data
      setItem(PERSISTENCE_KEYS.CHECKOUT_STEP, currentStep.value.toString())
      setItem(PERSISTENCE_KEYS.DELIVERY_METHOD, deliveryMethod.value)
      setItem(PERSISTENCE_KEYS.PAYMENT_METHOD, paymentMethod.value)
      
      if (selectedCountryInfo.value) {
        setItem(PERSISTENCE_KEYS.SELECTED_COUNTRY, JSON.stringify({
          countryInfo: selectedCountryInfo.value,
          shippingFee: currentShippingFee.value,
          taxRate: currentTaxRate.value
        }))
      }
      
      // Persist delivery details
      persistDeliveryDetails()
    }
  } catch (error) {
    console.error('Failed to persist checkout data:', error)
  }
}

// Load persisted checkout data
const loadPersistedCheckoutData = () => {
  try {
    if (process.client && localStorage) {
      // Load checkout step
      const savedStep = getItem(PERSISTENCE_KEYS.CHECKOUT_STEP)
      if (savedStep && !isNaN(Number(savedStep))) {
        const step = Number(savedStep)
        if (step >= MIN_STEP && step <= MAX_STEP) {
          currentStep.value = step
        }
      }
      
      // Load delivery method
      const savedDeliveryMethod = getItem(PERSISTENCE_KEYS.DELIVERY_METHOD)
      if (savedDeliveryMethod && ['standard', 'express', 'pickup'].includes(savedDeliveryMethod)) {
        setDeliveryMethod(savedDeliveryMethod)
      }
      
      // Load payment method
      const savedPaymentMethod = getItem(PERSISTENCE_KEYS.PAYMENT_METHOD)
      if (savedPaymentMethod && ['flutterwave', 'interswitch', 'manual'].includes(savedPaymentMethod)) {
        setPaymentMethod(savedPaymentMethod)
      }
      
      // Load delivery details
      const savedDeliveryDetails = getItem(PERSISTENCE_KEYS.DELIVERY_DETAILS)
      if (savedDeliveryDetails) {
        try {
          const parsedDetails = JSON.parse(savedDeliveryDetails)
          Object.assign(deliveryDetails, parsedDetails)
        } catch (e) {
          console.error('Failed to parse saved delivery details', e)
        }
      }
      
      // Load country and shipping/tax info
      const savedCountryData = getItem(PERSISTENCE_KEYS.SELECTED_COUNTRY)
      if (savedCountryData) {
        try {
          const parsedCountryData = JSON.parse(savedCountryData)
          selectedCountryInfo.value = parsedCountryData.countryInfo
          currentShippingFee.value = parsedCountryData.shippingFee || 0
          currentTaxRate.value = parsedCountryData.taxRate || 0
        } catch (e) {
          console.error('Failed to parse saved country data', e)
        }
      }
    }
  } catch (error) {
    console.error('Failed to load persisted checkout data:', error)
  }
}

// Clear all persisted checkout data
const clearPersistedCheckoutData = () => {
  try {
    if (process.client && localStorage) {
      Object.values(PERSISTENCE_KEYS).forEach(key => {
        if (key !== PERSISTENCE_KEYS.CART) { // Don't clear cart unless explicitly requested
          removeStorageItem(key)
        }
      })
    }
  } catch (error) {
    console.error('Failed to clear persisted checkout data:', error)
  }
}

// Computed properties for reactive totals
const subtotalAmount = computed(() => {
  if (!cartItems.value || cartItems.value.length === 0) return 0
  return cartItems.value.reduce((total, item) => {
    const itemPrice = item.price || 0
    const itemQuantity = item.quantity || 0
    return total + (itemPrice * itemQuantity)
  }, 0)
})

// Available countries from shipping configs
const availableCountries = computed(() => {
  return Array.isArray(shippingConfigs.value) && shippingConfigs?.value?.filter(config => config.isActive)
})

// Load shipping and tax configurations
const loadConfigurations = async () => {
  try {
    isLoadingConfigs.value = true
    
    // Fetch shipping and tax configurations
    const [shippingData, taxData] = await Promise.all([
      fetchShippingConfigs(),
      fetchTaxConfigs()
    ])
    
    // Set the configurations
    shippingConfigs.value = shippingData || []
    taxConfigs.value = taxData || []
    
    // After loading configs, restore country selection if it exists
    await nextTick()
    
    // If we have persisted country data, restore it
    if (deliveryDetails.country && shippingConfigs.value.length > 0) {
      handleCountryChange()
    }
    
  } catch (error) {
    console.error('Failed to load configurations:', error)
    
    // Extract error message from the error object
    const errorMessage = extractErrorMessage(error)
    
    if (showToast) {
      showToast({
        title: "Configuration Error",
        message: errorMessage || "Failed to load shipping and tax configurations. Please refresh the page or contact support.",
        toastType: "error",
        duration: 5000
      })
    }
  } finally {
    isLoadingConfigs.value = false
  }
}

// Enhanced country change handler
const handleCountryChange = () => {
  const countryCode = deliveryDetails.country
  
  if (!countryCode) {
    selectedCountryInfo.value = null
    currentShippingFee.value = 0
    currentTaxRate.value = 0
    return
  }
  
  // Find shipping config for selected country
  const shippingConfig = shippingConfigs.value.find(
    config => config.countryCode === countryCode && config.isActive
  )
  
  // Find tax config for selected country
  const taxConfig = taxConfigs.value.find(
    config => config.countryCode === countryCode && config.isActive
  )
  
  if (shippingConfig) {
    selectedCountryInfo.value = shippingConfig
    currentShippingFee.value = shippingConfig.shippingRate || 0
  } else {
    selectedCountryInfo.value = null
    currentShippingFee.value = 0
  }
  
  if (taxConfig) {
    currentTaxRate.value = taxConfig.vatRate || 0
  } else {
    currentTaxRate.value = 0
  }
  
  // Persist the updated data
  persistCheckoutData()
}

// Enhanced delivery method change handler
const handleDeliveryMethodChange = (method) => {
  setDeliveryMethod(method)
  persistCheckoutData()
}

// Enhanced payment method change handler
const handlePaymentMethodChange = (method) => {
  setPaymentMethod(method)
  persistCheckoutData()
}

// Get shipping cost based on delivery method
const getShippingCost = () => {
  if (deliveryMethod.value === 'pickup') {
    return 0
  } else if (deliveryMethod.value === 'express') {
    return currentShippingFee.value * EXPRESS_DELIVERY_MULTIPLIER
  } else {
    return currentShippingFee.value
  }
}

// Get tax amount
const getTaxAmount = () => {
  const subtotal = subtotalAmount.value
  return (subtotal * currentTaxRate.value) / 100
}

// Calculate total with shipping and tax
const calculateTotal = () => {
  const subtotal = subtotalAmount.value
  const shipping = getShippingCost()
  const tax = getTaxAmount()
  
  return subtotal + shipping + tax
}

// Update query parameters
const updateQueryParams = () => {
  const query = { ...route.query }
  if (currentStep.value > MIN_STEP) {
    query.step = currentStep.value.toString()
  } else {
    delete query.step
  }
  
  router.replace({ query })
}

// Handle next step with enhanced persistence
const handleNextStep = () => {
  if (currentStep.value < MAX_STEP) {
    currentStep.value++
    persistCheckoutData()
    updateQueryParams()
  }
}

// Handle previous step with enhanced persistence
const handlePrevStep = () => {
  if (currentStep.value > MIN_STEP) {
    currentStep.value--
    persistCheckoutData()
    updateQueryParams()
  }
}

// Initialize step from query parameter
const initializeStepFromQuery = () => {
  const stepParam = route.query.step
  if (stepParam && !isNaN(Number(stepParam))) {
    const step = Number(stepParam)
    if (step >= MIN_STEP && step <= MAX_STEP) {
      currentStep.value = step
    }
  }
}

// Clear query parameters on order completion
const clearQueryParams = () => {
  const query = { ...route.query }
  delete query.step
  router.replace({ query })
}

// Helper function to extract error message from various error formats
const extractErrorMessage = (error: any): string => {
  if (!error) return "An unknown error occurred";
  
  // Check for common error object structures
  if (typeof error === 'string') return error;
  
  if (error.response) {
    // Axios or similar HTTP client error
    const { data, statusText } = error.response;
    
    // Check for structured error response
    if (data) {
      if (typeof data === 'string') return data;
      if (data.message) return data.message;
      if (data.error) return typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
      if (data.errors && Array.isArray(data.errors)) return data.errors.join(', ');
    }
    
    return statusText || `Error ${error.response.status}`;
  }
  
  // Check for error message property
  if (error.message) return error.message;
  
  // Check for error details in nested error object
  if (error.error) {
    if (typeof error.error === 'string') return error.error;
    if (error.error.message) return error.error.message;
  }
  
  // Last resort: stringify the error
  try {
    return JSON.stringify(error);
  } catch (e) {
    return "An unexpected error occurred";
  }
}

// Process payment with updated total
const processPayment = async () => {
  try {
    // First, ensure we have cart items
    if (!cartItems.value || cartItems.value.length === 0) {
      showToast({
        title: "Error",
        message: "Your cart is empty. Please add items before proceeding.",
        toastType: "error",
        duration: 3000
      });
      return;
    }
    
    // Initialize checkout summary if it doesn't exist
    if (!checkoutSummary || !checkoutSummary.items) {
      // Create a new checkout summary with the current cart data
      const summary = {
        items: cartItems.value,
        subtotal: subtotalAmount.value,
        shipping: getShippingCost(),
        tax: getTaxAmount(),
        total: calculateTotal()
      };
      
      // Initialize the checkout store with this data
      initializeCheckout(summary);
    } else {
      // Update the checkout summary with current cart data
      checkoutSummary.items = cartItems.value;
      checkoutSummary.subtotal = subtotalAmount.value;
      checkoutSummary.total = calculateTotal();
      checkoutSummary.shipping = getShippingCost();
      checkoutSummary.tax = getTaxAmount();
      
      // Add country info to checkout summary
      if (selectedCountryInfo.value) {
        checkoutSummary.country = {
          code: selectedCountryInfo.value.countryCode,
          name: selectedCountryInfo.value.countryName
        };
      }
    }
    
    // Process the payment using the store method
    if (storeProcessPayment) {
      const response = await storeProcessPayment();
      console.log(response, 'store process payment');
      
      // Check if the response indicates success
      if (response && response.success) {
        // Only clear cart from localStorage on successful order
        if (process.client && localStorage) {
          localStorage.removeItem(PERSISTENCE_KEYS.CART);
          cartItems.value = [];
        }
        
        // Clear all persisted checkout data on successful order
        clearPersistedCheckoutData();
        
        // Clear query parameters on successful order
        clearQueryParams();
        
        return response;
      } else {
        // Payment failed - do NOT clear the cart or checkout data
        console.error('Payment failed:', response);
        
        throw new Error(response?.message || "Payment processing failed");
      }
    } else {
      showToast({
        title: "Error",
        message: "Payment system is not available. Please refresh the page and try again.",
        toastType: "error",
        duration: 3000
      });
      throw new Error("Payment system not available");
    }
  } catch (error) {
    console.error('Payment processing failed:', error);
    
    // Extract error message
    const errorMessage = extractErrorMessage(error);
    
    // Show error toast
    showToast({
      title: "Payment Failed",
      message: errorMessage || "There was an error processing your payment. Please try again.",
      toastType: "error",
      duration: 5000
    });
    
    throw error;
  }
};

// Proceed as guest
const proceedAsGuest = () => {
  showAuthModal.value = false
  if (setItem) {
    setItem(PERSISTENCE_KEYS.GUEST_MODE, 'true')
  }
}

// FIXED: Close auth modal function
const closeAuthModal = () => {
  showAuthModal.value = false
  authModalMode.value = 'check'
}

// Handle signup
const handleSignup = async () => {
  try {
    isSigningUp.value = true
    
    const payloadObj = {
      firstName: signupData.value.firstName,
      lastName: signupData.value.lastName,
      email: signupData.value.email,
      password: signupData.value.password,
      phone: signupData.value.phone,
      role: signupData.value.role
    }
    
    if (signup) {
      const response = await signup(payloadObj)
      
      if (response && response.success) {
        // Pre-fill delivery details with user info
        if (deliveryDetails) {
          deliveryDetails.firstName = signupData.value.firstName
          deliveryDetails.lastName = signupData.value.lastName
          deliveryDetails.email = signupData.value.email
          deliveryDetails.phone = signupData.value.phone || ''
        }
        
        // Persist delivery details
        persistCheckoutData()
        
        // Show success toast with message from the response if available
        if (showToast) {
          showToast({
            title: response.title || "Account Created",
            message: response.message || "Your account has been created successfully!",
            toastType: "success",
            duration: 3000
          })
        }
        
        // Close modal on successful signup
        showAuthModal.value = false
      } else {
        // Handle explicit failure response
        if (response && !response.success) {
          if (showToast) {
            showToast({
              title: response.title || "Signup Failed",
              message: response.message || "There was an error creating your account. Please try again.",
              toastType: "error",
              duration: 5000
            })
          }
        }
        // Don't close modal if signup failed
        return
      }
    }
  } catch (error) {
    console.error('Signup failed:', error)
    
    // Extract error message from the error object
    const errorMessage = extractErrorMessage(error)
    
    // Show error toast with the extracted message
    if (showToast) {
      showToast({
        title: "Signup Failed",
        message: errorMessage || "There was an error creating your account. Please try again.",
        toastType: "error",
        duration: 5000
      })
    }
  } finally {
    isSigningUp.value = false
  }
}

// Handle signin
const handleSignin = async () => {
  try {
    isSigningIn.value = true
    
    const payloadObj = {
      email: signinData.value.email,
      password: signinData.value.password
    }
    
    if (login) {
      const response = await login(payloadObj)
      
      if (response && response.success) {
        // Pre-fill delivery details if available from user data
        try {
          const userData = JSON.parse(localStorage.getItem('user-data') || '{}')
          if (userData && deliveryDetails) {
            deliveryDetails.firstName = userData.firstName || ''
            deliveryDetails.lastName = userData.lastName || ''
            deliveryDetails.email = userData.email || ''
            deliveryDetails.phone = userData.phone || ''
            
            // Persist delivery details
            persistCheckoutData()
          }
        } catch (parseError) {
          console.warn('Failed to parse user data from localStorage:', parseError)
        }
        
        // Show success toast with message from the response if available
        if (showToast) {
          showToast({
            title: response.title || "Signed In",
            message: response.message || "You have been signed in successfully!",
            toastType: "success",
            duration: 3000
          })
        }
        
        // Close modal on successful login
        showAuthModal.value = false
      } else {
        // Handle explicit failure response
        if (response && !response.success) {
          if (showToast) {
            showToast({
              title: response.title || "Sign In Failed",
              message: response.message || "There was an error signing in. Please check your credentials and try again.",
              toastType: "error",
              duration: 5000
            })
          }
        }
        // Don't close modal if login failed
        return
      }
    }
  } catch (error) {
    console.error('Signin failed:', error)
    
    // Extract error message from the error object
    const errorMessage = extractErrorMessage(error)
    
    // Show error toast with the extracted message
    if (showToast) {
      showToast({
        title: "Sign In Failed",
        message: errorMessage || "There was an error signing in. Please check your credentials and try again.",
        toastType: "error",
        duration: 5000
      })
    }
  } finally {
    isSigningIn.value = false
  }
}

// Format price
const formatPrice = (price: number) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0.00'
  }
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// Generate random order number
const generateOrderNumber = () => {
  const min = 100000
  const max = 999999
  return Math.floor(Math.random() * (max - min + 1) + min).toString()
}

// Format card number with spaces
const formatCardNumber = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '')
  const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value
  cardDetails.cardNumber = formattedValue
}

// Format expiry date with slash
const formatExpiryDate = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  cardDetails.expiryDate = value
}

// Update item quantity in cart
const updateItemQuantity = async (id: string, quantity: number) => {
  if (typeof id === 'string' && typeof quantity === 'number' && quantity > 0) {
    try {
      // Update cart store if available
      if (updateCartItemQuantity) {
        const response = await updateCartItemQuantity(id, quantity)
        
        // Check if the response contains success information
        if (response && response.success) {
          // Update local cart state
          const itemIndex = cartItems.value.findIndex(item => item.id === id)
          if (itemIndex !== -1) {
            cartItems.value[itemIndex].quantity = quantity
            saveCartToStorage()
          }
          
          // Show success toast with message from the response if available
          if (showToast) {
            showToast({
              title: response.title || "Cart Updated",
              message: response.message || "Item quantity has been updated",
              toastType: "info",
              duration: 2000
            })
          }
        } else if (response && !response.success) {
          // Handle explicit failure response
          if (showToast) {
            showToast({
              title: response.title || "Update Failed",
              message: response.message || "Failed to update item quantity. Please try again.",
              toastType: "error",
              duration: 3000
            })
          }
        }
      } else {
        // Fallback to local update if store method is not available
        const itemIndex = cartItems.value.findIndex(item => item.id === id)
        if (itemIndex !== -1) {
          cartItems.value[itemIndex].quantity = quantity
          saveCartToStorage()
        }
      }
    } catch (error) {
      console.error('Failed to update item quantity:', error)
      
      // Extract error message from the error object
      const errorMessage = extractErrorMessage(error)
      
      // Show error toast with the extracted message
      if (showToast) {
        showToast({
          title: "Update Failed",
          message: errorMessage || "Failed to update item quantity. Please try again.",
          toastType: "error",
          duration: 3000
        })
      }
    }
  }
}

// Remove item from cart
const removeItem = async (id: string) => {
  if (typeof id === 'string') {
    try {
      // Update cart store if available
      if (removeFromCart) {
        const response = await removeFromCart(id)
        
        // Check if the response contains success information
        if (response && response.success) {
          // Update local cart state
          cartItems.value = cartItems.value.filter(item => item.id !== id)
          saveCartToStorage()
          
          // Show success toast with message from the response if available
          if (showToast) {
            showToast({
              title: response.title || "Item Removed",
              message: response.message || "Item has been removed from your cart",
              toastType: "info",
              duration: 3000
            })
          }
        } else if (response && !response.success) {
          // Handle explicit failure response
          if (showToast) {
            showToast({
              title: response.title || "Removal Failed",
              message: response.message || "Failed to remove item from cart. Please try again.",
              toastType: "error",
              duration: 3000
            })
          }
        }
      } else {
        // Fallback to local removal if store method is not available
        cartItems.value = cartItems.value.filter(item => item.id !== id)
        saveCartToStorage()
      }
    } catch (error) {
      console.error('Failed to remove item from cart:', error)
      
      // Extract error message from the error object
      const errorMessage = extractErrorMessage(error)
      
      // Show error toast with the extracted message
      if (showToast) {
        showToast({
          title: "Removal Failed",
          message: errorMessage || "Failed to remove item from cart. Please try again.",
          toastType: "error",
          duration: 3000
        })
      }
    }
  }
}

// Handle image error
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (target) {
    target.src = '/placeholder.svg?height=100&width=100'
  }
}

// FIXED: Check if user is logged in on page load
const checkUserAuth = () => {
  // Only show auth modal if user is not logged in and not in guest mode
  const isGuestMode = getItem ? getItem(PERSISTENCE_KEYS.GUEST_MODE) === 'true' : false
  const hasToken = process.client && localStorage ? localStorage.getItem('token') : null
  
  if (!isLoggedIn.value && !isGuestMode && !hasToken) {
    showAuthModal.value = true
  }
}

// Watch for cart changes to update checkout summary
watch(cartItems, () => {
  if (checkoutSummary) {
    checkoutSummary.items = cartItems.value
    checkoutSummary.subtotal = subtotalAmount.value
  }
  saveCartToStorage()
}, { deep: true })

// Watch for login status changes
watch(isLoggedIn, (newValue) => {
  if (newValue) {
    // User is now logged in, close auth modal if open
    showAuthModal.value = false
    
    // Pre-fill delivery details with user info if available
    if (user.value && deliveryDetails) {
      deliveryDetails.firstName = user.value.firstName || ''
      deliveryDetails.lastName = user.value.lastName || ''
      deliveryDetails.email = user.value.email || ''
      deliveryDetails.phone = user.value.phone || ''
      
      // Persist updated delivery details
      persistCheckoutData()
    }
  } else {
    // User is logged out, check if we should show auth modal
    checkUserAuth()
  }
})

// Watch for order completion
watch(orderComplete, (newValue) => {
  if (newValue) {
    // Clear query parameters and all persisted data
    clearQueryParams()
    clearPersistedCheckoutData()
  }
})

// Watch for changes in the current step
watch(currentStep, (newValue) => {
  // Update the store's checkout step to keep them in sync
  if (storeCheckoutStep) {
    storeCheckoutStep.value = newValue
  }
  // Persist the step change
  persistCheckoutData()
})

// Watch for changes in the store's checkout step
watch(storeCheckoutStep, (newValue) => {
  // Update the local current step to keep them in sync
  if (typeof newValue === 'number' && newValue >= MIN_STEP && newValue <= MAX_STEP) {
    currentStep.value = newValue
    // Update query parameters
    updateQueryParams()
  }
})

// Watch for delivery details changes
watch(deliveryDetails, () => {
  persistCheckoutData()
}, { deep: true })

// Watch for delivery method changes
watch(deliveryMethod, () => {
  persistCheckoutData()
})

// Watch for payment method changes
watch(paymentMethod, () => {
  persistCheckoutData()
})

// Lifecycle hooks
onMounted(async () => {
  // Load cart from localStorage first
  loadCartFromStorage()
  
  // Load persisted checkout data
  loadPersistedCheckoutData()
  
  // Load shipping and tax configurations
  await loadConfigurations()
  
  // Initialize step from query parameter (this might override persisted step)
  initializeStepFromQuery()
  
  // Check if user is logged in immediately on mount
  nextTick(() => {
    checkUserAuth()
  })
  
  // Check if cart is empty and redirect if necessary
  if (!cartItems.value || cartItems.value.length === 0) {
    // Try to load from cart store as fallback
    if (cart.value && cart.value.length > 0) {
      cartItems.value = cart.value
      saveCartToStorage()
    } else {
      // Redirect to artworks page if cart is truly empty
      router.push('/artworks')
    }
  }
  
  // Initialize checkout summary with current cart data
  if (cartItems.value && cartItems.value.length > 0) {
    const summary = {
      items: cartItems.value,
      subtotal: subtotalAmount.value,
      shipping: getShippingCost(),
      tax: getTaxAmount(),
      total: calculateTotal()
    };
    initializeCheckout(summary);
  }
})

// Provide a method to cancel checkout (clear all data)
const cancelCheckout = () => {
  clearPersistedCheckoutData()
  clearQueryParams()
  router.push('/artworks')
}

// Expose cancel method for potential use
defineExpose({
  cancelCheckout
})
</script>

<style scoped>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
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
