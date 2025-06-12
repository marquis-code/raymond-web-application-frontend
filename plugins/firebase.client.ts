import { defineNuxtPlugin } from '#app';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0ylGgHrPv68eiTFo06WG82LblM-Jrghk",
  authDomain: "raymondaworoarts-852f6.firebaseapp.com",
  projectId: "raymondaworoarts-852f6",
  storageBucket: "raymondaworoarts-852f6.firebasestorage.app",
  messagingSenderId: "1048971000950",
  appId: "1:1048971000950:web:e59012ff2e6418b3abb357",
  measurementId: "G-48DYQVGS23"
};

export default defineNuxtPlugin(() => {
  console.log('Firebase plugin loading...')
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const analytics = getAnalytics(firebaseApp);

  // Initialize Firebase Authentication
  const auth = getAuth(firebaseApp);
  // ... rest of your code
  console.log('Firebase plugin loaded, auth:', auth)

  // Provide Firebase and Auth services globally in the app
  return {
    provide: {
      firebaseApp,
      analytics,
      auth,
    },
  };
});