"use client";

import { DirectionProvider } from "@radix-ui/react-direction";
import { dir } from "i18next";
import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children, lng }) {
  return (
    <SessionProvider>
      <DirectionProvider dir={dir(lng)}>{children}</DirectionProvider>
    </SessionProvider>
  );
}
