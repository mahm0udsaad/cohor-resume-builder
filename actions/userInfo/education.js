"use server";

import { parseDate } from "@/helper/date";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Add a new education entry
export async function addEducation(userId, educationData) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        educations: {
          push: {
            degree: educationData.degree,
            institution: educationData.institution,
            graduationDate: parseDate(educationData.graduationDate),
          },
        },
      },
      include: {
        educations: true,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: updatedUser.educations };
  } catch (error) {
    console.error("Error adding education:", error);
    return { success: false, error: error.message };
  }
}

// Update an existing education entry
export async function updateEducation(
  userId,
  educationIndex,
  updatedEducation,
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { educations: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedEducations = [...user.educations];
    updatedEducations[educationIndex] = {
      degree: updatedEducation.degree,
      institution: updatedEducation.institution,
      graduationDate: parseDate(updatedEducation.graduationDate),
    };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        educations: {
          set: updatedEducations,
        },
      },
      include: {
        educations: true,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: updatedUser.educations };
  } catch (error) {
    console.error("Error updating education:", error);
    return { success: false, error: error.message };
  }
}

// Delete an education entry
export async function deleteEducation(userId, educationIndex) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { educations: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedEducations = user.educations.filter(
      (_, index) => index !== educationIndex,
    );

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        educations: {
          set: updatedEducations,
        },
      },
      include: {
        educations: true,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: updatedUser.educations };
  } catch (error) {
    console.error("Error deleting education:", error);
    return { success: false, error: error.message };
  }
}

// Save all educations
export async function saveAllEducations(userId, educations) {
  try {
    const formattedEducations = educations.map((edu) => ({
      degree: edu.degree,
      institution: edu.institution,
      graduationDate: edu.graduationDate,
    }));

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        educations: {
          set: formattedEducations,
        },
      },
      include: {
        educations: true,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: updatedUser.educations };
  } catch (error) {
    console.error("Error saving all educations:", error);
    return { success: false, error: error.message };
  }
}
