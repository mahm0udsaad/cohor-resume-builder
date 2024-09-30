import { getAuth } from "firebase/auth";
const auth = getAuth();

export async function setTokenCookie() {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(); // Get Firebase ID token
    document.cookie = `firebaseToken=${token}; path=/`; // Store token in cookie
  }
}
