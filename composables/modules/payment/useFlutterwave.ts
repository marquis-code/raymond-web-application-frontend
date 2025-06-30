import { ref, computed, onMounted } from 'vue'
import { useFlutterwave } from "flutterwave-vue3"
import { useRouter } from 'vue-router'
import logo from "@/assets/img/logo_main.png"
import { useUpdateOrderStatus } from "@/composables/modules/orders/useUpdateOrderStatus"
import { useVerifyPayment } from "@/composables/modules/payment/useVerifyPayment"
import { useCreateTransaction } from "@/composables/modules/transaction/useCreateTransaction"

export const useFlutterwaveSDK = () => {
  const router = useRouter()
  const { loading: processingOrder, error, updateOrderStatus } = useUpdateOrderStatus()
  const { createTransaction, loading: creatingTransaction, apiRes } = useCreateTransaction()
  const { verifyPayment, loading: processing } = useVerifyPayment()
  
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
    return `ngn-tx-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
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
        console.log(incomingOrderDetails, 'incoming order details accessed from callbac')
        console.log(data, 'fluttter datda')
        if (data.status === 'successful') {
          try {
            // Create transaction object
            const transactionPayloadObj = {
              user: incomingOrderDetails.value.customer,
              type: "payment",
              amount: data.order?.total || paymentData.amount,
              status: "successful",
              order: incomingOrderDetails?.value?.id || incomingOrderDetails?.value?._id,
              paymentMethod: data.order?.paymentMethod || "flutterwave",
              paymentReference: data.flw_ref || data.order?.tranxReference,
              currency: "NGN", // Changed to NGN to match the currency used in payment
              description: `Payment for order #${incomingOrderDetails?.value?.orderNumber || data.flw_ref}`,
            }
            
            // First create the transaction
            const res = await createTransaction(transactionPayloadObj)
            console.log(res, ' res from transaction creation')


                // Then update the order status
            const verifyPayloadObj = {
              transactionId: apiRes?.value?.data?.transactionId,
              reference: apiRes?.value?.data?.paymentReference
            }

            if(apiRes?.value?.data?.transactionId) {
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
              
              // Only redirect after both operations are complete
              loading.value = false
               router.push(`/order-success?tranxId=${data.flw_ref || paymentData.tx_ref}&amount=${data.amount || paymentData.amount}`)
              // Use window.location.href for a full page redirect with query parameters
              window.location.href = `/order-success?tranxId=${data.flw_ref || paymentData.tx_ref}&amount=${data.amount || paymentData.amount}`
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
          console.error('Payment was not successful')
        }
      },
      currency: "NGN",
      country: "NG", 
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
        transaction_type: "local",
        order_ref: paymentData.orderDetails?.orderRef || paymentForm.value.orderRef || 'none',
      },
      onclose(): void {
        loading.value = false
        console.log("Payment modal closed")
      },
      payment_options: "card,ussd,banktransfer",
      public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
      redirect_url: undefined,
      tx_ref: paymentData.tx_ref,
    })
  }

  // Handle payment with order details if provided
  const handlePayment = async (orderDetails: any = null) => {
    console.log(orderDetails, 'incomign order details')
    incomingOrderDetails.value = orderDetails
    try {
      loading.value = true
      
      // If order details are provided, use them instead of default user info
      const customerName = `${orderDetails?.shippingAddress.firstName} ${orderDetails?.shippingAddress.lastName}` || `${orderDetails?.billingAddress.firstName} ${orderDetails?.billingAddress.lastName}`
      const customerEmail = orderDetails?.shippingAddress.email || orderDetails?.billingAddress.email || user.value.email
      const customerPhone = orderDetails?.shippingAddress.phone || orderDetails?.billingAddress.phone || user.value.phone
      const txRef = orderDetails?.orderNumber ? `${orderDetails?.orderNumber}` : generateTxRef()
      const amount = orderDetails?.paidAmount
      
      const paymentData = {
        amount: Number(amount),
        customerEmail: customerEmail,
        customerName: customerName,
        customerPhone: customerPhone,
        tx_ref: txRef,
        orderDetails: orderDetails
      }
      
      paymentDataRef.value = paymentData;
      
      // Trigger the payment
      initializeFlutterwave()
      
      if (flutterwave.value) {
        flutterwave.value.init()
      }
    } catch (error) {
      console.error('Error initiating payment:', error)
      loading.value = false
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