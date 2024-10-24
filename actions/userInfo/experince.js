"use server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const experienceSchema = z.array(
  z.object({
    jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
    company: z.string().min(2, "Company must be at least 2 characters"),
    startDate: z.date().or(z.string()),
    endDate: z.date().or(z.string().regex(/^Present$/)),
    responsibilities: z
      .string()
      .min(10, "Responsibilities must be at least 10 characters"),
  }),
);

export async function saveExperiences(formData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const experiences = JSON.parse(formData.get("experiences"));
  const validatedData = experienceSchema.parse(experiences);

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        experiences: validatedData,
      },
    });
    return { success: true, data: updatedUser.experiences };
  } catch (error) {
    return { success: false, error: "Failed to save experiences" };
  }
}
