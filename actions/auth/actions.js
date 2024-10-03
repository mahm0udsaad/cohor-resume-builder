"use server";
import prisma from "@/lib/prisma";
export async function storeUser(userData) {
  try {
    const { email, name, image } = userData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return existingUser;
    }

    const user = await prisma.user.create({
      data: {
        email,
        name: name,
        image: image,
        emailVerified: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error storing user:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return { success: true, user };
    } else {
      const newUser = await prisma.user.create({
        data: { email },
      });

      return { success: true, user: newUser };
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: error.message };
  }
}
