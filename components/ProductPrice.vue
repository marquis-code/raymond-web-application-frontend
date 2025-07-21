<!-- components/ProductPrice.vue -->
<template>
  <div class="product-price-container">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading currency rates...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-state">
      <p>Error: {{ error }}</p>
      <button @click="retryInitialization">Retry</button>
    </div>

    <!-- Success State -->
    <div v-if="!isLoading && !error" class="price-display">
      <div class="product-card">
        <h3>{{ productName }}</h3>
        
        <!-- Original USD Price -->
        <div class="price-section">
          <span class="label">Original Price (USD):</span>
          <span class="price original-price">${{ originalUSDPrice?.toFixed(2) }}</span>
        </div>

        <!-- Converted Price -->
        <div class="price-section">
          <span class="label">Your Price ({{ convertedPrice.currency }}):</span>
          <span class="price converted-price">{{ convertedPrice.formattedAmount }}</span>
        </div>

        <!-- Exchange Rate Info -->
        <div class="exchange-info">
          <small>
            Exchange Rate: 1 USD = {{ convertedPrice.exchangeRate?.toFixed(4) }} {{ convertedPrice.currency }}
          </small>
          <br>
          <small v-if="lastUpdated">
            Last updated: {{ formatDate(lastUpdated) }}
          </small>
        </div>

        <!-- User Location Info -->
        <div class="location-info">
          <small>Detected location: {{ userCountry }} | Currency: {{ userCurrency }}</small>
        </div>
      </div>

      <!-- Manual Currency Converter -->
      <div class="manual-converter">
        <h4>Currency Converter</h4>
        <div class="converter-form">
          <div class="input-group">
            <label>Amount:</label>
            <input 
              v-model.number="manualAmount" 
              type="number" 
              step="0.01" 
              placeholder="Enter amount"
            >
          </div>
          
          <div class="input-group">
            <label>From:</label>
            <select v-model="fromCurrency">
              <option v-for="currency in availableCurrencies" :key="currency" :value="currency">
                {{ currency }}
              </option>
            </select>
          </div>

          <div class="input-group">
            <label>To:</label>
            <select v-model="toCurrency">
              <option v-for="currency in availableCurrencies" :key="currency" :value="currency">
                {{ currency }}
              </option>
            </select>
          </div>

          <button @click="performManualConversion" :disabled="!manualAmount">
            Convert
          </button>
        </div>

        <div v-if="manualConversionResult" class="conversion-result">
          <h5>Conversion Result:</h5>
          <p>
            {{ manualAmount }} {{ fromCurrency }} = 
            <strong>{{ manualConversionResult.formattedAmount }}</strong>
          </p>
          <small>Rate: 1 {{ fromCurrency }} = {{ manualConversionResult.exchangeRate?.toFixed(4) }} {{ toCurrency }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrencyConverter } from "@/composables/core/useCurrencyConverter"
interface Props {
  productName?: string
  originalUSDPrice?: number
}

const props = withDefaults(defineProps<Props>(), {
  productName: 'Sample Product',
  originalUSDPrice: 50
})

// Use the currency converter composable
const {
  userCurrency,
  userCountry,
  exchangeRates,
  isLoading,
  error,
  lastUpdated,
  initializeUserCurrency,
  convertFromUSD,
  convertCurrency
} = useCurrencyConverter()

// Reactive data
const convertedPrice = ref<any>({})
const manualAmount = ref<number>(100)
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
    convertedPrice.value = convertFromUSD(props.originalUSDPrice)
  }
}

// Retry initialization on error
const retryInitialization = async () => {
  await initializeUserCurrency()
  updateConvertedPrice()
}

// Manual currency conversion
const performManualConversion = async () => {
  try {
    manualConversionResult.value = await convertCurrency(
      manualAmount.value,
      fromCurrency.value,
      toCurrency.value
    )
  } catch (err) {
    console.error('Manual conversion failed:', err)
  }
}

// Format date helper
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Set default target currency to user currency when it changes
watch(userCurrency, (newCurrency) => {
  toCurrency.value = newCurrency
})
</script>

<style scoped>
.product-price-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.loading-state {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state {
  text-align: center;
  padding: 20px;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  color: #c33;
}

.error-state button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.product-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  border: 1px solid #e5e7eb;
}

.product-card h3 {
  margin: 0 0 20px 0;
  color: #1f2937;
  font-size: 24px;
  font-weight: 600;
}

.price-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.label {
  font-weight: 500;
  color: #6b7280;
}

.price {
  font-size: 18px;
  font-weight: 600;
}

.original-price {
  color: #6b7280;
}

.converted-price {
  color: #059669;
  font-size: 24px;
}

.exchange-info {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
  color: #6b7280;
  font-size: 14px;
}

.location-info {
  margin-top: 8px;
  color: #9ca3af;
  font-size: 12px;
}

.manual-converter {
  background: #f9fafb;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

.manual-converter h4 {
  margin: 0 0 20px 0;
  color: #1f2937;
  font-size: 18px;
  font-weight: 600;
}

.converter-form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 16px;
  align-items: end;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
  font-size: 14px;
}

.input-group input,
.input-group select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.converter-form button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  height: fit-content;
}

.converter-form button:hover {
  background-color: #2563eb;
}

.converter-form button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

.conversion-result {
  margin-top: 20px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

.conversion-result h5 {
  margin: 0 0 8px 0;
  color: #1f2937;
  font-size: 16px;
}

.conversion-result p {
  margin: 0;
  font-size: 18px;
  color: #374151;
}

.conversion-result small {
  color: #6b7280;
  font-size: 14px;
}

@media (max-width: 768px) {
  .converter-form {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .price-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>