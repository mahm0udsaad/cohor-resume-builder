"use server";

import { parseDate } from "@/helper/date";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserWithDetails } from "../userInfo/action";

export async function getUserPlanTemplates(planName) {
  try {
    const userPlan = await prisma.plan.findUnique({
      where: {
        name: planName || "free",
      },
      select: {
        templates: true,
      },
    });
    return userPlan?.templates || [];
  } catch (error) {
    console.error("Error fetching user plan templates:", error);
    return [];
  }
}
export async function addResumeToUser(email, resumeName) {
  try {
    console.log("Adding resume:", email, resumeName);

    // Fetch the user's details, including their existing resumes
    const {
      user,
      personalInfo,
      experiences,
      educations,
      skills,
      languages,
      courses,
      resumes,
    } = await getUserWithDetails(email);

    // Check if the user already has a resume with the given name
    const existingResume = resumes.find((resume) => resume.name === resumeName);
    if (existingResume) {
      return { success: true, resume: existingResume };
    }

    // Create a new resume with the user's initial data
    const newResume = await prisma.resume.create({
      data: {
        name: resumeName,
        userId: user.id,
        personalInfo: {
          name: personalInfo?.name,
          jobTitle: personalInfo?.jobTitle,
          imageUrl: personalInfo?.imageUrl,
          phoneNumber: personalInfo?.phoneNumber,
          summary: personalInfo?.summary,
          contact: personalInfo?.contact || [],
        },
        experiences: experiences.map((exp) => ({
          jobTitle: exp.jobTitle,
          company: exp.company,
          startDate: exp.startDate,
          endDate: exp.endDate,
          responsibilities: exp.responsibilities,
        })),
        educations: educations.map((edu) => ({
          degree: edu.degree,
          institution: edu.institution,
          graduationDate: edu.graduationDate,
          gpaType: edu.gpaType,
          numericGpa: edu.numericGpa,
          descriptiveGpa: edu.descriptiveGpa,
        })),
        skills: skills.map((skill) => ({
          name: skill.name,
          level: skill.level,
        })),
        languages: languages.map((lang) => ({
          name: lang.name,
          proficiency: lang.proficiency,
        })),
        courses: courses.map((course) => ({
          name: course.name,
          institution: course.institution,
          completionDate: course.completionDate,
        })),
      },
    });

    return { success: true, resume: newResume };
  } catch (error) {
    console.error("Error adding resume:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserResumes(email) {
  try {
    // First, let's verify we can find the user
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    console.log("User exists:", userExists);

    const resumes = await prisma.resume.findMany({
      where: {
        userId: userExists.id,
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
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const existingResume = user.resumes[0];
    const formattedResumeData = formatResumeData(updatedResumeData);

    // Format theme data if it exists
    const themeData = updatedResumeData.theme
      ? {
          theme: {
            name: updatedResumeData.theme.name,
            primaryColor: updatedResumeData.theme.primaryColor,
            backgroundColor: updatedResumeData.theme.backgroundColor,
          },
        }
      : {};

    // Use upsert to handle both creation and update cases
    const newResume = await prisma.resume.upsert({
      where: {
        id: existingResume?.id ?? "new-resume",
      },
      create: {
        name: resumeName,
        userId: user.id,
        ...formattedResumeData,
        ...themeData,
        modifiedAt: new Date(),
      },
      update: {
        ...formattedResumeData,
        ...themeData,
        modifiedAt: new Date(),
      },
    });

    // Revalidate the path to update the UI
    revalidatePath("/dashboard");

    return {
      success: true,
      existingResume: existingResume,
      resume: newResume,
    };
  } catch (error) {
    console.error("Resume update error:", error);

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
