<!-- 
  <template>
    <section class="promo-banner mt-44">
      <div class="banner-container">
        <div class="content-overlay">
          <div class="text-content">
            <h2 class="edition-text">NEW PRINTS EDITION !!!</h2>
            <h1 class="text-5xl">NO GREATER LOVE</h1>
            <p class="discount-text">GET 50% OFF!!!!!</p>
            <button class="text-sm bg-white text-gray-900 px-6 py-3 rounded-lg" @click="handleShopClick">
              Shop Here
            </button>
          </div>
        </div>
        <div class="image-container">
          <img 
            src="@/assets/img/no-love.jpg" 
            alt="Promotional image" 
            class="banner-image"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  // Composition API setup
  const handleShopClick = () => {
    // Add your shop navigation logic here
    console.log('Shop button clicked');
    // Example: await navigateTo('/shop')
  };
  </script>
  
  <style scoped>
  .promo-banner {
    width: 100%;
    min-height: 400px;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  }
  
  .banner-container {
    position: relative;
    width: 100%;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .content-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  
  .text-content {
    text-align: center;
    color: white;
    max-width: 600px;
    padding: 0 20px;
  }
  
  .edition-text {
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 2px;
    margin-bottom: 10px;
    text-transform: uppercase;
    color: #ecf0f1;
  }
  
  .main-title {
    font-size: 3.5rem;
    font-weight: 900;
    letter-spacing: 3px;
    margin: 20px 0;
    text-transform: uppercase;
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    line-height: 1.1;
  }
  
  .discount-text {
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 20px;
    color: white;
    text-transform: uppercase;
  }
  
  .shop-button {
    background: #ffffff;
    color: #2c3e50;
    border: none;
    padding: 15px 40px;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 5px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .shop-button:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
  
  .shop-button:active {
    transform: translateY(0);
  }
  
  .image-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  
  .banner-image {
    width: 100%;
    height: 100%;
    object-position: center;
    display: block;
    vertical-align: top;
  }
  
  /* Mobile Responsive Styles */
  @media (max-width: 768px) {
    .text-content {
      padding: 0 15px;
    }
    
    .edition-text {
      font-size: 1rem;
      letter-spacing: 1px;
    }
    
    .main-title {
      font-size: 2.5rem;
      letter-spacing: 2px;
      margin: 15px 0;
    }
    
    .discount-text {
      font-size: 1.4rem;
      margin-bottom: 15px;
    }
    
    .shop-button {
      padding: 12px 30px;
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .text-content {
      padding: 0 10px;
    }
    
    .edition-text {
      font-size: 0.9rem;
    }
    
    .main-title {
    font-size: 2rem;
      letter-spacing: 1px;
    }
    
    .discount-text {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
    
    .shop-button {
      padding: 10px 25px;
      font-size: 0.9rem;
    }
  }
  
  /* Large screens */
  @media (min-width: 1200px) {
    .main-title {
      font-size: 4rem;
    }
    
    .discount-text {
      font-size: 2rem;
    }
  }
  </style> -->

  <template>
    <section class="promo-banner mt-44">
      <div class="banner-container">
        <div class="content-overlay">
          <div class="text-content">
            <h2 class="edition-text">NEW PRINTS EDITION !!!</h2>
            <h1 class="text-5xl">NO GREATER LOVE</h1>
            <p class="discount-text">GET 50% OFF!!!!!</p>
            <button class="text-sm bg-white text-gray-900 px-6 py-3 rounded-lg" @click="handleShopClick">
              Shop Here
            </button>
          </div>
        </div>
        <div class="image-container">
          <img 
            src="@/assets/img/no-love.jpg" 
            alt="Promotional image" 
            class="banner-image"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  // Composition API setup
  const handleShopClick = () => {
    // Add your shop navigation logic here
    console.log('Shop button clicked');
    // Example: await navigateTo('/shop')
  };
  </script>
  
  <style scoped>
  .promo-banner {
    width: 100%;
    min-height: 400px;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  }
  
  .banner-container {
    position: relative;
    width: 100%;
    min-width: 768px; /* Minimum width to maintain image size */
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .content-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  
  .text-content {
    text-align: center;
    color: white;
    max-width: 600px;
    padding: 0 20px;
  }
  
  .edition-text {
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 2px;
    margin-bottom: 10px;
    text-transform: uppercase;
    color: #ecf0f1;
  }
  
  .main-title {
    font-size: 3.5rem;
    font-weight: 900;
    letter-spacing: 3px;
    margin: 20px 0;
    text-transform: uppercase;
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    line-height: 1.1;
  }
  
  .discount-text {
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 20px;
    color: white;
    text-transform: uppercase;
  }
  
  .shop-button {
    background: #ffffff;
    color: #2c3e50;
    border: none;
    padding: 15px 40px;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 5px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .shop-button:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
  
  .shop-button:active {
    transform: translateY(0);
  }
  
  .image-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  
  .banner-image {
    width: 100%;
    height: 100%;
    object-position: center;
    display: block;
    vertical-align: top;
  }
  
  /* Mobile Responsive Styles */
  @media (max-width: 768px) {
    .promo-banner {
      /* Enable horizontal scrolling on mobile */
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
    }
    
    .banner-container {
      min-width: 768px; /* Keep container wide enough for image */
    }
    
    .banner-image {
      min-width: 768px; /* Prevent image shrinking */
    }
    
    .text-content {
      padding: 0 15px;
      /* Text remains centered within the scrollable area */
    }
    
    .edition-text {
      font-size: 1rem;
      letter-spacing: 1px;
    }
    
    .main-title {
      font-size: 2.5rem;
      letter-spacing: 2px;
      margin: 15px 0;
    }
    
    .discount-text {
      font-size: 1.4rem;
      margin-bottom: 15px;
    }
    
    .shop-button {
      padding: 12px 30px;
      font-size: 1rem;
    }
  }
  
  @media (max-width: 480px) {
    .promo-banner {
      /* Maintain horizontal scroll for very small screens */
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
    }
    
    .banner-container {
      min-width: 768px; /* Keep container wide */
    }
    
    .banner-image {
      min-width: 768px; /* Prevent image shrinking */
    }
    
    .text-content {
      padding: 0 10px;
    }
    
    .edition-text {
      font-size: 0.9rem;
    }
    
    .main-title {
      font-size: 2rem;
      letter-spacing: 1px;
    }
    
    .discount-text {
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
    
    .shop-button {
      padding: 10px 25px;
      font-size: 0.9rem;
    }
  }
  
  /* Large screens */
  @media (min-width: 1200px) {
    .main-title {
      font-size: 4rem;
    }
    
    .discount-text {
      font-size: 2rem;
    }
  }
  </style>