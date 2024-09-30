import { getIdToken } from "firebase/auth";
import { auth } from "@/firebase/client";

export async function sendIdTokenToServer() {
  const user = auth.currentUser;

  if (user) {
    const idToken = await getIdToken(user, true); // Get the Firebase ID token
    const response = await fetch("/api/auth/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: idToken }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User information:", data.user);
    } else {
      console.error("Error:", data.error);
    }
  }
}
