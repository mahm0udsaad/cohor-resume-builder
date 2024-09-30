import admin from "firebase-admin";

// Check if the Firebase app has already been initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert("cohor-resume-builder-firebase.json"),
  });
}

export const auth = admin.auth();

export async function verifyIdToken(idToken) {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return null;
  }
}

export default admin;
