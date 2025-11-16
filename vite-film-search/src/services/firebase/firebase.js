// Re-export from the TypeScript source so runtime imports that resolve to `firebase.js` still get
// the `app` and `initAnalytics` exports. This file exists to bridge any consumers importing
// `./firebase` which may resolve to this JS file in some environments.
// Re-export the TypeScript module explicitly to avoid resolving back to this file and
// creating a cycle during module resolution in the dev server.
export { firebaseConfig, app, initAnalytics } from "./firebase.ts";
