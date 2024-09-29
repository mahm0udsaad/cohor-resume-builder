"use server";

import { PrismaClient } from "@/prisma/generated/client";

const prisma = new PrismaClient();

export async function storeUser(userData) {
  try {
    const { email, displayName, photoURL } = userData;

    const user = await prisma.user.upsert({
      where: { email }, // Lookup user by email
      update: {
        name: displayName,
        photoURL: photoURL,
        emailVerified: true,
      },
      create: {
        email: email,
        name: displayName,
        photoURL: photoURL,
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
