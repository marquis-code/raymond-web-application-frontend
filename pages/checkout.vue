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
        <p class="text-slate-600 mb-8">Add some amazing products to your cart to continue with checkout.</p>
        <NuxtLink 
          to="/artworks" 
          class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl hover:from-slate-900 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft class="w-4 h-4 mr-2" />
          Browse Products
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
          <div class="flex justify-between items-center mb-3">
            <span class="text-slate-600 font-medium">Payment Type</span>
            <span class="font-bold text-slate-800">{{ selectedPaymentType === 'installment' ? 'Installment Plan' : 'Full Payment' }}</span>
          </div>
          <div v-if="selectedPaymentType === 'installment'" class="flex justify-between items-center mb-3">
            <span class="text-slate-600 font-medium">Down Payment</span>
            <span class="font-bold text-emerald-600">${{ formatPrice(installmentSummary.downPayment) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-600 font-medium">{{ selectedPaymentType === 'installment' ? 'Total Order Value' : 'Total Amount' }}</span>
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
                <h2 class="text-xl lg:text-2xl font-bold text-slate-800">Payment Options</h2>
              </div>

              <!-- Payment Type Selection -->
              <div class="mb-8">
                <h3 class="text-lg font-semibold text-slate-800 mb-4">Choose Payment Type</h3>
                <div class="space-y-4">
                  <!-- Full Payment Option -->
                  <div 
                    class="border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                    :class="selectedPaymentType === 'full' ? 'border-slate-800 bg-slate-50 shadow-md' : 'border-slate-200 hover:border-slate-300'"
                    @click="handlePaymentTypeChange('full')"
                  >
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200"
                           :class="selectedPaymentType === 'full' ? 'border-slate-800 bg-slate-800' : 'border-slate-300'">
                        <div v-if="selectedPaymentType === 'full'" class="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                      <div class="flex-1">
                        <div class="flex justify-between items-center mb-1">
                          <span class="font-semibold text-slate-800">Pay Full Amount</span>
                          <span class="font-bold text-emerald-600">${{ formatPrice(calculateTotal()) }}</span>
                        </div>
                        <p class="text-sm text-slate-600">Complete payment now with no additional fees</p>
                      </div>
                      <div class="w-10 h-10 bg-emerald-100 rounded-md flex items-center justify-center ml-4">
                        <CreditCard class="w-6 h-6 text-emerald-600" />
                      </div>
                    </div>
                  </div>

                  <!-- Installment Payment Option -->
                  <div 
                    v-if="hasInstallmentOptions"
                    class="border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
                    :class="selectedPaymentType === 'installment' ? 'border-slate-800 bg-slate-50 shadow-md' : 'border-slate-200 hover:border-slate-300'"
                    @click="handlePaymentTypeChange('installment')"
                  >
                    <div class="flex items-center">
                      <div class="w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200"
                           :class="selectedPaymentType === 'installment' ? 'border-slate-800 bg-slate-800' : 'border-slate-300'">
                        <div v-if="selectedPaymentType === 'installment'" class="w-3 h-3 rounded-full bg-white"></div>
                      </div>
                      <div class="flex-1">
                        <div class="flex justify-between items-center mb-1">
                          <span class="font-semibold text-slate-800">Installment Plan</span>
                          <span class="font-bold text-blue-600">From ${{ formatPrice(getMinimumInstallmentAmount()) }}/month</span>
                        </div>
                        <p class="text-sm text-slate-600">Split your payment into manageable installments</p>
                      </div>
                      <div class="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center ml-4">
                        <Calendar class="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <!-- Debug Info for Installment Options -->
                  <div v-if="!hasInstallmentOptions" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div class="flex items-center">
                      <HelpCircle class="w-5 h-5 text-yellow-600 mr-2" />
                      <span class="text-sm text-yellow-800">No installment options available for current cart items</span>
                    </div>
                    <div class="mt-2 text-xs text-yellow-700">
                      <p>Cart items with installment options: {{ cartItemsWithInstallments.length }}</p>
                      <p>Total cart items: {{ cartItems.length }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Installment Configuration -->
              <Transition name="fade">
                <div v-if="selectedPaymentType === 'installment'" class="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 class="text-lg font-semibold text-slate-800 mb-6 flex items-center">
                    <Settings class="w-5 h-5 mr-2 text-blue-600" />
                    Configure Your Installment Plan
                  </h3>
                  
                  <div class="space-y-6">
                    <!-- Total Amount Display -->
                    <div class="bg-white p-4 rounded-lg border border-blue-200">
                      <div class="flex justify-between items-center mb-2">
                        <span class="text-sm font-medium text-slate-600">Total Amount Agreed</span>
                        <span class="text-lg font-bold text-slate-800">${{ formatPrice(calculateTotal()) }}</span>
                      </div>
                      <p class="text-xs text-slate-500">This is the total amount you agree to pay including interest</p>
                    </div>

                    <!-- Number of Installments -->
                    <div class="space-y-3">
                      <label class="block text-sm font-semibold text-slate-700">
                        Preferred number of installments?
                      </label>
                      <select 
                        v-model="installmentConfig.numberOfInstallments"
                        @change="calculateInstallmentDetails"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        required
                      >
                        <option value="">Select installment terms</option>
                        <option 
                          v-for="term in availableInstallmentTerms" 
                          :key="term" 
                          :value="term"
                        >
                          {{ term }} months (Est. ${{ formatPrice(calculateEstimatedMonthlyPayment(term)) }}/month)
                          )
                        </option>
                      </select>
                    </div>

                    <!-- Payment Frequency -->
                    <div class="space-y-3">
                      <label class="block text-sm font-semibold text-slate-700">
                        How often would you like to pay?
                      </label>
                      <select 
                        v-model="installmentConfig.paymentFrequency"
                        @change="calculateInstallmentDetails"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        required
                      >
                        <option value="">Select payment frequency</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly (Every 2 weeks)</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <!-- Down Payment -->
                    <div class="space-y-3">
                      <label class="block text-sm font-semibold text-slate-700">
                        Down Payment Amount ({{ getMinimumDownPaymentPercentage() }}% - {{ getMaximumDownPaymentPercentage() }}%)
                      </label>
                      <div class="relative">
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                        <input 
                          v-model.number="installmentConfig.downPayment"
                          @input="calculateInstallmentDetails"
                          type="number"
                          :min="getMinimumDownPayment()"
                          :max="getMaximumDownPayment()"
                          step="0.01"
                          class="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                          placeholder="Enter down payment amount"
                          required
                        />
                      </div>
                      <div class="flex justify-between text-xs text-slate-500">
                        <span>Min: ${{ formatPrice(getMinimumDownPayment()) }}</span>
                        <span>Max: ${{ formatPrice(getMaximumDownPayment()) }}</span>
                      </div>
                    </div>

                    <!-- Start Date -->
                    <div class="space-y-3">
                      <label class="block text-sm font-semibold text-slate-700">
                        Start date for the first payment?
                      </label>
                      <input 
                        v-model="installmentConfig.startDate"
                        type="date"
                        :min="getMinimumStartDate()"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        required
                      />
                    </div>

                    <!-- Payment Method -->
                    <div class="space-y-3">
                      <label class="block text-sm font-semibold text-slate-700">
                        Preferred payment method?
                      </label>
                      <select 
                        v-model="installmentConfig.paymentMethod"
                        class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        required
                      >
                        <option value="">Select payment method</option>
                        <option value="auto_deduction">Auto Deduction (Recommended)</option>
                        <option value="manual">Manual Payment</option>
                      </select>
                    </div>

                    <!-- Formal Agreement -->
                    <div class="space-y-3">
                      <label class="block text-sm font-semibold text-slate-700">
                        Do you need a formal agreement for this plan?
                      </label>
                      <div class="space-y-2">
                        <label class="flex items-center">
                          <input 
                            v-model="installmentConfig.needsFormalAgreement"
                            type="radio"
                            :value="true"
                            class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span class="ml-2 text-sm text-slate-700">Yes, I need a formal agreement</span>
                        </label>
                        <label class="flex items-center">
                          <input 
                            v-model="installmentConfig.needsFormalAgreement"
                            type="radio"
                            :value="false"
                            class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span class="ml-2 text-sm text-slate-700">No, proceed without formal agreement</span>
                        </label>
                      </div>
                    </div>

                    <!-- Installment Summary -->
                    <div v-if="installmentSummary.installmentAmount > 0" class="bg-white p-6 rounded-lg border border-blue-200">
                      <h4 class="font-semibold text-slate-800 mb-4">Installment Plan Summary</h4>
                      <div class="space-y-3">
                        <div class="flex justify-between">
                          <span class="text-sm text-slate-600">Down Payment (Today)</span>
                          <span class="font-semibold">${{ formatPrice(installmentSummary.downPayment) }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-sm text-slate-600">Installment Amount</span>
                          <span class="font-semibold">${{ formatPrice(installmentSummary.installmentAmount) }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-sm text-slate-600">Number of Payments</span>
                          <span class="font-semibold">{{ installmentConfig.numberOfInstallments }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-sm text-slate-600">Interest Rate</span>
                          <span class="font-semibold">{{ getCurrentInterestRate() }}% annually</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-sm text-slate-600">Total Interest</span>
                          <span class="font-semibold">${{ formatPrice(installmentSummary.totalInterest) }}</span>
                        </div>
                        <div class="border-t pt-3">
                          <div class="flex justify-between">
                            <span class="font-semibold text-slate-800">Total Payable</span>
                            <span class="font-bold text-lg">${{ formatPrice(installmentSummary.totalPayable) }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>

              <!-- Payment Method Selection -->
              <div class="mb-8">
                <h3 class="text-lg font-semibold text-slate-800 mb-4">Payment Gateway</h3>
                <div class="space-y-4">
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
                </div>
              </div>
              
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
                  :disabled="isProcessing || !isPaymentConfigValid"
                  class="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <Loader v-if="isProcessing" class="w-5 h-5 mr-2 animate-spin" />
                  {{ getPaymentButtonText() }}
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
                  <div class="flex items-center gap-2 mt-1">
                    <span v-if="item.size" class="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">{{ item.size }}</span>
                    <span v-if="item.color" class="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">{{ item.color }}</span>
                    <span v-if="item.hasInstallmentOption" class="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">💳 Installments</span>
                  </div>
                  
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
              
              <!-- Installment Summary in Order Total -->
              <div v-if="selectedPaymentType === 'installment' && installmentSummary.installmentAmount > 0" class="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div class="text-xs font-semibold text-blue-800 mb-2">Installment Plan</div>
                <div class="flex justify-between text-xs text-blue-700 mb-1">
                  <span>Down Payment</span>
                  <span>${{ formatPrice(installmentSummary.downPayment) }}</span>
                </div>
                <div class="flex justify-between text-xs text-blue-700 mb-1">
                  <span>{{ installmentConfig.numberOfInstallments }} × ${{ formatPrice(installmentSummary.installmentAmount) }}</span>
                  <span>${{ formatPrice(installmentSummary.installmentAmount * installmentConfig.numberOfInstallments) }}</span>
                </div>
                <div class="flex justify-between text-xs text-blue-700">
                  <span>Total Interest</span>
                  <span>${{ formatPrice(installmentSummary.totalInterest) }}</span>
                </div>
              </div>
              
              <div v-if="selectedCountryInfo" class="text-xs text-slate-500 bg-slate-50 p-3 rounded-lg">
                <p>Shipping to: {{ selectedCountryInfo.countryName }}</p>
                <p>Tax Rate: {{ currentTaxRate }}%</p>
                <p v-if="selectedPaymentType === 'installment'">Payment Type: Installment Plan</p>
              </div>
              
              <div class="flex justify-between font-bold text-lg pt-3 border-t border-slate-200">
                <span class="text-slate-800">
                  {{ selectedPaymentType === 'installment' ? 'Total Payable' : 'Total' }}
                </span>
                <span class="text-slate-800">
                  ${{ formatPrice(selectedPaymentType === 'installment' && installmentSummary.totalPayable > 0 ? installmentSummary.totalPayable : calculateTotal()) }}
                </span>
              </div>

              <!-- Today's Payment for Installments -->
              <div v-if="selectedPaymentType === 'installment' && installmentSummary.downPayment > 0" class="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <div class="flex justify-between font-semibold text-emerald-800">
                  <span>Today's Payment</span>
                  <span>${{ formatPrice(installmentSummary.downPayment) }}</span>
                </div>
                <p class="text-xs text-emerald-600 mt-1">Down payment due now</p>
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

    <!-- Authentication Modal -->
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
  HelpCircle,
  Calendar,
  Settings
} from 'lucide-vue-next'

// Import composables
import { useCartStore } from '@/composables/useCartStore'
import { use_auth_signup } from '@/composables/auth/register'
import { use_auth_login } from '@/composables/auth/login'
import { useCheckoutPayment } from '@/composables/useCheckoutPayment'
import { useUser } from '@/composables/auth/user'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { useTaxConfig } from '@/composables/modules/shipping-tax/useTaxConfig'
import { useShippingConfig } from '@/composables/modules/shipping-tax/useShippingConfig'
import { useCustomToast } from '@/composables/core/useCustomToast'

// Router
const router = useRouter()
const route = useRoute()

// Use the enhanced checkout payment composable
const {
  processCheckout,
  verifyPayment,
  createInstallmentPlan,
  orderResponse,
  getPaymentSummary,
  isLoading: isProcessing,
  orderLoading,
  paymentLoading,
  orderCreationError,
  paymentError,
  paymentComplete: orderComplete,
  paymentForm
} = useCheckoutPayment()

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

// Delivery details
const deliveryDetails = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: ''
})

// Delivery and payment methods
const deliveryMethod = ref('standard')
const paymentMethod = ref('flutterwave')

// Payment type selection
const selectedPaymentType = ref('full') // 'full' or 'installment'

// Order ID for completed orders
const orderId = ref('')

// Installment configuration
const installmentConfig = ref({
  numberOfInstallments: '',
  paymentFrequency: '',
  downPayment: 0,
  startDate: '',
  paymentMethod: '',
  needsFormalAgreement: false,
  interestRate: 0,
  totalAmount: 0
})

// Installment summary
const installmentSummary = ref({
  downPayment: 0,
  installmentAmount: 0,
  totalInterest: 0,
  totalPayable: 0,
  remainingAmount: 0
})

// Current installment configuration based on selected product size
const currentInstallmentConfig = ref(null)

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
  PAYMENT_TYPE: 'checkout-payment-type',
  INSTALLMENT_CONFIG: 'checkout-installment-config',
  SELECTED_COUNTRY: 'checkout-selected-country',
  SHIPPING_CONFIG: 'checkout-shipping-config',
  TAX_CONFIG: 'checkout-tax-config',
  GUEST_MODE: 'checkout-guest-mode'
}

// FIXED: Check if any cart items have installment options
const hasInstallmentOptions = computed(() => {
  console.log('Checking installment options for cart items:', cartItems.value)
  const hasOptions = cartItems.value.some(item => {
    const hasInstallment = item.hasInstallmentOption === true && 
                          item.installmentConfig && 
                          item.installmentConfig.enabled === true
    console.log(`Item ${item.id}: hasInstallmentOption=${item.hasInstallmentOption}, config enabled=${item.installmentConfig?.enabled}, result=${hasInstallment}`)
    return hasInstallment
  })
  console.log('Overall hasInstallmentOptions:', hasOptions)
  return hasOptions
})

// FIXED: Get cart items with installment options for debugging
const cartItemsWithInstallments = computed(() => {
  return cartItems.value.filter(item => 
    item.hasInstallmentOption === true && 
    item.installmentConfig && 
    item.installmentConfig.enabled === true
  )
})

// FIXED: Get available installment terms based on cart items
const availableInstallmentTerms = computed(() => {
  const allTerms = new Set()
  
  cartItems.value.forEach(item => {
    if (item.hasInstallmentOption === true && item.installmentConfig?.enabled === true) {
      const config = item.installmentConfig
      if (config.availableTerms && Array.isArray(config.availableTerms)) {
        config.availableTerms.forEach(term => allTerms.add(term))
      }
    }
  })
  
  const terms = Array.from(allTerms).sort((a, b) => a - b)
  console.log('Available installment terms:', terms)
  return terms
})

// Get minimum installment amount for display
const getMinimumInstallmentAmount = () => {
  if (!hasInstallmentOptions.value) return 0
  
  const total = calculateTotal()
  const maxTerms = Math.max(...availableInstallmentTerms.value)
  return total / maxTerms
}

// FIXED: Calculate estimated monthly payment for a given term
const calculateEstimatedMonthlyPayment = (term: number) => {
  if (!currentInstallmentConfig.value) {
    // Use a default configuration if none is available
    const total = calculateTotal()
    const defaultDownPayment = total * 0.2 // 20% default
    const remainingAmount = total - defaultDownPayment
    return remainingAmount / term
  }
  
  const total = calculateTotal()
  const minDownPaymentPercentage = currentInstallmentConfig.value.minimumDownPaymentPercentage || 20
  const minDownPayment = (total * minDownPaymentPercentage) / 100
  const remainingAmount = total - minDownPayment
  const monthlyInterestRate = (currentInstallmentConfig.value.interestRate || 0) / 12 / 100
  
  if (monthlyInterestRate > 0) {
    const factor = Math.pow(1 + monthlyInterestRate, term)
    return (remainingAmount * monthlyInterestRate * factor) / (factor - 1)
  } else {
    return remainingAmount / term
  }
}

// FIXED: Get current installment configuration
const getCurrentInstallmentConfig = () => {
  // Find the first item with installment options
  const firstItemWithInstallments = cartItems.value.find(item => 
    item.hasInstallmentOption === true && 
    item.installmentConfig && 
    item.installmentConfig.enabled === true
  )
  
  console.log('Current installment config from item:', firstItemWithInstallments?.installmentConfig)
  return firstItemWithInstallments?.installmentConfig || null
}

// Update current installment config when cart changes
watch(cartItems, () => {
  currentInstallmentConfig.value = getCurrentInstallmentConfig()
  console.log('Updated currentInstallmentConfig:', currentInstallmentConfig.value)
}, { deep: true })

// FIXED: Get minimum down payment percentage
const getMinimumDownPaymentPercentage = () => {
  return currentInstallmentConfig.value?.minimumDownPaymentPercentage || 20
}

// FIXED: Get maximum down payment percentage
const getMaximumDownPaymentPercentage = () => {
  return currentInstallmentConfig.value?.maximumDownPaymentPercentage || 80
}

// Get minimum down payment
const getMinimumDownPayment = () => {
  const total = calculateTotal()
  return (total * getMinimumDownPaymentPercentage()) / 100
}

// Get maximum down payment
const getMaximumDownPayment = () => {
  const total = calculateTotal()
  return (total * getMaximumDownPaymentPercentage()) / 100
}

// Get current interest rate
const getCurrentInterestRate = () => {
  return currentInstallmentConfig.value?.interestRate || 0
}

// Get minimum start date (today)
const getMinimumStartDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

// FIXED: Calculate installment details
const calculateInstallmentDetails = () => {
  console.log('Calculating installment details...')
  console.log('Config:', installmentConfig.value)
  
  if (!installmentConfig.value.numberOfInstallments || !installmentConfig.value.downPayment) {
    console.log('Missing required fields for calculation')
    installmentSummary.value = {
      downPayment: 0,
      installmentAmount: 0,
      totalInterest: 0,
      totalPayable: 0,
      remainingAmount: 0
    }
    return
  }
  
  const totalAmount = calculateTotal()
  const downPayment = Number(installmentConfig.value.downPayment)
  const remainingAmount = totalAmount - downPayment
  const numberOfInstallments = parseInt(installmentConfig.value.numberOfInstallments)
  const annualInterestRate = getCurrentInterestRate()
  const monthlyInterestRate = annualInterestRate / 12 / 100
  
  console.log('Calculation inputs:', {
    totalAmount,
    downPayment,
    remainingAmount,
    numberOfInstallments,
    annualInterestRate,
    monthlyInterestRate
  })
  
  let installmentAmount = 0
  let totalInterest = 0
  
  if (monthlyInterestRate > 0) {
    // Calculate using compound interest formula
    const factor = Math.pow(1 + monthlyInterestRate, numberOfInstallments)
    installmentAmount = (remainingAmount * monthlyInterestRate * factor) / (factor - 1)
    totalInterest = installmentAmount * numberOfInstallments - remainingAmount
  } else {
    // No interest
    installmentAmount = remainingAmount / numberOfInstallments
    totalInterest = 0
  }
  
  const totalPayable = downPayment + installmentAmount * numberOfInstallments
  
  console.log('Calculation results:', {
    installmentAmount,
    totalInterest,
    totalPayable
  })
  
  installmentSummary.value = {
    downPayment,
    installmentAmount,
    totalInterest,
    totalPayable,
    remainingAmount
  }
  
  // Update installment config
  installmentConfig.value.totalAmount = totalAmount
  installmentConfig.value.interestRate = annualInterestRate
}

// FIXED: Check if payment configuration is valid
const isPaymentConfigValid = computed(() => {
  console.log('Checking payment config validity...')
  console.log('Payment type:', selectedPaymentType.value)
  console.log('Payment method:', paymentMethod.value)
  
  if (selectedPaymentType.value === 'full') {
    const isValid = paymentMethod.value !== ''
    console.log('Full payment valid:', isValid)
    return isValid
  } else if (selectedPaymentType.value === 'installment') {
    const config = installmentConfig.value
    const isValid = (
      paymentMethod.value !== '' &&
      config.numberOfInstallments !== '' &&
      config.paymentFrequency !== '' &&
      config.downPayment > 0 &&
      config.startDate !== '' &&
      config.paymentMethod !== '' &&
      config.downPayment >= getMinimumDownPayment() &&
      config.downPayment <= getMaximumDownPayment() &&
      typeof config.needsFormalAgreement === 'boolean'
    )
    
    console.log('Installment payment validation:', {
      paymentMethod: paymentMethod.value !== '',
      numberOfInstallments: config.numberOfInstallments !== '',
      paymentFrequency: config.paymentFrequency !== '',
      downPayment: config.downPayment > 0,
      startDate: config.startDate !== '',
      installmentPaymentMethod: config.paymentMethod !== '',
      downPaymentRange: config.downPayment >= getMinimumDownPayment() && config.downPayment <= getMaximumDownPayment(),
      formalAgreement: typeof config.needsFormalAgreement === 'boolean',
      overall: isValid
    })
    
    return isValid
  }
  return false
})

// Get payment button text
const getPaymentButtonText = () => {
  if (isProcessing.value) return 'Processing...'
  
  if (selectedPaymentType.value === 'installment') {
    return `Pay Down Payment - $${formatPrice(installmentSummary.value.downPayment)}`
  } else {
    return `Complete Order - $${formatPrice(calculateTotal())}`
  }
}

// Handle payment type change
const handlePaymentTypeChange = (type: string) => {
  selectedPaymentType.value = type
  
  if (type === 'installment') {
    // Initialize installment config
    currentInstallmentConfig.value = getCurrentInstallmentConfig()
    if (currentInstallmentConfig.value) {
      // Set default down payment to minimum
      installmentConfig.value.downPayment = getMinimumDownPayment()
      // Set default start date to 30 days from now
      const defaultStartDate = new Date()
      defaultStartDate.setDate(defaultStartDate.getDate() + 30)
      installmentConfig.value.startDate = defaultStartDate.toISOString().split('T')[0]
      
      // Trigger calculation
      nextTick(() => {
        calculateInstallmentDetails()
      })
    }
  }
  
  persistCheckoutData()
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
          console.log('Loaded cart from storage:', parsedCart)
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
      setItem(PERSISTENCE_KEYS.PAYMENT_TYPE, selectedPaymentType.value)
      setItem(PERSISTENCE_KEYS.INSTALLMENT_CONFIG, JSON.stringify(installmentConfig.value))
      setItem(PERSISTENCE_KEYS.DELIVERY_DETAILS, JSON.stringify(deliveryDetails.value))
      
      if (selectedCountryInfo.value) {
        setItem(PERSISTENCE_KEYS.SELECTED_COUNTRY, JSON.stringify({
          countryInfo: selectedCountryInfo.value,
          shippingFee: currentShippingFee.value,
          taxRate: currentTaxRate.value
        }))
      }
    }
  } catch (error) {
    console.error('Failed to persist checkout data:', error)
  }
}

// Persist delivery details
const persistDeliveryDetails = () => {
  persistCheckoutData()
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
        deliveryMethod.value = savedDeliveryMethod
      }
      
      // Load payment method
      const savedPaymentMethod = getItem(PERSISTENCE_KEYS.PAYMENT_METHOD)
      if (savedPaymentMethod && ['flutterwave', 'interswitch', 'manual'].includes(savedPaymentMethod)) {
        paymentMethod.value = savedPaymentMethod
      }
      
      // Load payment type
      const savedPaymentType = getItem(PERSISTENCE_KEYS.PAYMENT_TYPE)
      if (savedPaymentType && ['full', 'installment'].includes(savedPaymentType)) {
        selectedPaymentType.value = savedPaymentType
      }
      
      // Load installment config
      const savedInstallmentConfig = getItem(PERSISTENCE_KEYS.INSTALLMENT_CONFIG)
      if (savedInstallmentConfig) {
        try {
          const parsedConfig = JSON.parse(savedInstallmentConfig)
          Object.assign(installmentConfig.value, parsedConfig)
        } catch (e) {
          console.error('Failed to parse saved installment config', e)
        }
      }
      
      // Load delivery details
      const savedDeliveryDetails = getItem(PERSISTENCE_KEYS.DELIVERY_DETAILS)
      if (savedDeliveryDetails) {
        try {
          const parsedDetails = JSON.parse(savedDeliveryDetails)
          Object.assign(deliveryDetails.value, parsedDetails)
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
    if (deliveryDetails.value.country && shippingConfigs.value.length > 0) {
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
  const countryCode = deliveryDetails.value.country
  
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
  deliveryMethod.value = method
  persistCheckoutData()
}

// Enhanced payment method change handler
const handlePaymentMethodChange = (method) => {
  paymentMethod.value = method
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

// FIXED: Process payment with updated total and installment support
const processPayment = async () => {
  console.log('process payment')
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
    
    // FIXED: Prepare checkout data with correct product IDs
    const checkoutData = {
      paymentType: selectedPaymentType.value,
      items: cartItems.value.map(item => ({
        // Use the exact productId from cart without any prefix
        productId: item.productId,
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        discount: item.discount || 0,
        total: item.price * item.quantity,
        hasInstallmentOption: item.hasInstallmentOption,
        installmentConfig: item.installmentConfig,
        category: item.category,
        weight: item.weight,
        dimensions: item.dimensions
      })),
      subtotal: subtotalAmount.value,
      shipping: getShippingCost(),
      tax: getTaxAmount(),
      total: calculateTotal(),
      deliveryDetails: deliveryDetails.value,
      deliveryMethod: deliveryMethod.value,
      paymentMethod: paymentMethod.value
    }

    console.log(checkoutData, 'here payload')
    
    // Add installment configuration if installment payment
    if (selectedPaymentType.value === 'installment') {
      checkoutData.installmentConfig = {
        ...installmentConfig.value,
        ...installmentSummary.value,
        productSize: cartItems.value[0]?.size, // Assuming single product for now
        product: cartItems.value[0]?.productId // Use exact productId
      }
      
      // For installment, the immediate payment is the down payment
      checkoutData.immediatePayment = installmentSummary.value.downPayment
    }
    
    // Add country info
    if (selectedCountryInfo.value) {
      checkoutData.country = {
        code: selectedCountryInfo.value.countryCode,
        name: selectedCountryInfo.value.countryName,
        taxRate: currentTaxRate.value
      };
    }
    
    console.log('Sending checkout data:', checkoutData)
    
    // Process the checkout
    const result = await processCheckout(checkoutData)
    console.log(result, 'processing result')
    
    if (result.success) {
      // Set order ID for display
      orderId.value = result.order.orderNumber
      
      // Only clear cart from localStorage on successful order
      if (process.client && localStorage) {
        localStorage.removeItem(PERSISTENCE_KEYS.CART);
        cartItems.value = [];
      }
      
      // Clear all persisted checkout data on successful order
      clearPersistedCheckoutData();
      
      // Clear query parameters on successful order
      clearQueryParams();
      
      // Show success message
      showToast({
        title: "Order Created Successfully",
        message: `Order #${result.order.orderNumber} has been created. ${selectedPaymentType.value === 'installment' ? 'Down payment processed.' : 'Payment completed.'}`,
        toastType: "success",
        duration: 5000
      });
      
      return result;
    } else {
      throw new Error(result.error || "Checkout failed");
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
        if (deliveryDetails.value) {
          deliveryDetails.value.firstName = signupData.value.firstName
          deliveryDetails.value.lastName = signupData.value.lastName
          deliveryDetails.value.email = signupData.value.email
          deliveryDetails.value.phone = signupData.value.phone || ''
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
          if (userData && deliveryDetails.value) {
            deliveryDetails.value.firstName = userData.firstName || ''
            deliveryDetails.value.lastName = userData.lastName || ''
            deliveryDetails.value.email = userData.email || ''
            deliveryDetails.value.phone = userData.phone || ''
            
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

// Watch for cart changes to update checkout summary and installment calculations
watch(cartItems, () => {
  saveCartToStorage()
  
  // Recalculate installment details if in installment mode
  if (selectedPaymentType.value === 'installment') {
    calculateInstallmentDetails()
  }
}, { deep: true })

// Watch for installment config changes
watch(installmentConfig, () => {
  calculateInstallmentDetails()
  persistCheckoutData()
}, { deep: true })

// Watch for payment type changes
watch(selectedPaymentType, () => {
  persistCheckoutData()
})

// Watch for login status changes
watch(isLoggedIn, (newValue) => {
  if (newValue) {
    // User is now logged in, close auth modal if open
    showAuthModal.value = false
    
    // Pre-fill delivery details with user info if available
    if (user.value && deliveryDetails.value) {
      deliveryDetails.value.firstName = user.value.firstName || ''
      deliveryDetails.value.lastName = user.value.lastName || ''
      deliveryDetails.value.email = user.value.email || ''
      deliveryDetails.value.phone = user.value.phone || ''
      
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
  
  // Initialize installment configuration
  currentInstallmentConfig.value = getCurrentInstallmentConfig()
  console.log('Mounted - currentInstallmentConfig:', currentInstallmentConfig.value)
  console.log('Mounted - hasInstallmentOptions:', hasInstallmentOptions.value)
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