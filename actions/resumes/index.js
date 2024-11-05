"use server";

import { parseDate } from "@/helper/date";
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
        experiences: true, // Assuming you want to fetch experiences too
      },
    });

    if (!resume) {
      return { success: false, error: "Resume not found" };
    }

    // Map through experiences and convert null endDates to "present"
    const formattedResume = {
      ...resume,
      experiences: resume.experiences?.map((experience) => ({
        ...experience,
        endDate: experience.endDate === null ? "present" : experience.endDate,
      })),
    };

    return formattedResume;
  } catch (error) {
    console.error("Error getting resume:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteResume(resumeId, email) {
  try {
    if (!resumeId || !email) {
      return { success: false, error: "Invalid form data" };
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { resumes: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const resumeToDelete = user.resumes.find(
      (resume) => resume.id === resumeId,
    );

    if (!resumeToDelete) {
      return { success: false, error: "Resume not found for this user" };
    }

    const deletedResume = await prisma.resume.delete({
      where: { id: resumeId },
    });

    return { success: true, deletedResume };
  } catch (error) {
    console.error("Error deleting resume:", error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/dashboard");
    await prisma.$disconnect();
  }
}

// Validation helper
const validateResumeData = (data) => {
  if (!data) throw new Error("Resume data is required");

  // Validate experiences
  if (
    data.experiences?.some((exp) => exp.startDate && !parseDate(exp.startDate))
  ) {
    throw new Error("Invalid experience start date format");
  }

  // Validate educations
  if (
    data.educations?.some(
      (edu) => edu.graduationDate && !parseDate(edu.graduationDate),
    )
  ) {
    throw new Error("Invalid graduation date format");
  }

  // Validate courses
  if (
    data.courses?.some(
      (course) => course.completionDate && !parseDate(course.completionDate),
    )
  ) {
    throw new Error("Invalid course completion date format");
  }
};

// Format resume data helper
const formatResumeData = (data) => {
  return {
    ...data,
    experiences: data.experiences?.map((experience) => ({
      ...experience,
      startDate: parseDate(experience.startDate),
      endDate: parseDate(experience.endDate),
    })),
    educations: data.educations?.map((education) => ({
      ...education,
      graduationDate: parseDate(education.graduationDate),
      gpaType: education.gpaType || "none",
      numericGpa:
        education.gpaType === "numeric"
          ? parseFloat(education.numericGpa)
          : null,
      descriptiveGpa:
        education.gpaType === "descriptive" ? education.descriptiveGpa : null,
    })),
    courses: data.courses?.map((course) => ({
      ...course,
      completionDate: parseDate(course.completionDate),
    })),
  };
};

export const updateUserResumeData = async (
  userEmail,
  resumeName,
  updatedResumeData,
) => {
  try {
    // Validate inputs
    if (!userEmail) throw new Error("User email is required");
    if (!resumeName) throw new Error("Resume name is required");

    // Validate resume data
    validateResumeData(updatedResumeData);

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        resumes: {
          where: { name: resumeName },
          include: { theme: true },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const existingResume = user.resumes[0];
    const formattedResumeData = formatResumeData(updatedResumeData);

    // Handle theme data
    const themeData =
      updatedResumeData.theme && Object.keys(updatedResumeData.theme).length > 0
        ? {
            theme: {
              upsert: {
                create: {
                  name: updatedResumeData.theme.name,
                  primaryColor: updatedResumeData.theme.primaryColor,
                  backgroundColor: updatedResumeData.theme.backgroundColor,
                },
                update: {
                  name: updatedResumeData.theme.name,
                  primaryColor: updatedResumeData.theme.primaryColor,
                  backgroundColor: updatedResumeData.theme.backgroundColor,
                },
              },
            },
          }
        : {};

    if (existingResume) {
      // Update existing resume
      await prisma.resume.update({
        where: { id: existingResume.id },
        data: {
          ...formattedResumeData,
          modifiedAt: new Date(),
          ...themeData,
        },
      });
    } else {
      // Create new resume
      await prisma.resume.create({
        data: {
          name: resumeName,
          userId: user.id,
          ...formattedResumeData,
          modifiedAt: new Date(),
          ...(updatedResumeData.theme
            ? {
                theme: {
                  create: updatedResumeData.theme,
                },
              }
            : {}),
        },
      });
    }

    // Revalidate the path to update the UI
    revalidatePath("/resumes");

    return {
      success: true,
      message: `Resume ${existingResume ? "updated" : "created"} successfully`,
      resume: formattedResumeData,
    };
  } catch (error) {
    console.error("Resume update error:", error);

    // Return structured error response
    return {
      success: false,
      error: error.message || "Failed to update resume data",
      details: error.cause || error.stack,
    };
  }
};
export async function saveSkills(userId, skills) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        skills: skills, // Directly set the entire skills array
      },
    });

    revalidatePath("/dashboard");
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error saving skills:", error);
    return { success: false, error: error.message };
  }
}
