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

  try {
    const requiredPlan = await findRequiredPlanForTemplate(templateName);
    return {
      isLocked: true,
      requiredPlan,
    };
  } catch (error) {
    console.error("Error checking template status:", error);
    return {
      isLocked: true,
      requiredPlan: null,
    };
  }
}

export async function getPlansWithPrices() {
  try {
    const plans = await prisma.Plan.findMany({
      select: {
        name: true,
        price: true,
        discount: true,
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

export async function getPlanFromAmount(amountInCents) {
  // Convert cents to decimal format
  const amountInDecimal = amountInCents / 100;

  try {
    // Query all plans and find the matching one considering discounts
    const plans = await prisma.plan.findMany({
      select: {
        name: true,
        price: true,
        discount: true,
      },
    });

    // Find a plan where the amount matches either original or discounted price
    const matchingPlan = plans.find((plan) => {
      const discountedPrice = plan.discount
        ? plan.price * (1 - plan.discount / 100)
        : plan.price;

      return Math.abs(discountedPrice - amountInDecimal) < 0.01; // Allow small floating point differences
    });

    return matchingPlan?.name || null;
  } catch (error) {
    console.error("Error finding plan:", error);
    throw new Error("Failed to find matching plan");
  }
}
