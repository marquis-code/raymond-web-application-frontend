import { ref } from "vue"
import { useRouter } from "vue-router"
import { auth_api } from "@/api_factory/modules/auth"
import { useUser } from "@/composables/auth/user"

export function useSocialAuth() {
  const router = useRouter()
  const socialAuthLoading = ref(false)
  const socialAuthError = ref<string | null>(null)
  const { createUser } = useUser() // Call useUser at the top level

  // Auth credentials
  const credentials = {
    idToken: ref(""),
    provider: ref(""),
    email: ref(""),
    uid: ref(""),
    displayName: ref(""),
    photoURL: ref(""),
    firstName: ref(""),
    lastName: ref(""),
    password: ref(""),
  }

  // Set auth credentials
  const setAuthCredentials = (data: any) => {
    credentials.idToken.value = data.idToken
    credentials.provider.value = data.provider
    credentials.email.value = data.email
    credentials.uid.value = data.uid
    credentials.displayName.value = data.displayName
    credentials.photoURL.value = data.photoURL
    credentials.firstName.value = data.firstName
    credentials.lastName.value = data.lastName
    credentials.password.value = data.password
  }

  // Social login (for existing users)
  const socialLogin = async () => {
    socialAuthLoading.value = true
    socialAuthError.value = null

    try {
      const response = await auth_api.$_social_verify({
        provider: credentials.provider.value,
        idToken: credentials.idToken.value,
        email: credentials.email.value,
        uid: credentials.uid.value,
        displayName: credentials.displayName.value,
        photoURL: credentials.photoURL.value,
      })

      if (response.type === "ERROR") {
        throw new Error(response.message || "Social login failed")
      }
      console.log(response.data, 'social login response gee')
      // Store user data and token
      // const { user, accessToken } = response.data
      createUser(response.data)
       // const { user, accessToken } = response.data
      // userComposable.createUser(user)
      // storeAuthToken(accessToken)
      // storeAuthToken(accessToken)

      return { success: true, data: response.data }
    } catch (err: any) {
      socialAuthError.value = err.message
      return { success: false, message: err.message }
    } finally {
      socialAuthLoading.value = false
    }
  }

  // Social signup (for new users)
  const socialSignup = async () => {
    socialAuthLoading.value = true
    socialAuthError.value = null

    try {
      const response = await auth_api.$_social_signup({
        provider: credentials.provider.value,
        idToken: credentials.idToken.value,
        email: credentials.email.value,
        firstName: credentials.firstName.value,
        lastName: credentials.lastName.value,
        password: credentials.password.value,
        picture: credentials.photoURL.value,
      })

      if (response.type === "ERROR") {
        throw new Error(response.message || "Social signup failed")
      }

      // Store user data and token
      createUser(response.data)
      // const { user, accessToken } = response.data
      // userComposable.createUser(user)
      // storeAuthToken(accessToken)

      return { success: true, data: response.data }
    } catch (err: any) {
      socialAuthError.value = err.message
      return { success: false, message: err.message }
    } finally {
      socialAuthLoading.value = false
    }
  }

  // Logout
  const logout = async () => {
    try {
      await auth_api.$_logout()
      clearAuthToken()
      userComposable.clearUser()
      return { success: true }
    } catch (err: any) {
      return { success: false, message: err.message }
    }
  }

  // Token management functions
  const storeAuthToken = (token: string) => {
    if (process.client) {
      localStorage.setItem("token", token)
    }
  }

  const getAuthToken = (): string | null => {
    if (process.client) {
      return localStorage.getItem("token")
    }
    return null
  }

  const clearAuthToken = () => {
    if (process.client) {
      localStorage.removeItem("token")
    }
  }

  return {
    credentials,
    socialAuthLoading,
    socialAuthError,
    setAuthCredentials,
    socialLogin,
    socialSignup,
    logout,
    getAuthToken,
    storeAuthToken,
    clearAuthToken,
  }
}
