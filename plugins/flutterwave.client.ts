// plugins/flutterwave.client.ts
import { defineNuxtPlugin } from '#app'
import { initFlutterwave } from '~/utils/flutterwave'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      flutterwave: initFlutterwave
    }
  }
})