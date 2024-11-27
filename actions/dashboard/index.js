"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getDashboardData() {
  const session = await auth();
  if (
    ![
      "Cv@cohr.sa",
      "cv@cohr.sa",
      "saad123mn123@gmail.com",
      "jawad.1990@live.com",
    ].includes(session?.user?.email)
  )
    redirect("/Admin");
  const plans = await prisma.plan.findMany();
  const users = await prisma.user.findMany({
    include: { resumes: true },
  });

  const dashboardData = {};

  for (const plan of plans) {
    const planUsers = users.filter((user) => user.plan === plan.name);
    const planResumes = planUsers.reduce(
      (sum, user) => sum + user.resumes.length,
      0,
    );

    dashboardData[plan.name] = {
      users: planUsers,
      templates: plan.templates,
      resumes: planResumes,
      price: plan.price,
      discount: plan.discount,
    };
  }

  return dashboardData;
}
export async function createTemplate(template, plan) {
  const existingPlan = await prisma.plan.findUnique({
    where: { name: plan },
  });
  const templatesToDelete = ["elegantformal"];

  const updatedTemplates = existingPlan.templates.filter(
    (temp) => !templatesToDelete.includes(temp),
  );

  await prisma.plan.update({
    where: { name: plan },
    data: {
      templates: updatedTemplates,
    },
  });

  if (!existingPlan.templates.includes(template)) {
    try {
      const createdTemplate = await prisma.plan.update({
        where: { name: plan },
        data: {
          templates: { push: template },
        },
      });
      console.log("Template created successfully:", template);

      return createdTemplate;
    } catch (error) {
      console.error("Error creating template:", error);
      throw error;
    }
  }
  console.log("Template already exists");

  return existingPlan;
}
export async function getAllTemplates() {
  const proPlusPlan = await prisma.plan.findUnique({
    where: { name: "proPlus" },
  });
  return proPlusPlan?.templates || [];
}
