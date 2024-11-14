"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getDashboardData() {
  const session = await auth();
  if (
    session?.user?.email !== "Jawad@cohr.sa" ||
    session?.user?.email !== "saad123mn123@gmail.com"
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

async function seed() {
  // Delete existing plans
  await prisma.plan.deleteMany({});

  // Create plans with templates
  const plans = [
    {
      name: "free",
      price: 0,
      templates: ["modern", "BlueHorizon", "elegantModern"],
    },
    {
      name: "pro",
      price: 9.99,
      templates: [
        "modern",
        "BlueHorizon",
        "elegantModern",
        "ProfessionalSidebar",
        "modernFormal",
        "creativeTimeLine",
        "bold",
        "professional",
      ],
    },
    {
      name: "proPlus",
      price: 19.99,
      templates: [
        "modern",
        "BlueHorizon",
        "elegantModern",
        "ProfessionalSidebar",
        "modernFormal",
        "creativeTimeLine",
        "bold",
        "professional",
        "gridLayout",
        "creative",
        "formal",
        "glow",
        "elegant",
      ],
    },
  ];

  for (const plan of plans) {
    await prisma.plan.create({
      data: plan,
    });
  }
}
