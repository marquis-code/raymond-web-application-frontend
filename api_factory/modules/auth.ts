// // import { GATEWAY_ENDPOINT } from "../axios.config";

// // export const auth_api = {
// //   $_login(data: any) {
// //     return GATEWAY_ENDPOINT.post("/auth/login", data);
// //   },
// //   $_signup(data: any) {
// //     return GATEWAY_ENDPOINT.post("/auth/register", data);
// //   },
// //   $_social_signin: (credential: any) => {
// // 		const url = '/auth/social-signin'
// // 		return GATEWAY_ENDPOINT.post(url, credential)
// // 	},
// // 	$_social_signup: (credential: any) => {
// // 		const url = '/auth/social-signup'
// // 		return GATEWAY_ENDPOINT.post(url, credential)
// // 	},
// // };


// import { GATEWAY_ENDPOINT } from "@/api_factory/axios.config"

// export const auth_api = {
//   $_login(data: any) {
//     return GATEWAY_ENDPOINT.post("/auth/login", data)
//   },

//   $_signup(data: any) {
//     return GATEWAY_ENDPOINT.post("/auth/register", data)
//   },

//   // Social authentication endpoints
//   $_social_verify: (data: any) => {
//     return GATEWAY_ENDPOINT.post("/auth/social-verify", data)
//   },

//   $_social_signup: (data: any) => {
//     return GATEWAY_ENDPOINT.post("/auth/social-signup", data)
//   },

//   $_logout: () => {
//     return GATEWAY_ENDPOINT.post("/auth/logout")
//   },

//   // Account management
//   $_unlink_social_account: (provider: string) => {
//     return GATEWAY_ENDPOINT.delete(`/auth/social/${provider}`)
//   },

//   $_get_profile: () => {
//     return GATEWAY_ENDPOINT.get("/auth/profile")
//   },
// }


import { GATEWAY_ENDPOINT } from "../axios.config"

export const auth_api = {
  $_login(data: any) {
    return GATEWAY_ENDPOINT.post("/auth/login", data)
  },

  $_signup(data: any) {
    return GATEWAY_ENDPOINT.post("/auth/register", data)
  },

  // Social authentication endpoints
  $_social_verify: (data: any) => {
    // Map frontend fields to backend DTO fields
    const payload = {
      email: data.email,
      provider: data.provider,
      providerId: data.uid, // Map uid to providerId
      picture: data.photoURL, // Map photoURL to picture
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }
    return GATEWAY_ENDPOINT.post("/auth/social-verify", payload)
  },

  $_social_signup: (data: any) => {
    // Map frontend fields to backend DTO fields
    const payload = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      provider: data.provider,
      providerId: data.uid, // Map uid to providerId
      picture: data.photoURL, // Map photoURL to picture
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }
    return GATEWAY_ENDPOINT.post("/auth/social-signup", payload)
  },

  $_logout: () => {
    return GATEWAY_ENDPOINT.post("/auth/logout")
  },

  // Account management
  $_unlink_social_account: (provider: string) => {
    return GATEWAY_ENDPOINT.delete(`/auth/social/${provider}`)
  },

  $_get_profile: () => {
    return GATEWAY_ENDPOINT.get("/auth/profile")
  },
}
