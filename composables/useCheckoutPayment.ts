// composables/useCheckoutPayment.ts
import { ref, computed } from 'vue'
import { useFlutterwaveSDK } from "@/composables/modules/payment/useFlutterwave"
import { useCreateOrder } from "@/composables/modules/orders/useCreateOrder"
import { useRouter } from 'vue-router'

// Define interfaces based on the backend schema
interface OrderItem {
  product: string; // MongoDB ID
  quantity: number;
}

interface Address {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
}

interface CreateOrderPayload {
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
}

interface OrderResponse {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  // Add other fields returned from backend as needed
}

export function useCheckoutPayment() {
  const router = useRouter()
  
  // Get order creation functionality
  const { createOrder, loading: orderLoading } = useCreateOrder()
  
  // Get Flutterwave payment functionality
  const { handlePayment, paymentForm, loading: paymentLoading, generateTxRef } = useFlutterwaveSDK()
  
  // Store order response from backend
  const orderResponse = ref<OrderResponse | null>(null)
  const paymentError = ref<string>('')
  const orderCreationError = ref<string>('')
  const paymentComplete = ref(false)
  
  // Combined loading state
  const isLoading = computed(() => {
    return orderLoading.value || paymentLoading.value
  })
  
  // Process checkout: Create order first, then process payment
  const processCheckout = async (orderData: CreateOrderPayload) => {
    try {
      orderCreationError.value = ''
      paymentError.value = ''
      paymentComplete.value = false
      
      // 1. Create order in backend
      const response = await createOrder(orderData)
      
      if (!response || !response._id) {
        orderCreationError.value = 'Failed to create order'
        return false
      }
      
      // Store order response for reference
      orderResponse.value = response
      
      // 2. Prepare payment data
      paymentForm.value.amount = response.totalAmount
      
      // 3. Process payment with Flutterwave
      await processPayment(response)
      
      return true
    } catch (error) {
      console.error('Checkout process failed:', error)
      orderCreationError.value = error.message || 'Checkout process failed'
      return false
    }
  }
  
  // Handle payment processing
  const processPayment = async (order: OrderResponse) => {
    try {
      // Set payment amount from order response
      paymentForm.value.amount = order.totalAmount
      
      // Initiate Flutterwave payment
      // The Flutterwave SDK will handle the redirect after payment
      handlePayment()
      
      // Note: We don't need to set payment status here
      // as Flutterwave will redirect to the URL specified in callback
    } catch (error) {
      console.error('Payment processing failed:', error)
      paymentError.value = error.message || 'Payment processing failed'
    }
  }
  
  // Check payment status after redirect
  const verifyPayment = async (flw_ref: string) => {
    try {
      // In a real implementation, you would make an API call to verify payment
      // For now, we'll just set paymentComplete to true
      if (flw_ref) {
        // Example verification call
        // const verificationResult = await verifyFlutterwavePayment(flw_ref)
        
        paymentComplete.value = true
        return {
          success: true,
          flw_ref,
          orderId: orderResponse.value?._id || ''
        }
      }
      
      return {
        success: false,
        error: 'No payment reference provided'
      }
    } catch (error) {
      console.error('Payment verification failed:', error)
      return {
        success: false,
        error: error.message || 'Payment verification failed'
      }
    }
  }
  
  return {
    processCheckout,
    verifyPayment,
    orderResponse,
    isLoading,
    orderLoading,
    paymentLoading,
    orderCreationError,
    paymentError,
    paymentComplete
  }
}