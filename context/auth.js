"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/client";
import { verifyUserSession } from "@/actions/auth/actions";
import { getIdToken } from "firebase/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthStateChanged = async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Force refresh the ID token to ensure it's up to date
          const token = await getIdToken(firebaseUser, true);
          const verifiedUserResponse = await verifyUserSession(token);
          const { user: verifiedUser } = verifiedUserResponse || {};
          Cookies.set("session", token, { expires: 1, secure: true });
          setUser(verifiedUser);
        } catch (error) {
          console.error("Error verifying user session:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged(handleAuthStateChanged);

    // Optionally, refresh user data when token cookie changes
    const interval = setInterval(async () => {
      const token = Cookies.get("session");
      if (token) {
        const verifiedUserResponse = await verifyUserSession(token);
        const { user: verifiedUser } = verifiedUserResponse || {};
        setUser(verifiedUser); // Update user state if session cookie changes
      }
    }, 60000); // Refresh every 1 minute

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
