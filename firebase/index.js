import "server-only";

import admin from "firebase-admin";

// Check if Firebase Admin app is already initialized to avoid re-initializing
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert("admin.json"), // Auth setup using your service account
  });
}

export const auth = admin.auth();

export default admin;
