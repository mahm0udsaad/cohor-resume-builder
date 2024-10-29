"use server";

import { parseDate } from "@/helper/date";
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

    // Handle "present" case for endDate
    const formattedEndDate =
      endDate === "present" ? null : new Date(endDate).toISOString();

    if (
      isNaN(new Date(formattedStartDate)) ||
      (formattedEndDate &&
        endDate !== "present" &&
        isNaN(new Date(formattedEndDate)))
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
        endDate: formattedEndDate, // Store as null if "present"
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

export async function deleteExperience(userId, experienceIndex) {
  try {
    console.log("Deleting experience:", userId, experienceIndex);

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

    if (experienceIndex < 0 || experienceIndex >= existingExperiences.length) {
      throw new Error("Invalid experience index");
    }

    // Step 3: Remove the experience at the given index
    const updatedExperiences = existingExperiences.filter(
      (_, index) => index !== experienceIndex,
    );

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
    console.error("Error deleting experience:", error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/dashboard");
  }
}

export async function updateExperience(
  userId,
  experienceIndex,
  experienceData,
) {
  try {
    console.log(
      "Updating experience:",
      userId,
      experienceIndex,
      experienceData,
    );

    // Validate and parse dates if provided
    const { jobTitle, company, startDate, endDate, responsibilities } =
      experienceData;

    const formattedStartDate = startDate
      ? new Date(startDate).toISOString()
      : null;

    // Handle "present" case for endDate
    const formattedEndDate =
      endDate === "present" ? null : new Date(endDate).toISOString();

    if (
      isNaN(new Date(formattedStartDate)) ||
      (formattedEndDate &&
        endDate !== "present" &&
        isNaN(new Date(formattedEndDate)))
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

    if (experienceIndex < 0 || experienceIndex >= existingExperiences.length) {
      throw new Error("Invalid experience index");
    }

    // Step 3: Update the experience at the given index
    const updatedExperiences = existingExperiences.map((exp, index) =>
      index === experienceIndex
        ? {
            ...exp,
            jobTitle,
            company,
            startDate: formattedStartDate,
            endDate: formattedEndDate, // Store as null if "present"
            responsibilities,
          }
        : exp,
    );

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
    console.error("Error updating experience:", error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/dashboard");
  }
}

export async function saveOnboardingData(email, data) {
  try {
    // Transform dates in experiences
    const transformedExperiences =
      data.experiences?.map((exp) => ({
        jobTitle: exp.jobTitle,
        company: exp.company,
        startDate: parseDate(exp.startDate),
        endDate: exp.endDate === "Present" ? null : parseDate(exp.endDate),
        responsibilities: exp.responsibilities,
      })) || [];

    // Transform dates in educations
    const transformedEducations =
      data.educations?.map((edu) => ({
        degree: edu.degree,
        institution: edu.institution,
        graduationDate: edu.graduationDate
          ? parseDate(edu.graduationDate)
          : null,
        gpaType: edu.gpaType,
        numericGpa: edu.numericGpa
          ? parseFloat(edu.numericGpa.toString())
          : null,
        descriptiveGpa: edu.descriptiveGpa,
      })) || [];

    // Transform dates in courses
    const transformedCourses =
      data.courses?.map((course) => ({
        name: course.name,
        institution: course.institution,
        completionDate: course.completionDate
          ? parseDate(course.completionDate)
          : null,
      })) || [];

    // Update user with all the information
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name: data.personalInfo.name,
        personalInfo: data.personalInfo,
        experiences: transformedExperiences,
        educations: transformedEducations,
        skills: data.skills || [],
        languages: data.languages || [],
        courses: transformedCourses,
      },
    });

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error saving onboarding data:", error);
    return { success: false, error: "Failed to save onboarding data" };
  } finally {
    revalidatePath("/dashboard");
  }
}
