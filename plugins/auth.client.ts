"use client"

import { defineNuxtPlugin } from "#app"
import { useUser } from "@/composables/auth/user"
import { useSocialAuth } from "@/composables/auth/useSocialAuth"

export default defineNuxtPlugin(async () => {
  // Initialize user from localStorage
  useUser().initUser()

  // Add auth token to all requests
  const authToken = useSocialAuth().getAuthToken()
  if (authToken) {
    // You can set up an axios interceptor here to add the token to all requests
    // For example:
    // $axios.onRequest((config) => {
    //   config.headers.Authorization = `Bearer ${authToken}`;
    //   return config;
    // });
  }
})
