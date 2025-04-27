// plugins/interswitch.client.ts
import { defineNuxtPlugin } from '#app'
import { initInterswitch } from '~/utils/interswitch'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      interswitch: initInterswitch
    }
  }
})