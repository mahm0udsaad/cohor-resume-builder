"use server";
import prisma from "@/lib/prisma";

export async function getUserPlanTemplates(planName) {
  try {
    const userPlan = await prisma.plan.findUnique({
      where: {
        name: planName || "free",
      },
      select: {
        templates: true,
      },
    });
    return userPlan?.templates || [];
  } catch (error) {
    console.error("Error fetching user plan templates:", error);
    return [];
  }
}

async function findRequiredPlanForTemplate(templateName) {
  try {
    const requiredPlan = await prisma.plan.findFirst({
      where: {
        templates: {
          has: templateName,
        },
      },
      orderBy: {
        price: "asc",
      },
      select: {
        name: true,
      },
    });
    return requiredPlan?.name || "pro";
  } catch (error) {
    console.error("Error finding required plan:", error);
    return "pro";
  }
}

export async function getTemplateStatus(templateName, userPlanTemplates) {
  if (!userPlanTemplates || userPlanTemplates.length === 0) {
    return {
      isLocked: true,
      requiredPlan: "pro",
    };
  }

  const isTemplateAvailable = userPlanTemplates.includes(templateName);

  if (isTemplateAvailable) {
    return {
      isLocked: false,
      requiredPlan: null,
    };
  }

  const requiredPlan = await findRequiredPlanForTemplate(templateName);

  return {
    isLocked: true,
    requiredPlan,
  };
}

export async function getPlansWithPrices() {
  try {
    const plans = await prisma.Plan.findMany({
      select: {
        name: true,
        price: true,
      },
      orderBy: {
        price: "asc",
      },
    });

    return plans;
  } catch (error) {
    console.error("Error fetching plans with prices:", error);
    return [];
  }
}