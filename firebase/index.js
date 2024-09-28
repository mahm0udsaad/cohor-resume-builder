import "server-only";

import admin from "firebase-admin";

// Check if Firebase Admin app is already initialized to avoid re-initializing
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}",
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount), // Auth setup using your service account
  });
}

export const auth = admin.auth(); // Export only the auth module for authentication

export default admin;
