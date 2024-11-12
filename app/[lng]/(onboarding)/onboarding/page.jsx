import OnboardingFlow from "@/components/improved-onboarding-flow";
import { auth } from "@/lib/auth";

export default async function OnboardingPage({ params: { lng } }) {
  const session = await auth();
  const user = session.user;
  return <OnboardingFlow lng={lng} user={user} />;
}
