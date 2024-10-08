"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addResumeToUser(email, resumeName) {
  try {
    // Find the user by ID to ensure they exist
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Check if the user already has a resume with the given name
    const existingResume = await prisma.resume.findFirst({
      where: { name: resumeName, userId: user.id },
    });

    if (existingResume) {
      return { success: true, resume: existingResume };
    }

    // Add a new resume entry to the user's resumes list
    const updatedUser = await prisma.resume.create({
      data: {
        name: resumeName, // Set the name of the resume template
        user: {
          connect: { email }, // Associate the resume with the user
        },
      },
    });

    return { success: true, resume: updatedUser };
  } catch (error) {
    console.error("Error adding resume:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserResumes(userId) {
  try {
    const resumes = await prisma.resume.findMany({
      where: { userId },
      include: {
        theme: true,
      },
    });

    return resumes || [];
  } catch (error) {
    console.error("Error getting user resumes:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getResume(email, resumeName) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const resume = await prisma.resume.findFirst({
      where: { userId: user.id, name: resumeName },
      include: {
        theme: true,
      },
    });

    return resume || {};
  } catch (error) {
    console.error("Error getting resume:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteResume(formData) {
  try {
    const resumeId = formData.get("resumeId");
    const email = formData.get("email");

    if (!resumeId || !email) {
      return { success: false, error: "Invalid form data" };
    }

    const deletedResume = await prisma.resume.delete({
      where: { id: resumeId },
    });

    await prisma.user.update({
      where: { email: email },
      data: {
        resumes: {
          set: {
            id: {
              notIn: [resumeId],
            },
          },
        },
      },
    });

    return deletedResume || {};
  } catch (error) {
    console.error("Error deleting resume:", error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/dashboard");
    await prisma.$disconnect();
  }
}

// Helper function to parse and validate dates
const parseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date.toISOString();
};

// Function to update or create user resume data
export const updateUserResumeData = async (
  userEmail,
  resumeName,
  updatedResumeData,
) => {
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the resume already exists for the user
    const existingResume = await prisma.resume.findFirst({
      where: {
        userId: user.id,
        name: resumeName,
      },
    });

    // Ensure date fields are properly formatted
    const formattedResumeData = {
      ...updatedResumeData,
      experiences: updatedResumeData.experiences?.map((experience) => ({
        ...experience,
        startDate: parseDate(experience.startDate),
        endDate: parseDate(experience.endDate),
      })),
      educations: updatedResumeData.educations?.map((education) => ({
        ...education,
        graduationDate: parseDate(education.graduationDate),
      })),
      courses: updatedResumeData.courses?.map((course) => ({
        ...course,
        completionDate: parseDate(course.completionDate),
      })),
    };

    const updateResume = async () => {
      if (existingResume) {
        // If the resume exists, update it
        await prisma.resume.update({
          where: {
            id: existingResume.id,
          },
          data: {
            ...formattedResumeData,
            modifiedAt: new Date(),
            ...(updatedResumeData.theme &&
            Object.keys(updatedResumeData.theme).length > 0
              ? {
                  theme: {
                    create: {
                      name: updatedResumeData.theme.name,
                      primaryColor: updatedResumeData.theme.primaryColor,
                      backgroundColor: updatedResumeData.theme.backgroundColor,
                    },
                  },
                }
              : {}),
          },
        });
      } else {
        // If no resume exists, create a new one
        await prisma.resume.create({
          data: {
            name: resumeName,
            userId: user.id,
            ...formattedResumeData,
            modifiedAt: new Date(),
            theme: updatedResumeData.theme
              ? {
                  connectOrCreate: {
                    where: {
                      name: updatedResumeData.theme.name,
                    },
                    create: updatedResumeData.theme,
                  },
                }
              : undefined,
          },
        });
      }
    };

    // Retry logic
    const maxRetries = 3;
    let attempt = 0;
    while (attempt < maxRetries) {
      try {
        await updateResume();
        console.log("Resume updated successfully");

        return { success: true, resume: formattedResumeData };
      } catch (error) {
        if (error.code === "P2002" || error.code === "P2025") {
          // Retry on write conflict or deadlock
          attempt++;
          console.warn(
            `Attempt ${attempt} failed: ${error.message}. Retrying...`,
          );
          if (attempt >= maxRetries) {
            throw new Error(
              "Failed to update resume data after multiple attempts",
            );
          }
        } else {
          return { success: false, error: error.message };
        }
      }
    }
  } catch (error) {
    console.error("Error updating resume data:", error.message);
    throw new Error("Failed to update resume data");
  }
};

export async function addSkill(userId, skillData) {
  try {
    // Step 1: Fetch the user and their skills
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { skills: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Step 2: Check if user has existing skills
    const existingSkills = user.skills || [];

    // Step 3: Add new skill
    const updatedSkills = [
      ...existingSkills,
      {
        name: skillData.name,
        level: skillData.level,
      },
    ];

    // Step 4: Update the user's skills
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        skills: {
          set: updatedSkills,
        },
      },
    });

    return { success: true, updatedUser };
  } catch (error) {
    console.error("Error saving skill:", error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/dashboard");
  }
}

export async function updateSkill(userId, skillIndex, updatedSkill) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { skills: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedSkills = [...user.skills];
    updatedSkills[skillIndex] = updatedSkill;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        skills: {
          set: updatedSkills,
        },
      },
    });

    return { success: true, updatedUser };
  } catch (error) {
    console.error("Error updating skill:", error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/dashboard");
  }
}

export async function deleteSkill(userId, skillIndex) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { skills: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedSkills = user.skills.filter(
      (_, index) => index !== skillIndex,
    );

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        skills: {
          set: updatedSkills,
        },
      },
    });

    return { success: true, updatedUser };
  } catch (error) {
    console.error("Error deleting skill:", error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/dashboard");
  }
}
