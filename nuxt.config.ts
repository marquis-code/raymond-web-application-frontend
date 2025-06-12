import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false,
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'cursor-fx'
    }
  },
  plugins: ["~/plugins/aos.client.ts", "~/plugins/firebase.client.ts"],
  css: ["/assets/css/main.css"],
  modules: ['@kevinmarrec/nuxt-pwa', "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      apiBaseUrl: process.env.VITE_BASE_URL,
    },
  },
  pwa: {
    workbox: {
      enabled: true
    },
    meta: {
      title: "Raymond Arts | Discover Unique Artistic Expressions.",
      author: "Marquis",
      mobileAppIOS: false,
      mobileApp: true,
      description:
        "Elevating Ride Experiences",
      theme_color: "#27396B"
    },
    icon: {
      sizes: [64, 120, 144, 152, 192, 384, 512],
    },
    manifest: {
      name: "Raymond Arts | Discover Unique Artistic Expressions.",
      lang: "fa",
    },
  },
  app: {
    baseURL: process.env.DEPLOYMENT_TARGET === "s3" ? '/landing-page/' : '/',
    head: {
      title: "Raymond Arts | Visual Artist - Paintings, Drawings & Realistic Portraits",
      meta: [
        { 
          name: 'Content-Security-Policy', 
          content: "frame-src 'self' https://maps.google.com https://*.google.com https://*.gstatic.com https://*.googleapis.com;"
        },
        // SEO Meta Tags
        {
          name: 'description',
          content: 'Discover unique artistic expressions by Raymond Arts. Professional visual artist specializing in realistic portraits, paintings, drawings, and prints. Shop original art in the United States.'
        },
        {
          name: 'keywords',
          content: 'Art, United States of America, Drawings, Prints, Shop, Visual artist, Painting, Paint, Draw, Portraits, Realistic Portrait, Raymond Arts, Original Art, Custom Portraits, Fine Art'
        },
        {
          name: 'author',
          content: 'Raymond Arts'
        },
        {
          name: 'robots',
          content: 'index, follow'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'language',
          content: 'en-US'
        },
        {
          name: 'geo.region',
          content: 'US'
        },
        {
          name: 'geo.country',
          content: 'United States'
        },
        // Open Graph Tags
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:title',
          content: 'Raymond Arts | Visual Artist - Paintings, Drawings & Realistic Portraits'
        },
        {
          property: 'og:description',
          content: 'Discover unique artistic expressions by Raymond Arts. Professional visual artist specializing in realistic portraits, paintings, drawings, and prints.'
        },
        {
          property: 'og:site_name',
          content: 'Raymond Arts'
        },
        {
          property: 'og:locale',
          content: 'en_US'
        },
        // Twitter Card Tags
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:title',
          content: 'Raymond Arts | Visual Artist - Paintings, Drawings & Realistic Portraits'
        },
        {
          name: 'twitter:description',
          content: 'Discover unique artistic expressions by Raymond Arts. Professional visual artist specializing in realistic portraits, paintings, drawings, and prints.'
        },
        // Additional SEO Tags
        {
          name: 'theme-color',
          content: '#27396B'
        },
        {
          name: 'msapplication-TileColor',
          content: '#27396B'
        }
      ],
      link: [
        {
          rel: 'canonical',
          href: process.env.DEPLOYMENT_TARGET === "s3" ? 'https://your-domain.com/landing-page/' : 'https://your-domain.com/'
        }
      ]
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0' // This makes the server accessible from all network interfaces
  },
});