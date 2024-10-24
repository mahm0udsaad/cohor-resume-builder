"use server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const personalInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  imageUrl: z.string().optional(),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  contact: z
    .array(z.string())
    .min(1, "At least one contact method is required"),
});

export async function savePersonalInfo(formData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const rawData = {
    name: formData.get("name"),
    jobTitle: formData.get("jobTitle"),
    summary: formData.get("summary"),
    contact: formData.getAll("contact"),
  };

  const validatedData = personalInfoSchema.parse(rawData);

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        personalInfo: validatedData,
      },
    });
    return { success: true, data: updatedUser.personalInfo };
  } catch (error) {
    return { success: false, error: "Failed to save personal information" };
  }
}
