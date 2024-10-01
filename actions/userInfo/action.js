"use server";

import { verifyIdToken } from "@/firebase";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { cache } from "react";

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

export const getCurrentUser = cache(
  async function getCurrentUser() {
    // Retrieve the session token from cookies
    const token = cookies().get("session")?.value;

    // If there's no token, return null
    if (!token) return null;

    // Verify the token using Firebase Admin SDK
    const decodedToken = await verifyIdToken(token);

    // If token verification fails, return null
    if (!decodedToken) return null;

    const { email } = decodedToken;

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

export async function getUserWithDetails() {
  // Get the current authenticated user
  const currentUser = await getCurrentUser();

  // Check if the current user exists (e.g., not authenticated or invalid token)
  if (!currentUser) {
    return { success: false, error: "No authenticated user found" };
  }

  try {
    // Fetch user data with related info from MongoDB
    const user = await prisma.user.findUnique({
      where: { email: currentUser.email },
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
