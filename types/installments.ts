export interface InstallmentPlan {
    id: string
    name: string
    description: string
    numberOfInstallments: number
    downPaymentPercentage: number // Percentage of total price
    installmentPercentage: number // Percentage per installment
    interestRate: number
    frequency: "weekly" | "monthly" | "quarterly"
    isActive: boolean
    minOrderAmount: number
    maxOrderAmount?: number
  }
  
  export interface InstallmentCalculation {
    totalAmount: number
    downPayment: number
    installmentAmount: number
    numberOfInstallments: number
    totalPayable: number
    interestAmount: number
    schedule: InstallmentScheduleItem[]
  }
  
  export interface InstallmentScheduleItem {
    installmentNumber: number
    dueDate: Date
    amount: number
    isPaid: boolean
    paidDate?: Date
    paymentMethod?: string
  }
  
  export interface InstallmentPreferences {
    totalAmount: number
    preferredInstallments: number
    paymentFrequency: "weekly" | "monthly" | "quarterly"
    startDate: Date
    paymentMethod: "card" | "bank_transfer" | "mobile_money"
    sendInvoiceBeforePayment: boolean
    confirmationRecipient: string
    needsFormalAgreement: boolean
    notes?: string
  }
  
  export interface InstallmentConfig {
    enableInstallments: boolean
    minOrderAmount: number
    maxInstallments: number
    defaultInterestRate: number
    availableFrequencies: ("weekly" | "monthly" | "quarterly")[]
    requireDownPayment: boolean
    minDownPaymentPercentage: number
    shippingFeeHandling: "upfront" | "distributed" | "final_payment"
  }
  