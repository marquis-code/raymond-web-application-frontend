import { ref, onMounted, readonly, nextTick } from "vue"
import { useNuxtApp, useRouter } from "#app"
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { useSocialAuth } from "@/composables/auth/useSocialAuth"
import { useUser } from "@/composables/auth/user"

export function useAuth() {
  const router = useRouter()
  const {
    socialLogin,
    socialSignup,
    setAuthCredentials,
    socialAuthLoading,
    socialAuthError,
    logout: backendLogout,
  } = useSocialAuth()
  const { createUser } = useUser()

  const user = ref<User | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)
  const initialized = ref(false)

  // Initialize auth state listener
  const initializeAuthState = async () => {
    try {
      loading.value = true
      
      // Get auth instance from Nuxt app
      const { $auth } = useNuxtApp()
      
      // Additional safety check
      if (!$auth) {
        console.error('Firebase Auth is not initialized')
        error.value = 'Firebase Auth is not initialized'
        initialized.value = true
        loading.value = false
        return
      }

      // Set up auth state listener
      const unsubscribe = onAuthStateChanged($auth, (firebaseUser) => {
        user.value = firebaseUser
        initialized.value = true
        loading.value = false
      }, (authError) => {
        console.error('Auth state change error:', authError)
        error.value = 'Authentication state error'
        initialized.value = true
        loading.value = false
      })

      // Store unsubscribe function for cleanup if needed
      return unsubscribe
    } catch (err: any) {
      console.error('Error initializing auth state:', err)
      error.value = 'Failed to initialize authentication'
      initialized.value = true
      loading.value = false
    }
  }

  onMounted(async () => {
    // Wait for next tick to ensure Nuxt app is fully initialized
    await nextTick()
    
    // Then initialize auth state
    await initializeAuthState()
  })

  const extractNameParts = (displayName: string | null | undefined) => {
    if (!displayName) {
      return { firstName: "", lastName: "" }
    }
    const nameParts = displayName.split(" ")
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(" ")
    return { firstName, lastName }
  }

  const generatePassword = () => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return password
  }

  const signIn = async (provider: GoogleAuthProvider | FacebookAuthProvider | OAuthProvider, providerName: string) => {
    try {
      // Get auth instance from Nuxt app
      const { $auth } = useNuxtApp()
      
      // Check if $auth is available
      if (!$auth) {
        throw new Error('Firebase Auth is not initialized')
      }

      loading.value = true
      error.value = null

      // Sign out any previously signed-in users before proceeding
      if (user.value) {
        await signOut($auth)
      }

      const result = await signInWithPopup($auth, provider)
      const userObj = result.user
      const token = await userObj.getIdToken()
      const { firstName, lastName } = extractNameParts(userObj?.displayName)
      const password = generatePassword()

      // Prepare auth credentials
      const authCredentials = {
        idToken: token,
        provider: providerName,
        email: userObj.email || "",
        uid: userObj.uid,
        displayName: userObj.displayName || "",
        photoURL: userObj.photoURL || "",
        firstName,
        lastName,
        password,
      }

      setAuthCredentials(authCredentials)

      // Try login first (for existing users)
      const loginResult = await socialLogin()
       console.log(loginResult, 'logon result')
      if (loginResult.success) {
        // Pass the successful login response to createUser
        await createUser(loginResult.data)
        // router.push("/dashboard")
        return loginResult
      }

      // If login fails, try signup
      const signupResult = await socialSignup()
      console.log(signupResult, 'logon result')
      if (signupResult.success) {
        // Pass the successful signup response to createUser
        await createUser(signupResult.data)

        return signupResult
        // router.push("/dashboard")
      } else {
        throw new Error(signupResult.message || "Social authentication failed")
      }
    } catch (err: any) {
      console.error("Social auth error:", err)
      error.value = err.message || "Authentication failed"
    } finally {
      loading.value = false
    }
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    provider.addScope("email")
    provider.addScope("profile")

    // Request explicit consent for permissions
    provider.setCustomParameters({ prompt: "consent" })

    const response = await signIn(provider, "google")
    return response
  }

  const signInWithFacebook = async () => {
    const provider = new FacebookAuthProvider()
    provider.addScope("email")
    provider.addScope("public_profile")

    await signIn(provider, "facebook")
  }

  const signInWithApple = async () => {
    const provider = new OAuthProvider("apple.com")
    provider.addScope("email")
    provider.addScope("name")

    await signIn(provider, "apple")
  }

  const logout = async () => {
    try {
      // Get auth instance from Nuxt app
      const { $auth } = useNuxtApp()
      
      if (!$auth) {
        throw new Error('Firebase Auth is not initialized')
      }

      loading.value = true

      // Clear backend session
      await backendLogout()

      // Sign out from Firebase
      await signOut($auth)

      // Redirect to login page
      router.push("/login")
    } catch (err: any) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    user: readonly(user),
    error: readonly(error),
    loading: readonly(loading),
    initialized: readonly(initialized),
    socialAuthLoading: readonly(socialAuthLoading),
    socialAuthError: readonly(socialAuthError),
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
    logout,
  }
}