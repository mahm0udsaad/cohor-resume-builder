"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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

export async function updatePersonalInfo(userId, newPersonalInfo) {
  try {
    // Step 1: Fetch the existing personalInfo
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { personalInfo: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Step 2: Merge existing personalInfo with the new data
    const updatedPersonalInfo = {
      ...user.personalInfo,
      ...newPersonalInfo, // Merge the new partial data with existing data
    };

    // Step 3: Update the user's personalInfo
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        personalInfo: {
          set: updatedPersonalInfo,
        },
      },
    });

    return { success: true, updatedUser };
  } catch (error) {
    console.error("Error updating personal info:", error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/dashboard");
  }
}

export async function addOrUpdateExperience(userId, experienceData) {
  try {
    // Validate and parse dates if provided
    const { jobTitle, company, startDate, endDate, responsibilities } =
      experienceData;

    const formattedStartDate = startDate
      ? new Date(startDate).toISOString()
      : null;
    const formattedEndDate = endDate ? new Date(endDate).toISOString() : null;

    if (
      isNaN(new Date(formattedStartDate)) ||
      (formattedEndDate && isNaN(new Date(formattedEndDate)))
    ) {
      throw new Error("Invalid date format provided");
    }

    // Step 1: Fetch the user and their experiences
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { experiences: true }, // Fetch the user's experiences
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Step 2: Check if user has existing experiences
    const existingExperiences = user.experiences || [];

    // Step 3: Add new experience or update existing one
    const updatedExperiences = [
      ...existingExperiences,
      {
        jobTitle,
        company,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        responsibilities,
      },
    ];

    // Step 4: Update the user's experiences
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        experiences: {
          set: updatedExperiences, // Use set to update the experiences field
        },
      },
    });

    return { success: true, updatedUser };
  } catch (error) {
    console.error("Error saving experience:", error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/dashboard");
  }
}
