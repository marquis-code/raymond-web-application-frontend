// composables/useCurrencyConverter.ts
export interface CurrencyConversionResult {
    convertedAmount: number
    currency: string
    exchangeRate: number
    formattedAmount: string
  }
  
  export interface ExchangeRateResponse {
    result: string
    base_code: string
    conversion_rates: Record<string, number>
    time_last_update_utc: string
  }
  
  export interface LocationResponse {
    country: string
    countryCode: string
    currency?: string
  }
  
  // Currency mapping for countries
  const COUNTRY_CURRENCY_MAP: Record<string, string> = {
    'NG': 'NGN', // Nigeria
    'US': 'USD', // United States
    'GB': 'GBP', // United Kingdom
    'CA': 'CAD', // Canada
    'AU': 'AUD', // Australia
    'IN': 'INR', // India
    'JP': 'JPY', // Japan
    'CN': 'CNY', // China
    'DE': 'EUR', // Germany
    'FR': 'EUR', // France
    'IT': 'EUR', // Italy
    'ES': 'EUR', // Spain
    'NL': 'EUR', // Netherlands
    'BE': 'EUR', // Belgium
    'AT': 'EUR', // Austria
    'IE': 'EUR', // Ireland
    'PT': 'EUR', // Portugal
    'GR': 'EUR', // Greece
    'FI': 'EUR', // Finland
    'LU': 'EUR', // Luxembourg
    'BR': 'BRL', // Brazil
    'MX': 'MXN', // Mexico
    'AR': 'ARS', // Argentina
    'CL': 'CLP', // Chile
    'CO': 'COP', // Colombia
    'PE': 'PEN', // Peru
    'ZA': 'ZAR', // South Africa
    'EG': 'EGP', // Egypt
    'MA': 'MAD', // Morocco
    'KE': 'KES', // Kenya
    'GH': 'GHS', // Ghana
    'UG': 'UGX', // Uganda
    'TZ': 'TZS', // Tanzania
    'RW': 'RWF', // Rwanda
    'ET': 'ETB', // Ethiopia
    'RU': 'RUB', // Russia
    'TR': 'TRY', // Turkey
    'SA': 'SAR', // Saudi Arabia
    'AE': 'AED', // UAE
    'IL': 'ILS', // Israel
    'EG': 'EGP', // Egypt
    'JO': 'JOD', // Jordan
    'KW': 'KWD', // Kuwait
    'QA': 'QAR', // Qatar
    'BH': 'BHD', // Bahrain
    'OM': 'OMR', // Oman
    'LB': 'LBP', // Lebanon
    'SY': 'SYP', // Syria
    'IQ': 'IQD', // Iraq
    'IR': 'IRR', // Iran
    'AF': 'AFN', // Afghanistan
    'PK': 'PKR', // Pakistan
    'BD': 'BDT', // Bangladesh
    'LK': 'LKR', // Sri Lanka
    'MM': 'MMK', // Myanmar
    'TH': 'THB', // Thailand
    'VN': 'VND', // Vietnam
    'KH': 'KHR', // Cambodia
    'LA': 'LAK', // Laos
    'MY': 'MYR', // Malaysia
    'SG': 'SGD', // Singapore
    'ID': 'IDR', // Indonesia
    'PH': 'PHP', // Philippines
    'KR': 'KRW', // South Korea
    'TW': 'TWD', // Taiwan
    'HK': 'HKD', // Hong Kong
    'MO': 'MOP', // Macau
    'NZ': 'NZD', // New Zealand
    'FJ': 'FJD', // Fiji
    'PG': 'PGK', // Papua New Guinea
    'WS': 'WST', // Samoa
    'TO': 'TOP', // Tonga
    'VU': 'VUV', // Vanuatu
    'SB': 'SBD', // Solomon Islands
  }
  
  // Currency formatting options
  const CURRENCY_FORMAT_OPTIONS: Record<string, Intl.NumberFormatOptions> = {
    'NGN': { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 },
    'USD': { style: 'currency', currency: 'USD', minimumFractionDigits: 2 },
    'GBP': { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 },
    'EUR': { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 },
    'JPY': { style: 'currency', currency: 'JPY', minimumFractionDigits: 0 },
    'INR': { style: 'currency', currency: 'INR', minimumFractionDigits: 0 },
    'CAD': { style: 'currency', currency: 'CAD', minimumFractionDigits: 2 },
    'AUD': { style: 'currency', currency: 'AUD', minimumFractionDigits: 2 },
  }
  
  export const useCurrencyConverter = () => {
    const config = useRuntimeConfig()
    const API_KEY = '63729107bf850afc2fee0ef1'
    const BASE_URL = 'https://v6.exchangerate-api.com/v6'
    
    // Reactive state
    const userCurrency = ref<string>('USD')
    const userCountry = ref<string>('US')
    const exchangeRates = ref<Record<string, number>>({})
    const isLoading = ref<boolean>(false)
    const error = ref<string | null>(null)
    const lastUpdated = ref<Date | null>(null)
  
    /**
     * Get user's location using IP geolocation
     */
    const getUserLocation = async (): Promise<LocationResponse> => {
      try {
        // Using a free IP geolocation service
        const response = await fetch('https://ipinfo.io/json/')
        const data = await response.json()
        console.log(data, 'json response here up[dated')
        
        return {
          country: data.country || 'United States',
          countryCode: data.country || data.countryCode || 'US',
          currency: data.currency || 'USD'
        }
      } catch (err) {
        console.error('Failed to get user location:', err)
        // Fallback to US
        return {
          country: 'United States',
          countryCode: 'US',
          currency: 'USD'
        }
      }
    }
  
    /**
     * Fetch exchange rates from ExchangeRate API
     */
    const fetchExchangeRates = async (baseCurrency: string = 'USD'): Promise<void> => {
      try {
        isLoading.value = true
        error.value = null
        
        const response = await fetch(`${BASE_URL}/${API_KEY}/latest/${baseCurrency}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: ExchangeRateResponse = await response.json()
        
        if (data.result === 'success') {
          exchangeRates.value = data.conversion_rates
          lastUpdated.value = new Date(data.time_last_update_utc)
        } else {
          throw new Error('Failed to fetch exchange rates')
        }
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Unknown error occurred'
        console.error('Error fetching exchange rates:', err)
      } finally {
        isLoading.value = false
      }
    }
  
    /**
     * Initialize user location and currency
     */
    const initializeUserCurrency = async (): Promise<void> => {
      try {
        const location = await getUserLocation()
        userCountry.value = location.countryCode
        
        // Get currency from country code mapping
        const currency = COUNTRY_CURRENCY_MAP[location.countryCode] || location.currency || 'USD'
        userCurrency.value = currency
        
        // Fetch exchange rates
        await fetchExchangeRates('USD')
      } catch (err) {
        console.error('Error initializing user currency:', err)
        // Fallback to USD
        userCurrency.value = 'USD'
        userCountry.value = 'US'
      }
    }
  
    /**
     * Convert amount from USD to user's currency
     */
    const convertFromUSD = (usdAmount: number, targetCurrency?: string): CurrencyConversionResult => {
      const currency = targetCurrency || userCurrency.value
      const rate = exchangeRates.value[currency] || 1
      const convertedAmount = usdAmount * rate
      
      // Format the amount based on currency
      const formatOptions = CURRENCY_FORMAT_OPTIONS[currency] || {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
      }
      
      // Get locale for formatting (fallback to en-US)
      const locale = currency === 'NGN' ? 'en-NG' : 
                    currency === 'EUR' ? 'de-DE' :
                    currency === 'GBP' ? 'en-GB' :
                    currency === 'JPY' ? 'ja-JP' :
                    currency === 'INR' ? 'en-IN' :
                    'en-US'
      
      const formattedAmount = new Intl.NumberFormat(locale, formatOptions).format(convertedAmount)
      
      return {
        convertedAmount,
        currency,
        exchangeRate: rate,
        formattedAmount
      }
    }
  
    /**
     * Convert any amount between two currencies
     */
    const convertCurrency = async (
      amount: number, 
      fromCurrency: string, 
      toCurrency: string
    ): Promise<CurrencyConversionResult> => {
      // If we don't have rates for the from currency, fetch them
      if (fromCurrency !== 'USD' && !exchangeRates.value[fromCurrency]) {
        await fetchExchangeRates(fromCurrency)
      }
      
      let convertedAmount: number
      let exchangeRate: number
      
      if (fromCurrency === 'USD') {
        // Direct conversion from USD
        exchangeRate = exchangeRates.value[toCurrency] || 1
        convertedAmount = amount * exchangeRate
      } else if (toCurrency === 'USD') {
        // Convert to USD
        exchangeRate = 1 / (exchangeRates.value[fromCurrency] || 1)
        convertedAmount = amount * exchangeRate
      } else {
        // Convert through USD
        const toUsdRate = 1 / (exchangeRates.value[fromCurrency] || 1)
        const fromUsdRate = exchangeRates.value[toCurrency] || 1
        exchangeRate = toUsdRate * fromUsdRate
        convertedAmount = amount * exchangeRate
      }
      
      // Format the amount
      const formatOptions = CURRENCY_FORMAT_OPTIONS[toCurrency] || {
        style: 'currency',
        currency: toCurrency,
        minimumFractionDigits: 2
      }
      
      const formattedAmount = new Intl.NumberFormat('en-US', formatOptions).format(convertedAmount)
      
      return {
        convertedAmount,
        currency: toCurrency,
        exchangeRate,
        formattedAmount
      }
    }
  
    /**
     * Get currency symbol for a given currency code
     */
    const getCurrencySymbol = (currencyCode: string): string => {
      const symbols: Record<string, string> = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'JPY': '¥',
        'NGN': '₦',
        'INR': '₹',
        'CAD': 'C$',
        'AUD': 'A$',
        'CNY': '¥',
        'KRW': '₩',
        'BRL': 'R$',
        'RUB': '₽'
      }
      
      return symbols[currencyCode] || currencyCode
    }
  
    /**
     * Composable return object
     */
    return {
      // State
      userCurrency: readonly(userCurrency),
      userCountry: readonly(userCountry),
      exchangeRates: readonly(exchangeRates),
      isLoading: readonly(isLoading),
      error: readonly(error),
      lastUpdated: readonly(lastUpdated),
      
      // Methods
      initializeUserCurrency,
      convertFromUSD,
      convertCurrency,
      fetchExchangeRates,
      getCurrencySymbol,
      getUserLocation
    }
  }