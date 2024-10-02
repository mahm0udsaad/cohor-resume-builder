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
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          console.log("Firebase user detected:", firebaseUser);
          const token = await getIdToken(firebaseUser, true);

          // Verify the user session
          const verifiedUserResponse = await verifyUserSession(token);
          console.log("Verified user response:", verifiedUserResponse);

          if (verifiedUserResponse && verifiedUserResponse.user) {
            const verifiedUser = {
              ...verifiedUserResponse.user,
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL,
            };

            Cookies.set("session", token, { expires: 1, secure: true });
            setUser(verifiedUser);
            console.log("User set in context:", verifiedUser);
          } else {
            console.error("Failed to verify user session");
            setUser(null);
          }
        } else {
          console.log("No Firebase user");
          Cookies.remove("session");
          setUser(null);
        }
      } catch (error) {
        console.error("Auth error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
