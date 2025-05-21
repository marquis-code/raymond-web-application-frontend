// export const useLocalStorage = () => {
//     const setItem = (key: string, value: string): void => {
//       try {
//         if (process.client) {
//           localStorage.setItem(key, value)
//         }
//       } catch (error) {
//         console.error("Error setting localStorage item:", error)
//       }
//     }
  
//     const getItem = (key: string): string | null => {
//       try {
//         if (process.client) {
//           return localStorage.getItem(key)
//         }
//         return null
//       } catch (error) {
//         console.error("Error getting localStorage item:", error)
//         return null
//       }
//     }
  
//     const removeItem = (key: string): void => {
//       try {
//         if (process.client) {
//           localStorage.removeItem(key)
//         }
//       } catch (error) {
//         console.error("Error removing localStorage item:", error)
//       }
//     }
  
//     return {
//       setItem,
//       getItem,
//       removeItem,
//     }
//   }
  

export const useLocalStorage = () => {
    const setItem = (key: string, value: string): void => {
      try {
        if (process.client) {
          localStorage.setItem(key, value)
        }
      } catch (error) {
        console.error("Error setting localStorage item:", error)
      }
    }
  
    const getItem = (key: string): string | null => {
      try {
        if (process.client) {
          return localStorage.getItem(key)
        }
        return null
      } catch (error) {
        console.error("Error getting localStorage item:", error)
        return null
      }
    }
  
    const removeItem = (key: string): void => {
      try {
        if (process.client) {
          localStorage.removeItem(key)
        }
      } catch (error) {
        console.error("Error removing localStorage item:", error)
      }
    }
  
    return {
      setItem,
      getItem,
      removeItem,
    }
  }
  