"use server";

import prisma from "@/lib/prisma";
import { templates } from "@/data/data";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const getTemplateStatus = (templateIndex, userPlan) => {
  switch (userPlan) {
    case "proPlus":
      return { isLocked: false, requiredPlan: null };
    case "pro":
      return {
        isLocked: templateIndex >= 10,
        requiredPlan: templateIndex >= 10 ? "proPlus" : null,
      };
    case "free":
    default:
      return {
        isLocked: templateIndex >= 2,
        requiredPlan: templateIndex >= 10 ? "proPlus" : "pro",
      };
  }
};

const getAvailableTemplates = (plan) => {
  return templates
    .filter((_, index) => !getTemplateStatus(index, plan).isLocked)
    .map((template) => template.name);
};

export async function getDashboardData() {
  const session = await auth();
  if (session?.user?.email !== "Jawad@cohr.sa") redirect("/Admin");
  // Get all users with their resumes
  const users = await prisma.user.findMany({
    include: {
      resumes: true,
    },
  });

  // Initialize data structure with templates based on plan access
  const dashboardData = {
    free: {
      users: [],
      templates: getAvailableTemplates("free"),
      resumes: 0,
    },
    pro: {
      users: [],
      templates: getAvailableTemplates("pro"),
      resumes: 0,
    },
    proPlus: {
      users: [],
      templates: getAvailableTemplates("proPlus"),
      resumes: 0,
    },
  };

  // Process users using user.plan directly
  users.forEach((user) => {
    const plan = user.plan; // Normalize plan name to match our keys
    if (plan in dashboardData) {
      dashboardData[plan].users.push({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      });
      dashboardData[plan].resumes += user.resumes.length;
    }
  });

  return dashboardData;
}
