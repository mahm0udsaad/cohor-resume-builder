"use server";
import { verifyIdToken } from "@/firebase";
import prisma from "@/lib/prisma";

export async function storeUser(userData) {
  try {
    const { email, displayName, photoURL, picture } = userData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return;
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: displayName,
        photoURL: photoURL || picture,
        emailVerified: true,
      },
    });

    console.log(user);
    return { success: true, user };
  } catch (error) {
    console.error("Error storing user:", error);
    return { success: false, error: error.message };
  }
}

export async function verifyUserSession(token) {
  if (!token) return { user: null };

  const userData = await verifyIdToken(token);
  if (userData) {
    return { user: userData };
  } else {
    return { user: null };
  }
}
