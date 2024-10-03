"use server";

import prisma from "@/lib/prisma";
import { cache } from "react";

export const getCurrentUser = cache(
  async function getCurrentUser() {
    // Fetch the user from your MongoDB (Prisma in this case)
    const user = await prisma.user.findUnique({ where: { email } });

    // Return the user object, or null if not found
    return user;
  },
  {
    // Cache the result for 1 hour
    maxAge: 60 * 60 * 1000,
  },
);

export async function getUserWithDetails(email) {
  if (!email) {
    return { success: false, error: "No authenticated user found" };
  }

  try {
    // Fetch user data with related info from MongoDB
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        personalInfo: true,
        experiences: true,
        educations: true,
        skills: true,
        languages: true,
        courses: true,
        resumes: true,
      },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        photoURL: user.photoURL,
      },
      personalInfo: user.personalInfo,
      experiences: user.experiences,
      educations: user.educations,
      skills: user.skills,
      languages: user.languages,
      courses: user.courses,
      resumes: user.resumes,
    };
  } catch (error) {
    console.error("Error fetching user with details:", error);
    return { success: false, error: error.message };
  }
}
