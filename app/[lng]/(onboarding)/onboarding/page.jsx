import OnboardingFlow from "@/components/improved-onboarding-flow";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function OnboardingPage({ params: { lng } }) {
  const session = await auth();
  if (!session) redirect("/auth");
  const user = session?.user;

  return <OnboardingFlow lng={lng} user={user} />;
}
