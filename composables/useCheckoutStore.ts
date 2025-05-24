import { ref, reactive, computed } from "vue"
import { useFlutterwaveSDK } from "@/composables/modules/payment/useFlutterwave"
import { useRouter } from "vue-router"
import { useCreateOrder } from "@/composables/modules/orders/useCreateOrder"
import { useUpdateOrderStatus } from "@/composables/modules/orders/useUpdateOrderStatus"
import { useUser } from "@/composables/auth/user"
import { useLocalStorage } from "@/composables/useLocalStorage"

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

type DeliveryMethod = "standard" | "express" | "pickup"
type PaymentMethod = "flutterwave" | "interswitch" | "manual"

// Default values
const defaultDeliveryDetails: DeliveryDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "United States",
}

const defaultCardDetails: CardDetails = {
  cardNumber: "",
  cardName: "",
  expiryDate: "",
  cvv: "",
}

// Create reactive state
const checkoutStep = ref<number>(1)
const checkoutSummary = ref<CheckoutSummary | null>(null)
const deliveryDetails = reactive<DeliveryDetails>({ ...defaultDeliveryDetails })
const deliveryMethod = ref<DeliveryMethod>("standard")
const paymentMethod = ref<PaymentMethod>("flutterwave")
const cardDetails = reactive<CardDetails>({ ...defaultCardDetails })
const isProcessing = ref<boolean>(false)
const orderComplete = ref<boolean>(false)
const orderId = ref<string>("")
const exchangeRate = ref<number>(1)
const orderResponse = ref<any>(null)
const { loading: orderLoading, createOrder } = useCreateOrder()
const { loading, error, updateOrderStatus } = useUpdateOrderStatus()

export function useCheckoutStore() {
  const router = useRouter()
  const { isLoggedIn, user } = useUser()
  const { setItem, getItem, removeItem: removeStorageItem } = useLocalStorage()

  // Initialize the Flutterwave SDK without passing any store data initially
  const { handlePayment, paymentForm, loading: paymentLoading, generateTxRef, updateUserData } = useFlutterwaveSDK()

  // Initialize checkout with cart data
  const initializeCheckout = (summary: CheckoutSummary) => {
    checkoutSummary.value = summary

    // Restore checkout step from localStorage if available
    const savedStep = getItem("checkout-step")
    if (savedStep) {
      checkoutStep.value = Number.parseInt(savedStep)
    } else {
      checkoutStep.value = 1
    }

    orderComplete.value = false
    orderResponse.value = null

    // Restore delivery details from localStorage if available
    const savedDeliveryDetails = getItem("checkout-delivery-details")
    if (savedDeliveryDetails) {
      try {
        const parsedDetails = JSON.parse(savedDeliveryDetails)
        Object.assign(deliveryDetails, parsedDetails)
      } catch (e) {
        console.error("Failed to parse saved delivery details", e)
      }
    } else if (isLoggedIn.value && user.value) {
      // Pre-fill with user data if logged in
      deliveryDetails.firstName = user.value.firstName || ""
      deliveryDetails.lastName = user.value.lastName || ""
      deliveryDetails.email = user.value.email || ""
      deliveryDetails.phone = user.value.phone || ""
    } else {
      // Reset form data if no saved data and not logged in
      Object.assign(deliveryDetails, defaultDeliveryDetails)
    }

    // Restore delivery method from localStorage if available
    const savedDeliveryMethod = getItem("checkout-delivery-method")
    if (savedDeliveryMethod && ["standard", "express", "pickup"].includes(savedDeliveryMethod)) {
      deliveryMethod.value = savedDeliveryMethod as DeliveryMethod
    } else {
      deliveryMethod.value = "standard"
    }

    // Restore payment method from localStorage if available
    const savedPaymentMethod = getItem("checkout-payment-method")
    if (savedPaymentMethod && ["flutterwave", "interswitch", "manual"].includes(savedPaymentMethod)) {
      paymentMethod.value = savedPaymentMethod as PaymentMethod
    } else {
      paymentMethod.value = "flutterwave"
    }

    Object.assign(cardDetails, defaultCardDetails)
  }

  // Move to next step with persistence
  const nextStep = () => {
    if (checkoutStep.value < 3) {
      checkoutStep.value++
      persistCheckoutStep()
    }
  }

  // Move to previous step with persistence
  const prevStep = () => {
    if (checkoutStep.value > 1) {
      checkoutStep.value--
      persistCheckoutStep()
    }
  }

  // Set delivery method with persistence
  const setDeliveryMethod = (method: DeliveryMethod) => {
    deliveryMethod.value = method
    setItem("checkout-delivery-method", method)
  }

  // Set payment method with persistence
  const setPaymentMethod = (method: PaymentMethod) => {
    paymentMethod.value = method
    setItem("checkout-payment-method", method)
  }

  // Persist checkout step to localStorage
  const persistCheckoutStep = () => {
    setItem("checkout-step", checkoutStep.value.toString())
  }

  // Persist delivery details to localStorage
  const persistDeliveryDetails = () => {
    setItem("checkout-delivery-details", JSON.stringify(deliveryDetails))
  }

  // Clear persisted checkout data
  const clearPersistedCheckoutData = () => {
    removeStorageItem("checkout-step")
    removeStorageItem("checkout-delivery-details")
    removeStorageItem("checkout-delivery-method")
    removeStorageItem("checkout-payment-method")
    removeStorageItem("checkout-guest-mode")
  }

  // Reset checkout state
  const resetCheckout = () => {
    checkoutStep.value = 1
    orderComplete.value = false
    orderResponse.value = null

    // Reset form data
    Object.assign(deliveryDetails, defaultDeliveryDetails)
    Object.assign(cardDetails, defaultCardDetails)
    deliveryMethod.value = "standard"
    paymentMethod.value = "flutterwave"

    // Clear persisted data
    clearPersistedCheckoutData()
  }

  // Prepare order data for API call
  const prepareOrderData = (): CreateOrderDto => {
    if (!checkoutSummary.value) {
      throw new Error("Checkout summary is not initialized")
    }

    // Persist delivery details before creating order
    persistDeliveryDetails()

    // Convert cart items to order items format
    const orderItems: OrderItemDto[] = checkoutSummary.value.items.map((item) => ({
      product: item.id.toString(),
      quantity: item.quantity,
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
      email: deliveryDetails.email,
    }

    // For this implementation, we're using the same address for shipping and billing
    return {
      items: orderItems,
      shippingAddress: addressDto,
      billingAddress: addressDto,
      notes: `Delivery Method: ${deliveryMethod.value}, Payment Method: ${paymentMethod.value}`,
    }
  }

  // Process payment with Flutterwave
  const processFlutterwavePayment = async () => {
    if (!checkoutSummary.value) return

    isProcessing.value = true

    try {
      // First create the order in the backend
      const orderData = prepareOrderData()
      const res = (await createOrder(orderData)) as any
      console.log(res, "create order res")

      if (res.type !== "ERROR") {
        // Store the order response for later use
        orderResponse.value = res
        orderId.value = res?.data?.id || res?.data?._id || "INTL-ORD-" + Math.floor(Math.random() * 1000000)

        // Update user data in the Flutterwave SDK
        updateUserData({
          firstName: deliveryDetails.firstName,
          lastName: deliveryDetails.lastName,
          email: deliveryDetails.email,
          phone: deliveryDetails.phone,
        })

        // Set the payment amount in the Flutterwave form
        paymentForm.value.amount = res?.data?.total

        // Use the created order ID as transaction reference
        paymentForm.value.tx_ref = orderId.value

        // Call the Flutterwave payment handler
        await handlePayment(res?.data)

        // On successful payment, clear persisted checkout data
        if (orderComplete.value) {
          clearPersistedCheckoutData()
        }
      }
    } catch (error) {
      console.error("Order creation or payment initialization failed", error)
      isProcessing.value = false
    } finally {
      isProcessing.value = false
    }
  }

  // Process payment with Interswitch
  const processInterswitchPayment = async () => {
    if (!checkoutSummary.value) return

    isProcessing.value = true

    try {
      // First create the order in the backend
      const orderData = prepareOrderData()
      const res = (await createOrder(orderData)) as any

      if (res.type !== "ERROR") {
        // Store the order response for later use
        orderResponse.value = res
        orderId.value = res.id || res._id || "INTL-ORD-" + Math.floor(Math.random() * 1000000)

        console.warn("Interswitch payment not configured for international transactions")

        isProcessing.value = false

        // On successful payment, clear persisted checkout data
        if (orderComplete.value) {
          clearPersistedCheckoutData()
        }

        return
      }
    } catch (error) {
      console.error("Order creation or payment failed", error)
      isProcessing.value = false
    }
  }

  // Process manual payment
  const processManualPayment = async () => {
    if (!checkoutSummary.value) return

    isProcessing.value = true

    try {
      // First create the order in the backend
      const orderData = prepareOrderData()
      const res = (await createOrder(orderData)) as any

      if (res.type !== "ERROR") {
        // Store the order response for later use
        orderResponse.value = res
        orderId.value = res.id || res._id || "INTL-ORD-" + Math.floor(Math.random() * 1000000)

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000))

        orderComplete.value = true

        // On successful payment, clear persisted checkout data
        clearPersistedCheckoutData()
      }
    } catch (error) {
      console.error("Order creation or payment failed", error)
    } finally {
      isProcessing.value = false
    }
  }

  // Process payment based on selected method
  const processPayment = async () => {
    switch (paymentMethod.value) {
      case "flutterwave":
        return processFlutterwavePayment()
      case "interswitch":
        return processInterswitchPayment()
      case "manual":
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

      // Clear persisted checkout data on successful payment
      clearPersistedCheckoutData()

      return true
    }
    return false
  }

  // Watch for changes in delivery details to persist them
  const watchDeliveryDetails = () => {
    // This would be called in a component using this composable
    // We can't use watch directly in the composable function
    persistDeliveryDetails()
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
    checkPaymentStatus,
    persistDeliveryDetails,
    watchDeliveryDetails,
    resetCheckout,
  }
}
