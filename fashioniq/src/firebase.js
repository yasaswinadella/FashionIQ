import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCxD8HjI-XPBmv7HEEbVVmQToT7mkZ1uMQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fashioniq-36afe.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fashioniq-36afe",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fashioniq-36afe.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "624920624222",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:624920624222:web:58529624fa3a9214b048cf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;