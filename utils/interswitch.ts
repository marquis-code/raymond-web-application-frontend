// utils/interswitch.ts
interface InterswitchConfig {
    merchantCode: string
    payItemID: string
    amount: number
    customerEmail: string
    customerName: string
    customerID: string
    redirectURL: string
    txnRef: string
  }
  
  export const initInterswitch = (config: InterswitchConfig) => {
    // In a real implementation, you would:
    // 1. Load the Interswitch script if not already loaded
    // 2. Initialize the payment with the provided config
    
    // For demonstration purposes, we'll just log the config
    console.log('Initializing Interswitch payment with config:', config)
    
    // Simulate a successful payment after 2 seconds
    setTimeout(() => {
      // Redirect to the redirect URL with success parameters
      console.log('Payment successful, redirecting to:', config.redirectURL)
    }, 2000)
  }