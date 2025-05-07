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
  plugins: ["~/plugins/aos.client.ts"],
  css: ["/assets/css/main.css"],
  modules: ['@kevinmarrec/nuxt-pwa', "@nuxtjs/tailwindcss"],
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
      meta: [
        { 
          name: 'Content-Security-Policy', 
          content: "frame-src 'self' https://maps.google.com https://*.google.com https://*.gstatic.com https://*.googleapis.com;"
        }
      ]
    }
  }
});
