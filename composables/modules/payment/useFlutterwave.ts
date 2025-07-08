import { ref, computed, onMounted } from 'vue'
import { useFlutterwave } from "flutterwave-vue3"
import { useRouter } from 'vue-router'
import logo from "@/assets/img/logo_main.png"
import { useLocalStorage } from '@/composables/useLocalStorage'
import { useUpdateOrderStatus } from "@/composables/modules/orders/useUpdateOrderStatus"
import { useVerifyPayment } from "@/composables/modules/payment/useVerifyPayment"
import { useCreateTransaction } from "@/composables/modules/transaction/useCreateTransaction"

export const useFlutterwaveSDK = () => {
  const router = useRouter()
  const { loading: processingOrder, error, updateOrderStatus } = useUpdateOrderStatus()
  const { createTransaction, loading: creatingTransaction, apiRes } = useCreateTransaction()
  const { verifyPayment, loading: processing } = useVerifyPayment()
  const { setItem, getItem, removeItem: removeStorageItem } = useLocalStorage()

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
  
// Cart items - reactive reference that loads from localStorage
const cartItems = ref([])

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

  // User information reference that will be updated through parameters
  const user = ref({
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  })

  const paymentForm = ref({
    amount: "" as any,
    orderRef: "",
    customerEmail: "",
    customerName: "",
    customerPhone: ""
  })
  
  const loading = ref(false)
  const flutterwave = ref<any>(null)
  const paymentDataRef = ref<any>(null)
  const incomingOrderDetails = ref({}) as any
  
  // Get computed username from user object
  const computedUsername = computed(() => {
    return `${user.value.firstname} ${user.value.lastname}`
  })

  // Generate unique transaction reference
  const generateTxRef = () => {
    return `usd-tx-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
  }

  // Update user data from external source
  const updateUserData = (userData: { firstName?: string, lastName?: string, email?: string, phone?: string }) => {
    if (userData) {
      user.value.firstname = userData.firstName || user.value.firstname
      user.value.lastname = userData.lastName || user.value.lastname
      user.value.email = userData.email || user.value.email
      user.value.phone = userData.phone || user.value.phone
    }
  }

  // Initialize Flutterwave - This should be called only once in the setup
  const initializeFlutterwave = () => {
    if (!paymentDataRef.value) {
      console.warn("Payment data not set before initializing Flutterwave.");
      return;
    }

    const paymentData = paymentDataRef.value;

    flutterwave.value = useFlutterwave({
      amount: Number(paymentData.amount),
      callback: async (data: any): Promise<void> => {
        console.log(data.flw_ref, 'Payment callback received')
        console.log(incomingOrderDetails.value, 'incoming order details accessed from callback')
        console.log(data, 'flutterwave data')
        
        if (data.status === 'successful') {
          try {
            loading.value = true
            
            // Create transaction object
            const transactionPayloadObj = {
              user: incomingOrderDetails.value.customer,
              type: "payment",
              amount: data.amount || paymentData.amount,
              status: "successful",
              order: incomingOrderDetails?.value?.id || incomingOrderDetails?.value?._id,
              paymentMethod: "flutterwave",
              paymentReference: data.flw_ref,
              currency: "USD", // Updated to USD
              description: `Payment for order #${incomingOrderDetails?.value?.orderNumber || data.flw_ref}`,
            }
            
            // First create the transaction
            const res = await createTransaction(transactionPayloadObj)
            console.log(res, 'response from transaction creation')

                            // Only clear cart from localStorage on successful order
                  if (process.client && localStorage) {
                    localStorage.removeItem(PERSISTENCE_KEYS.CART);
                    cartItems.value = [];
                  }
                  
                  // Clear all persisted checkout data on successful order
                  clearPersistedCheckoutData();

            // Wait for transaction creation to complete before verification
            if (apiRes?.value?.data?.transactionId) {
              const verifyPayloadObj = {
                transactionId: apiRes.value.data.transactionId,
                reference: apiRes.value.data.paymentReference
              }
              
              await verifyPayment(verifyPayloadObj)
            }
            
            // Then update the order status
            const payloadObj = {
              status: 'processing',
              notes: '',
              trackingNumber: '',
              trackingUrl: '',
              estimatedDelivery: ''
            }
            
            // Use the correct order ID
            const orderId = incomingOrderDetails.value.id || incomingOrderDetails.value._id
            
            if (orderId) {
              await updateOrderStatus(orderId, payloadObj)
              
              // Only redirect after all operations are complete
              loading.value = false
              
              // Use router.push for Vue Router navigation
              await router.push(`/order-success?tranxId=${data.flw_ref}&amount=${data.amount || paymentData.amount}`)
              
            } else {
              console.error('Order ID is missing')
              loading.value = false
            }
          } catch (error) {
            console.error('Error processing successful payment:', error)
            loading.value = false
          }
        } else {
          loading.value = false
          console.error('Payment was not successful:', data.status)
        }
      },
      currency: "USD", // Updated to USD
      country: "US", // Updated to US for USD transactions
      customer: {
        email: paymentData.customerEmail,
        name: paymentData.customerName,
        phone_number: paymentData.customerPhone,
      },
      customizations: {
        description: "Order Payment",
        logo: logo,
        title: "Raymond Aworo Art",
      },
      meta: {
        transaction_type: "international", // Changed from "local" to "international" for USD
        order_ref: paymentData.orderDetails?.orderRef || paymentForm.value.orderRef || 'none',
      },
      onclose(): void {
        loading.value = false
        console.log("Payment modal closed")
      },
      payment_options: "card,ussd,banktransfer", // Note: USD may have different payment options
      public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
      redirect_url: undefined,
      tx_ref: paymentData.tx_ref,
    })
  }

  // Handle payment with order details if provided
  const handlePayment = async (orderDetails: any = null) => {
    console.log(orderDetails, 'incoming order details')
    incomingOrderDetails.value = orderDetails
    
    try {
      loading.value = true
      
      // Validate required order details
      if (!orderDetails) {
        throw new Error('Order details are required for payment')
      }
      
      // Extract customer information with fallbacks
      const shippingAddress = orderDetails.shippingAddress || {}
      const billingAddress = orderDetails.billingAddress || {}
      
      const customerName = `${shippingAddress.firstName || billingAddress.firstName || ''} ${shippingAddress.lastName || billingAddress.lastName || ''}`.trim() || computedUsername.value
      const customerEmail = shippingAddress.email || billingAddress.email || user.value.email
      const customerPhone = shippingAddress.phone || billingAddress.phone || user.value.phone
      const txRef = orderDetails.orderNumber ? `${orderDetails.orderNumber}` : generateTxRef()
      const amount = orderDetails.paidAmount
      
      // Validate required fields
      if (!customerEmail) {
        throw new Error('Customer email is required')
      }
      if (!amount || amount <= 0) {
        throw new Error('Valid payment amount is required')
      }
      
      const paymentData = {
        amount: Number(amount),
        customerEmail: customerEmail,
        customerName: customerName,
        customerPhone: customerPhone,
        tx_ref: txRef,
        orderDetails: orderDetails
      }
      
      paymentDataRef.value = paymentData;
      
      // Initialize and trigger the payment
      initializeFlutterwave()
      console.log('initializing,,,,,')
      
      if (flutterwave.value) {
        flutterwave.value.init()
      } else {
        throw new Error('Failed to initialize Flutterwave')
      }
      
    } catch (error) {
      console.error('Error initiating payment:', error)
      loading.value = false
      // You might want to show an error message to the user here
    }
  }
  
  // Set order details for payment
  const setOrderDetails = (orderId: string, amount: number, customerDetails: any = null) => {
    paymentForm.value.orderRef = orderId
    paymentForm.value.amount = amount
    
    if (customerDetails) {
      paymentForm.value.customerEmail = customerDetails.email || user.value.email
      paymentForm.value.customerName = `${customerDetails.firstName || ''} ${customerDetails.lastName || ''}`.trim() || computedUsername.value
      paymentForm.value.customerPhone = customerDetails.phone || user.value.phone
    }
  }
  
  return { 
    handlePayment, 
    paymentForm, 
    loading,
    generateTxRef,
    setOrderDetails,
    updateUserData
  }
}