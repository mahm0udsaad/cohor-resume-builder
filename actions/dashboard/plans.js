"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePlanPrice(planName, newPrice) {
  try {
    const updatedPlan = await prisma.plan.update({
      where: { name: planName },
      data: { price: parseFloat(newPrice) },
    });
    return { success: true, plan: updatedPlan };
  } catch (error) {
    console.error("Error updating plan price:", error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/admin");
  }
}

export async function updatePlanTemplates(planName, templates) {
  try {
    const updatedPlan = await prisma.plan.update({
      where: { name: planName },
      data: { templates },
    });
    return { success: true, plan: updatedPlan };
  } catch (error) {
    console.error("Error updating plan templates:", error);
    return { success: false, error: error.message };
  } finally {
    revalidatePath("/admin");
  }
}

export async function getPlans() {
  try {
    const plans = await prisma.plan.findMany();
    return plans;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
}
