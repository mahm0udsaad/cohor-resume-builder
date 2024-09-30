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
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser, true);
        const { user: verifiedUser } = await verifyUserSession(token);
        Cookies.set("session", token, { expires: 1, secure: true }); // Set session cookie for 1 day
        setUser(verifiedUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
