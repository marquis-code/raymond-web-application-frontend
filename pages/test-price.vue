<!-- app.vue -->
<template>
    <div id="app">
      <header class="app-header">
        <div class="container">
          <h1>🌍 Smart Currency Converter</h1>
          <p>Automatically converts prices to your local currency</p>
        </div>
      </header>
  
      <main class="main-content">
        <div class="container">
          <!-- Product Examples -->
          <section class="products-section">
            <h2>Product Examples</h2>
            <div class="products-grid">
              <!-- <ProductPrice 
                product-name="Premium Headphones"
                :original-usd-price="50"
              />
              <ProductPrice 
                product-name="Wireless Mouse"
                :original-usd-price="25"
              />
              <ProductPrice 
                product-name="Bluetooth Speaker"
                :original-usd-price="75"
              /> -->
            </div>
          </section>
  
          <!-- How it works -->
          <section class="info-section">
            <h2>How It Works</h2>
            <div class="info-cards">
              <div class="info-card">
                <div class="icon">📍</div>
                <h3>1. Detect Location</h3>
                <p>We automatically detect your country using your IP address</p>
              </div>
              <div class="info-card">
                <div class="icon">💱</div>
                <h3>2. Get Exchange Rates</h3>
                <p>Fetch real-time exchange rates from ExchangeRate-API</p>
              </div>
              <div class="info-card">
                <div class="icon">💰</div>
                <h3>3. Convert Prices</h3>
                <p>Display prices in your local currency automatically</p>
              </div>
            </div>
          </section>
        </div>
      </main>
  
      <footer class="app-footer">
        <div class="container">
          <p>&copy; 2025 Smart Currency Converter. Powered by ExchangeRate-API.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  // Set page title
  useHead({
    title: 'Smart Currency Converter - Nuxt 3',
    meta: [
      { name: 'description', content: 'Automatically convert prices to your local currency using real-time exchange rates' }
    ]
  })
  </script>
  
  <style>
  /* Global Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8fafc;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  /* Header Styles */
  .app-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 60px 0;
    text-align: center;
  }
  
  .app-header h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 10px;
  }
  
  .app-header p {
    font-size: 1.2rem;
    opacity: 0.9;
  }
  
  /* Main Content */
  .main-content {
    padding: 60px 0;
  }
  
  .products-section {
    margin-bottom: 80px;
  }
  
  .products-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 40px;
    color: #1a202c;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }
  
  /* Info Section */
  .info-section {
    background: white;
    padding: 60px 40px;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .info-section h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 40px;
    color: #1a202c;
  }
  
  .info-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }
  
  .info-card {
    text-align: center;
    padding: 30px 20px;
    border-radius: 12px;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .info-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
  
  .info-card .icon {
    font-size: 3rem;
    margin-bottom: 20px;
  }

</style>