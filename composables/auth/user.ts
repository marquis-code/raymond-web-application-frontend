// import { ref, watch,  readonly } from "vue";
// import { useStorage } from "@vueuse/core";
// const user = ref(null);

// const runtimeData = {
//   auth: ref(),
//   user: ref({} as any),
//   token: ref(""),
//   // tempOtp: ref(''),
// };
// const localStorageData = {
//   auth: ref(),
//   user: useStorage("user", {} as any),
//   token: useStorage("token", ""),
//   // tempOtp: useStorage('tempOtp', '')
// };

// // User state (singleton pattern)
// const currentUser = ref<any>(null)
// const isAuthenticated = ref(false)

// const error = ref<string | null>(null);

// // Guard against null or undefined runtimeData.user.value
// watch(
//   runtimeData.user,
//   (val) => {
//     if (val && typeof val === "object") {
//       Object.keys(val).forEach((key) => {
//         localStorageData.user.value[key] = val[key];
//       });
//     }
//   },
//   { deep: true }
// );

// (() => {
//   runtimeData.auth.value = localStorageData.auth.value;
//   runtimeData.user.value = localStorageData.user.value;
//   runtimeData.token.value = localStorageData.token.value;
// })();

// export const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL as string;

// export const useUser = () => {
//   const id = computed({
//     get: () => runtimeData?.auth?.value?.id ?? "",
//     set: () => {},
//   });


//   const isLoggedIn = computed({
//     get: () => {
//       if (!runtimeData.token?.value) return false;
//       return (
//         runtimeData?.user?.value != null &&
//         typeof runtimeData.user.value === "object"
//       );
//     },
//     set: () => {},
//   });

//   const isEmailVerified = computed(() => {
//     return runtimeData?.user?.value.isEmailVerified;
//   });

//   const logOut = () => {
//     localStorage.clear();
//     runtimeData.user.value = null;
//     // location.href = '/login'
//   };

//   const setToken = (token: string) => {
//     runtimeData.token.value = token;
//     localStorageData.token.value = token;
//   };
//   const createUser = (user: any) => {
//     console.log(user, 'FROM CRATE USER COMPOSABLE')
//     runtimeData.user.value =  user.user;
//     localStorageData.user.value = user.user;
//     localStorageData.token.value = user?.accessToken;
//     runtimeData.token.value = user?.accessToken;

//     //     currentUser.value = userData
//     currentUser.value = user
//     isAuthenticated.value = true

//     // Store in localStorage for persistence
//     if (process.client) {
//       localStorage.setItem("user", JSON.stringify(user))
//     }
//   };

//     // Clear user session
//   const clearUser = () => {
//     currentUser.value = null
//     isAuthenticated.value = false

//     if (process.client) {
//       localStorage.removeItem("user")
//     }
//   }

//   const updateUser = (newUser: any) => {
//     // Retrieve the existing user data from local storage
//     const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
  
//     // Merge the existing user data with the new user data
//     const updatedUser = { ...existingUser, ...newUser };
  
//     // Update the runtimeData and localStorage with the new user data
//     runtimeData.user.value = updatedUser;
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//     localStorageData.user.value = updatedUser;
//   };

//     // Initialize user from localStorage
//   const initUser = () => {
//     if (process.client) {
//       const storedUser = localStorage.getItem("user")
//       if (storedUser) {
//         try {
//           currentUser.value = JSON.parse(storedUser)
//           isAuthenticated.value = true
//         } catch (e) {
//           clearUser()
//         }
//       }
//     }
//   }


//     // Get user social accounts
//   const hasSocialAccount = (provider: string) => {
//     if (!currentUser.value) return false

//     switch (provider) {
//       case "google":
//         return !!currentUser.value.googleId
//       case "facebook":
//         return !!currentUser.value.facebookId
//       case "apple":
//         return !!currentUser.value.appleId
//       default:
//         return false
//     }
//   }

//   return {
//     id,
//     isLoggedIn,
//     isEmailVerified,
//     createUser,
//     ...runtimeData,
//     logOut,
//     updateUser,
//     user: readonly(currentUser),
//     isAuthenticated: readonly(isAuthenticated),
//     setToken,
//     clearUser,
//     initUser,
//     hasSocialAccount,
//   };
// };


// // import { ref, readonly } from "vue"

// // // User state (singleton pattern)
// // const currentUser = ref<any>(null)
// // const isAuthenticated = ref(false)

// // export function useUser() {
// //   // Create user session
// //   const createUser = (userData: any) => {
// //     currentUser.value = userData
// //     isAuthenticated.value = true

// //     // Store in localStorage for persistence
// //     if (process.client) {
// //       localStorage.setItem("user", JSON.stringify(userData))
// //     }
// //   }

// //   // Clear user session
// //   const clearUser = () => {
// //     currentUser.value = null
// //     isAuthenticated.value = false

// //     if (process.client) {
// //       localStorage.removeItem("user")
// //     }
// //   }

// //   // Initialize user from localStorage
// //   const initUser = () => {
// //     if (process.client) {
// //       const storedUser = localStorage.getItem("user")
// //       if (storedUser) {
// //         try {
// //           currentUser.value = JSON.parse(storedUser)
// //           isAuthenticated.value = true
// //         } catch (e) {
// //           clearUser()
// //         }
// //       }
// //     }
// //   }

// //   // Get user social accounts
// //   const hasSocialAccount = (provider: string) => {
// //     if (!currentUser.value) return false

// //     switch (provider) {
// //       case "google":
// //         return !!currentUser.value.googleId
// //       case "facebook":
// //         return !!currentUser.value.facebookId
// //       case "apple":
// //         return !!currentUser.value.appleId
// //       default:
// //         return false
// //     }
// //   }

// //   return {
// //     user: readonly(currentUser),
// //     isAuthenticated: readonly(isAuthenticated),
// //     createUser,
// //     clearUser,
// //     initUser,
// //     hasSocialAccount,
// //   }
// // }


import { ref, watch, readonly, computed } from "vue";
import { useStorage } from "@vueuse/core";

const runtimeData = {
  auth: ref(),
  user: ref({} as any),
  token: ref(""),
};

const localStorageData = {
  auth: ref(),
  user: useStorage("user", {} as any),
  token: useStorage("token", ""),
};

// User state (singleton pattern)
const currentUser = ref<any>(null)
const isAuthenticated = ref(false)
const error = ref<string | null>(null);

// Guard against null or undefined runtimeData.user.value
watch(
  runtimeData.user,
  (val) => {
    if (val && typeof val === "object") {
      Object.keys(val).forEach((key) => {
        localStorageData.user.value[key] = val[key];
      });
    }
  },
  { deep: true }
);

// Initialize runtime data from localStorage
(() => {
  runtimeData.auth.value = localStorageData.auth.value;
  runtimeData.user.value = localStorageData.user.value;
  runtimeData.token.value = localStorageData.token.value;
  
  // Also initialize currentUser and isAuthenticated from localStorage
  if (localStorageData.user.value && Object.keys(localStorageData.user.value).length > 0) {
    currentUser.value = localStorageData.user.value;
    isAuthenticated.value = true;
  }
})();

export const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL as string;

export const useUser = () => {
  const id = computed({
    get: () => runtimeData?.auth?.value?.id ?? "",
    set: () => {},
  });

  const isLoggedIn = computed({
    get: () => {
      if (!runtimeData.token?.value) return false;
      return (
        runtimeData?.user?.value != null &&
        typeof runtimeData.user.value === "object"
      );
    },
    set: () => {},
  });

  const isEmailVerified = computed(() => {
    return runtimeData?.user?.value.isEmailVerified;
  });

  const logOut = () => {
    // Clear all storage
    localStorage.clear();
    
    // Reset runtime data
    runtimeData.user.value = null;
    runtimeData.token.value = "";
    runtimeData.auth.value = null;
    
    // Reset singleton state
    currentUser.value = null;
    isAuthenticated.value = false;
    
    // Clear localStorage data (useStorage refs)
    localStorageData.user.value = {};
    localStorageData.token.value = "";
    localStorageData.auth.value = null;
  };

  const setToken = (token: string) => {
    runtimeData.token.value = token;
    localStorageData.token.value = token;
  };

  const createUser = (user: any) => {
    console.log(user, 'FROM CREATE USER COMPOSABLE');
    
    // Determine the actual user data structure
    const userData = user.user || user; // Handle both {user: {...}} and direct user object
    const token = user.accessToken || user.token;
    
    // Update runtime data
    runtimeData.user.value = userData;
    runtimeData.token.value = token;
    
    // Update localStorage data (this will automatically sync due to useStorage)
    localStorageData.user.value = userData;
    localStorageData.token.value = token;
    
    // Update singleton state
    currentUser.value = userData;
    isAuthenticated.value = true;
    
    // Ensure localStorage is set (redundant but safe)
    if (process.client) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    }
  };

  // Clear user session
  const clearUser = () => {
    currentUser.value = null;
    isAuthenticated.value = false;
    
    // Clear runtime data
    runtimeData.user.value = null;
    runtimeData.token.value = "";
    runtimeData.auth.value = null;
    
    // Clear localStorage data
    localStorageData.user.value = {};
    localStorageData.token.value = "";
    localStorageData.auth.value = null;

    if (process.client) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  const updateUser = (newUser: any) => {
    // Get current user data from runtime
    const existingUser = runtimeData.user.value || {};
    
    // Merge the existing user data with the new user data
    const updatedUser = { ...existingUser, ...newUser };
    
    // Update all user data stores
    runtimeData.user.value = updatedUser;
    localStorageData.user.value = updatedUser;
    currentUser.value = updatedUser;
    
    // Ensure localStorage is updated
    if (process.client) {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Initialize user from localStorage
  const initUser = () => {
    if (process.client) {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          
          // Update all user data stores
          currentUser.value = userData;
          runtimeData.user.value = userData;
          localStorageData.user.value = userData;
          isAuthenticated.value = true;
          
          if (storedToken) {
            runtimeData.token.value = storedToken;
            localStorageData.token.value = storedToken;
          }
        } catch (e) {
          console.error("Error parsing stored user data:", e);
          clearUser();
        }
      }
    }
  };

  // Get user social accounts
  const hasSocialAccount = (provider: string) => {
    if (!currentUser.value) return false;

    switch (provider) {
      case "google":
        return !!currentUser.value.googleId;
      case "facebook":
        return !!currentUser.value.facebookId;
      case "apple":
        return !!currentUser.value.appleId;
      default:
        return false;
    }
  };

  return {
    id,
    isLoggedIn,
    isEmailVerified,
    createUser,
    ...runtimeData,
    logOut,
    updateUser,
    user: readonly(currentUser),
    isAuthenticated: readonly(isAuthenticated),
    setToken,
    clearUser,
    initUser,
    hasSocialAccount,
    error: readonly(error),
  };
};