"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getDashboardData() {
  const session = await auth();
  if (
    !["Jawad@cohr.sa", "saad123mn123@gmail.com"].includes(session?.user?.email)
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
    };
  }

  return dashboardData;
}

export async function seedAdminUsers() {
  const existingUsers = await prisma.user.findMany({
    where: {
      OR: [{ email: "Jawad@cohr.sa" }, { email: "saad123mn123@gmail.com" }],
    },
  });

  if (existingUsers.length === 2) return;

  await prisma.user.upsert({
    where: { email: "saad123mn123@gmail.com" },
    update: {
      role: "ADMIN",
    },
  });
}
