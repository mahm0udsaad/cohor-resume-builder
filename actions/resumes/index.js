"use server";

import prisma from "@/lib/prisma";

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
    });

    return resumes || [];
  } catch (error) {
    console.error("Error getting user resumes:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getResume(userId, resumeName) {
  try {
    const resume = await prisma.resume.findFirst({
      where: { userId, name: resumeName },
    });

    return resume || {};
  } catch (error) {
    console.error("Error getting resume:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Updates user resume data for a specific section
 * @param {string} userEmail - The email of the user
 * @param {string} resumeName - The name of the resume to update
 * @param {Object} resumeData - The data to update
 * @param {string} currentTab - The current tab being updated
 * @returns {Promise<Object>} - Object containing success status and updated resume or error
 */

export async function updateUserResumeData(
  userEmail,
  resumeName,
  resumeData,
  currentTab,
) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { resumes: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    let resume = user.resumes.find((r) => r.name === resumeName);
    if (!resume) {
      resume = await prisma.resume.create({
        data: {
          name: resumeName,
          userId: user.id,
        },
      });
    }

    // Prepare the update data based on the current tab
    let updateData = {};
    switch (currentTab) {
      case "personal":
        if (resumeData.personalInfo) {
          updateData.personalInfo = {
            upsert: {
              set: resumeData.personalInfo,
              update: resumeData.personalInfo,
            },
          };
        }
        break;

      case "experience":
        updateData.experiences = {
          set: resumeData.experiences.map((exp) => ({
            jobTitle: exp.jobTitle,
            company: exp.company,
            startDate: exp.startDate ? new Date(exp.startDate) : null,
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            responsibilities: exp.responsibilities,
          })),
        };
        break;

      case "education":
        updateData.educations = {
          set: resumeData.educations.map((edu) => ({
            degree: edu.degree,
            institution: edu.institution,
            graduationDate: edu.graduationDate
              ? new Date(edu.graduationDate)
              : null,
          })),
        };
        break;

      case "skills":
        if (resumeData.skills) {
          updateData.skills = {
            set: resumeData.skills,
          };
        }
        if (resumeData.languages) {
          updateData.languages = {
            set: resumeData.languages,
          };
        }
        if (resumeData.courses) {
          updateData.courses = {
            set: resumeData.courses.map((course) => ({
              name: course.name,
              institution: course.institution,
              completionDate: course.completionDate
                ? new Date(course.completionDate)
                : null,
            })),
          };
        }
        break;

      case "review":
        // Only handle languages and courses in review tab
        if (resumeData.languages) {
          updateData.languages = {
            set: resumeData.languages,
          };
        }
        if (resumeData.courses) {
          updateData.courses = {
            set: resumeData.courses.map((course) => ({
              name: course.name,
              institution: course.institution,
              completionDate: course.completionDate
                ? new Date(course.completionDate)
                : null,
            })),
          };
        }
        break;

      default:
        return { success: false, error: "Invalid tab" };
    }

    // Update the resume
    const updatedResume = await prisma.resume.update({
      where: { id: resume.id },
      data: updateData,
      include: {
        personalInfo: true,
        experiences: true,
        educations: true,
        skills: true,
        languages: true,
        courses: true,
      },
    });

    return { success: true, resume: updatedResume };
  } catch (error) {
    console.error("Error updating user resume data:", error);
    return { success: false, error: error.message };
  }
}
