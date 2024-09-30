"use server";

import { PrismaClient } from "@/prisma/generated/client";

const prisma = new PrismaClient();

export async function storeUser(userData) {
  try {
    const { email, displayName, photoURL } = userData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return;
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: displayName,
        photoURL,
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
