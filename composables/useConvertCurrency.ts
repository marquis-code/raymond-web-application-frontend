// composables/useCurrencyConverter.ts
import { ref, computed } from 'vue'

interface CurrencyInfo {
  code: string
  symbol: string
  name: string
}

interface CountryCurrency {
  [key: string]: CurrencyInfo
}

// Country to currency mapping
const countryCurrencyMap: CountryCurrency = {
  'US': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'CN': { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  'GB': { code: 'GBP', symbol: '£', name: 'British Pound' },
  'JP': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  'DE': { code: 'EUR', symbol: '€', name: 'Euro' },
  'FR': { code: 'EUR', symbol: '€', name: 'Euro' },
  'IT': { code: 'EUR', symbol: '€', name: 'Euro' },
  'ES': { code: 'EUR', symbol: '€', name: 'Euro' },
  'CA': { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  'AU': { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  'IN': { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  'BR': { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  'RU': { code: 'RUB', symbol: '₽', name: 'Russian Ruble' },
  'KR': { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  'MX': { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
  'ZA': { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  'NG': { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
  'EG': { code: 'EGP', symbol: '£', name: 'Egyptian Pound' },
  'SA': { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
  'AE': { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  'SG': { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  'HK': { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  'TW': { code: 'TWD', symbol: 'NT$', name: 'Taiwan Dollar' },
  'TH': { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  'MY': { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
  'PH': { code: 'PHP', symbol: '₱', name: 'Philippine Peso' },
  'ID': { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
  'VN': { code: 'VND', symbol: '₫', name: 'Vietnamese Dong' },
  'TR': { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  'IL': { code: 'ILS', symbol: '₪', name: 'Israeli Shekel' },
  'CH': { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  'NO': { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  'SE': { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  'DK': { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  'PL': { code: 'PLN', symbol: 'zł', name: 'Polish Zloty' },
  'CZ': { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  'HU': { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
  'RO': { code: 'RON', symbol: 'lei', name: 'Romanian Leu' },
  'BG': { code: 'BGN', symbol: 'лв', name: 'Bulgarian Lev' },
  'HR': { code: 'HRK', symbol: 'kn', name: 'Croatian Kuna' },
  'RS': { code: 'RSD', symbol: 'дин', name: 'Serbian Dinar' },
  'UA': { code: 'UAH', symbol: '₴', name: 'Ukrainian Hryvnia' },
  'AR': { code: 'ARS', symbol: '$', name: 'Argentine Peso' },
  'CL': { code: 'CLP', symbol: '$', name: 'Chilean Peso' },
  'CO': { code: 'COP', symbol: '$', name: 'Colombian Peso' },
  'PE': { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol' },
  'UY': { code: 'UYU', symbol: '$', name: 'Uruguayan Peso' },
  'PY': { code: 'PYG', symbol: '₲', name: 'Paraguayan Guarani' },
  'BO': { code: 'BOB', symbol: 'Bs', name: 'Bolivian Boliviano' },
  'EC': { code: 'USD', symbol: '$', name: 'US Dollar' },
  'VE': { code: 'VES', symbol: 'Bs', name: 'Venezuelan Bolívar' },
  'NZ': { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  'FJ': { code: 'FJD', symbol: 'FJ$', name: 'Fijian Dollar' },
  'PG': { code: 'PGK', symbol: 'K', name: 'Papua New Guinea Kina' },
  'IS': { code: 'ISK', symbol: 'kr', name: 'Icelandic Krona' },
  'IE': { code: 'EUR', symbol: '€', name: 'Euro' },
  'PT': { code: 'EUR', symbol: '€', name: 'Euro' },
  'GR': { code: 'EUR', symbol: '€', name: 'Euro' },
  'CY': { code: 'EUR', symbol: '€', name: 'Euro' },
  'MT': { code: 'EUR', symbol: '€', name: 'Euro' },
  'LU': { code: 'EUR', symbol: '€', name: 'Euro' },
  'BE': { code: 'EUR', symbol: '€', name: 'Euro' },
  'NL': { code: 'EUR', symbol: '€', name: 'Euro' },
  'AT': { code: 'EUR', symbol: '€', name: 'Euro' },
  'FI': { code: 'EUR', symbol: '€', name: 'Euro' },
  'EE': { code: 'EUR', symbol: '€', name: 'Euro' },
  'LV': { code: 'EUR', symbol: '€', name: 'Euro' },
  'LT': { code: 'EUR', symbol: '€', name: 'Euro' },
  'SK': { code: 'EUR', symbol: '€', name: 'Euro' },
  'SI': { code: 'EUR', symbol: '€', name: 'Euro' },
}

export const useCurrencyConverter = () => {
  const countryCode = ref<string>('US')
  const currency = ref<CurrencyInfo>(countryCurrencyMap['US'])
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Get user's country from IP geolocation
  const detectCountry = async (): Promise<void> => {
    try {
      isLoading.value = true
      error.value = null

      // Use a free IP geolocation service
      const response = await fetch('https://ipapi.co/json/')
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data')
      }

      const data = await response.json()
      
      if (data.country_code) {
        countryCode.value = data.country_code
        currency.value = countryCurrencyMap[data.country_code] || countryCurrencyMap['US']
      } else {
        // Fallback to browser locale
        const browserLocale = navigator.language || 'en-US'
        const localeCountry = browserLocale.split('-')[1]?.toUpperCase()
        
        if (localeCountry && countryCurrencyMap[localeCountry]) {
          countryCode.value = localeCountry
          currency.value = countryCurrencyMap[localeCountry]
        }
      }
    } catch (err) {
      error.value = 'Failed to detect country'
      console.error('Country detection error:', err)
      
      // Fallback to browser locale
      try {
        const browserLocale = navigator.language || 'en-US'
        const localeCountry = browserLocale.split('-')[1]?.toUpperCase()
        
        if (localeCountry && countryCurrencyMap[localeCountry]) {
          countryCode.value = localeCountry
          currency.value = countryCurrencyMap[localeCountry]
        }
      } catch (localeErr) {
        console.error('Browser locale fallback error:', localeErr)
      }
    } finally {
      isLoading.value = false
    }
  }

  // Convert number to formatted currency string
  const formatCurrency = (amount: number, options?: {
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    showSymbol?: boolean
  }): string => {
    try {
      const {
        minimumFractionDigits = 2,
        maximumFractionDigits = 2,
        showSymbol = true
      } = options || {}

      // Create locale string from country code
      const locale = `en-${countryCode.value}`

      const formatter = new Intl.NumberFormat(locale, {
        style: showSymbol ? 'currency' : 'decimal',
        currency: currency.value.code,
        minimumFractionDigits,
        maximumFractionDigits,
      })

      return formatter.format(amount)
    } catch (err) {
      console.error('Currency formatting error:', err)
      // Fallback formatting
      return `${currency.value.symbol}${amount.toFixed(2)}`
    }
  }

  // Set currency manually
  const setCurrency = (currencyCode: string): void => {
    const foundCountry = Object.entries(countryCurrencyMap).find(
      ([, currencyInfo]) => currencyInfo.code === currencyCode
    )
    
    if (foundCountry) {
      countryCode.value = foundCountry[0]
      currency.value = foundCountry[1]
    } else {
      error.value = `Currency ${currencyCode} not found`
    }
  }

  // Set country manually
  const setCountry = (country: string): void => {
    const upperCountry = country.toUpperCase()
    if (countryCurrencyMap[upperCountry]) {
      countryCode.value = upperCountry
      currency.value = countryCurrencyMap[upperCountry]
    } else {
      error.value = `Country ${country} not found`
    }
  }

  // Get all supported currencies
  const getSupportedCurrencies = (): CurrencyInfo[] => {
    const uniqueCurrencies = new Map<string, CurrencyInfo>()
    
    Object.values(countryCurrencyMap).forEach(currencyInfo => {
      uniqueCurrencies.set(currencyInfo.code, currencyInfo)
    })
    
    return Array.from(uniqueCurrencies.values())
  }

  // Get all supported countries
  const getSupportedCountries = (): { code: string; currency: CurrencyInfo }[] => {
    return Object.entries(countryCurrencyMap).map(([code, currencyInfo]) => ({
      code,
      currency: currencyInfo
    }))
  }

  // Computed properties
  const currencyCode = computed(() => currency.value.code)
  const currencySymbol = computed(() => currency.value.symbol)
  const currencyName = computed(() => currency.value.name)

  return {
    // State
    countryCode: readonly(countryCode),
    currency: readonly(currency),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Computed
    currencyCode,
    currencySymbol,
    currencyName,

    // Methods
    detectCountry,
    formatCurrency,
    setCurrency,
    setCountry,
    getSupportedCurrencies,
    getSupportedCountries,
  }
}