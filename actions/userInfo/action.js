"use server";

import { PrismaClient } from "@/prisma/generated/client";

const prisma = new PrismaClient();

export async function updateUserResumeData(userEmail, resumeData) {
  try {
    // First, find the user by email
    console.log("Updating resume data for user:", userEmail);

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Now update the user's data
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        personalInfo: {
          upsert: {
            create: {
              name: resumeData.personalInfo.name,
              jobTitle: resumeData.personalInfo.jobTitle,
              summary: resumeData.personalInfo.summary,
              contact: resumeData.personalInfo.contact,
            },
            update: {
              name: resumeData.personalInfo.name,
              jobTitle: resumeData.personalInfo.jobTitle,
              summary: resumeData.personalInfo.summary,
              contact: resumeData.personalInfo.contact,
            },
          },
        },
        experiences: {
          deleteMany: {},
          create: resumeData.experiences.map((exp) => ({
            jobTitle: exp.jobTitle,
            company: exp.company,
            startDate: exp.startDate ? new Date(exp.startDate) : null,
            endDate: exp.endDate ? new Date(exp.endDate) : null,
            responsibilities: exp.responsibilities,
          })),
        },
        educations: {
          deleteMany: {},
          create: resumeData.educations.map((edu) => ({
            degree: edu.degree,
            institution: edu.institution,
            graduationDate: edu.graduationDate
              ? new Date(edu.graduationDate)
              : null,
          })),
        },
        skills: {
          deleteMany: {},
          create: resumeData.skills.map((skill) => ({
            name: skill.name,
            level: skill.level,
          })),
        },
        languages: {
          deleteMany: {},
          create: resumeData.languages.map((lang) => ({
            name: lang.name,
            proficiency: lang.proficiency,
          })),
        },
        courses: {
          deleteMany: {},
          create: resumeData.courses.map((course) => ({
            name: course.name,
            institution: course.institution,
            completionDate: course.completionDate
              ? new Date(course.completionDate)
              : null,
          })),
        },
      },
      include: {
        personalInfo: true,
        experiences: true,
        educations: true,
        skills: true,
        languages: true,
        courses: true,
      },
    });

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Error updating user resume data:", error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
}
