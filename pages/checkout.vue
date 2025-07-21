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
            <span class="font-bold text-emerald-600">{{ formatCurrency(installmentSummary.downPayment) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-slate-600 font-medium">{{ selectedPaymentType === 'installment' ? 'Total Order Value' : 'Total Amount' }}</span>
            <span class="font-bold text-xl text-slate-800">{{ formatCurrency(calculateTotal()) }}</span>
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
        <h1 class="text-xl lg:text-3xl font-bold text-slate-800 mb-4">Secure Checkout</h1>
        <p class="text-slate-600 max-w-2xl mx-auto">Complete your purchase securely. Your information is protected with industry-standard encryption.</p>
      </div>

      <!-- Progress Steps -->
      <div class="max-w-2xl mx-auto mb-12">
        <div class="flex items-center justify-between relative">
          <!-- Progress Line -->
          <div class="absolute top-4 left-0 right-0 h-0.5 bg-slate-200">
            <div 
              class="h-full bg-gradient-to-r from-slate-800 to-slate-900 transition-all duration-500 ease-out"
              :style="{ width: `{((currentStep - 1) / 2) * 100}%` }"
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
      <div class="lg:grid space-y-6 lg:space-y-0 grid-cols-5 gap-8 lg:max-w-7xl mx-auto">
        <!-- Checkout Steps (Left Side) -->
        <div class="lg:col-span-3">
          <!-- Step 1: Customer Details -->
          <Transition name="slide-fade" mode="out-in">
            <div v-if="currentStep === 1" class="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 lg:p-8">
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
                    <!-- {{taxConfigs}} -->
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
                  <!-- {{ shippingConfigs }} -->
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
            <div v-else-if="currentStep === 2" class="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 lg:p-8">
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
                        <span class="font-semibold text-slate-800">Express Shipping</span>
                        <span class="font-bold text-slate-800">{{ formatCurrency(currentShippingFee) }}</span>
                      </div>
                      <p class="text-sm text-slate-600">Delivery within 5-7 business days</p>
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
            <div v-else-if="currentStep === 3" class="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 lg:p-8">
              <div class="flex items-center mb-6">
                <div class="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mr-4">
                  <CreditCard class="w-5 h-5 text-slate-600" />
                </div>
                <h2 class="text-lg lg:text-2xl font-bold text-slate-800">Payment Options</h2>
              </div>

              <!-- Payment Type Selection -->
              <div class="mb-8">
                <h3 class="text-base lg:text-lg font-semibold text-slate-800 mb-4">Choose Payment Type</h3>
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
                          <span class="font-bold text-emerald-600">{{ formatCurrency(calculateTotal()) }}</span>
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
                          <span class="font-bold text-blue-600">From {{ formatCurrency(getMinimumInstallmentAmount()) }}/month</span>
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
                        <span class="text-lg font-bold text-slate-800">{{ formatCurrency(calculateTotal()) }}</span>
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
                          {{ term }} months (Est. {{ formatCurrency(calculateEstimatedMonthlyPayment(term)) }}/month)
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
                        <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500"></span>
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
                        <span>Min: {{ formatCurrency(getMinimumDownPayment()) }}</span>
                        <span>Max: {{ formatCurrency(getMaximumDownPayment()) }}</span>
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
                          <span class="font-semibold">{{ formatCurrency(installmentSummary.downPayment) }}</span>
                        </div>
                        <div class="flex justify-between">
                          <span class="text-sm text-slate-600">Installment Amount</span>
                          <span class="font-semibold">{{ formatCurrency(installmentSummary.installmentAmount) }}</span>
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
                          <span class="font-semibold">{{ formatCurrency(installmentSummary.totalInterest) }}</span>
                        </div>
                        <div class="border-t pt-3">
                          <div class="flex justify-between">
                            <span class="font-semibold text-slate-800">Total Payable</span>
                            <span class="font-bold text-lg">{{ formatCurrency(installmentSummary.totalPayable) }}</span>
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
                        <span class="font-semibold text-slate-800">Pay with Card</span>
                        <p class="text-sm text-slate-600">Secure payment via Flutterwave</p>
                      </div>
                      <div class="w-10 h-10 bg-slate-100 rounded-md flex items-center justify-center">
                        <CreditCard class="w-6 h-6 text-slate-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="lg:flex space-y-6 lg:space-y-0 gap-4">
                <button 
                  @click="handlePrevStep"
                  class="flex-1 py-3 border-2 w-full border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-300 font-medium flex items-center justify-center"
                >
                  <ArrowLeft class="w-4 h-4 mr-2" />
                  Back
                </button>
                <button 
                  @click="processPayment"
                  :disabled="isProcessing || !isPaymentConfigValid"
                  class="flex-1 py-3 w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
          <div class="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 lg:p-6 sticky top-6">
            <div class="flex items-center mb-6">
              <div class="w-10 h-10 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center mr-4">
                <ShoppingCart class="w-5 h-5 text-slate-600" />
              </div>
              <h2 class="text-lg lg:text-xl font-bold text-slate-800">Order Summary</h2>
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
                  <p class="text-sm text-slate-600">{{ convertFromUSD(item.price).formattedAmount }}</p>
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
                  <span class="font-semibold text-slate-800">{{ convertFromUSD(item.price * item.quantity).formattedAmount }}</span>
                </div>
              </div>
            </div>
            
            <!-- Order Totals -->
            <div class="border-t border-slate-200 pt-4 space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-slate-600">Subtotal</span>
                <span class="font-semibold text-slate-800">{{ convertFromUSD(subtotalAmount).formattedAmount }}</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-slate-600">Shipping</span>
                <span class="font-semibold text-slate-800">{{ getShippingCost() === 0 ? 'Free' : `${convertFromUSD(getShippingCost()).formattedAmount}` }}</span>
              </div>
              
              <div class="flex justify-between text-sm">
                <span class="text-slate-600">Tax ({{ currentTaxRate }}%)</span>
                <span class="font-semibold text-slate-800">{{ convertFromUSD(getTaxAmount()).formattedAmount }}</span>
              </div>
              
              <!-- Installment Summary in Order Total -->
              <div v-if="selectedPaymentType === 'installment' && installmentSummary.installmentAmount > 0" class="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div class="text-xs font-semibold text-blue-800 mb-2">Installment Plan</div>
                <div class="flex justify-between text-xs text-blue-700 mb-1">
                  <span>Down Payment</span>
                  <span>{{ formatCurrency(installmentSummary.downPayment) }}</span>
                </div>
                <div class="flex justify-between text-xs text-blue-700 mb-1">
                  <span>{{ installmentConfig.numberOfInstallments }} × {{ formatCurrency(installmentSummary.installmentAmount) }}</span>
                  <span>{{ formatCurrency(installmentSummary.installmentAmount * installmentConfig.numberOfInstallments) }}</span>
                </div>
                <div class="flex justify-between text-xs text-blue-700">
                  <span>Total Interest</span>
                  <span>{{ formatCurrency(installmentSummary.totalInterest) }}</span>
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
                  {{ formatCurrency(selectedPaymentType === 'installment' && installmentSummary.totalPayable > 0 ? installmentSummary.totalPayable : calculateTotal()) }}
                </span>
              </div>

              <!-- Today's Payment for Installments -->
              <div v-if="selectedPaymentType === 'installment' && installmentSummary.downPayment > 0" class="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                <div class="flex justify-between font-semibold text-emerald-800">
                  <span>Today's Payment</span>
                  <span>{{ formatCurrency(installmentSummary.downPayment) }}</span>
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
// import { useCurrencyConverter } from "@/composables/useConvertCurrency"
import { useCurrencyConverter } from "@/composables/core/useCurrencyConverter"
// const {
//   countryCode,
//   currency,
//   isLoading,
//   error,
//   currencyCode,
//   currencySymbol,
//   currencyName,
//   detectCountry,
//   formatCurrency,
//   setCurrency,
//   setCountry,
//   getSupportedCurrencies,
//   getSupportedCountries
// } = useCurrencyConverter()
const {
  userCountry,
  userCurrency,
  exchangeRates,
  isLoading: currencyLoading,
  error: currencyError,
  lastUpdated,
  initializeUserCurrency,
  convertFromUSD,
  convertCurrency,
} = useCurrencyConverter()

const fixedInstallmentPayment = ref(50)


// Auto-detect country on mount
// onMounted(() => {
//   detectCountry()
// })

// const fixedInstallmentPayment = ref(50) // USD base amount

const convertedPrice = ref<any>({})
const fromCurrency = ref<string>('USD')
const toCurrency = ref<string>('NGN')
const manualConversionResult = ref<any>(null)

// Available currencies for dropdown
const availableCurrencies = computed(() => {
  return Object.keys(exchangeRates.value).sort()
})

// Initialize on mount
onMounted(async () => {
  await initializeUserCurrency()
  updateConvertedPrice()
})

// Watch for currency changes
watch([userCurrency, exchangeRates], () => {
  updateConvertedPrice()
})

// Update converted price when user currency or exchange rates change
const updateConvertedPrice = () => {
  if (userCurrency.value && Object.keys(exchangeRates.value).length > 0) {
    convertedPrice.value = convertFromUSD(100) // Example conversion
  }
}

// Retry initialization on error
const retryInitialization = async () => {
  await initializeUserCurrency()
  updateConvertedPrice()
}

// Set default target currency to user currency when it changes
watch(userCurrency, (newCurrency) => {
  toCurrency.value = newCurrency
})

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

// Payment type selection - UPDATED: Initialize from query params
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

// UPDATED: Initialize payment type from query params
const initializePaymentTypeFromQuery = () => {
  const paymentTypeParam = route.query.paymentType
  if (paymentTypeParam && ['full', 'installment'].includes(paymentTypeParam as string)) {
    selectedPaymentType.value = paymentTypeParam as 'full' | 'installment'
    console.log('Payment type initialized from query params:', selectedPaymentType.value)
  } else {
    // Default to 'full' if no valid payment type in query params
    selectedPaymentType.value = 'full'
    console.log('Payment type defaulted to full payment')
  }
}

// FIXED: Check if any cart items have installment options
const hasInstallmentOptions = computed(() => {
  console.log('Checking installment options for cart items:', cartItems.value)
  const hasOptions = cartItems.value.some(item => {
    const hasInstallment = item.hasInstallmentOption === true &&
                           item.installmentConfig &&
                           item.installmentConfig.enabled === true
    console.log(`Item {item.id}: hasInstallmentOption={item.hasInstallmentOption}, config enabled={item.installmentConfig?.enabled}, result={hasInstallment}`)
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
    return `Pay Down Payment - ${formatCurrency(installmentSummary.value.downPayment)}`
  } else {
    return `Complete Order - ${formatCurrency(calculateTotal())}`
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
      
      // Load payment type - UPDATED: Only load from storage if not already set from query params
      if (selectedPaymentType.value === 'full') { // Only override if still default
        const savedPaymentType = getItem(PERSISTENCE_KEYS.PAYMENT_TYPE)
        if (savedPaymentType && ['full', 'installment'].includes(savedPaymentType)) {
          selectedPaymentType.value = savedPaymentType
        }
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
          const parsedData = JSON.parse(savedCountryData)
          selectedCountryInfo.value = parsedData.countryInfo
          currentShippingFee.value = parsedData.shippingFee || 0
          currentTaxRate.value = parsedData.taxRate || 0
        } catch (e) {
          console.error('Failed to parse saved country data', e)
        }
      }
    }
  } catch (error) {
    console.error('Failed to load persisted checkout data:', error)
  }
}

// Clear persisted checkout data
const clearPersistedCheckoutData = () => {
  try {
    if (process.client && localStorage) {
      Object.values(PERSISTENCE_KEYS).forEach(key => {
        removeStorageItem(key)
      })
    }
  } catch (error) {
    console.error('Failed to clear persisted checkout data:', error)
  }
}

// Available countries
// Available countries from shipping configs
// const availableCountries = computed(() => {
//   return Array.isArray(shippingConfigs.value) && shippingConfigs?.value?.filter(config => config.isActive)
// })

const availableCountries = ref([
  { countryCode: 'NG', countryName: 'Nigeria' },
  { countryCode: 'US', countryName: 'United States' },
  { countryCode: 'GB', countryName: 'United Kingdom' },
  { countryCode: 'CA', countryName: 'Canada' },
  { countryCode: 'AU', countryName: 'Australia' },
  { countryCode: 'DE', countryName: 'Germany' },
  { countryCode: 'FR', countryName: 'France' },
  { countryCode: 'IT', countryName: 'Italy' },
  { countryCode: 'ES', countryName: 'Spain' },
  { countryCode: 'NL', countryName: 'Netherlands' },
  { countryCode: 'BE', countryName: 'Belgium' },
  { countryCode: 'CH', countryName: 'Switzerland' },
  { countryCode: 'AT', countryName: 'Austria' },
  { countryCode: 'SE', countryName: 'Sweden' },
  { countryCode: 'NO', countryName: 'Norway' },
  { countryCode: 'DK', countryName: 'Denmark' },
  { countryCode: 'FI', countryName: 'Finland' },
  { countryCode: 'IE', countryName: 'Ireland' },
  { countryCode: 'PT', countryName: 'Portugal' },
  { countryCode: 'GR', countryName: 'Greece' },
  { countryCode: 'PL', countryName: 'Poland' },
  { countryCode: 'CZ', countryName: 'Czech Republic' },
  { countryCode: 'HU', countryName: 'Hungary' },
  { countryCode: 'SK', countryName: 'Slovakia' },
  { countryCode: 'SI', countryName: 'Slovenia' },
  { countryCode: 'HR', countryName: 'Croatia' },
  { countryCode: 'BG', countryName: 'Bulgaria' },
  { countryCode: 'RO', countryName: 'Romania' },
  { countryCode: 'LT', countryName: 'Lithuania' },
  { countryCode: 'LV', countryName: 'Latvia' },
  { countryCode: 'EE', countryName: 'Estonia' },
  { countryCode: 'MT', countryName: 'Malta' },
  { countryCode: 'CY', countryName: 'Cyprus' },
  { countryCode: 'LU', countryName: 'Luxembourg' },
  { countryCode: 'IS', countryName: 'Iceland' },
  { countryCode: 'LI', countryName: 'Liechtenstein' },
  { countryCode: 'MC', countryName: 'Monaco' },
  { countryCode: 'SM', countryName: 'San Marino' },
  { countryCode: 'VA', countryName: 'Vatican City' },
  { countryCode: 'AD', countryName: 'Andorra' },
  { countryCode: 'JP', countryName: 'Japan' },
  { countryCode: 'KR', countryName: 'South Korea' },
  { countryCode: 'CN', countryName: 'China' },
  { countryCode: 'SG', countryName: 'Singapore' },
  { countryCode: 'HK', countryName: 'Hong Kong' },
  { countryCode: 'TW', countryName: 'Taiwan' },
  { countryCode: 'MY', countryName: 'Malaysia' },
  { countryCode: 'TH', countryName: 'Thailand' },
  { countryCode: 'PH', countryName: 'Philippines' },
  { countryCode: 'ID', countryName: 'Indonesia' },
  { countryCode: 'VN', countryName: 'Vietnam' },
  { countryCode: 'IN', countryName: 'India' },
  { countryCode: 'BD', countryName: 'Bangladesh' },
  { countryCode: 'PK', countryName: 'Pakistan' },
  { countryCode: 'LK', countryName: 'Sri Lanka' },
  { countryCode: 'NP', countryName: 'Nepal' },
  { countryCode: 'BT', countryName: 'Bhutan' },
  { countryCode: 'MV', countryName: 'Maldives' },
  { countryCode: 'AF', countryName: 'Afghanistan' },
  { countryCode: 'IR', countryName: 'Iran' },
  { countryCode: 'IQ', countryName: 'Iraq' },
  { countryCode: 'SA', countryName: 'Saudi Arabia' },
  { countryCode: 'AE', countryName: 'United Arab Emirates' },
  { countryCode: 'QA', countryName: 'Qatar' },
  { countryCode: 'KW', countryName: 'Kuwait' },
  { countryCode: 'BH', countryName: 'Bahrain' },
  { countryCode: 'OM', countryName: 'Oman' },
  { countryCode: 'YE', countryName: 'Yemen' },
  { countryCode: 'JO', countryName: 'Jordan' },
  { countryCode: 'LB', countryName: 'Lebanon' },
  { countryCode: 'SY', countryName: 'Syria' },
  { countryCode: 'IL', countryName: 'Israel' },
  { countryCode: 'PS', countryName: 'Palestine' },
  { countryCode: 'TR', countryName: 'Turkey' },
  { countryCode: 'CY', countryName: 'Cyprus' },
  { countryCode: 'GE', countryName: 'Georgia' },
  { countryCode: 'AM', countryName: 'Armenia' },
  { countryCode: 'AZ', countryName: 'Azerbaijan' },
  { countryCode: 'KZ', countryName: 'Kazakhstan' },
  { countryCode: 'KG', countryName: 'Kyrgyzstan' },
  { countryCode: 'TJ', countryName: 'Tajikistan' },
  { countryCode: 'TM', countryName: 'Turkmenistan' },
  { countryCode: 'UZ', countryName: 'Uzbekistan' },
  { countryCode: 'MN', countryName: 'Mongolia' },
  { countryCode: 'RU', countryName: 'Russia' },
  { countryCode: 'BY', countryName: 'Belarus' },
  { countryCode: 'UA', countryName: 'Ukraine' },
  { countryCode: 'MD', countryName: 'Moldova' },
  { countryCode: 'MX', countryName: 'Mexico' },
  { countryCode: 'GT', countryName: 'Guatemala' },
  { countryCode: 'BZ', countryName: 'Belize' },
  { countryCode: 'SV', countryName: 'El Salvador' },
  { countryCode: 'HN', countryName: 'Honduras' },
  { countryCode: 'NI', countryName: 'Nicaragua' },
  { countryCode: 'CR', countryName: 'Costa Rica' },
  { countryCode: 'PA', countryName: 'Panama' },
  { countryCode: 'CU', countryName: 'Cuba' },
  { countryCode: 'JM', countryName: 'Jamaica' },
  { countryCode: 'HT', countryName: 'Haiti' },
  { countryCode: 'DO', countryName: 'Dominican Republic' },
  { countryCode: 'PR', countryName: 'Puerto Rico' },
  { countryCode: 'TT', countryName: 'Trinidad and Tobago' },
  { countryCode: 'BB', countryName: 'Barbados' },
  { countryCode: 'GD', countryName: 'Grenada' },
  { countryCode: 'LC', countryName: 'Saint Lucia' },
  { countryCode: 'VC', countryName: 'Saint Vincent and the Grenadines' },
  { countryCode: 'AG', countryName: 'Antigua and Barbuda' },
  { countryCode: 'KN', countryName: 'Saint Kitts and Nevis' },
  { countryCode: 'DM', countryName: 'Dominica' },
  { countryCode: 'BS', countryName: 'Bahamas' },
  { countryCode: 'AR', countryName: 'Argentina' },
  { countryCode: 'BR', countryName: 'Brazil' },
  { countryCode: 'CL', countryName: 'Chile' },
  { countryCode: 'CO', countryName: 'Colombia' },
  { countryCode: 'EC', countryName: 'Ecuador' },
  { countryCode: 'GY', countryName: 'Guyana' },
  { countryCode: 'PY', countryName: 'Paraguay' },
  { countryCode: 'PE', countryName: 'Peru' },
  { countryCode: 'SR', countryName: 'Suriname' },
  { countryCode: 'UY', countryName: 'Uruguay' },
  { countryCode: 'VE', countryName: 'Venezuela' },
  { countryCode: 'BO', countryName: 'Bolivia' },
  { countryCode: 'FK', countryName: 'Falkland Islands' },
  { countryCode: 'GF', countryName: 'French Guiana' },
  { countryCode: 'ZA', countryName: 'South Africa' },
  { countryCode: 'EG', countryName: 'Egypt' },
  { countryCode: 'LY', countryName: 'Libya' },
  { countryCode: 'TN', countryName: 'Tunisia' },
  { countryCode: 'DZ', countryName: 'Algeria' },
  { countryCode: 'MA', countryName: 'Morocco' },
  { countryCode: 'SD', countryName: 'Sudan' },
  { countryCode: 'SS', countryName: 'South Sudan' },
  { countryCode: 'ET', countryName: 'Ethiopia' },
  { countryCode: 'ER', countryName: 'Eritrea' },
  { countryCode: 'DJ', countryName: 'Djibouti' },
  { countryCode: 'SO', countryName: 'Somalia' },
  { countryCode: 'KE', countryName: 'Kenya' },
  { countryCode: 'UG', countryName: 'Uganda' },
  { countryCode: 'TZ', countryName: 'Tanzania' },
  { countryCode: 'RW', countryName: 'Rwanda' },
  { countryCode: 'BI', countryName: 'Burundi' },
  { countryCode: 'MW', countryName: 'Malawi' },
  { countryCode: 'ZM', countryName: 'Zambia' },
  { countryCode: 'ZW', countryName: 'Zimbabwe' },
  { countryCode: 'BW', countryName: 'Botswana' },
  { countryCode: 'NA', countryName: 'Namibia' },
  { countryCode: 'SZ', countryName: 'Eswatini' },
  { countryCode: 'LS', countryName: 'Lesotho' },
  { countryCode: 'MZ', countryName: 'Mozambique' },
  { countryCode: 'MG', countryName: 'Madagascar' },
  { countryCode: 'MU', countryName: 'Mauritius' },
  { countryCode: 'SC', countryName: 'Seychelles' },
  { countryCode: 'KM', countryName: 'Comoros' },
  { countryCode: 'CV', countryName: 'Cape Verde' },
  { countryCode: 'ST', countryName: 'São Tomé and Príncipe' },
  { countryCode: 'GQ', countryName: 'Equatorial Guinea' },
  { countryCode: 'GA', countryName: 'Gabon' },
  { countryCode: 'CG', countryName: 'Republic of the Congo' },
  { countryCode: 'CD', countryName: 'Democratic Republic of the Congo' },
  { countryCode: 'CF', countryName: 'Central African Republic' },
  { countryCode: 'CM', countryName: 'Cameroon' },
  { countryCode: 'TD', countryName: 'Chad' },
  { countryCode: 'NE', countryName: 'Niger' },
  { countryCode: 'BF', countryName: 'Burkina Faso' },
  { countryCode: 'ML', countryName: 'Mali' },
  { countryCode: 'SN', countryName: 'Senegal' },
  { countryCode: 'MR', countryName: 'Mauritania' },
  { countryCode: 'GM', countryName: 'Gambia' },
  { countryCode: 'GW', countryName: 'Guinea-Bissau' },
  { countryCode: 'GN', countryName: 'Guinea' },
  { countryCode: 'SL', countryName: 'Sierra Leone' },
  { countryCode: 'LR', countryName: 'Liberia' },
  { countryCode: 'CI', countryName: 'Côte d\'Ivoire' },
  { countryCode: 'GH', countryName: 'Ghana' },
  { countryCode: 'TG', countryName: 'Togo' },
  { countryCode: 'BJ', countryName: 'Benin' },
  { countryCode: 'AO', countryName: 'Angola' },
  { countryCode: 'AU', countryName: 'Australia' },
  { countryCode: 'NZ', countryName: 'New Zealand' },
  { countryCode: 'PG', countryName: 'Papua New Guinea' },
  { countryCode: 'FJ', countryName: 'Fiji' },
  { countryCode: 'SB', countryName: 'Solomon Islands' },
  { countryCode: 'VU', countryName: 'Vanuatu' },
  { countryCode: 'NC', countryName: 'New Caledonia' },
  { countryCode: 'PF', countryName: 'French Polynesia' },
  { countryCode: 'WS', countryName: 'Samoa' },
  { countryCode: 'TO', countryName: 'Tonga' },
  { countryCode: 'KI', countryName: 'Kiribati' },
  { countryCode: 'TV', countryName: 'Tuvalu' },
  { countryCode: 'NR', countryName: 'Nauru' },
  { countryCode: 'PW', countryName: 'Palau' },
  { countryCode: 'FM', countryName: 'Federated States of Micronesia' },
  { countryCode: 'MH', countryName: 'Marshall Islands' }
])

// Computed properties
const subtotalAmount = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const getShippingCost = () => {
  return currentShippingFee.value * (deliveryMethod.value === 'express' ? EXPRESS_DELIVERY_MULTIPLIER : 1)
}

const getTaxAmount = () => {
  const subtotal = subtotalAmount.value
  const shipping = getShippingCost()
  return (subtotal + shipping) * (currentTaxRate.value / 100)
}

const calculateTotal = () => {
  const subtotal = subtotalAmount.value
  const shipping = getShippingCost()
  const tax = getTaxAmount()
  return subtotal + shipping + tax
}

// Load shipping and tax configurations
const loadShippingAndTaxConfigs = async () => {
  if (isLoadingConfigs.value) return
  
  isLoadingConfigs.value = true
  try {
    const [shippingResponse, taxResponse] = await Promise.all([
      fetchShippingConfigs(),
      fetchTaxConfigs()
    ])

    
    if (shippingResponse) {
      shippingConfigs.value = shippingResponse
    }
    
    if (taxResponse) {
      taxConfigs.value = taxResponse
    }
  } catch (error) {
    console.error('Failed to load shipping and tax configs:', error)
    showToast({
      title: 'Configuration Error',
      message: 'Failed to load shipping and tax information. Using default rates.',
      toastType: 'warning',
      duration: 5000
    })
  } finally {
    isLoadingConfigs.value = false
  }
}

// Handle country change
const handleCountryChange = () => {
  const countryCode = deliveryDetails.value.country
  const country = availableCountries.value.find(c => c.countryCode === countryCode)
  
  if (country) {
    selectedCountryInfo.value = country
    
    // Find shipping config for this country
    const shippingConfig = shippingConfigs.value.find(config => 
      config.countryCode === countryCode && config.isActive
    )

    console.log(shippingConfig, 'selected shipping cionfig')
    
    if (shippingConfig) {
      currentShippingFee.value = shippingConfig.shippingRate
    } else {
      // Default shipping fee
      currentShippingFee.value = countryCode === 'NG' ? 0 : 25
    }
    
    // Find tax config for this country
    const taxConfig = taxConfigs.value.find(config => 
      config.countryCode === countryCode && config.isActive
    )
    
    if (taxConfig) {
      currentTaxRate.value = taxConfig.vatRate
    } else {
      // Default tax rates
      const defaultTaxRates = {
        'NG': 7.5,
        'US': 8.5,
        'GB': 20,
        'CA': 13,
        'AU': 10,
        'DE': 19,
        'FR': 20
      }
      currentTaxRate.value = defaultTaxRates[countryCode] || 0
    }
    
    persistCheckoutData()
  }
}

// Handle delivery method change
const handleDeliveryMethodChange = (method: string) => {
  deliveryMethod.value = method
  persistCheckoutData()
}

// Handle payment method change
const handlePaymentMethodChange = (method: string) => {
  paymentMethod.value = method
  persistCheckoutData()
}

// Step navigation
const handleNextStep = () => {
  if (currentStep.value < MAX_STEP) {
    currentStep.value++
    persistCheckoutData()
  }
}

const handlePrevStep = () => {
  if (currentStep.value > MIN_STEP) {
    currentStep.value--
    persistCheckoutData()
  }
}

// Cart management
const updateItemQuantity = (itemId: string, newQuantity: number) => {
  const itemIndex = cartItems.value.findIndex(item => item.id === itemId)
  if (itemIndex !== -1 && newQuantity > 0) {
    cartItems.value[itemIndex].quantity = newQuantity
    saveCartToStorage()
    updateCartItemQuantity(itemId, newQuantity)
  }
}

const removeItem = (itemId: string) => {
  cartItems.value = cartItems.value.filter(item => item.id !== itemId)
  saveCartToStorage()
  removeFromCart(itemId)
  
  showToast({
    title: 'Item Removed',
    message: 'Item has been removed from your cart',
    toastType: 'info',
    duration: 3000
  })
}

// Authentication functions
const openAuthModal = () => {
  showAuthModal.value = true
  authModalMode.value = 'check'
}

const closeAuthModal = () => {
  showAuthModal.value = false
  authModalMode.value = 'check'
}

const proceedAsGuest = () => {
  setItem(PERSISTENCE_KEYS.GUEST_MODE, 'true')
  closeAuthModal()
}

const handleSignup = async () => {
  isSigningUp.value = true
  try {
    const response = await signup(signupData.value)
    if (response.success) {
      showToast({
        title: 'Account Created',
        message: 'Your account has been created successfully!',
        toastType: 'success',
        duration: 5000
      })
      closeAuthModal()
    } else {
      showToast({
        title: 'Signup Failed',
        message: response.message || 'Failed to create account',
        toastType: 'error',
        duration: 5000
      })
    }
  } catch (error) {
    console.error('Signup error:', error)
    showToast({
      title: 'Signup Error',
      message: 'An error occurred during signup',
      toastType: 'error',
      duration: 5000
    })
  } finally {
    isSigningUp.value = false
  }
}

const handleSignin = async () => {
  isSigningIn.value = true
  try {
    const response = await login(signinData.value)
    if (response.status === 200 || response.status === 201) {
      showToast({
        title: 'Welcome Back',
        message: 'You have been signed in successfully!',
        toastType: 'success',
        duration: 5000
      })
      closeAuthModal()
    } else {
      showToast({
        title: 'Sign In Failed',
        message: response.message || 'Invalid credentials',
        toastType: 'error',
        duration: 5000
      })
    }
  } catch (error) {
    console.error('Signin error:', error)
    showToast({
      title: 'Sign In Error',
      message: 'An error occurred during sign in',
      toastType: 'error',
      duration: 5000
    })
  } finally {
    isSigningIn.value = false
  }
}

// Payment processing
const processPayment = async () => {
  console.log('Processing payment...')
  console.log('Payment type:', selectedPaymentType.value)
  console.log('Payment config valid:', isPaymentConfigValid.value)
  
  if (!isPaymentConfigValid.value) {
    showToast({
      title: 'Invalid Configuration',
      message: 'Please complete all required fields before proceeding',
      toastType: 'error',
      duration: 5000
    })
    return
  }

  try {
    // Prepare order data
    const orderData = {
      items: cartItems.value,
      deliveryDetails: deliveryDetails.value,
      deliveryMethod: deliveryMethod.value,
      paymentMethod: paymentMethod.value,
      paymentType: selectedPaymentType.value,
      subtotal: subtotalAmount.value,
      shipping: getShippingCost(),
      tax: getTaxAmount(),
      total: calculateTotal(),
      country: selectedCountryInfo.value,
      installmentConfig: selectedPaymentType.value === 'installment' ? {
        ...installmentConfig.value,
        summary: installmentSummary.value
      } : null
    }

    console.log('Order data prepared:', orderData)

    // Process the checkout
    const result = await processCheckout(orderData)
    
    console.log('Checkout result:', result)

    if (result.success) {
      // Generate order ID
      orderId.value = result.orderId || generateOrderNumber()
      
      // Clear cart and persisted data
      cartItems.value = []
      saveCartToStorage()
      clearPersistedCheckoutData()
      
      showToast({
        title: 'Order Successful',
        message: `Your order #{orderId.value} has been placed successfully!`,
        toastType: 'success',
        duration: 5000
      })
    } else {
      console.log(result, 'resal message here')
      throw new Error(result.error || 'Payment processing failed')
    }
  } catch (error) {
    console.error('Payment processing error:', error)
    showToast({
      title: 'Payment Failed',
      message: error.message || 'An error occurred while processing your payment',
      toastType: 'error',
      duration: 5000
    })
  }
}

// Generate order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6)
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `ORD{timestamp}{random}`
}

// Utility functions
// const formatPrice = (price: number) => {
//   if (typeof price !== 'number' || isNaN(price)) {
//     return '0.00'
//   }
//   return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
// }

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder.svg?height=64&width=64'
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


// Watch for route changes to sync query parameters
watch(() => route.query, (newQuery) => {
  // Update payment type if it changes in query params
  if (newQuery.paymentType && ['full', 'installment'].includes(newQuery.paymentType as string)) {
    const newPaymentType = newQuery.paymentType as 'full' | 'installment'
    if (selectedPaymentType.value !== newPaymentType) {
      selectedPaymentType.value = newPaymentType
      handlePaymentTypeChange(newPaymentType)
    }
  }
}, { immediate: true })

// Watch for payment type changes to update query params
watch(selectedPaymentType, (newType) => {
  // Update query params when payment type changes
  const currentQuery = { ...route.query }
  if (newType !== currentQuery.paymentType) {
    router.push({
      query: { ...currentQuery, paymentType: newType }
    })
  }
}, { immediate: false })

// Watch for installment config changes
watch(() => installmentConfig.value, () => {
  if (selectedPaymentType.value === 'installment') {
    calculateInstallmentDetails()
  }
  persistCheckoutData()
}, { deep: true })

// Lifecycle hooks
onMounted(async () => {
  console.log('Checkout page mounted')

    // Check if user is logged in immediately on mount
    nextTick(() => {
    checkUserAuth()
  })
  
  // Initialize payment type from query params first
  initializePaymentTypeFromQuery()
  
  // Load cart from storage
  loadCartFromStorage()
  
  // Load persisted checkout data
  loadPersistedCheckoutData()
  
  // Load shipping and tax configurations
  await loadShippingAndTaxConfigs()
  
  // Set current installment config
  currentInstallmentConfig.value = getCurrentInstallmentConfig()
  
  // If installment payment type is selected, initialize config
  if (selectedPaymentType.value === 'installment' && hasInstallmentOptions.value) {
    // Set default values
    installmentConfig.value.downPayment = getMinimumDownPayment()
    const defaultStartDate = new Date()
    defaultStartDate.setDate(defaultStartDate.getDate() + 30)
    installmentConfig.value.startDate = defaultStartDate.toISOString().split('T')[0]
    
    // Calculate initial details
    nextTick(() => {
      calculateInstallmentDetails()
    })
  }
  
  console.log('Checkout initialization complete')
  console.log('Cart items:', cartItems.value)
  console.log('Has installment options:', hasInstallmentOptions.value)
  console.log('Selected payment type:', selectedPaymentType.value)
})
</script>

<style scoped>
/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
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
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Hover effects */
.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* Focus styles */
input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Button loading state */
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .grid {
    gap: 1rem;
  }
  
  .text-3xl {
    font-size: 1.875rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
}

/* Animation delays for staggered effects */
.animation-delay-100 { animation-delay: 0.1s; }
.animation-delay-200 { animation-delay: 0.2s; }
.animation-delay-300 { animation-delay: 0.3s; }
.animation-delay-400 { animation-delay: 0.4s; }
.animation-delay-500 { animation-delay: 0.5s; }

/* Progress bar animation */
.progress-bar {
  transition: width 0.5s ease-in-out;
}

/* Card hover effects */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Gradient backgrounds */
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Text gradients */
.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Custom radio buttons */
input[type="radio"]:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

/* Custom checkboxes */
input[type="checkbox"]:checked {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
}
</style>