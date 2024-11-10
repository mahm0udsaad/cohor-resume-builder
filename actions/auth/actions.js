"use server";
import prisma from "@/lib/prisma";
import { signIn } from "@/lib/auth";

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

export async function handleMagicLinkSignIn(email) {
  try {
    await signIn("nodemailer", { email, callbackUrl: "/dashboard" });
    return { success: true };
  } catch (error) {
    console.error("Magic link sign in failed:", error);
    return { success: false, error: "Failed to send magic link" };
  }
}
export async function googleSignIn() {
  try {
    await signIn("google");
    return { success: true };
  } catch (error) {
    console.error("Magic link sign in failed:", error);
    return { success: false, error: "Failed to send magic link" };
  }
}
export async function resendVerificationEmail(email) {
  try {
    await signIn("nodemailer", { email, callbackUrl: "/dashboard" });
    return { success: true };
  } catch (error) {
    console.error("Failed to resend verification email:", error);
    return { success: false, error: "Failed to resend verification link" };
  }
}
