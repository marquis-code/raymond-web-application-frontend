import { ref, reactive, computed } from 'vue'
import { useFlutterwaveSDK } from "@/composables/modules/payment/useFlutterwave"
import { useRouter } from 'vue-router'
import { useCreateOrder } from '@/composables/modules/orders/useCreateOrder'
import { useUpdateOrderStatus } from "@/composables/modules/orders/useUpdateOrderStatus"

interface CartItem {
  id: number
  title: string
  image: string
  price: number
  quantity: number
}

interface CheckoutSummary {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
}

interface DeliveryDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

interface CardDetails {
  cardNumber: string
  cardName: string
  expiryDate: string
  cvv: string
}

// Backend DTO interfaces
interface OrderItemDto {
  product: string
  quantity: number
}

interface AddressDto {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  country: string
  postalCode: string
  phone: string
  email: string
}

interface CreateOrderDto {
  items: OrderItemDto[]
  shippingAddress: AddressDto
  billingAddress: AddressDto
  notes?: string
}

type DeliveryMethod = 'standard' | 'express' | 'pickup'
type PaymentMethod = 'flutterwave' | 'interswitch' | 'manual'

// Default values
const defaultDeliveryDetails: DeliveryDetails = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States' // Changed default to United States for international focus
}

const defaultCardDetails: CardDetails = {
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: ''
}

// Create reactive state
const checkoutStep = ref<number>(1)
const checkoutSummary = ref<CheckoutSummary | null>(null)
const deliveryDetails = reactive<DeliveryDetails>({ ...defaultDeliveryDetails })
const deliveryMethod = ref<DeliveryMethod>('standard')
const paymentMethod = ref<PaymentMethod>('flutterwave') // Default to Flutterwave for international payments
const cardDetails = reactive<CardDetails>({ ...defaultCardDetails })
const isProcessing = ref<boolean>(false)
const orderComplete = ref<boolean>(false)
const orderId = ref<string>('')
const exchangeRate = ref<number>(1) // For future currency conversion needs
const orderResponse = ref<any>(null)
const { loading: orderLoading, createOrder } = useCreateOrder()
const { loading, error, updateOrderStatus, } = useUpdateOrderStatus()

export function useCheckoutStore() {
  const router = useRouter()
  // Initialize the Flutterwave SDK without passing any store data initially
  const { handlePayment, paymentForm, loading: paymentLoading, generateTxRef, updateUserData } = useFlutterwaveSDK()
  
  // Initialize checkout with cart data
  const initializeCheckout = (summary: CheckoutSummary) => {
    checkoutSummary.value = summary
    checkoutStep.value = 1
    orderComplete.value = false
    orderResponse.value = null
    
    // Reset form data
    Object.assign(deliveryDetails, defaultDeliveryDetails)
    Object.assign(cardDetails, defaultCardDetails)
    deliveryMethod.value = 'standard'
    paymentMethod.value = 'flutterwave' // Default to Flutterwave for international
  }
  
  // Move to next step
  const nextStep = () => {
    if (checkoutStep.value < 3) {
      checkoutStep.value++
    }
  }
  
  // Move to previous step
  const prevStep = () => {
    if (checkoutStep.value > 1) {
      checkoutStep.value--
    }
  }
  
  // Set delivery method
  const setDeliveryMethod = (method: DeliveryMethod) => {
    deliveryMethod.value = method
  }
  
  // Set payment method
  const setPaymentMethod = (method: PaymentMethod) => {
    paymentMethod.value = method
  }
  
  // Prepare order data for API call
  const prepareOrderData = (): CreateOrderDto => {
    if (!checkoutSummary.value) {
      throw new Error('Checkout summary is not initialized')
    }
    
    // Convert cart items to order items format
    const orderItems: OrderItemDto[] = checkoutSummary.value.items.map(item => ({
      product: item.id.toString(), // Assuming id is the product ID that needs to be sent as string
      quantity: item.quantity
    }))
    
    // Create address DTO from delivery details
    const addressDto: AddressDto = {
      firstName: deliveryDetails.firstName,
      lastName: deliveryDetails.lastName,
      address: deliveryDetails.address,
      city: deliveryDetails.city,
      state: deliveryDetails.state,
      country: deliveryDetails.country,
      postalCode: deliveryDetails.zipCode,
      phone: deliveryDetails.phone,
      email: deliveryDetails.email
    }
    
    // For this implementation, we're using the same address for shipping and billing
    return {
      items: orderItems,
      shippingAddress: addressDto,
      billingAddress: addressDto,
      notes: `Delivery Method: ${deliveryMethod.value}, Payment Method: ${paymentMethod.value}`
    }
  }
  
  // Process payment with Flutterwave
  const processFlutterwavePayment = async () => {
    if (!checkoutSummary.value) return
    
    isProcessing.value = true
    
    try {
      // First create the order in the backend
      const orderData = prepareOrderData()
      const res = await createOrder(orderData) as any
      console.log(res, 'create order res')
      
       if(res.type !== 'ERROR'){
           // Store the order response for later use
      orderResponse.value = res
      orderId.value = res?.data?.id || res?.data?._id || 'INTL-ORD-' + Math.floor(Math.random() * 1000000)
      
      // Update user data in the Flutterwave SDK
      updateUserData({
        firstName: deliveryDetails.firstName,
        lastName: deliveryDetails.lastName,
        email: deliveryDetails.email,
        phone: deliveryDetails.phone
      })
      
      // Set the payment amount in the Flutterwave form (in USD)
      // paymentForm.value.amount = checkoutSummary.value.total
      paymentForm.value.amount = res?.data?.total
      
      // Use the created order ID as transaction reference
      paymentForm.value.tx_ref = orderId.value
      
      // Call the Flutterwave payment handler for USD payment
      await handlePayment(res?.data)
       }
      
      // The isProcessing state will be turned off by the callback in handlePayment
    } catch (error) {
      console.error('Order creation or payment initialization failed', error)
      isProcessing.value = false
    }
  }
  
  // Process payment with Interswitch (kept as a backup option)
  const processInterswitchPayment = async () => {
    if (!checkoutSummary.value) return
    
    isProcessing.value = true
    
    try {
      // First create the order in the backend
      const orderData = prepareOrderData()
      const res = await createOrder(orderData) as any
      
       if(res.type !== 'ERROR'){
              // Store the order response for later use
          orderResponse.value = res
          orderId.value = res.id || res._id || 'INTL-ORD-' + Math.floor(Math.random() * 1000000)
          
          // For international transactions, we're focusing on Flutterwave
          // This method is kept as a backup but would need modification for USD
          console.warn('Interswitch payment not configured for international transactions')
          
          isProcessing.value = false
          return
       }
    } catch (error) {
      console.error('Order creation or payment failed', error)
      isProcessing.value = false
    }
  }
  
  // Process manual payment (kept as a backup option)
  const processManualPayment = async () => {
    if (!checkoutSummary.value) return
    
    isProcessing.value = true
    
    try {
      // First create the order in the backend
      const orderData = prepareOrderData()
      const res = await createOrder(orderData) as any
      
      if(res.type !== 'ERROR'){
              // Store the order response for later use
      orderResponse.value = res
      orderId.value = res.id || res._id || 'INTL-ORD-' + Math.floor(Math.random() * 1000000)
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      orderComplete.value = true
      }
    } catch (error) {
      console.error('Order creation or payment failed', error)
    } finally {
      isProcessing.value = false
    }
  }
  
  // Process payment based on selected method
  const processPayment = async () => {
    switch (paymentMethod.value) {
      case 'flutterwave':
        return processFlutterwavePayment()
      case 'interswitch':
        return processInterswitchPayment()
      case 'manual':
        return processManualPayment()
    }
  }
  
  // Check payment status - can be called after redirect from Flutterwave
  const checkPaymentStatus = (flw_ref: string) => {
    // In a real implementation, you would verify the payment with your backend
    // using the order ID (orderId.value) and flw_ref
    if (flw_ref && orderResponse.value) {
      orderComplete.value = true
      isProcessing.value = false
      return true
    }
    return false
  }
  
  return {
    checkoutStep,
    checkoutSummary,
    deliveryDetails,
    deliveryMethod,
    paymentMethod,
    cardDetails,
    isProcessing,
    orderComplete,
    orderId,
    orderResponse,
    loading: computed(() => orderLoading.value || paymentLoading.value),
    initializeCheckout,
    nextStep,
    prevStep,
    setDeliveryMethod,
    setPaymentMethod,
    processPayment,
    checkPaymentStatus
  }
}