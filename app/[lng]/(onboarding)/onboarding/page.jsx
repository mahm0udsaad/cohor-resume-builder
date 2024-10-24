import OnboardingFlow from "@/components/improved-onboarding-flow";

export default async function OnboardingPage({ params: { lng } }) {
  return <OnboardingFlow lng={lng} />;
}
