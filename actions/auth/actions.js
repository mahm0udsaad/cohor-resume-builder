// app/auth/actions.js
"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function storeUser(userData) {
  console.log(userData);
  try {
    const { email, uid, displayName, photoURL } = userData;

    const user = await prisma.users.upsert({
      where: { uid: uid },
      update: {
        email: email,
        displayName: displayName,
        photoURL: photoURL,
        emailVerified: true,
        lastLoginAt: new Date(),
      },
      create: {
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL,
        emailVerified: true,
        lastLoginAt: new Date(),
      },
    });

    return { success: true, user };
  } catch (error) {
    console.error("Error storing user:", error);
    return { success: false, error: error.message };
  }
}
