"use server";

import { parseDate } from "@/helper/date";
import prisma from "@/lib/prisma";

export async function addLanguage(userId, language) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        languages: {
          push: language,
        },
      },
    });
    return user.languages;
  } catch (error) {
    console.error("Error adding language:", error);
    throw new Error("Failed to add language");
  }
}

export async function updateLanguage(userId, index, language) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { languages: true },
    });

    const updatedLanguages = [...user.languages];
    updatedLanguages[index] = language;

    await prisma.user.update({
      where: { id: userId },
      data: {
        languages: updatedLanguages,
      },
    });

    return updatedLanguages;
  } catch (error) {
    console.error("Error updating language:", error);
    throw new Error("Failed to update language");
  }
}

export async function deleteLanguage(userId, index) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { languages: true },
    });

    const updatedLanguages = user.languages.filter((_, i) => i !== index);

    await prisma.user.update({
      where: { id: userId },
      data: {
        languages: updatedLanguages,
      },
    });

    return updatedLanguages;
  } catch (error) {
    console.error("Error deleting language:", error);
    throw new Error("Failed to delete language");
  }
}

export async function addCourse(userId, course) {
  try {
    // Parse the completionDate before pushing it into the course data
    const parsedCourse = {
      ...course,
      completionDate: parseDate(course.completionDate), // Use parseDate to format the date correctly
    };

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        courses: {
          push: parsedCourse,
        },
      },
    });
    return user.courses;
  } catch (error) {
    console.error("Error adding course:", error);
    throw new Error("Failed to add course");
  }
}

export async function updateCourse(userId, index, course) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { courses: true },
    });

    // Parse the completionDate before updating the course data
    const updatedCourse = {
      ...course,
      completionDate: parseDate(course.completionDate),
    };

    const updatedCourses = [...user.courses];
    updatedCourses[index] = updatedCourse;

    await prisma.user.update({
      where: { id: userId },
      data: {
        courses: updatedCourses,
      },
    });

    return updatedCourses;
  } catch (error) {
    console.error("Error updating course:", error);
    throw new Error("Failed to update course");
  }
}

export async function deleteCourse(userId, index) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { courses: true },
    });

    const updatedCourses = user.courses.filter((_, i) => i !== index);

    await prisma.user.update({
      where: { id: userId },
      data: {
        courses: updatedCourses,
      },
    });

    return updatedCourses;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw new Error("Failed to delete course");
  }
}
