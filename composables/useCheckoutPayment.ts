// // // composables/useCheckoutPayment.ts
// // import { ref, computed } from 'vue'
// // import { useFlutterwaveSDK } from "@/composables/modules/payment/useFlutterwave"
// // import { useCreateOrder } from "@/composables/modules/orders/useCreateOrder"
// // import { useRouter } from 'vue-router'

// // // Define interfaces based on the backend schema
// // interface OrderItem {
// //   product: string; // MongoDB ID
// //   quantity: number;
// // }

// // interface Address {
// //   firstName: string;
// //   lastName: string;
// //   address: string;
// //   city: string;
// //   state: string;
// //   country: string;
// //   postalCode: string;
// //   phone: string;
// //   email: string;
// // }

// // interface CreateOrderPayload {
// //   items: OrderItem[];
// //   shippingAddress: Address;
// //   billingAddress: Address;
// //   notes?: string;
// // }

// // interface OrderResponse {
// //   _id: string;
// //   orderNumber: string;
// //   items: OrderItem[];
// //   totalAmount: number;
// //   // Add other fields returned from backend as needed
// // }

// // export function useCheckoutPayment() {
// //   const router = useRouter()
  
// //   // Get order creation functionality
// //   const { createOrder, loading: orderLoading } = useCreateOrder()
  
// //   // Get Flutterwave payment functionality
// //   const { handlePayment, paymentForm, loading: paymentLoading, generateTxRef } = useFlutterwaveSDK()
  
// //   // Store order response from backend
// //   const orderResponse = ref<OrderResponse | null>(null)
// //   const paymentError = ref<string>('')
// //   const orderCreationError = ref<string>('')
// //   const paymentComplete = ref(false)
  
// //   // Combined loading state
// //   const isLoading = computed(() => {
// //     return orderLoading.value || paymentLoading.value
// //   })
  
// //   // Process checkout: Create order first, then process payment
// //   const processCheckout = async (orderData: CreateOrderPayload) => {
// //     try {
// //       orderCreationError.value = ''
// //       paymentError.value = ''
// //       paymentComplete.value = false
      
// //       // 1. Create order in backend
// //       const response = await createOrder(orderData)
      
// //       if (!response || !response._id) {
// //         orderCreationError.value = 'Failed to create order'
// //         return false
// //       }
      
// //       // Store order response for reference
// //       orderResponse.value = response
      
// //       // 2. Prepare payment data
// //       paymentForm.value.amount = response.totalAmount
      
// //       // 3. Process payment with Flutterwave
// //       await processPayment(response)
      
// //       return true
// //     } catch (error) {
// //       console.error('Checkout process failed:', error)
// //       orderCreationError.value = error.message || 'Checkout process failed'
// //       return false
// //     }
// //   }
  
// //   // Handle payment processing
// //   const processPayment = async (order: OrderResponse) => {
// //     try {
// //       // Set payment amount from order response
// //       paymentForm.value.amount = order.totalAmount
      
// //       // Initiate Flutterwave payment
// //       // The Flutterwave SDK will handle the redirect after payment
// //       handlePayment()
      
// //       // Note: We don't need to set payment status here
// //       // as Flutterwave will redirect to the URL specified in callback
// //     } catch (error) {
// //       console.error('Payment processing failed:', error)
// //       paymentError.value = error.message || 'Payment processing failed'
// //     }
// //   }
  
// //   // Check payment status after redirect
// //   const verifyPayment = async (flw_ref: string) => {
// //     try {
// //       // In a real implementation, you would make an API call to verify payment
// //       // For now, we'll just set paymentComplete to true
// //       if (flw_ref) {
// //         // Example verification call
// //         // const verificationResult = await verifyFlutterwavePayment(flw_ref)
        
// //         paymentComplete.value = true
// //         return {
// //           success: true,
// //           flw_ref,
// //           orderId: orderResponse.value?._id || ''
// //         }
// //       }
      
// //       return {
// //         success: false,
// //         error: 'No payment reference provided'
// //       }
// //     } catch (error) {
// //       console.error('Payment verification failed:', error)
// //       return {
// //         success: false,
// //         error: error.message || 'Payment verification failed'
// //       }
// //     }
// //   }
  
// //   return {
// //     processCheckout,
// //     verifyPayment,
// //     orderResponse,
// //     isLoading,
// //     orderLoading,
// //     paymentLoading,
// //     orderCreationError,
// //     paymentError,
// //     paymentComplete
// //   }
// // }

// import { ref, computed } from 'vue'
// import { useFlutterwaveSDK } from "@/composables/modules/payment/useFlutterwave"
// import { useCreateOrder } from "@/composables/modules/orders/useCreateOrder"
// import { useRouter } from 'vue-router'

// // Define interfaces based on the backend schema
// interface OrderItem {
//   product: string; // MongoDB ID
//   quantity: number;
//   price: number;
//   size?: string;
//   color?: string;
//   discount?: number;
//   total: number;
// }

// interface Address {
//   firstName: string;
//   lastName: string;
//   address: string;
//   city: string;
//   state: string;
//   country: string;
//   postalCode: string;
//   phone: string;
//   email: string;
// }

// interface InstallmentInfo {
//   isInstallment: boolean;
//   numberOfInstallments?: number;
//   downPayment?: number;
//   installmentAmount?: number;
//   interestRate?: number;
//   totalPayable?: number;
//   paymentFrequency?: string;
//   paymentMethod?: string;
// }

// interface CreateOrderPayload {
//   items: OrderItem[];
//   subtotal: number;
//   tax: number;
//   taxRate: number;
//   shipping: number;
//   discount?: number;
//   total: number;
//   paymentType: 'full' | 'installment';
//   installmentInfo?: InstallmentInfo;
//   shippingAddress: Address;
//   billingAddress: Address;
//   notes?: string;
//   paymentMethod: string;
//   shippingMethod?: string;
//   shippingCost?: number;
//   currency?: string;
//   source?: string;
//   metadata?: Record<string, any>;
// }

// interface OrderResponse {
//   _id: string;
//   orderNumber: string;
//   items: OrderItem[];
//   total: number;
//   paymentType: 'full' | 'installment';
//   installmentInfo?: InstallmentInfo;
//   // Add other fields returned from backend as needed
// }

// interface CheckoutData {
//   paymentType: 'full' | 'installment';
//   items: any[];
//   subtotal: number;
//   shipping: number;
//   tax: number;
//   total: number;
//   deliveryDetails: any;
//   deliveryMethod: string;
//   paymentMethod: string;
//   installmentConfig?: any;
//   immediatePayment?: number;
//   country?: any;
// }

// export function useCheckoutPayment() {
//   const router = useRouter()
  
//   // Get order creation functionality
//   const { createOrder, loading: orderLoading } = useCreateOrder()
  
//   // Get Flutterwave payment functionality
//   const { handlePayment, paymentForm, loading: paymentLoading, generateTxRef } = useFlutterwaveSDK()
  
//   // Store order response from backend
//   const orderResponse = ref<OrderResponse | null>(null)
//   const paymentError = ref<string>('')
//   const orderCreationError = ref<string>('')
//   const paymentComplete = ref(false)
  
//   // Combined loading state
//   const isLoading = computed(() => {
//     return orderLoading.value || paymentLoading.value
//   })

//   // Transform cart items to order items format
//   const transformCartItemsToOrderItems = (cartItems: any[]): OrderItem[] => {
//     return cartItems.map(item => ({
//       product: item.productId || item.id.split('-')[0], // Extract product ID
//       quantity: item.quantity,
//       price: item.price,
//       size: item.size,
//       color: item.color,
//       discount: 0, // Can be calculated if needed
//       total: item.price * item.quantity
//     }))
//   }

//   // Transform delivery details to address format
//   const transformDeliveryDetailsToAddress = (deliveryDetails: any): Address => {
//     return {
//       firstName: deliveryDetails.firstName,
//       lastName: deliveryDetails.lastName,
//       address: deliveryDetails.address,
//       city: deliveryDetails.city,
//       state: deliveryDetails.state,
//       country: deliveryDetails.country,
//       postalCode: deliveryDetails.zipCode || deliveryDetails.postalCode,
//       phone: deliveryDetails.phone,
//       email: deliveryDetails.email
//     }
//   }

//   // Transform installment config to installment info
//   const transformInstallmentConfig = (installmentConfig: any): InstallmentInfo => {
//     return {
//       isInstallment: true,
//       numberOfInstallments: parseInt(installmentConfig.numberOfInstallments),
//       downPayment: installmentConfig.downPayment,
//       installmentAmount: installmentConfig.installmentAmount || 0,
//       interestRate: installmentConfig.interestRate,
//       totalPayable: installmentConfig.totalPayable,
//       paymentFrequency: installmentConfig.paymentFrequency,
//       paymentMethod: installmentConfig.paymentMethod
//     }
//   }

//   // Process checkout: Create order first, then process payment
//   const processCheckout = async (checkoutData: CheckoutData) => {
//     try {
//       orderCreationError.value = ''
//       paymentError.value = ''
//       paymentComplete.value = false
      
//       // Transform checkout data to order payload
//       const orderItems = transformCartItemsToOrderItems(checkoutData.items)
//       const shippingAddress = transformDeliveryDetailsToAddress(checkoutData.deliveryDetails)
//       const billingAddress = shippingAddress // Use same address for billing
      
//       // Prepare base order payload
//       const orderPayload: CreateOrderPayload = {
//         items: orderItems,
//         subtotal: checkoutData.subtotal,
//         tax: checkoutData.tax,
//         taxRate: 2.5, // Default tax rate, should come from config
//         shipping: checkoutData.shipping,
//         discount: 0,
//         total: checkoutData.total,
//         paymentType: checkoutData.paymentType,
//         shippingAddress,
//         billingAddress,
//         paymentMethod: checkoutData.paymentMethod,
//         shippingMethod: checkoutData.deliveryMethod,
//         shippingCost: checkoutData.shipping,
//         currency: 'USD',
//         source: 'web',
//         metadata: {
//           country: checkoutData.country,
//           userAgent: navigator.userAgent,
//           timestamp: new Date().toISOString()
//         }
//       }

//       // Add installment info if installment payment
//       if (checkoutData.paymentType === 'installment' && checkoutData.installmentConfig) {
//         orderPayload.installmentInfo = transformInstallmentConfig(checkoutData.installmentConfig)
        
//         // For installment orders, add additional metadata
//         orderPayload.metadata = {
//           ...orderPayload.metadata,
//           installmentDetails: {
//             startDate: checkoutData.installmentConfig.startDate,
//             needsFormalAgreement: checkoutData.installmentConfig.needsFormalAgreement,
//             productSize: checkoutData.installmentConfig.productSize,
//             originalInterestRate: checkoutData.installmentConfig.interestRate
//           }
//         }
//       }
      
//       // 1. Create order in backend
//       const response = await createOrder(orderPayload)
      
//       if (!response || !response._id) {
//         orderCreationError.value = 'Failed to create order'
//         return {
//           success: false,
//           error: 'Failed to create order'
//         }
//       }
      
//       // Store order response for reference
//       orderResponse.value = response
      
//       // 2. Determine payment amount based on payment type
//       let paymentAmount = response.total
      
//       if (checkoutData.paymentType === 'installment' && checkoutData.installmentConfig) {
//         // For installment, only charge the down payment initially
//         paymentAmount = checkoutData.installmentConfig.downPayment || checkoutData.immediatePayment || 0
//       }
      
//       // 3. Process payment with Flutterwave
//       const paymentResult = await processPayment(response, paymentAmount, checkoutData.paymentType)
      
//       return {
//         success: true,
//         order: response,
//         paymentAmount,
//         paymentType: checkoutData.paymentType
//       }
//     } catch (error) {
//       console.error('Checkout process failed:', error)
//       orderCreationError.value = error.message || 'Checkout process failed'
//       return {
//         success: false,
//         error: error.message || 'Checkout process failed'
//       }
//     }
//   }
  
//   // Handle payment processing
//   const processPayment = async (order: OrderResponse, amount: number, paymentType: string) => {
//     try {
//       // Set payment amount
//       paymentForm.value.amount = amount
      
//       // Add order reference to payment form
//       paymentForm.value.tx_ref = generateTxRef()
//       paymentForm.value.meta = {
//         orderId: order._id,
//         orderNumber: order.orderNumber,
//         paymentType: paymentType,
//         ...(paymentType === 'installment' && {
//           isDownPayment: true,
//           installmentPlan: order.installmentInfo
//         })
//       }
      
//       // Initiate Flutterwave payment
//       // The Flutterwave SDK will handle the redirect after payment
//       const paymentResult = await handlePayment()
      
//       return {
//         success: true,
//         paymentReference: paymentForm.value.tx_ref,
//         amount: amount
//       }
//     } catch (error) {
//       console.error('Payment processing failed:', error)
//       paymentError.value = error.message || 'Payment processing failed'
//       return {
//         success: false,
//         error: error.message || 'Payment processing failed'
//       }
//     }
//   }
  
//   // Check payment status after redirect
//   const verifyPayment = async (flw_ref: string, tx_ref?: string) => {
//     try {
//       if (!flw_ref && !tx_ref) {
//         return {
//           success: false,
//           error: 'No payment reference provided'
//         }
//       }
      
//       // In a real implementation, you would make an API call to verify payment
//       // This should call your backend to verify with Flutterwave
//       // const verificationResult = await verifyFlutterwavePayment(flw_ref, tx_ref)
      
//       // For now, simulate successful verification
//       paymentComplete.value = true
      
//       return {
//         success: true,
//         flw_ref,
//         tx_ref,
//         orderId: orderResponse.value?._id || '',
//         orderNumber: orderResponse.value?.orderNumber || '',
//         paymentType: orderResponse.value?.paymentType || 'full'
//       }
//     } catch (error) {
//       console.error('Payment verification failed:', error)
//       return {
//         success: false,
//         error: error.message || 'Payment verification failed'
//       }
//     }
//   }

//   // Handle installment plan creation after successful down payment
//   const createInstallmentPlan = async (orderId: string, installmentConfig: any) => {
//     try {
//       // This would call your installment service to create the plan
//       // const installmentPlan = await createInstallmentPlanForOrder(orderId, installmentConfig)
      
//       console.log('Creating installment plan for order:', orderId, installmentConfig)
      
//       return {
//         success: true,
//         installmentPlanId: 'generated-plan-id',
//         message: 'Installment plan created successfully'
//       }
//     } catch (error) {
//       console.error('Failed to create installment plan:', error)
//       return {
//         success: false,
//         error: error.message || 'Failed to create installment plan'
//       }
//     }
//   }

//   // Get payment summary for display
//   const getPaymentSummary = () => {
//     if (!orderResponse.value) return null
    
//     const order = orderResponse.value
    
//     return {
//       orderNumber: order.orderNumber,
//       total: order.total,
//       paymentType: order.paymentType,
//       installmentInfo: order.installmentInfo,
//       items: order.items
//     }
//   }
  
//   return {
//     // Main functions
//     processCheckout,
//     verifyPayment,
//     createInstallmentPlan,
    
//     // Data
//     orderResponse,
//     getPaymentSummary,
    
//     // State
//     isLoading,
//     orderLoading,
//     paymentLoading,
//     orderCreationError,
//     paymentError,
//     paymentComplete,
    
//     // Payment form (for advanced usage)
//     paymentForm
//   }
// }

import { ref, computed } from 'vue'
import { useFlutterwaveSDK } from "@/composables/modules/payment/useFlutterwave"
import { useCreateOrder } from "@/composables/modules/orders/useCreateOrder"
import { useRouter } from 'vue-router'

// Define interfaces based on the backend schema
interface OrderItem {
  product: string; // MongoDB ID
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  discount?: number;
  total: number;
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

interface InstallmentInfo {
  isInstallment: boolean;
  installmentPlan?: string; // MongoDB ObjectId reference
  numberOfInstallments?: number;
  downPayment?: number;
  installmentAmount?: number;
  interestRate?: number;
  totalPayable?: number;
  paymentFrequency?: string;
  paymentMethod?: string;
}

interface CreateOrderPayload {
  // Required order items
  items: OrderItem[];
  
  // Required financial fields
  subtotal: number;
  tax: number;
  taxRate: number;
  shipping: number;
  discount?: number;
  total: number;
  
  // Required status fields
  status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' | 'returned';
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_paid';
  paymentType: 'full' | 'installment';
  
  // Installment information
  installmentInfo?: InstallmentInfo;
  
  // Transaction reference
  transaction?: string;
  
  // Required addresses
  shippingAddress: Address;
  billingAddress: Address;
  
  // Optional order details
  notes?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: Date;
  
  // Payment-related fields
  paidAmount?: number;
  refundedAmount?: number;
  paymentMethod: string;
  paymentReference?: string;
  paymentDetails?: Record<string, any>;
  
  // Shipping-related fields
  shippingMethod?: string;
  shippingCost?: number;
  shippingCarrier?: string;
  
  // Additional metadata
  metadata?: Record<string, any>;
  source?: string;
  currency?: string;
  locale?: string;
}

interface OrderResponse {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  paymentType: 'full' | 'installment';
  installmentInfo?: InstallmentInfo;
  status: string;
  paymentStatus: string;
  customer: string;
  // Add other fields returned from backend as needed
}

interface CheckoutData {
  paymentType: 'full' | 'installment';
  items: any[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  deliveryDetails: any;
  deliveryMethod: string;
  paymentMethod: string;
  installmentConfig?: any;
  immediatePayment?: number;
  country?: any;
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

  // Transform cart items to order items format
  const transformCartItemsToOrderItems = (cartItems: any[]): OrderItem[] => {
    return cartItems.map(item => {
      // Extract product ID from cart item
      let productId = item.productId
      if (!productId && item.id) {
        // If productId is not available, extract from id (format: productId-size)
        productId = item.id.includes('-') ? item.id.split('-')[0] : item.id
      }
      
      return {
        product: productId,
        quantity: item.quantity,
        price: item.price,
        size: item.size || '',
        color: item.color || '',
        discount: item.discount || 0,
        total: item.price * item.quantity
      }
    })
  }

  // Transform delivery details to address format
  const transformDeliveryDetailsToAddress = (deliveryDetails: any): Address => {
    return {
      firstName: deliveryDetails.firstName,
      lastName: deliveryDetails.lastName,
      address: deliveryDetails.address,
      city: deliveryDetails.city,
      state: deliveryDetails.state,
      country: deliveryDetails.country,
      postalCode: deliveryDetails.zipCode || deliveryDetails.postalCode,
      phone: deliveryDetails.phone,
      email: deliveryDetails.email
    }
  }

  // Transform installment config to installment info
  const transformInstallmentConfig = (installmentConfig: any): InstallmentInfo => {
    return {
      isInstallment: true,
      numberOfInstallments: parseInt(installmentConfig.numberOfInstallments),
      downPayment: parseFloat(installmentConfig.downPayment),
      installmentAmount: parseFloat(installmentConfig.installmentAmount || 0),
      interestRate: parseFloat(installmentConfig.interestRate || 0),
      totalPayable: parseFloat(installmentConfig.totalPayable || 0),
      paymentFrequency: installmentConfig.paymentFrequency,
      paymentMethod: installmentConfig.paymentMethod
    }
  }

  // Calculate tax rate from country or use default
  const getTaxRate = (country: any): number => {
    // This should come from your tax configuration
    // For now, using a default rate
    return country?.taxRate || 2.5
  }

  // Process checkout: Create order first, then process payment
  const processCheckout = async (checkoutData: CheckoutData) => {
    try {
      orderCreationError.value = ''
      paymentError.value = ''
      paymentComplete.value = false
      
      console.log('Processing checkout with data:', checkoutData)
      
      // Transform checkout data to order payload
      const orderItems = transformCartItemsToOrderItems(checkoutData.items)
      const shippingAddress = transformDeliveryDetailsToAddress(checkoutData.deliveryDetails)
      const billingAddress = shippingAddress // Use same address for billing
      const taxRate = getTaxRate(checkoutData.country)
      
      // Prepare base order payload with ALL required fields
      const orderPayload: CreateOrderPayload = {
        // Required order items
        items: orderItems,
        
        // Required financial fields
        subtotal: parseFloat(checkoutData.subtotal.toFixed(2)),
        tax: parseFloat(checkoutData.tax.toFixed(2)),
        taxRate: taxRate,
        shipping: parseFloat(checkoutData.shipping.toFixed(2)),
        discount: 0,
        total: parseFloat(checkoutData.total.toFixed(2)),
        
        // Required status fields
        status: 'pending',
        paymentStatus: 'pending',
        paymentType: checkoutData.paymentType,
        
        // Required addresses
        shippingAddress,
        billingAddress,
        
        // Payment information
        paymentMethod: checkoutData.paymentMethod,
        paidAmount: 0, // Will be updated after payment
        refundedAmount: 0,
        
        // Shipping details
        shippingMethod: checkoutData.deliveryMethod,
        shippingCost: parseFloat(checkoutData.shipping.toFixed(2)),
        shippingCarrier: checkoutData.deliveryMethod === 'express' ? 'Express Courier' : 'Standard Shipping',
        
        // Additional fields
        currency: 'USD',
        source: 'web',
        locale: 'en-US',
        
        // Notes with delivery and payment method info
        notes: `Delivery Method: ${checkoutData.deliveryMethod}, Payment Method: ${checkoutData.paymentMethod}${
          checkoutData.paymentType === 'installment' ? ', Payment Type: Installment Plan' : ''
        }`,
        
        // Metadata for additional tracking
        metadata: {
          country: checkoutData.country,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          checkoutVersion: '2.0',
          paymentType: checkoutData.paymentType,
          deliveryMethod: checkoutData.deliveryMethod,
          cartItemsCount: checkoutData.items.length,
          hasInstallmentItems: checkoutData.items.some(item => item.hasInstallmentOption)
        }
      }

      // Add installment info if installment payment
      if (checkoutData.paymentType === 'installment' && checkoutData.installmentConfig) {
        orderPayload.installmentInfo = transformInstallmentConfig(checkoutData.installmentConfig)
        
        // Set initial paid amount to down payment for installment orders
        orderPayload.paidAmount = parseFloat(checkoutData.installmentConfig.downPayment)
        orderPayload.paymentStatus = 'partially_paid'
        
        // Add installment-specific metadata
        orderPayload.metadata = {
          ...orderPayload.metadata,
          installmentDetails: {
            startDate: checkoutData.installmentConfig.startDate,
            needsFormalAgreement: checkoutData.installmentConfig.needsFormalAgreement || false,
            productSize: checkoutData.installmentConfig.productSize || orderItems[0]?.size,
            originalInterestRate: checkoutData.installmentConfig.interestRate,
            paymentFrequency: checkoutData.installmentConfig.paymentFrequency,
            calculatedAt: new Date().toISOString(),
            downPaymentPercentage: (parseFloat(checkoutData.installmentConfig.downPayment) / parseFloat(checkoutData.total.toFixed(2))) * 100
          }
        }
        
        // Update notes for installment
        orderPayload.notes += `, Installment Terms: ${orderPayload.installmentInfo.numberOfInstallments} payments of $${orderPayload.installmentInfo.installmentAmount?.toFixed(2)}`
      } else {
        // For full payment, set paid amount to total after successful payment
        orderPayload.installmentInfo = {
          isInstallment: false
        }
      }
      
      // Set estimated delivery date
      const estimatedDelivery = new Date()
      if (checkoutData.deliveryMethod === 'express') {
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 3) // 3 days for express
      } else {
        estimatedDelivery.setDate(estimatedDelivery.getDate() + 7) // 7 days for standard
      }
      orderPayload.estimatedDelivery = estimatedDelivery
      
      console.log('Sending order payload to backend:', orderPayload)
      
      // 1. Create order in backend
      const response = await createOrder(orderPayload)
      console.log(response.data._id, 'res here')
      if (!response || !response?.data?._id) {
        orderCreationError.value = 'Failed to create order'
        return {
          success: false,
          error: response?.data?.message ||'Failed to create order'
        }
      }
      
      console.log('Order created successfully:', response)
      
      // Store order response for reference
      orderResponse.value = response
      
      // 2. Determine payment amount based on payment type
      let paymentAmount = response.total
      
      if (checkoutData.paymentType === 'installment' && checkoutData.installmentConfig) {
        // For installment, only charge the down payment initially
        paymentAmount = parseFloat(checkoutData.installmentConfig.downPayment) || checkoutData.immediatePayment || 0
        console.log('Installment payment - charging down payment:', paymentAmount)
      }
      
      // 3. Process payment with Flutterwave
      const paymentResult = await processPayment(response, paymentAmount, checkoutData.paymentType)
      
      return {
        success: true,
        order: response,
        paymentAmount,
        paymentType: checkoutData.paymentType,
        paymentResult
      }
    } catch (error) {
      console.error('Checkout process failed:', error)
      const errorMessage = error?.response?.data?.message || error?.message || 'Checkout process failed'
      orderCreationError.value = errorMessage
      return {
        success: false,
        error: errorMessage
      }
    }
  }
  
  // Handle payment processing
  const processPayment = async (order: OrderResponse, amount: number, paymentType: string) => {
    console.log(order, 'order object before payment processing')
    try {
      console.log('Processing payment for order:', order.data._id, 'Amount:', amount)
      
      // Set payment amount
      paymentForm.value.amount = amount
      
      // Generate unique transaction reference
      const txRef = generateTxRef()
      paymentForm.value.tx_ref = txRef
      
      // Add order reference to payment form metadata
      paymentForm.value.meta = {
        orderId: order?.data?._id,
        orderNumber: order?.data?.orderNumber,
        paymentType: paymentType,
        ...(paymentType === 'installment' && {
          isDownPayment: true,
          installmentPlan: order?.data?.installmentInfo,
          remainingAmount: order?.data?.total - amount
        })
      }
      
      // Add customer information to payment form
      paymentForm.value.customer = {
        email: order?.data?.shippingAddress?.email || '',
        phone_number: order?.data?.shippingAddress?.phone || '',
        name: `${order?.data?.shippingAddress?.firstName || ''} ${order?.data?.shippingAddress?.lastName || ''}`.trim()
      }
      
      // Set payment title and description
      paymentForm.value.title = `Order ${order?.data?.orderNumber}`
      paymentForm.value.description = paymentType === 'installment' 
        ? `Down payment for installment order ${order?.data?.orderNumber}`
        : `Payment for order ${order?.data?.orderNumber}`
      
      console.log('Payment form configured:', paymentForm.value)
      
      // Initiate Flutterwave payment
      const paymentResult = await handlePayment(order?.data)
      
      return {
        success: true,
        paymentReference: txRef,
        amount: amount,
        paymentResult
      }
    } catch (error) {
      console.error('Payment processing failed:', error)
      paymentError.value = error.message || 'Payment processing failed'
      return {
        success: false,
        error: error.message || 'Payment processing failed'
      }
    }
  }
  
  // Check payment status after redirect
  const verifyPayment = async (flw_ref: string, tx_ref?: string) => {
    try {
      if (!flw_ref && !tx_ref) {
        return {
          success: false,
          error: 'No payment reference provided'
        }
      }
      
      console.log('Verifying payment:', { flw_ref, tx_ref })
      
      // In a real implementation, you would make an API call to verify payment
      // This should call your backend to verify with Flutterwave
      // const verificationResult = await verifyFlutterwavePayment(flw_ref, tx_ref)
      
      // For now, simulate successful verification
      paymentComplete.value = true
      
      return {
        success: true,
        flw_ref,
        tx_ref,
        orderId: orderResponse.value?._id || '',
        orderNumber: orderResponse.value?.orderNumber || '',
        paymentType: orderResponse.value?.paymentType || 'full'
      }
    } catch (error) {
      console.error('Payment verification failed:', error)
      return {
        success: false,
        error: error.message || 'Payment verification failed'
      }
    }
  }

  // Handle installment plan creation after successful down payment
  const createInstallmentPlan = async (orderId: string, installmentConfig: any) => {
    try {
      console.log('Creating installment plan for order:', orderId, installmentConfig)
      
      // This would call your installment service to create the plan
      // const installmentPlan = await createInstallmentPlanForOrder(orderId, installmentConfig)
      
      // For now, simulate successful creation
      return {
        success: true,
        installmentPlanId: `plan-${orderId}-${Date.now()}`,
        message: 'Installment plan created successfully'
      }
    } catch (error) {
      console.error('Failed to create installment plan:', error)
      return {
        success: false,
        error: error.message || 'Failed to create installment plan'
      }
    }
  }

  // Get payment summary for display
  const getPaymentSummary = () => {
    if (!orderResponse.value) return null
    
    const order = orderResponse.value
    
    return {
      orderNumber: order.orderNumber,
      total: order.total,
      paymentType: order.paymentType,
      installmentInfo: order.installmentInfo,
      items: order.items,
      paidAmount: order.paymentType === 'installment' 
        ? order.installmentInfo?.downPayment || 0 
        : order.total
    }
  }

  // Reset state for new checkout
  const resetCheckout = () => {
    orderResponse.value = null
    paymentError.value = ''
    orderCreationError.value = ''
    paymentComplete.value = false
  }
  
  return {
    // Main functions
    processCheckout,
    verifyPayment,
    createInstallmentPlan,
    resetCheckout,
    
    // Data
    orderResponse,
    getPaymentSummary,
    
    // State
    isLoading,
    orderLoading,
    paymentLoading,
    orderCreationError,
    paymentError,
    paymentComplete,
    
    // Payment form (for advanced usage)
    paymentForm
  }
}