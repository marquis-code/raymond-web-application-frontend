"use client"

import { defineNuxtRouteMiddleware, navigateTo } from "#app"
import { useUser } from "@/composables/auth/user"
import { useSocialAuth } from "@/composables/auth/useSocialAuth"

export default defineNuxtRouteMiddleware((to, from) => {
  // Initialize user if needed
  useUser().initUser()

  // Check if user is authenticated
  const { isAuthenticated } = useUser()
  const authToken = useSocialAuth().getAuthToken()

  if (!isAuthenticated.value || !authToken) {
    return navigateTo("/login")
  }
})
