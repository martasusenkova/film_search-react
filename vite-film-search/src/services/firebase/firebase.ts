import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";

// Build firebaseConfig from Vite env variables so config can be changed without editing source.
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY ?? "",
  authDomain: import.meta.env.VITE_FIREBASE_DOMAIN ?? "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "",
};

// Initialize and export the Firebase App so other modules can import the initialized instance.
// Keep this minimal and use env vars for configuration.
export const app = initializeApp(firebaseConfig);

/**
 * Safely initialize Firebase Analytics in the browser.
 * This is async and dynamically imports the analytics package so SSR or non-browser environments won't fail.
 * Usage: after you create the Firebase App (initializeApp), call `initAnalytics(app)`.
 */
export async function initAnalytics(app: FirebaseApp) {
  if (typeof window === "undefined") return undefined;
  if (!firebaseConfig.measurementId) return undefined;
  try {
    const mod = await import("firebase/analytics");
    return mod.getAnalytics(app);
  } catch (e) {
    console.warn("Firebase analytics failed to initialize:", e);
    return undefined;
  }
}
