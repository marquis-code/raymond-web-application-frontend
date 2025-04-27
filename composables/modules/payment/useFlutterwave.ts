// import { ref, computed } from 'vue'
// import { useFlutterwave } from "flutterwave-vue3"
// import { useRouter } from 'vue-router'
// import logo from "@/assets/img/logo_main.png"
// import { useCheckoutStore } from '@/composables/useCheckoutStore'

// export const useFlutterwaveSDK = () => {
//   const router = useRouter()
//   const { 
//     deliveryDetails,
//   } = useCheckoutStore()
  
//   // User information - in a real application, this would come from authentication
//   const user = ref({
//     firstname: deliveryDetails.firstName || '',
//     lastname: deliveryDetails.lastName || '',
//     email: deliveryDetails.email || '',
//     phone: deliveryDetails.phone || ''
//   })

//   const paymentForm = ref({
//     amount: "" as any,
//     orderRef: "",
//     customerEmail: "",
//     customerName: "",
//     customerPhone: ""
//   })
  
//   const loading = ref(false)
  
//   // Get computed username from user object
//   const computedUsername = computed(() => {
//     return `${user.value.firstname} ${user.value.lastname}`
//   })

//   // Generate unique transaction reference
//   const generateTxRef = () => {
//     return `intl-tx-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
//   }

//   // Handle payment with order details if provided
//   const handlePayment = (orderDetails = null) => {
//     loading.value = true
    
//     // If order details are provided, use them instead of default user info
//     const customerName = orderDetails?.customerName || computedUsername.value
//     const customerEmail = orderDetails?.customerEmail || user.value.email
//     const customerPhone = orderDetails?.customerPhone || user.value.phone
//     const txRef = orderDetails?.orderRef ? `order-${orderDetails.orderRef}` : generateTxRef()
    
//     useFlutterwave({
//       amount: Number(paymentForm.value.amount),
//       callback(data: any): void {
//         console.log(data.flw_ref, 'Payment callback received')
//         if(data.status === 'successful'){
//           loading.value = false
//           // Redirect to order summary with payment reference
//           location.href = `/${data.flw_ref}/order-summary?order=${paymentForm.value.orderRef || ''}`
//         } else {
//           loading.value = false
//           console.error('Payment was not successful')
//         }
//       },
//       // Set currency to USD for international transactions
//       currency: "USD",
//       // Allow payments from anywhere in the world
//       country: "US", 
//       customer: {
//         email: customerEmail,
//         name: customerName,
//         phone_number: customerPhone,
//       },
//       customizations: {
//         description: "International Order Payment",
//         logo: logo,
//         title: "Raymond Aworo Art",
//       },
//       meta: {
//         transaction_type: "international",
//         order_ref: paymentForm.value.orderRef || 'none',
//       },
//       onclose(): void {
//         loading.value = false
//         console.log("Payment modal closed")
//       },
//       payment_options: "card",
//       public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
//       redirect_url: undefined,
//       tx_ref: txRef,
//     })
//   }
  
//   // Set order details for payment
//   const setOrderDetails = (orderId: string, amount: number, customerDetails = null) => {
//     paymentForm.value.orderRef = orderId
//     paymentForm.value.amount = amount
    
//     if (customerDetails) {
//       paymentForm.value.customerEmail = customerDetails.email || user.value.email
//       paymentForm.value.customerName = `${customerDetails.firstName} ${customerDetails.lastName}` || computedUsername.value
//       paymentForm.value.customerPhone = customerDetails.phone || user.value.phone
//     }
//   }
  
//   return { 
//     handlePayment, 
//     paymentForm, 
//     loading,
//     generateTxRef,
//     setOrderDetails
//   }
// }

import { ref, computed } from 'vue'
import { useFlutterwave } from "flutterwave-vue3"
import { useRouter } from 'vue-router'
import logo from "@/assets/img/logo_main.png"

// Remove the circular import of useCheckoutStore

export const useFlutterwaveSDK = () => {
  const router = useRouter()
  
  // Instead of getting deliveryDetails from the store, 
  // we'll accept them as parameters when needed
  
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
  
  // Get computed username from user object
  const computedUsername = computed(() => {
    return `${user.value.firstname} ${user.value.lastname}`
  })

  // Generate unique transaction reference
  const generateTxRef = () => {
    return `intl-tx-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
  }

  // Update user data from external source (like useCheckoutStore)
  const updateUserData = (userData: { firstName?: string, lastName?: string, email?: string, phone?: string }) => {
    if (userData) {
      user.value.firstname = userData.firstName || user.value.firstname
      user.value.lastname = userData.lastName || user.value.lastname
      user.value.email = userData.email || user.value.email
      user.value.phone = userData.phone || user.value.phone
    }
  }

  // Handle payment with order details if provided
  const handlePayment = (orderDetails = null) => {
    loading.value = true
    
    // If order details are provided, use them instead of default user info
    const customerName = orderDetails?.customerName || computedUsername.value
    const customerEmail = orderDetails?.customerEmail || user.value.email
    const customerPhone = orderDetails?.customerPhone || user.value.phone
    const txRef = orderDetails?.orderRef ? `order-${orderDetails.orderRef}` : generateTxRef()
    
    useFlutterwave({
      amount: Number(paymentForm.value.amount),
      callback(data: any): void {
        console.log(data.flw_ref, 'Payment callback received')
        if(data.status === 'successful'){
          loading.value = false
          // Redirect to order summary with payment reference
          location.href = `/${data.flw_ref}/order-summary?order=${paymentForm.value.orderRef || ''}`
        } else {
          loading.value = false
          console.error('Payment was not successful')
        }
      },
      // Set currency to USD for international transactions
      currency: "USD",
      // Allow payments from anywhere in the world
      country: "US", 
      customer: {
        email: customerEmail,
        name: customerName,
        phone_number: customerPhone,
      },
      customizations: {
        description: "International Order Payment",
        logo: logo,
        title: "Raymond Aworo Art",
      },
      meta: {
        transaction_type: "international",
        order_ref: paymentForm.value.orderRef || 'none',
      },
      onclose(): void {
        loading.value = false
        console.log("Payment modal closed")
      },
      payment_options: "card",
      public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
      redirect_url: undefined,
      tx_ref: txRef,
    })
  }
  
  // Set order details for payment
  const setOrderDetails = (orderId: string, amount: number, customerDetails = null) => {
    paymentForm.value.orderRef = orderId
    paymentForm.value.amount = amount
    
    if (customerDetails) {
      paymentForm.value.customerEmail = customerDetails.email || user.value.email
      paymentForm.value.customerName = `${customerDetails.firstName} ${customerDetails.lastName}` || computedUsername.value
      paymentForm.value.customerPhone = customerDetails.phone || user.value.phone
    }
  }
  
  return { 
    handlePayment, 
    paymentForm, 
    loading,
    generateTxRef,
    setOrderDetails,
    updateUserData // Export the new method to update user data
  }
}