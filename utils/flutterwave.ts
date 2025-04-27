interface FlutterwaveConfig {
  public_key: string
  tx_ref: string
  amount: number
  currency: string
  payment_options: string
  customer: {
    email: string
    phone_number: string
    name: string
  }
  customizations: {
    title: string
    description: string
    logo: string
  }
  callback: (response: any) => void
  onclose: () => void
}

export const initFlutterwave = (config: FlutterwaveConfig) => {
  // In a real implementation, you would:
  // 1. Load the Flutterwave script if not already loaded
  // 2. Initialize the payment with the provided config
  
  // For demonstration purposes, we'll just log the config
  console.log('Initializing Flutterwave payment with config:', config)
  
  // Simulate a successful payment after 2 seconds
  setTimeout(() => {
    config.callback({
      status: 'successful',
      transaction_id: Math.floor(Math.random() * 1000000).toString(),
      tx_ref: config.tx_ref
    })
  }, 2000)
}