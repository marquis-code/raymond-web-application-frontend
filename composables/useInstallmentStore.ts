import { ref } from 'vue'
import type { InstallmentPlan, InstallmentCalculation, PaymentType } from '~/types/installment'

interface CartItemWithInstallment {
  id: string
  title: string
  image: string
  price: number
  quantity: number
  size?: string
  paymentType: PaymentType
  installmentPlan?: InstallmentPlan | null
  installmentCalculation?: InstallmentCalculation | null
}

const installmentCart = ref<CartItemWithInstallment[]>([])
const defaultShippingFee = 25 // Fixed shipping fee

export const useInstallmentStore = () => {
  
  const addItemWithInstallment = (item: CartItemWithInstallment) => {
    const existingItemIndex = installmentCart.value.findIndex(
      cartItem => cartItem.id === item.id && 
                   cartItem.size === item.size && 
                   cartItem.paymentType === item.paymentType
    )
    
    if (existingItemIndex !== -1) {
      installmentCart.value[existingItemIndex].quantity += item.quantity
    } else {
      installmentCart.value.push({ ...item })
    }
  }

  const removeInstallmentItem = (id: string) => {
    const index = installmentCart.value.findIndex(item => item.id === id)
    if (index !== -1) {
      installmentCart.value.splice(index, 1)
    }
  }

  const updateInstallmentItemQuantity = (id: string, quantity: number) => {
    const item = installmentCart.value.find(item => item.id === id)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  }

  const getCartSubtotal = () => {
    return installmentCart.value.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  }

  const getCartTotalWithShipping = () => {
    return getCartSubtotal() + defaultShippingFee
  }

  const getInstallmentItems = () => {
    return installmentCart.value.filter(item => item.paymentType === 'installment')
  }

  const getFullPaymentItems = () => {
    return installmentCart.value.filter(item => item.paymentType === 'full')
  }

  const clearInstallmentCart = () => {
    installmentCart.value = []
  }

  const generateOrderPayload = (deliveryDetails: any, billingDetails: any) => {
    const subtotal = getCartSubtotal()
    const shipping = defaultShippingFee
    const tax = 0 // You can add tax calculation here
    const total = subtotal + shipping + tax

    // Group items by payment type
    const fullPaymentItems = getFullPaymentItems()
    const installmentItems = getInstallmentItems()

    // If there are installment items, we need to handle them differently
    if (installmentItems.length > 0) {
      // For now, we'll create separate orders for installment and full payment items
      // You might want to modify this based on your business logic
      
      return installmentItems.map(item => ({
        orderNumber: generateOrderNumber(),
        customer: '', // This should be filled with actual customer ID
        items: [{
          product: item.id,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        }],
        subtotal: item.price * item.quantity,
        tax: 0,
        taxRate: 0,
        shipping: shipping / installmentItems.length, // Distribute shipping among installment items
        total: (item.price * item.quantity) + (shipping / installmentItems.length),
        paymentType: 'installment' as PaymentType,
        installmentInfo: item.installmentCalculation ? {
          isInstallment: true,
          installmentPlan: item.installmentPlan?.id || '',
          numberOfInstallments: item.installmentCalculation.numberOfInstallments,
          downPayment: item.installmentCalculation.downPayment,
          installmentAmount: item.installmentCalculation.monthlyPayment,
          interestRate: item.installmentPlan?.interestRate || 0,
          totalPayable: item.installmentCalculation.totalPayable
        } : undefined,
        shippingAddress: deliveryDetails,
        billingAddress: billingDetails
      }))
    } else {
      // All items are full payment
      return [{
        orderNumber: generateOrderNumber(),
        customer: '', // This should be filled with actual customer ID
        items: fullPaymentItems.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity
        })),
        subtotal,
        tax,
        taxRate: 0,
        shipping,
        total,
        paymentType: 'full' as PaymentType,
        shippingAddress: deliveryDetails,
        billingAddress: billingDetails
      }]
    }
  }

  const generateOrderNumber = (): string => {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  }

  return {
    installmentCart: readonly(installmentCart),
    addItemWithInstallment,
    removeInstallmentItem,
    updateInstallmentItemQuantity,
    getCartSubtotal,
    getCartTotalWithShipping,
    getInstallmentItems,
    getFullPaymentItems,
    clearInstallmentCart,
    generateOrderPayload,
    defaultShippingFee
  }
}